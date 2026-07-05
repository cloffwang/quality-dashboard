import { defineConfig, devices } from '@playwright/test';

const AUTH_DIR = 'playwright/.auth';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  // Reuses a dashboard-server that's already running (local `npm run dev`, or one
  // already started by a CI step) and only launches its own if nothing responds yet.
  webServer: {
    command: 'npm run dev',
    cwd: '../dashboard-server',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },

  projects: [
    {
      name: 'setup-healthy',
      testDir: './setup',
      testMatch: 'healthy.setup.ts',
    },
    {
      name: 'setup-outage',
      testDir: './setup',
      testMatch: 'outage.setup.ts',
    },
    {
      name: 'ui',
      testDir: './ui',
      dependencies: ['setup-healthy', 'setup-outage'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: `${AUTH_DIR}/healthy.json`,
      },
    },
    {
      name: 'api',
      testDir: './api',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
