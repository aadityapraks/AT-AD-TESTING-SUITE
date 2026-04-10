import { Page, Locator } from '@playwright/test';
import { ProductOverviewPage } from './ProductOverviewPage';

export class ImageGalleryPage extends ProductOverviewPage {
  // Lightbox
  readonly lightboxOverlay: Locator;
  readonly lightboxImage: Locator;
  readonly lightboxCloseBtn: Locator;
  readonly lightboxNextBtn: Locator;
  readonly lightboxPrevBtn: Locator;

  // Video
  readonly videoSlide: Locator;
  readonly playButton: Locator;
  readonly videoModal: Locator;
  readonly videoPlayer: Locator;

  constructor(page: Page) {
    super(page);

    // Lightbox — common selectors for Elementor/WP lightbox overlays (exclude e-off-canvas)
    this.lightboxOverlay = page.locator('.elementor-lightbox, .lg-outer, .fancybox-container, .pswp, .glightbox-container').first();
    this.lightboxImage = page.locator('.elementor-lightbox img, .lg-image, .fancybox-image, .pswp__img, .glightbox-container img').first();
    this.lightboxCloseBtn = page.locator('.elementor-slideshow__header__close, .lg-close, .fancybox-close-small, .pswp__button--close').first();
    this.lightboxNextBtn = page.locator('.elementor-slideshow__header__next, .lg-next, .fancybox-button--right, .pswp__button--arrow--right').first();
    this.lightboxPrevBtn = page.locator('.elementor-slideshow__header__prev, .lg-prev, .fancybox-button--left, .pswp__button--arrow--left').first();

    // Video
    this.videoSlide = page.locator('.gallery-slide video, .gallery-slide iframe, .gallery-badge:has-text("video")').first();
    this.playButton = page.locator('button:has-text("Play"), button:has-text("Preview"), a:has-text("Play Video"), .gallery-badge:has-text("video")').first();
    this.videoModal = page.locator('.elementor-lightbox, [role="dialog"]').first();
    this.videoPlayer = page.locator('video, iframe[src*="youtube"], iframe[src*="vimeo"]').first();
  }

  async getMainImageSrc(): Promise<string> {
    const img = this.page.locator('.gallery-slide img').first();
    return (await img.getAttribute('src')) ?? '';
  }

  async getMainImageAltText(): Promise<string> {
    const img = this.page.locator('.gallery-slide img').first();
    return (await img.getAttribute('alt')) ?? '';
  }

  async getMainImageDimensions(): Promise<{ width: number; height: number }> {
    const img = this.page.locator('.gallery-slide img').first();
    return img.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
  }

  async getSlideImageAspectRatios(): Promise<number[]> {
    const count = await this.gallerySlides.count();
    const ratios: number[] = [];
    for (let i = 0; i < count; i++) {
      const img = this.gallerySlides.nth(i).locator('img');
      if (await img.count() === 0) continue;
      const ratio = await img.first().evaluate(el => {
        const nat = el as HTMLImageElement;
        return nat.naturalWidth && nat.naturalHeight ? nat.naturalWidth / nat.naturalHeight : 0;
      });
      if (ratio > 0) ratios.push(ratio);
    }
    return ratios;
  }

  async getThumbAspectRatios(): Promise<{ natural: number; rendered: number }[]> {
    const count = await this.galleryThumbs.count();
    const results: { natural: number; rendered: number }[] = [];
    for (let i = 0; i < count; i++) {
      const img = this.galleryThumbs.nth(i).locator('img');
      if (await img.count() === 0) continue;
      const data = await img.first().evaluate(el => {
        const im = el as HTMLImageElement;
        const rect = el.getBoundingClientRect();
        return {
          natural: im.naturalWidth && im.naturalHeight ? im.naturalWidth / im.naturalHeight : 0,
          rendered: rect.width && rect.height ? rect.width / rect.height : 0,
        };
      });
      if (data.natural > 0) results.push(data);
    }
    return results;
  }

  async clickMainImage() {
    await this.page.locator('.gallery-slide img').first().click();
    await this.page.waitForTimeout(1000);
  }

  async isLightboxOpen(): Promise<boolean> {
    return this.lightboxOverlay.isVisible({ timeout: 3000 }).catch(() => false);
  }

  async closeLightbox() {
    // Try close button first, then Escape
    const closeVisible = await this.lightboxCloseBtn.isVisible({ timeout: 2000 }).catch(() => false);
    if (closeVisible) {
      await this.lightboxCloseBtn.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(500);
  }

  async hasVideoInGallery(): Promise<boolean> {
    const badge = this.page.locator('.gallery-badge');
    if (await badge.isVisible({ timeout: 2000 }).catch(() => false)) {
      const text = ((await badge.textContent()) ?? '').toLowerCase();
      if (text.includes('video')) return true;
    }
    const videoEl = this.page.locator('.gallery-slide video, .gallery-slide iframe');
    return (await videoEl.count()) > 0;
  }

  async clickPlayButton() {
    await this.playButton.click();
    await this.page.waitForTimeout(1500);
  }

  async isVideoModalOpen(): Promise<boolean> {
    const videoVisible = await this.videoPlayer.isVisible({ timeout: 3000 }).catch(() => false);
    const modalVisible = await this.videoModal.isVisible({ timeout: 1000 }).catch(() => false);
    return videoVisible || modalVisible;
  }

  async goToProduct(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(2000);
  }
}
