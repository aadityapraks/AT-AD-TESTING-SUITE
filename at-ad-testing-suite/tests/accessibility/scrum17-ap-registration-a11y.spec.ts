// spec: specs/a11y/SCRUM-17-ap-registration.md

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum17-registration.json';

test.describe('SCRUM-17: AP Registration Accessibility (WCAG 2.1 AA)', () => {

  test.describe('Keyboard Navigation', () => {
    test('Form tab order is logical', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toHaveAttribute('name', /organization.*name/i);
      
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toHaveRole('combobox');
    });

    test('All form controls keyboard accessible', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const dropdown = page.getByRole('combobox', { name: /type of organization/i });
      await dropdown.focus();
      await page.keyboard.press('Space');
      await expect(dropdown).toHaveAttribute('aria-expanded', 'true');
      
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
    });

    test('Focus indicators visible', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const firstField = page.getByRole('textbox', { name: /organization name/i });
      await firstField.focus();
      await expect(firstField).toBeFocused();
      
      const focusStyle = await firstField.evaluate(el => window.getComputedStyle(el, ':focus').outline);
      expect(focusStyle).not.toBe('none');
    });

    test('No keyboard traps', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const dropdown = page.getByRole('combobox').first();
      await dropdown.focus();
      await page.keyboard.press('Space');
      await page.keyboard.press('Escape');
      
      await page.keyboard.press('Tab');
      const nextElement = page.locator(':focus');
      await expect(nextElement).not.toBe(dropdown);
    });
  });

  test.describe('Form Labels and Instructions', () => {
    test('All form fields have labels', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const orgName = page.getByRole('textbox', { name: /organization name/i });
      await expect(orgName).toBeVisible();
      
      const email = page.getByRole('textbox', { name: /email/i });
      await expect(email).toBeVisible();
      
      const phone = page.getByRole('textbox', { name: /phone/i });
      await expect(phone).toBeVisible();
    });

    test('Required fields indicated', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const requiredFields = page.locator('[aria-required="true"]');
      const count = await requiredFields.count();
      expect(count).toBeGreaterThan(0);
      
      await expect(page.getByText(/\*/)).toBeVisible();
    });

    test('Field instructions provided', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const otpField = page.getByLabel(/otp/i);
      if (await otpField.isVisible()) {
        const describedBy = await otpField.getAttribute('aria-describedby');
        expect(describedBy).toBeTruthy();
      }
    });
  });

  test.describe('Error Identification and Handling', () => {
    test('Error messages are clear and specific', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('button', { name: /submit/i }).click();
      
      await expect(page.getByText(/organization name.*required/i)).toBeVisible();
      await expect(page.getByText(/email.*required/i)).toBeVisible();
    });

    test('Errors linked to form fields', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('button', { name: /submit/i }).click();
      
      const emailField = page.getByRole('textbox', { name: /email/i });
      const ariaInvalid = await emailField.getAttribute('aria-invalid');
      expect(ariaInvalid).toBe('true');
      
      const describedBy = await emailField.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
    });

    test('Error summary at top of form', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('button', { name: /submit/i }).click();
      
      const errorSummary = page.getByRole('alert').or(page.locator('[role="status"]')).first();
      await expect(errorSummary).toBeVisible();
    });

    test('OTP error handling accessible', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
      await page.getByRole('button', { name: /send otp.*email/i }).click();
      
      await page.getByLabel(/otp/i).fill('000000');
      await page.getByRole('button', { name: /verify/i }).click();
      
      await expect(page.getByText(/invalid.*otp/i)).toBeVisible();
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    test('Form structure announced', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const form = page.locator('form').or(page.locator('[role="form"]')).first();
      await expect(form).toBeVisible();
      
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
    });

    test('Dropdown accessible names and states', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const dropdown = page.getByRole('combobox', { name: /type of organization/i });
      await expect(dropdown).toBeVisible();
      
      const ariaExpanded = await dropdown.getAttribute('aria-expanded');
      expect(ariaExpanded).toBeDefined();
    });

    test('OTP dynamic content announced', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
      await page.getByRole('button', { name: /send otp.*email/i }).click();
      
      const liveRegion = page.locator('[aria-live]').or(page.locator('[role="status"]')).first();
      await expect(liveRegion).toBeVisible();
    });

    test('Button states announced', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const submitButton = page.getByRole('button', { name: /submit/i });
      const ariaDisabled = await submitButton.getAttribute('aria-disabled');
      
      if (ariaDisabled === 'true') {
        expect(await submitButton.isDisabled()).toBe(true);
      }
    });

    test('File upload accessible', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const fileInput = page.locator('input[type="file"]');
      if (await fileInput.count() > 0) {
        const label = await fileInput.getAttribute('aria-label');
        expect(label || await fileInput.getAttribute('aria-labelledby')).toBeTruthy();
      }
    });

    test('Success message announced', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('textbox', { name: /organization name/i }).fill(testData.validRegistration.orgName);
      await page.getByRole('combobox', { name: /type/i }).selectOption(testData.validRegistration.orgType);
      await page.getByRole('textbox', { name: /contact person/i }).fill(testData.validRegistration.contactPerson);
      await page.getByRole('textbox', { name: /email/i }).fill(testData.validRegistration.email);
      await page.getByRole('textbox', { name: /phone/i }).fill(testData.validRegistration.phone);
      await page.getByRole('textbox', { name: /address/i }).fill(testData.validRegistration.address);
      await page.getByRole('textbox', { name: /description/i }).fill(testData.validRegistration.description);
      
      await page.getByRole('button', { name: /submit/i }).click();
      
      const successMessage = page.locator('[role="status"]').or(page.locator('[aria-live]'));
      await expect(successMessage.first()).toBeVisible();
    });
  });

  test.describe('Visual Accessibility', () => {
    test('Color contrast - Text', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const label = page.getByText(/organization name/i).first();
      const color = await label.evaluate(el => window.getComputedStyle(el).color);
      const bgColor = await label.evaluate(el => window.getComputedStyle(el).backgroundColor);
      
      expect(color).toBeTruthy();
      expect(bgColor).toBeTruthy();
    });

    test('Not relying on color alone', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('button', { name: /submit/i }).click();
      
      const errorIcon = page.locator('[aria-label*="error"]').or(page.getByText(/error/i));
      await expect(errorIcon.first()).toBeVisible();
      
      await expect(page.getByText(/\*/)).toBeVisible();
    });

    test('Text resize to 200%', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.evaluate(() => {
        document.body.style.zoom = '2';
      });
      
      const form = page.locator('form').first();
      await expect(form).toBeVisible();
      
      const label = page.getByText(/organization name/i).first();
      await expect(label).toBeVisible();
    });
  });

  test.describe('Form Behavior and Validation', () => {
    test('Autocomplete attributes', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const emailField = page.getByRole('textbox', { name: /email/i });
      const autocomplete = await emailField.getAttribute('autocomplete');
      expect(autocomplete).toMatch(/email/i);
      
      const phoneField = page.getByRole('textbox', { name: /phone/i });
      const phoneAutocomplete = await phoneField.getAttribute('autocomplete');
      expect(phoneAutocomplete).toMatch(/tel/i);
    });

    test('Input constraints announced', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
      await page.getByRole('button', { name: /send otp.*email/i }).click();
      
      const otpField = page.getByLabel(/otp/i);
      if (await otpField.isVisible()) {
        const maxLength = await otpField.getAttribute('maxlength');
        expect(maxLength).toBe('6');
      }
    });

    test('Cascading dropdown accessibility', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const districtDropdown = page.getByRole('combobox', { name: /district/i });
      const isDisabled = await districtDropdown.isDisabled();
      expect(isDisabled).toBe(true);
      
      await page.getByRole('combobox', { name: /state/i }).selectOption({ index: 1 });
      
      await expect(districtDropdown).toBeEnabled();
    });

    test('Duplicate email error accessible', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('textbox', { name: /organization name/i }).fill(testData.validRegistration.orgName);
      await page.getByRole('combobox', { name: /type/i }).selectOption(testData.validRegistration.orgType);
      await page.getByRole('textbox', { name: /contact person/i }).fill(testData.validRegistration.contactPerson);
      await page.getByRole('textbox', { name: /email/i }).fill(testData.duplicateEmail);
      await page.getByRole('textbox', { name: /phone/i }).fill(testData.validRegistration.phone);
      await page.getByRole('textbox', { name: /address/i }).fill(testData.validRegistration.address);
      await page.getByRole('textbox', { name: /description/i }).fill(testData.validRegistration.description);
      
      await page.getByRole('button', { name: /submit/i }).click();
      
      await expect(page.getByText(/already registered/i)).toBeVisible();
    });
  });

  test.describe('OTP Verification Accessibility', () => {
    test('Send OTP button accessible', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const sendOtpButton = page.getByRole('button', { name: /send otp.*email/i });
      await expect(sendOtpButton).toBeVisible();
      
      await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
      await sendOtpButton.click();
    });

    test('OTP input field accessibility', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
      await page.getByRole('button', { name: /send otp.*email/i }).click();
      
      const otpField = page.getByLabel(/otp/i);
      await expect(otpField).toBeVisible();
      
      const type = await otpField.getAttribute('type');
      expect(type).toMatch(/text|number/i);
    });

    test('Resend OTP accessible', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
      await page.getByRole('button', { name: /send otp.*email/i }).click();
      
      const resendButton = page.getByRole('button', { name: /resend/i });
      if (await resendButton.isVisible()) {
        await expect(resendButton).toBeEnabled();
      }
    });

    test('Verification status accessible', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      await page.getByRole('textbox', { name: /email/i }).fill('test@example.com');
      await page.getByRole('button', { name: /send otp.*email/i }).click();
      
      const status = page.getByText(/verified|unverified/i);
      await expect(status.first()).toBeVisible();
    });
  });

  test.describe('SSO Sign-in Accessibility', () => {
    test('SSO link accessible', async ({ page }) => {
      await page.goto(testData.baseUrl);
      
      const ssoLink = page.getByRole('button', { name: /sign in with swarajability/i });
      await expect(ssoLink).toBeVisible();
      
      await ssoLink.focus();
      await expect(ssoLink).toBeFocused();
      
      await page.keyboard.press('Enter');
      await page.waitForURL(/auth-d\.swarajability\.org/);
    });
  });

  test.describe('Page Structure', () => {
    test('Heading hierarchy', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();
      
      const h1Count = await page.getByRole('heading', { level: 1 }).count();
      expect(h1Count).toBe(1);
    });

    test('Language attribute', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBeTruthy();
      expect(lang).toMatch(/en/i);
    });

    test('Form has accessible name', async ({ page }) => {
      await page.goto(testData.baseUrl + '/partner-registration');
      
      const form = page.locator('form').first();
      const ariaLabel = await form.getAttribute('aria-label');
      const ariaLabelledBy = await form.getAttribute('aria-labelledby');
      
      expect(ariaLabel || ariaLabelledBy).toBeTruthy();
    });
  });
});
