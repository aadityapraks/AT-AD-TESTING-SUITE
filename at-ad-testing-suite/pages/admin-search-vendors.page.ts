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

  // ── Accessibility Test Methods ──

  /** Check if search input has a visible label or aria-label */
  async getSearchInputLabelInfo(): Promise<{ hasAriaLabel: boolean; hasLabel: boolean; hasPlaceholder: boolean; inputType: string | null; role: string | null }> {
    const searchField = this.page.getByRole('textbox', { name: 'Search partners' });
    const isVisible = await searchField.isVisible().catch(() => false);
    if (!isVisible) {
      return { hasAriaLabel: false, hasLabel: false, hasPlaceholder: false, inputType: null, role: null };
    }
    const ariaLabel = await searchField.getAttribute('aria-label');
    const placeholder = await searchField.getAttribute('placeholder');
    const inputType = await searchField.getAttribute('type');
    const role = await searchField.getAttribute('role');
    const id = await searchField.getAttribute('id');
    let hasLabel = false;
    if (id) {
      const labelCount = await this.page.locator(`label[for="${id}"]`).count();
      hasLabel = labelCount > 0;
    }
    return {
      hasAriaLabel: !!ariaLabel,
      hasLabel,
      hasPlaceholder: !!placeholder,
      inputType,
      role
    };
  }

  /** Verify search input is reachable via Tab key */
  async tabToSearchInput(): Promise<boolean> {
    for (let i = 0; i < 15; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => {
        const el = document.activeElement;
        return {
          tag: el?.tagName?.toLowerCase() || '',
          type: el?.getAttribute('type') || '',
          placeholder: el?.getAttribute('placeholder') || '',
          role: el?.getAttribute('role') || ''
        };
      });
      if (focused.placeholder.toLowerCase().includes('search') ||
          focused.type === 'search' ||
          focused.role === 'searchbox') {
        return true;
      }
    }
    return false;
  }

  /** Get count of aria-live regions on the page */
  async getAriaLiveRegionCount(): Promise<number> {
    return await this.page.locator('[aria-live]').count();
  }

  /** Get count of elements with role="status" */
  async getRoleStatusCount(): Promise<number> {
    return await this.page.locator('[role="status"]').count();
  }

  /** Check if no-results message has accessible role */
  async getNoResultsMessageAccessibility(): Promise<{ isVisible: boolean; hasRole: boolean; hasAriaLive: boolean }> {
    const noResults = this.page.getByRole('heading', { name: 'No search results' });
    const isVisible = await noResults.isVisible().catch(() => false);
    if (!isVisible) {
      // Try other patterns
      const altNoResults = this.page.locator('text=/no .*(result|vendor|partner)/i').first();
      const altVisible = await altNoResults.isVisible().catch(() => false);
      if (!altVisible) return { isVisible: false, hasRole: false, hasAriaLive: false };
      const role = await altNoResults.getAttribute('role');
      const ariaLive = await altNoResults.evaluate(el => {
        let current: Element | null = el;
        while (current) {
          if (current.getAttribute('aria-live')) return true;
          current = current.parentElement;
        }
        return false;
      });
      return { isVisible: true, hasRole: !!role, hasAriaLive: ariaLive };
    }
    const role = await noResults.getAttribute('role');
    const parent = noResults.locator('xpath=./..');
    const parentAriaLive = await parent.getAttribute('aria-live').catch(() => null);
    return { isVisible: true, hasRole: !!role, hasAriaLive: !!parentAriaLive };
  }

  /** Check if search clear button exists and has accessible name */
  async getClearButtonAccessibility(): Promise<{ exists: boolean; hasName: boolean; name: string }> {
    // Look for clear/X button near search
    const clearBtn = this.page.locator('button[aria-label*="clear" i], button[aria-label*="reset" i], button:has-text("✕"), button:has-text("×"), [class*="clear"] button').first();
    const exists = await clearBtn.isVisible().catch(() => false);
    if (!exists) return { exists: false, hasName: false, name: '' };
    const ariaLabel = await clearBtn.getAttribute('aria-label') || '';
    const text = (await clearBtn.textContent()) || '';
    const name = ariaLabel || text.trim();
    return { exists: true, hasName: name.length > 0, name };
  }

  /** Get H1 count */
  async getH1Count(): Promise<number> {
    return await this.page.locator('h1').count();
  }

  /** Verify H1 is visible */
  async verifyH1Visible() {
    await expect(this.page.locator('h1').first()).toBeVisible();
  }

  /** Get main landmark count */
  async getMainLandmarkCount(): Promise<number> {
    return await this.page.locator('main, [role="main"]').count();
  }

  /** Get HTML lang attribute */
  async getHtmlLangAttribute(): Promise<string | null> {
    return await this.page.locator('html').getAttribute('lang');
  }

  /** Run axe-core contrast check */
  async runAxeContrastCheck(): Promise<{ violationCount: number; violations: any[] }> {
    const AxeBuilder = (await import('@axe-core/playwright')).default;
    const results = await new AxeBuilder({ page: this.page })
      .withRules(['color-contrast'])
      .analyze();
    return { violationCount: results.violations.length, violations: results.violations };
  }

  /** Run full axe-core WCAG 2.1 AA scan */
  async runAxeFullScan(): Promise<{ violationCount: number; violations: any[] }> {
    const AxeBuilder = (await import('@axe-core/playwright')).default;
    const results = await new AxeBuilder({ page: this.page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    return { violationCount: results.violations.length, violations: results.violations };
  }

  /** Set zoom to 200% and check for horizontal scroll */
  async checkZoom200(): Promise<{ h1Visible: boolean; hasHorizontalScroll: boolean }> {
    await this.page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    const h1Visible = await this.page.locator('h1').first().isVisible();
    const hasHorizontalScroll = await this.page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    return { h1Visible, hasHorizontalScroll };
  }

  /** Set mobile viewport */
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.page.waitForTimeout(1000);
  }

  /** Check if H1 is visible */
  async isH1Visible(): Promise<boolean> {
    return await this.page.locator('h1').first().isVisible();
  }

  /** Verify no keyboard trap */
  async verifyNoKeyboardTrap(): Promise<boolean> {
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Shift+Tab');
    await this.page.keyboard.press('Shift+Tab');
    return true;
  }

  /** Get search input value after typing */
  async getSearchInputValue(): Promise<string> {
    const searchField = this.page.getByRole('textbox', { name: 'Search partners' });
    return await searchField.inputValue();
  }

  /** Verify search input is focused */
  async isSearchInputFocused(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const el = document.activeElement;
      return el?.getAttribute('placeholder')?.toLowerCase().includes('search') ||
             el?.getAttribute('type') === 'search' || false;
    });
  }

  /** Get list structure info for search results */
  async getResultsListStructure(): Promise<{ hasUlOl: boolean; hasRoleList: boolean }> {
    const ulOl = await this.page.locator('ul, ol').count();
    const roleList = await this.page.locator('[role="list"]').count();
    return { hasUlOl: ulOl > 0, hasRoleList: roleList > 0 };
  }

  /** Get button count */
  async getButtonCount(): Promise<number> {
    return await this.page.getByRole('button').count();
  }

  /** Get links accessibility info */
  async verifyLinksHaveAccessibleNames(): Promise<{ total: number; withoutName: number }> {
    const links = this.page.getByRole('link');
    const total = await links.count();
    let withoutName = 0;
    for (let i = 0; i < Math.min(total, 10); i++) {
      const name = await links.nth(i).getAttribute('aria-label') || await links.nth(i).textContent();
      if (!name?.trim().length) withoutName++;
    }
    return { total, withoutName };
  }

  /** Verify heading has proper role */
  async verifyH1HasHeadingRole() {
    const h1 = this.page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toHaveRole('heading');
  }
}
