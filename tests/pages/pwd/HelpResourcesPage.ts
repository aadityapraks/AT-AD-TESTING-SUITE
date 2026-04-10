import { Page, Locator } from '@playwright/test';

export class HelpResourcesPage {
  readonly page: Page;
  readonly navHelp: Locator;
  readonly h1: Locator;
  readonly subtitle: Locator;
  readonly searchInput: Locator;
  readonly tabs: Locator;
  readonly helpTopicsTab: Locator;
  readonly faqTab: Locator;
  readonly contactUsTab: Locator;
  readonly tabPanels: Locator;
  readonly categoryH3s: Locator;
  readonly articleItems: Locator;
  readonly faqItems: Locator;
  readonly backToHelpCenter: Locator;
  readonly helpfulPrompt: Locator;
  readonly yesBtn: Locator;
  readonly noBtn: Locator;
  readonly shareHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navHelp = page.locator('nav a').filter({ hasText: /Help & Resources/i }).first();
    this.h1 = page.locator('h1').first();
    this.subtitle = page.locator('text=Find guides, tutorials, and answers').first();
    this.searchInput = page.locator('input[type="search"]');
    this.tabs = page.locator('button[role="tab"]');
    this.helpTopicsTab = page.locator('button[role="tab"]').filter({ hasText: 'Help Topics' });
    this.faqTab = page.locator('button[role="tab"]').filter({ hasText: 'FAQ' });
    this.contactUsTab = page.locator('button[role="tab"]').filter({ hasText: 'Contact Us' });
    this.tabPanels = page.locator('[role="tabpanel"]');
    this.categoryH3s = page.locator('[role="tabpanel"]').first().locator('h3');
    this.articleItems = page.locator('[role="tabpanel"]').first().locator('.e-loop-item');
    this.faqItems = page.locator('[role="tabpanel"]').nth(1).locator('.e-loop-item');
    this.backToHelpCenter = page.locator('a').filter({ hasText: 'Back to Help Center' }).first();
    this.helpfulPrompt = page.locator('text=Was this article helpful?').first();
    this.yesBtn = page.locator('a.elementor-button-link').filter({ hasText: /^\s*Yes\s*$/ }).first();
    this.noBtn = page.locator('a.elementor-button-link').filter({ hasText: /^\s*No\s*$/ }).first();
    this.shareHeading = page.locator('h2').filter({ hasText: /Share this/i }).first();
  }

  async goToHelp() {
    await this.page.goto('https://qa-atad.swarajability.org/help-center/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(3000);
  }

  async goToArticle() {
    await this.page.goto('https://qa-atad.swarajability.org/help-article/navigating-the-home-page/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(3000);
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
