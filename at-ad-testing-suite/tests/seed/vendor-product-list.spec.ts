import { test } from '@playwright/test';
import testData from '../../test-data/scrum22-genai-edit-product.json';

test.describe('Seed: Vendor Product List', () => {
  test('Setup: Navigate to Product Management as approved AP', async ({ page }) => {
    // Login as approved AP
    await page.goto(testData.baseUrl);
    await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await page.waitForURL(/auth-d\.swarajability\.org/);
    
    await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
    await page.getByRole('button', { name: 'Log in' }).click();
    
    await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Wait for Product Management page to load
    await page.waitForURL(/partner\/product-management/);
  });
});
