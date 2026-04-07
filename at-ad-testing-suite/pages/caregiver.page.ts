import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CaregiverPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // --- Navigation ---

  async navigateToPortal(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async openSignInRegisterPopup(): Promise<void> {
    await this.page.getByRole('link', { name: 'Sign In/Register' }).click();
  }

  async clickSignInWithSwarajAbility(): Promise<void> {
    await this.page.getByRole('link', { name: 'Sign In with SwarajAbility' }).click();
  }

  // --- SSO Login Flow ---

  async waitForEmailField(): Promise<void> {
    await this.page.getByText('Email').first().waitFor({ state: 'visible', timeout: 30000 });
  }

  async enterEmail(email: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
  }

  async clickLogIn(): Promise<void> {
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async waitForPasswordField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 30000 });
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
  }

  async clickContinue(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async handleConsentScreenIfPresent(): Promise<void> {
    try {
      const continueBtn = this.page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
      await continueBtn.click();
    } catch {
      // No consent screen, already redirected
    }
  }

  async loginAsCaregiver(url: string, email: string, password: string): Promise<void> {
    await this.navigateToPortal(url);
    await this.openSignInRegisterPopup();
    await this.clickSignInWithSwarajAbility();

    // Wait for either SSO login page or auto-redirect (SSO session cached)
    await this.page.waitForURL(
      u => u.href.includes('swarajability-login-flow') || u.href.includes('implicit-consent') || u.href.includes('auth-callback') || (u.origin === 'https://qa-atad.swarajability.org' && u.pathname !== '/caregiver-portal/'),
      { timeout: 30000 }
    );

    // If on SSO login page, complete the email/password flow
    if (this.page.url().includes('swarajability-login-flow')) {
      await this.waitForEmailField();
      await this.enterEmail(email);
      await this.clickLogIn();

      await this.page.waitForURL(/has-password-flow/, { timeout: 20000 });
      await this.waitForPasswordField();
      await this.enterPassword(password);
      await this.page.getByRole('button', { name: 'Continue' }).click();

      // Wait for navigation away from the password page
      await this.page.waitForURL(
        u => !u.href.includes('has-password-flow'),
        { timeout: 60000 }
      );
    }

    // Handle consent screen if present — wait for the Continue button and click it
    const consentBtn = this.page.getByRole('button', { name: 'Continue' });
    try {
      await consentBtn.waitFor({ state: 'visible', timeout: 15000 });
      await consentBtn.click();
    } catch {
      // No consent screen — already redirected to portal
    }

    // Wait for portal to fully load
    await this.page.waitForURL(u => u.origin === 'https://qa-atad.swarajability.org', { timeout: 60000 });

    // Allow auth callback to complete, then reload to ensure session is fully established
    await this.page.waitForLoadState('load').catch(() => {});
    await this.page.waitForTimeout(3000);
    await this.page.reload({ waitUntil: 'load' }).catch(async () => {
      // If reload fails due to mid-navigation, wait and try once more
      await this.page.waitForLoadState('load').catch(() => {});
    });

    // Verify login succeeded — My Profile link should be visible after reload
    await this.page.getByRole('link', { name: 'My Profile' }).waitFor({ state: 'visible', timeout: 30000 });
  }

  // --- Dashboard Verification ---

  async getWelcomeMessage(): Promise<string> {
    const welcomeEl = this.page.locator('[class*="welcome"], [class*="greeting"]').first();
    await welcomeEl.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    const text = await this.page.locator('text=/Welcome back/').first().textContent();
    return text || '';
  }

  // --- Dashboard Personalization ---

  async isDashboardPersonalized(): Promise<boolean> {
    // Wait for dashboard content to load, then check for personalization indicators
    const welcome = this.page.locator('text=/Welcome back/').first();
    await welcome.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    return await welcome.isVisible().catch(() => false);
  }

  async isGetRecommendationsLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: /Get Recommendations/i }).isVisible();
  }

  async isBrowseAllDevicesLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: /Browse All Devices/i }).isVisible();
  }

  async getDashboardHeadingText(): Promise<string> {
    const heading = this.page.locator('text=/Welcome back|Discover assistive/').first();
    return (await heading.textContent()) || '';
  }

  async isDashboardDescriptionVisible(): Promise<boolean> {
    return await this.page.locator('text=/Discover assistive devices|personalized|recommendations/i').first().isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isSuccessStoriesSectionVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: /Success Stories/i }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isLoggedIn(): Promise<boolean> {
    const myProfileLink = this.page.getByRole('link', { name: 'My Profile' });
    return await myProfileLink.isVisible({ timeout: 10000 }).catch(() => false);
  }

  async isLogoutVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Logout' }).isVisible();
  }

  // --- My Profile Navigation ---

  async navigateToMyProfile(): Promise<void> {
    await this.page.getByRole('link', { name: 'My Profile' }).click();
    await this.page.waitForURL(/my-profile/, { timeout: 15000 });
  }

  async getProfileHeading(): Promise<string> {
    const heading = this.page.getByRole('heading', { name: 'My Profile', level: 1 });
    await heading.waitFor({ state: 'visible', timeout: 10000 });
    return (await heading.textContent()) || '';
  }

  // --- Profile Tabs ---

  async getVisibleTabs(): Promise<string[]> {
    const tabs = this.page.getByRole('tab');
    const count = await tabs.count();
    const tabNames: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await tabs.nth(i).textContent();
      if (text) tabNames.push(text.trim());
    }
    return tabNames;
  }

  async clickProfileTab(tabName: string): Promise<void> {
    await this.page.getByRole('tab', { name: tabName }).click();
  }

  async isProfileTabSelected(tabName: string): Promise<boolean> {
    const tab = this.page.getByRole('tab', { name: tabName });
    const selected = await tab.getAttribute('aria-selected');
    return selected === 'true';
  }

  // --- PwD Registration Checks ---

  async isPwdRegistrationOptionVisible(): Promise<boolean> {
    const pwdRegLink = this.page.locator('text=/Register.*PwD|Add.*PwD|Register & Add PwD/i');
    return await pwdRegLink.isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isPwdRegistrationTabVisible(): Promise<boolean> {
    const pwdTab = this.page.getByRole('tab', { name: /PwD|Dependents|Care/i });
    return await pwdTab.isVisible({ timeout: 5000 }).catch(() => false);
  }

  async searchForPwdRegistrationInPage(): Promise<boolean> {
    const bodyText = await this.page.locator('body').textContent();
    const keywords = ['Register PwD', 'Add PwD', 'Register & Add PwD', 'PwD Registration'];
    return keywords.some(kw => bodyText?.includes(kw));
  }

  // --- Settings Tab ---

  async navigateToSettingsTab(): Promise<void> {
    await this.page.getByRole('tab', { name: 'Settings' }).click();
  }

  async getSettingsHeading(): Promise<string> {
    const heading = this.page.getByRole('heading', { name: /Privacy|Settings/i, level: 2 });
    await heading.waitFor({ state: 'visible', timeout: 10000 });
    return (await heading.textContent()) || '';
  }

  // --- Logout ---

  async logout(): Promise<void> {
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }

  // --- Account Type Selection ---

  async clickCreateNewAccount(): Promise<void> {
    await this.page.getByRole('link', { name: 'Create New Account' }).click();
  }

  async selectCaregiverAccountType(): Promise<void> {
    await this.page.getByLabel('Caregiver').click();
    await this.page.waitForURL(/caregiver-portal/, { timeout: 15000 });
  }

  async navigateToCaregiverRegistration(): Promise<void> {
    await this.page.getByRole('link', { name: 'Create New Account' }).click();
    await this.page.waitForURL(/caregiver-registration/, { timeout: 15000 });
  }

  // --- Caregiver Registration Form ---

  async getRegistrationHeading(): Promise<string> {
    const heading = this.page.getByRole('heading', { name: 'Caregiver Registration', level: 1 });
    await heading.waitFor({ state: 'visible', timeout: 10000 });
    return (await heading.textContent()) || '';
  }

  async isConsentCheckboxVisible(): Promise<boolean> {
    return await this.page.getByRole('checkbox', { name: /I consent to being contacted/ }).isVisible();
  }

  async isConsentCheckboxChecked(): Promise<boolean> {
    return await this.page.getByRole('checkbox', { name: /I consent to being contacted/ }).isChecked();
  }

  async checkConsentCheckbox(): Promise<void> {
    await this.page.getByRole('checkbox', { name: /I consent to being contacted/ }).click();
  }

  async isCompleteRegistrationButtonDisabled(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Complete Registration' }).isDisabled();
  }

  async isCompleteRegistrationButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Complete Registration' }).isVisible();
  }

  async isConsentRequirementMessageVisible(): Promise<boolean> {
    return await this.page.getByText('Provide consent for communication').isVisible({ timeout: 5000 }).catch(() => false);
  }

  async getRegistrationRequirements(): Promise<string[]> {
    const items = this.page.locator('li', { has: this.page.locator('text=/Verify|Provide|Fill/') });
    const count = await items.count();
    const requirements: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).textContent();
      if (text) requirements.push(text.trim());
    }
    return requirements;
  }

  async getPrivacyAlertText(): Promise<string> {
    const alert = this.page.getByRole('alert');
    await alert.waitFor({ state: 'visible', timeout: 10000 });
    return (await alert.textContent()) || '';
  }

  // --- Registration Form Field Interactions ---

  async fillFirstName(firstName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First Name *' }).fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Last Name *' }).fill(lastName);
  }

  async fillMobileNumber(mobile: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(mobile);
  }

  async fillEmailId(email: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email ID *' }).fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Password *', exact: true }).fill(password);
  }

  async fillConfirmPassword(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Confirm Password *' }).fill(password);
  }

  async fillAadharNumber(aadhar: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Aadhar Number *' }).fill(aadhar);
  }

  async fillPincode(pincode: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Pincode *' }).fill(pincode);
  }

  async fillCompleteAddress(address: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Complete Address *' }).fill(address);
  }

  async fillAllRegistrationFields(data: {
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    aadhar: string;
    pincode: string;
    address: string;
  }): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillMobileNumber(data.mobile);
    await this.fillEmailId(data.email);
    await this.fillPassword(data.password);
    await this.fillConfirmPassword(data.confirmPassword);
    await this.fillAadharNumber(data.aadhar);
    await this.fillPincode(data.pincode);
    await this.fillCompleteAddress(data.address);
  }

  // --- Registration Form Verifications ---

  async isPersonalInfoHeadingVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Personal Information' }).isVisible();
  }

  async isFirstNameFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'First Name *' }).isVisible();
  }

  async isLastNameFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Last Name *' }).isVisible();
  }

  async isMobileFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Mobile Number *' }).isVisible();
  }

  async isEmailFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Email ID *' }).isVisible();
  }

  async isPasswordFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Password *', exact: true }).isVisible();
  }

  async isConfirmPasswordFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Confirm Password *' }).isVisible();
  }

  async isAadharFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Aadhar Number *' }).isVisible();
  }

  async isPincodeFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Pincode *' }).isVisible();
  }

  async isAddressFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Complete Address *' }).isVisible();
  }

  async getPasswordStrengthText(): Promise<string> {
    const strengthEl = this.page.locator('text=/Password strength:/');
    await strengthEl.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    return (await strengthEl.textContent()) || '';
  }

  async isPasswordStrengthVisible(strength: string): Promise<boolean> {
    return await this.page.getByText(`Password strength: ${strength}`).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async getAutoPopulatedState(): Promise<string> {
    const stateEl = this.page.locator('text=State').locator('..').locator('p');
    return (await stateEl.textContent()) || '';
  }

  async getAutoPopulatedDistrict(): Promise<string> {
    const districtEl = this.page.locator('text=District').locator('..').locator('p');
    return (await districtEl.textContent()) || '';
  }

  async isSendOtpMobileButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Send OTP' }).first().isVisible();
  }

  async isPasswordFieldMasked(): Promise<boolean> {
    const passwordInput = this.page.getByRole('textbox', { name: 'Password *', exact: true });
    const type = await passwordInput.getAttribute('type');
    return type === 'password';
  }

  async navigateDirectlyToRegistration(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.getByRole('heading', { name: 'Caregiver Registration', level: 1 }).waitFor({ state: 'visible', timeout: 15000 });
  }

  async navigateToRegistrationViaPortal(url: string): Promise<void> {
    await this.navigateToPortal(url);
    await this.openSignInRegisterPopup();
    await this.clickCreateNewAccount();
    await this.selectCaregiverAccountType();
    await this.navigateToCaregiverRegistration();
  }

  // --- Platform Messaging Verifications ---

  async isPrivacySecurityAlertVisible(): Promise<boolean> {
    return await this.page.getByText('Privacy & Security:').isVisible();
  }

  async isSwarajAbilityMentionVisible(): Promise<boolean> {
    return await this.page.getByText('Powered by SwarajAbility').isVisible();
  }

  async isAtAdPortalMentionVisible(): Promise<boolean> {
    return await this.page.getByText('AT/AD Portal').first().isVisible();
  }

  async isTermsOfServiceLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Terms of Service' }).first().isVisible();
  }

  async isPrivacyPolicyLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Privacy Policy' }).first().isVisible();
  }

  async isConsentWithdrawalMessageVisible(): Promise<boolean> {
    return await this.page.getByText('You can withdraw consent anytime from your profile settings.').isVisible();
  }

  async isBackToSignInLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: '← Back to Sign In' }).isVisible();
  }

  async getByRegisteringAgreementText(): Promise<string> {
    const el = this.page.locator('text=/By registering, you agree/');
    return (await el.textContent()) || '';
  }

  // --- Password Validation Methods ---

  async isPasswordRequirementsHintVisible(): Promise<boolean> {
    return await this.page.getByText('At least 8 characters; mix of letters, numbers, and symbols recommended.').isVisible();
  }

  async getPasswordStrengthLabel(): Promise<string> {
    const strengthEl = this.page.locator('text=/Password strength:/');
    await strengthEl.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    return (await strengthEl.textContent()) || '';
  }

  async isWeakPasswordAlertVisible(): Promise<boolean> {
    return await this.page.getByText('Password must be at least 8 characters').isVisible({ timeout: 3000 }).catch(() => false);
  }

  async getPasswordValidationAlertText(): Promise<string> {
    const alert = this.page.locator('[role="alert"]').filter({ hasText: /Password/ });
    const text = await alert.textContent().catch(() => null);
    return text || '';
  }

  async isPasswordMismatchAlertVisible(): Promise<boolean> {
    return await this.page.getByText('Passwords do not match').isVisible({ timeout: 3000 }).catch(() => false);
  }

  async clickAwayFromPasswordField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First Name *' }).click();
  }

  async clearPasswordField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Password *', exact: true }).clear();
  }

  async clearConfirmPasswordField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Confirm Password *' }).clear();
  }

  // --- Email Validation Methods ---

  async getEmailFieldValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: 'Email ID *' }).inputValue();
  }

  async clearEmailField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email ID *' }).clear();
  }

  // --- Phone Validation Methods ---

  async getMobileFieldValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: 'Mobile Number *' }).inputValue();
  }

  async clearMobileField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).clear();
  }

  // --- Special Characters Methods ---

  async getFirstNameFieldValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: 'First Name *' }).inputValue();
  }

  async getLastNameFieldValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: 'Last Name *' }).inputValue();
  }

  async clearFirstNameField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First Name *' }).clear();
  }

  async clearLastNameField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Last Name *' }).clear();
  }

  // --- Accessibility Methods ---

  async pressTabKey(): Promise<void> {
    await this.page.keyboard.press('Tab');
  }

  async getActiveElementRole(): Promise<string | null> {
    return await this.page.locator(':focus').getAttribute('role').catch(() => null);
  }

  async getActiveElementName(): Promise<string | null> {
    return await this.page.locator(':focus').getAttribute('placeholder').catch(() =>
      this.page.locator(':focus').getAttribute('aria-label').catch(() => null)
    );
  }

  async hasAllFieldLabels(): Promise<boolean> {
    const fields = [
      { name: 'First Name *' },
      { name: 'Last Name *' },
      { name: 'Mobile Number *' },
      { name: 'Email ID *' },
      { name: 'Password *', exact: true },
      { name: 'Confirm Password *' },
      { name: 'Aadhar Number *' },
      { name: 'Pincode *' },
      { name: 'Complete Address *' }
    ];
    for (const field of fields) {
      const textbox = field.exact
        ? this.page.getByRole('textbox', { name: field.name, exact: true })
        : this.page.getByRole('textbox', { name: field.name });
      const visible = await textbox.isVisible().catch(() => false);
      if (!visible) return false;
    }
    return true;
  }

  async isShowPasswordButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Show password' }).first().isVisible();
  }

  // --- Account Type Switch Methods ---

  async clickBackToSignInFromRegistration(): Promise<void> {
    await this.page.getByRole('link', { name: '← Back to Sign In' }).click();
  }

  async openSignInPopupFromRegistration(): Promise<void> {
    await this.page.getByRole('link', { name: 'Sign In/Register' }).click();
  }

  async selectPwdAccountType(): Promise<void> {
    await this.page.getByLabel('Person with Disability').click();
  }

  async isPwdRegistrationPageLoaded(): Promise<boolean> {
    return this.page.url().includes('candidate-register');
  }

  async waitForPwdRegistrationPage(): Promise<void> {
    await this.page.waitForURL(/candidate-register/, { timeout: 15000 });
  }

  async isPwdRegistrationDialogVisible(): Promise<boolean> {
    return await this.page.getByText('Candidate Registration').isVisible({ timeout: 10000 }).catch(() => false);
  }

  // --- Caregiver Portal Verification Methods ---

  async isCaregiverPortalHeadingVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Caregiver Portal' }).isVisible();
  }

  async isWelcomeBackHeadingVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Welcome Back' }).isVisible();
  }

  async isSignInButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Sign In with SwarajAbility' }).isVisible();
  }

  async isWhyChoosePortalVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Why Choose AT/AD Portal?' }).isVisible();
  }

  async isRegistrationFormSpecificToCaregiver(): Promise<boolean> {
    const heading = await this.page.getByRole('heading', { name: 'Caregiver Registration' }).isVisible();
    const personalInfo = await this.page.getByRole('heading', { name: 'Personal Information' }).isVisible();
    return heading && personalInfo;
  }

  // --- SSO Login Flow Methods ---

  async clickSignInWithSwarajAbilityButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Sign In with SwarajAbility' }).click();
  }

  async clickSignInWithSwarajAbilityPopupLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Sign In with SwarajAbility' }).click();
  }

  async waitForSSOEmailField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
  }

  async enterSSOEmail(email: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
  }

  async clickSSOLogIn(): Promise<void> {
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async waitForSSOPasswordField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 30000 });
  }

  async enterSSOPassword(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
  }

  async clickSSOContinue(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async handleSSOConsentIfPresent(): Promise<void> {
    try {
      await this.page.waitForURL(
        url => url.href.includes('implicit-consent') || url.href.includes('caregiver-portal') || url.href.includes('auth-callback'),
        { timeout: 30000 }
      );
      if (this.page.url().includes('implicit-consent')) {
        const continueBtn = this.page.getByRole('button', { name: 'Continue' });
        await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
        await continueBtn.click();
      }
    } catch {
      // Already redirected
    }
  }

  async waitForCaregiverPortalAfterLogin(): Promise<void> {
    await this.page.waitForURL(/caregiver-portal/, { timeout: 30000 });
  }

  async isLoggedInOnCaregiverPortal(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Logout' }).isVisible({ timeout: 10000 }).catch(() => false);
  }

  async isMyProfileLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'My Profile' }).isVisible({ timeout: 10000 }).catch(() => false);
  }

  async loginAsCaregiverViaSSO(email: string, password: string): Promise<void> {
    await this.clickSignInWithSwarajAbilityButton();
    await this.clickSignInWithSwarajAbilityPopupLink();
    await this.waitForSSOEmailField();
    await this.enterSSOEmail(email);
    await this.clickSSOLogIn();
    await this.waitForSSOPasswordField();
    await this.enterSSOPassword(password);
    await this.clickSSOContinue();
    // Wait for consent screen or direct redirect to portal
    await this.page.waitForURL(
      u => u.href.includes('implicit-consent') || u.origin === 'https://qa-atad.swarajability.org',
      { timeout: 45000 }
    );
    // Handle consent screen if present
    if (this.page.url().includes('implicit-consent')) {
      const continueBtn = this.page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
      await continueBtn.click();
    }
    // Wait for portal to fully load after auth-callback redirect
    await this.page.waitForURL(u => u.origin === 'https://qa-atad.swarajability.org', { timeout: 45000 });
    await this.page.getByRole('link', { name: 'My Profile' }).waitFor({ state: 'visible', timeout: 30000 });
  }

  // --- Page Refresh Methods ---

  async refreshPage(): Promise<void> {
    await this.page.reload();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // --- Sign-In Form Verification Methods (SCRUM-360) ---

  async navigateToCaregiverPortal(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async isSignInDescriptionVisible(): Promise<boolean> {
    return await this.page.getByText('Sign in to access your personalized dashboard and AT recommendations').isVisible();
  }

  async isNewToPortalTextVisible(): Promise<boolean> {
    return await this.page.getByText('New to AT/AD Portal?').isVisible();
  }

  async isCreateNewAccountLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Create New Account' }).isVisible();
  }

  async navigateToSSOLoginPage(): Promise<void> {
    await this.clickSignInWithSwarajAbilityButton();
    // Wait for popup to appear before clicking the SSO link
    await this.page.getByRole('link', { name: 'Sign In with SwarajAbility' }).waitFor({ state: 'visible', timeout: 10000 });
    await this.clickSignInWithSwarajAbilityPopupLink();
    await this.waitForSSOEmailField();
  }

  async isSSOEmailFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Email' }).isVisible();
  }

  async isSSOEmailLabelVisible(): Promise<boolean> {
    return await this.page.getByText('Email').first().isVisible();
  }

  async isSSOLogInButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Log in' }).isVisible();
  }

  async isForgotUsernameOrPasswordLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Forgot username or password?' }).isVisible();
  }

  async enterSSOEmailAndProceed(email: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    // Wait for password page to load (handles navigation)
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 30000 });
  }

  async isSSOPasswordFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Please enter your password' }).isVisible();
  }

  async isSSOContinueButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Continue' }).isVisible();
  }

  async isForgotPasswordLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Forgot password?' }).isVisible();
  }

  async isSSOPasswordFieldMasked(): Promise<boolean> {
    const inputType = await this.page.getByRole('textbox', { name: 'Please enter your password' }).getAttribute('type');
    return inputType === 'password';
  }

  // --- Password Field Validation Methods (TC_CG_SIGN_005) ---

  async enterSSOPasswordValue(password: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill(password);
  }

  async getSSOPasswordFieldValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: 'Please enter your password' }).inputValue();
  }

  async clearSSOPasswordField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).fill('');
  }

  async clickSSOContinueButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async isSSOPasswordPageStillDisplayed(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Please enter your password' }).isVisible();
  }

  async isSSOPasswordLabelVisible(): Promise<boolean> {
    return await this.page.getByText('Password').first().isVisible();
  }

  async isSSOPasswordMandatoryIndicatorVisible(): Promise<boolean> {
    const label = this.page.locator('text=Password').first().locator('..');
    const text = await label.textContent();
    return text?.includes('*') ?? false;
  }

  // --- Case-Insensitive Email Login Methods (TC_CG_SIGN_010) ---

  async loginWithCaseVariantEmail(url: string, email: string, password: string): Promise<void> {
    await this.loginAsCaregiver(url, email, password);
  }

  async logoutAndWaitForHomePage(): Promise<void> {
    await this.page.getByRole('link', { name: 'Logout' }).click();
    await this.page.waitForURL(u => u.origin === 'https://qa-atad.swarajability.org', { timeout: 15000 });
    await this.page.getByRole('link', { name: 'Sign In/Register' }).waitFor({ state: 'visible', timeout: 15000 });
  }

  async isSignInRegisterLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Sign In/Register' }).isVisible();
  }

  // --- Forgot Password Flow Methods (TC_CG_SIGN_015) ---

  async clickForgotUsernameOrPasswordLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Forgot username or password?' }).click();
    await this.page.waitForURL(/reset-password/, { timeout: 15000 });
    await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
  }

  async isResetPasswordHeadingVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Reset Password' }).isVisible();
  }

  async isResetPasswordDescriptionVisible(): Promise<boolean> {
    return await this.page.getByText("Enter the email associated with your account, and we'll send you a link to reset your password.").isVisible();
  }

  async isResetPasswordEmailFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Email' }).isVisible();
  }

  async enterResetPasswordEmail(email: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
  }

  async submitResetPasswordRequest(): Promise<void> {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async isResetPasswordConfirmationVisible(): Promise<boolean> {
    try {
      await this.page.getByText('Check your Inbox for a verification email.').waitFor({ state: 'visible', timeout: 15000 });
      return true;
    } catch {
      return false;
    }
  }

  async isSendEmailAgainButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Send Email again.' }).isVisible({ timeout: 10000 }).catch(() => false);
  }

  // --- Session & Navigation Methods (TC_CG_SIGN_002, 013, 014) ---

  async loginAndVerifySession(url: string, email: string, password: string): Promise<void> {
    await this.loginAsCaregiver(url, email, password);
  }

  async navigateToCatalog(): Promise<void> {
    await this.page.getByRole('link', { name: 'Open assistive device catalog' }).click();
    await this.page.waitForURL(/catalog/, { timeout: 15000 });
  }

  async isCatalogPageLoaded(): Promise<boolean> {
    return this.page.url().includes('/catalog');
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.getByRole('link', { name: 'Home' }).click();
    await this.page.waitForURL(u => u.pathname === '/' || u.pathname === '', { timeout: 15000 });
  }

  async navigateToUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  // --- Browser Refresh Methods (TC_CG_SIGN_013) ---

  async enterSSOCredentialsWithoutSubmit(url: string, email: string, password: string): Promise<void> {
    await this.navigateToCaregiverPortal(url);
    await this.navigateToSSOLoginPage();
    await this.enterSSOEmailAndProceed(email);
    await this.enterSSOPasswordValue(password);
  }

  async refreshAndVerifyNoAutoSubmit(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    // After refresh on SSO password page, the page should reload (may go back to email or stay on password)
    // Wait for either email field or password field to appear
    await Promise.race([
      this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 }),
      this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 30000 })
    ]);
  }

  async isSSOLoginPageDisplayedAfterRefresh(): Promise<boolean> {
    // After refresh, user should be on SSO page (either email or password step) — not auto-logged-in
    const emailVisible = await this.page.getByRole('textbox', { name: 'Email' }).isVisible().catch(() => false);
    const passwordVisible = await this.page.getByRole('textbox', { name: 'Please enter your password' }).isVisible().catch(() => false);
    return emailVisible || passwordVisible;
  }

  // ── Care Network / My PwDs ──

  async navigateToMyPwDs(): Promise<void> {
    await this.page.getByRole('link', { name: 'My PwDs' }).click();
    await this.page.getByRole('heading', { name: 'My Persons with Disabilities', level: 1 }).waitFor({ state: 'visible', timeout: 15000 });
  }

  async getMyPwdsHeading(): Promise<string> {
    return await this.page.getByRole('heading', { name: 'My Persons with Disabilities', level: 1 }).innerText();
  }

  async getCareNetworkHeading(): Promise<string> {
    return await this.page.getByRole('heading', { name: 'Your Care Network', level: 2 }).innerText();
  }

  async getTotalPwdCount(): Promise<number> {
    const countContainer = this.page.locator('text=Total PwDs').locator('..');
    const countText = await countContainer.locator('div').first().innerText();
    return parseInt(countText, 10);
  }

  async getAvailableSlots(): Promise<number> {
    const slotsContainer = this.page.locator('text=Available Slots').locator('..');
    const slotsText = await slotsContainer.locator('div').first().innerText();
    return parseInt(slotsText, 10);
  }

  async getPwdCardNames(): Promise<string[]> {
    const cards = this.page.getByRole('heading', { level: 3 }).filter({ hasNotText: /Add New PwD|Add PwD|Manage Profiles|Get Recommendations/ });
    return await cards.allInnerTexts();
  }

  async isDeletePwdButtonVisible(index: number = 0): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Delete PwD' }).nth(index).isVisible();
  }

  async clickDeletePwdButton(index: number = 0): Promise<void> {
    await this.page.getByRole('button', { name: 'Delete PwD' }).nth(index).click();
  }

  async isDeleteConfirmationModalVisible(): Promise<boolean> {
    return await this.page.getByRole('dialog', { name: 'Confirm Deletion' }).isVisible();
  }

  async getDeleteModalHeading(): Promise<string> {
    return await this.page.getByRole('heading', { name: 'Confirm Deletion', level: 2 }).innerText();
  }

  async getDeleteModalPwdName(): Promise<string> {
    const dialog = this.page.getByRole('dialog', { name: 'Confirm Deletion' });
    return await dialog.locator('strong').innerText();
  }

  async getDeleteModalWarningText(): Promise<string> {
    const dialog = this.page.getByRole('dialog', { name: 'Confirm Deletion' });
    return await dialog.locator('p:not([hidden])').innerText();
  }

  async clickDeleteModalConfirm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Delete', exact: true }).click();
  }

  async clickDeleteModalCancel(): Promise<void> {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async waitForPwdCountToUpdate(expectedCount: number): Promise<void> {
    const countContainer = this.page.locator('text=Total PwDs').locator('..').locator('div').first();
    await expect(countContainer).toHaveText(String(expectedCount), { timeout: 10000 });
  }

  // --- TC_CG_REG_001: Registration Form Field Verification ---

  async isMobileCountryCodeVisible(): Promise<boolean> {
    return await this.page.getByText('+91', { exact: true }).isVisible();
  }

  async isAadharPrivacyInfoVisible(): Promise<boolean> {
    return await this.page.getByText('Your Aadhar number helps in verification and accessing government schemes').isVisible();
  }

  async isPasswordHintVisible(): Promise<boolean> {
    return await this.page.getByText('At least 8 characters; mix of letters, numbers, and symbols recommended.').isVisible();
  }

  // --- TC_CG_REG_006: Email Validation Methods ---

  async isEmailValidationErrorVisible(): Promise<boolean> {
    return await this.page.getByText('Enter a valid email address').isVisible();
  }

  async isEmailValidationErrorHidden(): Promise<boolean> {
    return await this.page.getByText('Enter a valid email address').isHidden();
  }

  async isSendOtpEmailButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Send OTP' }).nth(1).isVisible();
  }

  async clickAwayFromEmailField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First Name *' }).click();
  }

  // --- TC_CG_REG_016: Registration Button Enablement Logic ---

  async isRegistrationRequirementsListVisible(): Promise<boolean> {
    return await this.page.getByText('To complete registration, please:').isVisible();
  }

  async isMobileOtpRequirementVisible(): Promise<boolean> {
    return await this.page.getByText('Verify your mobile number with OTP').isVisible();
  }

  async isEmailOtpRequirementVisible(): Promise<boolean> {
    return await this.page.getByText('Verify your email address with OTP').isVisible();
  }

  async isFieldsRequirementVisible(): Promise<boolean> {
    return await this.page.getByText('Fill all required fields').isVisible();
  }

  async isFieldsRequirementHidden(): Promise<boolean> {
    return await this.page.getByText('Fill all required fields').isHidden();
  }

  async uncheckConsentCheckbox(): Promise<void> {
    const checkbox = this.page.getByRole('checkbox', { name: /I consent to being contacted/ });
    if (await checkbox.isChecked()) {
      await checkbox.click();
    }
  }

  async isCompleteRegistrationButtonEnabled(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Complete Registration' }).isEnabled();
  }

  // --- TC_CG_REG_018: Duplicate Mobile Detection ---

  async clickSendOtpMobileButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Send OTP' }).first().click();
  }

  async isDuplicateMobileErrorVisible(): Promise<boolean> {
    return await this.page.getByText('Phone number already exists').isVisible({ timeout: 5000 }).catch(() => false);
  }

  async clickBackToSignInLink(): Promise<void> {
    await this.page.getByRole('link', { name: '← Back to Sign In' }).click();
  }

  // --- TC_CG_REG_003: Empty Fields Validation ---

  async isLastNameRequiredErrorVisible(): Promise<boolean> {
    return await this.page.getByText(/last name/i).filter({ hasText: /required/i }).isVisible({ timeout: 3000 }).catch(() =>
      this.page.getByRole('alert').filter({ hasText: /last name/i }).isVisible({ timeout: 3000 }).catch(() => false)
    );
  }

  // --- TC_CG_REG_007: Password Validation ---

  async getPasswordStrengthIndicator(): Promise<string> {
    const el = this.page.locator('text=/Password strength:/');
    return (await el.textContent().catch(() => '')) || '';
  }

  async isWeakPasswordErrorVisible(): Promise<boolean> {
    return await this.page.getByText('Password must be at least 8 characters').isVisible({ timeout: 3000 }).catch(() => false);
  }

  async isPasswordStrengthStrongVisible(): Promise<boolean> {
    return await this.page.getByText('Password strength: Strong').isVisible({ timeout: 3000 }).catch(() => false);
  }

  async isPasswordStrengthWeakVisible(): Promise<boolean> {
    return await this.page.getByText('Password strength: Weak').isVisible({ timeout: 3000 }).catch(() => false);
  }

  async isPasswordsMismatchErrorVisible(): Promise<boolean> {
    return await this.page.getByText('Passwords do not match').isVisible({ timeout: 3000 }).catch(() => false);
  }

  async isPasswordsMismatchErrorHidden(): Promise<boolean> {
    return await this.page.getByText('Passwords do not match').isHidden();
  }

  // --- TC_CG_REG_005: Mobile Number Validation ---

  async getMobileFieldInputValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: 'Mobile Number *' }).inputValue();
  }

  // --- TC_CG_REG_008: Aadhaar Validation ---

  async getAadharFieldInputValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: 'Aadhar Number *' }).inputValue();
  }

  async clearAadharField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Aadhar Number *' }).clear();
  }

  // --- TC_CG_REG_009: Pincode Validation ---

  async getPincodeFieldInputValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: 'Pincode *' }).inputValue();
  }

  async clearPincodeField(): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Pincode *' }).clear();
  }

  // --- TC_CG_REG_015: Consent Checkbox ---

  async getConsentText(): Promise<string> {
    return (await this.page.locator('text=/I consent to being contacted/').textContent()) || '';
  }

  async getConsentWithdrawalText(): Promise<string> {
    return (await this.page.getByText('You can withdraw consent anytime from your profile settings.').textContent()) || '';
  }

  // --- TC_CG_REG_022: Back to Sign In ---

  async navigateToRegistrationDirectly(url: string): Promise<void> {
    await this.page.goto(`${url}/caregiver-registration/`);
  }

  // --- TC_CG_REG_024: Static Cards ---

  async isPrivacySecurityCardVisible(): Promise<boolean> {
    return await this.page.getByText('Privacy & Security:').isVisible();
  }

  async getPrivacySecurityCardText(): Promise<string> {
    const alert = this.page.getByRole('alert').first();
    return (await alert.textContent()) || '';
  }

  async isToCompleteRegistrationCardVisible(): Promise<boolean> {
    return await this.page.getByText('To complete registration, please:').isVisible();
  }

  // --- TC_CG_REG_023: Terms & Privacy Links ---

  async clickTermsOfServiceLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Terms of Service' }).first().click();
  }

  async clickPrivacyPolicyLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Privacy Policy' }).first().click();
  }

  // --- TC_CG_REG_019: Duplicate Email ---

  async clickSendOtpEmailButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Send OTP' }).nth(1).click();
  }

  async isDuplicateEmailErrorVisible(): Promise<boolean> {
    return await this.page.getByText('Email already exists').isVisible({ timeout: 5000 }).catch(() => false);
  }

  // --- TC_CG_REG_021: Data Retention ---

  async verifyFieldRetainsValue(fieldName: string, expectedValue: string): Promise<boolean> {
    const value = await this.page.getByRole('textbox', { name: fieldName }).inputValue();
    return value === expectedValue;
  }

  // --- TC_CG_REG_025: Dark Mode ---

  async toggleDarkMode(): Promise<void> {
    const toggle = this.page.locator('[for="checkbox"]').or(this.page.locator('.toggle-dark-mode')).first();
    await toggle.scrollIntoViewIfNeeded();
    await toggle.click();
  }

  async isDarkModeEnabled(): Promise<boolean> {
    return await this.page.getByRole('checkbox', { name: 'Toggle dark mode' }).isChecked();
  }

  // --- OTP Verification Flow ---

  async enterMobileOtp(otp: string): Promise<void> {
    await this.page.getByRole('textbox', { name: /Enter OTP sent to \+91/ }).fill(otp);
  }

  async clickVerifyOtpButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Verify' }).click();
  }

  async isMobileVerifiedIndicatorVisible(): Promise<boolean> {
    return await this.page.getByText('Mobile Number * ✓ Verified').isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isMobileFieldDisabledAfterVerification(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Mobile Number *' }).isDisabled();
  }

  async isOtpInputFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: /Enter OTP sent to/ }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async enterEmailOtp(otp: string): Promise<void> {
    await this.page.getByRole('textbox', { name: /Enter OTP sent to/ }).fill(otp);
  }

  async isEmailVerifiedIndicatorVisible(): Promise<boolean> {
    return await this.page.getByText('Email ID * ✓ Verified').isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isEmailFieldDisabledAfterVerification(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'Email ID *' }).isDisabled();
  }

  async isResendOtpButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Resend OTP' }).isVisible({ timeout: 3000 }).catch(() => false);
  }

  // --- Registration Completion ---

  async clickCompleteRegistrationButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Complete Registration' }).click();
  }

  async isRegistrationSuccessHeadingVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Registration Successful!' }).isVisible({ timeout: 10000 }).catch(() => false);
  }

  async getRegistrationSuccessWelcomeText(): Promise<string> {
    const el = this.page.locator('text=/Welcome to AT\\/AD Portal/');
    return (await el.textContent().catch(() => '')) || '';
  }

  async isRegisterPwdLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Register Person with Disability' }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isGoToDashboardLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Go to Dashboard' }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async getNextStepText(): Promise<string> {
    const alert = this.page.getByRole('alert').filter({ hasText: 'Next Step:' });
    return (await alert.textContent().catch(() => '')) || '';
  }

  // --- My PwDs Dashboard Verification (TC_MANAGE_PWD_001) ---

  async isTotalPwdsLabelVisible(): Promise<boolean> {
    return await this.page.getByText('Total PwDs').isVisible();
  }

  async isAvailableSlotsLabelVisible(): Promise<boolean> {
    return await this.page.getByText('Available Slots').isVisible();
  }

  async getPwdCardCount(): Promise<number> {
    const cards = this.page.getByRole('heading', { level: 3 }).filter({ hasNotText: /Add New PwD|Add PwD|Manage Profiles|Get Recommendations/ });
    return await cards.count();
  }

  async getPwdCardDetails(index: number): Promise<{ name: string; phone: string; email: string; disability: string; dateAdded: string }> {
    const cards = this.page.locator('[class*="card"], [class*="Card"]').filter({ has: this.page.getByRole('button', { name: 'Delete PwD' }) });
    const card = cards.nth(index);
    const name = await card.getByRole('heading', { level: 3 }).innerText();
    const details = await card.locator('div').allInnerTexts();
    const allText = details.join(' ');
    return { name, phone: '', email: '', disability: '', dateAdded: allText };
  }

  async verifyPwdCardHasName(name: string): Promise<boolean> {
    return await this.page.getByRole('heading', { name, level: 3 }).isVisible();
  }

  async verifyPwdCardHasPhone(phone: string): Promise<boolean> {
    return await this.page.getByText(phone).isVisible();
  }

  async verifyPwdCardHasEmail(email: string): Promise<boolean> {
    return await this.page.getByText(email).isVisible();
  }

  async verifyPwdCardHasDisabilityType(disabilityType: string): Promise<boolean> {
    return await this.page.getByText(disabilityType).isVisible();
  }

  async verifyPwdCardHasDateAdded(dateAdded: string): Promise<boolean> {
    return await this.page.getByText(dateAdded).isVisible();
  }

  async isAddNewPwdCardVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Add New PwD', level: 3 }).isVisible();
  }

  async isAddNewPwdSlotsAvailableTextVisible(): Promise<boolean> {
    return await this.page.getByText('slots available').isVisible();
  }

  async isAddPwdButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Add PwD' }).isVisible();
  }

  async isViewProfileLinkVisible(index: number = 0): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'View Profile' }).nth(index).isVisible();
  }

  async clickViewProfileLink(index: number = 0): Promise<void> {
    await this.page.getByRole('link', { name: 'View Profile' }).nth(index).click();
  }

  async getViewProfileLinkCount(): Promise<number> {
    return await this.page.getByRole('link', { name: 'View Profile' }).count();
  }

  async verifyTotalPwdCountMatchesCards(): Promise<boolean> {
    const totalCount = await this.getTotalPwdCount();
    const cardCount = await this.getPwdCardCount();
    return totalCount === cardCount;
  }

  async verifySlotsAddUpToLimit(): Promise<boolean> {
    const totalPwds = await this.getTotalPwdCount();
    const availableSlots = await this.getAvailableSlots();
    return (totalPwds + availableSlots) === 5;
  }

  async getWelcomeText(): Promise<string> {
    const welcomeEl = this.page.locator('p').filter({ hasText: /Welcome,/ });
    return (await welcomeEl.innerText().catch(() => '')) || '';
  }

  // --- Authenticated Navigation (storageState) ---

  async navigateToMyPwDsDirectly(): Promise<void> {
    await this.page.goto('https://qa-atad.swarajability.org/my-pwds/');
    await this.page.getByRole('heading', { name: 'My Persons with Disabilities', level: 1 }).waitFor({ state: 'visible', timeout: 30000 });
  }

  async loginOrNavigateToMyPwDs(url: string, email: string, password: string): Promise<void> {
    // Navigate to portal first
    await this.navigateToPortal(url);
    await this.page.waitForLoadState('load').catch(() => {});

    // Check if already logged in (My Profile or Logout link visible)
    const isLoggedIn = await this.page.getByRole('link', { name: 'My Profile' }).isVisible({ timeout: 5000 }).catch(() => false)
      || await this.page.getByRole('link', { name: 'Logout' }).isVisible({ timeout: 2000 }).catch(() => false);

    if (!isLoggedIn) {
      // Not logged in — perform full login
      await this.loginAsCaregiver(url, email, password);
    }

    await this.navigateToMyPwDs();
  }

  // --- PwD Profile Page Verification (TC_MANAGE_PWD_003) ---

  async getPwdProfilePageHeading(): Promise<string> {
    const heading = this.page.getByRole('heading', { name: 'PwD Profile – Caregiver', level: 1 });
    await heading.waitFor({ state: 'visible', timeout: 15000 });
    return (await heading.innerText()) || '';
  }

  async getPwdProfileName(): Promise<string> {
    const heading = this.page.getByRole('heading', { level: 1 }).filter({ hasNotText: 'PwD Profile' });
    return (await heading.innerText()) || '';
  }

  async isPwdProfileNameVisible(name: string): Promise<boolean> {
    return await this.page.getByRole('heading', { name }).isVisible();
  }

  async isPwdProfileDisabilityTypeVisible(disabilityType: string): Promise<boolean> {
    return await this.page.getByText(disabilityType).isVisible();
  }

  async isPersonalDetailsSectionVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Personal Details' }).isVisible();
  }

  async isContactInformationSectionVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Contact Information' }).isVisible();
  }

  async isDisabilityInformationSectionVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Disability Information' }).isVisible();
  }

  async isBackToMyPwdsLinkVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Back to My PwDs' }).isVisible();
  }

  async clickBackToMyPwds(): Promise<void> {
    await this.page.getByRole('link', { name: 'Back to My PwDs' }).click();
    await this.page.getByRole('heading', { name: 'My Persons with Disabilities', level: 1 }).waitFor({ state: 'visible', timeout: 15000 });
  }

  async waitForPwdProfilePage(): Promise<void> {
    await this.page.waitForURL(/pwd-profile-caregiver/, { timeout: 30000 });
    await this.page.getByRole('heading', { name: 'Personal Details' }).waitFor({ state: 'visible', timeout: 30000 });
  }

  async isAddPwdButtonEnabled(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Add PwD' }).isEnabled();
  }

  async clickAddPwdButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add PwD' }).click();
  }

  async isAddPwdPageLoaded(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: /Verify Aadhar|Add.*PwD|Register.*PwD/i }).isVisible({ timeout: 10000 }).catch(() => false);
  }

  // --- OTP Flow Helper Methods ---

  async waitForMobileSendOtpEnabled(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const buttons = document.querySelectorAll('button');
        for (const btn of buttons) {
          if (btn.textContent?.includes('Send OTP') && !btn.disabled) return true;
        }
        return false;
      },
      { timeout: 5000 }
    ).catch(() => {});
  }

  async waitForEmailSendOtpEnabled(): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const otpButtons = buttons.filter(btn => btn.textContent?.includes('Send OTP'));
        return otpButtons.length >= 2 && !otpButtons[1].disabled;
      },
      { timeout: 5000 }
    ).catch(() => {});
  }

  async fillMobileWithEvents(mobile: string): Promise<void> {
    const field = this.page.getByRole('textbox', { name: 'Mobile Number *' });
    await field.click();
    await field.fill('');
    await field.pressSequentially(mobile, { delay: 50 });
    await field.dispatchEvent('change');
    await this.pressTabKey();
  }

  async fillEmailWithEvents(email: string): Promise<void> {
    const field = this.page.getByRole('textbox', { name: 'Email ID *' });
    await field.click();
    await field.fill('');
    await field.pressSequentially(email, { delay: 30 });
    await field.dispatchEvent('change');
    await this.pressTabKey();
  }

  async isOtpSentMessageVisible(): Promise<boolean> {
    return await this.page.getByText(/OTP sent|OTP has been sent|Enter OTP/i).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isInvalidOtpErrorVisible(): Promise<boolean> {
    return await this.page.getByText(/invalid otp|incorrect otp|wrong otp|try again/i).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isOtpExpiredMessageVisible(): Promise<boolean> {
    return await this.page.getByText(/otp.*expired|expired.*otp|resend/i).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isOtpLockMessageVisible(): Promise<boolean> {
    return await this.page.getByText(/too many|locked|temporarily|try after|limit exceeded/i).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isOtpInputDisabled(): Promise<boolean> {
    const field = this.page.getByRole('textbox', { name: /Enter OTP sent to/ });
    const isVisible = await field.isVisible({ timeout: 3000 }).catch(() => false);
    if (!isVisible) return true;
    return !(await field.isEnabled());
  }

  async isVerifyButtonDisabled(): Promise<boolean> {
    const btn = this.page.getByRole('button', { name: 'Verify' });
    const isVisible = await btn.isVisible({ timeout: 3000 }).catch(() => false);
    if (!isVisible) return true;
    return !(await btn.isEnabled());
  }

  async clickResendOtpButton(): Promise<void> {
    await this.page.getByRole('button', { name: /Resend OTP/i }).click();
  }

  async waitForResendOtpEnabled(): Promise<void> {
    await this.page.getByRole('button', { name: /Resend OTP/i }).waitFor({ state: 'visible', timeout: 60000 }).catch(() => {});
  }

  // --- Aadhaar Lookup Page (SCRUM-366) ---

  async navigateToAadhaarLookup(url: string, email: string, password: string): Promise<void> {
    await this.loginOrNavigateToMyPwDs(url, email, password);
    await this.clickAddPwdButton();
    await this.page.getByRole('heading', { name: /Verify Aadhar/i }).waitFor({ state: 'visible', timeout: 15000 });
  }

  async isAadhaarLookupPageVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: /Verify Aadhar/i }).isVisible({ timeout: 10000 }).catch(() => false);
  }

  async isAadhaarLookupFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: /Aadhar Number/i }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isAadhaarLookupFieldMandatory(): Promise<boolean> {
    return await this.page.locator('text="*"').first().isVisible().catch(() => false);
  }

  async fillAadhaarLookupField(value: string): Promise<void> {
    const field = this.page.getByRole('textbox', { name: /Aadhar Number/i });
    await field.click();
    await field.fill(value);
  }

  async clearAadhaarLookupField(): Promise<void> {
    await this.page.getByRole('textbox', { name: /Aadhar Number/i }).clear();
  }

  async getAadhaarLookupFieldValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: /Aadhar Number/i }).inputValue();
  }

  async pressBackspaceInAadhaarField(): Promise<void> {
    const field = this.page.getByRole('textbox', { name: /Aadhar Number/i });
    await field.press('Backspace');
  }

  async isVerifyAadhaarButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: /Verify Aadhar Number/i }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isVerifyAadhaarButtonEnabled(): Promise<boolean> {
    return await this.page.getByRole('button', { name: /Verify Aadhar Number/i }).isEnabled();
  }

  async isVerifyAadhaarButtonDisabled(): Promise<boolean> {
    return !(await this.isVerifyAadhaarButtonEnabled());
  }

  async clickVerifyAadhaarButton(): Promise<void> {
    await this.page.getByRole('button', { name: /Verify Aadhar Number/i }).click();
  }

  async isStepIndicatorVisible(): Promise<boolean> {
    return await this.page.getByText(/Step 1 of/i).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isBackToMyPwdsFromLookupVisible(): Promise<boolean> {
    return await this.page.getByRole('link', { name: 'Back to My PwDs' }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async clickBackToMyPwdsFromLookup(): Promise<void> {
    await this.page.getByRole('link', { name: 'Back to My PwDs' }).click();
    await this.page.getByRole('heading', { name: 'My Persons with Disabilities', level: 1 }).waitFor({ state: 'visible', timeout: 15000 });
  }

  async isAadhaarVerificationResultVisible(): Promise<boolean> {
    return await this.page.getByText(/found|not found|verified|OTP|register|error|already|linked|not found in system|Register New PwD/i).first().isVisible({ timeout: 15000 }).catch(() => false);
  }

  async isPwdFoundMessageVisible(): Promise<boolean> {
    return await this.page.getByText(/found in system|verified|OTP sent|Enter OTP|Step 2/i).first().isVisible({ timeout: 10000 }).catch(() => false);
  }

  async isPwdNotFoundMessageVisible(): Promise<boolean> {
    return await this.page.getByText(/not found in system|not registered|Register New PwD|Please provide details to register/i).first().isVisible({ timeout: 10000 }).catch(() => false);
  }

  async isAadhaarOtpFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: /OTP|otp|Enter OTP/i }).isVisible({ timeout: 10000 }).catch(() => false);
  }

  async fillAadhaarOtp(otp: string): Promise<void> {
    await this.page.getByRole('textbox', { name: /OTP|otp|Enter OTP/i }).fill(otp);
  }

  async clickVerifyOtpOnAadhaarPage(): Promise<void> {
    await this.page.getByRole('button', { name: /Verify OTP|Submit|Verify/i }).click();
  }

  async isAadhaarAlreadyLinkedMessageVisible(): Promise<boolean> {
    return await this.page.getByText(/already linked|already registered|already added|already exists/i).isVisible({ timeout: 10000 }).catch(() => false);
  }

  async isNewPwdRegistrationFormVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: /Register New PwD|Register|Registration|Step 2|Step 3|Personal/i }).isVisible({ timeout: 10000 }).catch(() => false);
  }

  async waitForNewPwdRegistrationOrResult(): Promise<void> {
    await this.page.getByRole('heading', { name: /Register New PwD|Step 2|Step 3|Verify|OTP/i }).waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
  }

  async waitForAadhaarVerificationResult(): Promise<void> {
    // Wait for either Step 2 (PwD found - OTP) or Step 3 (not found - registration) or error message
    await this.page.getByText(/Step 2 of|Step 3 of|not found in system|already linked|already added/i)
      .first()
      .waitFor({ state: 'visible', timeout: 20000 });
  }

  async waitForRegisterNewPwdHeading(): Promise<void> {
    await this.page.getByRole('heading', { name: 'Register New PwD' }).waitFor({ state: 'visible', timeout: 20000 });
  }

  async isNotFoundInSystemMessageVisible(): Promise<boolean> {
    return await this.page.getByText('not found in system').isVisible();
  }

  async isAadhaarFieldMaskedType(): Promise<boolean> {
    const fieldType = await this.page.getByRole('textbox', { name: /Aadhar Number/i }).getAttribute('type');
    return fieldType === 'password';
  }

  // --- Auto-Populate PwD Details (SCRUM-369) ---

  async completeAadhaarLookupWithOtp(url: string, email: string, password: string, aadhaar: string, otp: string): Promise<void> {
    await this.navigateToAadhaarLookup(url, email, password);
    await this.fillAadhaarLookupField(aadhaar);
    await this.clickVerifyAadhaarButton();
    await this.waitForAadhaarVerificationResult();
    const isOtpVisible = await this.isAadhaarOtpFieldVisible();
    if (isOtpVisible) {
      await this.fillAadhaarOtp(otp);
      await this.clickVerifyOtpOnAadhaarPage();
    }
  }

  async waitForAutoPopulatePage(): Promise<void> {
    // After OTP verification, wait for either auto-populated details or Step 2/3 content
    await this.page.getByText(/Step 2 of|Step 3 of|Confirm|Review|PwD Details|Auto|Profile/i)
      .or(this.page.getByRole('heading', { name: /Review|Confirm|PwD Details|Profile|Register/i }))
      .first()
      .waitFor({ state: 'visible', timeout: 20000 })
      .catch(() => {});
  }

  async isAutoPopulatedNameVisible(): Promise<boolean> {
    // Check for any name field/text that's populated (not empty)
    const nameFields = this.page.locator('text=/Name|First Name/i').locator('..');
    return await nameFields.first().isVisible({ timeout: 5000 }).catch(() => false);
  }

  async getAutoPopulatedPwdName(): Promise<string> {
    // Try to get the PwD name from the auto-populated page
    const nameEl = this.page.getByRole('heading', { level: 3 }).filter({ hasNotText: /Personal|Disability|Address|Add/i });
    return (await nameEl.first().textContent().catch(() => '')) || '';
  }

  async isAutoPopulatedFieldVisible(fieldLabel: string): Promise<boolean> {
    const el = this.page.getByText(fieldLabel, { exact: false }).first();
    await el.scrollIntoViewIfNeeded().catch(() => {});
    return await el.isVisible({ timeout: 10000 }).catch(() => false);
  }

  async isConfirmLinkPwdButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: /Confirm|Link PwD|Add PwD|Register & Add/i }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async clickConfirmLinkPwdButton(): Promise<void> {
    await this.page.getByRole('button', { name: /Confirm|Link PwD|Add PwD|Register & Add/i }).click();
  }

  async isPwdLinkedSuccessMessageVisible(): Promise<boolean> {
    return await this.page.getByText(/success|linked|added|registered/i).isVisible({ timeout: 10000 }).catch(() => false);
  }

  async isAutoPopulatePageLoaded(): Promise<boolean> {
    // Check if we're on a page showing PwD details after Aadhaar verification
    const hasStep = await this.page.getByText(/Step 2 of|Step 3 of/i).isVisible({ timeout: 5000 }).catch(() => false);
    const hasDetails = await this.page.getByText(/Name|First Name|Personal Information/i).first().isVisible({ timeout: 3000 }).catch(() => false);
    return hasStep && hasDetails;
  }

  // --- New PwD Registration Form (SCRUM-372) ---

  async navigateToNewPwdRegistrationForm(url: string, email: string, password: string, aadhaar: string): Promise<void> {
    await this.navigateToAadhaarLookup(url, email, password);
    await this.fillAadhaarLookupField(aadhaar);
    await this.clickVerifyAadhaarButton();
    await this.waitForRegisterNewPwdHeading();
  }

  async isRegisterNewPwdHeadingVisible(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: 'Register New PwD' }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isNotFoundMessageWithAadhaarVisible(aadhaar: string): Promise<boolean> {
    return await this.page.getByText(`Aadhar ${aadhaar} not found in system`).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isRegisterAndAddPwdButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Register & Add PwD' }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isBackToAadharButtonVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Back to Aadhar' }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isSendOtpMobileOnRegFormVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Send OTP' }).first().isVisible({ timeout: 5000 }).catch(() => false);
  }

  async isSendOtpEmailOnRegFormVisible(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Send OTP' }).nth(1).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async getDisabilityTypeOptions(): Promise<string[]> {
    // Debug: count all select elements and combobox roles
    const selectCount = await this.page.locator('select').count();
    const comboboxCount = await this.page.getByRole('combobox').count();
    
    // Try locator('select') approach
    if (selectCount > 0) {
      for (let i = 0; i < selectCount; i++) {
        const sel = this.page.locator('select').nth(i);
        const opts = await sel.locator('option').allTextContents();
        if (opts.some(o => o.includes('Blindness'))) {
          return opts.filter(o => o !== 'Select');
        }
      }
    }
    
    // Fallback: try evaluate with all select-like elements
    return await this.page.evaluate(() => {
      // Check for native selects
      const selects = document.querySelectorAll('select');
      for (const sel of selects) {
        const opts = Array.from(sel.options).map(o => o.text);
        if (opts.some(o => o.includes('Blindness'))) {
          return opts.filter(o => o !== 'Select');
        }
      }
      // Check for custom select elements with data attributes
      const customSelects = document.querySelectorAll('[data-atad-reg-disability], [name*="disability"], [id*="disability"]');
      for (const el of customSelects) {
        if (el instanceof HTMLSelectElement) {
          return Array.from(el.options).map(o => o.text).filter(o => o !== 'Select');
        }
      }
      return [`debug: ${selects.length} native selects found`];
    });
  }

  async selectDisabilityType(value: string): Promise<void> {
    await this.page.evaluate((val) => {
      const selects = document.querySelectorAll('select');
      for (const sel of selects) {
        const opts = Array.from(sel.options).map(o => o.text);
        if (opts.some(o => o.includes('Blindness'))) {
          const option = Array.from(sel.options).find(o => o.text === val);
          if (option) {
            sel.value = option.value;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
          }
          return;
        }
      }
    }, value);
  }

  async getSelectedDisabilityType(): Promise<string> {
    return await this.page.evaluate(() => {
      const selects = document.querySelectorAll('select');
      for (const sel of selects) {
        const opts = Array.from(sel.options).map(o => o.text);
        if (opts.some(o => o.includes('Blindness'))) {
          return sel.options[sel.selectedIndex]?.text || '';
        }
      }
      return '';
    });
  }

  async isDisabilityTypeFieldMandatory(): Promise<boolean> {
    return await this.isAutoPopulatedFieldVisible('Disability Type *');
  }

  // Qualification dropdown (3rd combobox - after Gender, Disability Type)
  async getQualificationOptions(): Promise<string[]> {
    return await this.page.evaluate(() => {
      const selects = document.querySelectorAll('select');
      for (const sel of selects) {
        const opts = Array.from(sel.options).map(o => o.text);
        if (opts.some(o => o === 'Graduate')) {
          return opts.filter(o => o !== 'Select');
        }
      }
      return [];
    });
  }

  async selectQualification(value: string): Promise<void> {
    await this.page.evaluate((val) => {
      const selects = document.querySelectorAll('select');
      for (const sel of selects) {
        const opts = Array.from(sel.options).map(o => o.text);
        if (opts.some(o => o === 'Graduate')) {
          const option = Array.from(sel.options).find(o => o.text === val);
          if (option) {
            sel.value = option.value;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
          }
          return;
        }
      }
    }, value);
  }

  // ID Type dropdown (4th combobox)
  async selectIdType(value: string): Promise<void> {
    const combobox = this.page.getByRole('combobox').nth(3);
    await combobox.scrollIntoViewIfNeeded().catch(() => {});
    await combobox.selectOption({ label: value });
  }

  async isIdNumberFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'ID number' }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  async fillIdNumber(value: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'ID number' }).fill(value);
  }

  async isUdidFieldVisible(): Promise<boolean> {
    return await this.page.getByRole('textbox', { name: 'UDID' }).isVisible({ timeout: 5000 }).catch(() => false);
  }

  // Pincode on registration form
  async fillRegFormPincode(value: string): Promise<void> {
    const field = this.page.getByRole('textbox', { name: '6-digit', exact: true });
    await field.scrollIntoViewIfNeeded().catch(() => {});
    await field.fill(value);
  }

  async getRegFormPincodeValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: '6-digit', exact: true }).inputValue();
  }

  // First Name / Last Name on registration form
  async fillRegFormFirstName(value: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'First name' }).fill(value);
  }

  async fillRegFormLastName(value: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Last name' }).fill(value);
  }

  async getRegFormFirstNameValue(): Promise<string> {
    return await this.page.getByRole('textbox', { name: 'First name' }).inputValue();
  }

  // Gender dropdown (1st combobox)
  async selectGender(value: string): Promise<void> {
    const combobox = this.page.getByRole('combobox').nth(0);
    await combobox.selectOption({ label: value });
  }

  // Back to Aadhar button
  async clickBackToAadharButton(): Promise<void> {
    const btn = this.page.getByRole('button', { name: 'Back to Aadhar' });
    await btn.scrollIntoViewIfNeeded().catch(() => {});
    await btn.click();
  }

  async isAadhaarLookupPageVisibleAfterBack(): Promise<boolean> {
    return await this.page.getByRole('heading', { name: /Verify Aadhar/i }).isVisible({ timeout: 15000 }).catch(() => false);
  }

  // Register & Add PwD button state
  async isRegisterAndAddPwdButtonEnabled(): Promise<boolean> {
    return await this.page.getByRole('button', { name: 'Register & Add PwD' }).isEnabled();
  }

  async isRegisterAndAddPwdButtonDisabled(): Promise<boolean> {
    return !(await this.isRegisterAndAddPwdButtonEnabled());
  }

  // PwD Registration Form OTP Methods
  async fillRegFormMobile(value: string): Promise<void> {
    await this.page.getByRole('textbox', { name: '10-digit number' }).fill(value);
  }

  async clickRegFormMobileSendOtp(): Promise<void> {
    await this.page.getByRole('button', { name: 'Send OTP' }).first().click();
  }

  async fillRegFormMobileOtp(otp: string): Promise<void> {
    await this.page.getByRole('textbox', { name: '6-digit OTP' }).first().fill(otp);
  }

  async clickRegFormMobileVerify(): Promise<void> {
    await this.page.getByRole('button', { name: 'Verify' }).first().click();
  }

  async fillRegFormEmail(value: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email' }).fill(value);
  }

  async clickRegFormEmailSendOtp(): Promise<void> {
    await this.page.getByRole('button', { name: 'Send OTP' }).nth(1).click();
  }

  async fillRegFormEmailOtp(otp: string): Promise<void> {
    await this.page.getByRole('textbox', { name: '6-digit OTP' }).nth(1).fill(otp);
  }

  async clickRegFormEmailVerify(): Promise<void> {
    await this.page.getByRole('button', { name: 'Verify' }).nth(1).click();
  }

  async isRegFormMobileVerified(): Promise<boolean> {
    // Wait for the inline "Verified" text that appears after successful OTP verification
    try {
      await this.page.locator('text=Verified').first().waitFor({ state: 'visible', timeout: 15000 });
      return true;
    } catch {
      return false;
    }
  }

  async fillRegFormDob(value: string): Promise<void> {
    const field = this.page.locator('input[type="date"], input[type="text"]').filter({ has: this.page.locator('[data-atad-reg-dob]') });
    if (await field.count() > 0) {
      await field.fill(value);
    } else {
      // Fallback: use the DOB textbox
      const dobField = this.page.getByRole('textbox').nth(0);
      // Find the DOB field by its label context
      const dobContainer = this.page.locator('div').filter({ hasText: /^Date of Birth/ }).first();
      const dobInput = dobContainer.locator('..').locator('input').first();
      await dobInput.fill(value).catch(() => {});
    }
  }

  async fillRegFormAddress(value: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Full address' }).scrollIntoViewIfNeeded().catch(() => {});
    await this.page.getByRole('textbox', { name: 'Full address' }).fill(value);
  }

  async selectRegFormState(value: string): Promise<void> {
    const comboboxes = this.page.getByRole('combobox');
    const count = await comboboxes.count();
    for (let i = 0; i < count; i++) {
      const cb = comboboxes.nth(i);
      const optionTexts = await cb.getByRole('option').allTextContents();
      if (optionTexts.some(o => o === 'Andhra Pradesh')) {
        await cb.scrollIntoViewIfNeeded().catch(() => {});
        await cb.selectOption({ label: value });
        return;
      }
    }
  }

  // --- Activity History (SCRUM-378) ---

  async isActivityHistoryTabVisible(): Promise<boolean> {
    return await this.page.getByRole('tab', { name: /Activity|History/i }).isVisible({ timeout: 5000 }).catch(() =>
      this.page.getByText(/Activity History/i).isVisible({ timeout: 3000 }).catch(() => false)
    );
  }

  async clickActivityHistoryTab(): Promise<void> {
    const tab = this.page.getByRole('tab', { name: /Activity|History/i });
    if (await tab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await tab.click();
    } else {
      await this.page.getByText(/Activity History/i).first().click();
    }
  }

  async isFullProfileTabVisible(): Promise<boolean> {
    return await this.page.getByRole('tab', { name: /Full Profile|Profile|Details/i }).isVisible({ timeout: 5000 }).catch(() =>
      this.page.getByText(/Full Profile|Personal Details/i).first().isVisible({ timeout: 3000 }).catch(() => false)
    );
  }

  async clickFullProfileTab(): Promise<void> {
    const tab = this.page.getByRole('tab', { name: /Full Profile|Profile|Details/i });
    if (await tab.isVisible({ timeout: 3000 }).catch(() => false)) {
      await tab.click();
    } else {
      await this.page.getByText(/Full Profile|Personal Details/i).first().click();
    }
  }
}