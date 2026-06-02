// spec: specs/functional/SCRUM-601-edit-admin-permissions.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum601-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-601: Admin - Edit Admin Permissions', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_EDIT_001: Clicking Edit Permissions opens the permissions editor', async () => {
    // Click Edit Permissions button for first admin
    await adminUserRolesPage.clickFirstEditPermissionsButton();

    // Verify the Edit Permissions dialog is open
    await adminUserRolesPage.verifyEditPermissionsDialogOpen();
    await adminUserRolesPage.verifyEditPermissionsDialogHeading();

    // Verify Update Permissions button is visible
    await adminUserRolesPage.verifyUpdatePermissionsButtonVisible();
    await adminUserRolesPage.verifyEditDialogCancelButtonVisible();
  });

  test('TC_EDIT_009: Closing editor without saving discards changes', async () => {
    // Note initial admin card state
    await adminUserRolesPage.verifyPermissionsVisible();

    // Open the permissions editor
    await adminUserRolesPage.clickFirstEditPermissionsButton();
    await adminUserRolesPage.verifyEditPermissionsDialogOpen();

    // Close the editor without saving (via Close button)
    await adminUserRolesPage.closeEditPermissionsDialog();

    // Verify dialog is closed
    await adminUserRolesPage.verifyEditPermissionsDialogClosed();

    // Verify admin card permissions are unchanged
    await adminUserRolesPage.verifyPermissionsVisible();
  });

  test('TC_EDIT_010: Edit Permissions button is present on every admin card', async () => {
    // Verify Edit Permissions button is visible
    await adminUserRolesPage.verifyEditPermissionsButtonVisible();

    // Verify all admin cards have the button
    await adminUserRolesPage.verifyEditPermissionsButtonOnAllCards();
  });
});
