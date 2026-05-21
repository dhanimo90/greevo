import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800", className)} />;
}

export function KPICardSkeleton() {
  return (
    <div className="card card-body space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-12 h-5 rounded-lg" />
      </div>
      <div className="space-y-2 mt-3">
        <Skeleton className="w-24 h-7" />
        <Skeleton className="w-32 h-4" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-6">
      <Skeleton className="w-full h-8" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="w-full h-12" />
      ))}
    </div>
  );
}
