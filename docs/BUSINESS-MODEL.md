# GreeVo — Business Model & Proses Bisnis

## Ringkasan Bisnis

GreeVo adalah **platform SaaS white-label** yang menyediakan CRM, Marketing Automation, SEO Monitoring, dan Analytics Reporting untuk perusahaan (B2B). Platform ini bisa dijalankan dalam 2 model bisnis:

### Model 1: Agency/Reseller (White-Label)
Anda menjual GreeVo sebagai produk milik Anda sendiri ke client-client Anda.

### Model 2: Direct SaaS
Anda menjual langsung ke end-user sebagai brand GreeVo.

---

## Arsitektur Bisnis

```
┌─────────────────────────────────────────────────────────────────┐
│                        ANDA (Operator)                            │
│                                                                   │
│  Mengelola: Infrastructure, Billing, Support, Onboarding         │
└──────────────────────────────┬──────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Client A       │ │   Client B       │ │   Client C       │
│   (PT Acme)      │ │   (Globex Corp)  │ │   (StartupID)    │
│                  │ │                  │ │                  │
│ Plan: Enterprise │ │ Plan: Standard   │ │ Plan: Starter    │
│ Rp 15jt/bulan   │ │ Rp 5jt/bulan    │ │ Rp 1.5jt/bulan  │
│                  │ │                  │ │                  │
│ • 100K contacts  │ │ • 25K contacts   │ │ • 5K contacts    │
│ • 2000 keywords  │ │ • 500 keywords   │ │ • 100 keywords   │
│ • Full features  │ │ • Standard feat  │ │ • Basic features │
│ • Custom domain  │ │ • Shared domain  │ │ • Shared domain  │
│ • Dedicated CSM  │ │ • Email support  │ │ • Self-service   │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

---

## Proses Bisnis End-to-End

### FASE 1: Akuisisi Client Baru

```
Prospek menemukan Anda
        │
        ▼
┌─────────────────────┐
│ Website / Referral   │ ← Landing page dengan form
│ / Cold Outreach      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Lead Masuk ke CRM    │ ← Webhook: /contact-sync
│ (Auto lead scoring)  │   Score dihitung otomatis
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Nurture Campaign     │ ← Email otomatis 5 step
│ (5-7 hari interval)  │   Educational → CTA
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Lead Qualified       │ ← Score ≥ 50
│ (Auto-assign sales)  │   Territory + round-robin
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Meeting Booked       │ ← Calendly webhook
│ (Deal auto-created)  │   Notif ke Slack
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Demo / Proposal      │ ← Generate proposal via API
│ (Auto-send email)    │   Track jika dibuka
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Deal Closed Won      │ ← Pipeline auto-advance
│ (Stripe payment)     │   Invoice generated
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Client Onboarding    │ ← 6-step automated
│ (API key generated)  │   Welcome email + setup
└─────────────────────┘
```

### FASE 2: Onboarding & Setup Client

```
Deal Closed Won
        │
        ▼
