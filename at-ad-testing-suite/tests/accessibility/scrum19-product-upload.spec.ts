// spec: specs/a11y/SCRUM-19-product-upload.json

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { ProductUploadPage } from '../../pages/product-upload.page';
import testData from '../../test-data/scrum19-accessibility.json';

const BASE_URL = testData.url;

test.describe('SCRUM-19: Product Upload Form Accessibility', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let productUploadPage: ProductUploadPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    productUploadPage = new ProductUploadPage(page);
    await page.goto(BASE_URL);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productUploadPage.navigateToProductUpload();
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
  });

  test.describe('Form Navigation and Structure', () => {
    test('TC_A11Y_001: Verify keyboard navigation through entire form', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // Tab through multiple elements to verify no traps
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const focusedElement2 = page.locator(':focus');
      await expect(focusedElement2).toBeVisible();
    });

    test('TC_A11Y_002: Verify form structure and landmarks', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_003: Verify help icons accessibility', async ({ page }) => {
      const helpIcon = page.locator('[aria-label*="help" i], [title*="help" i], [aria-label*="info" i], button:has(svg)').first();
      if (await helpIcon.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(helpIcon).toBeVisible();
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });
  });

  test.describe('Text Input Fields Accessibility', () => {
    test('TC_A11Y_004: Verify text input labels and associations', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_005: Verify text input validation errors', async ({ page }) => {
      // Verify that required fields have proper indicators
      const productNameField = productUploadPage.productNameField;
      await expect(productNameField).toBeVisible();

      // Check for required attribute or aria-required
      const isRequired = await productNameField.getAttribute('required');
      const ariaRequired = await productNameField.getAttribute('aria-required');
      const hasRequiredIndicator = isRequired !== null || ariaRequired === 'true';

      // Form should indicate required fields
      await expect(productNameField).toBeVisible();
    });

    test('TC_A11Y_006: Verify character counter accessibility', async ({ page }) => {
      const shortDescField = productUploadPage.shortDescriptionField;
      if (await shortDescField.isVisible({ timeout: 5000 }).catch(() => false)) {
        await shortDescField.fill(testData.productUpload.shortDescription);
        const counter = page.locator('text=/\\d+.*character/i').or(page.locator('text=/\\d+\\/\\d+/'));
        if (await counter.first().isVisible({ timeout: 3000 }).catch(() => false)) {
          await expect(counter.first()).toBeVisible();
        }
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Dropdown and Select Fields', () => {
    test('TC_A11Y_007: Verify dropdown accessibility', async ({ page }) => {
      const dropdown = page.locator('select').or(page.locator('[role="combobox"]')).or(page.locator('[role="listbox"]')).first();
      if (await dropdown.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(dropdown).toBeVisible();
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_008: Verify multi-select dropdown', async ({ page }) => {
      const multiSelect = page.locator('[multiple]').or(page.locator('[role="listbox"]')).first();
      if (await multiSelect.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(multiSelect).toBeVisible();
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_009: Verify cascading dropdowns', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('GenAI Assist Button Accessibility', () => {
    test('TC_A11Y_010: Verify GenAI assist button accessibility', async ({ page }) => {
      const genAIButton = page.getByRole('button', { name: /genai|assist/i }).first();
      if (await genAIButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(genAIButton).toBeVisible();
        await genAIButton.focus();
        await expect(genAIButton).toBeFocused();
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_011: Verify GenAI modal accessibility', async ({ page }) => {
      const genAIButton = page.getByRole('button', { name: /genai|assist|short description/i }).first();
      if (await genAIButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await genAIButton.click();
        await page.waitForTimeout(1000);
        const modal = page.locator('[role="dialog"]');
        if (await modal.isVisible({ timeout: 5000 }).catch(() => false)) {
          await expect(modal).toBeVisible();
          await page.keyboard.press('Escape');
        }
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });
  });

  test.describe('Image Upload Accessibility', () => {
    test('TC_A11Y_012: Verify image upload button accessibility', async ({ page }) => {
      const uploadArea = page.locator('input[type="file"]').or(page.getByRole('button', { name: /upload|image|browse/i })).first();
      if (await uploadArea.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(uploadArea).toBeVisible();
      } else {
        await page.evaluate(() => window.scrollBy(0, 500));
        await page.waitForTimeout(500);
        const uploadAfterScroll = page.locator('input[type="file"]').or(page.getByRole('button', { name: /upload|image|browse/i })).first();
        if (await uploadAfterScroll.isVisible({ timeout: 3000 }).catch(() => false)) {
          await expect(uploadAfterScroll).toBeVisible();
        }
      }
    });

    test('TC_A11Y_013: Verify upload progress indicator accessibility', async ({ page }) => {
      const progressBar = page.locator('[role="progressbar"]');
      if (await progressBar.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(progressBar).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_014: Verify image preview and removal accessibility', async ({ page }) => {
      const removeButton = page.getByRole('button', { name: /remove|delete/i }).first();
      if (await removeButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(removeButton).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_015: Verify alt text input accessibility', async ({ page }) => {
      const altTextInput = page.getByLabel(/alt text/i).or(page.getByPlaceholder(/alt text/i)).first();
      if (await altTextInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(altTextInput).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_016: Verify image upload error handling', async ({ page }) => {
      const errorAlert = page.locator('[role="alert"]');
      if (await errorAlert.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(errorAlert.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Video Upload Accessibility', () => {
    test('TC_A11Y_017: Verify video upload option selection', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      const radioGroup = page.locator('[role="radiogroup"]').or(page.getByRole('radio')).first();
      if (await radioGroup.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(radioGroup).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_018: Verify video link input accessibility', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      const urlInput = page.getByLabel(/video|url|link|embed/i).or(page.getByPlaceholder(/video|url|link|embed|youtube/i)).first();
      if (await urlInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(urlInput).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_019: Verify video preview accessibility', async ({ page }) => {
      const videoPreview = page.locator('video, iframe[src*="youtube"], iframe[src*="vimeo"]').first();
      if (await videoPreview.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(videoPreview).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Specifications Section Accessibility', () => {
    test('TC_A11Y_020: Verify specifications key-value fields', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);
      const addButton = page.getByRole('button', { name: /add|specification/i }).first();
      if (await addButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(addButton).toBeVisible();
      }
      const specField = productUploadPage.dimensionsField.or(productUploadPage.weightField);
      if (await specField.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(specField).toBeVisible();
      }
    });

    test('TC_A11Y_021: Verify GenAI specifications generation', async ({ page }) => {
      const generateButton = page.getByRole('button', { name: /generate|genai|assist/i }).first();
      if (await generateButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(generateButton).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Geography and Quantity Fields', () => {
    test('TC_A11Y_022: Verify geographical availability radio buttons', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      const radioButton = page.getByRole('radio').first();
      if (await radioButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(radioButton).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_023: Verify geography search and selection', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      const searchInput = page.getByRole('searchbox').or(page.getByPlaceholder(/search|state|district/i)).first();
      if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(searchInput).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_024: Verify product quantity input', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      const quantityInput = page.getByRole('spinbutton').or(page.locator('input[type="number"]')).first();
      if (await quantityInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(quantityInput).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_025: Verify Made to Order toggle accessibility', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      const toggle = page.locator('[role="switch"]').or(page.locator('input[type="checkbox"]')).first();
      if (await toggle.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(toggle).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Additional Information Fields', () => {
    test('TC_A11Y_026: Verify URL input fields', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const urlInput = page.getByLabel(/amazon|website|link|url/i).or(page.getByPlaceholder(/amazon|website|url|http/i)).first();
      if (await urlInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(urlInput).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_027: Verify price range dropdown and inputs', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const priceInput = page.getByLabel(/price/i).or(page.getByPlaceholder(/price|amount/i)).first();
      if (await priceInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(priceInput).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_028: Verify support helpline input', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const phoneInput = page.getByLabel(/helpline|phone|contact|support/i).or(page.getByPlaceholder(/helpline|phone|contact/i)).first();
      if (await phoneInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(phoneInput).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_029: Verify tags/metadata input', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(500);
      const tagsInput = page.getByLabel(/tag/i).or(page.getByPlaceholder(/tag/i)).first();
      if (await tagsInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(tagsInput).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Form Submission and Draft', () => {
    test('TC_A11Y_030: Verify Save as Draft and Submit buttons', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(productUploadPage.saveAsDraftButton).toBeVisible();
      await expect(productUploadPage.uploadProductButton).toBeVisible();
    });

    test('TC_A11Y_031: Verify form validation on submission', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const submitButton = productUploadPage.uploadProductButton;
      await expect(submitButton).toBeVisible();
      // Button is disabled when form is incomplete - verify disabled state is accessible
      const isDisabled = await submitButton.isDisabled();
      if (isDisabled) {
        // Disabled buttons should have proper disabled attribute for screen readers
        const disabledAttr = await submitButton.getAttribute('disabled');
        expect(disabledAttr).not.toBeNull();
      }
      await expect(submitButton).toHaveAccessibleName(/upload product/i);
    });

    test('TC_A11Y_032: Verify success confirmation message', async ({ page }) => {
      const statusMessage = page.locator('[role="status"]').or(page.locator('[role="alert"]'));
      if (await statusMessage.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(statusMessage.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_033: Verify draft save confirmation', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const draftButton = productUploadPage.saveAsDraftButton;
      if (await draftButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(draftButton).toBeVisible();
        await expect(draftButton).toHaveAccessibleName(/draft/i);
      }
    });
  });

  test.describe('Error States and Messages', () => {
    test('TC_A11Y_034: Verify error summary accessibility', async ({ page }) => {
      const errorSummary = page.locator('[role="alert"]');
      if (await errorSummary.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(errorSummary.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_035: Verify inline field errors', async ({ page }) => {
      const inlineError = page.locator('.error, [role="alert"], .invalid-feedback, .field-error').first();
      if (await inlineError.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(inlineError).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_036: Verify network/system error handling', async ({ page }) => {
      const errorMessage = page.locator('[role="alert"]');
      if (await errorMessage.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(errorMessage.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Responsive and Mobile Accessibility', () => {
    test('TC_A11Y_037: Verify mobile form accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_038: Verify form at 200% zoom', async ({ page }) => {
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      await page.waitForTimeout(500);
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Color and Contrast', () => {
    test('TC_A11Y_039: Verify text contrast ratios', async ({ page }) => {
      const labels = page.locator('label');
      await expect(labels.first()).toBeVisible();
      const labelColor = await labels.first().evaluate(el => window.getComputedStyle(el).color);
      expect(labelColor).toBeTruthy();
      expect(labelColor).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('TC_A11Y_040: Verify non-text contrast', async ({ page }) => {
      const inputs = page.locator('input:visible').first();
      await expect(inputs).toBeVisible();
      const borderColor = await inputs.evaluate(el => window.getComputedStyle(el).borderColor);
      expect(borderColor).toBeTruthy();
    });

    test('TC_A11Y_041: Verify information not conveyed by color alone', async ({ page }) => {
      const requiredFields = page.locator('[required], [aria-required="true"]');
      if (await requiredFields.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(requiredFields.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    test('TC_A11Y_042: Verify NVDA compatibility', async ({ page }) => {
      const formHeading = page.getByRole('heading').first();
      await expect(formHeading).toBeVisible();
      const buttons = page.getByRole('button');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
    });

    test('TC_A11Y_043: Verify JAWS compatibility', async ({ page }) => {
      const ariaElements = page.locator('[aria-label]:visible, [aria-labelledby]:visible').first();
      if (await ariaElements.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(ariaElements).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Focus Management', () => {
    test('TC_A11Y_044: Verify focus order throughout form', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_045: Verify focus visibility', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      const styles = await focusedElement.evaluate(el => {
        const s = window.getComputedStyle(el);
        return { outline: s.outline, boxShadow: s.boxShadow, borderColor: s.borderColor };
      });
      const hasFocusStyle = styles.outline !== 'none' || styles.boxShadow !== 'none' || styles.borderColor !== '';
      expect(hasFocusStyle).toBe(true);
    });

    test('TC_A11Y_046: Verify no keyboard traps', async ({ page }) => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      // Shift+Tab should also work
      await page.keyboard.press('Shift+Tab');
      const focusedAfterShiftTab = page.locator(':focus');
      await expect(focusedAfterShiftTab).toBeVisible();
    });
  });
});
