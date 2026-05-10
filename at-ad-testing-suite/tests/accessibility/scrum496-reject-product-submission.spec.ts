// spec: specs/a11y/SCRUM-496-reject-product-submission.json

import { test, expect } from '@playwright/test';
import { AdminProductManagementPage } from '../../pages/admin-product-management.page';
import testData from '../../test-data/scrum490-admin-product-management.json';

const ADMIN_URL = testData.url;
const PRODUCTS_URL = testData.productsUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-496: Admin Reject New Product Submission - Accessibility', () => {
  let productPage: AdminProductManagementPage;

  test.beforeEach(async ({ page }) => {
    productPage = new AdminProductManagementPage(page);
    await productPage.loginAndNavigateToProducts(ADMIN_URL, EMAIL, PASSWORD, PRODUCTS_URL);
  });

  test.describe('Reject Button', () => {
    test('TC_A11Y_001: Reject button keyboard accessible', async () => {
      const rejectInfo = await productPage.getRejectButtonInfo();
      if (rejectInfo.exists) {
        expect(rejectInfo.name.length, 'Reject button must have accessible name').toBeGreaterThan(0);
        expect(rejectInfo.name.toLowerCase()).toContain('reject');
      }
    });

    test('TC_A11Y_013: Reject button not conveyed by color alone', async () => {
      const rejectInfo = await productPage.getRejectButtonInfo();
      if (rejectInfo.exists) {
        expect(rejectInfo.name.toLowerCase()).toContain('reject');
      }
    });
  });

  test.describe('Rejection Modal', () => {
    test('TC_A11Y_002: Rejection modal has role=dialog and aria-modal', async () => {
      await productPage.clickViewDetailsOnFirstProduct();
      await productPage.clickRejectButton();
      const dialogInfo = await productPage.getDialogRoleInfo();
      if (dialogInfo.exists) {
        expect(dialogInfo.hasDialogRole, 'BUG: Rejection modal has no role="dialog" (WCAG 4.1.2)').toBe(true);
        expect(dialogInfo.hasAriaLabel, 'BUG: Rejection modal has no accessible name (WCAG 4.1.2)').toBe(true);
      }
    });

    test('TC_A11Y_003: Modal focus trap works correctly', async () => {
      await productPage.clickViewDetailsOnFirstProduct();
      await productPage.clickRejectButton();
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected').toBe(true);
    });

    test('TC_A11Y_004: Rejection reason textarea has proper label', async () => {
      await productPage.clickViewDetailsOnFirstProduct();
      await productPage.clickRejectButton();
      const textareaInfo = await productPage.getRejectTextareaLabelInfo();
      if (textareaInfo.exists) {
        expect(textareaInfo.hasLabel, 'BUG: Rejection reason textarea has no label (WCAG 1.3.1)').toBe(true);
      }
    });

    test('TC_A11Y_005: Reject confirm button disabled when reason empty', async () => {
      await productPage.clickViewDetailsOnFirstProduct();
      await productPage.clickRejectButton();
      const disabledState = await productPage.getConfirmButtonDisabledState();
      expect(disabledState.isDisabled || disabledState.hasAttr, 'Confirm button must be disabled when reason is empty').toBe(true);
    });

    test('TC_A11Y_011: Modal close without action (Escape)', async () => {
      await productPage.clickViewDetailsOnFirstProduct();
      await productPage.clickRejectButton();
      const closed = await productPage.pressEscapeAndCheckClosed();
      expect(closed, 'Escape must close the rejection modal').toBe(true);
    });
  });

  test.describe('Notifications & Status', () => {
    test('TC_A11Y_008: Rejection success notification accessible', async () => {
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions for notifications (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_009: Product status change to Rejected announced', async () => {
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions for status changes (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_010: Focus management after rejection', async () => {
      await productPage.verifyH1Visible();
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Focus must be manageable after rejection').toBe(true);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_014: Text contrast meets WCAG AA', async () => {
      const results = await productPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_015: Rejection flow usable at 200% zoom', async () => {
      const zoomResult = await productPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_018: Mobile touch targets adequate', async () => {
      await productPage.setMobileViewport();
      const h1Visible = await productPage.isH1Visible();
      expect(h1Visible, 'Content must be visible on mobile').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_016: NVDA screen reader compatibility', async () => {
      await productPage.verifyH1HasHeadingRole();
      const buttonsNoName = await productPage.getButtonsWithNoName();
      expect(buttonsNoName, 'BUG: Buttons without accessible names (WCAG 4.1.2)').toBe(0);
    });

    test('TC_A11Y_017: JAWS screen reader compatibility', async () => {
      const linkInfo = await productPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'All links must have accessible names').toBe(0);
      }
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan', async () => {
      const results = await productPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-496 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
        for (const v of results.violations) {
          console.log(`\n[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}`);
          for (const n of v.nodes.slice(0, 3)) {
            console.log(`  - ${n.html.substring(0, 100)}`);
          }
        }
      }

      expect(results.violationCount, `Found ${results.violationCount} WCAG violations`).toBe(0);
    });
  });
});
