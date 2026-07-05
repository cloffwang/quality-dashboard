# dashboard-server

The "Quality & Uptime Control Center" dashboard — Next.js 14+ (App Router), TypeScript,
Tailwind CSS. Entirely mock-backed: no real backend, database, or external services.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/login`.

## Mock accounts

Which account you log in as determines which state the dashboard shows — there's no env
var or config flag, it's entirely driven by the logged-in user's mock profile:

| Email | Password | Shows |
|---|---|---|
| `ok@example.com` | `password123` | All services healthy/operational |
| `outage@example.com` | `password123` | Mixed degraded/down states, latency spikes, stack traces, quarantined ETL rows |

## Structure

```
app/                      Routes: index, /login, /services/[serviceId], auth route handler
components/                Presentational components (heartbeat strip, latency chart, etc.)
types/metrics.ts          Domain models shared across mock data and pages
constants/                Mock users + the two mock data profiles (healthy/error)
services/api.ts           Data access layer — profile-aware, simulated network delay
auth.ts / proxy.ts        Auth.js config and route protection
```

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type-check only
