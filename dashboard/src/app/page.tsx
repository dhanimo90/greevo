"use client";
import { KPICard } from "@/components/kpi-card";
import { formatCurrency, formatNumber } from "@/lib/utils";

const weeklyLeads = [
  { label: "Mon", value: 8 }, { label: "Tue", value: 12 }, { label: "Wed", value: 6 },
  { label: "Thu", value: 15 }, { label: "Fri", value: 9 }, { label: "Sat", value: 3 }, { label: "Sun", value: 2 },
];

const recentActivity = [
  { message: "New lead: Budi Santoso from PT Maju", time: "2m", icon: "👤", color: "bg-blue-50 dark:bg-blue-900/20" },
  { message: "Deal 'Enterprise Co' moved to Negotiation", time: "15m", icon: "💰", color: "bg-emerald-50 dark:bg-emerald-900/20" },
  { message: "Keyword 'crm terbaik' moved to #2", time: "1h", icon: "📈", color: "bg-purple-50 dark:bg-purple-900/20" },
  { message: "Welcome series sent to 12 contacts", time: "2h", icon: "📧", color: "bg-orange-50 dark:bg-orange-900/20" },
  { message: "A/B test winner: Variant B (+12% open rate)", time: "4h", icon: "🏆", color: "bg-yellow-50 dark:bg-yellow-900/20" },
];

const topKeywords = [
  { keyword: "crm terbaik", position: 2, change: 1 },
  { keyword: "jasa seo jakarta", position: 3, change: 2 },
  { keyword: "marketing automation", position: 5, change: -1 },
  { keyword: "lead generation", position: 7, change: 3 },
  { keyword: "email marketing platform", position: 9, change: 0 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-7 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview performa bisnis Anda hari ini</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-[12px]">Last 7 days</button>
          <button className="btn-primary text-[12px]">Export</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon="👥" title="New Leads (7d)" value={formatNumber(47)} change={8} iconBg="bg-blue-50 dark:bg-blue-900/20" />
        <KPICard icon="💰" title="Revenue MTD" value={formatCurrency(450000000)} change={12} iconBg="bg-emerald-50 dark:bg-emerald-900/20" />
        <KPICard icon="🎯" title="Win Rate" value="34%" subtitle="23 active deals" iconBg="bg-purple-50 dark:bg-purple-900/20" />
        <KPICard icon="🔥" title="Hot Leads" value="18" subtitle="Score ≥ 80" iconBg="bg-orange-50 dark:bg-orange-900/20" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Leads */}
        <div className="card card-body">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">Leads This Week</h3>
            <span className="text-[11px] text-gray-400">Total: 55</span>
          </div>
          <div className="flex items-end gap-[6px] h-[120px]">
            {weeklyLeads.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-[10px] text-gray-400 font-medium">{d.value}</span>
                <div className="w-full rounded-md bg-[#6C5CE7]/80 hover:bg-[#6C5CE7] transition-colors" style={{ height: `${(d.value / 15) * 100}%`, minHeight: 4 }} />
                <span className="text-[10px] text-gray-400">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="card card-body">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">Pipeline</h3>
            <span className="text-[11px] text-gray-400">{formatCurrency(1250000000)}</span>
          </div>
          <div className="space-y-3">
            {[
              { stage: "Prospecting", count: 8, pct: 35, color: "bg-gray-300" },
              { stage: "Qualification", count: 5, pct: 22, color: "bg-blue-400" },
              { stage: "Proposal", count: 6, pct: 26, color: "bg-[#6C5CE7]" },
              { stage: "Negotiation", count: 4, pct: 17, color: "bg-emerald-500" },
            ].map((s) => (
              <div key={s.stage} className="flex items-center gap-3">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 w-24 truncate">{s.stage}</span>
                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300 w-6 text-right">{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card card-body">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">Email & SEO</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Emails Sent", value: "12.4K", sub: "MTD" },
              { label: "Open Rate", value: "24.8%", sub: "+3%" },
              { label: "Top 10 KW", value: "42", sub: "/156" },
              { label: "Backlinks", value: "892", sub: "+14" },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-[#F8F9FC] dark:bg-[#22252F]">
                <p className="text-[16px] font-bold text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
                <p className="text-[10px] text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activity */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">Recent Activity</h3>
            <button className="text-[11px] text-[#6C5CE7] font-medium hover:underline">View all</button>
          </div>
          <div className="divide-y divide-[#E8ECF4] dark:divide-[#2A2D36]">
            {recentActivity.map((a, i) => (
              <div key={i} className="px-6 py-3 flex items-center gap-3 hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] transition-colors">
                <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-sm shrink-0`}>{a.icon}</div>
                <p className="text-[12px] text-gray-600 dark:text-gray-300 flex-1 truncate">{a.message}</p>
                <span className="text-[11px] text-gray-400 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Keywords */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">Top Keywords</h3>
            <button className="text-[11px] text-[#6C5CE7] font-medium hover:underline">See all</button>
          </div>
          <div className="divide-y divide-[#E8ECF4] dark:divide-[#2A2D36]">
            {topKeywords.map((kw, i) => (
              <div key={i} className="px-6 py-3 flex items-center justify-between hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#6C5CE7]/10 text-[#6C5CE7] flex items-center justify-center text-[10px] font-bold">#{kw.position}</span>
                  <span className="text-[12px] text-gray-700 dark:text-gray-200 font-medium">{kw.keyword}</span>
                </div>
                <span className={`text-[11px] font-semibold ${kw.change > 0 ? "text-emerald-500" : kw.change < 0 ? "text-red-500" : "text-gray-400"}`}>
                  {kw.change > 0 ? `↑ +${kw.change}` : kw.change < 0 ? `↓ ${kw.change}` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
