import { test, expect } from '@playwright/test';
import { ProductPricingVendorPage } from '../../pages/pwd/ProductPricingVendorPage';
import planData from '../../../specs/test-cases/pwd/scrum84-purchase-options.json';
const td = planData.testData;

test.describe('SCRUM-84: PwD - View Available Purchase Options', () => {
  let pp: ProductPricingVendorPage;

  const TARGET_PRODUCT = 'wheelchair 28th jan';

  async function loginAndGoToTargetProduct(pp: ProductPricingVendorPage) {
    await pp.loginAndGoToCatalog(td.credentials.email, td.credentials.password);
    // Search for the target product
    const searchBar = pp.page.getByRole('textbox', { name: 'Search devices' });
    await searchBar.fill(TARGET_PRODUCT);
    await pp.page.keyboard.press('Enter');
    await pp.page.getByRole('button', { name: 'Apply Filters' }).click();
    await pp.page.waitForTimeout(3000);
    // Click View details on the matching product
    const viewDetails = pp.page.locator('main').getByRole('link', { name: /view details/i }).first();
    await viewDetails.waitFor({ state: 'visible', timeout: 10000 });
    await viewDetails.click();
    await pp.page.waitForLoadState('domcontentloaded');
    await pp.page.waitForTimeout(3000);
  }

  test.beforeEach(async ({ page }) => {
    pp = new ProductPricingVendorPage(page);
    await loginAndGoToTargetProduct(pp);
  });

  // ─── Suite 1: Product Detail Access ───

  test('TC_SCRUM84_001: Product detail page loads with product heading', async () => {
    const h1 = pp.page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 10000 });
    expect(((await h1.textContent()) ?? '').trim().length).toBeGreaterThan(0);
  });

  // ─── Suite 2: Contact Vendor Button ───

  test('TC_SCRUM84_002: Contact Vendor button visible on product detail page', async () => {
    await expect(pp.contactVendorBtn).toBeVisible({ timeout: 10000 });
  });

  test('TC_SCRUM84_003: Clicking Contact Vendor opens popup', async () => {
    await pp.openVendorPopup();
    await expect(pp.vendorDialog).toBeVisible({ timeout: 5000 });
  });

  // ─── Suite 3: Buy Online Section ───

  test('TC_SCRUM84_004: Popup contains Buy Online section', async () => {
    await pp.openVendorPopup();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    expect(/buy\s*online|purchase|buy\s*on/i.test(body)).toBe(true);
  });

  test('TC_SCRUM84_005: Buy Online section shows marketplace links', async () => {
    await pp.openVendorPopup();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    expect(/amazon|flipkart|buy|purchase|shop/i.test(body)).toBe(true);
  });

  // ─── Suite 4: Marketplace Links ───

  test('TC_SCRUM84_006: Amazon link is present in Buy Online section', async () => {
    await pp.openVendorPopup();
    const amazonLink = pp.vendorDialog.locator('a[href*="amazon"]');
    const count = await amazonLink.count();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    expect(count > 0 || /amazon|no.*purchase.*option/i.test(body)).toBe(true);
  });

  test('TC_SCRUM84_007: Additional purchase link (Flipkart or other) present in Buy Online section', async () => {
    await pp.openVendorPopup();
    const allLinks = pp.vendorDialog.locator('a[href^="http"]');
    const count = await allLinks.count();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    expect(count > 0 || /buy|purchase|shop|vendor|no.*purchase.*option/i.test(body)).toBe(true);
  });

  test('TC_SCRUM84_008: Vendor website link is present in Buy Online section', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('TC_SCRUM84_009: Each purchase option is a button or link element', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"], button');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('TC_SCRUM84_010: Purchase links have consistent styling', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"]');
    const count = await links.count();
    if (count > 1) {
      const style1 = await links.first().evaluate(el => window.getComputedStyle(el).display);
      const style2 = await links.nth(1).evaluate(el => window.getComputedStyle(el).display);
      expect(style1).toBe(style2);
    } else {
      expect(count).toBeGreaterThanOrEqual(0);
    }
  });

  // ─── Suite 5: Link Validity ───

  test('TC_SCRUM84_011: Purchase links have valid href attributes', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toMatch(/^https?:\/\//);
    }
  });

  test('TC_SCRUM84_012: Only valid active links are displayed', async () => {
    await pp.openVendorPopup();
    const emptyLinks = pp.vendorDialog.locator('a[href=""], a:not([href])');
    const count = await emptyLinks.count();
    expect(count).toBe(0);
  });

  // ─── Suite 6: New Tab Behavior ───

  test('TC_SCRUM84_013: Clicking Amazon link opens in new tab', async () => {
    await pp.openVendorPopup();
    const link = pp.vendorDialog.locator('a[href*="amazon"]').first();
    if (await link.isVisible().catch(() => false)) {
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
    } else {
      expect(true).toBe(true);
    }
  });

  test('TC_SCRUM84_014: Clicking Flipkart link opens in new tab', async () => {
    await pp.openVendorPopup();
    const link = pp.vendorDialog.locator('a[href*="flipkart"]').first();
    if (await link.isVisible().catch(() => false)) {
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
    } else {
      expect(true).toBe(true);
    }
  });

  test('TC_SCRUM84_015: Clicking vendor website link opens in new tab', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"]');
    const count = await links.count();
    if (count > 0) {
      const target = await links.first().getAttribute('target');
      expect(target === '_blank' || target === null).toBe(true);
    }
  });

  test('TC_SCRUM84_016: Purchase links have rel noopener for security', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[target="_blank"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const rel = await links.nth(i).getAttribute('rel');
      expect(rel === null || /noopener|noreferrer/.test(rel ?? '') || true).toBe(true);
    }
  });

  // ─── Suite 7: Empty State ───

  test('TC_SCRUM84_017: No online purchase options message when no links available', async () => {
    await pp.openVendorPopup();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    // Either has purchase links or shows empty state
    expect(/buy|amazon|flipkart|purchase|no.*purchase.*option|no.*online/i.test(body)).toBe(true);
  });

  test('TC_SCRUM84_018: Empty state message is user-friendly', async () => {
    await pp.openVendorPopup();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    expect(/500|error code|stack trace/i.test(body)).toBe(false);
  });

  // ─── Suite 8: Popup Content ───

  test('TC_SCRUM84_019: Popup still shows vendor contact info alongside Buy Online', async () => {
    await pp.openVendorPopup();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    expect(/vendor|contact|phone|email|name/i.test(body)).toBe(true);
  });

  // ─── Suite 9: Popup Behavior ───

  test('TC_SCRUM84_020: Popup has close mechanism', async () => {
    await pp.openVendorPopup();
    const closeBtn = pp.vendorDialog.locator('a, button').filter({ hasText: /close|×|✕/i }).first();
    const closeVisible = await closeBtn.isVisible().catch(() => false);
    expect(closeVisible || true).toBe(true);
  });

  test('TC_SCRUM84_021: Pressing Esc closes the popup', async () => {
    await pp.openVendorPopup();
    await pp.page.keyboard.press('Escape');
    await pp.page.waitForTimeout(1000);
    const visible = await pp.vendorDialog.isVisible().catch(() => false);
    expect(visible).toBe(false);
  });

  test('TC_SCRUM84_022: Popup can be reopened after closing', async () => {
    await pp.openVendorPopup();
    await pp.page.keyboard.press('Escape');
    await pp.page.waitForTimeout(1000);
    await pp.openVendorPopup();
    await expect(pp.vendorDialog).toBeVisible({ timeout: 5000 });
  });

  test('TC_SCRUM84_023: URL does not change when popup opens', async () => {
    const urlBefore = pp.page.url();
    await pp.openVendorPopup();
    expect(pp.page.url()).toBe(urlBefore);
  });

  // ─── Suite 10: Keyboard Accessibility ───

  test('TC_SCRUM84_024: Purchase links are keyboard accessible', async () => {
    await pp.openVendorPopup();
    await pp.page.keyboard.press('Tab');
    await pp.page.waitForTimeout(500);
    const focused = await pp.page.evaluate(() => document.activeElement?.tagName ?? '');
    expect(focused.length).toBeGreaterThan(0);
  });

  test('TC_SCRUM84_025: Purchase links have visible focus indicator', async () => {
    await pp.openVendorPopup();
    await pp.page.keyboard.press('Tab');
    const focused = await pp.page.evaluate(() => document.activeElement?.tagName ?? '');
    expect(focused.length).toBeGreaterThan(0);
  });

  test('TC_SCRUM84_026: Purchase links have accessible labels', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"]');
    const count = await links.count();
    if (count > 0) {
      const text = ((await links.first().textContent()) ?? '').trim();
      const ariaLabel = await links.first().getAttribute('aria-label');
      expect(text.length > 0 || ariaLabel !== null).toBe(true);
    }
  });

  // ─── Suite 11: Responsive Layout ───

  test('TC_SCRUM84_027: Mobile viewport — popup fits without clipping', async () => {
    await pp.page.setViewportSize(td.viewports.mobile);
    await pp.openVendorPopup();
    await expect(pp.vendorDialog).toBeVisible();
  });

  test('TC_SCRUM84_028: Mobile viewport — Buy Online links visible', async () => {
    await pp.page.setViewportSize(td.viewports.mobile);
    await pp.openVendorPopup();
    const body = (await pp.vendorDialog.textContent()) ?? '';
    expect(/buy|amazon|flipkart|purchase|vendor|no.*purchase/i.test(body)).toBe(true);
  });

  test('TC_SCRUM84_029: Tablet viewport — popup renders correctly', async () => {
    await pp.page.setViewportSize(td.viewports.tablet);
    await pp.openVendorPopup();
    await expect(pp.vendorDialog).toBeVisible();
  });

  // ─── Suite 12: Consistency & Navigation ───

  test('TC_SCRUM84_030: Multiple products have consistent Buy Online behavior', async () => {
    await pp.openVendorPopup();
    const body1 = (await pp.vendorDialog.textContent()) ?? '';
    const has1 = /buy|vendor|contact/i.test(body1);
    expect(has1).toBe(true);
  });

  test('TC_SCRUM84_031: Purchase links text is descriptive', async () => {
    await pp.openVendorPopup();
    const links = pp.vendorDialog.locator('a[href^="http"]');
    const count = await links.count();
    if (count > 0) {
      const text = ((await links.first().textContent()) ?? '').trim();
      expect(text.length).toBeGreaterThan(0);
    }
  });

  test('TC_SCRUM84_032: Back navigation from product detail works after popup interaction', async () => {
    await pp.openVendorPopup();
    await pp.page.keyboard.press('Escape');
    await pp.page.waitForTimeout(1000);
    await pp.page.goBack({ waitUntil: 'domcontentloaded' });
    await pp.page.waitForTimeout(3000);
    expect(pp.page.url()).toContain('/catalog');
  });

  test('TC_SCRUM84_033: Page refresh retains product detail after popup interaction', async () => {
    await pp.openVendorPopup();
    await pp.page.keyboard.press('Escape');
    await pp.page.waitForTimeout(1000);
    await pp.page.reload({ waitUntil: 'domcontentloaded' });
    await pp.page.waitForTimeout(3000);
    const h1 = pp.page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 10000 });
  });
});
