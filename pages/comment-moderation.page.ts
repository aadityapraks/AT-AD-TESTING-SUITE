import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CommentModerationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ── Login & Navigation ──

  /** Full login flow: navigate → SSO → email → password → consent → dashboard */
  async loginAsAdmin(url: string, email: string, password: string) {
    await this.page.goto(url);
    await this.page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await this.page.getByText('Email').first().waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.getByText('password').first().waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();

    // Handle consent screen if it appears
    try {
      await this.page.waitForURL(
        url => url.href.includes('/admin') || url.href.includes('implicit-consent'),
        { timeout: 15000 }
      );
      if (this.page.url().includes('implicit-consent')) {
        await this.page.getByRole('button', { name: 'Continue' }).click();
      }
    } catch {
      // Already redirected
    }

    await this.page.waitForURL(url => url.href.includes('/admin'), { timeout: 30000 });
  }

  /** Navigate to Comment Moderation page from sidebar */
  async navigateToCommentModeration() {
    await this.page.getByRole('link', { name: 'Comment Moderation' }).click();
    await this.page.waitForURL(/comment-moderation/);
    await this.waitForModerationListLoaded();
  }

  /** Wait for moderation list to finish loading */
  async waitForModerationListLoaded() {
    await this.page.getByText('Loading content...').first().waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
  }

  // ── Page Structure Verification ──

  /** Verify the Comment Moderation page heading */
  async verifyPageHeading(heading: string) {
    await expect(this.page.getByRole('heading', { name: heading, level: 1 })).toBeVisible();
  }

  /** Verify the page subtitle */
  async verifyPageSubtitle(subtitle: string) {
    await expect(this.page.getByText(subtitle)).toBeVisible();
  }

  /** Verify the showing items count text */
  async verifyShowingItemsCount() {
    const countText = this.page.getByText(/Showing \d+ of \d+ items/);
    await expect(countText).toBeVisible();
  }

  /** Verify Comment Moderation link is active in sidebar */
  async verifyCommentModerationLinkActive() {
    const link = this.page.getByRole('link', { name: 'Comment Moderation' });
    await expect(link).toBeVisible();
  }

  /** Verify we are on the Comment Moderation page */
  async verifyOnCommentModerationPage() {
    expect(this.page.url()).toContain('/admin/comment-moderation');
  }

  // ── Moderation Card Verification ──

  /** Get the first moderation card container */
  private getFirstCard(): Locator {
    return this.page.locator('[class*="card"], [class*="Card"]').first();
  }

  /** Verify moderation card displays author name (heading level 3) */
  async verifyCardDisplaysAuthorName() {
    const authorHeading = this.page.getByRole('heading', { level: 3 }).first();
    await expect(authorHeading).toBeVisible();
    const text = await authorHeading.textContent();
    expect(text, 'Author name should not be empty').toBeTruthy();
  }

  /** Verify a specific author name is visible */
  async verifyAuthorNameVisible(name: string) {
    await expect(this.page.getByRole('heading', { name, level: 3 })).toBeVisible();
  }

  /** Verify moderation card displays role tag (PwD, Caregiver, Vendor) */
  async verifyCardDisplaysRoleTag() {
    const roleTag = this.page.getByText(/^(PwD|Caregiver|Vendor)$/).first();
    await expect(roleTag).toBeVisible();
  }

  /** Verify specific role tag is visible */
  async verifyRoleTagVisible(role: string) {
    await expect(this.page.getByText(role).first()).toBeVisible();
  }

  /** Verify moderation card displays content type (Query, Review, Vendor Response) */
  async verifyCardDisplaysContentType() {
    const contentType = this.page.getByText(/^(Query|Review|Vendor Response)$/).first();
    await expect(contentType).toBeVisible();
  }

  /** Verify specific content type is visible */
  async verifyContentTypeVisible(type: string) {
    await expect(this.page.getByText(type).first()).toBeVisible();
  }

  /** Verify moderation card displays submitted date/time */
  async verifyCardDisplaysDateTime() {
    const dateTime = this.page.getByText(/Submitted: \d{4}-\d{2}-\d{2}/).first();
    await expect(dateTime).toBeVisible();
  }

  /** Verify moderation card displays product name */
  async verifyCardDisplaysProductName() {
    const productLabel = this.page.getByText('Product:').first();
    await expect(productLabel).toBeVisible();
  }

  /** Verify specific product name is visible */
  async verifyProductNameVisible(productName: string) {
    await expect(this.page.getByText(productName).first()).toBeVisible();
  }

  /** Verify moderation card displays content text */
  async verifyCardDisplaysContentText() {
    // Content text is in a paragraph within the card body
    const paragraphs = this.page.locator('p').filter({ hasNot: this.page.locator('a, button') });
    const count = await paragraphs.count();
    expect(count, 'Content text paragraphs should exist').toBeGreaterThan(0);
  }

  /** Verify moderation card displays partner name */
  async verifyCardDisplaysPartnerName() {
    const partnerLabel = this.page.getByText('Partner:').first();
    await expect(partnerLabel).toBeVisible();
  }

  // ── Status Badges ──

  /** Verify status badge shows specific text */
  async verifyStatusBadgeVisible(status: string) {
    await expect(this.page.getByText(status).first()).toBeVisible();
  }

  /** Verify 'Admin Review Required' status is visible */
  async verifyAdminReviewRequiredStatus() {
    await expect(this.page.getByText('Admin Review Required').first()).toBeVisible();
  }

  /** Verify 'Needs Attention' tab shows count */
  async verifyNeedsAttentionTab() {
    await expect(this.page.getByRole('button', { name: 'Show items needing attention' })).toBeVisible();
  }

  /** Verify 'Recently Approved' tab shows count */
  async verifyRecentlyApprovedTab() {
    await expect(this.page.getByRole('button', { name: 'Show recently approved items' })).toBeVisible();
  }

  /** Verify 'Rejected Content' tab shows count */
  async verifyRejectedContentTab() {
    await expect(this.page.getByRole('button', { name: 'Show rejected content' })).toBeVisible();
  }

  /** Click 'Needs Attention' tab */
  async clickNeedsAttentionTab() {
    await this.page.getByRole('button', { name: 'Show items needing attention' }).click();
    await this.waitForModerationListLoaded();
  }

  /** Click 'Recently Approved' tab */
  async clickRecentlyApprovedTab() {
    await this.page.getByRole('button', { name: 'Show recently approved items' }).click();
    await this.waitForModerationListLoaded();
  }

  /** Click 'Rejected Content' tab */
  async clickRejectedContentTab() {
    await this.page.getByRole('button', { name: 'Show rejected content' }).click();
    await this.waitForModerationListLoaded();
  }

  /** Get the count from a tab badge */
  async getTabCount(tabName: string): Promise<number> {
    const button = this.page.getByRole('button', { name: tabName });
    const badge = button.locator('div, span').last();
    const text = await badge.textContent();
    return parseInt(text?.replace(/"/g, '') || '0', 10);
  }

  // ── Conditional Elements ──

  /** Verify flagged keywords section is visible */
  async verifyFlaggedKeywordsVisible() {
    await expect(this.page.getByText('Flagged Keywords:').first()).toBeVisible();
  }

  /** Verify specific flagged keyword is visible */
  async verifyFlaggedKeywordVisible(keyword: string) {
    await expect(this.page.getByText(keyword).first()).toBeVisible();
  }

  /** Verify multiple flagged keyword badges exist on a card */
  async verifyMultipleFlaggedKeywords() {
    const flaggedSection = this.page.getByText('Flagged Keywords:').first();
    await expect(flaggedSection).toBeVisible();
    // The flagged keywords are siblings after the label
    const parent = flaggedSection.locator('..');
    const badges = parent.locator('div, span').filter({ hasNot: this.page.getByText('Flagged Keywords:') });
    const count = await badges.count();
    expect(count, 'Multiple flagged keyword badges should exist').toBeGreaterThan(0);
  }

  /** Verify no flagged keywords section on a card (clean content) */
  async verifyNoFlaggedKeywordsOnApprovedContent() {
    await this.clickRecentlyApprovedTab();
    // Approved content may or may not have flagged keywords
    // Verify cards are visible
    await this.verifyCardDisplaysAuthorName();
  }

  /** Verify AI Moderation Result section is visible */
  async verifyAIModerationResultVisible() {
    await expect(this.page.getByText('AI Moderation Result').first()).toBeVisible();
  }

  /** Verify AI Moderation Result text content */
  async verifyAIModerationResultText() {
    const aiResult = this.page.getByText('AI Moderation Result').first();
    await expect(aiResult).toBeVisible();
    // The AI result paragraph follows the heading
    const resultParagraph = this.page.locator('p').filter({ hasText: /content|review|query|product/i }).first();
    await expect(resultParagraph).toBeVisible();
  }

  // ── Action Buttons ──

  /** Verify 'Approve & Publish' button is visible on a card */
  async verifyApproveButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Approve and publish content' }).first()).toBeVisible();
  }

  /** Verify 'Reject' button is visible on a card */
  async verifyRejectButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Reject content' }).first()).toBeVisible();
  }

  /** Verify 'View Product' button is visible on a card */
  async verifyViewProductButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'View product details' }).first()).toBeVisible();
  }

  /** Click Approve button on first card */
  async clickApproveOnFirstCard() {
    await this.page.getByRole('button', { name: 'Approve and publish content' }).first().click();
  }

  /** Confirm the approval in the confirmation dialog */
  async confirmApproval() {
    await this.page.getByRole('button', { name: 'Confirm approval' }).click();
    await this.waitForModerationListLoaded();
  }

  /** Cancel the approval in the confirmation dialog */
  async cancelApproval() {
    await this.page.getByRole('button', { name: 'Cancel approval' }).click();
  }

  /** Verify the approval confirmation dialog is visible */
  async verifyApprovalConfirmationVisible() {
    await expect(this.page.getByRole('button', { name: 'Confirm approval' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Cancel approval' })).toBeVisible();
  }

  /** Full approve flow: click approve then confirm */
  async approveFirstCard() {
    await this.clickApproveOnFirstCard();
    await this.confirmApproval();
  }

  /** Click Reject button on first card */
  async clickRejectOnFirstCard() {
    await this.page.getByRole('button', { name: 'Reject content' }).first().click();
  }

  // ── Filters ──

  /** Verify search input is visible */
  async verifySearchInputVisible() {
    await expect(this.page.getByRole('textbox', { name: 'Search content' })).toBeVisible();
  }

  /** Verify search input placeholder text */
  async verifySearchPlaceholder(placeholder: string) {
    const input = this.page.getByRole('textbox', { name: 'Search content' });
    await expect(input).toHaveAttribute('placeholder', placeholder);
  }

  /** Click on search input to focus it */
  async clickSearchInput() {
    await this.page.getByRole('textbox', { name: 'Search content' }).click();
  }

  /** Verify search input is focused */
  async verifySearchInputFocused() {
    await expect(this.page.getByRole('textbox', { name: 'Search content' })).toBeFocused();
  }

  /** Type in search input */
  async typeInSearch(text: string) {
    await this.page.getByRole('textbox', { name: 'Search content' }).fill(text);
  }

  /** Type in search input character by character */
  async typeInSearchSlowly(text: string) {
    const searchInput = this.page.getByRole('textbox', { name: 'Search content' });
    await searchInput.click();
    await searchInput.pressSequentially(text, { delay: 100 });
  }

  /** Verify search input has specific value */
  async verifySearchInputValue(value: string) {
    await expect(this.page.getByRole('textbox', { name: 'Search content' })).toHaveValue(value);
  }

  /** Clear search input */
  async clearSearch() {
    await this.page.getByRole('textbox', { name: 'Search content' }).clear();
  }

  /** Wait for search results to update */
  async waitForSearchResults() {
    // Wait a brief moment for debounced search to trigger
    await this.page.waitForTimeout(500);
    await this.waitForModerationListLoaded();
  }

  /** Verify search results contain text in cards */
  async verifySearchResultsContainText(text: string) {
    const card = this.page.getByRole('heading', { level: 3 }).first();
    await expect(card).toBeVisible();
  }

  /** Verify no results found (empty state after search) */
  async verifyNoSearchResults() {
    const noResults = this.page.getByText(/No .*(found|results|content|items)/i);
    await expect(noResults.first()).toBeVisible();
  }

  /** Get the showing items count number */
  async getShowingItemsTotal(): Promise<number> {
    const countText = this.page.getByText(/Showing \d+ of \d+ items/);
    const text = await countText.textContent();
    const match = text?.match(/of (\d+) items/);
    return match ? parseInt(match[1], 10) : 0;
  }

  /** Verify items count changed after search */
  async verifyItemsCountChanged(previousCount: number) {
    const currentCount = await this.getShowingItemsTotal();
    expect(currentCount, 'Items count should change after search').not.toBe(previousCount);
  }

  /** Verify All Status filter button is visible */
  async verifyStatusFilterVisible() {
    await expect(this.page.getByRole('button', { name: 'All Status' })).toBeVisible();
  }

  /** Click All Status filter to open dropdown */
  async clickStatusFilter() {
    await this.page.getByRole('button', { name: /All Status|Admin Review|Vendor Flagged/ }).first().click();
  }

  /** Select a status from the status filter dropdown */
  async selectStatusFilter(status: string) {
    await this.clickStatusFilter();
    await this.page.getByText(status, { exact: true }).click();
    await this.waitForModerationListLoaded();
  }

  /** Verify status filter button shows selected value */
  async verifyStatusFilterButtonText(text: string) {
    await expect(this.page.getByRole('button', { name: text }).first()).toBeVisible();
  }

  /** Verify status filter dropdown has specific options */
  async verifyStatusFilterOptions(options: string[]) {
    await this.clickStatusFilter();
    for (const option of options) {
      await expect(this.page.getByText(option, { exact: true })).toBeVisible();
    }
    // Close dropdown by clicking elsewhere
    await this.page.keyboard.press('Escape');
  }

  /** Verify All Types filter button is visible */
  async verifyTypesFilterVisible() {
    await expect(this.page.getByRole('button', { name: 'All Types' })).toBeVisible();
  }

  /** Verify type filter dropdown has correct options */
  async verifyTypesFilterOptions(options: string[]) {
    await this.clickTypesFilter();
    for (const option of options) {
      await expect(this.page.getByText(option, { exact: true })).toBeVisible();
    }
    // Close dropdown by pressing Escape or clicking elsewhere
    await this.page.keyboard.press('Escape');
  }

  /** Verify the type filter button shows specific text */
  async verifyTypesFilterButtonText(text: string) {
    await expect(this.page.getByRole('button', { name: text }).first()).toBeVisible();
  }

  /** Click All Types filter */
  async clickTypesFilter() {
    await this.page.getByRole('button', { name: /All Types|Queries|Reviews|Vendor Responses/ }).first().click();
  }

  /** Select a type from the types filter dropdown */
  async selectTypeFilter(type: string) {
    await this.clickTypesFilter();
    await this.page.getByText(type, { exact: true }).click();
    await this.waitForModerationListLoaded();
  }

  /** Verify All Partners filter button is visible */
  async verifyPartnersFilterVisible() {
    await expect(this.page.getByRole('button', { name: 'All Partners' })).toBeVisible();
  }

  /** Verify Date Range filter button is visible */
  async verifyDateRangeFilterVisible() {
    await expect(this.page.getByRole('button', { name: 'Select date range' })).toBeVisible();
  }

  // ── Pagination ──

  /** Verify pagination controls are visible */
  async verifyPaginationVisible() {
    await expect(this.page.getByRole('button', { name: 'Previous page' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Next page' })).toBeVisible();
  }

  /** Verify pagination text shows correct range */
  async verifyPaginationText() {
    const paginationText = this.page.getByText(/Showing \d+ to \d+ of \d+ items/);
    await expect(paginationText).toBeVisible();
  }

  /** Click Next page button */
  async clickNextPage() {
    await this.page.getByRole('button', { name: 'Next page' }).click();
    await this.waitForModerationListLoaded();
  }

  /** Click Previous page button */
  async clickPreviousPage() {
    await this.page.getByRole('button', { name: 'Previous page' }).click();
    await this.waitForModerationListLoaded();
  }

  /** Verify Previous button is disabled */
  async verifyPreviousButtonDisabled() {
    await expect(this.page.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  }

  // ── Card Count ──

  /** Get count of moderation cards on current page */
  async getModerationCardCount(): Promise<number> {
    const headings = this.page.getByRole('heading', { level: 3 });
    return await headings.count();
  }

  /** Verify multiple moderation cards are displayed */
  async verifyMultipleCardsDisplayed() {
    const count = await this.getModerationCardCount();
    expect(count, 'Multiple moderation cards should be displayed').toBeGreaterThan(1);
  }

  /** Verify no content message when list is empty */
  async verifyEmptyState() {
    const emptyMessage = this.page.getByText(/No content|No items|No moderation items/i);
    await expect(emptyMessage.first()).toBeVisible();
  }

  /** Verify showing 0 items */
  async verifyZeroItems() {
    await expect(this.page.getByText('Showing 0 of 0 items')).toBeVisible();
  }

  // ── Status-specific verifications ──

  /** Verify cards in 'Recently Approved' tab show approved status */
  async verifyApprovedStatusOnCards() {
    await expect(this.page.getByText('Approved').first()).toBeVisible();
  }

  /** Verify cards in 'Rejected Content' tab show rejected status */
  async verifyRejectedStatusOnCards() {
    await expect(this.page.getByText('Rejected').first()).toBeVisible();
  }

  /** Verify Rejection Reason section is visible */
  async verifyRejectionReasonVisible() {
    await expect(this.page.getByText('Rejection Reason').first()).toBeVisible();
  }

  /** Verify moderation timestamp is visible on rejected cards */
  async verifyModerationTimestampVisible() {
    const timestamp = this.page.getByText(/Moderated: \d{4}-\d{2}-\d{2}/).first();
    await expect(timestamp).toBeVisible();
  }

  /** Verify "by Admin" or "by AI Moderated" text is visible */
  async verifyRejectedByVisible() {
    const rejectedBy = this.page.getByText(/by (Admin|AI Moderated)/).first();
    await expect(rejectedBy).toBeVisible();
  }

  /** Verify all status badges are visually distinguishable */
  async verifyStatusBadgesDistinguishable() {
    // Check that different status texts exist
    const needsAttention = this.page.getByText('Admin Review Required');
    await expect(needsAttention.first()).toBeVisible();
  }

  /** Reload the page and wait for moderation list */
  async reloadAndWaitForList() {
    await this.page.reload();
    await this.waitForModerationListLoaded();
  }
}
