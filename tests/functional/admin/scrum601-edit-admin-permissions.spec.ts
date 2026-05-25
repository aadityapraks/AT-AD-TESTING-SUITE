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

    // Verify dialog has checkboxes and Update Permissions button
    await adminUserRolesPage.verifyEditDialogHasCheckboxes();
    await adminUserRolesPage.verifyUpdatePermissionsButtonVisible();
  });
});
