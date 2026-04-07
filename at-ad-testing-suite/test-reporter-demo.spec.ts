import { test, expect } from '@playwright/test';

test('Test Reporter - This will fail intentionally', async ({ page }) => {
  await page.goto('https://example.com');
  
  // This will fail intentionally to generate test results
  await expect(page.getByText('This text does not exist')).toBeVisible();
});