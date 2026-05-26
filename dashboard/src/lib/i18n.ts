type Locale = "id" | "en";

const translations: Record<Locale, Record<string, string>> = {
  id: {
    "nav.dashboard": "Dashboard",
    "nav.contacts": "Kontak",
    "nav.deals": "Deals",
    "nav.seo": "SEO",
    "nav.marketing": "Marketing",
    "nav.reports": "Laporan",
    "nav.ai": "AI Assistant",
    "nav.settings": "Pengaturan",
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Overview performa bisnis Anda hari ini",
    "dashboard.export": "Export",
    "dashboard.new_leads": "Lead Baru (7h)",
    "dashboard.revenue_mtd": "Revenue MTD",
    "dashboard.win_rate": "Win Rate",
    "dashboard.hot_leads": "Hot Leads",
    "dashboard.leads_this_week": "Lead Minggu Ini",
    "dashboard.pipeline": "Pipeline",
    "dashboard.email_seo": "Email & SEO",
    "dashboard.recent_activity": "Aktivitas Terbaru",
    "dashboard.top_keywords": "Top Keywords",
    "dashboard.view_all": "Lihat semua",
    "login.title": "Masuk ke GreeVo",
    "login.subtitle": "Enterprise CRM, Marketing & SEO Platform",
    "login.email": "Email",
    "login.password": "Password",
    "login.remember": "Ingat saya",
    "login.forgot": "Lupa password?",
    "login.submit": "Masuk",
    "login.connecting": "Menghubungkan...",
    "login.error_invalid": "Email atau password tidak valid",
    "login.error_wrong": "Email atau password salah",
    "settings.title": "Pengaturan",
    "settings.subtitle": "Kelola akun dan integrasi Anda",
    "settings.api_config": "Konfigurasi API",
    "settings.integrations": "Integrasi",
    "settings.account": "Akun",
    "settings.logout": "Keluar",
    "settings.save": "Simpan",
    "settings.saved": "Tersimpan!",
    "common.search": "Cari...",
    "common.loading": "Memuat...",
    "common.no_data": "Tidak ada data",
    "common.total": "Total",
  },
  en: {
    "nav.dashboard": "Dashboard",
    "nav.contacts": "Contacts",
    "nav.deals": "Deals",
    "nav.seo": "SEO",
    "nav.marketing": "Marketing",
    "nav.reports": "Reports",
    "nav.ai": "AI Assistant",
    "nav.settings": "Settings",
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Your business performance overview today",
    "dashboard.export": "Export",
    "dashboard.new_leads": "New Leads (7d)",
    "dashboard.revenue_mtd": "Revenue MTD",
    "dashboard.win_rate": "Win Rate",
    "dashboard.hot_leads": "Hot Leads",
    "dashboard.leads_this_week": "Leads This Week",
    "dashboard.pipeline": "Pipeline",
    "dashboard.email_seo": "Email & SEO",
    "dashboard.recent_activity": "Recent Activity",
    "dashboard.top_keywords": "Top Keywords",
    "dashboard.view_all": "View all",
    "login.title": "Sign in to GreeVo",
    "login.subtitle": "Enterprise CRM, Marketing & SEO Platform",
    "login.email": "Email",
    "login.password": "Password",
    "login.remember": "Remember me",
    "login.forgot": "Forgot password?",
    "login.submit": "Sign in",
    "login.connecting": "Connecting...",
    "login.error_invalid": "Invalid email or password",
    "login.error_wrong": "Wrong email or password",
    "settings.title": "Settings",
    "settings.subtitle": "Manage your account and integrations",
    "settings.api_config": "API Configuration",
    "settings.integrations": "Integrations",
    "settings.account": "Account",
    "settings.logout": "Logout",
    "settings.save": "Save",
    "settings.saved": "Saved!",
    "common.search": "Search...",
    "common.loading": "Loading...",
    "common.no_data": "No data available",
    "common.total": "Total",
  },
};

export function getLocale(): Locale {
  if (typeof window === "undefined") return "id";
  return (localStorage.getItem("greevo_locale") as Locale) || "id";
}

export function setLocale(locale: Locale) {
  localStorage.setItem("greevo_locale", locale);
}

export function t(key: string): string {
  const locale = getLocale();
  return translations[locale][key] || translations["id"][key] || key;
}

export type { Locale };
