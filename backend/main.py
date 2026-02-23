"""
FastAPI backend for Sali Siemen's AI Portfolio Chatbot.
Connects to OpenRouter API (Mistral 7B) and answers questions
based on resume data loaded from resume_data.json.
"""

import json
import os
from pathlib import Path
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ─────────────────────────────────────────────
# Load environment variables from .env file
# ─────────────────────────────────────────────
load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions"
AI_MODEL = "mistralai/mistral-7b-instruct"

# ─────────────────────────────────────────────
# Load resume data (used as AI context)
# ─────────────────────────────────────────────
RESUME_PATH = Path(__file__).parent / "resume_data.json"
try:
    with open(RESUME_PATH, "r", encoding="utf-8") as f:
        resume_data = json.load(f)
except FileNotFoundError:
    resume_data = {}
    print("⚠️  resume_data.json not found. AI will have no context.")

# ─────────────────────────────────────────────
# Build system prompt from resume data
# ─────────────────────────────────────────────
def build_system_prompt(data: dict) -> str:
    """
    Injects the full resume into the system prompt so the AI
    only answers questions based on this information.
    """
    resume_text = json.dumps(data, indent=2)
    return f"""You are an AI assistant for {data.get('name', 'the portfolio owner')}'s personal portfolio website.

Your role is to answer user questions ONLY based on the information provided below.
Do NOT generate generic answers. Do NOT use outside knowledge.
If a question is not related to the provided information, respond with:
"I can only answer questions based on my portfolio."

Always answer in a professional but friendly tone.
Keep answers clear and concise (2-4 sentences max unless more detail is needed).
Highlight projects and real experience when relevant.
If asked "Tell me about yourself", give a short engaging summary using the data below.

------------------------
PORTFOLIO DATA (JSON):
{resume_text}
------------------------

INSTRUCTIONS:
- If asked about skills, explain with examples from the projects.
- If asked about experience, include the internship and self-hosted server work.
- If asked about certifications, list them clearly.
- If asked about projects, describe them engagingly with tech stack.
- Never make up information not present in the data above.
"""


SYSTEM_PROMPT = build_system_prompt(resume_data)

# ─────────────────────────────────────────────
# FastAPI app setup
# ─────────────────────────────────────────────
app = FastAPI(
    title="Portfolio AI Chat API",
    description="AI-powered chatbot for Sali Siemen's portfolio",
    version="1.0.0",
)

# Allow frontend origins (Vite dev + Vercel production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://*.vercel.app",
        "https://*.netlify.app",
        "*",  # Allow all for development; restrict in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────
# Request / Response models
# ─────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str
    model: str


# ─────────────────────────────────────────────
# Health check endpoint
# ─────────────────────────────────────────────
@app.get("/")
async def root():
    return {"status": "ok", "message": "Portfolio AI Chat API is running 🚀"}


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "resume_loaded": bool(resume_data),
        "ai_model": AI_MODEL,
        "api_key_set": bool(OPENROUTER_API_KEY),
    }


# ─────────────────────────────────────────────
# Chat endpoint
# ─────────────────────────────────────────────
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Accepts a user message and returns an AI-generated response
    grounded in Sali Siemen's resume data.
    """
    if not OPENROUTER_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="OpenRouter API key not configured. Set OPENROUTER_API_KEY in your .env file.",
        )

    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # Prepare the API payload
    payload = {
        "model": AI_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": request.message.strip()},
        ],
        "temperature": 0.4,
        "max_tokens": 500,
    }

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://salisiemen.dev",  # Optional: your deployed domain
        "X-Title": "Sali Siemen Portfolio Chat",
    }

    try:
        async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
            res = await client.post(OPENROUTER_BASE_URL, json=payload, headers=headers)
            res.raise_for_status()
            data = res.json()

        # Extract the AI reply from OpenRouter's response
        ai_reply = data["choices"][0]["message"]["content"].strip()

        return ChatResponse(response=ai_reply, model=AI_MODEL)

    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=502,
            detail=f"OpenRouter API error: {e.response.status_code} — {e.response.text}",
        )
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Network error: {str(e)}")
    except (KeyError, IndexError) as e:
        raise HTTPException(status_code=502, detail=f"Unexpected API response format: {str(e)}")
