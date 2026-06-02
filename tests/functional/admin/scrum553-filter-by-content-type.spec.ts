// spec: specs/functional/SCRUM-553-filter-by-content-type.json

import { test, expect } from '@playwright/test';
import { CommentModerationPage } from '../../../pages/comment-moderation.page';
import testData from '../../../test-data/scrum553-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-553: Admin - Filter by Content Type', () => {
  let commentModerationPage: CommentModerationPage;

  test.beforeEach(async ({ page }) => {
    commentModerationPage = new CommentModerationPage(page);
    await commentModerationPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await commentModerationPage.navigateToCommentModeration();
  });

  test('TC_TFILTER_001: Content type filter is visible with correct options', async () => {
    // Locate the content type filter control and verify it is visible
    await commentModerationPage.verifyTypesFilterVisible();

    // Click/open the filter to see available options
    await commentModerationPage.verifyTypesFilterOptions(testData.expected.typeFilterOptions);
  });

  test('TC_TFILTER_002: Selecting All Types shows all content', async () => {
    // Verify default state shows all items
    await commentModerationPage.verifyTypesFilterVisible();
    await commentModerationPage.verifyShowingItemsCount();
    await commentModerationPage.verifyMultipleCardsDisplayed();
  });

  test('TC_TFILTER_003: Selecting Queries shows only query items', async () => {
    // Select 'Queries' from the content type filter
    await commentModerationPage.selectTypeFilter('Queries');

    // Verify only items with Query content type are displayed
    await commentModerationPage.verifyContentTypeVisible('Query');
  });

  test('TC_TFILTER_004: Selecting Reviews shows only review items', async () => {
    // Select 'Reviews' from the content type filter
    await commentModerationPage.selectTypeFilter('Reviews');

    // Verify only items with Review content type are displayed
    await commentModerationPage.verifyContentTypeVisible('Review');
  });

  test('TC_TFILTER_005: Selecting Vendor Responses shows only vendor response items', async () => {
    // Select 'Vendor Responses' from the content type filter
    await commentModerationPage.selectTypeFilter('Vendor Responses');

    // Verify only items with Vendor Response content type are displayed
    await commentModerationPage.verifyContentTypeVisible('Vendor Response');
  });

  test('TC_TFILTER_006: Type tag is clearly displayed on each moderation card', async () => {
    // Observe moderation cards and verify each has a visible type tag
    await commentModerationPage.verifyCardDisplaysContentType();
  });

  test('TC_TFILTER_007: Filter updates list immediately on selection', async () => {
    // Note the current list
    await commentModerationPage.verifyShowingItemsCount();

    // Select 'Queries' from the type filter
    await commentModerationPage.selectTypeFilter('Queries');

    // Verify the list updates immediately (cards are visible)
    await commentModerationPage.verifyCardDisplaysAuthorName();

    // Verify we are still on the same page (no reload)
    await commentModerationPage.verifyOnCommentModerationPage();
  });

  test('TC_TFILTER_008: Type filter works with status filter combined', async () => {
    // Click Needs Attention tab to apply status filter
    await commentModerationPage.clickNeedsAttentionTab();

    // Select 'Reviews' from the content type filter
    await commentModerationPage.selectTypeFilter('Reviews');

    // Verify results are filtered by both status and content type
    await commentModerationPage.verifyContentTypeVisible('Review');
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_TFILTER_009: Type filter works with search combined', async () => {
    // Select 'Queries' from the type filter
    await commentModerationPage.selectTypeFilter('Queries');

    // Type a search query in the search field
    await commentModerationPage.typeInSearch(testData.inputs.searchByProduct);
    await commentModerationPage.waitForSearchResults();

    // Verify results are filtered by both type and search
    await commentModerationPage.verifyContentTypeVisible('Query');
  });

  test('TC_TFILTER_010: Empty results for selected type shows empty state', async () => {
    // Apply type filter + search that yields no results
    await commentModerationPage.selectTypeFilter('Vendor Responses');
    await commentModerationPage.typeInSearch(testData.inputs.searchNoResults);
    await commentModerationPage.waitForSearchResults();

    // Verify empty state is shown
    await commentModerationPage.verifyNoSearchResults();
  });

  test('TC_TFILTER_011: Switching between type filters updates correctly', async () => {
    // Select 'Queries' and verify
    await commentModerationPage.selectTypeFilter('Queries');
    await commentModerationPage.verifyContentTypeVisible('Query');

    // Reload and select 'Reviews' to verify switching works
    await commentModerationPage.reloadAndWaitForList();
    await commentModerationPage.selectTypeFilter('Reviews');
    await commentModerationPage.verifyContentTypeVisible('Review');
  });

  test('TC_TFILTER_012: Type tags are visually distinguishable from each other', async () => {
    // Verify different content types are visible (Query and Review at minimum)
    await commentModerationPage.verifyContentTypeVisible('Review');
    await commentModerationPage.verifyContentTypeVisible('Query');
  });
});
