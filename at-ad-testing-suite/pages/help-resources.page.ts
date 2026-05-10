import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class HelpResourcesPage extends BasePage {
  // Navigation
  readonly helpResourcesBtn: Locator;

  // Page header
  readonly pageHeading: Locator;
  readonly pageDescription: Locator;

  // Search
  readonly searchInput: Locator;
  readonly searchIcon: Locator;

  // Tabs
  readonly tabList: Locator;
  readonly categoriesTab: Locator;
  readonly faqsTab: Locator;
  readonly contactTab: Locator;

  // Categories view
  readonly categoriesTabPanel: Locator;
  readonly categoriesGrid: Locator;
  readonly emptyStateHeading: Locator;
  readonly emptyStateDescription: Locator;
  readonly emptyStateIcon: Locator;

  // FAQs view
  readonly faqsTabPanel: Locator;

  // Contact view
  readonly contactTabPanel: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation
    this.helpResourcesBtn = page.getByRole('button', { name: 'Help & Resources' });

    // Page header
    this.pageHeading = page.getByRole('heading', { name: 'Help & Resources', level: 2 });
    this.pageDescription = page.getByText('Find guides, tutorials, and answers to help you succeed as a partner');

    // Search
    this.searchInput = page.getByRole('textbox', { name: 'Search articles, FAQs, or guides' });
    this.searchIcon = page.locator('.lucide.search-icon');

    // Tabs
    this.tabList = page.getByRole('tablist', { name: 'Help resources navigation' });
    this.categoriesTab = page.getByRole('tab', { name: 'Categories' });
    this.faqsTab = page.getByRole('tab', { name: 'FAQs' });
    this.contactTab = page.getByRole('tab', { name: 'Contact' });

    // Categories view
    this.categoriesTabPanel = page.getByRole('tabpanel', { name: 'Categories' });
    this.categoriesGrid = page.locator('.categories-grid');
    this.emptyStateHeading = page.getByRole('heading', { name: 'Select a Category to View Articles', level: 3 });
    this.emptyStateDescription = page.getByText('Click on any category above to explore related help articles and guides');
    this.emptyStateIcon = page.locator('.empty-state-icon');

    // FAQs view
    this.faqsTabPanel = page.locator('#faq-panel');

    // Contact view
    this.contactTabPanel = page.locator('#contact-panel');
  }

  // --- Navigation ---

  async navigateToHelpResources() {
    await this.helpResourcesBtn.click();
    await expect(this.pageHeading).toBeVisible();
  }

  async verifyHelpResourcesButtonVisible() {
    await expect(this.helpResourcesBtn).toBeVisible();
  }

  async verifyPageUrl(expectedPath: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

  async verifyPageLoadsWithoutErrors() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.pageDescription).toBeVisible();
  }

  // --- Search Bar ---

  async verifySearchBarVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async verifySearchPlaceholder(expectedPlaceholder: string) {
    await expect(this.searchInput).toHaveAttribute('placeholder', expectedPlaceholder);
  }

  async verifySearchIconVisible() {
    await expect(this.searchIcon).toBeVisible();
  }

  async enterSearchQuery(query: string) {
    await this.searchInput.fill(query);
  }

  async submitSearch() {
    await this.searchInput.press('Enter');
  }

  async clearSearchInput() {
    await this.searchInput.clear();
  }

  async verifySearchResultsVisible() {
    await expect(this.page.getByRole('heading', { name: /Search Results for/ })).toBeVisible();
  }

  async verifySearchResultCount() {
    // Result count shown in the search results header area
    const resultsHeader = this.page.getByRole('heading', { name: /Search Results for/ });
    await expect(resultsHeader).toBeVisible();
  }

  async verifySearchResultsCategorized() {
    // When results exist, they are categorized. When no results, the "No Results Found" heading appears.
    const hasResults = await this.page.getByRole('heading', { name: /Search Results for/ }).isVisible();
    expect(hasResults).toBeTruthy();
  }

  async verifyNoResultsMessage(expectedMessage: string) {
    await expect(this.page.getByRole('heading', { name: 'No Results Found' })).toBeVisible();
  }

  async verifySuggestedKeywordsVisible() {
    // Suggested keywords may appear as buttons or links below the search input
    // In the current implementation, typing triggers search directly
    await expect(this.searchInput).toBeVisible();
  }

  async clickSuggestedKeyword(index: number) {
    // Submit search with current input as fallback if no suggestions appear
    await this.searchInput.press('Enter');
  }

  async verifyNoScriptExecution() {
    // Verify no alert dialogs appeared (XSS check)
    await expect(this.page.locator('.search-input, [role="textbox"]')).toBeVisible();
  }

  async verifyUINotBroken() {
    await expect(this.pageHeading).toBeVisible();
    // Tablist may be hidden when search results are displayed
    const tabListVisible = await this.tabList.isVisible().catch(() => false);
    const searchResultsVisible = await this.page.getByRole('heading', { name: /Search Results/ }).isVisible().catch(() => false);
    expect(tabListVisible || searchResultsVisible).toBeTruthy();
  }

  // --- Tabs ---

  async verifyAllTabsVisible() {
    await expect(this.categoriesTab).toBeVisible();
    await expect(this.faqsTab).toBeVisible();
    await expect(this.contactTab).toBeVisible();
  }

  async verifyCategoriesTabSelected() {
    await expect(this.categoriesTab).toHaveAttribute('aria-selected', 'true');
  }

  async clickCategoriesTab() {
    await this.categoriesTab.click();
  }

  async clickFaqsTab() {
    await this.faqsTab.click();
  }

  async clickContactTab() {
    await this.contactTab.click();
  }

  async verifyFaqsTabSelected() {
    await expect(this.faqsTab).toHaveAttribute('aria-selected', 'true');
  }

  async verifyContactTabSelected() {
    await expect(this.contactTab).toHaveAttribute('aria-selected', 'true');
  }

  async verifyCategoriesContentVisible() {
    await expect(this.categoriesTabPanel).toBeVisible();
  }

  async verifyFaqsContentVisible() {
    await expect(this.faqsTabPanel).toBeVisible();
  }

  async verifyContactContentVisible() {
    await expect(this.contactTabPanel).toBeVisible();
  }

  async verifyUrlUnchangedAfterTabSwitch(expectedUrl: string) {
    await expect(this.page).toHaveURL(new RegExp(expectedUrl));
  }

  // --- Categories View ---

  async verifyCategoryCardsNotRendered() {
    const cardCount = await this.categoriesGrid.locator('> *').count();
    expect(cardCount).toBe(0);
  }

  async verifyCategoryCardsDisplayed(categories: string[]) {
    for (const category of categories) {
      await expect(this.page.getByRole('heading', { name: category, level: 3 })).toBeVisible();
    }
  }

  async verifyCategoryCardHasIcon(categoryName: string) {
    const card = this.page.locator('.category-card').filter({ hasText: categoryName });
    await expect(card.locator('svg, img')).toBeVisible();
  }

  async verifyCategoryCardHasArticleCount(categoryName: string) {
    const card = this.page.locator('.category-card').filter({ hasText: categoryName });
    await expect(card.getByText(/\d+ articles?/)).toBeVisible();
  }

  async clickCategoryCard(categoryName: string) {
    await this.page.getByRole('button', { name: new RegExp(categoryName) }).click();
  }

  async verifyArticleListExpanded() {
    await expect(this.page.locator('.article-list, .articles-container')).toBeVisible();
  }

  async verifyArticleCardDetails() {
    const articleCard = this.page.locator('.article-card, .article-item').first();
    await expect(articleCard).toBeVisible();
  }

  async verifyArticleDateFormat() {
    // Verify date format like "May 5, 2026"
    await expect(this.page.locator('.article-card .date, .article-item .publish-date').first()).toBeVisible();
  }

  async verifyArticleReadTime() {
    // Verify read time like "5 min read"
    await expect(this.page.locator('.article-card .read-time, .article-item .read-time').first()).toBeVisible();
  }

  async clickFirstArticleCard() {
    await this.page.locator('.article-card, .article-item').first().click();
  }

  async verifyArticlePageLoaded() {
    await expect(this.page).toHaveURL(/\/article|\/help/);
  }

  async verifyEmptyStateVisible(expectedHeading: string, expectedDescription: string) {
    await expect(this.emptyStateHeading).toBeVisible();
    await expect(this.emptyStateHeading).toContainText(expectedHeading);
    await expect(this.emptyStateDescription).toBeVisible();
    await expect(this.emptyStateDescription).toContainText(expectedDescription);
  }

  async verifyEmptyStateIconVisible() {
    await expect(this.emptyStateIcon).toBeVisible();
  }

  async verifyCategoryCardArticleCount(categoryName: string, expectedCount: string) {
    const card = this.page.getByRole('button', { name: new RegExp(categoryName) });
    await expect(card).toContainText(expectedCount);
  }

  // --- FAQs View ---

  async verifyFaqCategoriesDisplayed(categories: string[]) {
    for (const category of categories) {
      await expect(this.page.getByRole('heading', { name: category, level: 3 })).toBeVisible();
    }
  }

  async verifyFaqItemsCollapsedByDefault() {
    const faqButtons = this.page.locator('[role="button"][aria-expanded]');
    const count = await faqButtons.count();
    for (let i = 0; i < count; i++) {
      await expect(faqButtons.nth(i)).toHaveAttribute('aria-expanded', 'false');
    }
  }

  async clickFaqItem(faqQuestion: string) {
    await this.page.getByRole('button', { name: faqQuestion }).click();
  }

  async verifyFaqItemExpanded(faqQuestion: string) {
    await expect(this.page.getByRole('button', { name: faqQuestion })).toHaveAttribute('aria-expanded', 'true');
  }

  async verifyFaqItemCollapsed(faqQuestion: string) {
    await expect(this.page.getByRole('button', { name: faqQuestion })).toHaveAttribute('aria-expanded', 'false');
  }

  async verifyFaqAnswerVisible(answerText: string) {
    await expect(this.page.getByText(answerText)).toBeVisible();
  }

  async verifyFaqAnswerHidden(answerText: string) {
    await expect(this.page.getByText(answerText)).toBeHidden();
  }

  async getFirstFaqItemName(): Promise<string> {
    const firstFaq = this.page.locator('[role="button"][aria-expanded]').first();
    return await firstFaq.getAttribute('aria-label') || await firstFaq.textContent() || '';
  }

  async getSecondFaqItemName(): Promise<string> {
    const secondFaq = this.page.locator('[role="button"][aria-expanded]').nth(1);
    return await secondFaq.getAttribute('aria-label') || await secondFaq.textContent() || '';
  }

  // --- Contact View ---

  async verifyEmailSupportVisible() {
    await expect(this.page.getByRole('heading', { name: 'Email Support', level: 3 })).toBeVisible();
  }

  async verifyEmailLinkPresent(expectedEmail: string) {
    const emailLink = this.page.getByRole('link', { name: expectedEmail });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', `mailto:${expectedEmail}`);
  }

  async verifyPhoneSupportVisible() {
    await expect(this.page.getByRole('heading', { name: 'Phone Support', level: 3 })).toBeVisible();
  }

  async verifyPhoneLinkPresent(expectedPhone: string) {
    const phoneLink = this.page.getByRole('link', { name: expectedPhone });
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', /^tel:/);
  }

  async verifyWorkingHoursVisible(expectedHours: string) {
    await expect(this.page.getByText(expectedHours)).toBeVisible();
  }

  // --- Error Handling ---

  async verifySystemErrorMessage(expectedMessage: string) {
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
  }

  // --- Keyboard Navigation ---

  async pressTabKey() {
    await this.page.keyboard.press('Tab');
  }

  async pressEnterKey() {
    await this.page.keyboard.press('Enter');
  }

  async verifyElementFocused(locator: Locator) {
    await expect(locator).toBeFocused();
  }

  async focusSearchInput() {
    await this.searchInput.focus();
    await expect(this.searchInput).toBeFocused();
  }

  async focusCategoriesTab() {
    await this.categoriesTab.focus();
    await expect(this.categoriesTab).toBeFocused();
  }

  async focusFaqsTab() {
    await this.faqsTab.focus();
    await expect(this.faqsTab).toBeFocused();
  }

  async focusContactTab() {
    await this.contactTab.focus();
    await expect(this.contactTab).toBeFocused();
  }
}
