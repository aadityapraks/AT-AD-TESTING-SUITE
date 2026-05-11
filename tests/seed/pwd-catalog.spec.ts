import { test } from '@playwright/test';

test.describe('Seed: PwD Catalog', () => {
  test('Setup: Navigate to PwD home page', async ({ page }) => {
    await page.goto('https://hub-ui-admin-qa.swarajability.org/');
  });
});
