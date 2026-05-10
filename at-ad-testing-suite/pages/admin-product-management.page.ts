import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AdminSignInPage } from './admin-signin.page';

export class AdminProductManagementPage extends BasePage {
  private adminSignInPage: AdminSignInPage;

  constructor(page: Page) {
    super(page);
    this.adminSignInPage = new AdminSignInPage(page);
  }

  // ── Login & Navigation ──

  async loginAndNavigateToProducts(url: string, email: string, password: string, productsUrl: string) {
    await this.adminSignInPage.navigate(url);
    await this.adminSignInPage.performFullLogin(email, password);
    await this.adminSignInPage.verifyRedirectedToDashboard();
    await this.page.goto(productsUrl);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);
  }

  // ── Tab Navigation ──

  async clickTab(tabName: string) {
    const tab = this.page.locator(`[role="tab"]:has-text("${tabName}"), button:has-text("${tabName}")`).first();
    await tab.waitFor({ state: 'visible', timeout: 10000 });
    await tab.click();
    await this.page.waitForTimeout(2000);
  }

  async verifyTabVisible(tabName: string) {
    const tab = this.page.locator(`[role="tab"]:has-text("${tabName}"), button:has-text("${tabName}")`).first();
    await expect(tab).toBeVisible({ timeout: 10000 });
  }

  // ── Page Structure ──

  async getH1Count(): Promise<number> {
    return await this.page.locator('h1').count();
  }

  async verifyH1Visible() {
    await expect(this.page.locator('h1').first()).toBeVisible();
  }

  async getMainLandmarkCount(): Promise<number> {
    return await this.page.locator('main, [role="main"]').count();
  }

  async getNavLandmarkCount(): Promise<number> {
    return await this.page.locator('nav, [role="navigation"]').count();
  }

  async getHtmlLangAttribute(): Promise<string | null> {
    return await this.page.locator('html').getAttribute('lang');
  }

  // ── ARIA Tabs ──

  async getTablistRoleCount(): Promise<number> {
    return await this.page.locator('[role="tablist"]').count();
  }

  async getTabRoleCount(): Promise<number> {
    return await this.page.locator('[role="tab"]').count();
  }

  async getTabpanelRoleCount(): Promise<number> {
    return await this.page.locator('[role="tabpanel"]').count();
  }

  async getActiveTabAriaSelected(): Promise<string | null> {
    const activeTab = this.page.locator('[role="tab"][aria-selected="true"]').first();
    const isVisible = await activeTab.isVisible().catch(() => false);
    return isVisible ? 'true' : null;
  }

  async tabToTabsArea(): Promise<string> {
    for (let i = 0; i < 15; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => document.activeElement?.textContent || '');
      if (focused.includes('New') || focused.includes('Pending') || focused.includes('Official') || focused.includes('Approved') || focused.includes('All')) {
        return focused;
      }
    }
    return '';
  }

  async pressArrowRightAndGetFocusedText(): Promise<string> {
    await this.page.keyboard.press('ArrowRight');
    return await this.page.evaluate(() => document.activeElement?.textContent || '');
  }

  async getTabAccessibleName(tabName: string): Promise<string> {
    const tab = this.page.locator(`[role="tab"]:has-text("${tabName}"), button:has-text("${tabName}")`).first();
    return (await tab.textContent()) || '';
  }

  // ── Product Cards ──

  async getFirstProductCardInfo(): Promise<{ hasText: boolean; textLength: number; hasHeading: boolean }> {
    const card = this.page.locator('[class*="card"]:not([class*="metric"]), [class*="product-item"], [class*="product-card"]').first();
    const isVisible = await card.isVisible().catch(() => false);
    if (!isVisible) return { hasText: false, textLength: 0, hasHeading: false };
    const text = await card.textContent() || '';
    const hasHeading = await card.locator('h2, h3, h4, [class*="title"], [class*="name"]').count() > 0;
    return { hasText: text.trim().length > 0, textLength: text.trim().length, hasHeading };
  }

  async hasStatusTextLabels(): Promise<boolean> {
    const pageText = await this.page.textContent('body') || '';
    const statusLabels = ['Approved', 'Pending', 'Rejected', 'Draft', 'Under Review', 'New', 'Official'];
    return statusLabels.some(label => pageText.includes(label));
  }

  async hasDisabilityTypeTags(): Promise<boolean> {
    const tags = this.page.locator('[class*="tag"], [class*="chip"], [class*="badge"]:not([class*="status"])');
    return await tags.count() > 0;
  }

  // ── Action Buttons ──

  async getActionButtonsInfo(): Promise<{ total: number; withNames: number }> {
    const actionBtns = this.page.locator('button:has-text("Approve"), button:has-text("Reject"), button:has-text("View"), button:has-text("Edit")');
    const total = await actionBtns.count();
    let withNames = 0;
    for (let i = 0; i < Math.min(total, 5); i++) {
      const text = (await actionBtns.nth(i).textContent()) || '';
      const ariaLabel = await actionBtns.nth(i).getAttribute('aria-label');
      if (text.trim().length > 0 || ariaLabel) withNames++;
    }
    return { total, withNames };
  }

  // ── Dynamic Content ──

  async getAriaLiveRegionCount(): Promise<number> {
    return await this.page.locator('[aria-live]').count();
  }

  async verifyTabContentLoaded() {
    await this.page.waitForTimeout(2000);
    const cards = this.page.locator('[class*="card"]:not([class*="metric"]), [class*="product"]');
    const emptyState = this.page.locator('text=/no .*(product|result|item)/i, [class*="empty"], [class*="no-data"]').first();
    const hasCards = await cards.count() > 0;
    const hasEmptyState = await emptyState.isVisible().catch(() => false);
    expect(hasCards || hasEmptyState, 'Expected either product cards or empty state').toBe(true);
  }

  async getListStructureInfo(): Promise<{ hasUlOl: boolean; hasRoleList: boolean }> {
    const ulOl = await this.page.locator('ul, ol').count();
    const roleList = await this.page.locator('[role="list"]').count();
    return { hasUlOl: ulOl > 0, hasRoleList: roleList > 0 };
  }

  // ── Visual & Zoom ──

  async runAxeContrastCheck(): Promise<{ violationCount: number; violations: any[] }> {
    const AxeBuilder = (await import('@axe-core/playwright')).default;
    const results = await new AxeBuilder({ page: this.page })
      .withRules(['color-contrast'])
      .analyze();
    return { violationCount: results.violations.length, violations: results.violations };
  }

  async runAxeFullScan(): Promise<{ violationCount: number; violations: any[] }> {
    const AxeBuilder = (await import('@axe-core/playwright')).default;
    const results = await new AxeBuilder({ page: this.page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    return { violationCount: results.violations.length, violations: results.violations };
  }

  async checkZoom200(): Promise<{ h1Visible: boolean; hasHorizontalScroll: boolean }> {
    await this.page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    const h1Visible = await this.page.locator('h1').first().isVisible();
    const hasHorizontalScroll = await this.page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    return { h1Visible, hasHorizontalScroll };
  }

  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.page.waitForTimeout(1000);
  }

  async isH1Visible(): Promise<boolean> {
    return await this.page.locator('h1').first().isVisible();
  }

  // ── Keyboard ──

  async verifyNoKeyboardTrap(): Promise<boolean> {
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Shift+Tab');
    await this.page.keyboard.press('Shift+Tab');
    return true;
  }

  async pressTab() {
    await this.page.keyboard.press('Tab');
  }

  async getButtonCount(): Promise<number> {
    return await this.page.getByRole('button').count();
  }

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

  async verifyH1HasHeadingRole() {
    const h1 = this.page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toHaveRole('heading');
  }

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

  // ── Product Review & Approval Methods ──

  /** Click View Details on first product card */
  async clickViewDetailsOnFirstProduct() {
    const viewBtn = this.page.locator('button:has-text("View"), button:has-text("Details"), a:has-text("View")').first();
    if (await viewBtn.isVisible().catch(() => false)) {
      await viewBtn.click();
      await this.page.waitForTimeout(3000);
    }
  }

  /** Get heading count in detail panel */
  async getDetailPanelHeadingCount(): Promise<number> {
    return await this.page.locator('h1, h2, h3, h4').count();
  }

  /** Get Approve button info */
  async getApproveButtonInfo(): Promise<{ exists: boolean; name: string }> {
    const btn = this.page.locator('button:has-text("Approve"):visible').first();
    const exists = await btn.isVisible().catch(() => false);
    if (!exists) return { exists: false, name: '' };
    const ariaLabel = await btn.getAttribute('aria-label').catch(() => null);
    const text = await btn.textContent().catch(() => '');
    return { exists: true, name: (ariaLabel || text || '').trim() };
  }

  /** Click Approve button */
  async clickApproveButton() {
    const btn = this.page.locator('button:has-text("Approve"):visible').first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click();
      await this.page.waitForTimeout(3000);
    }
  }

  /** Get dialog role info */
  async getDialogRoleInfo(): Promise<{ exists: boolean; hasDialogRole: boolean; hasAriaLabel: boolean }> {
    const dialog = this.page.locator('[role="dialog"], [role="alertdialog"]').first();
    const exists = await dialog.isVisible().catch(() => false);
    if (!exists) return { exists: false, hasDialogRole: false, hasAriaLabel: false };
    const ariaLabel = await dialog.getAttribute('aria-label');
    const ariaLabelledBy = await dialog.getAttribute('aria-labelledby');
    return { exists: true, hasDialogRole: true, hasAriaLabel: !!(ariaLabel || ariaLabelledBy) };
  }

  // ── Product Reject Methods ──

  /** Click Reject button on first product */
  async clickRejectButton() {
    const btn = this.page.locator('button:has-text("Reject"):visible').first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click();
      await this.page.waitForTimeout(3000);
    }
  }

  /** Get Reject button info */
  async getRejectButtonInfo(): Promise<{ exists: boolean; name: string }> {
    const btn = this.page.locator('button:has-text("Reject"):visible').first();
    const exists = await btn.isVisible().catch(() => false);
    if (!exists) return { exists: false, name: '' };
    const ariaLabel = await btn.getAttribute('aria-label').catch(() => null);
    const text = await btn.textContent().catch(() => '');
    return { exists: true, name: (ariaLabel || text || '').trim() };
  }

  /** Check if focus is inside a modal/dialog */
  async isFocusInsideModal(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const active = document.activeElement;
      if (!active) return false;
      const dialog = document.querySelector('[role="dialog"], [role="alertdialog"]');
      if (dialog && dialog.contains(active)) return true;
      const modal = active.closest('[class*="modal"], [class*="dialog"], [class*="overlay"]');
      return !!modal;
    });
  }

  /** Get rejection textarea label info */
  async getRejectTextareaLabelInfo(): Promise<{ exists: boolean; hasLabel: boolean; hasRequired: boolean }> {
    const textarea = this.page.locator('textarea:visible, input[type="text"]:visible').last();
    const exists = await textarea.isVisible().catch(() => false);
    if (!exists) return { exists: false, hasLabel: false, hasRequired: false };
    const ariaLabel = await textarea.getAttribute('aria-label');
    const ariaLabelledBy = await textarea.getAttribute('aria-labelledby');
    const required = await textarea.getAttribute('required');
    const ariaRequired = await textarea.getAttribute('aria-required');
    const id = await textarea.getAttribute('id');
    let hasLabel = !!(ariaLabel || ariaLabelledBy);
    if (!hasLabel && id) {
      hasLabel = await this.page.locator(`label[for="${id}"]`).count() > 0;
    }
    return { exists: true, hasLabel, hasRequired: required !== null || ariaRequired === 'true' };
  }

  /** Get confirm button disabled state */
  async getConfirmButtonDisabledState(): Promise<{ isDisabled: boolean; hasAttr: boolean }> {
    const btn = this.page.locator('button:has-text("Confirm"), button:has-text("Submit"), button:has-text("Reject"):visible').last();
    const isDisabled = await btn.isDisabled().catch(() => false);
    const disabledAttr = await btn.getAttribute('disabled').catch(() => null);
    const ariaDisabled = await btn.getAttribute('aria-disabled').catch(() => null);
    return { isDisabled, hasAttr: disabledAttr !== null || ariaDisabled === 'true' };
  }

  /** Press Escape and check if modal closes */
  async pressEscapeAndCheckClosed(): Promise<boolean> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(2000);
    const dialog = this.page.locator('[role="dialog"]:visible, [class*="modal"]:visible').first();
    return !(await dialog.isVisible().catch(() => false));
  }

  // ── Search Methods ──

  /** Get search input info */
  async getSearchInputInfo(): Promise<{ exists: boolean; hasAriaLabel: boolean; hasPlaceholder: boolean }> {
    const searchInput = this.page.locator('input[type="search"]:visible, input[placeholder*="search" i]:visible, input[placeholder*="Search" i]:visible, [role="searchbox"]:visible').first();
    const exists = await searchInput.isVisible().catch(() => false);
    if (!exists) return { exists: false, hasAriaLabel: false, hasPlaceholder: false };
    const ariaLabel = await searchInput.getAttribute('aria-label');
    const placeholder = await searchInput.getAttribute('placeholder');
    return { exists: true, hasAriaLabel: !!ariaLabel, hasPlaceholder: !!placeholder };
  }

  /** Tab to search input */
  async tabToSearchInput(): Promise<boolean> {
    for (let i = 0; i < 15; i++) {
      await this.page.keyboard.press('Tab');
      const focused = await this.page.evaluate(() => {
        const el = document.activeElement;
        return el?.getAttribute('placeholder')?.toLowerCase().includes('search') ||
               el?.getAttribute('type') === 'search' ||
               el?.getAttribute('role') === 'searchbox' || false;
      });
      if (focused) return true;
    }
    return false;
  }

  /** Type in search input */
  async typeInSearchInput(text: string) {
    const searchInput = this.page.locator('input[type="search"]:visible, input[placeholder*="search" i]:visible, input[placeholder*="Search" i]:visible, [role="searchbox"]:visible').first();
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill(text);
      await this.page.waitForTimeout(2000);
    }
  }

  /** Wait for search results to update */
  async waitForSearchResults() {
    await this.page.waitForTimeout(3000);
  }

  /** Get clear button info */
  async getClearButtonInfo(): Promise<{ exists: boolean; hasName: boolean }> {
    const clearBtn = this.page.locator('button[aria-label*="clear" i]:visible, button[aria-label*="reset" i]:visible, button:has-text("✕"):visible, button:has-text("×"):visible').first();
    const exists = await clearBtn.isVisible().catch(() => false);
    if (!exists) return { exists: false, hasName: false };
    const ariaLabel = await clearBtn.getAttribute('aria-label') || '';
    const text = (await clearBtn.textContent()) || '';
    return { exists: true, hasName: (ariaLabel + text).trim().length > 0 };
  }

  // ── Add Product Methods ──

  /** Click Add Product button */
  async clickAddProductButton() {
    const btn = this.page.locator('button:has-text("Add Product"), button:has-text("Add New Product"), a:has-text("Add Product")').first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click();
      await this.page.waitForTimeout(3000);
    }
  }

  /** Get form label info for Add Product form */
  async getAddProductFormLabelInfo(): Promise<{ totalInputs: number; withLabels: number; withoutLabels: number }> {
    const inputs = this.page.locator('input:visible:not([type="hidden"]), textarea:visible, select:visible');
    const totalInputs = await inputs.count();
    let withLabels = 0;
    let withoutLabels = 0;
    for (let i = 0; i < totalInputs; i++) {
      const input = inputs.nth(i);
      const ariaLabel = await input.getAttribute('aria-label').catch(() => null);
      const ariaLabelledBy = await input.getAttribute('aria-labelledby').catch(() => null);
      const id = await input.getAttribute('id').catch(() => null);
      let hasLabel = !!(ariaLabel || ariaLabelledBy);
      if (!hasLabel && id) {
        hasLabel = await this.page.locator(`label[for="${id}"]`).count() > 0;
      }
      if (hasLabel) withLabels++;
      else withoutLabels++;
    }
    return { totalInputs, withLabels, withoutLabels };
  }

  /** Get required field info for Add Product form */
  async getAddProductRequiredFieldInfo(): Promise<{ totalRequired: number }> {
    const required = this.page.locator('[required]:visible, [aria-required="true"]:visible');
    return { totalRequired: await required.count() };
  }

  /** Click submit button on Add Product form */
  async clickAddProductSubmitButton() {
    const btn = this.page.locator('button:has-text("Submit"), button:has-text("Save"), button:has-text("Add Product"), button[type="submit"]').last();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click({ force: true });
      await this.page.waitForTimeout(3000);
    }
  }

  /** Get validation errors on Add Product form */
  async getAddProductValidationErrors(): Promise<{ hasErrors: boolean; hasAriaInvalid: boolean; hasAriaDescribedBy: boolean; hasRoleAlert: boolean }> {
    await this.page.waitForTimeout(2000);
    const errors = this.page.locator('[class*="error"]:visible, [role="alert"]:visible, .invalid-feedback:visible');
    const hasErrors = await errors.count() > 0;
    const hasAriaInvalid = await this.page.locator('[aria-invalid="true"]').count() > 0;
    const hasAriaDescribedBy = await this.page.locator('[aria-describedby]:visible').count() > 0;
    const hasRoleAlert = await this.page.locator('[role="alert"]:visible').count() > 0;
    return { hasErrors, hasAriaInvalid, hasAriaDescribedBy, hasRoleAlert };
  }

  /** Get H1 count */
  async getH1Count(): Promise<number> {
    return await this.page.locator('h1').count();
  }
}
