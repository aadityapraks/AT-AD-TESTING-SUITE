import { Page, Locator, expect } from '@playwright/test';

export class CatalogFiltersPage {
  readonly searchBar: Locator;
  readonly disabilityTypeDropdown: Locator;
  readonly subCategoryDropdown: Locator;
  readonly typeDropdown: Locator;
  readonly priceRangeDropdown: Locator;
  readonly availabilityCheckbox: Locator;
  readonly minRatingSlider: Locator;
  readonly applyFilterBtn: Locator;
  readonly resetAllBtn: Locator;
  readonly deviceCountText: Locator;
  readonly productGrid: Locator;
  readonly paginationNav: Locator;
  readonly nextPageBtn: Locator;
  readonly prevPageBtn: Locator;
  readonly collapseFiltersBtn: Locator;

  constructor(public page: Page) {
    this.searchBar = page.getByRole('textbox', { name: 'Search devices' });
    this.disabilityTypeDropdown = page.getByRole('combobox', { name: 'Disability Type' });
    this.subCategoryDropdown = page.getByRole('combobox', { name: 'Sub Category' });
    this.typeDropdown = page.getByLabel('Type', { exact: true });
    this.priceRangeDropdown = page.getByRole('combobox', { name: 'Price Range' });
    this.availabilityCheckbox = page.getByRole('checkbox', { name: 'In stock only' });
    this.minRatingSlider = page.getByRole('slider', { name: 'Minimum rating filter' });
    this.applyFilterBtn = page.getByRole('button', { name: 'Apply Filters' });
    this.resetAllBtn = page.getByRole('button', { name: 'Reset All' });
    this.deviceCountText = page.locator('text=/\\d+ devices? found/');
    this.productGrid = page.locator('main [role="list"]').first();
    this.paginationNav = page.getByRole('navigation', { name: 'Pagination' });
    this.nextPageBtn = this.paginationNav.getByRole('link', { name: /Next/ });
    this.prevPageBtn = this.paginationNav.getByRole('link', { name: /Previous/ });
    this.collapseFiltersBtn = page.getByRole('button', { name: 'Collapse filters' });
  }

  async navigateToCatalog() {
    await this.page.goto('https://qa-atad.swarajability.org/catalog/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }

  async navigateViaNavbar() {
    await this.page.goto('https://qa-atad.swarajability.org/');
    await this.page.waitForLoadState('domcontentloaded');
    // On mobile, open hamburger menu first
    const hamburger = this.page.getByRole('button', { name: /menu|toggle/i });
    if (await hamburger.isVisible().catch(() => false)) {
      await hamburger.click();
      await this.page.waitForTimeout(500);
    }
    await this.page.getByRole('link', { name: 'Open assistive device catalog' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }

  async selectDropdownOption(dropdown: Locator, option: string) {
    await dropdown.selectOption({ label: option });
  }

  async selectDisabilityType(option: string) {
    await this.disabilityTypeDropdown.selectOption({ label: option });
  }

  async selectSubCategory(option: string) {
    await this.subCategoryDropdown.selectOption({ label: option });
  }

  async selectType(option: string) {
    await this.typeDropdown.selectOption({ label: option });
  }

  async selectPriceRange(option: string) {
    await this.priceRangeDropdown.selectOption({ label: option });
  }

  async getDropdownOptions(dropdownLocator: Locator): Promise<string[]> {
    const options = await dropdownLocator.locator('option').allTextContents();
    return options.map(o => o.trim()).filter(Boolean);
  }

  async getDeviceCount(): Promise<string> {
    return (await this.deviceCountText.textContent()) ?? '';
  }

  async clickPageNumber(pageNum: number) {
    await this.paginationNav.getByRole('link', { name: `Page ${pageNum}` }).click();
  }
}
