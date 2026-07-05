import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/healthy.json';

setup('authenticate as healthy mock user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('ok@example.com', 'password123');
  await page.waitForURL('/');
  await page.context().storageState({ path: authFile });
});
