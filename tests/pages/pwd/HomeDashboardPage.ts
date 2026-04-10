import { Page, Locator } from '@playwright/test';
import { ProductDetailsPage } from './ProductDetailsPage';

export class HomeDashboardPage extends ProductDetailsPage {
  readonly logo: Locator;
  readonly signInBtn: Locator;
  readonly logoutLink: Locator;
  readonly navHome: Locator;
  readonly navCatalog: Locator;
  readonly navStories: Locator;
  readonly navHelp: Locator;
  readonly carousel: Locator;
  readonly carouselSlides: Locator;
  readonly featuredHeading: Locator;
  readonly storiesHeading: Locator;
  readonly aboutHeading: Locator;
  readonly viewAllBtn: Locator;
  readonly readMoreBtn: Locator;
  readonly getRecommendationsBtn: Locator;
  readonly browseAllDevicesBtn: Locator;
  readonly footerEl: Locator;
  readonly headerEl: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('header img').first();
    this.signInBtn = page.locator('a.elementor-button').filter({ hasText: /Sign In\/Register/i }).first();
    this.logoutLink = page.locator('a').filter({ hasText: /^Logout$/i }).first();
    this.navHome = page.locator('nav a').filter({ hasText: /^Home$/i }).first();
    this.navCatalog = page.locator('nav a').filter({ hasText: /^Catalog$/i }).first();
    this.navStories = page.locator('nav a').filter({ hasText: /^Stories$/i }).first();
    this.navHelp = page.locator('nav a').filter({ hasText: /Help & Resources/i }).first();
    this.carousel = page.locator('.swiper, [class*=carousel]').first();
    this.carouselSlides = page.locator('.swiper-slide');
    this.featuredHeading = page.locator('h2').filter({ hasText: /Featured Devices/i }).first();
    this.storiesHeading = page.locator('h2').filter({ hasText: /Success Stories/i }).first();
    this.aboutHeading = page.locator('h2').filter({ hasText: /About PwD Portal/i }).first();
    this.viewAllBtn = page.locator('a.elementor-button').filter({ hasText: /View All/i }).first();
    this.readMoreBtn = page.locator('a.elementor-button').filter({ hasText: /Read more/i }).first();
    this.getRecommendationsBtn = page.locator('a.elementor-button').filter({ hasText: /Get Recommendations/i }).first();
    this.browseAllDevicesBtn = page.locator('a.elementor-button').filter({ hasText: /Browse All Devices/i }).first();
    this.footerEl = page.locator('footer').first();
    this.headerEl = page.locator('header').first();
  }

  async goHome() {
    await this.page.goto('https://qa-atad.swarajability.org/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(3000);
  }

  async loginAndGoHome(email: string, password: string) {
    await this.loginAndGoToCatalog(email, password);
    await this.goHome();
  }

  async dismissOverlays() {
    await this.page.evaluate(() => {
      const overlay = document.getElementById('atad-content-overlay');
      if (overlay) overlay.style.display = 'none';
      document.querySelectorAll('.elementor-popup-modal, .dialog-lightbox-widget').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    });
  }
}
