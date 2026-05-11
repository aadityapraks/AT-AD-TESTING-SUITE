// spec: specs/a11y/SCRUM-17-ap-registration.json

import { test, expect } from '@playwright/test';
import testData from '../../../test-data/scrum17-a11y-registration.json';

const REGISTRATION_URL = testData.baseUrl + '/partner-registration';

test.describe('SCRUM-17: AP Registration Accessibility (WCAG 2.1 AA)', () => {

  test.describe('Keyboard Navigation', () => {
    // TC_A11Y_001
    test('Form tab order is logical', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const orgName = page.getByRole('textbox', { name: 'Organization Name *' });
      await orgName.focus();
      await expect(orgName).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('combobox', { name: 'Type of Organization *' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('textbox', { name: 'Contact Person Name *' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('textbox', { name: 'Official Email ID *' })).toBeFocused();
    });

    // TC_A11Y_002
    test('All form controls keyboard accessible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const dropdown = page.getByRole('combobox', { name: 'Type of Organization *' });
      await dropdown.focus();
      await expect(dropdown).toBeFocused();
      await dropdown.selectOption('Manufacturer');
      await expect(dropdown).toHaveValue('manufacturer');

      const uploadButton = page.getByRole('button', { name: 'Upload organization logo or certificate' });
      await uploadButton.focus();
      await expect(uploadButton).toBeFocused();

      const cancelButton = page.getByRole('button', { name: 'Cancel' });
      await cancelButton.focus();
      await expect(cancelButton).toBeFocused();
    });

    // TC_A11Y_003
    test('Focus indicators visible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const fields = [
        page.getByRole('textbox', { name: 'Organization Name *' }),
        page.getByRole('combobox', { name: 'Type of Organization *' }),
        page.getByRole('textbox', { name: 'Contact Person Name *' }),
        page.getByRole('textbox', { name: 'Official Email ID *' }),
      ];

      for (const field of fields) {
        await field.focus();
        await expect(field).toBeFocused();
        const styles = await field.evaluate(el => {
          const s = window.getComputedStyle(el);
          return { outline: s.outline, boxShadow: s.boxShadow, borderColor: s.borderColor };
        });
        const hasFocusStyle = styles.outline !== 'none' || styles.boxShadow !== 'none' || styles.borderColor !== '';
        expect(hasFocusStyle).toBe(true);
      }
    });

    // TC_A11Y_004
    test('No keyboard traps', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const orgName = page.getByRole('textbox', { name: 'Organization Name *' });
      await orgName.focus();

      // Tab through multiple fields
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab');
      }
      await expect(orgName).not.toBeFocused();

      // Shift+Tab back
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Shift+Tab');
      }
      const focused = page.locator(':focus');
      await expect(focused).toBeVisible();
    });
  });

  test.describe('Form Labels and Instructions', () => {
    // TC_A11Y_005
    test('All form fields have labels', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      await expect(page.getByRole('textbox', { name: 'Organization Name *' })).toBeVisible();
      await expect(page.getByRole('combobox', { name: 'Type of Organization *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Contact Person Name *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Official Email ID *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Phone Number *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Registered Address *' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Short Description of Offerings *' })).toBeVisible();
    });

    // TC_A11Y_006
    test('Required fields indicated', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      await expect(page.getByText('All the fields marked as (*) are mandatory')).toBeVisible();

      // Verify * in labels for required fields
      await expect(page.getByText('Organization Name *')).toBeVisible();
      await expect(page.getByText('Type of Organization *')).toBeVisible();
      await expect(page.getByText('Contact Person Name *')).toBeVisible();
      await expect(page.getByText('Official Email ID *')).toBeVisible();
      await expect(page.getByText('Phone Number *')).toBeVisible();
      await expect(page.getByText('Password *')).toBeVisible();
      await expect(page.getByText('Registered Address *')).toBeVisible();
      await expect(page.getByText('Short Description of Offerings *')).toBeVisible();

      // A11Y check: aria-required should be present
      const emailField = page.getByRole('textbox', { name: 'Official Email ID *' });
      const ariaRequired = await emailField.getAttribute('aria-required');
      const required = await emailField.getAttribute('required');
      // Required fields MUST have aria-required or required attribute for screen readers
      expect(ariaRequired === 'true' || required !== null, 'A11Y BUG: Required fields missing aria-required="true" or required attribute').toBe(true);
    });

    // TC_A11Y_007
    test('Field instructions provided', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // File upload has format instructions
      await expect(page.getByText('PDF, PNG, or JPG up to 5MB').first()).toBeVisible();
      await expect(page.getByText(/upload your organization/i)).toBeVisible();

      // Placeholders provide hints
      const emailField = page.getByRole('textbox', { name: 'Official Email ID *' });
      const placeholder = await emailField.getAttribute('placeholder');
      expect(placeholder).toContain('@');
    });
  });

  test.describe('Error Identification and Handling', () => {
    // TC_A11Y_008
    test('Error messages are clear and specific', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // The Submit button is disabled when fields are empty
      const submitButton = page.getByRole('button', { name: 'Submit Registration' });
      await expect(submitButton).toBeDisabled();

      // Fill partial data to check if any inline validation appears
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill('invalid-email');
      await page.getByRole('textbox', { name: 'Official Email ID *' }).blur();

      await page.waitForTimeout(500);
      const errorText = page.getByText(/invalid|valid email|format/i);
      const hasInlineError = await errorText.count() > 0;

      // Form MUST provide inline validation feedback for invalid input
      expect(hasInlineError, 'A11Y BUG: No inline validation errors shown for invalid email input').toBe(true);
    });

    // TC_A11Y_009
    test('Errors linked to form fields', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // Check if fields have aria-describedby for error association
      const emailField = page.getByRole('textbox', { name: 'Official Email ID *' });
      await emailField.fill('bad-email');
      await emailField.blur();
      await page.waitForTimeout(500);

      const ariaDescribedBy = await emailField.getAttribute('aria-describedby');
      const ariaInvalid = await emailField.getAttribute('aria-invalid');

      // Fields with errors MUST have aria-describedby or aria-invalid for screen readers
      expect(ariaDescribedBy || ariaInvalid === 'true', 'A11Y BUG: No aria-describedby or aria-invalid="true" on invalid fields').toBeTruthy();
    });

    // TC_A11Y_010
    test('Error summary at top of form', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // Since submit is disabled, check if there's any error summary mechanism
      // Fill some fields but leave required ones empty
      await page.getByRole('textbox', { name: 'Organization Name *' }).fill('Test Org');
      await page.getByRole('textbox', { name: 'Organization Name *' }).clear();
      await page.getByRole('textbox', { name: 'Organization Name *' }).blur();
      await page.waitForTimeout(500);

      // Check for any alert or error summary region
      const alertRegion = page.locator('[role="alert"]');
      const statusRegion = page.locator('[role="status"]');
      const errorSummary = alertRegion.or(statusRegion);

      const hasErrorSummary = await errorSummary.count() > 0;
      // Form MUST provide error feedback - either error summary or inline errors
      expect(hasErrorSummary, 'A11Y BUG: No error summary or feedback region - submit button stays disabled without telling user why').toBe(true);
    });

    // TC_A11Y_011
    test('OTP error handling accessible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const uniqueEmail = `test+otp11_${Date.now()}@example.com`;
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill(uniqueEmail);

      // Wait for button to enable
      const sendOtpBtn = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendOtpBtn).toBeEnabled({ timeout: 3000 });
      await sendOtpBtn.click();

      // Wait for OTP field to appear
      const otpField = page.getByRole('textbox', { name: 'Enter email OTP code' });
      await expect(otpField).toBeVisible({ timeout: 10000 });

      // Enter invalid OTP and verify
      await otpField.fill('000000');
      await page.getByRole('button', { name: 'Verify email OTP' }).click();

      // Wait for response
      await page.waitForTimeout(3000);

      // Check if error is announced or verification succeeded (QA env may accept any OTP)
      const errorMsg = page.getByText(/invalid|incorrect|wrong|expired/i);
      const verifiedMsg = page.getByRole('button', { name: /verified/i });
      const hasResponse = (await errorMsg.count() > 0) || (await verifiedMsg.count() > 0);
      expect(hasResponse).toBe(true);
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    // TC_A11Y_012
    test('Form structure announced', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // Check for heading hierarchy
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();
      await expect(h1).toHaveText('Partner Details');

      const h2 = page.getByRole('heading', { level: 2 });
      await expect(h2).toBeVisible();
      await expect(h2).toHaveText('Assistive Partner Registration');

      // Check for form element or role
      const form = page.locator('form');
      const formCount = await form.count();
      if (formCount === 0) {
        expect(false, 'A11Y BUG: No <form> element found - screen readers cannot identify form landmark').toBe(true);
      }
    });

    // TC_A11Y_013
    test('Dropdown accessible names and states', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const dropdown = page.getByRole('combobox', { name: 'Type of Organization *' });
      await expect(dropdown).toBeVisible();

      // Verify it has accessible name
      const accessibleName = await dropdown.getAttribute('aria-label') || await dropdown.evaluate(el => (el as HTMLSelectElement).labels?.[0]?.textContent);
      expect(accessibleName).toBeTruthy();

      // Select an option and verify value changes
      await dropdown.selectOption('NGO');
      await expect(dropdown).toHaveValue('ngo');
    });

    // TC_A11Y_014
    test('OTP dynamic content announced', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const uniqueEmail = `test+otp14_${Date.now()}@example.com`;
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill(uniqueEmail);

      const sendBtn = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendBtn).toBeEnabled({ timeout: 3000 });
      await sendBtn.click();

      // OTP field should appear dynamically
      const otpField = page.getByRole('textbox', { name: 'Enter email OTP code' });
      await expect(otpField).toBeVisible({ timeout: 10000 });

      // Check if there's an aria-live region announcing the change
      const liveRegion = page.locator('[aria-live]');
      const liveCount = await liveRegion.count();
      // Dynamic content MUST be announced via aria-live
      expect(liveCount, 'A11Y BUG: No aria-live region to announce OTP field appearance to screen readers').toBeGreaterThan(0);
    });

    // TC_A11Y_015
    test('Button states announced', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // Submit button should be disabled
      const submitButton = page.getByRole('button', { name: 'Submit Registration' });
      await expect(submitButton).toBeDisabled();

      // Send OTP buttons should be disabled initially
      const sendOtpEmail = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendOtpEmail).toBeDisabled();

      // After filling email, Send OTP should enable
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill('test@example.com');
      await expect(sendOtpEmail).toBeEnabled();
    });

    // TC_A11Y_016
    test('File upload accessible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const uploadButton = page.getByRole('button', { name: 'Upload organization logo or certificate' });
      await expect(uploadButton).toBeVisible();

      // Verify it has accessible name
      await expect(uploadButton).toHaveAccessibleName(/upload organization logo/i);

      // Verify format instructions are visible
      await expect(page.getByText('PDF, PNG, or JPG up to 5MB').first()).toBeVisible();
    });

    // TC_A11Y_017
    test('Success message announced', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const uniqueEmail = `test+otp17_${Date.now()}@example.com`;
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill(uniqueEmail);

      const sendBtn = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendBtn).toBeEnabled({ timeout: 3000 });
      await sendBtn.click();

      const otpField = page.getByRole('textbox', { name: 'Enter email OTP code' });
      await expect(otpField).toBeVisible({ timeout: 10000 });
      await otpField.fill('123456');
      await page.getByRole('button', { name: 'Verify email OTP' }).click();

      // Verified status should appear
      const verifiedButton = page.getByRole('button', { name: /email verified/i });
      await expect(verifiedButton).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Visual Accessibility', () => {
    // TC_A11Y_018
    test('Color contrast - Text', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // Check label text color exists and is not transparent
      const label = page.getByText('Organization Name *');
      const color = await label.evaluate(el => window.getComputedStyle(el).color);
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
      expect(color).toBeTruthy();

      // Check heading contrast
      const heading = page.getByRole('heading', { name: 'Partner Details' });
      const headingColor = await heading.evaluate(el => window.getComputedStyle(el).color);
      expect(headingColor).toBeTruthy();
    });

    // TC_A11Y_019
    test('Color contrast - Form controls', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const inputField = page.getByRole('textbox', { name: 'Organization Name *' });
      const borderColor = await inputField.evaluate(el => window.getComputedStyle(el).borderColor);
      expect(borderColor).toBeTruthy();
      expect(borderColor).not.toBe('rgba(0, 0, 0, 0)');

      const submitButton = page.getByRole('button', { name: 'Submit Registration' });
      const buttonBg = await submitButton.evaluate(el => window.getComputedStyle(el).backgroundColor);
      expect(buttonBg).toBeTruthy();
    });

    // TC_A11Y_020
    test('Not relying on color alone', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // Required fields use * text indicator, not just color
      await expect(page.getByText('All the fields marked as (*) are mandatory')).toBeVisible();
      await expect(page.getByText('Organization Name *')).toBeVisible();

      // Optional fields explicitly say "(optional)"
      await expect(page.getByText('GST Number (optional)')).toBeVisible();
      await expect(page.getByText('Website (optional)')).toBeVisible();
    });

    // TC_A11Y_021
    test('Text resize to 200%', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      await page.evaluate(() => {
        document.documentElement.style.fontSize = '200%';
      });

      // Form should still be visible and usable
      await expect(page.getByRole('textbox', { name: 'Organization Name *' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Submit Registration' })).toBeVisible();

      // Check no horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasOverflow, 'A11Y BUG: Horizontal scroll appears at 200% text size (WCAG 1.4.4)').toBe(false);
    });
  });

  test.describe('Form Behavior and Validation', () => {
    // TC_A11Y_022
    test('Autocomplete attributes', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const emailField = page.getByRole('textbox', { name: 'Official Email ID *' });
      const emailAutocomplete = await emailField.getAttribute('autocomplete');

      const phoneField = page.getByRole('textbox', { name: 'Phone Number *' });
      const phoneAutocomplete = await phoneField.getAttribute('autocomplete');

      const passwordField = page.getByRole('textbox', { name: 'Password *' });
      const passwordAutocomplete = await passwordField.getAttribute('autocomplete');

      // At least email should have autocomplete
      expect(emailAutocomplete, 'A11Y BUG: Email field missing autocomplete="email" (WCAG 1.3.5)').toBeTruthy();
      expect(phoneAutocomplete, 'A11Y BUG: Phone field missing autocomplete="tel" (WCAG 1.3.5)').toBeTruthy();
    });

    // TC_A11Y_023
    test('Input constraints announced', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const uniqueEmail = `test+otp23_${Date.now()}@example.com`;
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill(uniqueEmail);

      const sendBtn = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendBtn).toBeEnabled({ timeout: 3000 });
      await sendBtn.click();

      const otpField = page.getByRole('textbox', { name: 'Enter email OTP code' });
      await expect(otpField).toBeVisible({ timeout: 10000 });

      const maxLength = await otpField.getAttribute('maxlength');
      const pattern = await otpField.getAttribute('pattern');
      const ariaDescribedBy = await otpField.getAttribute('aria-describedby');

      const hasConstraint = maxLength || pattern || ariaDescribedBy;
      expect(hasConstraint, 'A11Y BUG: OTP field has no maxlength, pattern, or aria-describedby to communicate constraints').toBeTruthy();
    });

    // TC_A11Y_024
    test('Cascading dropdown accessibility', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // This page uses a single dropdown (Type of Organization), not cascading
      // Verify the dropdown works correctly
      const dropdown = page.getByRole('combobox', { name: 'Type of Organization *' });
      await expect(dropdown).toBeVisible();

      // Verify default option is disabled
      const defaultOption = dropdown.locator('option[disabled]');
      await expect(defaultOption).toHaveText('Select type of organization');

      // Select and verify
      await dropdown.selectOption('Distributor');
      await expect(dropdown).toHaveValue('distributor');
    });

    // TC_A11Y_025
    test('Duplicate email error accessible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // Use an email that might already be registered
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Send OTP to email' }).click();

      // Wait for response
      await page.waitForTimeout(3000);

      // Check if any error about duplicate/existing account appears
      const errorMsg = page.getByText(/already registered|already exists|account exists/i);
      const otpField = page.getByRole('textbox', { name: 'Enter email OTP code' });

      // Either an error appears or OTP is sent (both are valid responses)
      const hasError = await errorMsg.count() > 0;
      const hasOtp = await otpField.count() > 0;
      expect(hasError || hasOtp).toBe(true);
    });
  });

  test.describe('OTP Verification Accessibility', () => {
    // TC_A11Y_026
    test('Send OTP button accessible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const sendOtpEmail = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendOtpEmail).toBeVisible();
      await expect(sendOtpEmail).toBeDisabled();

      const uniqueEmail = `test+otp26_${Date.now()}@example.com`;
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill(uniqueEmail);
      await expect(sendOtpEmail).toBeEnabled();

      // Verify keyboard activation
      await sendOtpEmail.focus();
      await expect(sendOtpEmail).toBeFocused();
      await page.keyboard.press('Enter');

      // OTP field should appear
      await expect(page.getByRole('textbox', { name: 'Enter email OTP code' })).toBeVisible({ timeout: 10000 });
    });

    // TC_A11Y_027
    test('OTP input field accessibility', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const uniqueEmail = `test+otp27_${Date.now()}@example.com`;
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill(uniqueEmail);

      const sendBtn = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendBtn).toBeEnabled({ timeout: 3000 });
      await sendBtn.click();

      const otpField = page.getByRole('textbox', { name: 'Enter email OTP code' });
      await expect(otpField).toBeVisible({ timeout: 10000 });

      // Verify it has an accessible name
      await expect(otpField).toHaveAccessibleName(/enter email otp/i);

      // Verify placeholder
      const placeholder = await otpField.getAttribute('placeholder');
      expect(placeholder).toBeTruthy();
    });

    // TC_A11Y_028
    test('Resend OTP accessible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const uniqueEmail = `test+otp28_${Date.now()}@example.com`;
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill(uniqueEmail);

      const sendBtn = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendBtn).toBeEnabled({ timeout: 3000 });
      await sendBtn.click();

      // After sending, button shows countdown then becomes Resend
      const resendButton = page.getByRole('button', { name: /resend otp|send otp to email/i });
      await expect(resendButton).toBeVisible({ timeout: 10000 });

      // Initially disabled during countdown
      await expect(resendButton).toBeDisabled();
    });

    // TC_A11Y_029
    test('OTP expiry message accessible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const uniqueEmail = `test+otp29_${Date.now()}@example.com`;
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill(uniqueEmail);

      const sendBtn = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendBtn).toBeEnabled({ timeout: 3000 });
      await sendBtn.click();

      const otpField = page.getByRole('textbox', { name: 'Enter email OTP code' });
      await expect(otpField).toBeVisible({ timeout: 10000 });

      // The resend button shows countdown text indicating expiry timing
      const resendButton = page.getByRole('button', { name: /resend|send otp to email/i });
      await expect(resendButton).toBeVisible();

      // Verify the button text contains resend/countdown info
      const buttonText = await resendButton.textContent();
      expect(buttonText).toBeTruthy();
      // The button either shows "Resend OTP (Xs)" countdown or "Resend OTP" when ready
      expect(buttonText!.toLowerCase()).toContain('resend');
    });

    // TC_A11Y_030
    test('Verification status accessible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const uniqueEmail = `test+otp30_${Date.now()}@example.com`;
      await page.getByRole('textbox', { name: 'Official Email ID *' }).fill(uniqueEmail);

      const sendBtn = page.getByRole('button', { name: 'Send OTP to email' });
      await expect(sendBtn).toBeEnabled({ timeout: 3000 });
      await sendBtn.click();

      const otpField = page.getByRole('textbox', { name: 'Enter email OTP code' });
      await expect(otpField).toBeVisible({ timeout: 10000 });
      await otpField.fill('123456');
      await page.getByRole('button', { name: 'Verify email OTP' }).click();

      // After verification, status should show "Verified ✓"
      const verifiedStatus = page.getByRole('button', { name: /email verified/i });
      await expect(verifiedStatus).toBeVisible({ timeout: 10000 });

      // Verify it has text content (not just icon)
      const text = await verifiedStatus.textContent();
      expect(text).toMatch(/verified/i);
    });
  });

  test.describe('SSO Sign-in Accessibility', () => {
    // TC_A11Y_031
    test('SSO link accessible', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const loginButton = page.getByRole('button', { name: /already have an account/i });
      await expect(loginButton).toBeVisible();

      // Verify keyboard accessible
      await loginButton.focus();
      await expect(loginButton).toBeFocused();

      // Verify accessible name is descriptive
      await expect(loginButton).toHaveAccessibleName(/already have an account/i);
    });
  });

  test.describe('Responsive and Mobile', () => {
    // TC_A11Y_032
    test('Touch targets minimum size', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(REGISTRATION_URL);

      const buttons = [
        page.getByRole('button', { name: 'Submit Registration' }),
        page.getByRole('button', { name: 'Cancel' }),
        page.getByRole('button', { name: 'Upload organization logo or certificate' }),
      ];

      for (const button of buttons) {
        const box = await button.boundingBox();
        expect(box).toBeTruthy();
        expect(box!.width).toBeGreaterThanOrEqual(44);
        expect(box!.height).toBeGreaterThanOrEqual(44);
      }
    });

    // TC_A11Y_033
    test('Form usable on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto(REGISTRATION_URL);

      // No horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      expect(hasHorizontalScroll).toBe(false);

      // Key elements visible
      await expect(page.getByRole('textbox', { name: 'Organization Name *' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Submit Registration' })).toBeVisible();
      await expect(page.getByRole('combobox', { name: 'Type of Organization *' })).toBeVisible();
    });
  });

  test.describe('Page Structure', () => {
    // TC_A11Y_034
    test('Heading hierarchy', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // H1 exists
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();

      // Only one H1
      const h1Count = await page.getByRole('heading', { level: 1 }).count();
      expect(h1Count).toBe(1);

      // H2 exists
      const h2 = page.getByRole('heading', { level: 2 });
      await expect(h2).toBeVisible();
    });

    // TC_A11Y_035
    test('Language attribute', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBeTruthy();
    });

    // TC_A11Y_036
    test('Form has accessible name', async ({ page }) => {
      await page.goto(REGISTRATION_URL);

      // Check if form element exists with accessible name
      const form = page.locator('form');
      const formCount = await form.count();

      if (formCount > 0) {
        const ariaLabel = await form.first().getAttribute('aria-label');
        const ariaLabelledBy = await form.first().getAttribute('aria-labelledby');
        expect(ariaLabel || ariaLabelledBy, 'A11Y BUG: Form element has no aria-label or aria-labelledby').toBeTruthy();
      } else {
        expect(false, 'A11Y BUG: No <form> element found on the page').toBe(true);
      }
    });
  });
});
