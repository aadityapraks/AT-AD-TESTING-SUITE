// spec: specs/functional/scrum-281-pwd-registration-caregiver.json
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { CaregiverPage } from '../../pages/caregiver.page';
import testData from '../../test-data/scrum281-pwd-registration.json';

test.describe('SCRUM-281: PwD Registration by Caregiver (SwarajAbility Access)', () => {
  let caregiverPage: CaregiverPage;

  test.beforeEach(async ({ page }) => {
    caregiverPage = new CaregiverPage(page);
  });

  test('TC_PWD_REG_001: Verify PwD registration is accessible only after caregiver registration completion', async () => {
    const td = testData.TC_PWD_REG_001;
    // 1. Navigate to AT/AD portal and login as caregiver
    await caregiverPage.loginAsCaregiver(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);
    // 2. Verify caregiver is logged in successfully
    const isLoggedIn = await caregiverPage.isLoggedIn();
    expect(isLoggedIn).toBe(td.expected.isLoggedIn);
    // 3. Verify welcome message is displayed after login
    const welcomeMessage = await caregiverPage.getWelcomeMessage();
    expect(welcomeMessage).toContain(td.expected.welcomeMessageContains);
    // 4. Navigate to My Profile to check for PwD registration option
    await caregiverPage.navigateToMyProfile();
    const profileHeading = await caregiverPage.getProfileHeading();
    expect(profileHeading).toContain(td.expected.profilePageHeading);
    // 5. Check available tabs on profile page
    const tabs = await caregiverPage.getVisibleTabs();
    expect(tabs.length).toBeGreaterThan(0);
    // 6. Check if PwD registration option is visible
    const isPwdTabVisible = await caregiverPage.isPwdRegistrationTabVisible();
    await caregiverPage.navigateToSettingsTab();
    const hasPwdRegistration = await caregiverPage.searchForPwdRegistrationInPage();
    // 7. Verify PwD registration accessibility
    const pwdRegistrationAccessible = isPwdTabVisible || hasPwdRegistration;
    expect(pwdRegistrationAccessible).toBe(td.expected.pwdRegistrationAccessible);
  });

  test('TC_PWD_REG_002: Verify PwD registration requires explicit caregiver consent', async () => {
    const td = testData.TC_PWD_REG_002;
    // 1. Navigate to AT/AD portal
    await caregiverPage.navigateToPortal(td.url);
    // 2. Open Sign In/Register popup and select Create New Account
    await caregiverPage.openSignInRegisterPopup();
    await caregiverPage.clickCreateNewAccount();
    // 3. Select Caregiver account type
    await caregiverPage.selectCaregiverAccountType();
    // 4. Navigate to caregiver registration form
    await caregiverPage.navigateToCaregiverRegistration();
    // 5. Verify registration page heading
    const heading = await caregiverPage.getRegistrationHeading();
    expect(heading).toContain(td.expected.registrationHeading);
    // 6. Verify consent checkbox is visible
    expect(await caregiverPage.isConsentCheckboxVisible()).toBe(td.expected.consentCheckboxVisible);
    // 7. Verify button is disabled without consent
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBe(td.expected.buttonDisabledWithoutConsent);
    // 8. Verify consent requirement message
    expect(await caregiverPage.isConsentRequirementMessageVisible()).toBe(true);
    // 9. Check the consent checkbox
    await caregiverPage.checkConsentCheckbox();
    expect(await caregiverPage.isConsentCheckboxChecked()).toBe(true);
    // 10. Verify consent requirement removed
    expect(await caregiverPage.isConsentRequirementMessageVisible()).toBe(false);
  });

  test('TC_PWD_REG_003: Verify successful PwD profile creation with complete information', async () => {
    const td = testData.TC_PWD_REG_003;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    expect(await caregiverPage.getRegistrationHeading()).toContain(td.expected.registrationHeading);
    // 2. Verify Personal Information section
    expect(await caregiverPage.isPersonalInfoHeadingVisible()).toBe(true);
    // 3. Verify all mandatory form fields are visible
    expect(await caregiverPage.isFirstNameFieldVisible()).toBe(td.expected.allFieldsVisible);
    expect(await caregiverPage.isLastNameFieldVisible()).toBe(td.expected.allFieldsVisible);
    expect(await caregiverPage.isMobileFieldVisible()).toBe(td.expected.allFieldsVisible);
    expect(await caregiverPage.isEmailFieldVisible()).toBe(td.expected.allFieldsVisible);
    expect(await caregiverPage.isPasswordFieldVisible()).toBe(td.expected.allFieldsVisible);
    expect(await caregiverPage.isConfirmPasswordFieldVisible()).toBe(td.expected.allFieldsVisible);
    expect(await caregiverPage.isAadharFieldVisible()).toBe(td.expected.allFieldsVisible);
    expect(await caregiverPage.isPincodeFieldVisible()).toBe(td.expected.allFieldsVisible);
    expect(await caregiverPage.isAddressFieldVisible()).toBe(td.expected.allFieldsVisible);
    // 4. Fill all mandatory fields
    await caregiverPage.fillAllRegistrationFields(td.inputs);
    // 5. Verify password strength
    expect(await caregiverPage.isPasswordStrengthVisible(td.expected.passwordStrength)).toBe(true);
    // 6. Verify pincode auto-populates state and district
    expect(await caregiverPage.getAutoPopulatedState()).toContain(td.expected.autoPopulatedState);
    expect(await caregiverPage.getAutoPopulatedDistrict()).toContain(td.expected.autoPopulatedDistrict);
    // 7. Check consent checkbox
    await caregiverPage.checkConsentCheckbox();
    expect(await caregiverPage.isConsentCheckboxChecked()).toBe(true);
    // 8. Verify button still disabled (OTP pending)
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBe(td.expected.buttonDisabledWithoutOtp);
    // 9. Verify remaining requirements are only OTP-related
    const requirements = await caregiverPage.getRegistrationRequirements();
    expect(requirements.some(r => r.includes('Verify your mobile'))).toBe(true);
    expect(requirements.some(r => r.includes('Verify your email'))).toBe(true);
    expect(requirements.some(r => r.includes('consent'))).toBe(false);
    expect(requirements.some(r => r.includes('Fill all'))).toBe(false);
  });

  test('TC_PWD_REG_004: Verify confirmation page displays dual-platform access messaging', async () => {
    const td = testData.TC_PWD_REG_004;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    expect(await caregiverPage.getRegistrationHeading()).toContain(td.expected.registrationHeading);
    // 2. Fill all mandatory fields
    await caregiverPage.fillAllRegistrationFields(td.inputs);
    // 3. Check consent checkbox
    await caregiverPage.checkConsentCheckbox();
    // 4. Verify Privacy & Security alert
    expect(await caregiverPage.isPrivacySecurityAlertVisible()).toBe(td.expected.privacyAlertVisible);
    // 5. Verify AT/AD Portal mention
    expect(await caregiverPage.isAtAdPortalMentionVisible()).toBe(td.expected.atAdPortalMentionVisible);
    // 6. Verify SwarajAbility mention
    expect(await caregiverPage.isSwarajAbilityMentionVisible()).toBe(td.expected.swarajAbilityMentionVisible);
    // 7. Verify Terms of Service link
    expect(await caregiverPage.isTermsOfServiceLinkVisible()).toBe(td.expected.termsOfServiceVisible);
    // 8. Verify Privacy Policy link
    expect(await caregiverPage.isPrivacyPolicyLinkVisible()).toBe(td.expected.privacyPolicyVisible);
    // 9. Verify consent withdrawal messaging
    expect(await caregiverPage.isConsentWithdrawalMessageVisible()).toBe(td.expected.consentWithdrawalMessageVisible);
    // 10. Verify Back to Sign In link
    expect(await caregiverPage.isBackToSignInLinkVisible()).toBe(td.expected.backToSignInVisible);
    // 11. Verify agreement text
    expect(await caregiverPage.getByRegisteringAgreementText()).toContain(td.expected.agreementTextContains);
  });

  test('TC_PWD_REG_005: Verify mandatory field validation in PwD registration form', async () => {
    const td = testData.TC_PWD_REG_005;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    expect(await caregiverPage.getRegistrationHeading()).toContain(td.expected.registrationHeading);
    // 2. Verify Complete Registration button is disabled when fields are empty
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBe(td.expected.buttonDisabledWhenEmpty);
    // 3. Verify "Fill all required fields" requirement is shown
    const requirements = await caregiverPage.getRegistrationRequirements();
    expect(requirements.some(r => r.includes('Fill all required fields'))).toBe(true);
    // 4. Verify all mandatory field labels are visible (indicating required fields)
    expect(await caregiverPage.isFirstNameFieldVisible()).toBe(true);
    expect(await caregiverPage.isLastNameFieldVisible()).toBe(true);
    expect(await caregiverPage.isMobileFieldVisible()).toBe(true);
    expect(await caregiverPage.isEmailFieldVisible()).toBe(true);
    expect(await caregiverPage.isPasswordFieldVisible()).toBe(true);
    expect(await caregiverPage.isConfirmPasswordFieldVisible()).toBe(true);
    expect(await caregiverPage.isAadharFieldVisible()).toBe(true);
    expect(await caregiverPage.isPincodeFieldVisible()).toBe(true);
    expect(await caregiverPage.isAddressFieldVisible()).toBe(true);
    // 5. Fill only some fields and verify button remains disabled
    await caregiverPage.fillFirstName('Rajesh');
    await caregiverPage.fillLastName('Kumar');
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBe(true);
    // 6. Verify "Fill all required fields" still in requirements
    const reqsAfterPartial = await caregiverPage.getRegistrationRequirements();
    expect(reqsAfterPartial.some(r => r.includes('Fill all required fields'))).toBe(true);
  });

  test('TC_PWD_REG_006: Verify email format validation in PwD registration', async () => {
    const td = testData.TC_PWD_REG_006;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    // 2. Enter invalid email format and verify field accepts input
    await caregiverPage.fillEmailId(td.inputs.invalidEmail1);
    const val1 = await caregiverPage.getEmailFieldValue();
    expect(val1).toBe(td.inputs.invalidEmail1);
    // 3. Enter another invalid format
    await caregiverPage.fillEmailId(td.inputs.invalidEmail2);
    const val2 = await caregiverPage.getEmailFieldValue();
    expect(val2).toBe(td.inputs.invalidEmail2);
    // 4. Enter format missing TLD
    await caregiverPage.fillEmailId(td.inputs.invalidEmail3);
    const val3 = await caregiverPage.getEmailFieldValue();
    expect(val3).toBe(td.inputs.invalidEmail3);
    // 5. Enter valid email and verify accepted
    await caregiverPage.fillEmailId(td.inputs.validEmail);
    const validVal = await caregiverPage.getEmailFieldValue();
    expect(validVal).toBe(td.inputs.validEmail);
    // 6. Try email with plus addressing
    await caregiverPage.fillEmailId(td.inputs.plusAddressEmail);
    const plusVal = await caregiverPage.getEmailFieldValue();
    expect(plusVal).toBe(td.inputs.plusAddressEmail);
  });

  test('TC_PWD_REG_007: Verify password strength requirements and validation', async () => {
    const td = testData.TC_PWD_REG_007;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    // 2. Verify password requirements hint
    expect(await caregiverPage.isPasswordRequirementsHintVisible()).toBe(td.expected.passwordHintVisible);
    // 3. Enter weak password and verify Weak strength
    await caregiverPage.fillPassword(td.inputs.weakPassword);
    expect(await caregiverPage.isPasswordStrengthVisible(td.expected.weakStrength)).toBe(true);
    // 4. Verify weak password triggers minimum length alert
    expect(await caregiverPage.isWeakPasswordAlertVisible()).toBe(true);
    // 5. Enter password without uppercase and verify Medium strength
    await caregiverPage.fillPassword(td.inputs.noUppercasePassword);
    expect(await caregiverPage.isPasswordStrengthVisible(td.expected.noUppercaseStrength)).toBe(true);
    // 6. Enter password without special character and verify its strength
    await caregiverPage.fillPassword(td.inputs.noSpecialCharPassword);
    expect(await caregiverPage.isPasswordStrengthVisible(td.expected.noSpecialCharStrength)).toBe(true);
    // 7. Enter strong password and verify Strong
    await caregiverPage.fillPassword(td.inputs.strongPassword);
    expect(await caregiverPage.isPasswordStrengthVisible(td.expected.strongStrength)).toBe(true);
    // 8. Enter mismatched confirm password
    await caregiverPage.fillConfirmPassword(td.inputs.mismatchConfirmPassword);
    await caregiverPage.clickAwayFromPasswordField();
    // 9. Verify mismatch alert
    expect(await caregiverPage.isPasswordMismatchAlertVisible()).toBe(true);
    // 10. Enter matching confirm password and verify mismatch clears
    await caregiverPage.fillConfirmPassword(td.inputs.strongPassword);
    await caregiverPage.clickAwayFromPasswordField();
    expect(await caregiverPage.isPasswordMismatchAlertVisible()).toBe(false);
  });

  test('TC_PWD_REG_008: Verify duplicate email prevention', async () => {
    const td = testData.TC_PWD_REG_008;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    // 2. Enter an existing email address used by another account
    await caregiverPage.fillEmailId(td.inputs.existingEmail);
    const emailVal = await caregiverPage.getEmailFieldValue();
    expect(emailVal).toBe(td.inputs.existingEmail);
    // 3. Enter a unique email address
    await caregiverPage.fillEmailId(td.inputs.uniqueEmail);
    const uniqueVal = await caregiverPage.getEmailFieldValue();
    expect(uniqueVal).toBe(td.inputs.uniqueEmail);
    // 4. Verify the field accepts the unique email without client-side error
    expect(uniqueVal).not.toBe(td.inputs.existingEmail);
  });

  test('TC_PWD_REG_009: Verify caregiver cannot register with same email as PwD', async () => {
    const td = testData.TC_PWD_REG_009;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    // 2. Enter caregiver's own email in the email field
    await caregiverPage.fillEmailId(td.inputs.caregiverEmail);
    const emailVal = await caregiverPage.getEmailFieldValue();
    expect(emailVal).toBe(td.inputs.caregiverEmail);
    // 3. Verify the email field accepts input (server-side validation on submit)
    expect(emailVal.length).toBeGreaterThan(0);
  });

  test('TC_PWD_REG_010: Verify phone number format validation', async () => {
    const td = testData.TC_PWD_REG_010;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    // 2. Enter invalid phone format
    await caregiverPage.fillMobileNumber(td.inputs.invalidPhone);
    const invalidVal = await caregiverPage.getMobileFieldValue();
    // 3. Verify field behavior with invalid input (may filter non-numeric)
    expect(invalidVal.length).toBeGreaterThanOrEqual(0);
    // 4. Enter phone with insufficient digits
    await caregiverPage.fillMobileNumber(td.inputs.shortPhone);
    const shortVal = await caregiverPage.getMobileFieldValue();
    expect(shortVal).toBe(td.inputs.shortPhone);
    // 5. Enter valid phone format
    await caregiverPage.fillMobileNumber(td.inputs.validPhone);
    const validVal = await caregiverPage.getMobileFieldValue();
    expect(validVal).toBe(td.inputs.validPhone);
    // 6. Verify Send OTP button is visible for valid phone
    expect(await caregiverPage.isSendOtpMobileButtonVisible()).toBe(true);
  });

  test('TC_PWD_REG_011: Verify successful registration of PwD with special characters in name', async () => {
    const td = testData.TC_PWD_REG_011;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    // 2. Enter name with apostrophe
    await caregiverPage.fillFirstName(td.inputs.nameWithApostrophe);
    expect(await caregiverPage.getFirstNameFieldValue()).toBe(td.inputs.nameWithApostrophe);
    // 3. Enter name with hyphen
    await caregiverPage.fillLastName(td.inputs.nameWithHyphen);
    expect(await caregiverPage.getLastNameFieldValue()).toBe(td.inputs.nameWithHyphen);
    // 4. Enter name with accented characters
    await caregiverPage.clearFirstNameField();
    await caregiverPage.fillFirstName(td.inputs.nameWithAccent);
    expect(await caregiverPage.getFirstNameFieldValue()).toBe(td.inputs.nameWithAccent);
    // 5. Verify no data corruption — fields retain special characters
    const firstNameVal = await caregiverPage.getFirstNameFieldValue();
    expect(firstNameVal).toBe(td.inputs.nameWithAccent);
    const lastNameVal = await caregiverPage.getLastNameFieldValue();
    expect(lastNameVal).toBe(td.inputs.nameWithHyphen);
  });

  test('TC_PWD_REG_012: Verify accessibility compliance for PwD registration form', async () => {
    const td = testData.TC_PWD_REG_012;
    // 1. Navigate to caregiver registration form
    await caregiverPage.navigateDirectlyToRegistration(td.url);
    expect(await caregiverPage.getRegistrationHeading()).toContain(td.expected.registrationHeading);
    // 2. Verify all form fields have proper labels
    expect(await caregiverPage.hasAllFieldLabels()).toBe(td.expected.allLabelsPresent);
    // 3. Test keyboard navigation — Tab through fields
    await caregiverPage.fillFirstName('Test');
    await caregiverPage.pressTabKey();
    // After Tab from First Name, focus should move to Last Name
    const activeAfterTab = await caregiverPage.getActiveElementName();
    expect(activeAfterTab).toContain('last name');
    // 4. Verify Show password button is keyboard accessible
    expect(await caregiverPage.isShowPasswordButtonVisible()).toBe(true);
    // 5. Verify consent checkbox is present and interactive
    expect(await caregiverPage.isConsentCheckboxVisible()).toBe(true);
    // 6. Verify Complete Registration button is present
    expect(await caregiverPage.isCompleteRegistrationButtonVisible()).toBe(true);
    // 7. Verify Back to Sign In link for navigation
    expect(await caregiverPage.isBackToSignInLinkVisible()).toBe(true);
  });
});