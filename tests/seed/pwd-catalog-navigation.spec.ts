import { test } from '@playwright/test';

test.describe('Seed: PwD Catalog Navigation', () => {
  test('Setup: Navigate to PwD Portal Home', async ({ page }) => {
    await page.goto('https://hub-ui-admin-qa.swarajability.org/');
  });
});
