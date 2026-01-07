import { test } from '@playwright/test';

test.describe('seed', () => {
  test('seed', async ({ page }) => {
    await page.goto('https://hub-ui-admin-dev.swarajability.org/');
  });
});
