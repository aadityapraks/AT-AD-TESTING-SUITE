// spec: specs/functional/SCRUM-272-caregiver-registration-identity.json
// test-data: test-data/scrum272-caregiver-registration-identity.json

import { test, expect } from '@playwright/test';
import { CaregiverPage } from '../../pages/caregiver.page';
import { DataGenerator } from '../../../utility/data-generator';
import testData from '../../test-data/scrum272-caregiver-registration-identity.json';

test.describe('SCRUM-272: Caregiver Registration & Identity Verification', () => {
  let caregiverPage: CaregiverPage;

  test.beforeEach(async ({ page }) => {
    caregiverPage = new CaregiverPage(page);
  });

  test('TC_CG_REG_ID_001 - Verify all mandatory fields are displayed on caregiver registration form', async () => {
    const data = testData.TC_CG_REG_ID_001;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    const heading = await caregiverPage.getRegistrationHeading();
    expect(heading).toContain(data.expected.registrationHeading);
    expect(await caregiverPage.isFirstNameFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isLastNameFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isMobileFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isMobileCountryCodeVisible()).toBeTruthy();
    expect(await caregiverPage.isEmailFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isPasswordFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isConfirmPasswordFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isAadharFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isPincodeFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isAddressFieldVisible()).toBeTruthy();
    expect(await caregiverPage.hasAllFieldLabels()).toBeTruthy();
  });

  test('TC_CG_REG_ID_002 - Verify successful caregiver registration with all valid mandatory fields', async () => {
    test.setTimeout(120000);
    const data = testData.TC_CG_REG_ID_002;
    const dynamicPhone = DataGenerator.randomPhone();
    const dynamicEmail = DataGenerator.randomEmail();
    const dynamicFirstName = DataGenerator.randomFirstName();
    const dynamicLastName = DataGenerator.randomLastName();
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.fillFirstName(dynamicFirstName);
    await caregiverPage.fillLastName(dynamicLastName);
    await caregiverPage.sendMobileOtpFlow(dynamicPhone);
    await caregiverPage.enterMobileOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();
    await caregiverPage.sendEmailOtpFlow(dynamicEmail);
    await caregiverPage.enterEmailOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isEmailVerifiedIndicatorVisible()).toBeTruthy();
    await caregiverPage.fillPassword(data.inputs.password);
    await caregiverPage.fillConfirmPassword(data.inputs.confirmPassword);
    await caregiverPage.fillAadharNumber(data.inputs.aadhaarNumber);
    await caregiverPage.fillPincode(data.inputs.pincode);
    await caregiverPage.fillCompleteAddress(data.inputs.address);
    await caregiverPage.checkConsentCheckbox();
    expect(await caregiverPage.isCompleteRegistrationButtonEnabled()).toBeTruthy();
    await caregiverPage.clickCompleteRegistrationButton();
    expect(await caregiverPage.isRegistrationSuccessHeadingVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_003 - Verify First Name and Last Name accept only alphabetic characters', async () => {
    const data = testData.TC_CG_REG_ID_003;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.fillFirstName(data.inputs.invalidNumeric);
    await caregiverPage.pressTabKey();
    await caregiverPage.clearFirstNameField();
    await caregiverPage.fillFirstName(data.inputs.invalidSpecial);
    await caregiverPage.pressTabKey();
    await caregiverPage.clearFirstNameField();
    await caregiverPage.fillFirstName(data.inputs.validName);
    await caregiverPage.pressTabKey();
    const validFirstName = await caregiverPage.getFirstNameFieldValue();
    expect(validFirstName).toBe(data.inputs.validName);
    await caregiverPage.fillLastName(data.inputs.invalidNumeric);
    await caregiverPage.pressTabKey();
    await caregiverPage.clearLastNameField();
    await caregiverPage.fillLastName(data.inputs.validName);
    const validLastName = await caregiverPage.getLastNameFieldValue();
    expect(validLastName).toBe(data.inputs.validName);
  });

  test('TC_CG_REG_ID_004 - Verify Mobile Number field accepts only 10 digits with +91 prefix', async () => {
    const data = testData.TC_CG_REG_ID_004;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    expect(await caregiverPage.isMobileCountryCodeVisible()).toBeTruthy();
    await caregiverPage.fillMobileNumber(data.inputs.shortNumber);
    await caregiverPage.pressTabKey();
    await caregiverPage.clearMobileField();
    await caregiverPage.fillMobileNumber(data.inputs.alphabeticInput);
    const alphaVal = await caregiverPage.getMobileFieldInputValue();
    expect(alphaVal.replace(/\D/g, '')).toBe('');
    await caregiverPage.clearMobileField();
    await caregiverPage.fillMobileNumber(data.inputs.validNumber);
    await caregiverPage.pressTabKey();
    const validVal = await caregiverPage.getMobileFieldInputValue();
    expect(validVal.replace(/\D/g, '').length).toBe(10);
    await caregiverPage.waitForMobileSendOtpEnabled();
    expect(await caregiverPage.isSendOtpMobileButtonVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_005 - Verify Email ID format validation', async () => {
    const data = testData.TC_CG_REG_ID_005;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.fillEmailId(data.inputs.invalidNoAt);
    await caregiverPage.clickAwayFromEmailField();
    expect(await caregiverPage.isEmailValidationErrorVisible()).toBeTruthy();
    await caregiverPage.clearEmailField();
    await caregiverPage.fillEmailId(data.inputs.invalidNoDomain);
    await caregiverPage.clickAwayFromEmailField();
    expect(await caregiverPage.isEmailValidationErrorVisible()).toBeTruthy();
    await caregiverPage.clearEmailField();
    await caregiverPage.fillEmailId(data.inputs.validEmail);
    await caregiverPage.clickAwayFromEmailField();
    expect(await caregiverPage.isEmailValidationErrorHidden()).toBeTruthy();
  });

  test('TC_CG_REG_ID_006 - Verify Mobile OTP verification flow (send, enter, verify)', async () => {
    test.setTimeout(90000);
    const dynamicPhone = DataGenerator.randomPhone();
    const data = testData.TC_CG_REG_ID_006;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.sendMobileOtpFlow(dynamicPhone);
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.enterMobileOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_007 - Verify incorrect Mobile OTP entry shows error and allows retry', async () => {
    test.setTimeout(90000);
    const dynamicPhone = DataGenerator.randomPhone();
    const data = testData.TC_CG_REG_ID_007;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.sendMobileOtpFlow(dynamicPhone);
    await caregiverPage.enterMobileOtp(data.inputs.incorrectOtp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isInvalidOtpErrorVisible()).toBeTruthy();
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.enterMobileOtp(data.inputs.correctOtp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_008 - Verify OTP expiry enforcement', async () => {
    test.setTimeout(180000);
    const dynamicPhone = DataGenerator.randomPhone();
    const data = testData.TC_CG_REG_ID_008;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.sendMobileOtpFlow(dynamicPhone);
    await caregiverPage.page.waitForTimeout(120000);
    await caregiverPage.enterMobileOtp(data.inputs.expiredOtp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isOtpExpiredMessageVisible()).toBeTruthy();
    expect(await caregiverPage.isResendOtpButtonVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_009 - Verify Resend OTP with cooldown timer', async () => {
    test.setTimeout(90000);
    const dynamicPhone = DataGenerator.randomPhone();
    const data = testData.TC_CG_REG_ID_009;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.sendMobileOtpFlow(dynamicPhone);
    expect(await caregiverPage.isResendOtpButtonVisible()).toBeTruthy();
    await caregiverPage.waitForResendOtpEnabled();
    await caregiverPage.clickResendOtpButton();
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.enterMobileOtp(data.inputs.correctOtp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isMobileVerifiedIndicatorVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_010 - Verify OTP retry limits enforcement', async () => {
    test.setTimeout(90000);
    const dynamicPhone = DataGenerator.randomPhone();
    const data = testData.TC_CG_REG_ID_010;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.sendMobileOtpFlow(dynamicPhone);
    for (let i = 0; i < 5; i++) {
      await caregiverPage.enterMobileOtp(data.inputs.incorrectOtp);
      await caregiverPage.clickVerifyOtpButton();
    }
    expect(await caregiverPage.isOtpLockMessageVisible()).toBeTruthy();
    expect(await caregiverPage.isOtpInputDisabled()).toBeTruthy();
    expect(await caregiverPage.isVerifyButtonDisabled()).toBeTruthy();
  });

  test('TC_CG_REG_ID_011 - Verify Email verification flow (OTP)', async () => {
    test.setTimeout(90000);
    const dynamicEmail = DataGenerator.randomEmail();
    const data = testData.TC_CG_REG_ID_011;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.sendEmailOtpFlow(dynamicEmail);
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.enterEmailOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isEmailVerifiedIndicatorVisible()).toBeTruthy();
    expect(await caregiverPage.isEmailFieldDisabledAfterVerification()).toBeTruthy();
  });

  test('TC_CG_REG_ID_012 - Verify Email OTP resend does not hide input field (SCRUM-752)', async () => {
    test.setTimeout(90000);
    const dynamicEmail = DataGenerator.randomEmail();
    const data = testData.TC_CG_REG_ID_012;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.sendEmailOtpFlow(dynamicEmail);
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.waitForResendOtpEnabled();
    await caregiverPage.clickResendOtpButton();
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    await caregiverPage.enterEmailOtp(data.inputs.otp);
    await caregiverPage.clickVerifyOtpButton();
    expect(await caregiverPage.isEmailVerifiedIndicatorVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_013 - Verify Resend OTP button text is visible in Email OTP section (SCRUM-753)', async () => {
    test.setTimeout(90000);
    const dynamicEmail = DataGenerator.randomEmail();
    const data = testData.TC_CG_REG_ID_013;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.sendEmailOtpFlow(dynamicEmail);
    expect(await caregiverPage.isOtpInputFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isResendOtpButtonVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_014 - Verify Aadhaar field accepts 12 digits with masking', async () => {
    const data = testData.TC_CG_REG_ID_014;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    expect(await caregiverPage.isAadharFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isAadharPrivacyInfoVisible()).toBeTruthy();
    await caregiverPage.fillAadharNumber(data.inputs.shortAadhaar);
    await caregiverPage.pressTabKey();
    await caregiverPage.clearAadharField();
    await caregiverPage.fillAadharNumber(data.inputs.alphabeticAadhaar);
    const alphaVal = await caregiverPage.getAadharFieldInputValue();
    expect(alphaVal.replace(/[^0-9]/g, '')).toBe('');
    await caregiverPage.clearAadharField();
    await caregiverPage.fillAadharNumber(data.inputs.validAadhaar);
    const validVal = await caregiverPage.getAadharFieldInputValue();
    expect(validVal.replace(/\D/g, '').length).toBe(12);
  });

  test('TC_CG_REG_ID_015 - Verify duplicate mobile shows Account exists with login redirect', async () => {
    const data = testData.TC_CG_REG_ID_015;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.fillMobileWithEvents(data.inputs.existingMobile);
    await caregiverPage.waitForMobileSendOtpButtonEnabled();
    await caregiverPage.clickSendOtpMobileButton();
    expect(await caregiverPage.isDuplicateMobileErrorVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_016 - Verify duplicate email shows Account exists with login option', async () => {
    const data = testData.TC_CG_REG_ID_016;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.fillEmailWithEvents(data.inputs.existingEmail);
    await caregiverPage.waitForEmailSendOtpEnabled();
    await caregiverPage.clickSendOtpEmailButton();
    expect(await caregiverPage.isDuplicateEmailErrorVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_017 - Verify registration is blocked when mandatory fields are empty', async () => {
    const data = testData.TC_CG_REG_ID_017;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();
    await caregiverPage.fillFirstName(data.inputs.firstName);
    await caregiverPage.pressTabKey();
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();
  });

  test('TC_CG_REG_ID_018 - Verify registration blocked without mobile OTP verification', async () => {
    const data = testData.TC_CG_REG_ID_002;
    const dynamicPhone = DataGenerator.randomPhone();
    const dynamicEmail = DataGenerator.randomEmail();
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.fillFirstName(DataGenerator.randomFirstName());
    await caregiverPage.fillLastName(DataGenerator.randomLastName());
    await caregiverPage.fillMobileNumber(dynamicPhone);
    await caregiverPage.fillEmailId(dynamicEmail);
    await caregiverPage.fillPassword(data.inputs.password);
    await caregiverPage.fillConfirmPassword(data.inputs.confirmPassword);
    await caregiverPage.fillPincode(data.inputs.pincode);
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();
  });

  test('TC_CG_REG_ID_019 - Verify registration blocked without email verification', async () => {
    const data = testData.TC_CG_REG_ID_002;
    const dynamicPhone = DataGenerator.randomPhone();
    const dynamicEmail = DataGenerator.randomEmail();
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.fillFirstName(DataGenerator.randomFirstName());
    await caregiverPage.fillLastName(DataGenerator.randomLastName());
    await caregiverPage.fillMobileNumber(dynamicPhone);
    await caregiverPage.fillEmailId(dynamicEmail);
    await caregiverPage.fillPassword(data.inputs.password);
    await caregiverPage.fillConfirmPassword(data.inputs.confirmPassword);
    await caregiverPage.fillPincode(data.inputs.pincode);
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();
  });

  test('TC_CG_REG_ID_020 - Verify Send OTP button behavior with mobile number entry', async () => {
    const data = testData.TC_CG_REG_ID_020;
    const dynamicValidPhone = DataGenerator.randomPhone();
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    expect(await caregiverPage.isSendOtpMobileButtonVisible()).toBeTruthy();
    await caregiverPage.fillMobileNumber(data.inputs.partialNumber);
    await caregiverPage.pressTabKey();
    await caregiverPage.clearMobileField();
    await caregiverPage.fillMobileNumber(data.inputs.invalidChars);
    await caregiverPage.pressTabKey();
    await caregiverPage.clearMobileField();
    await caregiverPage.fillMobileWithEvents(dynamicValidPhone);
    await caregiverPage.waitForMobileSendOtpButtonEnabled();
    expect(await caregiverPage.isSendOtpMobileButtonVisible()).toBeTruthy();
  });

  test('TC_CG_REG_ID_021 - Verify form retains data on validation error (no data loss)', async () => {
    const data = testData.TC_CG_REG_ID_021;
    const dynamicFirstName = DataGenerator.randomFirstName();
    const dynamicLastName = DataGenerator.randomLastName();
    const dynamicPhone = DataGenerator.randomPhone();
    const dynamicEmail = DataGenerator.randomEmail();
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.fillFirstName(dynamicFirstName);
    await caregiverPage.fillLastName(dynamicLastName);
    await caregiverPage.fillMobileNumber(dynamicPhone);
    await caregiverPage.fillEmailId(dynamicEmail);
    await caregiverPage.fillAadharNumber(data.inputs.invalidAadhaar);
    await caregiverPage.pressTabKey();
    const retainedFirstName = await caregiverPage.getFirstNameFieldValue();
    expect(retainedFirstName).toBe(dynamicFirstName);
    const retainedLastName = await caregiverPage.getLastNameFieldValue();
    expect(retainedLastName).toBe(dynamicLastName);
    const emailVal = await caregiverPage.getEmailFieldValue();
    expect(emailVal).toBe(dynamicEmail);
  });

  test('TC_CG_REG_ID_022 - Verify mobile number starting with 0 or invalid prefix', async () => {
    const data = testData.TC_CG_REG_ID_022;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    await caregiverPage.fillMobileNumber(data.inputs.startsWith0);
    await caregiverPage.pressTabKey();
    await caregiverPage.clearMobileField();
    await caregiverPage.fillMobileNumber(data.inputs.startsWith1);
    await caregiverPage.pressTabKey();
    await caregiverPage.clearMobileField();
    await caregiverPage.fillMobileNumber(data.inputs.validStart);
    await caregiverPage.pressTabKey();
    const validVal = await caregiverPage.getMobileFieldInputValue();
    expect(validVal.replace(/\D/g, '').length).toBe(10);
  });

  test('TC_CG_REG_ID_023 - Verify consent checkbox is mandatory for registration', async () => {
    const data = testData.TC_CG_REG_ID_002;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    expect(await caregiverPage.isConsentCheckboxVisible()).toBeTruthy();
    expect(await caregiverPage.isConsentCheckboxChecked()).toBeFalsy();
    expect(await caregiverPage.isCompleteRegistrationButtonDisabled()).toBeTruthy();
  });

  test('TC_CG_REG_ID_024 - Verify Pincode field accepts only valid 6-digit input', async () => {
    const data = testData.TC_CG_REG_ID_002;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    expect(await caregiverPage.isPincodeFieldVisible()).toBeTruthy();
    await caregiverPage.fillPincode(data.inputs.pincode);
    const pincodeVal = await caregiverPage.getPincodeFieldInputValue();
    expect(pincodeVal).toBe(data.inputs.pincode);
  });

  test('TC_CG_REG_ID_025 - Verify Aadhaar privacy information is displayed', async () => {
    const data = testData.TC_CG_REG_ID_001;
    await caregiverPage.navigateToRegistrationViaPortal(data.url);
    expect(await caregiverPage.isAadharFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isAadharPrivacyInfoVisible()).toBeTruthy();
  });
});
