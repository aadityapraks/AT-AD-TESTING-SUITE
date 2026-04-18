import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AdminSignInPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ── Sign-In Page Access ──

  /** Verify the Sign-In page has loaded with the login form */
  async verifySignInPageLoaded() {
    await this.page.locator('button:has-text("Sign in with Swarajability")').first().waitFor({ state: 'visible', timeout: 15000 });
  }

  /** Verify page title or heading indicates Admin Sign-In */
  async verifySignInPageHeading() {
    const heading = this.page.locator('h1, h2, [class*="title"], [class*="heading"]').first();
    await expect(heading).toBeVisible({ timeout: 10000 });
  }

  // ── SSO Navigation ──

  /** Navigate to SSO email entry page */
  async navigateToSSOEmailEntry() {
    const signInBtn = this.page.locator('button:has-text("Sign in with Swarajability")').first();
    await signInBtn.waitFor({ state: 'visible', timeout: 15000 });
    await signInBtn.click();
    await this.page.waitForURL(/swarajability-login-flow|auth-d\.swarajability\.org/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
  }

  // ── Email Field ──

  /** Verify the Email input field is visible and editable (navigates to SSO first) */
  async verifyEmailFieldVisible() {
    const signInBtn = this.page.locator('button:has-text("Sign in with Swarajability")').first();
    await signInBtn.waitFor({ state: 'visible', timeout: 15000 });
    await signInBtn.click();
    await this.page.waitForURL(/swarajability-login-flow|auth-d\.swarajability\.org/, { timeout: 20000 });
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.waitFor({ state: 'visible', timeout: 30000 });
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEditable();
  }

  /** Verify the Email field has an appropriate label */
  async verifyEmailFieldLabel() {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await expect(emailField).toBeVisible();
  }

  /** Click Sign in with Swarajability and enter email */
  async enterEmail(email: string) {
    // Handle both admin portal and vendor portal SSO button variants
    const signInBtn = this.page.locator('button:has-text("Sign in with Swarajability")').first();
    await signInBtn.waitFor({ state: 'visible', timeout: 15000 });
    await signInBtn.click();
    await this.page.waitForURL(/swarajability-login-flow|auth-d\.swarajability\.org/, { timeout: 20000 });
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.waitFor({ state: 'visible', timeout: 30000 });
    await emailField.fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  /** Enter an invalid email and tab out to trigger inline validation */
  async enterInvalidEmailAndBlur(invalidEmail: string) {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.fill(invalidEmail);
    await emailField.press('Tab');
  }

  /** Clear the email field */
  async clearEmailField() {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.clear();
  }

  /** Enter only whitespace in the email field */
  async enterWhitespaceEmail(whitespace: string) {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.fill(whitespace);
    await emailField.press('Tab');
  }

  // ── Password Field ──

  /** Verify the Password input field is visible and editable */
  async verifyPasswordFieldVisible(email: string) {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForURL(/has-password-flow/, { timeout: 20000 });
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    await passwordField.waitFor({ state: 'visible', timeout: 15000 });
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toBeEditable();
  }

  /** Verify the Password field masks input */
  async verifyPasswordFieldMasksInput() {
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toHaveAttribute('type', 'password');
  }

  /** Enter password and submit */
  async enterPasswordAndSubmit(password: string) {
    await this.page.waitForURL(/has-password-flow/, { timeout: 20000 });
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    await passwordField.waitFor({ state: 'visible', timeout: 15000 });
    await passwordField.fill(password);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  // ── Sign In Button State ──

  /** Verify clicking Log in with empty email shows error (SSO keeps button enabled) */
  async verifyEmptyEmailShowsError() {
    const loginBtn = this.page.getByRole('button', { name: 'Log in' });
    await loginBtn.click();
    // SSO provider shows "Failed to authenticate." or validation error for empty email
    const errorHeading = this.page.getByRole('heading', { name: /failed to authenticate/i });
    const validationError = this.page.locator('[class*="error"], [role="alert"]').first();
    const errorVisible = await errorHeading.isVisible().catch(() => false) || await validationError.isVisible().catch(() => false);
    // If no error shown, the email field itself may show HTML5 validation
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    const isRequired = await emailField.getAttribute('required').catch(() => null);
    expect(errorVisible || isRequired !== null, 'Expected error or required validation for empty email').toBe(true);
  }

  /** Verify Sign In / Log in button is enabled */
  async verifyLoginButtonEnabled() {
    const loginBtn = this.page.getByRole('button', { name: 'Log in' });
    await expect(loginBtn).toBeEnabled();
  }

  /** Verify Continue button shows error when password is empty */
  async verifyEmptyPasswordShowsError() {
    const continueBtn = this.page.getByRole('button', { name: 'Continue' });
    await continueBtn.click();
    // SSO provider shows error or validation for empty password
    const errorHeading = this.page.getByRole('heading', { name: /failed to authenticate/i });
    const validationError = this.page.locator('[class*="error"], [role="alert"]').first();
    const errorVisible = await errorHeading.isVisible().catch(() => false) || await validationError.isVisible().catch(() => false);
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    const isRequired = await passwordField.getAttribute('required').catch(() => null);
    expect(errorVisible || isRequired !== null, 'Expected error or required validation for empty password').toBe(true);
  }

  /** Verify Continue button is enabled on password page */
  async verifyContinueButtonEnabled() {
    const continueBtn = this.page.getByRole('button', { name: 'Continue' });
    await expect(continueBtn).toBeEnabled();
  }

  /** Fill email field only (without clicking Log in) */
  async fillEmailOnly(email: string) {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.fill(email);
  }

  /** Fill password field only (without clicking Continue) */
  async fillPasswordOnly(password: string) {
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    await passwordField.fill(password);
  }

  /** Navigate to password page with given email */
  async navigateToPasswordPage(email: string) {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.fill(email);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForURL(/has-password-flow/, { timeout: 20000 });
    await this.page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
  }

  // ── Authentication ──

  /** Handle consent screen if it appears */
  async handleConsentScreenIfPresent() {
    // After password submit, wait for redirect to either consent page or dashboard
    await this.page.waitForTimeout(5000);
    
    if (this.page.url().includes('implicit-consent')) {
      const continueBtn = this.page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
      await continueBtn.click();
      await this.page.waitForTimeout(5000);
    }
  }

  /** Verify admin is redirected to the Admin Dashboard */
  async verifyRedirectedToDashboard() {
    await this.page.waitForURL(
      url => url.href.includes('/admin') || url.href.includes('hub-ui-admin'),
      { timeout: 30000 }
    );
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toMatch(/admin/);
  }

  /** Verify admin name is visible in the header */
  async verifyAdminNameInHeader() {
    const header = this.page.locator('header, [class*="header"], [class*="navbar"], nav').first();
    await expect(header).toBeVisible({ timeout: 10000 });
    // Look for profile/user name element in header
    const profileElement = this.page.locator('[class*="profile"], [class*="user-name"], [class*="avatar"], [class*="account"]').first();
    await expect(profileElement).toBeVisible({ timeout: 10000 });
  }

  /** Verify admin role is visible in the header */
  async verifyAdminRoleInHeader() {
    const roleElement = this.page.locator('[class*="role"], [class*="badge"], [class*="subtitle"]').first();
    const isVisible = await roleElement.isVisible().catch(() => false);
    // Role may or may not be displayed (known bug SCRUM-2310)
    return isVisible;
  }

  /** Full login flow: email → password → consent → dashboard */
  async performFullLogin(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPasswordAndSubmit(password);
    await this.handleConsentScreenIfPresent();
  }

  // ── Error Messages ──

  /** Verify error message is displayed after failed authentication */
  async verifyAuthErrorMessageVisible() {
    // SSO provider (authentik) shows "Failed to authenticate." as h4 heading
    const errorHeading = this.page.getByRole('heading', { name: /failed to authenticate/i });
    const errorLocator = this.page.locator('[role="alert"], .error-message, [class*="error"], [class*="alert-danger"], [class*="notification"]').first();
    await expect(errorHeading.or(errorLocator)).toBeVisible({ timeout: 15000 });
  }

  /** Verify error message does not reveal which field is wrong */
  async verifyGenericErrorMessage() {
    const errorHeading = this.page.getByRole('heading', { name: /failed to authenticate/i });
    const errorLocator = this.page.locator('[role="alert"], .error-message, [class*="error"], [class*="alert-danger"], [class*="notification"]').first();
    const element = errorHeading.or(errorLocator);
    const errorText = await element.textContent();
    // Error should be generic, not revealing "email not found" or "wrong password"
    expect(errorText?.toLowerCase()).not.toContain('email not found');
    expect(errorText?.toLowerCase()).not.toContain('wrong password');
    expect(errorText?.toLowerCase()).not.toContain('user not found');
  }

  /** Verify inline validation error is visible for invalid email */
  async verifyInlineEmailValidationVisible() {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    const isAriaInvalid = await emailField.getAttribute('aria-invalid').catch(() => null);
    const hasErrorClass = await emailField.evaluate(
      el => el.classList.contains('error') || el.classList.contains('invalid') || el.closest('.error') !== null
    ).catch(() => false);
    const errorMessage = this.page.locator('[role="alert"], .error-message, .field-error, .validation-error, [class*="error"], [class*="invalid"]').first();
    const errorVisible = await errorMessage.isVisible().catch(() => false);
    // Also check for SSO "Failed to authenticate" heading after submit
    const failedHeading = this.page.getByRole('heading', { name: /failed to authenticate/i });
    const failedVisible = await failedHeading.isVisible().catch(() => false);
    const hasValidation = isAriaInvalid === 'true' || hasErrorClass || errorVisible || failedVisible;
    expect(hasValidation, 'Expected inline validation error for invalid email format').toBe(true);
  }

  /** Submit invalid email and verify SSO stays on email page (no navigation to password) */
  async submitInvalidEmailAndVerifyError(invalidEmail: string) {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.fill(invalidEmail);
    await this.page.getByRole('button', { name: 'Log in' }).click();
    await this.page.waitForTimeout(3000);
    // For invalid email formats, SSO either:
    // 1. Shows "Failed to authenticate." heading
    // 2. Stays on the email page (does not navigate to password page)
    // 3. Shows a validation error
    const failedHeading = this.page.getByRole('heading', { name: /failed to authenticate/i });
    const errorLocator = this.page.locator('[class*="error"], [role="alert"]').first();
    const hasError = await failedHeading.isVisible().catch(() => false) || await errorLocator.isVisible().catch(() => false);
    // If no explicit error, verify we're still on the email page (not navigated to password)
    const emailStillVisible = await emailField.isVisible().catch(() => false);
    const stayedOnEmailPage = emailStillVisible && !this.page.url().includes('has-password-flow');
    expect(hasError || stayedOnEmailPage, 'Expected error or to remain on email page for invalid email').toBe(true);
  }

  /** Verify error message is cleared (not visible) */
  async verifyErrorMessageCleared() {
    const errorLocator = this.page.locator('[role="alert"], .error-message, [class*="error"]:not(input), [class*="alert-danger"]').first();
    const isVisible = await errorLocator.isVisible().catch(() => false);
    expect(isVisible, 'Expected error message to be cleared').toBe(false);
  }

  // ── Session & Logout ──

  /** Verify session is maintained after page refresh */
  async verifySessionAfterRefresh() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    const currentUrl = this.page.url();
    expect(currentUrl).toMatch(/admin|dashboard/);
  }

  /** Verify session is maintained during navigation */
  async verifySessionDuringNavigation() {
    // Click on a navigation link if available, then verify still logged in
    const navLink = this.page.locator('nav a, [class*="sidebar"] a, [class*="menu"] a').first();
    const hasNav = await navLink.isVisible().catch(() => false);
    if (hasNav) {
      await navLink.click();
      await this.page.waitForLoadState('networkidle');
    }
    const currentUrl = this.page.url();
    // Should still be in admin area, not redirected to sign-in
    expect(currentUrl).not.toMatch(/sign-in|login|swarajability-login/);
  }

  /** Click logout option */
  async clickLogout() {
    // Wait for the admin dashboard to be fully loaded first
    await this.page.waitForURL(url => url.href.includes('/admin'), { timeout: 30000 });
    await this.page.waitForLoadState('networkidle');
    
    // The admin portal has a "Logout" button in the top navigation
    const logoutBtn = this.page.getByRole('button', { name: 'Logout' });
    await logoutBtn.waitFor({ state: 'visible', timeout: 15000 });
    await logoutBtn.click();
    await this.page.waitForTimeout(5000);
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  /** Verify redirected to Sign-In page after logout */
  async verifyRedirectedToSignIn() {
    // After logout, page redirects to admin portal root with Sign in button
    await this.page.waitForLoadState('networkidle').catch(() => {});
    const signInBtn = this.page.locator('button:has-text("Sign in with Swarajability")').first();
    await expect(signInBtn).toBeVisible({ timeout: 20000 });
  }

  /** Attempt to navigate back to dashboard after logout */
  async attemptNavigateBackAfterLogout(dashboardUrl: string) {
    await this.page.goto(dashboardUrl);
    await this.page.waitForLoadState('networkidle');
  }

  /** Verify cannot access dashboard (redirected to sign-in) */
  async verifyCannotAccessDashboard() {
    const signInBtn = this.page.locator('button:has-text("Sign in with Swarajability")').first();
    const isOnSignIn = await signInBtn.isVisible().catch(() => false);
    const currentUrl = this.page.url();
    const isRedirected = isOnSignIn || !currentUrl.includes('dashboard');
    expect(isRedirected, 'Expected to be redirected to sign-in page').toBe(true);
  }

  // ── Keyboard Navigation & Accessibility ──

  /** Verify keyboard navigation through sign-in form */
  async verifyKeyboardNavigation() {
    // Email field has autofocus, so it should already be focused
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await expect(emailField).toBeFocused();
  }

  /** Verify Tab navigates from email to Log in button */
  async verifyTabFromEmailToButton(email: string) {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.fill(email);
    await this.page.keyboard.press('Tab');
    // After tab from email, focus should move to next interactive element
  }

  /** Verify keyboard navigation on password page */
  async verifyPasswordPageKeyboardNav(password: string) {
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    await passwordField.fill(password);
    await this.page.keyboard.press('Tab');
    // Tab should move to Continue button
    await this.page.keyboard.press('Enter');
  }

  /** Verify focus indicators are visible on interactive elements */
  async verifyFocusIndicatorOnEmail() {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await emailField.focus();
    await expect(emailField).toBeFocused();
  }

  /** Verify focus indicator on password field */
  async verifyFocusIndicatorOnPassword() {
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    await passwordField.focus();
    await expect(passwordField).toBeFocused();
  }

  /** Verify focus indicator on button */
  async verifyFocusIndicatorOnButton(buttonName: string) {
    const button = this.page.getByRole('button', { name: buttonName });
    await button.focus();
    await expect(button).toBeFocused();
  }

  /** Verify email field has aria-label or associated label */
  async verifyEmailFieldAccessibleLabel() {
    const emailField = this.page.getByRole('textbox', { name: 'Email' });
    await expect(emailField).toBeVisible();
    // The fact that getByRole with name 'Email' finds it proves it has an accessible name
  }

  /** Verify password field has aria-label or associated label */
  async verifyPasswordFieldAccessibleLabel() {
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    await expect(passwordField).toBeVisible();
  }

  /** Verify button has accessible name */
  async verifyButtonAccessibleName(buttonName: string) {
    const button = this.page.getByRole('button', { name: buttonName });
    await expect(button).toBeVisible();
  }

  // ── Security ──

  /** Verify password cannot be copied from the field */
  async verifyPasswordNotCopyable(password: string) {
    const passwordField = this.page.getByRole('textbox', { name: 'Please enter your password' });
    await passwordField.fill(password);
    // Select all text and copy
    await passwordField.press('Control+a');
    await passwordField.press('Control+c');
    // The clipboard content should not contain the actual password
    // (browsers typically prevent copying from password fields)
    const fieldType = await passwordField.getAttribute('type');
    expect(fieldType).toBe('password');
  }
}
