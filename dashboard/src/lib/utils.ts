import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "IDR") {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}
