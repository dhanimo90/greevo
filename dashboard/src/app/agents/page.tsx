"use client";

interface AgentCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
}

interface HeroCard {
  title: string;
  gradient: string;
}

interface Section {
  title: string;
  hero: HeroCard;
  featured: AgentCard;
  agents: AgentCard[];
  certified?: { title: string; description: string };
}

const sections: Section[] = [
  {
    title: "Marketing Automation",
    hero: { title: "Campaigns – without manual work.", gradient: "from-purple-200 via-purple-100 to-indigo-100" },
    featured: { id: "nurture", name: "Email Nurture Agent", description: "Auto-sends personalized nurture series based on lead behavior and funnel stage.", icon: "📧", iconBg: "bg-purple-100" },
    agents: [
      { id: "copywriter", name: "AI Copywriter", description: "Generates subject lines, email body, and social posts using AI.", icon: "✍️", iconBg: "bg-orange-100" },
      { id: "ab-test", name: "A/B Testing Agent", description: "Splits audience, tests variants, and auto-sends the winner.", icon: "🧪", iconBg: "bg-pink-100" },
    ],
    certified: { title: "Custom agents built and maintained for you", description: "Let GreeVo experts map your marketing workflows and design bespoke agents." },
  },
  {
    title: "Sales & CRM",
    hero: { title: "Close deals – on autopilot.", gradient: "from-emerald-200 via-emerald-100 to-teal-100" },
    featured: { id: "pipeline", name: "Deal Pipeline Agent", description: "Auto-advances deals based on activity. Detects stale deals and alerts your team.", icon: "💰", iconBg: "bg-emerald-100" },
    agents: [
      { id: "lead-scorer", name: "Lead Scoring Agent", description: "Calculates and updates lead scores every hour based on engagement patterns.", icon: "🎯", iconBg: "bg-blue-100" },
      { id: "assignment", name: "Lead Router", description: "Assigns qualified leads to the right sales rep by territory and specialty.", icon: "🔀", iconBg: "bg-indigo-100" },
      { id: "forecast", name: "Sales Forecaster", description: "Weekly pipeline forecast with win probability and rep leaderboard.", icon: "📊", iconBg: "bg-violet-100" },
    ],
  },
  {
    title: "SEO & Content",
    hero: { title: "Rank higher – effortlessly.", gradient: "from-blue-200 via-blue-100 to-cyan-100" },
    featured: { id: "seo-monitor", name: "SEO Monitoring Agent", description: "Tracks keyword rankings, backlinks, and site health daily. Alerts on significant changes.", icon: "🔍", iconBg: "bg-blue-100" },
    agents: [
      { id: "competitor", name: "Competitor Intel", description: "Weekly competitor keyword scan and content gap analysis.", icon: "🕵️", iconBg: "bg-slate-100" },
      { id: "cwv", name: "Core Web Vitals", description: "Monitors LCP, CLS, TBT via PageSpeed API. Alerts if poor.", icon: "⚡", iconBg: "bg-yellow-100" },
      { id: "content-gap", name: "Content Gap Finder", description: "Identifies keywords competitors rank for but you don't.", icon: "📝", iconBg: "bg-teal-100" },
    ],
  },
  {
    title: "Analytics & Intelligence",
    hero: { title: "Insights – delivered daily.", gradient: "from-rose-200 via-pink-100 to-orange-100" },
    featured: { id: "dashboard-agent", name: "Daily Briefer", description: "Summarizes today's KPIs and flags anomalies for stakeholders.", icon: "📋", iconBg: "bg-rose-100" },
    agents: [
      { id: "churn", name: "Churn Predictor", description: "Predicts at-risk customers and recommends retention actions.", icon: "⚠️", iconBg: "bg-amber-100" },
      { id: "segment", name: "Smart Segmentation", description: "Auto-clusters contacts into 6 behavior-based segments weekly.", icon: "🧠", iconBg: "bg-purple-100" },
      { id: "attribution", name: "Attribution Modeler", description: "Calculates revenue attribution across all marketing channels.", icon: "🔗", iconBg: "bg-cyan-100" },
    ],
  },
  {
    title: "Support & Engagement",
    hero: { title: "Always-on support.", gradient: "from-amber-200 via-yellow-100 to-orange-100" },
    featured: { id: "chatbot", name: "Website Chatbot", description: "AI-powered chatbot that answers questions, detects intent, and creates leads automatically.", icon: "💬", iconBg: "bg-amber-100" },
    agents: [
      { id: "whatsapp", name: "WhatsApp Agent", description: "Handles inbound WhatsApp messages with auto-reply and human handoff.", icon: "📱", iconBg: "bg-green-100" },
      { id: "telegram", name: "Telegram Bot", description: "Command-based bot for quick data access: /leads, /pipeline, /seo.", icon: "✈️", iconBg: "bg-blue-100" },
      { id: "onboarding", name: "Customer Onboarding", description: "6-step automated onboarding sequence after deal is won.", icon: "🚀", iconBg: "bg-indigo-100" },
    ],
  },
];

export default function AgentsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="page-title">AI Agents</h1>
        <p className="page-subtitle">Automasi bisnis Anda 24/7 dengan AI agents yang bekerja tanpa henti</p>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div key={section.title} className="space-y-4">
          <h2 className="text-[15px] font-semibold text-gray-800 dark:text-white">{section.title}</h2>

          {/* Top row: Hero + Featured */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Hero banner */}
            <div className={`lg:col-span-2 rounded-2xl bg-gradient-to-r ${section.hero.gradient} p-8 flex items-center min-h-[140px]`}>
              <h3 className="text-[20px] font-bold text-gray-800 leading-tight max-w-[280px]">{section.hero.title}</h3>
            </div>

            {/* Featured agent */}
            <div className="card card-body flex flex-col justify-between">
              <div>
                <div className={`w-9 h-9 rounded-xl ${section.featured.iconBg} flex items-center justify-center text-lg mb-3`}>
                  {section.featured.icon}
                </div>
                <h4 className="text-[13px] font-semibold text-gray-800 dark:text-white">{section.featured.name}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{section.featured.description}</p>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Bottom row: Agent cards + Certified */}
          <div className={`grid grid-cols-1 md:grid-cols-2 ${section.certified ? "lg:grid-cols-3" : `lg:grid-cols-${section.agents.length}`} gap-4`}>
            {section.agents.map((agent) => (
              <div key={agent.id} className="card card-body">
                <div className={`w-9 h-9 rounded-xl ${agent.iconBg} flex items-center justify-center text-lg mb-3`}>
                  {agent.icon}
                </div>
                <h4 className="text-[13px] font-semibold text-gray-800 dark:text-white">{agent.name}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{agent.description}</p>
              </div>
            ))}

            {/* Certified card */}
            {section.certified && (
              <div className="card card-body bg-gradient-to-br from-[#F8F9FC] to-white dark:from-[#22252F] dark:to-[#1A1D26] border-[#6C5CE7]/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[13px] font-semibold text-gray-800 dark:text-white">{section.certified.title}</h4>
                  <span className="badge bg-[#6C5CE7]/10 text-[#6C5CE7] text-[10px]">✓ Certified</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{section.certified.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
