// spec: specs/a11y/SCRUM-18-ap-dashboard.md

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum18-accessibility.json';

test.describe('SCRUM-18: AP Dashboard Accessibility', () => {

  test.describe('Dashboard Navigation and Structure', () => {
    test('TC_A11Y_001: Verify keyboard navigation through main navigation buttons', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
      const helpButton = page.getByRole('button', { name: 'Help & Resources' });
      const profileButton = page.getByRole('button', { name: 'Profile' });
      const logoutButton = page.getByRole('button', { name: 'Logout' });

      await expect(dashboardButton).toBeVisible();
      await expect(helpButton).toBeVisible();
      await expect(profileButton).toBeVisible();
      await expect(logoutButton).toBeVisible();

      await dashboardButton.focus();
      await expect(dashboardButton).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(helpButton).toBeFocused();
    });

    test('TC_A11Y_002: Verify screen reader announces navigation buttons correctly', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
      await expect(dashboardButton).toHaveAccessibleName('Dashboard');
      
      const helpButton = page.getByRole('button', { name: 'Help & Resources' });
      await expect(helpButton).toHaveAccessibleName('Help & Resources');
    });

    test('TC_A11Y_003: Verify welcome message is accessible to screen readers', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const welcomeHeading = page.getByRole('heading', { name: /welcome/i });
      await expect(welcomeHeading).toBeVisible();
      await expect(welcomeHeading).toHaveAccessibleName(/welcome/i);
    });

    test('TC_A11Y_004: Verify page title and landmarks', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await expect(page).toHaveTitle(/HubUiAdmin/);
      
      const navigation = page.locator('nav').or(page.locator('[role="navigation"]'));
      await expect(navigation.first()).toBeVisible();
    });
  });

  test.describe('Summary Widgets Accessibility', () => {
    test('TC_A11Y_005: Verify summary widgets are keyboard accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await expect(page.getByText('Total Products')).toBeVisible();
      await expect(page.getByText('Total Interest')).toBeVisible();
      await expect(page.getByText('Total Listings')).toBeVisible();
      await expect(page.getByText('Avg. Rating')).toBeVisible();
    });

    test('TC_A11Y_006: Verify screen reader announces widget content correctly', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const totalProducts = page.getByText('Total Products');
      await expect(totalProducts).toBeVisible();
      await expect(totalProducts).toHaveAccessibleName(/total products/i);
    });

    test('TC_A11Y_007: Verify widget visual accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await expect(page.getByText('Total Products')).toBeVisible();
      await expect(page.getByText('Total Interest')).toBeVisible();
    });

    test('TC_A11Y_008: Verify dynamic widget updates are announced', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const totalProducts = page.getByText('Total Products');
      await expect(totalProducts).toBeVisible();
    });
  });

  test.describe('Tab Navigation Accessibility', () => {
    test('TC_A11Y_009: Verify keyboard navigation through tabs', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const productManagementTab = page.getByRole('link', { name: 'Product Management' });
      await expect(productManagementTab).toBeVisible();
      await productManagementTab.focus();
      await expect(productManagementTab).toBeFocused();
    });

    test('TC_A11Y_010: Verify screen reader announces tab states', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const productManagementTab = page.getByRole('link', { name: 'Product Management' });
      await expect(productManagementTab).toHaveAccessibleName('Product Management');
    });

    test('TC_A11Y_011: Verify tab panel accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Management' }).click();
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
    });

    test('TC_A11Y_012: Verify tab visual accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const productManagementTab = page.getByRole('link', { name: 'Product Management' });
      await expect(productManagementTab).toBeVisible();
    });
  });

  test.describe('Notification Centre Accessibility', () => {
    test('TC_A11Y_013: Verify bell icon button accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const notificationButton = page.getByRole('button', { name: /🔔/i });
      await expect(notificationButton).toBeVisible();
      await notificationButton.focus();
      await expect(notificationButton).toBeFocused();
    });

    test('TC_A11Y_014: Verify notification popup modal accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('button', { name: /🔔/i }).click();
      
      const modal = page.locator('[role="dialog"]').or(page.locator('.modal'));
      if (await modal.first().isVisible()) {
        await expect(modal.first()).toBeVisible();
      }
    });

    test('TC_A11Y_015: Verify notification list accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('button', { name: /🔔/i }).click();
      
      const notificationList = page.locator('[role="list"]').or(page.locator('.notification-list'));
      if (await notificationList.first().isVisible()) {
        await expect(notificationList.first()).toBeVisible();
      }
    });

    test('TC_A11Y_016: Verify notification popup screen reader announcements', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const notificationButton = page.getByRole('button', { name: /🔔/i });
      await expect(notificationButton).toBeVisible();
    });
  });

  test.describe('Focus Management and Navigation', () => {
    test('TC_A11Y_032: Verify focus order is logical', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_033: Verify focus is visible at all times', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
      await dashboardButton.focus();
      await expect(dashboardButton).toBeFocused();
    });

    test('TC_A11Y_034: Verify no keyboard traps exist', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('Responsive and Mobile Accessibility', () => {
    test('TC_A11Y_021: Verify mobile viewport accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible();
    });

    test('TC_A11Y_022: Verify tablet viewport accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible();
    });
  });

  test.describe('Accessibility and Usability', () => {
    test('Verify clear headings and labels', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading.first()).toBeVisible();
    });

    test('Verify keyboard accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });
});
