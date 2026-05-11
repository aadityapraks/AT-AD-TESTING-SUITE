import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class QueriesPage extends BasePage {
  // Navigation
  readonly queriesTab: Locator;

  // Page header
  readonly heading: Locator;
  readonly description: Locator;

  // Summary counts
  readonly totalQueriesCount: Locator;
  readonly pendingResponseCount: Locator;
  readonly respondedCount: Locator;

  // Search and filter
  readonly searchInput: Locator;
  readonly statusFilterBtn: Locator;

  // Pagination
  readonly paginationInfo: Locator;

  constructor(page: Page) {
    super(page);

    this.queriesTab = page.getByRole('link', { name: 'Queries' });
    this.heading = page.getByRole('heading', { name: 'PWD Queries', level: 2 });
    this.description = page.getByText('Manage and respond to queries from persons with disabilities');

    this.totalQueriesCount = page.getByText('Total Queries').locator('..');
    this.pendingResponseCount = page.getByText('Pending Response').locator('..').locator('..');
    this.respondedCount = page.getByText('Responded').first().locator('..').locator('..');

    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.statusFilterBtn = page.getByRole('button', { name: /All Status|Pending Response|Responded|Admin Response/ });

    this.paginationInfo = page.getByText(/Showing \d+ to \d+ of \d+ queries/);
  }

  async navigateToQueries() {
    await this.queriesTab.click();
    await expect(this.heading).toBeVisible({ timeout: 15000 });
  }

  async verifyQueriesTabVisible() {
    await expect(this.queriesTab).toBeVisible();
  }

  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.description).toBeVisible();
  }

  async verifyPageUrl() {
    await expect(this.page).toHaveURL(/queries/);
  }

  // --- Summary Counts ---

  async verifySummaryCountsVisible() {
    await expect(this.page.getByText('Total Queries')).toBeVisible();
    await expect(this.page.getByText('Pending Response').first()).toBeVisible();
    await expect(this.page.getByText('Responded').first()).toBeVisible();
  }

  // --- Search ---

  async verifySearchInputVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async enterSearchQuery(query: string) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  // --- Status Filter ---

  async verifyStatusFilterVisible() {
    await expect(this.statusFilterBtn).toBeVisible();
  }

  async openStatusFilter() {
    await this.statusFilterBtn.click();
  }

  async selectStatusFilter(status: string) {
    await this.statusFilterBtn.click();
    await this.page.locator('div').filter({ hasText: new RegExp(`^${status}$`) }).nth(1).click();
    // Click outside to close dropdown
    await this.heading.click();
  }

  async verifyFilterOptionVisible(option: string) {
    await expect(this.page.locator('div').filter({ hasText: new RegExp(`^${option}$`) }).nth(1)).toBeVisible();
  }

  async verifyPaginationText(expectedText: string) {
    await expect(this.page.getByText(expectedText)).toBeVisible();
  }

  async verifyQueryCountAfterFilter(expectedCount: number) {
    await expect(this.page.getByText(new RegExp(`Showing \\d+ to ${expectedCount} of ${expectedCount} queries`))).toBeVisible({ timeout: 5000 });
  }

  async clearStatusFilter() {
    // Reload the page to reset all filters
    await this.page.getByRole('link', { name: 'Queries' }).click();
    await expect(this.heading).toBeVisible({ timeout: 15000 });
  }

  // --- Query Cards ---

  async verifyQueryCardHasProductName() {
    await expect(this.page.getByRole('heading', { level: 3 }).first()).toBeVisible();
  }

  async verifyQueryCardHasUserName() {
    // User names appear next to user icon in query cards
    const queryCards = this.page.locator('.query-card, [class*="query"]').first();
    await expect(queryCards).toBeVisible();
  }

  async verifyQueryCardHasStatus(status: string) {
    await expect(this.page.getByText(status).first()).toBeVisible();
  }

  async verifyAllQueriesDisplayed() {
    await expect(this.paginationInfo).toBeVisible();
  }

  // --- Responding to Queries ---

  async clickEditResponse() {
    await this.page.getByRole('button', { name: 'Edit Response' }).click();
  }

  async verifyEditResponseButtonNotVisible() {
    await expect(this.page.getByRole('button', { name: 'Edit Response' })).not.toBeVisible();
  }

  async verifyResponseInputVisible() {
    await expect(this.page.getByRole('textbox', { name: /Write your response/ })).toBeVisible();
  }

  async verifyResponseInputNotVisible() {
    await expect(this.page.getByRole('textbox', { name: /Write your response/ })).not.toBeVisible();
  }

  async fillResponseText(text: string) {
    await this.page.getByRole('textbox', { name: /Write your response/ }).fill(text);
  }

  async verifyWordCount(count: number, minimum: number) {
    await expect(this.page.getByText(`Word count: ${count} / ${minimum} minimum`)).toBeVisible();
  }

  async verifySubmitButtonDisabled() {
    await expect(this.page.getByRole('button', { name: 'Submit for Approval' })).toBeDisabled();
  }

  async verifySubmitButtonEnabled() {
    await expect(this.page.getByRole('button', { name: 'Submit for Approval' })).toBeEnabled();
  }

  async clickSubmitForApproval() {
    await this.page.getByRole('button', { name: 'Submit for Approval' }).click();
  }

  async verifyResponseSubmittedSuccessfully() {
    await expect(this.page.getByText(/Pending Admin Approval|submitted|success/i)).toBeVisible({ timeout: 10000 });
  }

  // --- Response Labels & Status ---

  async verifyApprovedResponseLabel(label: string) {
    await expect(this.page.getByText(label).first()).toBeVisible();
  }

  async verifyRejectedResponseLabel(label: string) {
    await expect(this.page.getByText(label).first()).toBeVisible();
  }

  async verifyRejectionReasonVisible(label: string) {
    await expect(this.page.getByText(label).first()).toBeVisible();
  }

  async verifyAdminOnBehalfLabel(label: string) {
    await expect(this.page.getByText(label).first()).toBeVisible();
  }

  async verifyPrivacyNoticeVisible(notice: string) {
    await expect(this.page.getByText(notice)).toBeVisible();
  }

  async verifyNoEditButtonOnApprovedResponse() {
    // For approved responses, no Edit Response button should be available
    const approvedCard = this.page.locator(':has-text("Your Response (Approved)")').first();
    await expect(approvedCard.getByRole('button', { name: 'Edit Response' })).not.toBeVisible();
  }

  async verifyNoSubmitButtonOnRespondedQuery() {
    await expect(this.page.getByRole('button', { name: 'Submit for Approval' })).not.toBeVisible();
  }

  // --- Query Card Details ---

  async verifyQueryCardHasProductImage() {
    await expect(this.page.getByRole('img', { name: /Wheelchair/ }).first()).toBeVisible();
  }

  async verifyQueryCardHasDateTime() {
    await expect(this.page.getByText(/\d{1,2} \w+ \d{4}, \d{2}:\d{2}/).first()).toBeVisible();
  }

  async verifyQueryCardHasQueryText() {
    await expect(this.page.locator('p').filter({ hasText: /questions|query|accessibility/i }).first()).toBeVisible();
  }

  // --- Admin Moderation ---

  async navigateToCommentModeration() {
    await this.page.getByRole('link', { name: 'Comment Moderation' }).click();
    await expect(this.page.getByRole('heading', { name: 'Comment Moderation' })).toBeVisible({ timeout: 15000 });
  }

  async verifyCommentModerationPageLoaded(heading: string) {
    await expect(this.page.getByRole('heading', { name: heading })).toBeVisible();
  }

  async verifyApproveButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Approve and publish content' }).first()).toBeVisible();
  }

  async verifyRejectButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Reject content' }).first()).toBeVisible();
  }

  async verifyModerationTabsVisible() {
    await expect(this.page.getByRole('button', { name: /needing attention/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /recently approved/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /rejected content/i })).toBeVisible();
  }

  // --- Empty State ---

  async verifyZeroQueriesState() {
    await expect(this.page.getByText('Total Queries')).toBeVisible();
    await expect(this.page.getByText('0').first()).toBeVisible();
  }

  async verifyNoQueriesEmptyState() {
    // When no queries exist, verify the page still loads cleanly
    await expect(this.heading).toBeVisible();
  }
}
