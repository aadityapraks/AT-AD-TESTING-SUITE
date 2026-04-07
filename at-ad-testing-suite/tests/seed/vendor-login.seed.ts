// Reusable login seed for vendor tests
// Usage: import { vendorLogin } from '../seed/vendor-login.seed';

import { Page } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

export async function vendorLogin(page: Page, baseUrl: string, email: string, password: string): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.navigate(baseUrl);
  await loginPage.loginAsVendor(email, password);
}
