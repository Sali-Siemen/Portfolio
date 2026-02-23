# 🚀 Sali Siemen — AI Portfolio Website

An AI-powered personal portfolio website featuring a modern React frontend and a FastAPI backend with an intelligent chat assistant powered by OpenRouter (Mistral 7B).

> **Live Chat Widget:** Ask the AI anything about Sali's projects, skills, or experience — all answers are grounded in real resume data.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| Backend | Python 3, FastAPI, Uvicorn |
| AI | OpenRouter API (Mistral 7B Instruct) |
| Deployment | Vercel (frontend) · Render (backend) |

---

## 📁 Project Structure

```
portfolio/
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/   # Navbar, ChatWidget
│   │   ├── sections/     # Hero, About, Skills, Projects, Contact
│   │   └── context/      # ThemeContext (dark/light mode)
│   ├── public/
│   │   └── favicon.png
│   └── .env.example
└── backend/           # FastAPI server
    ├── main.py            # /chat endpoint + OpenRouter integration
    ├── resume_data.json   # Resume data used as AI context
    ├── requirements.txt
    └── .env.example
```

---

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Chinnu891/Portfolio.git
cd Portfolio
```

---

### 2. Backend Setup (FastAPI)

#### Requirements
- Python 3.9+
- An [OpenRouter API key](https://openrouter.ai/keys) (free tier available)

```bash
# Go to backend folder
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create your .env file
cp .env.example .env
```

Edit `backend/.env` and add your key:
```env
OPENROUTER_API_KEY=sk-or-...your-key-here
```

#### Start the backend

```bash
# Option 1 — simple (same as frontend style)
npm start

# Option 2 — direct uvicorn
uvicorn main:app --reload --port 8000
```

✅ Backend running at → http://localhost:8000  
📋 API Docs → http://localhost:8000/docs  
💚 Health check → http://localhost:8000/health

---

### 3. Frontend Setup (React + Vite)

#### Requirements
- Node.js 18+
- npm

```bash
# Go to frontend folder
cd frontend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
```

The default `frontend/.env` already points to the local backend:
```env
VITE_API_URL=http://localhost:8000
```

#### Start the frontend

```bash
npm run dev
```

✅ Frontend running at → http://localhost:5173

---

## 🌐 Deployment

### Frontend → Vercel
1. Import the `frontend/` folder into [Vercel](https://vercel.com)
2. Set environment variable: `VITE_API_URL=https://your-backend.onrender.com`
3. Deploy

### Backend → Render
1. Import the `backend/` folder into [Render](https://render.com)
2. Set environment variable: `OPENROUTER_API_KEY=sk-or-...`
3. Start command: `uvicorn main:app --host 0.0.0.0 --port 8000`

---

## 🤖 AI Chat Features

- Floating chat bubble (bottom-right corner)
- Answers grounded **only** in Sali's resume data
- Supports markdown formatting in responses
- Powered by `mistralai/mistral-7b-instruct` via OpenRouter

---

## 📬 Contact

- **Email:** salisiemen891@gmail.com
- **LinkedIn:** [linkedin.com/in/sali-siemen](https://www.linkedin.com/in/sali-siemen)
- **GitHub:** [github.com/Chinnu891](https://github.com/Chinnu891)
