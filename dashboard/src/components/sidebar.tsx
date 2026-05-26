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
  { name: "AI Agents", href: "/agents", icon: "🤖" },
  { name: "Reports", href: "/reports", icon: "📈" },
  { name: "Help", href: "/help", icon: "❓" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[250px] bg-[#1B1D2A] text-white min-h-screen border-r border-[#2A2D3A]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 h-16 px-5">
        <div className="w-8 h-8 rounded-lg bg-[#6C5CE7] flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <span className="text-[15px] font-bold tracking-tight">GreeVo</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150",
                isActive
                  ? "bg-[#6C5CE7]/15 text-white"
                  : "text-[#8B8FA3] hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span>{item.name}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6C5CE7]" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 mx-3 mb-4 rounded-xl bg-[#22252F] border border-[#2E3140]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center text-[11px] font-bold text-white">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-white/90 truncate">Admin User</p>
            <p className="text-[11px] text-[#8B8FA3]">Enterprise</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
