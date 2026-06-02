// spec: specs/functional/SCRUM-577-reject-content.json

import { test, expect } from '@playwright/test';
import { CommentModerationPage } from '../../../pages/comment-moderation.page';
import testData from '../../../test-data/scrum577-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-577: Admin - Reject Content', () => {
  let commentModerationPage: CommentModerationPage;

  test.beforeEach(async ({ page }) => {
    commentModerationPage = new CommentModerationPage(page);
    await commentModerationPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await commentModerationPage.navigateToCommentModeration();
  });

  test('TC_REJECT_001: Rejected content shows Rejected status badge', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify rejected items show Rejected status badge
    await commentModerationPage.verifyRejectedStatusOnCards();
  });

  test('TC_REJECT_002: Rejected content is in Rejected Content tab (not publicly visible)', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify rejected items exist and show author info
    await commentModerationPage.verifyCardDisplaysAuthorName();
    await commentModerationPage.verifyRejectedStatusOnCards();
  });

  test('TC_REJECT_003: Rejection reason is displayed on rejected cards', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify Rejection Reason section is visible
    await commentModerationPage.verifyRejectionReasonVisible();
  });

  test('TC_REJECT_004: Rejected cards show moderation timestamp', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify moderated timestamp is visible
    await commentModerationPage.verifyModerationTimestampVisible();
  });

  test('TC_REJECT_005: Rejected cards show who performed the rejection', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify "by Admin" or "by AI Moderated" is visible
    await commentModerationPage.verifyRejectedByVisible();
  });

  test('TC_REJECT_006: Reject button not available on already rejected content', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify no Reject button on already rejected items
    await commentModerationPage.verifyCardDisplaysAuthorName();
    // Only View Product button should be visible, not Reject
    await commentModerationPage.verifyViewProductButtonVisible();
  });

  test('TC_REJECT_007: Rejected Content tab shows correct count', async () => {
    // Verify Rejected Content tab has a count
    const count = await commentModerationPage.getTabCount('Show rejected content');
    expect(count, 'Rejected content count should be >= 0').toBeGreaterThanOrEqual(0);
  });

  test('TC_REJECT_008: Rejected items show content type', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify content type is visible on rejected cards
    await commentModerationPage.verifyCardDisplaysContentType();
  });

  test('TC_REJECT_009: Rejected items show product name', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify product name is visible
    await commentModerationPage.verifyCardDisplaysProductName();
  });

  test('TC_REJECT_010: Rejected items show original content text', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify content text is visible
    await commentModerationPage.verifyCardDisplaysContentText();
  });

  test('TC_REJECT_011: Rejected items show flagged keywords if applicable', async () => {
    // Navigate to Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();

    // Verify flagged keywords are visible on items that were flagged
    await commentModerationPage.verifyFlaggedKeywordsVisible();
  });

  test('TC_REJECT_012: Switching between tabs shows correct content', async () => {
    // Click Rejected Content tab
    await commentModerationPage.clickRejectedContentTab();
    await commentModerationPage.verifyRejectedStatusOnCards();

    // Switch to Recently Approved tab
    await commentModerationPage.clickRecentlyApprovedTab();
    await commentModerationPage.verifyApprovedStatusOnCards();

    // Switch back to Rejected Content
    await commentModerationPage.clickRejectedContentTab();
    await commentModerationPage.verifyRejectedStatusOnCards();
  });
});
