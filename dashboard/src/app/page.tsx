"use client";
import { KPICard } from "@/components/kpi-card";
import { formatCurrency, formatNumber } from "@/lib/utils";

// Demo data — in production, fetch from /portal/dashboard API
const dashboardData = {
  crm: { new_leads_7d: 47, total_customers: 234, hot_leads: 18, avg_lead_score: 42 },
  sales: { active_deals: 23, pipeline_value: 1250000000, revenue_mtd: 450000000, revenue_growth_percent: 12, win_rate: 34 },
  seo: { tracked_keywords: 156, top10_keywords: 42, top3_keywords: 11, total_backlinks: 892, new_backlinks_7d: 14 },
  operations: { emails_sent_mtd: 12450, delivery_rate: 97.2, open_rate: 24.8, error_rate: 0.3 },
};

export default function DashboardPage() {
  const { crm, sales, seo, operations } = dashboardData;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview performa bisnis Anda</p>
      </div>

      {/* CRM Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">CRM & Leads</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard icon="👥" title="New Leads (7d)" value={formatNumber(crm.new_leads_7d)} change={8} />
          <KPICard icon="🔥" title="Hot Leads" value={formatNumber(crm.hot_leads)} subtitle="Score ≥ 80" />
          <KPICard icon="🏆" title="Total Customers" value={formatNumber(crm.total_customers)} change={5} />
          <KPICard icon="📊" title="Avg Lead Score" value={crm.avg_lead_score} />
        </div>
      </section>

      {/* Sales Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Pipeline</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard icon="💰" title="Pipeline Value" value={formatCurrency(sales.pipeline_value)} subtitle={`${sales.active_deals} active deals`} />
          <KPICard icon="📈" title="Revenue MTD" value={formatCurrency(sales.revenue_mtd)} change={sales.revenue_growth_percent} />
          <KPICard icon="🎯" title="Win Rate" value={`${sales.win_rate}%`} />
          <KPICard icon="📋" title="Active Deals" value={formatNumber(sales.active_deals)} />
        </div>
      </section>

      {/* SEO Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">SEO Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard icon="🔍" title="Tracked Keywords" value={formatNumber(seo.tracked_keywords)} />
          <KPICard icon="🥇" title="Top 3 Keywords" value={formatNumber(seo.top3_keywords)} change={2} />
          <KPICard icon="🔗" title="Total Backlinks" value={formatNumber(seo.total_backlinks)} subtitle={`+${seo.new_backlinks_7d} this week`} />
          <KPICard icon="📍" title="Top 10 Keywords" value={formatNumber(seo.top10_keywords)} />
        </div>
      </section>

      {/* Operations Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Email & Operations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard icon="📧" title="Emails Sent MTD" value={formatNumber(operations.emails_sent_mtd)} />
          <KPICard icon="✅" title="Delivery Rate" value={`${operations.delivery_rate}%`} />
          <KPICard icon="👁️" title="Open Rate" value={`${operations.open_rate}%`} />
          <KPICard icon="⚙️" title="Error Rate" value={`${operations.error_rate}%`} subtitle="Last 24h" />
        </div>
      </section>
    </div>
  );
}
