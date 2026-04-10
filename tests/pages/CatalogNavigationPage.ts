import { Page, Locator } from '@playwright/test';

export class CatalogNavigationPage {
  readonly catalogLink: Locator;
  readonly h1Heading: Locator;
  readonly collapseFiltersBtn: Locator;
  readonly deviceCountText: Locator;
  readonly searchBar: Locator;
  readonly disabilityTypeDropdown: Locator;
  readonly subCategoryDropdown: Locator;
  readonly typeDropdown: Locator;
  readonly priceRangeDropdown: Locator;
  readonly availabilityCheckbox: Locator;
  readonly minRatingSlider: Locator;
  readonly applyFilterBtn: Locator;
  readonly resetAllBtn: Locator;
  readonly sortDropdown: Locator;
  readonly paginationNav: Locator;
  readonly nextPageBtn: Locator;
  readonly prevPageBtn: Locator;
  readonly shoppingTipsHeading: Locator;
  readonly beforeYouBuy: Locator;
  readonly needHelpChoosing: Locator;
  readonly footer: Locator;

  constructor(public page: Page) {
    this.catalogLink = page.getByRole('link', { name: 'Open assistive device catalog' });
    this.h1Heading = page.getByRole('heading', { name: 'Assistive Device Catalog', level: 1 });
    this.collapseFiltersBtn = page.getByRole('button', { name: 'Collapse filters' });
    this.deviceCountText = page.locator('text=/\\d+ devices? found/');
    this.searchBar = page.getByRole('textbox', { name: 'Search devices' });
    this.disabilityTypeDropdown = page.getByRole('combobox', { name: 'Disability Type' });
    this.subCategoryDropdown = page.getByRole('combobox', { name: 'Sub Category' });
    this.typeDropdown = page.getByLabel('Type', { exact: true });
    this.priceRangeDropdown = page.getByRole('combobox', { name: 'Price Range' });
    this.availabilityCheckbox = page.getByRole('checkbox', { name: 'In stock only' });
    this.minRatingSlider = page.getByRole('slider', { name: 'Minimum rating filter' });
    this.applyFilterBtn = page.getByRole('button', { name: 'Apply Filters' });
    this.resetAllBtn = page.getByRole('button', { name: 'Reset All' });
    this.sortDropdown = page.getByRole('combobox', { name: 'Sort by' });
    this.paginationNav = page.getByRole('navigation', { name: 'Pagination' });
    this.nextPageBtn = this.paginationNav.getByRole('link', { name: /Next/ });
    this.prevPageBtn = this.paginationNav.getByRole('link', { name: /Previous/ });
    this.shoppingTipsHeading = page.locator('text=/Shopping Tips/i').first();
    this.beforeYouBuy = page.locator('text=/Before You Buy/i').first();
    this.needHelpChoosing = page.locator('text=/Need Help Choosing/i').first();
    this.footer = page.locator('footer').first();
  }

  async navigateToHome() {
    await this.page.goto('https://qa-atad.swarajability.org/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(1000);
  }

  async navigateToCatalog() {
    await this.page.goto('https://qa-atad.swarajability.org/catalog/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }

  async clickCatalogLink() {
    await this.catalogLink.first().click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
  }
}
