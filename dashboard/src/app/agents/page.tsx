"use client";
import { useState } from "react";

type AgentCategory = "all" | "marketing" | "sales" | "seo" | "analytics" | "support";

interface Agent {
  id: string;
  name: string;
  description: string;
  category: AgentCategory;
  icon: string;
  status: "active" | "inactive" | "coming_soon";
  features: string[];
  schedule?: string;
  certified?: boolean;
}

const agents: Agent[] = [
  {
    id: "lead-scorer",
    name: "Lead Scoring Agent",
    description: "Otomatis hitung dan update lead score berdasarkan aktivitas, profil, dan engagement pattern.",
    category: "sales",
    icon: "🎯",
    status: "active",
    features: ["Auto-recalculate setiap jam", "Decay score untuk inaktif", "Hot lead alert ke Slack"],
    schedule: "Every hour",
    certified: true,
  },
  {
    id: "email-nurture",
    name: "Email Nurture Agent",
    description: "Kirim email nurture series otomatis berdasarkan stage dan behavior kontak.",
    category: "marketing",
    icon: "📧",
    status: "active",
    features: ["5-step nurture series", "Personalisasi dinamis", "Auto-stop jika converted"],
    schedule: "Weekdays 9 AM",
    certified: true,
  },
  {
    id: "seo-monitor",
    name: "SEO Monitoring Agent",
    description: "Track keyword rankings, backlinks, dan site health setiap hari. Alert jika ada perubahan signifikan.",
    category: "seo",
    icon: "🔍",
    status: "active",
    features: ["Daily rank check", "Backlink new/lost detection", "Core Web Vitals monitoring"],
    schedule: "Daily 6 AM",
    certified: true,
  },
  {
    id: "deal-pipeline",
    name: "Deal Pipeline Agent",
    description: "Auto-advance deals berdasarkan aktivitas. Detect stale deals dan alert sales team.",
    category: "sales",
    icon: "💰",
    status: "active",
    features: ["Auto stage advancement", "Stale deal detection", "Win probability update"],
    schedule: "Every 2 hours",
  },
  {
    id: "ai-copywriter",
    name: "AI Copywriter Agent",
    description: "Generate email subject lines, body copy, dan social media posts menggunakan AI.",
    category: "marketing",
    icon: "✍️",
    status: "active",
    features: ["Subject line generator", "Email body writer", "Tone customization per client"],
    certified: true,
  },
  {
    id: "churn-predictor",
    name: "Churn Prediction Agent",
    description: "Prediksi customer yang berisiko churn berdasarkan engagement patterns. Recommend actions.",
    category: "analytics",
    icon: "⚠️",
    status: "active",
    features: ["Weekly risk scoring", "Activity decline detection", "Auto re-engagement trigger"],
    schedule: "Weekly Monday",
  },
  {
    id: "competitor-spy",
    name: "Competitor Intelligence Agent",
    description: "Monitor keyword rankings kompetitor, identifikasi content gaps, dan peluang baru.",
    category: "seo",
    icon: "🕵️",
    status: "active",
    features: ["Weekly competitor scan", "Content gap analysis", "SERP feature tracking"],
    schedule: "Weekly Monday",
  },
  {
    id: "chatbot",
    name: "Website Chatbot Agent",
    description: "AI chatbot untuk website. Jawab pertanyaan visitor, detect intent, auto-create lead.",
    category: "support",
    icon: "💬",
    status: "active",
    features: ["Natural language AI", "Intent detection", "Auto lead creation", "Human handoff"],
    certified: true,
  },
  {
    id: "report-generator",
    name: "Report Generator Agent",
    description: "Generate dan kirim laporan otomatis (SEO weekly, marketing monthly, sales forecast).",
    category: "analytics",
    icon: "📊",
    status: "active",
    features: ["Weekly SEO report", "Monthly marketing report", "Sales forecast", "Executive dashboard"],
    schedule: "Scheduled",
  },
  {
    id: "social-poster",
    name: "Social Media Agent",
    description: "Auto-post ke LinkedIn, Twitter/X, Facebook pada jadwal optimal.",
    category: "marketing",
    icon: "📱",
    status: "active",
    features: ["Multi-platform posting", "Scheduled posts", "Hashtag optimization"],
    schedule: "3x daily weekdays",
  },
  {
    id: "ab-tester",
    name: "A/B Testing Agent",
    description: "Jalankan A/B test otomatis, determine winner, dan kirim ke remaining audience.",
    category: "marketing",
    icon: "🧪",
    status: "active",
    features: ["Auto split audience", "Statistical significance check", "Auto-send winner"],
    schedule: "On-demand",
  },
  {
    id: "smart-segment",
    name: "Smart Segmentation Agent",
    description: "Auto-cluster kontak ke segments berdasarkan behavior dan engagement patterns.",
    category: "analytics",
    icon: "🧠",
    status: "active",
    features: ["6 auto-segments", "Weekly re-clustering", "Auto-tagging"],
    schedule: "Weekly Sunday",
  },
  {
    id: "invoice-agent",
    name: "Invoice & Payment Agent",
    description: "Generate invoice otomatis, track payment, kirim reminder untuk overdue.",
    category: "sales",
    icon: "🧾",
    status: "coming_soon",
    features: ["Auto invoice generation", "Payment tracking", "Overdue reminders"],
  },
  {
    id: "review-manager",
    name: "Review & Reputation Agent",
    description: "Monitor online reviews, respond otomatis, dan alert untuk review negatif.",
    category: "support",
    icon: "⭐",
    status: "coming_soon",
    features: ["Google review monitoring", "Auto-response templates", "Sentiment analysis"],
  },
];

