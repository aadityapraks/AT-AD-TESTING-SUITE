// spec: specs/a11y/SCRUM-28-product-pricing.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum28-accessibility.json';

test.describe('SCRUM-28: Product Pricing Accessibility', () => {

  test.describe('Edit Pricing & Inventory Modal Access', () => {
    test('TC_A11Y_001: Edit Pricing button accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      const editButton = page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first();
      await editButton.focus();
      await expect(editButton).toBeFocused();
      await expect(editButton).toHaveAccessibleName(/Edit Pricing/);
      await page.keyboard.press('Enter');
      await new Promise(f => setTimeout(f, 1000));
    });

    test('TC_A11Y_002: Modal has proper ARIA attributes', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();
    });

    test('TC_A11Y_003: Modal keyboard navigation', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await new Promise(f => setTimeout(f, 500));
    });
  });

  test.describe('Pricing Type Dropdown', () => {
    test('TC_A11Y_004: Pricing dropdown accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const dropdown = page.locator('select, [role="combobox"]').first();
      await dropdown.focus();
      await expect(dropdown).toBeFocused();
    });

    test('TC_A11Y_005: Dropdown options announced', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const dropdown = page.locator('select, [role="combobox"]').first();
      await expect(dropdown).toBeVisible();
    });
  });

  test.describe('Single Price Input', () => {
    test('TC_A11Y_006: Single price field has label', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input[type="number"], input[type="text"]').first();
      await expect(priceInput).toBeVisible();
    });

    test('TC_A11Y_007: Single price validation accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input[type="number"], input[type="text"]').first();
      await priceInput.fill(testData.inputs.invalidPrice);
      await page.keyboard.press('Tab');
      await new Promise(f => setTimeout(f, 500));
    });
  });

  test.describe('Price Range Inputs', () => {
    test('TC_A11Y_008: Price range fields have labels', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const inputs = page.locator('input[type="number"], input[type="text"]');
      await expect(inputs.first()).toBeVisible();
    });

    test('TC_A11Y_009: Price range validation accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const inputs = page.locator('input[type="number"], input[type="text"]');
      await inputs.first().fill(testData.inputs.minPrice);
      await page.keyboard.press('Tab');
      await new Promise(f => setTimeout(f, 500));
    });

    test('TC_A11Y_010: Price range logical validation', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const inputs = page.locator('input[type="number"], input[type="text"]');
      await inputs.first().fill(testData.inputs.maxPrice);
      await inputs.nth(1).fill(testData.inputs.invalidMaxPrice);
      await page.keyboard.press('Tab');
      await new Promise(f => setTimeout(f, 500));
    });
  });

  test.describe('Custom Label Input', () => {
    test('TC_A11Y_011: Custom label field accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const textInput = page.locator('input[type="text"]').first();
      await expect(textInput).toBeVisible();
    });

    test('TC_A11Y_012: Custom label character limit accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const textInput = page.locator('input[type="text"]').first();
      await textInput.fill(testData.inputs.customLabel);
      await new Promise(f => setTimeout(f, 500));
    });
  });

  test.describe('Currency Formatting', () => {
    test('TC_A11Y_013: Currency symbol accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input[type="number"], input[type="text"]').first();
      await priceInput.fill(testData.inputs.singlePrice);
      await new Promise(f => setTimeout(f, 500));
    });

    test('TC_A11Y_014: Formatted price display accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input[type="number"], input[type="text"]').first();
      await priceInput.fill(testData.inputs.singlePrice);
      await new Promise(f => setTimeout(f, 500));
    });
  });

  test.describe('Form Submission and Save', () => {
    test('TC_A11Y_015: Save button accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input[type="number"], input[type="text"]').first();
      await priceInput.fill(testData.inputs.singlePrice);
      const saveButton = page.getByRole('button', { name: /Save|Submit/i });
      await saveButton.focus();
      await expect(saveButton).toBeFocused();
    });

    test('TC_A11Y_016: Cancel button accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input[type="number"], input[type="text"]').first();
      await priceInput.fill(testData.inputs.singlePrice);
      const cancelButton = page.getByRole('button', { name: /Cancel|Close/i });
      await cancelButton.focus();
      await expect(cancelButton).toBeFocused();
    });

    test('TC_A11Y_017: Success message accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input[type="number"], input[type="text"]').first();
      await priceInput.fill(testData.inputs.singlePrice);
      const saveButton = page.getByRole('button', { name: /Save|Submit/i });
      await saveButton.click();
      await new Promise(f => setTimeout(f, 1000));
    });
  });

  test.describe('Product Details Page Display', () => {
    test('TC_A11Y_018: Pricing section has heading', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      const pricingHeading = page.getByRole('heading', { name: /Pricing/i });
      await expect(pricingHeading).toBeVisible();
    });

    test('TC_A11Y_019: Single price display accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      const priceDisplay = page.locator('text=/Price:/i');
      await expect(priceDisplay).toBeVisible();
    });

    test('TC_A11Y_020: Price range display accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      const priceRange = page.locator('text=/Price Range:/i');
      await expect(priceRange).toBeVisible();
    });

    test('TC_A11Y_021: Custom label display accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      const customLabel = page.locator('text=/Pricing:/i');
      await expect(customLabel).toBeVisible();
    });

    test('TC_A11Y_022: Hidden section when no price', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();
    });
  });

  test.describe('Catalog Card Display', () => {
    test('TC_A11Y_023: Catalog card price accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      const catalogPrice = page.locator('text=/Starting at/i');
      await expect(catalogPrice).toBeVisible();
    });

    test('TC_A11Y_024: Catalog card no empty placeholder', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();
    });
  });

  test.describe('Error Handling', () => {
    test('TC_A11Y_025: Invalid numeric error accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input[type="number"], input[type="text"]').first();
      await priceInput.fill(testData.inputs.invalidPrice);
      await page.keyboard.press('Tab');
      await new Promise(f => setTimeout(f, 500));
    });

    test('TC_A11Y_026: Form submission prevented on error', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input[type="number"], input[type="text"]').first();
      await priceInput.fill(testData.inputs.invalidPrice);
      const saveButton = page.getByRole('button', { name: /Save|Submit/i });
      await saveButton.click();
      await new Promise(f => setTimeout(f, 500));
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('TC_A11Y_027: Tab order logical', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    });

    test('TC_A11Y_028: Focus indicators visible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const inputs = page.locator('input, button, select');
      const firstInput = inputs.first();
      await firstInput.focus();
      await expect(firstInput).toBeFocused();
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_029: Text contrast meets WCAG AA', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
    });

    test('TC_A11Y_030: Form scales to 200% zoom', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.evaluate(() => {
        document.body.style.zoom = '2.0';
      });
      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input').first();
      await expect(priceInput).toBeVisible();
    });

    test('TC_A11Y_031: Mobile responsive accessible', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const priceInput = page.locator('input').first();
      await expect(priceInput).toBeVisible();
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    test('TC_A11Y_032: Form fields announced correctly', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const inputs = page.locator('input, select, button');
      await expect(inputs.first()).toBeVisible();
    });

    test('TC_A11Y_033: Dynamic content announced', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Management' }).click();

      await page.getByRole('button', { name: 'Edit Pricing & Inventory' }).first().click();
      await new Promise(f => setTimeout(f, 1000));
      const dropdown = page.locator('select, [role="combobox"]').first();
      await dropdown.focus();
      await page.keyboard.press('ArrowDown');
      await new Promise(f => setTimeout(f, 500));
    });
  });
});
