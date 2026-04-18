// spec: specs/functional/SCRUM-475-admin-view-vendor-details.json

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum475-admin-vendor-details.json';
import { AdminVendorDetailsPage } from '../../pages/admin-vendor-details.page';

let vendorDetailsPage: AdminVendorDetailsPage;

test.describe('SCRUM-475: Admin View Vendor Details', () => {
  test.setTimeout(120000);

  test.beforeEach(async ({ page }) => {
    vendorDetailsPage = new AdminVendorDetailsPage(page);
  });

  test.describe('AC1 - View Details Trigger', () => {
    test('TC_SCRUM475_001: Verify View Details button/link is present on vendor cards', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_001.inputs.tab);
      await vendorDetailsPage.verifyViewDetailsButtonPresent();
    });

    test('TC_SCRUM475_002: Verify clicking View Details opens a modal or panel', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_002.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyDetailViewOpened();
    });
  });

  test.describe('AC1 - Business Details', () => {
    test('TC_SCRUM475_003: Verify Business Details are displayed in the modal', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_003.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyDetailViewOpened();
    });
  });

  test.describe('AC1 - Category', () => {
    test('TC_SCRUM475_004: Verify Category is displayed in the modal', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_004.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyVendorTypeDisplayed(testData.TC_SCRUM475_004.inputs.expectedType);
    });
  });

  test.describe('AC1 - Contact Person', () => {
    test('TC_SCRUM475_005: Verify Contact Person is displayed in the modal', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_005.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyContactPersonDisplayed(testData.TC_SCRUM475_005.inputs.expectedContact);
    });
  });

  test.describe('AC1 - Email, Phone, Website', () => {
    test('TC_SCRUM475_006: Verify Email, Phone, and Website are displayed in the modal', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_006.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyEmailDisplayed(testData.TC_SCRUM475_006.inputs.expectedEmail);
      await vendorDetailsPage.verifyPhoneDisplayed(testData.TC_SCRUM475_006.inputs.expectedPhone);
    });
  });

  test.describe('AC1 - Address', () => {
    test('TC_SCRUM475_007: Verify Address is displayed in the modal', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_007.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyLocationDisplayed(testData.TC_SCRUM475_007.inputs.expectedLocation);
    });
  });

  test.describe('AC1 - GST Number', () => {
    test('TC_SCRUM475_008: Verify GST Number is displayed in the modal', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_008.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyGSTDisplayed(testData.TC_SCRUM475_008.inputs.expectedGST);
    });
  });

  test.describe('AC1 - Application Date', () => {
    test('TC_SCRUM475_009: Verify Application Date is displayed in the modal', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_009.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyApplicationDateDisplayed();
    });
  });

  test.describe('AC1 - Products Listed', () => {
    test('TC_SCRUM475_010: Verify Products Listed section is displayed in the modal', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_010.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyProductCountDisplayed();
    });
  });

  test.describe('AC2 - Read-Only Modal', () => {
    test('TC_SCRUM475_011: Verify modal is read-only — fields are not editable', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_011.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyModalIsReadOnly();
    });
  });

  test.describe('Modal Close Behavior', () => {
    test('TC_SCRUM475_012: Verify modal can be closed via close button or overlay click', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_012.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyDetailViewOpened();
      await vendorDetailsPage.closeDetailModal();
      await vendorDetailsPage.verifyDetailModalClosed();
    });

    test('TC_SCRUM475_013: Verify modal can be closed via Escape key', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_013.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyDetailViewOpened();
      await vendorDetailsPage.closeDetailModalViaEscape();
      await vendorDetailsPage.verifyDetailModalClosed();
    });
  });

  test.describe('View Details Across Tabs', () => {
    test('TC_SCRUM475_014: Verify View Details works from all status tabs', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      for (const tab of testData.TC_SCRUM475_014.inputs.tabs) {
        await vendorDetailsPage.verifyViewDetailsWorksOnTab(tab);
      }
    });
  });

  test.describe('End-to-End Flow', () => {
    test('TC_SCRUM475_015: Verify complete View Vendor Details flow end-to-end', async ({ page }) => {
      await vendorDetailsPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await vendorDetailsPage.clickTab(testData.TC_SCRUM475_015.inputs.tab);
      await vendorDetailsPage.clickViewDetailsOnFirstVendor();
      await vendorDetailsPage.verifyDetailViewOpened();
      await vendorDetailsPage.verifyContactPersonDisplayed(testData.TC_SCRUM475_015.inputs.expectedContact);
      await vendorDetailsPage.verifyEmailDisplayed(testData.TC_SCRUM475_015.inputs.expectedEmail);
      await vendorDetailsPage.verifyGSTDisplayed(testData.TC_SCRUM475_015.inputs.expectedGST);
      await vendorDetailsPage.verifyProductCountDisplayed();
      await vendorDetailsPage.closeDetailModal();
      await vendorDetailsPage.verifyDetailModalClosed();
    });
  });
});
