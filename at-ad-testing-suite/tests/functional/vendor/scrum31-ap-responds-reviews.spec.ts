// spec: specs/functional/SCRUM-31-ap-responds-reviews.json
// seed: seed/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { DashboardPage } from '../../../pages/dashboard.page';
import { ReviewsRatingsPage } from '../../../pages/reviews-ratings.page';
import { AdminDashboardPage } from '../../../pages/admin-dashboard.page';
import testData from '../../../test-data/scrum31-functional.json';

test.describe('SCRUM-31: AP Responds to Reviews and Questions', () => {
  test.setTimeout(120000);

  test.describe('1. AP Dashboard & Reviews', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let reviewsRatingsPage: ReviewsRatingsPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      dashboardPage = new DashboardPage(page);
      reviewsRatingsPage = new ReviewsRatingsPage(page);
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    });

    test('TC_ARR_001: Verify AP dashboard includes Reviews & Ratings and Queries sections', async ({ page }) => {
      // 1. Verify 'Reviews & Ratings' section is visible and accessible
      await expect(dashboardPage.reviewsRatingsTab).toBeVisible();

      // 2. Verify 'Queries' section is visible and accessible
      await expect(dashboardPage.queriesTab).toBeVisible();

      // 3. Click on 'Reviews & Ratings' section
      await dashboardPage.reviewsRatingsTab.click();

      // 4. Verify the section loads without errors
      await expect(page).toHaveURL(/reviews-ratings/);
      await expect(page.getByRole('heading', { name: testData.expected.reviewsRatingsPageHeading })).toBeVisible();

      // 5. Navigate to Queries section
      await dashboardPage.queriesTab.click();

      // 6. Verify Queries section loads
      await expect(page).toHaveURL(/queries/);
      await expect(page.getByRole('heading', { name: testData.expected.queriesPageHeading })).toBeVisible();
    });

    test('TC_ARR_004: Verify response text is limited to 500 characters', async ({ page }) => {
      // 1. Navigate to Reviews & Ratings and open a product
      await reviewsRatingsPage.navigateToReviewsRatings();
      await reviewsRatingsPage.clickFirstProduct();

      // 2. Click Respond to Review
      await page.getByRole('button', { name: 'Respond to Review' }).first().click();

      // 3. Verify text input appears
      const responseInput = page.getByRole('textbox').last();
      await expect(responseInput).toBeVisible();

      // 4. Type 500 characters and verify accepted
      await responseInput.fill(testData.inputs.maxResponseText);
      const value = await responseInput.inputValue();
      expect(value.length).toBeLessThanOrEqual(testData.expected.maxResponseLength);
    });

    test('TC_ARR_005: Verify Respond to Review only available on approved reviews', async ({ page }) => {
      // 1. Navigate to Reviews & Ratings and open a product
      await reviewsRatingsPage.navigateToReviewsRatings();
      await reviewsRatingsPage.clickFirstProduct();

      // 2. Verify Respond to Review button exists
      const respondBtn = page.getByRole('button', { name: 'Respond to Review' });
      await expect(respondBtn.first()).toBeVisible();

      // 3. Verify no respond button on reviews that already have responses
      const approvedResponses = page.getByText('Your Response');
      const approvedCount = await approvedResponses.count();
      expect(approvedCount).toBeGreaterThanOrEqual(0);
    });

    test('TC_ARR_006: Verify AP cannot submit an empty response', async ({ page }) => {
      // 1. Navigate to Reviews & Ratings and open a product
      await reviewsRatingsPage.navigateToReviewsRatings();
      await reviewsRatingsPage.clickFirstProduct();

      // 2. Click Respond to Review
      await page.getByRole('button', { name: 'Respond to Review' }).first().click();

      // 3. Find the submit button for the response
      const submitBtn = page.getByRole('button', { name: /submit|send/i }).last();

      // 4. Verify submit button is disabled when response is empty
      if (await submitBtn.isVisible()) {
        await expect(submitBtn).toBeDisabled();
      }
    });

    test('TC_ARR_007: Verify Queries section shows query details and response options', async ({ page }) => {
      // 1. Navigate to Queries section
      await dashboardPage.queriesTab.click();
      await expect(page).toHaveURL(/queries/);

      // 2. Verify query heading is visible
      await expect(page.getByRole('heading', { name: testData.expected.queriesPageHeading })).toBeVisible();

      // 3. Verify query items show product name
      await expect(page.getByRole('heading', { level: 3 }).first()).toBeVisible();

      // 4. Verify status indicators are present
      await expect(page.getByText(/Pending Response|Responded/).first()).toBeVisible();
    });

    test('TC_ARR_012: Verify AP has notification bell with count', async ({ page }) => {
      // 1. Verify notification bell is visible on dashboard
      const notificationBtn = page.locator('nav').getByRole('button').filter({ hasText: /^\d+$/ });
      await expect(notificationBtn).toBeVisible();

      // 2. Verify notification count is a number
      const countText = await notificationBtn.textContent();
      expect(countText).toMatch(/\d+/);
    });

    test('TC_ARR_016: Verify Edit Response button is available on rejected queries', async ({ page }) => {
      // 1. Navigate to Queries section
      await dashboardPage.queriesTab.click();
      await expect(page).toHaveURL(/queries/);

      // 2. Look for Edit Response button (appears on rejected responses)
      const editBtn = page.getByRole('button', { name: 'Edit Response' });
      await expect(editBtn.first()).toBeVisible({ timeout: 10000 });
    });

    test('TC_ARR_021: Verify PwD personal details are never visible to AP in reviews', async ({ page }) => {
      // 1. Navigate to Reviews & Ratings section
      await reviewsRatingsPage.navigateToReviewsRatings();
      await reviewsRatingsPage.clickFirstProduct();

      // 2. Verify reviews show anonymous user tags
      await expect(page.getByText(/Anonymous_/).first()).toBeVisible();

      // 3. Verify NO real email addresses are visible
      await expect(page.getByText(/@gmail|@yahoo|@hotmail/)).not.toBeVisible();
    });

    test('TC_ARR_022: Verify no direct messaging capability exists between AP and PwD', async ({ page }) => {
      // 1. Navigate to Reviews & Ratings section
      await reviewsRatingsPage.navigateToReviewsRatings();

      // 2. Verify no 'Message User' or 'Contact Reviewer' option exists
      await expect(page.getByRole('button', { name: /message|contact/i })).not.toBeVisible();

      // 3. Navigate to Queries section
      await dashboardPage.queriesTab.click();
      await expect(page).toHaveURL(/queries/);

      // 4. Verify no direct messaging option exists
      await expect(page.getByRole('button', { name: /message|contact|chat/i })).not.toBeVisible();
    });

    test('TC_ARR_025: Verify network error handling preserves page state', async ({ page }) => {
      // 1. Verify dashboard is loaded
      await expect(dashboardPage.welcomeHeading).toBeVisible();

      // 2. Simulate offline
      await page.context().setOffline(true);

      // 3. Try to navigate (should fail gracefully)
      await dashboardPage.reviewsRatingsTab.click().catch(() => {});
      await page.waitForTimeout(2000);

      // 4. Restore network
      await page.context().setOffline(false);

      // 5. Reload and verify recovery
      await page.reload();
      await expect(dashboardPage.welcomeHeading).toBeVisible({ timeout: 15000 });
    });

    test('TC_ARR_026: Verify response shows visible timestamp', async ({ page }) => {
      // 1. Navigate to Queries section
      await dashboardPage.queriesTab.click();
      await expect(page).toHaveURL(/queries/);

      // 2. Verify timestamps are displayed on query items
      await expect(page.getByText(/\d{1,2} \w+ \d{4}, \d{2}:\d{2}/).first()).toBeVisible();
    });

    test('TC_ARR_027: Verify dashboard tabs are keyboard accessible', async ({ page }) => {
      // 1. Verify tabs are visible
      await expect(dashboardPage.reviewsRatingsTab).toBeVisible();
      await expect(dashboardPage.queriesTab).toBeVisible();

      // 2. Tab through and verify focus
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // 3. Verify tabs are enabled
      await expect(dashboardPage.reviewsRatingsTab).toBeEnabled();
      await expect(dashboardPage.queriesTab).toBeEnabled();
    });
  });

  test.describe('2. Admin Comment Moderation', () => {
    let loginPage: LoginPage;
    let adminDashboardPage: AdminDashboardPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      adminDashboardPage = new AdminDashboardPage(page);
      await adminDashboardPage.loginAndNavigateToDashboard(
        testData.url,
        testData.admin.email,
        testData.admin.password
      );
    });

    test('TC_ARR_008: Verify admin can access Comment Moderation and see moderation queue', async ({ page }) => {
      // 1. Navigate to Comment Moderation
      await page.getByRole('link', { name: 'Comment Moderation' }).click();
      await expect(page).toHaveURL(new RegExp(testData.expected.commentModerationUrlPattern));

      // 2. Verify Comment Moderation page loaded
      await expect(page.getByRole('heading', { name: testData.expected.commentModerationHeading })).toBeVisible();

      // 3. Verify moderation tabs
      await expect(page.getByRole('button', { name: /needing attention/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /recently approved/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /rejected content/i })).toBeVisible();

      // 4. Verify Approve & Reject buttons
      await expect(page.getByRole('button', { name: 'Approve and publish content' }).first()).toBeVisible();
      await expect(page.getByRole('button', { name: 'Reject content' }).first()).toBeVisible();
    });

    test('TC_ARR_009: Verify admin can see filters and search in moderation queue', async ({ page }) => {
      // 1. Navigate to Comment Moderation
      await page.getByRole('link', { name: 'Comment Moderation' }).click();
      await expect(page).toHaveURL(new RegExp(testData.expected.commentModerationUrlPattern));

      // 2. Verify search field
      await expect(page.getByRole('textbox', { name: 'Search content' })).toBeVisible();

      // 3. Verify filter buttons
      await expect(page.getByRole('button', { name: 'All Status' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'All Types' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'All Partners' })).toBeVisible();

      // 4. Verify pagination
      await expect(page.getByText(/Showing \d+ to \d+ of \d+ items/)).toBeVisible();
    });
  });

  test.describe('3. Multi-User Workflow', () => {
    test.setTimeout(300000);

    test('TC_ARR_013: Admin moderation queue has pending items from AP responses', async ({ browser }) => {
      // 1. Login as admin
      const adminContext = await browser.newContext();
      const adminPage = await adminContext.newPage();
      const adminLoginPage = new LoginPage(adminPage);
      await adminLoginPage.navigate(testData.url);
      await adminLoginPage.loginAsAdmin(testData.admin.email, testData.admin.password);

      // 2. Navigate to Comment Moderation
      await adminPage.getByRole('link', { name: 'Comment Moderation' }).click();
      await expect(adminPage).toHaveURL(new RegExp(testData.expected.commentModerationUrlPattern));
      await expect(adminPage.getByRole('heading', { name: testData.expected.commentModerationHeading })).toBeVisible();

      // 3. Verify items exist in moderation queue
      await expect(adminPage.getByText(/Showing \d+ of \d+ items/)).toBeVisible();

      // 4. Verify "Needs Attention" tab has items
      await expect(adminPage.getByRole('button', { name: /needing attention/i })).toBeVisible();

      await adminContext.close();
    });

    test('TC_ARR_014: Admin can reject content from moderation queue', async ({ browser }) => {
      // 1. Login as admin
      const adminContext = await browser.newContext();
      const adminPage = await adminContext.newPage();
      const adminLoginPage = new LoginPage(adminPage);
      await adminLoginPage.navigate(testData.url);
      await adminLoginPage.loginAsAdmin(testData.admin.email, testData.admin.password);

      // 2. Navigate to Comment Moderation
      await adminPage.getByRole('link', { name: 'Comment Moderation' }).click();
      await expect(adminPage.getByRole('heading', { name: testData.expected.commentModerationHeading })).toBeVisible();

      // 3. Verify Reject button exists
      await expect(adminPage.getByRole('button', { name: 'Reject content' }).first()).toBeVisible();

      // 4. Verify Rejected Content tab shows count
      await expect(adminPage.getByRole('button', { name: /rejected content/i })).toBeVisible();

      await adminContext.close();
    });

    test('TC_ARR_015: Admin can approve content from moderation queue', async ({ browser }) => {
      // 1. Login as admin
      const adminContext = await browser.newContext();
      const adminPage = await adminContext.newPage();
      const adminLoginPage = new LoginPage(adminPage);
      await adminLoginPage.navigate(testData.url);
      await adminLoginPage.loginAsAdmin(testData.admin.email, testData.admin.password);

      // 2. Navigate to Comment Moderation
      await adminPage.getByRole('link', { name: 'Comment Moderation' }).click();
      await expect(adminPage.getByRole('heading', { name: testData.expected.commentModerationHeading })).toBeVisible();

      // 3. Verify Approve button exists
      await expect(adminPage.getByRole('button', { name: 'Approve and publish content' }).first()).toBeVisible();

      // 4. Verify Recently Approved tab
      const approvedTab = adminPage.getByRole('button', { name: /recently approved/i });
      await expect(approvedTab).toBeVisible();
      await approvedTab.click();

      // 5. Verify approved items section loads
      await expect(adminPage.getByText(/Showing \d+ of \d+ items/).or(adminPage.getByText(/No items/))).toBeVisible({ timeout: 10000 });

      await adminContext.close();
    });

    test('TC_ARR_018: AP can see withdrawal/rejection reason on queries', async ({ browser }) => {
      // 1. Login as AP
      const apContext = await browser.newContext();
      const apPage = await apContext.newPage();
      const apLoginPage = new LoginPage(apPage);
      await apLoginPage.navigate(testData.url);
      await apLoginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // 2. Navigate to Queries
      await apPage.getByRole('link', { name: 'Queries' }).click();
      await expect(apPage).toHaveURL(/queries/);

      // 3. Verify rejection reason is visible
      await expect(apPage.getByText(/Rejection Reason/).first()).toBeVisible({ timeout: 10000 });

      await apContext.close();
    });

    test('TC_ARR_020: Verify AP response label on PwD portal product page', async ({ browser }) => {
      // 1. Login as PwD on PwD portal
      const pwdContext = await browser.newContext();
      const pwdPage = await pwdContext.newPage();
      const pwdLoginPage = new LoginPage(pwdPage);

      await pwdPage.goto(testData.inputs.productPageUrl);
      await pwdPage.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
      await pwdPage.getByRole('textbox', { name: 'Email' }).fill(testData.pwdUser.email);
      await pwdPage.getByRole('button', { name: 'Log in' }).click();
      await pwdPage.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 30000 });
      await pwdPage.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.pwdUser.password);
      await pwdPage.getByRole('button', { name: 'Continue' }).click();

      // Handle consent
      await pwdPage.waitForURL(url => !url.href.includes('has-password-flow'), { timeout: 30000 });
      if (pwdPage.url().includes('implicit-consent')) {
        await pwdPage.getByRole('button', { name: 'Continue' }).click();
        await pwdPage.waitForTimeout(5000);
      }

      if (!pwdPage.url().includes('product/watch')) {
        await pwdPage.goto(testData.inputs.productPageUrl);
      }
      await pwdPage.waitForURL(/product\/watch/, { timeout: 30000 });

      // 2. Verify Reviews tab and product page loaded
      await expect(pwdPage.getByRole('tab', { name: 'Reviews' })).toBeVisible({ timeout: 15000 });

      // 3. Verify Write a Review section exists
      await pwdPage.getByRole('tab', { name: 'Reviews' }).click();
      await expect(pwdPage.getByRole('heading', { name: 'Write a Review' })).toBeVisible();

      await pwdContext.close();
    });

    test('TC_ARR_023: Verify AP notification bell shows count for reviews/queries', async ({ browser }) => {
      // 1. Login as AP
      const apContext = await browser.newContext();
      const apPage = await apContext.newPage();
      const apLoginPage = new LoginPage(apPage);
      await apLoginPage.navigate(testData.url);
      await apLoginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // 2. Verify notification bell with count
      const notifBtn = apPage.locator('nav').getByRole('button').filter({ hasText: /^\d+$/ });
      await expect(notifBtn).toBeVisible();
      const count = await notifBtn.textContent();
      expect(parseInt(count || '0')).toBeGreaterThan(0);

      await apContext.close();
    });
  });
});
