import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  color?: "blue" | "green" | "purple" | "orange" | "red" | "slate";
}

const colorMap = {
  blue: "from-blue-500/10 to-blue-500/5 border-blue-100",
  green: "from-emerald-500/10 to-emerald-500/5 border-emerald-100",
  purple: "from-purple-500/10 to-purple-500/5 border-purple-100",
  orange: "from-orange-500/10 to-orange-500/5 border-orange-100",
  red: "from-red-500/10 to-red-500/5 border-red-100",
  slate: "from-slate-500/10 to-slate-500/5 border-slate-100",
};

const iconColorMap = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-emerald-100 text-emerald-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
  slate: "bg-slate-100 text-slate-600",
};

export function KPICard({ title, value, change, icon, subtitle, color = "blue" }: KPICardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-200 hover:shadow-card-hover", colorMap[color])}>
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconColorMap[color])}>
          {icon}
        </div>
        {change !== undefined && (
          <span className={cn(
            "inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg",
            change >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          )}>
            {change >= 0 ? (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17l5-5 5 5M7 7l5 5 5-5" /></svg>
            ) : (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 7l-5 5-5-5m0 10l5-5 5 5" /></svg>
            )}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
        <p className="text-sm text-gray-500 mt-1 font-medium">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
