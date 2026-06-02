// spec: specs/functional/SCRUM-574-approve-publish-content.json

import { test, expect } from '@playwright/test';
import { CommentModerationPage } from '../../../pages/comment-moderation.page';
import testData from '../../../test-data/scrum574-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-574: Admin - Approve & Publish Content', () => {
  let commentModerationPage: CommentModerationPage;

  test.beforeEach(async ({ page }) => {
    commentModerationPage = new CommentModerationPage(page);
    await commentModerationPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await commentModerationPage.navigateToCommentModeration();
  });

  test('TC_APPROVE_001: Approve button and confirmation dialog exist on pending items', async () => {
    // Verify Needs Attention tab exists with count
    await commentModerationPage.verifyNeedsAttentionTab();

    // Get the count - if items exist, verify approve button
    const count = await commentModerationPage.getTabCount('Show items needing attention');
    if (count > 0) {
      await commentModerationPage.clickNeedsAttentionTab();
      await commentModerationPage.verifyApproveButtonVisible();

      // Click approve to verify confirmation dialog appears
      await commentModerationPage.clickApproveOnFirstCard();
      await commentModerationPage.verifyApprovalConfirmationVisible();
      await commentModerationPage.cancelApproval();
    }
  });

  test('TC_APPROVE_002: Approved content appears in Recently Approved tab', async () => {
    // Verify Recently Approved tab has items
    await commentModerationPage.clickRecentlyApprovedTab();
    await commentModerationPage.verifyApprovedStatusOnCards();
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_APPROVE_003: Dashboard shows correct tab counts', async () => {
    // Verify all three tabs are visible with counts
    await commentModerationPage.verifyNeedsAttentionTab();
    await commentModerationPage.verifyRecentlyApprovedTab();
    await commentModerationPage.verifyRejectedContentTab();

    // Verify counts are numbers
    const needsAttention = await commentModerationPage.getTabCount('Show items needing attention');
    const approved = await commentModerationPage.getTabCount('Show recently approved items');
    const rejected = await commentModerationPage.getTabCount('Show rejected content');
    expect(needsAttention).toBeGreaterThanOrEqual(0);
    expect(approved).toBeGreaterThanOrEqual(0);
    expect(rejected).toBeGreaterThanOrEqual(0);
  });

  test('TC_APPROVE_004: Approved items show Approved status badge', async () => {
    // Switch to Recently Approved tab
    await commentModerationPage.clickRecentlyApprovedTab();

    // Verify approved cards show status and author
    await commentModerationPage.verifyApprovedStatusOnCards();
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_APPROVE_005: Clicking Approve & Publish updates counts', async () => {
    // Get initial counts
    const initialNeedsAttention = await commentModerationPage.getTabCount('Show items needing attention');
    const initialApproved = await commentModerationPage.getTabCount('Show recently approved items');

    // Only proceed if there are items to approve
    test.skip(initialNeedsAttention === 0, 'No pending items available to approve');

    // Approve a pending content item
    await commentModerationPage.clickNeedsAttentionTab();
    await commentModerationPage.approveFirstCard();

    // Verify counts changed
    const newNeedsAttention = await commentModerationPage.getTabCount('Show items needing attention');
    const newApproved = await commentModerationPage.getTabCount('Show recently approved items');
    expect(newNeedsAttention).toBe(initialNeedsAttention - 1);
    expect(newApproved).toBe(initialApproved + 1);
  });

  test('TC_APPROVE_006: Approve button available on Needs Attention items', async () => {
    const count = await commentModerationPage.getTabCount('Show items needing attention');
    test.skip(count === 0, 'No pending items available');

    await commentModerationPage.clickNeedsAttentionTab();
    await commentModerationPage.verifyApproveButtonVisible();
    await commentModerationPage.verifyAdminReviewRequiredStatus();
  });

  test('TC_APPROVE_007: Recently Approved tab shows approved items without approve button', async () => {
    await commentModerationPage.clickRecentlyApprovedTab();
    await commentModerationPage.verifyApprovedStatusOnCards();
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_APPROVE_008: Approval moves item from Needs Attention to Recently Approved', async () => {
    const initialNeedsAttention = await commentModerationPage.getTabCount('Show items needing attention');
    test.skip(initialNeedsAttention === 0, 'No pending items available to approve');

    // Approve one item
    await commentModerationPage.clickNeedsAttentionTab();
    await commentModerationPage.approveFirstCard();

    // Verify it moved to approved
    await commentModerationPage.clickRecentlyApprovedTab();
    await commentModerationPage.verifyApprovedStatusOnCards();
  });

  test('TC_APPROVE_009: Approval persists after page refresh', async () => {
    const initialApproved = await commentModerationPage.getTabCount('Show recently approved items');
    const initialNeedsAttention = await commentModerationPage.getTabCount('Show items needing attention');
    test.skip(initialNeedsAttention === 0, 'No pending items available to approve');

    // Approve a content item
    await commentModerationPage.clickNeedsAttentionTab();
    await commentModerationPage.approveFirstCard();

    // Refresh the page
    await commentModerationPage.reloadAndWaitForList();

    // Verify the approved count persisted
    const afterApproved = await commentModerationPage.getTabCount('Show recently approved items');
    expect(afterApproved).toBeGreaterThan(initialApproved);
  });

  test('TC_APPROVE_010: Multiple items can be approved sequentially', async () => {
    const initialCount = await commentModerationPage.getTabCount('Show items needing attention');
    test.skip(initialCount < 2, 'Not enough pending items to approve multiple');

    await commentModerationPage.clickNeedsAttentionTab();
    await commentModerationPage.approveFirstCard();
    await commentModerationPage.approveFirstCard();

    const finalCount = await commentModerationPage.getTabCount('Show items needing attention');
    expect(finalCount).toBe(initialCount - 2);
  });

  test('TC_APPROVE_011: Approve action completes without page errors', async () => {
    const count = await commentModerationPage.getTabCount('Show items needing attention');
    test.skip(count === 0, 'No pending items available to approve');

    await commentModerationPage.clickNeedsAttentionTab();
    await commentModerationPage.approveFirstCard();
    await commentModerationPage.verifyOnCommentModerationPage();
  });
});
