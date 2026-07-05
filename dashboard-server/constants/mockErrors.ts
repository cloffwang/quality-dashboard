import type { SystemMetricsPayload } from '@/types/metrics';

function timestampsAgo(count: number, stepMinutes: number): string[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) =>
    new Date(now - (count - i) * stepMinutes * 60_000).toISOString()
  );
}

const heartbeatWithOutage = [...Array<boolean>(40).fill(true), ...Array<boolean>(8).fill(false)];

const FAILURE_STACK_TRACE = `AssertionError: expected element #checkout-submit to be visible
    at CheckoutPage.assertSubmitVisible (tests/pages/checkout.page.ts:42:11)
    at Object.<anonymous> (tests/ui/checkout.spec.ts:18:5)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`;

export const mockErrors: SystemMetricsPayload = {
  frontendSmokeTests: [
    {
      id: 'fe-1',
      name: 'Marketing Site Smoke',
      status: 'operational',
      uptimeHistory: Array<boolean>(48).fill(true),
      lastRunDurationMs: 4300,
      avgPassRate: 99.6,
      runHistory: timestampsAgo(5, 60).map((timestamp) => ({ timestamp, passed: true })),
    },
    {
      id: 'fe-2',
      name: 'Checkout Flow Smoke',
      status: 'down',
      uptimeHistory: heartbeatWithOutage,
      lastRunDurationMs: 9800,
      avgPassRate: 71.2,
      runHistory: [
        ...timestampsAgo(4, 60).map((timestamp) => ({ timestamp, passed: true })),
        { timestamp: timestampsAgo(1, 60)[0], passed: false },
      ],
      lastFailureStackTrace: FAILURE_STACK_TRACE,
    },
  ],
  backendApiMetrics: [
    {
      id: 'api-1',
      name: 'Gateway API',
      status: 'down',
      currentErrorRate: 15,
      currentP95Latency: 4500,
      latencySeries: timestampsAgo(12, 5).map((timestamp, i) => ({
        timestamp,
        latency: i < 8 ? 100 + (i % 4) * 10 : 3800 + i * 60,
      })),
    },
    {
      id: 'api-2',
      name: 'Billing Service',
      status: 'degraded',
      currentErrorRate: 4,
      currentP95Latency: 950,
      latencySeries: timestampsAgo(12, 5).map((timestamp, i) => ({
        timestamp,
        latency: 200 + (i % 3) * 60,
      })),
    },
  ],
  etlPipelineJobs: [
    {
      id: 'etl-1',
      name: 'Nightly Orders ETL',
      status: 'degraded',
      rowsProcessed: 918_442,
      dataQualityScore: 82.4,
      lastRunWindow: {
        start: timestampsAgo(1, 120)[0],
        end: timestampsAgo(1, 20)[0],
      },
      weeklyHistory: ['operational', 'operational', 'operational', 'operational', 'degraded', 'degraded', 'degraded'],
      quarantineLogs: [
        {
          id: 'etl-1-q1',
          timestamp: timestampsAgo(1, 25)[0],
          rule: 'non_null_customer_id',
          sampleRow: '{"order_id":"ord_9182","customer_id":null}',
        },
        {
          id: 'etl-1-q2',
          timestamp: timestampsAgo(1, 22)[0],
          rule: 'total_amount_positive',
          sampleRow: '{"order_id":"ord_9203","total_amount":-14.5}',
        },
      ],
    },
    {
      id: 'etl-2',
      name: 'Customer 360 Sync',
      status: 'operational',
      rowsProcessed: 398_204,
      dataQualityScore: 99.5,
      lastRunWindow: {
        start: timestampsAgo(1, 90)[0],
        end: timestampsAgo(1, 30)[0],
      },
      weeklyHistory: Array<'operational'>(7).fill('operational'),
      quarantineLogs: [],
    },
  ],
  mcpServiceMetrics: [
    {
      id: 'mcp-1',
      name: 'Agent Tool Router',
      status: 'degraded',
      tokenThroughput: 6_200,
      toolInvokeSuccessRate: 87.3,
      liveLogs: timestampsAgo(6, 1).map((timestamp, i) => ({
        id: `mcp-1-log-${i}`,
        timestamp,
        message:
          i % 2 === 0
            ? 'tool_call: search_docs'
            : i === 5
              ? 'tool_result: 504 Gateway Timeout'
              : 'tool_result: 200 OK',
        type: i % 2 === 0 ? 'req' : 'res',
      })),
    },
    {
      id: 'mcp-2',
      name: 'Context Retrieval Service',
      status: 'operational',
      tokenThroughput: 9_650,
      toolInvokeSuccessRate: 99.8,
      liveLogs: timestampsAgo(6, 1).map((timestamp, i) => ({
        id: `mcp-2-log-${i}`,
        timestamp,
        message: i % 2 === 0 ? 'tool_call: fetch_context' : 'tool_result: 200 OK',
        type: i % 2 === 0 ? 'req' : 'res',
      })),
    },
  ],
};
