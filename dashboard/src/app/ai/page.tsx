"use client";
import { useState } from "react";

export default function AIPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<{ question: string; answer: string; sql?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const exampleQuestions = [
    "Berapa total leads yang masuk bulan ini?",
    "Siapa 5 contact dengan score tertinggi?",
    "Keyword apa yang ranking di top 3?",
    "Berapa total deal value yang closed won bulan ini?",
    "Berapa rata-rata lead score semua contacts?",
  ];

  const handleAsk = async (q: string) => {
    setLoading(true);
    setQuestion(q);
    // Demo response — in production, call /webhook/ai/ask
    setTimeout(() => {
      setResponse({
        question: q,
        answer: "Berdasarkan data, total leads yang masuk bulan ini adalah 47 contacts dari berbagai sumber (website: 23, referral: 12, social: 8, event: 4).",
        sql: "SELECT COUNT(*) FROM contacts WHERE created_at > date_trunc('month', NOW())",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
        <p className="text-gray-500 mt-1">Tanya apapun tentang data bisnis Anda dalam bahasa natural</p>
      </div>

      {/* Input */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && question && handleAsk(question)}
            placeholder="Tanya sesuatu... contoh: Berapa leads bulan ini?"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            onClick={() => question && handleAsk(question)}
            disabled={loading || !question}
            className="px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "⏳" : "Tanya"}
          </button>
        </div>

        {/* Example questions */}
        <div className="mt-4 flex flex-wrap gap-2">
          {exampleQuestions.map((q) => (
            <button key={q} onClick={() => handleAsk(q)} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition-colors">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Response */}
      {response && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">Pertanyaan:</p>
            <p className="text-gray-800 font-medium">{response.question}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Jawaban:</p>
            <p className="text-gray-800">{response.answer}</p>
          </div>
          {response.sql && (
            <div>
              <p className="text-sm text-gray-500 font-medium">SQL Query:</p>
              <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs overflow-x-auto">{response.sql}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
