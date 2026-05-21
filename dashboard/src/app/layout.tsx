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
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </body>
    </html>
  );
}
