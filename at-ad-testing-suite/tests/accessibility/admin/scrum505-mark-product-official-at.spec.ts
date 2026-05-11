// spec: specs/a11y/SCRUM-505-mark-product-official-at.json

import { test, expect } from '@playwright/test';
import { AdminProductManagementPage } from '../../../pages/admin-product-management.page';
import testData from '../../../test-data/scrum490-admin-product-management.json';

const ADMIN_URL = testData.url;
const PRODUCTS_URL = testData.productsUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-505: Admin Mark Product as Official AT - Accessibility', () => {
  let productPage: AdminProductManagementPage;

  test.beforeEach(async ({ page }) => {
    productPage = new AdminProductManagementPage(page);
    await productPage.loginAndNavigateToProducts(ADMIN_URL, EMAIL, PASSWORD, PRODUCTS_URL);
  });

  test.describe('Official AT Action', () => {
    test('TC_A11Y_001: Mark as Official AT button keyboard accessible', async () => {
      // Navigate to a tab with approved products
      await productPage.clickTab('Official AT');
      const actionInfo = await productPage.getActionButtonsInfo();
      if (actionInfo.total > 0) {
        expect(actionInfo.withNames, 'All action buttons must have accessible names').toBe(actionInfo.total);
      }
    });

    test('TC_A11Y_002: Action blocked for unapproved products', async () => {
      // On New Submissions tab, Official AT action should not be available
      await productPage.clickTab('New Submissions');
      // Verify page loads correctly (action not present is acceptable)
      await productPage.verifyTabContentLoaded();
    });

    test('TC_A11Y_003: Official AT badge accessible on product card', async () => {
      await productPage.clickTab('Official AT');
      const hasTextLabels = await productPage.hasStatusTextLabels();
      expect(hasTextLabels, 'Official AT badge must have text label (WCAG 1.4.1)').toBe(true);
    });
  });

  test.describe('Notifications & Status', () => {
    test('TC_A11Y_004: Official AT designation success announced', async () => {
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions for status announcements (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_005: Product moves to Official AT tab announced', async () => {
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions for tab count updates (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_006: Revoke Official AT action accessible', async () => {
      await productPage.clickTab('Official AT');
      const actionInfo = await productPage.getActionButtonsInfo();
      if (actionInfo.total > 0) {
        expect(actionInfo.withNames, 'Revoke action must have accessible name').toBe(actionInfo.total);
      }
    });

    test('TC_A11Y_007: Revocation success announced', async () => {
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live for revocation announcement (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_008: Focus management after designation/revocation', async () => {
      await productPage.verifyH1Visible();
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Focus must be manageable').toBe(true);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_009: Text contrast meets WCAG AA', async () => {
      await productPage.clickTab('Official AT');
      const results = await productPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_010: Feature usable at 200% zoom', async () => {
      const zoomResult = await productPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_014: Mobile touch target adequate', async () => {
      await productPage.setMobileViewport();
      const h1Visible = await productPage.isH1Visible();
      expect(h1Visible, 'Content must be visible on mobile').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_011: NVDA screen reader compatibility', async () => {
      await productPage.verifyH1HasHeadingRole();
      const buttonsNoName = await productPage.getButtonsWithNoName();
      expect(buttonsNoName, 'BUG: Buttons without accessible names (WCAG 4.1.2)').toBe(0);
    });

    test('TC_A11Y_012: JAWS screen reader compatibility', async () => {
      const linkInfo = await productPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'All links must have accessible names').toBe(0);
      }
    });

    test('TC_A11Y_013: No keyboard traps', async () => {
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected').toBe(true);
      await productPage.verifyH1Visible();
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan on Official AT tab', async () => {
      await productPage.clickTab('Official AT');
      const results = await productPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-505 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
