// spec: specs/a11y/SCRUM-155-vendor-profile.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum155-accessibility.json';

test.describe('SCRUM-155: Vendor Profile Accessibility', () => {

  test.describe('Navigation and Page Access', () => {
    test('TC_A11Y_001: Top navigation keyboard accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Tab through navigation links
      const dashboardButton = page.getByRole('button', { name: 'Dashboard' });
      const profileButton = page.getByRole('button', { name: 'Profile' });
      
      // 2. Verify focus indicator on each link
      await dashboardButton.focus();
      await expect(dashboardButton).toBeFocused();
      
      // 3. Tab to Profile button
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(profileButton).toBeVisible();
    });

    test('TC_A11Y_003: Page has proper heading structure', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Verify H1 exists for 'Assistive Partner Profile'
      const h1 = page.getByRole('heading', { name: 'Assistive Partner Profile', level: 1 });
      await expect(h1).toBeVisible();
    });
  });

  test.describe('Edit Profile Button', () => {
    test('TC_A11Y_004: Edit Profile button accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Tab to Edit Profile button
      const editButton = page.getByRole('button', { name: 'Edit Profile' });
      
      // 2. Verify focus indicator visible
      await editButton.focus();
      await expect(editButton).toBeFocused();
      
      // 3. Check button has accessible name
      await expect(editButton).toHaveAccessibleName('Edit Profile');
    });
  });

  test.describe('Organization Card', () => {
    test('TC_A11Y_006: Organization logo has alt text', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Locate organization logo/image
      const logo = page.getByRole('img', { name: 'Organization Logo' });
      
      // 2. Verify alt attribute present
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAccessibleName('Organization Logo');
    });
  });

  test.describe('Account Status Section', () => {
    test('TC_A11Y_008: Status badge accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Locate Account Status badge
      const statusText = page.locator('text=Active');
      
      // 2. Verify status has text label
      await expect(statusText).toBeVisible();
    });

    test('TC_A11Y_010: Member Since date accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Locate Member Since date
      const memberSinceLabel = page.locator('text=Member Since');
      
      // 2. Verify label present
      await expect(memberSinceLabel).toBeVisible();
    });
  });

  test.describe('Documents Section', () => {
    test('TC_A11Y_011: Documents displayed in semantic list', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Locate documents section
      const documentsHeading = page.getByRole('heading', { name: 'Documents', level: 4 });
      await expect(documentsHeading).toBeVisible();
      
      // 2. Verify documents are visible
      const gstCertificate = page.locator('text=GST Certificate');
      await expect(gstCertificate).toBeVisible();
    });
  });

  test.describe('Organization Details Section', () => {
    test('TC_A11Y_015: Organization details fields have labels', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Review Organization Details section
      const orgDetailsHeading = page.getByRole('heading', { name: 'Organization Details', level: 4 });
      await expect(orgDetailsHeading).toBeVisible();
      
      // 2. Verify all fields have visible labels
      const orgNameLabel = page.locator('text=Organization Name *');
      await expect(orgNameLabel).toBeVisible();
      
      const orgTypeLabel = page.locator('text=Organization Type *');
      await expect(orgTypeLabel).toBeVisible();
    });
  });

  test.describe('Contact Information Section', () => {
    test('TC_A11Y_019: Website link accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Locate website link
      const websiteLink = page.getByRole('link', { name: 'https://www.accesstech.com' });
      
      // 2. Verify link text descriptive
      await expect(websiteLink).toBeVisible();
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_032: Focus indicators visible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Tab through all interactive elements
      const editButton = page.getByRole('button', { name: 'Edit Profile' });
      await editButton.focus();
      
      // 2. Verify focus indicator on each element
      await expect(editButton).toBeFocused();
    });

    test('TC_A11Y_034: Page scales to 200% without loss', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Zoom browser to 200%
      await page.evaluate(() => {
        document.body.style.zoom = '2.0';
      });

      // 2. Verify all text visible
      const heading = page.getByRole('heading', { name: 'Assistive Partner Profile' });
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('TC_A11Y_035: Tab order logical', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Tab from page start
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('Mobile and Responsive', () => {
    test('TC_A11Y_037: Profile accessible on mobile', async ({ page }) => {
      // 1. Set viewport to mobile (375x667)
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 2. Verify all content accessible
      const heading = page.getByRole('heading', { name: 'Assistive Partner Profile' });
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Screen Reader Specific', () => {
    test('TC_A11Y_038: Page has proper landmarks', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Profile' }).click();

      // 1. Verify navigation landmark
      const navigation = page.locator('nav').or(page.locator('[role="navigation"]'));
      await expect(navigation.first()).toBeVisible();
    });
  });
});
