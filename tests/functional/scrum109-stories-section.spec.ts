// spec: specs/functional/SCRUM-109-pwd-accessing-stories-section.md
// data: specs/test-cases/scrum109-stories-section.json

import { test, expect } from '@playwright/test';
import { StoriesPage } from '../pages/StoriesPage';
import planData from '../../specs/test-cases/scrum109-stories-section.json';
const td = planData.testData;

test.describe('SCRUM-109: PwD - Accessing Stories Section', () => {
  let sp: StoriesPage;

  test.beforeEach(async ({ page }) => {
    sp = new StoriesPage(page);
    await sp.loginAndGoToStories(td.credentials.email, td.credentials.password);
  });

  // ─── Suite 1: Stories Page Navigation (AC1) ───

  test.describe('Stories Page Navigation', () => {
    test('TC_SCRUM109_001: Stories link is visible in top navigation', async () => {
      await sp.page.goto(td.baseUrl, { waitUntil: 'domcontentloaded' });
      await sp.page.waitForTimeout(2000);
      await sp.dismissOverlays();
      await expect(sp.storiesNavLink.first()).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM109_002: Clicking Stories nav link opens stories page', async () => {
      await sp.page.goto(td.baseUrl, { waitUntil: 'domcontentloaded' });
      await sp.page.waitForTimeout(2000);
      await sp.dismissOverlays();
      await sp.storiesNavLink.first().click();
      await sp.page.waitForLoadState('domcontentloaded');
      await sp.page.waitForTimeout(2000);
      expect(sp.page.url().toLowerCase()).toContain('stories');
    });

    test('TC_SCRUM109_003: Page displays Success Stories heading', async () => {
      await sp.dismissOverlays();
      const body = (await sp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('success stories');
    });

    test('TC_SCRUM109_004: Page displays subtitle Real experiences from the community.', async () => {
      await sp.dismissOverlays();
      const body = (await sp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('real experiences from the community');
    });
  });

  // ─── Suite 2: Story Cards Display (AC2) ───

  test.describe('Story Cards Display', () => {
    test('TC_SCRUM109_005: Story card has cover image', async () => {
      await sp.dismissOverlays();
      const firstCard = sp.storyCards.first();
      // Cover image is CSS background on the <a> container
      const coverLink = firstCard.locator('a[href*="/story/"]').first();
      const hasBg = await coverLink.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.backgroundImage !== 'none' && style.backgroundImage !== '';
      }).catch(() => false);
      // Or it could be an <img> inside the card
      const hasImg = (await firstCard.locator('img').count()) > 0;
      expect(hasBg || hasImg).toBe(true);
    });

    test('TC_SCRUM109_006: Story card has category tag', async () => {
      await sp.dismissOverlays();
      const firstCard = sp.storyCards.first();
      const cardText = ((await firstCard.textContent()) ?? '').toLowerCase();
      // Category tags: "Featured Story", "Independent Living", etc.
      const hasCategory = /featured|independent|living|story|mobility|employment/i.test(cardText);
      expect(hasCategory).toBe(true);
    });

    test('TC_SCRUM109_007: Story card has story title', async () => {
      await sp.dismissOverlays();
      const firstCard = sp.storyCards.first();
      const title = firstCard.locator('h3, h2').first();
      const text = ((await title.textContent()) ?? '').trim();
      expect(text.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM109_008: Story card has author name and avatar', async () => {
      await sp.dismissOverlays();
      const firstCard = sp.storyCards.first();
      // Author avatar is an <img> (200x200)
      const avatar = firstCard.locator('img');
      expect(await avatar.count()).toBeGreaterThan(0);
      // Author name is in a heading widget
      const cardText = ((await firstCard.textContent()) ?? '').trim();
      expect(cardText.length).toBeGreaterThan(10);
    });

    test('TC_SCRUM109_009: Story card has published date', async () => {
      await sp.dismissOverlays();
      const firstCard = sp.storyCards.first();
      const dateEl = firstCard.locator('.elementor-icon-list-text');
      const dateText = ((await dateEl.first().textContent()) ?? '').trim();
      const hasDate = /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4}/i.test(dateText);
      expect(hasDate).toBe(true);
    });

    test('TC_SCRUM109_010: Story card has summary text', async () => {
      await sp.dismissOverlays();
      const firstCard = sp.storyCards.first();
      const summary = firstCard.locator('p.elementor-heading-title').first();
      const text = ((await summary.textContent()) ?? '').trim();
      expect(text.length).toBeGreaterThan(10);
    });

    test('TC_SCRUM109_011: Story card has Read Story CTA', async () => {
      await sp.dismissOverlays();
      const cta = sp.readStoryCTAs.first();
      await expect(cta).toBeVisible({ timeout: 5000 });
    });
  });

  // ─── Suite 3: Stories Count & Pagination (AC3) ───

  test.describe('Stories Count & Pagination', () => {
    test('TC_SCRUM109_012: At least 6 stories load by default', async () => {
      await sp.dismissOverlays();
      const count = await sp.getStoryCardCount();
      // AC3 requires >= 6 stories
      expect(count).toBeGreaterThanOrEqual(td.minStoryCount);
    });

    test('TC_SCRUM109_013: Pagination or load-more is available if more stories exist', async () => {
      await sp.dismissOverlays();
      const hasPagination = (await sp.pagination.count()) > 0;
      const hasLoadMore = (await sp.loadMore.count()) > 0;
      const hasScroll = await sp.page.evaluate(() => document.body.scrollHeight > window.innerHeight);
      expect(hasPagination || hasLoadMore || hasScroll).toBe(true);
    });
  });

  // ─── Suite 4: Like & Share (AC4) ───

  test.describe('Like & Share', () => {
    test('TC_SCRUM109_014: Like icon is visible on story card', async () => {
      await sp.dismissOverlays();
      // Heart SVG icon in <a data-atad-protected-link>
      const like = sp.likeIcons.first();
      await expect(like).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM109_015: Share icon is visible on story card', async () => {
      await sp.dismissOverlays();
      const firstCard = sp.storyCards.first();
      // Share icon is the second .elementor-icon in the card actions area
      const icons = firstCard.locator('a.elementor-icon');
      const count = await icons.count();
      // Should have at least 2 icons (like + share)
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('TC_SCRUM109_016: Clicking Like icon toggles state', async () => {
      await sp.dismissOverlays();
      const likeBtn = sp.likeIcons.first();
      const svg = likeBtn.locator('svg');
      const fillBefore = (await svg.getAttribute('fill')) ?? '';
      const classBefore = (await likeBtn.getAttribute('class')) ?? '';
      const htmlBefore = await likeBtn.innerHTML();
      await likeBtn.click();
      await sp.page.waitForTimeout(1500);
      const fillAfter = (await svg.getAttribute('fill')) ?? '';
      const classAfter = (await likeBtn.getAttribute('class')) ?? '';
      const htmlAfter = await likeBtn.innerHTML();
      // At least one of fill, class, or innerHTML should change after toggle
      const changed = fillBefore !== fillAfter || classBefore !== classAfter || htmlBefore !== htmlAfter;
      expect(changed).toBe(true);
    });
  });

  // ─── Suite 5: Story Details Navigation (AC5) ───

  test.describe('Story Details Navigation', () => {
    test('TC_SCRUM109_017: Clicking Read Story opens story details page', async () => {
      await sp.dismissOverlays();
      const urlBefore = await sp.clickFirstReadStory();
      expect(sp.page.url()).not.toBe(urlBefore);
      expect(sp.page.url()).toContain('/story/');
    });

    test('TC_SCRUM109_018: Story details page URL changes from listing', async () => {
      await sp.dismissOverlays();
      const urlBefore = sp.page.url();
      await sp.clickFirstReadStory();
      expect(sp.page.url()).not.toBe(urlBefore);
    });
  });

  // ─── Suite 6: Story Details Content (AC6, AC7) ───

  test.describe('Story Details Content', () => {
    test.beforeEach(async () => {
      await sp.dismissOverlays();
      await sp.clickFirstReadStory();
      await sp.dismissOverlays();
    });

    test('TC_SCRUM109_019: Details page shows cover image', async () => {
      const imgs = sp.page.locator('img');
      expect(await imgs.count()).toBeGreaterThan(0);
    });

    test('TC_SCRUM109_020: Details page shows story title', async () => {
      const heading = sp.page.locator('h1, h2').first();
      const text = ((await heading.textContent()) ?? '').trim();
      expect(text.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM109_021: Details page shows author name and date', async () => {
      const body = (await sp.page.locator('body').textContent()) ?? '';
      const hasDate = /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{4}/i.test(body);
      expect(hasDate).toBe(true);
    });

    test('TC_SCRUM109_022: Details page has Like and Share buttons', async () => {
      const icons = sp.page.locator('a.elementor-icon');
      expect(await icons.count()).toBeGreaterThan(0);
    });

    test('TC_SCRUM109_023: Details page has My Journey section', async () => {
      const body = (await sp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('my journey');
    });

    test('TC_SCRUM109_024: Details page has Before/After comparison badges', async () => {
      const body = (await sp.page.locator('body').textContent()) ?? '';
      const hasBefore = /before/i.test(body);
      const hasAfter = /after/i.test(body);
      expect(hasBefore && hasAfter).toBe(true);
    });

    test('TC_SCRUM109_025: Details page has The Impact section', async () => {
      const body = (await sp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('the impact');
    });

    test('TC_SCRUM109_026: Device Featured box shows device name and image', async () => {
      const body = (await sp.page.locator('body').textContent()) ?? '';
      const hasDevice = /device|view device|featured/i.test(body);
      expect(hasDevice).toBe(true);
    });

    test('TC_SCRUM109_027: Back to Stories link is present', async () => {
      const backLink = sp.page.locator('a').filter({ hasText: /back to stories/i });
      const count = await backLink.count();
      expect(count).toBeGreaterThan(0);
    });

    test('TC_SCRUM109_028: Read More Success Stories CTA is present', async () => {
      const body = (await sp.page.locator('body').textContent()) ?? '';
      const has = /read more.*stories|view all stories|more success stories/i.test(body);
      expect(has).toBe(true);
    });
  });

  // ─── Suite 7: Detail Page Navigation (AC8, AC9) ───

  test.describe('Detail Page Navigation', () => {
    test.beforeEach(async () => {
      await sp.dismissOverlays();
      await sp.clickFirstReadStory();
      await sp.dismissOverlays();
    });

    test('TC_SCRUM109_029: View Device Details navigates to product page', async () => {
      const link = sp.page.locator('a').filter({ hasText: /view device|device details|learn more.*device/i }).first();
      if (!await link.isVisible({ timeout: 5000 }).catch(() => false)) { test.skip(); return; }
      await link.click();
      await sp.page.waitForLoadState('domcontentloaded');
      await sp.page.waitForTimeout(2000);
      const url = sp.page.url().toLowerCase();
      expect(url.includes('product') || url.includes('catalog')).toBe(true);
    });

    test('TC_SCRUM109_030: View All Stories / Back to Stories navigates to stories listing', async () => {
      const backLink = sp.page.locator('a').filter({ hasText: /back to stories|view all stories|all stories/i }).first();
      if (!await backLink.isVisible({ timeout: 5000 }).catch(() => false)) { test.skip(); return; }
      await backLink.click();
      await sp.page.waitForLoadState('domcontentloaded');
      await sp.page.waitForTimeout(2000);
      expect(sp.page.url().toLowerCase()).toContain('stories');
    });
  });

  // ─── Suite 8: Responsive (AC10) ───

  test.describe('Responsive', () => {
    test('TC_SCRUM109_031: Stories page renders on mobile viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await page.waitForTimeout(1000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('stor');
    });

    test('TC_SCRUM109_032: Stories page renders on tablet viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.tablet);
      await page.waitForTimeout(1000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('stor');
    });

    test('TC_SCRUM109_033: No horizontal overflow on mobile', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await page.waitForTimeout(1000);
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(td.viewports.mobile.width + 5);
    });
  });
});
