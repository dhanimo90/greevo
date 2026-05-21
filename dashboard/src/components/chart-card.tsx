"use client";
import { cn } from "@/lib/utils";

interface ChartBarProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  height?: number;
}

export function BarChart({ data, maxValue, height = 160 }: ChartBarProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-2 justify-between" style={{ height }}>
      {data.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
          <span className="text-[10px] text-gray-500 font-medium">{item.value}</span>
          <div
            className={cn("w-full rounded-t-md transition-all duration-500 min-h-[4px]", item.color || "bg-brand-500")}
            style={{ height: `${(item.value / max) * 100}%` }}
          />
          <span className="text-[10px] text-gray-400">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

interface LinePoint {
  label: string;
  value: number;
}

export function SparkLine({ data, color = "text-brand-500" }: { data: number[]; color?: string }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = 120;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <svg width={w} height={h} className={cn("overflow-visible", color)}>
      <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

interface DonutProps {
  value: number;
  max: number;
  size?: number;
  color?: string;
  label?: string;
}

export function DonutChart({ value, max, size = 80, color = "#3b82f6", label }: DonutProps) {
  const percentage = (value / max) * 100;
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth="8" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000" />
      </svg>
      <span className="text-xs font-semibold text-gray-700">{Math.round(percentage)}%</span>
      {label && <span className="text-[10px] text-gray-400">{label}</span>}
    </div>
  );
}