const categories: { key: AgentCategory; label: string }[] = [
  { key: "all", label: "All Agents" },
  { key: "marketing", label: "Marketing" },
  { key: "sales", label: "Sales" },
  { key: "seo", label: "SEO" },
  { key: "analytics", label: "Analytics" },
  { key: "support", label: "Support" },
];

export default function AgentsPage() {
  const [activeCategory, setActiveCategory] = useState<AgentCategory>("all");
  const [search, setSearch] = useState("");

  const filtered = agents.filter((a) => {
    const matchCategory = activeCategory === "all" || a.category === activeCategory;
    const matchSearch = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const activeCount = agents.filter(a => a.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">AI Agents</h1>
          <p className="page-subtitle">{activeCount} agents active · Automasi bisnis Anda 24/7</p>
        </div>
      </div>

      {/* Search + Categories */}
      <div className="space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search agents..."
          className="input-field max-w-md"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-[12px] font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-[#6C5CE7] text-white shadow-sm"
                  : "bg-white dark:bg-[#1A1D26] border border-[#E8ECF4] dark:border-[#2A2D36] text-gray-600 dark:text-gray-300 hover:border-[#6C5CE7]/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((agent) => (
          <div key={agent.id} className={`card card-body relative group ${agent.status === "coming_soon" ? "opacity-60" : ""}`}>
            {/* Status badge */}
            <div className="absolute top-4 right-4">
              {agent.certified && (
                <span className="badge bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 text-[10px]">✓ Certified</span>
              )}
              {agent.status === "coming_soon" && (
                <span className="badge bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 text-[10px]">Coming Soon</span>
              )}
            </div>

            {/* Icon + Name */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#F8F9FC] dark:bg-[#22252F] flex items-center justify-center text-xl shrink-0">
                {agent.icon}
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-white">{agent.name}</h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 capitalize">{agent.category}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed mb-3">{agent.description}</p>

            {/* Features */}
            <div className="space-y-1.5 mb-4">
              {agent.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                  <span className="w-1 h-1 rounded-full bg-[#6C5CE7]" />
                  {f}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E8ECF4] dark:border-[#2A2D36]">
              {agent.schedule && (
                <span className="text-[10px] text-gray-400">⏰ {agent.schedule}</span>
              )}
              {agent.status === "active" ? (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Active</span>
                </div>
              ) : agent.status === "coming_soon" ? (
                <button className="text-[11px] text-[#6C5CE7] font-medium" disabled>Coming Soon</button>
              ) : (
                <button className="text-[11px] text-[#6C5CE7] font-medium hover:underline">Activate</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
