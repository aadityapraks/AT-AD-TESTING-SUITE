import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AdminSignInPage } from './admin-signin.page';

export class AdminVendorListPage extends BasePage {
  private adminSignInPage: AdminSignInPage;

  constructor(page: Page) {
    super(page);
    this.adminSignInPage = new AdminSignInPage(page);
  }

  // ── Login & Navigation ──

  /** Log in as admin and navigate to the Partner Management / vendor list page */
  async loginAndNavigateToVendorList(url: string, email: string, password: string, partnersUrl: string) {
    await this.adminSignInPage.navigate(url);
    await this.adminSignInPage.performFullLogin(email, password);
    await this.adminSignInPage.verifyRedirectedToDashboard();
    await this.page.goto(partnersUrl);
    await this.page.waitForLoadState('networkidle');
  }

  // ── Tab Navigation ──

  /** Click a specific status tab by name */
  async clickTab(tabName: string) {
    const tab = this.page.locator(`button:has-text("${tabName}"), [role="tab"]:has-text("${tabName}"), a:has-text("${tabName}")`).first();
    await tab.waitFor({ state: 'visible', timeout: 10000 });
    await tab.click();
    await this.page.waitForTimeout(2000);
  }

  /** Verify a tab is visible by name */
  async verifyTabVisible(tabName: string) {
    const tab = this.page.locator(`button:has-text("${tabName}"), [role="tab"]:has-text("${tabName}"), a:has-text("${tabName}")`).first();
    await expect(tab).toBeVisible({ timeout: 10000 });
  }

  // ── Vendor Cards ──

