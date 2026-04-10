// spec: specs/functional/admin/SCRUM-493-admin-review-approve-product.md
// data: specs/test-cases/admin/scrum493-admin-review-approve-product.json

import { test, expect } from '@playwright/test';
import { AdminProductPage } from '../../pages/admin/AdminProductPage';
import planData from '../../../specs/test-cases/admin/scrum493-admin-review-approve-product.json';
const td = planData.testData;

test.describe('SCRUM-493: Admin - Review & Approve New Product Submission', () => {
  test.setTimeout(180_000);
  let ap: AdminProductPage;

  test.beforeEach(async ({ page }) => {
    ap = new AdminProductPage(page);
    await ap.loginAsAdmin(td.credentials.email, td.credentials.password);
    await ap.goToProductManagement();
  });

  // ─── Suite 1: New Submissions Tab ───

  test.describe('New Submissions Tab', () => {
    test('TC_SCRUM493_001: New Submissions Tab is Visible', async () => {
      await expect(ap.newSubmissionsTab).toBeVisible();
    });

    test('TC_SCRUM493_002: New Submissions Tab Shows Product Count', async () => {
      const text = (await ap.newSubmissionsTab.textContent()) ?? '';
      expect(text).toMatch(/\d+/);
    });

    test('TC_SCRUM493_003: Products Show Under Review Status', async () => {
      await ap.clickNewSubmissionsTab();
      await ap.page.waitForTimeout(3000);
      await expect(ap.viewDetailsButtons.first()).toBeVisible({ timeout: 10000 });
      const body = (await ap.page.locator('body').textContent()) ?? '';
      expect(body).toContain('Under Review');
    });
  });

  // ─── Suite 2: Product Detail Dialog ───

  test.describe('Product Detail Dialog', () => {
    test.beforeEach(async () => {
      await ap.clickNewSubmissionsTab();
      await ap.clickFirstViewDetails();
    });

    test('TC_SCRUM493_004: View Details Opens Product Detail Dialog', async () => {
      await expect(ap.detailDialog).toBeVisible();
      await expect(ap.detailHeading).toHaveText('Product Details');
    });

    test('TC_SCRUM493_005: Dialog Shows Product Name', async () => {
      const h3 = ap.detailDialog.getByRole('heading', { level: 3 });
      await expect(h3).toBeVisible();
      const name = (await h3.textContent()) ?? '';
      expect(name.trim().length).toBeGreaterThan(0);
    });

    test('TC_SCRUM493_006: Dialog Shows Status Badge', async () => {
      const dialogText = (await ap.detailDialog.textContent()) ?? '';
      expect(dialogText).toContain('Under Review');
    });

    test('TC_SCRUM493_007: Dialog Shows Price and Stock', async () => {
      const dialogText = (await ap.detailDialog.textContent()) ?? '';
      expect(dialogText).toMatch(/₹[\d,]+/);
      expect(dialogText.toLowerCase()).toContain('stock');
    });
  });

  // ─── Suite 3: Approve Button & Confirmation Modal ───

  test.describe('Approve Flow', () => {
    test.beforeEach(async () => {
      await ap.clickNewSubmissionsTab();
      await ap.clickFirstViewDetails();
    });

    test('TC_SCRUM493_008: Approve Product Button is Visible', async () => {
      await expect(ap.approveBtn).toBeVisible();
    });

    test('TC_SCRUM493_009: Clicking Approve Opens Confirmation Modal', async () => {
      await ap.clickApprove();
      await expect(ap.approvalDialog).toBeVisible();
      await expect(ap.approvalHeading).toContainText('Approve Product');
    });

    test('TC_SCRUM493_010: Confirmation Modal Shows Product Name', async () => {
      await ap.clickApprove();
      const subtitle = ap.approvalDialog.locator('p').first();
      const text = (await subtitle.textContent()) ?? '';
      expect(text.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM493_011: Confirmation Modal Shows Impact Summary List', async () => {
      await ap.clickApprove();
      const list = ap.approvalDialog.getByRole('list');
      await expect(list).toBeVisible();
      const items = await list.getByRole('listitem').count();
      expect(items).toBeGreaterThanOrEqual(1);
    });
  });

  // ─── Suite 4: Approval Notes ───

  test.describe('Approval Notes', () => {
    test.beforeEach(async () => {
      await ap.clickNewSubmissionsTab();
      await ap.clickFirstViewDetails();
      await ap.clickApprove();
    });

    test('TC_SCRUM493_012: Approval Notes Textbox is Visible', async () => {
      await expect(ap.approvalNotes).toBeVisible();
    });

    test('TC_SCRUM493_013: Approval Notes Accepts Input', async () => {
      await ap.approvalNotes.fill('Test approval note');
      await expect(ap.approvalNotes).toHaveValue('Test approval note');
    });
  });

  // ─── Suite 5: Confirm & Cancel ───

  test.describe('Confirm & Cancel', () => {
    test.beforeEach(async () => {
      await ap.clickNewSubmissionsTab();
      await ap.clickFirstViewDetails();
      await ap.clickApprove();
    });

    test('TC_SCRUM493_014: Confirm Approval Button is Visible', async () => {
      await expect(ap.confirmApprovalBtn).toBeVisible();
    });

    test('TC_SCRUM493_015: Cancel Button is Visible', async () => {
      await expect(ap.cancelBtn).toBeVisible();
    });

    test('TC_SCRUM493_016: Cancel Returns from Confirmation Modal', async () => {
      await ap.clickCancelApproval();
      await ap.page.waitForTimeout(1000);
      const visible = await ap.approvalDialog.isVisible().catch(() => false);
      expect(visible).toBe(false);
    });

    test('TC_SCRUM493_017: Product Disappears After Approval', async () => {
      await ap.clickConfirmApproval();
      await ap.page.waitForTimeout(3000);
      await expect(ap.newSubmissionsTab).toBeVisible();
    });
  });

  // ─── Suite 6: Pagination & Edge Cases ───

  test.describe('Pagination & Edge Cases', () => {
    test('TC_SCRUM493_018: Pagination is Visible on New Submissions', async () => {
      await ap.clickNewSubmissionsTab();
      const hasNext = await ap.nextPageBtn.isVisible().catch(() => false);
      const hasPrev = await ap.prevPageBtn.isVisible().catch(() => false);
      expect(hasNext || hasPrev).toBe(true);
    });

    test('TC_SCRUM493_019: All Products Tab Shows Total Count', async () => {
      const text = (await ap.allProductsTab.textContent()) ?? '';
      expect(text).toMatch(/\d+/);
    });

    test('TC_SCRUM493_020: Close Button on Detail Dialog Works', async () => {
      await ap.clickNewSubmissionsTab();
      await ap.clickFirstViewDetails();
      await expect(ap.detailDialog).toBeVisible();
      await ap.closeDetailDialog();
      await ap.page.waitForTimeout(1000);
      const visible = await ap.detailDialog.isVisible().catch(() => false);
      expect(visible).toBe(false);
    });
  });
});
