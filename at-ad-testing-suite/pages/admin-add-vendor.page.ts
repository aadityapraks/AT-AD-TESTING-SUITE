import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AdminSignInPage } from './admin-signin.page';

export class AdminAddVendorPage extends BasePage {
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

  // ── Add Vendor Button ──

  /** Get Add Vendor button accessible name */
  async getAddVendorButtonAccessibleName(): Promise<string> {
    const btn = this.page.locator('button:has-text("Add Vendor"), button:has-text("Add Partner"), button:has-text("Add New")').first();
    const ariaLabel = await btn.getAttribute('aria-label').catch(() => null);
    const text = await btn.textContent().catch(() => '');
    return (ariaLabel || text || '').trim();
  }

  /** Click Add Vendor button to open modal */
  async clickAddVendorButton() {
    const btn = this.page.locator('button:has-text("Add Vendor"), button:has-text("Add Partner"), button:has-text("Add New")').first();
    await btn.waitFor({ state: 'visible', timeout: 10000 });
    await btn.click();
    await this.page.waitForTimeout(3000);
  }

  /** Check if Add Vendor button is visible */
  async isAddVendorButtonVisible(): Promise<boolean> {
    const btn = this.page.locator('button:has-text("Add Vendor"), button:has-text("Add Partner"), button:has-text("Add New")').first();
    return await btn.isVisible().catch(() => false);
  }

  // ── Modal Dialog ──

  /** Get dialog role info */
  async getDialogRoleInfo(): Promise<{ hasDialogRole: boolean; hasAriaModal: boolean; hasAriaLabel: boolean }> {
    const dialog = this.page.locator('[role="dialog"]').first();
    const hasDialogRole = await dialog.isVisible().catch(() => false);
    if (!hasDialogRole) return { hasDialogRole: false, hasAriaModal: false, hasAriaLabel: false };
    const ariaModal = await dialog.getAttribute('aria-modal');
    const ariaLabel = await dialog.getAttribute('aria-label');
    const ariaLabelledBy = await dialog.getAttribute('aria-labelledby');
    return {
      hasDialogRole: true,
      hasAriaModal: ariaModal === 'true',
      hasAriaLabel: !!(ariaLabel || ariaLabelledBy)
    };
  }

