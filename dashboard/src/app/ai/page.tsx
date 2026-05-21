"use client";
import { useState } from "react";
import { askAI } from "@/lib/api";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sql?: string;
  timestamp: Date;
}

const exampleQuestions = [
  "Berapa total leads bulan ini?",
  "Siapa 5 contact dengan score tertinggi?",
  "Keyword apa yang ranking di top 3?",
  "Berapa revenue closed won bulan ini?",
  "Berapa rata-rata lead score?",
];

export default function AIPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (question: string) => {
    if (!question.trim()) return;
    setInput("");
    setLoading(true);

    const userMsg: ChatMessage = { role: "user", content: question, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await askAI(question);
      const data = response as { explanation?: string; results?: unknown[]; sql?: string; success?: boolean };
      
      const answer = data.success
        ? `${data.explanation || "Berikut hasilnya:"}\n\nDitemukan ${(data.results as unknown[])?.length || 0} hasil.`
        : "Maaf, saya tidak bisa memproses pertanyaan tersebut. Coba dengan pertanyaan lain.";

      setMessages((prev) => [...prev, { role: "assistant", content: answer, sql: data.sql, timestamp: new Date() }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "⚠️ Tidak bisa terhubung ke server. Pastikan backend n8n sudah running dan API URL sudah dikonfigurasi.",
        timestamp: new Date(),
      }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl">
      <div className="mb-4">
        <h1 className="page-title">AI Assistant</h1>
        <p className="page-subtitle">Tanya apapun tentang data bisnis Anda dalam bahasa natural</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-5xl mb-4">🤖</span>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Halo! Saya AI Assistant GreeVo</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md">
              Tanya saya tentang leads, deals, keyword rankings, atau data bisnis lainnya.
            </p>
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {exampleQuestions.map((q) => (
                <button key={q} onClick={() => handleSend(q)} className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300 hover:border-brand-500 hover:text-brand-600 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === "user"
                ? "bg-brand-600 text-white"
                : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              {msg.sql && (
                <pre className="mt-3 bg-gray-900 text-green-400 p-3 rounded-xl text-xs overflow-x-auto">
                  {msg.sql}
                </pre>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-2 shadow-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSend(input)}
          placeholder="Ketik pertanyaan..."
          className="flex-1 px-3 py-2 bg-transparent outline-none text-sm dark:text-gray-200 placeholder:text-gray-400"
          disabled={loading}
        />
        <button
          onClick={() => handleSend(input)}
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 disabled:opacity-40 transition-all"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
