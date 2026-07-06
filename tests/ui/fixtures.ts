import { test as base } from '@playwright/test';
import { parentSuite } from 'allure-js-commons';

export const test = base.extend<{ autoAllureSuite: void }>({
  autoAllureSuite: [
    async ({}, use) => {
      await parentSuite('UI Tests');
      await use();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
