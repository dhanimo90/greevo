import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "GreeVo Dashboard",
  description: "Enterprise CRM, Marketing & SEO Automation Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-8 shrink-0">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl w-72">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="text" placeholder="Search anything..." className="bg-transparent text-sm outline-none flex-1 placeholder:text-gray-400" />
                <kbd className="text-[10px] text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200 font-mono">⌘K</kbd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-bold shadow-sm cursor-pointer">
                A
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 animate-fade-in">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
