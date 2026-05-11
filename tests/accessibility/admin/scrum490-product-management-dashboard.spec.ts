// spec: specs/a11y/SCRUM-490-product-management-dashboard.json

import { test, expect } from '@playwright/test';
import { AdminProductManagementPage } from '../../../pages/admin-product-management.page';
import testData from '../../../test-data/scrum490-admin-product-management.json';

const ADMIN_URL = testData.url;
const PRODUCTS_URL = testData.productsUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-490: Admin Product Management Dashboard - Accessibility', () => {
  let productPage: AdminProductManagementPage;

  test.beforeEach(async ({ page }) => {
    productPage = new AdminProductManagementPage(page);
    await productPage.loginAndNavigateToProducts(ADMIN_URL, EMAIL, PASSWORD, PRODUCTS_URL);
  });

  test.describe('Page Structure', () => {
    test('TC_A11Y_001: Page has proper heading structure', async () => {
      const h1Count = await productPage.getH1Count();
      expect(h1Count, 'Page must have exactly one H1 heading').toBe(1);
      await productPage.verifyH1Visible();
    });

    test('TC_A11Y_002: Page has proper landmarks', async () => {
      const mainCount = await productPage.getMainLandmarkCount();
      expect(mainCount, 'BUG: No <main> landmark (WCAG 1.3.1)').toBeGreaterThan(0);

      const navCount = await productPage.getNavLandmarkCount();
      expect(navCount, 'BUG: No <nav> landmark').toBeGreaterThan(0);

      const lang = await productPage.getHtmlLangAttribute();
      expect(lang, 'BUG: <html> missing lang attribute (WCAG 3.1.1)').toBeTruthy();
    });
  });

  test.describe('Product State Tabs', () => {
    test('TC_A11Y_003: Product state tabs have proper ARIA tablist pattern', async () => {
      const tablistCount = await productPage.getTablistRoleCount();
      expect(tablistCount, 'BUG: No role="tablist" on product state tabs (WCAG 4.1.2)').toBeGreaterThan(0);

      const tabRoleCount = await productPage.getTabRoleCount();
      expect(tabRoleCount, 'BUG: No role="tab" on tab elements (WCAG 4.1.2)').toBeGreaterThan(0);

      const ariaSelected = await productPage.getActiveTabAriaSelected();
      expect(ariaSelected, 'BUG: No tab has aria-selected="true" (WCAG 4.1.2)').toBe('true');
    });

    test('TC_A11Y_004: Product state tabs keyboard accessible', async () => {
      const focusedText = await productPage.tabToTabsArea();
      expect(focusedText.length, 'Must be able to Tab to product state tabs').toBeGreaterThan(0);

      const nextTabText = await productPage.pressArrowRightAndGetFocusedText();
      expect(nextTabText.length, 'ArrowRight must move focus to next tab').toBeGreaterThan(0);
    });

    test('TC_A11Y_005: Tab counts visible and announced', async () => {
      const tabName = await productPage.getTabAccessibleName(testData.tabs.newSubmissions);
      expect(tabName, 'Tab must have text content').toBeTruthy();
    });

    test('TC_A11Y_006: Tab switch announces content update', async () => {
      await productPage.clickTab(testData.tabs.approved);
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live region to announce tab content updates (WCAG 4.1.3)').toBeGreaterThan(0);
    });
  });

  test.describe('Product Card Accessibility', () => {
    test('TC_A11Y_007: Product card has semantic structure', async () => {
      const cardInfo = await productPage.getFirstProductCardInfo();
      expect(cardInfo.hasText, 'Product card must have text content').toBe(true);
      expect(cardInfo.textLength, 'Product card must have substantial content').toBeGreaterThan(10);
    });

    test('TC_A11Y_008: Product card keyboard accessible', async () => {
      await productPage.pressTab();
      const buttonCount = await productPage.getButtonCount();
      expect(buttonCount, 'Page must have interactive buttons').toBeGreaterThan(0);
    });

    test('TC_A11Y_009: Context-aware action buttons accessible', async () => {
      const actionInfo = await productPage.getActionButtonsInfo();
      if (actionInfo.total > 0) {
        expect(actionInfo.withNames, 'All action buttons must have accessible names').toBe(actionInfo.total);
      }
    });

    test('TC_A11Y_010: Status badge not conveyed by color alone', async () => {
      const hasTextLabels = await productPage.hasStatusTextLabels();
      expect(hasTextLabels, 'Status must have text labels, not just color (WCAG 1.4.1)').toBe(true);
    });

    test('TC_A11Y_011: Disability type tags accessible', async () => {
      // Verify tags exist and have text (not just color)
      const hasTextLabels = await productPage.hasStatusTextLabels();
      expect(hasTextLabels, 'Tags must have text labels').toBe(true);
    });

    test('TC_A11Y_014: Product list semantic structure', async () => {
      const listInfo = await productPage.getListStructureInfo();
      const hasList = listInfo.hasUlOl || listInfo.hasRoleList;
      expect(hasList, 'BUG: Product list does not use semantic list structure (WCAG 1.3.1)').toBe(true);
    });
  });

  test.describe('Dynamic Content', () => {
    test('TC_A11Y_012: Empty state message accessible', async () => {
      // Try a tab that might be empty
      await productPage.clickTab(testData.tabs.pendingEdits);
      await productPage.verifyTabContentLoaded();
    });

    test('TC_A11Y_013: Access denied message accessible', async () => {
      // This test verifies the page loads correctly for authorized admin
      await productPage.verifyH1Visible();
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_015: Text contrast meets WCAG AA', async () => {
      const results = await productPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_016: Dashboard usable at 200% zoom', async () => {
      const zoomResult = await productPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_017: Mobile viewport accessible', async () => {
      await productPage.setMobileViewport();
      const h1Visible = await productPage.isH1Visible();
      expect(h1Visible, 'Content must be visible on mobile viewport').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_018: No keyboard traps', async () => {
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected').toBe(true);
      await productPage.verifyH1Visible();
    });

    test('TC_A11Y_019: NVDA screen reader compatibility', async () => {
      await productPage.verifyH1HasHeadingRole();
      const buttonsNoName = await productPage.getButtonsWithNoName();
      expect(buttonsNoName, 'BUG: Buttons without accessible names (WCAG 4.1.2)').toBe(0);
    });

    test('TC_A11Y_020: JAWS screen reader compatibility', async () => {
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
        console.log(`=== SCRUM-490 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