┌─────────────────────────────────────────────────┐
│ OTOMATIS (Workflow: client-onboarding)            │
│                                                   │
│ 1. Generate API key + webhook secret             │
│ 2. Create client record di database              │
│ 3. Set plan limits (contacts, keywords, emails)  │
│ 4. Send welcome email dengan credentials         │
│ 5. Notify CS team di Slack                       │
│ 6. Start onboarding sequence                     │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│ CLIENT SELF-SERVICE (via Portal / Guided Setup)  │
│                                                   │
│ Step 1: Konfigurasi domain                       │
│ Step 2: Tambah kontak pertama                    │
│ Step 3: Tambah keyword pertama                   │
│ Step 4: Setup notifikasi (Slack/Teams/Telegram)  │
│ Step 5: Buat campaign pertama                    │
│ Step 6: Review dashboard                         │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│ STATUS: ACTIVE                                    │
│ Semua workflow mulai berjalan untuk client ini    │
└─────────────────────────────────────────────────┘
```

### FASE 3: Operasional Harian (Per Client)

```
┌─────────────────────────────────────────────────────────────────┐
│                    DAILY OPERATIONS (Otomatis)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  02:00 - GA4 data sync                                           │
│  03:00 - Core Web Vitals check                                   │
│  04:00 - Google Search Console sync                              │
│  05:00 - Site health check                                       │
│  06:00 - Keyword rank tracking                                   │
│  07:00 - Backlink monitoring + Email deliverability              │
│  07:00 - Executive dashboard → Slack                             │
│  08:00 - Event-triggered emails (birthday, trial expiring)       │
│  08:00 - Client usage monitoring                                 │
│  09:00 - Nurture campaign sends                                  │
│  09:00 - Social media auto-posting                               │
│                                                                   │
│  Every hour:                                                      │
│  - Lead scoring recalculation                                    │
│  - Welcome email series                                          │
│  - Customer onboarding steps                                     │
│                                                                   │
│  Every 5 min:                                                     │
│  - System health monitoring                                      │
│                                                                   │
│  Every 15 min:                                                    │
│  - CRM sync (HubSpot/Salesforce)                                 │
│                                                                   │
│  Every 30 min:                                                    │
│  - Lead assignment (qualified → sales rep)                       │
│                                                                   │
│  Every 2 hours:                                                   │
│  - Deal pipeline automation                                      │
│                                                                   │
│  Every 4 hours:                                                   │
│  - Anomaly detection                                             │
│  - A/B test winner check                                         │
│                                                                   │
│  Real-time (webhook):                                             │
│  - Contact sync dari website forms                               │
│  - Meeting booked (Calendly)                                     │
│  - WhatsApp inbound messages                                     │
│  - Stripe payment events                                         │
│  - E-commerce orders                                             │
│  - Chatbot conversations                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### FASE 4: Reporting & Intelligence

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEEKLY (Otomatis)                              │
├─────────────────────────────────────────────────────────────────┤
│  Monday:                                                          │
│  - Weekly SEO report → Slack + Email                             │
│  - Sales forecast → Slack                                        │
│  - Competitor analysis → Slack                                   │
│  - AI SEO recommendations → Slack                                │
│  - Churn prediction → CS team                                    │
│  - Campaign ROI report → Slack                                   │
│                                                                   │
│  Wednesday:                                                       │
│  - Broken link check                                             │
│                                                                   │
│  Sunday:                                                          │
│  - Full backup                                                   │
│  - Data cleanup + VACUUM                                         │
│  - Predictive lead scoring model retrain                         │
│  - Smart segmentation update                                     │
│  - Smart send time recalculation                                 │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                    MONTHLY (Otomatis)                             │
├─────────────────────────────────────────────────────────────────┤
│  Tanggal 1:                                                       │
│  - Monthly marketing report → Slack + Email                      │
│  - Attribution modeling                                          │
│  - Cohort analysis & LTV                                         │
│  - Data retention policy execution                               │
│  - Content gap analysis                                          │
│                                                                   │
│  Tanggal 15:                                                      │
│  - Content gap analysis (bi-weekly)                              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## White-Label: Bagaimana Cara Kerjanya

### Apa yang Bisa Di-White-Label

| Komponen | Customizable | Cara |
|----------|-------------|------|
| Brand name | ✅ | `clients.branding.company_name_display` |
| Logo | ✅ | `clients.branding.logo_url` |
| Warna tema | ✅ | `clients.branding.primary_color` |
| Domain | ✅ | `clients.branding.custom_domain` + DNS |
| Email sender | ✅ | Verified domain di SendGrid |
| Report header | ✅ | Template SendGrid per client |
| Dashboard | ✅ | Frontend baca branding dari API |
| Slack channel | ✅ | Per-client channel config |
| API endpoint | ✅ | Custom subdomain via Nginx |

### Alur White-Label

```
┌─────────────────────────────────────────────────────────────────┐
│  ANDA (Operator/Agency)                                          │
│                                                                   │
│  Brand: "Digital Growth Agency"                                  │
│  Domain: app.digitalgrowth.id                                    │
│                                                                   │
│  Anda menjual ke client sebagai produk ANDA:                     │
│  "Ini platform marketing automation kami"                        │
│                                                                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Client A sees:  │  │ Client B sees:  │  │ Client C sees:  │
│                 │  │                 │  │                 │
│ Logo: DGA       │  │ Logo: DGA       │  │ Logo: DGA       │
│ Domain:         │  │ Domain:         │  │ Domain:         │
│ app.dga.id/acme │  │ app.dga.id/glob │  │ app.dga.id/star │
│                 │  │                 │  │                 │
│ Mereka TIDAK    │  │ Mereka TIDAK    │  │ Mereka TIDAK    │
│ tahu ini GreeVo │  │ tahu ini GreeVo │  │ tahu ini GreeVo │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Setup White-Label untuk Client Baru

```bash
# 1. Onboard client dengan branding
POST /webhook/client-onboard
{
  "client_code": "acme",
  "company_name": "PT Acme",
  "plan_type": "enterprise",
  "branding": {
    "company_name_display": "Digital Growth Agency",
    "logo_url": "https://youragency.com/logo.png",
    "primary_color": "#FF6B00",
    "custom_domain": "acme.youragency.com"
  }
}

