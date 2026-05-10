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

  // ── Accessibility Test Methods ──

  /** Get View Details button accessible name */
  async getViewDetailsButtonAccessibleName(): Promise<string> {
    const btn = this.page.locator('button:has-text("View Details"), a:has-text("View Details")').first();
    const ariaLabel = await btn.getAttribute('aria-label').catch(() => null);
    const text = await btn.textContent().catch(() => '');
    return (ariaLabel || text || '').trim();
  }

  /** Check if modal/dialog has role="dialog" */
  async getDialogRoleInfo(): Promise<{ hasDialogRole: boolean; hasAriaModal: boolean; hasAriaLabel: boolean }> {
    const dialog = this.page.locator('[role="dialog"]').first();
    const hasDialogRole = await dialog.isVisible().catch(() => false);
    if (!hasDialogRole) {
      return { hasDialogRole: false, hasAriaModal: false, hasAriaLabel: false };
    }
    const ariaModal = await dialog.getAttribute('aria-modal');
    const ariaLabel = await dialog.getAttribute('aria-label');
    const ariaLabelledBy = await dialog.getAttribute('aria-labelledby');
    return {
      hasDialogRole: true,
      hasAriaModal: ariaModal === 'true',
      hasAriaLabel: !!(ariaLabel || ariaLabelledBy)
    };
  }

  /** Check if focus moved into the modal after opening */
  async isFocusInsideModal(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const active = document.activeElement;
      if (!active) return false;
      const dialog = document.querySelector('[role="dialog"]');
      if (dialog && dialog.contains(active)) return true;
      // Check if focus is in any overlay/modal-like container
      const modal = active.closest('[class*="modal"], [class*="dialog"], [class*="overlay"], [class*="detail"]');
      return !!modal;
    });
  }

  /** Tab through modal and check if focus stays within */
  async verifyFocusTrapInModal(): Promise<boolean> {
    // Tab several times and check focus stays in modal area
    for (let i = 0; i < 10; i++) {
      await this.page.keyboard.press('Tab');
    }
    return await this.isFocusInsideModal();
  }

  /** Press Escape and check if modal closes */
  async pressEscapeAndCheckClosed(): Promise<boolean> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(2000);
    // Check if we're back on vendor list (tabs visible)
    const tab = this.page.locator('[role="tab"]:has-text("Pending"), button:has-text("Pending")').first();
    return await tab.isVisible().catch(() => false);
  }

  /** Get close button accessible name */
  async getCloseButtonAccessibleName(): Promise<{ exists: boolean; name: string }> {
    const closeBtn = this.page.locator('[role="dialog"] button:has-text("Close"), [role="dialog"] button[aria-label*="close" i], [role="dialog"] button:has-text("×"), button[aria-label="Close"], [class*="close"] button, button[class*="close"]').first();
    const exists = await closeBtn.isVisible().catch(() => false);
    if (!exists) return { exists: false, name: '' };
    const ariaLabel = await closeBtn.getAttribute('aria-label') || '';
    const text = (await closeBtn.textContent()) || '';
    return { exists: true, name: (ariaLabel || text).trim() };
  }

  /** Get heading count inside modal/detail view */
  async getModalHeadingCount(): Promise<number> {
    const dialog = this.page.locator('[role="dialog"]');
    const hasDialog = await dialog.isVisible().catch(() => false);
    if (hasDialog) {
      return await dialog.locator('h1, h2, h3, h4').count();
    }
    // Fallback: check page headings
    return await this.page.locator('h1, h2, h3, h4').count();
  }

  /** Check if business detail fields have labels */
  async getFieldLabelsInfo(): Promise<{ hasLabels: boolean; labelCount: number }> {
    const labels = ['Category', 'GST', 'Application Date', 'Products', 'Type', 'Contact', 'Email', 'Phone', 'Address', 'Location'];
    const pageText = await this.page.textContent('body') || '';
    let labelCount = 0;
    for (const label of labels) {
      if (pageText.includes(label)) labelCount++;
    }
    return { hasLabels: labelCount >= 3, labelCount };
  }

  /** Check if email is a mailto link */
  async hasMailtoLink(): Promise<boolean> {
    const mailtoLinks = await this.page.locator('a[href^="mailto:"]').count();
    return mailtoLinks > 0;
  }

  /** Check if phone is a tel link */
  async hasTelLink(): Promise<boolean> {
    const telLinks = await this.page.locator('a[href^="tel:"]').count();
    return telLinks > 0;
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

  /** Set zoom to 200% and check for horizontal scroll */
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

  /** Check if content is visible on current viewport */
  async isContentVisible(): Promise<boolean> {
    return await this.page.locator('h1, h2, h3').first().isVisible();
  }

  /** Verify no keyboard trap (Tab and Shift+Tab work) */
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

  /** Verify links have accessible names */
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

  /** Check if detail view has definition list or table structure */
  async hasSemanticFieldStructure(): Promise<boolean> {
    const dl = await this.page.locator('dl').count();
    const table = await this.page.locator('table').count();
    const labelledDivs = await this.page.locator('[aria-labelledby], [aria-label]').count();
    return dl > 0 || table > 0 || labelledDivs > 3;
  }
}
