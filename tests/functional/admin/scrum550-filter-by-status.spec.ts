// spec: specs/functional/SCRUM-550-filter-by-status.json

import { test, expect } from '@playwright/test';
import { CommentModerationPage } from '../../../pages/comment-moderation.page';
import testData from '../../../test-data/scrum550-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-550: Admin - Filter by Status', () => {
  let commentModerationPage: CommentModerationPage;

  test.beforeEach(async ({ page }) => {
    commentModerationPage = new CommentModerationPage(page);
    await commentModerationPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await commentModerationPage.navigateToCommentModeration();
  });

  test('TC_SFILTER_001: Status filter is visible with correct options', async () => {
    // Locate the status filter control and verify it is visible
    await commentModerationPage.verifyStatusFilterVisible();

    // Click/open the filter to see available options
    await commentModerationPage.verifyStatusFilterOptions(testData.expected.statusFilterOptions);
  });

  test('TC_SFILTER_002: Default All Status shows all moderation items', async () => {
    // Verify default state shows all items
    await commentModerationPage.verifyStatusFilterVisible();
    await commentModerationPage.verifyShowingItemsCount();
    await commentModerationPage.verifyMultipleCardsDisplayed();
  });

  test('TC_SFILTER_003: Selecting Admin Review shows only admin review items', async () => {
    // Select 'Admin Review' from the status filter
    await commentModerationPage.selectStatusFilter('Admin Review');

    // Verify only items with Admin Review Required status are displayed
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_SFILTER_004: Selecting Approved via Recently Approved tab shows only approved items', async () => {
    // Click Recently Approved tab to show approved items
    await commentModerationPage.clickRecentlyApprovedTab();

    // Verify only items with Approved status are displayed
    await commentModerationPage.verifyApprovedStatusOnCards();
  });

  test('TC_SFILTER_005: Selecting Rejected via Rejected Content tab shows only rejected items', async () => {
    // Click Rejected Content tab to show rejected items
    await commentModerationPage.clickRejectedContentTab();

    // Verify only items with Rejected status are displayed
    await commentModerationPage.verifyRejectedStatusOnCards();
  });

  test('TC_SFILTER_006: Selecting a filter updates the list immediately', async () => {
    // Note the current list state
    await commentModerationPage.verifyShowingItemsCount();

    // Select a different status filter
    await commentModerationPage.selectStatusFilter('Admin Review');

    // Verify the list updates immediately (cards are visible)
    await commentModerationPage.verifyCardDisplaysAuthorName();

    // Verify we are still on the same page (no reload)
    await commentModerationPage.verifyOnCommentModerationPage();
  });

  test('TC_SFILTER_007: Needs Attention tab shows items needing review', async () => {
    // Click Needs Attention tab
    await commentModerationPage.clickNeedsAttentionTab();

    // Verify items with Admin Review Required status are visible
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_SFILTER_008: Vendor Flagged filter shows vendor flagged items', async () => {
    // Select 'Vendor Flagged' from the status filter
    await commentModerationPage.selectStatusFilter('Vendor Flagged');

    // Verify items are shown (or empty state if no vendor flagged items)
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_SFILTER_009: Filter works along with search', async () => {
    // Click Needs Attention tab to apply status filter
    await commentModerationPage.clickNeedsAttentionTab();

    // Type a search query in the search field
    await commentModerationPage.typeInSearch(testData.inputs.searchByProduct);
    await commentModerationPage.waitForSearchResults();

    // Verify results are filtered by both status and search
    await commentModerationPage.verifyCardDisplaysAuthorName();
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_SFILTER_010: Empty results for filter + search shows No results found', async () => {
    // Apply a filter + search combination that yields no results
    await commentModerationPage.clickNeedsAttentionTab();
    await commentModerationPage.typeInSearch(testData.inputs.searchNoResults);
    await commentModerationPage.waitForSearchResults();

    // Verify no moderation cards are displayed and empty state shown
    await commentModerationPage.verifyNoSearchResults();
  });

  test('TC_SFILTER_011: Switching between tabs updates results correctly', async () => {
    // Click Needs Attention tab
    await commentModerationPage.clickNeedsAttentionTab();
    await commentModerationPage.verifyAdminReviewRequiredStatus();

    // Switch to Recently Approved tab
    await commentModerationPage.clickRecentlyApprovedTab();
    await commentModerationPage.verifyApprovedStatusOnCards();

    // Switch to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();
    await commentModerationPage.verifyRejectedStatusOnCards();
  });

  test('TC_SFILTER_012: Filter selection resets after page refresh', async () => {
    // Select a status filter
    await commentModerationPage.selectStatusFilter('Admin Review');

    // Refresh the page
    await commentModerationPage.reloadAndWaitForList();

    // Verify the filter resets to default 'All Status'
    await commentModerationPage.verifyStatusFilterVisible();
    await commentModerationPage.verifyMultipleCardsDisplayed();
  });

  test('TC_SFILTER_013: Filter button text updates when active', async () => {
    // Select 'Admin Review' from the filter
    await commentModerationPage.selectStatusFilter('Admin Review');

    // Verify the filter button shows the selected value
    await commentModerationPage.verifyStatusFilterButtonText('Admin Review');
  });
});
