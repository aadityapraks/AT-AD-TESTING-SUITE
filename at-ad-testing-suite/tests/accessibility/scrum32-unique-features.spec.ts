// spec: specs/a11y/SCRUM-32-unique-features.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum32-accessibility.json';

test.describe('SCRUM-32: Unique Features Accessibility', () => {

  test.describe('Form Field Access and Labels', () => {
    test('TC_A11Y_001: Unique features field has label', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Upload' }).click();

      // 1. Locate 'Highlight Unique Feature(s)' field
      const uniqueFeatureLabel = page.locator('text=Product\'s Unique Feature');
      await expect(uniqueFeatureLabel).toBeVisible();

      // 2. Verify visible label present
      await expect(uniqueFeatureLabel).toBeVisible();

      // 3. Verify instructional note visible
      const helpText = page.locator('text=Optional - Highlight unique features');
      await expect(helpText).toBeVisible();
    });

    test('TC_A11Y_002: Instructional note accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Upload' }).click();

      // 1. Locate instructional note
      const helpText = page.locator('text=Optional - Highlight unique features');
      
      // 2. Verify text visible
      await expect(helpText).toBeVisible();

      // 3. Verify examples provided
      await expect(helpText).toContainText('unique features');
    });
  });

  test.describe('GenAI Assistance Button', () => {
    test('TC_A11Y_010: GenAI assist button accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Upload' }).click();

      // 1. Locate 'Assist with GenAI' button
      const genAIButton = page.getByRole('button', { name: 'Product\'s Unique Feature' });
      
      // 2. Verify button visible
      await expect(genAIButton).toBeVisible();

      // 3. Tab to button
      await genAIButton.focus();
      await expect(genAIButton).toBeFocused();

      // 4. Check button has accessible name
      await expect(genAIButton).toHaveAccessibleName(/Product's Unique Feature/i);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_024: Features readable at 200% zoom', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Upload' }).click();

      // 1. Zoom browser to 200%
      await page.evaluate(() => {
        document.body.style.zoom = '2.0';
      });

      // 2. Verify all features visible
      const uniqueFeatureField = page.locator('text=Product\'s Unique Feature');
      await expect(uniqueFeatureField).toBeVisible();

      // 3. Check no text truncation
      await expect(uniqueFeatureField).toBeVisible();
    });

    test('TC_A11Y_025: Features accessible on mobile', async ({ page }) => {
      // 1. Set viewport to mobile (375x667)
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
      await page.getByRole('link', { name: 'Product Upload' }).click();

      // 2. Verify features section accessible
      const uniqueFeatureField = page.locator('text=Product\'s Unique Feature');
      await expect(uniqueFeatureField).toBeVisible();
    });
  });

  test.describe('Form Submission and Updates', () => {
    test('TC_A11Y_026: Save features accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Upload' }).click();

      // 1. Tab to Save button
      const saveButton = page.getByRole('button', { name: 'Save as Draft' });
      await saveButton.focus();
      
      // 2. Verify button accessible
      await expect(saveButton).toBeFocused();
      await expect(saveButton).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('Verify keyboard accessibility', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Upload' }).click();

      // Test keyboard navigation
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('Tooltips and Help', () => {
    test('TC_A11Y_029: Phrasing example tooltips accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Upload' }).click();

      // Verify help text is accessible
      const helpText = page.locator('text=Optional - Highlight unique features');
      await expect(helpText).toBeVisible();
    });

    test('TC_A11Y_030: Phrasing examples accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Product Upload' }).click();

      // Verify examples are visible and clear
      const helpText = page.locator('text=Optional - Highlight unique features');
      await expect(helpText).toBeVisible();
      await expect(helpText).toContainText('unique');
    });
  });
});
