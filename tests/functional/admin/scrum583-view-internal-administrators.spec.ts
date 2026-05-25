// spec: specs/functional/SCRUM-583-view-internal-administrators.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum583-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-583: Admin - View Internal Administrators', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_UR_001: Admin list loads automatically when page opens', async () => {
    // Verify the Internal Administrators page loads without requiring any manual action
    await adminUserRolesPage.verifyAdminListLoaded();

    // Verify a list of admin cards is displayed automatically
    const cardCount = await adminUserRolesPage.getAdminCardCount();
    expect(cardCount, 'Admin cards should be displayed').toBeGreaterThan(0);

    // Verify a 'Showing X admins' count is visible
    await adminUserRolesPage.verifyShowingAdminsCount();
  });

  test('TC_UR_002: Admin card displays admin name', async () => {
    // Verify the admin name is displayed prominently on the card as a heading
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminNames[0]);
  });

  test('TC_UR_003: Admin card displays email ID', async () => {
    // Verify the email address is displayed on the admin card
    await adminUserRolesPage.verifyAdminCardHasEmail(testData.expected.adminEmails[0]);
  });

  test('TC_UR_004: Admin card displays role label - Super Admin', async () => {
    // Verify 'Super Admin' role label is visible on a card
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.roleLabels[0]);
  });

  test('TC_UR_005: Admin card displays role label - Limited-Access Admin', async () => {
    // Verify 'Limited Access Admin' role label is visible on a card
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.roleLabels[1]);
  });

  test('TC_UR_006: Admin card displays Active status', async () => {
    // Verify 'Active' status is displayed on admin cards
    await adminUserRolesPage.verifyActiveStatusVisible();
  });

  test('TC_UR_007: Admin card displays assigned date', async () => {
    // Verify 'Assigned:' followed by a date is displayed
    await adminUserRolesPage.verifyAssignedDateVisible();
  });

  test('TC_UR_008: Admin card displays assigned by information', async () => {
    // Verify 'Assigned By:' information is displayed
    await adminUserRolesPage.verifyAssignedByVisible();
  });

  test('TC_UR_009: Admin card displays assigned permissions', async () => {
    // Verify 'Permissions:' label is visible
    await adminUserRolesPage.verifyPermissionsVisible();

    // Verify permission tags are shown
    await adminUserRolesPage.verifyPermissionTagVisible('Dashboard');
  });

  test('TC_UR_010: Admin role dropdown is visible on the page', async () => {
    // Verify the 'All Roles' dropdown filter is visible in the toolbar area
    await adminUserRolesPage.verifyRoleDropdownVisible();

    // Verify the dropdown is clickable and shows filter options
    await adminUserRolesPage.verifyRoleDropdownOpensWithOptions();
  });

  test('TC_UR_011: Edit Permissions button is available on each admin card', async () => {
    // Verify Edit Permissions button is present on each card
    await adminUserRolesPage.verifyEditPermissionsButtonVisible();

    // Verify button includes context about which admin
    await adminUserRolesPage.verifyEditPermissionsButtonHasContext(testData.expected.adminNames[0]);

    // Verify all cards have the button
    await adminUserRolesPage.verifyEditPermissionsButtonOnAllCards();
  });

  test('TC_UR_012: Page displays correct admin count', async () => {
    // Verify admin count indicator is visible
    await adminUserRolesPage.verifyShowingAdminsCount();

    // Verify card count matches displayed count
    await adminUserRolesPage.verifyCardCountMatchesDisplayedCount();
  });

  test('TC_UR_013: Pagination works when admin list exceeds page limit', async () => {
    // Verify pagination controls are visible
    await adminUserRolesPage.verifyPaginationVisible();

    // Verify Previous is disabled on first page
    await adminUserRolesPage.verifyPreviousButtonDisabled();

    // Click Next and verify new cards load
    await adminUserRolesPage.clickNextPage();
    await adminUserRolesPage.verifyAdminListLoaded();

    // Click Previous and verify original cards return
    await adminUserRolesPage.clickPreviousPage();
    await adminUserRolesPage.verifyAdminCardHasName(testData.expected.adminNames[0]);
  });

  test('TC_UR_014: Page heading and subtitle are correct', async () => {
    // Verify page heading
    await adminUserRolesPage.verifyPageHeading(testData.expected.pageHeading);

    // Verify subtitle
    await adminUserRolesPage.verifyPageSubtitle(testData.expected.pageSubtitle);

    // Verify section title
    await adminUserRolesPage.verifySectionTitle(testData.expected.sectionTitle);
  });

  test('TC_UR_015: Search input is visible and functional', async () => {
    // Verify search input is visible
    await adminUserRolesPage.verifySearchInputVisible();

    // Verify placeholder text
    await adminUserRolesPage.verifySearchPlaceholder(testData.expected.searchPlaceholder);
  });

  test('TC_UR_016: Add Internal Admin button is visible', async () => {
    // Verify Add Internal Admin button is visible in the toolbar
    await adminUserRolesPage.verifyAddInternalAdminButtonVisible();
  });

  test('TC_UR_017: Multiple admin cards display simultaneously', async () => {
    // Verify multiple admin cards are displayed
    const cardCount = await adminUserRolesPage.getAdminCardCount();
    expect(cardCount, 'Multiple admin cards should be displayed').toBeGreaterThanOrEqual(3);
  });

  test('TC_UR_018: Super Admin permissions show all modules', async () => {
    // Verify Super Admin card shows all available permissions
    await adminUserRolesPage.verifySuperAdminHasAllPermissions(testData.expected.superAdminPermissions);
  });

  test('TC_UR_019: Limited-Access Admin permissions show only assigned modules', async () => {
    // Verify Limited-Access Admin card shows only assigned permissions (subset)
    await adminUserRolesPage.verifyLimitedAdminHasPartialPermissions();
  });

  test('TC_UR_020: Page refresh reloads admin list correctly', async () => {
    // Refresh the page
    await adminUserRolesPage.reloadAndWaitForList();

    // Verify admin list loads again correctly
    await adminUserRolesPage.verifyAdminListLoaded();
    await adminUserRolesPage.verifyShowingAdminsCount();
  });

  test('TC_UR_021: Navigation to User & Roles from sidebar', async () => {
    // Verify URL is correct
    await adminUserRolesPage.verifyOnUserRolesPage();

    // Verify User & Roles link is active
    await adminUserRolesPage.verifyUserRolesLinkActive();

    // Verify page content loaded
    await adminUserRolesPage.verifyPageHeading(testData.expected.pageHeading);
  });

  test('TC_UR_022: Admin card layout consistency across different roles', async () => {
    // Verify both role types exist
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.roleLabels[0]);
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.roleLabels[1]);

    // Verify both have Edit Permissions buttons
    await adminUserRolesPage.verifyEditPermissionsButtonVisible();

    // Verify both have permissions sections
    await adminUserRolesPage.verifyPermissionsVisible();

    // Verify both have status
    await adminUserRolesPage.verifyActiveStatusVisible();
  });
});
