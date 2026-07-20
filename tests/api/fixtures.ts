import { test as base } from '../config/testEnv';
import { parentSuite } from 'allure-js-commons';

export const test = base.extend<{ autoAllureSuite: void }>({
  autoAllureSuite: [
    async ({}, use) => {
      await parentSuite('API Tests');
      await use();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
