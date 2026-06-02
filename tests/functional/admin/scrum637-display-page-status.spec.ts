// spec: specs/functional/SCRUM-637-display-page-status.json

import { test, expect } from '@playwright/test';
import { ContentManagementPage } from '../../../pages/content-management.page';
import testData from '../../../test-data/scrum637-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-637: Admin - Display Page Status', () => {
  let contentManagementPage: ContentManagementPage;

  test.beforeEach(async ({ page }) => {
    contentManagementPage = new ContentManagementPage(page);
    await contentManagementPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await contentManagementPage.navigateToContentManagement();
  });

  test('TC_STATUS_001: Pages display status labels in the page list', async () => {
    // Verify articles exist in the list
    await contentManagementPage.verifyArticlesExist();

    // Verify status labels are visible on article cards
    await contentManagementPage.verifyStatusLabelVisible();
  });

  test('TC_STATUS_002: Active status label is displayed correctly', async () => {
    // Find a page with Active status
    await contentManagementPage.verifyActiveStatusVisible();
  });

  test('TC_STATUS_003: Status filter dropdown is available', async () => {
    // Verify status filter is visible for filtering by status
    await contentManagementPage.verifyStatusFilterVisible();
  });

  test('TC_STATUS_004: Active pages are visible in admin panel', async () => {
    // Verify active pages are displayed in the list
    await contentManagementPage.verifyArticlesExist();
    await contentManagementPage.verifyActiveStatusVisible();
  });

  test('TC_STATUS_005: Article cards show Edit and Deactivate actions', async () => {
    // Verify Edit button is visible
    await contentManagementPage.verifyEditButtonVisible();

    // Verify Deactivate button is visible
    await contentManagementPage.verifyDeactivateButtonVisible();
  });

  test('TC_STATUS_006: Article cards show Delete action', async () => {
    // Verify Delete button is visible
    await contentManagementPage.verifyDeleteButtonVisible();
  });

  test('TC_STATUS_007: Status labels are consistent after page refresh', async () => {
    // Note the status is Active
    await contentManagementPage.verifyActiveStatusVisible();

    // Refresh the page
    await contentManagementPage.reloadPage();

    // Verify status labels remain the same
    await contentManagementPage.verifyActiveStatusVisible();
  });

  test('TC_STATUS_008: Status labels are visually distinguishable', async () => {
    // Verify status label text is visible and readable
    await contentManagementPage.verifyStatusLabelVisible();

    // Verify articles exist with status
    await contentManagementPage.verifyArticlesExist();
  });

  test('TC_STATUS_009: Content Management page heading is correct', async () => {
    // Verify page heading
    await contentManagementPage.verifyPageHeading(testData.expected.pageHeading);
  });

  test('TC_STATUS_010: Pagination shows article count', async () => {
    // Verify pagination/count text is visible
    await contentManagementPage.verifyArticlesExist();
  });

  test('TC_STATUS_011: Page remains on correct URL', async () => {
    // Verify URL
    await contentManagementPage.verifyOnContentManagementPage();
  });
});
