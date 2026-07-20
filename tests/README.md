# tests

Playwright (TypeScript) suite for the `dashboard-server` app. Self-contained project,
sibling of `dashboard-server/`, demostrating regression tests by playwright for ui/api.

## Getting started

```bash
npm install
npx playwright install chromium
npm test
```

`playwright.config.ts` launches both `dashboard-server` environments automatically
(`webServer`, `reuseExistingServer: true`) if nothing is already running on their ports —
no need to start them by hand first, though you can (`npm run dev` / `npm run dev:stage`
in `dashboard-server/` in another terminal) and Playwright will reuse them.

## Structure

```
config/   Per-environment source of truth (environments.ts) + the `env` fixture (testEnv.ts)
pages/    Page Object Models (LoginPage, DashboardPage, ServiceDetailPage)
setup/    Logs in as each mock account, saves storageState for reuse by the "ui-*" projects
ui/       Browser specs (login, dashboard index, service drill-down, environment chrome)
api/      Non-browser specs against dashboard-server's Auth.js JSON routes
```

## Environments

Every project doubles into a `prod` and a `stage` variant (`ui-prod`/`ui-stage`,
`api-prod`/`api-stage`, ...) — same spec files run against both, unmodified. Each project
injects a worker-scoped `env` fixture (see `config/environments.ts` /
`config/testEnv.ts`) carrying that environment's `baseURL` and expected UI differences
(staging banner, page title suffix). Specs read `env` instead of hardcoding a port or
environment-specific copy — see `ui/environment.spec.ts` for the pattern. 

## Profiles

Which mock user you authenticate as determines the app's state — `ok@example.com` is
healthy, `outage@example.com` is degraded/outage. The `ui-*` projects default to the
healthy storageState; specs that need the outage state override per-file with a small
`test.extend` that derives the env-tagged path from the `env` fixture (see
`ui/service-detail.spec.ts`'s `outageTest`).

## Scripts

- `npm test` — run everything (setup projects, then all `ui-*` and `api-*` projects)
- `npm run test:ui` — the `ui-prod` and `ui-stage` projects
- `npm run test:api` — the `api-prod` and `api-stage` projects
- `npm run test:headed` — run headed (visible browser)
- `npm run report` — open the last HTML report
