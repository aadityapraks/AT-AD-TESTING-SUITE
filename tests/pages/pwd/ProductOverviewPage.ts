import { Page, Locator } from '@playwright/test';
import { ProductDetailsPage } from './ProductDetailsPage';

export class ProductOverviewPage extends ProductDetailsPage {
  // Product Header
  readonly productName: Locator;
  readonly productTags: Locator;
  readonly ratingStarIcon: Locator;
  readonly ratingValue: Locator;
  readonly reviewCount: Locator;
  readonly stockBadge: Locator;
  readonly priceText: Locator;
  readonly descriptionText: Locator;

  // CTAs
  readonly saveBtn: Locator;
  readonly shareBtn: Locator;
  readonly contactVendorBtn: Locator;
  readonly shareOffCanvas: Locator;
  readonly shareOffCanvasHeading: Locator;

  // Geography
  readonly geographyLink: Locator;
  readonly geographyOffCanvas: Locator;

  // Image Gallery
  readonly gallery: Locator;
  readonly galleryStage: Locator;
  readonly gallerySlides: Locator;
  readonly galleryMainImage: Locator;
  readonly galleryCounter: Locator;
  readonly galleryBadge: Locator;
  readonly galleryPrevBtn: Locator;
  readonly galleryNextBtn: Locator;
  readonly galleryThumbs: Locator;
  readonly galleryDescription: Locator;

  // PwD/Caregiver selector
  readonly pwdSelector: Locator;

  constructor(page: Page) {
    super(page);

    // Product Header
    this.productName = page.locator('h1.elementor-heading-title').first();
    this.productTags = page.locator('.elementor-element-0334851 span.elementor-heading-title');
    this.ratingStarIcon = page.locator('.elementor-element-11244bd .e-font-icon-svg');
    this.ratingValue = page.locator('.elementor-element-416e677 span.elementor-heading-title');
    this.reviewCount = page.locator('.elementor-element-42f7cbe span.elementor-heading-title');
    this.stockBadge = page.locator('.elementor-element-dd11683 .elementor-icon-list-text');
    this.priceText = page.locator('.elementor-element-e0a943e span.elementor-heading-title');
    this.descriptionText = page.locator('.elementor-element-b4b469a span.elementor-heading-title');

    // CTAs
    this.saveBtn = page.locator('.elementor-element-03f2576 a.elementor-button');
    this.shareBtn = page.locator('.elementor-element-325e2d9 a.elementor-button');
    this.contactVendorBtn = page.locator('.atad-enquire-button a.elementor-button');
    this.shareOffCanvas = page.locator('#off-canvas-ff63c99');
    this.shareOffCanvasHeading = page.locator('#off-canvas-ff63c99 h2');

    // Geography
    this.geographyLink = page.locator('.elementor-element-fba69a4 a');
    this.geographyOffCanvas = page.locator('.elementor-element-5bfd60c .e-off-canvas');

    // Image Gallery
    this.gallery = page.locator('.atad-product-gallery');
    this.galleryStage = page.locator('.gallery-stage');
    this.gallerySlides = page.locator('.gallery-slide');
    this.galleryMainImage = page.locator('.gallery-slide img').first();
    this.galleryCounter = page.locator('.gallery-counter');
    this.galleryBadge = page.locator('.gallery-badge');
    this.galleryPrevBtn = page.locator('button.gallery-prev');
    this.galleryNextBtn = page.locator('button.gallery-next');
    this.galleryThumbs = page.locator('button.gallery-thumb');
    this.galleryDescription = page.locator('.gallery-description-text');

    // PwD/Caregiver selector
    this.pwdSelector = page.locator('.atad-caregiver-pwd-selector-wrap');
  }

  async getProductNameText(): Promise<string> {
    return ((await this.productName.textContent()) ?? '').trim();
  }

  async getTagTexts(): Promise<string[]> {
    const all = await this.productTags.allTextContents();
    return all.map(t => t.trim()).filter(Boolean);
  }

  async getRatingText(): Promise<string> {
    return ((await this.ratingValue.textContent()) ?? '').trim();
  }

  async getReviewCountText(): Promise<string> {
    return ((await this.reviewCount.textContent()) ?? '').trim();
  }

  async getStockStatus(): Promise<string> {
    return ((await this.stockBadge.textContent()) ?? '').trim();
  }

  async getPriceText(): Promise<string> {
    return ((await this.priceText.textContent()) ?? '').trim();
  }

  async getDescriptionText(): Promise<string> {
    return ((await this.descriptionText.textContent()) ?? '').trim();
  }

  async getGeographyText(): Promise<string> {
    return ((await this.geographyLink.textContent()) ?? '').trim();
  }

  async getGalleryCounterText(): Promise<string> {
    return ((await this.galleryCounter.textContent()) ?? '').trim();
  }

  async getGallerySlideCount(): Promise<number> {
    return this.gallerySlides.count();
  }

  async getThumbCount(): Promise<number> {
    return this.galleryThumbs.count();
  }

  async getActiveThumbIndex(): Promise<number> {
    const count = await this.galleryThumbs.count();
    for (let i = 0; i < count; i++) {
      const cls = await this.galleryThumbs.nth(i).getAttribute('class') ?? '';
      if (cls.includes('is-active')) return i;
    }
    return -1;
  }

  async clickThumb(index: number) {
    await this.galleryThumbs.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  async clickGalleryNext() {
    await this.galleryNextBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickGalleryPrev() {
    await this.galleryPrevBtn.click();
    await this.page.waitForTimeout(500);
  }

  async getMainImageAlt(): Promise<string> {
    // Get alt from the currently visible slide's img
    const activeSlide = this.page.locator('.gallery-slide').filter({ has: this.page.locator('img') });
    const count = await activeSlide.count();
    if (count > 0) {
      return (await activeSlide.first().locator('img').getAttribute('alt')) ?? '';
    }
    return '';
  }

  async clickShareBtn() {
    await this.shareBtn.click();
    await this.page.waitForTimeout(1000);
  }

  async isShareOffCanvasOpen(): Promise<boolean> {
    const hidden = await this.shareOffCanvas.getAttribute('aria-hidden');
    return hidden === 'false';
  }

  async clickSaveBtn() {
    await this.saveBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickContactVendor() {
    await this.contactVendorBtn.click();
    await this.page.waitForTimeout(1000);
  }
}
