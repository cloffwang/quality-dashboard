import { Page, Locator, expect } from '@playwright/test';

const DOMAIN_LABELS = [
  'Frontend Smoke Tests',
  'Gateway API Tests',
  'ETL Validation',
  'MCP Protocol Assertions',
];

export class DashboardPage {
  readonly page: Page;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signOutButton = page.getByRole('button', { name: 'Sign out' });
  }

  async goto() {
    await this.page.goto('/');
  }

  sectionHeading(domainLabel: string): Locator {
    return this.page.getByRole('heading', { level: 2, name: domainLabel });
  }

  serviceCards(): Locator {
    return this.page.getByTestId('service-card');
  }

  serviceCard(serviceId: string): Locator {
    return this.page.locator(`[data-testid="service-card"][data-service-id="${serviceId}"]`);
  }

  async expectAllDomainSectionsVisible() {
    for (const label of DOMAIN_LABELS) {
      await expect(this.sectionHeading(label)).toBeVisible();
    }
  }

  async expectServiceCardCount(count: number) {
    await expect(this.serviceCards()).toHaveCount(count);
  }

  async expectServiceCardsVisible() {
    await expect(this.serviceCards().first()).toBeVisible();
  }

  async expectAllServicesOperational() {
    const statuses = await this.serviceCards().getByTestId('service-status').allTextContents();

    expect(statuses).toHaveLength(8);
    for (const status of statuses) {
      expect(status.trim()).toBe('operational');
    }
  }
}
