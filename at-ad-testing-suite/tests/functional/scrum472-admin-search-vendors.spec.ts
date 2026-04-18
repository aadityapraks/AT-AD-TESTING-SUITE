// spec: specs/functional/SCRUM-472-admin-search-vendors.json

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum472-admin-search-vendors.json';
import { AdminSearchVendorsPage } from '../../pages/admin-search-vendors.page';

let searchPage: AdminSearchVendorsPage;

test.describe('SCRUM-472: Admin Search Vendors', () => {
  test.setTimeout(120000);

  test.beforeEach(async ({ page }) => {
    searchPage = new AdminSearchVendorsPage(page);
  });

  test.describe('Search Field Behavior', () => {
    test('TC_SCRUM472_001: Verify search input field is visible on the vendor list page', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.verifySearchFieldVisible();
      await searchPage.verifySearchFieldPlaceholder();
    });

    test('TC_SCRUM472_013: Verify clearing the search field restores the full vendor list', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.clickTab(testData.TC_SCRUM472_013.inputs.tab);
      // Enter a search query
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_013.inputs.vendorName);
      // Clear the search field
      await searchPage.clearSearchField();
      // Verify vendor cards are restored
      await searchPage.verifyVendorCardsRestoredAfterClear();
    });
  });

  test.describe('AC1 - Search By Vendor Name', () => {
    test('TC_SCRUM472_002: Verify search by vendor name returns correct results', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.clickTab(testData.TC_SCRUM472_002.inputs.tab);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_002.inputs.vendorName);
      await searchPage.verifySearchResultsOrNoResults(testData.TC_SCRUM472_002.inputs.vendorName);
    });
  });

  test.describe('AC1 - Search By Location', () => {
    test('TC_SCRUM472_003: Verify search by location returns correct results', async ({ page }) => {

      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.clickTab(testData.TC_SCRUM472_003.inputs.tab);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_003.inputs.location);
      await searchPage.verifySearchResultsOrNoResults(testData.TC_SCRUM472_003.inputs.location);
    });
  });

  test.describe('AC1 - Search By Contact Person', () => {
    test('TC_SCRUM472_004: Verify search by contact person returns correct results', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.clickTab(testData.TC_SCRUM472_004.inputs.tab);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_004.inputs.contactPerson);
      await searchPage.verifySearchResultsOrNoResults(testData.TC_SCRUM472_004.inputs.contactPerson);
    });
  });

  test.describe('AC2 - Dynamic Or Submit Results', () => {
    test('TC_SCRUM472_005: Verify search works on submit (Enter key or search button)', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.clickTab(testData.TC_SCRUM472_005.inputs.tab);
      await searchPage.enterSearchQueryAndSubmit(testData.TC_SCRUM472_005.inputs.vendorName);
      await searchPage.verifySearchResultsOrNoResults(testData.TC_SCRUM472_005.inputs.vendorName);
    });
  });

  test.describe('AC3 - Search Across All Tabs', () => {
    test('TC_SCRUM472_006: Verify search works across the Pending Approval tab', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.clickTab(testData.TC_SCRUM472_006.inputs.tab);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_006.inputs.vendorName);
      await searchPage.verifySearchResultsOrNoResults(testData.TC_SCRUM472_006.inputs.vendorName);
    });

    test('TC_SCRUM472_007: Verify search works across the Active Partners tab', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.clickTab(testData.TC_SCRUM472_007.inputs.tab);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_007.inputs.vendorName);
      await searchPage.verifySearchResultsOrNoResults(testData.TC_SCRUM472_007.inputs.vendorName);
    });

    test('TC_SCRUM472_008: Verify search works across the Inactive Partners tab', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.clickTab(testData.TC_SCRUM472_008.inputs.tab);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_008.inputs.vendorName);
      await searchPage.verifySearchResultsOrNoResults(testData.TC_SCRUM472_008.inputs.vendorName);
    });

    test('TC_SCRUM472_009: Verify search works across the Rejected Partners tab', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.clickTab(testData.TC_SCRUM472_009.inputs.tab);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_009.inputs.vendorName);
      await searchPage.verifySearchResultsOrNoResults(testData.TC_SCRUM472_009.inputs.vendorName);
    });
  });

  test.describe('Edge Case - No Matching Results', () => {
    test('TC_SCRUM472_010: Verify No vendors found message when no results match', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_010.inputs.nonMatchingQuery);
      await searchPage.verifyNoSearchResultsMessage();
    });
  });

  test.describe('Edge Case - Special Characters', () => {
    test('TC_SCRUM472_011: Verify special characters do not break search', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_011.inputs.specialChars);
      await searchPage.verifySpecialCharsHandledGracefully();
    });
  });

  test.describe('Edge Case - Long Queries', () => {
    test('TC_SCRUM472_012: Verify very long search query is handled gracefully', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await searchPage.verifyLongQueryHandledGracefully(testData.TC_SCRUM472_012.inputs.longQuery);
    });
  });

  test.describe('Accessibility', () => {
    test('TC_SCRUM472_014: Verify search input field is accessible via keyboard', async ({ page }) => {
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      const accessible = await searchPage.verifySearchFieldKeyboardAccessible();
      expect(accessible).toBe(true);
    });
  });

  test.describe('End-to-End Flow', () => {
    test('TC_SCRUM472_015: Verify complete search vendors flow end-to-end', async ({ page }) => {
      // Step 1: Navigate to vendor list page
      await searchPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);

      // Step 2: Verify search field is visible
      await searchPage.verifySearchFieldVisible();

      // Step 3: Search by vendor name — verify correct result
      await searchPage.clickTab(testData.TC_SCRUM472_002.inputs.tab);
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_002.inputs.vendorName);
      await searchPage.verifySearchResultsOrNoResults(testData.TC_SCRUM472_002.inputs.vendorName);

      // Step 4: Clear search — verify full list restores
      await searchPage.clearSearchField();
      await searchPage.verifyVendorCardsRestoredAfterClear();

      // Step 5: Enter a non-matching query — verify 'No search results' message
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_010.inputs.nonMatchingQuery);
      await searchPage.verifyNoSearchResultsMessage();

      // Step 6: Enter special characters — verify no errors
      await searchPage.clearSearchField();
      await searchPage.enterSearchQuery(testData.TC_SCRUM472_011.inputs.specialChars);
      await searchPage.verifySpecialCharsHandledGracefully();
    });
  });
});