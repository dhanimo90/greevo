# SOP Penggunaan GreeVo — Dokumentasi Lengkap

## Daftar Isi

1. [Penjelasan Fungsi Tiap Phase](#penjelasan-fungsi-tiap-phase)
2. [Persiapan & Instalasi](#persiapan--instalasi)
3. [SOP Phase 1: Foundation](#sop-phase-1-foundation)
4. [SOP Phase 2: Multi-Tenant](#sop-phase-2-multi-tenant)
5. [SOP Phase 3: Advanced Marketing](#sop-phase-3-advanced-marketing)
6. [SOP Phase 4: Advanced SEO](#sop-phase-4-advanced-seo)
7. [SOP Phase 5: Sales Pipeline](#sop-phase-5-sales-pipeline)
8. [SOP Phase 6: Analytics & Intelligence](#sop-phase-6-analytics--intelligence)
9. [SOP Phase 7: Integration Ecosystem](#sop-phase-7-integration-ecosystem)
10. [SOP Phase 8: White-Label & SaaS](#sop-phase-8-white-label--saas)
11. [SOP Phase 9: AI & Automation](#sop-phase-9-ai--automation)
12. [SOP Phase 10: Enterprise & Scale](#sop-phase-10-enterprise--scale)
13. [Troubleshooting](#troubleshooting)
14. [Maintenance Rutin](#maintenance-rutin)

---

## Penjelasan Fungsi Tiap Phase

### Phase 1: Foundation — "Pondasi Sistem"
**Tujuan:** Membangun infrastruktur dasar dan workflow inti yang menjadi tulang punggung seluruh platform.

**Apa yang dilakukan:**
- Menerima data kontak dari website/form via webhook
- Menghitung lead score secara otomatis berdasarkan profil dan aktivitas
- Sinkronisasi 2 arah dengan HubSpot CRM
- Mengirim email otomatis: welcome series, nurture campaign, re-engagement
- Monitoring ranking keyword harian di Google
- Deteksi backlink baru dan yang hilang
- Cek kesehatan website (response time, status code)
- Analisis kompetitor mingguan
- Laporan mingguan SEO dan bulanan marketing
- Sync data Google Analytics 4

**Analogi:** Seperti membangun rumah — ini adalah fondasi, dinding, dan atapnya.

### Phase 2: Multi-Tenant & Hardening — "Siap Produksi"
**Tujuan:** Membuat sistem production-ready, bisa melayani banyak client sekaligus dengan isolasi data.

**Apa yang dilakukan:**
- Setiap client punya API key, data terpisah, dan limit masing-masing
- Onboarding client baru otomatis (generate credentials, kirim welcome email)
- Error handling global: jika workflow gagal, otomatis retry + notifikasi
- Rate limiting: mencegah overuse API pihak ketiga
- Health monitoring: cek PostgreSQL, Redis, n8n setiap 5 menit
- Backup otomatis harian (incremental) dan mingguan (full)
- Audit trail: semua aksi tercatat untuk compliance
- Environment terpisah: staging untuk testing, production untuk live

**Analogi:** Seperti memasang sistem keamanan, CCTV, dan generator cadangan di rumah.

### Phase 3: Advanced Marketing — "Mesin Pemasaran"
**Tujuan:** Marketing automation canggih yang berjalan tanpa intervensi manual.

**Apa yang dilakukan:**
- A/B testing: kirim 2+ versi subject line, otomatis pilih pemenang
- Personalisasi dinamis: konten email berubah berdasarkan behavior tiap orang
- WhatsApp & SMS: kirim pesan via WhatsApp Business API atau Twilio
- Social media: auto-post ke LinkedIn, Facebook, Twitter/X
- Event-triggered: email otomatis saat ulang tahun, anniversary, trial expiring
- Preference center: subscriber bisa pilih jenis email yang mau diterima
- Deliverability monitoring: pantau bounce rate, spam rate, alert jika turun
- ROI tracking: hitung biaya vs revenue per campaign

**Analogi:** Seperti punya tim marketing 10 orang yang bekerja 24/7 tanpa istirahat.

### Phase 4: Advanced SEO — "Mata-Mata Digital"
**Tujuan:** Visibility penuh terhadap performa SEO dengan actionable insights.

**Apa yang dilakukan:**
- Google Search Console: impressions, CTR, query performance harian
- Core Web Vitals: LCP, CLS, TBT via PageSpeed API (mobile + desktop)
- Technical audit: cek robots.txt, sitemap, schema markup, canonical
- Content gap: identifikasi keyword yang competitor rank tapi kita tidak
- Broken link detector: scan semua URL, alert jika ada yang mati
- SERP feature tracking: deteksi featured snippets, PAA, local pack
- Meta tag optimizer: analisis title/description, scoring, saran perbaikan

**Analogi:** Seperti punya SEO consultant yang bekerja setiap hari dan lapor setiap pagi.

### Phase 5: Sales Pipeline — "Mesin Penjualan"
**Tujuan:** Otomasi seluruh proses penjualan dari lead masuk sampai deal closed.

**Apa yang dilakukan:**
- Pipeline automation: deal otomatis pindah stage berdasarkan aktivitas
- Meeting scheduler: terima webhook dari Calendly, auto-create deal
- Proposal generator: buat proposal dengan line items, pajak, diskon
- Sales forecasting: weighted pipeline, target progress, rep leaderboard
- Lead routing: assign lead ke sales rep berdasarkan territory & specialty
- Customer onboarding: setelah deal won, mulai 6-step onboarding sequence

**Analogi:** Seperti punya sales manager yang mengawasi setiap deal 24/7.

### Phase 6: Analytics & Intelligence — "Otak Bisnis"
**Tujuan:** Data-driven decision making dengan predictive analytics.

**Apa yang dilakukan:**
- Executive dashboard: KPI harian (CRM, Sales, SEO, Operations) dalam 1 view
- Predictive lead scoring: model scoring berdasarkan pola konversi historis
- Attribution modeling: tahu channel mana yang paling berkontribusi ke revenue
- Churn prediction: deteksi customer yang berisiko churn, recommend action
- Anomaly detection: alert otomatis jika ada spike/drop tidak normal
- Cohort analysis: retention rate, LTV per cohort bulanan

**Analogi:** Seperti punya data scientist yang analisis data setiap hari dan kasih rekomendasi.

### Phase 7: Integration Ecosystem — "Penghubung Universal"
**Tujuan:** Koneksi ke semua tools yang sudah dipakai client.

**Apa yang dilakukan:**
- Salesforce: sync bidirectional setiap 15 menit
- WhatsApp Business: terima pesan masuk, intent detection, auto-reply
- Telegram bot: command-based (/status, /leads, /pipeline) dengan live data
- Google Sheets: export contacts otomatis untuk non-technical users
- Microsoft Teams: notifikasi via Adaptive Cards
- WordPress: capture form submission + page view tracking
- Shopify/WooCommerce: order processing + cart abandonment recovery
- Zapier/Make API: REST endpoints compatible untuk integrasi apapun

**Analogi:** Seperti universal adapter yang bisa colok ke semua perangkat.

### Phase 8: White-Label & SaaS — "Produk Jual"
**Tujuan:** Transformasi dari internal tool menjadi produk SaaS yang bisa dijual.

**Apa yang dilakukan:**
- Client portal API: dashboard, contacts, keywords via REST API
- Stripe billing: subscription lifecycle (create, upgrade, cancel, payment)
- Shareable reports: generate link report yang bisa dibagikan ke stakeholder
- Onboarding wizard: self-service signup dengan step-by-step setup
- SLA monitoring: uptime check per menit, alert jika outage

**Analogi:** Seperti mengemas resep masakan menjadi franchise yang bisa dijual.

### Phase 9: AI & Automation — "Kecerdasan Buatan"
**Tujuan:** Platform yang semakin pintar seiring waktu menggunakan AI.

**Apa yang dilakukan:**
- Email copywriting: generate subject line + body via OpenAI
- Smart send time: analisis pola open per contact, kirim di waktu optimal
- Chatbot → CRM: AI chatbot di website, auto-create lead, handoff ke human
- SEO recommendations: AI analisis data SEO, generate priority actions
- Smart segmentation: auto-cluster contacts ke 6 segments
- Natural language reports: tanya "berapa leads bulan ini?" → dapat jawaban

**Analogi:** Seperti punya asisten AI yang belajar dari data dan kasih saran.

### Phase 10: Enterprise & Scale — "Siap Korporat"
**Tujuan:** Enterprise-grade features untuk perusahaan besar.

**Apa yang dilakukan:**
- SSO: login via SAML/OAuth2 (Google Workspace, Azure AD, Okta)
- RBAC: role-based access (admin, manager, editor, viewer)
- GDPR compliance: data subject requests (access, deletion, portability)
- Data retention: auto-purge data lama sesuai kebijakan
- Approval workflows: multi-step approval untuk campaign, budget, deals
- Security events: audit trail untuk semua aksi sensitif

**Analogi:** Seperti upgrade dari rumah biasa menjadi gedung perkantoran dengan security berlapis.

---

## Persiapan & Instalasi

### Prasyarat
- Server Linux (Ubuntu 22.04+ recommended) atau Windows dengan Docker
- Docker Engine 24+ & Docker Compose v2
- Minimal 4GB RAM, 2 CPU cores, 50GB storage
- Domain dengan SSL certificate (untuk production)
- API keys: HubSpot/Salesforce, SendGrid, Ahrefs, Google (GA4 + Search Console), Slack, OpenAI

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/dhanimo90/greevo.git
cd greevo

# 2. Copy environment file
cp docker/.env.example docker/.env

# 3. Edit konfigurasi (isi semua API keys)
nano docker/.env

# 4. Jalankan services
# Development:
docker-compose -f docker/docker-compose.yml up -d

# Production:
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.production.yml up -d

# 5. Jalankan database migrations
docker exec -i greevo-postgres psql -U greevo -d greevo < scripts/init-db.sql
docker exec -i greevo-postgres psql -U greevo -d greevo < scripts/migrate-v2-multi-tenant.sql
docker exec -i greevo-postgres psql -U greevo -d greevo < scripts/migrate-v3-advanced-marketing.sql
docker exec -i greevo-postgres psql -U greevo -d greevo < scripts/migrate-v5-sales.sql
docker exec -i greevo-postgres psql -U greevo -d greevo < scripts/migrate-v8-saas.sql
docker exec -i greevo-postgres psql -U greevo -d greevo < scripts/migrate-v10-enterprise.sql

# 6. Akses n8n
# Buka browser: http://localhost:5678
# Login dengan credentials dari .env
```

### Import Workflows ke n8n

```bash
# Import semua workflows sekaligus
for file in workflows/**/*.json; do
  docker exec -i greevo-n8n n8n import:workflow --input="/data/$file"
done

# Atau import manual via UI:
# n8n → Settings → Import from File → pilih JSON
```

### Konfigurasi Credentials di n8n

Buka n8n UI → **Settings** → **Credentials** → **Add Credential**:

| Credential Name | Type | Digunakan Oleh |
|----------------|------|----------------|
| GreeVo PostgreSQL | PostgreSQL | Semua workflow |
| HubSpot API | HubSpot | CRM sync |
| SendGrid API | SendGrid | Email campaigns |
| Ahrefs API Key | Header Auth | SEO monitoring |
| Google OAuth2 | OAuth2 | GA4, Search Console |
| Slack Bot | Slack | Notifications |
| OpenAI API | Header Auth | AI features |
| WhatsApp Business API | Header Auth | WhatsApp messaging |
| Twilio API | HTTP Basic | SMS |
| Stripe (webhook secret) | - | Billing |

---

## SOP Phase 1: Foundation

### 1.1 Menerima Kontak Baru (Contact Sync)

**Workflow:** `01-contact-sync-webhook.json`

**Cara Penggunaan:**
1. Aktifkan workflow di n8n
2. Endpoint tersedia di: `POST /webhook/contact-sync`
3. Integrasikan dengan website form:

```javascript
// Contoh dari website form
fetch('https://your-n8n-domain.com/webhook/contact-sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@company.com',
    first_name: 'John',
    last_name: 'Doe',
    company: 'PT Example',
    job_title: 'Marketing Manager',
    phone: '+6281234567890',
    source: 'website',
    tags: ['marketing', 'enterprise'],
    custom_fields: {
      industry: 'Technology',
      company_size: '50-200'
    }
  })
});
```

**Yang terjadi otomatis:**
- Validasi email
- Cek apakah kontak sudah ada (update jika ya, create jika tidak)
- Hitung lead score awal
- Log aktivitas
- Notifikasi ke Slack #sales-leads

### 1.2 Lead Scoring

**Workflow:** `02-lead-scoring-automation.json`  
**Schedule:** Setiap 1 jam otomatis

**Aturan Scoring:**
| Faktor | Poin |
|--------|------|
| Punya company | +5 |
| Punya job title | +5 |
| Punya phone | +3 |
| Source: referral | +15 |
| Source: website | +10 |
| Source: event | +12 |
| Tidak aktif >7 hari | -5 |
| Tidak aktif >30 hari | -15 |
| Aktivitas >10 | +10 |
| Score ≥80 | → Status: Qualified + Hot Lead Alert |

### 1.3 Email Marketing Automation

**Welcome Series** (`01-welcome-email-series.json`):
- Email 1: Langsung setelah signup
- Email 2: 3 hari kemudian (branching: engaged vs not engaged)

**Nurture Campaign** (`02-nurture-campaign.json`):
- 5 step: Educational → Case Study → Resource → Soft CTA → Hard CTA
- Jarak antar email: 5 hari
- Target: contacts dengan score 20-70

**Re-engagement** (`03-re-engagement-campaign.json`):
- Target: contacts tidak aktif >30 hari
- Segmentasi: gentle (30-60 hari), incentive (60-90 hari), final (>90 hari)
- Auto-mark lost jika tidak respond setelah 90 hari

### 1.4 SEO Monitoring

**Keyword Tracking** (`01-keyword-rank-tracker.json`):
- Schedule: Daily 6 AM
- Alert jika perubahan ≥5 posisi

**Cara menambah keyword:**
```sql
INSERT INTO tracked_keywords (keyword, target_url, country)
VALUES ('jasa seo jakarta', 'https://yourdomain.com/seo', 'id');
```

**Backlink Monitor** (`02-backlink-monitor.json`):
- Schedule: Daily 7 AM
- Alert untuk backlink baru dengan DR ≥40
- Deteksi backlink yang hilang

### 1.5 Reporting

**Weekly SEO Report** — Setiap Senin 9 AM ke Slack + Email  
**Monthly Marketing Report** — Setiap tanggal 1, 9 AM  
**GA4 Data Sync** — Daily 2 AM, alert jika traffic drop

---

## SOP Phase 2: Multi-Tenant

### 2.1 Onboarding Client Baru

**Endpoint:** `POST /webhook/client-onboard`

```json
{
  "client_code": "acme",
  "company_name": "PT Acme Indonesia",
  "domain": "acme.co.id",
  "contact_email": "admin@acme.co.id",
  "contact_name": "John Doe",
  "plan_type": "standard",
  "timezone": "Asia/Jakarta",
  "competitors": ["competitor1.com", "competitor2.com"]
}
```

**Response:** API key + webhook secret yang harus disimpan client.

### 2.2 Rate Limiting

Setiap API call dari client dicek rate limit-nya:
- Ahrefs: 50/jam, 500/hari
- HubSpot: 1000/jam
- SendGrid: 500/jam
- Jika limit tercapai → response 429 + retry_after_seconds

### 2.3 Monitoring & Alerts

**Health Check** — Setiap 5 menit:
- PostgreSQL: connectivity + active connections
- Redis: connectivity
- n8n: API responsiveness
- Memory usage

**Alert ke Slack #system-alerts jika:**
- Komponen DOWN
- Memory usage >90%
- Error rate tinggi

### 2.4 Backup

- **Daily 1 AM:** Incremental backup (tables aktif saja)
- **Weekly Sunday:** Full backup (semua tables)
- **Retention:** Full = 30 hari, Incremental = 7 hari
- **Alert jika backup gagal**

---

## SOP Phase 3: Advanced Marketing

### 3.1 Membuat A/B Test

**Endpoint:** `POST /webhook/ab-test/create`

```json
{
  "campaign_name": "Promo Akhir Tahun",
  "client_id": 1,
  "variants": [
    { "subject_line": "Diskon 50% Hari Ini Saja!", "template_id": "d-promo-a" },
    { "subject_line": "{{first_name}}, ada hadiah spesial untukmu", "template_id": "d-promo-b" }
  ],
  "audience_size": 1000,
  "test_percentage": 20,
  "winning_metric": "open_rate",
  "test_duration_hours": 24
}
```

**Alur:**
1. 20% audience dibagi rata ke semua variant
2. Setelah 24 jam, sistem cek open/click/conversion rate
3. Variant pemenang otomatis dikirim ke 80% sisanya
4. Laporan ke Slack #marketing-results

### 3.2 Kirim WhatsApp/SMS

**Endpoint:** `POST /webhook/messaging/send`

```json
{
  "channel": "whatsapp",
  "contact_id": 123,
  "template_name": "order_confirmation",
  "variables": { "order_id": "ORD-001", "total": "Rp 500.000" }
}
```

### 3.3 Social Media Posting

**Endpoint:** `POST /webhook/social/post`

```json
{
  "platforms": ["linkedin", "twitter"],
  "content": "Kami baru saja meluncurkan fitur baru! 🚀",
  "hashtags": ["marketing", "automation"],
  "link_url": "https://yourdomain.com/blog/new-feature"
}
```

**Auto-posting:** Scheduled posts di jam 9, 13, 17 (weekdays)

### 3.4 Unsubscribe

**Endpoint:** `POST /webhook/unsubscribe`

```json
{
  "email": "user@example.com",
  "unsubscribe_from": "all",
  "reason": "too_many_emails"
}
```

---

## SOP Phase 4: Advanced SEO

### 4.1 Google Search Console

- **Schedule:** Daily 4 AM
- **Output:** Top queries, impressions, CTR
- **Quick Wins:** Keywords dengan high impressions tapi low CTR (peluang optimasi title/meta)

### 4.2 Core Web Vitals

- **Schedule:** Daily 3 AM
- **Pages yang dicek:** Homepage, Products, Pricing, Blog, Contact, Signup
- **Alert jika:** LCP >4s, CLS >0.25, TBT >600ms

### 4.3 Technical SEO Audit

- **Schedule:** Weekly Monday 2 AM
- **Yang dicek:** robots.txt, sitemap.xml, favicon, security.txt
- **Scoring:** 100 poin, dikurangi per issue ditemukan

### 4.4 Content Gap Analysis

- **Schedule:** Tanggal 1 dan 15 setiap bulan
- **Output:** Keywords yang competitor rank tapi kita tidak
- **Auto-generate:** Content briefs dengan suggested title dan word count

### 4.5 Meta Tag Optimizer

**On-demand:** `POST /webhook/seo/analyze-meta`
```json
{ "url": "https://yourdomain.com/products" }
```

**Response:** Score, current meta tags, issues, suggestions

---

## SOP Phase 5: Sales Pipeline

### 5.1 Deal Pipeline Rules

| Current Stage | Trigger | New Stage |
|--------------|---------|-----------|
| Prospecting | 3+ activities + score ≥40 | Qualification |
| Qualification | Meeting/demo completed | Proposal |
| Proposal | Proposal viewed/signed | Negotiation |
| Negotiation | Contract signed | Closed Won |
| Any | No activity >30 days | At Risk (alert) |

### 5.2 Meeting Webhook (Calendly/Cal.com)

Konfigurasi di Calendly:
1. Settings → Integrations → Webhooks
2. URL: `https://your-domain.com/webhook/meetings/booked`
3. Events: `invitee.created`

### 5.3 Generate Proposal

**Endpoint:** `POST /webhook/sales/generate-proposal`

```json
{
  "deal_id": 5,
  "contact_email": "client@company.com",
  "contact_name": "Jane Smith",
  "company_name": "PT Client",
  "title": "Marketing Automation Package",
  "line_items": [
    { "name": "Setup Fee", "quantity": 1, "unit_price": 5000000 },
    { "name": "Monthly License", "quantity": 12, "unit_price": 2000000 }
  ],
  "discount_percent": 10,
  "tax_rate": 11
}
```

### 5.4 Sales Forecasting

- **Schedule:** Weekly Monday 8 AM
- **Output:** Pipeline by stage, weighted forecast, target progress, rep leaderboard
- **Channel:** Slack #sales-reports

---

## SOP Phase 6: Analytics & Intelligence

### 6.1 Executive Dashboard

- **Schedule:** Weekdays 7 AM
- **Channel:** Slack #executive-dashboard
- **Metrics:** New leads, hot leads, pipeline value, revenue MTD, win rate, top keywords, backlinks, email stats, error rate

### 6.2 Predictive Lead Scoring

- **Schedule:** Weekly Sunday 5 AM
- **Cara kerja:** Analisis 180 hari data historis → hitung conversion patterns → update score contacts
- **Signals yang digunakan:** Source conversion rate, activity engagement, email engagement, meetings, recency

### 6.3 Attribution Modeling

- **Schedule:** Monthly tanggal 1
- **4 Model:** First-touch, Last-touch, Linear, Time-decay
- **Recommended:** Time-decay (lebih akurat untuk B2B sales cycle panjang)

### 6.4 Churn Prediction

- **Schedule:** Weekly Monday 6 AM
- **Risk Signals:**
  - Activity dropped >50% dari bulan sebelumnya
  - Email engagement menurun
  - Tidak ada aktivitas >30 hari
  - Zero engagement bulan ini
- **Output:** List at-risk customers + recommended action per customer

### 6.5 Anomaly Detection

- **Schedule:** Setiap 4 jam
- **Yang dipantau:** New contacts, workflow errors, email bounces
- **Alert jika:** Metric 3x di atas rata-rata (spike) atau <20% rata-rata (drop)

---

## SOP Phase 7: Integration Ecosystem

### 7.1 Salesforce Setup

1. Buat Connected App di Salesforce Setup
2. Isi OAuth2 credentials di n8n
3. Aktifkan workflow `01-salesforce-sync.json`
4. Sync berjalan setiap 15 menit otomatis

### 7.2 WhatsApp Business

1. Daftar di Meta Business Suite → WhatsApp Business API
2. Setup webhook URL: `https://your-domain.com/webhook/whatsapp/webhook`
3. Set verify token di .env: `WHATSAPP_VERIFY_TOKEN=your_token`
4. Aktifkan workflow — pesan masuk akan otomatis:
   - Detect intent (pricing, demo, support)
   - Auto-reply berdasarkan intent
   - Escalate ke human jika perlu
   - Create lead jika ada email

### 7.3 Telegram Bot

1. Buat bot via @BotFather di Telegram
2. Set webhook: `https://api.telegram.org/bot{TOKEN}/setWebhook?url=https://your-domain.com/webhook/telegram/webhook`
3. Commands tersedia: `/start`, `/status`, `/leads`, `/pipeline`, `/seo`

### 7.4 WordPress Integration

Tambahkan di website WordPress:
```html
<!-- Tracking Script -->
<script>
// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
  fetch('https://your-n8n.com/webhook/wordpress/form-submit', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(Object.fromEntries(new FormData(this)))
  });
});

// Page view tracking (untuk known contacts)
if (userEmail) {
  fetch('https://your-n8n.com/webhook/wordpress/page-view', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: userEmail,
      page_url: window.location.href,
      page_title: document.title
    })
  });
}
</script>
```

### 7.5 Shopify/WooCommerce

Konfigurasi webhook di Shopify:
- Settings → Notifications → Webhooks
- Order creation: `https://your-domain.com/webhook/ecommerce/order`
- Cart abandoned (via app): `https://your-domain.com/webhook/ecommerce/cart-abandoned`

### 7.6 Zapier/Make Compatible API

Endpoints yang tersedia:
| Method | Endpoint | Fungsi |
|--------|----------|--------|
| POST | `/webhook/api/v1/contacts` | Create/update contact |
| POST | `/webhook/api/v1/events` | Track custom event |
| GET | `/webhook/api/v1/contacts` | List contacts |

Header required: `X-API-Key: gv_your_api_key`

---

## SOP Phase 8: White-Label & SaaS

### 8.1 Client Portal API

Endpoints untuk frontend dashboard:
| Endpoint | Response |
|----------|----------|
| `GET /webhook/portal/dashboard` | KPI summary |
| `GET /webhook/portal/contacts?page=1&limit=50&status=qualified` | Paginated contacts |
| `GET /webhook/portal/keywords` | Keyword rankings |

Header: `X-API-Key: client_api_key`

### 8.2 Stripe Billing

1. Setup Stripe webhook: `https://your-domain.com/webhook/billing/stripe-webhook`
2. Events yang di-handle:
   - `customer.subscription.created` → Activate client
   - `customer.subscription.deleted` → Mark as churned
   - `invoice.paid` → Log payment
   - `invoice.payment_failed` → Suspend client

### 8.3 Shareable Reports

**Generate link:**
```json
POST /webhook/reports/generate
{
  "report_type": "seo_weekly",
  "client_id": 1,
  "title": "SEO Report - Januari 2025",
  "expires_days": 30
}
```

**Response:** URL yang bisa dibagikan ke stakeholder tanpa login.

### 8.4 Self-Service Signup

**Endpoint:** `POST /webhook/onboarding/signup`
```json
{
  "email": "newclient@company.com",
  "company_name": "PT New Client",
  "name": "Admin Name",
  "domain": "newclient.com",
  "plan": "standard"
}
```

---

## SOP Phase 9: AI & Automation

### 9.1 AI Email Copywriting

**Endpoint:** `POST /webhook/ai/generate-email`
```json
{
  "purpose": "promotional",
  "tone": "casual",
  "audience": "startup founders",
  "product": "marketing automation",
  "key_message": "Launch promo 50% off",
  "cta": "Start free trial",
  "language": "Indonesian"
}
```

**Response:** 3 subject lines, preview text, email body HTML, CTA text

### 9.2 Chatbot

**Endpoint:** `POST /webhook/chatbot/message`
```json
{
  "session_id": "sess_abc123",
  "message": "Berapa harga paket enterprise?",
  "email": "visitor@company.com",
  "page_url": "https://yourdomain.com/pricing"
}
```

**Response:** AI reply + intent detection + lead creation jika relevan

### 9.3 Natural Language Reports

**Endpoint:** `POST /webhook/ai/ask`
```json
{ "question": "Berapa total leads yang masuk bulan ini dari source website?" }
```

**Response:** SQL yang di-generate + hasil query + explanation

**Contoh pertanyaan yang bisa dijawab:**
- "Berapa leads bulan ini?"
- "Siapa 10 contact dengan score tertinggi?"
- "Keyword apa yang ranking di top 3?"
- "Berapa total deal value yang closed won bulan ini?"

---

## SOP Phase 10: Enterprise & Scale

### 10.1 SSO Login

**Endpoint:** `POST /webhook/auth/sso/callback`

Konfigurasi di Identity Provider (Google Workspace/Azure AD/Okta):
- Redirect URI: `https://your-domain.com/webhook/auth/sso/callback`
- Response: session_token + role + expires_at

### 10.2 RBAC (Role-Based Access)

| Role | Permissions |
|------|------------|
| Admin | Full access, manage users, billing |
| Manager | View all data, edit campaigns, approve |
| Editor | Create/edit contacts, campaigns |
| Viewer | Read-only access |

**Verify access:** `POST /webhook/auth/verify-token`
```json
{ "token": "session_token_here", "required_role": "manager" }
```

### 10.3 GDPR Data Request

**Endpoint:** `POST /webhook/compliance/data-request`
```json
{
  "request_type": "deletion",
  "email": "user@example.com",
  "name": "User Name",
  "reason": "No longer using service"
}
```

**Request types:** `access`, `deletion`, `portability`, `rectification`, `restriction`  
**Deadline:** 30 hari (sesuai GDPR)

### 10.4 Approval Workflows

**Request approval:**
```json
POST /webhook/approvals/request
{
  "approval_type": "campaign_launch",
  "title": "Launch Email Campaign - Black Friday",
  "description": "Send to 50,000 contacts",
  "requested_by": "marketing@company.com"
}
```

**Respond:**
```json
POST /webhook/approvals/respond
{
  "approval_id": "APR-abc123",
  "decision": "approved",
  "decided_by": "manager@company.com"
}
```

---

## Troubleshooting

### Workflow Tidak Berjalan
1. Pastikan workflow sudah di-activate (toggle ON di n8n)
2. Cek credentials sudah benar: Settings → Credentials → Test
3. Cek execution log: Executions → filter by workflow
4. Pastikan schedule trigger sesuai timezone

### Database Connection Error
```bash
# Cek container running
docker ps | grep postgres

# Cek logs
docker logs greevo-postgres

# Test koneksi
docker exec -it greevo-postgres psql -U greevo -d greevo -c "SELECT 1"
```

### API Rate Limiting
- Ahrefs: max 500 requests/month (standard plan)
- HubSpot: 100 requests/10 seconds
- SendGrid: sesuai plan
- **Solusi:** Workflow sudah ada built-in rate limiter, tapi pastikan plan API cukup

### Email Tidak Terkirim
1. Verifikasi domain di SendGrid (DNS records)
2. Cek template ID sudah benar
3. Pastikan sender email sudah verified
4. Cek deliverability monitor untuk bounce/spam rate

### Webhook Tidak Menerima Data
1. Pastikan URL benar (termasuk /webhook/ prefix)
2. Cek firewall/nginx tidak block
3. Test dengan curl:
```bash
curl -X POST https://your-domain.com/webhook/contact-sync \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","first_name":"Test"}'
```

### AI Features Error
1. Pastikan `OPENAI_API_KEY` sudah di-set
2. Cek quota OpenAI tidak habis
3. Model default: `gpt-4o-mini` (bisa diubah via `OPENAI_MODEL` env var)

---

## Maintenance Rutin

### Harian (Otomatis)
- ✅ Health check setiap 5 menit
- ✅ Backup incremental jam 1 AM
- ✅ GA4 data sync jam 2 AM
- ✅ Core Web Vitals check jam 3 AM
- ✅ SEO keyword tracking jam 6 AM
- ✅ Backlink monitoring jam 7 AM
- ✅ Executive dashboard jam 7 AM
- ✅ Anomaly detection setiap 4 jam

### Mingguan (Otomatis)
- ✅ Full backup (Sunday)
- ✅ Data cleanup & VACUUM (Sunday 3 AM)
- ✅ Predictive scoring update (Sunday)
- ✅ Smart segmentation (Sunday)
- ✅ SEO report (Monday)
- ✅ Sales forecast (Monday)
- ✅ Technical SEO audit (Monday)
- ✅ Competitor analysis (Monday)
- ✅ Broken link check (Wednesday)
- ✅ SERP feature tracking (Mon & Thu)

### Bulanan (Otomatis)
- ✅ Marketing report (tanggal 1)
- ✅ Attribution modeling (tanggal 1)
- ✅ Cohort analysis (tanggal 1)
- ✅ Content gap analysis (tanggal 1 & 15)
- ✅ Data retention policy (tanggal 1)

### Manual (Periodik)
- 🔧 Review dan update API keys yang expired
- 🔧 Update n8n ke versi terbaru
- 🔧 Review audit logs untuk suspicious activity
- 🔧 Optimize database queries jika lambat
- 🔧 Review dan adjust lead scoring rules
- 🔧 Update competitor list
- 🔧 Review dan update email templates

---

## Slack Channels yang Diperlukan

| Channel | Fungsi |
|---------|--------|
| #sales-leads | Notifikasi lead baru |
| #sales-hot-leads | Alert hot leads (score ≥80) |
| #sales-pipeline | Deal stage changes |
| #sales-meetings | Meeting booked notifications |
| #sales-assignments | Lead assignment notifications |
| #sales-reports | Weekly sales forecast |
| #sales-wins | New orders / deals won |
| #marketing-reports | Monthly marketing report |
| #marketing-alerts | Traffic drop, deliverability issues |
| #marketing-results | A/B test results |
| #marketing-intelligence | Smart segmentation updates |
| #seo-alerts | Ranking changes, broken links, CWV issues |
| #seo-wins | New high-quality backlinks |
| #seo-strategy | Competitor analysis, content gaps, AI recommendations |
| #seo-reports | Weekly SEO report |
| #customer-success | New customer onboarding, churn risk |
| #system-alerts | Health issues, outages, anomalies |
| #system-maintenance | Backup & cleanup reports |
| #workflow-errors | Non-critical workflow errors |
| #executive-dashboard | Daily KPI summary |
| #client-onboarding | New client notifications |
| #client-health | Client usage monitoring |
| #billing | Stripe payment events |
| #compliance | GDPR requests, data retention |
| #approvals | Approval requests & decisions |
| #support-queue | WhatsApp/chat escalations |

---

## Kontak & Support

- **Repository:** https://github.com/dhanimo90/greevo
- **Dokumentasi:** `docs/` folder dalam repository
- **Issues:** GitHub Issues

---

*Dokumen ini di-update terakhir: Mei 2026*
*Versi: 1.0 — All 10 Phases Complete*
