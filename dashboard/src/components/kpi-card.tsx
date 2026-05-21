import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  subtitle?: string;
}

export function KPICard({ title, value, change, icon, subtitle }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        {change !== undefined && (
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
            {change >= 0 ? "+" : ""}{change}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
