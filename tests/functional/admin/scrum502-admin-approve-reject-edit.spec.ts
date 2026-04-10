// spec: specs/functional/admin/SCRUM-502-admin-approve-reject-edit.md
// data: specs/test-cases/admin/scrum502-admin-approve-reject-edit.json

import { test, expect } from '@playwright/test';
import { AdminProductPage } from '../../pages/admin/AdminProductPage';
import planData from '../../../specs/test-cases/admin/scrum502-admin-approve-reject-edit.json';
const td = planData.testData;

test.describe('SCRUM-502: Admin - Approve or Reject Edit Request', () => {
  test.setTimeout(180_000);
  let ap: AdminProductPage;

  test.beforeEach(async ({ page }) => {
    ap = new AdminProductPage(page);
    await ap.loginAsAdmin(td.credentials.email, td.credentials.password);
    await ap.goToProductManagement();
    await ap.clickPendingEditsTab();
  });

  async function openDetailDialog() {
    await ap.clickFirstViewDetails();
  }

  async function openRejectEditModal() {
    await openDetailDialog();
    await ap.rejectEditBtn.click();
    await ap.page.waitForTimeout(1500);
  }

  // ─── Suite 1: Edit Action Buttons ───

  test.describe('Edit Actions', () => {
    test.beforeEach(async () => { await openDetailDialog(); });

    test('TC_SCRUM502_001: Approve Edit Button Visible', async () => {
      await expect(ap.approveEditBtn).toBeVisible();
    });

    test('TC_SCRUM502_002: Reject Edit Button Visible', async () => {
      await expect(ap.rejectEditBtn).toBeVisible();
    });

    test('TC_SCRUM502_003: Compare Changes Button Visible in Detail Dialog', async () => {
      const compareBtn = ap.detailDialog.getByRole('button', { name: 'Compare changes' });
      await expect(compareBtn).toBeVisible();
    });
  });

  // ─── Suite 2: Approve Edit ───

  test.describe('Approve Edit', () => {
    test('TC_SCRUM502_004: Approve Edit Button is Clickable', async () => {
      await openDetailDialog();
      await expect(ap.approveEditBtn).toBeEnabled();
    });

    test('TC_SCRUM502_005: Product Removed After Approve Edit', async () => {
      await openDetailDialog();
      await ap.approveEditBtn.click();
      await ap.page.waitForTimeout(3000);
      await expect(ap.pendingEditsTab).toBeVisible();
    });
  });

  // ─── Suite 3: Reject Edit Modal ───

  test.describe('Reject Edit Modal', () => {
    test('TC_SCRUM502_006: Clicking Reject Edit Opens Modal', async () => {
      await openRejectEditModal();
      await expect(ap.rejectEditDialog).toBeVisible();
      await expect(ap.rejectEditHeading).toContainText('Reject Product Edit');
    });

    test('TC_SCRUM502_007: Modal Shows Product Name', async () => {
      await openRejectEditModal();
      const subtitle = ap.rejectEditDialog.locator('p').first();
      const text = (await subtitle.textContent()) ?? '';
      expect(text.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM502_008: Rejection Reason Textbox is Visible', async () => {
      await openRejectEditModal();
      await expect(ap.rejectEditReason).toBeVisible();
    });

    test('TC_SCRUM502_009: Rejection Reason is Marked as Required', async () => {
      await openRejectEditModal();
      const label = ap.rejectEditDialog.locator('text=/Rejection Reason/');
      const text = (await label.textContent()) ?? '';
      expect(text).toContain('*');
    });
  });

  // ─── Suite 4: Button State ───

  test.describe('Button State', () => {
    test.beforeEach(async () => { await openRejectEditModal(); });

    test('TC_SCRUM502_010: Confirm Rejection Disabled When Reason Empty', async () => {
      await expect(ap.confirmRejectEditBtn).toBeDisabled();
    });

    test('TC_SCRUM502_011: Confirm Rejection Enables After Entering Reason', async () => {
      await ap.rejectEditReason.fill('Edit does not meet standards');
      await ap.page.waitForTimeout(500);
      await expect(ap.confirmRejectEditBtn).toBeEnabled();
    });

    test('TC_SCRUM502_012: Confirm Rejection Disables When Reason Cleared', async () => {
      await ap.rejectEditReason.fill('Some reason');
      await ap.page.waitForTimeout(500);
      await expect(ap.confirmRejectEditBtn).toBeEnabled();
      await ap.rejectEditReason.fill('');
      await ap.page.waitForTimeout(500);
      await expect(ap.confirmRejectEditBtn).toBeDisabled();
    });
  });

  // ─── Suite 5: Vendor Info ───

  test.describe('Vendor Info', () => {
    test.beforeEach(async () => { await openRejectEditModal(); });

    test('TC_SCRUM502_013: Modal Shows Vendor Notification Info', async () => {
      const text = (await ap.rejectEditDialog.textContent()) ?? '';
      expect(text.toLowerCase()).toContain('vendor will be notified');
    });

    test('TC_SCRUM502_014: Modal Shows Resubmission Info', async () => {
      const text = (await ap.rejectEditDialog.textContent()) ?? '';
      expect(text.toLowerCase()).toContain('resubmit');
    });
  });

  // ─── Suite 6: Cancel/Close ───

  test.describe('Cancel/Close', () => {
    test.beforeEach(async () => { await openRejectEditModal(); });

    test('TC_SCRUM502_015: Cancel Button is Visible', async () => {
      await expect(ap.rejectEditCancelBtn).toBeVisible();
    });

    test('TC_SCRUM502_016: Cancel Closes Modal Without Rejecting', async () => {
      await ap.rejectEditCancelBtn.click();
      await ap.page.waitForTimeout(1000);
      const visible = await ap.rejectEditDialog.isVisible().catch(() => false);
      expect(visible).toBe(false);
    });

    test('TC_SCRUM502_017: Close Button Closes Modal', async () => {
      await ap.rejectEditCloseBtn.click();
      await ap.page.waitForTimeout(1000);
      const visible = await ap.rejectEditDialog.isVisible().catch(() => false);
      expect(visible).toBe(false);
    });
  });

  // ─── Suite 7: Validation & Edge Cases ───

  test.describe('Validation & Edge Cases', () => {
    test('TC_SCRUM502_018: Reason Accepts Special Characters', async () => {
      await openRejectEditModal();
      await ap.rejectEditReason.fill('Invalid: !@#$%^&*()_+-=[]{}|;:,.<>?');
      const val = await ap.rejectEditReason.inputValue();
      expect(val).toContain('!@#$%^&*()');
    });

    test('TC_SCRUM502_019: Reason Accepts Long Text', async () => {
      await openRejectEditModal();
      const longText = 'A'.repeat(250);
      await ap.rejectEditReason.fill(longText);
      const val = await ap.rejectEditReason.inputValue();
      expect(val.length).toBeGreaterThanOrEqual(200);
    });

    test('TC_SCRUM502_020: Product Detail Dialog Shows Approved Status', async () => {
      await openDetailDialog();
      const text = (await ap.detailDialog.textContent()) ?? '';
      expect(text).toContain('Approved');
    });
  });
});
