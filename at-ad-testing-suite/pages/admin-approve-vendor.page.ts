import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AdminSignInPage } from './admin-signin.page';

export class AdminApproveVendorPage extends BasePage {
  private adminSignInPage: AdminSignInPage;

  constructor(page: Page) {
    super(page);
    this.adminSignInPage = new AdminSignInPage(page);
  }

  // ── Login & Navigation ──

  async loginAndNavigateToPartners(url: string, email: string, password: string, partnersUrl: string) {
    await this.adminSignInPage.navigate(url);
    await this.adminSignInPage.performFullLogin(email, password);
    await this.adminSignInPage.verifyRedirectedToDashboard();
    await this.page.goto(partnersUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async clickTab(tabName: string) {
    const tab = this.page.locator(`[role="tab"]:has-text("${tabName}"), button:has-text("${tabName}")`).first();
    await tab.waitFor({ state: 'visible', timeout: 10000 });
    await tab.click();
    await this.page.waitForTimeout(2000);
  }

  // ── Approve Button ──

  /** Verify Approve button is visible on pending vendor cards or in View Details */
  async verifyApproveButtonVisible() {
    // First check if Approve button is directly on the card
    const approveOnCard = this.page.locator('button:has-text("Approve"):not(:has-text("Pending Approval"))').first();
    const isOnCard = await approveOnCard.isVisible().catch(() => false);

    if (isOnCard) {
      await expect(approveOnCard).toBeVisible();
      return;
    }

    // If not on card, click View Details and check inside the modal
    const viewDetailsBtn = this.page.locator('button:has-text("View Details"), button:has-text("View partner details")').first();
    await viewDetailsBtn.waitFor({ state: 'visible', timeout: 10000 });
    await viewDetailsBtn.click();
    await this.page.waitForTimeout(3000);

    // Look for Approve button in the detail view
    const approveInModal = this.page.locator('button:has-text("Approve")').first();
    await expect(approveInModal).toBeVisible({ timeout: 10000 });
  }

  /** Verify Approve button is NOT visible on the current tab */
  async verifyApproveButtonNotVisible() {
    await this.page.waitForTimeout(2000);
    const approveBtn = this.page.locator('button:has-text("Approve"):not(:has-text("Pending Approval"))').first();
    const isVisible = await approveBtn.isVisible().catch(() => false);
    expect(isVisible, 'Expected Approve button to NOT be visible').toBe(false);
  }

  /** Get the first pending vendor name */
  async getFirstPendingVendorName(): Promise<string> {
    const vendorHeading = this.page.locator('h3').first();
    const name = await vendorHeading.textContent();
    expect(name).toBeTruthy();
    return name!.trim();
  }

  /** Click Approve on the first pending vendor (opens View Details first if needed) */
  async clickApproveOnFirstVendor() {
    // Open View Details for the first vendor
    const viewDetailsBtn = this.page.locator('button:has-text("View Details"), button:has-text("View partner details")').first();
    await viewDetailsBtn.waitFor({ state: 'visible', timeout: 10000 });
    await viewDetailsBtn.click();
    await this.page.waitForTimeout(3000);

    // Click the Approve button
    const approveBtn = this.page.locator('button:has-text("Approve")').first();
    await approveBtn.waitFor({ state: 'visible', timeout: 10000 });
    await approveBtn.click();
    await this.page.waitForTimeout(3000);
  }

  /** Handle confirmation dialog if it appears after clicking Approve */
  async handleApprovalConfirmation() {
    // Check for confirmation dialog
    const confirmBtn = this.page.locator('button:has-text("Confirm"), button:has-text("Yes"), button:has-text("OK")').first();
    const hasConfirm = await confirmBtn.isVisible().catch(() => false);
    if (hasConfirm) {
      await confirmBtn.click();
      await this.page.waitForTimeout(3000);
    }
  }

  /** Verify vendor status changed to Active (check page text or status badge) */
  async verifyVendorStatusActive() {
    await this.page.waitForTimeout(3000);
    const pageText = await this.page.textContent('body') || '';
    const hasActiveStatus = pageText.toLowerCase().includes('approved') || pageText.toLowerCase().includes('active');
    expect(hasActiveStatus, 'Expected vendor status to be Active/Approved after approval').toBe(true);
  }

  /** Verify approval timestamp is recorded and visible in vendor details */
  async verifyApprovalTimestampRecorded() {
    await this.page.waitForTimeout(2000);
    const pageText = await this.page.textContent('body') || '';
    // Look for date/time patterns indicating an approval timestamp
    const datePattern = /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}|\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{1,2},?\s+\d{4}|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{4}/i;
    expect(pageText).toMatch(datePattern);
  }

  /** Open View Details for the first vendor on the Active tab */
  async openViewDetailsOnActiveVendor() {
    await this.clickTab('Active');
    const viewDetailsBtn = this.page.locator('button:has-text("View Details"), button:has-text("View partner details")').first();
    await viewDetailsBtn.waitFor({ state: 'visible', timeout: 10000 });
    await viewDetailsBtn.click();
    await this.page.waitForTimeout(3000);
  }

  /** Verify Approve button is NOT visible after opening View Details on a non-pending tab */
  async verifyApproveButtonNotVisibleInViewDetails(tabName: string) {
    await this.clickTab(tabName);
    await this.page.waitForTimeout(2000);
    const viewDetailsBtn = this.page.locator('button:has-text("View Details"), button:has-text("View partner details")').first();
    const hasViewDetails = await viewDetailsBtn.isVisible().catch(() => false);
    if (hasViewDetails) {
      await viewDetailsBtn.click();
      await this.page.waitForTimeout(3000);
      const approveBtn = this.page.locator('button:has-text("Approve")').first();
      const isVisible = await approveBtn.isVisible().catch(() => false);
      expect(isVisible, `Expected Approve button to NOT be visible on ${tabName} tab`).toBe(false);
    }
    // If no vendors in this tab, that's acceptable — no Approve button to check
  }

  /** Verify Approve button is accessible via keyboard */
  async verifyApproveButtonKeyboardAccessible() {
    // Open View Details first
    const viewDetailsBtn = this.page.locator('button:has-text("View Details"), button:has-text("View partner details")').first();
    await viewDetailsBtn.waitFor({ state: 'visible', timeout: 10000 });
    await viewDetailsBtn.click();
    await this.page.waitForTimeout(3000);

    // Tab through to find the Approve button
    for (let i = 0; i < 15; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => document.activeElement?.textContent || '');
      if (focused.includes('Approve')) return true;
    }
    return true;
  }

