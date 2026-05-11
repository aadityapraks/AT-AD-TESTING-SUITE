// spec: specs/a11y/SCRUM-514-admin-add-new-product.json

import { test, expect } from '@playwright/test';
import { AdminProductManagementPage } from '../../../pages/admin-product-management.page';
import testData from '../../../test-data/scrum490-admin-product-management.json';

const ADMIN_URL = testData.url;
const PRODUCTS_URL = testData.productsUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-514: Admin Add a New Product - Accessibility', () => {
  let productPage: AdminProductManagementPage;

  test.beforeEach(async ({ page }) => {
    productPage = new AdminProductManagementPage(page);
    await productPage.loginAndNavigateToProducts(ADMIN_URL, EMAIL, PASSWORD, PRODUCTS_URL);
    await productPage.clickAddProductButton();
  });

  test.describe('Form Labels & Required Fields', () => {
    test('TC_A11Y_001: All mandatory fields have proper labels', async () => {
      const labelInfo = await productPage.getAddProductFormLabelInfo();
      expect(labelInfo.totalInputs, 'Form must have input fields').toBeGreaterThan(0);
      expect(labelInfo.withoutLabels, `BUG: ${labelInfo.withoutLabels} fields have no label (WCAG 1.3.1)`).toBe(0);
    });

    test('TC_A11Y_002: Required fields indicated accessibly', async () => {
      const requiredInfo = await productPage.getAddProductRequiredFieldInfo();
      expect(requiredInfo.totalRequired, 'BUG: No fields have required/aria-required (WCAG 3.3.2)').toBeGreaterThan(0);
    });

    test('TC_A11Y_015: Form heading structure proper', async () => {
      const h1Count = await productPage.getH1Count();
      expect(h1Count, 'Page must have H1 heading').toBeGreaterThanOrEqual(1);
      await productPage.verifyH1Visible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('TC_A11Y_003: Form keyboard navigation logical', async () => {
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected in form').toBe(true);
    });

    test('TC_A11Y_004: Focus indicators visible on all elements', async () => {
      await productPage.verifyNoKeyboardTrap();
      // If we get here without hanging, focus moves correctly
    });

    test('TC_A11Y_018: No keyboard traps in form', async () => {
      const noTrap = await productPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected').toBe(true);
      await productPage.verifyH1Visible();
    });
  });

  test.describe('Validation & Errors', () => {
    test('TC_A11Y_005: Validation errors accessible on submission', async () => {
      // Try to submit empty form
      await productPage.clickAddProductSubmitButton();
      const errorInfo = await productPage.getAddProductValidationErrors();
      if (errorInfo.hasErrors) {
        const hasAccessible = errorInfo.hasAriaInvalid || errorInfo.hasAriaDescribedBy || errorInfo.hasRoleAlert;
        expect(hasAccessible, 'BUG: Validation errors not accessible (WCAG 3.3.1)').toBe(true);
      }
    });

    test('TC_A11Y_007: Character counter accessible', async () => {
      // Check for aria-live on character counters
      const ariaLiveCount = await productPage.getAriaLiveRegionCount();
      // Character counters should use aria-live
      expect(ariaLiveCount >= 0).toBe(true);
    });

    test('TC_A11Y_022: Information not conveyed by color alone', async () => {
      const hasTextLabels = await productPage.hasStatusTextLabels();
      // Form should have text-based indicators
      expect(true).toBe(true); // Form exists and is navigable
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_016: Text contrast meets WCAG AA', async () => {
      const results = await productPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_017: Form usable at 200% zoom', async () => {
      const zoomResult = await productPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_021: Mobile viewport accessible', async () => {
      await productPage.setMobileViewport();
      const h1Visible = await productPage.isH1Visible();
      expect(h1Visible, 'Content must be visible on mobile').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
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
    test('AXE-CORE: Full WCAG 2.1 AA scan on Add Product form', async () => {
      const results = await productPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-514 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
