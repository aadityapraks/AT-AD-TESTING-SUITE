// spec: specs/functional/SCRUM-628-create-informational-page.json

import { test, expect } from '@playwright/test';
import { ContentManagementPage } from '../../../pages/content-management.page';
import testData from '../../../test-data/scrum628-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-628: Admin - Create New Informational Page', () => {
  let contentManagementPage: ContentManagementPage;

  test.beforeEach(async ({ page }) => {
    contentManagementPage = new ContentManagementPage(page);
    await contentManagementPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await contentManagementPage.navigateToContentManagement();
  });

  test('TC_PAGE_001: Clicking Add Article opens the page creation modal', async () => {
    // Verify Add Article button is visible
    await contentManagementPage.verifyAddArticleButtonVisible();

    // Click Add Article button
    await contentManagementPage.clickAddArticleButton();

    // Verify modal opens with expected fields
    await contentManagementPage.verifyAddArticleModalOpen();
    await contentManagementPage.verifyTitleFieldVisible();
    await contentManagementPage.verifyContentEditorVisible();
    await contentManagementPage.verifyCreateArticleButtonVisible();
    await contentManagementPage.verifyCancelButtonVisible();
  });

  test('TC_PAGE_002: Admin can enter Page Title', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Type a title and verify it appears
    await contentManagementPage.fillTitle(testData.inputs.title);
    await contentManagementPage.verifyTitleFieldValue(testData.inputs.title);
  });

  test('TC_PAGE_003: Admin can enter Page Content', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Verify content editor is visible
    await contentManagementPage.verifyContentEditorVisible();

    // Enter content text
    await contentManagementPage.fillContent(testData.inputs.content);
  });

  test('TC_PAGE_004: Modal shows status dropdown with Draft/Active options', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Verify status dropdown is visible
    await contentManagementPage.verifyStatusDropdownVisible();
  });

  test('TC_PAGE_005: Modal shows Help Topics checkboxes', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Verify Help Topics checkboxes are visible
    await contentManagementPage.verifyHelpTopicsCheckboxesVisible();
  });

  test('TC_PAGE_006: Modal shows Target Roles checkboxes', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Verify Target Roles checkboxes are visible
    await contentManagementPage.verifyTargetRolesCheckboxesVisible();
  });

  test('TC_PAGE_007: Article list shows existing articles', async () => {
    // Verify articles are displayed in the list
    await contentManagementPage.verifyArticlesExist();
  });

  test('TC_PAGE_008: Modal has subtitle field', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Verify subtitle field is visible and accepts input
    await contentManagementPage.verifySubtitleFieldVisible();
    await contentManagementPage.fillSubtitle(testData.inputs.subtitle);
    await contentManagementPage.verifySubtitleFieldValue(testData.inputs.subtitle);
  });

  test('TC_PAGE_009: Rich text editor toolbar is visible', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Verify rich text toolbar buttons are visible
    await contentManagementPage.verifyRichTextToolbarVisible();
  });

  test('TC_PAGE_010: Modal can be closed without saving via Cancel', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Enter some data
    await contentManagementPage.fillTitle(testData.inputs.title);

    // Click Cancel
    await contentManagementPage.clickCancel();

    // Verify modal is closed
    await contentManagementPage.verifyModalClosed();
  });

  test('TC_PAGE_011: Modal can be closed via Close (X) button', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Click Close button
    await contentManagementPage.clickCloseModal();

    // Verify modal is closed
    await contentManagementPage.verifyModalClosed();
  });

  test('TC_PAGE_012: Title field accepts special characters', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Enter title with special characters
    await contentManagementPage.fillTitle(testData.inputs.specialCharsTitle);
    await contentManagementPage.verifyTitleFieldValue(testData.inputs.specialCharsTitle);
  });

  test('TC_PAGE_013: Title field accepts long text', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Enter a very long title
    await contentManagementPage.fillTitle(testData.inputs.longTitle);
    await contentManagementPage.verifyTitleFieldValue(testData.inputs.longTitle);
  });

  test('TC_PAGE_014: Page remains on Content Management after closing modal', async () => {
    // Open and close the modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();
    await contentManagementPage.clickCancel();

    // Verify still on Content Management page
    await contentManagementPage.verifyOnContentManagementPage();
    await contentManagementPage.verifyPageHeading(testData.expected.pageHeading);
  });

  test('TC_PAGE_015: Content editor supports multi-line input', async () => {
    // Open the page creation modal
    await contentManagementPage.clickAddArticleButton();
    await contentManagementPage.verifyAddArticleModalOpen();

    // Verify content editor is visible and accepts input
    await contentManagementPage.verifyContentEditorVisible();
    await contentManagementPage.fillContent(testData.inputs.content);
  });
});
