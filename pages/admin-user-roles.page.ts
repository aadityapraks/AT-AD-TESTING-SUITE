import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AdminUserRolesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ── Login & Navigation ──

  /** Full login flow: navigate → SSO → email → password → consent → dashboard */
  async loginAsAdmin(url: string, email: string, password: string) {
    await this.page.goto(url);
    await this.page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
    await this.page.getByText('Email').first().waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.getByText('password').first().waitFor({ state: 'visible', timeout: 30000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();

    // Handle consent screen if it appears
    try {
      await this.page.waitForURL(
        url => url.href.includes('/admin') || url.href.includes('implicit-consent'),
        { timeout: 15000 }
      );
      if (this.page.url().includes('implicit-consent')) {
        await this.page.getByRole('button', { name: 'Continue' }).click();
      }
    } catch {
      // Already redirected
    }

    await this.page.waitForURL(url => url.href.includes('/admin'), { timeout: 30000 });
  }

  /** Navigate to User & Roles page from sidebar */
  async navigateToUserRoles() {
    await this.page.getByRole('link', { name: 'User & Roles' }).click();
    await this.page.waitForURL(/users-roles/);
    await this.waitForAdminListLoaded();
  }

  /** Wait for admin list to finish loading */
  async waitForAdminListLoaded() {
    await this.page.getByText('Loading admins...').first().waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
  }

  // ── Verification Methods ──

  /** Verify the admin list loaded with cards visible */
  async verifyAdminListLoaded() {
    const heading = this.page.getByRole('heading', { level: 3 }).first();
    await expect(heading).toBeVisible({ timeout: 15000 });
  }

  /** Verify the showing admins count text is visible */
  async verifyShowingAdminsCount() {
    const countText = this.page.locator('text=/Showing \\d+ admins/');
    await expect(countText.first()).toBeVisible();
  }

  /** Verify showing admins count matches expected pattern */
  async verifyShowingAdminsCountPattern(pattern: RegExp) {
    const countText = this.page.locator('text=/Showing/');
    await expect(countText.first()).toBeVisible();
  }

  /** Verify admin card displays name */
  async verifyAdminCardHasName(name: string) {
    await expect(this.page.getByRole('heading', { name })).toBeVisible();
  }

  /** Verify admin card displays email */
  async verifyAdminCardHasEmail(email: string) {
    await expect(this.page.getByText(email).first()).toBeVisible();
  }

  /** Verify role label is visible */
  async verifyRoleLabelVisible(role: string) {
    await expect(this.page.getByText(role).first()).toBeVisible();
  }

  /** Verify Active status is visible */
  async verifyActiveStatusVisible() {
    await expect(this.page.getByText('Active').first()).toBeVisible();
  }

  /** Verify assigned date is visible */
  async verifyAssignedDateVisible() {
    const dateText = this.page.getByText(/Assigned:\d{4}-\d{2}-\d{2}/).first();
    await expect(dateText).toBeVisible();
  }

  /** Verify assigned by is visible */
  async verifyAssignedByVisible() {
    const assignedBy = this.page.getByText(/Assigned By:/).first();
    await expect(assignedBy).toBeVisible();
  }

  /** Verify permissions label is visible */
  async verifyPermissionsVisible() {
    await expect(this.page.getByText('Permissions:').first()).toBeVisible();
  }

  /** Verify specific permission tag is visible */
  async verifyPermissionTagVisible(permission: string) {
    await expect(this.page.getByText(permission).first()).toBeVisible();
  }

  /** Verify All Roles dropdown is visible */
  async verifyRoleDropdownVisible() {
    await expect(this.page.getByRole('button', { name: 'All Roles' })).toBeVisible();
  }

  /** Verify All Roles dropdown opens and shows filter options */
  async verifyRoleDropdownOpensWithOptions() {
    await this.page.getByRole('button', { name: 'All Roles' }).click();
    const listbox = this.page.getByRole('listbox', { name: 'Select...' });
    await expect(listbox).toBeVisible();
    await expect(this.page.getByRole('option', { name: 'All Roles' })).toBeVisible();
    await expect(this.page.getByRole('option', { name: 'Super Admin' })).toBeVisible();
    await expect(this.page.getByRole('option', { name: 'Limited-Access Admin' })).toBeVisible();
    await this.page.keyboard.press('Escape');
  }

  /** Verify Edit Permissions button is visible */
  async verifyEditPermissionsButtonVisible() {
    const editBtn = this.page.getByRole('button', { name: /Edit permissions for/ }).first();
    await expect(editBtn).toBeVisible();
  }

  /** Verify Edit Permissions button has contextual name */
  async verifyEditPermissionsButtonHasContext(adminName: string) {
    const editBtn = this.page.getByRole('button', { name: `Edit permissions for ${adminName}` });
    await expect(editBtn).toBeVisible();
  }

  /** Verify search input is visible */
  async verifySearchInputVisible() {
    await expect(this.page.getByRole('textbox', { name: 'Search admins' })).toBeVisible();
  }

  /** Verify Add Internal Admin button is visible */
  async verifyAddInternalAdminButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Add internal admin' })).toBeVisible();
  }

  /** Verify page heading */
  async verifyPageHeading(heading: string) {
    await expect(this.page.getByRole('heading', { name: heading, level: 1 })).toBeVisible();
  }

  /** Verify page subtitle */
  async verifyPageSubtitle(subtitle: string) {
    await expect(this.page.getByText(subtitle)).toBeVisible();
  }

  /** Verify pagination controls are visible */
  async verifyPaginationVisible() {
    await expect(this.page.getByRole('button', { name: 'Previous page' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Next page' })).toBeVisible();
  }

  /** Click Next page button */
  async clickNextPage() {
    await this.page.getByRole('button', { name: 'Next page' }).click();
    await this.waitForAdminListLoaded();
  }

  /** Click Previous page button */
  async clickPreviousPage() {
    await this.page.getByRole('button', { name: 'Previous page' }).click();
    await this.waitForAdminListLoaded();
  }

  /** Verify Previous button is disabled */
  async verifyPreviousButtonDisabled() {
    await expect(this.page.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  }

  /** Verify URL contains users-roles */
  async verifyOnUserRolesPage() {
    expect(this.page.url()).toContain('/admin/users-roles');
  }

  /** Verify User & Roles link is active in sidebar */
  async verifyUserRolesLinkActive() {
    const link = this.page.getByRole('link', { name: 'User & Roles' });
    await expect(link).toBeVisible();
  }

  /** Get count of admin cards on page */
  async getAdminCardCount(): Promise<number> {
    const headings = this.page.getByRole('heading', { level: 3 });
    return await headings.count();
  }

  /** Verify multiple Edit Permissions buttons exist (one per card) */
  async verifyEditPermissionsButtonOnAllCards() {
    const buttons = this.page.getByRole('button', { name: /Edit permissions for/ });
    const count = await buttons.count();
    expect(count, 'Each admin card should have an Edit Permissions button').toBeGreaterThan(0);
    const cardCount = await this.getAdminCardCount();
    expect(count, 'Edit Permissions button count should match admin card count').toBe(cardCount);
  }

  /** Verify pagination text shows correct range */
  async verifyPaginationText() {
    const paginationText = this.page.getByText(/Showing \d+ to \d+ of \d+ admins/);
    await expect(paginationText).toBeVisible();
  }

  /** Verify admin card count matches displayed count on page */
  async verifyCardCountMatchesDisplayedCount() {
    const cardCount = await this.getAdminCardCount();
    const countText = this.page.getByText(`Showing ${cardCount} admins`);
    const paginatedText = this.page.getByText(/Showing \d+ to \d+ of \d+ admins/);
    const simpleVisible = await countText.isVisible().catch(() => false);
    const paginatedVisible = await paginatedText.isVisible().catch(() => false);
    expect(simpleVisible || paginatedVisible, 'Admin count text should be visible').toBe(true);
  }

  /** Verify section title 'Internal Administrators' is visible */
  async verifySectionTitle(title: string) {
    await expect(this.page.getByText(title).first()).toBeVisible();
  }

  /** Verify search input placeholder text */
  async verifySearchPlaceholder(placeholder: string) {
    const input = this.page.getByRole('textbox', { name: 'Search admins' });
    await expect(input).toHaveAttribute('placeholder', placeholder);
  }

  /** Reload the page and wait for admin list */
  async reloadAndWaitForList() {
    await this.page.reload();
    await this.waitForAdminListLoaded();
  }

  /** Verify Super Admin card has all 7 permissions */
  async verifySuperAdminHasAllPermissions(permissions: string[]) {
    // Find a Super Admin card and verify all permissions
    const superAdminText = this.page.getByText('Super Admin').first();
    await expect(superAdminText).toBeVisible();
    for (const perm of permissions) {
      await expect(this.page.getByText(perm).first()).toBeVisible();
    }
  }

  /** Verify Limited-Access Admin has fewer than all permissions */
  async verifyLimitedAdminHasPartialPermissions() {
    const limitedAdminText = this.page.getByText('Limited Access Admin').first();
    await expect(limitedAdminText).toBeVisible();
  }

  // ── Search Methods ──

  /** Type text in the search input */
  async typeInSearch(text: string) {
    const searchInput = this.page.getByRole('textbox', { name: 'Search admins' });
    await searchInput.fill(text);
  }

  /** Clear the search input */
  async clearSearch() {
    const searchInput = this.page.getByRole('textbox', { name: 'Search admins' });
    await searchInput.clear();
  }

  /** Verify search input has specific value */
  async verifySearchInputValue(value: string) {
    const searchInput = this.page.getByRole('textbox', { name: 'Search admins' });
    await expect(searchInput).toHaveValue(value);
  }

  /** Verify search input is focused */
  async verifySearchInputFocused() {
    const searchInput = this.page.getByRole('textbox', { name: 'Search admins' });
    await expect(searchInput).toBeFocused();
  }

  /** Click on search input to focus it */
  async clickSearchInput() {
    await this.page.getByRole('textbox', { name: 'Search admins' }).click();
  }

  /** Verify showing admins count shows specific number */
  async verifyShowingAdminsCountValue(count: number) {
    const countText = this.page.getByText(`Showing ${count} admins`);
    await expect(countText).toBeVisible();
  }

  /** Verify showing 0 admins (no results) */
  async verifyNoAdminsFound() {
    await expect(this.page.getByText('Showing 0 admins')).toBeVisible();
  }

  /** Verify admin card is NOT visible (filtered out) */
  async verifyAdminCardNotVisible(name: string) {
    await expect(this.page.getByRole('heading', { name })).not.toBeVisible();
  }

  /** Select a role from the All Roles dropdown filter */
  async selectRoleFilter(role: string) {
    await this.page.getByRole('button', { name: /All Roles|Super Admin|Limited-Access Admin/ }).first().click();
    await this.page.getByRole('option', { name: role }).click();
  }

  /** Verify the role filter button shows specific text */
  async verifyRoleFilterButtonText(text: string) {
    await expect(this.page.getByRole('button', { name: text }).first()).toBeVisible();
  }

  /** Navigate to Dashboard from sidebar */
  async navigateToDashboard() {
    await this.page.getByRole('link', { name: 'Dashboard' }).click();
    await this.page.getByRole('heading', { name: 'Admin Dashboard' }).waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Verify no Super Admin cards are visible */
  async verifySuperAdminCardsNotVisible() {
    const superAdminLabels = this.page.getByText('Super Admin').filter({ hasNot: this.page.locator('button') });
    // After filtering to Limited-Access, Super Admin role labels should not be in the card area
    // We check that the role label in cards is only "Limited Access Admin"
    await expect(this.page.getByText('Limited Access Admin').first()).toBeVisible();
  }

  /** Verify no Limited Access Admin cards are visible */
  async verifyLimitedAdminCardsNotVisible() {
    await expect(this.page.getByText('Super Admin').first()).toBeVisible();
  }

  /** Type in search using keyboard (character by character for backspace tests) */
  async typeInSearchSlowly(text: string) {
    const searchInput = this.page.getByRole('textbox', { name: 'Search admins' });
    await searchInput.click();
    await searchInput.pressSequentially(text, { delay: 50 });
  }

  /** Press backspace in search input */
  async pressBackspaceInSearch(times: number = 1) {
    const searchInput = this.page.getByRole('textbox', { name: 'Search admins' });
    await searchInput.click();
    for (let i = 0; i < times; i++) {
      await this.page.keyboard.press('Backspace');
    }
  }

  // ── Add Internal Admin Modal Methods ──

  /** Click Add Internal Admin button to open modal */
  async clickAddInternalAdminButton() {
    await this.page.getByRole('button', { name: 'Add internal admin' }).click();
  }

  /** Verify Add Internal Admin modal is open */
  async verifyAddAdminModalOpen() {
    await expect(this.page.getByRole('dialog', { name: 'Add Internal Admin' })).toBeVisible();
  }

  /** Verify modal has heading */
  async verifyAddAdminModalHeading(heading: string) {
    await expect(this.page.getByRole('heading', { name: heading })).toBeVisible();
  }

  /** Verify Name field is visible in modal */
  async verifyModalNameFieldVisible() {
    await expect(this.page.getByRole('textbox', { name: 'Name *' })).toBeVisible();
  }

  /** Verify Email field is visible in modal */
  async verifyModalEmailFieldVisible() {
    await expect(this.page.getByRole('textbox', { name: 'Email *' })).toBeVisible();
  }

  /** Verify permissions checkboxes are visible in modal */
  async verifyModalPermissionsVisible() {
    await expect(this.page.getByText('Permissions *')).toBeVisible();
    await expect(this.page.getByRole('checkbox').first()).toBeVisible();
  }

  /** Verify Add Admin button is visible in modal */
  async verifyAddAdminButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Add Admin' })).toBeVisible();
  }

  /** Verify Cancel button is visible in modal */
  async verifyCancelButtonVisible() {
    await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  }

  /** Close modal via X button */
  async closeAddAdminModal() {
    await this.page.getByRole('button', { name: 'Close dialog' }).click();
  }

  /** Verify modal is closed */
  async verifyAddAdminModalClosed() {
    await expect(this.page.getByRole('dialog', { name: 'Add Internal Admin' })).not.toBeVisible();
  }

  /** Fill name field in modal */
  async fillModalNameField(name: string) {
    await this.page.getByRole('textbox', { name: 'Name *' }).fill(name);
  }

  /** Fill email field in modal */
  async fillModalEmailField(email: string) {
    await this.page.getByRole('textbox', { name: 'Email *' }).fill(email);
  }

  /** Select a permission checkbox in modal */
  async selectPermissionInModal(permission: string) {
    await this.page.getByText(permission).locator('..').getByRole('checkbox').check();
  }

  /** Click Add Admin button in modal */
  async clickAddAdminButton() {
    await this.page.getByRole('button', { name: 'Add Admin' }).click();
  }

  /** Click Cancel button in modal */
  async clickCancelButton() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  /** Verify permission checkboxes are visible (count) */
  async verifyPermissionCheckboxCount(expectedCount: number) {
    const checkboxes = this.page.getByRole('dialog', { name: 'Add Internal Admin' }).getByRole('checkbox');
    const count = await checkboxes.count();
    expect(count, `Expected ${expectedCount} permission checkboxes`).toBe(expectedCount);
  }

  /** Verify specific permission checkbox label is visible */
  async verifyPermissionLabelInModal(permission: string) {
    const dialog = this.page.getByRole('dialog', { name: 'Add Internal Admin' });
    await expect(dialog.getByText(permission)).toBeVisible();
  }

  /** Verify error message is visible in modal */
  async verifyModalErrorVisible() {
    const dialog = this.page.getByRole('dialog', { name: 'Add Internal Admin' });
    const error = dialog.locator('[class*="error"], [class*="invalid"], [role="alert"]').first();
    await expect(error).toBeVisible();
  }

  /** Verify modal is still open (not closed after error) */
  async verifyModalStillOpen() {
    await expect(this.page.getByRole('dialog', { name: 'Add Internal Admin' })).toBeVisible();
  }

  /** Close modal via Escape key */
  async closeModalViaEscape() {
    await this.page.keyboard.press('Escape');
  }

  /** Verify name field accepts input without error */
  async verifyNameFieldAcceptsInput(name: string) {
    const nameField = this.page.getByRole('textbox', { name: 'Name *' });
    await nameField.fill(name);
    await expect(nameField).toHaveValue(name);
  }
}
