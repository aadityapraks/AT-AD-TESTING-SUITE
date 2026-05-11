import { Page, Locator } from '@playwright/test';

export class AdminProductPage {
  readonly page: Page;

  // Nav
  readonly productMgmtLink: Locator;

  // Tabs
  readonly allProductsTab: Locator;
  readonly newSubmissionsTab: Locator;
  readonly pendingEditsTab: Locator;

  // Search & filters
  readonly searchBox: Locator;

  // Product cards
  readonly viewDetailsButtons: Locator;
  readonly productCards: Locator;

  // Product detail dialog
  readonly detailDialog: Locator;
  readonly detailHeading: Locator;
  readonly detailCloseBtn: Locator;
  readonly approveBtn: Locator;
  readonly rejectBtn: Locator;

  // Approval confirmation modal
  readonly approvalDialog: Locator;
  readonly approvalHeading: Locator;
  readonly approvalCloseBtn: Locator;
  readonly approvalNotes: Locator;
  readonly confirmApprovalBtn: Locator;
  readonly cancelBtn: Locator;

  // Rejection modal
  readonly rejectionDialog: Locator;
  readonly rejectionHeading: Locator;
  readonly rejectionCloseBtn: Locator;
  readonly rejectionReason: Locator;
  readonly confirmRejectionBtn: Locator;
  readonly rejectionCancelBtn: Locator;

  // Compare Changes dialog (Pending Edits)
  readonly compareDialog: Locator;
  readonly compareHeading: Locator;
  readonly compareCloseBtn: Locator;
  readonly compareCloseXBtn: Locator;
  readonly approveChangesBtn: Locator;
  readonly compareChangesButtons: Locator;

  // Reject Edit dialog (Pending Edits)
  readonly rejectEditBtn: Locator;
  readonly approveEditBtn: Locator;
  readonly rejectEditDialog: Locator;
  readonly rejectEditHeading: Locator;
  readonly rejectEditCloseBtn: Locator;
  readonly rejectEditReason: Locator;
  readonly confirmRejectEditBtn: Locator;
  readonly rejectEditCancelBtn: Locator;

  // Pagination
  readonly paginationInfo: Locator;
  readonly nextPageBtn: Locator;
  readonly prevPageBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productMgmtLink = page.getByRole('link', { name: 'Product Management' });

    this.allProductsTab = page.getByRole('tab', { name: /All Products/i });
    this.newSubmissionsTab = page.getByRole('tab', { name: /New Submissions/i });
    this.pendingEditsTab = page.getByRole('tab', { name: /Pending Edits/i });

    this.searchBox = page.getByRole('textbox', { name: 'Search products' });

    this.viewDetailsButtons = page.getByRole('button', { name: 'View product details' });
    this.productCards = page.locator('[class*="product-card"], [class*="submission"]');

    this.detailDialog = page.getByRole('dialog', { name: 'Product Details' });
    this.detailHeading = this.detailDialog.getByRole('heading', { level: 2 });
    this.detailCloseBtn = this.detailDialog.getByRole('button', { name: 'Close dialog' });
    this.approveBtn = page.getByRole('button', { name: 'Approve product' });
    this.rejectBtn = page.getByRole('button', { name: 'Reject product' });

    this.approvalDialog = page.getByRole('dialog', { name: 'Approve Product' });
    this.approvalHeading = this.approvalDialog.getByRole('heading');
    this.approvalCloseBtn = this.approvalDialog.getByRole('button', { name: 'Close dialog' });
    this.approvalNotes = page.getByRole('textbox', { name: /Approval Notes/i });
    this.confirmApprovalBtn = page.getByRole('button', { name: 'Confirm Approval' });
    this.cancelBtn = this.approvalDialog.getByRole('button', { name: 'Cancel' });

    this.rejectionDialog = page.getByRole('dialog', { name: 'Reject Product' });
    this.rejectionHeading = this.rejectionDialog.getByRole('heading');
    this.rejectionCloseBtn = this.rejectionDialog.getByRole('button', { name: 'Close dialog' });
    this.rejectionReason = page.getByRole('textbox', { name: /Rejection Reason/i });
    this.confirmRejectionBtn = page.getByRole('button', { name: 'Confirm Rejection' });
    this.rejectionCancelBtn = this.rejectionDialog.getByRole('button', { name: 'Cancel' });

