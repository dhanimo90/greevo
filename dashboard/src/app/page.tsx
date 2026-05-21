"use client";
import { KPICard } from "@/components/kpi-card";
import { BarChart, DonutChart, SparkLine } from "@/components/chart-card";
import { formatCurrency, formatNumber } from "@/lib/utils";

const dashboardData = {
  crm: { new_leads_7d: 47, total_customers: 234, hot_leads: 18, avg_lead_score: 42 },
  sales: { active_deals: 23, pipeline_value: 1250000000, revenue_mtd: 450000000, revenue_growth_percent: 12, win_rate: 34 },
  seo: { tracked_keywords: 156, top10_keywords: 42, top3_keywords: 11, total_backlinks: 892, new_backlinks_7d: 14 },
  operations: { emails_sent_mtd: 12450, delivery_rate: 97.2, open_rate: 24.8, error_rate: 0.3 },
};

const weeklyLeads = [
  { label: "Mon", value: 8 }, { label: "Tue", value: 12 }, { label: "Wed", value: 6 },
  { label: "Thu", value: 15 }, { label: "Fri", value: 9 }, { label: "Sat", value: 3 }, { label: "Sun", value: 2 },
];

const revenueSparkline = [120, 180, 150, 220, 280, 310, 290, 350, 380, 420, 450, 430];

const pipelineStages = [
  { label: "Prospect", value: 8, color: "bg-slate-400" },
  { label: "Qualify", value: 5, color: "bg-blue-500" },
  { label: "Proposal", value: 6, color: "bg-purple-500" },
  { label: "Negotiate", value: 4, color: "bg-amber-500" },
];

const recentActivity = [
  { message: "New lead: Budi Santoso from PT Maju", time: "2m", icon: "👤", color: "bg-blue-100" },
  { message: "Deal 'Enterprise Co' moved to Negotiation", time: "15m", icon: "💰", color: "bg-green-100" },
  { message: "Keyword 'crm terbaik' moved to #2", time: "1h", icon: "📈", color: "bg-purple-100" },
  { message: "Welcome series sent to 12 contacts", time: "2h", icon: "📧", color: "bg-orange-100" },
  { message: "Backlink lost from techblog.com (DR 52)", time: "3h", icon: "⚠️", color: "bg-red-100" },
  { message: "A/B test winner: Variant B (+12% open rate)", time: "4h", icon: "🏆", color: "bg-yellow-100" },
];

const topKeywords = [
  { keyword: "crm terbaik", position: 2, change: 1 },
  { keyword: "jasa seo jakarta", position: 3, change: 2 },
  { keyword: "marketing automation", position: 5, change: -1 },
  { keyword: "lead generation", position: 7, change: 3 },
  { keyword: "email marketing platform", position: 9, change: 0 },
];

export default function DashboardPage() {
  const { crm, sales, seo, operations } = dashboardData;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Selamat pagi! Berikut overview performa bisnis Anda.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-xs">Last 7 days</button>
          <button className="btn-primary text-xs">Export PDF</button>
        </div>
      </div>

      {/* KPI Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard color="blue" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>} title="New Leads (7d)" value={formatNumber(crm.new_leads_7d)} change={8} />
        <KPICard color="green" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} title="Revenue MTD" value={formatCurrency(sales.revenue_mtd)} change={sales.revenue_growth_percent} />
        <KPICard color="purple" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} title="Win Rate" value={`${sales.win_rate}%`} subtitle={`${sales.active_deals} active deals`} />
        <KPICard color="orange" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>} title="Hot Leads" value={formatNumber(crm.hot_leads)} subtitle="Score ≥ 80" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Leads Chart */}
        <div className="card card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Leads This Week</h3>
            <span className="text-xs text-gray-400">Total: {weeklyLeads.reduce((s, d) => s + d.value, 0)}</span>
          </div>
          <BarChart data={weeklyLeads.map(d => ({ ...d, color: "bg-brand-500" }))} height={140} />
        </div>

        {/* Revenue Trend */}
        <div className="card card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Revenue Trend</h3>
            <span className="text-xs text-emerald-600 font-medium">+12% vs last month</span>
          </div>
          <div className="flex items-center justify-center py-6">
            <SparkLine data={revenueSparkline} color="text-emerald-500" />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>12 months ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Pipeline Donut */}
        <div className="card card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Pipeline Health</h3>
            <span className="text-xs text-gray-400">{formatCurrency(sales.pipeline_value)}</span>
          </div>
          <div className="flex items-center justify-around py-2">
            <DonutChart value={sales.active_deals} max={40} color="#3b82f6" label="Capacity" />
            <DonutChart value={sales.win_rate} max={100} color="#10b981" label="Win Rate" />
            <DonutChart value={operations.delivery_rate} max={100} color="#8b5cf6" label="Email DR" />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>
            <button className="text-xs text-brand-600 font-medium hover:text-brand-700">View all →</button>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {recentActivity.map((a, i) => (
              <div key={i} className="px-6 py-3 flex items-center gap-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-sm shrink-0`}>{a.icon}</div>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 truncate">{a.message}</p>
                <span className="text-xs text-gray-400 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Keywords */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">Top Keywords</h3>
            <button className="text-xs text-brand-600 font-medium hover:text-brand-700">See all →</button>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {topKeywords.map((kw, i) => (
              <div key={i} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold">#{kw.position}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">{kw.keyword}</span>
                </div>
                <span className={`text-xs font-semibold ${kw.change > 0 ? "text-emerald-600" : kw.change < 0 ? "text-red-500" : "text-gray-400"}`}>
                  {kw.change > 0 ? `▲ +${kw.change}` : kw.change < 0 ? `▼ ${kw.change}` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
