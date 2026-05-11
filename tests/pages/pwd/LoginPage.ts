import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async loginAsPwD(baseUrl: string, email: string, password: string) {
    await this.page.goto(baseUrl);
    await this.page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await this.page.getByText('Email').first().waitFor({ state: 'visible' });
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.getByText('password').first().waitFor({ state: 'visible' });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.waitForTimeout(3000);
  }
}
