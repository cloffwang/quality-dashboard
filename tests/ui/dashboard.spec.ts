import { test, expect } from './fixtures';
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
      await expect(dashboardPage.sectionHeading('Frontend Smoke Tests')).toBeVisible();
      await expect(dashboardPage.sectionHeading('Gateway API Tests')).toBeVisible();
      await expect(dashboardPage.sectionHeading('ETL Validation')).toBeVisible();
      await expect(dashboardPage.sectionHeading('MCP Protocol Assertions')).toBeVisible();
    });

    await test.step('assert 8 service cards are rendered', async () => {
      await expect(dashboardPage.serviceCards()).toHaveCount(8);
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
      const statuses = await dashboardPage
        .serviceCards()
        .getByTestId('service-status')
        .allTextContents();

      expect(statuses).toHaveLength(8);
      for (const status of statuses) {
        expect(status.trim()).toBe('operational');
      }
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
