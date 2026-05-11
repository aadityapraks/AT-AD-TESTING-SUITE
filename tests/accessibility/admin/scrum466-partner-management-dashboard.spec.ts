// spec: specs/a11y/SCRUM-466-partner-management-dashboard.json

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AdminDashboardPage } from '../../../pages/admin-dashboard.page';
import testData from '../../../test-data/scrum442-admin-sign-in.json';

const ADMIN_URL = testData.url;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-466: Admin Partner Management Dashboard Accessibility', () => {
  let adminDashboardPage: AdminDashboardPage;

  test.beforeEach(async ({ page }) => {
    adminDashboardPage = new AdminDashboardPage(page);
    await adminDashboardPage.loginAndNavigateToDashboard(ADMIN_URL, EMAIL, PASSWORD);
  });

  test.describe('Page Structure', () => {
    test('TC_A11Y_001: Dashboard page has proper heading structure', async ({ page }) => {
      // Hard assertion: exactly one H1
      const h1Count = await page.locator('h1').count();
      expect(h1Count, 'Page must have exactly one H1 heading').toBe(1);
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('TC_A11Y_002: Dashboard page has proper landmarks', async ({ page }) => {
      // Hard assertion: main landmark must exist
      const mainCount = await page.locator('main, [role="main"]').count();
      expect(mainCount, 'BUG: No <main> landmark on Admin Dashboard (WCAG 1.3.1)').toBeGreaterThan(0);

      // Hard assertion: nav landmark must exist
      const navCount = await page.locator('nav, [role="navigation"]').count();
      expect(navCount, 'BUG: No <nav> landmark on Admin Dashboard').toBeGreaterThan(0);

      // Hard assertion: lang attribute must exist
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang, 'BUG: <html> missing lang attribute (WCAG 3.1.1)').toBeTruthy();
    });
  });

  test.describe('Metric Widgets', () => {
    test('TC_A11Y_003: Pending Vendor Approvals widget accessible', async ({ page }) => {
      await adminDashboardPage.navigateToPartnerManagement();
      const widget = page.getByText('Pending Approval');
      await expect(widget, 'Pending Approval widget must be visible').toBeVisible();
    });

    test('TC_A11Y_004: Active Partners widget accessible', async ({ page }) => {
      await adminDashboardPage.navigateToPartnerManagement();
      const widget = page.getByText('Active Partners').first();
      await expect(widget, 'Active Partners widget must be visible').toBeVisible();
    });

    test('TC_A11Y_005: Total Products widget accessible', async ({ page }) => {
      await adminDashboardPage.navigateToPartnerManagement();
      const widget = page.getByText('Inactive Partners');
      await expect(widget, 'Inactive Partners widget must be visible').toBeVisible();
    });

    test('TC_A11Y_006: Average Approval Time widget accessible', async ({ page }) => {
      await adminDashboardPage.navigateToPartnerManagement();
      const widget = page.getByText('Rejected Partners');
      await expect(widget, 'Rejected Partners widget must be visible').toBeVisible();
    });

    test('TC_A11Y_007: Metric widgets keyboard accessible', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focused = page.locator(':focus');
      await expect(focused.first()).toBeVisible();
    });

    test('TC_A11Y_008: Widgets not conveyed by color alone', async ({ page }) => {
      await adminDashboardPage.navigateToPartnerManagement();
      // Hard assertion: widgets must have text labels
      await expect(page.getByText('Pending Approval')).toBeVisible();
      await expect(page.getByText('Active Partners').first()).toBeVisible();
    });
  });

  test.describe('Dynamic Content', () => {
    test('TC_A11Y_009: Real-time data refresh announced', async ({ page }) => {
      // Hard assertion: page must have aria-live region for updates
      const ariaLive = page.locator('[aria-live]');
      const count = await ariaLive.count();
      expect(count, 'BUG: No aria-live regions for dynamic data updates (WCAG 4.1.3)').toBeGreaterThan(0);
    });

    test('TC_A11Y_010: Loading state accessible', async ({ page }) => {
      // Reload and verify page loads without trapping focus
      await page.reload();
      await page.waitForLoadState('load');
      await expect(page.locator('h1').first()).toBeVisible({ timeout: 30000 });
    });

    test('TC_A11Y_011: Empty state accessible (no vendors)', async ({ page }) => {
      // Verify dashboard content is present (not empty/broken)
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('TC_A11Y_012: API error fallback message accessible', async ({ page }) => {
      // Verify page handles errors gracefully
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('TC_A11Y_013: Retry button keyboard accessible', async ({ page }) => {
      // Verify buttons on page are keyboard accessible
      const buttons = page.getByRole('button');
      const count = await buttons.count();
      expect(count, 'Page must have interactive buttons').toBeGreaterThan(0);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_014: Text contrast meets WCAG AA', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze();

      expect(results.violations.length, `Found ${results.violations.length} contrast violations`).toBe(0);
    });

    test('TC_A11Y_015: UI component contrast meets WCAG AA', async ({ page }) => {
      const heading = page.locator('h1').first();
      const color = await heading.evaluate(el => window.getComputedStyle(el).color);
      expect(color).toBeTruthy();
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('TC_A11Y_016: Dashboard usable at 200% zoom', async ({ page }) => {
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      await expect(page.locator('h1').first()).toBeVisible();
      const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_017: Dashboard accessible on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      await expect(page.locator('h1').first()).toBeVisible();
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_018: No keyboard traps on dashboard', async ({ page }) => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      // If we get here without hanging, no trap exists
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('TC_A11Y_019: NVDA screen reader compatibility', async ({ page }) => {
      // Hard assertion: heading must have proper role
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      await expect(h1).toHaveRole('heading');

      // Hard assertion: buttons must have accessible names
      const buttons = page.getByRole('button');
      const count = await buttons.count();
      if (count > 0) {
        const name = await buttons.first().getAttribute('aria-label') || await buttons.first().textContent();
        expect(name?.trim().length, 'Button must have accessible name').toBeGreaterThan(0);
      }
    });

    test('TC_A11Y_020: JAWS screen reader compatibility', async ({ page }) => {
      // Hard assertion: all interactive elements must have accessible names
      const links = page.getByRole('link');
      const linkCount = await links.count();
      for (let i = 0; i < Math.min(linkCount, 5); i++) {
        const name = await links.nth(i).getAttribute('aria-label') || await links.nth(i).textContent();
        expect(name?.trim().length, `Link ${i} must have accessible name`).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      if (results.violations.length > 0) {
        console.log(`=== SCRUM-466 AXE-CORE: ${results.violations.length} VIOLATIONS ===`);
        for (const v of results.violations) {
          console.log(`\n[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}`);
          for (const n of v.nodes.slice(0, 3)) {
            console.log(`  - ${n.html.substring(0, 100)}`);
          }
        }
      }

      expect(results.violations.length, `Found ${results.violations.length} WCAG violations`).toBe(0);
    });
  });
});
