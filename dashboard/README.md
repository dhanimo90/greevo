# GreeVo Dashboard

Client-facing web dashboard untuk GreeVo platform.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React

## Pages
- `/` — Executive Dashboard (KPI cards)
- `/contacts` — Contact list with search & filter
- `/deals` — Sales pipeline (Kanban board)
- `/seo` — Keyword rankings & backlinks
- `/marketing` — Email campaigns & stats
- `/reports` — Automated report list
- `/ai` — Natural language query assistant
- `/settings` — API keys, integrations, preferences

## Getting Started

```bash
cd dashboard
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Build for Production

```bash
npm run build
npm start
```

## Connect to Backend

Set `NEXT_PUBLIC_API_URL` in `.env.local` to your n8n webhook base URL:
```
NEXT_PUBLIC_API_URL=https://your-n8n-domain.com/webhook
```

Store API key in localStorage as `greevo_api_key`.
