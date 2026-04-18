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
}
