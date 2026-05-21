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
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-brand-900 text-white">
      <div className="flex items-center h-16 px-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight">GreeVo</h1>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-white/50">GreeVo v1.0</div>
        <div className="text-xs text-white/50">Enterprise Platform</div>
      </div>
    </aside>
  );
}
