"use client";
import { KPICard } from "@/components/kpi-card";
import { formatCurrency, formatNumber } from "@/lib/utils";

const dashboardData = {
  crm: { new_leads_7d: 47, total_customers: 234, hot_leads: 18, avg_lead_score: 42 },
  sales: { active_deals: 23, pipeline_value: 1250000000, revenue_mtd: 450000000, revenue_growth_percent: 12, win_rate: 34 },
  seo: { tracked_keywords: 156, top10_keywords: 42, top3_keywords: 11, total_backlinks: 892, new_backlinks_7d: 14 },
  operations: { emails_sent_mtd: 12450, delivery_rate: 97.2, open_rate: 24.8, error_rate: 0.3 },
};

const recentActivity = [
  { type: "lead", message: "New lead: Budi Santoso from PT Maju", time: "2 min ago", icon: "👤" },
  { type: "deal", message: "Deal 'Enterprise Co' moved to Negotiation", time: "15 min ago", icon: "💰" },
  { type: "seo", message: "Keyword 'crm terbaik' moved to #2", time: "1 hour ago", icon: "📈" },
  { type: "email", message: "Welcome series sent to 12 contacts", time: "2 hours ago", icon: "📧" },
  { type: "alert", message: "Backlink lost from techblog.com (DR 52)", time: "3 hours ago", icon: "⚠️" },
];

export default function DashboardPage() {
  const { crm, sales, seo, operations } = dashboardData;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Selamat pagi! Berikut overview performa bisnis Anda hari ini.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-xs">Last 7 days</button>
          <button className="btn-primary text-xs">Export</button>
        </div>
      </div>

      {/* CRM & Sales */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">CRM & Sales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard color="blue" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>} title="New Leads (7d)" value={formatNumber(crm.new_leads_7d)} change={8} />
          <KPICard color="orange" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/></svg>} title="Hot Leads" value={formatNumber(crm.hot_leads)} subtitle="Score ≥ 80" />
          <KPICard color="green" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} title="Revenue MTD" value={formatCurrency(sales.revenue_mtd)} change={sales.revenue_growth_percent} />
          <KPICard color="purple" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} title="Win Rate" value={`${sales.win_rate}%`} subtitle={`${sales.active_deals} active deals`} />
        </div>
      </section>

      {/* SEO & Marketing */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">SEO & Marketing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard color="blue" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>} title="Top 10 Keywords" value={formatNumber(seo.top10_keywords)} change={5} subtitle={`of ${seo.tracked_keywords} tracked`} />
          <KPICard color="green" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"/></svg>} title="Backlinks" value={formatNumber(seo.total_backlinks)} subtitle={`+${seo.new_backlinks_7d} this week`} />
          <KPICard color="purple" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>} title="Emails Sent MTD" value={formatNumber(operations.emails_sent_mtd)} change={15} />
          <KPICard color="slate" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>} title="Open Rate" value={`${operations.open_rate}%`} subtitle={`DR: ${operations.delivery_rate}%`} />
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="font-semibold text-gray-700">Recent Activity</h2>
            <button className="text-xs text-brand-600 font-medium hover:text-brand-700">View all</button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((activity, i) => (
              <div key={i} className="px-6 py-3.5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                <span className="text-xl w-8 text-center">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{activity.message}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
