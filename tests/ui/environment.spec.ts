import { test } from './fixtures';
import { description } from 'allure-js-commons';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('environment chrome', () => {
  test('shows the environment-appropriate banner and title', async ({ page, env }) => {
    await description('The dashboard shows a staging banner and a "(Staging)" title suffix on the stage environment, and neither on prod — same assertions, driven entirely by the injected env fixture.');

    const dashboardPage = new DashboardPage(page);

    await test.step(`navigate to the dashboard (${env.name})`, async () => {
      await dashboardPage.goto();
    });

    await test.step('assert staging banner visibility matches this environment', async () => {
      await dashboardPage.expectStagingBanner(env.showsStagingBanner);
    });

    await test.step('assert page title matches this environment', async () => {
      await dashboardPage.expectTitle(`Quality & Uptime Control Center${env.titleSuffix}`);
    });
  });
});
