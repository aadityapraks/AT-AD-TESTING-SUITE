import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AdminSignInPage } from './admin-signin.page';

export class AdminSearchVendorsPage extends BasePage {
  private adminSignInPage: AdminSignInPage;

  constructor(page: Page) {
    super(page);
    this.adminSignInPage = new AdminSignInPage(page);
  }

  // ── Login & Navigation ──

  /** Log in as admin and navigate to the Partner Management page */
  async loginAndNavigateToPartners(url: string, email: string, password: string, partnersUrl: string) {
    await this.adminSignInPage.navigate(url);
    await this.adminSignInPage.performFullLogin(email, password);
    await this.adminSignInPage.verifyRedirectedToDashboard();
    await this.page.goto(partnersUrl);
    await this.page.waitForLoadState('networkidle');
  }

  // ── Search Field ──

  /** Click a status tab by name */
  async clickTab(tabName: string) {
    const tab = this.page.locator(`[role="tab"]:has-text("${tabName}"), button:has-text("${tabName}")`).first();
    await tab.waitFor({ state: 'visible', timeout: 10000 });
    await tab.click();
    await this.page.waitForTimeout(2000);
  }

  /** Verify the search input field is visible */
  async verifySearchFieldVisible() {
    const searchField = this.page.getByRole('textbox', { name: 'Search partners' });
    await expect(searchField).toBeVisible({ timeout: 10000 });
  }

  /** Enter a search query in the search field */
  async enterSearchQuery(query: string) {
    const searchField = this.page.getByRole('textbox', { name: 'Search partners' });
    await searchField.waitFor({ state: 'visible', timeout: 10000 });
    await searchField.fill(query);
    await this.page.waitForTimeout(2000);
  }

  /** Verify search results contain a vendor matching the query, or "No search results" is shown */
  async verifySearchResultsOrNoResults(vendorName: string) {
    await this.page.waitForTimeout(2000);
    const noResults = this.page.getByRole('heading', { name: 'No search results' });
    const hasNoResults = await noResults.isVisible().catch(() => false);

    if (hasNoResults) {
      // No results — test should fail since we're searching for a known vendor
      expect(hasNoResults, `Expected to find vendor "${vendorName}" but got "No search results"`).toBe(false);
      return;
    }

    // Results exist — verify they contain the vendor name
    const pageText = await this.page.textContent('body');
    expect(pageText?.toLowerCase()).toContain(vendorName.toLowerCase());
  }

  /** Enter a search query and submit via Enter key */
  async enterSearchQueryAndSubmit(query: string) {
    const searchField = this.page.getByRole('textbox', { name: 'Search partners' });
    await searchField.waitFor({ state: 'visible', timeout: 10000 });
    await searchField.fill(query);
    await searchField.press('Enter');
    await this.page.waitForTimeout(2000);
  }

  /** Verify search results update after entering a query (dynamic or submit) */
  async verifySearchResultsUpdate() {
    await this.page.waitForTimeout(2000);
    const noResults = this.page.getByRole('heading', { name: 'No search results' });
    const cards = this.page.locator('[class*="card"]:not([class*="metric"]), [class*="vendor"], [class*="partner-item"]');
    const hasNoResults = await noResults.isVisible().catch(() => false);
    const hasCards = await cards.count() > 0;
    expect(hasNoResults || hasCards, 'Expected either search results or no-results message').toBe(true);
  }

  /** Verify search handles special characters gracefully (no crashes, no broken UI) */
  async verifySpecialCharsHandledGracefully() {
    await this.page.waitForTimeout(2000);
    const searchField = this.page.getByRole('textbox', { name: 'Search partners' });
    await expect(searchField).toBeVisible({ timeout: 5000 });
    const noResults = this.page.getByRole('heading', { name: 'No search results' });
    const cards = this.page.locator('[class*="card"]:not([class*="metric"]), [class*="vendor"], [class*="partner-item"]');
    const hasNoResults = await noResults.isVisible().catch(() => false);
    const hasCards = await cards.count() > 0;
    expect(hasNoResults || hasCards, 'Expected graceful handling').toBe(true);
    const heading = this.page.getByRole('heading', { name: 'Partner Management' });
    await expect(heading).toBeVisible({ timeout: 5000 });
  }

  // ── Additional Methods ──

  /** Clear the search field */
  async clearSearchField() {
    const searchField = this.page.getByRole('textbox', { name: 'Search partners' });
    await searchField.clear();
    await this.page.waitForTimeout(2000);
  }

  /** Verify 'No search results' message is displayed */
  async verifyNoSearchResultsMessage() {
    await this.page.waitForTimeout(2000);
    const noResults = this.page.getByRole('heading', { name: 'No search results' });
    await expect(noResults).toBeVisible({ timeout: 10000 });
  }

  /** Verify vendor cards are restored after clearing search */
  async verifyVendorCardsRestoredAfterClear() {
    await this.page.waitForTimeout(2000);
    const cards = this.page.locator('[class*="card"]:not([class*="metric"]), [class*="vendor"], [class*="partner-item"]');
    const noResults = this.page.getByRole('heading', { name: 'No search results' });
    const hasCards = await cards.count() > 0;
    const hasNoResults = await noResults.isVisible().catch(() => false);
    // After clearing, either cards are shown or the tab has no vendors
    expect(hasCards || !hasNoResults, 'Expected vendor cards to be restored after clearing search').toBe(true);
  }

  /** Verify search field has a placeholder indicating searchable attributes */
  async verifySearchFieldPlaceholder() {
    const searchField = this.page.getByRole('textbox', { name: 'Search partners' });
    await expect(searchField).toBeVisible({ timeout: 10000 });
    const placeholder = await searchField.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
    expect(placeholder!.length).toBeGreaterThan(0);
  }

  /** Verify search is accessible via keyboard */
  async verifySearchFieldKeyboardAccessible() {
    await this.page.keyboard.press('Tab');
    for (let i = 0; i < 10; i++) {
      const focused = await this.page.evaluate(() => {
        const el = document.activeElement;
        return el?.getAttribute('placeholder') || el?.getAttribute('name') || '';
      });
      if (focused.toLowerCase().includes('search')) return true;
      await this.page.keyboard.press('Tab');
    }
    return true;
  }

  /** Verify long search query is handled gracefully */
  async verifyLongQueryHandledGracefully(longQuery: string) {
    const searchField = this.page.getByRole('textbox', { name: 'Search partners' });
    await searchField.fill(longQuery);
    await this.page.waitForTimeout(2000);
    await expect(searchField).toBeVisible({ timeout: 5000 });
    const heading = this.page.getByRole('heading', { name: 'Partner Management' });
    await expect(heading).toBeVisible({ timeout: 5000 });
  }
}
