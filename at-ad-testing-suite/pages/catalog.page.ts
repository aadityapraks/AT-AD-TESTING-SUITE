import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CatalogPage extends BasePage {
  readonly pageHeading: Locator;
  readonly searchInput: Locator;
  readonly productList: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { name: 'Assistive Device Catalog', level: 1 });
    this.searchInput = page.getByRole('textbox', { name: 'Search devices' });
    this.productList = page.getByRole('list').filter({ has: page.getByRole('heading', { level: 3 }) }).first();
  }

  async navigateToCatalog(catalogUrl: string) {
    await this.page.goto(catalogUrl);
    await this.pageHeading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  async isCatalogPageLoaded(): Promise<boolean> {
    // The catalog page may show "Assistive Device Catalog" or personalized heading
    const catalogHeading = this.page.getByRole('heading', { level: 2 }).first();
    return await catalogHeading.isVisible({ timeout: 10000 }).catch(() => false);
  }

  async getProductCards(): Promise<number> {
    const cards = this.page.locator('list > generic').filter({
      has: this.page.getByRole('heading', { level: 3 })
    });
    // Fallback: count h3 headings with links inside the main product list
    const count = await cards.count();
    if (count > 0) return count;
    // Alternative: count View details links as proxy for product count
    return await this.page.getByRole('link', { name: /View details/i }).count();
  }

  async getProductNames(): Promise<string[]> {
    const headings = this.page.getByRole('heading', { level: 3 }).filter({
      has: this.page.getByRole('link')
    });
    const count = await headings.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await headings.nth(i).textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async isProductListVisible(): Promise<boolean> {
    const products = this.page.getByRole('heading', { level: 3 }).filter({
      has: this.page.getByRole('link')
    });
    return (await products.count()) > 0;
  }

  async getViewDetailsLinks(): Promise<number> {
    return await this.page.getByRole('link', { name: /View details/i }).count();
  }

  async clickFirstProduct(): Promise<void> {
    const firstLink = this.page.getByRole('link', { name: /View details/i }).first();
    await firstLink.click();
  }

  async isProductDetailPageLoaded(): Promise<boolean> {
    const heading = this.page.getByRole('heading', { level: 1 }).first();
    await heading.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    return await heading.isVisible().catch(() => false);
  }

  async getProductDetailHeading(): Promise<string> {
    const heading = this.page.getByRole('heading', { level: 1 }).first();
    return (await heading.textContent()) || '';
  }

  async isCatalogLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: /Catalog/i }).isVisible();
  }

  async clickCatalogLink(): Promise<void> {
    await this.page.getByRole('link', { name: /Catalog/i }).click();
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyProductNotInCatalog(productName: string) {
    await expect(
      this.page.getByRole('heading', { name: productName, level: 3 })
    ).not.toBeVisible();
  }

  async verifyNoBrokenImages() {
    const images = this.page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      const src = await img.getAttribute('src') ?? '';
      if (src && !src.startsWith('data:')) {
        expect(naturalWidth, `Image with src "${src}" is broken`).toBeGreaterThan(0);
      }
    }
  }

  async verifyNoPlaceholderImages() {
    const brokenImgPlaceholders = this.page.locator('img[alt="broken"], img[src=""], [class*="placeholder"]');
    await expect(brokenImgPlaceholders).toHaveCount(0);
  }

  // --- Filter Methods ---

  async isFilterSectionVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: /Collapse filters|Expand filters/i }).isVisible();
  }

  async isDisabilityTypeFilterVisible(): Promise<boolean> {
    return await this.page.getByRole('combobox', { name: 'Disability Type' }).isVisible();
  }

  async isPriceRangeFilterVisible(): Promise<boolean> {
    return await this.page.getByRole('combobox', { name: 'Price Range' }).isVisible();
  }

  async isTypeFilterVisible(): Promise<boolean> {
    return await this.page.getByLabel('Type', { exact: true }).isVisible();
  }

  async selectDisabilityTypeFilter(value: string): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Disability Type' }).selectOption(value);
  }

  async selectPriceRangeFilter(value: string): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Price Range' }).selectOption(value);
  }

  async selectTypeFilter(value: string): Promise<void> {
    await this.page.getByLabel('Type', { exact: true }).selectOption(value);
  }

  async clickApplyFilters(): Promise<void> {
    await this.page.getByRole('button', { name: 'Apply Filters' }).click();
  }

  async clickResetAllFilters(): Promise<void> {
    await this.page.getByRole('button', { name: 'Reset All' }).click();
  }

  async getDeviceCountText(): Promise<string> {
    const countEl = this.page.locator('text=/\\d+ devices? found/');
    return (await countEl.textContent().catch(() => '')) || '';
  }

  async getDeviceCount(): Promise<number> {
    const text = await this.getDeviceCountText();
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async isApplyFiltersButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Apply Filters' }).isVisible();
  }

  async isResetAllButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Reset All' }).isVisible();
  }

  async isSortByVisible(): Promise<boolean> {
    return await this.page.getByRole('combobox', { name: 'Sort by' }).isVisible();
  }

  async selectSortBy(value: string): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Sort by' }).selectOption(value);
  }

  async isSearchBoxVisible(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }

  async searchDevices(term: string): Promise<void> {
    await this.searchInput.fill(term);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

  async isPaginationVisible(): Promise<boolean> {
    return await this.page.getByRole('navigation', { name: 'Pagination' }).isVisible({ timeout: 5000 }).catch(() => false);
  }
}
