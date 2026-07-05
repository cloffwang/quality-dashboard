import { mockHealthy } from '@/constants/mockHealthy';
import { mockErrors } from '@/constants/mockErrors';
import type { DomainEntity, MockProfile, SystemMetricsPayload } from '@/types/metrics';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function payloadForProfile(profile: MockProfile): SystemMetricsPayload {
  return profile === 'ERROR' ? mockErrors : mockHealthy;
}

export async function getDashboardMetrics(profile: MockProfile): Promise<SystemMetricsPayload> {
  await delay(randomBetween(200, 600));
  return payloadForProfile(profile);
}

export async function getServiceMetricsById(
  id: string,
  profile: MockProfile
): Promise<DomainEntity | undefined> {
  await delay(randomBetween(200, 600));
  const payload = payloadForProfile(profile);

  const frontend = payload.frontendSmokeTests.find((entry) => entry.id === id);
  if (frontend) return { domain: 'frontend-smoke', ...frontend };

  const backend = payload.backendApiMetrics.find((entry) => entry.id === id);
  if (backend) return { domain: 'backend-api', ...backend };

  const etl = payload.etlPipelineJobs.find((entry) => entry.id === id);
  if (etl) return { domain: 'etl-pipeline', ...etl };

  const mcp = payload.mcpServiceMetrics.find((entry) => entry.id === id);
  if (mcp) return { domain: 'mcp-service', ...mcp };

  return undefined;
}
