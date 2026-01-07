// spec: specs/functional/scrum17.md
import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum17-registration.json';

test.describe('SCRUM-17: AP Registration and Sign-in', () => {
  
  test('TC_SCRUM17_001: Verify AP Registration Link Visibility and Navigation', async ({ page }) => {
    // 1. Navigate to Y4J Hub portal
    await page.goto(testData.baseUrl);
    
    // 2. Locate "Register as Assistive Partner" button
    const registerButton = page.getByRole('button', { name: /register as assistive partner/i });
    await expect(registerButton).toBeVisible();
    
    // 3. Click on the registration button
    await registerButton.click();
    
    // Expected Result: User is redirected to AP Registration page
    await expect(page).toHaveURL(/partner-registration/);
    await expect(page.getByRole('heading', { name: /partner details/i })).toBeVisible();
  });

  test('TC_SCRUM17_002: Verify SSO Sign-in Link for Existing APs', async ({ page }) => {
    // 1. Navigate to Y4J Hub portal
    await page.goto(testData.baseUrl);
    
    // 2. Locate "Sign in with Swarajability" button
    const ssoButton = page.getByRole('button', { name: /sign in with swarajability/i });
    await expect(ssoButton).toBeVisible();
    
    // 3. Click on the SSO sign-in button
    await ssoButton.click();
    
    // 4. Wait for SSO login page and enter email
    await page.waitForURL(/auth-d\.swarajability\.org/);
    await page.getByRole('textbox', { name: /email/i }).fill(testData.ssoCredentials.email);
    await page.getByRole('button', { name: /log in/i }).click();
    
    // 5. Enter password
    await page.getByRole('textbox', { name: /password/i }).fill(testData.ssoCredentials.password);
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Expected Result: User is redirected to AP Portal dashboard via SSO
    await page.waitForURL(/partner\/product-management/);
    await expect(page).toHaveURL(/partner\/product-management/);
    await expect(page.getByRole('heading', { name: /welcome to your dashboard/i })).toBeVisible();
  });

  test('TC_SCRUM17_003: Verify Mandatory Fields Validation', async ({ page }) => {
    // Precondition: Navigate to registration page
    await page.goto(testData.baseUrl + '/partner-registration');
    
    // 1. Leave all mandatory fields empty
    // 2. Verify Submit button is disabled when fields are empty
    const submitButton = page.getByRole('button', { name: /submit registration/i });
    await expect(submitButton).toBeDisabled();
  });

  test('TC_SCRUM17_004: Verify Successful Registration Form Submission', async ({ page }) => {
    // Precondition: Navigate to registration page
    await page.goto(testData.baseUrl + '/partner-registration');
    
    // 1. Fill Organization Name
    await page.getByRole('textbox', { name: /organization name/i }).fill(testData.validRegistration.orgName);
    
    // 2. Select Type of Organization
    await page.getByRole('combobox', { name: /type of organization/i }).selectOption(testData.validRegistration.orgType);
    
    // 3. Enter Contact Person Name
    await page.getByRole('textbox', { name: /contact person/i }).fill(testData.validRegistration.contactPerson);
    
    // 4. Enter Official Email ID
    await page.getByRole('textbox', { name: /official email/i }).fill(testData.validRegistration.email);
    
    // 5. Enter Phone Number
    await page.getByRole('textbox', { name: /phone number/i }).fill(testData.validRegistration.phone);
    
    // 6. Enter Registered Address
    await page.getByRole('textbox', { name: /registered address/i }).fill(testData.validRegistration.address);
    
    // 7. Enter Short Description
    await page.getByRole('textbox', { name: /short description/i }).fill(testData.validRegistration.description);
    
    // 8. Click Submit button
    await page.getByRole('button', { name: /submit registration/i }).click();
    
    // Expected Result: Confirmation message displayed
    await expect(page.getByText(new RegExp(testData.expectedMessages.success, 'i'))).toBeVisible();
  });

  test('TC_SCRUM17_005: Verify Duplicate Email Registration Handling', async ({ page }) => {
    // Precondition: Navigate to registration page
    await page.goto(testData.baseUrl + '/partner-registration');
    
    // 1. Fill registration form with existing email
    await page.getByRole('textbox', { name: /organization name/i }).fill(testData.validRegistration.orgName);
    await page.getByRole('combobox', { name: /type of organization/i }).selectOption(testData.validRegistration.orgType);
    await page.getByRole('textbox', { name: /contact person/i }).fill(testData.validRegistration.contactPerson);
    await page.getByRole('textbox', { name: /official email/i }).fill(testData.duplicateEmail);
    await page.getByRole('textbox', { name: /phone number/i }).fill(testData.validRegistration.phone);
    await page.getByRole('textbox', { name: /registered address/i }).fill(testData.validRegistration.address);
    await page.getByRole('textbox', { name: /short description/i }).fill(testData.validRegistration.description);
    
    // 3. Click Submit button
    await page.getByRole('button', { name: /submit registration/i }).click();
    
    // Expected Result: Duplicate email error message displayed
    await expect(page.getByText(new RegExp(testData.expectedMessages.duplicateEmail, 'i'))).toBeVisible();
  });

  test('TC_SCRUM17_006: Verify Invalid Email Format Validation', async ({ page }) => {
    // Precondition: Navigate to registration page
    await page.goto(testData.baseUrl + '/partner-registration');
    
    // 1. Fill all mandatory fields
    await page.getByRole('textbox', { name: /organization name/i }).fill(testData.validRegistration.orgName);
    await page.getByRole('combobox', { name: /type of organization/i }).selectOption(testData.validRegistration.orgType);
    await page.getByRole('textbox', { name: /contact person/i }).fill(testData.validRegistration.contactPerson);
    
    // 2. Enter invalid email format
    await page.getByRole('textbox', { name: /official email/i }).fill(testData.invalidEmail);
    
    await page.getByRole('textbox', { name: /phone number/i }).fill(testData.validRegistration.phone);
    await page.getByRole('textbox', { name: /registered address/i }).fill(testData.validRegistration.address);
    await page.getByRole('textbox', { name: /short description/i }).fill(testData.validRegistration.description);
    
    // 3. Click Submit button
    await page.getByRole('button', { name: /submit registration/i }).click();
    
    // Expected Result: Invalid email error message displayed
    await expect(page.getByText(new RegExp(testData.expectedMessages.invalidEmail, 'i'))).toBeVisible();
  });

  test('TC_SCRUM17_007: Verify Admin Notification and Dashboard Update', async ({ page }) => {
    // Precondition: Submit valid registration form
    await page.goto(testData.baseUrl + '/partner-registration');
    
    // 1. Submit valid registration form
    await page.getByRole('textbox', { name: /organization name/i }).fill(testData.validRegistration.orgName);
    await page.getByRole('combobox', { name: /type of organization/i }).selectOption(testData.validRegistration.orgType);
    await page.getByRole('textbox', { name: /contact person/i }).fill(testData.validRegistration.contactPerson);
    await page.getByRole('textbox', { name: /official email/i }).fill(testData.validRegistration.email);
    await page.getByRole('textbox', { name: /phone number/i }).fill(testData.validRegistration.phone);
    await page.getByRole('textbox', { name: /registered address/i }).fill(testData.validRegistration.address);
    await page.getByRole('textbox', { name: /short description/i }).fill(testData.validRegistration.description);
    await page.getByRole('button', { name: /submit registration/i }).click();
    
    // Wait for success message
    await expect(page.getByText(new RegExp(testData.expectedMessages.success, 'i'))).toBeVisible();
    
    // 2. Check admin dashboard for new registration entry
    // Note: This requires admin login credentials
    await page.goto(testData.baseUrl + '/admin/dashboard');
    
    // 3. Verify registration status shows "Pending Review"
    await expect(page.getByText(/pending review/i)).toBeVisible();
    await expect(page.getByText(testData.validRegistration.email)).toBeVisible();
  });

  test('TC_SCRUM17_008: Verify Accessibility Standards Compliance', async ({ page }) => {
    // Precondition: Navigate to registration page
    await page.goto(testData.baseUrl + '/partner-registration');
    
    // 1. Navigate using keyboard only (Tab key)
    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // 2. Verify all form fields are accessible
    const formFields = page.locator('input, select, textarea, button');
    const count = await formFields.count();
    expect(count).toBeGreaterThan(0);
    
    // 3. Check form labels exist
    const labels = page.locator('label');
    const labelCount = await labels.count();
    expect(labelCount).toBeGreaterThan(0);
    
    // 4. Verify high-contrast text visibility (basic check)
    const bodyText = page.locator('body');
    await expect(bodyText).toBeVisible();
  });

  test('TC_SCRUM17_009: Verify Optional Fields Functionality', async ({ page }) => {
    // Precondition: Navigate to registration page
    await page.goto(testData.baseUrl + '/partner-registration');
    
    // 1. Fill all mandatory fields
    await page.getByRole('textbox', { name: /organization name/i }).fill(testData.validRegistration.orgName);
    await page.getByRole('combobox', { name: /type of organization/i }).selectOption(testData.validRegistration.orgType);
    await page.getByRole('textbox', { name: /contact person/i }).fill(testData.validRegistration.contactPerson);
    await page.getByRole('textbox', { name: /official email/i }).fill(testData.validRegistration.email);
    await page.getByRole('textbox', { name: /phone number/i }).fill(testData.validRegistration.phone);
    await page.getByRole('textbox', { name: /registered address/i }).fill(testData.validRegistration.address);
    await page.getByRole('textbox', { name: /short description/i }).fill(testData.validRegistration.description);
    
    // 2. Add Website (optional field)
    await page.getByRole('textbox', { name: /website.*optional/i }).fill(testData.validRegistration.website);
    
    // 3. Upload organization logo (optional)
    // Note: File upload would need actual file path
    // await page.getByRole('button', { name: /upload organization logo/i }).setInputFiles('path/to/logo.png');
    
    // 4. Submit form
    await page.getByRole('button', { name: /submit registration/i }).click();
    
    // Expected Result: Form submits successfully with optional fields
    await expect(page.getByText(new RegExp(testData.expectedMessages.success, 'i'))).toBeVisible();
  });
});
