import { test as setup } from '../config/testEnv';
import { LoginPage } from '../pages/LoginPage';

setup('authenticate as outage mock user', async ({ page, env }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('outage@example.com', 'password123');
  await page.waitForURL('/');
  await page.context().storageState({ path: `playwright/.auth/outage-${env.name}.json` });
});
