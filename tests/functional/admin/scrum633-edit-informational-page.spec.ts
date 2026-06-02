// spec: specs/functional/SCRUM-633-edit-informational-page.json

import { test, expect } from '@playwright/test';
import { ContentManagementPage } from '../../../pages/content-management.page';
import testData from '../../../test-data/scrum633-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-633: Admin - Edit Informational Page', () => {
  let contentManagementPage: ContentManagementPage;

  test.beforeEach(async ({ page }) => {
    contentManagementPage = new ContentManagementPage(page);
    await contentManagementPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await contentManagementPage.navigateToContentManagement();
  });

  test('TC_EDIT_PAGE_001: Edit button is visible on article cards', async () => {
    // Verify Edit button is visible on articles
    await contentManagementPage.verifyEditButtonVisible();
  });

  test('TC_EDIT_PAGE_002: Articles exist in the Content Management page', async () => {
    // Verify articles are displayed
    await contentManagementPage.verifyArticlesExist();
  });

  test('TC_EDIT_PAGE_003: Content Management page has correct heading', async () => {
    // Verify page heading
    await contentManagementPage.verifyPageHeading(testData.expected.pageHeading);
  });

  test('TC_EDIT_PAGE_004: Clicking Edit opens a panel/modal', async () => {
    // Click Edit on the first article
    await contentManagementPage.clickEditOnFirstArticle();

    // Verify Save/Update button appears (indicating edit mode)
    await contentManagementPage.verifySaveChangesButtonVisible();
  });

  test('TC_EDIT_PAGE_005: Edit panel has Cancel option', async () => {
    // Click Edit on the first article
    await contentManagementPage.clickEditOnFirstArticle();

    // Verify cancel is available
    await contentManagementPage.verifyEditModalCancelVisible();
  });

  test('TC_EDIT_PAGE_006: Page remains on Content Management URL', async () => {
    // Verify URL
    await contentManagementPage.verifyOnContentManagementPage();
  });
});
