"use client";
import { useState } from "react";

const notifications = [
  { id: 1, title: "Hot Lead Alert", message: "Budi Santoso (PT Maju) reached score 85", time: "2m ago", read: false, type: "lead" },
  { id: 2, title: "Deal Won!", message: "PT Acme - Standard package closed at Rp 180M", time: "1h ago", read: false, type: "deal" },
  { id: 3, title: "SEO Alert", message: "Keyword 'crm terbaik' dropped 3 positions", time: "3h ago", read: true, type: "seo" },
  { id: 4, title: "System", message: "Weekly backup completed successfully", time: "5h ago", read: true, type: "system" },
  { id: 5, title: "Campaign", message: "A/B test winner selected: Variant B", time: "6h ago", read: true, type: "marketing" },
];

const typeIcons: Record<string, string> = {
  lead: "👤", deal: "💰", seo: "🔍", system: "⚙️", marketing: "📧",
};

export function NotificationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-14 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 animate-slide-up overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">Notifications</h3>
          <button className="text-xs text-brand-600 font-medium">Mark all read</button>
        </div>
        <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800">
          {notifications.map((n) => (
            <div key={n.id} className={`px-4 py-3 flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${!n.read ? "bg-brand-50/30 dark:bg-brand-900/10" : ""}`}>
              <span className="text-lg shrink-0">{typeIcons[n.type]}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{n.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-2" />}
            </div>
          ))}
        </div>
        <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800">
          <button className="text-xs text-brand-600 font-medium w-full text-center hover:text-brand-700">View all notifications</button>
        </div>
      </div>
    </>
  );
}
