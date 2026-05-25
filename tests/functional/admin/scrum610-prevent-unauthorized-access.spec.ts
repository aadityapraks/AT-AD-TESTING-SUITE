// spec: specs/functional/SCRUM-610-prevent-unauthorized-access.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum610-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-610: Admin - Prevent Unauthorized Access', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_AUTH_001: Super Admin can access User & Roles module', async () => {
    // Verify the User & Roles page loads successfully
    await adminUserRolesPage.verifyPageHeading(testData.expected.pageHeading);

    // Verify the admin list is displayed
    await adminUserRolesPage.verifyAdminListLoaded();

    // Verify all management controls are visible
    await adminUserRolesPage.verifyAddInternalAdminButtonVisible();
    await adminUserRolesPage.verifyEditPermissionsButtonVisible();
    await adminUserRolesPage.verifyRoleDropdownVisible();

    // Verify URL is correct
    await adminUserRolesPage.verifyOnUserRolesPage();
  });

  test('TC_AUTH_002: Super Admin can add admins', async () => {
    // Verify Add Internal Admin button is visible and clickable
    await adminUserRolesPage.verifyAddInternalAdminButtonVisible();

    // Click it and verify modal opens
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Close modal
    await adminUserRolesPage.closeAddAdminModal();
  });

  test('TC_AUTH_004: Super Admin can edit permissions', async () => {
    // Verify Edit Permissions button is visible
    await adminUserRolesPage.verifyEditPermissionsButtonVisible();

    // Click it and verify editor opens
    await adminUserRolesPage.clickFirstEditPermissionsButton();
    await adminUserRolesPage.verifyEditPermissionsDialogOpen();

    // Close editor
    await adminUserRolesPage.closeEditPermissionsDialog();
  });
});
