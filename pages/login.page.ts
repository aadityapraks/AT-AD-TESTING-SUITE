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
    // 2. Already consented → redirects directly via auth/callback to product-management
    try {
      await this.page.waitForURL(
        url => url.href.includes('implicit-consent') || url.href.includes('partner') || url.href.includes('auth/callback'),
        { timeout: 30000 }
      );
    } catch {
      // May have already navigated
    }
    if (this.page.url().includes('implicit-consent')) {
      const continueBtn = this.page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
      await continueBtn.click();
    }
    // Wait for final destination
    await this.page.waitForURL(url => url.href.includes('partner'), { timeout: 30000 });
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
      await Promise.all([
        this.page.waitForURL(url => url.href.includes('admin') || url.href.includes('hub-ui-admin'), { timeout: 30000 }),
        continueBtn.click()
      ]);
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

  async loginAsPwdOnPortal(email: string, password: string) {
    // PwD portal login: click Sign In/Register → popup → Sign In with SwarajAbility → SSO flow
    await this.page.getByRole('link', { name: 'Sign In/Register' }).click();
    await this.page.getByRole('link', { name: 'Sign In with SwarajAbility' }).click();
    await this.page.waitForURL(/swarajability-login-flow/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForURL(/has-password-flow/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.waitForURL(
      url => url.href.includes('implicit-consent') || url.href.includes('qa-atad'),
      { timeout: 45000 }
    );
    if (this.page.url().includes('implicit-consent')) {
      const continueBtn = this.page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
      await continueBtn.click();
    }
    await this.page.waitForURL(/qa-atad\.swarajability\.org/, { timeout: 30000 });
  }
}
