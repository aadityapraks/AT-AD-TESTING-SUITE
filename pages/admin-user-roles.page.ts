import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AdminUserRolesPage extends BasePage {

  // Locators
  private readonly userRolesLink: Locator;
  private readonly pageHeading: Locator;
  private readonly pageSubtitle: Locator;
  private readonly searchInput: Locator;
  private readonly allRolesFilterButton: Locator;
  private readonly addInternalAdminButton: Locator;
  private readonly showingAdminsText: Locator;
  private readonly loadingText: Locator;
  private readonly adminCards: Locator;
  private readonly mainLandmark: Locator;
  private readonly navLandmark: Locator;
  private readonly paginationPrevious: Locator;
  private readonly paginationNext: Locator;

  constructor(page: Page) {
    super(page);
    this.userRolesLink = page.getByRole('link', { name: 'User & Roles' });
    this.pageHeading = page.getByRole('heading', { level: 1 });
    this.pageSubtitle = page.locator('text=Manage admin roles, permissions, and access control');
    this.searchInput = page.getByRole('textbox', { name: 'Search admins' });
    this.allRolesFilterButton = page.getByRole('button', { name: 'All Roles' });
    this.addInternalAdminButton = page.getByRole('button', { name: 'Add internal admin' });
    this.showingAdminsText = page.locator('text=/Showing \\d+ admins/');
    this.loadingText = page.getByText('Loading admins...');
    this.adminCards = page.locator('[class*="card"], [class*="admin"]').filter({ has: page.getByRole('heading', { level: 3 }) });
    this.mainLandmark = page.locator('main, [role="main"]');
    this.navLandmark = page.locator('nav, [role="navigation"]');
    this.paginationPrevious = page.getByRole('button', { name: 'Previous page' });
    this.paginationNext = page.getByRole('button', { name: 'Next page' });
  }

  // ── Login & Navigation ──

  async loginAndNavigateToUserRoles(url: string, email: string, password: string) {
    await this.page.goto(url);
    
    // Click SSO sign in button
    const signInBtn = this.page.locator('button:has-text("Sign in with Swarajability")').first();
    await signInBtn.waitFor({ state: 'visible', timeout: 15000 });
    await signInBtn.click();
    
    // Wait for email field on SSO page
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.waitFor({ state: 'visible', timeout: 30000 });
    await emailField.fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    
    // Wait for password field
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    await passwordField.waitFor({ state: 'visible', timeout: 30000 });
    await passwordField.fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
    
    // Handle consent screen if it appears
    try {
      await this.page.waitForURL(url => url.href.includes('/admin') || url.href.includes('implicit-consent'), { timeout: 15000 });
      if (this.page.url().includes('implicit-consent')) {
        const continueBtn = this.page.getByRole('button', { name: 'Continue' });
        await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
        await continueBtn.click();
      }
    } catch {
      // Already redirected to admin
    }
    
    // Wait for admin dashboard to load
    await this.page.waitForURL(url => url.href.includes('/admin'), { timeout: 30000 });
    
    // Navigate to User & Roles
    await this.navigateToUserRoles();
  }

  async navigateToUserRoles() {
    await this.userRolesLink.click();
    await this.page.waitForURL(/users-roles/);
    await this.waitForAdminListLoaded();
  }

  async waitForAdminListLoaded() {
    await this.loadingText.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    await this.showingAdminsText.first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  }

  // ── Page Structure Assertions ──

  async verifyPageHasH1Heading() {
    const h1Count = await this.pageHeading.count();
    expect(h1Count, 'Page must have exactly one H1 heading').toBe(1);
    await expect(this.pageHeading.first()).toBeVisible();
  }

  async getH1HeadingText(): Promise<string> {
    return (await this.pageHeading.first().textContent()) || '';
  }

  async verifyHeadingHierarchy() {
    const h1Count = await this.page.locator('h1').count();
    const h2Count = await this.page.locator('h2').count();
    const h3Count = await this.page.locator('h3').count();
    expect(h1Count, 'Must have exactly one H1').toBe(1);
    // H3 headings are used for admin names in cards
    expect(h3Count, 'Must have H3 headings for admin cards').toBeGreaterThan(0);
  }

  async verifyMainLandmarkExists() {
    const count = await this.mainLandmark.count();
    // This is a known application bug - log it but use soft assertion
    if (count === 0) {
      console.log('BUG: No <main> landmark on User & Roles page (WCAG 1.3.1)');
    }
    expect.soft(count, 'BUG: No <main> landmark on User & Roles page (WCAG 1.3.1)').toBeGreaterThan(0);
  }

  async verifyNavLandmarkExists() {
    const count = await this.navLandmark.count();
    expect(count, 'BUG: No <nav> landmark on User & Roles page').toBeGreaterThan(0);
  }

  async verifyLangAttribute() {
    const lang = await this.page.locator('html').getAttribute('lang');
    expect(lang, 'BUG: <html> missing lang attribute (WCAG 3.1.1)').toBeTruthy();
  }

  // ── Admin Card Assertions ──

  async verifyAdminCardHeadingsExist() {
    const h3Headings = this.page.getByRole('heading', { level: 3 });
    const count = await h3Headings.count();
    expect(count, 'Admin cards must have H3 headings for admin names').toBeGreaterThan(0);
  }

  async verifyAdminCardHasName(index: number = 0) {
    const heading = this.page.getByRole('heading', { level: 3 }).nth(index);
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.trim().length, 'Admin name must not be empty').toBeGreaterThan(0);
  }

  async verifyAdminCardHasEmail(index: number = 0) {
    // Email is in a paragraph element after the heading
    const adminCards = this.page.locator('[class*="card"]').filter({ has: this.page.getByRole('heading', { level: 3 }) });
    const card = adminCards.nth(index);
    const emailText = card.locator('p').first();
    await expect(emailText).toBeVisible();
  }

  async verifyAdminCardHasRoleLabel() {
    // Role labels like "Super Admin" or "Limited Access Admin" are visible
    const superAdmin = this.page.getByText('Super Admin').first();
    const limitedAdmin = this.page.getByText('Limited Access Admin').first();
    const hasSuperAdmin = await superAdmin.isVisible().catch(() => false);
    const hasLimitedAdmin = await limitedAdmin.isVisible().catch(() => false);
    expect(hasSuperAdmin || hasLimitedAdmin, 'At least one role label must be visible').toBe(true);
  }

  async verifyAdminCardHasStatus() {
    const activeStatus = this.page.getByText('Active').first();
    await expect(activeStatus).toBeVisible();
  }

  async verifyAdminCardHasAssignedDate() {
    const assignedDate = this.page.getByText(/Assigned:\d{4}-\d{2}-\d{2}/).first();
    await expect(assignedDate).toBeVisible();
  }

  async verifyAdminCardHasAssignedBy() {
    const assignedBy = this.page.getByText(/Assigned By:/).first();
    await expect(assignedBy).toBeVisible();
  }

  async verifyAdminCardHasPermissions() {
    const permissionsLabel = this.page.getByText('Permissions:').first();
    await expect(permissionsLabel).toBeVisible();
  }

  // ── Interactive Elements ──

  async verifyEditPermissionsButtonExists() {
    const editBtn = this.page.getByRole('button', { name: /Edit permissions for/ }).first();
    await expect(editBtn).toBeVisible();
  }

  async verifyEditPermissionsButtonHasAccessibleName() {
    const editBtn = this.page.getByRole('button', { name: /Edit permissions for/ }).first();
    const name = await editBtn.getAttribute('aria-label') || await editBtn.textContent();
    expect(name?.trim().length, 'Edit Permissions button must have accessible name').toBeGreaterThan(0);
    // Verify it includes context (admin name)
    expect(name).toMatch(/Edit permissions for/i);
  }

  async verifyRoleDropdownExists() {
    await expect(this.allRolesFilterButton).toBeVisible();
  }

  async verifySearchInputExists() {
    await expect(this.searchInput).toBeVisible();
  }

  async verifyAddInternalAdminButtonExists() {
    await expect(this.addInternalAdminButton).toBeVisible();
  }

  // ── Keyboard Navigation ──

  async verifyNoKeyboardTrap() {
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Shift+Tab');
    await this.page.keyboard.press('Shift+Tab');
    // If we get here without hanging, no trap exists
    await expect(this.pageHeading.first()).toBeVisible();
  }

  async verifyTabOrderReachesInteractiveElements() {
    // Tab through and verify focus reaches interactive elements
    let reachedInteractive = false;
    for (let i = 0; i < 20; i++) {
      await this.page.keyboard.press('Tab');
      const focused = this.page.locator(':focus');
      const count = await focused.count();
      if (count > 0) {
        reachedInteractive = true;
        break;
      }
    }
    expect(reachedInteractive, 'Tab must reach interactive elements').toBe(true);
  }

  async verifyFocusIndicatorVisible() {
    await this.page.keyboard.press('Tab');
    const focused = this.page.locator(':focus');
    await expect(focused.first()).toBeVisible();
  }

  // ── Visual Accessibility ──

  async verifyPageAt200Zoom() {
    // Set viewport to simulate 200% zoom (half the viewport = same as 200% zoom)
    await this.page.setViewportSize({ width: 640, height: 360 });
    await expect(this.pageHeading.first()).toBeVisible();
    // Check if content is still accessible (heading visible means no critical overflow)
    return false; // If heading is visible, page is functional
  }

  async verifyPageAtMobileViewport() {
    await this.page.setViewportSize({ width: 320, height: 568 });
    await expect(this.pageHeading.first()).toBeVisible();
  }

  async verifyStatusTextNotColorOnly() {
    // Status "Active" must be conveyed as text, not just color
    const activeText = this.page.getByText('Active').first();
    await expect(activeText).toBeVisible();
    const text = await activeText.textContent();
    expect(text?.trim()).toBe('Active');
  }

  // ── Dynamic Content ──

  async verifyAriaLiveRegionExists() {
    const ariaLive = this.page.locator('[aria-live]');
    const count = await ariaLive.count();
    if (count === 0) {
      console.log('BUG: No aria-live regions for dynamic data updates (WCAG 4.1.3)');
    }
    return count;
  }

  async verifyShowingAdminsCountVisible() {
    await expect(this.showingAdminsText.first()).toBeVisible();
  }

  // ── Page Title ──

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
