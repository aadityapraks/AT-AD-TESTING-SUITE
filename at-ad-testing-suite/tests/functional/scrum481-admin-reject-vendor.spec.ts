// spec: specs/functional/SCRUM-481-admin-reject-vendor.json

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum481-admin-reject-vendor.json';
import { AdminRejectVendorPage } from '../../pages/admin-reject-vendor.page';

let rejectVendorPage: AdminRejectVendorPage;

test.describe('SCRUM-481: Admin Reject Vendor Application', () => {
  test.setTimeout(120000);

  test.beforeEach(async ({ page }) => {
    rejectVendorPage = new AdminRejectVendorPage(page);
  });

  test.describe('AC1 - Reject Button Visibility', () => {
    test('TC_SCRUM481_001: Verify Reject button is visible for Pending vendors', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.clickTab(testData.TC_SCRUM481_001.inputs.tab);
      await rejectVendorPage.verifyRejectButtonVisible();
    });

    test('TC_SCRUM481_002: Verify Reject button is NOT visible for Active vendors', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.verifyRejectButtonNotVisibleInViewDetails(testData.TC_SCRUM481_002.inputs.tab);
    });

    test('TC_SCRUM481_003: Verify Reject button is NOT visible for Inactive vendors', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.verifyRejectButtonNotVisibleInViewDetails(testData.TC_SCRUM481_003.inputs.tab);
    });

    test('TC_SCRUM481_004: Verify Reject button is NOT visible for already Rejected vendors', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.verifyRejectButtonNotVisibleInViewDetails(testData.TC_SCRUM481_004.inputs.tab);
    });
  });

  test.describe('AC2 - Mandatory Rejection Reason', () => {
    test('TC_SCRUM481_005: Verify clicking Reject opens a rejection reason input', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.clickTab(testData.TC_SCRUM481_005.inputs.tab);
      await rejectVendorPage.clickRejectOnFirstVendor();
      await rejectVendorPage.verifyRejectionReasonInputVisible();
      await rejectVendorPage.verifyRejectionReasonEmpty();
      await rejectVendorPage.verifyRejectionConfirmButtonPresent();
    });

    test('TC_SCRUM481_007: Verify confirmation button becomes active after entering a rejection reason', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.clickTab(testData.TC_SCRUM481_007.inputs.tab);
      await rejectVendorPage.clickRejectOnFirstVendor();
      await rejectVendorPage.verifyConfirmButtonEnabledWithReason(testData.TC_SCRUM481_007.inputs.rejectionReason);
    });
  });

  test.describe('Edge Case - No Reason Button Deactivated', () => {
    test('TC_SCRUM481_006: Verify confirmation button is deactivated when no rejection reason is provided', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.clickTab(testData.TC_SCRUM481_006.inputs.tab);
      await rejectVendorPage.clickRejectOnFirstVendor();
      await rejectVendorPage.verifyConfirmButtonDisabledWithoutReason();
    });
  });

  test.describe('AC4 - Vendor Status To Rejected', () => {
    test('TC_SCRUM481_008: Verify vendor status changes to Rejected after confirmed rejection', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.clickTab(testData.TC_SCRUM481_008.inputs.tab);
      await rejectVendorPage.clickRejectOnFirstVendor();
      await rejectVendorPage.enterRejectionReason(testData.TC_SCRUM481_008.inputs.rejectionReason);
      await rejectVendorPage.clickConfirmRejection();
    });

    test('TC_SCRUM481_009: Verify rejected vendor moves from Pending Approval to Rejected Partners tab', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.clickTab(testData.TC_SCRUM481_009.inputs.tab);
      const vendorName = await rejectVendorPage.getFirstPendingVendorName();
      await rejectVendorPage.clickRejectOnFirstVendor();
      await rejectVendorPage.enterRejectionReason(testData.TC_SCRUM481_009.inputs.rejectionReason);
      await rejectVendorPage.clickConfirmRejection();
      await rejectVendorPage.verifyVendorInRejectedTab(vendorName);
    });
  });

  test.describe('Accessibility', () => {
    test('TC_SCRUM481_010: Verify Reject button and reason input are accessible via keyboard', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.clickTab(testData.TC_SCRUM481_010.inputs.tab);
      const accessible = await rejectVendorPage.verifyRejectKeyboardAccessible();
      expect(accessible).toBe(true);
    });
  });

  test.describe('End-to-End Flow', () => {
    test('TC_SCRUM481_011: Verify complete Reject Vendor flow end-to-end', async ({ page }) => {
      await rejectVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await rejectVendorPage.clickTab(testData.TC_SCRUM481_011.inputs.tab);

      // Verify Reject button is visible
      await rejectVendorPage.verifyRejectButtonVisible();

      // Note vendor name, click Reject, enter reason, confirm
      const vendorName = await rejectVendorPage.getFirstPendingVendorName();
      await rejectVendorPage.clickRejectOnFirstVendor();
      await rejectVendorPage.verifyRejectionReasonInputVisible();
      await rejectVendorPage.enterRejectionReason(testData.TC_SCRUM481_011.inputs.rejectionReason);
      await rejectVendorPage.clickConfirmRejection();

      // Verify vendor moved to Rejected tab
      await rejectVendorPage.verifyVendorInRejectedTab(vendorName);
    });
  });
});
