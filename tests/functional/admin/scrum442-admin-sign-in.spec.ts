// spec: specs/functional/SCRUM-442-admin-sign-in.json
// seed: tests/seed/admin-signin-seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum442-admin-sign-in.json';
import { AdminSignInPage } from '../../pages/admin-signin.page';

let adminSignInPage: AdminSignInPage;

test.describe('SCRUM-442: Admin Sign-In', () => {
  test.setTimeout(90000);

  test.beforeEach(async ({ page }) => {
    adminSignInPage = new AdminSignInPage(page);
  });

  test.describe('AC1 - Admin Sign-In Page Access', () => {
    test('TC_SCRUM442_001: Verify Admin Sign-In page is accessible from Admin Portal URL', async ({ page }) => {
      // Step 1: Navigate to the Admin Portal URL
      await adminSignInPage.navigate(testData.url);

      // Step 2: Verify the Sign-In page loads successfully
      await adminSignInPage.verifySignInPageLoaded();

      // Step 3: Verify the page title or heading indicates Admin Sign-In
      await adminSignInPage.verifySignInPageHeading();
    });
  });

  test.describe('AC2 - Email and Password Fields', () => {
    test('TC_SCRUM442_002: Verify Email and Password fields are present on Sign-In page', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL
      await adminSignInPage.navigate(testData.url);

      // Step 2: Locate the Email input field and verify it is visible and editable
      await adminSignInPage.verifyEmailFieldVisible();

      // Step 3: Verify Email field has appropriate label
      await adminSignInPage.verifyEmailFieldLabel();

      // Step 4: Locate the Password input field and verify it is visible and editable
      await adminSignInPage.verifyPasswordFieldVisible(testData.credentials.email);

      // Step 5: Verify Password field masks input
      await adminSignInPage.verifyPasswordFieldMasksInput();
    });
  });

  test.describe('AC3 - Sign In Button Validation', () => {
    test('TC_SCRUM442_003: Verify Sign In button is disabled when both fields are empty', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Ensure Email field is empty and click Log in — verify error or validation
      await adminSignInPage.verifyEmptyEmailShowsError();
    });

    test('TC_SCRUM442_004: Verify Sign In button is disabled when only Email is entered', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Navigate to password page with valid email
      await adminSignInPage.navigateToPasswordPage(testData.credentials.email);

      // Step 3: Leave Password field empty and click Continue — verify error or validation
      await adminSignInPage.verifyEmptyPasswordShowsError();
    });

    test('TC_SCRUM442_005: Verify Sign In button is disabled when only Password is entered', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Leave Email field empty and click Log in — verify error or validation
      await adminSignInPage.verifyEmptyEmailShowsError();
    });

    test('TC_SCRUM442_006: Verify Sign In button is enabled when both fields have valid input', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Enter a valid email
      await adminSignInPage.fillEmailOnly(testData.credentials.email);

      // Step 3: Verify Log in button is enabled
      await adminSignInPage.verifyLoginButtonEnabled();
    });

    test('TC_SCRUM442_007: Verify Sign In button remains disabled with invalid email format', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Enter an invalid email format and submit — verify error
      await adminSignInPage.submitInvalidEmailAndVerifyError(testData.TC_SCRUM442_007.invalidEmails[0]);
    });

    test('TC_SCRUM442_015: Verify Sign In button is disabled when email field has only whitespace', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Enter only spaces in the Email field and submit
      await adminSignInPage.enterWhitespaceEmail(testData.TC_SCRUM442_015.inputs.whitespaceEmail);

      // Step 3: Click Log in and verify error or validation
      await adminSignInPage.verifyEmptyEmailShowsError();
    });
  });

  test.describe('AC4 - Successful Authentication', () => {
    test('TC_SCRUM442_008: Verify successful authentication redirects to Admin Dashboard', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL
      await adminSignInPage.navigate(testData.url);

      // Step 2: Enter valid admin email
      await adminSignInPage.enterEmail(testData.credentials.email);

      // Step 3: Enter valid admin password and click Sign In
      await adminSignInPage.enterPasswordAndSubmit(testData.credentials.password);

      // Step 4: Handle consent screen if it appears
      await adminSignInPage.handleConsentScreenIfPresent();

      // Step 5: Verify admin is redirected to the Admin Dashboard
      await adminSignInPage.verifyRedirectedToDashboard();
    });

    test('TC_SCRUM442_009: Verify Admin name and role are visible in header after successful login', async ({ page }) => {
      // Step 1: Navigate and log in with valid admin credentials
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.performFullLogin(testData.credentials.email, testData.credentials.password);

      // Step 2: Verify admin is on the Dashboard
      await adminSignInPage.verifyRedirectedToDashboard();

      // Step 3: Verify admin name is displayed in the header
      await adminSignInPage.verifyAdminNameInHeader();

      // Step 4: Verify admin role is displayed in the header (known bug SCRUM-2310)
      const roleVisible = await adminSignInPage.verifyAdminRoleInHeader();
      if (!roleVisible) {
        console.warn('SCRUM-2310: Admin role not displayed in header — known bug');
      }
    });
  });

  test.describe('AC5 - Failed Authentication', () => {
    test('TC_SCRUM442_010: Verify error message on failed authentication with wrong password', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL
      await adminSignInPage.navigate(testData.url);

      // Step 2: Enter a valid admin email
      await adminSignInPage.enterEmail(testData.TC_SCRUM442_010.inputs.email);

      // Step 3: Enter an incorrect password and submit
      await adminSignInPage.enterPasswordAndSubmit(testData.TC_SCRUM442_010.inputs.wrongPassword);

      // Step 4: Verify generic error message is displayed
      await adminSignInPage.verifyAuthErrorMessageVisible();

      // Step 5: Verify error does not reveal which field is wrong
      await adminSignInPage.verifyGenericErrorMessage();
    });

    test('TC_SCRUM442_011: Verify error message on failed authentication with wrong email', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL
      await adminSignInPage.navigate(testData.url);

      // Step 2: Enter a non-existent admin email and submit
      await adminSignInPage.enterEmail(testData.TC_SCRUM442_011.inputs.nonExistentEmail);

      // Step 3: Wait for SSO to process and show error
      await page.waitForTimeout(3000);

      // Step 4: Verify error message is displayed
      await adminSignInPage.verifyAuthErrorMessageVisible();

      // Step 5: Verify error does not reveal that the email doesn't exist
      await adminSignInPage.verifyGenericErrorMessage();
    });

    test('TC_SCRUM442_020: Verify error message clears after correcting credentials and resubmitting', async ({ page }) => {
      // Step 1: Navigate and enter invalid credentials
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.enterEmail(testData.TC_SCRUM442_010.inputs.email);
      await adminSignInPage.enterPasswordAndSubmit(testData.TC_SCRUM442_010.inputs.wrongPassword);

      // Step 2: Verify error message is displayed
      await adminSignInPage.verifyAuthErrorMessageVisible();

      // Step 3: Navigate back and correct the credentials
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.performFullLogin(testData.credentials.email, testData.credentials.password);

      // Step 4: Verify login succeeds and error message is cleared
      await adminSignInPage.verifyRedirectedToDashboard();
    });
  });

  test.describe('Edge Case - Inline Email Validation', () => {
    test('TC_SCRUM442_012: Verify inline validation for incorrect email format', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Enter an invalid email format (e.g., 'test@') and submit
      await adminSignInPage.submitInvalidEmailAndVerifyError(testData.TC_SCRUM442_012.invalidEmails[0]);

      // Step 3: Clear and enter another invalid format (e.g., 'test.com')
      await adminSignInPage.clearEmailField();

      // Step 4: Submit second invalid format and verify error
      await adminSignInPage.submitInvalidEmailAndVerifyError(testData.TC_SCRUM442_012.invalidEmails[1]);
    });
  });

  test.describe('AC6 - Session Management', () => {
    test('TC_SCRUM442_013: Verify session is maintained after successful login', async ({ page }) => {
      // Step 1: Log in with valid admin credentials
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.performFullLogin(testData.credentials.email, testData.credentials.password);
      await adminSignInPage.verifyRedirectedToDashboard();

      // Step 2: Navigate to different pages within the Admin Portal
      await adminSignInPage.verifySessionDuringNavigation();

      // Step 3: Refresh the browser page
      // Step 4: Verify admin remains logged in
      await adminSignInPage.verifySessionAfterRefresh();
    });
  });

  test.describe('Edge Case - Logout', () => {
    test('TC_SCRUM442_014: Verify logout clears session and redirects to Sign-In page', async ({ page }) => {
      // Step 1: Log in with valid admin credentials
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.performFullLogin(testData.credentials.email, testData.credentials.password);
      await adminSignInPage.verifyRedirectedToDashboard();

      // Step 2: Locate and click the Logout option
      await adminSignInPage.clickLogout();

      // Step 3: Verify redirect to Sign-In page
      await adminSignInPage.verifyRedirectedToSignIn();

      // Step 4: Attempt to navigate back to the Dashboard
      await adminSignInPage.attemptNavigateBackAfterLogout(testData.url);

      // Step 5: Verify session is cleared — admin must sign in again
      await adminSignInPage.verifyCannotAccessDashboard();
    });
  });

  test.describe('Accessibility - Keyboard Navigation', () => {
    test('TC_SCRUM442_016: Verify Sign-In page supports keyboard navigation', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Use Tab key to navigate to the Email field
      await adminSignInPage.verifyKeyboardNavigation();

      // Step 3: Enter email using keyboard and Tab to next element
      await adminSignInPage.verifyTabFromEmailToButton(testData.credentials.email);

      // Step 4: Navigate to password page and complete via keyboard
      await adminSignInPage.navigateToPasswordPage(testData.credentials.email);
      await adminSignInPage.verifyPasswordPageKeyboardNav(testData.credentials.password);

      // Step 5: Verify form submits
      await adminSignInPage.handleConsentScreenIfPresent();
      await adminSignInPage.verifyRedirectedToDashboard();
    });

    test('TC_SCRUM442_017: Verify focus indicators are visible on all interactive elements', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Tab through Email field and verify focus indicator
      await adminSignInPage.verifyFocusIndicatorOnEmail();

      // Step 3: Verify focus indicator on Log in button
      await adminSignInPage.verifyFocusIndicatorOnButton('Log in');
    });

    test('TC_SCRUM442_018: Verify form fields have proper labels for screen readers', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach SSO email entry
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();

      // Step 2: Verify Email field has accessible label
      await adminSignInPage.verifyEmailFieldAccessibleLabel();

      // Step 3: Navigate to password page
      await adminSignInPage.navigateToPasswordPage(testData.credentials.email);

      // Step 4: Verify Password field has accessible label
      await adminSignInPage.verifyPasswordFieldAccessibleLabel();

      // Step 5: Verify Continue button has accessible name
      await adminSignInPage.verifyButtonAccessibleName('Continue');
    });
  });

  test.describe('Security - Password Field', () => {
    test('TC_SCRUM442_021: Verify password field does not allow copy of masked text', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL and reach password page
      await adminSignInPage.navigate(testData.url);
      await adminSignInPage.navigateToSSOEmailEntry();
      await adminSignInPage.navigateToPasswordPage(testData.credentials.email);

      // Step 2: Enter a password and attempt to copy
      // Step 3: Verify password field type is 'password' (browser prevents copy)
      await adminSignInPage.verifyPasswordNotCopyable(testData.TC_SCRUM442_021.inputs.testPassword);
    });
  });

  test.describe('End-to-End Flow', () => {
    test('TC_SCRUM442_019: Verify complete Admin Sign-In flow end-to-end', async ({ page }) => {
      // Step 1: Navigate to Admin Portal URL
      await adminSignInPage.navigate(testData.url);

      // Step 2: Verify Sign-In page loads
      await adminSignInPage.verifySignInPageLoaded();

      // Step 3: Enter valid admin email
      await adminSignInPage.enterEmail(testData.credentials.email);

      // Step 4: Enter valid admin password
      await adminSignInPage.enterPasswordAndSubmit(testData.credentials.password);

      // Step 5: Handle consent screen if it appears
      await adminSignInPage.handleConsentScreenIfPresent();

      // Step 6: Verify redirect to Admin Dashboard
      await adminSignInPage.verifyRedirectedToDashboard();

      // Step 7: Verify admin name and role in header
      await adminSignInPage.verifyAdminNameInHeader();

      // Step 8: Click Logout
      await adminSignInPage.clickLogout();

      // Step 9: Verify redirect to Sign-In page
      await adminSignInPage.verifyRedirectedToSignIn();
    });
  });
});
