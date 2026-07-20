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

## Environments

Separate from the mock profile above, `APP_ENV` picks which *environment* is running —
`prod` (default) or `stage`. Stage shows a staging banner and a "(Staging)" title suffix;
otherwise the two environments are identical. Run both at once on separate ports (each
gets its own `.next`/`.next-stage` build cache so they don't conflict):

```bash
npm run dev         # prod, http://localhost:3000
npm run dev:stage   # stage, http://localhost:3001
```


## Structure

```
app/                      Routes: index, /login, /services/[serviceId], auth route handler
components/                Presentational components (heartbeat strip, latency chart, etc.)
types/metrics.ts          Domain models shared across mock data and pages
constants/                Mock users + the two mock data profiles (healthy/error)
services/api.ts           Data access layer — profile-aware, simulated network delay
lib/env.ts                APP_ENV (prod/stage) accessor
auth.ts / proxy.ts        Auth.js config and route protection
```

## Scripts

- `npm run dev` — dev server (prod, port 3000)
- `npm run dev:stage` — dev server (stage, port 3001)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type-check only
