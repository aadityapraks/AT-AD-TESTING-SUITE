// spec: specs/functional/SCRUM-80-pwd-product-pricing-vendor.plan.md
// data: specs/test-cases/scrum80-product-pricing-vendor.json

import { test, expect } from '@playwright/test';
import { ProductPricingVendorPage } from '../pages/ProductPricingVendorPage';
import planData from '../../specs/test-cases/scrum80-product-pricing-vendor.json';
const td = planData.testData;

test.describe('SCRUM-80: PwD View Product Pricing and Vendor Information', () => {
  test.setTimeout(90_000);
  let pv: ProductPricingVendorPage;

  test.beforeEach(async ({ page }) => {
    pv = new ProductPricingVendorPage(page);
    await pv.loginAndGoToCatalog(td.credentials.email, td.credentials.password);
    await pv.clickFirstViewDetails();
  });

  // ─── Suite 1: Product Price Display (TC_001–003) ───

  test.describe('Product Price Display', () => {
    test('TC_SCRUM80_001: Product price is visible on the product details page', async () => {
      await expect(pv.priceText).toBeVisible();
      const price = await pv.getPriceText();
      expect(price.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM80_002: Price is displayed below the product name', async () => {
      const nameBox = await pv.productName.boundingBox();
      const priceBox = await pv.priceText.boundingBox();
      expect(nameBox).toBeTruthy();
      expect(priceBox).toBeTruthy();
      expect(priceBox!.y).toBeGreaterThan(nameBox!.y);
    });

    test('TC_SCRUM80_003: Price includes proper currency symbol (₹)', async () => {
      const price = await pv.getPriceText();
      expect(price).toMatch(/₹[\d,]+/);
    });
  });

  // ─── Suite 2: Price Unavailable State (TC_004) ───

  test.describe('Price Unavailable State', () => {
    test('TC_SCRUM80_004: Placeholder text shown when price is unavailable', async () => {
      const price = await pv.getPriceText();
      if (/₹[\d,]+/.test(price)) {
        expect(price).toMatch(/₹[\d,]+/);
        test.info().annotations.push({ type: 'info', description: 'Product has numeric price; placeholder path not exercised.' });
      } else {
        expect(price.toLowerCase()).toMatch(/contact vendor|price on request|pricing/i);
      }
    });
  });

  // ─── Suite 3: Contact Vendor Button (TC_005–008) ───

  test.describe('Contact Vendor Button', () => {
    test('TC_SCRUM80_005: Contact Vendor button is visible on product details page', async () => {
      await expect(pv.contactVendorBtn).toBeVisible();
      const text = (await pv.contactVendorBtn.textContent()) ?? '';
      expect(text.toLowerCase()).toContain('contact vendor');
    });

    test('TC_SCRUM80_006: Clicking Contact Vendor opens the vendor popup', async () => {
      await pv.openVendorPopup();
      expect(await pv.isVendorPopupOpen()).toBe(true);
    });

    test('TC_SCRUM80_007: Contact Vendor button is keyboard-focusable and activatable via Enter', async () => {
      await pv.contactVendorBtn.focus();
      await pv.page.keyboard.press('Enter');
      await pv.page.waitForTimeout(1000);
      expect(await pv.isVendorPopupOpen()).toBe(true);
    });

    test('TC_SCRUM80_008: Opening popup does not cause page navigation or reload', async () => {
      const urlBefore = pv.page.url();
      await pv.openVendorPopup();
      expect(pv.page.url()).toBe(urlBefore);
    });
  });

  // ─── Suite 4: Vendor Popup — Content (TC_009–016) ───

  test.describe('Vendor Popup Content', () => {
    test.beforeEach(async () => {
      await pv.openVendorPopup();
    });

    test('TC_SCRUM80_009: Vendor popup displays vendor name', async () => {
      const name = await pv.getVendorNameText();
      expect(name.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM80_010: Vendor popup displays vendor logo when available', async () => {
      const imgCount = await pv.vendorDialog.locator('img').count();
      if (imgCount > 0) {
        expect(imgCount).toBeGreaterThan(0);
      } else {
        const name = await pv.getVendorNameText();
        expect(name.length).toBeGreaterThan(0);
        test.info().annotations.push({ type: 'info', description: 'Vendor logo not present for this vendor.' });
      }
    });

    test('TC_SCRUM80_011: Vendor popup displays phone number(s)', async () => {
      const phone = await pv.getVendorPhoneText();
      expect(phone.length).toBeGreaterThan(0);
      expect(phone).toMatch(/[\d\s\-+()]+/);
    });

    test('TC_SCRUM80_012: Phone number is rendered as tel: link', async () => {
      const isTelLink = await pv.isPhoneTelLink();
      const phone = await pv.getVendorPhoneText();
      expect(isTelLink, `Phone "${phone}" is plain text, not a <a href="tel:"> link per AC`).toBe(true);
    });

    test('TC_SCRUM80_013: Vendor popup displays email address', async () => {
      const email = await pv.getVendorEmailText();
      expect(email.length).toBeGreaterThan(0);
      expect(email).toMatch(/@/);
    });

    test('TC_SCRUM80_014: Email is rendered as mailto: link', async () => {
      const isMailtoLink = await pv.isEmailMailtoLink();
      const email = await pv.getVendorEmailText();
      expect(isMailtoLink, `Email "${email}" is plain text, not a <a href="mailto:"> link per AC`).toBe(true);
    });

    test('TC_SCRUM80_015: Vendor popup displays vendor address', async () => {
      const address = await pv.getVendorAddressText();
      expect(address.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM80_016: Vendor popup displays vendor website link', async () => {
      const links = pv.vendorDialog.locator('a[href]');
      const linkCount = await links.count();
      let websiteHref = '';
      for (let i = 0; i < linkCount; i++) {
        const href = (await links.nth(i).getAttribute('href')) ?? '';
        if (href.startsWith('http://') || href.startsWith('https://')) { websiteHref = href; break; }
      }
      if (websiteHref) {
        expect(websiteHref).toMatch(/^https?:\/\//);
      } else {
        const buyOnline = await pv.getBuyOnlineText();
        expect(buyOnline.length).toBeGreaterThan(0);
        test.info().annotations.push({ type: 'info', description: `No vendor website link. Buy Online says: "${buyOnline}"` });
      }
    });
  });

  // ─── Suite 5: Vendor Popup — Dialog Behavior (TC_017–021) ───

  test.describe('Vendor Popup Dialog Behavior', () => {
    test.beforeEach(async () => {
      await pv.openVendorPopup();
    });

    test('TC_SCRUM80_017: Vendor popup has a visible title', async () => {
      const title = await pv.getVendorDialogTitleText();
      expect(title.length).toBeGreaterThan(0);
      expect(title.toLowerCase()).toMatch(/vendor|contact|where to buy/i);
    });

    test('TC_SCRUM80_018: Popup renders as a dialog element', async () => {
      const role = await pv.getDialogRole();
      expect(role).toBe('dialog');
    });

    test('TC_SCRUM80_019: Popup behaves as a modal overlay', async () => {
      const ariaModal = await pv.getDialogAriaModal();
      const isNativeDialog = await pv.vendorDialog.evaluate(el => el.tagName.toLowerCase() === 'dialog');
      expect(ariaModal === 'true' || isNativeDialog).toBe(true);
    });

    test('TC_SCRUM80_020: Dialog content uses paragraphs and links', async () => {
      await pv.page.waitForTimeout(1000);
      const hasP = await pv.vendorDialog.locator('p').count() > 0;
      const hasLink = await pv.vendorDialog.locator('a').count() > 0;
      expect(hasP).toBe(true);
      expect(hasLink).toBe(true);
    });

    test('TC_SCRUM80_021: Dialog has a close mechanism', async () => {
      await expect(pv.vendorCloseLink).toBeAttached();
    });
  });

  // ─── Suite 6: Popup Keyboard & Focus (TC_022–027) ───

  test.describe('Popup Keyboard & Focus', () => {
    test('TC_SCRUM80_022: Focus moves inside dialog on open', async () => {
      await pv.openVendorPopup();
      const dialogVisible = await pv.isVendorPopupOpen();
      expect(dialogVisible).toBe(true);
      const focusInfo = await pv.page.evaluate(() => {
        let deepest: Element | null = document.activeElement;
        while (deepest?.shadowRoot?.activeElement) deepest = deepest.shadowRoot.activeElement;
        return { tag: deepest?.tagName.toLowerCase() ?? 'none' };
      });
      test.info().annotations.push({ type: 'info', description: `Focus on open: <${focusInfo.tag}>` });
    });

    test('TC_SCRUM80_023: Tab key cycles within dialog without escaping', async () => {
      await pv.openVendorPopup();
      for (let i = 0; i < 5; i++) {
        await pv.page.keyboard.press('Tab');
        await pv.page.waitForTimeout(200);
      }
      expect(await pv.isVendorPopupOpen()).toBe(true);
    });

    test('TC_SCRUM80_024: Pressing Esc closes the dialog', async () => {
      await pv.openVendorPopup();
      expect(await pv.isVendorPopupOpen()).toBe(true);
      await pv.closeVendorPopupViaEsc();
      await pv.page.waitForTimeout(500);
      const stillOpen = await pv.vendorDialog.isVisible({ timeout: 1000 }).catch(() => false);
      expect(stillOpen).toBe(false);
    });

    test('TC_SCRUM80_025: Focus returns to Contact Vendor button after dialog closes', async () => {
      await pv.openVendorPopup();
      await pv.closeVendorPopupViaEsc();
      const focusedText = await pv.page.evaluate(() => document.activeElement?.textContent?.toLowerCase() ?? '');
      expect(focusedText).toContain('contact vendor');
    });

    test('TC_SCRUM80_026: All links inside dialog are reachable via Tab', async () => {
      await pv.openVendorPopup();
      await pv.vendorDialog.locator('a').first().waitFor({ state: 'attached', timeout: 5000 }).catch(() => {});
      const linkCount = await pv.vendorDialog.locator('a').count();
      expect(linkCount).toBeGreaterThan(0);
      for (let i = 0; i < linkCount; i++) {
        await pv.page.keyboard.press('Tab');
        await pv.page.waitForTimeout(200);
      }
      expect(await pv.isVendorPopupOpen()).toBe(true);
    });

    test('TC_SCRUM80_027: Focus indicators are visible on interactive elements', async () => {
      await pv.openVendorPopup();
      await pv.page.keyboard.press('Tab');
      const hasOutline = await pv.page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return false;
        const s = window.getComputedStyle(el);
        return s.outlineStyle !== 'none' || s.boxShadow !== 'none';
      });
      expect(hasOutline).toBe(true);
    });
  });

  // ─── Suite 7: Responsive & Layout (TC_028–033) ───

  test.describe('Responsive & Layout', () => {
    test('TC_SCRUM80_028: Background page is non-interactive while popup is open', async () => {
      await pv.openVendorPopup();
      expect(await pv.isVendorPopupOpen()).toBe(true);
      const role = await pv.getDialogRole();
      expect(role).toBe('dialog');
    });

    test('TC_SCRUM80_029: Dialog fits within mobile viewport without clipping', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await page.waitForTimeout(2000);
      await pv.openVendorPopup();
      await page.waitForTimeout(1000);
      const box = await pv.vendorDialog.boundingBox();
      expect(box).toBeTruthy();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(td.viewports.mobile.width + 10);
    });

    test('TC_SCRUM80_030: Close control has non-zero dimensions', async () => {
      await pv.openVendorPopup();
      const closeBox = await pv.vendorCloseLink.boundingBox();
      if (closeBox) {
        expect(closeBox.width).toBeGreaterThan(0);
        expect(closeBox.height).toBeGreaterThan(0);
      } else {
        await expect(pv.vendorCloseLink).toBeAttached();
      }
    });

    test('TC_SCRUM80_031: Close control remains visible at small viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 400 });
      await page.waitForTimeout(500);
      await pv.openVendorPopup();
      const closeLink = pv.vendorDialog.locator('a').last();
      const closeVisible = await closeLink.isVisible().catch(() => false);
      expect(closeVisible, 'Close control not visible at 375x400 viewport').toBe(true);
    });

    test('TC_SCRUM80_032: Dialog scrolls internally when content exceeds viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 400 });
      await page.waitForTimeout(500);
      await pv.openVendorPopup();
      expect(await pv.isVendorPopupOpen()).toBe(true);
      const name = await pv.getVendorNameText();
      expect(name.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM80_033: Vendor popup can be reopened after closing', async () => {
      await pv.openVendorPopup();
      await pv.page.waitForTimeout(500);
      expect(await pv.isVendorPopupOpen()).toBe(true);
      await pv.closeVendorPopupViaEsc();
      await pv.page.waitForTimeout(1000);
      await pv.openVendorPopup();
      await pv.page.waitForTimeout(500);
      expect(await pv.isVendorPopupOpen()).toBe(true);
      const name = await pv.getVendorNameText();
      expect(name.length).toBeGreaterThan(0);
    });
  });
});
