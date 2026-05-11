import { Page, Locator } from '@playwright/test';

export class CaregiverRecommendationsPage {
  readonly page: Page;

  // Caregiver banner
  readonly caregiverBanner: Locator;
  readonly caregiverBannerTitle: Locator;

  // PwD dropdown
  readonly pwdTrigger: Locator;
  readonly pwdDropdownListbox: Locator;
  readonly pwdOptions: Locator;
  readonly pwdTriggerName: Locator;
  readonly pwdTriggerMeta: Locator;

  // Show Recommendations
  readonly showRecommendationsBtn: Locator;

  // Recommendation banner
  readonly recBanner: Locator;
  readonly recLabel: Locator;
  readonly personalizedBadge: Locator;
  readonly personalizedTitle: Locator;
  readonly recToggle: Locator;

  // Catalog elements (from actual DOM snapshot)
  readonly searchBar: Locator;
  readonly deviceCountText: Locator;
  readonly disabilityTypeDropdown: Locator;
  readonly subCategoryDropdown: Locator;
  readonly typeDropdown: Locator;
  readonly priceRangeDropdown: Locator;
  readonly applyFilterBtn: Locator;
  readonly resetAllBtn: Locator;
  readonly sortDropdown: Locator;
  readonly paginationNav: Locator;
  readonly nextPageBtn: Locator;
  readonly productCards: Locator;
  readonly productHeadings: Locator;
  readonly viewDetailsLinks: Locator;
  readonly minRatingSlider: Locator;

  constructor(page: Page) {
    this.page = page;

    this.caregiverBanner = page.locator('.catalog-caregiver-banner');
    this.caregiverBannerTitle = page.locator('.catalog-caregiver-banner-title');

    this.pwdTrigger = page.locator('.catalog-caregiver-pwd-trigger');
    this.pwdDropdownListbox = page.locator('.catalog-caregiver-pwd-dropdown');
    this.pwdOptions = page.locator('.catalog-caregiver-pwd-option');
    this.pwdTriggerName = page.locator('.catalog-caregiver-pwd-trigger-name');
    this.pwdTriggerMeta = page.locator('.catalog-caregiver-pwd-trigger-meta');

    this.showRecommendationsBtn = page.locator('.catalog-caregiver-show-btn');

    this.recBanner = page.locator('.catalog-recommendation-banner');
    this.recLabel = page.locator('text=/Recommendations for/i').first();
    this.personalizedBadge = page.locator('.catalog-recommendation-badge');
    this.personalizedTitle = page.locator('.catalog-recommendation-title');
    this.recToggle = page.locator('.catalog-recommendation-switch');

    this.searchBar = page.getByRole('textbox', { name: 'Search devices' });
    this.deviceCountText = page.locator('text=/\\d+ devices? found/');
    this.disabilityTypeDropdown = page.getByRole('combobox', { name: 'Disability Type' });
    this.subCategoryDropdown = page.getByRole('combobox', { name: 'Sub Category' });
    this.typeDropdown = page.getByLabel('Type', { exact: true });
    this.priceRangeDropdown = page.getByRole('combobox', { name: 'Price Range' });
    this.applyFilterBtn = page.getByRole('button', { name: 'Apply Filters' });
    this.resetAllBtn = page.getByRole('button', { name: 'Reset All' });
    this.sortDropdown = page.getByRole('combobox', { name: 'Sort by' });
    this.paginationNav = page.getByRole('navigation', { name: 'Pagination' });
    this.nextPageBtn = this.paginationNav.getByRole('link', { name: /Next/ });
    this.productCards = page.locator('main [role="list"]').first().locator('> *');
    this.productHeadings = page.locator('main [role="list"]').first().getByRole('heading', { level: 3 });
    this.viewDetailsLinks = page.locator('main').getByRole('link', { name: /view details/i });
    this.minRatingSlider = page.getByRole('slider', { name: 'Minimum rating filter' });
  }

  async loginAsCaregiverAndGoToCatalog(email: string, password: string) {
    await this.page.goto('https://qa-atad.swarajability.org/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);

    const logoutLink = this.page.locator('a').filter({ hasText: /logout/i }).first();
    if (await logoutLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.page.goto('https://qa-atad.swarajability.org/catalog/', { waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(2000);
      await this.dismissOverlays();
      return;
    }

    // Click "Sign In/Register" link to open login popup
    await this.page.getByRole('link', { name: 'Sign In/Register' }).click();
    await this.page.waitForTimeout(2000);

    // Click "Sign In with SwarajAbility" — navigates to auth-d.swarajability.org
    await this.page.getByRole('link', { name: 'Sign In with SwarajAbility' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000);

    // Fill Authentik login form
    await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.waitForTimeout(5000);

    // Handle consent page if still on auth domain
    if (this.page.url().includes('auth-d.swarajability.org')) {
      await this.page.getByRole('button', { name: 'Continue' }).waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      const consentBtn = this.page.getByRole('button', { name: 'Continue' });
      if (await consentBtn.isVisible().catch(() => false)) {
        await consentBtn.click();
      }
      // Wait for redirect back to main site
      await this.page.waitForURL('**/qa-atad.swarajability.org/**', { timeout: 30000 }).catch(() => {});
      await this.page.waitForTimeout(3000);
    }

    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);

    await this.page.goto('https://qa-atad.swarajability.org/catalog/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(2000);
    await this.dismissOverlays();
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

  async openPwdDropdown() {
    await this.pwdTrigger.click();
    await this.page.waitForTimeout(500);
  }

  async getPwdOptionTexts(): Promise<string[]> {
    await this.openPwdDropdown();
    const texts = await this.pwdOptions.allTextContents();
    return texts.map(t => t.trim());
  }

  async selectPwdByIndex(index: number) {
    const expanded = await this.pwdTrigger.getAttribute('aria-expanded');
    if (expanded !== 'true') await this.openPwdDropdown();
    await this.pwdOptions.nth(index).click();
    await this.page.waitForTimeout(1000);
  }

  async clickShowRecommendations() {
    await this.showRecommendationsBtn.click();
    await this.page.waitForTimeout(5000);
    await this.dismissOverlays();
  }

  async searchFor(keyword: string) {
    await this.searchBar.fill(keyword);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(2000);
  }

  async getDeviceCountNumber(): Promise<number> {
    const text = (await this.deviceCountText.textContent().catch(() => '')) ?? '';
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getDeviceCount(): Promise<string> {
    return ((await this.deviceCountText.textContent().catch(() => '')) ?? '').trim();
  }

  async getProductCardCount(): Promise<number> {
    return this.productCards.count();
  }

  async selectDisabilityType(option: string) {
    await this.disabilityTypeDropdown.selectOption({ label: option });
  }

  async clickViewDetailsFirst() {
    await this.viewDetailsLinks.first().click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }
}
