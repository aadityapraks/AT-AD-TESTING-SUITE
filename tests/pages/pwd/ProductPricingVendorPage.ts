import { Page, Locator } from '@playwright/test';
import { ProductOverviewPage } from './ProductOverviewPage';

export class ProductPricingVendorPage extends ProductOverviewPage {
  // The vendor popup is rendered as an Elementor off-canvas that Playwright sees as role=dialog
  // Use both locator strategies
  readonly vendorDialog: Locator;
  readonly vendorOffCanvas: Locator;
  readonly vendorDialogTitle: Locator;
  readonly vendorDialogDesc: Locator;
  readonly vendorCloseLink: Locator;

  constructor(page: Page) {
    super(page);
    this.vendorDialog = page.getByRole('dialog');
    // The off-canvas container that wraps the dialog content
    this.vendorOffCanvas = page.locator('.e-off-canvas').filter({ hasText: 'Vendor' }).first();
    this.vendorDialogTitle = page.getByText('Vendor Details').first();
    this.vendorDialogDesc = page.getByText(/Contact the vendor/i).first();
    this.vendorCloseLink = page.locator('a[href*="off_canvas"][href*="close"]').first();
  }

  // ── Open / Close ──

  async isVendorPopupOpen(): Promise<boolean> {
    return this.vendorDialog.isVisible({ timeout: 3000 }).catch(() => false);
  }

  async openVendorPopup() {
    await this.clickContactVendor();
    await this.page.waitForTimeout(1000);
  }

  async closeVendorPopupViaEsc() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(500);
  }

  async closeVendorPopupViaLink() {
    await this.vendorCloseLink.click();
    await this.page.waitForTimeout(500);
  }

  // ── Field value readers (use evaluate to traverse actual DOM) ──

  private async getFieldValue(label: string): Promise<string> {
    // Playwright pierces shadow DOM via locators — use getByRole('dialog') chain
    // The label and value are adjacent text nodes with tabs/whitespace
    // Find all text matches inside dialog, then pick the one right after the label
    const allTexts = await this.vendorDialog.getByText(label, { exact: false }).allTextContents();
    // The value is typically the text content right after the label match
    // For "Vendor Name" label, the next getByText match containing the value
    // Use a different approach: get the inner text of the dialog and parse it
    const fullText = (await this.vendorDialog.innerText()).replace(/\t+/g, '').replace(/\n{2,}/g, '\n');
    const lines = fullText.split('\n').map(l => l.trim()).filter(Boolean);
    const idx = lines.findIndex(l => l === label);
    if (idx >= 0 && idx + 1 < lines.length) {
      return lines[idx + 1];
    }
    return '';
  }

  async getVendorDialogTitleText(): Promise<string> {
    return ((await this.vendorDialogTitle.textContent()) ?? '').trim();
  }

  async getVendorNameText(): Promise<string> {
    return this.getFieldValue('Vendor Name');
  }

  async getVendorAddressText(): Promise<string> {
    return this.getFieldValue('Address');
  }

  async getVendorPhoneText(): Promise<string> {
    return this.getFieldValue('Contact Number');
  }

  async getVendorEmailText(): Promise<string> {
    return this.getFieldValue('Email');
  }

  async getBuyOnlineText(): Promise<string> {
    return this.getFieldValue('Buy Online');
  }

  // ── Dialog ARIA helpers ──

  async getDialogRole(): Promise<string> {
    return this.vendorDialog.evaluate(el => el.getAttribute('role') ?? el.tagName.toLowerCase());
  }

  async getDialogAriaModal(): Promise<string> {
    return (await this.vendorDialog.getAttribute('aria-modal')) ?? '';
  }

  async getDialogAriaLabel(): Promise<string> {
    const label = await this.vendorDialog.getAttribute('aria-label');
    if (label) return label;
    return (await this.vendorDialog.getAttribute('aria-labelledby')) ?? '';
  }

  async getDialogAriaDescribedBy(): Promise<string> {
    return (await this.vendorDialog.getAttribute('aria-describedby')) ?? '';
  }

  // ── Focus helpers ──

  private dialogSelector = '[role="dialog"], dialog';

  async isFocusInsideDialog(): Promise<boolean> {
    return this.page.evaluate((sel) => {
      const dialog = document.querySelector(sel);
      return dialog ? dialog.contains(document.activeElement) : false;
    }, this.dialogSelector);
  }

  async getFocusableCountInDialog(): Promise<number> {
    return this.page.evaluate((sel) => {
      const dialog = document.querySelector(sel);
      if (!dialog) return 0;
      return dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ).length;
    }, this.dialogSelector);
  }

  // ── Link type checks ──

  async isPhoneTelLink(): Promise<boolean> {
    return this.page.evaluate((sel) => {
      const dialog = document.querySelector(sel);
      return dialog ? dialog.querySelector('a[href^="tel:"]') !== null : false;
    }, this.dialogSelector);
  }

  async isEmailMailtoLink(): Promise<boolean> {
    return this.page.evaluate((sel) => {
      const dialog = document.querySelector(sel);
      return dialog ? dialog.querySelector('a[href^="mailto:"]') !== null : false;
    }, this.dialogSelector);
  }
}