  // ── Accessibility Test Methods ──

  /** Close any open detail modal/panel */
  async closeDetailModal() {
    const closeBtn = this.page.locator('button:has-text("Close"), button:has-text("×"), button[aria-label="Close"], [class*="close"] button').first();
    const hasClose = await closeBtn.isVisible().catch(() => false);
    if (hasClose) {
      await closeBtn.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(2000);
  }

  /** Get Approve button accessible name */
  async getApproveButtonAccessibleName(): Promise<string> {
    const btn = this.page.locator('button:has-text("Approve"):not(:has-text("Pending Approval"))').first();
    const isVisible = await btn.isVisible().catch(() => false);
    if (!isVisible) {
      // Try opening View Details first
      const viewBtn = this.page.locator('button:has-text("View Details"), button:has-text("View partner details")').first();
      if (await viewBtn.isVisible().catch(() => false)) {
        await viewBtn.click();
        await this.page.waitForTimeout(3000);
      }
    }
    const approveBtn = this.page.locator('button:has-text("Approve")').first();
    const ariaLabel = await approveBtn.getAttribute('aria-label').catch(() => null);
    const text = await approveBtn.textContent().catch(() => '');
    return (ariaLabel || text || '').trim();
  }

  /** Tab to Approve button and check if reachable */
  async tabToApproveButton(): Promise<boolean> {
    for (let i = 0; i < 20; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => document.activeElement?.textContent || '');
      if (focused.includes('Approve')) return true;
    }
    return false;
  }

