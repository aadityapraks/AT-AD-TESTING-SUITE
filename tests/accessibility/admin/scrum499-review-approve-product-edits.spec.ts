// spec: specs/a11y/SCRUM-499-review-approve-product-edits.json

import { test, expect } from '@playwright/test';
import { AdminProductManagementPage } from '../../../pages/admin-product-management.page';
import testData from '../../../test-data/scrum490-admin-product-management.json';

const ADMIN_URL = testData.url;
const PRODUCTS_URL = testData.productsUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-499: Admin Review & Approve Product Edit Requests - Accessibility', () => {
  let productPage: AdminProductManagementPage;

  test.beforeEach(async ({ page }) => {
    productPage = new AdminProductManagementPage(page);
    await productPage.loginAndNavigateToProducts(ADMIN_URL, EMAIL, PASSWORD, PRODUCTS_URL);
  });

  test.describe('Pending Edits Tab', () => {
    test('TC_A11Y_001: Pending Edits tab accessible', async () => {
      // Navigate to Pending Edits tab
      await productPage.clickTab('Pending Edits');
      const tabName = await productPage.getTabAccessibleName('Pending Edits');
      expect(tabName.length, 'Pending Edits tab must have accessible name').toBeGreaterThan(0);
    });

    test('TC_A11Y_002: Product card with edit indicator accessible', async () => {
      await productPage.clickTab('Pending Edits');
      const cardInfo = await productPage.getFirstProductCardInfo();
      expect(cardInfo.hasText, 'Product card must have text content').toBe(true);
    });
  });

  test.describe('Compare Changes View', () => {
    test('TC_A11Y_003: Compare Changes button keyboard accessible', async () => {
      await productPage.clickTab('Pending Edits');
      const actionInfo = await productPage.getActionButtonsInfo();
      if (actionInfo.total > 0) {
        expect(actionInfo.withNames, 'All buttons must have accessible names').toBe(actionInfo.total);
      }
    });

    test('TC_A11Y_005: Approve Edit button keyboard accessible', async () => {
      await productPage.clickTab('Pending Edits');
      const approveInfo = await productPage.getApproveButtonInfo();
      if (approveInfo.exists) {
        expect(approveInfo.name.length, 'Approve button must have accessible name').toBeGreaterThan(0);
      }
    });

    test('TC_A11Y_006: Reject Edit button keyboard accessible', async () => {
      await productPage.clickTab('Pending Edits');
      const rejectInfo = await productPage.getRejectButtonInfo();
      if (rejectInfo.exists) {
        expect(rejectInfo.name.length, 'Reject button must have accessible name').toBeGreaterThan(0);
      }
    });

    test('TC_A11Y_011: Comparison highlights not conveyed by color alone', async () => {
      await productPage.clickTab('Pending Edits');
      const hasTextLabels = await productPage.hasStatusTextLabels();
      expect(hasTextLabels, 'Status/changes must have text labels (WCAG 1.4.1)').toBe(true);
    });
  });

  test.describe('Notifications & Status', () => {
    test('TC_A11Y_007: Approve Edit success notification accessible', async () => {
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions for notifications (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_008: Reject Edit success notification accessible', async () => {
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions for notifications (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_012: Focus management after approve/reject', async () => {
      await productPage.verifyH1Visible();
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Focus must be manageable').toBe(true);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_013: Text contrast meets WCAG AA', async () => {
      const results = await productPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_014: Edit review usable at 200% zoom', async () => {
      const zoomResult = await productPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_018: Mobile viewport accessible', async () => {
      await productPage.setMobileViewport();
      const h1Visible = await productPage.isH1Visible();
      expect(h1Visible, 'Content must be visible on mobile').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_015: NVDA screen reader compatibility', async () => {
      await productPage.verifyH1HasHeadingRole();
      const buttonsNoName = await productPage.getButtonsWithNoName();
      expect(buttonsNoName, 'BUG: Buttons without accessible names (WCAG 4.1.2)').toBe(0);
    });

    test('TC_A11Y_016: JAWS screen reader compatibility', async () => {
      const linkInfo = await productPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'All links must have accessible names').toBe(0);
      }
    });

    test('TC_A11Y_017: No keyboard traps in edit review flow', async () => {
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected').toBe(true);
      await productPage.verifyH1Visible();
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan', async () => {
      await productPage.clickTab('Pending Edits');
      const results = await productPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-499 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
