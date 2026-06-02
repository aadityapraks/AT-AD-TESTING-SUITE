// spec: specs/functional/SCRUM-595-assign-admin-role.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum595-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-595: Admin - Assign Admin Role', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_ROLE_001: Role label is visible on admin cards', async () => {
    // Verify admin cards display the current role
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.superAdminRole);
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.limitedAdminRole);

    // Verify Edit Permissions button is available (role management entry point)
    await adminUserRolesPage.verifyEditPermissionsButtonVisible();
  });

  test('TC_ROLE_002: Both role types exist in the admin list', async () => {
    // Verify Super Admin role is present
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.superAdminRole);

    // Verify Limited Access Admin role is present
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.limitedAdminRole);

    // Verify the role filter dropdown shows both options
    await adminUserRolesPage.verifyRoleDropdownOpensWithOptions();
  });

  test('TC_ROLE_010: Page refresh does not corrupt role data', async () => {
    // Note the roles visible before refresh
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.superAdminRole);
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.limitedAdminRole);

    // Refresh the page
    await adminUserRolesPage.reloadAndWaitForList();

    // Verify roles are still consistent after refresh
    await adminUserRolesPage.verifyAdminListLoaded();
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.superAdminRole);
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.limitedAdminRole);

    // Verify permissions still match roles
    await adminUserRolesPage.verifyPermissionsVisible();
  });

  test('TC_ROLE_011: Multiple admins have independent roles', async () => {
    // Verify multiple admin cards exist
    const cardCount = await adminUserRolesPage.getAdminCardCount();
    expect(cardCount, 'Multiple admin cards should exist').toBeGreaterThan(1);

    // Verify both role types coexist independently
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.superAdminRole);
    await adminUserRolesPage.verifyRoleLabelVisible(testData.expected.limitedAdminRole);

    // Verify each card has its own Edit Permissions button
    await adminUserRolesPage.verifyEditPermissionsButtonOnAllCards();
  });

  test('TC_ROLE_005: Super Admin cards show all permissions', async () => {
    // Verify Super Admin has all permissions displayed
    await adminUserRolesPage.verifySuperAdminHasAllPermissions(
      ['Dashboard', 'User Management', 'Partner Management', 'Product Management', 'Comment Moderation', 'Content Management', 'Analytics']
    );
  });

  test('TC_ROLE_006: Limited-Access Admin cards show partial permissions', async () => {
    // Verify Limited-Access Admin has fewer than all permissions
    await adminUserRolesPage.verifyLimitedAdminHasPartialPermissions();
  });
});