# 2. Setup DNS (client atau Anda)
# acme.youragency.com → CNAME → your-n8n-server.com

# 3. Setup Nginx virtual host
# server_name acme.youragency.com → proxy ke n8n

# 4. Setup SendGrid verified domain
# Emails dari: noreply@youragency.com (bukan greevo.com)

# 5. Client akses dashboard
# https://acme.youragency.com → Dashboard dengan branding Anda
```

---

## Revenue Model

### Pricing Tiers

| Plan | Harga/Bulan | Target Market | Margin |
|------|-------------|---------------|--------|
| **Starter** | Rp 1.500.000 | UMKM, Startup kecil | ~80% |
| **Standard** | Rp 5.000.000 | SMB, Growing company | ~75% |
| **Enterprise** | Rp 15.000.000 | Corporate, Large company | ~70% |
| **Custom** | Rp 25.000.000+ | Enterprise dengan kebutuhan khusus | ~65% |

### Cost Structure (Per Client)

| Item | Starter | Standard | Enterprise |
|------|---------|----------|------------|
| Server (proportional) | Rp 100K | Rp 300K | Rp 1.000K |
| SendGrid emails | Rp 50K | Rp 200K | Rp 500K |
| Ahrefs API | Rp 100K | Rp 400K | Rp 1.500K |
| OpenAI API | Rp 30K | Rp 100K | Rp 300K |
| Support time | Rp 0 | Rp 200K | Rp 1.000K |
| **Total Cost** | **Rp 280K** | **Rp 1.200K** | **Rp 4.300K** |
| **Profit/Client** | **Rp 1.220K** | **Rp 3.800K** | **Rp 10.700K** |

### Revenue Projection

| Bulan | Starter | Standard | Enterprise | MRR | ARR |
|-------|---------|----------|------------|-----|-----|
| 3 | 5 | 2 | 0 | Rp 17.5jt | Rp 210jt |
| 6 | 12 | 5 | 1 | Rp 58jt | Rp 696jt |
| 12 | 25 | 12 | 3 | Rp 142.5jt | Rp 1.71M |
| 24 | 50 | 30 | 8 | Rp 345jt | Rp 4.14M |

---

## Proses Billing (Stripe)

```
Client signup
     │
     ▼
┌──────────────────┐
│ Stripe Checkout   │ ← Client pilih plan + bayar
│ (atau Invoice)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Webhook:          │
│ subscription      │ ← GreeVo terima event
│ .created          │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Auto-activate     │ ← Status: active
│ client account    │   Plan limits applied
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Monthly:          │
│ invoice.paid      │ ← Recurring payment
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
 Success    Failed
    │         │
    ▼         ▼
 Continue   Suspend → Retry → Cancel if 3x failed
```

---

## Proses Support & Retention

```
┌─────────────────────────────────────────────────────────────────┐
│                    RETENTION LOOP                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  1. MONITOR (Otomatis)                                           │
│     - Churn prediction setiap Senin                              │
│     - Usage monitoring harian                                    │
│     - Activity tracking real-time                                │
│                                                                   │
│  2. DETECT RISK                                                   │
│     - Activity drop >50%                                         │
│     - Email engagement menurun                                   │
│     - Tidak login >14 hari                                       │
│     - Support ticket meningkat                                   │
│                                                                   │
│  3. INTERVENE (Otomatis + Manual)                                │
│     - Auto: Re-engagement email                                  │
│     - Auto: "We miss you" WhatsApp                               │
│     - Manual: CS team outreach (dari Slack alert)                │
│     - Manual: Offer discount/upgrade                             │
│                                                                   │
│  4. UPSELL (Otomatis)                                            │
│     - Approaching contact limit → suggest upgrade                │
│     - High usage → recommend enterprise                          │
│     - New feature launch → email campaign                        │
│                                                                   │
│  5. MEASURE                                                       │
│     - Monthly churn rate                                         │
│     - Net Revenue Retention (NRR)                                │
│     - Customer Lifetime Value (LTV)                              │
│     - NPS score (via survey workflow)                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Competitive Advantage

