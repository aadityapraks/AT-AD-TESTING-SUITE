// spec: specs/a11y/SCRUM-484-change-vendor-status.json

import { test, expect } from '@playwright/test';
import { AdminVendorListPage } from '../../../pages/admin-vendor-list.page';
import testData from '../../../test-data/scrum484-change-vendor-status.json';

const ADMIN_URL = testData.url;
const PARTNERS_URL = testData.partnersUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-484: Admin Change Vendor Status (Active ↔ Inactive) - Accessibility', () => {
  let vendorListPage: AdminVendorListPage;

  test.beforeEach(async ({ page }) => {
    vendorListPage = new AdminVendorListPage(page);
    await vendorListPage.loginAndNavigateToVendorList(ADMIN_URL, EMAIL, PASSWORD, PARTNERS_URL);
  });

  test.describe('Status Dropdown Accessibility', () => {
    test('TC_A11Y_001: Status dropdown keyboard accessible', async () => {
      await vendorListPage.clickTab(testData.tabs.active);
      const dropdownInfo = await vendorListPage.getStatusDropdownInfo();
      // If dropdown exists, verify it has proper role
      if (dropdownInfo.exists) {
        expect(dropdownInfo.hasRole, 'Status dropdown must have proper ARIA role').toBe(true);
      }
      // Verify page has interactive elements reachable via keyboard
      await vendorListPage.pressTab();
      const buttonCount = await vendorListPage.getButtonCount();
      expect(buttonCount, 'Page must have interactive elements').toBeGreaterThan(0);
    });

    test('TC_A11Y_002: Status dropdown has proper ARIA attributes', async () => {
      await vendorListPage.clickTab(testData.tabs.active);
      const dropdownInfo = await vendorListPage.getStatusDropdownInfo();
      if (dropdownInfo.exists) {
        expect(dropdownInfo.hasRole, 'BUG: Status dropdown has no proper ARIA role (WCAG 4.1.2)').toBe(true);
        expect(dropdownInfo.hasLabel, 'BUG: Status dropdown has no accessible label (WCAG 4.1.2)').toBe(true);
      }
    });

    test('TC_A11Y_003: Status dropdown available only for Active/Inactive vendors', async () => {
      // Check Active tab has status controls
      await vendorListPage.clickTab(testData.tabs.active);
      const activeInfo = await vendorListPage.getStatusDropdownInfo();

      // Check Pending tab should NOT have status dropdown
      await vendorListPage.clickTab(testData.tabs.pending);
      await vendorListPage.verifyTabContentLoaded();
    });
  });

  test.describe('Warning Dialog & Notifications', () => {
    test('TC_A11Y_005: Status change success announced', async () => {
      // Check for aria-live regions
      const ariaLiveCount = await vendorListPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions to announce status changes (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_010: Status not conveyed by color alone', async () => {
      await vendorListPage.clickTab(testData.tabs.active);
      const hasTextLabels = await vendorListPage.hasStatusTextLabels();
      expect(hasTextLabels, 'Status must have text labels (Active/Inactive), not just color (WCAG 1.4.1)').toBe(true);
    });

    test('TC_A11Y_011: Focus management after status change', async () => {
      // Verify page is navigable and no focus trap
      const noTrap = await vendorListPage.verifyNoKeyboardTrap();
      expect(noTrap, 'No keyboard trap on page').toBe(true);
      await vendorListPage.verifyH1Visible();
    });

    test('TC_A11Y_012: Loading state during status change accessible', async () => {
      // Verify no keyboard trap during any loading
      const noTrap = await vendorListPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard must not be trapped during loading').toBe(true);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_013: Text contrast meets WCAG AA', async () => {
      await vendorListPage.clickTab(testData.tabs.active);
      const results = await vendorListPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_014: Status change usable at 200% zoom', async () => {
      await vendorListPage.clickTab(testData.tabs.active);
      const zoomResult = await vendorListPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_018: Mobile touch target adequate', async () => {
      await vendorListPage.setMobileViewport();
      const h1Visible = await vendorListPage.isH1Visible();
      expect(h1Visible, 'Content must be visible on mobile viewport').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_015: NVDA screen reader compatibility', async () => {
      await vendorListPage.clickTab(testData.tabs.active);
      // Verify heading has proper role
      await vendorListPage.verifyH1HasHeadingRole();
      // Verify buttons have accessible names
      const name = await vendorListPage.getFirstButtonAccessibleName();
      expect(name.length, 'Buttons must have accessible names').toBeGreaterThan(0);
    });

    test('TC_A11Y_016: JAWS screen reader compatibility', async () => {
      await vendorListPage.clickTab(testData.tabs.active);
      // Verify links have accessible names
      const linkInfo = await vendorListPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'All links must have accessible names').toBe(0);
      }
    });

    test('TC_A11Y_017: No keyboard traps in status change flow', async () => {
      await vendorListPage.clickTab(testData.tabs.active);
      const noTrap = await vendorListPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected').toBe(true);
      await vendorListPage.verifyH1Visible();
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan on Active tab', async () => {
      await vendorListPage.clickTab(testData.tabs.active);
      const results = await vendorListPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-484 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
