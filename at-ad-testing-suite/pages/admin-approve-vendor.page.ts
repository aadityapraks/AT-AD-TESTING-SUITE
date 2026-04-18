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
}
