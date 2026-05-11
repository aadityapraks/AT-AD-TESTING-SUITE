import { test, expect } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('https://hub-ui-admin-qa.swarajability.org/');
});
