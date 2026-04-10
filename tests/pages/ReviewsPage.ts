import { Page, Locator } from '@playwright/test';
import { ProductTabsPage } from './ProductTabsPage';

export class ReviewsPage extends ProductTabsPage {
  readonly reviewsTab: Locator;
  readonly reviewItems: Locator;
  readonly reviewForm: Locator;
  readonly reviewTextBox: Locator;
  readonly submitBtn: Locator;
  readonly starRatingInput: Locator;
  readonly ratingValue: Locator;
  readonly reviewCount: Locator;

  constructor(page: Page) {
    super(page);
    this.reviewsTab = page.locator('[role="tab"]').filter({ hasText: /reviews/i });
    this.reviewItems = page.locator('.atad-review-item, .review-item, .comment, [class*="review"]').filter({ hasNotText: /write|submit|form/i });
    this.reviewForm = page.locator('form, .review-form, .atad-review-form, [class*="review-form"]').first();
    this.reviewTextBox = page.locator('textarea, input[type="text"]').last();
    this.submitBtn = page.locator('button:has-text("Submit"), input[type="submit"], button[type="submit"]').first();
    this.starRatingInput = page.locator('.star-rating, [class*="star-rating"], [class*="rating-select"], input[name*="rating"]').first();
    this.ratingValue = page.locator('.elementor-element-416e677 span.elementor-heading-title');
    this.reviewCount = page.locator('.elementor-element-42f7cbe span.elementor-heading-title');
  }

  async goToProduct(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(2000);
  }

  async clickReviewsTab() {
    await this.page.evaluate(() => {
      const overlay = document.getElementById('atad-content-overlay');
      if (overlay) overlay.style.display = 'none';
      document.querySelectorAll('.elementor-popup-modal, .dialog-lightbox-widget').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    });
    await this.reviewsTab.click();
    await this.page.waitForTimeout(1000);
  }

  async getReviewsPanelText(): Promise<string> {
    await this.clickReviewsTab();
    return this.getVisiblePanelText();
  }

  async getRatingText(): Promise<string> {
    return ((await this.ratingValue.textContent()) ?? '').trim();
  }

  async getReviewCountText(): Promise<string> {
    return ((await this.reviewCount.textContent()) ?? '').trim();
  }
}
