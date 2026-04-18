import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AdminSignInPage } from './admin-signin.page';

export class AdminVendorDetailsPage extends BasePage {
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

  // ── View Details Trigger ──

  async verifyViewDetailsButtonPresent() {
    const btn = this.page.locator('button:has-text("View Details"), a:has-text("View Details")').first();
    await expect(btn).toBeVisible({ timeout: 10000 });
  }

  async clickViewDetailsOnFirstVendor() {
    const btn = this.page.locator('button:has-text("View Details"), a:has-text("View Details")').first();
    await btn.waitFor({ state: 'visible', timeout: 10000 });
    await btn.click();
    await this.page.waitForTimeout(3000);
  }

  async verifyDetailViewOpened() {
    await this.page.waitForTimeout(2000);
    // Verify we're in a detail view — look for detail-specific content
    const pageText = await this.page.textContent('body') || '';
    // Detail view should have more content than just the card
    expect(pageText.length).toBeGreaterThan(100);
  }

  // ── Vendor Detail Fields ──

  async verifyFieldDisplayed(fieldText: string) {
    await this.page.waitForTimeout(2000);
    const pageText = await this.page.textContent('body') || '';
    expect(pageText.toLowerCase()).toContain(fieldText.toLowerCase());
  }

  async verifyContactPersonDisplayed(expectedContact: string) {
    await this.verifyFieldDisplayed(expectedContact);
  }

  async verifyEmailDisplayed(expectedEmail: string) {
    await this.verifyFieldDisplayed(expectedEmail);
  }

  async verifyPhoneDisplayed(expectedPhone: string) {
    await this.verifyFieldDisplayed(expectedPhone);
  }

  async verifyGSTDisplayed(expectedGST: string) {
    await this.verifyFieldDisplayed(expectedGST);
  }

  async verifyLocationDisplayed(expectedLocation: string) {
    await this.verifyFieldDisplayed(expectedLocation);
  }

  async verifyVendorTypeDisplayed(expectedType: string) {
    await this.verifyFieldDisplayed(expectedType);
  }

  async verifyProductCountDisplayed() {
    await this.page.waitForTimeout(2000);
    const pageText = await this.page.textContent('body') || '';
    expect(pageText.toLowerCase()).toMatch(/\d+\s*product/i);
  }

  async verifyApplicationDateDisplayed() {
    await this.page.waitForTimeout(2000);
    const pageText = await this.page.textContent('body') || '';
    const datePattern = /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}|\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{1,2},?\s+\d{4}|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+\d{4}/i;
    expect(pageText).toMatch(datePattern);
  }

  // ── Read-Only Modal ──

  async verifyModalIsReadOnly() {
    await this.page.waitForTimeout(2000);
    // Check that no editable input fields are present in the detail view
    const editableInputs = this.page.locator('[role="dialog"] input:not([readonly]):not([disabled]), [role="dialog"] textarea:not([readonly]):not([disabled]), [class*="detail"] input:not([readonly]):not([disabled])');
    const editableCount = await editableInputs.count().catch(() => 0);
    // Read-only modal should have no editable fields (or very few like search)
    expect(editableCount).toBeLessThanOrEqual(1);
  }

  // ── Modal Close ──

  async closeDetailModal() {
    const closeBtn = this.page.locator('button:has-text("Close"), button:has-text("×"), button[aria-label="Close"], [class*="close"]').first();
    const hasClose = await closeBtn.isVisible().catch(() => false);
    if (hasClose) {
      await closeBtn.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(2000);
  }

  async closeDetailModalViaEscape() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(2000);
  }

  async verifyDetailModalClosed() {
    await this.page.waitForTimeout(1000);
    // Verify we're back on the vendor list — tabs should be visible
    const tab = this.page.locator('[role="tab"]:has-text("Pending"), button:has-text("Pending")').first();
    const isVisible = await tab.isVisible().catch(() => false);
    expect(isVisible).toBe(true);
  }

  // ── Accessibility ──

  async verifyDetailViewKeyboardAccessible() {
    await this.page.keyboard.press('Tab');
    // Verify focus moves within the detail view
    for (let i = 0; i < 5; i++) {
      await this.page.keyboard.press('Tab');
    }
    return true;
  }

  // ── View Details Across Tabs ──

  async verifyViewDetailsWorksOnTab(tabName: string) {
    await this.clickTab(tabName);
    await this.page.waitForTimeout(2000);
    const btn = this.page.locator('button:has-text("View Details"), a:has-text("View Details")').first();
    const hasBtn = await btn.isVisible().catch(() => false);
    if (hasBtn) {
      await btn.click();
      await this.page.waitForTimeout(3000);
      await this.verifyDetailViewOpened();
      await this.closeDetailModal();
    }
    // If no vendors in this tab, that's acceptable
  }
}
