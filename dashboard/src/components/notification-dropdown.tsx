"use client";
import { useState } from "react";

const notifications = [
  { id: 1, title: "Hot Lead Alert", message: "Budi Santoso reached score 85", time: "2 min", read: false, type: "lead" },
  { id: 2, title: "Deal Won!", message: "Globex Corp - Rp 500jt closed", time: "1 hour", read: false, type: "deal" },
  { id: 3, title: "SEO Alert", message: "Keyword 'crm terbaik' naik ke #2", time: "3 hour", read: false, type: "seo" },
  { id: 4, title: "Campaign Complete", message: "A/B test winner: Variant B", time: "5 hour", read: true, type: "marketing" },
  { id: 5, title: "System", message: "Weekly backup completed", time: "6 hour", read: true, type: "system" },
];

const typeIcons: Record<string, string> = { lead: "👤", deal: "💰", seo: "🔍", marketing: "📧", system: "⚙️" };

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter(n => !n.read).length;

  const markAllRead = () => {
    setItems(items.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded-lg hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] transition-colors">
        <svg className="w-[18px] h-[18px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#6C5CE7] rounded-full flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-white dark:ring-[#1A1D26]">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#1A1D26] border border-[#E8ECF4] dark:border-[#2A2D36] rounded-2xl shadow-xl z-50 overflow-hidden animate-slide-up">
            <div className="px-4 py-3 border-b border-[#E8ECF4] dark:border-[#2A2D36] flex items-center justify-between">
              <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-[11px] text-[#6C5CE7] font-medium hover:underline">Mark all read</button>
              )}
            </div>
            <div className="max-h-[320px] overflow-y-auto divide-y divide-[#E8ECF4] dark:divide-[#2A2D36]">
              {items.map((n) => (
                <div key={n.id} className={`px-4 py-3 flex gap-3 hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] transition-colors cursor-pointer ${!n.read ? "bg-[#6C5CE7]/[0.03]" : ""}`}>
                  <div className="w-8 h-8 rounded-lg bg-[#F8F9FC] dark:bg-[#22252F] flex items-center justify-center text-sm shrink-0">
                    {typeIcons[n.type] || "📋"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-gray-700 dark:text-gray-200">{n.title}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{n.message}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{n.time} ago</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-[#6C5CE7] shrink-0 mt-2" />}
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-[#E8ECF4] dark:border-[#2A2D36]">
              <button className="text-[11px] text-[#6C5CE7] font-medium w-full text-center hover:underline">View all notifications</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
