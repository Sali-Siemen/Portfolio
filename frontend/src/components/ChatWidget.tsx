import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Message = {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
};

// Suggestion chips shown before any conversation
const SUGGESTIONS = [
    '🚀 Tell me about your projects',
    '🛡️ What are your skills?',
    '🎓 Tell me about yourself',
    '💼 What experience do you have?',
    '📜 List your certifications',
];

// ─────────────────────────────────────────────
// Typing dots animation
// ─────────────────────────────────────────────
const TypingIndicator: React.FC = () => (
    <div className="flex items-end gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center flex-shrink-0">
            <Bot size={14} className="text-white" />
        </div>
        <div className="chat-bubble-ai flex items-center gap-1.5 px-4 py-3">
            <span className="typing-dot w-2 h-2 bg-primary-500 rounded-full" />
            <span className="typing-dot w-2 h-2 bg-primary-500 rounded-full" />
            <span className="typing-dot w-2 h-2 bg-primary-500 rounded-full" />
        </div>
    </div>
);

// ─────────────────────────────────────────────
// Single message bubble
// ─────────────────────────────────────────────
const MessageBubble: React.FC<{ msg: Message }> = ({ msg }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`flex items-end gap-2 mb-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
    >
        {/* Avatar */}
        <div
            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai'
                    ? 'bg-gradient-to-br from-primary-600 to-primary-400'
                    : 'bg-gradient-to-br from-accent-500 to-accent-400'
                }`}
        >
            {msg.role === 'ai' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
        </div>

        {/* Bubble — renders markdown for AI, plain text for user */}
        <div className={msg.role === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'} style={{ wordBreak: 'break-word' }}>
            {msg.role === 'ai' ? (
                <ReactMarkdown
                    components={{
                        // Bold
                        strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                        // Italic
                        em: ({ children }) => <em className="italic">{children}</em>,
                        // Paragraphs — no extra margin between them in a bubble
                        p: ({ children }) => <p className="mb-1 last:mb-0 leading-relaxed">{children}</p>,
                        // Bullet lists
                        ul: ({ children }) => <ul className="list-disc list-inside mt-1 space-y-0.5">{children}</ul>,
                        li: ({ children }) => <li className="text-sm">{children}</li>,
                    }}
                >
                    {msg.content}
                </ReactMarkdown>
            ) : (
                msg.content
            )}
        </div>
    </motion.div>
);

// ─────────────────────────────────────────────
// Main ChatWidget component
// ─────────────────────────────────────────────
const ChatWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '0',
            role: 'ai',
            content: "Hi! 👋 I'm Sali's AI assistant. Ask me anything about his projects, skills, or experience!",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    // Focus input when opened
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300);
    }, [open]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || loading) return;
        setShowSuggestions(false);

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await axios.post(`${apiUrl}/chat`, { message: text.trim() });
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: res.data.response ?? 'Sorry, I could not generate a response.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: 'ai',
                    content: '⚠️ Unable to reach the AI backend. Please make sure the server is running.',
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <>
            {/* Floating button */}
            <motion.button
                id="chat-toggle-btn"
                onClick={() => setOpen((o) => !o)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-500 rounded-full shadow-2xl shadow-primary-500/40 flex items-center justify-center text-white cursor-pointer"
                aria-label="Open AI Chat"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <X size={22} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <MessageCircle size={22} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulse ring */}
                {!open && (
                    <span className="absolute inline-flex w-full h-full rounded-full bg-primary-500 opacity-30 animate-ping" />
                )}
            </motion.button>

            {/* Chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] bg-white dark:bg-dark-800 rounded-3xl shadow-2xl shadow-black/20 border border-gray-100 dark:border-dark-700 flex flex-col overflow-hidden"
                        style={{ height: '520px' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 px-5 py-4 flex items-center gap-3 flex-shrink-0">
                            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                                <Sparkles size={18} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Ask Sali's AI</h3>
                                <p className="text-primary-200 text-xs">Powered by Mistral AI • Portfolio Assistant</p>
                            </div>
                            <div className="ml-auto flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-xs text-primary-200">Online</span>
                            </div>
                        </div>

                        {/* Messages area */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0.5">
                            {messages.map((m) => (
                                <MessageBubble key={m.id} msg={m} />
                            ))}
                            {loading && <TypingIndicator />}

                            {/* Suggestion chips (shown only at start) */}
                            {showSuggestions && !loading && messages.length <= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 space-y-2"
                                >
                                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center mb-3">Try asking:</p>
                                    {SUGGESTIONS.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => sendMessage(s.replace(/^[^\s]+\s/, ''))}
                                            className="w-full text-left text-xs px-3 py-2.5 bg-gray-50 dark:bg-dark-700 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-500 text-gray-600 dark:text-gray-300 rounded-xl border border-gray-100 dark:border-dark-600 hover:border-primary-300 dark:hover:border-primary-500/50 transition-all font-medium"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input bar */}
                        <div className="px-4 pb-4 flex-shrink-0 border-t border-gray-100 dark:border-dark-700 pt-3">
                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-dark-700 rounded-2xl px-4 py-2.5 border border-gray-200 dark:border-dark-600 focus-within:border-primary-400 dark:focus-within:border-primary-500 transition-colors">
                                <input
                                    ref={inputRef}
                                    id="chat-input"
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about skills, projects..."
                                    disabled={loading}
                                    className="flex-1 bg-transparent text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                                />
                                <button
                                    id="chat-send-btn"
                                    onClick={() => sendMessage(input)}
                                    disabled={!input.trim() || loading}
                                    className="w-8 h-8 bg-primary-500 disabled:bg-gray-300 dark:disabled:bg-dark-600 rounded-xl flex items-center justify-center text-white transition-colors hover:bg-primary-600 flex-shrink-0"
                                    aria-label="Send message"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                            <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-2">
                                AI answers only based on Sali's portfolio data
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
