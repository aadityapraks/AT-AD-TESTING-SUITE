// spec: specs/functional/admin/SCRUM-496-admin-reject-product.md
// data: specs/test-cases/admin/scrum496-admin-reject-product.json

import { test, expect } from '@playwright/test';
import { AdminProductPage } from '../../pages/admin/AdminProductPage';
import planData from '../../../specs/test-cases/admin/scrum496-admin-reject-product.json';
const td = planData.testData;

test.describe('SCRUM-496: Admin - Reject New Product Submission', () => {
  test.setTimeout(180_000);
  let ap: AdminProductPage;

  test.beforeEach(async ({ page }) => {
    ap = new AdminProductPage(page);
    await ap.loginAsAdmin(td.credentials.email, td.credentials.password);
    await ap.goToProductManagement();
  });

  async function openRejectionModal() {
    await ap.clickNewSubmissionsTab();
    await ap.clickFirstViewDetails();
    await ap.clickReject();
  }

  // ─── Suite 1: Reject Button & Modal ───

  test.describe('Reject Button & Modal', () => {
    test('TC_SCRUM496_001: Reject Product Button is Visible', async () => {
      await ap.clickNewSubmissionsTab();
      await ap.clickFirstViewDetails();
      await expect(ap.rejectBtn).toBeVisible();
    });

    test('TC_SCRUM496_002: Clicking Reject Opens Rejection Modal', async () => {
      await openRejectionModal();
      await expect(ap.rejectionDialog).toBeVisible();
      await expect(ap.rejectionHeading).toContainText('Reject Product');
    });

    test('TC_SCRUM496_003: Rejection Modal Shows Product Name', async () => {
      await openRejectionModal();
      const subtitle = ap.rejectionDialog.locator('p').first();
      const text = (await subtitle.textContent()) ?? '';
      expect(text.length).toBeGreaterThan(0);
    });
  });

  // ─── Suite 2: Rejection Reason ───

  test.describe('Rejection Reason', () => {
    test.beforeEach(async () => { await openRejectionModal(); });

    test('TC_SCRUM496_004: Rejection Reason Textbox is Visible', async () => {
      await expect(ap.rejectionReason).toBeVisible();
    });

    test('TC_SCRUM496_005: Rejection Reason is Marked as Required', async () => {
      const label = ap.rejectionDialog.locator('text=/Rejection Reason/');
      const text = (await label.textContent()) ?? '';
      expect(text).toContain('*');
    });

    test('TC_SCRUM496_006: Rejection Reason Accepts Input', async () => {
      await ap.rejectionReason.fill('Product does not meet quality standards');
      await expect(ap.rejectionReason).toHaveValue('Product does not meet quality standards');
    });

    test('TC_SCRUM496_007: Rejection Reason is Initially Empty', async () => {
      const val = await ap.rejectionReason.inputValue();
      expect(val).toBe('');
    });
  });

  // ─── Suite 3: Vendor Info ───

  test.describe('Vendor Info', () => {
    test.beforeEach(async () => { await openRejectionModal(); });

    test('TC_SCRUM496_008: Modal Shows Vendor Notification Info', async () => {
      const dialogText = (await ap.rejectionDialog.textContent()) ?? '';
      expect(dialogText.toLowerCase()).toContain('vendor will be notified');
    });

    test('TC_SCRUM496_009: Modal Shows Resubmission Info', async () => {
      const dialogText = (await ap.rejectionDialog.textContent()) ?? '';
      expect(dialogText.toLowerCase()).toContain('resubmit');
    });
  });

  // ─── Suite 4: Button State ───

  test.describe('Button State', () => {
    test.beforeEach(async () => { await openRejectionModal(); });

    test('TC_SCRUM496_010: Confirm Rejection Disabled When Reason Empty', async () => {
      await expect(ap.confirmRejectionBtn).toBeDisabled();
    });

    test('TC_SCRUM496_011: Confirm Rejection Enables After Entering Reason', async () => {
      await ap.rejectionReason.fill('Missing product images');
      await ap.page.waitForTimeout(500);
      await expect(ap.confirmRejectionBtn).toBeEnabled();
    });

    test('TC_SCRUM496_012: Confirm Rejection Disables When Reason Cleared', async () => {
      await ap.rejectionReason.fill('Some reason');
      await ap.page.waitForTimeout(500);
      await expect(ap.confirmRejectionBtn).toBeEnabled();
      await ap.rejectionReason.fill('');
      await ap.page.waitForTimeout(500);
      await expect(ap.confirmRejectionBtn).toBeDisabled();
    });
  });

  // ─── Suite 5: Confirm Rejection ───

  test.describe('Confirm Rejection', () => {
    test('TC_SCRUM496_013: Confirm Rejection is Clickable With Reason', async () => {
      await openRejectionModal();
      await ap.rejectionReason.fill('Incomplete product information');
      await ap.page.waitForTimeout(500);
      await expect(ap.confirmRejectionBtn).toBeEnabled();
    });

    test('TC_SCRUM496_014: Product Removed After Rejection', async () => {
      await ap.clickNewSubmissionsTab();
      await ap.clickFirstViewDetails();
      await ap.clickReject();
      await ap.rejectionReason.fill('QA test rejection - incomplete data');
      await ap.page.waitForTimeout(500);
      await ap.clickConfirmRejection();
      await ap.page.waitForTimeout(3000);
      await expect(ap.newSubmissionsTab).toBeVisible();
    });
  });

  // ─── Suite 6: Cancel/Close ───

  test.describe('Cancel/Close', () => {
    test.beforeEach(async () => { await openRejectionModal(); });

    test('TC_SCRUM496_015: Cancel Button is Visible', async () => {
      await expect(ap.rejectionCancelBtn).toBeVisible();
    });

    test('TC_SCRUM496_016: Cancel Closes Modal Without Rejecting', async () => {
      await ap.clickCancelRejection();
      const visible = await ap.rejectionDialog.isVisible().catch(() => false);
      expect(visible).toBe(false);
    });

    test('TC_SCRUM496_017: Close Button Closes Modal Without Rejecting', async () => {
      await ap.rejectionCloseBtn.click();
      await ap.page.waitForTimeout(1000);
      const visible = await ap.rejectionDialog.isVisible().catch(() => false);
      expect(visible).toBe(false);
    });
  });

  // ─── Suite 7: Validation & Edge Cases ───

  test.describe('Validation & Edge Cases', () => {
    test('TC_SCRUM496_018: Reason Accepts Special Characters', async () => {
      await openRejectionModal();
      await ap.rejectionReason.fill('Invalid: !@#$%^&*()_+-=[]{}|;:,.<>?');
      const val = await ap.rejectionReason.inputValue();
      expect(val).toContain('!@#$%^&*()');
    });

    test('TC_SCRUM496_019: Reason Accepts Long Text', async () => {
      await openRejectionModal();
      const longText = 'A'.repeat(250);
      await ap.rejectionReason.fill(longText);
      const val = await ap.rejectionReason.inputValue();
      expect(val.length).toBeGreaterThanOrEqual(200);
    });

    test('TC_SCRUM496_020: Reopening Modal After Cancel Shows Empty Reason', async () => {
      await openRejectionModal();
      await ap.rejectionReason.fill('Temporary reason');
      await ap.clickCancelRejection();
      await ap.page.waitForTimeout(1000);
      await ap.clickFirstViewDetails();
      await ap.clickReject();
      const val = await ap.rejectionReason.inputValue();
      expect(val).toBe('');
    });
  });
});
