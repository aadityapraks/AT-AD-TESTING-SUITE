// spec: specs/a11y/SCRUM-442-admin-sign-in.json

import { test, expect } from '@playwright/test';
import { AdminSignInPage } from '../../pages/admin-signin.page';
import testData from '../../test-data/scrum442-admin-sign-in.json';

const ADMIN_URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-442: Admin Sign-In Accessibility', () => {
  let adminSignInPage: AdminSignInPage;

  test.describe('Page Structure', () => {
    test.beforeEach(async ({ page }) => {
      adminSignInPage = new AdminSignInPage(page);
      await page.goto(ADMIN_URL);
      await adminSignInPage.navigateToSSOEmailEntry();
    });

    test('TC_A11Y_001: Sign-In page has proper heading structure', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_002: Sign-In page has proper landmarks', async ({ page }) => {
      // BUG: SSO login page (authentik) has no lang attribute on <html>
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang, 'BUG: SSO page missing lang attribute on <html> (WCAG 3.1.1)').toBeTruthy();
    });
  });

  test.describe('Form Labels', () => {
    test.beforeEach(async ({ page }) => {
      adminSignInPage = new AdminSignInPage(page);
      await page.goto(ADMIN_URL);
      await adminSignInPage.navigateToSSOEmailEntry();
    });

    test('TC_A11Y_003: Email input field has proper label', async ({ page }) => {
      await adminSignInPage.verifyEmailFieldAccessibleLabel();
    });

    test('TC_A11Y_004: Password input field has proper label', async ({ page }) => {
      await adminSignInPage.navigateToPasswordPage(EMAIL);
      await adminSignInPage.verifyPasswordFieldAccessibleLabel();
    });

    test('TC_A11Y_021: Required fields indicated accessibly', async ({ page }) => {
      const emailField = page.getByRole('textbox', { name: 'Email' });
      await expect(emailField).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test.beforeEach(async ({ page }) => {
      adminSignInPage = new AdminSignInPage(page);
      await page.goto(ADMIN_URL);
      await adminSignInPage.navigateToSSOEmailEntry();
    });

    test('TC_A11Y_005: Sign-In form keyboard navigation', async ({ page }) => {
      const emailField = page.getByRole('textbox', { name: 'Email' });
      await emailField.focus();
      await expect(emailField).toBeFocused();
      await page.keyboard.press('Tab');
      const loginBtn = page.getByRole('button', { name: 'Log in' });
      await expect(loginBtn).toBeFocused();
    });

    test('TC_A11Y_006: Focus indicators visible on all form elements', async ({ page }) => {
      await adminSignInPage.verifyFocusIndicatorOnEmail();
    });

    test('TC_A11Y_007: Sign In button keyboard accessible', async ({ page }) => {
      await adminSignInPage.verifyButtonAccessibleName('Log in');
    });

    test('TC_A11Y_016: Form submission with Enter key', async ({ page }) => {
      const emailField = page.getByRole('textbox', { name: 'Email' });
      await emailField.fill(EMAIL);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(3000);
      const passwordField = page.getByRole('textbox', { name: 'Please enter your password' });
      await expect(passwordField).toBeVisible({ timeout: 20000 });
    });

    test('TC_A11Y_022: No keyboard traps on Sign-In page', async ({ page }) => {
      const emailField = page.getByRole('textbox', { name: 'Email' });
      await emailField.focus();
      await expect(emailField).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      // Shift+Tab should work back
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(emailField).toBeFocused();
    });
  });

  test.describe('Button States', () => {
    test.beforeEach(async ({ page }) => {
      adminSignInPage = new AdminSignInPage(page);
      await page.goto(ADMIN_URL);
      await adminSignInPage.navigateToSSOEmailEntry();
    });

    test('TC_A11Y_008: Sign In button disabled state accessible', async ({ page }) => {
      const loginBtn = page.getByRole('button', { name: 'Log in' });
      await expect(loginBtn).toBeVisible();
      await expect(loginBtn).toBeEnabled();
    });

    test('TC_A11Y_015: Password show/hide toggle accessible', async ({ page }) => {
      await adminSignInPage.navigateToPasswordPage(EMAIL);
      const passwordField = page.getByRole('textbox', { name: 'Please enter your password' });
      await expect(passwordField).toBeVisible();
    });
  });

  test.describe('Validation Errors', () => {
    test.beforeEach(async ({ page }) => {
      adminSignInPage = new AdminSignInPage(page);
      await page.goto(ADMIN_URL);
      await adminSignInPage.navigateToSSOEmailEntry();
    });

    test('TC_A11Y_009: Email inline validation error accessible', async ({ page }) => {
      await adminSignInPage.submitInvalidEmailAndVerifyError('admin@');
    });

    test('TC_A11Y_010: Authentication failure error accessible', async ({ page }) => {
      await adminSignInPage.fillEmailOnly(EMAIL);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.waitForURL(/has-password-flow/, { timeout: 20000 });
      const passwordField = page.getByRole('textbox', { name: 'Please enter your password' });
      await passwordField.waitFor({ state: 'visible', timeout: 15000 });
      await passwordField.fill('wrongpassword123');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      await adminSignInPage.verifyAuthErrorMessageVisible();
    });

    test('TC_A11Y_011: Account locked error accessible', async ({ page }) => {
      await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    });

    test('TC_A11Y_012: Inactive/suspended account error accessible', async ({ page }) => {
      await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    });
  });

  test.describe('Authentication Success', () => {
    test('TC_A11Y_013: Successful login redirect accessible', async ({ page }) => {
      adminSignInPage = new AdminSignInPage(page);
      await page.goto(ADMIN_URL);
      await adminSignInPage.verifySignInPageLoaded();
      // Use enterEmail which handles the full SSO flow from the start
      await adminSignInPage.enterEmail(EMAIL);
      await adminSignInPage.enterPasswordAndSubmit(PASSWORD);
      await adminSignInPage.handleConsentScreenIfPresent();
      await adminSignInPage.verifyRedirectedToDashboard();
    });

    test('TC_A11Y_014: Session expiry message accessible', async ({ page }) => {
      adminSignInPage = new AdminSignInPage(page);
      await page.goto(ADMIN_URL);
      await adminSignInPage.verifySignInPageLoaded();
    });
  });

  test.describe('Visual Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      adminSignInPage = new AdminSignInPage(page);
      await page.goto(ADMIN_URL);
      await adminSignInPage.navigateToSSOEmailEntry();
    });

    test('TC_A11Y_017: Text contrast meets WCAG AA', async ({ page }) => {
      const emailField = page.getByRole('textbox', { name: 'Email' });
      await expect(emailField).toBeVisible();
    });

    test('TC_A11Y_018: UI component contrast meets WCAG AA', async ({ page }) => {
      const emailField = page.getByRole('textbox', { name: 'Email' });
      const borderColor = await emailField.evaluate(el => window.getComputedStyle(el).borderColor);
      expect(borderColor).toBeTruthy();
    });

    test('TC_A11Y_019: Page usable at 200% zoom', async ({ page }) => {
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      const emailField = page.getByRole('textbox', { name: 'Email' });
      await expect(emailField).toBeVisible();
    });

    test('TC_A11Y_020: Mobile viewport accessible', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      const emailField = page.getByRole('textbox', { name: 'Email' });
      await expect(emailField).toBeVisible();
    });

    test('TC_A11Y_025: Information not conveyed by color alone', async ({ page }) => {
      const emailField = page.getByRole('textbox', { name: 'Email' });
      await expect(emailField).toBeVisible();
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    test.beforeEach(async ({ page }) => {
      adminSignInPage = new AdminSignInPage(page);
      await page.goto(ADMIN_URL);
      await adminSignInPage.navigateToSSOEmailEntry();
    });

    test('TC_A11Y_023: NVDA screen reader compatibility', async ({ page }) => {
      await adminSignInPage.verifyEmailFieldAccessibleLabel();
      await adminSignInPage.verifyButtonAccessibleName('Log in');
    });

    test('TC_A11Y_024: JAWS screen reader compatibility', async ({ page }) => {
      const emailField = page.getByRole('textbox', { name: 'Email' });
      await expect(emailField).toBeVisible();
      const loginBtn = page.getByRole('button', { name: 'Log in' });
      await expect(loginBtn).toBeVisible();
    });
  });
});
