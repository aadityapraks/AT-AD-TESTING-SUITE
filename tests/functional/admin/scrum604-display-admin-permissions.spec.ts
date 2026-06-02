// spec: specs/functional/SCRUM-604-display-admin-permissions.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum604-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-604: Admin - Display Admin Permissions', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_DISP_001: Permissions are displayed as tags on admin cards', async () => {
    // Verify permissions section is visible with tags
    await adminUserRolesPage.verifyPermissionsVisible();

    // Verify specific permission tags are displayed
    await adminUserRolesPage.verifyPermissionTagVisible('Dashboard');
  });

  test('TC_DISP_002: Permissions appear under each admin card', async () => {
    // Verify permissions section is present on cards
    await adminUserRolesPage.verifyPermissionsVisible();

    // Verify multiple cards exist with permissions
    const cardCount = await adminUserRolesPage.getAdminCardCount();
    expect(cardCount, 'Multiple admin cards should exist').toBeGreaterThan(1);
  });

  test('TC_DISP_006: Super Admin card shows all permission tags', async () => {
    // Verify Super Admin has all permissions displayed
    await adminUserRolesPage.verifySuperAdminHasAllPermissions(testData.expected.superAdminPermissions);
  });

  test('TC_DISP_007: Limited-Access Admin card shows only assigned permission tags', async () => {
    // Verify Limited-Access Admin has partial permissions
    await adminUserRolesPage.verifyLimitedAdminHasPartialPermissions();
  });

  test('TC_DISP_008: UI handles overflow when all permissions are assigned', async () => {
    // Verify Super Admin card with all 7 permissions doesn't break layout
    await adminUserRolesPage.verifySuperAdminHasAllPermissions(testData.expected.superAdminPermissions);

    // Verify page heading is still visible (layout not broken)
    await adminUserRolesPage.verifyPageHeading('User & Role Management');
  });

  test('TC_DISP_009: Permission tags have a label prefix', async () => {
    // Verify 'Permissions:' label is visible
    await adminUserRolesPage.verifyPermissionsVisible();
  });

  test('TC_DISP_010: Permission tags are consistent across page refresh', async () => {
    // Verify permissions before refresh
    await adminUserRolesPage.verifyPermissionsVisible();
    await adminUserRolesPage.verifyPermissionTagVisible('Dashboard');

    // Refresh the page
    await adminUserRolesPage.reloadAndWaitForList();

    // Verify permissions after refresh are the same
    await adminUserRolesPage.verifyPermissionsVisible();
    await adminUserRolesPage.verifyPermissionTagVisible('Dashboard');
  });

  test('TC_DISP_011: Permission tag text matches module names exactly', async () => {
    // Verify known permission tag names are displayed correctly
    await adminUserRolesPage.verifyPermissionTagVisible('Dashboard');
    await adminUserRolesPage.verifyPermissionTagVisible('Partner Management');
    await adminUserRolesPage.verifyPermissionTagVisible('Product Management');
  });

  test('TC_DISP_012: Permission tags are visible on paginated pages', async () => {
    // Verify permissions on page 1
    await adminUserRolesPage.verifyPermissionsVisible();

    // Navigate to page 2
    await adminUserRolesPage.clickNextPage();

    // Verify permissions on page 2
    await adminUserRolesPage.verifyPermissionsVisible();
  });

  test('TC_DISP_013: Permission tags are visible when search/filter is applied', async () => {
    // Apply search
    await adminUserRolesPage.typeInSearch('IvAdmin1');
    await adminUserRolesPage.verifyAdminListLoaded();

    // Verify permissions still visible in search results
    await adminUserRolesPage.verifyPermissionsVisible();

    // Clear search and apply filter
    await adminUserRolesPage.clearSearch();
    await adminUserRolesPage.selectRoleFilter('Limited-Access Admin');
    await adminUserRolesPage.verifyAdminListLoaded();

    // Verify permissions still visible in filtered results
    await adminUserRolesPage.verifyPermissionsVisible();
  });
});
