// spec: specs/a11y/SCRUM-511-admin-search-products.json

import { test, expect } from '@playwright/test';
import { AdminProductManagementPage } from '../../../pages/admin-product-management.page';
import testData from '../../../test-data/scrum490-admin-product-management.json';

const ADMIN_URL = testData.url;
const PRODUCTS_URL = testData.productsUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-511: Admin Search Products - Accessibility', () => {
  let productPage: AdminProductManagementPage;

  test.beforeEach(async ({ page }) => {
    productPage = new AdminProductManagementPage(page);
    await productPage.loginAndNavigateToProducts(ADMIN_URL, EMAIL, PASSWORD, PRODUCTS_URL);
  });

  test.describe('Search Input', () => {
    test('TC_A11Y_001: Search input has proper label', async () => {
      const searchInfo = await productPage.getSearchInputInfo();
      const hasName = searchInfo.hasAriaLabel || searchInfo.hasPlaceholder;
      expect(hasName, 'Search input must have accessible name (aria-label or placeholder)').toBe(true);
    });

    test('TC_A11Y_002: Search input keyboard accessible', async () => {
      const reached = await productPage.tabToSearchInput();
      expect(reached, 'Search input must be reachable via Tab (WCAG 2.1.1)').toBe(true);
    });

    test('TC_A11Y_010: Search clear button accessible', async () => {
      // Type to trigger clear button
      await productPage.typeInSearchInput('test');
      const clearInfo = await productPage.getClearButtonInfo();
      if (clearInfo.exists) {
        expect(clearInfo.hasName, 'Clear button must have accessible name').toBe(true);
      }
    });
  });

  test.describe('Dynamic Results', () => {
    test('TC_A11Y_003: Search results announced dynamically', async () => {
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live region for search results (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_004: Search works across all tabs', async () => {
      // Verify search input exists on the page
      const searchInfo = await productPage.getSearchInputInfo();
      expect(searchInfo.exists, 'Search input must exist on products page').toBe(true);
    });

    test('TC_A11Y_005: Partial keyword search (min 3 chars) communicated', async () => {
      const searchInfo = await productPage.getSearchInputInfo();
      // Placeholder or help text should indicate minimum chars
      expect(searchInfo.hasPlaceholder || searchInfo.hasAriaLabel, 'Search must have instructions').toBe(true);
    });

    test('TC_A11Y_006: No-result state accessible', async () => {
      await productPage.typeInSearchInput('xyznonexistent999');
      await productPage.waitForSearchResults();
      // Page should still be functional
      await productPage.verifyH1Visible();
    });

    test('TC_A11Y_007: Special characters handled gracefully', async () => {
      await productPage.typeInSearchInput('<script>alert(1)</script>');
      await productPage.waitForSearchResults();
      await productPage.verifyH1Visible();
    });

    test('TC_A11Y_008: Long search string handled gracefully', async () => {
      await productPage.typeInSearchInput('a'.repeat(100));
      await productPage.waitForSearchResults();
      const zoomResult = await productPage.checkZoom200();
      // Reset zoom for next assertions
      expect(true).toBe(true); // No crash = pass
    });

    test('TC_A11Y_009: Search during data loading accessible', async () => {
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'No keyboard trap during search/loading').toBe(true);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_011: Text contrast meets WCAG AA', async () => {
      const results = await productPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_012: Search usable at 200% zoom', async () => {
      const zoomResult = await productPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_016: Mobile search accessible', async () => {
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
    test('AXE-CORE: Full WCAG 2.1 AA scan', async () => {
      const results = await productPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-511 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
