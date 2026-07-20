import { test } from './fixtures';
import { description } from 'allure-js-commons';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { stepScreenshot } from '../helpers/allure';

test.describe('service detail (healthy profile)', () => {
  test('backend API shows a normal P95 latency', async ({ page }) => {
    await description('In the healthy profile, the Gateway API drill-down shows a normal (non-spiked) P95 latency stat.');

    const detail = new ServiceDetailPage(page);

    await test.step('navigate to the api-1 drill-down page', async () => {
      await detail.goto('api-1');
      await stepScreenshot(page, 'api-1 drill-down (healthy)');
    });

    await test.step('assert heading and normal P95 latency', async () => {
      await detail.expectHeading('Gateway API');
      await detail.expectStatValueNot('P95 latency', '4500');
    });
  });

  test('ETL pipeline has no quarantined rows', async ({ page }) => {
    await description('In the healthy profile, the ETL pipeline drill-down reports zero quarantined rows.');

    const detail = new ServiceDetailPage(page);

    await test.step('navigate to the etl-1 drill-down page', async () => {
      await detail.goto('etl-1');
      await stepScreenshot(page, 'etl-1 drill-down (healthy)');
    });

    await test.step('assert quarantine log is empty', async () => {
      await detail.expectNoQuarantinedRows();
    });
  });
});

const outageTest = test.extend({
  storageState: async ({ env }, use) => {
    await use(`playwright/.auth/outage-${env.name}.json`);
  },
});

outageTest.describe('service detail (outage profile)', () => {
  outageTest('frontend smoke test shows its failure stack trace', async ({ page }) => {
    await description('In the outage profile, a failed frontend smoke test surfaces its assertion stack trace on the drill-down page.');

    const detail = new ServiceDetailPage(page);

    await test.step('navigate to the fe-2 drill-down page', async () => {
      await detail.goto('fe-2');
      await stepScreenshot(page, 'fe-2 drill-down (outage)');
    });

    await test.step('assert the stack trace panel is visible with an AssertionError', async () => {
      await detail.expectStackTrace('AssertionError');
      await stepScreenshot(page, 'stack trace panel visible');
    });
  });

  outageTest('backend API shows the latency spike', async ({ page }) => {
    await description('In the outage profile, the Gateway API drill-down reflects the mock latency spike (4500ms).');

    const detail = new ServiceDetailPage(page);

    await test.step('navigate to the api-1 drill-down page', async () => {
      await detail.goto('api-1');
      await stepScreenshot(page, 'api-1 drill-down (outage)');
    });

    await test.step('assert P95 latency shows the spike', async () => {
      await detail.expectStatValue('P95 latency', '4500');
    });
  });

  outageTest('ETL pipeline shows its quarantined rows', async ({ page }) => {
    await description('In the outage profile, the ETL pipeline drill-down lists its quarantined rows from the failed validation run.');

    const detail = new ServiceDetailPage(page);

    await test.step('navigate to the etl-1 drill-down page', async () => {
      await detail.goto('etl-1');
      await stepScreenshot(page, 'etl-1 drill-down (outage)');
    });

    await test.step('assert two quarantine entries are listed', async () => {
      await detail.expectQuarantineEntryCount(2);
      await stepScreenshot(page, 'quarantine entries listed');
    });
  });
});
