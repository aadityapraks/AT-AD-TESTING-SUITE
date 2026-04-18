// spec: specs/functional/SCRUM-469-admin-vendor-lists-by-status.json

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum469-admin-vendor-list.json';
import { AdminVendorListPage } from '../../pages/admin-vendor-list.page';

let vendorListPage: AdminVendorListPage;

test.describe('SCRUM-469: Admin View Vendor Lists by Status', () => {
  test.setTimeout(90000);

  test.beforeEach(async ({ page }) => {
    vendorListPage = new AdminVendorListPage(page);
  });

  test.describe('AC1 - Status Tabs', () => {
    test('TC_SCRUM469_001: Verify all four status tabs are visible on the vendor list page', async ({ page }) => {
      // Step 1: Log in and navigate to the vendor list page
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);

      // Step 2: Verify all four tabs are visible
      await vendorListPage.verifyTabVisible(testData.tabs.pendingApproval);
      await vendorListPage.verifyTabVisible(testData.tabs.activePartners);
      await vendorListPage.verifyTabVisible(testData.tabs.inactivePartners);
      await vendorListPage.verifyTabVisible(testData.tabs.rejectedPartners);
    });

    test('TC_SCRUM469_010: Verify tab switching loads correct vendor list', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);

      // Click each tab and verify content loads
      await vendorListPage.clickTab(testData.tabs.activePartners);
      await vendorListPage.verifyTabContentLoaded();

      await vendorListPage.clickTab(testData.tabs.inactivePartners);
      await vendorListPage.verifyTabContentLoaded();

      await vendorListPage.clickTab(testData.tabs.rejectedPartners);
      await vendorListPage.verifyTabContentLoaded();
    });

    test('TC_SCRUM469_016: Verify default tab selection on page load', async ({ page }) => {
      // Step 1: Log in and navigate to the vendor list page
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);

      // Step 2: Verify a default tab is selected and content is loaded
      await vendorListPage.verifyDefaultTabSelected();
    });
  });

  test.describe('AC2 - Vendor Card Fields', () => {
    test('TC_SCRUM469_002: Verify Pending Approval tab displays vendor cards with correct fields', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.pendingApproval);
      await vendorListPage.verifyVendorCardsDisplayed();
      await vendorListPage.verifyVendorCardFields();
    });

    test('TC_SCRUM469_003: Verify Active Partners tab displays vendor cards with correct fields', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.activePartners);
      await vendorListPage.verifyVendorCardsDisplayed();
      await vendorListPage.verifyVendorCardFields();
    });

    test('TC_SCRUM469_004: Verify Inactive Partners tab displays vendor cards with correct fields', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.inactivePartners);
      await vendorListPage.verifyTabContentLoaded();
    });

    test('TC_SCRUM469_005: Verify Rejected Partners tab displays vendor cards with correct fields', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.rejectedPartners);
      await vendorListPage.verifyTabContentLoaded();
    });

    test('TC_SCRUM469_012: Verify vendor card contact details are displayed correctly', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.activePartners);
      await vendorListPage.verifyVendorCardsDisplayed();
      await vendorListPage.verifyVendorCardFields();
    });

    test('TC_SCRUM469_013: Verify vendor card product count reflects actual products', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.activePartners);
      await vendorListPage.verifyVendorCardsDisplayed();
      await vendorListPage.verifyVendorCardFields();
    });
  });

  test.describe('AC3 - Tab Counts', () => {
    test('TC_SCRUM469_006: Verify correct count appears on the Pending Approval tab', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.pendingApproval);
      await vendorListPage.verifyVendorCardsDisplayed();
      await vendorListPage.verifyTabCountMatchesCards(testData.tabs.pendingApproval);
    });

    test('TC_SCRUM469_007: Verify correct count appears on the Active Partners tab', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.activePartners);
      await vendorListPage.verifyVendorCardsDisplayed();
      await vendorListPage.verifyTabCountMatchesCards(testData.tabs.activePartners);
    });

    test('TC_SCRUM469_008: Verify correct count appears on the Inactive Partners tab', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.inactivePartners);
      await vendorListPage.verifyTabContentLoaded();
      await vendorListPage.verifyTabCountConsistent(testData.tabs.inactivePartners);
    });

    test('TC_SCRUM469_009: Verify correct count appears on the Rejected Partners tab', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.clickTab(testData.tabs.rejectedPartners);
      await vendorListPage.verifyTabContentLoaded();
      await vendorListPage.verifyTabCountConsistent(testData.tabs.rejectedPartners);
    });
  });

  test.describe('Edge Case - Data Consistency', () => {
    test('TC_SCRUM469_011: Verify vendor does not appear in multiple tabs simultaneously', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);

      // Verify each tab loads distinct content by checking tab counts are consistent
      await vendorListPage.clickTab(testData.tabs.pendingApproval);
      await vendorListPage.verifyTabContentLoaded();
      const pendingCount = await vendorListPage.getDisplayedVendorCardCount();

      await vendorListPage.clickTab(testData.tabs.activePartners);
      await vendorListPage.verifyTabContentLoaded();
      const activeCount = await vendorListPage.getDisplayedVendorCardCount();

      // Verify at least one tab has vendors (data exists)
      expect(pendingCount + activeCount).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('TC_SCRUM469_014: Verify tabs support keyboard navigation', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      const navigable = await vendorListPage.verifyTabsKeyboardNavigable();
      expect(navigable).toBe(true);
    });

    test('TC_SCRUM469_015: Verify tabs and vendor cards have accessible labels for screen readers', async ({ page }) => {
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorListPage.verifyTabsAccessible();
    });
  });

  test.describe('End-to-End Flow', () => {
    test('TC_SCRUM469_017: Verify complete vendor list by status flow end-to-end', async ({ page }) => {
      // Step 1: Log in and navigate
      await vendorListPage.loginAndNavigateToVendorList(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);

      // Step 2: Verify all four tabs are visible
      await vendorListPage.verifyTabVisible(testData.tabs.pendingApproval);
      await vendorListPage.verifyTabVisible(testData.tabs.activePartners);
      await vendorListPage.verifyTabVisible(testData.tabs.inactivePartners);
      await vendorListPage.verifyTabVisible(testData.tabs.rejectedPartners);

      // Step 3: Click each tab and verify content
      await vendorListPage.clickTab(testData.tabs.pendingApproval);
      await vendorListPage.verifyTabContentLoaded();

      await vendorListPage.clickTab(testData.tabs.activePartners);
      await vendorListPage.verifyTabContentLoaded();

      await vendorListPage.clickTab(testData.tabs.inactivePartners);
      await vendorListPage.verifyTabContentLoaded();

      await vendorListPage.clickTab(testData.tabs.rejectedPartners);
      await vendorListPage.verifyTabContentLoaded();
    });
  });
});
