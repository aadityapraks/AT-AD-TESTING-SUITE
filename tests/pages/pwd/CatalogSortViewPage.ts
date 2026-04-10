import { Page, Locator } from '@playwright/test';
import { CatalogFiltersPage } from './CatalogFiltersPage';

export class CatalogSortViewPage extends CatalogFiltersPage {
  readonly sortDropdown: Locator;
  readonly productCards: Locator;
  readonly productHeadings: Locator;
  readonly viewDetailsLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.sortDropdown = page.getByRole('combobox', { name: 'Sort by' });
    this.productCards = page.locator('main [role="list"]').first().locator('> *:not(style)');
    this.productHeadings = page.locator('main [role="list"]').first().getByRole('heading', { level: 3 });
    this.viewDetailsLinks = page.locator('main').getByRole('link', { name: /view details/i });
  }

  async selectSort(option: string) {
    await this.sortDropdown.selectOption({ label: option });
    await this.page.waitForTimeout(1500);
  }

  async getSelectedSortText(): Promise<string> {
    return this.sortDropdown.evaluate(el => {
      const sel = el as HTMLSelectElement;
      return sel.options[sel.selectedIndex]?.text ?? '';
    });
  }

  async getSortOptions(): Promise<string[]> {
    const options = await this.sortDropdown.locator('option').allTextContents();
    return options.map(o => o.trim()).filter(Boolean);
  }

  async getFirstCardText(): Promise<string> {
    return (await this.productHeadings.first().textContent()) ?? '';
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

  async getCardNames(count = 2): Promise<string[]> {
    const names: string[] = [];
    const total = Math.min(count, await this.productHeadings.count());
    for (let i = 0; i < total; i++) {
      names.push(((await this.productHeadings.nth(i).textContent()) ?? '').trim());
    }
    return names;
  }
}
