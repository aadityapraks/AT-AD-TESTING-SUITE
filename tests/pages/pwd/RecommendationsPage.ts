import { Page, Locator } from '@playwright/test';
import { ProductDetailsPage } from './ProductDetailsPage';

export class RecommendationsPage extends ProductDetailsPage {
  readonly getRecommendationsLink: Locator;
  readonly recBanner: Locator;
  readonly recBadge: Locator;
  readonly recTitle: Locator;
  readonly recSubtitle: Locator;
  readonly recToggle: Locator;
  readonly recToggleLabel: Locator;
  readonly recToggleHint: Locator;
  readonly deviceCountText: Locator;
  readonly sortDropdown: Locator;
  readonly paginationNav: Locator;
  readonly applyFiltersBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.getRecommendationsLink = page.locator('a').filter({ hasText: /get recommend/i });
    this.recBanner = page.locator('.catalog-recommendation-banner');
    this.recBadge = page.locator('.catalog-recommendation-badge');
    this.recTitle = page.locator('.catalog-recommendation-title');
    this.recSubtitle = page.locator('.catalog-recommendation-subtitle');
    this.recToggle = page.locator('.catalog-recommendation-switch');
    this.recToggleLabel = page.locator('.catalog-recommendation-toggle-label');
    this.recToggleHint = page.locator('.catalog-recommendation-toggle-hint');
    this.deviceCountText = page.locator('text=/\\d+\\s*devices?\\s*found/i');
    this.sortDropdown = page.locator('select, [class*="sort"]').first();
    this.paginationNav = page.locator('.page-numbers, [class*="pagination"], nav[aria-label*="pagination"]');
    this.applyFiltersBtn = page.locator('button, a').filter({ hasText: /apply filter/i }).first();
  }

  async dismissOverlays() {
    await this.page.evaluate(() => {
      const overlay = document.getElementById('atad-content-overlay');
      if (overlay) overlay.style.display = 'none';
      document.querySelectorAll('.elementor-popup-modal, .dialog-lightbox-widget').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    });
  }
}
