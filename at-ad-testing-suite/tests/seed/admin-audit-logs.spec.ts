import { test } from '@playwright/test';

test.describe('Seed: Admin Audit Logs', () => {
  test('Setup: Login as admin and navigate to audit logs', async ({ page }) => {
    await page.goto('https://hub-ui-admin-dev.swarajability.org');
    await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await page.waitForURL(/auth-d\.swarajability\.org/);
    
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@swarajability.org');
    await page.getByRole('button', { name: 'Log in' }).click();
    
    await page.getByRole('textbox', { name: 'Please enter your password' }).fill('admin-password');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.waitForURL(/admin/);
  });
});
