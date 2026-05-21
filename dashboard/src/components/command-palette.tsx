"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const commands = [
  { id: "dashboard", label: "Go to Dashboard", icon: "📊", href: "/" },
  { id: "contacts", label: "Go to Contacts", icon: "👥", href: "/contacts" },
  { id: "deals", label: "Go to Deals", icon: "💰", href: "/deals" },
  { id: "seo", label: "Go to SEO", icon: "🔍", href: "/seo" },
  { id: "marketing", label: "Go to Marketing", icon: "📧", href: "/marketing" },
  { id: "reports", label: "Go to Reports", icon: "📈", href: "/reports" },
  { id: "ai", label: "Ask AI Assistant", icon: "🤖", href: "/ai" },
  { id: "settings", label: "Go to Settings", icon: "⚙️", href: "/settings" },
  { id: "new-contact", label: "Add New Contact", icon: "➕", href: "/contacts" },
  { id: "new-deal", label: "Create New Deal", icon: "💼", href: "/deals" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(search.toLowerCase()));

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setOpen(false)} />
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-slide-up">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
          />
          <kbd className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 font-mono">ESC</kbd>
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No results found</p>
          )}
          {filtered.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => { router.push(cmd.href); setOpen(false); setSearch(""); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <span className="text-lg">{cmd.icon}</span>
              <span className="text-sm text-gray-700 dark:text-gray-200">{cmd.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
