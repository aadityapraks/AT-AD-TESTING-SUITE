// spec: specs/functional/SCRUM-592-add-internal-admin.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum592-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-592: Admin - Add Internal Admin', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_ADD_001: Clicking Add Internal Admin button opens the modal', async () => {
    // Verify the 'Add Internal Admin' button is visible
    await adminUserRolesPage.verifyAddInternalAdminButtonVisible();

    // Click the button to open the modal
    await adminUserRolesPage.clickAddInternalAdminButton();

    // Verify the modal is open with correct heading
    await adminUserRolesPage.verifyAddAdminModalOpen();
    await adminUserRolesPage.verifyAddAdminModalHeading(testData.expected.modalHeading);

    // Verify modal contains Name, Email, and Permissions fields
    await adminUserRolesPage.verifyModalNameFieldVisible();
    await adminUserRolesPage.verifyModalEmailFieldVisible();
    await adminUserRolesPage.verifyModalPermissionsVisible();

    // Verify Add Admin and Cancel buttons are present
    await adminUserRolesPage.verifyAddAdminButtonVisible();
    await adminUserRolesPage.verifyCancelButtonVisible();
  });

  test('TC_ADD_002: Modal contains Name, Email, and Permissions fields', async () => {
    // Open the Add Internal Admin modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Verify Name field is present
    await adminUserRolesPage.verifyModalNameFieldVisible();

    // Verify Email field is present
    await adminUserRolesPage.verifyModalEmailFieldVisible();

    // Verify Permissions section with checkboxes is present
    await adminUserRolesPage.verifyModalPermissionsVisible();
    await adminUserRolesPage.verifyPermissionCheckboxCount(7);
  });

  test('TC_ADD_003: Permissions section shows all available modules', async () => {
    // Open the Add Internal Admin modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Verify all permission labels are visible
    for (const perm of testData.expected.permissions) {
      await adminUserRolesPage.verifyPermissionLabelInModal(perm);
    }
  });

  test('TC_ADD_008: Empty name field prevents submission', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Leave Name empty, fill email and select permission
    await adminUserRolesPage.fillModalEmailField(testData.inputs.validEmail);
    await adminUserRolesPage.selectPermissionInModal('Dashboard');

    // Click Add Admin
    await adminUserRolesPage.clickAddAdminButton();

    // Verify modal is still open (form did not submit)
    await adminUserRolesPage.verifyModalStillOpen();
  });

  test('TC_ADD_010: Modal closed before submission does not create admin', async () => {
    // Note the initial admin count
    const initialCount = await adminUserRolesPage.getAdminCardCount();

    // Open the Add Internal Admin modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Close the modal without clicking 'Add Admin' (via X button)
    await adminUserRolesPage.closeAddAdminModal();

    // Verify modal is closed
    await adminUserRolesPage.verifyAddAdminModalClosed();

    // Verify no new admin is created - count remains unchanged
    const afterCount = await adminUserRolesPage.getAdminCardCount();
    expect(afterCount, 'Admin count should remain unchanged after closing modal').toBe(initialCount);
  });

  test('TC_ADD_013: Cannot submit form without selecting at least one permission', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Fill name and email but do NOT select any permissions
    await adminUserRolesPage.fillModalNameField(testData.inputs.validName);
    await adminUserRolesPage.fillModalEmailField(testData.inputs.validEmail);

    // Click Add Admin
    await adminUserRolesPage.clickAddAdminButton();

    // Verify modal is still open (form did not submit without permissions)
    await adminUserRolesPage.verifyModalStillOpen();
  });

  test('TC_ADD_014: Modal can be closed via X button', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Close via X button
    await adminUserRolesPage.closeAddAdminModal();

    // Verify modal is closed
    await adminUserRolesPage.verifyAddAdminModalClosed();
  });

  test('TC_ADD_015: Modal can be closed via Escape key', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Close via Escape key
    await adminUserRolesPage.closeModalViaEscape();

    // Verify modal is closed
    await adminUserRolesPage.verifyAddAdminModalClosed();
  });

  test('TC_ADD_016: Name field accepts valid characters', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Verify alphabetic name is accepted
    await adminUserRolesPage.verifyNameFieldAcceptsInput(testData.inputs.validName);

    // Verify name with numbers is accepted
    await adminUserRolesPage.verifyNameFieldAcceptsInput(testData.inputs.nameWithNumbers);

    // Verify name with special characters is accepted
    await adminUserRolesPage.verifyNameFieldAcceptsInput(testData.inputs.nameWithSpecialChars);
  });

  test('TC_ADD_020: Add Admin button state with empty fields', async () => {
    // Open modal
    await adminUserRolesPage.clickAddInternalAdminButton();
    await adminUserRolesPage.verifyAddAdminModalOpen();

    // Verify Add Admin button is visible
    await adminUserRolesPage.verifyAddAdminButtonVisible();

    // Click Add Admin with all fields empty
    await adminUserRolesPage.clickAddAdminButton();

    // Verify modal remains open (validation prevents submission)
    await adminUserRolesPage.verifyModalStillOpen();
  });
});
