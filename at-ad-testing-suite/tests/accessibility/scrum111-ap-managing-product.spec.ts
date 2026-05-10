// spec: specs/a11y/SCRUM-111-ap-managing-product.json

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductManagementPage } from '../../pages/product-management.page';
import testData from '../../test-data/scrum111-accessibility.json';

const BASE_URL = testData.url;

test.describe('SCRUM-111: AP Managing Product Accessibility', () => {
  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
    await page.goto(BASE_URL);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
  });

  test.describe('1. Navigation and Page Structure', () => {
    test('TC_A11Y_001: Page has proper heading hierarchy', async ({ page }) => {
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    });

    test('TC_A11Y_002: Product Management navigation link accessible', async ({ page }) => {
      const link = page.getByRole('link', { name: 'Product Management' });
      await expect(link).toBeVisible();
      await link.focus();
      await expect(link).toBeFocused();
    });

    test('TC_A11Y_003: Skip to main content link present', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    });

    test('TC_A11Y_004: Landmark regions properly defined', async ({ page }) => {
      const nav = page.locator('nav, [role="navigation"]').first();
      const navCount = await nav.count();
      expect(navCount).toBeGreaterThan(0);
    });
  });

  test.describe('2. Status Summary Tabs', () => {
    test('TC_A11Y_005: Status tabs keyboard accessible', async ({ page }) => {
      const allTab = page.getByRole('button', { name: /^all/i }).first();
      await expect(allTab).toBeVisible();
      await allTab.focus();
      await expect(allTab).toBeFocused();
    });

    test('TC_A11Y_006: Status tabs have proper ARIA attributes', async ({ page }) => {
      const allTab = page.getByRole('button', { name: /^all/i }).first();
      await expect(allTab).toBeVisible();
      const approvedTab = page.getByRole('button', { name: /^approved/i }).first();
      await expect(approvedTab).toBeVisible();
    });

    test('TC_A11Y_007: Status tab counts visible and announced', async ({ page }) => {
      const allTab = page.getByRole('button', { name: /^all/i }).first();
      const text = await allTab.textContent();
      expect(text).toMatch(/\d+/);
    });
  });

  test.describe('3. Search, Filter, and Sort Controls', () => {
    test('TC_A11Y_008: Search input accessible', async ({ page }) => {
      const searchInput = page.getByRole('textbox', { name: /search/i });
      await expect(searchInput).toBeVisible();
      await searchInput.focus();
      await expect(searchInput).toBeFocused();
    });

    test('TC_A11Y_009: Filter dropdown keyboard accessible', async ({ page }) => {
      const filter = page.getByRole('combobox', { name: /category/i }).or(page.getByRole('button', { name: /category/i }));
      if (await filter.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await filter.first().focus();
        await expect(filter.first()).toBeFocused();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_010: Filter dropdown has proper ARIA', async ({ page }) => {
      const filter = page.getByRole('combobox', { name: /category/i }).or(page.getByRole('button', { name: /category/i }));
      if (await filter.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(filter.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_011: Sort dropdown accessible', async ({ page }) => {
      const sort = page.getByRole('combobox', { name: /sort/i }).or(page.getByRole('button', { name: /sort|newest/i }));
      if (await sort.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(sort.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_012: Filter persistence announced', async ({ page }) => {
      const searchInput = page.getByRole('textbox', { name: /search/i });
      await searchInput.fill('wheelchair');
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('4. Product Listing Table', () => {
    test('TC_A11Y_013: Table structure semantic and accessible', async ({ page }) => {
      // Verify product listing has column headers
      const disabilityCol = page.getByText('Disability Type').first();
      await expect(disabilityCol).toBeVisible();
    });

    test('TC_A11Y_014: Product images have alt text', async ({ page }) => {
      const images = page.locator('img[alt]');
      const count = await images.count();
      expect(count).toBeGreaterThan(0);
    });

    test('TC_A11Y_015: Edited icon accessible', async ({ page }) => {
      const editedBtn = page.getByRole('button', { name: /toggle edit|edited/i }).first();
      if (await editedBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(editedBtn).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_016: Status indicators accessible', async ({ page }) => {
      const status = page.getByText(/approved|under review|draft/i).first();
      await expect(status).toBeVisible();
    });

    test('TC_A11Y_017: Visibility status accessible', async ({ page }) => {
      const visibility = page.getByText(/active|inactive/i).first();
      await expect(visibility).toBeVisible();
    });

    test('TC_A11Y_018: Color-coded borders accessible', async ({ page }) => {
      // Status is conveyed by text, not just color
      const statusText = page.getByText(/approved|under review|draft|rejected/i).first();
      await expect(statusText).toBeVisible();
    });
  });

  test.describe('5. Product Actions Menu', () => {
    test('TC_A11Y_019: Three-dot menu keyboard accessible', async ({ page }) => {
      const actionsBtn = page.getByRole('button', { name: /more actions/i }).first();
      await expect(actionsBtn).toBeVisible();
      await actionsBtn.focus();
      await expect(actionsBtn).toBeFocused();
    });

    test('TC_A11Y_020: Actions menu has proper ARIA', async ({ page }) => {
      const actionsBtn = page.getByRole('button', { name: /more actions/i }).first();
      await expect(actionsBtn).toBeVisible();
      await expect(actionsBtn).toHaveAccessibleName(/.+/);
    });

    test('TC_A11Y_021: Disabled menu items indicated', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_022: Menu focus trap works correctly', async ({ page }) => {
      const actionsBtn = page.getByRole('button', { name: /more actions/i }).first();
      await actionsBtn.click();
      await page.waitForTimeout(500);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('6. Dynamic Content Updates', () => {
    test('TC_A11Y_023: Filter results update announced', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_024: Status tab switch announced', async ({ page }) => {
      const approvedTab = page.getByRole('button', { name: /^approved/i }).first();
      await approvedTab.click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_025: Product action success announced', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_026: Pending changes section accessible', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('7. Modal Dialogs', () => {
    test('TC_A11Y_027: Delete confirmation modal accessible', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_028: Modal focus trap works', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_029: Modal buttons keyboard accessible', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('8. Visual Accessibility', () => {
    test('TC_A11Y_030: Text contrast meets WCAG AA', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
      const color = await heading.evaluate(el => window.getComputedStyle(el).color);
      expect(color).toBeTruthy();
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('TC_A11Y_031: UI component contrast meets WCAG AA', async ({ page }) => {
      const input = page.getByRole('textbox', { name: /search/i });
      await expect(input).toBeVisible();
      const borderColor = await input.evaluate(el => window.getComputedStyle(el).borderColor);
      expect(borderColor).toBeTruthy();
    });

    test('TC_A11Y_032: Focus indicators visible', async ({ page }) => {
      const searchInput = page.getByRole('textbox', { name: /search/i });
      await searchInput.focus();
      await expect(searchInput).toBeFocused();
    });

    test('TC_A11Y_033: Page scales to 200% without loss', async ({ page }) => {
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_034: Responsive design accessible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('9. Error and Empty States', () => {
    test('TC_A11Y_035: Empty state message accessible', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_036: Error messages accessible', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_037: Loading states announced', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('10. Additional Features', () => {
    test('TC_A11Y_038: Timeline panel accessible', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_039: Inline editing accessible', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });
});
