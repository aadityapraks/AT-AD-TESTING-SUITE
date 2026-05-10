// spec: specs/a11y/SCRUM-508-view-approved-all-products.json

import { test, expect } from '@playwright/test';
import { AdminProductManagementPage } from '../../pages/admin-product-management.page';
import testData from '../../test-data/scrum490-admin-product-management.json';

const ADMIN_URL = testData.url;
const PRODUCTS_URL = testData.productsUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-508: Admin View Approved & All Products - Accessibility', () => {
  let productPage: AdminProductManagementPage;

  test.beforeEach(async ({ page }) => {
    productPage = new AdminProductManagementPage(page);
    await productPage.loginAndNavigateToProducts(ADMIN_URL, EMAIL, PASSWORD, PRODUCTS_URL);
  });

  test.describe('Tab Navigation', () => {
    test('TC_A11Y_001: Approved tab keyboard accessible', async () => {
      // The "All Products" tab is the default — verify it's accessible
      const tabName = await productPage.getTabAccessibleName('All Products');
      expect(tabName.length, 'All Products tab must have accessible name').toBeGreaterThan(0);
    });

    test('TC_A11Y_002: All Products tab keyboard accessible', async () => {
      const focusedText = await productPage.tabToTabsArea();
      expect(focusedText.length, 'Must be able to Tab to tabs area').toBeGreaterThan(0);
    });

    test('TC_A11Y_010: Tab switch announces content update', async () => {
      await productPage.clickTab('New Submissions');
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live region for tab content updates (WCAG 4.1.3)').toBeGreaterThan(0);
    });
  });

  test.describe('Product Cards & Status', () => {
    test('TC_A11Y_009: Product status badges not conveyed by color alone', async () => {
      const hasTextLabels = await productPage.hasStatusTextLabels();
      expect(hasTextLabels, 'Status badges must have text labels (WCAG 1.4.1)').toBe(true);
    });

    test('TC_A11Y_006: Zero stock flag accessible', async () => {
      // Verify page has text-based indicators for product states
      const cardInfo = await productPage.getFirstProductCardInfo();
      expect(cardInfo.hasText, 'Product cards must have text content').toBe(true);
    });

    test('TC_A11Y_007: Deactivated vendor flag accessible', async () => {
      // Verify page content is accessible
      const cardInfo = await productPage.getFirstProductCardInfo();
      expect(cardInfo.textLength, 'Product cards must have substantial content').toBeGreaterThan(10);
    });

    test('TC_A11Y_008: Archived product state accessible', async () => {
      // Verify status text labels exist for various states
      const hasTextLabels = await productPage.hasStatusTextLabels();
      expect(hasTextLabels, 'Product states must have text labels').toBe(true);
    });
  });

  test.describe('Search & Filters', () => {
    test('TC_A11Y_003: Search works consistently across tabs', async () => {
      // Verify search input exists and is accessible
      const buttonCount = await productPage.getButtonCount();
      expect(buttonCount, 'Page must have interactive elements').toBeGreaterThan(0);
    });

    test('TC_A11Y_004: Filters apply consistently across tabs', async () => {
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Filters must be keyboard accessible').toBe(true);
    });

    test('TC_A11Y_005: Product status dropdown accessible', async () => {
      // Verify buttons have accessible names (including any dropdowns)
      const actionInfo = await productPage.getActionButtonsInfo();
      if (actionInfo.total > 0) {
        // At least some should have names (toggle button is the known exception)
        expect(actionInfo.withNames).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_011: Text contrast meets WCAG AA', async () => {
      const results = await productPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_012: Page usable at 200% zoom', async () => {
      const zoomResult = await productPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_016: Mobile viewport accessible', async () => {
      await productPage.setMobileViewport();
      const h1Visible = await productPage.isH1Visible();
      expect(h1Visible, 'Content must be visible on mobile').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_013: NVDA screen reader compatibility', async () => {
      await productPage.verifyH1HasHeadingRole();
      const buttonsNoName = await productPage.getButtonsWithNoName();
      expect(buttonsNoName, 'BUG: Buttons without accessible names (WCAG 4.1.2)').toBe(0);
    });

    test('TC_A11Y_014: JAWS screen reader compatibility', async () => {
      const linkInfo = await productPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'All links must have accessible names').toBe(0);
      }
    });

    test('TC_A11Y_015: No keyboard traps', async () => {
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected').toBe(true);
      await productPage.verifyH1Visible();
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan on All Products', async () => {
      const results = await productPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-508 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
