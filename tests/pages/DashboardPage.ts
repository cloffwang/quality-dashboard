import { Page, Locator } from '@playwright/test';

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
}
