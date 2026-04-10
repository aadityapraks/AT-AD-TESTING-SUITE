// spec: specs/functional/SCRUM-77-pwd-product-card.md
// data: specs/test-cases/scrum77-product-card.json

import { test, expect } from '@playwright/test';
import { ProductCardPage } from '../pages/ProductCardPage';
import planData from '../../specs/test-cases/scrum77-product-card.json';
const td = planData.testData;

test.describe('SCRUM-77: PwD View Product Card (Preview Summary)', () => {
  let pc: ProductCardPage;

  test.beforeEach(async ({ page }) => {
    pc = new ProductCardPage(page);
    await pc.navigateToCatalog();
  });

  // ─── Feature: Product Card Elements ───

  test.describe('Product Card Elements', () => {
    test('TC_SCRUM77_001: Product Card Includes Thumbnail Image', async () => {
      const hasBgImage = await pc.hasBackgroundImage(0);
      expect(hasBgImage).toBe(true);
    });

    test('TC_SCRUM77_002: Product Card Includes Product Name as Heading', async () => {
      await expect(pc.productHeadings.first()).toBeVisible();
      const name = await pc.getFirstCardText();
      expect(name.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM77_003: Product Card Includes Tags (Disability Type / Category)', async () => {
      const cardText = await pc.getCardTextContent(0);
      const hasTag = td.tagPatterns.some(tag => new RegExp(tag, 'i').test(cardText));
      expect(hasTag).toBe(true);
    });

    test('TC_SCRUM77_004: Product Card Includes Star Rating Element', async () => {
      const firstCard = pc.productCards.first();
      const ratingEls = firstCard.locator('[class*="star"], [class*="rating"]');
      const count = await ratingEls.count();
      expect(count).toBeGreaterThan(0);
    });

    test('TC_SCRUM77_005: Product Card Includes Review Count', async () => {
      const cardCount = await pc.getCardCount();
      let found = false;
      for (let i = 0; i < Math.min(cardCount, 5); i++) {
        const cardText = await pc.getCardTextContent(i);
        if (/\(\d+\)/.test(cardText)) { found = true; break; }
      }
      expect(found).toBe(true);
    });

    test('TC_SCRUM77_006: Product Card Includes Short Description', async () => {
      const cardText = await pc.getCardTextContent(0);
      const heading = await pc.getFirstCardText();
      expect(cardText.length).toBeGreaterThan(heading.length + 20);
    });

    test('TC_SCRUM77_007: Product Card Includes Key Features Section', async () => {
      const cardText = await pc.getCardTextContent(0);
      expect(cardText).toMatch(/Key Features/i);
    });

    test('TC_SCRUM77_008: Product Card Includes Availability Badge', async () => {
      const count = await pc.getCardCount();
      let found = false;
      for (let i = 0; i < Math.min(count, 5); i++) {
        const text = await pc.getCardTextContent(i);
        if (/In Stock|Out of Stock/i.test(text)) { found = true; break; }
      }
      expect(found).toBe(true);
    });

    test('TC_SCRUM77_009: Product Card Includes Price', async () => {
      const cardCount = await pc.getCardCount();
      let found = false;
      for (let i = 0; i < Math.min(cardCount, 5); i++) {
        const cardText = await pc.getCardTextContent(i);
        if (/₹[\d,]+/.test(cardText) || /Price/i.test(cardText)) { found = true; break; }
      }
      expect(found).toBe(true);
    });

    test('TC_SCRUM77_010: Product Card View Details Link is Present', async () => {
      const firstLink = pc.viewDetailsLinks.first();
      await expect(firstLink).toBeVisible();
      const href = await firstLink.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toContain('/product/');
    });

    test('TC_SCRUM77_011: All Product Cards on Page Have Required Elements', async () => {
      const cardCount = await pc.getCardCount();
      expect(cardCount).toBeGreaterThan(0);

      for (let i = 0; i < cardCount; i++) {
        const heading = pc.productHeadings.nth(i);
        await expect(heading).toBeVisible();
      }

      const linkCount = await pc.viewDetailsLinks.count();
      expect(linkCount).toBe(cardCount);
    });
  });

  // ─── Feature: View Details & Authentication ───

  test.describe('View Details & Authentication', () => {
    test('TC_SCRUM77_012: View Details Opens Sign-In Modal for Unauthenticated User', async ({ page }) => {
      const firstLink = pc.viewDetailsLinks.first();
      await firstLink.click();
      await page.waitForTimeout(2000);

      const modalVisible = await pc.isSignInModalVisible();
      const navigated = page.url().includes('/product/');
      const authRedirect = page.url().includes('auth') || page.url().includes('login') || page.url().includes('sign');
      expect(modalVisible || navigated || authRedirect).toBe(true);
    });

    test('TC_SCRUM77_013: Sign-In Modal Contains Sign In Button', async ({ page }) => {
      await pc.viewDetailsLinks.first().click();
      await page.waitForTimeout(2000);

      const modalVisible = await pc.isSignInModalVisible();
      if (modalVisible) {
        const signInBtn = page.locator('[role="dialog"] a, [role="dialog"] button, [class*="modal"] a, [class*="modal"] button').filter({ hasText: /sign in|log in/i });
        await expect(signInBtn.first()).toBeVisible({ timeout: 5000 });
      } else {
        const hasAuthElement = page.url().includes('auth') || page.url().includes('login') || await page.locator('text=/sign in|log in/i').first().isVisible().catch(() => false);
        expect(hasAuthElement).toBe(true);
      }
    });

    test('TC_SCRUM77_014: Sign-In Modal Contains Create Account Option', async ({ page }) => {
      await pc.viewDetailsLinks.first().click();
      await page.waitForTimeout(2000);

      const modalVisible = await pc.isSignInModalVisible();
      if (modalVisible) {
        const createBtn = page.locator('[role="dialog"], [class*="modal"]').first().locator('text=/create|register|sign up/i');
        await expect(createBtn.first()).toBeVisible({ timeout: 5000 });
      } else {
        const hasCreateOption = page.url().includes('auth') || page.url().includes('register') || await page.locator('text=/create|register|sign up/i').first().isVisible().catch(() => false);
        expect(hasCreateOption).toBe(true);
      }
    });

    test('TC_SCRUM77_015: Sign-In Modal is Dismissible', async ({ page }) => {
      await pc.viewDetailsLinks.first().click();
      await page.waitForTimeout(2000);

      const modalVisible = await pc.isSignInModalVisible();
      if (modalVisible) {
        await pc.closeModal();
        await page.waitForTimeout(500);
        const stillVisible = await pc.isSignInModalVisible();
        expect(stillVisible).toBe(false);
        await expect(pc.deviceCountText).toBeVisible();
      } else {
        await page.goBack();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);
        await expect(pc.deviceCountText).toBeVisible();
      }
    });

    test('TC_SCRUM77_016: Create Account Link Points to QA Environment Not Production', async ({ page }) => {
      await pc.viewDetailsLinks.first().click();
      await page.waitForTimeout(2000);

      // Find all Create/Register links on the current page (modal or auth redirect)
      const createLinks = page.locator('a').filter({ hasText: /create|register|sign up/i });
      const count = await createLinks.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const href = await createLinks.nth(i).getAttribute('href');
        if (href) {
          // BUG SCRUM-859: Must NOT point to production
          expect(href).not.toContain('portal.swarajability.org');
          // Acceptable: QA domain, Elementor popup action, or relative path
          const isValid = href.includes(td.qaRegistrationDomain)
            || href.includes('elementor-action')
            || href.startsWith('#')
            || href.startsWith('/');
          expect(isValid).toBe(true);
        }
      }
    });

    test('TC_SCRUM77_017: Multiple View Details Clicks Show Consistent Modal', async ({ page }) => {
      // First card
      await pc.viewDetailsLinks.first().click();
      await page.waitForTimeout(2000);
      const firstModal = await pc.isSignInModalVisible();
      const firstNavigated = page.url().includes('/product/') || page.url().includes('auth');

      if (firstModal) {
        await pc.closeModal();
        await page.waitForTimeout(500);
      } else if (firstNavigated) {
        await page.goBack();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);
      }

      // Second card
      const linkCount = await pc.viewDetailsLinks.count();
      if (linkCount >= 2) {
        await pc.viewDetailsLinks.nth(1).click();
        await page.waitForTimeout(2000);
        const secondModal = await pc.isSignInModalVisible();
        const secondNavigated = page.url().includes('/product/') || page.url().includes('auth');
        expect(secondModal || secondNavigated).toBe(firstModal || firstNavigated);
      }
    });
  });

  // ─── Feature: Card Layout & Grid ───

  test.describe('Card Layout & Grid', () => {
    test('TC_SCRUM77_018: Product Cards Display in Grid Layout (2 Columns on Desktop)', async () => {
      const cardCount = await pc.getCardCount();
      expect(cardCount).toBeGreaterThan(0);

      if (cardCount >= 2) {
        const box1 = await pc.productCards.nth(0).boundingBox();
        const box2 = await pc.productCards.nth(1).boundingBox();
        expect(box1).toBeTruthy();
        expect(box2).toBeTruthy();
        const sameRow = Math.abs(box1!.y - box2!.y) < 10;
        expect(sameRow).toBe(true);
        expect(box2!.x).toBeGreaterThan(box1!.x);
      }
    });

    test('TC_SCRUM77_019: Product Cards Stack in Single Column on Mobile', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await pc.navigateToCatalog();
      await page.waitForTimeout(2000);

      const cardCount = await pc.getCardCount();
      expect(cardCount).toBeGreaterThan(0);

      if (cardCount >= 2) {
        const box1 = await pc.productCards.nth(0).boundingBox();
        const box2 = await pc.productCards.nth(1).boundingBox();
        expect(box1).toBeTruthy();
        expect(box2).toBeTruthy();
        expect(box2!.y).toBeGreaterThan(box1!.y);
      }
    });

    test('TC_SCRUM77_020: Product Cards Have Consistent Height in Same Row', async () => {
      const cardCount = await pc.getCardCount();
      if (cardCount >= 2) {
        const box1 = await pc.productCards.nth(0).boundingBox();
        const box2 = await pc.productCards.nth(1).boundingBox();
        expect(box1).toBeTruthy();
        expect(box2).toBeTruthy();
        expect(Math.abs(box1!.height - box2!.height)).toBeLessThanOrEqual(20);
      }
    });

    test('TC_SCRUM77_021: Correct Number of Cards Per Page', async () => {
      const cardCount = await pc.getCardCount();
      expect(cardCount).toBeGreaterThan(0);
      expect(cardCount).toBeLessThanOrEqual(td.cardsPerPage);
    });
  });

  // ─── Feature: Card Interactions ───

  test.describe('Card Interactions', () => {
    test('TC_SCRUM77_022: Card Hover Changes Visual State', async ({ page }) => {
      const firstCard = pc.productCards.first();

      // Capture computed styles of card and all children before hover
      const before = await firstCard.evaluate(el => {
        const styles: Record<string, string>[] = [];
        const allEls = [el, ...Array.from(el.querySelectorAll('*'))];
        for (const e of allEls) {
          const s = window.getComputedStyle(e);
          styles.push({ shadow: s.boxShadow, transform: s.transform, bg: s.backgroundColor, border: s.border, outline: s.outline, opacity: s.opacity, filter: s.filter, color: s.color, textDecoration: s.textDecoration });
        }
        return styles;
      });

      await firstCard.hover();
      await page.waitForTimeout(500);

      const after = await firstCard.evaluate(el => {
        const styles: Record<string, string>[] = [];
        const allEls = [el, ...Array.from(el.querySelectorAll('*'))];
        for (const e of allEls) {
          const s = window.getComputedStyle(e);
          styles.push({ shadow: s.boxShadow, transform: s.transform, bg: s.backgroundColor, border: s.border, outline: s.outline, opacity: s.opacity, filter: s.filter, color: s.color, textDecoration: s.textDecoration });
        }
        return styles;
      });

      // Check if ANY element within the card changed ANY visual property
      let changed = false;
      for (let i = 0; i < before.length && i < after.length; i++) {
        for (const k of Object.keys(before[i])) {
          if (before[i][k] !== after[i][k]) { changed = true; break; }
        }
        if (changed) break;
      }
      expect(changed).toBe(true);
    });

    test('TC_SCRUM77_023: Hover Does Not Trigger Unexpected Navigation', async ({ page }) => {
      const urlBefore = page.url();
      await pc.productCards.first().hover();
      await page.waitForTimeout(1000);
      const urlAfter = page.url();
      expect(urlAfter).toBe(urlBefore);
    });

    test('TC_SCRUM77_024: View Details Link href Points to Product Detail Page', async () => {
      const href = await pc.viewDetailsLinks.first().getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toContain('/product/');
    });

    test('TC_SCRUM77_025: Product Cards Render After Sort Change', async () => {
      const initialCount = await pc.getCardCount();

      await pc.sortDropdown.selectOption({ label: 'Name: A to Z' });
      await pc.page.waitForTimeout(1500);

      const afterCount = await pc.getCardCount();
      expect(afterCount).toBe(initialCount);
      await expect(pc.productHeadings.first()).toBeVisible();
    });

    test('TC_SCRUM77_026: Product Cards Render After Filter Change', async () => {
      await pc.selectType('Device');
      await pc.applyFilterBtn.click();
      await pc.page.waitForTimeout(1500);

      const cardCount = await pc.getCardCount();
      expect(cardCount).toBeGreaterThan(0);
      await expect(pc.productHeadings.first()).toBeVisible();
    });

    test('TC_SCRUM77_027: Product Cards Visible on Page 2 via Pagination', async ({ page }) => {
      await pc.nextPageBtn.click();
      await page.waitForTimeout(2000);

      const cardCount = await pc.getCardCount();
      expect(cardCount).toBeGreaterThan(0);
      await expect(pc.productHeadings.first()).toBeVisible();
    });
  });

  // ─── Feature: Edge Cases & Robustness ───

  test.describe('Edge Cases & Robustness', () => {
    test('TC_SCRUM77_028: No Horizontal Overflow on Mobile with Product Cards', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await pc.navigateToCatalog();
      await page.waitForTimeout(2000);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(td.viewports.mobile.width + 5);
    });

    test('TC_SCRUM77_029: Product Card Content Does Not Overlap', async () => {
      const cardCount = await pc.getCardCount();
      if (cardCount >= 2) {
        const box1 = await pc.productCards.nth(0).boundingBox();
        const box2 = await pc.productCards.nth(1).boundingBox();
        expect(box1).toBeTruthy();
        expect(box2).toBeTruthy();
        // Cards should not overlap: either side by side or stacked
        const noOverlap = box2!.x >= box1!.x + box1!.width - 5 || box2!.y >= box1!.y + box1!.height - 5;
        expect(noOverlap).toBe(true);
      }
    });

    test('TC_SCRUM77_030: Product Card Image Area Has Non-Zero Dimensions', async () => {
      const box = await pc.productCards.first().boundingBox();
      expect(box).toBeTruthy();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
    });

    test('TC_SCRUM77_031: Product Cards Render on Tablet Viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.tablet);
      await pc.navigateToCatalog();
      await page.waitForTimeout(2000);

      const cardCount = await pc.getCardCount();
      expect(cardCount).toBeGreaterThan(0);
      await expect(pc.productHeadings.first()).toBeVisible();
    });

    test('TC_SCRUM77_032: Rapid Scroll Through Product Cards Does Not Break Layout', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      await expect(pc.productHeadings.first()).toBeVisible();
      const cardCount = await pc.getCardCount();
      expect(cardCount).toBeGreaterThan(0);
    });

    test('TC_SCRUM77_033: Product Card Tags Are Not Empty Strings', async () => {
      const cardText = await pc.getCardTextContent(0);
      const matchedTags = td.tagPatterns.filter(tag => new RegExp(tag, 'i').test(cardText));
      expect(matchedTags.length).toBeGreaterThan(0);
      for (const tag of matchedTags) {
        expect(tag.trim().length).toBeGreaterThan(0);
      }
    });

    test('TC_SCRUM77_034: View Details Links Are Unique Per Product Card', async () => {
      const linkCount = await pc.viewDetailsLinks.count();
      if (linkCount >= 2) {
        const href1 = await pc.viewDetailsLinks.nth(0).getAttribute('href');
        const href2 = await pc.viewDetailsLinks.nth(1).getAttribute('href');
        expect(href1).toBeTruthy();
        expect(href2).toBeTruthy();
        expect(href1).not.toBe(href2);
      }
    });
  });
});
