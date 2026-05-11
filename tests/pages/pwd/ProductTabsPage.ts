import { Page, Locator } from '@playwright/test';
import { ProductDetailsPage } from './ProductDetailsPage';

export class ProductTabsPage extends ProductDetailsPage {
  readonly tabList: Locator;
  readonly tabs: Locator;
  readonly tabPanels: Locator;

  constructor(page: Page) {
    super(page);
    // Elementor tabs widget — common patterns
    this.tabList = page.locator('[role="tablist"]').first();
    this.tabs = page.locator('[role="tab"]');
    this.tabPanels = page.locator('[role="tabpanel"]');
  }

  async getTabCount(): Promise<number> {
    return this.tabs.count();
  }

  async getTabTexts(): Promise<string[]> {
    const all = await this.tabs.allTextContents();
    return all.map(t => t.trim()).filter(Boolean);
  }

  async clickTabByName(name: string) {
    await this.tabs.filter({ hasText: new RegExp(name, 'i') }).first().click();
    await this.page.waitForTimeout(500);
  }

  async clickTabByIndex(index: number) {
    await this.tabs.nth(index).click();
    await this.page.waitForTimeout(500);
  }

  async getActiveTabText(): Promise<string> {
    const active = this.tabs.filter({ has: this.page.locator('[aria-selected="true"]') });
    if (await active.count() > 0) {
      return ((await active.first().textContent()) ?? '').trim();
    }
    // Fallback: check aria-selected on the tab itself
    const count = await this.tabs.count();
    for (let i = 0; i < count; i++) {
      const sel = await this.tabs.nth(i).getAttribute('aria-selected');
      if (sel === 'true') return ((await this.tabs.nth(i).textContent()) ?? '').trim();
    }
    return '';
  }

  async isTabActive(index: number): Promise<boolean> {
    const sel = await this.tabs.nth(index).getAttribute('aria-selected');
    if (sel === 'true') return true;
    // Fallback: check class for active/selected
    const cls = await this.tabs.nth(index).getAttribute('class') ?? '';
    return /active|selected/i.test(cls);
  }

  async getVisiblePanelCount(): Promise<number> {
    let visible = 0;
    const count = await this.tabPanels.count();
    for (let i = 0; i < count; i++) {
      if (await this.tabPanels.nth(i).isVisible().catch(() => false)) visible++;
    }
    return visible;
  }

  async getVisiblePanelText(): Promise<string> {
    const count = await this.tabPanels.count();
    for (let i = 0; i < count; i++) {
      if (await this.tabPanels.nth(i).isVisible().catch(() => false)) {
        return ((await this.tabPanels.nth(i).textContent()) ?? '').trim();
      }
    }
    return '';
  }
}
