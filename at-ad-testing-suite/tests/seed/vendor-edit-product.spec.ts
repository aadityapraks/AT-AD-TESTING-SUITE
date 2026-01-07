import { test } from '@playwright/test';
import testData from '../../test-data/scrum22-genai-edit-product.json';

test.describe('Seed: Vendor Edit Product', () => {
  test('Setup: Open Product Edit Form', async ({ page }) => {
    // Login as approved AP
    await page.goto(testData.baseUrl);
    await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await page.waitForURL(/auth-d\.swarajability\.org/);
    
    await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
    await page.getByRole('button', { name: 'Log in' }).click();
    
    await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
    await page.getByRole('button', { name: 'Continue' }).click();
    
    // Navigate to Product Management
    await page.waitForURL(/partner\/product-management/);
    
    // Open Edit Product Form
    const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
    const actionsMenu = productRow.getByLabel('Product actions menu');
    await actionsMenu.click();
    
    const editOption = page.getByText('Edit', { exact: true }).first();
    await editOption.click();
  });
});
