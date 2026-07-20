import { defineConfig, devices } from '@playwright/test';
import { environments, type EnvConfig } from './config/environments';

const AUTH_DIR = 'playwright/.auth';
const envs = Object.values(environments);

export default defineConfig<{ env: EnvConfig }>({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright', { resultsDir: 'allure-results', detail: true, suiteTitle: false }],
  ],

  use: {
    trace: 'on-first-retry',
  },

  // Reuses dashboard-server instances that are already running (local `npm run dev` /
  // `npm run dev:stage`, or ones already started by a CI step) and only launches its own
  // if nothing responds yet on that env's port.
  webServer: envs.map((env) => ({
    command: env.name === 'stage' ? 'npm run dev:stage' : 'npm run dev',
    cwd: '../dashboard-server',
    url: env.baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
  })),

  // One setup/ui/api project trio per environment, all running the same spec files —
  // only baseURL and the injected `env` fixture differ per project.
  projects: envs.flatMap((env) => [
    {
      name: `setup-healthy-${env.name}`,
      testDir: './setup',
      testMatch: 'healthy.setup.ts',
      use: { baseURL: env.baseURL, env },
    },
    {
      name: `setup-outage-${env.name}`,
      testDir: './setup',
      testMatch: 'outage.setup.ts',
      use: { baseURL: env.baseURL, env },
    },
    {
      name: `ui-${env.name}`,
      testDir: './ui',
      dependencies: [`setup-healthy-${env.name}`, `setup-outage-${env.name}`],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: env.baseURL,
        env,
        storageState: `${AUTH_DIR}/healthy-${env.name}.json`,
      },
    },
    {
      name: `api-${env.name}`,
      testDir: './api',
      use: { ...devices['Desktop Chrome'], baseURL: env.baseURL, env },
    },
  ]),
});
