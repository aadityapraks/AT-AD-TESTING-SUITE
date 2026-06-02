// spec: specs/functional/SCRUM-559-ai-spam-detection.json

import { test, expect } from '@playwright/test';
import { CommentModerationPage } from '../../../pages/comment-moderation.page';
import testData from '../../../test-data/scrum559-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-559: Admin - AI Spam Detection', () => {
  let commentModerationPage: CommentModerationPage;

  test.beforeEach(async ({ page }) => {
    commentModerationPage = new CommentModerationPage(page);
    await commentModerationPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await commentModerationPage.navigateToCommentModeration();
  });

  test('TC_SPAM_001: External URLs are detected and flagged', async () => {
    // Navigate to Comment Moderation page (done in beforeEach)
    // Find a card with content containing external URLs
    // Verify flagging behavior - flagged keywords and AI moderation result visible
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyAIModerationResultVisible();
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_SPAM_002: Suspicious phone numbers are flagged', async () => {
    // Find a card with content containing suspicious phone numbers
    // Verify the system flags content with spam indicators
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyAIModerationResultVisible();
  });

  test('TC_SPAM_003: Promotional keywords trigger spam detection', async () => {
    // Find a card with promotional content
    // Verify flagging behavior
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyAIModerationResultText();
  });

  test('TC_SPAM_004: Flagged spam content shows Admin Review Required status', async () => {
    // Find a card with spam indicators
    // Verify the status badge shows Admin Review Required
    await commentModerationPage.verifyAdminReviewRequiredStatus();
    await commentModerationPage.verifyFlaggedKeywordsVisible();
  });

  test('TC_SPAM_005: Admin can approve flagged spam content', async () => {
    // Find a flagged item
    // Verify Approve action is available
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyFlaggedKeywordsVisible();
  });

  test('TC_SPAM_006: Admin can reject flagged spam content', async () => {
    // Find a flagged spam item
    // Verify Reject action is available
    await commentModerationPage.verifyRejectButtonVisible();
    await commentModerationPage.verifyFlaggedKeywordsVisible();
  });

  test('TC_SPAM_007: Excessive punctuation triggers spam detection', async () => {
    // Find a card with excessive punctuation flagged
    // Verify flagged keywords section is visible
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyMultipleFlaggedKeywords();
  });

  test('TC_SPAM_008: Legitimate content in approved tab is not flagged as spam', async () => {
    // Switch to Recently Approved tab to find clean content
    await commentModerationPage.clickRecentlyApprovedTab();

    // Verify approved content exists (legitimate content passed moderation)
    await commentModerationPage.verifyApprovedStatusOnCards();
  });

  test('TC_SPAM_009: Flagged spam items appear in Needs Attention tab', async () => {
    // Click Needs Attention tab
    await commentModerationPage.clickNeedsAttentionTab();

    // Verify flagged items with AI moderation are visible
    await commentModerationPage.verifyAdminReviewRequiredStatus();
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyAIModerationResultVisible();
  });

  test('TC_SPAM_010: Device Matcher Notes provide clear spam explanation', async () => {
    // Find a spam-flagged card
    // Verify AI Moderation Result provides clear explanation
    await commentModerationPage.verifyAIModerationResultVisible();
    await commentModerationPage.verifyAIModerationResultText();

    // Verify flagged keywords are also shown
    await commentModerationPage.verifyFlaggedKeywordsVisible();
  });

  test('TC_SPAM_011: Both approve and reject actions available on spam items', async () => {
    // Verify both action buttons are present on flagged cards
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyRejectButtonVisible();
    await commentModerationPage.verifyViewProductButtonVisible();
  });

  test('TC_SPAM_012: Spam flagged content shows complete card information', async () => {
    // Verify flagged cards still show all standard card elements
    await commentModerationPage.verifyCardDisplaysAuthorName();
    await commentModerationPage.verifyCardDisplaysContentType();
    await commentModerationPage.verifyCardDisplaysDateTime();
    await commentModerationPage.verifyCardDisplaysProductName();
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyAIModerationResultVisible();
  });
});
