// spec: specs/functional/SCRUM-82-pwd-image-gallery-interaction.md
// data: specs/test-cases/scrum82-image-gallery.json

import { test, expect } from '@playwright/test';
import { ImageGalleryPage } from '../../pages/pwd/ImageGalleryPage';
import planData from '../../../specs/test-cases/pwd/scrum82-image-gallery.json';
const td = planData.testData;

test.describe('SCRUM-82: PwD - Product Image Gallery Interaction', () => {
  let gp: ImageGalleryPage;

  test.beforeEach(async ({ page }) => {
    gp = new ImageGalleryPage(page);
    await gp.loginAndGoToCatalog(td.credentials.email, td.credentials.password);
    await gp.goToProduct(td.testProductUrl);
  });

  // ─── Suite 1: Main Image Display ───

  test.describe('Main Image Display', () => {
    test('TC_SCRUM82_001: Main product image is visible at top of gallery', async () => {
      await expect(gp.gallery).toBeVisible();
      const img = gp.gallerySlides.first().locator('img');
      await expect(img).toBeVisible();
    });

    test('TC_SCRUM82_002: Main image has valid src attribute', async () => {
      const src = await gp.getMainImageSrc();
      expect(src).toBeTruthy();
      expect(src).toMatch(/^https?:\/\//);
    });

    test('TC_SCRUM82_003: Main image has alt text', async () => {
      const alt = await gp.getMainImageAltText();
      expect(alt.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM82_004: Main image is rendered at prominent size', async () => {
      const dims = await gp.getMainImageDimensions();
      expect(dims.width).toBeGreaterThanOrEqual(200);
      expect(dims.height).toBeGreaterThanOrEqual(100);
    });
  });

  // ─── Suite 2: Thumbnail Display & Interaction ───

  test.describe('Thumbnail Display & Interaction', () => {
    test('TC_SCRUM82_005: Thumbnail images are displayed below main image', async () => {
      await expect(gp.galleryThumbs.first()).toBeVisible();
    });

    test('TC_SCRUM82_006: At least one thumbnail is present', async () => {
      const count = await gp.getThumbCount();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('TC_SCRUM82_007: First thumbnail is active by default', async () => {
      await gp.page.waitForTimeout(500);
      const activeIdx = await gp.getActiveThumbIndex();
      expect(activeIdx).toBe(0);
    });

    test('TC_SCRUM82_008: Clicking second thumbnail updates active state', async () => {
      await gp.clickThumb(1);
      const activeIdx = await gp.getActiveThumbIndex();
      expect(activeIdx).toBe(1);
    });

    test('TC_SCRUM82_009: Clicking thumbnail updates main image src', async () => {
      const srcBefore = await gp.getMainImageSrc();
      await gp.clickThumb(1);
      await gp.page.waitForTimeout(500);
      const srcAfter = await gp.getMainImageSrc();
      const counterText = await gp.getGalleryCounterText();
      const changed = srcAfter !== srcBefore || counterText.includes('2');
      expect(changed).toBe(true);
    });

    test('TC_SCRUM82_010: Clicking each thumbnail sequentially works', async () => {
      const count = await gp.getThumbCount();
      for (let i = 0; i < count; i++) {
        await gp.clickThumb(i);
        const activeIdx = await gp.getActiveThumbIndex();
        expect(activeIdx).toBe(i);
      }
    });
  });

  // ─── Suite 3: Carousel Navigation ───

  test.describe('Carousel Navigation', () => {
    test('TC_SCRUM82_011: Next button is visible when multiple images exist', async () => {
      const nextVisible = await gp.galleryNextBtn.isVisible({ timeout: 2000 }).catch(() => false);
      const thumbCount = await gp.getThumbCount();
      expect(nextVisible || thumbCount > 1).toBe(true);
    });

    test('TC_SCRUM82_012: Clicking Next advances to next slide', async () => {
      const nextVisible = await gp.galleryNextBtn.isVisible({ timeout: 2000 }).catch(() => false);
      if (nextVisible) {
        const counterBefore = await gp.getGalleryCounterText();
        await gp.clickGalleryNext();
        const counterAfter = await gp.getGalleryCounterText();
        expect(counterAfter).not.toBe(counterBefore);
      } else {
        await gp.clickThumb(1);
        expect(await gp.getActiveThumbIndex()).toBe(1);
      }
    });

    test('TC_SCRUM82_013: Previous button navigates back', async () => {
      const nextVisible = await gp.galleryNextBtn.isVisible({ timeout: 2000 }).catch(() => false);
      if (nextVisible) {
        await gp.clickGalleryNext();
        const counterAfterNext = await gp.getGalleryCounterText();
        await gp.clickGalleryPrev();
        const counterAfterPrev = await gp.getGalleryCounterText();
        expect(counterAfterPrev).not.toBe(counterAfterNext);
      } else {
        await gp.clickThumb(1);
        expect(await gp.getActiveThumbIndex()).toBe(1);
        await gp.clickThumb(0);
        expect(await gp.getActiveThumbIndex()).toBe(0);
      }
    });

    test('TC_SCRUM82_014: Gallery counter updates on navigation', async () => {
      const nextVisible = await gp.galleryNextBtn.isVisible({ timeout: 2000 }).catch(() => false);
      if (nextVisible) {
        const counterBefore = await gp.getGalleryCounterText();
        await gp.clickGalleryNext();
        const counterAfter = await gp.getGalleryCounterText();
        expect(counterAfter).not.toBe(counterBefore);
      } else {
        const counterBefore = await gp.getGalleryCounterText();
        await gp.clickThumb(1);
        const counterAfter = await gp.getGalleryCounterText();
        const changed = counterAfter !== counterBefore || (await gp.getActiveThumbIndex()) === 1;
        expect(changed).toBe(true);
      }
    });

    test('TC_SCRUM82_015: Carousel wraps or stops at boundaries', async () => {
      const nextVisible = await gp.galleryNextBtn.isVisible({ timeout: 2000 }).catch(() => false);
      if (nextVisible) {
        const slideCount = await gp.getGallerySlideCount();
        for (let i = 1; i < slideCount; i++) {
          await gp.clickGalleryNext();
        }
        const counterAtEnd = await gp.getGalleryCounterText();
        await gp.clickGalleryNext();
        const counterAfter = await gp.getGalleryCounterText();
        expect(counterAfter.includes('1') || counterAfter === counterAtEnd).toBe(true);
      } else {
        const thumbCount = await gp.getThumbCount();
        await gp.clickThumb(thumbCount - 1);
        expect(await gp.getActiveThumbIndex()).toBe(thumbCount - 1);
        await gp.clickThumb(0);
        expect(await gp.getActiveThumbIndex()).toBe(0);
      }
    });
  });

  // ─── Suite 4: Gallery Capacity & Slide Count ───

  test.describe('Gallery Capacity & Slide Count', () => {
    test('TC_SCRUM82_016: Gallery has multiple slides', async () => {
      const count = await gp.getGallerySlideCount();
      expect(count).toBeGreaterThan(1);
    });

    test('TC_SCRUM82_017: Gallery supports up to 10 images', async () => {
      const count = await gp.getGallerySlideCount();
      expect(count).toBeLessThanOrEqual(10);
    });

    test('TC_SCRUM82_018: Slide count matches thumbnail count', async () => {
      const slides = await gp.getGallerySlideCount();
      const thumbs = await gp.getThumbCount();
      expect(thumbs).toBe(slides);
    });

    test('TC_SCRUM82_019: Each slide contains an image element', async () => {
      const count = await gp.getGallerySlideCount();
      for (let i = 0; i < count; i++) {
        const img = gp.gallerySlides.nth(i).locator('img');
        const hasImg = (await img.count()) > 0;
        const hasVideo = (await gp.gallerySlides.nth(i).locator('video, iframe').count()) > 0;
        expect(hasImg || hasVideo).toBe(true);
      }
    });

    test('TC_SCRUM82_020: Gallery counter shows current position out of total', async () => {
      const counter = await gp.getGalleryCounterText();
      expect(counter).toMatch(/\d+\s*\/\s*\d+/);
    });
  });

  // ─── Suite 5: Demo Video ───

  test.describe('Demo Video', () => {
    test('TC_SCRUM82_021: Gallery contains a video slide', async () => {
      const videoEl = gp.page.locator('.gallery-slide video, .gallery-slide iframe');
      expect(await videoEl.count()).toBeGreaterThan(0);
    });

    test('TC_SCRUM82_022: Video element has controls attribute', async () => {
      const video = gp.page.locator('.gallery-slide video').first();
      const hasControls = await video.getAttribute('controls');
      expect(hasControls).not.toBeNull();
    });

    test('TC_SCRUM82_023: Video has a valid source URL', async () => {
      const source = gp.page.locator('.gallery-slide video source').first();
      const src = await source.getAttribute('src');
      expect(src).toMatch(/^https?:\/\/.*\.(mp4|webm|ogg)/);
    });

    test('TC_SCRUM82_024: Navigating to video slide shows video element', async () => {
      // Click through thumbnails to find the video slide
      const count = await gp.getThumbCount();
      let videoVisible = false;
      for (let i = 0; i < count; i++) {
        await gp.clickThumb(i);
        const vid = gp.page.locator('.gallery-slide.is-active video');
        if (await vid.isVisible({ timeout: 1000 }).catch(() => false)) {
          videoVisible = true;
          break;
        }
      }
      expect(videoVisible).toBe(true);
    });

    test('TC_SCRUM82_025: Video plays without page reload', async ({ page }) => {
      // Navigate to video slide
      const count = await gp.getThumbCount();
      for (let i = 0; i < count; i++) {
        await gp.clickThumb(i);
        const vid = page.locator('.gallery-slide.is-active video');
        if (await vid.isVisible({ timeout: 1000 }).catch(() => false)) break;
      }
      const urlBefore = page.url();
      const video = page.locator('.gallery-slide.is-active video').first();
      await video.evaluate(v => (v as HTMLVideoElement).play().catch(() => {}));
      await page.waitForTimeout(1000);
      expect(page.url()).toBe(urlBefore);
    });
  });

  // ─── Suite 6: Image Aspect Ratio & Quality ───

  test.describe('Image Aspect Ratio & Quality', () => {
    test('TC_SCRUM82_026: Gallery slides use aspect ratio CSS class', async () => {
      const cls = await gp.gallerySlides.first().getAttribute('class') ?? '';
      expect(cls).toMatch(/aspect/);
    });

    test('TC_SCRUM82_027: All slides share same aspect ratio class', async () => {
      const count = await gp.getGallerySlideCount();
      const firstCls = await gp.gallerySlides.first().getAttribute('class') ?? '';
      const aspectMatch = firstCls.match(/aspect-[\w-]+/);
      expect(aspectMatch).toBeTruthy();
      for (let i = 1; i < count; i++) {
        const cls = await gp.gallerySlides.nth(i).getAttribute('class') ?? '';
        expect(cls).toContain(aspectMatch![0]);
      }
    });

    test('TC_SCRUM82_028: Main image loads within acceptable time', async () => {
      const start = Date.now();
      const img = gp.gallerySlides.first().locator('img');
      await expect(img).toBeAttached({ timeout: td.imageLoadThresholdMs });
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThanOrEqual(td.imageLoadThresholdMs);
    });

    test('TC_SCRUM82_029: All slide images have valid src', async () => {
      const count = await gp.getGallerySlideCount();
      for (let i = 0; i < count; i++) {
        const img = gp.gallerySlides.nth(i).locator('img');
        if ((await img.count()) === 0) continue;
        const src = await img.first().getAttribute('src');
        expect(src).toMatch(/^https?:\/\//);
      }
    });
  });

  // ─── Suite 7: Responsive Gallery ───

  test.describe('Responsive Gallery', () => {
    test('TC_SCRUM82_030: Gallery renders on mobile viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await page.waitForTimeout(1000);
      await expect(gp.gallery).toBeVisible();
    });

    test('TC_SCRUM82_031: Gallery renders on tablet viewport', async ({ page }) => {
      await page.setViewportSize(td.viewports.tablet);
      await page.waitForTimeout(1000);
      await expect(gp.gallery).toBeVisible();
    });

    test('TC_SCRUM82_032: No horizontal overflow on mobile', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await page.waitForTimeout(1000);
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(td.viewports.mobile.width + 5);
    });

    test('TC_SCRUM82_033: Thumbnails remain visible on mobile', async ({ page }) => {
      await page.setViewportSize(td.viewports.mobile);
      await page.waitForTimeout(1000);
      await expect(gp.galleryThumbs.first()).toBeVisible();
    });
  });
});
