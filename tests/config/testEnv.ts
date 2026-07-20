import { test as base } from '@playwright/test';
import { environments, type EnvConfig } from './environments';

export const test = base.extend<{}, { env: EnvConfig }>({
  env: [environments.prod, { option: true, scope: 'worker' }],
});
