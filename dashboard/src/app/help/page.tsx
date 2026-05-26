"use client";
import { useState } from "react";

const categories = [
  {
    name: "Getting Started",
    icon: "🚀",
    articles: [
      { title: "Cara login ke dashboard", content: "Masukkan email dan password perusahaan Anda di halaman login. Jika belum punya akun, hubungi admin." },
      { title: "Menambah kontak pertama", content: "Buka halaman Contacts → klik '+ Add Contact' → isi form → Save. Atau kirim data via API webhook." },
      { title: "Setup keyword tracking", content: "Buka halaman SEO → tambah keyword yang ingin di-track. Sistem akan cek ranking setiap hari jam 6 pagi." },
      { title: "Menghubungkan integrasi", content: "Buka Settings → Integrations → klik Connect pada service yang diinginkan → ikuti instruksi." },
    ]
  },
  {
    name: "CRM & Contacts",
    icon: "👥",
    articles: [
      { title: "Memahami lead scoring", content: "Lead score dihitung otomatis berdasarkan: kelengkapan profil, sumber lead, aktivitas (email open, page view, meeting), dan engagement frequency." },
      { title: "Import kontak dari CSV", content: "Buka Contacts → Import → Upload file CSV dengan kolom: email, first_name, last_name, company, phone." },
      { title: "Segmentasi kontak", content: "Kontak otomatis di-segment setiap minggu berdasarkan behavior: hot_prospects, nurture_needed, at_risk, dll." },
      { title: "Mengelola deals", content: "Buka Deals → lihat pipeline board → drag deal antar stage atau biarkan sistem auto-advance berdasarkan aktivitas." },
    ]
  },
  {
    name: "Marketing",
    icon: "📧",
    articles: [
      { title: "Membuat email campaign", content: "Buka Marketing → New Campaign → pilih tipe (welcome, nurture, promotional) → set audience → launch." },
      { title: "A/B testing", content: "Buat campaign dengan 2+ subject line variants. Sistem kirim ke 20% audience, tunggu 24 jam, lalu kirim winner ke sisanya." },
      { title: "WhatsApp messaging", content: "Kirim pesan via API: POST /webhook/messaging/send dengan channel 'whatsapp' dan contact_id atau phone number." },
      { title: "Unsubscribe management", content: "Setiap email punya link unsubscribe. Kontak bisa pilih kategori mana yang mau di-unsubscribe." },
    ]
  },
  {
    name: "SEO",
    icon: "🔍",
    articles: [
      { title: "Membaca keyword rankings", content: "Halaman SEO menampilkan posisi terkini, perubahan dari kemarin, dan search volume. Hijau = naik, merah = turun." },
      { title: "Backlink monitoring", content: "Sistem cek backlink baru setiap hari. Alert dikirim ke Slack jika ada backlink DR≥40 baru atau backlink hilang." },
      { title: "Core Web Vitals", content: "LCP, CLS, TBT dicek setiap hari. Alert jika score 'poor'. Target: LCP <2.5s, CLS <0.1, TBT <200ms." },
      { title: "Content gap analysis", content: "Setiap 2 minggu, sistem identifikasi keyword yang competitor rank tapi kita tidak. Hasilnya berupa content brief." },
    ]
  },
  {
    name: "AI Features",
    icon: "🤖",
    articles: [
      { title: "AI email copywriting", content: "POST /webhook/ai/generate-email dengan purpose, tone, audience. AI generate 3 subject lines + body." },
      { title: "Natural language queries", content: "Di halaman AI Assistant, ketik pertanyaan seperti 'Berapa leads bulan ini?' dan AI akan query database." },
      { title: "Smart segmentation", content: "Setiap minggu AI cluster kontak ke 6 segment berdasarkan behavior. Tag otomatis ditambahkan." },
      { title: "Chatbot integration", content: "Embed chatbot di website. AI jawab pertanyaan visitor, detect intent, dan auto-create lead jika relevan." },
    ]
  },
  {
    name: "Account & Billing",
    icon: "⚙️",
    articles: [
      { title: "Mengubah password", content: "Hubungi admin untuk reset password. Self-service password reset akan tersedia di update mendatang." },
      { title: "Upgrade plan", content: "Hubungi tim sales atau klik Upgrade di Settings. Perubahan berlaku di billing cycle berikutnya." },
      { title: "Export data", content: "Klik tombol Export di dashboard untuk download JSON. Untuk export CSV, gunakan Google Sheets integration." },
      { title: "API key management", content: "API key bisa dilihat di Settings. Jangan share API key. Jika compromised, hubungi admin untuk regenerate." },
    ]
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<{ title: string; content: string } | null>(null);

  const filteredCategories = categories.map(cat => ({
    ...cat,
    articles: cat.articles.filter(a => 
      !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.articles.length > 0);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="page-title">Help Center</h1>
        <p className="page-subtitle">Cari jawaban untuk pertanyaan Anda</p>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari artikel bantuan..."
          className="input-field pl-11 py-3"
        />
      </div>

      {/* Selected Article */}
      {selectedArticle && (
        <div className="card card-body animate-slide-up">
          <button onClick={() => setSelectedArticle(null)} className="text-[12px] text-[#6C5CE7] font-medium mb-3 hover:underline">← Kembali</button>
          <h2 className="text-[16px] font-semibold text-gray-800 dark:text-white">{selectedArticle.title}</h2>
          <p className="text-[13px] text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">{selectedArticle.content}</p>
        </div>
      )}

      {/* Categories */}
      {!selectedArticle && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCategories.map((cat) => (
            <div key={cat.name} className="card">
              <div className="card-header flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <h3 className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">{cat.name}</h3>
              </div>
              <div className="divide-y divide-[#E8ECF4] dark:divide-[#2A2D36]">
                {cat.articles.map((article) => (
                  <button
                    key={article.title}
                    onClick={() => setSelectedArticle(article)}
                    className="w-full text-left px-6 py-3 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-[#F8F9FC] dark:hover:bg-[#22252F] hover:text-[#6C5CE7] transition-colors"
                  >
                    {article.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Support */}
      <div className="card card-body text-center">
        <p className="text-[13px] text-gray-500 dark:text-gray-400">Tidak menemukan jawaban?</p>
        <p className="text-[12px] text-gray-400 mt-1">Hubungi support di <span className="text-[#6C5CE7] font-medium">support@greevo.id</span> atau via WhatsApp</p>
      </div>
    </div>
  );
}
