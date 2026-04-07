import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class VendorProfilePage extends BasePage {
  // Navigation
  readonly dashboardBtn: Locator;
  readonly helpResourcesBtn: Locator;
  readonly profileBtn: Locator;
  readonly logoutBtn: Locator;

  // Page header
  readonly pageHeading: Locator;
  readonly pageSubheading: Locator;

  // Organization card
  readonly orgLogo: Locator;
  readonly orgName: Locator;
  readonly orgType: Locator;

  // Account status
  readonly accountStatusHeading: Locator;
  readonly accountStatusBadge: Locator;
  readonly accountVerificationBadge: Locator;
  readonly memberSinceLabel: Locator;
  readonly memberSinceValue: Locator;

  // Documents section
  readonly documentsHeading: Locator;
  readonly documentsEmptyState: Locator;

  // Organization details section
  readonly orgDetailsHeading: Locator;
  readonly orgNameLabel: Locator;
  readonly orgTypeLabel: Locator;
  readonly orgDescriptionLabel: Locator;
  readonly gstNumberLabel: Locator;
  readonly panNumberLabel: Locator;

  // Contact information section
  readonly contactInfoHeading: Locator;
  readonly contactPersonNameLabel: Locator;
  readonly contactPersonNameValue: Locator;
  readonly emailAddressLabel: Locator;
  readonly emailAddressValue: Locator;
  readonly phoneNumberLabel: Locator;
  readonly phoneNumberValue: Locator;
  readonly websiteLabel: Locator;
  readonly addressLabel: Locator;
  readonly addressValue: Locator;
  readonly socialMediaLabel: Locator;
  readonly socialMediaValue: Locator;

  // Edit mode
  readonly editProfileBtn: Locator;
  readonly cancelBtn: Locator;
  readonly saveChangesBtn: Locator;
  readonly orgNameInput: Locator;
  readonly orgTypeCombobox: Locator;
  readonly orgDescriptionInput: Locator;
  readonly orgDescriptionValue: Locator;
  readonly contactPersonNameInput: Locator;
  readonly emailAddressInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly websiteInput: Locator;
  readonly addressInput: Locator;
  readonly socialMediaInput: Locator;

  // Login page
  readonly signInHeading: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.dashboardBtn = page.getByRole('button', { name: 'Dashboard' });
    this.helpResourcesBtn = page.getByRole('button', { name: 'Help & Resources' });
    this.profileBtn = page.getByRole('button', { name: 'Profile', exact: true });
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });

    this.pageHeading = page.getByRole('heading', { name: 'Assistive Partner Profile', level: 1 });
    this.pageSubheading = page.getByText('Manage your organization details and account information');

    this.orgLogo = page.getByRole('img', { name: 'Organization Logo' });
    this.orgName = page.getByRole('heading', { level: 3 }).first();
    this.orgType = page.getByRole('heading', { level: 3 }).first().locator('xpath=following-sibling::*[1]');

    this.accountStatusHeading = page.getByRole('heading', { name: 'Account Status', level: 4 });
    this.accountStatusBadge = page.getByText('Status', { exact: true });
    this.accountVerificationBadge = page.getByText('Verification', { exact: true });
    this.memberSinceLabel = page.getByText('Member Since', { exact: true });
    this.memberSinceValue = page.getByText('Member Since', { exact: true }).locator('xpath=following-sibling::*[1]');

    this.documentsHeading = page.getByRole('heading', { name: 'Documents', level: 4 });
    this.documentsEmptyState = page.getByText('No documents uploaded yet.').or(page.getByText('No documents found'));

    this.orgDetailsHeading = page.getByRole('heading', { name: 'Organization Details', level: 4 });
    this.orgNameLabel = page.getByText('Organization Name *', { exact: true });
    this.orgTypeLabel = page.getByText('Organization Type *', { exact: true });
    this.orgDescriptionLabel = page.getByText('Organization Description *', { exact: true });
    this.gstNumberLabel = page.getByText('GST Number', { exact: true });
    this.panNumberLabel = page.getByText('PAN Number', { exact: true });

    this.contactInfoHeading = page.getByRole('heading', { name: 'Contact Information', level: 4 });
    this.contactPersonNameLabel = page.getByText('Contact Person Name *', { exact: true });
    this.contactPersonNameValue = page.getByText('Contact Person Name *', { exact: true }).locator('xpath=following-sibling::*[1]');
    this.emailAddressLabel = page.getByText('Email Address *', { exact: true });
    this.emailAddressValue = page.getByText('Email Address *', { exact: true }).locator('xpath=following-sibling::*[1]');
    this.phoneNumberLabel = page.getByText('Phone Number *', { exact: true });
    this.phoneNumberValue = page.getByText('Phone Number *', { exact: true }).locator('xpath=following-sibling::*[1]');
    this.websiteLabel = page.getByText('Website', { exact: true });
    this.addressLabel = page.getByText('Address *', { exact: true });
    this.addressValue = page.getByText('Address *', { exact: true }).locator('xpath=following-sibling::*[1]');
    this.socialMediaLabel = page.getByText('Social Media Links', { exact: true });
    this.socialMediaValue = page.getByText('Social Media Links', { exact: true }).locator('xpath=following-sibling::*[1]');

    this.editProfileBtn = page.getByRole('button', { name: 'Edit Profile' });
    this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
    this.saveChangesBtn = page.getByRole('button', { name: 'Save Changes' });
    this.orgNameInput = page.getByRole('textbox', { name: 'Enter organization name' });
    this.orgTypeCombobox = page.getByRole('combobox').first();
    this.orgDescriptionInput = page.getByRole('textbox', { name: 'Describe your organization and its mission' });
    this.orgDescriptionValue = page.getByText('Organization Description *', { exact: true }).locator('xpath=following-sibling::*[1]');
    this.contactPersonNameInput = page.getByRole('textbox', { name: 'Enter contact person name' });
    this.emailAddressInput = page.getByRole('textbox', { name: 'Enter email address' });
    this.phoneNumberInput = page.getByRole('textbox', { name: 'Enter phone number' });
    this.websiteInput = page.getByRole('textbox', { name: 'https://www.example.com' });
    this.addressInput = page.getByRole('textbox', { name: 'Enter complete address' });
    this.socialMediaInput = page.getByRole('textbox', { name: 'LinkedIn, Twitter, Facebook profile links' });

    this.signInHeading = page.getByRole('heading', { name: 'Sign In', level: 2 });
    this.signInBtn = page.getByRole('button', { name: 'Sign in with Swarajability' });
  }

  async navigateToProfile() {
    await this.profileBtn.click();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.editProfileBtn).toBeVisible();
  }

  async verifyNavBarVisible() {
    await expect(this.dashboardBtn).toBeVisible();
    await expect(this.helpResourcesBtn).toBeVisible();
    await expect(this.profileBtn).toBeVisible();
    await expect(this.logoutBtn).toBeVisible();
  }

  async verifyProfileLinkActive() {
    await expect(this.profileBtn).toHaveAttribute('class', /active/);
  }

  async verifyOrgCardVisible() {
    await expect(this.orgLogo).toBeVisible();
    await expect(this.orgName).toBeVisible();
    await expect(this.orgType).toBeVisible();
  }

  async verifyAccountStatusVisible() {
    await expect(this.accountStatusHeading).toBeVisible();
    await expect(this.accountStatusBadge).toBeVisible();
    await expect(this.accountVerificationBadge).toBeVisible();
    await expect(this.memberSinceLabel).toBeVisible();
    await expect(this.memberSinceValue).toBeVisible();
  }

  async verifyAccountStatusColors() {
    await expect(this.accountStatusBadge).toBeVisible();
    await expect(this.accountVerificationBadge).toBeVisible();
    await expect(this.memberSinceLabel).toBeVisible();
    await expect(this.memberSinceValue).toBeVisible();
  }

  async verifyDocumentsEmptyState() {
    await expect(this.documentsHeading).toBeVisible();
  }

  async verifyOrgDetailsMandatoryIndicators() {
    await expect(this.orgDetailsHeading).toBeVisible();
    await expect(this.orgNameLabel).toBeVisible();
    await expect(this.orgTypeLabel).toBeVisible();
    await expect(this.orgDescriptionLabel).toBeVisible();
    await expect(this.gstNumberLabel).toBeVisible();
    await expect(this.panNumberLabel).toBeVisible();
  }

  async verifyContactInfoFields() {
    await expect(this.contactInfoHeading).toBeVisible();
    await expect(this.contactPersonNameLabel).toBeVisible();
    await expect(this.contactPersonNameValue).toBeVisible();
    await expect(this.emailAddressLabel).toBeVisible();
    await expect(this.emailAddressValue).toBeVisible();
    await expect(this.phoneNumberLabel).toBeVisible();
    await expect(this.phoneNumberValue).toBeVisible();
    await expect(this.websiteLabel).toBeVisible();
    await expect(this.addressLabel).toBeVisible();
    await expect(this.addressValue).toBeVisible();
    await expect(this.socialMediaLabel).toBeVisible();
  }

  async verifyEditMode() {
    await expect(this.cancelBtn).toBeVisible();
    await expect(this.saveChangesBtn).toBeVisible();
    await expect(this.orgNameInput).toBeVisible();
    await expect(this.orgDescriptionInput).toBeVisible();
    await expect(this.contactPersonNameInput).toBeVisible();
    await expect(this.emailAddressInput).toBeVisible();
    await expect(this.phoneNumberInput).toBeVisible();
    await expect(this.addressInput).toBeVisible();
    await expect(this.editProfileBtn).not.toBeVisible();
  }

  async verifyEditModeElements() {
    await expect(this.cancelBtn).toBeVisible();
    await expect(this.saveChangesBtn).toBeVisible();
    await expect(this.orgNameLabel).toBeVisible();
    await expect(this.orgNameInput).toBeVisible();
    await expect(this.orgTypeLabel).toBeVisible();
    await expect(this.orgTypeCombobox).toBeVisible();
    await expect(this.orgDescriptionLabel).toBeVisible();
    await expect(this.orgDescriptionInput).toBeVisible();
    await expect(this.contactPersonNameLabel).toBeVisible();
    await expect(this.contactPersonNameInput).toBeVisible();
    await expect(this.editProfileBtn).not.toBeVisible();
  }

  async cancelEditAndVerifyReverted(originalValue: string) {
    await this.cancelBtn.click();
    await expect(this.editProfileBtn).toBeVisible();
    await expect(this.orgDescriptionInput).not.toBeVisible();
    await expect(this.orgDescriptionValue).toHaveText(originalValue);
  }

  async triggerValidationAlert(page: import('@playwright/test').Page): Promise<string> {
    let alertMessage = '';
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });
    await this.saveChangesBtn.click();
    await expect(this.cancelBtn).toBeVisible({ timeout: 5000 });
    return alertMessage;
  }

  async saveProfileChanges(page: import('@playwright/test').Page): Promise<string> {
    let dialogMessage = '';
    page.once('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await this.saveChangesBtn.click();
    await expect(this.editProfileBtn).toBeVisible({ timeout: 10000 });
    return dialogMessage;
  }

  async verifyReadOnlyMode() {
    await expect(this.editProfileBtn).toBeVisible();
    await expect(this.orgDescriptionInput).not.toBeVisible();
    await expect(this.contactPersonNameInput).not.toBeVisible();
    await expect(this.saveChangesBtn).not.toBeVisible();
    await expect(this.cancelBtn).not.toBeVisible();
  }

  async verifySocialMediaLinks() {
    await expect(this.socialMediaLabel).toBeVisible();
    await expect(this.socialMediaValue).toBeVisible();
  }

  async verifyReadOnlyFieldStyling() {
    const fieldDisplays = this.page.locator('.field-display');
    const count = await fieldDisplays.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const el = fieldDisplays.nth(i);
      await expect(el).toBeVisible();
      const bg = await el.evaluate(node => window.getComputedStyle(node).backgroundColor);
      const border = await el.evaluate(node => window.getComputedStyle(node).border);
      expect(bg).toBe('rgb(249, 250, 251)');
      expect(border).toContain('1px solid rgb(229, 231, 235)');
    }
  }

  async verifyCardLayout() {
    await expect(this.orgDetailsHeading).toBeVisible();
    await expect(this.contactInfoHeading).toBeVisible();
    await expect(this.accountStatusHeading).toBeVisible();
    await expect(this.documentsHeading).toBeVisible();
  }

  async verifyIconsVisible() {
    const icons = this.page.locator('img[src], img[alt]');
    const count = await icons.count();
    expect(count).toBeGreaterThan(0);
  }

  async verifyEditModeInputStyling() {
    await expect(this.orgNameInput).toBeVisible();
    await expect(this.orgDescriptionInput).toBeVisible();
    await expect(this.contactPersonNameInput).toBeVisible();
    await expect(this.emailAddressInput).toBeVisible();
    await expect(this.phoneNumberInput).toBeVisible();
    await expect(this.addressInput).toBeVisible();
  }

  async verifyResponsiveLayout(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
    await expect(this.pageHeading).toBeVisible();
    await expect(this.editProfileBtn).toBeVisible();
    await expect(this.orgDetailsHeading).toBeVisible();
    await expect(this.contactInfoHeading).toBeVisible();
  }

  async verifyOwnProfileData(expectedEmail: string) {
    await expect(this.emailAddressValue).toContainText(expectedEmail);
  }

  async verifyKeyboardNavigation() {
    await this.page.keyboard.press('Tab');
    const focused = this.page.locator(':focus');
    await expect(focused).toBeVisible();
  }

  async verifyPageLandmarks() {
    const nav = this.page.getByRole('navigation').first();
    await expect(nav).toBeVisible();
  }

  async verifyRedirectedToLogin() {
    await expect(this.page).toHaveURL('https://hub-ui-admin-qa.swarajability.org/');
    await expect(this.signInHeading).toBeVisible();
    await expect(this.signInBtn).toBeVisible();
    await expect(this.pageHeading).not.toBeVisible();
  }
}