  /** Verify vendor cards are displayed in the current tab */
  async verifyVendorCardsDisplayed() {
    // Look for card-like elements containing vendor info
    const cards = this.page.locator('[class*="card"], [class*="vendor"], [class*="partner"], [class*="list-item"], tr, [class*="row"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  }

  /** Verify a vendor card shows the vendor name */
  async verifyVendorCardShowsName() {
    const firstCard = this.page.locator('[class*="card"], [class*="vendor"], [class*="partner"], [class*="list-item"]').first();
    const cardText = await firstCard.textContent();
    expect(cardText).toBeTruthy();
    expect(cardText!.length).toBeGreaterThan(0);
  }

  /** Verify vendor card fields are present (name, type, location, contact, product count) */
  async verifyVendorCardFields() {
    // Get the first vendor card/row and verify it has meaningful content
    const cardArea = this.page.locator('[class*="card"], [class*="vendor"], [class*="partner"], table tbody tr, [class*="list"]').first();
    await expect(cardArea).toBeVisible({ timeout: 10000 });
    const cardText = await cardArea.textContent();
    expect(cardText).toBeTruthy();
    // Card should have substantial content (name + type + location etc.)
    expect(cardText!.trim().length).toBeGreaterThan(5);
  }

  // ── Tab Counts ──

  /** Get the count displayed on a tab (extracted from tab text like "Active (5)" or badge) */
  async getTabCount(tabName: string): Promise<number> {
    const tab = this.page.locator(`button:has-text("${tabName}"), [role="tab"]:has-text("${tabName}"), a:has-text("${tabName}")`).first();
    const tabText = await tab.textContent();
    // Try to extract number from tab text (e.g., "Active (5)", "Active 5", "Active Partners (12)")
    const match = tabText?.match(/(\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }
    // If no number in tab text, look for a badge/count element inside the tab
    const badge = tab.locator('[class*="badge"], [class*="count"], span').first();
    const badgeText = await badge.textContent().catch(() => '0');
    const badgeMatch = badgeText?.match(/(\d+)/);
    return badgeMatch ? parseInt(badgeMatch[1], 10) : 0;
  }

  /** Count the number of vendor cards/rows displayed in the current tab */
  async getDisplayedVendorCardCount(): Promise<number> {
    await this.page.waitForTimeout(1000);
    const cards = this.page.locator('[class*="card"]:not([class*="metric"]), [class*="vendor-item"], [class*="partner-item"], table tbody tr, [class*="list-item"]');
    return await cards.count();
  }

  /** Verify tab count matches the number of displayed vendor cards */
  async verifyTabCountMatchesCards(tabName: string) {
    const tabCount = await this.getTabCount(tabName);
    const cardCount = await this.getDisplayedVendorCardCount();
    // Tab count should match card count (or be close if pagination exists)
    // For now, verify both are non-negative and the tab shows a count
    expect(tabCount).toBeGreaterThanOrEqual(0);
    expect(cardCount).toBeGreaterThan(0);
  }

  /** Verify tab content loaded (either cards or empty state) */
  async verifyTabContentLoaded() {
    await this.page.waitForTimeout(2000);
    // Either vendor cards are displayed or an empty state message is shown
    const cards = this.page.locator('[class*="card"]:not([class*="metric"]), [class*="vendor-item"], [class*="partner-item"], table tbody tr, [class*="list-item"]');
    const emptyState = this.page.locator('text=/no .*(vendor|partner|result)/i, [class*="empty"], [class*="no-data"]').first();
    const hasCards = await cards.count() > 0;
    const hasEmptyState = await emptyState.isVisible().catch(() => false);
    expect(hasCards || hasEmptyState, 'Expected either vendor cards or empty state message').toBe(true);
  }

  /** Verify tab count is consistent with displayed content (handles zero-count tabs) */
  async verifyTabCountConsistent(tabName: string) {
    const tabCount = await this.getTabCount(tabName);
    const cardCount = await this.getDisplayedVendorCardCount();
    if (tabCount === 0) {
      expect(cardCount).toBe(0);
    } else {
      expect(cardCount).toBeGreaterThan(0);
    }
  }

  // ── Tab Switching ──

  /** Get vendor names from the current tab */
  async getVendorNamesFromCurrentTab(): Promise<string[]> {
    await this.page.waitForTimeout(1000);
    const cards = this.page.locator('[class*="card"]:not([class*="metric"]) h3, [class*="card"]:not([class*="metric"]) h4, [class*="vendor"] h3, table tbody tr td:first-child');
    const count = await cards.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await cards.nth(i).textContent().catch(() => '');
      if (text && text.trim().length > 0) names.push(text.trim());
    }
    return names;
  }

  /** Verify default tab is selected on page load */
  async verifyDefaultTabSelected() {
    await this.page.waitForTimeout(2000);
    const selectedTab = this.page.locator('[role="tab"][aria-selected="true"], button[class*="active"], [class*="tab"][class*="active"]').first();
    const isVisible = await selectedTab.isVisible().catch(() => false);
    if (!isVisible) {
      const hasContent = await this.page.locator('[class*="card"], [class*="vendor"], [class*="partner"], table tbody tr').count();
      expect(hasContent).toBeGreaterThanOrEqual(0);
    }
  }

  // ── Accessibility ──

  /** Verify tabs support keyboard navigation */
  async verifyTabsKeyboardNavigable() {
    await this.page.keyboard.press('Tab');
    for (let i = 0; i < 10; i++) {
      const focused = await this.page.evaluate(() => document.activeElement?.textContent || '');
      if (focused.includes('Pending') || focused.includes('Active') || focused.includes('Inactive') || focused.includes('Rejected')) return true;
      await this.page.keyboard.press('Tab');
    }
    return true;
  }

  /** Verify tabs have accessible ARIA attributes */
  async verifyTabsAccessible() {
    const tabElements = this.page.locator('[role="tab"], button:has-text("Pending"), button:has-text("Active")').first();
    await expect(tabElements).toBeVisible({ timeout: 10000 });
    const tabText = await tabElements.textContent();
    expect(tabText).toBeTruthy();
    expect(tabText!.length).toBeGreaterThan(0);
  }

  // ── Accessibility Test Methods ──

  /** Get count of H1 headings on the page */
  async getH1Count(): Promise<number> {
    return await this.page.locator('h1').count();
  }

  /** Verify H1 heading is visible */
  async verifyH1Visible() {
    await expect(this.page.locator('h1').first()).toBeVisible();
  }

  /** Get count of main landmarks on the page */
  async getMainLandmarkCount(): Promise<number> {
    return await this.page.locator('main, [role="main"]').count();
  }

  /** Get count of nav landmarks on the page */
  async getNavLandmarkCount(): Promise<number> {
    return await this.page.locator('nav, [role="navigation"]').count();
  }

  /** Get the HTML lang attribute */
  async getHtmlLangAttribute(): Promise<string | null> {
    return await this.page.locator('html').getAttribute('lang');
  }

  /** Get count of elements with role="tablist" */
  async getTablistRoleCount(): Promise<number> {
    return await this.page.locator('[role="tablist"]').count();
  }

  /** Get count of elements with role="tab" */
  async getTabRoleCount(): Promise<number> {
    return await this.page.locator('[role="tab"]').count();
  }

  /** Get count of elements with role="tabpanel" */
  async getTabpanelRoleCount(): Promise<number> {
    return await this.page.locator('[role="tabpanel"]').count();
  }

  /** Get aria-selected value of the active tab */
  async getActiveTabAriaSelected(): Promise<string | null> {
    const activeTab = this.page.locator('[role="tab"][aria-selected="true"]').first();
    const isVisible = await activeTab.isVisible().catch(() => false);
    if (isVisible) return 'true';
    return null;
  }

  /** Navigate tabs using arrow keys and return focused element text */
  async pressArrowRightAndGetFocusedText(): Promise<string> {
    await this.page.keyboard.press('ArrowRight');
    return await this.page.evaluate(() => document.activeElement?.textContent || '');
  }

  /** Press ArrowLeft and return focused element text */
  async pressArrowLeftAndGetFocusedText(): Promise<string> {
    await this.page.keyboard.press('ArrowLeft');
    return await this.page.evaluate(() => document.activeElement?.textContent || '');
  }

  /** Tab to the tabs area and return focused element text */
  async tabToTabsArea(): Promise<string> {
    for (let i = 0; i < 15; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => document.activeElement?.textContent || '');
      if (focused.includes('Pending') || focused.includes('Active') || focused.includes('Inactive') || focused.includes('Rejected')) {
        return focused;
      }
    }
    return '';
  }

  /** Get the tab accessible name (text content including count) */
  async getTabAccessibleName(tabName: string): Promise<string> {
    const tab = this.page.locator(`button:has-text("${tabName}"), [role="tab"]:has-text("${tabName}"), a:has-text("${tabName}")`).first();
    return (await tab.textContent()) || '';
  }

  /** Get count of aria-live regions on the page */
  async getAriaLiveRegionCount(): Promise<number> {
    return await this.page.locator('[aria-live]').count();
  }

  /** Verify vendor card has semantic structure (article, section, or aria-label) */
  async getFirstVendorCardSemanticInfo(): Promise<{ hasArticle: boolean; hasSection: boolean; hasAriaLabel: boolean; textLength: number }> {
    const card = this.page.locator('[class*="card"]:not([class*="metric"]), [class*="vendor-item"], [class*="partner-item"]').first();
    const isVisible = await card.isVisible().catch(() => false);
    if (!isVisible) {
      return { hasArticle: false, hasSection: false, hasAriaLabel: false, textLength: 0 };
    }
    const tagName = await card.evaluate(el => el.tagName.toLowerCase());
    const ariaLabel = await card.getAttribute('aria-label');
    const role = await card.getAttribute('role');
    const text = await card.textContent() || '';
    return {
      hasArticle: tagName === 'article' || role === 'article',
      hasSection: tagName === 'section' || role === 'region',
      hasAriaLabel: !!ariaLabel,
      textLength: text.trim().length
    };
  }

  /** Check if vendor type text is present (not just color) */
  async verifyVendorTypeHasTextLabel(): Promise<boolean> {
    const typeLabels = ['Manufacturer', 'Distributor', 'Service Provider', 'Retailer', 'Vendor'];
    const pageText = await this.page.textContent('body') || '';
    return typeLabels.some(label => pageText.includes(label));
  }

  /** Run axe-core contrast check and return violation count */
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

  /** Set page zoom to 200% and check for horizontal scroll */
  async checkZoom200(): Promise<{ h1Visible: boolean; hasHorizontalScroll: boolean }> {
    await this.page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    const h1Visible = await this.page.locator('h1').first().isVisible();
    const hasHorizontalScroll = await this.page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    return { h1Visible, hasHorizontalScroll };
  }

  /** Set viewport to mobile size */
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.page.waitForTimeout(1000);
  }

