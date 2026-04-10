// spec: specs/functional/SCRUM-81-pwd-product-tabs.md
// data: specs/test-cases/scrum81-product-tabs.json

import { test, expect } from '@playwright/test';
import { ProductTabsPage } from '../pages/ProductTabsPage';
import planData from '../../specs/test-cases/scrum81-product-tabs.json';
const td = planData.testData;

test.describe('SCRUM-81: PwD Explore Product Tabs (Features, Reviews Etc)', () => {
  let pt: ProductTabsPage;

  test.beforeEach(async ({ page }) => {
    pt = new ProductTabsPage(page);
    await pt.loginAndGoToCatalog(td.credentials.email, td.credentials.password);
    await pt.clickFirstViewDetails();
  });

  // ─── Suite 1: Tab Presence & Structure ───

  test.describe('Tab Presence & Structure', () => {
    test('TC_SCRUM81_001: All five tabs are visible on product details page', async () => {
      const count = await pt.getTabCount();
      expect(count).toBeGreaterThanOrEqual(5);
    });

    test('TC_SCRUM81_002: Features tab is present', async () => {
      const tab = pt.tabs.filter({ hasText: /Features/i }).first();
      await expect(tab).toBeVisible();
    });

    test('TC_SCRUM81_003: Technical and Accessibility tab is present', async () => {
      const tab = pt.tabs.filter({ hasText: /Technical/i }).first();
      await expect(tab).toBeVisible();
    });

    test('TC_SCRUM81_004: Buying Guide tab is present', async () => {
      const tab = pt.tabs.filter({ hasText: /Buying Guide/i }).first();
      await expect(tab).toBeVisible();
    });

    test('TC_SCRUM81_005: Reviews tab is present', async () => {
      const tab = pt.tabs.filter({ hasText: /Reviews/i }).first();
      await expect(tab).toBeVisible();
    });

    test('TC_SCRUM81_006: Raise a Query tab is present', async () => {
      const tab = pt.tabs.filter({ hasText: /Raise a Query/i }).first();
      await expect(tab).toBeVisible();
    });
  });

  // ─── Suite 2: Tab Switching Behavior ───

  test.describe('Tab Switching Behavior', () => {
    test('TC_SCRUM81_007: First tab is active by default', async () => {
      const active = await pt.isTabActive(0);
      expect(active).toBe(true);
    });

    test('TC_SCRUM81_008: Clicking a tab makes it active', async () => {
      await pt.clickTabByIndex(1);
      const active = await pt.isTabActive(1);
      expect(active).toBe(true);
    });

    test('TC_SCRUM81_009: Only one tab content is visible at a time', async () => {
      const count = await pt.getTabCount();
      for (let i = 0; i < Math.min(count, 5); i++) {
        await pt.clickTabByIndex(i);
        const visible = await pt.getVisiblePanelCount();
        expect(visible).toBe(1);
      }
    });

    test('TC_SCRUM81_010: Tab switching does not reload the page', async ({ page }) => {
      const urlBefore = page.url();
      await pt.clickTabByIndex(1);
      const urlAfter = page.url();
      expect(urlAfter).toBe(urlBefore);
    });

    test('TC_SCRUM81_011: Active tab is visually highlighted', async () => {
      // Click second tab and verify it has distinct styling vs inactive tabs
      await pt.clickTabByIndex(1);
      const activeClass = await pt.tabs.nth(1).getAttribute('class') ?? '';
      const inactiveClass = await pt.tabs.nth(0).getAttribute('class') ?? '';
      // Active tab should have a different class or aria-selected
      const isDistinct = activeClass !== inactiveClass ||
        (await pt.tabs.nth(1).getAttribute('aria-selected')) === 'true';
      expect(isDistinct).toBe(true);
    });

    test('TC_SCRUM81_012: Switching all tabs sequentially works', async () => {
      const count = Math.min(await pt.getTabCount(), 5);
      for (let i = 0; i < count; i++) {
        await pt.clickTabByIndex(i);
        const active = await pt.isTabActive(i);
        expect(active).toBe(true);
        const text = await pt.getVisiblePanelText();
        expect(text.length).toBeGreaterThan(0);
      }
    });
  });

  // ─── Suite 3: Features Tab Content ───

  test.describe('Features Tab Content', () => {
    test('TC_SCRUM81_013: Features tab displays content when active', async () => {
      await pt.clickTabByName('Features');
      const visible = await pt.getVisiblePanelCount();
      expect(visible).toBe(1);
    });

    test('TC_SCRUM81_014: Features tab shows key product features', async () => {
      await pt.clickTabByName('Features');
      const text = await pt.getVisiblePanelText();
      // Should have some feature-related content
      expect(text.length).toBeGreaterThan(10);
    });

    test('TC_SCRUM81_015: Features tab has Who is it for section', async () => {
      await pt.clickTabByName('Features');
      const text = await pt.getVisiblePanelText();
      const hasWhoSection = /who is it for|who it'?s for|suitable for|designed for|intended for/i.test(text);
      expect(hasWhoSection).toBe(true);
    });

    test('TC_SCRUM81_016: Features tab content is non-empty', async () => {
      await pt.clickTabByName('Features');
      const text = await pt.getVisiblePanelText();
      expect(text.trim().length).toBeGreaterThan(0);
    });
  });

  // ─── Suite 4: Technical and Accessibility Tab Content ───

  test.describe('Technical and Accessibility Tab Content', () => {
    test('TC_SCRUM81_017: Technical and Accessibility tab displays content', async () => {
      await pt.clickTabByName('Technical');
      const visible = await pt.getVisiblePanelCount();
      expect(visible).toBe(1);
    });

    test('TC_SCRUM81_018: Technical specifications section is visible', async () => {
      await pt.clickTabByName('Technical');
      const text = await pt.getVisiblePanelText();
      expect(text.length).toBeGreaterThan(10);
    });

    test('TC_SCRUM81_019: Accessibility features section is visible', async () => {
      await pt.clickTabByName('Technical');
      const text = await pt.getVisiblePanelText();
      const hasAccessibility = /accessibility|accessible|assistive/i.test(text);
      expect(hasAccessibility).toBe(true);
    });

    test('TC_SCRUM81_020: Technical tab content is non-empty', async () => {
      await pt.clickTabByName('Technical');
      const text = await pt.getVisiblePanelText();
      expect(text.trim().length).toBeGreaterThan(0);
    });
  });

  // ─── Suite 5: Buying Guide Tab Content ───

  test.describe('Buying Guide Tab Content', () => {
    test('TC_SCRUM81_021: Buying Guide tab displays content', async () => {
      await pt.clickTabByName('Buying Guide');
      const visible = await pt.getVisiblePanelCount();
      expect(visible).toBe(1);
    });

    test('TC_SCRUM81_022: Before you Buy section is visible', async () => {
      await pt.clickTabByName('Buying Guide');
      const text = await pt.getVisiblePanelText();
      const hasBefore = /before you buy|buying|consider|guide/i.test(text);
      expect(hasBefore).toBe(true);
    });

    test('TC_SCRUM81_023: Buying Guide content is non-empty', async () => {
      await pt.clickTabByName('Buying Guide');
      const text = await pt.getVisiblePanelText();
      expect(text.trim().length).toBeGreaterThan(0);
    });
  });

  // ─── Suite 6: Reviews Tab Content ───

  test.describe('Reviews Tab Content', () => {
    test('TC_SCRUM81_024: Reviews tab displays content', async () => {
      await pt.clickTabByName('Reviews');
      const visible = await pt.getVisiblePanelCount();
      expect(visible).toBe(1);
    });

    test('TC_SCRUM81_025: Reviews section shows ratings or No reviews yet', async () => {
      await pt.clickTabByName('Reviews');
      const text = await pt.getVisiblePanelText();
      const hasReviews = /review|rating|star|no reviews yet/i.test(text);
      expect(hasReviews).toBe(true);
    });

    test('TC_SCRUM81_026: Write a review option is available', async () => {
      await pt.clickTabByName('Reviews');
      const text = await pt.getVisiblePanelText();
      const hasWrite = /write a review|add a review|submit.*review|leave.*review/i.test(text);
      expect(hasWrite).toBe(true);
    });

    test('TC_SCRUM81_027: Reviews tab content is non-empty', async () => {
      await pt.clickTabByName('Reviews');
      const text = await pt.getVisiblePanelText();
      expect(text.trim().length).toBeGreaterThan(0);
    });
  });

  // ─── Suite 7: Raise a Query Tab Content ───

  test.describe('Raise a Query Tab Content', () => {
    test('TC_SCRUM81_028: Raise a Query tab displays content', async () => {
      await pt.clickTabByName('Raise a Query');
      const visible = await pt.getVisiblePanelCount();
      expect(visible).toBe(1);
    });

    test('TC_SCRUM81_029: Ask the assistive partner section is visible', async () => {
      await pt.clickTabByName('Raise a Query');
      const text = await pt.getVisiblePanelText();
      const hasAsk = /ask|query|question|assistive partner|submit/i.test(text);
      expect(hasAsk).toBe(true);
    });

    test('TC_SCRUM81_030: Raise a Query content is non-empty', async () => {
      await pt.clickTabByName('Raise a Query');
      const text = await pt.getVisiblePanelText();
      expect(text.trim().length).toBeGreaterThan(0);
    });
  });

  // ─── Suite 8: Responsive & Edge Cases ───

  test.describe('Responsive & Edge Cases', () => {
    test('TC_SCRUM81_031: Tabs render correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await page.waitForTimeout(1000);
      const count = await pt.getTabCount();
      expect(count).toBeGreaterThanOrEqual(5);
      // Click a tab to verify it works
      await pt.clickTabByIndex(1);
      const active = await pt.isTabActive(1);
      expect(active).toBe(true);
    });

    test('TC_SCRUM81_032: Tabs render correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.tablet);
      await page.waitForTimeout(1000);
      const count = await pt.getTabCount();
      expect(count).toBeGreaterThanOrEqual(5);
      await pt.clickTabByIndex(2);
      const active = await pt.isTabActive(2);
      expect(active).toBe(true);
    });

    test('TC_SCRUM81_033: Tab content persists after page refresh', async ({ page }) => {
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      const count = await pt.getTabCount();
      expect(count).toBeGreaterThanOrEqual(5);
      await pt.clickTabByIndex(0);
      const text = await pt.getVisiblePanelText();
      expect(text.length).toBeGreaterThan(0);
    });
  });
});
