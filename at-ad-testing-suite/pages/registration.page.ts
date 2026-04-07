import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class RegistrationPage extends BasePage {
  // Locators
  readonly registerAsAPLink: Locator;
  readonly registrationSection: Locator;
  readonly purposeStatement: Locator;
  readonly eligibilityCriteria: Locator;
  readonly emailField: Locator;
  readonly phoneField: Locator;
  readonly sendOtpEmailButton: Locator;
  readonly sendOtpPhoneButton: Locator;
  readonly otpInputField: Locator;
  readonly emailOtpInputField: Locator;
  readonly mobileOtpInputField: Locator;
  readonly verifyOtpButton: Locator;
  readonly verifyEmailOtpButton: Locator;
  readonly verifyMobileOtpButton: Locator;
  readonly otpErrorMessage: Locator;
  readonly verificationStatus: Locator;
  readonly submitButton: Locator;
  readonly requiredFieldErrors: Locator;
  readonly organizationNameField: Locator;
  readonly contactPersonField: Locator;
  readonly addressField: Locator;
  readonly cityField: Locator;
  readonly stateField: Locator;
  readonly districtField: Locator;
  readonly mandalField: Locator;
  readonly pincodeField: Locator;
  readonly confirmationMessage: Locator;
  readonly emailVerifiedStatus: Locator;
  readonly mobileVerifiedStatus: Locator;
  readonly signInWithSwarajabilityLink: Locator;
  readonly organizationTypeDropdown: Locator;
  readonly shortDescriptionField: Locator;
  readonly websiteLinksField: Locator;
  readonly fileUploadInput: Locator;
  readonly resendOtpButton: Locator;
  readonly duplicateEmailError: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.registerAsAPLink = page.getByRole('button', { name: /Register as Assistive Partner/i });
    this.registrationSection = page.locator('[class*="register"], [class*="registration"], [data-testid*="register"]');
    this.purposeStatement = page.locator('text=/purpose|why register|benefits/i');
    this.eligibilityCriteria = page.locator('text=/eligibility|criteria|requirements/i');
    this.emailField = page.getByRole('textbox', { name: /email/i });
    this.phoneField = page.getByRole('textbox', { name: /phone|mobile/i });
    this.sendOtpEmailButton = page.getByRole('button', { name: /send otp to email/i });
    this.sendOtpPhoneButton = page.getByRole('button', { name: /send otp to phone/i });
    this.otpInputField = page.getByRole('textbox', { name: /otp|verification code/i });
    this.verifyOtpButton = page.getByRole('button', { name: /verify/i });
    this.otpErrorMessage = page.locator('[class*="error"], [role="alert"], .error-message, .otp-error');
    this.verificationStatus = page.locator('[class*="verified"], [class*="unverified"], .verification-status');
    this.submitButton = page.getByRole('button', { name: /submit|register|sign up/i });
    this.requiredFieldErrors = page.locator('[class*="error"], [class*="invalid"], .field-error, .validation-error');
    this.organizationNameField = page.getByRole('textbox', { name: /organization name/i });
    this.contactPersonField = page.getByRole('textbox', { name: /contact person|contact name/i });
    this.addressField = page.getByRole('textbox', { name: /address/i });
    this.cityField = page.getByRole('textbox', { name: /city/i });
    this.stateField = page.getByRole('combobox', { name: /state/i });
    this.pincodeField = page.getByRole('textbox', { name: /pincode|zip/i });
    this.emailOtpInputField = page.locator('[data-testid*="email-otp"], input[name*="emailOtp"]').first();
    this.mobileOtpInputField = page.locator('[data-testid*="mobile-otp"], input[name*="mobileOtp"]').first();
    this.verifyEmailOtpButton = page.getByRole('button', { name: /verify email|verify/i }).first();
    this.verifyMobileOtpButton = page.getByRole('button', { name: /verify mobile|verify/i }).last();
    this.confirmationMessage = page.locator('[class*="success"], [class*="confirmation"], [role="alert"], .success-message, .confirmation-message');
    this.emailVerifiedStatus = page.locator('[class*="email-verified"], [data-testid*="email-verified"]');
    this.mobileVerifiedStatus = page.locator('[class*="mobile-verified"], [data-testid*="mobile-verified"]');
    this.signInWithSwarajabilityLink = page.getByRole('button', { name: /Sign in with Swarajability/i });
    this.organizationTypeDropdown = page.getByRole('combobox', { name: /type of organization|organization type/i });
    this.districtField = page.getByRole('combobox', { name: /district/i });
    this.mandalField = page.getByRole('combobox', { name: /mandal/i });
    this.shortDescriptionField = page.getByRole('textbox', { name: /description|offerings/i });
    this.websiteLinksField = page.getByRole('textbox', { name: /^Website/i });
    this.fileUploadInput = page.locator('input[type="file"]').or(page.getByRole('button', { name: /upload/i }));
    this.resendOtpButton = page.getByRole('button', { name: /resend/i });
    this.duplicateEmailError = page.locator('text=/already registered|duplicate/i');
    this.loginLink = page.getByRole('button', { name: /Already have an account|log in|login|sign in/i });
  }

  async navigateToHomePage(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRegisterLinkIsVisible(): Promise<void> {
    await expect(this.registerAsAPLink).toBeVisible({ timeout: 10000 });
  }

  async getRegisterLinkText(): Promise<string | null> {
    return await this.registerAsAPLink.textContent();
  }

  async clickRegisterAsAPLink(): Promise<void> {
    await this.registerAsAPLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRegistrationPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/register|registration/i, { timeout: 15000 });
  }

  async verifyPurposeStatementVisible(): Promise<void> {
    await expect(this.purposeStatement).toBeVisible({ timeout: 10000 });
  }

  async verifyEligibilityCriteriaVisible(): Promise<void> {
    await expect(this.eligibilityCriteria).toBeVisible({ timeout: 10000 });
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async clickSendOtpForEmail(): Promise<void> {
    await this.sendOtpEmailButton.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyOtpInputFieldVisible(): Promise<void> {
    await expect(this.otpInputField).toBeVisible({ timeout: 10000 });
  }

  async enterOtpValue(value: string): Promise<void> {
    await this.otpInputField.fill(value);
  }

  async getOtpFieldValue(): Promise<string> {
    return await this.otpInputField.inputValue();
  }

  async verifyOtpFieldRejectsAlphabetic(alphabeticValue: string): Promise<boolean> {
    await this.otpInputField.fill('');
    await this.otpInputField.fill(alphabeticValue);
    const value = await this.otpInputField.inputValue();
    // If alphabetic characters are rejected, the field should be empty or contain only numbers
    return value === '' || /^\d*$/.test(value);
  }

  async verifyOtpFieldRejectsSpecialChars(specialChars: string): Promise<boolean> {
    await this.otpInputField.fill('');
    await this.otpInputField.fill(specialChars);
    const value = await this.otpInputField.inputValue();
    // If special characters are rejected, the field should be empty or contain only numbers
    return value === '' || /^\d*$/.test(value);
  }

  async verifyOtpFieldAcceptsNumeric(numericValue: string): Promise<boolean> {
    await this.otpInputField.fill('');
    await this.otpInputField.fill(numericValue);
    const value = await this.otpInputField.inputValue();
    return value === numericValue;
  }

  async clickVerifyOtpButton(): Promise<void> {
    await this.verifyOtpButton.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyOtpErrorMessageVisible(): Promise<void> {
    await expect(this.otpErrorMessage).toBeVisible({ timeout: 10000 });
  }

  async getOtpErrorMessageText(): Promise<string | null> {
    return await this.otpErrorMessage.textContent();
  }

  async verifyVerificationStatusUnverified(): Promise<boolean> {
    const statusText = await this.verificationStatus.textContent();
    return statusText?.toLowerCase().includes('unverified') || 
           !statusText?.toLowerCase().includes('verified') ||
           statusText === null;
  }

  async isOtpErrorMessageDisplayed(): Promise<boolean> {
    return await this.otpErrorMessage.isVisible();
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click({ force: true });
    await this.page.waitForTimeout(1000);
  }

  async verifySubmitButtonVisible(): Promise<void> {
    await expect(this.submitButton).toBeVisible({ timeout: 10000 });
  }

  async getValidationErrorCount(): Promise<number> {
    await this.page.waitForTimeout(500);
    return await this.requiredFieldErrors.count();
  }

  async verifyValidationErrorsDisplayed(): Promise<boolean> {
    const errorCount = await this.getValidationErrorCount();
    return errorCount > 0;
  }

  async verifyFormNotSubmitted(): Promise<boolean> {
    // Form should still be on registration page if not submitted
    const currentUrl = this.page.url();
    return currentUrl.includes('register') || currentUrl.includes('registration');
  }

  async clearAllFormFields(): Promise<void> {
    // Clear all form fields to ensure they are empty
    const textboxes = this.page.getByRole('textbox');
    const count = await textboxes.count();
    for (let i = 0; i < count; i++) {
      await textboxes.nth(i).clear();
    }
  }

  async fillAllMandatoryFields(data: {
    organizationName: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  }): Promise<void> {
    await this.organizationNameField.fill(data.organizationName);
    await this.contactPersonField.fill(data.contactPerson);
    await this.emailField.fill(data.email);
    await this.phoneField.fill(data.phone);
    await this.addressField.fill(data.address);
    await this.cityField.fill(data.city);
    if (await this.stateField.isVisible()) {
      await this.stateField.selectOption({ label: data.state });
    }
    await this.pincodeField.fill(data.pincode);
  }

  async sendOtpForEmail(): Promise<void> {
    await this.sendOtpEmailButton.click();
    await this.page.waitForTimeout(2000);
  }

  async sendOtpForMobile(): Promise<void> {
    await this.sendOtpPhoneButton.click();
    await this.page.waitForTimeout(2000);
  }

  async enterEmailOtp(otp: string): Promise<void> {
    await this.emailOtpInputField.fill(otp);
  }

  async enterMobileOtp(otp: string): Promise<void> {
    await this.mobileOtpInputField.fill(otp);
  }

  async clickVerifyEmailOtp(): Promise<void> {
    await this.verifyEmailOtpButton.click();
    await this.page.waitForTimeout(1000);
  }

  async clickVerifyMobileOtp(): Promise<void> {
    await this.verifyMobileOtpButton.click();
    await this.page.waitForTimeout(1000);
  }

  async verifyBothOtps(emailOtp: string, mobileOtp: string): Promise<void> {
    // Verify email OTP
    await this.sendOtpForEmail();
    await this.enterEmailOtp(emailOtp);
    await this.clickVerifyEmailOtp();
    
    // Verify mobile OTP
    await this.sendOtpForMobile();
    await this.enterMobileOtp(mobileOtp);
    await this.clickVerifyMobileOtp();
  }

  async verifyConfirmationMessageVisible(): Promise<void> {
    await expect(this.confirmationMessage).toBeVisible({ timeout: 15000 });
  }

  async getConfirmationMessageText(): Promise<string | null> {
    await this.page.waitForTimeout(1000);
    return await this.confirmationMessage.textContent();
  }

  async isConfirmationMessageDisplayed(): Promise<boolean> {
    return await this.confirmationMessage.isVisible();
  }

  async triggerValidationErrors(): Promise<void> {
    // Clear all fields and click submit to trigger validation errors
    await this.clearAllFormFields();
    await this.clickSubmitButton();
    await this.page.waitForTimeout(500);
  }

  async getValidationErrorMessages(): Promise<string[]> {
    const errors: string[] = [];
    const errorElements = this.page.locator('[class*="error"], [role="alert"], .field-error, .validation-error, .error-message');
    const count = await errorElements.count();
    for (let i = 0; i < count; i++) {
      const text = await errorElements.nth(i).textContent();
      if (text && text.trim()) {
        errors.push(text.trim());
      }
    }
    return errors;
  }

  async verifyErrorMessagesAreClear(expectedPatterns: string[]): Promise<boolean> {
    const errors = await this.getValidationErrorMessages();
    if (errors.length === 0) return false;
    
    // Check that error messages contain descriptive text (not just generic errors)
    return errors.some(error => 
      expectedPatterns.some(pattern => error.toLowerCase().includes(pattern.toLowerCase()))
    );
  }

  async verifyErrorsAssociatedWithFields(): Promise<boolean> {
    // Check if error messages are near their respective fields using aria-describedby or proximity
    const fieldsWithErrors = this.page.locator('[aria-invalid="true"], .has-error, .field-error-container, input:invalid');
    const count = await fieldsWithErrors.count();
    return count > 0;
  }

  async getFieldErrorAssociations(): Promise<{ field: string; hasError: boolean }[]> {
    const associations: { field: string; hasError: boolean }[] = [];
    const fields = [
      { name: 'Organization Name', locator: this.organizationNameField },
      { name: 'Contact Person', locator: this.contactPersonField },
      { name: 'Email', locator: this.emailField },
      { name: 'Phone', locator: this.phoneField }
    ];

    for (const field of fields) {
      const isInvalid = await field.locator.evaluate((el) => {
        return el.getAttribute('aria-invalid') === 'true' || 
               el.classList.contains('error') ||
               el.classList.contains('invalid') ||
               !el.checkValidity?.();
      }).catch(() => false);
      associations.push({ field: field.name, hasError: isInvalid });
    }
    return associations;
  }

  async verifyErrorMessagesDisplayed(): Promise<boolean> {
    const errors = await this.getValidationErrorMessages();
    return errors.length > 0;
  }

  // TC_REG_002: Verify redirect to registration page
  async verifyRedirectToRegistrationPage(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('register') || url.includes('registration') || url.includes('pwd-catalog');
  }

  // TC_REG_003: Purpose and eligibility
  async isPurposeStatementVisible(): Promise<boolean> {
    return await this.purposeStatement.isVisible().catch(() => false);
  }

  async isEligibilityCriteriaVisible(): Promise<boolean> {
    return await this.eligibilityCriteria.isVisible().catch(() => false);
  }

  // TC_REG_004: Sign in with Swarajability
  async verifySignInLinkVisible(): Promise<void> {
    await expect(this.signInWithSwarajabilityLink).toBeVisible({ timeout: 10000 });
  }

  async isSignInLinkVisible(): Promise<boolean> {
    return await this.signInWithSwarajabilityLink.isVisible().catch(() => false);
  }

  // TC_REG_006: Mandatory fields
  async verifyOrganizationNameFieldVisible(): Promise<boolean> {
    return await this.organizationNameField.isVisible();
  }

  async verifyOrganizationTypeDropdownVisible(): Promise<boolean> {
    return await this.organizationTypeDropdown.isVisible().catch(() => false);
  }

  async verifyContactPersonFieldVisible(): Promise<boolean> {
    return await this.contactPersonField.isVisible();
  }

  async verifyEmailFieldVisible(): Promise<boolean> {
    return await this.emailField.isVisible();
  }

  async verifyPhoneFieldVisible(): Promise<boolean> {
    return await this.phoneField.isVisible();
  }

  async verifyAddressFieldVisible(): Promise<boolean> {
    return await this.addressField.isVisible();
  }

  async verifyShortDescriptionFieldVisible(): Promise<boolean> {
    return await this.shortDescriptionField.isVisible().catch(() => false);
  }

  // TC_REG_007: Organization type dropdown
  async getOrganizationTypeOptions(): Promise<string[]> {
    await this.organizationTypeDropdown.click();
    const options = this.page.locator('option, [role="option"], li[role="option"]');
    const count = await options.count();
    const optionTexts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (text) optionTexts.push(text.trim());
    }
    return optionTexts;
  }

  // TC_REG_008: Cascading dropdowns
  async selectState(state: string): Promise<void> {
    await this.stateField.selectOption({ label: state });
    await this.page.waitForTimeout(1000);
  }

  async verifyDistrictDropdownPopulated(): Promise<boolean> {
    const options = await this.districtField.locator('option').count();
    return options > 1;
  }

  async selectDistrict(district: string): Promise<void> {
    await this.districtField.selectOption({ label: district });
    await this.page.waitForTimeout(1000);
  }

  async verifyMandalDropdownPopulated(): Promise<boolean> {
    const options = await this.mandalField.locator('option').count();
    return options > 1;
  }

  // TC_REG_009: Address fields
  async verifyPincodeFieldVisible(): Promise<boolean> {
    return await this.pincodeField.isVisible();
  }

  async verifyCityFieldVisible(): Promise<boolean> {
    return await this.cityField.isVisible();
  }

  // TC_REG_010: Optional fields
  async verifyWebsiteLinksFieldVisible(): Promise<boolean> {
    return await this.websiteLinksField.isVisible().catch(() => false);
  }

  async verifyFileUploadVisible(): Promise<boolean> {
    return await this.fileUploadInput.isVisible().catch(() => false);
  }

  // TC_REG_011 & TC_REG_012: Send OTP buttons
  async verifySendOtpEmailButtonVisible(): Promise<boolean> {
    return await this.sendOtpEmailButton.isVisible();
  }

  async verifySendOtpPhoneButtonVisible(): Promise<boolean> {
    return await this.sendOtpPhoneButton.isVisible();
  }

  async enterPhone(phone: string): Promise<void> {
    await this.phoneField.fill(phone);
  }

  async clickSendOtpForPhone(): Promise<void> {
    await this.sendOtpPhoneButton.click();
    await this.page.waitForTimeout(1000);
  }

  // TC_REG_015: OTP length restriction
  async verifyOtpFieldMaxLength(): Promise<number> {
    const maxLength = await this.otpInputField.getAttribute('maxlength');
    return maxLength ? parseInt(maxLength) : 0;
  }

  async enterOtpAndGetLength(otp: string): Promise<number> {
    await this.otpInputField.fill(otp);
    const value = await this.otpInputField.inputValue();
    return value.length;
  }

  // TC_REG_016: Verify button state
  async isVerifyButtonEnabled(): Promise<boolean> {
    return await this.verifyOtpButton.isEnabled();
  }

  // TC_REG_017: Successful OTP verification
  async isEmailVerified(): Promise<boolean> {
    const verifiedText = await this.page.locator('text=/verified/i').first().isVisible().catch(() => false);
    return verifiedText;
  }

  // TC_REG_019: Resend OTP
  async isResendOtpButtonVisible(): Promise<boolean> {
    return await this.resendOtpButton.isVisible().catch(() => false);
  }

  async clickResendOtp(): Promise<void> {
    await this.resendOtpButton.click();
    await this.page.waitForTimeout(2000);
  }

  // TC_REG_021: Both verifications required
  async verifyOnlyEmailAndSubmit(): Promise<boolean> {
    // Returns true if submission is blocked
    await this.clickSubmitButton();
    return await this.verifyFormNotSubmitted();
  }

  // TC_REG_023: Error messages for specific fields
  async getErrorMessageForField(fieldName: string): Promise<string | null> {
    const errorLocator = this.page.locator(`[class*="error"]:near(:text("${fieldName}")), [aria-describedby]:has-text("${fieldName}") + [class*="error"]`);
    if (await errorLocator.isVisible().catch(() => false)) {
      return await errorLocator.textContent();
    }
    return null;
  }

  // TC_REG_024: Invalid email format
  async enterInvalidEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async isEmailValidationErrorVisible(): Promise<boolean> {
    const emailError = this.page.locator('[class*="error"]:near(input[type="email"]), .email-error, [aria-invalid="true"]');
    return await emailError.isVisible().catch(() => false);
  }

  // TC_REG_025: Invalid phone validation
  async enterInvalidPhone(phone: string): Promise<void> {
    await this.phoneField.fill(phone);
  }

  async isPhoneValidationErrorVisible(): Promise<boolean> {
    const phoneError = this.page.locator('[class*="error"]:near(input[name*="phone"]), .phone-error');
    return await phoneError.isVisible().catch(() => false);
  }

  // TC_REG_026: Pincode validation
  async enterPincode(pincode: string): Promise<void> {
    await this.pincodeField.fill(pincode);
  }

  async isPincodeValidationErrorVisible(): Promise<boolean> {
    const pincodeError = this.page.locator('[class*="error"]:near(input[name*="pincode"]), .pincode-error');
    return await pincodeError.isVisible().catch(() => false);
  }

  // TC_REG_029 & TC_REG_030: Duplicate email
  async isDuplicateEmailErrorVisible(): Promise<boolean> {
    return await this.duplicateEmailError.isVisible().catch(() => false);
  }

  async isLoginLinkVisibleInError(): Promise<boolean> {
    return await this.loginLink.isVisible().catch(() => false);
  }

  // TC_REG_032: Form field labels
  async verifyAllFieldsHaveLabels(): Promise<boolean> {
    const fields = this.page.locator('input, select, textarea');
    const count = await fields.count();
    for (let i = 0; i < count; i++) {
      const field = fields.nth(i);
      const id = await field.getAttribute('id');
      const ariaLabel = await field.getAttribute('aria-label');
      const ariaLabelledBy = await field.getAttribute('aria-labelledby');
      if (!id && !ariaLabel && !ariaLabelledBy) {
        const label = await this.page.locator(`label:has(input, select, textarea)`).nth(i).isVisible().catch(() => false);
        if (!label) return false;
      }
    }
    return true;
  }

  // TC_REG_036: Keyboard navigation
  async verifyKeyboardNavigation(): Promise<boolean> {
    await this.page.keyboard.press('Tab');
    const focusedElement = await this.page.evaluate(() => document.activeElement?.tagName);
    return focusedElement !== null;
  }

  async verifyTabOrder(): Promise<boolean> {
    const focusableElements: string[] = [];
    for (let i = 0; i < 10; i++) {
      await this.page.keyboard.press('Tab');
      const tagName = await this.page.evaluate(() => document.activeElement?.tagName);
      if (tagName) focusableElements.push(tagName);
    }
    return focusableElements.length > 0;
  }

  // TC_REG_037: Focus indicators
  async verifyFocusIndicatorVisible(): Promise<boolean> {
    await this.page.keyboard.press('Tab');
    const hasFocusStyle = await this.page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const style = window.getComputedStyle(el);
      return style.outline !== 'none' || style.boxShadow !== 'none';
    });
    return hasFocusStyle;
  }

  // TC_REG_038 & TC_REG_039: File upload
  async uploadFile(filePath: string): Promise<void> {
    await this.fileUploadInput.setInputFiles(filePath);
    await this.page.waitForTimeout(1000);
  }

  async isFileUploadSuccessful(): Promise<boolean> {
    const uploadedFile = this.page.locator('[class*="uploaded"], [class*="file-name"], .upload-success');
    return await uploadedFile.isVisible().catch(() => false);
  }

  async isFileTypeErrorVisible(): Promise<boolean> {
    const fileError = this.page.locator('[class*="error"]:near(input[type="file"]), .file-error');
    return await fileError.isVisible().catch(() => false);
  }

  // TC_REG_041: Short description field
  async enterShortDescription(description: string): Promise<void> {
    await this.shortDescriptionField.fill(description);
  }

  async getShortDescriptionValue(): Promise<string> {
    return await this.shortDescriptionField.inputValue();
  }

  // TC_REG_042: Website links field
  async enterWebsiteLink(url: string): Promise<void> {
    await this.websiteLinksField.fill(url);
  }

  async isWebsiteLinkValidationErrorVisible(): Promise<boolean> {
    const urlError = this.page.locator('[class*="error"]:near(input[name*="website"]), .url-error');
    return await urlError.isVisible().catch(() => false);
  }

  // Additional methods for missing test cases
  async clickSignInWithSwarajability(): Promise<void> {
    await this.signInWithSwarajabilityLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDashboardOrLoginFlow(): Promise<boolean> {
    // Check if redirected to dashboard or SSO login page
    await this.page.waitForTimeout(3000);
    const url = this.page.url();
    return url.includes('dashboard') || url.includes('sso') || url.includes('login') || url.includes('auth');
  }

  async verifyStateDropdownVisible(): Promise<boolean> {
    return await this.stateField.isVisible().catch(() => false);
  }

  async isSubmitButtonDisabled(): Promise<boolean> {
    return !(await this.submitButton.isEnabled());
  }

  async enterOrganizationName(name: string): Promise<void> {
    await this.organizationNameField.fill(name);
  }

  async enterContactPerson(name: string): Promise<void> {
    await this.contactPersonField.fill(name);
  }

  async enterAddress(address: string): Promise<void> {
    await this.addressField.fill(address);
  }
}
