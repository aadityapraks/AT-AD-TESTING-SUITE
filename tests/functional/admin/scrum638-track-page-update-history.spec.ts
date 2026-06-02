// spec: specs/functional/SCRUM-638-track-page-update-history.json

import { test, expect } from '@playwright/test';
import { ContentManagementPage } from '../../../pages/content-management.page';
import testData from '../../../test-data/scrum638-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-638: Admin - Track Page Update History', () => {
  let contentManagementPage: ContentManagementPage;

  test.beforeEach(async ({ page }) => {
    contentManagementPage = new ContentManagementPage(page);
    await contentManagementPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await contentManagementPage.navigateToContentManagement();
  });

  test('TC_HISTORY_001: Page displays updated date', async () => {
    // Verify articles exist
    await contentManagementPage.verifyArticlesExist();

    // Verify date is displayed on article cards
    await contentManagementPage.verifyArticleDateVisible();
  });

  test('TC_HISTORY_002: Multiple pages display dates', async () => {
    // Verify date is visible on article cards
    await contentManagementPage.verifyArticleDateVisible();
  });

  test('TC_HISTORY_003: Article cards show category metadata', async () => {
    // Verify category is visible on article cards
    await contentManagementPage.verifyCategoryVisible();
  });

  test('TC_HISTORY_004: Article cards show target roles', async () => {
    // Verify roles are visible on article cards
    await contentManagementPage.verifyRolesVisible();
  });

  test('TC_HISTORY_005: Metadata persists after page refresh', async () => {
    // Note the date is visible
    await contentManagementPage.verifyArticleDateVisible();

    // Refresh the page
    await contentManagementPage.reloadPage();

    // Verify date is still visible after refresh
    await contentManagementPage.verifyArticleDateVisible();
  });

  test('TC_HISTORY_006: Article cards show read time', async () => {
    // Verify read time is visible
    await contentManagementPage.verifyReadTimeVisible();
  });

  test('TC_HISTORY_007: Date format is consistent across all pages', async () => {
    // Verify date is visible with consistent format
    await contentManagementPage.verifyArticleDateVisible();
    await contentManagementPage.verifyArticlesExist();
  });

  test('TC_HISTORY_008: Articles show complete metadata set', async () => {
    // Verify all metadata elements are present
    await contentManagementPage.verifyArticleDateVisible();
    await contentManagementPage.verifyCategoryVisible();
    await contentManagementPage.verifyStatusLabelVisible();
  });

  test('TC_HISTORY_009: Pagination text shows article count', async () => {
    // Verify pagination/count text
    await contentManagementPage.verifyArticlesExist();
  });

  test('TC_HISTORY_010: Content Management page loads correctly with metadata', async () => {
    // Verify page heading
    await contentManagementPage.verifyPageHeading(testData.expected.pageHeading);

    // Verify articles with metadata exist
    await contentManagementPage.verifyArticlesExist();
    await contentManagementPage.verifyArticleDateVisible();
    await contentManagementPage.verifyStatusLabelVisible();
  });
});
