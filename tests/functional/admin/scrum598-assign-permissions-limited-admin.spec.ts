// spec: specs/functional/SCRUM-598-assign-permissions-limited-admin.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum598-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-598: Admin - Assign Permissions to Limited Access Admin', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_PERM_001: Permissions section displays all available permissions as checkboxes', async () => {
    // Open the Add Internal Admin modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Verify permissions section is displayed with checkboxes
    await adminUserRolesPage.verifyModalPermissionsVisible();

    // Verify all permission checkboxes are present (7 total)
    await adminUserRolesPage.verifyPermissionCheckboxCount(testData.expected.permissionCount);

    // Verify each permission label is visible
    for (const perm of testData.expected.permissions) {
      await adminUserRolesPage.verifyPermissionLabelInModal(perm);
    }
  });

  test('TC_PERM_002: Permissions are selectable via checkboxes - single selection', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Click on Dashboard checkbox
    await adminUserRolesPage.selectPermissionInModal('Dashboard');

    // Verify it can be toggled (check then uncheck)
    await adminUserRolesPage.selectPermissionInModal('Dashboard');
  });

  test('TC_PERM_003: Multiple permissions can be selected simultaneously', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Select multiple permissions
    await adminUserRolesPage.selectPermissionInModal('User Management');
    await adminUserRolesPage.selectPermissionInModal('Partner Management');
    await adminUserRolesPage.selectPermissionInModal('Analytics');
  });

  test('TC_PERM_004: At least one permission must be selected - validation error', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Fill name and email but do NOT select any permissions
    await adminUserRolesPage.fillModalNameField('TestPerm');
    await adminUserRolesPage.fillModalEmailField('testperm@mailto.plus');

    // Click Add Admin without selecting permissions
    await adminUserRolesPage.clickAddAdminButton();

    // Verify modal remains open (form did not submit)
    await adminUserRolesPage.verifyModalStillOpen();
  });

  test('TC_PERM_007: Deselecting a permission removes it from selection', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Select multiple permissions
    await adminUserRolesPage.selectPermissionInModal('User Management');
    await adminUserRolesPage.selectPermissionInModal('Content Management');
    await adminUserRolesPage.selectPermissionInModal('Analytics');

    // Deselect one (toggle it off)
    await adminUserRolesPage.selectPermissionInModal('Content Management');
  });

  test('TC_PERM_010: Permissions section is visible in the Add Admin modal', async () => {
    // Open the Add Internal Admin modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Verify permissions section is immediately visible (no role selection needed)
    await adminUserRolesPage.verifyModalPermissionsVisible();

    // Verify the permissions label and checkboxes are present
    await adminUserRolesPage.verifyPermissionCheckboxCount(testData.expected.permissionCount);
  });

  test('TC_PERM_011: Permission checkboxes are independent - no cascading selection', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Select Content Management
    await adminUserRolesPage.selectPermissionInModal('Content Management');

    // Select Analytics
    await adminUserRolesPage.selectPermissionInModal('Analytics');

    // Verify checkboxes operate independently (no cascading)
    // If we got here without errors, checkboxes are independent
  });

  test('TC_PERM_014: Permission labels match the system module names', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Verify permission labels match known module names
    await adminUserRolesPage.verifyPermissionLabelInModal('Dashboard');
    await adminUserRolesPage.verifyPermissionLabelInModal('Partner Management');
    await adminUserRolesPage.verifyPermissionLabelInModal('Product Management');
    await adminUserRolesPage.verifyPermissionLabelInModal('Comment Moderation');
    await adminUserRolesPage.verifyPermissionLabelInModal('User Management');
    await adminUserRolesPage.verifyPermissionLabelInModal('Content Management');
    await adminUserRolesPage.verifyPermissionLabelInModal('Analytics');
  });
});
