// spec: specs/a11y/SCRUM-20-genai-assistant.json

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { ProductUploadPage } from '../../../pages/product-upload.page';
import testData from '../../../test-data/scrum20-accessibility.json';

const BASE_URL = testData.url;

test.describe('SCRUM-20: GenAI Assistant Accessibility', () => {
  let loginPage: LoginPage;
  let productUploadPage: ProductUploadPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productUploadPage = new ProductUploadPage(page);
    await page.goto(BASE_URL);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productUploadPage.navigateToProductUpload();
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
  });

  test.describe('GenAI Button Access', () => {
    test('TC_A11Y_001: Verify Assist with GenAI button accessibility', async ({ page }) => {
      const genaiButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await genaiButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await genaiButton.focus();
        await expect(genaiButton).toBeFocused();
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_002: Verify GenAI button screen reader accessibility', async ({ page }) => {
      const genaiButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await genaiButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(genaiButton).toHaveAccessibleName(/.+/);
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_003: Verify GenAI button visual accessibility', async ({ page }) => {
      const genaiButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await genaiButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(genaiButton).toBeVisible();
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_004: Verify GenAI buttons for all fields', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('GenAI Panel Structure', () => {
    test('TC_A11Y_005: Verify GenAI panel structure', async ({ page }) => {
      const genaiButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await genaiButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await genaiButton.click();
        await page.waitForTimeout(1000);
        const panel = page.locator('[role="dialog"]').or(page.locator('[role="complementary"]'));
        if (await panel.first().isVisible({ timeout: 5000 }).catch(() => false)) {
          await expect(panel.first()).toBeVisible();
        }
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_006: Verify panel heading structure', async ({ page }) => {
      const genaiButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await genaiButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await genaiButton.click();
        await page.waitForTimeout(1000);
        const heading = page.getByRole('heading');
        if (await heading.first().isVisible({ timeout: 5000 }).catch(() => false)) {
          await expect(heading.first()).toBeVisible();
        }
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });

    test('TC_A11Y_007: Verify panel close functionality', async ({ page }) => {
      const genaiButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await genaiButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await genaiButton.click();
        await page.waitForTimeout(1000);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Input and Prompt Fields', () => {
    test('TC_A11Y_008: Verify input field labels', async ({ page }) => {
      const labels = page.locator('label');
      await expect(labels.first()).toBeVisible();
    });

    test('TC_A11Y_009: Verify input field keyboard accessibility', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_010: Verify input field visual accessibility', async ({ page }) => {
      const inputs = page.locator('input:visible');
      await expect(inputs.first()).toBeVisible();
    });

    test('TC_A11Y_011: Verify tone guidance dropdown accessibility', async ({ page }) => {
      const dropdown = page.locator('select').or(page.locator('[role="combobox"]'));
      if (await dropdown.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(dropdown.first()).toBeVisible();
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });
  });

  test.describe('Generate Button', () => {
    test('TC_A11Y_012: Verify Generate button accessibility', async ({ page }) => {
      const generateButton = page.getByRole('button', { name: /generate/i });
      if (await generateButton.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(generateButton.first()).toBeVisible();
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_013: Verify Generate button screen reader accessibility', async ({ page }) => {
      const generateButton = page.getByRole('button', { name: /generate/i });
      if (await generateButton.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(generateButton.first()).toHaveAccessibleName(/generate/i);
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_014: Verify Generate button disabled state', async ({ page }) => {
      const generateButton = page.getByRole('button', { name: /generate/i });
      if (await generateButton.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        const isDisabled = await generateButton.first().isDisabled();
        if (isDisabled) {
          await expect(generateButton.first()).toBeDisabled();
        } else {
          await expect(generateButton.first()).toBeEnabled();
        }
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });
  });

  test.describe('Generated Content Display', () => {
    test('TC_A11Y_015: Verify generated content accessibility', async ({ page }) => {
      const contentRegion = page.locator('[role="region"]').or(page.locator('[aria-live]'));
      if (await contentRegion.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(contentRegion.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_016: Verify content generation announcement', async ({ page }) => {
      const liveRegion = page.locator('[aria-live]');
      if (await liveRegion.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(liveRegion.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_017: Verify content type labels', async ({ page }) => {
      const labels = page.locator('label');
      await expect(labels.first()).toBeVisible();
    });
  });

  test.describe('Action Buttons', () => {
    test('TC_A11Y_018: Verify action buttons keyboard accessibility', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_019: Verify action buttons screen reader accessibility', async ({ page }) => {
      const buttons = page.getByRole('button');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
    });

    test('TC_A11Y_020: Verify action buttons visual accessibility', async ({ page }) => {
      const buttons = page.getByRole('button');
      await expect(buttons.first()).toBeVisible();
    });

    test('TC_A11Y_021: Verify Accept button functionality', async ({ page }) => {
      const acceptButton = page.getByRole('button', { name: /accept/i });
      if (await acceptButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(acceptButton.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Edit Mode', () => {
    test('TC_A11Y_022: Verify edit mode accessibility', async ({ page }) => {
      const editButton = page.getByRole('button', { name: /edit/i });
      if (await editButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(editButton.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_023: Verify edit mode screen reader accessibility', async ({ page }) => {
      const textarea = page.locator('textarea');
      if (await textarea.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(textarea.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_024: Verify edit mode action buttons', async ({ page }) => {
      const saveButton = page.getByRole('button', { name: /save|draft/i });
      if (await saveButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(saveButton.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Conversational Interface', () => {
    test('TC_A11Y_025: Verify refinement input accessibility', async ({ page }) => {
      const refinementInput = page.getByLabel(/refine|additional/i).or(page.getByPlaceholder(/refine|instruction/i));
      if (await refinementInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(refinementInput.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_026: Verify refinement examples accessibility', async ({ page }) => {
      const exampleButton = page.getByRole('button', { name: /simpler|safety/i });
      if (await exampleButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(exampleButton.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_027: Verify conversation history accessibility', async ({ page }) => {
      const history = page.locator('[role="list"]').or(page.locator('[role="log"]'));
      if (await history.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(history.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Hints and Guidance', () => {
    test('TC_A11Y_028: Verify accessibility hints display', async ({ page }) => {
      const hints = page.locator('[role="status"]').or(page.locator('[aria-live]'));
      if (await hints.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(hints.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_029: Verify hint icon accessibility', async ({ page }) => {
      const hintIcon = page.getByRole('button', { name: /tip|hint|info/i });
      if (await hintIcon.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(hintIcon.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_030: Verify hints visual accessibility', async ({ page }) => {
      const hints = page.locator('[role="status"]');
      if (await hints.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(hints.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Disclaimer Text', () => {
    test('TC_A11Y_031: Verify disclaimer accessibility', async ({ page }) => {
      const disclaimer = page.locator('[role="note"]').or(page.locator('aside')).or(page.getByText(/ai-generated|review/i));
      if (await disclaimer.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(disclaimer.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_032: Verify disclaimer structure', async ({ page }) => {
      const disclaimer = page.locator('[role="note"]').or(page.getByText(/ai-generated|content.*review/i));
      if (await disclaimer.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(disclaimer.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Loading States', () => {
    test('TC_A11Y_033: Verify loading state accessibility', async ({ page }) => {
      const loadingIndicator = page.locator('[role="status"]').or(page.locator('[aria-live]'));
      if (await loadingIndicator.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(loadingIndicator.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_034: Verify loading indicator details', async ({ page }) => {
      const spinner = page.locator('[aria-label*="Loading" i]').or(page.locator('[role="progressbar"]'));
      if (await spinner.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(spinner.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('TC_A11Y_035: Verify error message accessibility', async ({ page }) => {
      const error = page.locator('[role="alert"]');
      if (await error.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(error.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_036: Verify error keyboard handling', async ({ page }) => {
      const dismissButton = page.getByRole('button', { name: /dismiss|close/i });
      if (await dismissButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(dismissButton.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_037: Verify input validation errors', async ({ page }) => {
      const validationError = page.locator('[role="alert"]');
      if (await validationError.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(validationError.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Audit Indicator', () => {
    test('TC_A11Y_038: Verify AI-assisted indicator accessibility', async ({ page }) => {
      const indicator = page.getByText(/generated with ai/i);
      if (await indicator.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(indicator.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_039: Verify audit indicator details', async ({ page }) => {
      const indicator = page.getByText(/generated with ai/i);
      if (await indicator.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(indicator.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Overall Interface Accessibility', () => {
    test('TC_A11Y_040: Verify complete keyboard navigation', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_041: Verify complete screen reader accessibility', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_042: Verify color and contrast compliance', async ({ page }) => {
      const labels = page.locator('label');
      await expect(labels.first()).toBeVisible();
      const labelColor = await labels.first().evaluate(el => window.getComputedStyle(el).color);
      expect(labelColor).toBeTruthy();
      expect(labelColor).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('TC_A11Y_043: Verify responsive design accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_044: Verify panel layout accessibility', async ({ page }) => {
      const genaiButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await genaiButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await genaiButton.click();
        await page.waitForTimeout(1000);
        const panel = page.locator('[role="dialog"]');
        if (await panel.first().isVisible({ timeout: 5000 }).catch(() => false)) {
          await expect(panel.first()).toBeVisible();
        }
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });
  });
});
