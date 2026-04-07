import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async loginAsVendor(email: string, password: string) {
    await this.page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await this.page.waitForURL(/swarajability-login-flow/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForURL(/has-password-flow/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    // After password submit, handle two possible flows:
    // 1. Consent screen appears → click Continue → lands on product-management
    // 2. Already consented → redirects directly to product-management
    await this.page.waitForURL(
      url => url.href.includes('implicit-consent') || url.href.includes('partner/product-management'),
      { timeout: 45000 }
    );
    if (this.page.url().includes('implicit-consent')) {
      const continueBtn = this.page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
      await Promise.all([
        this.page.waitForURL(/partner\/product-management/, { timeout: 30000 }),
        continueBtn.click()
      ]);
    }
  }

  async loginAsAdmin(email: string, password: string) {
    await this.page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await this.page.waitForURL(/swarajability-login-flow/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForURL(/has-password-flow/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    // Wait for admin dashboard or consent screen
    await this.page.waitForURL(
      url => url.href.includes('implicit-consent') || url.href.includes('admin') || url.href.includes('dashboard'),
      { timeout: 45000 }
    );
    if (this.page.url().includes('implicit-consent')) {
      const continueBtn = this.page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
      await continueBtn.click();
      await this.page.waitForTimeout(3000);
    }
  }

  async loginAsPwd(email: string, password: string) {
    await this.page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await this.page.waitForURL(/swarajability-login-flow/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForURL(/has-password-flow/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    // Wait for PwD dashboard or consent screen
    await this.page.waitForURL(
      url => url.href.includes('implicit-consent') || url.href.includes('catalog') || url.href.includes('dashboard'),
      { timeout: 45000 }
    );
    if (this.page.url().includes('implicit-consent')) {
      const continueBtn = this.page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
      await continueBtn.click();
      await this.page.waitForTimeout(3000);
    }
  }
}
