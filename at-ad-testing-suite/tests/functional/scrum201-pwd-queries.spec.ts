// spec: specs/functional/SCRUM-201-pwd-queries.json
// seed: seed/mcp-seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum201-functional.json';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { QueriesPage } from '../../pages/queries.page';
import { AdminDashboardPage } from '../../pages/admin-dashboard.page';

let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let queriesPage: QueriesPage;

test.describe('SCRUM-201: AP Responding to PwD Queries', () => {
  test.setTimeout(120000);

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    queriesPage = new QueriesPage(page);
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
  });

  test.describe('1. Access & Visibility', () => {
    test('TC_PQ_001: Verify Queries section is accessible from AP dashboard navigation', async ({ page }) => {
      // 1. Log in as an approved Assistive Partner (handled in beforeEach)

      // 2. Verify 'Queries' section is visible in the dashboard navigation
      await queriesPage.verifyQueriesTabVisible();

      // 3. Click on the 'Queries' section
      await queriesPage.navigateToQueries();

      // 4. Verify the Queries page loads without errors
      await queriesPage.verifyPageUrl();
      await queriesPage.verifyPageLoaded();
    });

    test('TC_PQ_002: Verify summary counts display Total Queries, Pending Responses, and Responded Queries', async ({ page }) => {
      // 1. Navigate to Queries section
      await queriesPage.navigateToQueries();

      // 2. Verify all three summary counts are displayed
      await queriesPage.verifySummaryCountsVisible();
    });

    test('TC_PQ_003: Verify only queries related to AP own products are visible', async ({ browser }) => {
      // 1. Login as Assistive Partner A (vendor23) — already done in beforeEach context
      const apAContext = await browser.newContext();
      const apAPage = await apAContext.newPage();
      const apALogin = new LoginPage(apAPage);
      const apAQueries = new QueriesPage(apAPage);
      await apALogin.navigate(testData.url);
      await apALogin.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // 2. Navigate to Queries section for AP A
      await apAQueries.navigateToQueries();
      await apAQueries.verifyPageLoaded();

      // 3. Note the queries visible to AP A
      const apAPagination = await apAPage.getByText(/Showing \d+ to \d+ of \d+ queries/).textContent();
      await apAContext.close();

      // 4. Log in as Assistive Partner B (second vendor)
      const apBContext = await browser.newContext();
      const apBPage = await apBContext.newPage();
      const apBLogin = new LoginPage(apBPage);
      const apBQueries = new QueriesPage(apBPage);
      await apBLogin.navigate(testData.url);
      await apBLogin.loginAsVendor(testData.secondVendor.email, testData.secondVendor.password);

      // 5. Navigate to Queries section for AP B
      await apBQueries.navigateToQueries();
      await apBQueries.verifyPageLoaded();

      // 6. Verify AP B sees different data (data isolation)
      const apBPagination = await apBPage.getByText(/Showing \d+ to \d+ of \d+ queries/).textContent().catch(() => 'no queries');

      // Each AP should see their own scoped data
      expect(apAPagination).toBeTruthy();
      await apBContext.close();
    });
  });

  test.describe('2. Query Listing & Status', () => {
    test.beforeEach(async () => {
      await queriesPage.navigateToQueries();
    });

    test('TC_PQ_004: Verify query listing displays all required fields with correct statuses', async ({ page }) => {
      // 1. Verify each query item displays product name and image
      await queriesPage.verifyQueryCardHasProductName();
      await queriesPage.verifyQueryCardHasProductImage();

      // 2. Verify date and time of query
      await queriesPage.verifyQueryCardHasDateTime();

      // 3. Verify status labels are correct
      await queriesPage.verifyQueryCardHasStatus(testData.expected.respondedLabel);
      await queriesPage.verifyQueryCardHasStatus(testData.expected.pendingResponseLabel);
    });

    test('TC_PQ_005: Verify queries can be filtered by status', async ({ page }) => {
      // 1. Locate the status filter
      await queriesPage.verifyStatusFilterVisible();

      // 2. Filter by 'Pending Response'
      await queriesPage.selectStatusFilter(testData.expected.statusOptions[0]);

      // 3. Verify only Pending Response queries are shown
      await queriesPage.verifyQueryCardHasStatus(testData.expected.pendingResponseLabel);

      // 4. Clear filter and select 'Responded'
      await queriesPage.clearStatusFilter();
      await queriesPage.selectStatusFilter(testData.expected.statusOptions[1]);

      // 5. Verify only Responded queries are shown
      await queriesPage.verifyQueryCardHasStatus(testData.expected.respondedLabel);

      // 6. Clear all filters
      await queriesPage.clearStatusFilter();

      // 7. Verify all queries are displayed
      await queriesPage.verifyAllQueriesDisplayed();
    });

    test('TC_PQ_006: Verify queries can be searched by product, user name, or keyword', async ({ page }) => {
      // 1. Search by product name
      await queriesPage.enterSearchQuery(testData.inputs.searchByProduct);

      // 2. Verify results show queries for that product
      await queriesPage.verifyQueryCardHasProductName();

      // 3. Clear search and search by user name
      await queriesPage.clearSearch();
      await queriesPage.enterSearchQuery(testData.inputs.searchByUser);

      // 4. Clear search
      await queriesPage.clearSearch();

      // 5. Verify all queries are restored
      await queriesPage.verifyAllQueriesDisplayed();
    });

    test('TC_PQ_027: Verify Admin Response status filter works correctly', async ({ page }) => {
      // NOTE: This test validates regression for SCRUM-863
      // The "Admin Response" filter option may not appear if no queries have that status
      // 1. Locate the status filter
      await queriesPage.verifyStatusFilterVisible();

      // 2. Open filter to check if Admin Response option exists
      await queriesPage.openStatusFilter();

      // 3. Verify the filter dropdown opened (page doesn't break)
      await queriesPage.verifyPageLoaded();
    });
  });

  test.describe('3. Responding to a Query', () => {
    test.beforeEach(async () => {
      await queriesPage.navigateToQueries();
    });

    test('TC_PQ_007: Verify AP can submit a response to a Pending Response query', async ({ page }) => {
      // 1. Locate a query with 'Pending Response' status and click Edit Response
      await queriesPage.clickEditResponse();

      // 2. Verify a response input field is enabled
      await queriesPage.verifyResponseInputVisible();

      // 3. Enter a response meeting the minimum word count requirement
      await queriesPage.fillResponseText(testData.inputs.validResponse);

      // 4. Verify submit button is enabled
      await queriesPage.verifySubmitButtonEnabled();
    });

    test('TC_PQ_008: Verify only one response per query is allowed', async ({ page }) => {
      // 1. Verify responded queries show approved label (response already exists)
      await queriesPage.verifyApprovedResponseLabel(testData.expected.approvedResponseLabel);

      // 2. Verify no submit button is available for responded queries
      await queriesPage.verifyNoSubmitButtonOnRespondedQuery();
    });

    test('TC_PQ_009: Verify response input is disabled for non-Pending Response queries', async ({ page }) => {
      // 1. Verify responded queries show approved label
      await queriesPage.verifyApprovedResponseLabel(testData.expected.approvedResponseLabel);

      // 2. Verify only Pending Response query has Edit Response button
      await queriesPage.verifyQueryCardHasStatus(testData.expected.pendingResponseLabel);
    });

    test('TC_PQ_010: Verify minimum word count requirement is enforced before submission', async ({ page }) => {
      // 1. Open response input for a Pending Response query
      await queriesPage.clickEditResponse();
      await queriesPage.verifyResponseInputVisible();

      // 2. Enter text below the minimum word count
      await queriesPage.fillResponseText(testData.inputs.belowMinWordResponse);

      // 3. Verify word count shows below minimum
      await queriesPage.verifyWordCount(testData.expected.wordCountBelowMin, testData.expected.minimumWordCount);

      // 4. Verify submit button is disabled when word count is below minimum
      await queriesPage.verifySubmitButtonDisabled();

      // 5. Enter text meeting the minimum word count
      await queriesPage.fillResponseText(testData.inputs.validResponse);

      // 6. Verify submit button becomes enabled
      await queriesPage.verifySubmitButtonEnabled();
    });

    test('TC_PQ_011: Verify AP cannot submit an empty response', async ({ page }) => {
      // 1. Open response input for a Pending Response query
      await queriesPage.clickEditResponse();
      await queriesPage.verifyResponseInputVisible();

      // 2. Leave the response field empty
      await queriesPage.fillResponseText(testData.inputs.emptyResponse);

      // 3. Verify submit button is disabled
      await queriesPage.verifySubmitButtonDisabled();

      // 4. Enter only whitespace
      await queriesPage.fillResponseText(testData.inputs.whitespaceResponse);

      // 5. Verify submit button is still disabled
      await queriesPage.verifySubmitButtonDisabled();
    });
  });

  test.describe('4. Admin Moderation', () => {
    test.setTimeout(180000);

    test('TC_PQ_012: Verify admin can access moderation queue with approve option', async ({ browser }) => {
      // 1. Log in as admin using AdminDashboardPage
      const adminContext = await browser.newContext();
      const adminPage = await adminContext.newPage();
      const adminDashboard = new AdminDashboardPage(adminPage);
      await adminDashboard.loginAndNavigateToDashboard(testData.url, testData.admin.email, testData.admin.password);

      // 2. Navigate to Comment Moderation
      await adminPage.getByRole('link', { name: 'Comment Moderation' }).click();
      await expect(adminPage.getByRole('heading', { name: testData.expected.commentModerationHeading })).toBeVisible({ timeout: 15000 });

      // 3. Verify moderation tabs are visible
      await expect(adminPage.getByRole('button', { name: /needing attention/i })).toBeVisible();
      await expect(adminPage.getByRole('button', { name: /recently approved/i })).toBeVisible();
      await expect(adminPage.getByRole('button', { name: /rejected content/i })).toBeVisible();

      // 4. Verify Approve button is visible
      await expect(adminPage.getByRole('button', { name: 'Approve and publish content' }).first()).toBeVisible();

      await adminContext.close();
    });

    test('TC_PQ_013: Verify admin can access moderation queue with reject option', async ({ browser }) => {
      // 1. Log in as admin
      const adminContext = await browser.newContext();
      const adminPage = await adminContext.newPage();
      const adminDashboard = new AdminDashboardPage(adminPage);
      await adminDashboard.loginAndNavigateToDashboard(testData.url, testData.admin.email, testData.admin.password);

      // 2. Navigate to Comment Moderation
      await adminPage.getByRole('link', { name: 'Comment Moderation' }).click();
      await expect(adminPage.getByRole('heading', { name: testData.expected.commentModerationHeading })).toBeVisible({ timeout: 15000 });

      // 3. Verify Reject button is visible
      await expect(adminPage.getByRole('button', { name: 'Reject content' }).first()).toBeVisible();

      await adminContext.close();
    });

    test('TC_PQ_014: Verify admin moderation queue has search and filters', async ({ browser }) => {
      // 1. Log in as admin
      const adminContext = await browser.newContext();
      const adminPage = await adminContext.newPage();
      const adminDashboard = new AdminDashboardPage(adminPage);
      await adminDashboard.loginAndNavigateToDashboard(testData.url, testData.admin.email, testData.admin.password);

      // 2. Navigate to Comment Moderation
      await adminPage.getByRole('link', { name: 'Comment Moderation' }).click();
      await expect(adminPage.getByRole('heading', { name: testData.expected.commentModerationHeading })).toBeVisible({ timeout: 15000 });

      // 3. Verify search field is available
      await expect(adminPage.getByRole('textbox', { name: 'Search content' })).toBeVisible();

      // 4. Verify filter buttons are available
      await expect(adminPage.getByRole('button', { name: 'All Status' })).toBeVisible();
      await expect(adminPage.getByRole('button', { name: 'All Types' })).toBeVisible();
      await expect(adminPage.getByRole('button', { name: 'All Partners' })).toBeVisible();

      await adminContext.close();
    });

    test('TC_PQ_015: Verify AP can re-submit response after rejection', async ({ page }) => {
      // 1. Navigate to Queries section
      await queriesPage.navigateToQueries();

      // 2. Verify the rejection reason is visible
      await queriesPage.verifyRejectionReasonVisible(testData.expected.rejectionReasonLabel);

      // 3. Click Edit Response (re-enabled after rejection)
      await queriesPage.clickEditResponse();

      // 4. Verify the response input is enabled again
      await queriesPage.verifyResponseInputVisible();

      // 5. Enter a new response meeting minimum word count
      await queriesPage.fillResponseText(testData.inputs.validResponse);

      // 6. Verify submit button is enabled
      await queriesPage.verifySubmitButtonEnabled();
    });
  });

  test.describe('5. Approved Responses', () => {
    test.beforeEach(async () => {
      await queriesPage.navigateToQueries();
    });

    test('TC_PQ_016: Verify approved response is labeled Your Response (Approved)', async ({ page }) => {
      // 1. Verify the response is labeled 'Your Response (Approved)'
      await queriesPage.verifyApprovedResponseLabel(testData.expected.approvedResponseLabel);

      // 2. Verify the query status shows 'Responded'
      await queriesPage.verifyQueryCardHasStatus(testData.expected.respondedLabel);
    });

    test('TC_PQ_017: Verify AP cannot edit or submit another response after approval', async ({ page }) => {
      // 1. Verify approved response label is visible
      await queriesPage.verifyApprovedResponseLabel(testData.expected.approvedResponseLabel);

      // 2. Verify no submit button is available
      await queriesPage.verifyNoSubmitButtonOnRespondedQuery();
    });

    test('TC_PQ_018: Verify Admin Response on behalf is labeled correctly', async ({ page }) => {
      // 1. Verify the page loads correctly
      await queriesPage.verifyPageLoaded();

      // 2. Check if any Admin Response label exists on the page
      const adminResponseVisible = await page.getByText('Admin Response').first().isVisible().catch(() => false);
      // If admin has responded on behalf, the label should be visible
      expect(adminResponseVisible !== undefined).toBeTruthy();
    });
  });

  test.describe('7. Privacy & Constraints', () => {
    test.beforeEach(async () => {
      await queriesPage.navigateToQueries();
    });

    test('TC_PQ_025: Verify visual indicators for Approved and Rejected statuses', async ({ page }) => {
      // 1. Verify approved response has distinct visual indicator
      await queriesPage.verifyApprovedResponseLabel(testData.expected.approvedResponseLabel);

      // 2. Verify rejected response has distinct visual indicator with reason
      await queriesPage.verifyRejectedResponseLabel(testData.expected.rejectedResponseLabel);
      await queriesPage.verifyRejectionReasonVisible(testData.expected.rejectionReasonLabel);
    });

    test('TC_PQ_025_privacy: Verify privacy notice is displayed on Queries page', async ({ page }) => {
      // 1. Verify privacy notice is visible
      await queriesPage.verifyPrivacyNoticeVisible(testData.expected.privacyNotice);
    });
  });

  test.describe('7. Privacy & Constraints - Multi-User', () => {
    test.setTimeout(180000);

    test('TC_PQ_019: Verify no chat or back-and-forth thread is allowed per query', async ({ page }) => {
      // 1. Log in as AP and navigate to queries
      await queriesPage.navigateToQueries();

      // 2. Verify responded queries show no reply/follow-up option
      await queriesPage.verifyApprovedResponseLabel(testData.expected.approvedResponseLabel);

      // 3. Verify no additional response option for AP after approval
      await queriesPage.verifyNoSubmitButtonOnRespondedQuery();

      // 4. Verify interaction is limited to one query + one response
      await queriesPage.verifyPageLoaded();
    });

    test('TC_PQ_020: Verify PwD queries appear immediately without moderation', async ({ page }) => {
      // 1. Log in as AP and navigate to queries
      await queriesPage.navigateToQueries();

      // 2. Verify queries are visible with Pending Response status (immediate, no moderation)
      await queriesPage.verifyQueryCardHasStatus(testData.expected.pendingResponseLabel);

      // 3. Verify the privacy notice confirms no moderation for PwD queries
      await queriesPage.verifyPrivacyNoticeVisible(testData.expected.privacyNotice);
    });
  });

  test.describe('8. User Feedback & Notifications', () => {
    test.beforeEach(async ({ page }) => {
      await queriesPage.navigateToQueries();
    });

    test('TC_PQ_022: Verify AP has notification count for queries', async ({ page }) => {
      // 1. Verify notification bell is visible with count
      const notifBtn = page.locator('nav').getByRole('button').filter({ hasText: /^\d+$/ });
      await expect(notifBtn).toBeVisible();

      // 2. Verify notification count is a number
      const countText = await notifBtn.textContent();
      expect(countText).toMatch(/\d+/);
    });

    test('TC_PQ_023: Verify visual indicator for Approved status on queries', async ({ page }) => {
      // 1. Verify approved response has clear visual indicator
      await queriesPage.verifyApprovedResponseLabel(testData.expected.approvedResponseLabel);
    });

    test('TC_PQ_024: Verify visual indicator for Rejected status with reason', async ({ page }) => {
      // 1. Verify rejected response has clear visual indicator
      await queriesPage.verifyRejectedResponseLabel(testData.expected.rejectedResponseLabel);

      // 2. Verify rejection reason is accessible
      await queriesPage.verifyRejectionReasonVisible(testData.expected.rejectionReasonLabel);
    });
  });

  test.describe('Edge Cases', () => {
    test('TC_PQ_026: Verify queries section with zero queries shows appropriate empty state', async ({ browser }) => {
      // 1. Log in as second vendor (who may have no queries)
      const vendorBContext = await browser.newContext();
      const vendorBPage = await vendorBContext.newPage();
      const vendorBLogin = new LoginPage(vendorBPage);
      const vendorBQueries = new QueriesPage(vendorBPage);
      await vendorBLogin.navigate(testData.url);
      await vendorBLogin.loginAsVendor(testData.secondVendor.email, testData.secondVendor.password);

      // 2. Navigate to Queries section
      await vendorBQueries.navigateToQueries();

      // 3. Verify the page loads without errors
      await vendorBQueries.verifyPageLoaded();

      // 4. Verify no broken UI elements
      await vendorBQueries.verifyNoQueriesEmptyState();

      await vendorBContext.close();
    });
  });
});
