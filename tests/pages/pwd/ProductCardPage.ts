import { Page, Locator } from '@playwright/test';
import { CatalogFiltersPage } from './CatalogFiltersPage';

export class ProductCardPage extends CatalogFiltersPage {
  readonly productCards: Locator;
  readonly productHeadings: Locator;
  readonly viewDetailsLinks: Locator;
  readonly sortDropdown: Locator;
  readonly signInModal: Locator;
  readonly signInBtn: Locator;
  readonly createAccountBtn: Locator;
  readonly userTypeOptions: Locator;
  readonly modalCloseBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.productCards = page.locator('main [role="list"]').first().locator('> *:not(style)');
    this.productHeadings = page.locator('main [role="list"]').first().getByRole('heading', { level: 3 });
    this.viewDetailsLinks = page.locator('main').getByRole('link', { name: /view details/i });
    this.sortDropdown = page.getByRole('combobox', { name: 'Sort by' });
    this.signInModal = page.locator('[role="dialog"], [class*="modal"], [class*="popup"]');
    this.signInBtn = page.getByRole('button', { name: /sign in/i });
    this.createAccountBtn = page.getByRole('button', { name: /create|register|sign up/i });
    this.userTypeOptions = page.locator('text=/PwD|Caregiver|Employer|Donor|Vendor/i');
    this.modalCloseBtn = page.locator('[role="dialog"] button[aria-label*="close"], [class*="modal"] button[aria-label*="close"], [role="dialog"] button:has(svg), [class*="modal-close"]');
  }

  async getCardCount(): Promise<number> {
    return this.productCards.count();
  }

  async getFirstCardText(): Promise<string> {
    return ((await this.productHeadings.first().textContent()) ?? '').trim();
  }

  async getCardTextContent(index = 0): Promise<string> {
    return (await this.productCards.nth(index).textContent()) ?? '';
  }

  async hasBackgroundImage(index = 0): Promise<boolean> {
    return this.productCards.nth(index).evaluate(el => {
      const allEls = el.querySelectorAll('*');
      for (const child of Array.from(allEls)) {
        const bg = window.getComputedStyle(child).backgroundImage;
        if (bg && bg !== 'none' && bg.includes('url(')) return true;
      }
      return false;
    });
  }

  async getCardPrices(count = 2): Promise<number[]> {
    const prices: number[] = [];
    const total = Math.min(count, await this.productCards.count());
    for (let i = 0; i < total; i++) {
      const text = (await this.productCards.nth(i).textContent()) ?? '';
      const match = text.match(/₹[\d,]+(?:\.\d+)?/);
      if (match) {
        prices.push(parseFloat(match[0].replace(/[₹,]/g, '')));
      }
    }
    return prices;
  }

  async isSignInModalVisible(): Promise<boolean> {
    return this.signInModal.first().isVisible().catch(() => false);
  }

  async closeModal() {
    const closeBtn = this.modalCloseBtn.first();
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click();
      await this.page.waitForTimeout(500);
    } else {
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(500);
    }
  }
}
