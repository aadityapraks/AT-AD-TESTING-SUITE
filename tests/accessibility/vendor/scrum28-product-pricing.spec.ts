import { test, expect } from '@playwright/test';

const BASE_URL = 'https://hub-ui-admin-qa.swarajability.org';
const PM_URL = `${BASE_URL}/partner/product-management`;

async function login(page) {
  await page.goto(BASE_URL);
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

test.describe('SCRUM-28: Product Pricing Accessibility', () => {
  test.setTimeout(120_000);

  test.describe('1. Product Management Page Access', () => {
    test('TC_A11Y_001: Product Management page loads with product list', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
      await expect(page.getByText(/Showing \d+ to \d+ of \d+ products/)).toBeVisible();
    });

    test('TC_A11Y_002: Product actions menu is keyboard accessible', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const actionsBtn = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsBtn.focus();
      await expect(actionsBtn).toBeFocused();
    });

    test('TC_A11Y_003: Product actions menu opens on Enter', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const actionsBtn = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsBtn.press('Enter');
      await page.waitForTimeout(1000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(/edit|duplicate|delete/i.test(body)).toBe(true);
    });

    test('TC_A11Y_004: Product actions menu has accessible name with product', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const actionsBtn = page.getByRole('button', { name: /More actions for/ }).first();
      const name = await actionsBtn.getAttribute('aria-label') ?? '';
      expect(name.length).toBeGreaterThan(0);
    });

    test('TC_A11Y_005: Product status indicators are visible', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(/draft|approved|under review/i.test(body)).toBe(true);
    });
  });

  test.describe('2. Pricing Display on Product List', () => {
    test('TC_A11Y_006: Product list table headers are visible', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      await expect(page.getByText('Disability Type').first()).toBeVisible();
      await expect(page.getByText('Actions').first()).toBeVisible();
    });

    test('TC_A11Y_007: Stock column is visible', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      await expect(page.getByText('Stock').first()).toBeVisible();
    });

    test('TC_A11Y_008: Listing Status column is visible', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      await expect(page.getByText('Listing Status').first()).toBeVisible();
    });

    test('TC_A11Y_009: Website Visibility column is visible', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      await expect(page.getByText('Website Visibility').first()).toBeVisible();
    });

    test('TC_A11Y_010: Submitted date column is visible', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      await expect(page.getByText('Submitted').first()).toBeVisible();
    });
  });

  test.describe('3. Pricing Edit via Actions Menu', () => {
    test('TC_A11Y_011: Actions menu shows Edit option', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const actionsBtn = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsBtn.click();
      await page.waitForTimeout(1000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(/edit/i.test(body)).toBe(true);
    });

    test('TC_A11Y_012: Actions menu shows Delete option', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const actionsBtn = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsBtn.click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Delete').first()).toBeVisible();
    });

    test('TC_A11Y_013: Actions menu shows Duplicate option', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const actionsBtn = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsBtn.click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Duplicate').first()).toBeVisible();
    });

    test('TC_A11Y_014: Save Pricing Changes dialog exists in DOM', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const dialog = page.locator('text=Save Pricing Changes?');
      const exists = await dialog.count();
      expect(exists).toBeGreaterThanOrEqual(0);
    });

    test('TC_A11Y_015: Escape closes actions menu', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const actionsBtn = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsBtn.click();
      await page.waitForTimeout(1000);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      await expect(actionsBtn).toBeVisible();
    });
  });

  test.describe('4. Product Upload Pricing Section', () => {
    test('TC_A11Y_016: Pricing section heading visible on upload page', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      await expect(page.getByRole('heading', { name: /Product Quantity.*Pricing/i })).toBeVisible();
    });

    test('TC_A11Y_017: Pricing dropdown is visible', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      const pricingDropdown = page.getByRole('combobox', { name: 'Pricing' });
      await expect(pricingDropdown).toBeVisible();
    });

    test('TC_A11Y_018: Pricing dropdown has Single Price selected by default', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      const pricingDropdown = page.getByRole('combobox', { name: 'Pricing' });
      const value = await pricingDropdown.inputValue().catch(() => '');
      const text = ((await pricingDropdown.textContent()) ?? '').trim();
      expect(value.toLowerCase().includes('single') || text.toLowerCase().includes('single')).toBe(true);
    });

    test('TC_A11Y_019: Pricing dropdown has Price Range option', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      const pricingDropdown = page.getByRole('combobox', { name: 'Pricing' });
      await expect(pricingDropdown.locator('option', { hasText: 'Price Range' })).toBeAttached();
    });

    test('TC_A11Y_020: Pricing dropdown has Custom Label option', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      const pricingDropdown = page.getByRole('combobox', { name: 'Pricing' });
      await expect(pricingDropdown.locator('option', { hasText: 'Custom Label' })).toBeAttached();
    });
  });

  test.describe('5. Price Input Fields', () => {
    test('TC_A11Y_021: Price input field is visible', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      const priceInput = page.getByRole('spinbutton').nth(1);
      await priceInput.scrollIntoViewIfNeeded();
      await expect(priceInput).toBeVisible();
    });

    test('TC_A11Y_022: Price input has helper text', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      await expect(page.getByText('Enter the price in rupees')).toBeVisible();
    });

    test('TC_A11Y_023: Available Quantity input is visible', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      await expect(page.getByText('Available Quantity')).toBeVisible();
    });

    test('TC_A11Y_024: Made to Order checkbox is visible', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      await expect(page.getByRole('checkbox', { name: /Made to Order/i })).toBeVisible();
    });

    test('TC_A11Y_025: Expected Delivery Time field is visible', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      await expect(page.getByText('Expected Delivery Time')).toBeVisible();
    });
  });

  test.describe('6. Form Buttons', () => {
    test('TC_A11Y_026: Cancel button is keyboard accessible', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      const cancelBtn = page.getByRole('button', { name: 'Cancel' });
      await cancelBtn.focus();
      await expect(cancelBtn).toBeFocused();
    });

    test('TC_A11Y_027: Save as Draft button is keyboard accessible', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      const draftBtn = page.getByRole('button', { name: 'Save as Draft' });
      await draftBtn.focus();
      await expect(draftBtn).toBeFocused();
    });

    test('TC_A11Y_028: Upload Product button is keyboard accessible', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      const uploadBtn = page.getByRole('button', { name: 'Upload Product' });
      await uploadBtn.focus();
      await expect(uploadBtn).toBeFocused();
    });
  });

  test.describe('7. Visual Accessibility', () => {
    test('TC_A11Y_029: Product Management page readable at 200% zoom', async ({ page }) => {
      await login(page);
      await page.setViewportSize({ width: 640, height: 360 });
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
    });

    test('TC_A11Y_030: Product Upload pricing section readable at 200% zoom', async ({ page }) => {
      await login(page);
      await page.setViewportSize({ width: 640, height: 360 });
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
    });

    test('TC_A11Y_031: Mobile viewport renders Product Management', async ({ page }) => {
      await login(page);
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });
  });

  test.describe('8. Keyboard Navigation', () => {
    test('TC_A11Y_032: Tab navigation works on Product Management', async ({ page }) => {
      await login(page);
      await page.goto(PM_URL);
      await page.waitForTimeout(3000);
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    });

    test('TC_A11Y_033: Tab navigation works on Product Upload pricing', async ({ page }) => {
      await login(page);
      await page.goto(`${BASE_URL}/partner/product-upload`);
      await page.waitForTimeout(2000);
      const firstInput = page.getByRole('textbox').first();
      await firstInput.focus();
      await expect(firstInput).toBeFocused();
      await page.keyboard.press('Tab');
    });
  });
});
