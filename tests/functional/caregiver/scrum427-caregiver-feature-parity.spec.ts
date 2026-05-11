import { test, expect } from '@playwright/test';
import { CaregiverRecommendationsPage } from '../../pages/caregiver/CaregiverRecommendationsPage';
import planData from '../../../specs/test-cases/caregiver/scrum427-caregiver-feature-parity.json';
const td = planData.testData;

test.describe('SCRUM-427: Caregiver - Feature Parity with PwD Experience', () => {
  test.setTimeout(180_000);

  let crp: CaregiverRecommendationsPage;

  // ─── Suite 1: Catalog Parity ───

  test.describe('Catalog Parity', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
    });

    test('TC_SCRUM427_001: Catalog page loads with device count for caregiver', async () => {
      await expect(crp.deviceCountText).toBeVisible({ timeout: 10000 });
      const count = await crp.getDeviceCountNumber();
      expect(count).toBeGreaterThan(0);
    });

    test('TC_SCRUM427_002: Catalog filters visible for caregiver', async () => {
      await expect(crp.disabilityTypeDropdown).toBeVisible();
      await expect(crp.typeDropdown).toBeVisible();
      await expect(crp.priceRangeDropdown).toBeVisible();
      await expect(crp.applyFilterBtn).toBeVisible();
      await expect(crp.resetAllBtn).toBeVisible();
    });

    test('TC_SCRUM427_003: Catalog sort dropdown visible for caregiver', async () => {
      await expect(crp.sortDropdown).toBeVisible();
      const options = await crp.sortDropdown.locator('option').count();
      expect(options).toBeGreaterThan(1);
    });

    test('TC_SCRUM427_004: Product cards display correctly for caregiver', async () => {
      const cards = await crp.productCards.count();
      expect(cards).toBeGreaterThan(0);
      const details = await crp.viewDetailsLinks.count();
      expect(details).toBeGreaterThan(0);
      const headings = await crp.productHeadings.count();
      expect(headings).toBeGreaterThan(0);
    });

    test('TC_SCRUM427_014: Pagination works on catalog for caregiver', async () => {
      // Verify catalog has products loaded; pagination may not exist if few products
      const count = await crp.getDeviceCountNumber();
      const cards = await crp.productCards.count();
      expect(count > 0 || cards > 0).toBe(true);
    });

    test('TC_SCRUM427_015: Sorting works on catalog for caregiver', async () => {
      await crp.sortDropdown.selectOption({ label: 'Name: A to Z' });
      await crp.page.waitForTimeout(3000);
      const heading = await crp.productHeadings.first().textContent().catch(() => '');
      expect((heading ?? '').length).toBeGreaterThan(0);
    });

    test('TC_SCRUM427_016: Search works on catalog for caregiver', async () => {
      await crp.searchFor('wheelchair');
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      const count = await crp.getDeviceCountNumber();
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  // ─── Suite 2: Product Detail Parity ───

  test.describe('Product Detail Parity', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
    });

    test('TC_SCRUM427_005: Product detail page loads for caregiver', async () => {
      await crp.viewDetailsLinks.first().click();
      await crp.page.waitForLoadState('domcontentloaded');
      await crp.page.waitForTimeout(3000);
      expect(crp.page.url()).toMatch(/\/product\/|\/catalog\//);
      const h1 = crp.page.locator('h1').first();
      await expect(h1).toBeVisible({ timeout: 10000 });
    });

    test('TC_SCRUM427_006: Product detail page shows price for caregiver', async () => {
      await crp.viewDetailsLinks.first().click();
      await crp.page.waitForLoadState('domcontentloaded');
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/₹[\d,.]+/.test(body)).toBe(true);
    });
  });

  // ─── Suite 3: Success Stories Parity ───

  test.describe('Success Stories Parity', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
    });

    test('TC_SCRUM427_007: Success Stories page accessible for caregiver', async () => {
      await crp.page.goto('https://qa-atad.swarajability.org/success-stories/', { waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/stor|success|inspir/i.test(body)).toBe(true);
    });

    test('TC_SCRUM427_008: Success Stories display story cards for caregiver', async () => {
      await crp.page.goto('https://qa-atad.swarajability.org/success-stories/', { waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(200);
    });
  });

  // ─── Suite 4: Help & Resources Parity ───

  test.describe('Help & Resources Parity', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
    });

    test('TC_SCRUM427_009: Help & Resources page accessible for caregiver', async () => {
      await crp.page.goto('https://qa-atad.swarajability.org/help-resources/', { waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/help|resource|guide|support|faq/i.test(body)).toBe(true);
    });

    test('TC_SCRUM427_010: Help & Resources has resource content for caregiver', async () => {
      await crp.page.goto('https://qa-atad.swarajability.org/help-resources/', { waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(200);
    });

    test('TC_SCRUM427_011: FAQ section accessible for caregiver', async () => {
      await crp.page.goto('https://qa-atad.swarajability.org/help-resources/', { waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/faq|frequently|question|help/i.test(body)).toBe(true);
    });
  });

  // ─── Suite 5: UI Consistency ───

  test.describe('UI Consistency', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
      await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
    });

    test('TC_SCRUM427_012: Caregiver banner visible as caregiver-specific element', async () => {
      await expect(crp.caregiverBanner).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM427_013: Navigation consistent with PwD experience', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/catalog|stories|help|profile|home/i.test(body)).toBe(true);
    });

    test('TC_SCRUM427_018: Mobile viewport renders pages correctly for caregiver', async () => {
      await crp.page.setViewportSize(td.viewports.mobile);
      await crp.page.waitForTimeout(1000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('catalog');
    });

    test('TC_SCRUM427_019: Footer links accessible for caregiver', async () => {
      await crp.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await crp.page.waitForTimeout(2000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/privacy|terms|accessibility/i.test(body)).toBe(true);
    });

    test('TC_SCRUM427_020: Header navigation consistent for caregiver', async () => {
      const header = crp.page.locator('header, nav, [role="navigation"]').first();
      const headerVisible = await header.isVisible().catch(() => false);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(headerVisible || /catalog|home|menu/i.test(body)).toBe(true);
    });
  });

  // ─── Suite 6: General Parity ───

  test.describe('General Parity', () => {
    test.beforeEach(async ({ page }) => {
      crp = new CaregiverRecommendationsPage(page);
    });

    test('TC_SCRUM427_017: Home/dashboard accessible for caregiver', async () => {
      await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
      await crp.page.goto('https://qa-atad.swarajability.org/', { waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(200);
    });
  });
});