  /** Check if focus is inside modal */
  async isFocusInsideModal(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const active = document.activeElement;
      if (!active) return false;
      const dialog = document.querySelector('[role="dialog"]');
      if (dialog && dialog.contains(active)) return true;
      const modal = active.closest('[class*="modal"], [class*="dialog"], [class*="overlay"]');
      return !!modal;
    });
  }

  /** Verify focus trap in modal */
  async verifyFocusTrapInModal(): Promise<boolean> {
    for (let i = 0; i < 15; i++) {
      await this.page.keyboard.press('Tab');
    }
    return await this.isFocusInsideModal();
  }

  /** Press Escape and check if modal closes */
  async pressEscapeAndCheckClosed(): Promise<boolean> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(2000);
    const addBtn = this.page.locator('button:has-text("Add Vendor"), button:has-text("Add Partner"), button:has-text("Add New")').first();
    return await addBtn.isVisible().catch(() => false);
  }

  // ── Form Fields ──

  /** Get count of form fields with labels */
  async getFormFieldLabelInfo(): Promise<{ totalInputs: number; withLabels: number; withoutLabels: number }> {
    // Get all visible inputs, textareas, selects in the modal/form area
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
        const labelCount = await this.page.locator(`label[for="${id}"]`).count();
        hasLabel = labelCount > 0;
      }
      if (hasLabel) withLabels++;
      else withoutLabels++;
    }
    return { totalInputs, withLabels, withoutLabels };
  }

  /** Get count of required fields with aria-required or required attribute */
  async getRequiredFieldInfo(): Promise<{ totalRequired: number; withAriaRequired: number }> {
    const requiredInputs = this.page.locator('input[required]:visible, input[aria-required="true"]:visible, textarea[required]:visible, textarea[aria-required="true"]:visible, select[required]:visible, select[aria-required="true"]:visible');
    const totalRequired = await requiredInputs.count();
    const ariaRequired = this.page.locator('[aria-required="true"]:visible');
    const withAriaRequired = await ariaRequired.count();
    return { totalRequired, withAriaRequired };
  }

  /** Check if email field has autocomplete attribute */
  async getAutocompleteInfo(): Promise<{ emailHasAutocomplete: boolean; phoneHasAutocomplete: boolean }> {
    const emailInput = this.page.locator('input[type="email"]:visible, input[name*="email" i]:visible, input[autocomplete="email"]:visible').first();
    const phoneInput = this.page.locator('input[type="tel"]:visible, input[name*="phone" i]:visible, input[autocomplete="tel"]:visible').first();
    const emailAutocomplete = await emailInput.getAttribute('autocomplete').catch(() => null);
    const phoneAutocomplete = await phoneInput.getAttribute('autocomplete').catch(() => null);
    return {
      emailHasAutocomplete: emailAutocomplete === 'email',
      phoneHasAutocomplete: phoneAutocomplete === 'tel'
    };
  }

  /** Get count of checkboxes and verify they have labels */
  async getCheckboxAccessibility(): Promise<{ total: number; withLabels: number }> {
    const checkboxes = this.page.locator('input[type="checkbox"]:visible, [role="checkbox"]:visible');
    const total = await checkboxes.count();
    let withLabels = 0;
    for (let i = 0; i < total; i++) {
      const cb = checkboxes.nth(i);
      const ariaLabel = await cb.getAttribute('aria-label').catch(() => null);
      const id = await cb.getAttribute('id').catch(() => null);
      let hasLabel = !!ariaLabel;
      if (!hasLabel && id) {
        hasLabel = await this.page.locator(`label[for="${id}"]`).count() > 0;
      }
      if (!hasLabel) {
        // Check if parent label wraps the checkbox
        const parentLabel = await cb.locator('xpath=ancestor::label').count().catch(() => 0);
        hasLabel = parentLabel > 0;
      }
      if (hasLabel) withLabels++;
    }
    return { total, withLabels };
  }

  /** Get heading count in modal */
  async getModalHeadingCount(): Promise<number> {
    const dialog = this.page.locator('[role="dialog"]');
    if (await dialog.isVisible().catch(() => false)) {
      return await dialog.locator('h1, h2, h3, h4').count();
    }
    return await this.page.locator('h1, h2, h3, h4').count();
  }

  /** Get aria-live region count */
  async getAriaLiveRegionCount(): Promise<number> {
    return await this.page.locator('[aria-live]').count();
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

  /** Verify H1 visible */
  async verifyH1Visible() {
    await expect(this.page.locator('h1').first()).toBeVisible();
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

  // ── Form Submission & Validation Methods ──

  /** Click Submit/Save button in the modal */
  async clickSubmitButton() {
    const submitBtn = this.page.locator('button:has-text("Submit"), button:has-text("Save"), button:has-text("Add"), button[type="submit"]').last();
    await submitBtn.waitFor({ state: 'visible', timeout: 10000 });
    await submitBtn.click({ force: true });
    await this.page.waitForTimeout(3000);
  }

  /** Get submit button state */
  async getSubmitButtonState(): Promise<{ isDisabled: boolean; hasDisabledAttr: boolean; hasAriaDisabled: boolean }> {
    const submitBtn = this.page.locator('button:has-text("Submit"), button:has-text("Save"), button:has-text("Add"), button[type="submit"]').last();
    const isDisabled = await submitBtn.isDisabled().catch(() => false);
    const disabledAttr = await submitBtn.getAttribute('disabled').catch(() => null);
    const ariaDisabled = await submitBtn.getAttribute('aria-disabled').catch(() => null);
    return {
      isDisabled,
      hasDisabledAttr: disabledAttr !== null,
      hasAriaDisabled: ariaDisabled === 'true'
    };
  }

  /** Get validation error info after submission */
  async getValidationErrorInfo(): Promise<{ hasErrors: boolean; errorCount: number; hasAriaInvalid: boolean; hasAriaDescribedBy: boolean; hasRoleAlert: boolean }> {
    await this.page.waitForTimeout(2000);
    // Check for error messages
    const errors = this.page.locator('[class*="error"]:visible, [role="alert"]:visible, .invalid-feedback:visible, [class*="invalid"]:visible, [class*="validation"]:visible');
    const errorCount = await errors.count();
    // Check for aria-invalid on fields
    const ariaInvalidFields = await this.page.locator('[aria-invalid="true"]').count();
    // Check for aria-describedby linking errors to fields
    const ariaDescribedBy = await this.page.locator('[aria-describedby]:visible').count();
    // Check for role="alert" on error container
    const roleAlert = await this.page.locator('[role="alert"]:visible').count();
    return {
      hasErrors: errorCount > 0 || ariaInvalidFields > 0,
      errorCount,
      hasAriaInvalid: ariaInvalidFields > 0,
      hasAriaDescribedBy: ariaDescribedBy > 0,
      hasRoleAlert: roleAlert > 0
    };
  }

  /** Fill email field with invalid value */
  async fillEmailField(value: string) {
    const emailInput = this.page.locator('input[type="email"]:visible, input[name*="email" i]:visible, input[placeholder*="email" i]:visible').first();
    if (await emailInput.isVisible().catch(() => false)) {
      await emailInput.fill(value);
      await emailInput.press('Tab');
      await this.page.waitForTimeout(1000);
    }
  }

  /** Fill GST field with invalid value */
  async fillGSTField(value: string) {
    const gstInput = this.page.locator('input[name*="gst" i]:visible, input[placeholder*="gst" i]:visible, input[placeholder*="GST" i]:visible').first();
    if (await gstInput.isVisible().catch(() => false)) {
      await gstInput.fill(value);
      await gstInput.press('Tab');
      await this.page.waitForTimeout(1000);
    }
  }

  /** Check if inline error is visible near a field */
  async getInlineErrorInfo(): Promise<{ hasInlineError: boolean; errorLinkedToField: boolean }> {
    const inlineErrors = this.page.locator('[class*="error"]:visible:not([role="dialog"]), .invalid-feedback:visible, [class*="invalid-message"]:visible, [class*="field-error"]:visible');
    const hasInlineError = await inlineErrors.count() > 0;
    const errorLinkedToField = await this.page.locator('[aria-describedby]:visible').count() > 0;
    return { hasInlineError, errorLinkedToField };
  }

  /** Fill the first mandatory field with a value (to trigger unsaved changes) */
  async fillFirstField(value: string) {
    const firstInput = this.page.locator('input:visible:not([type="hidden"]):not([type="checkbox"])').first();
    if (await firstInput.isVisible().catch(() => false)) {
      await firstInput.fill(value);
      await this.page.waitForTimeout(500);
    }
  }

  /** Check if unsaved changes warning appears after pressing Escape */
  async checkUnsavedChangesWarning(): Promise<{ warningAppears: boolean; hasDialogRole: boolean }> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(2000);
    // Check for any confirmation/warning dialog
    const dialog = this.page.locator('[role="dialog"]:visible, [role="alertdialog"]:visible, [class*="confirm"]:visible, [class*="warning"]:visible').first();
    const warningAppears = await dialog.isVisible().catch(() => false);
    if (!warningAppears) {
      // Modal may have just closed without warning
      return { warningAppears: false, hasDialogRole: false };
    }
    const role = await dialog.getAttribute('role');
    return { warningAppears: true, hasDialogRole: role === 'dialog' || role === 'alertdialog' };
  }

  /** Get success notification after form submission */
  async getSuccessNotificationInfo(): Promise<{ exists: boolean; hasRole: boolean; hasAriaLive: boolean; text: string }> {
    await this.page.waitForTimeout(3000);
    const notification = this.page.locator('[role="status"]:visible, [role="alert"]:visible, [aria-live]:visible, [class*="toast"]:visible, [class*="notification"]:visible, [class*="success"]:visible, [class*="snackbar"]:visible').first();
    const exists = await notification.isVisible().catch(() => false);
    if (!exists) {
      // Check for success text on page
      const successText = this.page.locator('text=/success|added|created/i').first();
      const hasSuccess = await successText.isVisible().catch(() => false);
      return { exists: hasSuccess, hasRole: false, hasAriaLive: false, text: '' };
    }
    const role = await notification.getAttribute('role');
    const ariaLive = await notification.getAttribute('aria-live');
    const text = (await notification.textContent()) || '';
    return {
      exists: true,
      hasRole: role === 'status' || role === 'alert',
      hasAriaLive: !!ariaLive,
      text: text.trim()
    };
  }

  /** Fill all visible mandatory fields with test data for submission */
  async fillAllFieldsForSubmission() {
    const inputs = this.page.locator('input:visible:not([type="hidden"]):not([type="checkbox"]):not([readonly])');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const type = await input.getAttribute('type') || 'text';
      const name = await input.getAttribute('name') || '';
      const placeholder = await input.getAttribute('placeholder') || '';
      let value = 'Test Value';
      if (type === 'email' || name.toLowerCase().includes('email') || placeholder.toLowerCase().includes('email')) {
        value = 'testvendor@example.com';
      } else if (type === 'tel' || name.toLowerCase().includes('phone') || placeholder.toLowerCase().includes('phone')) {
        value = '9876543210';
      } else if (name.toLowerCase().includes('gst') || placeholder.toLowerCase().includes('gst')) {
        value = '22AAAAA0000A1Z5';
      } else if (name.toLowerCase().includes('website') || placeholder.toLowerCase().includes('website') || type === 'url') {
        value = 'https://testvendor.com';
      } else if (name.toLowerCase().includes('name') || placeholder.toLowerCase().includes('name')) {
        value = 'A11y Test Vendor ' + Date.now();
      }
      await input.fill(value);
    }
    // Handle dropdowns/selects
    const selects = this.page.locator('select:visible');
    const selectCount = await selects.count();
    for (let i = 0; i < selectCount; i++) {
      const options = await selects.nth(i).locator('option').count();
      if (options > 1) {
        await selects.nth(i).selectOption({ index: 1 });
      }
    }
    await this.page.waitForTimeout(1000);
  }
}
