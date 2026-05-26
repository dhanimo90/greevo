# GreeVo API Reference

Base URL: `https://your-n8n-domain.com/webhook`

## Authentication

All endpoints require `X-API-Key` header:
```
X-API-Key: gv_your_api_key_here
```

---

## Auth

### POST /auth/login
Login with email and password.

**Request:**
```json
{ "email": "user@company.com", "password": "your_password" }
```

**Response (200):**
```json
{
  "success": true,
  "email": "user@company.com",
  "name": "User Name",
  "role": "admin",
  "company": "Company Name",
  "api_key": "gv_...",
  "token": "session_token"
}
```

**Response (401):**
```json
{ "success": false, "message": "Email atau password salah" }
```

---

## Portal

### GET /portal/dashboard
Get dashboard KPI summary.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_contacts": 234,
    "customers": 45,
    "hot_leads": 18,
    "pipeline_value": 1250000000,
    "revenue_mtd": 450000000,
    "tracked_keywords": 156,
    "top10_count": 42
  }
}
```

### GET /portal/contacts
List contacts with pagination.

**Query params:** `page`, `limit`, `status`, `search`

**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "email": "john@acme.com", "first_name": "John", "lead_score": 85, "lead_status": "qualified" }
  ],
  "page": 1,
  "limit": 50
}
```

### GET /portal/keywords
Get keyword rankings.

**Response:**
```json
{
  "success": true,
  "data": [
    { "keyword": "crm terbaik", "position": 2, "previous_position": 3, "change": 1, "search_volume": 3200 }
  ]
}
```

---

## Contacts

### POST /v2/contact-sync
Create or update a contact (authenticated).

**Request:**
```json
{
  "email": "lead@company.com",
  "first_name": "Jane",
  "last_name": "Doe",
  "company": "PT Example",
  "phone": "+6281234567890",
  "source": "website",
  "tags": ["marketing"],
  "custom_fields": { "industry": "tech" }
}
```

### POST /api/v1/contacts
Zapier/Make compatible endpoint.

### POST /api/v1/events
Track custom events.

**Request:**
```json
{
  "email": "user@company.com",
  "event": "page_view",
  "properties": { "url": "/pricing", "duration": 45 }
}
```

---

## AI

### POST /ai/generate-email
Generate email copy with AI.

**Request:**
```json
{
  "purpose": "promotional",
  "tone": "casual",
  "audience": "startup founders",
  "product": "marketing automation",
  "cta": "Start free trial",
  "language": "Indonesian"
}
```

### POST /ai/ask
Natural language data query.

**Request:**
```json
{ "question": "Berapa total leads bulan ini?" }
```

**Response:**
```json
{
  "success": true,
  "question": "Berapa total leads bulan ini?",
  "explanation": "Counting contacts created this month",
  "sql": "SELECT COUNT(*) FROM contacts WHERE...",
  "results": [{ "count": 47 }]
}
```

### POST /chatbot/message
AI chatbot conversation.

**Request:**
```json
{
  "session_id": "sess_123",
  "message": "Berapa harga paket enterprise?",
  "email": "visitor@company.com"
}
```

---

## Sales

### POST /sales/generate-proposal
Generate and send proposal.

### POST /meetings/booked
Webhook for meeting schedulers (Calendly, Cal.com).

### POST /sales/assign-lead
Manually assign a lead to sales rep.

---

## Marketing

### POST /ab-test/create
Create A/B test campaign.

### POST /messaging/send
Send WhatsApp or SMS message.

### POST /social/post
Post to social media platforms.

### POST /unsubscribe
Unsubscribe contact from emails.

### POST /preferences/update
Update email preferences.

---

## Reports

### POST /reports/generate
Generate shareable report link.

**Request:**
```json
{ "report_type": "seo_weekly", "title": "SEO Report Jan 2025", "expires_days": 30 }
```

**Response:**
```json
{ "success": true, "report_url": "https://domain.com/webhook/reports/view/TOKEN", "expires_at": "..." }
```

---

## Billing

### POST /billing/stripe-webhook
Stripe webhook endpoint (configured in Stripe Dashboard).

---

## Compliance

### POST /compliance/data-request
GDPR data subject request.

**Request:**
```json
{ "request_type": "deletion", "email": "user@example.com", "reason": "No longer using" }
```

---

## Webhooks (Inbound)

| Endpoint | Source | Purpose |
|----------|--------|---------|
| `/whatsapp/webhook` | Meta | WhatsApp inbound messages |
| `/telegram/webhook` | Telegram | Bot commands |
| `/wordpress/form-submit` | WordPress | Form submissions |
| `/wordpress/page-view` | WordPress | Page tracking |
| `/ecommerce/order` | Shopify/WooCommerce | New orders |
| `/ecommerce/cart-abandoned` | Shopify | Cart abandonment |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| `/auth/login` | 5 attempts / 15 min per email |
| `/api/v1/*` | 100 requests / minute |
| `/ai/*` | 20 requests / minute |
| `/portal/*` | 60 requests / minute |

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad request (missing/invalid params) |
| 401 | Unauthorized (invalid API key) |
| 403 | Forbidden (insufficient permissions) |
| 429 | Rate limited |
| 500 | Server error |
