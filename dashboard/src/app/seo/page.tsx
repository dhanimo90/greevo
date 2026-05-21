"use client";
import { KPICard } from "@/components/kpi-card";
import { DataTable } from "@/components/data-table";

const keywords = [
  { keyword: "jasa seo jakarta", position: 3, previous: 5, change: 2, volume: 2400 },
  { keyword: "marketing automation indonesia", position: 7, previous: 7, change: 0, volume: 1800 },
  { keyword: "crm terbaik", position: 2, previous: 3, change: 1, volume: 3200 },
  { keyword: "email marketing platform", position: 12, previous: 9, change: -3, volume: 1500 },
  { keyword: "lead generation tools", position: 5, previous: 8, change: 3, volume: 2100 },
  { keyword: "digital marketing agency", position: 18, previous: 22, change: 4, volume: 4500 },
  { keyword: "seo monitoring tool", position: 4, previous: 4, change: 0, volume: 900 },
  { keyword: "workflow automation", position: 9, previous: 11, change: 2, volume: 1200 },
];

export default function SEOPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">SEO Monitoring</h1>
        <p className="text-gray-500 mt-1">Keyword rankings & backlink performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon="🔍" title="Tracked Keywords" value="156" />
        <KPICard icon="🥇" title="Top 3" value="11" change={2} />
        <KPICard icon="📍" title="Top 10" value="42" change={5} />
        <KPICard icon="🔗" title="Backlinks" value="892" subtitle="+14 this week" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Keyword Rankings</h2>
        <DataTable
          data={keywords}
          columns={[
            { key: "keyword" as never, label: "Keyword", render: (v) => <span className="font-medium">{String(v)}</span> },
            { key: "position" as never, label: "Position", render: (v) => <span className="font-bold text-brand-600">#{String(v)}</span> },
            { key: "change" as never, label: "Change", render: (v) => {
              const n = Number(v);
              if (n > 0) return <span className="text-green-600 font-medium">▲ +{n}</span>;
              if (n < 0) return <span className="text-red-600 font-medium">▼ {n}</span>;
              return <span className="text-gray-400">—</span>;
            }},
            { key: "volume" as never, label: "Volume", render: (v) => <span>{Number(v).toLocaleString()}</span> },
          ]}
        />
      </div>
    </div>
  );
}
