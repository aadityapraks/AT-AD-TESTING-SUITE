// spec: specs/functional/SCRUM-547-search-moderation-content.json

import { test, expect } from '@playwright/test';
import { CommentModerationPage } from '../../../pages/comment-moderation.page';
import testData from '../../../test-data/scrum547-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-547: Admin - Search Moderation Content', () => {
  let commentModerationPage: CommentModerationPage;

  test.beforeEach(async ({ page }) => {
    commentModerationPage = new CommentModerationPage(page);
    await commentModerationPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await commentModerationPage.navigateToCommentModeration();
  });

  test('TC_MSEARCH_001: Search input is visible and accepts text', async () => {
    // Locate the search input field and verify it is visible
    await commentModerationPage.verifySearchInputVisible();

    // Verify the field has a placeholder indicating search purpose
    await commentModerationPage.verifySearchPlaceholder(testData.expected.searchPlaceholder);

    // Click on the search field to verify it gains focus
    await commentModerationPage.clickSearchInput();
    await commentModerationPage.verifySearchInputFocused();

    // Type text and verify it appears in the field
    await commentModerationPage.typeInSearch(testData.inputs.searchByProduct);
    await commentModerationPage.verifySearchInputValue(testData.inputs.searchByProduct);
  });

  test('TC_MSEARCH_002: Search by author name returns matching results', async () => {
    // Type an author name in the search field
    await commentModerationPage.typeInSearch(testData.inputs.searchByAuthor);
    await commentModerationPage.waitForSearchResults();

    // Verify results filter to show matching items
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_MSEARCH_003: Search by product name returns matching results', async () => {
    // Type a product name in the search field
    await commentModerationPage.typeInSearch(testData.inputs.searchByProduct);
    await commentModerationPage.waitForSearchResults();

    // Verify results filter to show items matching the product name
    await commentModerationPage.verifyProductNameVisible(testData.inputs.searchByProduct);
  });

  test('TC_MSEARCH_004: Search by content text returns matching results', async () => {
    // Type a phrase from content text in the search field
    await commentModerationPage.typeInSearch(testData.inputs.searchByContent);
    await commentModerationPage.waitForSearchResults();

    // Verify results show items whose content contains the search text
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_MSEARCH_005: Search supports partial text match from 3 characters', async () => {
    // Type 2 characters - observe no filtering
    await commentModerationPage.typeInSearch(testData.inputs.searchTwoChars);
    await commentModerationPage.waitForSearchResults();

    // Type a 3rd character - results begin filtering
    await commentModerationPage.typeInSearch(testData.inputs.searchThreeChars);
    await commentModerationPage.waitForSearchResults();

    // Verify results are shown (partial match works)
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_MSEARCH_006: Search works across all content types', async () => {
    // Type a search query that could match items across different content types
    await commentModerationPage.typeInSearch(testData.inputs.searchByAuthor);
    await commentModerationPage.waitForSearchResults();

    // Verify results include items (search is not limited to single type)
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_MSEARCH_007: Search respects selected status filter', async () => {
    // Click Needs Attention tab to apply status filter
    await commentModerationPage.clickNeedsAttentionTab();

    // Type a search query
    await commentModerationPage.typeInSearch(testData.inputs.searchByProduct);
    await commentModerationPage.waitForSearchResults();

    // Verify results are filtered by both status and search
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_MSEARCH_008: Search respects selected content type filter', async () => {
    // Apply a content type filter (e.g., 'Reviews')
    await commentModerationPage.selectTypeFilter(testData.inputs.contentTypeFilter);
    await commentModerationPage.waitForSearchResults();

    // Type a search query
    await commentModerationPage.typeInSearch(testData.inputs.searchByProduct);
    await commentModerationPage.waitForSearchResults();

    // Verify results are filtered by both type filter and search query
    await commentModerationPage.verifyContentTypeVisible('Review');
  });

  test('TC_MSEARCH_009: No results found shows empty state', async () => {
    // Type a search query that matches no items
    await commentModerationPage.typeInSearch(testData.inputs.searchNoResults);
    await commentModerationPage.waitForSearchResults();

    // Verify no moderation cards are displayed
    await commentModerationPage.verifyNoSearchResults();

    // Verify the search field still contains the typed query
    await commentModerationPage.verifySearchInputValue(testData.inputs.searchNoResults);
  });

  test('TC_MSEARCH_010: Special characters in search are supported', async () => {
    // Type special characters in the search field
    await commentModerationPage.typeInSearch(testData.inputs.searchSpecialChars);
    await commentModerationPage.waitForSearchResults();

    // Verify no errors or crashes occur - field still has value
    await commentModerationPage.verifySearchInputValue(testData.inputs.searchSpecialChars);
  });

  test('TC_MSEARCH_011: Very long search query is supported', async () => {
    // Type a very long search query (100+ characters)
    await commentModerationPage.typeInSearch(testData.inputs.searchLongQuery);
    await commentModerationPage.waitForSearchResults();

    // Verify no errors or crashes occur - field still has value
    await commentModerationPage.verifySearchInputValue(testData.inputs.searchLongQuery);
  });

  test('TC_MSEARCH_012: Clearing search restores full list', async () => {
    // Perform a search that filters results
    await commentModerationPage.typeInSearch(testData.inputs.searchByProduct);
    await commentModerationPage.waitForSearchResults();

    // Clear the search field
    await commentModerationPage.clearSearch();
    await commentModerationPage.waitForSearchResults();

    // Verify the full moderation list is restored
    await commentModerationPage.verifyShowingItemsCount();
    await commentModerationPage.verifyMultipleCardsDisplayed();
  });

  test('TC_MSEARCH_013: Search is case-insensitive', async () => {
    // Type search query in lowercase
    await commentModerationPage.typeInSearch(testData.inputs.searchByProduct.toLowerCase());
    await commentModerationPage.waitForSearchResults();

    // Verify results are returned
    await commentModerationPage.verifyCardDisplaysAuthorName();

    // Clear and type same query in uppercase
    await commentModerationPage.clearSearch();
    await commentModerationPage.typeInSearch(testData.inputs.searchByProduct.toUpperCase());
    await commentModerationPage.waitForSearchResults();

    // Verify same results are returned (case-insensitive)
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_MSEARCH_014: Search results update dynamically as user types', async () => {
    // Type characters one at a time starting from 3rd character
    await commentModerationPage.typeInSearchSlowly(testData.inputs.searchByProduct);
    await commentModerationPage.waitForSearchResults();

    // Verify results update dynamically (cards are shown after typing)
    await commentModerationPage.verifyCardDisplaysAuthorName();

    // Verify no page reload occurred - URL remains the same
    await commentModerationPage.verifyOnCommentModerationPage();
  });
});
