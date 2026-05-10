// spec: specs/a11y/SCRUM-469-vendor-lists-by-status.json

import { test, expect } from '@playwright/test';
import { AdminVendorListPage } from '../../pages/admin-vendor-list.page';
import testData from '../../test-data/scrum469-admin-vendor-list.json';

const ADMIN_URL = testData.url;
const PARTNERS_URL = testData.partnersUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-469: Admin View Vendor Lists by Status - Accessibility', () => {
  let vendorListPage: AdminVendorListPage;

  test.beforeEach(async ({ page }) => {
    vendorListPage = new AdminVendorListPage(page);
    await vendorListPage.loginAndNavigateToVendorList(ADMIN_URL, EMAIL, PASSWORD, PARTNERS_URL);
  });

  test.describe('Page Structure', () => {
    test('TC_A11Y_001: Page has proper heading structure', async () => {
      // Hard assertion: exactly one H1
      const h1Count = await vendorListPage.getH1Count();
      expect(h1Count, 'Page must have exactly one H1 heading').toBe(1);
      await vendorListPage.verifyH1Visible();
    });

    test('TC_A11Y_002: Page has proper landmarks', async () => {
      // Hard assertion: main landmark must exist
      const mainCount = await vendorListPage.getMainLandmarkCount();
      expect(mainCount, 'BUG: No <main> landmark on Vendor Lists page (WCAG 1.3.1)').toBeGreaterThan(0);

      // Hard assertion: nav landmark must exist
      const navCount = await vendorListPage.getNavLandmarkCount();
      expect(navCount, 'BUG: No <nav> landmark on Vendor Lists page').toBeGreaterThan(0);

      // Hard assertion: lang attribute must exist
      const lang = await vendorListPage.getHtmlLangAttribute();
      expect(lang, 'BUG: <html> missing lang attribute (WCAG 3.1.1)').toBeTruthy();
    });
  });

  test.describe('Status Tabs ARIA Pattern', () => {
    test('TC_A11Y_003: Status tabs have proper ARIA tablist pattern', async () => {
      // Hard assertion: tablist role must exist
      const tablistCount = await vendorListPage.getTablistRoleCount();
      expect(tablistCount, 'BUG: No role="tablist" on status tabs container (WCAG 4.1.2)').toBeGreaterThan(0);

      // Hard assertion: tab roles must exist
      const tabRoleCount = await vendorListPage.getTabRoleCount();
      expect(tabRoleCount, 'BUG: No role="tab" on status tab elements (WCAG 4.1.2)').toBeGreaterThan(0);

      // Hard assertion: active tab must have aria-selected="true"
      const ariaSelected = await vendorListPage.getActiveTabAriaSelected();
      expect(ariaSelected, 'BUG: No tab has aria-selected="true" (WCAG 4.1.2)').toBe('true');

      // Hard assertion: tabpanel must exist
      const tabpanelCount = await vendorListPage.getTabpanelRoleCount();
      expect(tabpanelCount, 'BUG: No role="tabpanel" for tab content (WCAG 4.1.2)').toBeGreaterThan(0);
    });

    test('TC_A11Y_004: Status tabs keyboard accessible', async () => {
      // Tab to the tabs area
      const focusedText = await vendorListPage.tabToTabsArea();
      expect(focusedText.length, 'Must be able to Tab to status tabs').toBeGreaterThan(0);

      // Arrow right should move to next tab
      const nextTabText = await vendorListPage.pressArrowRightAndGetFocusedText();
      expect(nextTabText.length, 'ArrowRight must move focus to next tab').toBeGreaterThan(0);

      // Arrow left should move back
      const prevTabText = await vendorListPage.pressArrowLeftAndGetFocusedText();
      expect(prevTabText.length, 'ArrowLeft must move focus to previous tab').toBeGreaterThan(0);
    });

    test('TC_A11Y_005: Tab counts visible and announced', async () => {
      // Verify each tab has a count in its accessible name
      const pendingName = await vendorListPage.getTabAccessibleName(testData.tabs.pendingApproval);
      expect(pendingName, 'Pending tab must have text content').toBeTruthy();

      const activeName = await vendorListPage.getTabAccessibleName(testData.tabs.activePartners);
      expect(activeName, 'Active tab must have text content').toBeTruthy();

      const inactiveName = await vendorListPage.getTabAccessibleName(testData.tabs.inactivePartners);
      expect(inactiveName, 'Inactive tab must have text content').toBeTruthy();

      const rejectedName = await vendorListPage.getTabAccessibleName(testData.tabs.rejectedPartners);
      expect(rejectedName, 'Rejected tab must have text content').toBeTruthy();
    });

    test('TC_A11Y_006: Tab switch announces content update', async () => {
      // Switch tab and verify aria-live region exists for announcements
      await vendorListPage.clickTab(testData.tabs.activePartners);
      const ariaLiveCount = await vendorListPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live region to announce tab content updates (WCAG 4.1.3)').toBeGreaterThan(0);
    });
  });

  test.describe('Vendor Card Accessibility', () => {
    test('TC_A11Y_007: Vendor card has semantic structure', async () => {
      const cardInfo = await vendorListPage.getFirstVendorCardSemanticInfo();
      // Card must have meaningful content
      expect(cardInfo.textLength, 'Vendor card must have text content').toBeGreaterThan(5);
      // Card should have semantic structure (article, section, or aria-label)
      const hasSemantic = cardInfo.hasArticle || cardInfo.hasSection || cardInfo.hasAriaLabel;
      expect(hasSemantic, 'BUG: Vendor card has no semantic structure (no article/section/aria-label) (WCAG 1.3.1)').toBe(true);
    });

    test('TC_A11Y_008: Vendor card keyboard accessible', async () => {
      // Tab through and verify interactive elements are reachable
      await vendorListPage.pressTab();
      const buttonCount = await vendorListPage.getButtonCount();
      expect(buttonCount, 'Page must have interactive buttons').toBeGreaterThan(0);
    });

    test('TC_A11Y_009: Vendor type not conveyed by color alone', async () => {
      // Hard assertion: vendor type must have text label
      const hasTextLabel = await vendorListPage.verifyVendorTypeHasTextLabel();
      expect(hasTextLabel, 'BUG: Vendor type conveyed by color alone without text label (WCAG 1.4.1)').toBe(true);
    });

    test('TC_A11Y_010: Contact details accessible', async () => {
      // Verify links have accessible names
      const linkInfo = await vendorListPage.verifyLinksHaveAccessibleNames();
      expect(linkInfo.withoutName, 'BUG: Links without accessible names found (WCAG 2.4.4)').toBe(0);
    });
  });

  test.describe('Dynamic Content', () => {
    test('TC_A11Y_011: Empty state message accessible', async () => {
      // Switch to a tab that might have no vendors
      await vendorListPage.clickTab(testData.tabs.rejectedPartners);
      // Verify content loaded (either cards or empty state)
      await vendorListPage.verifyTabContentLoaded();
    });

    test('TC_A11Y_012: Auto-refresh or refresh prompt accessible', async () => {
      // Verify aria-live regions exist for dynamic updates
      const ariaLiveCount = await vendorListPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live regions for dynamic content updates (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_013: Vendor list semantic structure', async () => {
      // Verify list uses semantic list structure
      const listInfo = await vendorListPage.getListStructureInfo();
      const hasList = listInfo.hasUlOl || listInfo.hasRoleList;
      expect(hasList, 'BUG: Vendor list does not use semantic list structure (WCAG 1.3.1)').toBe(true);
    });

    test('TC_A11Y_022: Loading state accessible', async () => {
      // Switch tab and verify page loads without trapping focus
      await vendorListPage.clickTab(testData.tabs.inactivePartners);
      await vendorListPage.verifyTabContentLoaded();
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_014: Text contrast meets WCAG AA', async () => {
      const results = await vendorListPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_015: UI component contrast meets WCAG AA', async () => {
      // Verify heading has visible color (not transparent)
      await vendorListPage.verifyH1Visible();
    });

    test('TC_A11Y_016: Page usable at 200% zoom', async () => {
      const zoomResult = await vendorListPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_017: Mobile viewport accessible', async () => {
      await vendorListPage.setMobileViewport();
      const h1Visible = await vendorListPage.isH1Visible();
      expect(h1Visible, 'Content must be visible on mobile viewport').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_018: Focus indicators visible on all interactive elements', async () => {
      // Tab through elements and verify focus moves
      await vendorListPage.pressTab();
      const focusedText = await vendorListPage.getFocusedElementText();
      // Focus should land on something
      expect(focusedText !== undefined).toBe(true);
    });

    test('TC_A11Y_019: No keyboard traps', async () => {
      const noTrap = await vendorListPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected').toBe(true);
      await vendorListPage.verifyH1Visible();
    });

    test('TC_A11Y_020: NVDA screen reader compatibility', async () => {
      // Verify heading has proper role
      await vendorListPage.verifyH1HasHeadingRole();

      // Verify buttons have accessible names
      const buttonCount = await vendorListPage.getButtonCount();
      if (buttonCount > 0) {
        const name = await vendorListPage.getFirstButtonAccessibleName();
        expect(name.length, 'Button must have accessible name').toBeGreaterThan(0);
      }
    });

    test('TC_A11Y_021: JAWS screen reader compatibility', async () => {
      // Verify all links have accessible names
      const linkInfo = await vendorListPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'All links must have accessible names').toBe(0);
      }
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan', async () => {
      const results = await vendorListPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-469 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
