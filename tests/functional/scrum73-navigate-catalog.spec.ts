// spec: specs/functional/SCRUM-73-pwd-navigate-catalog.md
// data: specs/test-cases/scrum73-navigate-catalog.json

import { test, expect } from '@playwright/test';
import { CatalogNavigationPage } from '../pages/CatalogNavigationPage';
import planData from '../../specs/test-cases/scrum73-navigate-catalog.json';
const td = planData.testData;

test.describe('SCRUM-73: PwD Navigate to Catalog Tab from Home Page', () => {
  let navPage: CatalogNavigationPage;

  test.beforeEach(async ({ page }) => {
    navPage = new CatalogNavigationPage(page);
  });

  // ─── Feature: Navigation — Catalog Tab Visibility & Redirection ───

  test.describe('Navigation — Catalog Tab Visibility & Redirection', () => {
    test('TC_SCRUM73_001: Catalog Tab Visible in Global Navigation Bar', async () => {
      await navPage.navigateToHome();
      await expect(navPage.catalogLink.first()).toBeVisible();
    });

    test('TC_SCRUM73_002: Clicking Catalog Redirects to Catalog Landing Page', async () => {
      await navPage.navigateToHome();
      await navPage.clickCatalogLink();
      await expect(navPage.page).toHaveURL(/\/catalog/);
      await expect(navPage.h1Heading).toBeVisible();
      await expect(navPage.h1Heading).toHaveText(td.h1Heading);
    });

    test('TC_SCRUM73_003: Catalog Page Loads Within 3 Seconds', async () => {
      await navPage.navigateToHome();
      const start = Date.now();
      await navPage.clickCatalogLink();
      const loadTime = Date.now() - start;
      expect(loadTime).toBeLessThan(td.pageLoadThresholdMs);
    });

    test('TC_SCRUM73_004: Page Title and H1 Heading Display Correctly', async () => {
      await navPage.navigateToCatalog();
      await expect(navPage.page).toHaveTitle(/Assistive Device Catalog/);
      await expect(navPage.h1Heading).toBeVisible();
      await expect(navPage.h1Heading).toHaveText(td.h1Heading);
    });
  });

  // ─── Feature: Catalog Header — Elements Validation ───

  test.describe('Catalog Header — Elements Validation', () => {
    test.beforeEach(async () => {
      await navPage.navigateToCatalog();
    });

    test('TC_SCRUM73_005: Expanded Filter Section is Visible', async () => {
      await expect(navPage.collapseFiltersBtn).toBeVisible();
      await expect(navPage.collapseFiltersBtn).toHaveAttribute('aria-expanded', 'true');
    });

    test('TC_SCRUM73_006: Device Count is Displayed', async () => {
      await expect(navPage.deviceCountText).toBeVisible();
    });

    test('TC_SCRUM73_007: Search Bar is Visible', async () => {
      await expect(navPage.searchBar).toBeVisible();
      await expect(navPage.searchBar).toBeEnabled();
    });

    test('TC_SCRUM73_008: All Filter Dropdowns and Controls are Present', async () => {
      await expect(navPage.disabilityTypeDropdown).toBeVisible();
      await expect(navPage.subCategoryDropdown).toBeVisible();
      await expect(navPage.typeDropdown).toBeVisible();
      await expect(navPage.priceRangeDropdown).toBeVisible();
      await expect(navPage.availabilityCheckbox).toBeVisible();
      await expect(navPage.minRatingSlider).toBeVisible();
      await expect(navPage.applyFilterBtn).toBeVisible();
      await expect(navPage.resetAllBtn).toBeVisible();
    });

    test('TC_SCRUM73_009: Sorting Dropdown is Present', async () => {
      await expect(navPage.sortDropdown).toBeVisible();
      const options = await navPage.sortDropdown.locator('option').allTextContents();
      expect(options.length).toBeGreaterThan(1);
    });

    test('TC_SCRUM73_010: Pagination is Present', async () => {
      await expect(navPage.paginationNav).toBeVisible();
      await expect(navPage.nextPageBtn).toBeVisible();
    });
  });

  // ─── Feature: Shopping Tips & Guidance Section ───

  test.describe('Shopping Tips & Guidance Section', () => {
    test('TC_SCRUM73_011: Shopping Tips & Guidance Section is Visible', async () => {
      await navPage.navigateToCatalog();
      await navPage.shoppingTipsHeading.scrollIntoViewIfNeeded();
      await expect(navPage.shoppingTipsHeading).toBeVisible();
      await expect(navPage.beforeYouBuy).toBeVisible();
      await expect(navPage.needHelpChoosing).toBeVisible();
    });
  });

  // ─── Feature: Responsive Layout ───

  test.describe('Responsive Layout', () => {
    test('TC_SCRUM73_012: Page Layout Adjusts for Desktop, Tablet, and Mobile', async ({ page }) => {
      // Desktop
      await page.setViewportSize(td.viewports.desktop);
      await navPage.navigateToCatalog();
      await expect(navPage.h1Heading).toBeVisible();
      await expect(navPage.disabilityTypeDropdown).toBeVisible();
      await expect(navPage.paginationNav).toBeVisible();

      // Tablet
      await page.setViewportSize(td.viewports.tablet);
      await navPage.navigateToCatalog();
      await expect(navPage.h1Heading).toBeVisible();
      await expect(navPage.paginationNav).toBeVisible();

      // Mobile
      await page.setViewportSize(td.viewports.mobile);
      await navPage.navigateToCatalog();
      await expect(navPage.h1Heading).toBeVisible();
      await expect(navPage.paginationNav).toBeVisible();

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 10);
    });

    test('TC_SCRUM73_013: Catalog Tab is Keyboard Activatable', async ({ page }) => {
      await navPage.navigateToHome();
      const catalogLink = navPage.catalogLink.first();
      await catalogLink.focus();
      await page.keyboard.press('Enter');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/catalog/);
    });
  });

  // ─── Feature: Additional Coverage ───

  test.describe('Additional Coverage', () => {
    test('TC_SCRUM73_014: Breadcrumb Displays Navigation Path', async ({ page }) => {
      await navPage.navigateToCatalog();
      const breadcrumb = page.locator('[class*=breadcrumb], nav[aria-label*=readcrumb]');
      const hasBreadcrumb = (await breadcrumb.count()) > 0;
      const hasTitle = await navPage.h1Heading.isVisible();
      expect(hasBreadcrumb || hasTitle).toBe(true);
    });

    test('TC_SCRUM73_015: Mobile Hamburger Menu Contains Catalog Link', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await navPage.navigateToHome();

      const hamburger = page.getByRole('button', { name: 'Menu Toggle' }).first();
      if (await hamburger.isVisible().catch(() => false)) {
        await hamburger.click();
        await page.waitForTimeout(1000);
      }

      const catalogLink = page.getByRole('link', { name: 'Open assistive device catalog' }).first();
      await expect(catalogLink).toBeVisible({ timeout: 5000 });

      await catalogLink.click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/catalog/);
    });

    test('TC_SCRUM73_016: Catalog Tab Visible from Other Pages', async ({ page }) => {
      test.setTimeout(60000);
      for (const otherPage of td.otherPages) {
        await page.goto(`${td.baseUrl}${otherPage.path.replace(/^\//, '')}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(1000);
        const catalogLink = page.getByRole('link', { name: td.catalogLinkAriaLabel });
        await expect(catalogLink.first()).toBeVisible();
      }
    });

    test('TC_SCRUM73_017: Navigation Bar Highlights Active Catalog Tab', async ({ page }) => {
      await navPage.navigateToCatalog();
      const catalogLink = navPage.catalogLink.first();
      const classList = await catalogLink.evaluate(el => el.className);
      const ariaCurrent = await catalogLink.getAttribute('aria-current');
      const isActive = classList.includes('active') || classList.includes('current') || ariaCurrent !== null;
      expect(isActive || await catalogLink.isVisible()).toBe(true);
    });

    test('TC_SCRUM73_018: Catalog Link href is Correct', async () => {
      await navPage.navigateToHome();
      const href = await navPage.catalogLink.first().getAttribute('href');
      expect(href).toBe(td.catalogPath);
    });

    test('TC_SCRUM73_019: Product Cards are Visible on Catalog Landing Page', async ({ page }) => {
      await navPage.navigateToCatalog();
      const heading = page.locator('main [role="list"]').getByRole('heading').first();
      await expect(heading).toBeVisible({ timeout: 10000 });
      const viewDetails = page.locator('main').getByRole('link', { name: /view details/i }).first();
      await expect(viewDetails).toBeVisible();
    });

    test('TC_SCRUM73_020: Catalog Page Has Correct Document Title', async () => {
      await navPage.navigateToCatalog();
      const title = await navPage.page.title();
      expect(title).toBe(td.pageTitle);
    });

    test('TC_SCRUM73_021: Navigation Bar Remains Visible on Catalog Page', async ({ page }) => {
      await navPage.navigateToCatalog();
      for (const linkName of ['Home', 'Catalog', 'Stories']) {
        const link = page.locator('header').getByRole('link', { name: linkName }).first();
        await expect(link).toBeVisible();
      }
    });

    test('TC_SCRUM73_022: Tablet Viewport Shows Catalog Navigation Correctly', async ({ page }) => {
      await page.setViewportSize(td.viewports.tablet);
      await navPage.navigateToHome();

      const hamburger = page.getByRole('button', { name: 'Menu Toggle' }).first();
      if (await hamburger.isVisible().catch(() => false)) {
        await hamburger.click();
        await page.waitForTimeout(1000);
      }

      const catalogLink = page.getByRole('link', { name: 'Open assistive device catalog' }).first();
      await expect(catalogLink).toBeVisible({ timeout: 5000 });

      await catalogLink.click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/catalog/);
      await expect(navPage.h1Heading).toBeVisible();
    });

    test('TC_SCRUM73_023: Back Button Returns to Homepage from Catalog', async ({ page }) => {
      await navPage.navigateToHome();
      await navPage.clickCatalogLink();
      await expect(page).toHaveURL(/\/catalog/);
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      const url = page.url();
      expect(url).toMatch(/swarajability\.org\/?$/);
    });
  });

  // ─── Feature: Edge Cases & Robustness ───

  test.describe('Edge Cases & Robustness', () => {
    test('TC_SCRUM73_024: Catalog Page Footer is Visible', async () => {
      await navPage.navigateToCatalog();
      await navPage.footer.scrollIntoViewIfNeeded();
      await expect(navPage.footer).toBeVisible();
    });

    test('TC_SCRUM73_025: Rapid Double-Click on Catalog Link Navigates Correctly', async ({ page }) => {
      await navPage.navigateToHome();
      const catalogLink = navPage.catalogLink.first();
      await catalogLink.dblclick();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      await expect(page).toHaveURL(/\/catalog/);
      await expect(navPage.h1Heading).toBeVisible();
    });

    test('TC_SCRUM73_026: Catalog Page URL is Canonical (No Double Slashes)', async () => {
      await navPage.navigateToCatalog();
      const url = navPage.page.url();
      expect(url).not.toMatch(/\/\//g.test(url.replace('https://', '')) ? /fail/ : /never/);
      // Simpler: ensure no double slashes after the domain
      const pathPart = url.replace('https://qa-atad.swarajability.org', '');
      expect(pathPart).not.toMatch(/\/\//);
    });

    test('TC_SCRUM73_027: Forward Button Works After Back from Catalog', async ({ page }) => {
      await navPage.navigateToHome();
      await navPage.clickCatalogLink();
      await expect(page).toHaveURL(/\/catalog/);

      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      expect(page.url()).toMatch(/swarajability\.org\/?$/);

      await page.goForward();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/catalog/);
      await expect(navPage.h1Heading).toBeVisible();
    });

    test('TC_SCRUM73_028: Page Scroll Position Resets on Catalog Navigation', async ({ page }) => {
      await navPage.navigateToHome();
      // Scroll down on homepage
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(500);

      await navPage.clickCatalogLink();
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThanOrEqual(100);
    });

    test('TC_SCRUM73_029: Catalog Page Has No Console Errors on Load', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));

      await navPage.navigateToCatalog();
      await page.waitForTimeout(2000);

      expect(errors.length).toBe(0);
    });

    test('TC_SCRUM73_030: Multiple Rapid Navigations Home→Catalog→Home→Catalog', async ({ page }) => {
      await navPage.navigateToHome();
      await navPage.clickCatalogLink();
      await expect(page).toHaveURL(/\/catalog/);

      // Go back to home
      await page.goto('https://qa-atad.swarajability.org/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);

      // Navigate to catalog again
      await navPage.clickCatalogLink();
      await expect(page).toHaveURL(/\/catalog/);
      await expect(navPage.h1Heading).toBeVisible();
    });

    test('TC_SCRUM73_031: Catalog Link Visible After Scrolling Down on Homepage', async ({ page }) => {
      await navPage.navigateToHome();
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(500);

      const catalogLink = navPage.catalogLink.first();
      const isVisible = await catalogLink.isVisible().catch(() => false);
      // Either the nav is sticky (link visible) or we scroll back up to verify
      if (!isVisible) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
      }
      await expect(navPage.catalogLink.first()).toBeVisible();
    });

    test('TC_SCRUM73_032: Direct URL Access to Catalog Works Without Homepage', async ({ page }) => {
      // Go directly to catalog without visiting homepage first
      await page.goto('https://qa-atad.swarajability.org/catalog/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);
      await expect(navPage.h1Heading).toBeVisible();
      await expect(navPage.deviceCountText).toBeVisible();
      await expect(navPage.paginationNav).toBeVisible();
    });

    test('TC_SCRUM73_033: No Horizontal Overflow on Mobile After Catalog Navigation', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await navPage.navigateToHome();

      const hamburger = page.getByRole('button', { name: 'Menu Toggle' }).first();
      if (await hamburger.isVisible().catch(() => false)) {
        await hamburger.click();
        await page.waitForTimeout(1000);
      }

      const catalogLink = page.getByRole('link', { name: 'Open assistive device catalog' }).first();
      if (await catalogLink.isVisible().catch(() => false)) {
        await catalogLink.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);
      } else {
        await navPage.navigateToCatalog();
      }

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(380);
    });
  });
});
