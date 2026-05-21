"use client";

const reports = [
  { name: "Weekly SEO Report", type: "SEO", frequency: "Weekly (Monday)", last_sent: "19 Mei 2026", channel: "Slack + Email" },
  { name: "Monthly Marketing Report", type: "Marketing", frequency: "Monthly (1st)", last_sent: "1 Mei 2026", channel: "Slack + Email" },
  { name: "Sales Forecast", type: "Sales", frequency: "Weekly (Monday)", last_sent: "19 Mei 2026", channel: "Slack" },
  { name: "Executive Dashboard", type: "KPI", frequency: "Daily (Weekdays)", last_sent: "21 Mei 2026", channel: "Slack" },
  { name: "Churn Risk Report", type: "Customer Success", frequency: "Weekly (Monday)", last_sent: "19 Mei 2026", channel: "Slack" },
  { name: "Campaign ROI", type: "Marketing", frequency: "Weekly (Monday)", last_sent: "19 Mei 2026", channel: "Slack" },
  { name: "Attribution Report", type: "Analytics", frequency: "Monthly (1st)", last_sent: "1 Mei 2026", channel: "Slack + Email" },
  { name: "Cohort Analysis", type: "Analytics", frequency: "Monthly (1st)", last_sent: "1 Mei 2026", channel: "Slack" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">Automated reports & shareable links</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700">+ Generate Report Link</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="divide-y divide-gray-100">
          {reports.map((r) => (
            <div key={r.name} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-sm">
                  {r.type.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.type} · {r.frequency}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{r.channel}</p>
                <p className="text-xs text-gray-400">Last: {r.last_sent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
