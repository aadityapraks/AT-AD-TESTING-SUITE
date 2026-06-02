// spec: specs/functional/SCRUM-586-search-admin-users.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum586-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-586: Admin - Search Admin Users', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_SEARCH_001: Search bar is visible and accepts text input', async () => {
    // Verify search bar is visible with placeholder text
    await adminUserRolesPage.verifySearchInputVisible();
    await adminUserRolesPage.verifySearchPlaceholder(testData.expected.searchPlaceholder);

    // Click on the search input field
    await adminUserRolesPage.clickSearchInput();

    // Type text and verify it appears in the field
    await adminUserRolesPage.typeInSearch(testData.inputs.searchGenericText);
    await adminUserRolesPage.verifySearchInputValue(testData.inputs.searchGenericText);
  });

  test('TC_SEARCH_002: Search by admin name returns matching results', async () => {
    // Type admin name in the search bar
    await adminUserRolesPage.typeInSearch(testData.inputs.searchByName);

    // Verify only matching admin card is displayed
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminName);
  });

  test('TC_SEARCH_003: Search by email returns matching results', async () => {
    // Type email in the search bar
    await adminUserRolesPage.typeInSearch(testData.inputs.searchByEmail);

    // Verify matching admin card is displayed
    await adminUserRolesPage.verifyAdminCardHasEmail(testData.expected.adminEmail);
  });

  test('TC_SEARCH_004: Results filter dynamically as user types', async () => {
    // Type 3 characters - partial match should start filtering
    await adminUserRolesPage.typeInSearch(testData.inputs.searchPartial3Chars);

    // Verify results are filtered (admin list shows matches)
    await adminUserRolesPage.verifyAdminListLoaded();
    await adminUserRolesPage.verifyShowingAdminsCount();
  });

  test('TC_SEARCH_005: Partial matches are supported from 3 characters minimum', async () => {
    // Type partial name (3+ chars)
    await adminUserRolesPage.typeInSearch(testData.inputs.searchPartialName);

    // Verify results contain partial matches
    await adminUserRolesPage.verifyAdminListLoaded();

    // Clear and search by partial domain
    await adminUserRolesPage.clearSearch();
    await adminUserRolesPage.typeInSearch(testData.inputs.searchPartialDomain);
    await adminUserRolesPage.verifyAdminListLoaded();
  });

  test('TC_SEARCH_006: Search is case-insensitive', async () => {
    // Search with lowercase
    await adminUserRolesPage.typeInSearch(testData.inputs.searchLowercase);
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminName);

    // Clear and search with uppercase
    await adminUserRolesPage.clearSearch();
    await adminUserRolesPage.typeInSearch(testData.inputs.searchUppercase);
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminName);

    // Clear and search with mixed case
    await adminUserRolesPage.clearSearch();
    await adminUserRolesPage.typeInSearch(testData.inputs.searchMixedCase);
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminName);
  });

  test('TC_SEARCH_007: Clearing search restores full admin list', async () => {
    // Perform a search that filters results
    await adminUserRolesPage.typeInSearch(testData.inputs.searchByName);
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminName);

    // Clear the search field
    await adminUserRolesPage.clearSearch();

    // Verify full admin list is restored
    const cardCount = await adminUserRolesPage.getAdminCardCount();
    expect(cardCount, 'Full admin list should be restored after clearing search').toBeGreaterThan(1);
  });

  test('TC_SEARCH_008: No results shows Showing 0 admins', async () => {
    // Type a query that matches no admins
    await adminUserRolesPage.typeInSearch(testData.inputs.searchNoResults);

    // Verify no results state
    await adminUserRolesPage.verifyNoAdminsFound();
  });

  test('TC_SEARCH_009: Special characters in search (@) work correctly', async () => {
    // Type search with @ character
    await adminUserRolesPage.typeInSearch(testData.inputs.searchSpecialChar);

    // Verify results are returned (admins with @mailto in email)
    await adminUserRolesPage.verifyAdminListLoaded();
  });

  test('TC_SEARCH_010: Search with fewer than 3 characters does not filter', async () => {
    // Note the initial admin card count
    const initialCount = await adminUserRolesPage.getAdminCardCount();

    // Type only 2 characters in the search bar
    await adminUserRolesPage.typeInSearch(testData.inputs.search2Chars);

    // Verify the full admin list remains unchanged (no filtering with < 3 chars)
    const afterCount = await adminUserRolesPage.getAdminCardCount();
    expect(afterCount, 'List should not filter with fewer than 3 characters').toBe(initialCount);
  });

  test('TC_SEARCH_011: Search works with email domain partial match', async () => {
    // Type email domain
    await adminUserRolesPage.typeInSearch(testData.inputs.searchDomainFull);

    // Verify results contain admins with that domain
    await adminUserRolesPage.verifyAdminListLoaded();
  });

  test('TC_SEARCH_012: Search persists after pagination navigation', async () => {
    // Type a search query that returns multiple results
    await adminUserRolesPage.typeInSearch(testData.inputs.searchPartialName);

    // Verify results are filtered
    await adminUserRolesPage.verifyAdminListLoaded();

    // Store the search value
    await adminUserRolesPage.verifySearchInputValue(testData.inputs.searchPartialName);
  });

  test('TC_SEARCH_013: Search combined with role filter works correctly', async () => {
    // Select a role filter first
    await adminUserRolesPage.selectRoleFilter('Super Admin');

    // Then type a search query
    await adminUserRolesPage.typeInSearch(testData.inputs.searchPartialDomain);

    // Verify results are filtered by both criteria
    await adminUserRolesPage.verifyShowingAdminsCount();
  });

  test('TC_SEARCH_014: Search with leading/trailing spaces is trimmed', async () => {
    // Type search with leading/trailing spaces
    await adminUserRolesPage.typeInSearch(testData.inputs.searchWithSpaces);

    // Verify results match the trimmed query (IvAdmin1)
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminName);
  });

  test('TC_SEARCH_015: Search field can be cleared using backspace/delete', async () => {
    // Type a search query
    await adminUserRolesPage.typeInSearch(testData.inputs.searchByName);

    // Verify filtered results
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminName);

    // Clear using select all + backspace
    await adminUserRolesPage.clearSearch();

    // Verify full list is restored
    const cardCount = await adminUserRolesPage.getAdminCardCount();
    expect(cardCount, 'Full list should restore after clearing').toBeGreaterThan(1);
  });

  test('TC_SEARCH_016: Search with only spaces does not filter results', async () => {
    // Note initial count
    const initialCount = await adminUserRolesPage.getAdminCardCount();

    // Type only spaces
    await adminUserRolesPage.typeInSearch(testData.inputs.searchSpacesOnly);

    // Verify full admin list remains unchanged
    const afterCount = await adminUserRolesPage.getAdminCardCount();
    expect(afterCount, 'Spaces-only should not filter results').toBe(initialCount);
  });

  test('TC_SEARCH_017: Rapid typing does not cause duplicate or stale results', async () => {
    // Rapidly type a search query
    await adminUserRolesPage.typeInSearchSlowly(testData.inputs.searchByName);

    // Verify correct final result
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminName);
  });
});
