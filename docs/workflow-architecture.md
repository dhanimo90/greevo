# Workflow Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                               │
├─────────────┬──────────────┬──────────────┬─────────────────────┤
│  Website    │  HubSpot     │  Ahrefs API  │  Google Analytics   │
│  Forms      │  CRM         │  SEMrush     │  Search Console     │
└──────┬──────┴──────┬───────┴──────┬───────┴──────────┬──────────┘
       │             │              │                   │
       ▼             ▼              ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      n8n WORKFLOW ENGINE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ CRM Module   │  │ Marketing    │  │ SEO Module            │  │
│  │              │  │ Module       │  │                        │  │
│  │ • Sync       │  │ • Welcome    │  │ • Keyword Tracking     │  │
│  │ • Scoring    │  │ • Nurture    │  │ • Backlink Monitor     │  │
│  │ • HubSpot    │  │ • Re-engage  │  │ • Site Health          │  │
│  └──────┬───────┘  └──────┬───────┘  │ • Competitor           │  │
│         │                  │          └──────────┬─────────────┘  │
│         │                  │                     │                 │
│         ▼                  ▼                     ▼                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │              REPORTING MODULE                                 │ │
│  │  • Weekly SEO Report                                         │ │
│  │  • Monthly Marketing Report                                  │ │
│  │  • GA4 Data Sync                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
       │             │              │                   │
       ▼             ▼              ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OUTPUT CHANNELS                              │
├─────────────┬──────────────┬──────────────┬─────────────────────┤
│  PostgreSQL │  Slack       │  Email       │  HubSpot            │
│  (Storage)  │  (Alerts)    │  (Reports)   │  (Sync Back)        │
└─────────────┴──────────────┴──────────────┴─────────────────────┘
```

## Module Dependencies

### CRM Module
- **Input**: Webhook data, HubSpot API
- **Output**: PostgreSQL, Slack notifications
- **Schedule**: Real-time (webhook) + Every 15 min (sync) + Hourly (scoring)

### Marketing Module
- **Input**: PostgreSQL (contact data dari CRM module)
- **Output**: SendGrid emails, PostgreSQL (activity logs), Slack
- **Schedule**: Hourly (welcome) + Weekdays 9AM (nurture) + Weekly Monday (re-engagement)
- **Dependencies**: CRM module harus aktif terlebih dahulu

### SEO Module
- **Input**: Ahrefs API, HTTP checks
- **Output**: PostgreSQL, Slack alerts
- **Schedule**: Daily 5-8 AM (staggered) + Weekly (competitor)
- **Dependencies**: Tidak ada (independent)

### Reporting Module
- **Input**: PostgreSQL (semua data dari module lain), GA4 API
- **Output**: Slack reports, Email reports, PostgreSQL (snapshots)
- **Schedule**: Daily 2AM (GA4) + Weekly Monday 9AM (SEO) + Monthly 1st (Marketing)
- **Dependencies**: Semua module lain harus sudah mengisi data

## Data Flow

### Contact Lifecycle
```
Website Form → Webhook → Create Contact → Calculate Score → Log Activity
                                                    ↓
                                            Score >= 80?
                                           /            \
                                         Yes             No
                                          ↓              ↓
                                    Hot Lead Alert    Nurture Campaign
                                          ↓              ↓
                                    Sales Outreach   Score Update
                                          ↓              ↓
                                    Deal Created     Re-check Score
                                          ↓
                                    Won / Lost
```

### SEO Monitoring Cycle
```
Daily 6AM: Check Rankings → Save → Alert if significant change
Daily 7AM: Check Backlinks → Save new → Alert if high DR → Check lost
Daily 5AM: Health Check → Save → Alert if critical
Weekly:    Competitor Analysis → Gap Analysis → Report
```

## Scaling Considerations

### Multi-Tenant Support
- Tambahkan `client_id` ke semua tables
- Filter queries berdasarkan client
- Separate Slack channels per client

### Rate Limiting
- Batch processing untuk API calls
- Staggered schedules untuk menghindari burst
- Redis queue untuk high-volume webhooks

### High Availability
- n8n cluster mode (Enterprise)
- PostgreSQL replication
- Redis Sentinel untuk failover
