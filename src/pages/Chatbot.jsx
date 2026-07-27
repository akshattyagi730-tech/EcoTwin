import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { getBotResponse } from "@/lib/ecoData";
import ReactMarkdown from "react-markdown";

const suggestions = [
    "Why did energy increase yesterday?",
    "Which machine wastes the most electricity?",
    "How much money can I save?",
    "Give maintenance suggestions.",
];

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { role: "bot", content: "Hi! I'm **EcoTwin AI** — your energy assistant. Ask me anything about your plant's consumption, costs, or anomalies." },
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const endRef = useRef(null);

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

    const send = (text) => {
        const q = text || input;
        if (!q.trim()) return;
        setMessages((m) => [...m, { role: "user", content: q }]);
        setInput("");
        setTyping(true);
        setTimeout(() => {
            setMessages((m) => [...m, { role: "bot", content: getBotResponse(q) }]);
            setTyping(false);
        }, 900);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">AI Chatbot</h1>
                <p className="text-sm text-muted-foreground mt-1">Ask EcoTwin about your energy, costs & machines</p>
            </div>

            <div className="glass rounded-2xl flex flex-col h-[calc(100vh-220px)] min-h-[400px]">
                {/* header */}
                <div className="flex items-center gap-3 p-4 border-b border-border">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="font-semibold">EcoTwin Assistant</p>
                        <p className="text-xs text-emerald-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-muted-foreground ml-auto" />
                </div>

                {/* messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                    {messages.map((m, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-blue-500/15 text-blue-500" : "bg-gradient-to-br from-emerald-500 to-blue-500 text-white"}`}>
                                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-blue-500 text-white" : "bg-background/60 border border-border"}`}>
                                {m.role === "bot" ? <ReactMarkdown components={{ p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>, table: ({ children }) => <table className="my-2 border-collapse text-xs">{children}</table>, th: ({ children }) => <th className="border border-border px-2 py-1 bg-muted">{children}</th>, td: ({ children }) => <td className="border border-border px-2 py-1">{children}</td>, ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>, ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>, li: ({ children }) => <li className="mb-1">{children}</li> }}>{m.content}</ReactMarkdown> : m.content}
                            </div>
                        </motion.div>
                    ))}
                    {typing && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                            <div className="bg-background/60 border border-border rounded-2xl px-4 py-3 flex gap-1">
                                {[0, 1, 2].map((d) => <motion.span key={d} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }} className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />)}
                            </div>
                        </div>
                    )}
                    <div ref={endRef} />
                </div>

                {/* suggestions */}
                {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-2">
                        {suggestions.map((s) => (
                            <button key={s} onClick={() => send(s)} className="text-xs font-medium px-3 py-1.5 rounded-full glass hover:bg-accent/10 transition-colors">{s}</button>
                        ))}
                    </div>
                )}

                {/* input */}
                <div className="p-4 border-t border-border flex gap-2">
                    <input
                        value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
                        placeholder="Ask about energy, costs, anomalies..."
                        className="flex-1 bg-background/60 border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                    <button onClick={() => send()} className="w-11 h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white flex items-center justify-center hover:shadow-lg hover:shadow-emerald-500/25 transition-shadow">
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}