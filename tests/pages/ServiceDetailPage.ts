import { Page, Locator } from '@playwright/test';

export class ServiceDetailPage {
  readonly page: Page;
  readonly backLink: Locator;
  readonly heading: Locator;
  readonly stackTracePanel: Locator;
  readonly quarantineLog: Locator;
  readonly quarantineEntries: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backLink = page.getByRole('link', { name: '← Back to dashboard' });
    this.heading = page.getByRole('heading', { level: 1 });
    this.stackTracePanel = page.getByTestId('stack-trace-panel');
    this.quarantineLog = page.getByTestId('quarantine-log');
    this.quarantineEntries = page.getByTestId('quarantine-entry');
  }

  async goto(serviceId: string) {
    await this.page.goto(`/services/${serviceId}`);
  }

  /** Reads a StatTile's value by its label (StatTile renders label then value as adjacent <p>s). */
  statValue(label: string): Locator {
    return this.page.getByText(label, { exact: true }).locator('xpath=following-sibling::p[1]');
  }
}
