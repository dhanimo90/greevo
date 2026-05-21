# Detail Model Bisnis & AI Customization per Client

## Daftar Isi
1. [Model 1: Agency/Reseller (White-Label)](#model-1-agencyreseller-white-label)
2. [Model 2: Direct SaaS](#model-2-direct-saas)
3. [Perbandingan Model 1 vs Model 2](#perbandingan-model-1-vs-model-2)
4. [AI Customization per Client](#ai-customization-per-client)
5. [Contoh Implementasi per Industri](#contoh-implementasi-per-industri)

---

## Model 1: Agency/Reseller (White-Label)

### Konsep
Anda adalah **agency digital marketing** atau **software reseller**. Anda deploy GreeVo di server Anda, lalu jual ke client-client Anda sebagai **produk buatan Anda sendiri**. Client tidak tahu ada GreeVo di belakangnya.

### Siapa yang Cocok Pakai Model Ini
- Digital marketing agency
- SEO agency
- IT consulting firm
- Software house yang mau tambah recurring revenue
- Freelancer yang mau scale jadi agency

### Alur Bisnis Model 1

```
┌─────────────────────────────────────────────────────────────────┐
│  ANDA: "Digital Growth Agency" (DGA)                             │
│                                                                   │
│  • Deploy GreeVo di server Anda                                  │
│  • Branding: logo DGA, warna DGA, domain DGA                    │
│  • Anda yang handle sales, support, billing                      │
│  • Anda set harga sendiri (markup 2-5x dari cost)               │
│                                                                   │
│  Cost Anda:                                                       │
│  • Server: Rp 800K/bulan                                         │
│  • API (Ahrefs, SendGrid, OpenAI): Rp 2.5jt/bulan              │
│  • Total: ~Rp 3.3jt/bulan fixed                                 │
│                                                                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Client: Toko    │  │ Client: Klinik  │  │ Client: Properti│
│ Online "Batik   │  │ Kecantikan      │  │ Developer       │
│ Nusantara"      │  │ "GlowUp"        │  │ "Griya Asri"    │
│                 │  │                 │  │                 │
│ Bisnis: E-comm  │  │ Bisnis: Jasa    │  │ Bisnis: Properti│
│ Bayar: 3jt/bln │  │ Bayar: 5jt/bln │  │ Bayar: 10jt/bln│
│                 │  │                 │  │                 │
│ Yang mereka     │  │ Yang mereka     │  │ Yang mereka     │
│ lihat:          │  │ lihat:          │  │ lihat:          │
│ "DGA Platform"  │  │ "DGA Platform"  │  │ "DGA Platform"  │
│ Logo: DGA       │  │ Logo: DGA       │  │ Logo: DGA       │
│ Email dari:     │  │ Email dari:     │  │ Email dari:     │
│ @dga.co.id      │  │ @dga.co.id      │  │ @dga.co.id      │
└─────────────────┘  └─────────────────┘  └─────────────────┘

Revenue Anda: 3 + 5 + 10 = Rp 18jt/bulan
Cost Anda: Rp 3.3jt/bulan
Profit: Rp 14.7jt/bulan (margin 81%)
```

### Keuntungan Model 1
- **Margin sangat tinggi** (70-85%) karena cost per client rendah
- **Recurring revenue** tanpa harus develop produk dari nol
- **Upsell mudah** — tambah fitur = tambah harga
- **Sticky** — client sudah invest data & workflow, susah pindah
- **Scalable** — tambah client tanpa tambah banyak cost

### Tantangan Model 1
- Anda harus handle support (atau hire CS)
- Anda bertanggung jawab atas uptime & reliability
- Perlu kemampuan sales & marketing sendiri
- Perlu trust dari client (karena mereka percaya ini produk Anda)

### Pricing Strategy Model 1

```
Harga Anda ke Client = Cost per Client + Margin + Value Delivered

Contoh:
- Cost per client (server + API proportional): Rp 500K
- Margin yang Anda mau: 5x
- Harga ke client: Rp 2.5jt - 5jt/bulan

Atau pricing berdasarkan value:
- "Kami bantu Anda dapat 50 leads/bulan" = Rp 5jt/bulan
- "Kami monitor 200 keyword + report mingguan" = Rp 3jt/bulan
- "Full marketing automation + SEO + CRM" = Rp 10jt/bulan
```

---

## Model 2: Direct SaaS

### Konsep
Anda jual GreeVo langsung sebagai **produk SaaS** dengan brand GreeVo (atau brand baru Anda). Client mendaftar sendiri, bayar sendiri via Stripe, dan self-service.

### Siapa yang Cocok Pakai Model Ini
- Startup yang mau bangun SaaS product
- Entrepreneur yang mau passive income
- Tim yang punya kemampuan marketing & product
- Yang mau scale ke ratusan/ribuan client

### Alur Bisnis Model 2

```
┌─────────────────────────────────────────────────────────────────┐
│  PRODUK: "GreeVo" (atau brand Anda sendiri)                      │
│                                                                   │
│  • Website: greevo.id (landing page + pricing)                   │
│  • Self-service signup                                           │
│  • Stripe billing otomatis                                       │
│  • Onboarding wizard (tanpa human)                               │
│  • Support: docs + chatbot + email                               │
│                                                                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
    ┌──────────────────────────┼──────────────────────────────┐
    │              │              │              │              │
    ▼              ▼              ▼              ▼              ▼
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│Client 1│  │Client 2│  │Client 3│  │  ...   │  │Client N│
│Starter │  │Standard│  │Starter │  │        │  │Enterpr │
│1.5jt   │  │5jt     │  │1.5jt   │  │        │  │15jt    │
└────────┘  └────────┘  └────────┘  └────────┘  └────────┘

Semua self-service. Anda fokus di:
- Product development
- Marketing (content, SEO, ads)
- Scaling infrastructure
```

### Keuntungan Model 2
- **Sangat scalable** — 1 orang bisa handle ratusan client
- **Passive income** — client signup & bayar sendiri
- **Lower touch** — tidak perlu sales call untuk setiap client
- **Network effects** — makin banyak user = makin banyak data = makin bagus AI
- **Valuasi tinggi** — SaaS company divaluasi 5-15x ARR

### Tantangan Model 2
- **Butuh marketing budget** untuk akuisisi user
- **Churn lebih tinggi** karena low-touch
- **Competition** dengan tools besar (HubSpot, dll)
- **Support at scale** — perlu docs yang sangat bagus
- **Longer time to revenue** — butuh waktu bangun user base

### Pricing Strategy Model 2

```
┌─────────────────────────────────────────────────────────────┐
│  STARTER        │  STANDARD       │  ENTERPRISE              │
│  Rp 1.5jt/bln  │  Rp 5jt/bln    │  Rp 15jt/bln            │
│                 │                 │                          │
│  5K contacts    │  25K contacts   │  100K contacts           │
│  100 keywords   │  500 keywords   │  2000 keywords           │
│  10K emails/bln │  50K emails/bln │  200K emails/bln         │
│  Basic CRM      │  Full CRM       │  Full CRM + AI           │
│  Email only     │  Email + WA     │  All channels            │
│  Weekly report  │  Daily report   │  Real-time dashboard     │
│  Self-service   │  Email support  │  Dedicated CSM           │
│  Shared infra   │  Shared infra   │  Dedicated resources     │
└─────────────────────────────────────────────────────────────┘
```

---

## Perbandingan Model 1 vs Model 2

| Aspek | Model 1 (Agency) | Model 2 (Direct SaaS) |
|-------|-------------------|----------------------|
| **Revenue per client** | Tinggi (custom pricing) | Standar (fixed tiers) |
| **Jumlah client** | Sedikit (5-50) | Banyak (50-1000+) |
| **Sales process** | High-touch (meeting, proposal) | Low-touch (self-service) |
| **Support** | Personal (WhatsApp, call) | Scalable (docs, chatbot) |
| **Margin** | 70-85% | 60-75% |
| **Time to first revenue** | 1-2 minggu | 1-3 bulan |
| **Scalability** | Linear (butuh tambah orang) | Exponential |
| **Branding** | Brand Anda | Brand produk |
| **Customization** | Tinggi per client | Standar per tier |
| **Churn risk** | Rendah (relationship) | Lebih tinggi |
| **Valuasi bisnis** | 2-4x revenue | 5-15x ARR |
| **Cocok untuk** | Agency, consultant | Startup, product company |

### Rekomendasi: Mulai dari Model 1, Transisi ke Model 2

```
Bulan 1-6:   Model 1 (Agency)
             → Validasi product-market fit
             → Bangun case studies
             → Generate revenue cepat
             → Pahami kebutuhan client

Bulan 6-12:  Hybrid (Model 1 + Model 2)
             → Launch self-service signup
             → Tetap handle enterprise secara personal
             → Starter plan = self-service
             → Standard/Enterprise = sales-assisted

Bulan 12+:   Model 2 (Full SaaS)
             → Majority revenue dari self-service
             → Enterprise = dedicated sales team
             → Agency partners = reseller program
```

---

## AI Customization per Client

### Pertanyaan Utama: "Apakah AI Tidak Terganggu Karena Setiap Client Beda Bisnis?"

**Jawaban singkat: TIDAK terganggu.** Berikut penjelasannya:

### Arsitektur AI yang Terisolasi per Client

```
┌─────────────────────────────────────────────────────────────────┐
│                    OpenAI API (Shared)                            │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │  GreeVo AI Layer     │
                    │                      │
                    │  Setiap request ke   │
                    │  AI SELALU include:  │
                    │  • client_id         │
                    │  • client context    │
                    │  • client data SAJA  │
                    └──────────┬──────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Client A:       │  │ Client B:       │  │ Client C:       │
│ Toko Batik      │  │ Klinik          │  │ Properti        │
│                 │  │                 │  │                 │
│ AI hanya lihat  │  │ AI hanya lihat  │  │ AI hanya lihat  │
│ data Client A   │  │ data Client B   │  │ data Client C   │
│                 │  │                 │  │                 │
│ Context:        │  │ Context:        │  │ Context:        │
│ "E-commerce     │  │ "Klinik         │  │ "Developer      │
│  batik,         │  │  kecantikan,    │  │  properti,      │
│  target: wanita │  │  target: wanita │  │  target: keluarga│
│  25-45 tahun"   │  │  20-40 tahun"   │  │  muda"          │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Mengapa AI Tidak Tercampur Antar Client

**1. Data Isolation (Database Level)**
```sql
-- Setiap query AI SELALU filter by client_id
SELECT * FROM contacts WHERE client_id = 5;  -- Hanya data client 5
SELECT * FROM keyword_rankings WHERE client_id = 5;  -- Hanya SEO client 5

-- Client A TIDAK BISA lihat data Client B
-- AI TIDAK BISA akses data lintas client
```

**2. Context Injection (Per Request)**

Setiap kali AI dipanggil, sistem inject context spesifik client:

```javascript
// Contoh: AI Email Copywriting
const prompt = `
You are writing for: ${client.company_name}
Industry: ${client.config.industry}
Target audience: ${client.config.target_audience}
Tone: ${client.config.brand_tone}
Product/Service: ${client.config.product_description}
Language: ${client.config.language}

Generate email for: ${request.purpose}
`;
```

**3. Tidak Ada "Memory" Lintas Client**

AI (OpenAI) bersifat **stateless** — setiap request independen:
- Request dari Client A → AI jawab berdasarkan context A saja
- Request dari Client B → AI jawab berdasarkan context B saja
- Tidak ada "ingatan" dari client sebelumnya
- Tidak ada data yang bocor antar client

### Bagaimana AI Disesuaikan per Client

#### Konfigurasi AI per Client (Disimpan di Database)

```json
// clients.config (JSONB field)
{
  "ai_config": {
    "industry": "e-commerce",
    "business_type": "B2C",
    "product_description": "Toko batik online premium",
    "target_audience": "Wanita profesional 25-45 tahun, urban",
    "brand_tone": "elegant, warm, Indonesian heritage",
    "language": "Indonesian",
    "competitors": ["batikkeris.com", "danarhatibatik.com"],
    "unique_selling_points": [
      "Batik tulis asli Solo",
      "Free shipping seluruh Indonesia",
      "Garansi keaslian"
    ],
    "content_topics": ["fashion batik", "cara merawat batik", "batik modern"],
    "email_style": "personal, storytelling",
    "seo_focus_keywords": ["batik tulis solo", "batik premium online"],
    "social_media_tone": "inspirational, cultural pride"
  }
}
```

#### Contoh AI Bekerja untuk Client Berbeda

**Client A: Toko Batik Online**
```
Request: Generate email untuk promo Lebaran
AI Context: "Toko batik premium, target wanita profesional, tone elegant"

Output:
Subject: "Koleksi Lebaran Eksklusif — Batik Tulis Solo untuk Momen Spesial Anda"
Body: "Hai Mbak [nama], Lebaran tahun ini, tampil anggun dengan batik tulis..."
```

**Client B: Klinik Kecantikan**
```
Request: Generate email untuk promo Lebaran
AI Context: "Klinik kecantikan, target wanita 20-40, tone friendly & professional"

Output:
Subject: "Glowing untuk Lebaran! Promo Facial Treatment 30% Off"
Body: "Hi [nama]! Mau tampil fresh dan glowing saat silaturahmi? ..."
```

**Client C: Developer Properti**
```
Request: Generate email untuk promo Lebaran
AI Context: "Developer properti, target keluarga muda, tone trustworthy"

Output:
Subject: "Rumah Impian untuk Keluarga Anda — Promo DP 0% Spesial Lebaran"
Body: "Bapak/Ibu [nama], Lebaran ini waktunya wujudkan rumah idaman..."
```

**Sama-sama "promo Lebaran" tapi output SANGAT BERBEDA** karena context berbeda.

---

### Fitur AI yang Bisa Dicustomize per Client

| Fitur AI | Apa yang Dicustomize | Bagaimana |
|----------|---------------------|-----------|
| **Email Copywriting** | Tone, bahasa, style, USP | `ai_config.brand_tone` + `email_style` |
| **SEO Recommendations** | Industry keywords, competitors | `ai_config.seo_focus_keywords` + `competitors` |
| **Chatbot** | Personality, product knowledge, FAQ | `ai_config.product_description` + custom FAQ |
| **Content Brief** | Topics, target audience | `ai_config.content_topics` + `target_audience` |
| **Smart Segmentation** | Segment criteria, labels | `ai_config.business_type` (B2B vs B2C) |
| **Send Time** | Timezone, business hours | `ai_config.timezone` + industry patterns |
| **Lead Scoring** | Scoring weights | `ai_config.scoring_rules` (custom per industry) |
| **NLP Reports** | Table context, terminology | Auto dari schema + `ai_config.industry` |

### Setup AI untuk Client Baru

```bash
# Saat onboarding, set AI config:
POST /webhook/client-onboard
{
  "client_code": "batik_nusantara",
  "company_name": "Batik Nusantara",
  "plan_type": "standard",
  "config": {
    "ai_config": {
      "industry": "fashion_ecommerce",
      "business_type": "B2C",
      "product_description": "Toko batik tulis premium online dari Solo",
      "target_audience": "Wanita profesional 25-45 tahun di kota besar",
      "brand_tone": "elegant, warm, cultural pride",
      "language": "Indonesian",
      "competitors": ["batikkeris.com"],
      "unique_selling_points": ["Batik tulis asli", "Free ongkir"],
      "content_topics": ["fashion batik", "tips mix & match batik"],
      "email_style": "personal, storytelling, visual"
    }
  }
}
```

---

### Keamanan & Privasi AI

```
┌─────────────────────────────────────────────────────────────────┐
│                    JAMINAN KEAMANAN                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ✅ Data client A TIDAK PERNAH dikirim ke AI saat proses         │
│     request client B                                             │
│                                                                   │
│  ✅ OpenAI TIDAK menyimpan data (jika pakai API, bukan ChatGPT) │
│     → Data tidak dipakai untuk training model                    │
│                                                                   │
│  ✅ Setiap AI request di-log di audit_logs                       │
│     → Bisa di-audit siapa akses apa                              │
│                                                                   │
│  ✅ AI config per client tersimpan di database, bukan di code    │
│     → Bisa diubah tanpa deploy ulang                             │
│                                                                   │
│  ✅ Rate limiting per client                                      │
│     → Client tidak bisa abuse AI quota                           │
│                                                                   │
│  ✅ Opsi self-hosted AI (Ollama/LLaMA) untuk enterprise          │
│     → Data tidak keluar server sama sekali                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Contoh Implementasi per Industri

### 1. E-Commerce (Toko Online)

```
Fitur yang paling relevan:
├── CRM: Track customer dari first visit → purchase → repeat
├── Marketing: Cart abandonment email, promo seasonal, loyalty
├── SEO: Product keywords, category pages, blog content
├── AI: Product recommendation email, send time per customer
└── Sales: Upsell/cross-sell automation

AI Config:
- Industry: e-commerce
- Scoring: Purchase history > Email opens > Page views
- Segments: New visitor, Window shopper, First buyer, Repeat, VIP
- Email tone: Friendly, visual, urgency-driven
- Keywords: Product-focused ("beli batik online", "batik murah")
```

### 2. Klinik/Salon Kecantikan

```
Fitur yang paling relevan:
├── CRM: Patient/client database, appointment history
├── Marketing: Birthday promo, treatment reminder, referral
├── SEO: Local SEO (Google Business), treatment keywords
├── AI: Personalized treatment suggestions, review request
└── Sales: Package upsell, membership renewal

AI Config:
- Industry: beauty_health
- Scoring: Appointment frequency > Spend amount > Referrals
- Segments: New patient, Regular, Lapsed, VIP member
- Email tone: Professional yet friendly, educational
- Keywords: Local ("facial jakarta selatan", "perawatan wajah")
```

### 3. Properti Developer

```
Fitur yang paling relevan:
├── CRM: Lead dari pameran, website, iklan → follow up
├── Marketing: Nurture panjang (cycle 3-12 bulan), event invite
├── SEO: Location keywords, property type keywords
├── AI: Personalized property recommendation, market update
└── Sales: Pipeline tracking, site visit scheduling, KPR assist

AI Config:
- Industry: real_estate
- Scoring: Site visit > Budget confirmed > KPR approved
- Segments: Browsing, Serious buyer, KPR process, Closed
- Email tone: Trustworthy, informative, aspirational
- Keywords: Location-based ("rumah murah tangerang", "apartemen BSD")
```

### 4. SaaS / Tech Company

```
Fitur yang paling relevan:
├── CRM: Trial signup → activation → paid conversion
├── Marketing: Onboarding drip, feature announcement, case study
├── SEO: Comparison keywords, how-to content, alternatives
├── AI: Usage-based recommendations, churn prediction
└── Sales: Enterprise pipeline, demo scheduling, proposal

AI Config:
- Industry: saas_technology
- Scoring: Feature usage > Login frequency > Team size
- Segments: Trial, Activated, Paying, Power user, At-risk
- Email tone: Technical but approachable, data-driven
- Keywords: Comparison ("hubspot alternative", "crm untuk startup")
```

### 5. Jasa Profesional (Konsultan, Lawyer, Akuntan)

```
Fitur yang paling relevan:
├── CRM: Client relationship, project history, referral tracking
├── Marketing: Thought leadership content, newsletter, event
├── SEO: Expertise keywords, local professional keywords
├── AI: Content generation (articles, case studies), proposal
└── Sales: Retainer renewal, scope expansion, referral program

AI Config:
- Industry: professional_services
- Scoring: Engagement with content > Meeting requests > Referrals
- Segments: Prospect, Active client, Retainer, Alumni, Referrer
- Email tone: Authoritative, insightful, formal
- Keywords: Expertise ("konsultan pajak jakarta", "jasa audit")
```

### 6. F&B / Restaurant

```
Fitur yang paling relevan:
├── CRM: Customer database, order history, preferences
├── Marketing: Promo harian, loyalty program, event
├── SEO: Local SEO, menu keywords, review management
├── AI: Menu recommendation, optimal promo timing
└── Sales: Catering leads, corporate partnership

AI Config:
- Industry: food_beverage
- Scoring: Order frequency > Average spend > Review given
- Segments: New customer, Regular, Lapsed, Catering prospect
- Email tone: Fun, appetizing, visual-heavy
- Keywords: Local ("restoran jepang kemang", "catering kantor")
```

---

## Cara Mengubah AI Config Tanpa Coding

Client atau Anda bisa update AI config via API:

```bash
# Update AI config untuk client
POST /webhook/v2/contact-sync
Headers: X-API-Key: gv_client_api_key

# Atau langsung update di database:
UPDATE clients 
SET config = config || '{
  "ai_config": {
    "brand_tone": "lebih casual dan fun",
    "target_audience": "Gen Z 18-25 tahun",
    "email_style": "short, emoji-heavy, meme-friendly"
  }
}'::jsonb
WHERE client_code = 'batik_nusantara';
```

Setelah update, **semua AI output langsung berubah** tanpa restart atau deploy ulang. Karena config dibaca real-time setiap kali AI dipanggil.

---

## FAQ

### Q: Kalau client A dan client B sama-sama minta "generate email promo", apakah hasilnya sama?
**A: TIDAK.** Setiap request include context berbeda (industry, tone, audience, product). Output akan sangat berbeda meskipun prompt user-nya sama.

### Q: Apakah data client A bisa bocor ke client B?
**A: TIDAK MUNGKIN.** Semua query database di-filter by `client_id`. AI hanya menerima data dari 1 client per request. Tidak ada shared memory antar client.

### Q: Bagaimana kalau client mau AI yang sangat spesifik (misal: chatbot yang tahu semua produk mereka)?
**A: Bisa.** Tambahkan `product_catalog` atau `faq_data` di `ai_config`. Chatbot akan include data ini sebagai context saat menjawab.

```json
{
  "ai_config": {
    "chatbot_knowledge": {
      "products": [
        {"name": "Batik Tulis Parang", "price": 2500000, "description": "..."},
        {"name": "Batik Cap Mega Mendung", "price": 850000, "description": "..."}
      ],
      "faq": [
        {"q": "Berapa lama pengiriman?", "a": "2-3 hari kerja untuk Pulau Jawa"},
        {"q": "Bisa COD?", "a": "Maaf, kami hanya menerima transfer dan e-wallet"}
      ],
      "policies": "Retur dalam 7 hari jika barang cacat"
    }
  }
}
```

### Q: Bagaimana kalau mau pakai AI lokal (bukan OpenAI) untuk privasi?
**A: Bisa.** Ganti `OPENAI_API_URL` ke endpoint Ollama/LLaMA lokal:
```env
OPENAI_API_URL=http://localhost:11434/v1  # Ollama
OPENAI_MODEL=llama3                        # Model lokal
```
Semua data tetap di server Anda, tidak keluar ke internet.

### Q: Apakah AI bisa "belajar" dari data client seiring waktu?
**A: Ya, secara tidak langsung.** 
- Predictive scoring belajar dari pola konversi historis client
- Smart send time belajar dari pola open email client
- Smart segmentation belajar dari behavior patterns client
- Semua ini per-client, tidak tercampur

### Q: Berapa biaya AI per client?
**A: Sangat rendah.**
- Email copywriting: ~Rp 500/request (1000 tokens)
- Chatbot: ~Rp 200/conversation
- SEO recommendations: ~Rp 1000/minggu
- NLP reports: ~Rp 300/query
- Estimasi total: Rp 30K-100K/client/bulan

---

*Dokumen ini menjelaskan bagaimana GreeVo bisa melayani bisnis yang sangat berbeda-beda tanpa konflik data atau AI.*
