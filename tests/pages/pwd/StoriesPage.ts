import { Page, Locator } from '@playwright/test';

export class StoriesPage {
  readonly page: Page;
  readonly storiesNavLink: Locator;
  readonly storyCards: Locator;
  readonly readStoryCTAs: Locator;
  readonly likeIcons: Locator;
  readonly shareIcons: Locator;
  readonly pagination: Locator;
  readonly loadMore: Locator;

  constructor(page: Page) {
    this.page = page;
    this.storiesNavLink = page.locator('nav a, header a, .menu a, [class*="nav"] a').filter({ hasText: /stories/i });
    this.storyCards = page.locator('.e-loop-item');
    this.readStoryCTAs = page.locator('.e-loop-item .elementor-button-text').filter({ hasText: /read story/i });
    this.likeIcons = page.locator('.e-loop-item a.elementor-icon[data-atad-protected-link]');
    this.shareIcons = page.locator('.e-loop-item a.elementor-icon:not([data-atad-protected-link])');
    this.pagination = page.locator('[class*="pagination"], nav[aria-label*="pagination"], .page-numbers');
    this.loadMore = page.locator('button, a').filter({ hasText: /load more|show more|view more/i });
  }

  async loginAndGoToStories(email: string, password: string) {
    await this.page.goto('https://qa-atad.swarajability.org/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1500);

    const logoutLink = this.page.locator('a').filter({ hasText: /logout/i }).first();
    if (await logoutLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.page.goto('https://qa-atad.swarajability.org/stories/', { waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(2000);
      return;
    }

    await this.page.locator('a').filter({ hasText: /Sign In/i }).first().click();
    await this.page.waitForTimeout(1500);
    await this.page.locator('a').filter({ hasText: /Sign In with SwarajAbility/i }).first().click();
    await this.page.waitForURL(/auth-d\.swarajability\.org/, { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    await this.page.locator('input[name="uidField"]').fill(email);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(3000);

    await this.page.locator('input[type="password"]').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator('input[type="password"]').fill(password);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.page.waitForTimeout(3000);

    for (let attempt = 0; attempt < 3; attempt++) {
      if (!this.page.url().includes('auth-d.swarajability.org')) break;
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      await this.page.evaluate(() => {
        function findBtn(root: Document | ShadowRoot): HTMLButtonElement | null {
          for (const btn of Array.from(root.querySelectorAll('button'))) {
            const t = btn.textContent?.toLowerCase() || '';
            if (t.includes('continue') || t.includes('consent') || t.includes('allow') || btn.type === 'submit')
              return btn as HTMLButtonElement;
          }
          for (const el of Array.from(root.querySelectorAll('*'))) {
            if (el.shadowRoot) { const f = findBtn(el.shadowRoot); if (f) return f; }
          }
          return null;
        }
        const btn = findBtn(document);
        if (btn) btn.click();
      }).catch(() => {});
      await this.page.waitForTimeout(3000);
    }

    if (this.page.url().includes('auth-d.swarajability.org')) {
      await this.page.waitForURL(/qa-atad\.swarajability\.org/, { timeout: 15000 }).catch(() => {});
    }
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);

    await this.page.goto('https://qa-atad.swarajability.org/stories/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(2000);
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

  async getStoryCardCount(): Promise<number> {
    return this.storyCards.count();
  }

  async clickFirstReadStory(): Promise<string> {
    const urlBefore = this.page.url();
    await this.dismissOverlays();
    const cta = this.storyCards.first().locator('a').filter({ hasText: /read story/i }).first();
    await cta.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    return urlBefore;
  }
}
