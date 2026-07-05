# Quality & Uptime Control Center

A portfolio project: a mock "Quality & Uptime Control Center" status dashboard, paired
with a Playwright test suite that exercises it end-to-end. Built to demonstrate SDET
skills — test design and automation against a realistic app, not just unit tests against
toy functions.

The dashboard reports health for four operational domains, each backed entirely by mock
data so both a healthy and a degraded state can be demonstrated on demand:

- **Frontend Smoke Tests** — 48h heartbeat strip, run history, failure stack traces
- **Backend/Gateway API** — error rate, P95 latency, latency trend chart
- **ETL Pipelines** — weekly run calendar, rows processed, data-quality quarantine log
- **MCP Protocol Services** — token throughput, tool invocation success rate, live feed

Which state you see is driven by which mock account you log in as
(`ok@example.com` → healthy, `outage@example.com` → degraded/outage) — see
[dashboard-server/README.md](dashboard-server/README.md) for credentials and setup.

## Structure

```
dashboard-server/   Next.js 14+ App Router app — the dashboard itself, fully mocked
tests/              Playwright suite (in progress) — runs against the launched server
```

## Status

- `dashboard-server/` — built and verified.
- `tests/` and the GitHub Actions CI workflow — in progress.

## License

MIT — see [LICENSE](LICENSE).
