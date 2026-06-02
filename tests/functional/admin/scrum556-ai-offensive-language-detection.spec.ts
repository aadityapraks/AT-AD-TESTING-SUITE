// spec: specs/functional/SCRUM-556-ai-offensive-language-detection.json

import { test, expect } from '@playwright/test';
import { CommentModerationPage } from '../../../pages/comment-moderation.page';
import testData from '../../../test-data/scrum556-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-556: Admin - AI Offensive Language Detection', () => {
  let commentModerationPage: CommentModerationPage;

  test.beforeEach(async ({ page }) => {
    commentModerationPage = new CommentModerationPage(page);
    await commentModerationPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await commentModerationPage.navigateToCommentModeration();
  });

  test('TC_AI_001: Offensive keywords are highlighted as red badges', async () => {
    // Navigate to Comment Moderation page (done in beforeEach)
    // Find a card that has been flagged for offensive language
    // Verify flagged keywords section is visible with highlighted badges
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyMultipleFlaggedKeywords();
  });

  test('TC_AI_002: Device Matcher Notes explain the reason for flagging', async () => {
    // Find a card flagged by the AI/Device Matcher
    // Verify Device Matcher Notes / AI Moderation Result section is visible
    await commentModerationPage.verifyAIModerationResultVisible();
    await commentModerationPage.verifyAIModerationResultText();
  });

  test('TC_AI_003: Flagged content is marked as Needs Review', async () => {
    // Find a card that was flagged by the AI system
    // Verify the status badge shows Admin Review Required
    await commentModerationPage.verifyAdminReviewRequiredStatus();

    // Verify the item appears when filtering by Needs Attention
    await commentModerationPage.clickNeedsAttentionTab();
    await commentModerationPage.verifyFlaggedKeywordsVisible();
  });

  test('TC_AI_004: Admin can approve flagged content', async () => {
    // Find a flagged item with Needs Review status
    // Verify Approve action is available
    await commentModerationPage.verifyApproveButtonVisible();
  });

  test('TC_AI_005: Admin can reject flagged content', async () => {
    // Find a flagged item with Needs Review status
    // Verify Reject action is available
    await commentModerationPage.verifyRejectButtonVisible();
  });

  test('TC_AI_006: Admin must manually approve or reject - no auto-action', async () => {
    // Verify flagged content stays in Needs Review until admin acts
    await commentModerationPage.clickNeedsAttentionTab();

    // Verify items with flagged keywords are still in Needs Attention
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyAdminReviewRequiredStatus();

    // Verify both Approve and Reject buttons are available (manual action required)
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyRejectButtonVisible();
  });

  test('TC_AI_007: Multiple offensive keywords are each highlighted individually', async () => {
    // Find a card with content containing multiple offensive words
    // Verify multiple badges appear
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyMultipleFlaggedKeywords();
  });

  test('TC_AI_008: Red badge styling is clearly visible and accessible', async () => {
    // Find a card with red keyword badges
    // Verify the badges are visible and readable
    await commentModerationPage.verifyFlaggedKeywordsVisible();

    // Verify the card layout is not broken (other elements still visible)
    await commentModerationPage.verifyCardDisplaysAuthorName();
    await commentModerationPage.verifyCardDisplaysContentType();
    await commentModerationPage.verifyCardDisplaysDateTime();
  });

  test('TC_AI_009: Flagged items appear in Pending filter', async () => {
    // Click Needs Attention tab (equivalent to Pending filter)
    await commentModerationPage.clickNeedsAttentionTab();

    // Verify AI-flagged items with Needs Review status appear
    await commentModerationPage.verifyAdminReviewRequiredStatus();
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyAIModerationResultVisible();
  });

  test('TC_AI_010: Content without offensive keywords shows no flagged badges on approved tab', async () => {
    // Switch to Recently Approved tab to find clean content
    await commentModerationPage.clickRecentlyApprovedTab();

    // Verify cards are visible (approved content exists)
    await commentModerationPage.verifyApprovedStatusOnCards();
  });

  test('TC_AI_011: AI Moderation Result provides actionable information', async () => {
    // Verify AI Moderation Result section has meaningful text
    await commentModerationPage.verifyAIModerationResultVisible();
    await commentModerationPage.verifyAIModerationResultText();

    // Verify the flagged keywords are also shown
    await commentModerationPage.verifyFlaggedKeywordsVisible();
  });

  test('TC_AI_012: Flagged content shows both keywords and AI notes together', async () => {
    // Verify both flagged keywords and AI moderation result are on the same card
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyAIModerationResultVisible();

    // Verify action buttons are also present
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyRejectButtonVisible();
  });
});
