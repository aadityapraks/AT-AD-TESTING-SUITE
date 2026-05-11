import { Page, Locator } from '@playwright/test';
import { CatalogFiltersPage } from './CatalogFiltersPage';

export class CatalogSearchPage extends CatalogFiltersPage {
  readonly suggestionsDropdown: Locator;
  readonly suggestionItems: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.suggestionsDropdown = page.getByRole('listbox');
    this.suggestionItems = page.getByRole('option');
    this.noResultsMessage = page.locator('text=/no.*found|no.*results|no.*devices|no matching/i');
  }

  async searchAndApply(term: string) {
    await this.searchBar.fill(term);
    await this.applyFilterBtn.click();
    await this.page.waitForTimeout(1500);
  }

  async searchViaEnter(term: string) {
    await this.searchBar.fill(term);
    await this.searchBar.press('Enter');
    await this.page.waitForTimeout(1500);
  }

  async clearSearch() {
    await this.searchBar.clear();
    await this.applyFilterBtn.click();
    await this.page.waitForTimeout(1500);
  }

  async typePartial(term: string) {
    await this.searchBar.click();
    await this.searchBar.pressSequentially(term, { delay: 100 });
    await this.page.waitForTimeout(1000);
  }

  async isSuggestionsVisible(): Promise<boolean> {
    return this.suggestionsDropdown.isVisible().catch(() => false);
  }

  async getSuggestionCount(): Promise<number> {
    return this.suggestionItems.count();
  }
}
