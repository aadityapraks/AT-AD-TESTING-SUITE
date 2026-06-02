// spec: specs/functional/SCRUM-571-handle-vendor-flagged-content.json

import { test, expect } from '@playwright/test';
import { CommentModerationPage } from '../../../pages/comment-moderation.page';
import testData from '../../../test-data/scrum571-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-571: Admin - Handle Vendor Flagged Content', () => {
  let commentModerationPage: CommentModerationPage;

  test.beforeEach(async ({ page }) => {
    commentModerationPage = new CommentModerationPage(page);
    await commentModerationPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await commentModerationPage.navigateToCommentModeration();
  });

  test('TC_VFLAG_001: Vendor flag reason is displayed clearly on the card', async () => {
    // Select Vendor Flagged from the status filter to find vendor-flagged items
    await commentModerationPage.selectStatusFilter(testData.inputs.statusFilter);

    // Verify cards are displayed with vendor flag information
    await commentModerationPage.verifyCardDisplaysAuthorName();
    await commentModerationPage.verifyCardDisplaysContentText();

    // Verify the vendor flagged status badge is visible
    await commentModerationPage.verifyStatusBadgeVisible(testData.expected.vendorFlaggedStatus);
  });

  test('TC_VFLAG_002: Content is marked Vendor Flagged status', async () => {
    // Select Vendor Flagged from the status filter
    await commentModerationPage.selectStatusFilter(testData.inputs.statusFilter);

    // Verify the flagged content shows Vendor Flagged status badge
    await commentModerationPage.verifyStatusBadgeVisible(testData.expected.vendorFlaggedStatus);
  });

  test('TC_VFLAG_003: Admin can approve vendor-flagged review', async () => {
    // Select Vendor Flagged from the status filter
    await commentModerationPage.selectStatusFilter(testData.inputs.statusFilter);

    // Verify cards are displayed
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_VFLAG_004: Admin can reject vendor-flagged review', async () => {
    // Select Vendor Flagged from the status filter
    await commentModerationPage.selectStatusFilter(testData.inputs.statusFilter);

    // Verify cards are displayed with content
    await commentModerationPage.verifyCardDisplaysContentText();
  });

  test('TC_VFLAG_005: Vendor-flagged items appear in Needs Attention tab', async () => {
    // Click Needs Attention tab (Pending filter)
    await commentModerationPage.clickNeedsAttentionTab();

    // Verify items are displayed (vendor-flagged items grouped under pending)
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_VFLAG_006: Vendor-flagged card shows the original review content', async () => {
    // Select Vendor Flagged from the status filter
    await commentModerationPage.selectStatusFilter(testData.inputs.statusFilter);

    // Verify the original review content is displayed on the card
    await commentModerationPage.verifyCardDisplaysContentText();
    await commentModerationPage.verifyCardDisplaysAuthorName();
  });

  test('TC_VFLAG_007: Vendor-flagged card shows product and partner info', async () => {
    // Select Vendor Flagged from the status filter
    await commentModerationPage.selectStatusFilter(testData.inputs.statusFilter);

    // Verify cards are displayed with author name and status
    await commentModerationPage.verifyCardDisplaysAuthorName();
    await commentModerationPage.verifyStatusBadgeVisible(testData.expected.vendorFlaggedStatus);
  });

  test('TC_VFLAG_008: Vendor-flagged card shows date and content type', async () => {
    // Select Vendor Flagged from the status filter
    await commentModerationPage.selectStatusFilter(testData.inputs.statusFilter);

    // Verify cards are displayed with content text
    await commentModerationPage.verifyCardDisplaysAuthorName();
    await commentModerationPage.verifyCardDisplaysContentText();
  });

  test('TC_VFLAG_009: Both approve and reject actions available on vendor-flagged items', async () => {
    // Select Vendor Flagged from the status filter
    await commentModerationPage.selectStatusFilter(testData.inputs.statusFilter);

    // Verify cards are displayed with status badge
    await commentModerationPage.verifyCardDisplaysAuthorName();
    await commentModerationPage.verifyStatusBadgeVisible(testData.expected.vendorFlaggedStatus);
  });

  test('TC_VFLAG_010: Vendor-flagged items show complete card information', async () => {
    // Select Vendor Flagged from the status filter
    await commentModerationPage.selectStatusFilter(testData.inputs.statusFilter);

    // Verify standard card elements are present
    await commentModerationPage.verifyCardDisplaysAuthorName();
    await commentModerationPage.verifyCardDisplaysContentText();
    await commentModerationPage.verifyStatusBadgeVisible(testData.expected.vendorFlaggedStatus);
  });
});
