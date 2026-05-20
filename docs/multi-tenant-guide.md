# Multi-Tenant Architecture Guide

## Overview

GreeVo Phase 2 memperkenalkan multi-tenant architecture yang memungkinkan satu instance n8n melayani banyak client secara bersamaan dengan isolasi data yang ketat.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   API Gateway (Nginx)                 │
│              Rate Limiting + SSL + Auth               │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                 n8n Workflow Engine                    │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ Auth Layer  │  │ Rate Limiter│  │ Error Handler│ │
│  │ (API Key)   │  │ (per client)│  │ (auto retry) │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘ │
│         │                 │                 │         │
│  ┌──────▼─────────────────▼─────────────────▼──────┐ │
│  │           Business Workflows                     │ │
│  │    (CRM, Marketing, SEO, Reporting)              │ │
│  │    All filtered by client_id                     │ │
│  └──────────────────────┬──────────────────────────┘ │
└─────────────────────────┼────────────────────────────┘
                          │
┌─────────────────────────▼────────────────────────────┐
│                    PostgreSQL                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ Client A │ │ Client B │ │ Client C │  (row-level) │
│  │  data    │ │  data    │ │  data    │  isolation   │
│  └──────────┘ └──────────┘ └──────────┘             │
└──────────────────────────────────────────────────────┘
```

## Client Onboarding

### API Endpoint
```
POST /webhook/client-onboard
```

### Request Body
```json
{
  "client_code": "acme",
  "company_name": "PT Acme Indonesia",
  "domain": "acme.co.id",
  "contact_email": "admin@acme.co.id",
  "contact_name": "John Doe",
  "plan_type": "standard",
  "timezone": "Asia/Jakarta",
  "slack_channel": "#acme-notifications",
  "report_emails": ["john@acme.co.id", "marketing@acme.co.id"],
  "competitors": ["competitor1.com", "competitor2.com"]
}
```

### Response
```json
{
  "success": true,
  "client_id": 1,
  "client_code": "acme",
  "api_key": "gv_abc123...",
  "webhook_secret": "xyz789...",
  "message": "Client onboarded successfully"
}
```

## Authentication

Semua API v2 endpoints memerlukan authentication:

```bash
curl -X POST https://your-domain.com/webhook/v2/contact-sync \
  -H "Content-Type: application/json" \
  -H "X-API-Key: gv_your_api_key_here" \
  -d '{"email": "lead@example.com", "first_name": "Jane"}'
```

## Plan Types & Limits

| Feature | Starter | Standard | Enterprise |
|---------|---------|----------|------------|
| Max Contacts | 5,000 | 25,000 | 100,000 |
| Max Keywords | 100 | 500 | 2,000 |
| Max Emails/Month | 10,000 | 50,000 | 200,000 |
| CRM | ✅ | ✅ | ✅ |
| Email Basic | ✅ | ✅ | ✅ |
| Email Advanced | ❌ | ✅ | ✅ |
| SEO Monitoring | ❌ | ✅ | ✅ |
| Reporting | ❌ | ✅ | ✅ |
| Competitor Analysis | ❌ | ❌ | ✅ |
| AI Features | ❌ | ❌ | ✅ |

## Rate Limiting

Rate limits per service per client:

| Service | Per Hour | Per Day |
|---------|----------|---------|
| Ahrefs | 50 | 500 |
| HubSpot | 1,000 | 10,000 |
| SendGrid | 500 | 5,000 |
| Google API | 100 | 1,000 |
| Slack | 100 | 2,000 |

### Check Rate Limit (Internal)
```
POST /webhook/rate-check
{
  "client_id": 1,
  "service_name": "ahrefs"
}
```

## Error Handling

### Automatic Retry
Errors yang retryable (timeout, 429, 502, 503, 504) akan otomatis di-retry setelah 5 menit.

### Severity Levels
- **Critical**: Workflow penting gagal (CRM sync, health monitoring)
- **High**: Timeout atau connection refused
- **Medium**: Rate limiting hit
- **Low**: Non-critical workflow errors

### Notification Channels
- Critical → `#system-alerts` (immediate)
- High/Medium → `#workflow-errors`
- Low → Logged only

## Backup Strategy

| Type | Schedule | Retention | Tables |
|------|----------|-----------|--------|
| Full | Weekly (Sunday) + Monthly (1st) | 30 days | All |
| Incremental | Daily | 7 days | Active tables only |

Backups disimpan di `/backups/` dan di-register di `backup_registry` table.

## Monitoring

### System Health (Every 5 min)
- PostgreSQL connectivity & stats
- Redis connectivity
- n8n API responsiveness
- Memory usage

### Client Usage (Daily)
- Contact count vs limit
- Keyword count vs limit
- Email usage vs monthly limit
- Error rate per client
- Activity/inactivity detection

## Environment Separation

### Staging
```bash
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d
```
- Port: 5678 (n8n), 5433 (postgres), 6380 (redis)
- Debug logging enabled
- Lower resource limits
- 48h execution data retention

### Production
```bash
docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
```
- SSL via Nginx reverse proxy
- Queue mode with workers (2 replicas)
- Optimized PostgreSQL config
- 168h execution data retention
- Health checks enabled
- JSON file logging with rotation

## Database Migrations

Jalankan migration Phase 2:
```bash
docker exec -i greevo-postgres psql -U greevo -d greevo < scripts/migrate-v2-multi-tenant.sql
```

## Audit Trail

Semua aksi penting di-log ke `audit_logs`:
- Contact created/updated
- Email sent
- Ranking checked
- Error occurred
- Rate limit hit
- Backup completed
- Client onboarded

Query audit:
```sql
SELECT * FROM audit_logs 
WHERE client_id = 1 
AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```
