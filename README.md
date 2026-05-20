# GreeVo - Enterprise n8n Workflows

Platform workflow automation untuk perusahaan menggunakan n8n, mencakup:

## Modul

### 1. CRM Integration & Marketing Automation
- Sinkronisasi kontak dari berbagai sumber (website forms, email, social media)
- Lead scoring otomatis
- Email marketing automation (welcome series, nurture campaigns, re-engagement)
- Pipeline management & deal tracking
- Notifikasi tim sales untuk hot leads

### 2. SEO Monitoring & Analytics Reporting
- Monitoring ranking keyword harian
- Backlink monitoring & alert
- Site health check (broken links, page speed)
- Competitor analysis tracking
- Automated weekly/monthly reporting ke stakeholders
- Google Analytics & Search Console integration

## Tech Stack
- **Workflow Engine**: n8n (self-hosted)
- **CRM**: HubSpot / Salesforce (configurable)
- **Email**: SendGrid / Mailchimp
- **SEO Tools**: Ahrefs API / SEMrush API / Google Search Console
- **Analytics**: Google Analytics 4
- **Database**: PostgreSQL (untuk data warehouse)
- **Notifications**: Slack / Microsoft Teams

## Struktur Project

```
├── workflows/
│   ├── crm/                    # CRM integration workflows
│   ├── marketing/              # Marketing automation workflows
│   ├── seo/                    # SEO monitoring workflows
│   └── reporting/              # Analytics & reporting workflows
├── credentials/                # Template credential configs
├── docs/                       # Dokumentasi setup & konfigurasi
├── scripts/                    # Helper scripts (DB setup, etc.)
└── docker/                     # Docker compose untuk deployment
```

## Quick Start

1. Clone repository ini
2. Setup n8n menggunakan Docker: `docker-compose -f docker/docker-compose.yml up -d`
3. Import workflows ke n8n
4. Konfigurasi credentials
5. Aktifkan workflows

## Requirements

- Docker & Docker Compose
- n8n v1.x+
- PostgreSQL 15+
- API keys untuk services yang digunakan
