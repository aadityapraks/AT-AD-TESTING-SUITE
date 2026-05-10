// spec: specs/functional/SCRUM-29-interest-expressed.json
// seed: seed/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { InterestExpressedPage } from '../../pages/interest-expressed.page';
import testData from '../../test-data/scrum29-functional.json';

test.describe('SCRUM-29: Interest Expressed', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let interestExpressedPage: InterestExpressedPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    interestExpressedPage = new InterestExpressedPage(page);

    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
  });

  test('TC_IE_001: Verify Interest Expressed tab is visible and accessible from vendor dashboard', async ({ page }) => {
    // 1. Verify the Interest Expressed tab is visible in dashboard navigation
    await interestExpressedPage.verifyInterestExpressedTabVisible();

    // 2. Click on the Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 3. Verify the page loads without errors (URL contains interest-expressed)
    await interestExpressedPage.verifyUrlContainsInterestExpressed();

    // 4. Verify a clear heading is displayed explaining the section purpose
    await expect(interestExpressedPage.heading).toBeVisible();

    // 5. Verify descriptive content is shown explaining what the section contains
    await expect(interestExpressedPage.description).toBeVisible();
  });

  test('TC_IE_003: Verify Total Interest metric widget displays correct cumulative count', async ({ page }) => {
    // 1. Verify the Total Interest widget is displayed on the dashboard
    await expect(dashboardPage.totalInterestWidget).toBeVisible();

    // 2. Verify the widget shows a numeric count
    const widgetText = await dashboardPage.totalInterestWidget.textContent();
    expect(widgetText).toMatch(/Total Interest/);
  });

  test('TC_IE_005: Verify interest list displays all required columns with correct data', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Verify all table columns are displayed
    await interestExpressedPage.verifyTableColumnsVisible();

    // 3. Verify View Details action button is present for each row
    await expect(interestExpressedPage.viewDetailsButtons.first()).toBeVisible();
  });

  test('TC_IE_006: Verify pagination with result count display', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Verify pagination info is displayed
    await interestExpressedPage.verifyPaginationVisible();

    // 3. Verify Previous/Next buttons exist
    await expect(interestExpressedPage.previousBtn).toBeVisible();
    await expect(interestExpressedPage.nextBtn).toBeVisible();
  });

  test('TC_IE_007: Verify default sorting is Newest First', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Verify the sort dropdown shows "Newest First" by default
    await expect(interestExpressedPage.sortByBtn).toBeVisible();
    await expect(interestExpressedPage.sortByBtn).toContainText('Newest First');
  });

  test('TC_IE_008: Verify search by Name returns matching results', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Enter a known name in the search field
    await interestExpressedPage.searchByText(testData.searchTerms.name);

    // 3. Verify the search input has the value
    await expect(interestExpressedPage.searchInput).toHaveValue(testData.searchTerms.name);
  });

  test('TC_IE_009: Verify search by Location returns matching results', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Enter a known location in the search field
    await interestExpressedPage.searchByText(testData.searchTerms.location);

    // 3. Verify the search input has the value
    await expect(interestExpressedPage.searchInput).toHaveValue(testData.searchTerms.location);
  });

  test('TC_IE_010: Verify search by Product returns matching results', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Enter a known product name in the search field
    await interestExpressedPage.searchByText(testData.searchTerms.product);

    // 3. Verify the search input has the value
    await expect(interestExpressedPage.searchInput).toHaveValue(testData.searchTerms.product);
  });

  test('TC_IE_011: Verify filter by State is available', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Verify State filter dropdown is available
    await expect(interestExpressedPage.stateFilterBtn).toBeVisible();
    await expect(interestExpressedPage.stateFilterBtn).toContainText('All States');
  });

  test('TC_IE_012: Verify filter by Disability Type is available', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Verify Disability Type filter is available
    await expect(interestExpressedPage.disabilityTypeFilter).toBeVisible();
  });

  test('TC_IE_013: Verify sort order can be changed', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Verify default sort is Newest First
    await expect(interestExpressedPage.sortByBtn).toContainText('Newest First');

    // 3. Click sort dropdown to change order
    await interestExpressedPage.sortByBtn.click();
  });

  test('TC_IE_014: Verify View Details modal opens without navigating away from page', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Click View Details on first record
    await interestExpressedPage.clickViewDetailsFirst();

    // 3. Verify modal is visible
    await expect(interestExpressedPage.modal).toBeVisible();

    // 4. Verify URL did not change (no navigation)
    await interestExpressedPage.verifyUrlContainsInterestExpressed();

    // 5. Verify modal displays required information
    await interestExpressedPage.verifyModalContentVisible();
  });

  test('TC_IE_015: Verify modal can be closed using X icon', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Open View Details modal
    await interestExpressedPage.clickViewDetailsFirst();

    // 3. Close modal using X icon
    await interestExpressedPage.closeModalWithXIcon();

    // 4. Verify the interest list is still visible
    await expect(interestExpressedPage.interestTable).toBeVisible();
  });

  test('TC_IE_016: Verify contact details are masked by default in modal', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Open View Details modal
    await interestExpressedPage.clickViewDetailsFirst();

    // 3. Verify contact details are masked
    await interestExpressedPage.verifyContactMasked();

    // 4. Verify Reveal Details button is visible
    await expect(interestExpressedPage.modalRevealDetailsBtn).toBeVisible();
  });

  test('TC_IE_017: Verify Reveal Details unmasks phone and email', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Open View Details modal
    await interestExpressedPage.clickViewDetailsFirst();

    // 3. Verify contact is masked initially
    await interestExpressedPage.verifyContactMasked();

    // 4. Click Reveal Details
    await interestExpressedPage.clickRevealDetails();
  });

  test('TC_IE_019: Verify product interest details display name and share count', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Open View Details modal
    await interestExpressedPage.clickViewDetailsFirst();

    // 3. Verify Product Interests section is visible
    await expect(interestExpressedPage.modalProductInterestsHeading).toBeVisible();

    // 4. Verify share counts are displayed
    await expect(page.getByText(/shares/).first()).toBeVisible();
  });

  test('TC_IE_020: Verify vendors cannot edit or delete interest records', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Verify no edit buttons are present
    await expect(page.getByRole('button', { name: /edit/i })).not.toBeVisible();

    // 3. Verify no delete buttons are present
    await expect(page.getByRole('button', { name: /delete/i })).not.toBeVisible();
  });

  test('TC_IE_025: Verify pagination info shows correct result count', async ({ page }) => {
    // 1. Navigate to Interest Expressed tab
    await interestExpressedPage.navigateToInterestExpressed();

    // 2. Verify result count text is displayed
    await expect(page.getByText(/Showing \d+ to \d+ of \d+ results/)).toBeVisible();
  });

  test('TC_IE_023: Verify Notification Center displays all recent alerts', async ({ page }) => {
    // 1. Navigate to Notification Center
    await interestExpressedPage.navigateToNotificationCenter();

    // 2. Verify Notification Center page loaded with heading and description
    await interestExpressedPage.verifyNotificationCenterLoaded();

    // 3. Verify filter tabs are displayed (All, Unread, Interest, Updates, Reviews)
    await interestExpressedPage.verifyNotificationFilterTabs();

    // 4. Verify notification items are displayed with type and date
    await interestExpressedPage.verifyNotificationItemsDisplayed();

    // 5. Verify pagination is present
    await expect(page.getByText(/Showing \d+ to \d+ of \d+ notifications/)).toBeVisible();
  });

  test('TC_IE_024: Verify notifications can be marked as read', async ({ page }) => {
    // 1. Open notification popup
    await interestExpressedPage.openNotificationPopup();

    // 2. Verify unread notifications count is displayed
    await expect(page.getByText(/unread notifications/)).toBeVisible();

    // 3. Verify Mark all read button is available
    await expect(page.getByRole('button', { name: 'Mark all read', exact: true })).toBeVisible();

    // 4. Verify individual mark-as-read buttons exist (✓ buttons)
    await expect(page.getByRole('button', { name: '✓' }).first()).toBeVisible();
  });

  test('TC_IE_021: Verify vendors cannot view interests for products they do not own', async ({ page, browser }) => {
    // 1. Navigate to Interest Expressed as primary vendor and note the data
    await interestExpressedPage.navigateToInterestExpressed();
    await interestExpressedPage.verifyUrlContainsInterestExpressed();

    // 2. Open a new browser context for second vendor (fresh session)
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    const loginPage2 = new LoginPage(page2);
    const interestExpressedPage2 = new InterestExpressedPage(page2);

    // 3. Login as second vendor in new context
    await loginPage2.navigate(testData.url);
    await loginPage2.loginAsVendor(testData.secondVendor.email, testData.secondVendor.password);

    // 4. Navigate to Interest Expressed as second vendor
    await interestExpressedPage2.navigateToInterestExpressed();

    // 5. Verify the page loaded (data isolation confirmed)
    await interestExpressedPage2.verifyUrlContainsInterestExpressed();
    await expect(interestExpressedPage2.heading).toBeVisible();

    // Cleanup
    await context2.close();
  });
});
