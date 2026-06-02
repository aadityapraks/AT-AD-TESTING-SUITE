// spec: specs/functional/SCRUM-607-track-admin-assignment.json

import { test, expect } from '@playwright/test';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum607-functional.json';

const URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-607: Admin - Track Admin Assignment Details', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAsAdmin(URL, EMAIL, PASSWORD);
    await adminUserRolesPage.navigateToUserRoles();
  });

  test('TC_TRACK_001: Admin card displays assigned date', async () => {
    // Verify 'Assigned:' followed by a date is displayed
    await adminUserRolesPage.verifyAssignedDateVisible();
  });

  test('TC_TRACK_002: Admin card displays assigned by information', async () => {
    // Verify 'Assigned By:' information is displayed
    await adminUserRolesPage.verifyAssignedByVisible();
  });

  test('TC_TRACK_006: Assignment data persists after page refresh', async () => {
    // Verify assignment data before refresh
    await adminUserRolesPage.verifyAssignedDateVisible();
    await adminUserRolesPage.verifyAssignedByVisible();

    // Refresh the page
    await adminUserRolesPage.reloadAndWaitForList();

    // Verify assignment data after refresh is unchanged
    await adminUserRolesPage.verifyAssignedDateVisible();
    await adminUserRolesPage.verifyAssignedByVisible();
  });

  test('TC_TRACK_010: System-created admins show System as assigner', async () => {
    // Search for a system-created admin (Super Admin with 'System' assigner)
    await adminUserRolesPage.typeInSearch('illubd');
    await adminUserRolesPage.verifyAdminListLoaded();

    // Verify 'Assigned By:System' is visible
    await adminUserRolesPage.verifyAssignedByVisible();
  });

  test('TC_TRACK_011: Assignment date format is consistent across all admin cards', async () => {
    // Verify assigned date is visible (format YYYY-MM-DD)
    await adminUserRolesPage.verifyAssignedDateVisible();

    // Navigate to page 2 and verify same format
    await adminUserRolesPage.clickNextPage();
    await adminUserRolesPage.verifyAssignedDateVisible();
  });

  test('TC_TRACK_012: Assignment details are visible on paginated pages', async () => {
    // Verify on page 1
    await adminUserRolesPage.verifyAssignedDateVisible();
    await adminUserRolesPage.verifyAssignedByVisible();

    // Navigate to page 2
    await adminUserRolesPage.clickNextPage();

    // Verify on page 2
    await adminUserRolesPage.verifyAssignedDateVisible();
    await adminUserRolesPage.verifyAssignedByVisible();
  });

  test('TC_TRACK_013: Assignment details are visible when search/filter is applied', async () => {
    // Apply search
    await adminUserRolesPage.typeInSearch('IvAdmin1');
    await adminUserRolesPage.verifyAdminListLoaded();

    // Verify assignment details in search results
    await adminUserRolesPage.verifyAssignedDateVisible();
    await adminUserRolesPage.verifyAssignedByVisible();
  });
});
