# GreeVo Setup Guide

## Prerequisites

- Docker & Docker Compose installed
- API keys untuk services yang digunakan
- Domain dengan SSL (untuk production)

## 1. Clone & Configure

```bash
git clone <repository-url>
cd GreeVo
cp docker/.env.example docker/.env
```

Edit `docker/.env` dengan credentials Anda.

## 2. Start Services

```bash
cd docker
docker-compose up -d
```

Akses n8n di: `http://localhost:5678`

## 3. Import Workflows

### Via n8n UI:
1. Buka n8n → Settings → Import
2. Upload file JSON dari folder `workflows/`

### Via n8n CLI:
```bash
docker exec -it greevo-n8n n8n import:workflow --input=/path/to/workflow.json
```

## 4. Configure Credentials di n8n

Buat credentials berikut di n8n (Settings → Credentials):

### PostgreSQL
- Name: `GreeVo PostgreSQL`
- Host: `postgres` (docker network)
- Port: `5432`
- Database: `greevo`
- User/Password: sesuai .env

### HubSpot API
- Name: `HubSpot API`
- API Key: dari HubSpot Settings → Integrations → API Key

### SendGrid
- Name: `SendGrid API`
- API Key: dari SendGrid Settings → API Keys

### Ahrefs API
- Name: `Ahrefs API Key`
- Type: Header Auth
- Header Name: `Authorization`
- Header Value: `Bearer YOUR_AHREFS_TOKEN`

### Google OAuth2 (untuk GA4)
- Name: `Google OAuth2`
- Client ID & Secret dari Google Cloud Console
- Scopes: `https://www.googleapis.com/auth/analytics.readonly`

### Slack Bot
- Name: `Slack Bot`
- Bot Token: dari Slack App → OAuth & Permissions

## 5. Activate Workflows

Setelah semua credentials dikonfigurasi, aktifkan workflows satu per satu:

### Urutan Aktivasi yang Disarankan:
1. **CRM - Contact Sync via Webhook** (terima data kontak)
2. **CRM - Lead Scoring Automation** (scoring otomatis)
3. **CRM - HubSpot Bidirectional Sync** (jika pakai HubSpot)
4. **Marketing - Welcome Email Series** (email otomatis)
5. **Marketing - Lead Nurture Campaign** (nurture)
6. **Marketing - Re-engagement Campaign** (re-engagement)
7. **SEO - Daily Keyword Rank Tracker** (tracking keyword)
8. **SEO - Backlink Monitor & Alert** (monitoring backlink)
9. **SEO - Site Health Check** (health check)
10. **SEO - Competitor Analysis Tracking** (competitor)
11. **Reporting - GA4 Data Sync** (sync analytics)
12. **Reporting - Weekly SEO Report** (laporan mingguan)
13. **Reporting - Monthly Marketing Report** (laporan bulanan)

## 6. Webhook Endpoints

Setelah workflow aktif, endpoint berikut tersedia:

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/webhook/contact-sync` | POST | Terima data kontak baru |

### Contoh Request:
```json
POST /webhook/contact-sync
{
  "email": "john@company.com",
  "first_name": "John",
  "last_name": "Doe",
  "company": "PT Example",
  "job_title": "Marketing Manager",
  "phone": "+6281234567890",
  "source": "website",
  "tags": ["marketing", "enterprise"],
  "custom_fields": {
    "industry": "Technology",
    "company_size": "50-200"
  }
}
```

## 7. Slack Channels yang Diperlukan

Buat channels berikut di Slack workspace:
- `#sales-leads` - Notifikasi lead baru
- `#sales-hot-leads` - Alert hot leads
- `#seo-alerts` - Alert perubahan SEO
- `#seo-wins` - Backlink baru berkualitas
- `#seo-strategy` - Competitor analysis
- `#seo-reports` - Laporan SEO mingguan
- `#marketing-reports` - Laporan marketing bulanan
- `#marketing-alerts` - Alert traffic drop
- `#dev-alerts` - Alert site health issues

## 8. Customization

### Menambah Keyword untuk Tracking
Insert ke database:
```sql
INSERT INTO tracked_keywords (keyword, target_url, country)
VALUES ('keyword anda', 'https://yourdomain.com/page', 'id');
```

### Mengubah Competitor
Edit node "Define Competitors" di workflow `04-competitor-tracking.json`.

### Mengubah Scoring Rules
Edit node "Calculate Lead Score" di workflow `01-contact-sync-webhook.json` dan "Recalculate Scores" di `02-lead-scoring-automation.json`.

## Troubleshooting

### Workflow tidak berjalan
- Pastikan workflow sudah di-activate (toggle ON)
- Cek credentials sudah benar
- Cek execution log di n8n

### Database connection error
- Pastikan container postgres running: `docker ps`
- Cek network: `docker network inspect greevo-network`

### API rate limiting
- Ahrefs: max 500 requests/month (standard plan)
- HubSpot: 100 requests/10 seconds
- SendGrid: sesuai plan

### Email tidak terkirim
- Verifikasi domain di SendGrid
- Cek template ID sudah benar
- Pastikan sender email sudah verified
