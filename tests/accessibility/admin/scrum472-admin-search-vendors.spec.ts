// spec: specs/a11y/SCRUM-472-admin-search-vendors.json

import { test, expect } from '@playwright/test';
import { AdminSearchVendorsPage } from '../../../pages/admin-search-vendors.page';
import testData from '../../../test-data/scrum472-admin-search-vendors.json';

const ADMIN_URL = testData.url;
const PARTNERS_URL = testData.partnersUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-472: Admin Search Vendors - Accessibility', () => {
  let searchPage: AdminSearchVendorsPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new AdminSearchVendorsPage(page);
    await searchPage.loginAndNavigateToPartners(ADMIN_URL, EMAIL, PASSWORD, PARTNERS_URL);
  });

  test.describe('Search Input Accessibility', () => {
    test('TC_A11Y_001: Search input has proper label', async () => {
      const labelInfo = await searchPage.getSearchInputLabelInfo();
      // Hard assertion: search input must have an accessible name
      const hasAccessibleName = labelInfo.hasAriaLabel || labelInfo.hasLabel;
      expect(hasAccessibleName, 'BUG: Search input has no accessible label (no aria-label, no associated <label>) (WCAG 4.1.2)').toBe(true);
      // Placeholder should not be the sole label
      if (!labelInfo.hasAriaLabel && !labelInfo.hasLabel) {
        expect(labelInfo.hasPlaceholder, 'Search input must have at least a placeholder if no label').toBe(true);
      }
    });

    test('TC_A11Y_002: Search input keyboard accessible', async () => {
      // Tab to search input
      const reached = await searchPage.tabToSearchInput();
      expect(reached, 'Search input must be reachable via Tab key (WCAG 2.1.1)').toBe(true);
    });

    test('TC_A11Y_007: Search clear button accessible', async () => {
      // Type a query first to trigger clear button
      await searchPage.enterSearchQuery('test');
      const clearInfo = await searchPage.getClearButtonAccessibility();
      if (clearInfo.exists) {
        expect(clearInfo.hasName, 'BUG: Clear button has no accessible name (WCAG 4.1.2)').toBe(true);
      }
      // If no clear button exists, that's acceptable (not a bug)
    });

    test('TC_A11Y_015: Focus indicators visible on search elements', async () => {
      // Tab to search and verify focus moves
      const reached = await searchPage.tabToSearchInput();
      expect(reached, 'Must be able to Tab to search input').toBe(true);
      const isFocused = await searchPage.isSearchInputFocused();
      expect(isFocused, 'Search input must receive focus').toBe(true);
    });
  });

  test.describe('Dynamic Results Announcements', () => {
    test('TC_A11Y_003: Search results update announced dynamically', async () => {
      // Type a search query
      await searchPage.enterSearchQuery('Asgard');
      // Hard assertion: aria-live region must exist for announcements
      const ariaLiveCount = await searchPage.getAriaLiveRegionCount();
      expect(ariaLiveCount, 'BUG: No aria-live region to announce search results dynamically (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_004: No results message accessible', async () => {
      // Type a query that returns no results
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_010.inputs.nonMatchingQuery);
      const noResultsInfo = await searchPage.getNoResultsMessageAccessibility();
      expect(noResultsInfo.isVisible, 'No results message must be displayed').toBe(true);
      // Hard assertion: message must have role or aria-live for screen readers
      const hasAccessibleAnnouncement = noResultsInfo.hasRole || noResultsInfo.hasAriaLive;
      expect(hasAccessibleAnnouncement, 'BUG: No-results message has no role="status" or aria-live (WCAG 4.1.3)').toBe(true);
    });

    test('TC_A11Y_005: Partial match results accessible (min 3 characters)', async () => {
      // Type 3 characters and verify results update
      await searchPage.enterSearchQuery('Asg');
      await searchPage.verifySearchResultsUpdate();
    });

    test('TC_A11Y_006: Search works across all tabs', async () => {
      // Search in Active tab
      await searchPage.clickTab('Active');
      await searchPage.enterSearchQuery('Asgard');
      await searchPage.verifySearchResultsUpdate();
    });

    test('TC_A11Y_011: Search loading state accessible', async () => {
      // Type query and verify page doesn't trap focus
      await searchPage.enterSearchQuery('test');
      const noTrap = await searchPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard must not be trapped during search loading').toBe(true);
    });
  });

  test.describe('Search Results Structure', () => {
    test('TC_A11Y_008: Search results list semantic structure', async () => {
      // Perform search that returns results
      await searchPage.enterSearchQuery('Asgard');
      const listInfo = await searchPage.getResultsListStructure();
      const hasList = listInfo.hasUlOl || listInfo.hasRoleList;
      expect(hasList, 'BUG: Search results do not use semantic list structure (WCAG 1.3.1)').toBe(true);
    });

    test('TC_A11Y_009: Search handles special characters gracefully', async () => {
      // Type special characters
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_011.inputs.specialChars);
      await searchPage.verifySpecialCharsHandledGracefully();
    });

    test('TC_A11Y_010: Long search query handled gracefully', async () => {
      await searchPage.verifyLongQueryHandledGracefully(testData.TC_SCRUM472_012.inputs.longQuery);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_012: Text contrast meets WCAG AA', async () => {
      const results = await searchPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations`).toBe(0);
    });

    test('TC_A11Y_013: Search usable at 200% zoom', async () => {
      const zoomResult = await searchPage.checkZoom200();
      expect(zoomResult.h1Visible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_014: Search accessible on mobile viewport', async () => {
      await searchPage.setMobileViewport();
      const h1Visible = await searchPage.isH1Visible();
      expect(h1Visible, 'Content must be visible on mobile viewport').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_016: NVDA screen reader compatibility', async () => {
      // Verify heading has proper role
      await searchPage.verifyH1HasHeadingRole();
      // Verify search input has accessible name
      const labelInfo = await searchPage.getSearchInputLabelInfo();
      const hasName = labelInfo.hasAriaLabel || labelInfo.hasLabel || labelInfo.hasPlaceholder;
      expect(hasName, 'Search input must be identifiable by screen reader').toBe(true);
    });

    test('TC_A11Y_017: JAWS screen reader compatibility', async () => {
      // Verify links have accessible names
      const linkInfo = await searchPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'All links must have accessible names').toBe(0);
      }
    });

    test('TC_A11Y_018: No keyboard traps in search flow', async () => {
      // Type in search then Tab away
      await searchPage.enterSearchQuery('test');
      const noTrap = await searchPage.verifyNoKeyboardTrap();
      expect(noTrap, 'Keyboard trap detected in search flow').toBe(true);
      await searchPage.verifyH1Visible();
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan', async () => {
      const results = await searchPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-472 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
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
