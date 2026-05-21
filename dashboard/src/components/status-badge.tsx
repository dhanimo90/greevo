import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  new: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  contacted: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  qualified: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  opportunity: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  customer: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  lost: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  active: "bg-emerald-50 text-emerald-700",
  completed: "bg-slate-100 text-slate-600",
  testing: "bg-amber-50 text-amber-700",
  draft: "bg-blue-50 text-blue-700",
  pending: "bg-yellow-50 text-yellow-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn("badge", variants[status] || variants.new, className)}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
