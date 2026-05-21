"use client";
import { formatCurrency } from "@/lib/utils";

const stages = [
  { name: "Prospecting", deals: [
    { id: 1, name: "PT Maju - SEO Package", value: 50000000, contact: "Budi S.", days: 5 },
    { id: 2, name: "Globex - Marketing Auto", value: 120000000, contact: "Jane S.", days: 12 },
  ]},
  { name: "Qualification", deals: [
    { id: 3, name: "TechFirm - Full Suite", value: 250000000, contact: "Alex W.", days: 8 },
  ]},
  { name: "Proposal", deals: [
    { id: 4, name: "Enterprise Co - Enterprise", value: 500000000, contact: "Siti R.", days: 15 },
    { id: 5, name: "StartupID - Starter", value: 30000000, contact: "Andi P.", days: 3 },
  ]},
  { name: "Negotiation", deals: [
    { id: 6, name: "PT Acme - Standard", value: 180000000, contact: "John D.", days: 22 },
  ]},
];

const stageColors = ["bg-gray-100", "bg-blue-50", "bg-purple-50", "bg-yellow-50"];

export default function DealsPage() {
  const totalValue = stages.flatMap(s => s.deals).reduce((sum, d) => sum + d.value, 0);
  const totalDeals = stages.flatMap(s => s.deals).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-500 mt-1">{totalDeals} deals · {formatCurrency(totalValue)} total pipeline</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700">+ New Deal</button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage, i) => (
          <div key={stage.name} className={`rounded-xl p-4 ${stageColors[i]}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700 text-sm">{stage.name}</h3>
              <span className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-500 font-medium">{stage.deals.length}</span>
            </div>
            <div className="space-y-2">
              {stage.deals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                  <p className="font-medium text-sm text-gray-800 truncate">{deal.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{deal.contact}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-brand-600">{formatCurrency(deal.value)}</span>
                    <span className="text-xs text-gray-400">{deal.days}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
