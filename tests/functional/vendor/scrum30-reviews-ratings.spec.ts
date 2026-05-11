// spec: specs/functional/SCRUM-30-reviews-ratings.json
// seed: seed/seed.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { DashboardPage } from '../../../pages/dashboard.page';
import { ReviewsRatingsPage } from '../../../pages/reviews-ratings.page';
import testData from '../../../test-data/scrum30-functional.json';

test.describe('SCRUM-30: Reviews & Ratings', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let reviewsRatingsPage: ReviewsRatingsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    reviewsRatingsPage = new ReviewsRatingsPage(page);

    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
  });

  test('TC_RR_002: Verify dashboard widgets display Average Rating, Total Reviews, and Products Reviewed', async ({ page }) => {
    // 1. Navigate to Reviews & Ratings section
    await reviewsRatingsPage.navigateToReviewsRatings();

    // 2. Verify 'Average Rating' widget is displayed with a numeric value
    await reviewsRatingsPage.verifyAverageRatingHasValue();

    // 3. Verify 'Total Reviews' widget is displayed with a count
    await reviewsRatingsPage.verifyTotalReviewsHasCount();

    // 4. Verify 'Products Reviewed' widget is displayed with a count
    await reviewsRatingsPage.verifyProductsReviewedHasCount();

    // 5. Verify all three widgets are visible together
    await reviewsRatingsPage.verifyAllWidgetsVisible();
  });

  test('TC_RR_001: Verify Reviews & Ratings section is accessible from AP dashboard main menu', async ({ page }) => {
    // 1. Verify Reviews & Ratings tab is visible in dashboard navigation
    await reviewsRatingsPage.verifyReviewsRatingsTabVisible();

    // 2. Click on Reviews & Ratings
    await reviewsRatingsPage.navigateToReviewsRatings();

    // 3. Verify the section loads without errors
    await reviewsRatingsPage.verifyUrlContainsReviewsRatings();
    await reviewsRatingsPage.verifyPageLoaded();
  });

  test('TC_RR_003: Verify Product Reviews section has product search functionality', async ({ page }) => {
    // 1. Navigate to Reviews & Ratings section
    await reviewsRatingsPage.navigateToReviewsRatings();

    // 2. Verify search field is visible
    await reviewsRatingsPage.verifySearchInputVisible();

    // 3. Enter a known product name
    await reviewsRatingsPage.searchByProductName('w');

    // 4. Verify the search input has the value
    await expect(reviewsRatingsPage.searchInput).toHaveValue('w');

    // 5. Clear the search field
    await reviewsRatingsPage.clearSearch();

    // 6. Verify search is cleared
    await expect(reviewsRatingsPage.searchInput).toHaveValue('');
  });

  test('TC_RR_004: Verify Product Reviews section sort/filter for All Ratings and Most Reviews', async ({ page }) => {
    // 1. Navigate to Reviews & Ratings section
    await reviewsRatingsPage.navigateToReviewsRatings();

    // 2. Verify rating filter is available
    await reviewsRatingsPage.verifyRatingFilterVisible();

    // 3. Verify sort dropdown is available
    await reviewsRatingsPage.verifySortByVisible();
  });

  test('TC_RR_005: Verify product list shows average rating and total review count per product', async ({ page }) => {
    // 1. Navigate to Reviews & Ratings section
    await reviewsRatingsPage.navigateToReviewsRatings();

    // 2. Verify product list shows rating and review count
    await reviewsRatingsPage.verifyProductListShowsRatingAndReviews();

    // 3. Verify pagination info
    await reviewsRatingsPage.verifyPaginationVisible();
  });

  test('TC_RR_006: Verify clicking a product opens the Product Feedback Summary Page', async ({ page }) => {
    // 1. Navigate to Reviews & Ratings section
    await reviewsRatingsPage.navigateToReviewsRatings();

    // 2. Click on a product from the product list
    await reviewsRatingsPage.clickFirstProduct();

    // 3. Verify the Product Feedback Summary Page opens
    await reviewsRatingsPage.verifyProductFeedbackSummaryPageLoaded();

    // 4. Verify the page displays the correct product information
    await reviewsRatingsPage.verifyProductFeedbackSummaryContent();

    // 5. Verify Customer Reviews section is present
    await reviewsRatingsPage.verifyCustomerReviewsSection();
  });

  test('TC_RR_007: Verify Product Feedback Summary Page displays all required fields', async ({ page }) => {
    // 1. Navigate to Reviews & Ratings and open a product
    await reviewsRatingsPage.navigateToReviewsRatings();
    await reviewsRatingsPage.clickFirstProduct();

    // 2. Verify average rating with /5 format
    await reviewsRatingsPage.verifyProductFeedbackSummaryContent();

    // 3. Verify rating distribution chart
    await reviewsRatingsPage.verifyProductFeedbackRatingDistribution();

    // 4. Verify Customer Reviews section
    await reviewsRatingsPage.verifyCustomerReviewsSection();
  });

  test('TC_RR_009: Verify individual review cards display all required information', async ({ page }) => {
    // 1. Navigate to Reviews & Ratings and open a product
    await reviewsRatingsPage.navigateToReviewsRatings();
    await reviewsRatingsPage.clickFirstProduct();

    // 2. Verify Customer Reviews section title
    await reviewsRatingsPage.verifyCustomerReviewsSection();

    // 3. Verify review cards show anonymous user ID, rating, and date
    await reviewsRatingsPage.verifyCustomerReviewCards();
  });

  test('TC_RR_010: Verify Customer Reviews sort/filter for All Ratings and Most Recent', async ({ page }) => {
    // 1. Navigate to Reviews & Ratings and open a product
    await reviewsRatingsPage.navigateToReviewsRatings();
    await reviewsRatingsPage.clickFirstProduct();

    // 2. Verify sort/filter dropdowns are available
    await reviewsRatingsPage.verifyCustomerReviewCards();
  });

  test('TC_RR_015: Verify AP can respond to approved comments', async ({ page }) => {
    // 1. Navigate to Reviews & Ratings and open a product
    await reviewsRatingsPage.navigateToReviewsRatings();
    await reviewsRatingsPage.clickFirstProduct();

    // 2. Verify Respond to Review button is available
    await reviewsRatingsPage.verifyRespondToReviewButton();
  });

  test.describe('PwD Portal - Reviews Visibility', () => {
    test('TC_RR_016: Verify product page on PwD portal has Reviews tab and catalog ratings', async ({ browser }) => {
      test.setTimeout(180000);

      // 1. Navigate to product page on PwD portal (triggers SSO redirect)
      const pwdContext = await browser.newContext();
      const pwdPage = await pwdContext.newPage();
      const pwdLoginPage = new LoginPage(pwdPage);

      await pwdPage.goto(testData.pwdUser.url + 'product/watch/');
      await pwdPage.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
      await pwdPage.getByRole('textbox', { name: 'Email' }).fill(testData.pwdUser.email);
      await pwdPage.getByRole('button', { name: 'Log in' }).click();
      await pwdPage.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 30000 });
      await pwdPage.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.pwdUser.password);
      await pwdPage.getByRole('button', { name: 'Continue' }).click();

      // 2. Handle consent
      await pwdPage.waitForURL(url => !url.href.includes('has-password-flow'), { timeout: 30000 });
      if (pwdPage.url().includes('implicit-consent')) {
        await pwdPage.getByRole('button', { name: 'Continue' }).click();
        await pwdPage.waitForTimeout(5000);
      }

      // 3. Navigate to product page if not already there
      if (!pwdPage.url().includes('product/watch')) {
        await pwdPage.goto(testData.pwdUser.url + 'product/watch/');
      }
      await pwdPage.waitForURL(/product\/watch/, { timeout: 30000 });

      // 4. Verify Reviews tab exists
      await expect(pwdPage.getByRole('tab', { name: 'Reviews' })).toBeVisible({ timeout: 15000 });

      // 5. Click Reviews tab and verify panel
      await pwdPage.getByRole('tab', { name: 'Reviews' }).click();
      await expect(pwdPage.getByRole('tabpanel', { name: 'Reviews' })).toBeVisible();

      // 6. Verify Raise a Query tab also exists
      await expect(pwdPage.getByRole('tab', { name: 'Raise a Query' })).toBeVisible();

      // 7. Click Raise a Query tab
      await pwdPage.getByRole('tab', { name: 'Raise a Query' }).click();
      await expect(pwdPage.getByRole('tabpanel', { name: 'Raise a Query' })).toBeVisible();

      // 8. Navigate to catalog to verify ratings on cards
      await pwdPage.goto(testData.pwdUser.url + 'catalog/');
      await pwdPage.waitForURL(/catalog/, { timeout: 30000 });

      // 9. Verify product cards with ratings are displayed
      await expect(pwdPage.getByRole('heading', { level: 3 }).first()).toBeVisible({ timeout: 15000 });
      await expect(pwdPage.getByRole('img', { name: /Rated/ }).first()).toBeVisible();

      await pwdContext.close();
    });
  });
});
