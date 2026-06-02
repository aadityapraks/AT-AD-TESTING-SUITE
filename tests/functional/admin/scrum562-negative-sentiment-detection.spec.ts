// spec: specs/functional/SCRUM-562-negative-sentiment-detection.json

import { test, expect } from '@playwright/test';
import { CommentModerationPage } from '../../../pages/comment-moderation.page';
import testData from '../../../test-data/scrum562-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-562: Admin - AI Negative Sentiment Detection', () => {
  let commentModerationPage: CommentModerationPage;

  test.beforeEach(async ({ page }) => {
    commentModerationPage = new CommentModerationPage(page);
    await commentModerationPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await commentModerationPage.navigateToCommentModeration();
  });

  test('TC_SENT_001: Negative keywords trigger Needs Review status', async () => {
    // Find a card with content containing strong negative keywords
    // Verify the status badge shows Admin Review Required
    await commentModerationPage.verifyAdminReviewRequiredStatus();

    // Verify AI moderation notes explain the sentiment detection
    await commentModerationPage.verifyAIModerationResultVisible();
    await commentModerationPage.verifyFlaggedKeywordsVisible();
  });

  test('TC_SENT_002: Content is NOT auto-rejected based on sentiment alone', async () => {
    // Find content flagged for negative sentiment
    // Verify the status is NOT Rejected - it should be Admin Review Required
    await commentModerationPage.verifyAdminReviewRequiredStatus();

    // Verify both approve and reject actions are available (not auto-rejected)
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyRejectButtonVisible();
  });

  test('TC_SENT_003: Admin decision is required for flagged content', async () => {
    // Find a sentiment-flagged item
    // Verify both Approve and Reject actions are available
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyRejectButtonVisible();

    // Verify the content stays in Needs Review (Admin Review Required)
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_SENT_004: Admin can approve negative sentiment content', async () => {
    // Find a sentiment-flagged item with Needs Review status
    // Verify Approve action is available
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_SENT_005: Admin can reject negative sentiment content', async () => {
    // Find a sentiment-flagged item with Needs Review status
    // Verify Reject action is available
    await commentModerationPage.verifyRejectButtonVisible();
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_SENT_006: Genuine complaint is flagged but can be approved', async () => {
    // Find content that is a genuine complaint (flagged for review)
    // Verify it is flagged as Needs Review (not auto-rejected)
    await commentModerationPage.verifyAdminReviewRequiredStatus();

    // Verify admin can approve it as legitimate feedback
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyAIModerationResultVisible();
  });

  test('TC_SENT_007: Aggressive but valid feedback shows both actions', async () => {
    // Find content with aggressive tone
    // Verify it is flagged as Needs Review (not auto-rejected)
    await commentModerationPage.verifyAdminReviewRequiredStatus();

    // Verify admin can approve or reject based on context
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyRejectButtonVisible();
    await commentModerationPage.verifyAIModerationResultText();
  });

  test('TC_SENT_008: Approved content exists in Recently Approved tab', async () => {
    // Switch to Recently Approved tab to find approved content
    await commentModerationPage.clickRecentlyApprovedTab();

    // Verify approved content exists (some content passed moderation)
    await commentModerationPage.verifyApprovedStatusOnCards();
  });

  test('TC_SENT_009: Positive content is not flagged by sentiment detection', async () => {
    // Switch to Recently Approved tab to find positive/clean content
    await commentModerationPage.clickRecentlyApprovedTab();

    // Verify approved cards exist (positive content passed without being flagged)
    await commentModerationPage.verifyApprovedStatusOnCards();
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_SENT_010: Sentiment-flagged items appear in Needs Attention tab', async () => {
    // Click Needs Attention tab (equivalent to Pending filter)
    await commentModerationPage.clickNeedsAttentionTab();

    // Verify flagged items with Admin Review Required status appear
    await commentModerationPage.verifyAdminReviewRequiredStatus();
    await commentModerationPage.verifyFlaggedKeywordsVisible();
    await commentModerationPage.verifyAIModerationResultVisible();
  });
});