| Fitur | GreeVo | HubSpot | ActiveCampaign | SEMrush |
|-------|--------|---------|----------------|---------|
| CRM | ✅ | ✅ | ✅ | ❌ |
| Email Marketing | ✅ | ✅ | ✅ | ❌ |
| SEO Monitoring | ✅ | ❌ | ❌ | ✅ |
| Sales Pipeline | ✅ | ✅ | ✅ | ❌ |
| AI Features | ✅ | ✅ | ❌ | ✅ |
| White-Label | ✅ | ❌ | ❌ | ❌ |
| Self-hosted | ✅ | ❌ | ❌ | ❌ |
| Multi-tenant | ✅ | ❌ | ❌ | ❌ |
| Harga (entry) | Rp 1.5jt | Rp 7jt+ | Rp 3jt+ | Rp 2jt+ |
| All-in-one | ✅ | Partial | Partial | Partial |

**Key differentiator:** GreeVo adalah satu-satunya platform yang menggabungkan CRM + Marketing + SEO + AI dalam satu produk white-label yang bisa di-self-host.

---

## Go-to-Market Strategy

### Phase 1: Validate (Bulan 1-2)
1. Deploy untuk 2-3 client pilot (gratis/diskon besar)
2. Kumpulkan feedback, fix bugs
3. Dokumentasikan case study
4. Hitung unit economics real

### Phase 2: Launch (Bulan 3-4)
1. Landing page + pricing page
2. Content marketing (blog SEO tentang marketing automation)
3. LinkedIn outreach ke target market
4. Referral program dari pilot clients
5. Listing di Product Hunt / startup directories Indonesia

### Phase 3: Scale (Bulan 5-12)
1. Hire 1 sales + 1 CS
2. Partner program (agency reseller)
3. Webinar / workshop gratis
4. Paid ads (Google Ads untuk keyword "marketing automation indonesia")
5. Integration marketplace

### Phase 4: Expand (Bulan 12+)
1. Multi-region (Singapore, Malaysia)
2. Enterprise sales team
3. Channel partner program
4. Acquisition of complementary tools

---

## Operational Playbook

### Daily (Anda sebagai Operator)
- [ ] Cek executive dashboard (Slack #executive-dashboard)
- [ ] Review system alerts (jika ada)
- [ ] Respond to support tickets
- [ ] Monitor churn risk alerts

### Weekly
- [ ] Review sales pipeline & forecast
- [ ] Check client usage reports
- [ ] Review SEO performance per client
- [ ] Team sync meeting
- [ ] Content creation (blog/social)

### Monthly
- [ ] Review MRR & churn metrics
- [ ] Client health check calls (enterprise)
- [ ] Invoice reconciliation
- [ ] Feature prioritization
- [ ] Marketing campaign planning

---

## Tech Operations

### Infrastructure Cost (Estimated)

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| VPS (4 CPU, 16GB RAM) | Rp 800K | DigitalOcean/Hetzner |
| Domain + SSL | Rp 50K | Cloudflare (free SSL) |
| SendGrid (50K emails) | Rp 300K | Pro plan |
| Ahrefs API | Rp 1.500K | Standard plan |
| OpenAI API | Rp 500K | Usage-based |
| Backup storage | Rp 100K | S3-compatible |
| Monitoring (UptimeRobot) | Rp 0 | Free tier |
| **Total** | **Rp 3.250K/bulan** | |

**Break-even:** 3 Starter clients ATAU 1 Standard client.

### Scaling Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| CPU >70% sustained | 1 week | Upgrade server |
| RAM >80% | Immediate | Add RAM or optimize |
| DB size >50GB | Plan ahead | Add read replica |
| Clients >20 | Plan ahead | Add n8n worker nodes |
| Clients >50 | Required | Multi-server setup |
| Clients >100 | Required | Kubernetes deployment |

---

## Summary: Mengapa GreeVo Bisa Jadi Bisnis

1. **Recurring Revenue** — SaaS subscription = predictable income
2. **High Margin** — Software cost rendah, value tinggi
3. **Scalable** — 1 instance bisa serve banyak client
4. **White-Label** — Bisa dijual oleh agency sebagai produk mereka
5. **All-in-One** — Client tidak perlu beli 5 tools terpisah
6. **Self-Hosted** — Data sovereignty untuk enterprise
7. **AI-Powered** — Differentiator vs legacy tools
8. **Low CAC** — Inbound marketing + referral
9. **High LTV** — Sticky product (data + workflows = switching cost tinggi)
10. **Market Timing** — SMB Indonesia mulai adopt marketing automation

---

*Dokumen ini adalah panduan bisnis internal. Update sesuai perkembangan market dan feedback client.*
