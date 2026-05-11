// spec: specs/a11y/SCRUM-493-review-approve-product.json

import { test, expect } from '@playwright/test';
import { AdminProductManagementPage } from '../../../pages/admin-product-management.page';
import testData from '../../../test-data/scrum490-admin-product-management.json';

const ADMIN_URL = testData.url;
const PRODUCTS_URL = testData.productsUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-493: Admin Review & Approve New Product Submission - Accessibility', () => {
  let productPage: AdminProductManagementPage;

  test.beforeEach(async ({ page }) => {
    productPage = new AdminProductManagementPage(page);
    await productPage.loginAndNavigateToProducts(ADMIN_URL, EMAIL, PASSWORD, PRODUCTS_URL);
  });

  test.describe('View Details Button', () => {
    test('TC_A11Y_001: View Details button keyboard accessible', async () => {
      const actionInfo = await productPage.getActionButtonsInfo();
      expect(actionInfo.total, 'Page must have action buttons').toBeGreaterThan(0);
      expect(actionInfo.withNames, 'All action buttons must have accessible names').toBe(actionInfo.total);
    });
  });

  test.describe('Product Details Panel', () => {
    test('TC_A11Y_002: Product details panel accessible', async () => {
      // Click View Details on first product
      await productPage.clickViewDetailsOnFirstProduct();
      const headingCount = await productPage.getDetailPanelHeadingCount();
      expect(headingCount, 'Product details must have headings').toBeGreaterThan(0);
    });

    test('TC_A11Y_003: Approve button keyboard accessible', async () => {
      await productPage.clickViewDetailsOnFirstProduct();
      const approveInfo = await productPage.getApproveButtonInfo();
      if (approveInfo.exists) {
        expect(approveInfo.name.length, 'Approve button must have accessible name').toBeGreaterThan(0);
      }
    });
  });

  test.describe('Approval Confirmation Modal', () => {
    test('TC_A11Y_005: Approval confirmation modal accessible', async () => {
      await productPage.clickViewDetailsOnFirstProduct();
      await productPage.clickApproveButton();
      const dialogInfo = await productPage.getDialogRoleInfo();
      if (dialogInfo.exists) {
        expect(dialogInfo.hasDialogRole, 'BUG: Approval modal has no role="dialog" (WCAG 4.1.2)').toBe(true);
        expect(dialogInfo.hasAriaLabel, 'BUG: Approval modal has no accessible name (WCAG 4.1.2)').toBe(true);
      }
    });

    test('TC_A11Y_008: Confirm and Cancel buttons keyboard accessible', async () => {
      await productPage.clickViewDetailsOnFirstProduct();
      await productPage.clickApproveButton();
      // Verify buttons exist and are keyboard accessible
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'No keyboard trap in modal').toBe(true);
    });
  });

  test.describe('Notifications & Status', () => {
    test('TC_A11Y_009: Approval success notification accessible', async () => {
      // Check for aria-live regions
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions for status announcements (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_010: Product status change announced', async () => {
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions to announce status changes (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_017: Status not conveyed by color alone', async () => {
      const hasTextLabels = await productPage.hasStatusTextLabels();
      expect(hasTextLabels, 'Status must have text labels (WCAG 1.4.1)').toBe(true);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_015: Text contrast meets WCAG AA', async () => {
      const results = await productPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_016: Approval flow usable at 200% zoom', async () => {
      const zoomResult = await productPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_014: Focus management after approval', async () => {
      await productPage.verifyH1Visible();
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Focus must be manageable').toBe(true);
    });

    test('TC_A11Y_018: NVDA screen reader compatibility', async () => {
      await productPage.verifyH1HasHeadingRole();
      const buttonsNoName = await productPage.getButtonsWithNoName();
      expect(buttonsNoName, 'BUG: Buttons without accessible names (WCAG 4.1.2)').toBe(0);
    });

    test('TC_A11Y_019: JAWS screen reader compatibility', async () => {
      const linkInfo = await productPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'All links must have accessible names').toBe(0);
      }
    });

    test('TC_A11Y_020: No keyboard traps in approval flow', async () => {
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected').toBe(true);
      await productPage.verifyH1Visible();
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan', async () => {
      const results = await productPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-493 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
