import { test } from './fixtures';
import { description } from 'allure-js-commons';
import { DashboardPage } from '../pages/DashboardPage';
import { stepScreenshot } from '../helpers/allure';

test.describe('dashboard index (healthy profile)', () => {
  test('renders all four domain sections with their service cards', async ({ page }) => {
    await description('The dashboard index groups every service under its domain heading and renders one card per service, across all four domains.');

    const dashboardPage = new DashboardPage(page);

    await test.step('navigate to the dashboard', async () => {
      await dashboardPage.goto();
      await stepScreenshot(page, 'dashboard index');
    });

    await test.step('assert all four domain section headings are visible', async () => {
      await dashboardPage.expectAllDomainSectionsVisible();
    });

    await test.step('assert 8 service cards are rendered', async () => {
      await dashboardPage.expectServiceCardCount(8);
      await stepScreenshot(page, 'all service cards rendered');
    });
  });

  test('every service shows as operational', async ({ page }) => {
    await description('In the healthy mock profile, every one of the 8 services reports an "operational" status badge.');

    const dashboardPage = new DashboardPage(page);

    await test.step('navigate to the dashboard', async () => {
      await dashboardPage.goto();
    });

    await test.step('assert every service card status is "operational"', async () => {
      await dashboardPage.expectAllServicesOperational();
      await stepScreenshot(page, 'all statuses operational');
    });
  });

  test('a card links to its drill-down page', async ({ page }) => {
    await description('Clicking a service card navigates to that service\'s dedicated drill-down route.');

    const dashboardPage = new DashboardPage(page);

    await test.step('navigate to the dashboard', async () => {
      await dashboardPage.goto();
    });

    await test.step('click the api-1 service card', async () => {
      await dashboardPage.serviceCard('api-1').click();
      await stepScreenshot(page, 'after clicking service card');
    });

    await test.step('assert navigation to /services/api-1', async () => {
      await page.waitForURL('/services/api-1');
      await stepScreenshot(page, 'drill-down page loaded');
    });
  });
});
