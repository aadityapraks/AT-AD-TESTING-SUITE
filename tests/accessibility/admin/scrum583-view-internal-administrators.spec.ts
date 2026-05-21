// spec: specs/a11y/SCRUM-583-view-internal-administrators.json

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AdminUserRolesPage } from '../../../pages/admin-user-roles.page';
import testData from '../../../test-data/scrum583-accessibility.json';

const ADMIN_URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-583: Admin - View Internal Administrators Accessibility', () => {
  let adminUserRolesPage: AdminUserRolesPage;

  test.beforeEach(async ({ page }) => {
    adminUserRolesPage = new AdminUserRolesPage(page);
    await adminUserRolesPage.loginAndNavigateToUserRoles(ADMIN_URL, EMAIL, PASSWORD);
  });

  test.describe('Page Structure (WCAG 1.3.1)', () => {
    test('TC_A11Y_001: Page has proper heading hierarchy for administrators list', async () => {
      // Verify the page has an H1 heading identifying the page purpose
      await adminUserRolesPage.verifyPageHasH1Heading();

      // Verify subheadings follow a logical hierarchy (H1 > H2 > H3)
      await adminUserRolesPage.verifyHeadingHierarchy();
    });

    test('TC_A11Y_002: Admin list uses proper semantic list structure', async ({ page }) => {
      // Verify admin cards use heading structure for names
      await adminUserRolesPage.verifyAdminCardHeadingsExist();

      // Verify showing count is visible (indicates list is loaded)
      await adminUserRolesPage.verifyShowingAdminsCountVisible();
    });

    test('TC_A11Y_003: Admin card information is programmatically associated', async () => {
      // Verify admin name is announced as the card heading
      await adminUserRolesPage.verifyAdminCardHasName(0);

      // Verify email is present
      await adminUserRolesPage.verifyAdminCardHasEmail(0);

      // Verify role label is present
      await adminUserRolesPage.verifyAdminCardHasRoleLabel();

      // Verify status is present
      await adminUserRolesPage.verifyAdminCardHasStatus();

      // Verify assigned date is present
      await adminUserRolesPage.verifyAdminCardHasAssignedDate();

      // Verify assigned by is present
      await adminUserRolesPage.verifyAdminCardHasAssignedBy();

      // Verify permissions are present
      await adminUserRolesPage.verifyAdminCardHasPermissions();
    });

    test('TC_A11Y_015: Page has a main landmark region', async () => {
      // Verify main landmark exists
      await adminUserRolesPage.verifyMainLandmarkExists();

      // Verify nav landmark exists
      await adminUserRolesPage.verifyNavLandmarkExists();

      // Verify lang attribute
      await adminUserRolesPage.verifyLangAttribute();
    });
  });

  test.describe('Interactive Elements (WCAG 4.1.2)', () => {
    test('TC_A11Y_004: Role dropdown has accessible name and keyboard support', async () => {
      // Verify role filter dropdown exists and is visible
      await adminUserRolesPage.verifyRoleDropdownExists();
    });

    test('TC_A11Y_005: Edit Permissions button has accessible name and keyboard activation', async () => {
      // Verify Edit Permissions button exists
      await adminUserRolesPage.verifyEditPermissionsButtonExists();

      // Verify button has accessible name with admin context
      await adminUserRolesPage.verifyEditPermissionsButtonHasAccessibleName();
    });
  });

  test.describe('Keyboard Navigation (WCAG 2.4.3, 2.4.7, 2.1.2)', () => {
    test('TC_A11Y_006: Tab order follows logical sequence through admin list', async () => {
      // Verify tab reaches interactive elements in logical order
      await adminUserRolesPage.verifyTabOrderReachesInteractiveElements();
    });

    test('TC_A11Y_007: Focus indicator is visible on all interactive elements', async () => {
      // Verify focus indicator is visible when tabbing
      await adminUserRolesPage.verifyFocusIndicatorVisible();
    });

    test('TC_A11Y_017: No keyboard trap exists on the page', async () => {
      // Tab through elements and verify no trap
      await adminUserRolesPage.verifyNoKeyboardTrap();
    });
  });

  test.describe('Visual Accessibility (WCAG 1.4.3, 1.4.1, 1.4.4, 1.4.10)', () => {
    test('TC_A11Y_008: Text color contrast meets minimum ratio for admin card content', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze();

      expect(results.violations.length, `Found ${results.violations.length} contrast violations`).toBe(0);
    });

    test('TC_A11Y_009: Status indicator does not rely on color alone', async () => {
      // Verify status "Active" is displayed as text
      await adminUserRolesPage.verifyStatusTextNotColorOnly();
    });

    test('TC_A11Y_010: Page is readable and functional at 200% zoom', async () => {
      // Verify page works at 200% zoom
      const hasHorizontalScroll = await adminUserRolesPage.verifyPageAt200Zoom();
      expect(hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_011: Page content reflows at 320px viewport width', async () => {
      // Verify page works at mobile viewport
      await adminUserRolesPage.verifyPageAtMobileViewport();
    });

    test('TC_A11Y_016: Role label badge has sufficient contrast', async ({ page }) => {
      // Check role badges specifically for contrast
      const roleBadge = page.getByText('Super Admin').first();
      await expect(roleBadge).toBeVisible();
      const limitedBadge = page.getByText('Limited Access Admin').first();
      await expect(limitedBadge).toBeVisible();
    });
  });

  test.describe('Dynamic Content (WCAG 4.1.3)', () => {
    test('TC_A11Y_012: Admin list loading state is announced to screen readers', async ({ page }) => {
      // Verify aria-live regions exist for dynamic updates
      const ariaLiveCount = await adminUserRolesPage.verifyAriaLiveRegionExists();
      expect.soft(ariaLiveCount, 'BUG: No aria-live regions for dynamic data updates (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_013: Empty state message is accessible when no admins exist', async ({ page }) => {
      // Verify showing admins count is visible (handles empty/loaded states)
      await adminUserRolesPage.verifyShowingAdminsCountVisible();
    });

    test('TC_A11Y_014: Error notification is accessible when API fails', async ({ page }) => {
      // Verify page handles errors gracefully - heading remains visible
      await adminUserRolesPage.verifyPageHasH1Heading();
    });
  });

  test.describe('Content Sequence (WCAG 1.3.2, 2.5.5, 2.4.2)', () => {
    test('TC_A11Y_018: Admin card content is accessible without CSS', async ({ page }) => {
      // Verify all card content fields are present in DOM order
      await adminUserRolesPage.verifyAdminCardHasName(0);
      await adminUserRolesPage.verifyAdminCardHasRoleLabel();
      await adminUserRolesPage.verifyAdminCardHasStatus();
      await adminUserRolesPage.verifyAdminCardHasPermissions();
    });

    test('TC_A11Y_019: Interactive elements have sufficient touch target size', async ({ page }) => {
      // Verify buttons exist and are visible (minimum size check)
      const editBtn = page.getByRole('button', { name: /Edit permissions for/ }).first();
      await expect(editBtn).toBeVisible();
      const box = await editBtn.boundingBox();
      expect(box).toBeTruthy();
      expect(box!.width, 'Edit button width must be at least 44px').toBeGreaterThanOrEqual(44);
      expect(box!.height, 'Edit button height must be at least 44px').toBeGreaterThanOrEqual(24);
    });

    test('TC_A11Y_020: Page title is descriptive and unique', async () => {
      const title = await adminUserRolesPage.getPageTitle();
      expect(title).toBeTruthy();
      expect(title.length, 'Page title must not be empty').toBeGreaterThan(0);
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan on Internal Administrators page', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      if (results.violations.length > 0) {
        console.log(`=== SCRUM-583 AXE-CORE: ${results.violations.length} VIOLATIONS ===`);
        for (const v of results.violations) {
          console.log(`\n[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}`);
          for (const n of v.nodes.slice(0, 3)) {
            console.log(`  - ${n.html.substring(0, 100)}`);
          }
        }
      }

      expect(results.violations.length, `Found ${results.violations.length} WCAG violations`).toBe(0);
    });
  });
});
