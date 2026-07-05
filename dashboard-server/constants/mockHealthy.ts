import type { SystemMetricsPayload } from '@/types/metrics';

const allUp = Array<boolean>(48).fill(true);
const allOperational = Array<'operational'>(7).fill('operational');

function timestampsAgo(count: number, stepMinutes: number): string[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) =>
    new Date(now - (count - i) * stepMinutes * 60_000).toISOString()
  );
}

export const mockHealthy: SystemMetricsPayload = {
  frontendSmokeTests: [
    {
      id: 'fe-1',
      name: 'Marketing Site Smoke',
      status: 'operational',
      uptimeHistory: allUp,
      lastRunDurationMs: 4200,
      avgPassRate: 99.8,
      runHistory: timestampsAgo(5, 60).map((timestamp) => ({ timestamp, passed: true })),
    },
    {
      id: 'fe-2',
      name: 'Checkout Flow Smoke',
      status: 'operational',
      uptimeHistory: allUp,
      lastRunDurationMs: 6100,
      avgPassRate: 99.5,
      runHistory: timestampsAgo(5, 60).map((timestamp) => ({ timestamp, passed: true })),
    },
  ],
  backendApiMetrics: [
    {
      id: 'api-1',
      name: 'Gateway API',
      status: 'operational',
      currentErrorRate: 0,
      currentP95Latency: 120,
      latencySeries: timestampsAgo(12, 5).map((timestamp, i) => ({
        timestamp,
        latency: 90 + (i % 4) * 10,
      })),
    },
    {
      id: 'api-2',
      name: 'Billing Service',
      status: 'operational',
      currentErrorRate: 0,
      currentP95Latency: 85,
      latencySeries: timestampsAgo(12, 5).map((timestamp, i) => ({
        timestamp,
        latency: 60 + (i % 3) * 8,
      })),
    },
  ],
  etlPipelineJobs: [
    {
      id: 'etl-1',
      name: 'Nightly Orders ETL',
      status: 'operational',
      rowsProcessed: 1_284_003,
      dataQualityScore: 99.9,
      lastRunWindow: {
        start: timestampsAgo(1, 90)[0],
        end: timestampsAgo(1, 30)[0],
      },
      weeklyHistory: allOperational,
      quarantineLogs: [],
    },
    {
      id: 'etl-2',
      name: 'Customer 360 Sync',
      status: 'operational',
      rowsProcessed: 402_119,
      dataQualityScore: 99.7,
      lastRunWindow: {
        start: timestampsAgo(1, 90)[0],
        end: timestampsAgo(1, 30)[0],
      },
      weeklyHistory: allOperational,
      quarantineLogs: [],
    },
  ],
  mcpServiceMetrics: [
    {
      id: 'mcp-1',
      name: 'Agent Tool Router',
      status: 'operational',
      tokenThroughput: 18_400,
      toolInvokeSuccessRate: 99.6,
      liveLogs: timestampsAgo(6, 1).map((timestamp, i) => ({
        id: `mcp-1-log-${i}`,
        timestamp,
        message: i % 2 === 0 ? 'tool_call: search_docs' : 'tool_result: 200 OK',
        type: i % 2 === 0 ? 'req' : 'res',
      })),
    },
    {
      id: 'mcp-2',
      name: 'Context Retrieval Service',
      status: 'operational',
      tokenThroughput: 9_800,
      toolInvokeSuccessRate: 99.9,
      liveLogs: timestampsAgo(6, 1).map((timestamp, i) => ({
        id: `mcp-2-log-${i}`,
        timestamp,
        message: i % 2 === 0 ? 'tool_call: fetch_context' : 'tool_result: 200 OK',
        type: i % 2 === 0 ? 'req' : 'res',
      })),
    },
  ],
};
