"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (!isLoginPage) {
      const loggedIn = localStorage.getItem("greevo_logged_in");
      if (!loggedIn) {
        router.replace("/login");
        return;
      }
    }
    const theme = localStorage.getItem("greevo_theme");
    if (theme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
    setReady(true);
  }, [isLoginPage, router]);

  const toggleDark = () => {
    setDark(!dark);
    if (!dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("greevo_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("greevo_theme", "light");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("greevo_logged_in");
    localStorage.removeItem("greevo_api_key");
    localStorage.removeItem("greevo_user");
    router.push("/login");
  };

  const getUserInitial = () => {
    try {
      const user = JSON.parse(localStorage.getItem("greevo_user") || "{}");
      return (user.name || user.email || "U").charAt(0).toUpperCase();
    } catch { return "U"; }
  };

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8F9FC] dark:bg-[#0F1117]">
        <div className="w-8 h-8 rounded-lg bg-[#6C5CE7] animate-pulse" />
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FC] dark:bg-[#0F1117]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-[60px] bg-white dark:bg-[#1A1D26] border-b border-[#E8ECF4] dark:border-[#2A2D36] flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <MobileSidebar />
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#F8F9FC] dark:bg-[#22252F] rounded-xl w-60 border border-transparent focus-within:border-[#6C5CE7]/30">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="text" placeholder="Search..." className="bg-transparent text-[13px] outline-none flex-1 placeholder:text-gray-400 dark:text-gray-200" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] transition-colors" title="Toggle theme">
              {dark ? (
                <svg className="w-[18px] h-[18px] text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              ) : (
                <svg className="w-[18px] h-[18px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              )}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] transition-colors">
              <svg className="w-[18px] h-[18px] text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span className="absolute top-1.5 right-1.5 w-[6px] h-[6px] bg-[#6C5CE7] rounded-full ring-2 ring-white dark:ring-[#1A1D26]" />
            </button>
            <button onClick={handleLogout} className="ml-1 w-8 h-8 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center text-white text-[11px] font-bold" title="Logout">
              {getUserInitial()}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}
