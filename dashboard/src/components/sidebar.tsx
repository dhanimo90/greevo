"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Contacts", href: "/contacts", icon: "👥" },
  { name: "Deals", href: "/deals", icon: "💰" },
  { name: "SEO", href: "/seo", icon: "🔍" },
  { name: "Marketing", href: "/marketing", icon: "📧" },
  { name: "Reports", href: "/reports", icon: "📈" },
  { name: "AI Assistant", href: "/ai", icon: "🤖" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[260px] bg-gradient-to-b from-brand-950 to-brand-900 text-white min-h-screen">
      <div className="flex items-center gap-3 h-16 px-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <span className="text-lg font-bold tracking-tight">GreeVo</span>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/60 hover:bg-white/10 hover:text-white/90"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-xs font-bold text-white">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white/90 truncate">Admin User</p>
            <p className="text-xs text-white/40">Enterprise Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
