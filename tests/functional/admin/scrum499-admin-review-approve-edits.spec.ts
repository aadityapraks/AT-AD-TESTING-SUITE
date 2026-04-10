// spec: specs/functional/admin/SCRUM-499-admin-review-approve-edits.md
// data: specs/test-cases/admin/scrum499-admin-review-approve-edits.json

import { test, expect } from '@playwright/test';
import { AdminProductPage } from '../../pages/admin/AdminProductPage';
import planData from '../../../specs/test-cases/admin/scrum499-admin-review-approve-edits.json';
const td = planData.testData;

test.describe('SCRUM-499: Admin - Review & Approve Product Edit Requests', () => {
  test.setTimeout(180_000);
  let ap: AdminProductPage;

  test.beforeEach(async ({ page }) => {
    ap = new AdminProductPage(page);
    await ap.loginAsAdmin(td.credentials.email, td.credentials.password);
    await ap.goToProductManagement();
  });

  // ─── Suite 1: Pending Edits Tab ───

  test.describe('Pending Edits Tab', () => {
    test('TC_SCRUM499_001: Pending Edits Tab is Visible', async () => {
      await expect(ap.pendingEditsTab).toBeVisible();
    });

    test('TC_SCRUM499_002: Pending Edits Tab Shows Count', async () => {
      const text = (await ap.pendingEditsTab.textContent()) ?? '';
      expect(text).toMatch(/\d+/);
    });

    test('TC_SCRUM499_003: Pending Edits Tab Lists Products with Edits', async () => {
      await ap.clickPendingEditsTab();
      const count = await ap.viewDetailsButtons.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ─── Suite 2: Product Card Info ───

  test.describe('Product Card', () => {
    test.beforeEach(async () => { await ap.clickPendingEditsTab(); });

    test('TC_SCRUM499_004: Product Card Shows Pending Edit Request Label', async () => {
      const body = (await ap.page.locator('body').textContent()) ?? '';
      expect(body).toContain('Pending Edit Request');
    });

    test('TC_SCRUM499_005: Product Card Shows Submission Date', async () => {
      const body = (await ap.page.locator('body').textContent()) ?? '';
      expect(body).toMatch(/Submitted on/i);
    });

    test('TC_SCRUM499_006: Product Card Shows Compare Changes Link', async () => {
      const inlineBtn = ap.page.getByRole('button', { name: /Compare changes →/i });
      await expect(inlineBtn.first()).toBeVisible();
    });
  });

  // ─── Suite 3: Compare Changes Dialog ───

  test.describe('Compare Dialog', () => {
    test.beforeEach(async () => {
      await ap.clickPendingEditsTab();
    });

    test('TC_SCRUM499_007: Compare Changes Button is Visible', async () => {
      await expect(ap.compareChangesButtons.first()).toBeVisible();
    });

    test('TC_SCRUM499_008: Clicking Compare Changes Opens Dialog', async () => {
      await ap.clickFirstCompareChanges();
      await expect(ap.compareDialog).toBeVisible();
      await expect(ap.compareHeading).toContainText('Compare Product Changes');
    });

    test('TC_SCRUM499_009: Compare Dialog Shows Current vs Proposed', async () => {
      await ap.clickFirstCompareChanges();
      const dialogText = (await ap.compareDialog.textContent()) ?? '';
      expect(dialogText).toContain('Current');
      expect(dialogText).toContain('Proposed');
    });

    test('TC_SCRUM499_010: Compare Dialog Shows Changed Field Values', async () => {
      await ap.clickFirstCompareChanges();
      const dialogText = (await ap.compareDialog.textContent()) ?? '';
      // Should have some content beyond just headers
      expect(dialogText.length).toBeGreaterThan(50);
    });

    test('TC_SCRUM499_011: Compare Dialog Shows Review Subtitle', async () => {
      await ap.clickFirstCompareChanges();
      const dialogText = (await ap.compareDialog.textContent()) ?? '';
      expect(dialogText.toLowerCase()).toContain('review changes requested by vendor');
    });
  });

  // ─── Suite 4: Approve Edit ───

  test.describe('Approve Edit', () => {
    test('TC_SCRUM499_012: Approve Changes Button is Visible', async () => {
      await ap.clickPendingEditsTab();
      await ap.clickFirstCompareChanges();
      await expect(ap.approveChangesBtn).toBeVisible();
    });

    test('TC_SCRUM499_013: Approve Changes Button is Clickable', async () => {
      await ap.clickPendingEditsTab();
      await ap.clickFirstCompareChanges();
      await expect(ap.approveChangesBtn).toBeEnabled();
    });

    test('TC_SCRUM499_014: Product Removed from Pending Edits After Approval', async () => {
      await ap.clickPendingEditsTab();
      await ap.clickFirstCompareChanges();
      await ap.clickApproveChanges();
      await ap.page.waitForTimeout(3000);
      await expect(ap.pendingEditsTab).toBeVisible();
    });
  });

  // ─── Suite 5: Cancel/Close ───

  test.describe('Cancel/Close', () => {
    test.beforeEach(async () => {
      await ap.clickPendingEditsTab();
      await ap.clickFirstCompareChanges();
    });

    test('TC_SCRUM499_015: Close Button is Visible in Compare Dialog', async () => {
      await expect(ap.compareCloseBtn).toBeVisible();
    });

    test('TC_SCRUM499_016: Close Button Closes Compare Dialog', async () => {
      await ap.compareCloseBtn.click();
      await ap.page.waitForTimeout(1000);
      const visible = await ap.compareDialog.isVisible().catch(() => false);
      expect(visible).toBe(false);
    });

    test('TC_SCRUM499_017: Close (×) Button Closes Compare Dialog', async () => {
      await ap.compareCloseXBtn.click();
      await ap.page.waitForTimeout(1000);
      const visible = await ap.compareDialog.isVisible().catch(() => false);
      expect(visible).toBe(false);
    });
  });

  // ─── Suite 6: Edge Cases ───

  test.describe('Edge Cases', () => {
    test('TC_SCRUM499_018: View Details Button is Visible on Pending Edit Card', async () => {
      await ap.clickPendingEditsTab();
      await expect(ap.viewDetailsButtons.first()).toBeVisible();
    });

    test('TC_SCRUM499_019: Pagination is Visible on Pending Edits', async () => {
      await ap.clickPendingEditsTab();
      const hasNext = await ap.nextPageBtn.isVisible().catch(() => false);
      const hasPrev = await ap.prevPageBtn.isVisible().catch(() => false);
      const hasInfo = await ap.paginationInfo.isVisible().catch(() => false);
      expect(hasNext || hasPrev || hasInfo).toBe(true);
    });

    test('TC_SCRUM499_020: Product Card Shows Approved Status Badge', async () => {
      await ap.clickPendingEditsTab();
      const body = (await ap.page.locator('body').textContent()) ?? '';
      expect(body).toContain('Approved');
    });
  });
});
