"use client";
import { KPICard } from "@/components/kpi-card";

const campaigns = [
  { name: "Welcome Series", type: "Automation", status: "active", sent: 1240, opened: 412, clicked: 89, open_rate: 33.2 },
  { name: "Nurture - Q1 2025", type: "Nurture", status: "active", sent: 3200, opened: 864, clicked: 192, open_rate: 27.0 },
  { name: "Re-engagement Feb", type: "Re-engagement", status: "completed", sent: 890, opened: 178, clicked: 34, open_rate: 20.0 },
  { name: "Promo Akhir Tahun", type: "Promotional", status: "completed", sent: 5400, opened: 1620, clicked: 432, open_rate: 30.0 },
  { name: "A/B Test - Subject Lines", type: "A/B Test", status: "testing", sent: 200, opened: 68, clicked: 15, open_rate: 34.0 },
];

const statusBadge: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  testing: "bg-yellow-100 text-yellow-700",
  draft: "bg-blue-100 text-blue-700",
};

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
          <p className="text-gray-500 mt-1">Email campaigns & automation</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700">+ New Campaign</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon="📧" title="Emails Sent MTD" value="12,450" change={15} />
        <KPICard icon="👁️" title="Avg Open Rate" value="27.4%" change={3} />
        <KPICard icon="🖱️" title="Avg Click Rate" value="6.2%" />
        <KPICard icon="🚫" title="Unsubscribe Rate" value="0.3%" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700">Campaigns</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {campaigns.map((c) => (
            <div key={c.name} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{c.type}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <p className="text-gray-700 font-medium">{c.sent.toLocaleString()} sent</p>
                  <p className="text-xs text-gray-400">{c.open_rate}% open rate</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge[c.status]}`}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
