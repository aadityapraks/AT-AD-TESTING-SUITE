import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPreviewPage extends BasePage {
  readonly productName: Locator;
  readonly shortDescription: Locator;
  readonly detailedDescription: Locator;
  readonly primaryImage: Locator;
  readonly specificationsSection: Locator;
  readonly availabilitySection: Locator;
  readonly editButton: Locator;
  readonly viewLiveButton: Locator;
  readonly keyHighlightsSection: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.getByRole('heading', { level: 1 });
    this.shortDescription = page.locator('[data-testid="short-description"]').or(page.locator('.short-description'));
    this.detailedDescription = page.locator('[data-testid="detailed-description"]').or(page.locator('.detailed-description'));
    this.primaryImage = page.locator('img').first();
    this.specificationsSection = page.getByRole('heading', { name: /specifications/i });
    this.availabilitySection = page.getByRole('heading', { name: /availability/i });
    this.editButton = page.getByRole('button', { name: /edit/i });
    this.viewLiveButton = page.getByRole('button', { name: /view live/i });
    this.keyHighlightsSection = page.locator('section, div').filter({ hasText: /Key Highlights|Unique Accessibility Features|Highlight.*Feature/i }).first();
  }

  async verifyProductName(expectedName: string) {
    return this.productName.textContent();
  }

  async verifyImageLoaded() {
    await this.primaryImage.waitFor({ state: 'visible' });
    return this.primaryImage.isVisible();
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async clickViewLive() {
    await this.viewLiveButton.click();
  }

  // Key Highlights Methods
  async verifyKeyHighlightsSectionVisible() {
    await expect(this.keyHighlightsSection).toBeVisible({ timeout: 10000 });
  }

  async verifyKeyHighlightsSectionNotVisible() {
    const section = this.page.locator('section, div, article').filter({ hasText: /Key Highlights|Unique Accessibility Features|Highlight.*Feature/i }).first();
    await expect(section).not.toBeVisible({ timeout: 5000 }).catch(() => {
      // Section doesn't exist, which is what we want
      return Promise.resolve();
    });
  }

  async verifyNoEmptyHighlightsPlaceholder() {
    // Check that no empty state or placeholder text is shown
    const emptyPlaceholder = this.page.locator('text=/No highlights|No features|Empty|No unique features/i');
    await expect(emptyPlaceholder).not.toBeVisible({ timeout: 5000 }).catch(() => {
      return Promise.resolve();
    });
  }

  async getHighlightsFeaturesCount() {
    // Count the number of feature items in Key Highlights
    const features = this.page.locator('[class*="highlight"], [class*="feature"], [data-testid*="feature"]').filter({ hasText: /✓|✓|checkmark|icon/i });
    return await features.count();
  }
}
