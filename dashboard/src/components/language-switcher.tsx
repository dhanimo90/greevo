"use client";
import { useState, useEffect } from "react";

export function LanguageSwitcher() {
  const [locale, setLocale] = useState("id");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLocale(localStorage.getItem("greevo_locale") || "id");
  }, []);

  const switchLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("greevo_locale", newLocale);
    setOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] transition-colors text-[12px] font-medium text-gray-500 dark:text-gray-400">
        <span>{locale === "id" ? "🇮🇩" : "🇬🇧"}</span>
        <span>{locale.toUpperCase()}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#1A1D26] border border-[#E8ECF4] dark:border-[#2A2D36] rounded-xl shadow-lg z-50 overflow-hidden w-36">
            <button onClick={() => switchLocale("id")} className={`w-full flex items-center gap-2 px-3 py-2.5 text-[12px] hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] transition-colors ${locale === "id" ? "text-[#6C5CE7] font-semibold" : "text-gray-600 dark:text-gray-300"}`}>
              <span>🇮🇩</span> Bahasa Indonesia
            </button>
            <button onClick={() => switchLocale("en")} className={`w-full flex items-center gap-2 px-3 py-2.5 text-[12px] hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] transition-colors ${locale === "en" ? "text-[#6C5CE7] font-semibold" : "text-gray-600 dark:text-gray-300"}`}>
              <span>🇬🇧</span> English
            </button>
          </div>
        </>
      )}
    </div>
  );
}
