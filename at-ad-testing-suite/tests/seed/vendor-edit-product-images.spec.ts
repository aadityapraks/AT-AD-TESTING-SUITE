import { test } from '@playwright/test';
import testData from '../../test-data/scrum22-genai-edit-product.json';

test.describe('Seed: Vendor Edit Product Images', () => {
  test('Setup: Open Product Edit Form with images', async ({ page }) => {
    await page.goto(testData.baseUrl);
    await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await page.waitForURL(/auth-d\.swarajability\.org/);
    
    await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
    await page.getByRole('button', { name: 'Log in' }).click();
    
    await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
    await page.getByRole('button', { name: 'Continue' }).click();
    
    await page.waitForURL(/partner\/product-management/);
    
    const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
    await productRow.getByLabel('Product actions menu').click();
    await page.getByText('Edit', { exact: true }).first().click();
  });
});