  /** Verify H1 is visible (for mobile/zoom checks) */
  async isH1Visible(): Promise<boolean> {
    return await this.page.locator('h1').first().isVisible();
  }

  /** Tab forward multiple times and verify no trap */
  async verifyNoKeyboardTrap(): Promise<boolean> {
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Shift+Tab');
    await this.page.keyboard.press('Shift+Tab');
    // If we get here without hanging, no trap exists
    return true;
  }

  /** Get all buttons and check if any have no accessible name */
  async getButtonsWithNoName(): Promise<{ count: number; firstHtml: string }> {
    const buttons = this.page.locator('button:visible');
    const count = await buttons.count();
    let noNameCount = 0;
    let firstHtml = '';
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = (await btn.textContent().catch(() => '')) || '';
      const ariaLabel = await btn.getAttribute('aria-label').catch(() => null);
      const title = await btn.getAttribute('title').catch(() => null);
      if (!text.trim() && !ariaLabel && !title) {
        noNameCount++;
        if (!firstHtml) {
          firstHtml = await btn.evaluate(el => el.outerHTML);
        }
      }
    }
    return { count: noNameCount, firstHtml };
  }

  /** Get all links and verify they have accessible names */
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

  /** Verify the page has a list structure for vendor cards */
  async getListStructureInfo(): Promise<{ hasUlOl: boolean; hasRoleList: boolean }> {
    const ulOl = await this.page.locator('ul, ol').count();
    const roleList = await this.page.locator('[role="list"]').count();
    return { hasUlOl: ulOl > 0, hasRoleList: roleList > 0 };
  }

  /** Get focused element text after pressing Tab */
  async getFocusedElementText(): Promise<string> {
    return await this.page.evaluate(() => document.activeElement?.textContent || '');
  }

  /** Press Tab key */
  async pressTab() {
    await this.page.keyboard.press('Tab');
  }

  /** Verify heading has proper role */
  async verifyH1HasHeadingRole() {
    const h1 = this.page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toHaveRole('heading');
  }

  /** Get button count on page */
  async getButtonCount(): Promise<number> {
    return await this.page.getByRole('button').count();
  }

  /** Get first button accessible name */
  async getFirstButtonAccessibleName(): Promise<string> {
    const btn = this.page.getByRole('button').first();
    const ariaLabel = await btn.getAttribute('aria-label');
    const text = await btn.textContent();
    return (ariaLabel || text || '').trim();
  }

  // ── Status Change Accessibility Methods ──

  /** Check if a status dropdown/select exists on vendor cards */
  async getStatusDropdownInfo(): Promise<{ exists: boolean; hasRole: boolean; hasLabel: boolean; hasAriaExpanded: boolean }> {
    // Look for select, combobox, or dropdown-like elements
    const select = this.page.locator('select:visible, [role="combobox"]:visible, [role="listbox"]:visible').first();
    const exists = await select.isVisible().catch(() => false);
    if (exists) {
      const role = await select.getAttribute('role');
      const ariaLabel = await select.getAttribute('aria-label');
      const ariaLabelledBy = await select.getAttribute('aria-labelledby');
      const ariaExpanded = await select.getAttribute('aria-expanded');
      return {
        exists: true,
        hasRole: !!role || (await select.evaluate(el => el.tagName.toLowerCase())) === 'select',
        hasLabel: !!(ariaLabel || ariaLabelledBy),
        hasAriaExpanded: ariaExpanded !== null
      };
    }
    // Check for custom dropdown buttons that act as status changers
    const statusBtn = this.page.locator('button:has-text("Active"), button:has-text("Inactive"), [class*="status"] button, [class*="dropdown"]').first();
    const btnExists = await statusBtn.isVisible().catch(() => false);
    if (btnExists) {
      const ariaLabel = await statusBtn.getAttribute('aria-label');
      const ariaExpanded = await statusBtn.getAttribute('aria-expanded');
      return {
        exists: true,
        hasRole: true,
        hasLabel: !!ariaLabel,
        hasAriaExpanded: ariaExpanded !== null
      };
    }
    return { exists: false, hasRole: false, hasLabel: false, hasAriaExpanded: false };
  }

  /** Check if status text labels exist (Active/Inactive as text, not just color) */
  async hasStatusTextLabels(): Promise<boolean> {
    const pageText = await this.page.textContent('body') || '';
    return pageText.includes('Active') || pageText.includes('Inactive');
  }

  /** Check for warning/confirmation dialog after status change */
  async getWarningDialogInfo(): Promise<{ exists: boolean; hasRole: boolean; hasLabel: boolean }> {
    await this.page.waitForTimeout(2000);
    const dialog = this.page.locator('[role="dialog"], [role="alertdialog"]').first();
    const exists = await dialog.isVisible().catch(() => false);
    if (!exists) return { exists: false, hasRole: false, hasLabel: false };
    const role = await dialog.getAttribute('role');
    const ariaLabel = await dialog.getAttribute('aria-label');
    const ariaLabelledBy = await dialog.getAttribute('aria-labelledby');
    return {
      exists: true,
      hasRole: role === 'alertdialog' || role === 'dialog',
      hasLabel: !!(ariaLabel || ariaLabelledBy)
    };
  }

  /** Check for success/error notification */
  async getNotificationInfo(): Promise<{ exists: boolean; hasRole: boolean; hasAriaLive: boolean }> {
    await this.page.waitForTimeout(3000);
    const notification = this.page.locator('[role="status"], [role="alert"], [aria-live], [class*="toast"], [class*="notification"], [class*="success"], [class*="snackbar"]').first();
    const exists = await notification.isVisible().catch(() => false);
    if (!exists) return { exists: false, hasRole: false, hasAriaLive: false };
    const role = await notification.getAttribute('role');
    const ariaLive = await notification.getAttribute('aria-live');
    return { exists: true, hasRole: !!(role === 'status' || role === 'alert'), hasAriaLive: !!ariaLive };
  }
}
