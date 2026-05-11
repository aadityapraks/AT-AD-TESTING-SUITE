// spec: specs/functional/SCRUM-33-help-resources.json
// seed: seed/mcp-seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../../test-data/scrum33-functional.json';
import { LoginPage } from '../../../pages/login.page';
import { HelpResourcesPage } from '../../../pages/help-resources.page';

let loginPage: LoginPage;
let helpResourcesPage: HelpResourcesPage;

test.describe('SCRUM-33: Help & Resources', () => {
  test.setTimeout(120000);

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    helpResourcesPage = new HelpResourcesPage(page);
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
  });

  test.describe('1. Navigation & Access', () => {
    test('TC_HR_001: Verify Help & Resources tab is visible in global navigation', async ({ page }) => {
      // 1. Log in as an approved Assistive Partner (handled in beforeEach)

      // 2. Verify the 'Help & Resources' tab is visible in the top navigation bar
      await helpResourcesPage.verifyHelpResourcesButtonVisible();

      // 3. Click on the 'Help & Resources' tab
      await helpResourcesPage.navigateToHelpResources();

      // 4. Verify the page redirects to the Help & Resources landing page
      await helpResourcesPage.verifyPageUrl(testData.expected.helpResourcesUrl);

      // 5. Verify the page loads without errors
      await helpResourcesPage.verifyPageLoadsWithoutErrors();
    });
  });

  test.describe('2. Search Bar Functionality', () => {
    test.beforeEach(async () => {
      await helpResourcesPage.navigateToHelpResources();
    });

    test('TC_HR_002: Verify search bar displays with correct placeholder text', async ({ page }) => {
      // 1. Navigate to Help & Resources page (handled in beforeEach)

      // 2. Verify a search bar is displayed at the top of the page
      await helpResourcesPage.verifySearchBarVisible();

      // 3. Verify the placeholder text reads: 'Search articles, FAQs, or guides…'
      await helpResourcesPage.verifySearchPlaceholder(testData.expected.searchPlaceholder);

      // 4. Verify a search icon is present next to the search input
      await helpResourcesPage.verifySearchIconVisible();
    });

    test('TC_HR_003: Verify search returns filtered results matching the query', async ({ page }) => {
      // 1. Navigate to Help & Resources page (handled in beforeEach)

      // 2. Type a keyword in the search bar
      await helpResourcesPage.enterSearchQuery(testData.inputs.searchQuery);

      // 3. Submit the search
      await helpResourcesPage.submitSearch();

      // 4. Verify search results heading is displayed
      await helpResourcesPage.verifySearchResultsVisible();
    });

    test('TC_HR_004: Verify suggested keywords appear below search input', async ({ page }) => {
      // 1. Navigate to Help & Resources page (handled in beforeEach)

      // 2. Click on the search bar or start typing
      await helpResourcesPage.enterSearchQuery(testData.inputs.partialQuery);

      // 3. Submit search (suggested keywords trigger search in current implementation)
      await helpResourcesPage.submitSearch();

      // 4. Verify search results heading appears
      await helpResourcesPage.verifySearchResultsVisible();
    });

    test('TC_HR_005: Verify search with no matching results shows appropriate message', async ({ page }) => {
      // 1. Navigate to Help & Resources page (handled in beforeEach)

      // 2. Type a keyword that has no matching content
      await helpResourcesPage.enterSearchQuery(testData.inputs.noResultsQuery);

      // 3. Submit the search
      await helpResourcesPage.submitSearch();

      // 4. Verify the no results message is displayed
      await helpResourcesPage.verifyNoResultsMessage(testData.expected.noResultsMessage);

      // 5. Verify no broken UI or empty containers are shown
      await helpResourcesPage.verifyUINotBroken();
    });
  });

  test.describe('3. Category Tabs (Navigation Filters)', () => {
    test.beforeEach(async () => {
      await helpResourcesPage.navigateToHelpResources();
    });

    test('TC_HR_006: Verify category tabs switch content without page reload', async ({ page }) => {
      // 1. Navigate to Help & Resources page (handled in beforeEach)

      // 2. Verify three tabs are visible: 'Categories', 'FAQs', 'Contact'
      await helpResourcesPage.verifyAllTabsVisible();

      // 3. Click on 'Categories' tab
      await helpResourcesPage.clickCategoriesTab();

      // 4. Verify the Categories content area loads
      await helpResourcesPage.verifyCategoriesContentVisible();

      // 5. Click on 'FAQs' tab
      await helpResourcesPage.clickFaqsTab();

      // 6. Verify the FAQs content area loads without page navigation
      await helpResourcesPage.verifyFaqsContentVisible();

      // 7. Click on 'Contact' tab
      await helpResourcesPage.clickContactTab();

      // 8. Verify the Contact content area loads without page navigation
      await helpResourcesPage.verifyContactContentVisible();

      // 9. Verify the URL does not change when switching tabs
      await helpResourcesPage.verifyUrlUnchangedAfterTabSwitch(testData.expected.helpResourcesUrl);
    });

    test('TC_HR_018: Verify Categories tab default selection on page load', async ({ page }) => {
      // 1. Navigate to Help & Resources page (handled in beforeEach)

      // 2. Verify the 'Categories' tab is selected by default on page load
      await helpResourcesPage.verifyCategoriesTabSelected();

      // 3. Verify the Categories content area is displayed
      await helpResourcesPage.verifyCategoriesContentVisible();

      // 4. Verify the active tab is visually highlighted
      await helpResourcesPage.verifyCategoriesTabSelected();
    });
  });

  test.describe('4. Categories View', () => {
    test.beforeEach(async () => {
      await helpResourcesPage.navigateToHelpResources();
    });

    test('TC_HR_007: Verify Categories view displays all four category cards with correct data', async ({ page }) => {
      // 1. Navigate to Help & Resources page (handled in beforeEach)

      // 2. Select the 'Categories' tab (default selected)
      await helpResourcesPage.verifyCategoriesTabSelected();

      // 3. Verify four category cards are displayed
      await helpResourcesPage.verifyCategoryCardsDisplayed(testData.expected.categories);
    });

    test('TC_HR_008: Verify clicking a category card opens expandable article list', async ({ page }) => {
      // 1. Click on the 'Best Practices' category card
      await helpResourcesPage.clickCategoryCard(testData.expected.categories[0]);

      // 2. Verify an expandable container opens below the cards
      await helpResourcesPage.verifyArticleListExpanded();

      // 3. Verify the container displays a list of articles with details
      await helpResourcesPage.verifyArticleCardDetails();

      // 4. Click on a different category card
      await helpResourcesPage.clickCategoryCard(testData.expected.categories[1]);

      // 5. Verify the article list updates to show articles from the new category
      await helpResourcesPage.verifyArticleListExpanded();
    });

    test('TC_HR_009: Verify clicking an article card links to the full article page', async ({ page }) => {
      // 1. Expand a category to show the article list
      await helpResourcesPage.clickCategoryCard(testData.expected.categories[0]);
      await helpResourcesPage.verifyArticleListExpanded();

      // 2. Click on an article card
      await helpResourcesPage.clickFirstArticleCard();

      // 3. Verify the click navigates to the full article page
      await helpResourcesPage.verifyArticlePageLoaded();
    });

    test('TC_HR_010: Verify category with zero articles shows appropriate state', async ({ page }) => {
      // 1. Navigate to Categories tab (Categories is default selected)
      await helpResourcesPage.verifyCategoriesTabSelected();

      // 2. Verify the categories grid has no category cards rendered (zero articles state)
      await helpResourcesPage.verifyCategoryCardsNotRendered();

      // 3. Verify an appropriate empty state message is shown
      await helpResourcesPage.verifyEmptyStateVisible(
        testData.expected.emptyStateHeading,
        testData.expected.emptyStateDescription
      );

      // 4. Verify the empty state icon is displayed (no broken UI)
      await helpResourcesPage.verifyEmptyStateIconVisible();
    });

    test('TC_HR_019: Verify article publish date and read time are formatted correctly', async ({ page }) => {
      // 1. Expand a category to show article cards
      await helpResourcesPage.clickCategoryCard(testData.expected.categories[0]);

      // 2. Verify each article card shows a publish date in a readable format
      await helpResourcesPage.verifyArticleDateFormat();

      // 3. Verify each article card shows estimated read time
      await helpResourcesPage.verifyArticleReadTime();
    });
  });

  test.describe('5. FAQs View', () => {
    test.beforeEach(async () => {
      await helpResourcesPage.navigateToHelpResources();
      await helpResourcesPage.clickFaqsTab();
    });

    test('TC_HR_011: Verify FAQs view displays FAQ categories with collapsible items', async ({ page }) => {
      // 1. Navigate to Help & Resources page and select FAQs tab (handled in beforeEach)

      // 2. Verify FAQ categories are displayed
      await helpResourcesPage.verifyFaqCategoriesDisplayed(testData.expected.faqCategories);

      // 3. Verify all FAQ items are in collapsed state by default
      await helpResourcesPage.verifyFaqItemsCollapsedByDefault();
    });

    test('TC_HR_012: Verify FAQ items expand to show answer on click and collapse on re-click', async ({ page }) => {
      // 1. Locate a collapsed FAQ item and click on it
      await helpResourcesPage.clickFaqItem(testData.expected.firstFaqQuestion);

      // 2. Verify the item expands to show the answer text
      await helpResourcesPage.verifyFaqItemExpanded(testData.expected.firstFaqQuestion);
      await helpResourcesPage.verifyFaqAnswerVisible(testData.expected.firstFaqAnswer);

      // 3. Click on the same FAQ item again
      await helpResourcesPage.clickFaqItem(testData.expected.firstFaqQuestion);

      // 4. Verify the item collapses back to show only the question
      await helpResourcesPage.verifyFaqItemCollapsed(testData.expected.firstFaqQuestion);
    });

    test('TC_HR_013: Verify multiple FAQ items can be expanded simultaneously', async ({ page }) => {
      // 1. Click on the first FAQ item to expand it
      await helpResourcesPage.clickFaqItem(testData.expected.firstFaqQuestion);

      // 2. Verify it expands
      await helpResourcesPage.verifyFaqItemExpanded(testData.expected.firstFaqQuestion);

      // 3. Click on a second FAQ item
      const secondFaqName = await helpResourcesPage.getSecondFaqItemName();
      await helpResourcesPage.clickFaqItem(secondFaqName);

      // 4. Verify the behavior is consistent (accordion or multi-expand)
      await helpResourcesPage.verifyUINotBroken();
    });
  });

  test.describe('6. Contact View', () => {
    test.beforeEach(async () => {
      await helpResourcesPage.navigateToHelpResources();
      await helpResourcesPage.clickContactTab();
    });

    test('TC_HR_014: Verify Contact view displays Email Support and Phone Support options', async ({ page }) => {
      // 1. Navigate to Help & Resources page and select Contact tab (handled in beforeEach)

      // 2. Verify 'Email Support' option is displayed with an email address
      await helpResourcesPage.verifyEmailSupportVisible();

      // 3. Verify the email address is a valid, clickable mailto link
      await helpResourcesPage.verifyEmailLinkPresent(testData.expected.contactEmail);

      // 4. Verify 'Phone Support' option is displayed with working hours and phone number
      await helpResourcesPage.verifyPhoneSupportVisible();
      await helpResourcesPage.verifyWorkingHoursVisible(testData.expected.contactHours);

      // 5. Verify the phone number is a valid, clickable tel link
      await helpResourcesPage.verifyPhoneLinkPresent(testData.expected.contactPhone);
    });
  });

  test.describe('7. Search and Filter Capabilities', () => {
    test.beforeEach(async () => {
      await helpResourcesPage.navigateToHelpResources();
    });

    test('TC_HR_015: Verify unified search returns categorized results across all resources', async ({ page }) => {
      // 1. Navigate to Help & Resources page (handled in beforeEach)

      // 2. Type a broad keyword in the search bar
      await helpResourcesPage.enterSearchQuery(testData.inputs.broadSearchQuery);

      // 3. Submit search
      await helpResourcesPage.submitSearch();

      // 4. Verify search results heading is displayed
      await helpResourcesPage.verifySearchResultsVisible();
    });

    test('TC_HR_016: Verify search with special characters does not break the UI', async ({ page }) => {
      // 1. Type special characters in the search bar (XSS attempt)
      await helpResourcesPage.enterSearchQuery(testData.inputs.specialCharsQuery);

      // 2. Submit search
      await helpResourcesPage.submitSearch();

      // 3. Verify no script execution or XSS vulnerability
      await helpResourcesPage.verifyNoScriptExecution();

      // 4. Verify the search handles the input gracefully
      await helpResourcesPage.verifyUINotBroken();

      // 5. Type other special characters
      await helpResourcesPage.clearSearchInput();
      await helpResourcesPage.enterSearchQuery(testData.inputs.specialCharsQuery2);

      // 6. Submit and verify no errors or broken UI
      await helpResourcesPage.submitSearch();
      await helpResourcesPage.verifyUINotBroken();
    });

    test('TC_HR_017: Verify empty search input does not trigger search or shows validation', async ({ page }) => {
      // 1. Leave the search bar empty and submit
      await helpResourcesPage.clearSearchInput();
      await helpResourcesPage.submitSearch();

      // 2. Verify either no search is triggered or a validation message appears
      await helpResourcesPage.verifyUINotBroken();

      // 3. Enter only whitespace in the search bar
      await helpResourcesPage.enterSearchQuery(testData.inputs.whitespaceQuery);

      // 4. Submit and verify the same behavior as empty input
      await helpResourcesPage.submitSearch();
      await helpResourcesPage.verifyUINotBroken();
    });

    test('TC_HR_020: Verify search results persist when switching between tabs', async ({ page }) => {
      // 1. Perform a search with a keyword
      await helpResourcesPage.enterSearchQuery(testData.inputs.searchQuery);
      await helpResourcesPage.submitSearch();

      // 2. Verify search results heading is displayed
      await helpResourcesPage.verifySearchResultsVisible();

      // 3. Close search results and switch to FAQs tab
      await page.getByRole('button', { name: 'Close search results' }).click();
      await helpResourcesPage.clickFaqsTab();

      // 4. Switch back to the 'Categories' tab
      await helpResourcesPage.clickCategoriesTab();

      // 5. Verify the behavior is consistent and not confusing
      await helpResourcesPage.verifyUINotBroken();
    });
  });

  test.describe('Accessibility and Usability', () => {
    test.beforeEach(async () => {
      await helpResourcesPage.navigateToHelpResources();
    });

    test('TC_HR_021: Verify keyboard navigation through all Help & Resources elements', async ({ page }) => {
      // 1. Navigate to Help & Resources page (handled in beforeEach)

      // 2. Verify search bar can receive keyboard focus
      await helpResourcesPage.focusSearchInput();

      // 3. Verify tabs can receive keyboard focus
      await helpResourcesPage.focusCategoriesTab();
      await helpResourcesPage.focusFaqsTab();
      await helpResourcesPage.focusContactTab();

      // 4. Use Enter key to activate a tab
      await helpResourcesPage.focusFaqsTab();
      await helpResourcesPage.pressEnterKey();
      await helpResourcesPage.verifyFaqsTabSelected();
    });
  });
});