    this.compareDialog = page.getByRole('dialog', { name: 'Compare Product Changes' });
    this.compareHeading = this.compareDialog.getByRole('heading');
    this.compareCloseBtn = this.compareDialog.getByRole('button', { name: 'Close' }).first();
    this.compareCloseXBtn = this.compareDialog.getByRole('button', { name: 'Close dialog' });
    this.approveChangesBtn = page.getByRole('button', { name: 'Approve Changes' });
    this.compareChangesButtons = page.getByRole('button', { name: 'Compare changes' });

    this.rejectEditBtn = page.getByRole('button', { name: 'Reject edit' });
    this.approveEditBtn = page.getByRole('button', { name: 'Approve edit' });
    this.rejectEditDialog = page.getByRole('dialog', { name: 'Reject Product Edit' });
    this.rejectEditHeading = this.rejectEditDialog.getByRole('heading');
    this.rejectEditCloseBtn = this.rejectEditDialog.getByRole('button', { name: 'Close dialog' });
    this.rejectEditReason = this.rejectEditDialog.getByRole('textbox', { name: /Rejection Reason/i });
    this.confirmRejectEditBtn = this.rejectEditDialog.getByRole('button', { name: 'Confirm Rejection' });
    this.rejectEditCancelBtn = this.rejectEditDialog.getByRole('button', { name: 'Cancel' });

    this.paginationInfo = page.locator('text=/Showing \\d+ to \\d+ of \\d+/');
    this.nextPageBtn = page.getByRole('button', { name: 'Next page' });
    this.prevPageBtn = page.getByRole('button', { name: 'Previous page' });
  }

  async loginAsAdmin(email: string, password: string) {
    await this.page.goto('https://hub-ui-admin-qa.swarajability.org/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(3000);

    // Click SSO sign in
    const ssoBtn = this.page.locator('button.signin-btn, button:has-text("Sign in with Swarajability")');
    if (await ssoBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await ssoBtn.click();
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
      await this.page.waitForTimeout(5000);

      // Email step — authentik uses shadow DOM, use input[name] selector
      const emailBox = this.page.locator('input[name="uidField"], input[type="text"]').first();
      await emailBox.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
      if (await emailBox.isVisible().catch(() => false)) {
        await emailBox.fill(email);
        await emailBox.press('Enter');
        await this.page.waitForTimeout(5000);
      }

      // Password step
      const pwBox = this.page.locator('input[type="password"]').first();
      await pwBox.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
      if (await pwBox.isVisible().catch(() => false)) {
        await pwBox.fill(password);
        await pwBox.press('Enter');
        await this.page.waitForTimeout(5000);
      }

      // Consent step — may auto-redirect or show Continue button
      for (let i = 0; i < 3; i++) {
        const consentBtn = this.page.locator('button:has-text("Continue")');
        if (await consentBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
          await consentBtn.click().catch(() => {});
          await this.page.waitForTimeout(5000);
        }
        if (this.page.url().includes('/admin/')) break;
        await this.page.waitForTimeout(3000);
      }
    }

    // Wait for admin dashboard
    await this.page.waitForURL(/admin/, { timeout: 60000 }).catch(() => {});
    await this.page.waitForTimeout(3000);
  }

  async goToProductManagement() {
    await this.productMgmtLink.click();
    await this.page.waitForTimeout(3000);
  }

  async clickNewSubmissionsTab() {
    await this.newSubmissionsTab.click();
    await this.page.waitForTimeout(2000);
  }

  async clickFirstViewDetails() {
    await this.viewDetailsButtons.first().click();
    await this.page.waitForTimeout(1500);
  }

  async clickApprove() {
    await this.approveBtn.click();
    await this.page.waitForTimeout(1500);
  }

  async clickConfirmApproval() {
    await this.confirmApprovalBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async clickCancelApproval() {
    await this.cancelBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async closeDetailDialog() {
    await this.detailCloseBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickPendingEditsTab() {
    await this.pendingEditsTab.click();
    await this.page.waitForTimeout(2000);
  }

  async clickFirstCompareChanges() {
    await this.compareChangesButtons.first().click();
    await this.page.waitForTimeout(1500);
  }

  async clickApproveChanges() {
    await this.approveChangesBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async clickReject() {
    await this.rejectBtn.click();
    await this.page.waitForTimeout(1500);
  }

  async clickConfirmRejection() {
    await this.confirmRejectionBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async clickCancelRejection() {
    await this.rejectionCancelBtn.click();
    await this.page.waitForTimeout(1000);
  }

  getTabCount(tab: Locator): Locator {
    return tab.locator('span, [class*="badge"], [class*="count"]').first();
  }
}
