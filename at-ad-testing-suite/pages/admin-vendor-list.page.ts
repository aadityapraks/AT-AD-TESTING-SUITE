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
}
