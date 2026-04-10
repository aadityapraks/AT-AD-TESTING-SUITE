import { test } from '@playwright/test';

test.describe('Seed: Admin Login', () => {
  test('Setup: Login as admin', async ({ page }) => {
    await page.goto('https://hub-ui-admin-qa.swarajability.org');
    await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await page.waitForURL(/auth-d\.swarajability\.org/);
    
    await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
    await page.getByRole('button', { name: 'Log in' }).click();
    
    await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.waitForURL(/admin/);
  });
});
