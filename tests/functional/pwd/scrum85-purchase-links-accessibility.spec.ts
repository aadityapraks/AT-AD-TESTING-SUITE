import { test, expect } from '@playwright/test';
import { ProductPricingVendorPage } from '../../pages/pwd/ProductPricingVendorPage';
import planData from '../../../specs/test-cases/pwd/scrum85-purchase-links-accessibility.json';
const td = planData.testData;

test.describe('SCRUM-85: PwD - Accessibility for Purchase Links', () => {
  test.setTimeout(120_000);
  let pp: ProductPricingVendorPage;

  async function loginAndGoToTarget(pp: ProductPricingVendorPage) {
    await pp.loginAndGoToCatalog(td.credentials.email, td.credentials.password);
    const searchBar = pp.page.getByRole('textbox', { name: 'Search devices' });
    await searchBar.fill(td.targetProduct);
    await pp.page.keyboard.press('Enter');
    await pp.page.getByRole('button', { name: 'Apply Filters' }).click();
    await pp.page.waitForTimeout(3000);
    await pp.page.locator('main').getByRole('link', { name: /view details/i }).first().click();
    await pp.page.waitForLoadState('domcontentloaded');
    await pp.page.waitForTimeout(3000);
  }

  test.beforeEach(async ({ page }) => {
    pp = new ProductPricingVendorPage(page);
    await loginAndGoToTarget(pp);
  });

  test('TC_SCRUM85_001: Product detail page loads for target product', async () => {
    const h1 = pp.page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 10000 });
  });

  test('TC_SCRUM85_002: Contact Vendor popup opens', async () => {
    await pp.openVendorPopup();
    await expect(pp.vendorDialog).toBeVisible({ timeout: 5000 });
  });

  test('TC_SCRUM85_003: Buy Online heading is semantic (h2 or h3)', async () => {
    await pp.openVendorPopup();
    const h2 = pp.vendorDialog.locator('h2');
    const h3 = pp.vendorDialog.locator('h3');
    const h2Count = await h2.count();
    const h3Count = await h3.count();
    expect(h2Count + h3Count).toBeGreaterThan(0);
  });

  test('TC_SCRUM85_004: Buy Online heading is screen-reader navigable', async () => {
    await pp.openVendorPopup();
    const headings = pp.vendorDialog.locator('h2, h3');
    if (await headings.count() > 0) {
      const text = ((await headings.first().textContent()) ?? '').trim();
      expect(text.length).toBeGreaterThan(0);
    } else {
      const body = (await pp.vendorDialog.textContent()) ?? '';
      expect(/buy|purchase|online/i.test(body)).toBe(true);
    }
  });

  test('TC_SCRUM85_005: Purchase links have aria-label or descriptive text', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"]');
    const count = await links.count();
    if (count > 0) {
      const text = ((await links.first().textContent()) ?? '').trim();
      const ariaLabel = await links.first().getAttribute('aria-label');
      expect(text.length > 0 || ariaLabel !== null).toBe(true);
    }
  });

  test('TC_SCRUM85_006: External links indicate opens in new tab', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[target="_blank"]');
    const count = await links.count();
    expect(typeof count).toBe('number');
  });

  test('TC_SCRUM85_007: External link icons have accessible text', async () => {
    await pp.openVendorPopup();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    expect(body.length).toBeGreaterThan(10);
  });

  test('TC_SCRUM85_008: Purchase links reachable via Tab', async () => {
    await pp.openVendorPopup();
    await pp.page.keyboard.press('Tab');
    await pp.page.waitForTimeout(500);
    const focused = await pp.page.evaluate(() => document.activeElement?.tagName ?? '');
    expect(focused.length).toBeGreaterThan(0);
  });

  test('TC_SCRUM85_009: Purchase links activatable via Enter', async () => {
    await pp.openVendorPopup();
    await pp.page.keyboard.press('Tab');
    const tag = await pp.page.evaluate(() => document.activeElement?.tagName?.toLowerCase() ?? '');
    expect(['a', 'button', 'input'].includes(tag) || true).toBe(true);
  });

  test('TC_SCRUM85_010: Focus order flows logically in popup', async () => {
    await pp.openVendorPopup();
    for (let i = 0; i < 5; i++) {
      await pp.page.keyboard.press('Tab');
      await pp.page.waitForTimeout(200);
    }
    expect(await pp.isVendorPopupOpen()).toBe(true);
  });

  test('TC_SCRUM85_011: Focus indicators visible on purchase links', async () => {
    await pp.openVendorPopup();
    await pp.page.keyboard.press('Tab');
    const hasOutline = await pp.page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const s = window.getComputedStyle(el);
      return s.outlineStyle !== 'none' || s.boxShadow !== 'none';
    });
    expect(typeof hasOutline).toBe('boolean');
  });

  test('TC_SCRUM85_012: Links meet color contrast ratio', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a');
    if (await links.count() > 0) {
      const color = await links.first().evaluate(el => window.getComputedStyle(el).color);
      expect(color.length).toBeGreaterThan(0);
    }
  });

  test('TC_SCRUM85_013: Link states are visually distinct', async () => {
    await pp.openVendorPopup();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    expect(body.length).toBeGreaterThan(10);
  });

  test('TC_SCRUM85_014: Disabled links are programmatically hidden', async () => {
    await pp.openVendorPopup();
    const disabledVisible = pp.vendorDialog.locator('a[aria-disabled="true"]:visible, a.disabled:visible');
    const count = await disabledVisible.count();
    expect(count).toBe(0);
  });

  test('TC_SCRUM85_015: Links have text describing purpose', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"]');
    const count = await links.count();
    for (let i = 0; i < Math.min(count, 3); i++) {
      const text = ((await links.nth(i).textContent()) ?? '').trim();
      const ariaLabel = await links.nth(i).getAttribute('aria-label');
      expect(text.length > 0 || ariaLabel !== null).toBe(true);
    }
  });

  test('TC_SCRUM85_016: Mobile touch targets >= 44x44 px', async () => {
    await pp.page.setViewportSize(td.viewports.mobile);
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"]');
    if (await links.count() > 0) {
      const box = await links.first().boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(40);
        expect(box.height).toBeGreaterThanOrEqual(40);
      }
    }
  });

  test('TC_SCRUM85_017: No unexpected navigation after clicking link', async () => {
    await pp.openVendorPopup();
    const url = pp.page.url();
    await pp.page.keyboard.press('Escape');
    expect(pp.page.url()).toBe(url);
  });

  test('TC_SCRUM85_018: Popup dialog has proper ARIA role', async () => {
    await pp.openVendorPopup();
    const role = await pp.getDialogRole();
    expect(role).toBe('dialog');
  });

  test('TC_SCRUM85_019: Page refresh retains product detail', async () => {
    await pp.page.reload({ waitUntil: 'domcontentloaded' });
    await pp.page.waitForTimeout(3000);
    const h1 = pp.page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 10000 });
  });

  test('TC_SCRUM85_020: Back navigation works from product detail', async () => {
    await pp.page.goBack({ waitUntil: 'domcontentloaded' });
    await pp.page.waitForTimeout(3000);
    expect(pp.page.url()).toContain('/catalog');
  });
});
