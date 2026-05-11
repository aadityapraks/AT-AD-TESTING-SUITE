import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;

  // Header
  readonly userName: Locator;
  readonly userEmail: Locator;
  readonly exportDataBtn: Locator;

  // Tabs
  readonly profileTab: Locator;
  readonly wishlistTab: Locator;
  readonly inquiriesTab: Locator;
  readonly settingsTab: Locator;

  // Profile tab
  readonly personalInfoHeading: Locator;
  readonly editProfileBtn: Locator;
  readonly saveChangesBtn: Locator;
  readonly cancelBtn: Locator;

  // Settings
  readonly deleteAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header — h1 has the user name, paragraph below has email
    this.userName = page.locator('main h1').first();
    this.userEmail = page.locator('main h1 + p, main h1 ~ p').first();
    this.exportDataBtn = page.getByRole('button', { name: 'Export Data' });

    // Tabs (role=tab)
    this.profileTab = page.getByRole('tab', { name: 'Profile' });
    this.wishlistTab = page.getByRole('tab', { name: /Wishlist/i });
    this.inquiriesTab = page.getByRole('tab', { name: /Inquiries/i });
    this.settingsTab = page.getByRole('tab', { name: 'Settings' });

    // Profile tab content
    this.personalInfoHeading = page.getByRole('heading', { name: 'Personal Information' });
    this.editProfileBtn = page.getByRole('button', { name: 'Edit Profile' });
    this.saveChangesBtn = page.getByRole('button', { name: /Save/i });
    this.cancelBtn = page.getByRole('button', { name: /Cancel/i });

    // Settings
    this.deleteAccountBtn = page.getByRole('button', { name: /Delete/i });
  }

  async goto() {
    await this.page.goto('https://qa-atad.swarajability.org/my-profile/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(5000);
  }

  async login() {
    await this.page.goto('https://qa-atad.swarajability.org/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1500);
    await this.page.locator('a').filter({ hasText: /Sign In/i }).first().click();
    await this.page.waitForTimeout(1500);
    await this.page.locator('a').filter({ hasText: /Sign In with SwarajAbility/i }).first().click();
    await this.page.waitForURL(/auth-d/, { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    await this.page.locator('input[name="uidField"]').fill('candidate8new1@mailto.plus');
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(3000);
    await this.page.locator('input[type="password"]').fill('123456');
    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForTimeout(5000);
    for (let i = 0; i < 5; i++) {
      if (!this.page.url().includes('auth-d')) break;
      await this.page.waitForTimeout(2000);
      await this.page.evaluate(() => {
        function f(r: Document | ShadowRoot) {
          const bs = r.querySelectorAll('button');
          for (const btn of bs) { if (btn.type === 'submit') { btn.click(); return; } }
          for (const el of r.querySelectorAll('*')) { if (el.shadowRoot) f(el.shadowRoot); }
        }
        f(document);
      }).catch(() => {});
      await this.page.waitForTimeout(3000);
    }
    await this.page.waitForURL(/qa-atad/, { timeout: 15000 }).catch(() => {});
    await this.page.waitForTimeout(3000);
  }

  async loginAndGotoProfile() {
    await this.login();
    await this.goto();
  }

  async clickTab(tab: Locator) {
    await tab.click();
    await this.page.waitForTimeout(2000);
  }
}
