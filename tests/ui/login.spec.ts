import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

// Start each test unauthenticated, regardless of the "ui" project's default storageState.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('login', () => {
  test('redirects unauthenticated visitors to /login', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL('/login');
  });

  test('rejects invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('ok@example.com', 'wrong-password');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('logs in with valid credentials and reaches the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login('ok@example.com', 'password123');
    await page.waitForURL('/');
    await expect(dashboardPage.serviceCards().first()).toBeVisible();
  });
});
