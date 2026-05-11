// spec: specs/functional/SCRUM-360-caregiver-signin-email.json
// test-data: test-data/scrum360-caregiver-signin.json

import { test, expect } from '@playwright/test';
import { CaregiverPage } from '../../pages/caregiver.page';
import testData from '../../test-data/scrum360-caregiver-signin.json';

test.describe('Caregiver Sign-In Using Email', () => {
  let caregiverPage: CaregiverPage;

  test.beforeEach(async ({ page }) => {
    caregiverPage = new CaregiverPage(page);
  });

  test('TC_CG_SIGN_001 - Verify sign-in form displays email, password, and sign-in button', async () => {
    const data = testData.TC_CG_SIGN_001;

    // 1. Navigate to caregiver sign-in page
    await caregiverPage.navigateToCaregiverPortal(data.url);

    // 2. Verify Caregiver Portal heading is displayed
    expect(await caregiverPage.isCaregiverPortalHeadingVisible()).toBeTruthy();

    // 3. Verify 'Welcome Back' heading is displayed
    expect(await caregiverPage.isWelcomeBackHeadingVisible()).toBeTruthy();

    // 4. Verify sign-in description text is displayed
    expect(await caregiverPage.isSignInDescriptionVisible()).toBeTruthy();

    // 5. Verify 'Sign In with SwarajAbility' button is displayed
    expect(await caregiverPage.isSignInButtonVisible()).toBeTruthy();

    // 6. Verify 'New to AT/AD Portal?' text and 'Create New Account' link are available
    expect(await caregiverPage.isNewToPortalTextVisible()).toBeTruthy();
    expect(await caregiverPage.isCreateNewAccountLinkVisible()).toBeTruthy();

    // 7. Click Sign In with SwarajAbility and navigate to SSO login page
    await caregiverPage.navigateToSSOLoginPage();

    // 8. Verify Email Address field is displayed with label
    expect(await caregiverPage.isSSOEmailFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isSSOEmailLabelVisible()).toBeTruthy();

    // 9. Verify 'Log in' button is displayed
    expect(await caregiverPage.isSSOLogInButtonVisible()).toBeTruthy();

    // 10. Verify 'Forgot username or password?' link is displayed
    expect(await caregiverPage.isForgotUsernameOrPasswordLinkVisible()).toBeTruthy();

    // 11. Enter email and proceed to password step
    await caregiverPage.enterSSOEmailAndProceed(data.inputs.email);

    // 12. Verify Password field is displayed with masked input
    expect(await caregiverPage.isSSOPasswordFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isSSOPasswordFieldMasked()).toBeTruthy();

    // 13. Verify 'Continue' button is displayed
    expect(await caregiverPage.isSSOContinueButtonVisible()).toBeTruthy();

    // 14. Verify 'Forgot password?' link is displayed
    expect(await caregiverPage.isForgotPasswordLinkVisible()).toBeTruthy();
  });

  test('TC_CG_SIGN_002 - Verify successful login with valid email and password redirects to Caregiver Dashboard', async () => {
    test.setTimeout(90000);
    const data = testData.TC_CG_SIGN_002;

    // 1. Navigate to caregiver sign-in page and login with valid credentials
    await caregiverPage.loginAndVerifySession(data.url, data.inputs.email, data.inputs.password);

    // 2. Verify user is redirected to Caregiver Portal
    expect(await caregiverPage.getCurrentUrl()).toContain(data.expected.caregiverPortalUrlPattern);

    // 3. Verify caregiver is logged in (My Profile and Logout visible)
    expect(await caregiverPage.isMyProfileLinkVisible()).toBeTruthy();
    expect(await caregiverPage.isLoggedInOnCaregiverPortal()).toBeTruthy();

    // 4. Navigate to catalog page to verify session is maintained
    await caregiverPage.navigateToCatalog();
    expect(await caregiverPage.isCatalogPageLoaded()).toBeTruthy();

    // 5. Verify session is maintained on catalog page
    expect(await caregiverPage.isMyProfileLinkVisible()).toBeTruthy();
    expect(await caregiverPage.isLoggedInOnCaregiverPortal()).toBeTruthy();
  });

  test('TC_CG_SIGN_003 - Verify password field masks input and enforces security rules', async () => {
    const data = testData.TC_CG_SIGN_003;

    // 1. Navigate to caregiver sign-in page and proceed to SSO login
    await caregiverPage.navigateToCaregiverPortal(data.url);
    await caregiverPage.navigateToSSOLoginPage();

    // 2. Enter email and proceed to password step
    await caregiverPage.enterSSOEmailAndProceed(data.inputs.email);

    // 3. Verify Password field is displayed with label
    expect(await caregiverPage.isSSOPasswordFieldVisible()).toBeTruthy();
    expect(await caregiverPage.isSSOPasswordLabelVisible()).toBeTruthy();

    // 4. Type a password and verify characters are masked (input type is 'password')
    await caregiverPage.enterSSOPasswordValue(data.inputs.password);
    expect(await caregiverPage.isSSOPasswordFieldMasked()).toBeTruthy();

    // 5. Verify the password value is accepted in the field
    expect(await caregiverPage.getSSOPasswordFieldValue()).toBe(data.inputs.password);

    // 6. Leave password field empty and attempt sign in
    await caregiverPage.clearSSOPasswordField();
    await caregiverPage.clickSSOContinueButton();

    // 7. Verify sign-in is blocked — user remains on password page
    expect(await caregiverPage.isSSOPasswordPageStillDisplayed()).toBeTruthy();

    // 8. Enter valid password and verify it is accepted
    await caregiverPage.enterSSOPasswordValue(data.inputs.password);
    expect(await caregiverPage.getSSOPasswordFieldValue()).toBe(data.inputs.password);
  });

  test('TC_CG_SIGN_004 - Verify sign-in blocked with empty email and password fields', async () => {
    const data = testData.TC_CG_SIGN_004;

    // 1. Navigate to caregiver sign-in page and proceed to SSO login
    await caregiverPage.navigateToCaregiverPortal(data.url);
    await caregiverPage.navigateToSSOLoginPage();

    // 2. Leave Email field empty and click Log in
    await caregiverPage.clickSSOLogIn();

    // 3. Verify sign-in is blocked — user remains on email page
    expect(await caregiverPage.isSSOEmailFieldVisible()).toBeTruthy();

    // 4. Enter email and proceed to password step
    await caregiverPage.enterSSOEmailAndProceed(data.inputs.email);

    // 5. Leave password field empty and click Continue
    await caregiverPage.clickSSOContinueButton();

    // 6. Verify sign-in is blocked — user remains on password page
    expect(await caregiverPage.isSSOPasswordPageStillDisplayed()).toBeTruthy();
  });

  test('TC_CG_SIGN_005 - Verify email login is case-insensitive', async () => {
    test.setTimeout(90000);
    const data = testData.TC_CG_SIGN_005;

    // 1. Login with UPPERCASE email
    await caregiverPage.loginWithCaseVariantEmail(data.url, data.inputs.uppercaseEmail, data.inputs.password);

    // 2. Verify login succeeded with uppercase email
    expect(await caregiverPage.isMyProfileLinkVisible()).toBeTruthy();
    expect(await caregiverPage.isLoggedInOnCaregiverPortal()).toBeTruthy();

    // 3. Logout
    await caregiverPage.logoutAndWaitForHomePage();

    // 4. Verify logged out state
    expect(await caregiverPage.isSignInRegisterLinkVisible()).toBeTruthy();

    // 5. Login with mixed case email
    await caregiverPage.loginWithCaseVariantEmail(data.url, data.inputs.mixedCaseEmail, data.inputs.password);

    // 6. Verify login succeeded with mixed case email — same account accessed
    expect(await caregiverPage.isMyProfileLinkVisible()).toBeTruthy();
    expect(await caregiverPage.isLoggedInOnCaregiverPortal()).toBeTruthy();
  });

  test('TC_CG_SIGN_006 - Verify browser refresh during login does not resubmit credentials', async () => {
    const data = testData.TC_CG_SIGN_006;

    // 1. Navigate to SSO login and enter credentials without submitting
    await caregiverPage.enterSSOCredentialsWithoutSubmit(data.url, data.inputs.email, data.inputs.password);

    // 2. Verify password is filled
    expect(await caregiverPage.getSSOPasswordFieldValue()).toBe(data.inputs.password);

    // 3. Refresh the browser page without clicking Sign In
    await caregiverPage.refreshAndVerifyNoAutoSubmit();

    // 4. Verify SSO login page reloads fresh (back to email step)
    expect(await caregiverPage.isSSOLoginPageDisplayedAfterRefresh()).toBeTruthy();
  });

  test('TC_CG_SIGN_007 - Verify logged-in session is maintained across page navigation', async () => {
    test.setTimeout(90000);
    const data = testData.TC_CG_SIGN_007;

    // 1. Log in as caregiver with valid credentials
    await caregiverPage.loginAndVerifySession(data.url, data.inputs.email, data.inputs.password);

    // 2. Verify logged-in state on caregiver portal
    expect(await caregiverPage.isMyProfileLinkVisible()).toBeTruthy();
    expect(await caregiverPage.isLoggedInOnCaregiverPortal()).toBeTruthy();

    // 3. Navigate to product catalog page
    await caregiverPage.navigateToCatalog();
    expect(await caregiverPage.isCatalogPageLoaded()).toBeTruthy();

    // 4. Verify user is still logged in on catalog page
    expect(await caregiverPage.isMyProfileLinkVisible()).toBeTruthy();
    expect(await caregiverPage.isLoggedInOnCaregiverPortal()).toBeTruthy();

    // 5. Navigate to home page
    await caregiverPage.navigateToHomePage();

    // 6. Verify session is maintained on home page
    expect(await caregiverPage.isMyProfileLinkVisible()).toBeTruthy();
    expect(await caregiverPage.isLoggedInOnCaregiverPortal()).toBeTruthy();

    // 7. Navigate back to caregiver portal
    await caregiverPage.navigateToUrl(data.url);

    // 8. Verify session is maintained throughout navigation
    expect(await caregiverPage.isMyProfileLinkVisible()).toBeTruthy();
    expect(await caregiverPage.isLoggedInOnCaregiverPortal()).toBeTruthy();
  });

  test('TC_CG_SIGN_008 - Verify Forgot Password with unregistered email shows appropriate message', async () => {
    const data = testData.TC_CG_SIGN_008;

    // 1. Navigate to caregiver sign-in page and proceed to SSO login
    await caregiverPage.navigateToCaregiverPortal(data.url);
    await caregiverPage.navigateToSSOLoginPage();

    // 2. Click 'Forgot username or password?' link
    await caregiverPage.clickForgotUsernameOrPasswordLink();

    // 3. Verify password reset page is displayed
    expect(await caregiverPage.isResetPasswordHeadingVisible()).toBeTruthy();
    expect(await caregiverPage.isResetPasswordDescriptionVisible()).toBeTruthy();
    expect(await caregiverPage.isResetPasswordEmailFieldVisible()).toBeTruthy();

    // 4. Enter an unregistered email address
    await caregiverPage.enterResetPasswordEmail(data.inputs.unregisteredEmail);

    // 5. Submit the password reset request
    await caregiverPage.submitResetPasswordRequest();

    // 6. Verify generic message that does not reveal whether email is registered (security)
    expect(await caregiverPage.isResetPasswordConfirmationVisible()).toBeTruthy();

    // 7. Verify 'Send Email again' option is available
    expect(await caregiverPage.isSendEmailAgainButtonVisible()).toBeTruthy();
  });
});
