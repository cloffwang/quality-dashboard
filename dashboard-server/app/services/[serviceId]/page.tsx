import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import { getServiceMetricsById } from '@/services/api';
import { StatTile } from '@/components/StatTile';
import { HeartbeatStrip } from '@/components/HeartbeatStrip';
import { RunHistoryLog } from '@/components/RunHistoryLog';
import { StackTracePanel } from '@/components/StackTracePanel';
import { LatencyChart } from '@/components/LatencyChart';
import { WeeklyCalendar } from '@/components/WeeklyCalendar';
import { QuarantineLog } from '@/components/QuarantineLog';
import { LiveTerminalFeed } from '@/components/LiveTerminalFeed';

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const session = await auth();
  const entity = await getServiceMetricsById(serviceId, session!.user.profile);

  if (!entity) notFound();

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-neutral-400 hover:text-neutral-200">
          ← Back to dashboard
        </Link>

        <div className="mt-4 mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-neutral-100">{entity.name}</h1>
          <span className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-300">
            {entity.status}
          </span>
        </div>

        {entity.domain === 'frontend-smoke' && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                48h Heartbeat
              </h2>
              <HeartbeatStrip history={entity.uptimeHistory} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Avg pass rate" value={entity.avgPassRate} unit="%" />
              <StatTile label="Last run duration" value={entity.lastRunDurationMs} unit="ms" />
            </div>
            {entity.lastFailureStackTrace && (
              <StackTracePanel stackTrace={entity.lastFailureStackTrace} />
            )}
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Run History
              </h2>
              <RunHistoryLog entries={entity.runHistory} />
            </div>
          </div>
        )}

        {entity.domain === 'backend-api' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Error rate" value={entity.currentErrorRate} unit="%" />
              <StatTile label="P95 latency" value={entity.currentP95Latency} unit="ms" />
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Latency Trend
              </h2>
              <LatencyChart data={entity.latencySeries} />
            </div>
          </div>
        )}

        {entity.domain === 'etl-pipeline' && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Weekly Runs
              </h2>
              <WeeklyCalendar history={entity.weeklyHistory} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Rows processed" value={entity.rowsProcessed.toLocaleString()} />
              <StatTile label="Data quality score" value={entity.dataQualityScore} unit="%" />
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Quarantine Log
              </h2>
              <QuarantineLog entries={entity.quarantineLogs} />
            </div>
          </div>
        )}

        {entity.domain === 'mcp-service' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Token throughput" value={entity.tokenThroughput.toLocaleString()} />
              <StatTile label="Tool success rate" value={entity.toolInvokeSuccessRate} unit="%" />
            </div>
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                Live Feed
              </h2>
              <LiveTerminalFeed entries={entity.liveLogs} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
