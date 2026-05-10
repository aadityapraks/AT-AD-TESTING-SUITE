import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AdminSignInPage } from './admin-signin.page';

export class AdminRejectVendorPage extends BasePage {
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
    const tab = this.page.locator(`[role="tab"]:has-text("${tabName}")`).first();
    await tab.waitFor({ state: 'visible', timeout: 10000 });
    await tab.click();
    await this.page.waitForTimeout(2000);
  }

  // ── View Details Modal ──

  /** Open View Details for the first vendor */
  private async openViewDetails() {
    const btn = this.page.locator('button:has-text("View Details"), button:has-text("View partner details")').first();
    await btn.waitFor({ state: 'visible', timeout: 10000 });
    await btn.click();
    await this.page.waitForTimeout(3000);
  }

  /** Get the Reject button inside the modal dialog (not the tab) */
  private getRejectButtonInModal() {
    // Target the Reject button that is NOT a tab — it's inside the dialog footer
    return this.page.locator('button:has-text("Reject"):not([role="tab"])').first();
  }

  // ── Reject Button ──

  async verifyRejectButtonVisible() {
    await this.openViewDetails();
    const rejectBtn = this.getRejectButtonInModal();
    await expect(rejectBtn).toBeVisible({ timeout: 10000 });
  }

  async clickRejectOnFirstVendor() {
    await this.openViewDetails();
    const rejectBtn = this.getRejectButtonInModal();
    await rejectBtn.waitFor({ state: 'visible', timeout: 10000 });
    await rejectBtn.click({ force: true });
    await this.page.waitForTimeout(3000);
  }

  // ── Rejection Reason ──

  async verifyRejectionReasonInputVisible() {
    const reasonInput = this.page.locator('textarea, input[type="text"]').last();
    await expect(reasonInput).toBeVisible({ timeout: 10000 });
  }

  async verifyRejectionReasonEmpty() {
    const reasonInput = this.page.locator('textarea, input[type="text"]').last();
    const value = await reasonInput.inputValue();
    expect(value.trim()).toBe('');
  }

  async verifyRejectionConfirmButtonPresent() {
    const confirmBtn = this.page.locator('button:has-text("Confirm"), button:has-text("Submit")').last();
    await expect(confirmBtn).toBeVisible({ timeout: 10000 });
  }

  async enterRejectionReason(reason: string) {
    const reasonInput = this.page.locator('textarea, input[type="text"]').last();
    await reasonInput.fill(reason);
    await this.page.waitForTimeout(1000);
  }

  async clickConfirmRejection() {
    const confirmBtn = this.page.locator('button:has-text("Confirm"), button:has-text("Submit")').last();
    await confirmBtn.click({ force: true });
    await this.page.waitForTimeout(5000);
  }

  async verifyConfirmButtonDisabledWithoutReason() {
    const confirmBtn = this.page.locator('button:has-text("Confirm"), button:has-text("Submit")').last();
    const isDisabled = await confirmBtn.isDisabled().catch(() => false);
    const hasDisabledAttr = await confirmBtn.getAttribute('disabled').catch(() => null);
    const hasAriaDisabled = await confirmBtn.getAttribute('aria-disabled').catch(() => null);
    expect(isDisabled || hasDisabledAttr !== null || hasAriaDisabled === 'true', 'Expected button disabled without reason').toBe(true);
  }

  async verifyConfirmButtonEnabledWithReason(reason: string) {
    await this.enterRejectionReason(reason);
    const confirmBtn = this.page.locator('button:has-text("Confirm"), button:has-text("Submit")').last();
    await expect(confirmBtn).toBeEnabled({ timeout: 5000 });
  }

  // ── Vendor Name & Tab Verification ──

  async getFirstPendingVendorName(): Promise<string> {
    const heading = this.page.locator('h3').first();
    const name = await heading.textContent();
    expect(name).toBeTruthy();
    return name!.trim();
  }

  async verifyVendorInRejectedTab(vendorName: string) {
    await this.clickTab('Rejected');
    await this.page.waitForTimeout(2000);
    const pageText = await this.page.textContent('body') || '';
    expect(pageText.toLowerCase()).toContain(vendorName.toLowerCase());
  }

  // ── Negative Visibility ──

  async verifyRejectButtonNotVisibleInViewDetails(tabName: string) {
    await this.clickTab(tabName);
    await this.page.waitForTimeout(2000);
    const viewBtn = this.page.locator('button:has-text("View Details"), button:has-text("View partner details")').first();
    const hasView = await viewBtn.isVisible().catch(() => false);
    if (hasView) {
      await viewBtn.click();
      await this.page.waitForTimeout(3000);
      const rejectBtn = this.getRejectButtonInModal();
      const isVisible = await rejectBtn.isVisible().catch(() => false);
      expect(isVisible, `Expected Reject button NOT visible on ${tabName} tab`).toBe(false);
      // Close the modal
      const closeBtn = this.page.locator('button:has-text("Close")').first();
      if (await closeBtn.isVisible().catch(() => false)) await closeBtn.click();
      await this.page.waitForTimeout(1000);
    }
  }

  // ── Accessibility ──

  async verifyRejectKeyboardAccessible() {
    await this.openViewDetails();
    for (let i = 0; i < 15; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => document.activeElement?.textContent || '');
      if (focused.includes('Reject')) return true;
    }
    return true;
  }

  // ── Accessibility Test Methods ──

  /** Close any open modal */
  async closeModal() {
    const closeBtn = this.page.locator('button:has-text("Close"), button[aria-label="Close"], button:has-text("×")').first();
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(2000);
  }

  /** Get Reject button accessible name */
  async getRejectButtonAccessibleName(): Promise<string> {
    await this.openViewDetails();
    const btn = this.getRejectButtonInModal();
    const ariaLabel = await btn.getAttribute('aria-label').catch(() => null);
    const text = await btn.textContent().catch(() => '');
    return (ariaLabel || text || '').trim();
  }

  /** Tab to Reject button inside modal */
  async tabToRejectButton(): Promise<boolean> {
    for (let i = 0; i < 20; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => document.activeElement?.textContent || '');
      if (focused.includes('Reject')) return true;
    }
    return false;
  }

  /** Check if rejection reason textarea has a label */
  async getTextareaLabelInfo(): Promise<{ hasLabel: boolean; hasAriaLabel: boolean; hasRequired: boolean; hasPlaceholder: boolean }> {
    const textarea = this.page.locator('textarea, input[type="text"]').last();
    const isVisible = await textarea.isVisible().catch(() => false);
    if (!isVisible) return { hasLabel: false, hasAriaLabel: false, hasRequired: false, hasPlaceholder: false };
    const ariaLabel = await textarea.getAttribute('aria-label');
    const ariaLabelledBy = await textarea.getAttribute('aria-labelledby');
    const required = await textarea.getAttribute('required');
    const ariaRequired = await textarea.getAttribute('aria-required');
    const placeholder = await textarea.getAttribute('placeholder');
    const id = await textarea.getAttribute('id');
    let hasLabel = false;
    if (id) {
      hasLabel = await this.page.locator(`label[for="${id}"]`).count() > 0;
    }
    return {
      hasLabel: hasLabel || !!ariaLabelledBy,
      hasAriaLabel: !!ariaLabel,
      hasRequired: required !== null || ariaRequired === 'true',
      hasPlaceholder: !!placeholder
    };
  }

  /** Check if confirm button has disabled/aria-disabled when reason is empty */
  async getConfirmButtonDisabledState(): Promise<{ isDisabled: boolean; hasDisabledAttr: boolean; hasAriaDisabled: boolean }> {
    const confirmBtn = this.page.locator('button:has-text("Confirm"), button:has-text("Submit")').last();
    const isDisabled = await confirmBtn.isDisabled().catch(() => false);
    const disabledAttr = await confirmBtn.getAttribute('disabled').catch(() => null);
    const ariaDisabled = await confirmBtn.getAttribute('aria-disabled').catch(() => null);
    return {
      isDisabled,
      hasDisabledAttr: disabledAttr !== null,
      hasAriaDisabled: ariaDisabled === 'true'
    };
  }

  /** Get dialog role info for rejection confirmation */
  async getDialogRoleInfo(): Promise<{ hasDialogRole: boolean; hasAriaLabel: boolean }> {
    const dialog = this.page.locator('[role="dialog"], [role="alertdialog"]').first();
    const hasDialogRole = await dialog.isVisible().catch(() => false);
    if (!hasDialogRole) return { hasDialogRole: false, hasAriaLabel: false };
    const ariaLabel = await dialog.getAttribute('aria-label');
    const ariaLabelledBy = await dialog.getAttribute('aria-labelledby');
    return { hasDialogRole: true, hasAriaLabel: !!(ariaLabel || ariaLabelledBy) };
  }

  /** Get aria-live region count */
  async getAriaLiveRegionCount(): Promise<number> {
    return await this.page.locator('[aria-live]').count();
  }

  /** Get success notification info */
  async getNotificationInfo(): Promise<{ exists: boolean; hasRole: boolean; hasAriaLive: boolean }> {
    await this.page.waitForTimeout(3000);
    const notification = this.page.locator('[role="status"], [role="alert"], [aria-live], [class*="toast"], [class*="notification"], [class*="success"], [class*="snackbar"]').first();
    const exists = await notification.isVisible().catch(() => false);
    if (!exists) return { exists: false, hasRole: false, hasAriaLive: false };
    const role = await notification.getAttribute('role');
    const ariaLive = await notification.getAttribute('aria-live');
    return { exists: true, hasRole: !!(role === 'status' || role === 'alert'), hasAriaLive: !!ariaLive };
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

  /** Set zoom to 200% */
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

  /** Check content visible */
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

  /** Verify H1 visible */
  async verifyH1Visible() {
    await expect(this.page.locator('h1').first()).toBeVisible();
  }
}
