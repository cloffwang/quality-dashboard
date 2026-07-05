import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/outage.json';

setup('authenticate as outage mock user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('outage@example.com', 'password123');
  await page.waitForURL('/');
  await page.context().storageState({ path: authFile });
});
