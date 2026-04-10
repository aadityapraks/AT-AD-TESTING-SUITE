// spec: specs/functional/SCRUM-106-pwd-landing-homepage-dashboard.md
// data: specs/test-cases/scrum106-homepage-dashboard.json

import { test, expect } from '@playwright/test';
import { HomeDashboardPage } from '../../pages/pwd/HomeDashboardPage';
import planData from '../../../specs/test-cases/pwd/scrum106-homepage-dashboard.json';
const td = planData.testData;

test.describe('SCRUM-106: PwD - Landing on Portal Homepage and Dashboard', () => {
  let hp: HomeDashboardPage;

  // ─── Suite 1: Home Page Access & Branding ───

  test.describe('Home Page Access & Branding', () => {
    test.beforeEach(async ({ page }) => {
      hp = new HomeDashboardPage(page);
      await hp.goHome();
      await hp.dismissOverlays();
    });

    test('TC_SCRUM106_001: Home page loads successfully', async () => {
      expect(hp.page.url()).toContain('qa-atad.swarajability.org');
      const body = (await hp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });

    test('TC_SCRUM106_002: Page has AT/AD portal branding (logo visible)', async () => {
      await expect(hp.logo).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM106_003: Sign In/Register button is visible for unauthenticated users', async () => {
      await expect(hp.signInBtn).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM106_004: Sign In/Register button is hidden after login', async () => {
      await hp.loginAndGoHome(td.credentials.email, td.credentials.password);
      await hp.dismissOverlays();
      await expect(hp.signInBtn).not.toBeVisible({ timeout: 5000 });
    });
  });

  // ─── Suite 2: Navigation Tabs ───

  test.describe('Navigation Tabs', () => {
    test.beforeEach(async ({ page }) => {
      hp = new HomeDashboardPage(page);
      await hp.goHome();
      await hp.dismissOverlays();
    });

    test('TC_SCRUM106_005: Home nav link is present and navigates to home page', async () => {
      await expect(hp.navHome).toBeVisible({ timeout: 5000 });
      const href = await hp.navHome.getAttribute('href');
      expect(href === '/' || href?.includes('qa-atad.swarajability.org')).toBe(true);
    });

    test('TC_SCRUM106_006: Catalog nav link is present and navigates to catalog page', async () => {
      await expect(hp.navCatalog).toBeVisible({ timeout: 5000 });
      const href = await hp.navCatalog.getAttribute('href');
      expect(href?.toLowerCase()).toContain('catalog');
    });

    test('TC_SCRUM106_007: Stories nav link is present and navigates to stories page', async () => {
      await expect(hp.navStories).toBeVisible({ timeout: 5000 });
      const href = await hp.navStories.getAttribute('href');
      expect(href?.toLowerCase()).toContain('stories');
    });

    test('TC_SCRUM106_008: Help & Resources nav link is present and navigates to help page', async () => {
      await expect(hp.navHelp).toBeVisible({ timeout: 5000 });
      const href = await hp.navHelp.getAttribute('href');
      expect(href?.toLowerCase()).toContain('help');
    });

    test('TC_SCRUM106_009: Logout link is visible after login', async () => {
      await hp.loginAndGoHome(td.credentials.email, td.credentials.password);
      await hp.dismissOverlays();
      await expect(hp.logoutLink).toBeVisible({ timeout: 5000 });
    });
  });

  // ─── Suite 3: Hero Carousel ───

  test.describe('Hero Carousel', () => {
    test.beforeEach(async ({ page }) => {
      hp = new HomeDashboardPage(page);
      await hp.goHome();
      await hp.dismissOverlays();
    });

    test('TC_SCRUM106_010: Hero carousel is present with multiple slides', async () => {
      await expect(hp.carousel).toBeVisible({ timeout: 5000 });
      const count = await hp.carouselSlides.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('TC_SCRUM106_011: PwD slide has Explore Catalog and Success Stories buttons', async () => {
      const slides = hp.carouselSlides;
      const count = await slides.count();
      let found = false;
      for (let i = 0; i < count; i++) {
        const text = (await slides.nth(i).textContent()) ?? '';
        if (/discover assistive/i.test(text)) {
          expect(text.toLowerCase()).toContain('explore catalog');
          expect(text.toLowerCase()).toContain('success stories');
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    });

    test('TC_SCRUM106_012: Donors slide has Donate Now and Impact Stories buttons', async () => {
      const slides = hp.carouselSlides;
      const count = await slides.count();
      let found = false;
      for (let i = 0; i < count; i++) {
        const text = (await slides.nth(i).textContent()) ?? '';
        if (/support those/i.test(text)) {
          expect(text.toLowerCase()).toContain('donate now');
          expect(text.toLowerCase()).toContain('impact stories');
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    });

    test('TC_SCRUM106_013: Vendors slide has Register Now and View Vendors buttons', async () => {
      const slides = hp.carouselSlides;
      const count = await slides.count();
      let found = false;
      for (let i = 0; i < count; i++) {
        const text = (await slides.nth(i).textContent()) ?? '';
        if (/become a verified vendor/i.test(text)) {
          expect(text.toLowerCase()).toContain('register now');
          expect(text.toLowerCase()).toContain('view vendors');
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    });

    test('TC_SCRUM106_014: Explore Catalog button navigates to catalog page', async () => {
      const btn = hp.page.locator('a.elementor-button').filter({ hasText: /Explore Catalog/i }).first();
      const href = await btn.getAttribute('href');
      expect(href?.toLowerCase()).toContain('catalog');
    });
  });

  // ─── Suite 4: Summary Widgets ───

  test.describe('Summary Widgets', () => {
    test.beforeEach(async ({ page }) => {
      hp = new HomeDashboardPage(page);
      await hp.goHome();
      await hp.dismissOverlays();
    });

    test('TC_SCRUM106_015: Total Devices counter is displayed', async () => {
      const body = (await hp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('across all categories');
    });

    test('TC_SCRUM106_016: Verified Vendors counter is displayed', async () => {
      const body = (await hp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('trusted partners');
    });

    test('TC_SCRUM106_017: Success Stories counter is displayed', async () => {
      const body = (await hp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('lives transformed');
    });

    test('TC_SCRUM106_018: Community Members counter is displayed', async () => {
      const body = (await hp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('active users');
    });
  });

  // ─── Suite 5: Featured Devices Section ───

  test.describe('Featured Devices Section', () => {
    test.beforeEach(async ({ page }) => {
      hp = new HomeDashboardPage(page);
      await hp.goHome();
      await hp.dismissOverlays();
    });

    test('TC_SCRUM106_019: Featured Devices heading is visible', async () => {
      await expect(hp.featuredHeading).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM106_020: Featured device cards are displayed', async () => {
      const cards = hp.page.locator('.e-loop-item');
      expect(await cards.count()).toBeGreaterThan(0);
    });

    test('TC_SCRUM106_021: View All button navigates to catalog page', async () => {
      await expect(hp.viewAllBtn).toBeVisible({ timeout: 5000 });
      const href = await hp.viewAllBtn.getAttribute('href');
      expect(href?.toLowerCase()).toContain('catalog');
    });

    test('TC_SCRUM106_022: View Details button is present on product card', async () => {
      const viewDetails = hp.page.locator('a.elementor-button').filter({ hasText: /View details/i }).first();
      await expect(viewDetails).toBeAttached();
    });
  });

  // ─── Suite 6: Success Stories Section ───

  test.describe('Success Stories Section', () => {
    test.beforeEach(async ({ page }) => {
      hp = new HomeDashboardPage(page);
      await hp.goHome();
      await hp.dismissOverlays();
    });

    test('TC_SCRUM106_023: Success Stories heading is visible on home page', async () => {
      await expect(hp.storiesHeading).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM106_024: Story cards are displayed in the section', async () => {
      const body = (await hp.page.locator('body').textContent()) ?? '';
      // Story titles from DOM inspection
      expect(/independent living|student to software/i.test(body)).toBe(true);
    });

    test('TC_SCRUM106_025: Read More button navigates to stories page', async () => {
      await expect(hp.readMoreBtn).toBeVisible({ timeout: 5000 });
      const href = await hp.readMoreBtn.getAttribute('href');
      expect(href?.toLowerCase()).toContain('stories');
    });
  });

  // ─── Suite 7: Header, Footer & Dashboard ───

  test.describe('Header, Footer & Dashboard', () => {
    test.beforeEach(async ({ page }) => {
      hp = new HomeDashboardPage(page);
    });

    test('TC_SCRUM106_026: Header is present with logo', async () => {
      await hp.goHome();
      await hp.dismissOverlays();
      await expect(hp.headerEl).toBeVisible({ timeout: 5000 });
      await expect(hp.logo).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM106_027: Footer is present with links', async () => {
      await hp.goHome();
      await hp.dismissOverlays();
      await expect(hp.footerEl).toBeVisible({ timeout: 5000 });
      const footerLinks = hp.footerEl.locator('a');
      expect(await footerLinks.count()).toBeGreaterThan(0);
    });

    test('TC_SCRUM106_028: Get Recommendations button visible after login', async () => {
      await hp.loginAndGoHome(td.credentials.email, td.credentials.password);
      await hp.dismissOverlays();
      await expect(hp.getRecommendationsBtn).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM106_029: Browse All Devices button navigates to catalog page after login', async () => {
      await hp.loginAndGoHome(td.credentials.email, td.credentials.password);
      await hp.dismissOverlays();
      await expect(hp.browseAllDevicesBtn).toBeVisible({ timeout: 5000 });
      await hp.browseAllDevicesBtn.click();
      await hp.page.waitForLoadState('domcontentloaded');
      await hp.page.waitForTimeout(3000);
      // Should land on catalog page, not a 404
      const title = await hp.page.title();
      expect(title.toLowerCase()).not.toContain('not found');
      expect(hp.page.url().toLowerCase()).toContain('catalog');
    });

    test('TC_SCRUM106_030: About PwD Portal section is visible', async () => {
      await hp.goHome();
      await hp.dismissOverlays();
      const body = (await hp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('about pwd portal');
    });
  });

  // ─── Suite 8: Responsive ───

  test.describe('Responsive', () => {
    test.beforeEach(async ({ page }) => {
      hp = new HomeDashboardPage(page);
      await hp.goHome();
    });

    test('TC_SCRUM106_031: Home page renders on mobile viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await page.waitForTimeout(1000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('featured devices');
    });

    test('TC_SCRUM106_032: Home page renders on tablet viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.tablet);
      await page.waitForTimeout(1000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('featured devices');
    });

    test('TC_SCRUM106_033: No horizontal overflow on mobile', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await page.waitForTimeout(1000);
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(td.viewports.mobile.width + 5);
    });
  });
});
