import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  subtitle?: string;
  iconBg?: string;
}

export function KPICard({ title, value, change, icon, subtitle, iconBg = "bg-brand-50 dark:bg-brand-900/30" }: KPICardProps) {
  return (
    <div className="card card-body group hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg", iconBg)}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-md",
            change >= 0 ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
          )}>
            <span>{change >= 0 ? "↑" : "↓"}</span>
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-[22px] font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 font-medium">{title}</p>
        {subtitle && <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