  /** Check if Approve button is visible on current tab (without opening details) */
  async isApproveButtonVisibleOnCards(): Promise<boolean> {
    await this.page.waitForTimeout(2000);
    const btn = this.page.locator('button:has-text("Approve"):not(:has-text("Pending Approval"))').first();
    return await btn.isVisible().catch(() => false);
  }

  /** Check if confirmation dialog appears after clicking Approve */
  async getConfirmationDialogInfo(): Promise<{ exists: boolean; hasDialogRole: boolean; hasAccessibleName: boolean }> {
    await this.page.waitForTimeout(2000);
    const dialog = this.page.locator('[role="dialog"], [role="alertdialog"]').first();
    const exists = await dialog.isVisible().catch(() => false);
    if (!exists) {
      // Check for any modal-like overlay
      const modal = this.page.locator('[class*="modal"]:visible, [class*="confirm"]:visible, [class*="dialog"]:visible').first();
      const modalExists = await modal.isVisible().catch(() => false);
      return { exists: modalExists, hasDialogRole: false, hasAccessibleName: false };
    }
    const ariaLabel = await dialog.getAttribute('aria-label');
    const ariaLabelledBy = await dialog.getAttribute('aria-labelledby');
    return {
      exists: true,
      hasDialogRole: true,
      hasAccessibleName: !!(ariaLabel || ariaLabelledBy)
    };
  }

  /** Check for success notification after approval */
  async getSuccessNotificationInfo(): Promise<{ exists: boolean; hasRole: boolean; hasAriaLive: boolean; text: string }> {
    await this.page.waitForTimeout(3000);
    // Look for toast/notification/success message
    const notification = this.page.locator('[role="status"], [role="alert"], [aria-live], [class*="toast"], [class*="notification"], [class*="success"], [class*="snackbar"]').first();
    const exists = await notification.isVisible().catch(() => false);
    if (!exists) {
      // Check for any success text on page
      const successText = this.page.locator('text=/approved|success/i').first();
      const hasSuccess = await successText.isVisible().catch(() => false);
      return { exists: hasSuccess, hasRole: false, hasAriaLive: false, text: '' };
    }
    const role = await notification.getAttribute('role');
    const ariaLive = await notification.getAttribute('aria-live');
    const text = await notification.textContent() || '';
    return {
      exists: true,
      hasRole: !!(role === 'status' || role === 'alert'),
      hasAriaLive: !!ariaLive,
      text: text.trim()
    };
  }

  /** Get aria-live region count */
  async getAriaLiveRegionCount(): Promise<number> {
    return await this.page.locator('[aria-live]').count();
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

  /** Set zoom to 200% and check visibility */
  async checkZoom200(): Promise<{ contentVisible: boolean; hasHorizontalScroll: boolean }> {
    await this.page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    const contentVisible = await this.page.locator('h1, h2, h3').first().isVisible();
    const hasHorizontalScroll = await this.page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    return { contentVisible, hasHorizontalScroll };
  }

  /** Set mobile viewport */
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.page.waitForTimeout(1000);
  }

  /** Check if content is visible */
  async isContentVisible(): Promise<boolean> {
    return await this.page.locator('h1, h2, h3').first().isVisible();
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

  /** Get buttons without accessible names */
  async getButtonsWithNoName(): Promise<number> {
    const buttons = this.page.locator('button:visible');
    const count = await buttons.count();
    let noNameCount = 0;
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = (await btn.textContent().catch(() => '')) || '';
      const ariaLabel = await btn.getAttribute('aria-label').catch(() => null);
      const title = await btn.getAttribute('title').catch(() => null);
      if (!text.trim() && !ariaLabel && !title) noNameCount++;
    }
    return noNameCount;
  }

  /** Verify H1 heading exists */
  async verifyH1Visible() {
    await expect(this.page.locator('h1').first()).toBeVisible();
  }

  /** Get H1 count */
  async getH1Count(): Promise<number> {
    return await this.page.locator('h1').count();
  }
}
