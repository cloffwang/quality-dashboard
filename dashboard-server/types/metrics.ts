export type ServiceStatus = 'operational' | 'degraded' | 'down';

export interface FrontendSmokeTest {
  id: string;
  name: string;
  status: ServiceStatus;
  /** 48 half-hour buckets (24h heartbeat strip), oldest first. */
  uptimeHistory: boolean[];
  lastRunDurationMs: number;
  avgPassRate: number;
  /** Pass/fail log per run, distinct from the heartbeat strip above. */
  runHistory: { timestamp: string; passed: boolean }[];
  /** Populated only when the most recent run failed. */
  lastFailureStackTrace?: string;
}

export interface BackendApiMetric {
  id: string;
  name: string;
  status: ServiceStatus;
  /** Percent, 0-100. */
  currentErrorRate: number;
  currentP95Latency: number;
  latencySeries: { timestamp: string; latency: number }[];
}

export interface EtlPipelineJob {
  id: string;
  name: string;
  status: ServiceStatus;
  rowsProcessed: number;
  dataQualityScore: number;
  lastRunWindow: { start: string; end: string };
  /** Last 7 daily runs, oldest first. */
  weeklyHistory: ServiceStatus[];
  quarantineLogs: { id: string; timestamp: string; rule: string; sampleRow?: string }[];
}

export interface McpServiceMetric {
  id: string;
  name: string;
  status: ServiceStatus;
  tokenThroughput: number;
  toolInvokeSuccessRate: number;
  /** Rolling window, newest last. */
  liveLogs: { id: string; timestamp: string; message: string; type: 'req' | 'res' }[];
}

export interface SystemMetricsPayload {
  frontendSmokeTests: FrontendSmokeTest[];
  backendApiMetrics: BackendApiMetric[];
  etlPipelineJobs: EtlPipelineJob[];
  mcpServiceMetrics: McpServiceMetric[];
}

export type MockProfile = 'HEALTHY' | 'ERROR';

/** Result of a global-id lookup, tagged with which domain it came from. */
export type DomainEntity =
  | ({ domain: 'frontend-smoke' } & FrontendSmokeTest)
  | ({ domain: 'backend-api' } & BackendApiMetric)
  | ({ domain: 'etl-pipeline' } & EtlPipelineJob)
  | ({ domain: 'mcp-service' } & McpServiceMetric);
