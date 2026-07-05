import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('dashboard index (healthy profile)', () => {
  test('renders all four domain sections with their service cards', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();

    await expect(dashboardPage.sectionHeading('Frontend Smoke Tests')).toBeVisible();
    await expect(dashboardPage.sectionHeading('Gateway API Tests')).toBeVisible();
    await expect(dashboardPage.sectionHeading('ETL Validation')).toBeVisible();
    await expect(dashboardPage.sectionHeading('MCP Protocol Assertions')).toBeVisible();

    await expect(dashboardPage.serviceCards()).toHaveCount(8);
  });

  test('every service shows as operational', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();

    const statuses = await dashboardPage
      .serviceCards()
      .getByTestId('service-status')
      .allTextContents();

    expect(statuses).toHaveLength(8);
    for (const status of statuses) {
      expect(status.trim()).toBe('operational');
    }
  });

  test('a card links to its drill-down page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();

    await dashboardPage.serviceCard('api-1').click();
    await page.waitForURL('/services/api-1');
  });
});
