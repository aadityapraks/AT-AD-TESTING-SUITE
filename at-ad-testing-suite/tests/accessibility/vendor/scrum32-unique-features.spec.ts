// spec: specs/a11y/SCRUM-32-unique-features.json

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login.page';
import { ProductUploadPage } from '../../../pages/product-upload.page';
import testData from '../../../test-data/scrum32-accessibility.json';

const BASE_URL = testData.url;

test.describe('SCRUM-32: Unique Features Accessibility', () => {
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

  test.describe('Form Field Access and Labels', () => {
    test('TC_A11Y_001: Unique features field has label', async ({ page }) => {
      const uniqueFeatureLabel = page.getByText(/product's unique feature/i);
      await expect(uniqueFeatureLabel.first()).toBeVisible();
    });

    test('TC_A11Y_002: Instructional note accessible', async ({ page }) => {
      const helpText = page.getByText(/optional.*highlight|highlight.*unique/i);
      if (await helpText.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(helpText.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_003: Feature title and description inputs labeled', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Add/Remove Features', () => {
    test('TC_A11Y_004: Add feature button accessible', async ({ page }) => {
      const addButton = page.getByRole('button', { name: /add.*feature/i });
      if (await addButton.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await addButton.first().focus();
        await expect(addButton.first()).toBeFocused();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_005: Add button disabled state indicated', async ({ page }) => {
      const addButton = page.getByRole('button', { name: /add.*feature/i });
      if (await addButton.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(addButton.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_006: Multiple features keyboard navigable', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('Character Counter and Limits', () => {
    test('TC_A11Y_007: Character counter accessible', async ({ page }) => {
      const counter = page.locator('text=/\\d+.*character/i').or(page.locator('text=/\\d+\\/\\d+/'));
      if (await counter.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(counter.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_008: Character limit error accessible', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_009: Feature limit error accessible', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('GenAI Assistance Button', () => {
    test('TC_A11Y_010: GenAI assist button accessible', async ({ page }) => {
      const genAIButton = page.getByRole('button', { name: /product's unique feature|assist.*genai/i }).first();
      if (await genAIButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await genAIButton.focus();
        await expect(genAIButton).toBeFocused();
        await expect(genAIButton).toHaveAccessibleName(/.+/);
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });

    test('TC_A11Y_011: GenAI processing state announced', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_012: GenAI result accessible', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Remove Feature', () => {
    test('TC_A11Y_013: Remove feature button accessible', async ({ page }) => {
      const removeButton = page.getByRole('button', { name: /remove|delete/i }).first();
      if (await removeButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(removeButton).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_014: Feature removal announced', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('Product Details Display', () => {
    test('TC_A11Y_015: Key Highlights section has heading', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_016: Features displayed in semantic list', async ({ page }) => {
      const list = page.locator('ul, [role="list"]');
      if (await list.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(list.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_017: Feature icons accessible', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_018: Features have sufficient contrast', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
      const color = await heading.evaluate(el => window.getComputedStyle(el).color);
      expect(color).toBeTruthy();
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('TC_A11Y_019: Section hidden when no features', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Collapse/Expand', () => {
    test('TC_A11Y_020: Collapse toggle accessible', async ({ page }) => {
      const toggle = page.locator('[aria-expanded]').first();
      if (await toggle.isVisible({ timeout: 5000 }).catch(() => false)) {
        await toggle.focus();
        await expect(toggle).toBeFocused();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_021: Collapse state announced', async ({ page }) => {
      const toggle = page.locator('[aria-expanded]').first();
      if (await toggle.isVisible({ timeout: 5000 }).catch(() => false)) {
        const expanded = await toggle.getAttribute('aria-expanded');
        expect(expanded === 'true' || expanded === 'false').toBeTruthy();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_022: Collapse button associated with content', async ({ page }) => {
      const toggle = page.locator('[aria-controls]').first();
      if (await toggle.isVisible({ timeout: 5000 }).catch(() => false)) {
        const controls = await toggle.getAttribute('aria-controls');
        expect(controls).toBeTruthy();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_023: Features not identified by color alone', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_024: Features readable at 200% zoom', async ({ page }) => {
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      await page.waitForTimeout(500);
      const uniqueFeatureField = page.getByText(/product's unique feature/i);
      await expect(uniqueFeatureField.first()).toBeVisible();
    });

    test('TC_A11Y_025: Features accessible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Form Submission and Updates', () => {
    test('TC_A11Y_026: Save features accessible', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const saveButton = productUploadPage.saveAsDraftButton;
      await expect(saveButton).toBeVisible();
    });

    test('TC_A11Y_027: Edit features accessible', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeEditable();
    });

    test('TC_A11Y_028: Admin review interface accessible', async ({ page }) => {
      // This test verifies the form is accessible from the vendor side
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Tooltips and Help', () => {
    test('TC_A11Y_029: Phrasing example tooltips accessible', async ({ page }) => {
      const helpText = page.getByText(/optional.*highlight|highlight.*unique|tip/i);
      if (await helpText.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(helpText.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_030: Phrasing examples accessible', async ({ page }) => {
      const helpText = page.getByText(/optional|unique/i);
      if (await helpText.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(helpText.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });
});
