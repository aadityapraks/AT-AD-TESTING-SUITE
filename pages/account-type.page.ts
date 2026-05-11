import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountTypePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToHomePage(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickSignInRegister(): Promise<void> {
    await this.page.getByRole('link', { name: 'Sign In/Register' }).click();
  }

  async clickCreateNewAccount(): Promise<void> {
    // Use last() to target the topmost popup's link when multiple popups are open
    await this.page.getByRole('link', { name: 'Create New Account' }).last().click();
  }

  async isSignInRegisterVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Sign In/Register' }).isVisible();
  }

  async isAccountTypeSelectionVisible(): Promise<boolean> {
    return await this.page.getByText('Choose Account Type').isVisible();
  }

  async isAccountTypeOptionVisible(accountType: string): Promise<boolean> {
    return await this.page.getByRole('heading', { name: accountType, exact: true }).isVisible();
  }

  async getAccountTypeDescription(accountType: string): Promise<string | null> {
    const heading = this.page.getByRole('heading', { name: accountType, exact: true });
    const card = heading.locator('..');
    const description = card.locator('p');
    return await description.textContent();
  }

  async clickAccountType(accountType: string): Promise<void> {
    await this.page.getByRole('heading', { name: accountType, exact: true }).getByRole('link').click();
  }

  async isBackToSignInVisible(): Promise<boolean> {
    return await this.page.getByText('Back to Sign In').isVisible();
  }

  async clickBackToSignIn(): Promise<void> {
    await this.page.getByRole('link', { name: 'Back to Sign In' }).click();
  }

  async isSecureSSOCardVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Secure SSO Authentication' }).isVisible();
  }

  async getSecureSSOCardText(): Promise<string | null> {
    const heading = this.page.getByRole('heading', { name: 'Secure SSO Authentication' });
    const container = heading.locator('..');
    const paragraph = container.locator('p');
    return await paragraph.first().textContent();
  }

  async isAccountTypeDescriptionVisible(accountType: string, description: string): Promise<boolean> {
    const heading = this.page.getByRole('heading', { name: accountType, exact: true });
    const card = heading.locator('..');
    const desc = card.locator('p');
    const text = await desc.textContent();
    return text?.includes(description) ?? false;
  }

  async isAccountTypeIconVisible(accountType: string): Promise<boolean> {
    // Each account type card has: a container with an img (icon) and a text section with heading + paragraph
    // Navigate from heading → parent (text container) → parent (card container) → find img
    const heading = this.page.getByRole('heading', { name: accountType, exact: true }).last();
    const textContainer = heading.locator('..');
    const cardContainer = textContainer.locator('..');
    try {
      return await cardContainer.locator('img').first().isVisible();
    } catch {
      return false;
    }
  }

  async isChooseAccountTypeHeaderVisible(): Promise<boolean> {
    return await this.page.getByText('Choose Account Type').isVisible();
  }

  async getSelectionPromptText(): Promise<string | null> {
    return await this.page.getByText("Select the type of account you'd like to register").textContent();
  }

  // --- Dark Mode Methods ---

  async toggleDarkMode(): Promise<void> {
    await this.page.locator('.theme-switch-wrapper').first().click();
  }

  async isDarkModeToggleVisible(): Promise<boolean> {
    return await this.page.locator('.theme-switch-wrapper').first().isVisible();
  }

  async isDarkModeEnabled(): Promise<boolean> {
    return await this.page.getByRole('checkbox', { name: 'Toggle dark mode' }).isChecked();
  }

  // --- Routing Methods ---

  async clickAccountTypeByLabel(accountType: string): Promise<void> {
    await this.page.getByLabel(accountType).click();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForUrlContaining(pattern: string): Promise<void> {
    await this.page.waitForURL(new RegExp(pattern), { timeout: 15000 });
  }

  // --- Sign In Popup Methods ---

  async isSignInWithSwarajAbilityLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Sign In with SwarajAbility' }).isVisible();
  }

  async clickSignInWithSwarajAbilityLink(): Promise<void> {
    await this.page.getByRole('button', { name: 'Sign In with SwarajAbility' }).click();
  }

  // --- Keyboard Navigation Methods ---

  async pressTabKey(): Promise<void> {
    await this.page.keyboard.press('Tab');
  }

  async pressEnterKey(): Promise<void> {
    await this.page.keyboard.press('Enter');
  }

  async pressSpaceKey(): Promise<void> {
    await this.page.keyboard.press('Space');
  }

  async isFocusedElementVisible(): Promise<boolean> {
    return await this.page.locator(':focus').isVisible().catch(() => false);
  }

  // --- Viewport Methods ---

  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  async isHorizontalScrollPresent(): Promise<boolean> {
    return await this.page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  }
}