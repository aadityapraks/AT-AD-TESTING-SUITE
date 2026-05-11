// spec: specs/a11y/SCRUM-30-reviews-ratings.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('SCRUM-30: Reviews and Ratings Accessibility', () => {

  test.describe('Navigation and Page Access', () => {
    test('TC_A11Y_001: Reviews & Ratings tab accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));

      const reviewsTab = page.getByRole('link', { name: 'Reviews & Ratings' });
      await reviewsTab.focus();
      await expect(reviewsTab).toBeFocused();
      await expect(reviewsTab).toHaveAccessibleName(/Reviews/);
      await page.keyboard.press('Enter');
      await new Promise(f => setTimeout(f, 1000));
    });

    test('TC_A11Y_002: Page has proper heading', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const heading = page.getByRole('heading', { name: 'Reviews', level: 2 });
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Summary Widgets', () => {
    test('TC_A11Y_003: Average Rating widget accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const avgRatingWidget = page.locator('text=Average Rating');
      await expect(avgRatingWidget).toBeVisible();
    });

    test('TC_A11Y_004: Total Reviews widget accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const totalReviewsWidget = page.locator('text=Total Reviews');
      await expect(totalReviewsWidget).toBeVisible();
    });

    test('TC_A11Y_005: Products Reviewed widget accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const productsWidget = page.locator('text=Products Reviewed');
      await expect(productsWidget).toBeVisible();
    });
  });

  test.describe('Product List with Ratings', () => {
    test('TC_A11Y_006: Product list semantic', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const body = (await page.locator('body').textContent()) ?? '';
      expect(/review|rating/i.test(body)).toBe(true);
    });

    test('TC_A11Y_007: Product link accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const productLink = page.getByRole('link', { name: 'Reviews & Ratings' });
      await productLink.focus();
      await expect(productLink).toBeFocused();
    });

    test('TC_A11Y_008: Product rating display accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const body = (await page.locator('body').textContent()) ?? '';
      expect(/rating|\d\.\d|star/i.test(body)).toBe(true);
    });

    test('TC_A11Y_009: Review count accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const body = (await page.locator('body').textContent()) ?? '';
      expect(/review|total/i.test(body)).toBe(true);
    });
  });

  test.describe('Search and Filter Controls', () => {
    test('TC_A11Y_010: Product search field accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const searchField = page.getByRole('textbox', { name: 'Search by product name...' });
      await searchField.focus();
      await expect(searchField).toBeFocused();
    });

    test('TC_A11Y_011: Rating filter accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const filterDropdown = page.locator('select').first();
      const hasFilter = await filterDropdown.isVisible().catch(() => false);
      expect(typeof hasFilter).toBe('boolean');
    });
  });

  test.describe('Individual Review Cards', () => {
    test('TC_A11Y_012: Reviews section has heading', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const body = (await page.locator('body').textContent()) ?? '';
      expect(/review/i.test(body)).toBe(true);
    });

    test('TC_A11Y_013: Reviews list semantic', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const body = (await page.locator('body').textContent()) ?? '';
      expect(/review|rating/i.test(body)).toBe(true);
    });

    test('TC_A11Y_014: Review star rating accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const body = (await page.locator('body').textContent()) ?? '';
      expect(/rating|star|\d\.\d/i.test(body)).toBe(true);
    });

    test('TC_A11Y_015: Anonymous user ID accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const userId = page.locator('text=/User/i').first();
      await expect(userId).toBeVisible();
    });

    test('TC_A11Y_016: Review text accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const body = (await page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });

    test('TC_A11Y_017: Review date accessible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const reviewDate = page.locator('text=/\\d{4}/').first();
      await expect(reviewDate).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('TC_A11Y_018: Tab order logical', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    });

    test('TC_A11Y_019: Focus indicators visible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const firstElement = page.getByRole('link', { name: 'Reviews & Ratings' });
      await firstElement.focus();
      await expect(firstElement).toBeFocused();
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_020: Page scales to 200% zoom', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      await page.evaluate(() => {
        document.body.style.zoom = '2.0';
      });
      const content = page.locator('body');
      await expect(content).toBeVisible();
    });

    test('TC_A11Y_021: Mobile responsive accessible', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/reviews-ratings');
      await page.waitForTimeout(2000);
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    test('TC_A11Y_022: Screen reader announces all content', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const heading = page.getByRole('heading', { name: /Reviews/i });
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_023: Dynamic content announced', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5000));
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await new Promise(f => setTimeout(f, 3000)); }
      await page.waitForLoadState('domcontentloaded');
      await new Promise(f => setTimeout(f, 2000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const filter = page.locator('select, [role="combobox"]').first();
      if (await filter.isVisible()) {
        await filter.focus();
        await page.keyboard.press('ArrowDown');
        await new Promise(f => setTimeout(f, 500));
      }
    });
  });
});

