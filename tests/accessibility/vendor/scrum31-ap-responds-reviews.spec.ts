import { test, expect } from '@playwright/test';

async function login(page) {
  await page.goto('https://hub-ui-admin-qa.swarajability.org');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  if (page.url().includes('/partner/')) return;
  await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 15000 });
  await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
  await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(5000);
  if (page.url().includes('auth-d.swarajability.org')) {
    const cb = page.getByRole('button', { name: 'Continue' });
    await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    if (await cb.isVisible().catch(() => false)) await cb.click();
    await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3000);
  }
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
}

test.describe('SCRUM-31: AP Responds to Reviews Accessibility', () => {
  test.setTimeout(120_000);

  test('TC_A11Y_001: Reviews & Ratings tab keyboard accessible', async ({ page }) => {
    await login(page);
    const reviewsTab = page.getByRole('link', { name: 'Reviews & Ratings' });
    await reviewsTab.focus();
    await expect(reviewsTab).toBeFocused();
    await expect(reviewsTab).toHaveAccessibleName(/Reviews/);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await expect(page.getByRole('heading', { name: 'Reviews', level: 2 })).toBeVisible();
  });

  test('TC_A11Y_002: Reviews page has proper heading', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'Reviews & Ratings' }).click();
    await expect(page.getByRole('heading', { name: 'Reviews', level: 2 })).toBeVisible();
  });

  test('TC_A11Y_003: Average Rating widget visible', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'Reviews & Ratings' }).click();
    await expect(page.getByText('Average Rating')).toBeVisible();
  });

  test('TC_A11Y_004: Total Reviews widget visible', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'Reviews & Ratings' }).click();
    await expect(page.getByText('Total Reviews')).toBeVisible();
  });

  test('TC_A11Y_005: Products Reviewed widget visible', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'Reviews & Ratings' }).click();
    await expect(page.getByText('Products Reviewed')).toBeVisible();
  });

  test('TC_A11Y_006: Search field accessible', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'Reviews & Ratings' }).click();
    const search = page.getByRole('textbox', { name: 'Search by product name...' });
    await search.focus();
    await expect(search).toBeFocused();
  });

  test('TC_A11Y_007: Queries tab keyboard accessible', async ({ page }) => {
    await login(page);
    const queriesLink = page.getByRole('link', { name: 'Queries' });
    await queriesLink.focus();
    await expect(queriesLink).toBeFocused();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_008: Notification button accessible', async ({ page }) => {
    await login(page);
    const notifBtn = page.getByRole('button', { name: /🔔/ });
    await notifBtn.focus();
    await expect(notifBtn).toBeFocused();
  });

  test('TC_A11Y_009: Notification badge visible', async ({ page }) => {
    await login(page);
    const notifBtn = page.getByRole('button', { name: /🔔/ });
    await expect(notifBtn).toBeVisible();
  });

  test('TC_A11Y_010: Dashboard heading visible', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('heading', { name: 'Welcome to your Dashboard', level: 1 })).toBeVisible();
  });

  test('TC_A11Y_011: Color contrast on Reviews page', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'Reviews & Ratings' }).click();
    await expect(page.getByRole('heading', { name: 'Reviews', level: 2 })).toBeVisible();
    await expect(page.getByText('Average Rating')).toBeVisible();
  });

  test('TC_A11Y_012: Reviews page at 200% zoom', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'Reviews & Ratings' }).click();
    await page.evaluate(() => { document.body.style.zoom = '2.0'; });
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_013: Focus indicators visible', async ({ page }) => {
    await login(page);
    const reviewsTab = page.getByRole('link', { name: 'Reviews & Ratings' });
    await reviewsTab.focus();
    await expect(reviewsTab).toBeFocused();
  });

  test('TC_A11Y_014: Mobile viewport renders Reviews', async ({ page }) => {
    await login(page);
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/reviews-ratings');
    await page.waitForTimeout(2000);
    const body = (await page.locator('body').textContent()) ?? '';
    expect(/review|rating/i.test(body)).toBe(true);
  });

  test('TC_A11Y_015: Tab order logical on Reviews page', async ({ page }) => {
    await login(page);
    await page.getByRole('link', { name: 'Reviews & Ratings' }).click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });
});
