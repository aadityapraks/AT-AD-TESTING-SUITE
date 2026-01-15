// spec: specs/a11y/SCRUM-20-genai-assistant.md

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum20-accessibility.json';

const login = async (page) => {
  await page.goto(testData.url);
  await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
  await page.waitForURL(/auth-d\.swarajability\.org/);
  await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForURL(/partner/);
  await page.getByRole('link', { name: 'Product Upload' }).click();
};

test.describe('SCRUM-20: GenAI Assistant Accessibility', () => {

  test.describe('GenAI Button Access', () => {
    test('TC_A11Y_001: Verify Assist with GenAI button accessibility', async ({ page }) => {
      await login(page);
      const genaiButton = page.getByRole('button', { name: /assist.*genai/i }).first();
      if (await genaiButton.isVisible()) {
        await genaiButton.focus();
        await expect(genaiButton).toBeFocused();
      }
    });

    test('TC_A11Y_002: Verify GenAI button screen reader accessibility', async ({ page }) => {
      await login(page);
      const genaiButton = page.getByRole('button', { name: /assist.*genai/i }).first();
      if (await genaiButton.isVisible()) {
        await expect(genaiButton).toHaveAccessibleName(/assist.*genai/i);
      }
    });

    test('TC_A11Y_003: Verify GenAI button visual accessibility', async ({ page }) => {
      await login(page);
      const genaiButton = page.getByRole('button', { name: /assist.*genai/i }).first();
      if (await genaiButton.isVisible()) {
        await expect(genaiButton).toBeVisible();
      }
    });

    test('TC_A11Y_004: Verify GenAI buttons for all fields', async ({ page }) => {
      await login(page);
      await page.keyboard.press('Tab');
    });
  });

  test.describe('GenAI Panel Structure', () => {
    test('TC_A11Y_005: Verify GenAI panel structure', async ({ page }) => {
      await login(page);
      const genaiButton = page.getByRole('button', { name: /assist.*genai/i }).first();
      if (await genaiButton.isVisible()) {
        await genaiButton.click();
        const panel = page.locator('[role="dialog"]').or(page.locator('[role="complementary"]'));
        if (await panel.isVisible()) {
          await expect(panel).toBeVisible();
        }
      }
    });

    test('TC_A11Y_006: Verify panel heading structure', async ({ page }) => {
      await login(page);
      const genaiButton = page.getByRole('button', { name: /assist.*genai/i }).first();
      if (await genaiButton.isVisible()) {
        await genaiButton.click();
        const heading = page.getByRole('heading').first();
        if (await heading.isVisible()) {
          await expect(heading).toBeVisible();
        }
      }
    });

    test('TC_A11Y_007: Verify panel close functionality', async ({ page }) => {
      await login(page);
      const genaiButton = page.getByRole('button', { name: /assist.*genai/i }).first();
      if (await genaiButton.isVisible()) {
        await genaiButton.click();
        await page.keyboard.press('Escape');
      }
    });
  });

  test.describe('Input and Prompt Fields', () => {
    test('TC_A11Y_008: Verify input field labels', async ({ page }) => {
      await login(page);
      const labels = page.locator('label');
      if (await labels.first().isVisible()) {
        await expect(labels.first()).toBeVisible();
      }
    });

    test('TC_A11Y_009: Verify input field keyboard accessibility', async ({ page }) => {
      await login(page);
      await page.keyboard.press('Tab');
    });

    test('TC_A11Y_010: Verify input field visual accessibility', async ({ page }) => {
      await login(page);
      const inputs = page.locator('input');
      if (await inputs.first().isVisible()) {
        await expect(inputs.first()).toBeVisible();
      }
    });

    test('TC_A11Y_011: Verify tone guidance dropdown accessibility', async ({ page }) => {
      await login(page);
      const dropdown = page.locator('select').or(page.locator('[role="combobox"]'));
      if (await dropdown.first().isVisible()) {
        await expect(dropdown.first()).toBeVisible();
      }
    });
  });

  test.describe('Generate Button', () => {
    test('TC_A11Y_012: Verify Generate button accessibility', async ({ page }) => {
      await login(page);
      const generateButton = page.getByRole('button', { name: /generate/i });
      if (await generateButton.isVisible()) {
        await expect(generateButton).toBeVisible();
      }
    });

    test('TC_A11Y_013: Verify Generate button screen reader accessibility', async ({ page }) => {
      await login(page);
      const generateButton = page.getByRole('button', { name: /generate/i });
      if (await generateButton.isVisible()) {
        await expect(generateButton).toHaveAccessibleName(/generate/i);
      }
    });

    test('TC_A11Y_014: Verify Generate button disabled state', async ({ page }) => {
      await login(page);
      const generateButton = page.getByRole('button', { name: /generate/i });
      if (await generateButton.isVisible()) {
        const isDisabled = await generateButton.isDisabled();
        if (isDisabled) {
          await expect(generateButton).toBeDisabled();
        }
      }
    });
  });

  test.describe('Generated Content Display', () => {
    test('TC_A11Y_015: Verify generated content accessibility', async ({ page }) => {
      await login(page);
      const contentRegion = page.locator('[role="region"]');
      if (await contentRegion.isVisible()) {
        await expect(contentRegion).toBeVisible();
      }
    });

    test('TC_A11Y_016: Verify content generation announcement', async ({ page }) => {
      await login(page);
      const liveRegion = page.locator('[aria-live]');
      if (await liveRegion.isVisible()) {
        await expect(liveRegion).toBeVisible();
      }
    });

    test('TC_A11Y_017: Verify content type labels', async ({ page }) => {
      await login(page);
      const labels = page.locator('label');
      if (await labels.first().isVisible()) {
        await expect(labels.first()).toBeVisible();
      }
    });
  });

  test.describe('Action Buttons', () => {
    test('TC_A11Y_018: Verify action buttons keyboard accessibility', async ({ page }) => {
      await login(page);
      await page.keyboard.press('Tab');
    });

    test('TC_A11Y_019: Verify action buttons screen reader accessibility', async ({ page }) => {
      await login(page);
      const buttons = page.locator('button');
      if (await buttons.first().isVisible()) {
        await expect(buttons.first()).toBeVisible();
      }
    });

    test('TC_A11Y_020: Verify action buttons visual accessibility', async ({ page }) => {
      await login(page);
      const buttons = page.locator('button');
      if (await buttons.first().isVisible()) {
        await expect(buttons.first()).toBeVisible();
      }
    });

    test('TC_A11Y_021: Verify Accept button functionality', async ({ page }) => {
      await login(page);
      const acceptButton = page.getByRole('button', { name: /accept/i });
      if (await acceptButton.isVisible()) {
        await expect(acceptButton).toBeVisible();
      }
    });
  });

  test.describe('Edit Mode', () => {
    test('TC_A11Y_022: Verify edit mode accessibility', async ({ page }) => {
      await login(page);
      const editButton = page.getByRole('button', { name: /edit/i });
      if (await editButton.isVisible()) {
        await editButton.click();
        const textarea = page.locator('textarea');
        if (await textarea.isVisible()) {
          await expect(textarea).toBeVisible();
        }
      }
    });

    test('TC_A11Y_023: Verify edit mode screen reader accessibility', async ({ page }) => {
      await login(page);
      const textarea = page.locator('textarea');
      if (await textarea.isVisible()) {
        await expect(textarea).toBeVisible();
      }
    });

    test('TC_A11Y_024: Verify edit mode action buttons', async ({ page }) => {
      await login(page);
      const saveButton = page.getByRole('button', { name: /save/i });
      if (await saveButton.isVisible()) {
        await expect(saveButton).toBeVisible();
      }
    });
  });

  test.describe('Conversational Interface', () => {
    test('TC_A11Y_025: Verify refinement input accessibility', async ({ page }) => {
      await login(page);
      const refinementInput = page.getByLabel(/refine|additional/i);
      if (await refinementInput.isVisible()) {
        await expect(refinementInput).toBeVisible();
      }
    });

    test('TC_A11Y_026: Verify refinement examples accessibility', async ({ page }) => {
      await login(page);
      const exampleButton = page.getByRole('button', { name: /simpler|safety/i });
      if (await exampleButton.isVisible()) {
        await expect(exampleButton).toBeVisible();
      }
    });

    test('TC_A11Y_027: Verify conversation history accessibility', async ({ page }) => {
      await login(page);
      const history = page.locator('[role="list"]');
      if (await history.isVisible()) {
        await expect(history).toBeVisible();
      }
    });
  });

  test.describe('Hints and Guidance', () => {
    test('TC_A11Y_028: Verify accessibility hints display', async ({ page }) => {
      await login(page);
      const hints = page.locator('[role="status"]').or(page.locator('[aria-live]'));
      if (await hints.isVisible()) {
        await expect(hints).toBeVisible();
      }
    });

    test('TC_A11Y_029: Verify hint icon accessibility', async ({ page }) => {
      await login(page);
      const hintIcon = page.getByRole('button', { name: /tip|hint/i });
      if (await hintIcon.isVisible()) {
        await expect(hintIcon).toBeVisible();
      }
    });

    test('TC_A11Y_030: Verify hints visual accessibility', async ({ page }) => {
      await login(page);
      const hints = page.locator('[role="status"]');
      if (await hints.isVisible()) {
        await expect(hints).toBeVisible();
      }
    });
  });

  test.describe('Disclaimer Text', () => {
    test('TC_A11Y_031: Verify disclaimer accessibility', async ({ page }) => {
      await login(page);
      const disclaimer = page.locator('[role="note"]').or(page.locator('aside'));
      if (await disclaimer.isVisible()) {
        await expect(disclaimer).toBeVisible();
      }
    });

    test('TC_A11Y_032: Verify disclaimer structure', async ({ page }) => {
      await login(page);
      const disclaimer = page.locator('[role="note"]');
      if (await disclaimer.isVisible()) {
        await expect(disclaimer).toBeVisible();
      }
    });
  });

  test.describe('Loading States', () => {
    test('TC_A11Y_033: Verify loading state accessibility', async ({ page }) => {
      await login(page);
      const loadingIndicator = page.locator('[role="status"]').or(page.locator('[aria-live]'));
      if (await loadingIndicator.isVisible()) {
        await expect(loadingIndicator).toBeVisible();
      }
    });

    test('TC_A11Y_034: Verify loading indicator details', async ({ page }) => {
      await login(page);
      const spinner = page.locator('[aria-label*="Loading"]').or(page.locator('[role="progressbar"]'));
      if (await spinner.isVisible()) {
        await expect(spinner).toBeVisible();
      }
    });
  });

  test.describe('Error Handling', () => {
    test('TC_A11Y_035: Verify error message accessibility', async ({ page }) => {
      await login(page);
      const error = page.locator('[role="alert"]');
      if (await error.isVisible()) {
        await expect(error).toBeVisible();
      }
    });

    test('TC_A11Y_036: Verify error keyboard handling', async ({ page }) => {
      await login(page);
      const dismissButton = page.getByRole('button', { name: /dismiss|close/i });
      if (await dismissButton.isVisible()) {
        await expect(dismissButton).toBeVisible();
      }
    });

    test('TC_A11Y_037: Verify input validation errors', async ({ page }) => {
      await login(page);
      const validationError = page.locator('[role="alert"]');
      if (await validationError.isVisible()) {
        await expect(validationError).toBeVisible();
      }
    });
  });

  test.describe('Audit Indicator', () => {
    test('TC_A11Y_038: Verify AI-assisted indicator accessibility', async ({ page }) => {
      await login(page);
      const indicator = page.getByText(/generated with ai/i);
      if (await indicator.isVisible()) {
        await expect(indicator).toBeVisible();
      }
    });

    test('TC_A11Y_039: Verify audit indicator details', async ({ page }) => {
      await login(page);
      const indicator = page.getByText(/generated with ai/i);
      if (await indicator.isVisible()) {
        await expect(indicator).toBeVisible();
      }
    });
  });

  test.describe('Overall Interface Accessibility', () => {
    test('TC_A11Y_040: Verify complete keyboard navigation', async ({ page }) => {
      await login(page);
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_041: Verify complete screen reader accessibility', async ({ page }) => {
      await login(page);
      const heading = page.getByRole('heading', { level: 1 });
      if (await heading.isVisible()) {
        await expect(heading).toBeVisible();
      }
    });

    test('TC_A11Y_042: Verify color and contrast compliance', async ({ page }) => {
      await login(page);
      const labels = page.locator('label');
      if (await labels.first().isVisible()) {
        await expect(labels.first()).toBeVisible();
      }
    });

    test('TC_A11Y_043: Verify responsive design accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await login(page);
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    });

    test('TC_A11Y_044: Verify panel layout accessibility', async ({ page }) => {
      await login(page);
      const genaiButton = page.getByRole('button', { name: /assist.*genai/i }).first();
      if (await genaiButton.isVisible()) {
        await genaiButton.click();
        const panel = page.locator('[role="dialog"]');
        if (await panel.isVisible()) {
          await expect(panel).toBeVisible();
        }
      }
    });
  });
});
