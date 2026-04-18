// spec: specs/functional/SCRUM-478-admin-approve-vendor.json

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum478-admin-approve-vendor.json';
import { AdminApproveVendorPage } from '../../pages/admin-approve-vendor.page';

let approveVendorPage: AdminApproveVendorPage;

test.describe('SCRUM-478: Admin Approve Vendor Application', () => {
  test.setTimeout(120000);

  test.beforeEach(async ({ page }) => {
    approveVendorPage = new AdminApproveVendorPage(page);
  });

  test.describe('AC1 - Approve Button Visibility', () => {
    test('TC_SCRUM478_001: Verify Approve button is visible for Pending vendors', async ({ page }) => {
      await approveVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await approveVendorPage.clickTab(testData.TC_SCRUM478_001.inputs.tab);
      await approveVendorPage.verifyApproveButtonVisible();
    });

    test('TC_SCRUM478_002: Verify Approve button is NOT visible for Active vendors', async ({ page }) => {
      await approveVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await approveVendorPage.verifyApproveButtonNotVisibleInViewDetails(testData.TC_SCRUM478_002.inputs.tab);
    });

    test('TC_SCRUM478_003: Verify Approve button is NOT visible for Inactive vendors', async ({ page }) => {
      await approveVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await approveVendorPage.verifyApproveButtonNotVisibleInViewDetails(testData.TC_SCRUM478_003.inputs.tab);
    });

    test('TC_SCRUM478_004: Verify Approve button is NOT visible for Rejected vendors', async ({ page }) => {
      await approveVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await approveVendorPage.verifyApproveButtonNotVisibleInViewDetails(testData.TC_SCRUM478_004.inputs.tab);
    });
  });

  test.describe('AC2 - Status Change To Active', () => {
    test('TC_SCRUM478_005: Verify vendor status changes to Active on approval', async ({ page }) => {
      await approveVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await approveVendorPage.clickTab(testData.TC_SCRUM478_005.inputs.tab);
      const vendorName = await approveVendorPage.getFirstPendingVendorName();
      await approveVendorPage.clickApproveOnFirstVendor();
      await approveVendorPage.handleApprovalConfirmation();
      await approveVendorPage.verifyVendorStatusActive();
    });
  });

  test.describe('AC3 - Approval Timestamp Recorded', () => {
    test('TC_SCRUM478_006: Verify approval timestamp is recorded', async ({ page }) => {
      await approveVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await approveVendorPage.openViewDetailsOnActiveVendor();
      await approveVendorPage.verifyApprovalTimestampRecorded();
    });
  });

  test.describe('Accessibility', () => {
    test('TC_SCRUM478_007: Verify Approve button is accessible via keyboard', async ({ page }) => {
      await approveVendorPage.loginAndNavigateToPartners(testData.url, testData.credentials.email, testData.credentials.password, testData.partnersUrl);
      await approveVendorPage.clickTab(testData.TC_SCRUM478_007.inputs.tab);
      const accessible = await approveVendorPage.verifyApproveButtonKeyboardAccessible();
      expect(accessible).toBe(true);
    });
  });
});
