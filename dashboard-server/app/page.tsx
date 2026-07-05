import { auth, signOut } from '@/auth';
import { getDashboardMetrics } from '@/services/api';
import { ServiceCard } from '@/components/ServiceCard';

export default async function Home() {
  const session = await auth();
  const profile = session!.user.profile;
  const metrics = await getDashboardMetrics(profile);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-100">Quality &amp; Uptime Control Center</h1>
            <p className="mt-1 text-sm text-neutral-400">
              Signed in as {session!.user.email} ({profile === 'ERROR' ? 'outage view' : 'healthy view'})
            </p>
          </div>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/login' });
            }}
          >
            <button className="rounded border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-900">
              Sign out
            </button>
          </form>
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Frontend Smoke Tests
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.frontendSmokeTests.map((entry) => (
              <ServiceCard
                key={entry.id}
                id={entry.id}
                name={entry.name}
                status={entry.status}
                domainLabel="Frontend Smoke"
                summary={`${entry.avgPassRate}% avg pass rate`}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Gateway API Tests
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.backendApiMetrics.map((entry) => (
              <ServiceCard
                key={entry.id}
                id={entry.id}
                name={entry.name}
                status={entry.status}
                domainLabel="Gateway API"
                summary={`${entry.currentErrorRate}% error rate · P95 ${entry.currentP95Latency}ms`}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            ETL Validation
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.etlPipelineJobs.map((entry) => (
              <ServiceCard
                key={entry.id}
                id={entry.id}
                name={entry.name}
                status={entry.status}
                domainLabel="ETL Pipeline"
                summary={`${entry.dataQualityScore}% data quality`}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
            MCP Protocol Assertions
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.mcpServiceMetrics.map((entry) => (
              <ServiceCard
                key={entry.id}
                id={entry.id}
                name={entry.name}
                status={entry.status}
                domainLabel="MCP Service"
                summary={`${entry.toolInvokeSuccessRate}% tool success rate`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
