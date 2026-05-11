import { test } from '@playwright/test';

test('Setup: Navigate to admin sign-in page', async ({ page }) => {
  await page.goto('https://hub-ui-admin-qa.swarajability.org/');
});
