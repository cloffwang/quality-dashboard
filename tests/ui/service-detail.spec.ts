import { test, expect } from '@playwright/test';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';

test.describe('service detail (healthy profile)', () => {
  test('backend API shows a normal P95 latency', async ({ page }) => {
    const detail = new ServiceDetailPage(page);
    await detail.goto('api-1');
    await expect(detail.heading).toHaveText('Gateway API');
    await expect(detail.statValue('P95 latency')).not.toContainText('4500');
  });

  test('ETL pipeline has no quarantined rows', async ({ page }) => {
    const detail = new ServiceDetailPage(page);
    await detail.goto('etl-1');
    await expect(detail.quarantineLog).toContainText('No quarantined rows.');
  });
});

test.describe('service detail (outage profile)', () => {
  test.use({ storageState: 'playwright/.auth/outage.json' });

  test('frontend smoke test shows its failure stack trace', async ({ page }) => {
    const detail = new ServiceDetailPage(page);
    await detail.goto('fe-2');
    await expect(detail.stackTracePanel).toBeVisible();
    await expect(detail.stackTracePanel).toContainText('AssertionError');
  });

  test('backend API shows the latency spike', async ({ page }) => {
    const detail = new ServiceDetailPage(page);
    await detail.goto('api-1');
    await expect(detail.statValue('P95 latency')).toContainText('4500');
  });

  test('ETL pipeline shows its quarantined rows', async ({ page }) => {
    const detail = new ServiceDetailPage(page);
    await detail.goto('etl-1');
    await expect(detail.quarantineEntries).toHaveCount(2);
  });
});
