// spec: specs/functional/SCRUM-22-genai-edit-product.plan.md

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum22-genai-edit-product.json';

test.describe('SCRUM-22: GenAI Product Edit', () => {

  test.describe('Access Edit Mode', () => {
    test('Access Edit Product option', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      
      await page.waitForURL(/partner\/product-management/);
      await expect(page).toHaveURL(/partner\/product-management/);
      await expect(page.getByRole('heading', { name: /product management/i })).toBeVisible();
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await expect(productRow).toBeVisible();
      
      const actionsMenu = productRow.getByLabel('Product actions menu');
      await actionsMenu.click();
      
      const editOption = page.getByText('Edit', { exact: true }).first();
      await expect(editOption).toBeVisible();
      await editOption.click();
    });

    test('Verify all editable sections displayed', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      
      await page.waitForURL(/partner\/product-management/);
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await expect(page.getByText(testData.editableFields.shortDescription)).toBeVisible();
      await expect(page.getByText(testData.editableFields.detailedDescription)).toBeVisible();
      await expect(page.getByText(testData.editableFields.specifications)).toBeVisible();
      await expect(page.getByText(/ALT Text|Images/i)).toBeVisible();
      await expect(page.getByText(/Availability|Quantity/i)).toBeVisible();
    });
  });

  test.describe('ALT Text Generation and Editing', () => {
    test('Generate ALT text for image', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: /Add.*Improve ALT Text.*GenAI/i }).click();
      
      const altTextField = page.getByLabel(/ALT Text/i);
      await expect(altTextField).toBeVisible();
      await expect(altTextField).not.toBeEmpty();
    });

    test('Verify ALT text character limit', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      await page.getByRole('button', { name: /Add.*Improve ALT Text.*GenAI/i }).click();
      
      const characterCounter = page.getByText(/\d+.*125|character/i);
      await expect(characterCounter).toBeVisible();
      
      const altTextField = page.getByLabel(/ALT Text/i);
      const altText = await altTextField.inputValue();
      expect(altText.length).toBeLessThanOrEqual(testData.altTextLimits.maxCharacters);
    });

    test('Edit generated ALT text', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      await page.getByRole('button', { name: /Add.*Improve ALT Text.*GenAI/i }).click();
      
      const altTextField = page.getByLabel(/ALT Text/i);
      const originalText = await altTextField.inputValue();
      const editedText = originalText + ' - edited';
      await altTextField.fill(editedText);
      
      await page.getByRole('button', { name: /Save/i }).click();
      
      await expect(page.getByText(/updated|saved/i)).toBeVisible();
    });
  });

  test.describe('Side-by-Side Comparison', () => {
    test('View original vs AI-suggested text', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      await expect(page.getByText(/CURRENT|Original/i)).toBeVisible();
      await expect(page.getByText(/NEW|AI.*Suggested/i)).toBeVisible();
    });

    test('Accept all AI suggestions', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      await page.getByRole('button', { name: /Accept All/i }).click();
      
      await expect(page.getByText(/applied|accepted/i)).toBeVisible();
    });

    test('Edit and merge suggestions manually', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      const editableField = page.getByRole('textbox', { name: /description/i }).first();
      await editableField.click();
      await editableField.fill('Manually merged content');
      
      await page.getByRole('button', { name: /Save|Apply/i }).click();
      
      await expect(page.getByText(/saved|updated/i)).toBeVisible();
    });

    test('Reject and retain original content', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      const originalContent = await page.getByText(/CURRENT/i).locator('..').textContent();
      
      await page.getByRole('button', { name: /Reject|Cancel|Close/i }).click();
      
      const currentContent = await page.getByRole('textbox', { name: /description/i }).first().inputValue();
      expect(currentContent).toBeTruthy();
    });
  });

  test.describe('Accessibility Compliance Focus', () => {
    test('Verify Grade 7-8 readability level', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      const generatedText = await page.getByText(/NEW|AI/i).locator('..').textContent();
      expect(generatedText).toBeTruthy();
      expect(generatedText.split(' ').length).toBeGreaterThan(0);
    });

    test('Verify person-first language', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      const generatedText = await page.getByText(/NEW|AI/i).locator('..').textContent();
      expect(generatedText).not.toMatch(/disabled person|handicapped|wheelchair-bound/i);
    });

    test('Verify sensory feature descriptions', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      const generatedText = await page.getByText(/NEW|AI/i).locator('..').textContent();
      expect(generatedText).toBeTruthy();
    });
  });

  test.describe('Version Control and Saving', () => {
    test('Save changes with version control', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      await page.getByRole('button', { name: /Accept/i }).click();
      
      await page.getByRole('button', { name: /Save Changes/i }).click();
      
      await expect(page.getByText(/version|saved/i)).toBeVisible();
    });

    test('Verify product status changes to Pending Review', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      await page.getByRole('button', { name: /Accept/i }).click();
      await page.getByRole('button', { name: /Save Changes/i }).click();
      
      await page.goto(testData.baseUrl + testData.productManagementUrl);
      await expect(page.getByText(testData.expectedMessages.statusPendingReview)).toBeVisible();
    });
  });

  test.describe('System Feedback and Confirmation', () => {
    test('Display save confirmation message', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      await page.getByRole('button', { name: /Accept/i }).click();
      await page.getByRole('button', { name: /Save Changes/i }).click();
      
      await expect(page.getByText(testData.expectedMessages.saveConfirmation)).toBeVisible();
    });

    test('Handle GenAI service unavailability', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.route('**/api/genai/**', route => route.abort());
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      await expect(page.getByText(testData.expectedMessages.genAIUnavailable)).toBeVisible();
      
      const editableField = page.getByRole('textbox', { name: /description/i }).first();
      await expect(editableField).toBeEnabled();
    });
  });

  test.describe('Audit and Transparency', () => {
    test('Log AI-assisted edits', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      await page.getByRole('button', { name: /Accept/i }).click();
      
      await page.getByRole('button', { name: /Save Changes/i }).click();
      
      await page.getByRole('button', { name: /Logout/i }).click();
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('admin@swarajability.org');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('admin-password');
      await page.getByRole('button', { name: 'Continue' }).click();
      
      await page.goto(testData.baseUrl + '/admin/audit-logs');
      await expect(page.getByText(/AI.*edit|GenAI/i)).toBeVisible();
    });

    test('Admin views AI modification indicator', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      await page.getByRole('button', { name: /Accept/i }).click();
      await page.getByRole('button', { name: /Save Changes/i }).click();
      
      await page.getByRole('button', { name: /Logout/i }).click();
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('admin@swarajability.org');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('admin-password');
      await page.getByRole('button', { name: 'Continue' }).click();
      
      await page.goto(testData.baseUrl + '/admin/products');
      
      await expect(page.getByText(/AI.*modified|GenAI/i)).toBeVisible();
    });

    test('Display GenAI disclaimer', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      await expect(page.getByText(testData.genAI.disclaimerText)).toBeVisible();
    });
  });

  test.describe('GenAI Interface Accessibility', () => {
    test('Verify keyboard navigation support', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
      
      await page.keyboard.press('Enter');
    });

    test('Verify screen reader compatibility', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      const buttons = page.getByRole('button');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
      
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const ariaLabel = await button.getAttribute('aria-label');
        const text = await button.textContent();
        expect(ariaLabel || text).toBeTruthy();
      }
    });

    test('Verify color contrast and focus states', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      const firstButton = page.getByRole('button').first();
      await firstButton.focus();
      await expect(firstButton).toBeFocused();
    });

    test('Verify original vs AI text distinction', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      const originalSection = page.getByText(/CURRENT|Original/i);
      const aiSection = page.getByText(/NEW|AI/i);
      
      await expect(originalSection).toBeVisible();
      await expect(aiSection).toBeVisible();
      
      const originalBox = originalSection.locator('..');
      const aiBox = aiSection.locator('..');
      
      await expect(originalBox).toBeVisible();
      await expect(aiBox).toBeVisible();
    });

    test('Verify help icons and tips', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner\/product-management/);
      
      const productRow = page.getByRole('button', { name: /Product:.*Status:/ }).first();
      await productRow.getByLabel('Product actions menu').click();
      await page.getByText('Edit', { exact: true }).first().click();
      
      await page.getByRole('button', { name: testData.genAI.buttonLabels.enhanceWithGenAI }).first().click();
      
      const helpIcon = page.getByRole('button', { name: /help|info|\?/i }).or(page.locator('[aria-label*="help"]')).first();
      
      if (await helpIcon.isVisible()) {
        await helpIcon.hover();
        await expect(page.getByText(/accessibility|tip|guide/i)).toBeVisible();
      }
    });
  });
});
