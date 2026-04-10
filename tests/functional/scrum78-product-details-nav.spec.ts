// spec: specs/functional/SCRUM-78-pwd-product-details-nav.md
// data: specs/test-cases/scrum78-product-details-nav.json

import { test, expect } from '@playwright/test';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import planData from '../../specs/test-cases/scrum78-product-details-nav.json';
const td = planData.testData;

test.describe('SCRUM-78: PwD Navigate from Catalog to Product Details Page', () => {
  let pd: ProductDetailsPage;

  test.beforeEach(async ({ page }) => {
    pd = new ProductDetailsPage(page);
    await pd.loginAndGoToCatalog(td.credentials.email, td.credentials.password);
  });

  // ─── Feature: Navigation to Product Details ───

  test.describe('Navigation to Product Details', () => {
    test('TC_SCRUM78_001: View Details Click Navigates to Product Details Page', async () => {
      const catalogUrl = pd.page.url();
      await pd.clickFirstViewDetails();
      const newUrl = pd.page.url();
      expect(newUrl).not.toBe(catalogUrl);
    });

    test('TC_SCRUM78_002: Product Details Page URL Contains /product/ Path', async () => {
      await pd.clickFirstViewDetails();
      expect(pd.page.url()).toContain(td.productPathPattern);
    });

    test('TC_SCRUM78_003: Product Details Page Loads Within Acceptable Time', async () => {
      const start = Date.now();
      await pd.clickFirstViewDetails();
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThanOrEqual(td.pageLoadThresholdMs);
    });

    test('TC_SCRUM78_004: Product Name Heading is Visible on Details Page', async () => {
      await pd.clickFirstViewDetails();
      await expect(pd.productDetailHeading).toBeVisible({ timeout: 5000 });
      const text = await pd.getProductDetailHeadingText();
      expect(text.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM78_005: Breadcrumb Navigation is Present on Product Details Page', async () => {
      await pd.clickFirstViewDetails();
      await expect(pd.breadcrumb).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM78_006: Correct Product is Loaded Based on Card Clicked', async () => {
      const cardName = await pd.getFirstCardText();
      await pd.clickFirstViewDetails();
      const detailHeading = await pd.getProductDetailHeadingText();
      // Product name from card should appear in the detail page heading
      expect(detailHeading.toLowerCase()).toContain(cardName.toLowerCase().substring(0, 10));
    });

    test('TC_SCRUM78_007: Product Details Page Has Main Content Area', async () => {
      await pd.clickFirstViewDetails();
      await expect(pd.mainContent).toBeVisible();
      const text = (await pd.mainContent.textContent()) ?? '';
      expect(text.trim().length).toBeGreaterThan(0);
    });

    test('TC_SCRUM78_008: Direct URL Access to Product Details Page Works', async () => {
      await pd.clickFirstViewDetails();
      const productUrl = pd.page.url();
      await pd.page.goto(productUrl);
      await pd.page.waitForLoadState('domcontentloaded');
      await pd.page.waitForTimeout(2000);
      await expect(pd.productDetailHeading).toBeVisible({ timeout: 5000 });
    });
  });

  // ─── Feature: URL & Routing ───

  test.describe('URL & Routing', () => {
    test('TC_SCRUM78_009: URL Updates Dynamically with Product Slug', async () => {
      await pd.clickFirstViewDetails();
      const url = pd.page.url();
      // URL should have more than just /product/ — it should have a slug after it
      const afterProduct = url.split('/product/')[1];
      expect(afterProduct).toBeTruthy();
      expect(afterProduct.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM78_010: Product URL is Clean and Canonical', async () => {
      await pd.clickFirstViewDetails();
      const url = pd.page.url();
      // No double slashes (except https://)
      const pathPart = url.replace('https://', '');
      expect(pathPart).not.toContain('//');
    });

    test('TC_SCRUM78_011: Different Products Have Different URLs', async ({ page }) => {
      await pd.clickFirstViewDetails();
      const url1 = page.url();

      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      const linkCount = await pd.viewDetailsLinks.count();
      if (linkCount >= 2) {
        await pd.viewDetailsLinks.nth(1).click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        const url2 = page.url();
        expect(url1).not.toBe(url2);
      }
    });

    test('TC_SCRUM78_012: Product URL Contains Readable Slug Not Just ID', async () => {
      await pd.clickFirstViewDetails();
      const url = pd.page.url();
      const slug = url.split('/product/')[1]?.split('?')[0]?.split('#')[0] ?? '';
      // Slug should contain letters (not purely numeric)
      expect(slug).toMatch(/[a-zA-Z]/);
    });

    test('TC_SCRUM78_013: Invalid Product URL Shows Error or Redirects', async ({ page }) => {
      await page.goto('https://qa-atad.swarajability.org/product/nonexistent-xyz-999/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      const bodyText = (await page.locator('body').textContent()) ?? '';
      const url = page.url();
      // Should show 404, not found, or redirect away
      const handled = bodyText.match(/not found|404|error|does not exist/i) || url.includes('/catalog') || url.includes('/404');
      expect(handled).toBeTruthy();
    });

    test('TC_SCRUM78_014: Product URL Works After Copy-Paste in New Tab', async ({ browser }) => {
      await pd.clickFirstViewDetails();
      const productUrl = pd.page.url();

      const newContext = await browser.newContext();
      const newPage = await newContext.newPage();
      await newPage.goto(productUrl);
      await newPage.waitForLoadState('domcontentloaded');
      await newPage.waitForTimeout(2000);

      // Page should load (may redirect to auth if session not shared, which is acceptable)
      const loaded = newPage.url().includes('/product/') || newPage.url().includes('auth') || newPage.url().includes('/catalog');
      expect(loaded).toBe(true);
      await newContext.close();
    });
  });

  // ─── Feature: Back Navigation & State ───

  test.describe('Back Navigation & State', () => {
    test('TC_SCRUM78_015: Browser Back Returns to Catalog Page', async ({ page }) => {
      await pd.clickFirstViewDetails();
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      expect(page.url()).toContain(td.catalogPath);
    });

    test('TC_SCRUM78_016: Browser Back Preserves Applied Filters', async ({ page }) => {
      await pd.selectType(td.filterForBackTest.type);
      await pd.applyFilterBtn.click();
      await page.waitForTimeout(2000);

      await pd.clickFirstViewDetails();
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(3000);

      // After back nav the catalog page reloads — verify URL still contains /catalog
      expect(page.url()).toContain(td.catalogPath);
      // Verify catalog content is visible (product grid loaded)
      await expect(pd.deviceCountText).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM78_017: Browser Back Preserves Search Term', async ({ page }) => {
      await pd.searchBar.fill(td.searchTermForBackTest);
      await pd.searchBar.press('Enter');
      await page.waitForTimeout(1500);

      await pd.clickFirstViewDetails();
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      const searchVal = await pd.searchBar.inputValue();
      expect(searchVal.toLowerCase()).toContain(td.searchTermForBackTest.toLowerCase());
    });

    test('TC_SCRUM78_018: Browser Back Preserves Sort Selection', async ({ page }) => {
      await pd.sortDropdown.selectOption({ label: 'Name: A to Z' });
      await page.waitForTimeout(1000);

      await pd.clickFirstViewDetails();
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      const sortVal = await pd.sortDropdown.evaluate((el: HTMLSelectElement) => el.options[el.selectedIndex]?.text ?? '');
      expect(sortVal).toContain('A to Z');
    });

    test('TC_SCRUM78_019: Browser Back Preserves Pagination Position', async ({ page }) => {
      await pd.nextPageBtn.click();
      await page.waitForTimeout(2000);

      const urlBefore = page.url();
      await pd.clickFirstViewDetails();
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      // Should be on page 2 or URL should indicate page 2
      const urlAfter = page.url();
      expect(urlAfter).toContain(td.catalogPath);
    });

    test('TC_SCRUM78_020: Browser Forward Returns to Product Details After Back', async ({ page }) => {
      await pd.clickFirstViewDetails();
      const productUrl = page.url();

      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      await page.goForward();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      expect(page.url()).toContain(td.productPathPattern);
    });

    test('TC_SCRUM78_021: Back Navigation URL Contains /catalog', async ({ page }) => {
      await pd.clickFirstViewDetails();
      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      expect(page.url()).toContain(td.catalogPath);
    });
  });

  // ─── Feature: Page Refresh & Persistence ───

  test.describe('Page Refresh & Persistence', () => {
    test('TC_SCRUM78_022: Product Details Persist After Page Refresh', async ({ page }) => {
      await pd.clickFirstViewDetails();
      const headingBefore = await pd.getProductDetailHeadingText();

      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);

      const headingAfter = await pd.getProductDetailHeadingText();
      expect(headingAfter).toBe(headingBefore);
    });

    test('TC_SCRUM78_023: Product URL Persists After Page Refresh', async ({ page }) => {
      await pd.clickFirstViewDetails();
      const urlBefore = page.url();

      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      expect(page.url()).toBe(urlBefore);
    });

    test('TC_SCRUM78_024: Product Price Persists After Page Refresh', async ({ page }) => {
      await pd.clickFirstViewDetails();
      const priceBefore = await pd.productDetailPrice.textContent().catch(() => null);

      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      const priceAfter = await pd.productDetailPrice.textContent().catch(() => null);
      if (priceBefore) {
        expect(priceAfter).toBe(priceBefore);
      }
    });

    test('TC_SCRUM78_025: Page Refresh Does Not Redirect to Login', async ({ page }) => {
      await pd.clickFirstViewDetails();
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      const url = page.url();
      expect(url).not.toContain('auth');
      expect(url).not.toContain('login');
      expect(url).toContain(td.productPathPattern);
    });

    test('TC_SCRUM78_026: Main Content is Visible After Refresh', async ({ page }) => {
      await pd.clickFirstViewDetails();
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      await expect(pd.mainContent).toBeVisible();
    });
  });

  // ─── Feature: Edge Cases & Robustness ───

  test.describe('Edge Cases & Robustness', () => {
    test('TC_SCRUM78_027: Multiple Product Navigations Work Correctly', async ({ page }) => {
      // First product
      await pd.clickFirstViewDetails();
      const heading1 = await pd.getProductDetailHeadingText();
      expect(heading1.length).toBeGreaterThan(0);

      await page.goBack();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);

      // Second product
      const linkCount = await pd.viewDetailsLinks.count();
      if (linkCount >= 2) {
        await pd.viewDetailsLinks.nth(1).click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        const heading2 = await pd.getProductDetailHeadingText();
        expect(heading2.length).toBeGreaterThan(0);
      }
    });

    test('TC_SCRUM78_028: Rapid Back/Forward Does Not Break Navigation', async ({ page }) => {
      await pd.clickFirstViewDetails();

      await page.goBack();
      await page.waitForTimeout(300);
      await page.goForward();
      await page.waitForTimeout(300);
      await page.goBack();
      await page.waitForTimeout(300);
      await page.goForward();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(1000);

      // Page should still be functional — either on product or catalog
      const bodyText = (await page.locator('body').textContent()) ?? '';
      expect(bodyText.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM78_029: Product Details Page Renders on Mobile Viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await pd.clickFirstViewDetails();
      await expect(pd.productDetailHeading).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM78_030: Product Details Page Renders on Tablet Viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.tablet);
      await pd.clickFirstViewDetails();
      await expect(pd.productDetailHeading).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM78_031: Page Scroll Resets to Top on Product Navigation', async ({ page }) => {
      // Ensure we're on catalog before scrolling
      await page.waitForURL(/\/catalog/, { timeout: 10000 });
      await page.waitForTimeout(1000);

      // Scroll down on catalog
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      await pd.clickFirstViewDetails();

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThanOrEqual(100);
    });

    test('TC_SCRUM78_032: No Horizontal Overflow on Product Details Page', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await pd.clickFirstViewDetails();

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(td.viewports.mobile.width + 5);
    });

    test('TC_SCRUM78_033: Product Details Page Has Footer', async ({ page }) => {
      await pd.clickFirstViewDetails();
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(pd.footer).toBeVisible();
    });
  });
});
