import { test as setup } from '../config/testEnv';
import { LoginPage } from '../pages/LoginPage';

setup('authenticate as healthy mock user', async ({ page, env }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('ok@example.com', 'password123');
  await page.waitForURL('/');
  await page.context().storageState({ path: `playwright/.auth/healthy-${env.name}.json` });
});
