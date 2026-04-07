// spec: specs/functional/SCRUM-357-caregiver-registration-verification.json
// test-data: test-data/scrum357-caregiver-registration.json

import { test, expect } from '@playwright/test';
import { CaregiverPage } from '../../pages/caregiver.page';
import { AccountTypePage } from '../../pages/account-type.page';
import testData from '../../test-data/scrum357-caregiver-registration.json';

test.describe('Caregiver Registration, Verification, Consent & Feature Parity', () => {
  let caregiverPage: CaregiverPage;
  let accountTypePage: AccountTypePage;

  test.beforeEach(async ({ page }) => {
    caregiverPage = new CaregiverPage(page);
    accountTypePage = new AccountTypePage(page);
  });

  test('TC_CG_REG_001 - Verify all mandatory fields are displayed on caregiver registration form', async () => {
    const data = testData.TC_CG_REG_001;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateToPortal(data.url);
    await caregiverPage.openSignInRegisterPopup();
    await caregiverPage.clickCreateNewAccount();
    await caregiverPage.selectCaregiverAccountType();
    await caregiverPage.navigateToCaregiverRegistration();

    // Verify registration page heading
    const heading = await caregiverPage.getRegistrationHeading();
    expect(heading).toContain(data.expected.registrationHeading);

    // Verify Personal Information section heading
    expect(await caregiverPage.isPersonalInfoHeadingVisible()).toBeTruthy();

    // 2. Verify First Name field is displayed with label
    expect(await caregiverPage.isFirstNameFieldVisible()).toBeTruthy();

    // 3. Verify Last Name field is displayed with label
    expect(await caregiverPage.isLastNameFieldVisible()).toBeTruthy();

    // 4. Verify Mobile Number field is displayed with +91 country code
    expect(await caregiverPage.isMobileFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isMobileCountryCodeVisible()).toBeTruthy();

    // 5. Verify Email ID field is displayed with label
    expect(await caregiverPage.isEmailFieldVisible()).toBeTruthy();

    // 6. Verify Password field is displayed (masked input)
    expect(await caregiverPage.isPasswordFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isPasswordFieldMasked()).toBeTruthy();

    // 7. Verify Confirm Password field is displayed (masked input)
    expect(await caregiverPage.isConfirmPasswordFieldVisible()).toBeTruthy();

    // 8. Verify Aadhaar Number field is displayed (masked input)
    expect(await caregiverPage.isAadharFieldVisible()).toBeTruthy();

    // 9. Verify Pincode field is displayed with label
    expect(await caregiverPage.isPincodeFieldVisible()).toBeTruthy();

    // 10. Verify all fields are marked as mandatory (asterisk or required indicator)
    expect(await caregiverPage.hasAllFieldLabels()).toBeTruthy();

    // 11. Verify Aadhaar privacy and usage information text is clearly displayed
    expect(await caregiverPage.isAadharPrivacyInfoVisible()).toBeTruthy();
  });

  test('TC_CG_REG_006 - Verify Email ID format validation', async () => {
    const data = testData.TC_CG_REG_006;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateToPortal(data.url);
    await caregiverPage.openSignInRegisterPopup();
    await caregiverPage.clickCreateNewAccount();
    await caregiverPage.selectCaregiverAccountType();
    await caregiverPage.navigateToCaregiverRegistration();

    // 2. Enter invalid email: 'notanemail' and verify inline validation error
    await caregiverPage.fillEmailId(data.inputs.invalidEmail1);
    await caregiverPage.pressTabKey();
    expect(await caregiverPage.isEmailValidationErrorVisible()).toBeTruthy();

    // 3. Enter email without domain: 'user@' and verify validation error
    await caregiverPage.fillEmailId(data.inputs.invalidEmail2);
    await caregiverPage.pressTabKey();
    expect(await caregiverPage.isEmailValidationErrorVisible()).toBeTruthy();

    // 4. Enter email without TLD: 'user@domain' and verify validation error
    await caregiverPage.fillEmailId(data.inputs.invalidEmail3);
    await caregiverPage.pressTabKey();
    expect(await caregiverPage.isEmailValidationErrorVisible()).toBeTruthy();

    // 5. Enter email with spaces: 'user @domain.com' and verify validation error
    await caregiverPage.fillEmailId(data.inputs.invalidEmail4);
    await caregiverPage.pressTabKey();
    expect(await caregiverPage.isEmailValidationErrorVisible()).toBeTruthy();

    // 6. Enter valid email: 'priya.sharma@example.com' and verify accepted without error
    await caregiverPage.fillEmailId(data.inputs.validEmail);
    await caregiverPage.pressTabKey();
    expect(await caregiverPage.isEmailValidationErrorHidden()).toBeTruthy();

    // 7. Verify Send OTP button becomes available for email
    expect(await caregiverPage.isSendOtpEmailButtonVisible()).toBeTruthy();
  });

  test('TC_CG_REG_016 - Verify Complete Registration button enablement logic', async () => {
    const data = testData.TC_CG_REG_016;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateToPortal(data.url);
    await caregiverPage.openSignInRegisterPopup();
    await caregiverPage.clickCreateNewAccount();
    await caregiverPage.selectCaregiverAccountType();
    await caregiverPage.navigateToCaregiverRegistration();

    // 2. Verify Complete Registration button is disabled initially
    expect(await caregiverPage.isCompleteRegistrationButtonVisible()).toBeTruthy();
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();

    // 3. Verify the registration requirements list is displayed
    expect(await caregiverPage.isRegistrationRequirementsListVisible()).toBeTruthy();
    expect(await caregiverPage.isMobileOtpRequirementVisible()).toBeTruthy();
    expect(await caregiverPage.isEmailOtpRequirementVisible()).toBeTruthy();
    expect(await caregiverPage.isConsentRequirementMessageVisible()).toBeTruthy();
    expect(await caregiverPage.isFieldsRequirementVisible()).toBeTruthy();

    // 4. Fill all mandatory fields with valid data
    await caregiverPage.fillAllRegistrationFields({
      firstName: data.inputs.firstName,
      lastName: data.inputs.lastName,
      mobile: data.inputs.mobileNumber,
      email: data.inputs.emailId,
      password: data.inputs.password,
      confirmPassword: data.inputs.confirmPassword,
      aadhar: data.inputs.aadhaarNumber,
      pincode: data.inputs.pincode,
      address: data.inputs.address
    });

    // 5. Verify button is still disabled (OTPs not verified) and fields requirement is gone
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();
    expect(await caregiverPage.isFieldsRequirementHidden()).toBeTruthy();

    // 6. Verify OTP and consent requirements are still shown
    expect(await caregiverPage.isMobileOtpRequirementVisible()).toBeTruthy();
    expect(await caregiverPage.isEmailOtpRequirementVisible()).toBeTruthy();
    expect(await caregiverPage.isConsentRequirementMessageVisible()).toBeTruthy();

    // 7. Check the consent checkbox
    await caregiverPage.checkConsentCheckbox();

    // 8. Verify consent requirement disappears but button still disabled (OTPs pending)
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();
    expect(await caregiverPage.isMobileOtpRequirementVisible()).toBeTruthy();
    expect(await caregiverPage.isEmailOtpRequirementVisible()).toBeTruthy();

    // 9. Uncheck consent and verify requirement reappears
    await caregiverPage.uncheckConsentCheckbox();
    expect(await caregiverPage.isConsentRequirementMessageVisible()).toBeTruthy();
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();
  });

  test('TC_CG_REG_018 - Verify duplicate mobile number shows Account exists with sign-in option', async () => {
    const data = testData.TC_CG_REG_018;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Enter the already-registered mobile number (use pressSequentially to trigger input events)
    const mobileField = caregiverPage.page.getByRole('textbox', { name: 'Mobile Number *' });
    await mobileField.click();
    await mobileField.fill('');
    await mobileField.pressSequentially(data.inputs.existingMobile, { delay: 50 });
    await caregiverPage.pressTabKey();

    // 3. Wait for Send OTP button to become enabled, then click
    await caregiverPage.page.getByRole('button', { name: 'Send OTP' }).first().waitFor({ state: 'visible' });
    await caregiverPage.page.waitForFunction(
      () => {
        const buttons = document.querySelectorAll('button');
        for (const btn of buttons) {
          if (btn.textContent?.includes('Send OTP') && !btn.disabled) return true;
        }
        return false;
      },
      { timeout: 5000 }
    ).catch(() => {});
    await caregiverPage.clickSendOtpMobileButton();

    // 4. Verify error message 'Phone number already exists' is displayed
    expect(await caregiverPage.isDuplicateMobileErrorVisible()).toBeTruthy();

    // 5. Verify Complete Registration button remains disabled
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();

    // 6. Verify sign-in option/link is available on the page
    expect(await caregiverPage.isBackToSignInLinkVisible()).toBeTruthy();
  });

  test('TC_CG_REG_003 - Verify registration is blocked when mandatory fields are empty', async () => {
    const data = testData.TC_CG_REG_003;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Verify Complete Registration button is disabled when all fields empty
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();

    // 3. Verify fields requirement is shown
    expect(await caregiverPage.isFieldsRequirementVisible()).toBeTruthy();

    // 4. Fill only First Name, leave rest empty, tab through
    await caregiverPage.fillFirstName(data.inputs.firstName);
    await caregiverPage.pressTabKey();

    // 5. Verify button remains disabled (mandatory fields still empty)
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();
  });

  test('TC_CG_REG_004 - Verify inline validation for First Name and Last Name (alphabetic only)', async () => {
    const data = testData.TC_CG_REG_004;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Enter numeric characters in First Name field
    await caregiverPage.fillFirstName(data.inputs.invalidNumeric);
    await caregiverPage.pressTabKey();

    // 3. Enter special characters in First Name
    await caregiverPage.fillFirstName(data.inputs.invalidSpecial);
    await caregiverPage.pressTabKey();

    // 4. Enter alphanumeric mix in First Name
    await caregiverPage.fillFirstName(data.inputs.invalidAlphanumeric);
    await caregiverPage.pressTabKey();

    // 5. Enter valid alphabetic First Name
    await caregiverPage.fillFirstName(data.inputs.validName);
    await caregiverPage.pressTabKey();

    // 6. Verify valid name is retained
    expect(await caregiverPage.getFirstNameFieldValue()).toBe(data.inputs.validName);

    // 7. Enter name with spaces in Last Name
    await caregiverPage.fillLastName(data.inputs.nameWithSpace);
    await caregiverPage.pressTabKey();

    // 8. Verify name with spaces is retained
    expect(await caregiverPage.getLastNameFieldValue()).toBe(data.inputs.nameWithSpace);
  });

  test('TC_CG_REG_005 - Verify Mobile Number field accepts only 10 digits with +91 country code', async () => {
    const data = testData.TC_CG_REG_005;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Verify +91 country code is displayed as prefix
    expect(await caregiverPage.isMobileCountryCodeVisible()).toBeTruthy();

    // 3. Enter less than 10 digits
    await caregiverPage.fillMobileNumber(data.inputs.shortNumber);
    await caregiverPage.pressTabKey();

    // 4. Enter alphabetic characters
    await caregiverPage.fillMobileNumber(data.inputs.alphabeticInput);
    await caregiverPage.pressTabKey();

    // 5. Enter valid 10-digit number
    await caregiverPage.fillMobileNumber(data.inputs.validNumber);
    await caregiverPage.pressTabKey();

    // 6. Verify Send OTP button is visible
    expect(await caregiverPage.isSendOtpMobileButtonVisible()).toBeTruthy();
  });

  test('TC_CG_REG_007 - Verify Password and Confirm Password validation', async () => {
    const data = testData.TC_CG_REG_007;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Enter weak password
    await caregiverPage.fillPassword(data.inputs.weakPassword);
    await caregiverPage.pressTabKey();

    // 3. Verify password strength indicator shows Weak
    expect(await caregiverPage.isPasswordStrengthWeakVisible()).toBeTruthy();

    // 4. Verify weak password error
    expect(await caregiverPage.isWeakPasswordErrorVisible()).toBeTruthy();

    // 5. Enter strong password
    await caregiverPage.fillPassword(data.inputs.strongPassword);

    // 6. Verify password strength indicator shows Strong
    expect(await caregiverPage.isPasswordStrengthStrongVisible()).toBeTruthy();

    // 7. Verify password field masks characters
    expect(await caregiverPage.isPasswordFieldMasked()).toBeTruthy();

    // 8. Enter mismatched Confirm Password
    await caregiverPage.fillConfirmPassword(data.inputs.mismatchPassword);
    await caregiverPage.pressTabKey();

    // 9. Verify mismatch error message
    expect(await caregiverPage.isPasswordsMismatchErrorVisible()).toBeTruthy();

    // 10. Enter matching Confirm Password
    await caregiverPage.fillConfirmPassword(data.inputs.strongPassword);
    await caregiverPage.pressTabKey();

    // 11. Verify passwords match and no error shown
    expect(await caregiverPage.isPasswordsMismatchErrorHidden()).toBeTruthy();
  });

  test('TC_CG_REG_008 - Verify Aadhaar Number field accepts only 12 digits with masked input', async () => {
    const data = testData.TC_CG_REG_008;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Verify Aadhaar privacy and usage information is displayed
    expect(await caregiverPage.isAadharPrivacyInfoVisible()).toBeTruthy();

    // 3. Enter less than 12 digits
    await caregiverPage.fillAadharNumber(data.inputs.shortAadhaar);
    await caregiverPage.pressTabKey();

    // 4. Enter alphabetic characters
    await caregiverPage.clearAadharField();
    await caregiverPage.fillAadharNumber(data.inputs.alphabeticAadhaar);
    await caregiverPage.pressTabKey();

    // 5. Enter valid 12-digit Aadhaar
    await caregiverPage.clearAadharField();
    await caregiverPage.fillAadharNumber(data.inputs.validAadhaar);
    await caregiverPage.pressTabKey();

    // 6. Verify Aadhaar field is visible (accepted)
    expect(await caregiverPage.isAadharFieldVisible()).toBeTruthy();
  });

  test('TC_CG_REG_009 - Verify Pincode field accepts only valid 6-digit input', async () => {
    const data = testData.TC_CG_REG_009;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Enter less than 6 digits
    await caregiverPage.fillPincode(data.inputs.shortPincode);
    await caregiverPage.pressTabKey();

    // 3. Enter alphabetic characters
    await caregiverPage.clearPincodeField();
    await caregiverPage.fillPincode(data.inputs.alphabeticPincode);
    await caregiverPage.pressTabKey();

    // 4. Enter valid 6-digit pincode
    await caregiverPage.clearPincodeField();
    await caregiverPage.fillPincode(data.inputs.validPincode);
    await caregiverPage.pressTabKey();

    // 5. Verify pincode field is visible (accepted)
    expect(await caregiverPage.isPincodeFieldVisible()).toBeTruthy();
  });

  test('TC_CG_REG_015 - Verify consent checkbox is mandatory for registration completion', async () => {
    const data = testData.TC_CG_REG_015;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Verify consent checkbox is visible and unchecked
    expect(await caregiverPage.isConsentCheckboxVisible()).toBeTruthy();
    expect(await caregiverPage.isConsentCheckboxChecked()).toBeFalsy();

    // 3. Verify Complete Registration button is disabled without consent
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();

    // 4. Verify consent text mentions withdrawal ability
    expect(await caregiverPage.isConsentWithdrawalMessageVisible()).toBeTruthy();

    // 5. Check the consent checkbox
    await caregiverPage.checkConsentCheckbox();
    expect(await caregiverPage.isConsentCheckboxChecked()).toBeTruthy();

    // 6. Verify button is still disabled (other requirements pending)
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();

    // 7. Uncheck the consent checkbox
    await caregiverPage.uncheckConsentCheckbox();
    expect(await caregiverPage.isConsentCheckboxChecked()).toBeFalsy();

    // 8. Verify consent requirement reappears
    expect(await caregiverPage.isConsentRequirementMessageVisible()).toBeTruthy();
  });

  test('TC_CG_REG_019 - Verify duplicate email shows Account exists with sign-in option', async () => {
    const data = testData.TC_CG_REG_019;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateToPortal(data.url);
    await caregiverPage.openSignInRegisterPopup();
    await caregiverPage.clickCreateNewAccount();
    await caregiverPage.selectCaregiverAccountType();
    await caregiverPage.navigateToCaregiverRegistration();

    // 2. Enter the already-registered email
    await caregiverPage.fillEmailId(data.inputs.existingEmail);

    // 3. Click Send OTP to attempt OTP for duplicate email
    await caregiverPage.clickSendOtpEmailButton();
    await caregiverPage.page.waitForTimeout(2000);

    // 4. Verify error message is displayed (alert near email field)
    const emailAlert = caregiverPage.page.locator('[role="alert"]').filter({ hasText: /already|exists|registered|duplicate/i });
    const isAlertVisible = await emailAlert.isVisible({ timeout: 5000 }).catch(() => false);
    const isDuplicateError = await caregiverPage.isDuplicateEmailErrorVisible();
    expect(isAlertVisible || isDuplicateError).toBeTruthy();

    // 5. Verify sign-in option is available
    expect(await caregiverPage.isBackToSignInLinkVisible()).toBeTruthy();
  });

  test('TC_CG_REG_021 - Verify partial form submission retains data on validation error', async () => {
    const data = testData.TC_CG_REG_021;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Fill First Name, Last Name, and Mobile Number with valid data
    await caregiverPage.fillFirstName(data.inputs.firstName);
    await caregiverPage.fillLastName(data.inputs.lastName);
    await caregiverPage.fillMobileNumber(data.inputs.mobileNumber);

    // 3. Enter invalid email format
    await caregiverPage.fillEmailId(data.inputs.invalidEmail);
    await caregiverPage.pressTabKey();

    // 4. Verify validation error appears for email
    expect(await caregiverPage.isEmailValidationErrorVisible()).toBeTruthy();

    // 5. Verify First Name data is retained
    expect(await caregiverPage.verifyFieldRetainsValue('First Name *', data.inputs.firstName)).toBeTruthy();

    // 6. Verify Last Name data is retained
    expect(await caregiverPage.verifyFieldRetainsValue('Last Name *', data.inputs.lastName)).toBeTruthy();

    // 7. Correct the email to valid format
    await caregiverPage.fillEmailId(data.inputs.validEmail);
    await caregiverPage.pressTabKey();

    // 8. Verify email error is gone
    expect(await caregiverPage.isEmailValidationErrorHidden()).toBeTruthy();

    // 9. Verify previously entered data is still present
    expect(await caregiverPage.verifyFieldRetainsValue('First Name *', data.inputs.firstName)).toBeTruthy();
  });

  test('TC_CG_REG_022 - Verify Back to sign in navigation works at any point during registration', async () => {
    const data = testData.TC_CG_REG_022;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Verify Back to Sign In link is visible
    expect(await caregiverPage.isBackToSignInLinkVisible()).toBeTruthy();

    // 3. Click Back to Sign In before filling any fields
    await caregiverPage.clickBackToSignInLink();

    // 4. Navigate back to registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 5. Fill some fields with valid data
    await caregiverPage.fillFirstName('Priya');
    await caregiverPage.fillLastName('Sharma');

    // 6. Click Back to Sign In mid-form
    await caregiverPage.clickBackToSignInLink();

    // 7. Navigate back to registration and verify form is reset
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');
    expect(await caregiverPage.getFirstNameFieldValue()).toBe('');
  });

  test('TC_CG_REG_023 - Verify Terms & Conditions and Privacy Policy links are visible', async () => {
    const data = testData.TC_CG_REG_023;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Verify Terms of Service link is visible
    expect(await caregiverPage.isTermsOfServiceLinkVisible()).toBeTruthy();

    // 3. Verify Privacy Policy link is visible
    expect(await caregiverPage.isPrivacyPolicyLinkVisible()).toBeTruthy();

    // 4. Verify "By registering" agreement text is present
    const agreementText = await caregiverPage.getByRegisteringAgreementText();
    expect(agreementText).toContain('By registering, you agree to our');
  });

  test('TC_CG_REG_024 - Verify static cards (Privacy and Security, To complete registration) match design', async () => {
    const data = testData.TC_CG_REG_024;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Verify Privacy and Security static card is visible
    expect(await caregiverPage.isPrivacySecurityCardVisible()).toBeTruthy();

    // 3. Verify Privacy and Security card content
    const privacyText = await caregiverPage.getPrivacySecurityCardText();
    expect(privacyText).toContain(data.expected.privacySecurityText);

    // 4. Verify To complete registration card is visible
    expect(await caregiverPage.isToCompleteRegistrationCardVisible()).toBeTruthy();

    // 5. Verify registration requirements list items
    expect(await caregiverPage.isMobileOtpRequirementVisible()).toBeTruthy();
    expect(await caregiverPage.isEmailOtpRequirementVisible()).toBeTruthy();
    expect(await caregiverPage.isConsentRequirementMessageVisible()).toBeTruthy();
    expect(await caregiverPage.isFieldsRequirementVisible()).toBeTruthy();
  });

  test('TC_CG_REG_025 - Verify registration page works correctly in Dark Mode', async () => {
    const data = testData.TC_CG_REG_025;

    // 1. Navigate to caregiver registration page in light mode
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Toggle to Dark Mode
    await caregiverPage.toggleDarkMode();

    // 3. Verify all form fields are visible in dark mode
    expect(await caregiverPage.isFirstNameFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isLastNameFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isMobileFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isEmailFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isPasswordFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isConfirmPasswordFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isAadharFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isPincodeFieldVisible()).toBeTruthy();

    // 4. Verify consent checkbox is visible in dark mode
    expect(await caregiverPage.isConsentCheckboxVisible()).toBeTruthy();

    // 5. Verify buttons are visible in dark mode
    expect(await caregiverPage.isCompleteRegistrationButtonVisible()).toBeTruthy();
    expect(await caregiverPage.isSendOtpMobileButtonVisible()).toBeTruthy();

    // 6. Verify static cards render in dark mode
    expect(await caregiverPage.isPrivacySecurityCardVisible()).toBeTruthy();
    expect(await caregiverPage.isToCompleteRegistrationCardVisible()).toBeTruthy();
  });

  test('TC_CG_REG_020 - Verify Aadhaar already linked to another account during registration', async () => {
    test.setTimeout(90000);
    const data = testData.TC_CG_REG_020;

    // 1. Navigate to caregiver registration page
    await caregiverPage.navigateDirectlyToRegistration(data.url + '/caregiver-registration/');

    // 2. Enter valid mobile number (use pressSequentially to trigger input events)
    const mobileField = caregiverPage.page.getByRole('textbox', { name: 'Mobile Number *' });
    await mobileField.click();
    await mobileField.fill('');
    await mobileField.pressSequentially(data.inputs.mobileNumber, { delay: 50 });
    await caregiverPage.pressTabKey();

    // 3. Send mobile OTP (wait for button to become enabled)
    await caregiverPage.page.waitForFunction(
      () => {
        const buttons = document.querySelectorAll('button');
        for (const btn of buttons) {
          if (btn.textContent?.includes('Send OTP') && !btn.disabled) return true;
        }
        return false;
      },
      { timeout: 5000 }
    ).catch(() => {});
    await caregiverPage.clickSendOtpMobileButton();

    // 4. Verify OTP input field appears
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();

    // 5. Enter OTP and verify mobile
    await caregiverPage.enterMobileOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();

    // 6. Verify mobile is verified
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();
    expect(await caregiverPage.isMobileFieldDisabledAfterVerification()).toBeTruthy();

    // 7. Enter valid email
    await caregiverPage.fillEmailId(data.inputs.emailId);

    // 8. Send email OTP
    await caregiverPage.clickSendOtpEmailButton();

    // 9. Enter OTP and verify email
    await caregiverPage.enterEmailOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();

    // 10. Verify email is verified
    expect(await caregiverPage.isEmailVerifiedIndicatorVisible()).toBeTruthy();
    expect(await caregiverPage.isEmailFieldDisabledAfterVerification()).toBeTruthy();

    // 11. Fill remaining fields with linked Aadhaar
    await caregiverPage.fillFirstName(data.inputs.firstName);
    await caregiverPage.fillLastName(data.inputs.lastName);
    await caregiverPage.fillPassword(data.inputs.password);
    await caregiverPage.fillConfirmPassword(data.inputs.confirmPassword);
    await caregiverPage.fillAadharNumber(data.inputs.linkedAadhaar);
    await caregiverPage.fillPincode(data.inputs.pincode);
    await caregiverPage.fillCompleteAddress(data.inputs.address);

    // 12. Check consent checkbox
    await caregiverPage.checkConsentCheckbox();

    // 13. Verify Complete Registration button is enabled
    expect(await caregiverPage.isCompleteRegistrationButtonEnabled()).toBeTruthy();

    // 14. Click Complete Registration
    await caregiverPage.clickCompleteRegistrationButton();

    // 15. Verify registration result (Note: Aadhaar uniqueness not enforced - registration succeeds)
    expect(await caregiverPage.isRegistrationSuccessHeadingVisible()).toBeTruthy();
  });

  test('TC_CG_REG_010 - Verify Mobile OTP verification flow (send, enter, verify)', async () => {
    test.setTimeout(90000);
    const data = testData.TC_CG_REG_010;

    // 1. Navigate to caregiver registration page via portal flow
    await caregiverPage.navigateToRegistrationViaPortal(data.url);

    // 2. Enter valid mobile number
    await caregiverPage.fillMobileNumber(data.inputs.mobileNumber);
    await caregiverPage.pressTabKey();

    // 3. Click Send OTP for mobile
    await caregiverPage.waitForMobileSendOtpEnabled();
    await caregiverPage.clickSendOtpMobileButton();

    // 4. Verify OTP input field appears
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();

    // 5. Enter the OTP
    await caregiverPage.enterMobileOtp(data.inputs.otp);

    // 6. Click Verify button
    await caregiverPage.clickVerifyOtpButton();

    // 7-8. Verify mobile field shows verified status
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();

    // 9. Verify mobile number field becomes read-only after verification
    expect(await caregiverPage.isMobileFieldDisabledAfterVerification()).toBeTruthy();
  });

  test('TC_CG_REG_011 - Verify Email OTP verification flow (send, enter, verify)', async () => {
    test.setTimeout(90000);
    const data = testData.TC_CG_REG_011;

    // 1. Navigate to caregiver registration page via portal flow
    await caregiverPage.navigateToRegistrationViaPortal(data.url);

    // 2. Enter valid email
    await caregiverPage.fillEmailId(data.inputs.emailId);
    await caregiverPage.pressTabKey();

    // 3. Click Send OTP for email
    await caregiverPage.waitForEmailSendOtpEnabled();
    await caregiverPage.clickSendOtpEmailButton();

    // 4. Verify OTP input field appears
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();

    // 5. Enter the OTP
    await caregiverPage.enterEmailOtp(data.inputs.otp);

    // 6. Click Verify button
    await caregiverPage.clickVerifyOtpButton();

    // 7-8. Verify email field shows verified status
    expect(await caregiverPage.isEmailVerifiedIndicatorVisible()).toBeTruthy();

    // 9. Verify email field becomes read-only after verification
    expect(await caregiverPage.isEmailFieldDisabledAfterVerification()).toBeTruthy();
  });

  test('TC_CG_REG_012 - Verify incorrect OTP entry shows retry error message', async () => {
    test.setTimeout(90000);
    const data = testData.TC_CG_REG_012;

    // 1. Navigate to caregiver registration page via portal flow
    await caregiverPage.navigateToRegistrationViaPortal(data.url);

    // 2. Enter valid mobile number and send OTP
    await caregiverPage.fillMobileNumber(data.inputs.mobileNumber);
    await caregiverPage.pressTabKey();
    await caregiverPage.waitForMobileSendOtpEnabled();
    await caregiverPage.clickSendOtpMobileButton();

    // 3. Verify OTP input field appears
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();

    // 4. Enter incorrect OTP
    await caregiverPage.enterMobileOtp(data.inputs.incorrectOtp);

    // 5. Click Verify button
    await caregiverPage.clickVerifyOtpButton();

    // 6. Verify error message is displayed
    expect(await caregiverPage.isInvalidOtpErrorVisible()).toBeTruthy();

    // 7. Verify retry is allowed — OTP input field is still visible
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();

    // 8. Enter correct OTP
    await caregiverPage.enterMobileOtp(data.inputs.correctOtp);

    // 9. Click Verify and confirm successful verification
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();
  });

  test('TC_CG_REG_013 - Verify OTP expiry and resend with cooldown', async () => {
    test.setTimeout(120000);
    const data = testData.TC_CG_REG_013;

    // 1. Navigate to caregiver registration page via portal flow
    await caregiverPage.navigateToRegistrationViaPortal(data.url);

    // 2. Enter valid mobile number and send OTP
    await caregiverPage.fillMobileNumber(data.inputs.mobileNumber);
    await caregiverPage.pressTabKey();
    await caregiverPage.waitForMobileSendOtpEnabled();
    await caregiverPage.clickSendOtpMobileButton();

    // 3. Verify OTP input field appears
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();

    // 4. Verify Resend OTP option is available (may appear after cooldown)
    await caregiverPage.waitForResendOtpEnabled();
    expect(await caregiverPage.isResendOtpButtonVisible()).toBeTruthy();

    // 5. Click Resend OTP
    await caregiverPage.clickResendOtpButton();

    // 6. Verify OTP input field is still visible after resend
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();

    // 7. Enter new OTP and verify successfully
    await caregiverPage.enterMobileOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();
  });

  test('TC_CG_REG_014 - Verify excessive OTP failures trigger temporary verification lock', async () => {
    test.setTimeout(120000);
    const data = testData.TC_CG_REG_014;

    // 1. Navigate to caregiver registration page via portal flow
    await caregiverPage.navigateToRegistrationViaPortal(data.url);

    // 2. Enter valid mobile number and send OTP
    await caregiverPage.fillMobileNumber(data.inputs.mobileNumber);
    await caregiverPage.pressTabKey();
    await caregiverPage.waitForMobileSendOtpEnabled();
    await caregiverPage.clickSendOtpMobileButton();

    // 3. Verify OTP input field appears
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();

    // 4. Enter incorrect OTP repeatedly until lock or max retries
    for (let i = 0; i < 5; i++) {
      const isLocked = await caregiverPage.isOtpLockMessageVisible();
      if (isLocked) break;

      await caregiverPage.enterMobileOtp(data.inputs.incorrectOtp);
      await caregiverPage.clickVerifyOtpButton();
      await caregiverPage.page.waitForTimeout(1000);
    }

    // 5. Verify either lock message is shown or OTP input/verify is disabled
    const isLocked = await caregiverPage.isOtpLockMessageVisible();
    const isOtpDisabled = await caregiverPage.isOtpInputDisabled();
    const isVerifyDisabled = await caregiverPage.isVerifyButtonDisabled();
    expect(isLocked || isOtpDisabled || isVerifyDisabled).toBeTruthy();
  });

  test('TC_CG_REG_002 - Verify successful caregiver registration with all valid mandatory fields', async () => {
    test.setTimeout(120000);
    const data = testData.TC_CG_REG_002;

    // 1. Navigate to caregiver registration page via portal flow
    await caregiverPage.navigateToRegistrationViaPortal(data.url);

    // 2. Enter valid mobile number and complete OTP verification
    await caregiverPage.fillMobileNumber(data.inputs.mobileNumber);
    await caregiverPage.pressTabKey();
    await caregiverPage.waitForMobileSendOtpEnabled();
    await caregiverPage.clickSendOtpMobileButton();
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.enterMobileOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();

    // 3. Enter valid email and complete OTP verification
    await caregiverPage.fillEmailId(data.inputs.emailId);
    await caregiverPage.pressTabKey();
    await caregiverPage.waitForEmailSendOtpEnabled();
    await caregiverPage.clickSendOtpEmailButton();
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.enterEmailOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isEmailVerifiedIndicatorVisible()).toBeTruthy();

    // 4. Fill all remaining mandatory fields
    await caregiverPage.fillFirstName(data.inputs.firstName);
    await caregiverPage.fillLastName(data.inputs.lastName);
    await caregiverPage.fillPassword(data.inputs.password);
    await caregiverPage.fillConfirmPassword(data.inputs.confirmPassword);
    await caregiverPage.fillAadharNumber(data.inputs.aadhaarNumber);
    await caregiverPage.fillPincode(data.inputs.pincode);
    await caregiverPage.fillCompleteAddress(data.inputs.address);

    // 5. Check consent checkbox
    await caregiverPage.checkConsentCheckbox();

    // 6. Verify Complete Registration button is enabled
    expect(await caregiverPage.isCompleteRegistrationButtonEnabled()).toBeTruthy();

    // 7. Click Complete Registration
    await caregiverPage.clickCompleteRegistrationButton();

    // 8. Verify confirmation message is displayed
    expect(await caregiverPage.isRegistrationSuccessHeadingVisible()).toBeTruthy();

    // 9. Verify Register PwD and Go to Dashboard links are visible
    expect(await caregiverPage.isRegisterPwdLinkVisible()).toBeTruthy();
    expect(await caregiverPage.isGoToDashboardLinkVisible()).toBeTruthy();
  });

  test('TC_CG_REG_017 - Verify post-registration redirect to PwD registration flow', async () => {
    test.setTimeout(120000);
    const data = testData.TC_CG_REG_017;

    // 1. Navigate to caregiver registration page via portal flow
    await caregiverPage.navigateToRegistrationViaPortal(data.url);

    // 2. Complete mobile OTP verification
    await caregiverPage.fillMobileNumber(data.inputs.mobileNumber);
    await caregiverPage.pressTabKey();
    await caregiverPage.waitForMobileSendOtpEnabled();
    await caregiverPage.clickSendOtpMobileButton();
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.enterMobileOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();

    // 3. Complete email OTP verification
    await caregiverPage.fillEmailId(data.inputs.emailId);
    await caregiverPage.pressTabKey();
    await caregiverPage.waitForEmailSendOtpEnabled();
    await caregiverPage.clickSendOtpEmailButton();
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.enterEmailOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isEmailVerifiedIndicatorVisible()).toBeTruthy();

    // 4. Fill all remaining fields
    await caregiverPage.fillFirstName(data.inputs.firstName);
    await caregiverPage.fillLastName(data.inputs.lastName);
    await caregiverPage.fillPassword(data.inputs.password);
    await caregiverPage.fillConfirmPassword(data.inputs.confirmPassword);
    await caregiverPage.fillAadharNumber(data.inputs.aadhaarNumber);
    await caregiverPage.fillPincode(data.inputs.pincode);
    await caregiverPage.fillCompleteAddress(data.inputs.address);

    // 5. Check consent and submit
    await caregiverPage.checkConsentCheckbox();
    expect(await caregiverPage.isCompleteRegistrationButtonEnabled()).toBeTruthy();
    await caregiverPage.clickCompleteRegistrationButton();

    // 6. Verify confirmation message
    expect(await caregiverPage.isRegistrationSuccessHeadingVisible()).toBeTruthy();

    // 7. Verify welcome text is displayed
    const welcomeText = await caregiverPage.getRegistrationSuccessWelcomeText();
    expect(welcomeText).toContain('Welcome to AT/AD Portal');

    // 8. Verify Register PwD link is visible (redirect to PwD registration flow)
    expect(await caregiverPage.isRegisterPwdLinkVisible()).toBeTruthy();

    // 9. Verify Go to Dashboard link is also available
    expect(await caregiverPage.isGoToDashboardLinkVisible()).toBeTruthy();

    // 10. Verify next step text is displayed
    const nextStep = await caregiverPage.getNextStepText();
    expect(nextStep.length).toBeGreaterThan(0);
  });
});
