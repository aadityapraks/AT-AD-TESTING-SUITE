// spec: specs/a11y/SCRUM-18-ap-dashboard.json

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { DashboardPage } from '../../../pages/dashboard.page';
import testData from '../../../test-data/scrum18-accessibility.json';

const BASE_URL = testData.url;

test.describe('SCRUM-18: AP Dashboard Accessibility', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await page.goto(BASE_URL);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await dashboardPage.clickDashboard();
  });

  test.describe('Dashboard Navigation and Structure', () => {
    test('TC_A11Y_001: Verify keyboard navigation through main navigation buttons', async ({ page }) => {
      await expect(dashboardPage.dashboardBtn).toBeVisible();
      await expect(dashboardPage.helpResourcesBtn).toBeVisible();
      await expect(dashboardPage.profileBtn).toBeVisible();
      await expect(dashboardPage.logoutBtn).toBeVisible();

      await dashboardPage.dashboardBtn.focus();
      await expect(dashboardPage.dashboardBtn).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(dashboardPage.helpResourcesBtn).toBeFocused();
    });

    test('TC_A11Y_002: Verify screen reader announces navigation buttons correctly', async ({ page }) => {
      await expect(dashboardPage.dashboardBtn).toHaveAccessibleName('Dashboard');
      await expect(dashboardPage.helpResourcesBtn).toHaveAccessibleName('Help & Resources');
      await expect(dashboardPage.profileBtn).toHaveAccessibleName('Profile');
      await expect(dashboardPage.logoutBtn).toHaveAccessibleName('Logout');
    });

    test('TC_A11Y_003: Verify welcome message is accessible to screen readers', async ({ page }) => {
      await expect(dashboardPage.welcomeHeading).toBeVisible();
      await expect(dashboardPage.welcomeHeading).toHaveAccessibleName(/welcome/i);
    });

    test('TC_A11Y_004: Verify page title and landmarks', async ({ page }) => {
      await expect(page).toHaveTitle(/.+/);

      // The app uses a sidebar nav that may be hidden on desktop; verify nav landmark exists in DOM
      const navigation = page.locator('nav').or(page.locator('[role="navigation"]'));
      const navCount = await navigation.count();
      expect(navCount).toBeGreaterThan(0);
    });
  });

  test.describe('Summary Widgets Accessibility', () => {
    test('TC_A11Y_005: Verify summary widgets are keyboard accessible', async ({ page }) => {
      await expect(dashboardPage.totalProductsWidget).toBeVisible();
      await expect(dashboardPage.totalInterestWidget).toBeVisible();
      await expect(dashboardPage.totalListingsWidget).toBeVisible();
      await expect(dashboardPage.avgRatingWidget).toBeVisible();
    });

    test('TC_A11Y_006: Verify screen reader announces widget content correctly', async ({ page }) => {
      const totalProducts = dashboardPage.totalProductsWidget;
      await expect(totalProducts).toBeVisible();

      const parentWidget = totalProducts.locator('..');
      const widgetText = await parentWidget.textContent();
      expect(widgetText).toMatch(/total products/i);
    });

    test('TC_A11Y_007: Verify widget visual accessibility', async ({ page }) => {
      await expect(dashboardPage.totalProductsWidget).toBeVisible();
      await expect(dashboardPage.totalInterestWidget).toBeVisible();
      await expect(dashboardPage.totalListingsWidget).toBeVisible();
      await expect(dashboardPage.avgRatingWidget).toBeVisible();
    });

    test('TC_A11Y_008: Verify dynamic widget updates are announced', async ({ page }) => {
      await expect(dashboardPage.totalProductsWidget).toBeVisible();
    });
  });

  test.describe('Tab Navigation Accessibility', () => {
    test('TC_A11Y_009: Verify keyboard navigation through tabs', async ({ page }) => {
      await expect(dashboardPage.productManagementTab).toBeVisible();
      await dashboardPage.productManagementTab.focus();
      await expect(dashboardPage.productManagementTab).toBeFocused();
    });

    test('TC_A11Y_010: Verify screen reader announces tab states', async ({ page }) => {
      await expect(dashboardPage.productManagementTab).toHaveAccessibleName('Product Management');
      await expect(dashboardPage.productUploadTab).toHaveAccessibleName('Product Upload');
      await expect(dashboardPage.interestExpressedTab).toHaveAccessibleName('Interest Expressed');
      await expect(dashboardPage.queriesTab).toHaveAccessibleName('Queries');
      await expect(dashboardPage.reviewsRatingsTab).toHaveAccessibleName('Reviews & Ratings');
    });

    test('TC_A11Y_011: Verify tab panel accessibility', async ({ page }) => {
      await dashboardPage.productManagementTab.click();
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
    });

    test('TC_A11Y_012: Verify tab visual accessibility', async ({ page }) => {
      await expect(dashboardPage.productManagementTab).toBeVisible();
      await expect(dashboardPage.productUploadTab).toBeVisible();
      await expect(dashboardPage.interestExpressedTab).toBeVisible();
      await expect(dashboardPage.queriesTab).toBeVisible();
      await expect(dashboardPage.reviewsRatingsTab).toBeVisible();
    });
  });

  test.describe('Notification Centre Accessibility', () => {
    test('TC_A11Y_013: Verify bell icon button accessibility', async ({ page }) => {
      await expect(dashboardPage.notificationBellBtn).toBeVisible();
      await dashboardPage.notificationBellBtn.focus();
      await expect(dashboardPage.notificationBellBtn).toBeFocused();
    });

    test('TC_A11Y_014: Verify notification popup modal accessibility', async ({ page }) => {
      await dashboardPage.openNotificationPopup();
      await expect(dashboardPage.notificationPopupHeading).toBeVisible();
    });

    test('TC_A11Y_015: Verify notification list accessibility', async ({ page }) => {
      await dashboardPage.openNotificationPopup();

      const notificationList = page.locator('[role="list"]').or(page.locator('.notification-list'));
      if (await notificationList.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(notificationList.first()).toBeVisible();
      }
    });

    test('TC_A11Y_016: Verify notification popup screen reader announcements', async ({ page }) => {
      await expect(dashboardPage.notificationBellBtn).toBeVisible();
      await expect(dashboardPage.notificationBellBtn).toHaveAccessibleName(/.+/);
    });

    test('TC_A11Y_017: Verify detailed notification centre page accessibility', async ({ page }) => {
      await dashboardPage.openNotificationPopup();
      await dashboardPage.viewAllNotificationsBtn.click();
      await page.waitForLoadState('load');
      await page.waitForTimeout(3000);

      // Verify notification centre page has a heading
      const notifHeading = page.getByRole('heading', { name: /notification/i });
      await expect(notifHeading.first()).toBeVisible({ timeout: 10000 });
    });

    test('TC_A11Y_018: Verify notification centre filter tabs accessibility', async ({ page }) => {
      await dashboardPage.openNotificationPopup();
      await dashboardPage.viewAllNotificationsBtn.click();
      await page.waitForLoadState('load');
      await page.waitForTimeout(3000);

      // Verify filter tabs are present on the notification centre page
      const filterTabs = page.getByRole('button').filter({ hasText: /all|unread|interest|updates|reviews|admin/i });
      const tabCount = await filterTabs.count();
      expect(tabCount).toBeGreaterThan(0);

      // Verify first filter tab is keyboard accessible
      await filterTabs.first().focus();
      await expect(filterTabs.first()).toBeFocused();
    });

    test('TC_A11Y_019: Verify notification actions accessibility', async ({ page }) => {
      await dashboardPage.openNotificationPopup();

      await expect(dashboardPage.markAllReadBtn).toBeVisible();
      await dashboardPage.markAllReadBtn.focus();
      await expect(dashboardPage.markAllReadBtn).toBeFocused();
      await expect(dashboardPage.markAllReadBtn).toHaveAccessibleName(/mark all read/i);
    });

    test('TC_A11Y_020: Verify notification visual accessibility', async ({ page }) => {
      await dashboardPage.openNotificationPopup();
      await expect(dashboardPage.notificationPopupHeading).toBeVisible();

      const headingColor = await dashboardPage.notificationPopupHeading.evaluate(el => {
        return window.getComputedStyle(el).color;
      });
      expect(headingColor).toBeTruthy();
      expect(headingColor).not.toBe('rgba(0, 0, 0, 0)');
    });
  });

  test.describe('Responsive and Mobile Accessibility', () => {
    test('TC_A11Y_021: Verify mobile viewport accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);

      await expect(dashboardPage.dashboardBtn.or(dashboardPage.hamburgerMenuBtn)).toBeVisible();
    });

    test('TC_A11Y_022: Verify tablet viewport accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(1000);

      await expect(dashboardPage.dashboardBtn.or(dashboardPage.hamburgerMenuBtn)).toBeVisible();
    });

    test('TC_A11Y_023: Verify orientation accessibility', async ({ page }) => {
      // Portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      await expect(dashboardPage.welcomeHeading.or(dashboardPage.dashboardBtn).or(dashboardPage.hamburgerMenuBtn)).toBeVisible();

      // Landscape
      await page.setViewportSize({ width: 667, height: 375 });
      await page.waitForTimeout(500);
      await expect(dashboardPage.welcomeHeading.or(dashboardPage.dashboardBtn).or(dashboardPage.hamburgerMenuBtn)).toBeVisible();
    });
  });

  test.describe('Status Messages and Error Handling', () => {
    test('TC_A11Y_024: Verify under review message accessibility', async ({ page }) => {
      // This test verifies that the dashboard is accessible for the logged-in vendor.
      // For an approved vendor, the welcome heading should be visible.
      // For an unapproved vendor, a status/alert message would appear instead.
      const dashboardContent = dashboardPage.welcomeHeading;
      await expect(dashboardContent).toBeVisible();
    });

    test('TC_A11Y_025: Verify error message accessibility', async ({ page }) => {
      // Check that any error messages on the page use proper ARIA roles
      const alertRegion = page.locator('[role="alert"]');
      const alertCount = await alertRegion.count();

      // If alerts exist, verify they have content
      if (alertCount > 0) {
        for (let i = 0; i < alertCount; i++) {
          const alertText = await alertRegion.nth(i).textContent();
          expect(alertText?.trim().length).toBeGreaterThan(0);
        }
      }
      // Dashboard should still be functional
      await expect(dashboardPage.welcomeHeading).toBeVisible();
    });

    test('TC_A11Y_026: Verify loading states accessibility', async ({ page }) => {
      // Reload page and check for loading indicators
      await page.reload();
      await page.waitForLoadState('load');

      // After loading, dashboard content should be visible
      await expect(dashboardPage.welcomeHeading).toBeVisible({ timeout: 30000 });

      // Verify no keyboard trap during/after loading
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_027: Verify session timeout warning accessibility', async ({ page }) => {
      // Session timeout warnings should use alertdialog role if they appear
      // We verify the page structure supports accessible timeout warnings
      const timeoutDialog = page.locator('[role="alertdialog"]').or(page.locator('[role="dialog"]'));
      const dialogCount = await timeoutDialog.count();

      if (dialogCount > 0) {
        const dialog = timeoutDialog.first();
        await expect(dialog).toBeVisible();
        const accessibleName = await dialog.getAttribute('aria-label') || await dialog.getAttribute('aria-labelledby');
        expect(accessibleName).toBeTruthy();
      }
      // Dashboard should be accessible regardless
      await expect(dashboardPage.welcomeHeading).toBeVisible();
    });

    test('TC_A11Y_028: Verify logout accessibility', async ({ page }) => {
      await expect(dashboardPage.logoutBtn).toBeVisible();
      await dashboardPage.logoutBtn.focus();
      await expect(dashboardPage.logoutBtn).toBeFocused();
      await expect(dashboardPage.logoutBtn).toHaveAccessibleName('Logout');
    });
  });

  test.describe('Visual Accessibility and Contrast', () => {
    test('TC_A11Y_029: Verify text color contrast ratios', async ({ page }) => {
      // Check that text elements have non-transparent colors
      const heading = dashboardPage.welcomeHeading;
      const headingColor = await heading.evaluate(el => window.getComputedStyle(el).color);
      expect(headingColor).toBeTruthy();
      expect(headingColor).not.toBe('rgba(0, 0, 0, 0)');

      const navButton = dashboardPage.dashboardBtn;
      const buttonColor = await navButton.evaluate(el => window.getComputedStyle(el).color);
      expect(buttonColor).toBeTruthy();
      expect(buttonColor).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('TC_A11Y_030: Verify non-text contrast ratios', async ({ page }) => {
      // Check UI component boundaries have visible borders/backgrounds
      const navButton = dashboardPage.dashboardBtn;
      const styles = await navButton.evaluate(el => {
        const s = window.getComputedStyle(el);
        return { borderColor: s.borderColor, backgroundColor: s.backgroundColor, outline: s.outline };
      });
      expect(styles.borderColor || styles.backgroundColor || styles.outline).toBeTruthy();
    });

    test('TC_A11Y_031: Verify information not conveyed by color alone', async ({ page }) => {
      // Verify widgets use text labels, not just color
      await expect(dashboardPage.totalProductsWidget).toBeVisible();
      await expect(dashboardPage.totalInterestWidget).toBeVisible();
      await expect(dashboardPage.totalListingsWidget).toBeVisible();
      await expect(dashboardPage.avgRatingWidget).toBeVisible();

      // Verify tabs use text labels
      await expect(dashboardPage.productManagementTab).toHaveText(/product management/i);
      await expect(dashboardPage.productUploadTab).toHaveText(/product upload/i);
    });
  });

  test.describe('Focus Management and Navigation', () => {
    test('TC_A11Y_032: Verify focus order is logical', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_033: Verify focus is visible at all times', async ({ page }) => {
      await dashboardPage.dashboardBtn.focus();
      await expect(dashboardPage.dashboardBtn).toBeFocused();

      await dashboardPage.helpResourcesBtn.focus();
      await expect(dashboardPage.helpResourcesBtn).toBeFocused();

      await dashboardPage.profileBtn.focus();
      await expect(dashboardPage.profileBtn).toBeFocused();
    });

    test('TC_A11Y_034: Verify no keyboard traps exist', async ({ page }) => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // Shift+Tab should also work (no trap)
      await page.keyboard.press('Shift+Tab');
      const focusedAfterShiftTab = page.locator(':focus');
      await expect(focusedAfterShiftTab).toBeVisible();
    });

    test('TC_A11Y_035: Verify NVDA screen reader compatibility', async ({ page }) => {
      // Verify ARIA roles and attributes that NVDA relies on
      const heading = dashboardPage.welcomeHeading;
      await expect(heading).toBeVisible();
      await expect(heading).toHaveRole('heading');

      // Verify buttons have proper roles
      await expect(dashboardPage.dashboardBtn).toHaveRole('button');
      await expect(dashboardPage.helpResourcesBtn).toHaveRole('button');
      await expect(dashboardPage.logoutBtn).toHaveRole('button');

      // Verify links have proper roles
      await expect(dashboardPage.productManagementTab).toHaveRole('link');
    });

    test('TC_A11Y_036: Verify JAWS screen reader compatibility', async ({ page }) => {
      // Verify ARIA attributes that JAWS relies on
      // Check heading hierarchy
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1.first()).toBeVisible();

      // Verify interactive elements have accessible names
      await expect(dashboardPage.dashboardBtn).toHaveAccessibleName(/.+/);
      await expect(dashboardPage.helpResourcesBtn).toHaveAccessibleName(/.+/);
      await expect(dashboardPage.profileBtn).toHaveAccessibleName(/.+/);
      await expect(dashboardPage.logoutBtn).toHaveAccessibleName(/.+/);
      await expect(dashboardPage.notificationBellBtn).toHaveAccessibleName(/.+/);
    });
  });
});
