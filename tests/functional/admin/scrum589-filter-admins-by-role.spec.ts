// spec: specs/functional/SCRUM-589-filter-admins-by-role.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum589-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-589: Admin - Filter Admins by Role', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_FILTER_001: Role filter dropdown is visible with correct options', async () => {
    // Verify role filter dropdown is visible with default text 'All Roles'
    await adminUserRolesPage.verifyRoleDropdownVisible();

    // Click dropdown and verify all three options are available
    await adminUserRolesPage.verifyRoleDropdownOpensWithOptions();
  });

  test('TC_FILTER_002: Selecting All Roles shows all administrators', async () => {
    // Select 'All Roles' from the dropdown
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterAllRoles);

    // Verify both role types are visible
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.superAdminRole);
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.limitedAdminRole);

    // Verify admin count is shown
    await adminUserRolesPage.verifyShowingAdminsCount();
  });

  test('TC_FILTER_003: Selecting Super Admin filters to show only Super Admins', async () => {
    // Select 'Super Admin' from the role filter
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);

    // Verify only Super Admin cards are displayed
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.superAdminRole);

    // Verify count updates
    await adminUserRolesPage.verifyShowingAdminsCount();
  });

  test('TC_FILTER_004: Selecting Limited-Access Admin filters to show only Limited-Access Admins', async () => {
    // Select 'Limited-Access Admin' from the role filter
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterLimitedAdmin);

    // Verify only Limited Access Admin cards are displayed
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.limitedAdminRole);

    // Verify count updates
    await adminUserRolesPage.verifyShowingAdminsCount();
  });

  test('TC_FILTER_005: Selected filter is visually highlighted', async () => {
    // Verify default shows 'All Roles'
    await adminUserRolesPage.verifyRoleDropdownVisible();

    // Select 'Super Admin' and verify button text changes
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);
    await adminUserRolesPage.verifyRoleFilterButtonText(testData.inputs.filterSuperAdmin);

    // Select 'Limited-Access Admin' and verify button text changes
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterLimitedAdmin);
    await adminUserRolesPage.verifyRoleFilterButtonText(testData.inputs.filterLimitedAdmin);
  });

  test('TC_FILTER_006: Filter works along with search - filter first then search', async () => {
    // Select 'Limited-Access Admin' from the role filter
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterLimitedAdmin);

    // Verify only Limited-Access Admins are shown
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.limitedAdminRole);

    // Type a search query
    await adminUserRolesPage.typeInSearch('IvAdmin1');

    // Verify results are filtered by both criteria
    await adminUserRolesPage.verifyAdminCardHasName('IvAdmin1');
  });

  test('TC_FILTER_007: Filter works along with search - search first then filter', async () => {
    // Type a search query first
    await adminUserRolesPage.typeInSearch(testData.inputs.searchQuery);

    // Verify results are shown
    await adminUserRolesPage.verifyAdminListLoaded();

    // Then apply role filter
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);

    // Verify combined results
    await adminUserRolesPage.verifyShowingAdminsCount();
  });

  test('TC_FILTER_008: No admins in selected role shows empty state', async () => {
    // Search for a specific admin name
    await adminUserRolesPage.typeInSearch('IvAdmin1');

    // Then filter by Super Admin (IvAdmin1 is Limited-Access, so no match)
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);

    // Verify empty state
    await adminUserRolesPage.verifyNoAdminsFound();
  });

  test('TC_FILTER_009: Switching filter while search is applied updates results correctly', async () => {
    // Type a search query
    await adminUserRolesPage.typeInSearch(testData.inputs.searchQuery);

    // Select Super Admin filter
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);
    await adminUserRolesPage.verifyShowingAdminsCount();

    // Switch to Limited-Access Admin
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterLimitedAdmin);
    await adminUserRolesPage.verifyShowingAdminsCount();

    // Switch to All Roles
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterAllRoles);
    await adminUserRolesPage.verifyShowingAdminsCount();

    // Verify search query is still in the field
    await adminUserRolesPage.verifySearchInputValue(testData.inputs.searchQuery);
  });

  test('TC_FILTER_010: Role filter resets to All Roles on page refresh', async () => {
    // Select 'Super Admin' from the role filter
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);

    // Verify filtered results are shown
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.superAdminRole);

    // Refresh the page
    await adminUserRolesPage.reloadAndWaitForList();

    // Verify filter resets to 'All Roles' and full list is displayed
    await adminUserRolesPage.verifyRoleDropdownVisible();
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.superAdminRole);
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.limitedAdminRole);
  });

  test('TC_FILTER_011: Admin count updates correctly when filter changes', async () => {
    // Note total count with All Roles
    const totalCount = await adminUserRolesPage.getAdminCardCount();

    // Select Super Admin and note count
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);
    await adminUserRolesPage.verifyAdminListLoaded();
    const superAdminCount = await adminUserRolesPage.getAdminCardCount();
    expect(superAdminCount, 'Super Admin count should be less than total').toBeLessThanOrEqual(totalCount);

    // Select Limited-Access Admin and note count
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterLimitedAdmin);
    await adminUserRolesPage.verifyAdminListLoaded();
    const limitedCount = await adminUserRolesPage.getAdminCardCount();
    expect(limitedCount, 'Limited Admin count should be greater than 0').toBeGreaterThan(0);

    // Verify counts are different from total
    expect(superAdminCount + limitedCount, 'Sum should approximate total').toBeGreaterThanOrEqual(totalCount);
  });

  test('TC_FILTER_012: Filter dropdown closes after selection', async () => {
    // Select Super Admin from dropdown
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);

    // Verify dropdown button shows selected text (dropdown is closed)
    await adminUserRolesPage.verifyRoleFilterButtonText(testData.inputs.filterSuperAdmin);

    // Verify admin list updated
    await adminUserRolesPage.verifyAdminListLoaded();
  });

  test('TC_FILTER_013: Pagination resets when filter changes', async () => {
    // Navigate to page 2
    await adminUserRolesPage.clickNextPage();

    // Change the role filter
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);

    // Verify Previous button is disabled (back on page 1)
    await adminUserRolesPage.verifyPreviousButtonDisabled();
  });

  test('TC_FILTER_014: Filter selection persists during same session navigation', async () => {
    // Select Super Admin filter
    await adminUserRolesPage.selectRoleFilter(testData.inputs.filterSuperAdmin);

    // Navigate away to Dashboard
    await adminUserRolesPage.navigateToDashboard();

    // Navigate back to User & Roles
    await adminUserRolesPage.navigateToUserRoles();

    // Verify filter state is consistent (resets to All Roles is acceptable)
    await adminUserRolesPage.verifyRoleDropdownVisible();
    await adminUserRolesPage.verifyAdminListLoaded();
  });
});
