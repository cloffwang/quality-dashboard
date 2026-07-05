# tests

Playwright (TypeScript) suite for the `dashboard-server` app. Self-contained project,
sibling of `dashboard-server/` — see
[../designs/tests-technical-design.md](../designs/tests-technical-design.md) for the design.

## Getting started

```bash
npm install
npx playwright install chromium
npm test
```

`playwright.config.ts` launches `dashboard-server` automatically (`webServer`,
`reuseExistingServer: true`) if nothing is already running on `http://localhost:3000` —
no need to start it by hand first, though you can (e.g. `npm run dev` in
`dashboard-server/` in another terminal) and Playwright will reuse it.

## Structure

```
pages/    Page Object Models (LoginPage, DashboardPage, ServiceDetailPage)
setup/    Logs in as each mock account, saves storageState for reuse by the "ui" project
ui/       Browser specs (login, dashboard index, service drill-down)
api/      Non-browser specs against dashboard-server's Auth.js JSON routes
```

## Profiles

Which mock user you authenticate as determines the app's state — `ok@example.com` is
healthy, `outage@example.com` is degraded/outage. The `ui` project defaults to the
healthy storageState; specs that need the outage state override per-file:

```ts
test.use({ storageState: 'playwright/.auth/outage.json' });
```

## Scripts

- `npm test` — run everything (setup projects, then `ui` and `api`)
- `npm run test:ui` — just the `ui` project
- `npm run test:api` — just the `api` project
- `npm run test:headed` — run headed (visible browser)
- `npm run report` — open the last HTML report
