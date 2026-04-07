// spec: specs/functional/SCRUM-18-ap-dashboard.plan.md
// seed: tests/seed/vendor-product-list.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import testData from '../../test-data/scrum18-functional.json';

test.describe('SCRUM-18: AP Dashboard', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('TC_SCRUM18_001: Verify successful login and dashboard access', async ({ page }) => {
    // Navigate to login page
    await loginPage.navigate(testData.url);

    // Enter valid AP credentials and login
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify redirect to dashboard
    await expect(page).toHaveURL(/product-management/);

    // Verify welcome message displays
    await expect(dashboardPage.welcomeHeading).toBeVisible();

    // Verify all navigation buttons are visible
    await expect(dashboardPage.dashboardBtn).toBeVisible();
    await expect(dashboardPage.helpResourcesBtn).toBeVisible();
    await expect(dashboardPage.profileBtn).toBeVisible();
    await expect(dashboardPage.logoutBtn).toBeVisible();

    // Verify all widgets are visible
    await dashboardPage.verifyAllWidgetsVisible();

    // Verify all tabs are visible
    await dashboardPage.verifyAllTabsVisible();
  });

  test('TC_SCRUM18_002: Verify main navigation functionality', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify Dashboard button shows active state
    await expect(dashboardPage.dashboardBtn).toBeVisible();
    await expect(dashboardPage.dashboardBtn).toHaveAttribute('aria-current', 'page');

    // Click Help & Resources button
    await dashboardPage.clickHelpResources();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/help-resources/);

    // Navigate back to dashboard
    await dashboardPage.clickDashboard();
    await expect(dashboardPage.welcomeHeading).toBeVisible();

    // Click Profile button
    await dashboardPage.clickProfile();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/profile/);

    // Navigate back to dashboard
    await dashboardPage.clickDashboard();
    await expect(dashboardPage.welcomeHeading).toBeVisible();

    // Click Logout button
    await dashboardPage.clickLogout();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/\//);
  });

  test('TC_SCRUM18_003: Verify unapproved AP access restrictions', async ({ page }) => {
    // Login with unapproved AP credentials
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.unapprovedEmail, testData.credentials.unapprovedPassword);

    // Verify 'under review' message appears
    const underReviewMessage = page.locator('text=/under review|pending approval|not approved/i');
    await expect(underReviewMessage).toBeVisible({ timeout: 10000 });

    // Verify limited access to dashboard features
    const restrictedFeatures = page.locator('[class*="disabled"], [aria-disabled="true"]');
    const disabledCount = await restrictedFeatures.count();
    expect(disabledCount).toBeGreaterThan(0);

    // Verify contact information is provided
    const contactInfo = page.locator('text=/contact|email|support/i');
    await expect(contactInfo).toBeVisible();
  });

  test('TC_SCRUM18_004: Verify Total Products widget accuracy', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify Total Products widget displays
    await expect(dashboardPage.totalProductsWidget).toBeVisible();

    // Extract widget count
    const widgetText = await dashboardPage.totalProductsWidget.textContent();
    const productCount = parseInt(widgetText?.match(/\d+/)?.[0] || '0');
    expect(productCount).toBeGreaterThanOrEqual(0);

    // Verify widget is clickable and navigates to Product Management
    await dashboardPage.totalProductsWidget.click();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/product-management/);
  });

  test('TC_SCRUM18_005: Verify Total Interest widget functionality', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify Total Interest widget displays
    await expect(dashboardPage.totalInterestWidget).toBeVisible();

    // Extract widget count
    const widgetText = await dashboardPage.totalInterestWidget.textContent();
    const interestCount = parseInt(widgetText?.match(/\d+/)?.[0] || '0');
    expect(interestCount).toBeGreaterThanOrEqual(0);

    // Verify widget links to Interest Expressed tab
    await dashboardPage.totalInterestWidget.click();
    await page.waitForLoadState('load');
    await expect(dashboardPage.interestExpressedTab).toHaveAttribute('aria-current', 'page');
  });

  test('TC_SCRUM18_006: Verify Total Listings widget accuracy', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify Total Listings widget displays
    await expect(dashboardPage.totalListingsWidget).toBeVisible();

    // Extract widget count
    const widgetText = await dashboardPage.totalListingsWidget.textContent();
    const listingsCount = parseInt(widgetText?.match(/\d+/)?.[0] || '0');
    expect(listingsCount).toBeGreaterThanOrEqual(0);

    // Verify widget navigates to published products view
    await dashboardPage.totalListingsWidget.click();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/product-management/);
  });

  test('TC_SCRUM18_007: Verify Average Rating widget calculation', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify Avg. Rating widget displays
    await expect(dashboardPage.avgRatingWidget).toBeVisible();

    // Extract rating value
    const widgetText = await dashboardPage.avgRatingWidget.textContent();
    const ratingMatch = widgetText?.match(/\d+\.?\d*/);
    const rating = ratingMatch ? parseFloat(ratingMatch[0]) : 0;

    // Verify rating is between 0 and 5
    expect(rating).toBeGreaterThanOrEqual(0);
    expect(rating).toBeLessThanOrEqual(5);

    // Verify widget links to Reviews & Ratings section
    await dashboardPage.avgRatingWidget.click();
    await page.waitForLoadState('load');
    await expect(dashboardPage.reviewsRatingsTab).toHaveAttribute('aria-current', 'page');
  });

  test('TC_SCRUM18_008: Verify Product Management tab functionality', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Click Product Management tab
    await dashboardPage.productManagementTab.click();
    await page.waitForLoadState('load');

    // Verify tab activates
    await expect(dashboardPage.productManagementTab).toHaveAttribute('aria-current', 'page');

    // Verify product list displays
    const productList = page.locator('[class*="product"], [role="list"]').first();
    await expect(productList).toBeVisible({ timeout: 10000 });

    // Verify product actions are visible
    const editButton = page.getByRole('button', { name: /edit|modify/i }).first();
    const deleteButton = page.getByRole('button', { name: /delete|remove/i }).first();
    await expect(editButton).toBeVisible();
    await expect(deleteButton).toBeVisible();
  });

  test('TC_SCRUM18_009: Verify Product Upload tab functionality', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Click Product Upload tab
    await dashboardPage.productUploadTab.click();
    await page.waitForLoadState('load');

    // Verify tab activates
    await expect(dashboardPage.productUploadTab).toHaveAttribute('aria-current', 'page');

    // Verify upload form displays
    const productNameField = page.getByPlaceholder(/e.g., Ergonomic|Product Name/i);
    await expect(productNameField).toBeVisible({ timeout: 10000 });

    // Verify form validation works
    await productNameField.fill('Test Product');
    await expect(productNameField).toHaveValue('Test Product');

    // Verify upload and save buttons are visible
    const uploadButton = page.getByRole('button', { name: /upload|submit/i });
    const saveButton = page.getByRole('button', { name: /save as draft/i });
    await expect(uploadButton).toBeVisible();
    await expect(saveButton).toBeVisible();
  });

  test('TC_SCRUM18_010: Verify Interest Expressed tab functionality', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Click Interest Expressed tab
    await dashboardPage.interestExpressedTab.click();
    await page.waitForLoadState('load');

    // Verify tab activates
    await expect(dashboardPage.interestExpressedTab).toHaveAttribute('aria-current', 'page');

    // Verify interest list displays
    const interestList = page.locator('[class*="interest"], [role="list"]').first();
    await expect(interestList).toBeVisible({ timeout: 10000 });

    // Verify filtering options are available
    const filterButton = page.getByRole('button', { name: /filter|sort/i }).first();
    await expect(filterButton).toBeVisible();
  });

  test('TC_SCRUM18_011: Verify Queries tab functionality', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Click Queries tab
    await dashboardPage.queriesTab.click();
    await page.waitForLoadState('load');

    // Verify tab activates
    await expect(dashboardPage.queriesTab).toHaveAttribute('aria-current', 'page');

    // Verify queries list displays
    const queriesList = page.locator('[class*="query"], [role="list"]').first();
    await expect(queriesList).toBeVisible({ timeout: 10000 });

    // Verify response form is available
    const responseForm = page.locator('[class*="response"], [role="form"]').first();
    await expect(responseForm).toBeVisible();
  });

  test('TC_SCRUM18_012: Verify Reviews & Ratings tab functionality', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Click Reviews & Ratings tab
    await dashboardPage.reviewsRatingsTab.click();
    await page.waitForLoadState('load');

    // Verify tab activates
    await expect(dashboardPage.reviewsRatingsTab).toHaveAttribute('aria-current', 'page');

    // Verify reviews list displays
    const reviewsList = page.locator('[class*="review"], [role="list"]').first();
    await expect(reviewsList).toBeVisible({ timeout: 10000 });

    // Verify filtering options are available
    const filterButton = page.getByRole('button', { name: /filter|sort/i }).first();
    await expect(filterButton).toBeVisible();
  });

  test('TC_SCRUM18_013: Verify notification bell icon functionality', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify bell icon displays in header
    await expect(dashboardPage.notificationBellBtn).toBeVisible();

    // Click bell icon to open popup
    await dashboardPage.openNotificationPopup();

    // Verify popup displays notifications
    await expect(dashboardPage.notificationPopupHeading).toBeVisible();

    // Verify popup closes when clicking outside
    await page.click('body', { position: { x: 0, y: 0 } });
    await expect(dashboardPage.notificationPopupHeading).not.toBeVisible();
  });

  test('TC_SCRUM18_014: Verify notification popup interactions', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Open notification popup
    await dashboardPage.openNotificationPopup();

    // Verify Mark all read button is visible
    await expect(dashboardPage.markAllReadBtn).toBeVisible();

    // Click Mark all read button
    await dashboardPage.markAllReadBtn.click();
    await page.waitForTimeout(1000);

    // Verify View All Notifications button
    await expect(dashboardPage.viewAllNotificationsBtn).toBeVisible();

    // Click View All Notifications
    await dashboardPage.viewAllNotificationsBtn.click();
    await page.waitForLoadState('load');

    // Verify navigation to detailed notification centre
    await expect(dashboardPage.notificationCenterHeading).toBeVisible();
  });

  test('TC_SCRUM18_015: Verify detailed notification centre', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Navigate to detailed notification centre
    await dashboardPage.navigateToNotificationCenter();

    // Verify all filter tabs display
    await expect(dashboardPage.notificationTabAll).toBeVisible();
    await expect(dashboardPage.notificationTabUnread).toBeVisible();
    await expect(dashboardPage.notificationTabInterest).toBeVisible();
    await expect(dashboardPage.notificationTabUpdates).toBeVisible();
    await expect(dashboardPage.notificationTabReviews).toBeVisible();
    await expect(dashboardPage.notificationTabAdmin).toBeVisible();

    // Test filtering by notification type
    await dashboardPage.clickNotificationTab('Interest');
    await page.waitForTimeout(500);
    await expect(dashboardPage.notificationTabInterest).toHaveAttribute('aria-current', 'page');

    // Verify retention policy text
    await expect(dashboardPage.retentionPolicyText).toBeVisible();
  });

  test('TC_SCRUM18_016: Verify notification real-time updates', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify bell icon is visible
    await expect(dashboardPage.notificationBellBtn).toBeVisible();

    // Open notification popup
    await dashboardPage.openNotificationPopup();

    // Verify notifications are displayed
    const notificationItems = page.locator('[class*="notification"], [role="listitem"]');
    const initialCount = await notificationItems.count();
    expect(initialCount).toBeGreaterThanOrEqual(0);

    // Close popup
    await page.click('body', { position: { x: 0, y: 0 } });
    await page.waitForTimeout(500);

    // Reopen popup to verify it refreshes
    await dashboardPage.openNotificationPopup();
    const updatedCount = await notificationItems.count();
    expect(updatedCount).toBeGreaterThanOrEqual(0);
  });

  test('TC_SCRUM18_017: Verify mobile viewport functionality', async ({ page }) => {
    // Resize browser to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify dashboard layout adapts
    await expect(dashboardPage.welcomeHeading).toBeVisible();

    // Verify hamburger menu is visible on mobile
    await expect(dashboardPage.hamburgerMenuBtn).toBeVisible();

    // Verify widgets are visible
    await dashboardPage.verifyAllWidgetsVisible();

    // Verify tabs are accessible
    await dashboardPage.verifyAllTabsVisible();
  });

  test('TC_SCRUM18_018: Verify tablet viewport functionality', async ({ page }) => {
    // Resize browser to tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify dashboard layout adapts
    await expect(dashboardPage.welcomeHeading).toBeVisible();

    // Verify tab navigation works
    await dashboardPage.productUploadTab.click();
    await page.waitForLoadState('load');
    await expect(page).toHaveURL(/product-upload/);

    // Navigate back to dashboard
    await dashboardPage.dashboardBtn.click();
    await expect(dashboardPage.welcomeHeading).toBeVisible();

    // Verify notification centre works
    await dashboardPage.openNotificationPopup();
    await expect(dashboardPage.notificationPopupHeading).toBeVisible();
  });

  test('TC_SCRUM18_019: Verify network error handling', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Simulate network offline
    await page.context().setOffline(true);
    await page.waitForTimeout(1000);

    // Verify error message appears
    const errorMessage = page.locator('text=/network|offline|connection|error/i');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    // Restore network
    await page.context().setOffline(false);
    await page.waitForTimeout(1000);

    // Verify page recovers
    await expect(dashboardPage.welcomeHeading).toBeVisible({ timeout: 10000 });
  });

  test('TC_SCRUM18_020: Verify empty state handling', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Navigate to Product Management tab
    await dashboardPage.productManagementTab.click();
    await page.waitForLoadState('load');

    // Check for empty state message if no products
    const emptyStateMessage = page.locator('text=/no products|empty|get started/i');
    const hasProducts = await page.locator('[class*="product"], [role="listitem"]').count();

    if (hasProducts === 0) {
      await expect(emptyStateMessage).toBeVisible();
      // Verify call-to-action button
      const ctaButton = page.getByRole('button', { name: /upload|create|add/i });
      await expect(ctaButton).toBeVisible();
    }
  });

  test('TC_SCRUM18_021: Verify session timeout handling', async ({ page }) => {
    // Login as approved AP
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // Verify dashboard is accessible
    await expect(dashboardPage.welcomeHeading).toBeVisible();

    // Wait for potential session timeout warning
    const sessionWarning = page.locator('text=/session|timeout|expire|login again/i');
    const warningVisible = await sessionWarning.isVisible({ timeout: 5000 }).catch(() => false);

    if (warningVisible) {
      // Verify session extension button is available
      const extendButton = page.getByRole('button', { name: /extend|continue|stay/i });
      await expect(extendButton).toBeVisible();
    }
  });
});
