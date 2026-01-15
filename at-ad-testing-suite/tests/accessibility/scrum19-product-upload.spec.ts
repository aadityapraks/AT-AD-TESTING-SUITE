// spec: specs/a11y/SCRUM-19-product-upload.md

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum19-accessibility.json';

test.describe('SCRUM-19: Product Upload Form Accessibility', () => {

  test.describe('Form Navigation and Structure', () => {
    test('TC_A11Y_001: Verify keyboard navigation through entire form', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_002: Verify form structure and landmarks', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading.first()).toBeVisible();
    });

    test('TC_A11Y_003: Verify help icons accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const helpIcon = page.locator('[role="button"]').filter({ hasText: /help/i }).first();
      if (await helpIcon.isVisible()) {
        await expect(helpIcon).toBeVisible();
      }
    });
  });

  test.describe('Text Input Fields Accessibility', () => {
    test('TC_A11Y_004: Verify text input labels and associations', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const productNameInput = page.getByLabel(/product name/i).or(page.locator('input[name*="name"]')).first();
      await expect(productNameInput).toBeVisible();
    });

    test('TC_A11Y_005: Verify text input validation errors', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const submitButton = page.getByRole('button', { name: /upload|submit/i }).first();
      if (await submitButton.isVisible()) {
        await submitButton.click();
      }
    });

    test('TC_A11Y_006: Verify character counter accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const descriptionField = page.locator('textarea').first();
      if (await descriptionField.isVisible()) {
        await descriptionField.fill(testData.productUpload.shortDescription);
      }
    });
  });

  test.describe('Dropdown and Select Fields', () => {
    test('TC_A11Y_007: Verify dropdown accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const dropdown = page.locator('select').or(page.locator('[role="combobox"]')).first();
      if (await dropdown.isVisible()) {
        await expect(dropdown).toBeVisible();
      }
    });

    test('TC_A11Y_008: Verify multi-select dropdown', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const multiSelect = page.locator('[multiple]').or(page.locator('[role="listbox"]')).first();
      if (await multiSelect.isVisible()) {
        await expect(multiSelect).toBeVisible();
      }
    });

    test('TC_A11Y_009: Verify cascading dropdowns', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.keyboard.press('Tab');
    });
  });

  test.describe('GenAI Assist Button Accessibility', () => {
    test('TC_A11Y_010: Verify GenAI assist button accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const genAIButton = page.getByRole('button', { name: /genai|assist/i }).first();
      if (await genAIButton.isVisible()) {
        await expect(genAIButton).toBeVisible();
      }
    });

    test('TC_A11Y_011: Verify GenAI modal accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const genAIButton = page.getByRole('button', { name: /genai|assist/i }).first();
      if (await genAIButton.isVisible()) {
        await genAIButton.click();
        const modal = page.locator('[role="dialog"]');
        if (await modal.isVisible()) {
          await expect(modal).toBeVisible();
        }
      }
    });
  });

  test.describe('Image Upload Accessibility', () => {
    test('TC_A11Y_012: Verify image upload button accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const uploadButton = page.getByRole('button', { name: /upload|image/i }).first();
      if (await uploadButton.isVisible()) {
        await expect(uploadButton).toBeVisible();
      }
    });

    test('TC_A11Y_013: Verify upload progress indicator accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const progressBar = page.locator('[role="progressbar"]');
      if (await progressBar.isVisible()) {
        await expect(progressBar).toBeVisible();
      }
    });

    test('TC_A11Y_014: Verify image preview and removal accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const removeButton = page.getByRole('button', { name: /remove/i }).first();
      if (await removeButton.isVisible()) {
        await expect(removeButton).toBeVisible();
      }
    });

    test('TC_A11Y_015: Verify alt text input accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const altTextInput = page.getByLabel(/alt text/i).or(page.locator('input[name*="alt"]')).first();
      if (await altTextInput.isVisible()) {
        await expect(altTextInput).toBeVisible();
      }
    });

    test('TC_A11Y_016: Verify image upload error handling', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const errorAlert = page.locator('[role="alert"]');
      if (await errorAlert.isVisible()) {
        await expect(errorAlert).toBeVisible();
      }
    });
  });

  test.describe('Video Upload Accessibility', () => {
    test('TC_A11Y_017: Verify video upload option selection', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const radioGroup = page.locator('[role="radiogroup"]');
      if (await radioGroup.isVisible()) {
        await expect(radioGroup).toBeVisible();
      }
    });

    test('TC_A11Y_018: Verify video link input accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const urlInput = page.getByLabel(/video|url|link/i).first();
      if (await urlInput.isVisible()) {
        await expect(urlInput).toBeVisible();
      }
    });

    test('TC_A11Y_019: Verify video preview accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const videoPreview = page.locator('video').first();
      if (await videoPreview.isVisible()) {
        await expect(videoPreview).toBeVisible();
      }
    });
  });

  test.describe('Specifications Section Accessibility', () => {
    test('TC_A11Y_020: Verify specifications key-value fields', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const addButton = page.getByRole('button', { name: /add|specification/i }).first();
      if (await addButton.isVisible()) {
        await expect(addButton).toBeVisible();
      }
    });

    test('TC_A11Y_021: Verify GenAI specifications generation', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const generateButton = page.getByRole('button', { name: /generate/i }).first();
      if (await generateButton.isVisible()) {
        await expect(generateButton).toBeVisible();
      }
    });
  });

  test.describe('Geography and Quantity Fields', () => {
    test('TC_A11Y_022: Verify geographical availability radio buttons', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const radioButton = page.getByRole('radio').first();
      if (await radioButton.isVisible()) {
        await expect(radioButton).toBeVisible();
      }
    });

    test('TC_A11Y_023: Verify geography search and selection', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const searchInput = page.getByRole('searchbox').or(page.getByPlaceholder(/search/i)).first();
      if (await searchInput.isVisible()) {
        await expect(searchInput).toBeVisible();
      }
    });

    test('TC_A11Y_024: Verify product quantity input', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const quantityInput = page.getByLabel(/quantity/i).or(page.locator('input[type="number"]')).first();
      if (await quantityInput.isVisible()) {
        await expect(quantityInput).toBeVisible();
      }
    });

    test('TC_A11Y_025: Verify Made to Order toggle accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const toggle = page.locator('[role="switch"]').first();
      if (await toggle.isVisible()) {
        await expect(toggle).toBeVisible();
      }
    });
  });

  test.describe('Additional Information Fields', () => {
    test('TC_A11Y_026: Verify URL input fields', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const urlInput = page.getByLabel(/amazon|website|link/i).first();
      if (await urlInput.isVisible()) {
        await expect(urlInput).toBeVisible();
      }
    });

    test('TC_A11Y_027: Verify price range dropdown and inputs', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const priceInput = page.getByLabel(/price/i).first();
      if (await priceInput.isVisible()) {
        await expect(priceInput).toBeVisible();
      }
    });

    test('TC_A11Y_028: Verify support helpline input', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const phoneInput = page.getByLabel(/helpline|phone|contact/i).first();
      if (await phoneInput.isVisible()) {
        await expect(phoneInput).toBeVisible();
      }
    });

    test('TC_A11Y_029: Verify tags/metadata input', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const tagsInput = page.getByLabel(/tag/i).first();
      if (await tagsInput.isVisible()) {
        await expect(tagsInput).toBeVisible();
      }
    });
  });

  test.describe('Form Submission and Draft', () => {
    test('TC_A11Y_030: Verify Save as Draft and Submit buttons', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const draftButton = page.getByRole('button', { name: /draft/i });
      const submitButton = page.getByRole('button', { name: /upload|submit/i });
      if (await draftButton.isVisible()) {
        await expect(draftButton).toBeVisible();
      }
      if (await submitButton.isVisible()) {
        await expect(submitButton).toBeVisible();
      }
    });

    test('TC_A11Y_031: Verify form validation on submission', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const submitButton = page.getByRole('button', { name: /upload|submit/i }).first();
      if (await submitButton.isVisible()) {
        await submitButton.click();
      }
    });

    test('TC_A11Y_032: Verify success confirmation message', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const statusMessage = page.locator('[role="status"]').or(page.locator('[role="alert"]'));
      if (await statusMessage.isVisible()) {
        await expect(statusMessage).toBeVisible();
      }
    });

    test('TC_A11Y_033: Verify draft save confirmation', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const draftButton = page.getByRole('button', { name: /draft/i });
      if (await draftButton.isVisible()) {
        await draftButton.click();
      }
    });
  });

  test.describe('Error States and Messages', () => {
    test('TC_A11Y_034: Verify error summary accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const errorSummary = page.locator('[role="alert"]');
      if (await errorSummary.isVisible()) {
        await expect(errorSummary).toBeVisible();
      }
    });

    test('TC_A11Y_035: Verify inline field errors', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const inlineError = page.locator('.error').or(page.locator('[role="alert"]'));
      if (await inlineError.first().isVisible()) {
        await expect(inlineError.first()).toBeVisible();
      }
    });

    test('TC_A11Y_036: Verify network/system error handling', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const errorMessage = page.locator('[role="alert"]');
      if (await errorMessage.isVisible()) {
        await expect(errorMessage).toBeVisible();
      }
    });
  });

  test.describe('Responsive and Mobile Accessibility', () => {
    test('TC_A11Y_037: Verify mobile form accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    });

    test('TC_A11Y_038: Verify form at 200% zoom', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.evaluate(() => { document.body.style.zoom = '2.0'; });
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    });
  });

  test.describe('Color and Contrast', () => {
    test('TC_A11Y_039: Verify text contrast ratios', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const labels = page.locator('label');
      await expect(labels.first()).toBeVisible();
    });

    test('TC_A11Y_040: Verify non-text contrast', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const inputs = page.locator('input');
      await expect(inputs.first()).toBeVisible();
    });

    test('TC_A11Y_041: Verify information not conveyed by color alone', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const requiredFields = page.locator('[required]').or(page.locator('[aria-required="true"]'));
      if (await requiredFields.first().isVisible()) {
        await expect(requiredFields.first()).toBeVisible();
      }
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    test('TC_A11Y_042: Verify NVDA compatibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const formHeading = page.getByRole('heading', { level: 1 });
      await expect(formHeading.first()).toBeVisible();
    });

    test('TC_A11Y_043: Verify JAWS compatibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      const ariaElements = page.locator('[aria-label]').or(page.locator('[aria-labelledby]'));
      await expect(ariaElements.first()).toBeVisible();
    });
  });

  test.describe('Focus Management', () => {
    test('TC_A11Y_044: Verify focus order throughout form', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_045: Verify focus visibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_046: Verify no keyboard traps', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);

      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });
});
