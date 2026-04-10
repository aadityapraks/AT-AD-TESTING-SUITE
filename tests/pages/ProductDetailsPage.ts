import { Page, Locator } from '@playwright/test';
import { ProductCardPage } from './ProductCardPage';

export class ProductDetailsPage extends ProductCardPage {
  readonly breadcrumb: Locator;
  readonly productDetailHeading: Locator;
  readonly productDetailPrice: Locator;
  readonly productDetailImage: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    super(page);
    this.breadcrumb = page.locator('a').filter({ hasText: /back to catalog/i }).first();
    this.productDetailHeading = page.locator('h1').first();
    this.productDetailPrice = page.locator('text=/₹[\\d,]+/').first();
    this.productDetailImage = page.locator('img[alt]').first();
    this.mainContent = page.locator('body').first();
    this.footer = page.locator('footer').first();
  }

  async loginAndGoToCatalog(email: string, password: string) {
    await this.page.goto('https://qa-atad.swarajability.org/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1500);

    // Check if already logged in
    const logoutLink = this.page.locator('a').filter({ hasText: /logout/i }).first();
    if (await logoutLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Already logged in — go straight to catalog
      await this.page.goto('https://qa-atad.swarajability.org/catalog/', { waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(2000);
      return;
    }

    // Open sign-in popup by clicking header link
    await this.page.locator('a').filter({ hasText: /Sign In/i }).first().click();
    await this.page.waitForTimeout(1500);

    // Click "Sign In with SwarajAbility" link inside the popup
    await this.page.locator('a').filter({ hasText: /Sign In with SwarajAbility/i }).first().click();

    // Wait for Authentik login page
    await this.page.waitForURL(/auth-d\.swarajability\.org/, { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    // Email step
    await this.page.locator('input[name="uidField"]').waitFor({ state: 'visible', timeout: 15000 });
    await this.page.locator('input[name="uidField"]').fill(email);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(4000);

    // Password step — retry email submit if password field not visible
    const pwField = this.page.locator('input[type="password"]');
    if (!(await pwField.isVisible({ timeout: 5000 }).catch(() => false))) {
      // Retry: the email submit may not have gone through
      const uidField = this.page.locator('input[name="uidField"]');
      if (await uidField.isVisible({ timeout: 2000 }).catch(() => false)) {
        await uidField.fill(email);
        await this.page.locator('button[type="submit"]').click();
        await this.page.waitForTimeout(4000);
      }
    }
    await pwField.waitFor({ state: 'visible', timeout: 30000 });
    await this.page.locator('input[type="password"]').fill(password);
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.page.waitForTimeout(3000);

    // Consent page — Authentik renders inside shadow DOM
    // Retry clicking the Continue/submit button until we leave the auth domain
    for (let attempt = 0; attempt < 3; attempt++) {
      if (!this.page.url().includes('auth-d.swarajability.org')) break;
      await this.page.waitForLoadState('networkidle').catch(() => {});
      await this.page.waitForTimeout(2000);
      await this.page.evaluate(() => {
        function findButtonInShadow(root: Document | ShadowRoot): HTMLButtonElement | null {
          const btns = root.querySelectorAll('button');
          for (const btn of Array.from(btns)) {
            const text = btn.textContent?.toLowerCase() || '';
            if (text.includes('continue') || text.includes('consent') || text.includes('allow') || btn.type === 'submit') {
              return btn as HTMLButtonElement;
            }
          }
          const els = root.querySelectorAll('*');
          for (const el of Array.from(els)) {
            if (el.shadowRoot) {
              const found = findButtonInShadow(el.shadowRoot);
              if (found) return found;
            }
          }
          return null;
        }
        const btn = findButtonInShadow(document);
        if (btn) btn.click();
      }).catch(() => { /* navigation destroys context — expected */ });
      await this.page.waitForTimeout(3000);
    }

    // Wait for redirect back to app
    if (this.page.url().includes('auth-d.swarajability.org')) {
      await this.page.waitForURL(/qa-atad\.swarajability\.org/, { timeout: 15000 }).catch(() => {});
    }
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);

    // Navigate to catalog (retry if interrupted by auth redirect)
    for (let attempt = 0; attempt < 3; attempt++) {
      await this.page.goto('https://qa-atad.swarajability.org/catalog/', { waitUntil: 'domcontentloaded' }).catch(() => {});
      await this.page.waitForTimeout(2000);
      if (this.page.url().includes('/catalog')) break;
    }
  }

  async clickFirstViewDetails(): Promise<string> {
    const href = (await this.viewDetailsLinks.first().getAttribute('href')) ?? '';
    await this.viewDetailsLinks.first().click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
    return href;
  }

  async getProductDetailHeadingText(): Promise<string> {
    return ((await this.productDetailHeading.textContent()) ?? '').trim();
  }

  async isOnProductDetailPage(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('/product/') || url.includes('/catalog/');
  }

  async getProductDetailUrl(): Promise<string> {
    return this.page.url();
  }
}
