import { test } from './fixtures';
import { description } from 'allure-js-commons';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { stepScreenshot } from '../helpers/allure';

// Start each test unauthenticated, regardless of the "ui" project's default storageState.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('login', () => {
  test('redirects unauthenticated visitors to /login', async ({ page }) => {
    await description('An unauthenticated visitor hitting the dashboard root is bounced to the login page instead of seeing any data.');

    await test.step('navigate to the dashboard root', async () => {
      await page.goto('/');
      await stepScreenshot(page, 'dashboard root before redirect');
    });

    await test.step('assert redirect to /login', async () => {
      await page.waitForURL('/login');
      await stepScreenshot(page, 'landed on /login');
    });
  });

  test('rejects invalid credentials', async ({ page }) => {
    await description('Submitting a valid email with the wrong password surfaces an inline error instead of granting access.');

    const loginPage = new LoginPage(page);

    await test.step('navigate to /login', async () => {
      await loginPage.goto();
      await stepScreenshot(page, 'login form');
    });

    await test.step('submit invalid credentials', async () => {
      await loginPage.login('ok@example.com', 'wrong-password');
      await stepScreenshot(page, 'after submitting invalid credentials');
    });

    await test.step('assert error message is shown', async () => {
      await loginPage.expectError();
      await stepScreenshot(page, 'error message visible');
    });
  });

  test('logs in with valid credentials and reaches the dashboard', async ({ page }) => {
    await description('A valid email/password pair authenticates the user and lands them on the dashboard with service cards rendered.');

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('navigate to /login', async () => {
      await loginPage.goto();
      await stepScreenshot(page, 'login form');
    });

    await test.step('submit valid credentials', async () => {
      await loginPage.login('ok@example.com', 'password123');
      await page.waitForURL('/');
    });

    await test.step('assert dashboard renders service cards', async () => {
      await dashboardPage.expectServiceCardsVisible();
      await stepScreenshot(page, 'dashboard after login');
    });
  });
});
