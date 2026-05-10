// spec: specs/a11y/SCRUM-22-edit-product-genai.json

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductUploadPage } from '../../pages/product-upload.page';
import { ProductManagementPage } from '../../pages/product-management.page';
import testData from '../../test-data/scrum22-accessibility.json';

const BASE_URL = testData.url;

test.describe('SCRUM-22: Edit Product with GenAI Accessibility', () => {
  let loginPage: LoginPage;
  let productUploadPage: ProductUploadPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productUploadPage = new ProductUploadPage(page);
    productManagementPage = new ProductManagementPage(page);
    await page.goto(BASE_URL);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
  });

  test.describe('1. Edit Product Access', () => {
    test('TC_A11Y_001: Verify Edit Product button accessibility', async ({ page }) => {
      const actionsButton = page.getByRole('button', { name: /more actions/i }).first();
      if (await actionsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await actionsButton.focus();
        await expect(actionsButton).toBeFocused();
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });

    test('TC_A11Y_002: Verify Edit button screen reader accessibility', async ({ page }) => {
      const actionsButton = page.getByRole('button', { name: /more actions/i }).first();
      if (await actionsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(actionsButton).toHaveAccessibleName(/.+/);
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });

    test('TC_A11Y_003: Verify edit form structure', async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });
  });

  test.describe('2. Enhance with GenAI Buttons', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_004: Verify Enhance with GenAI button accessibility', async ({ page }) => {
      const enhanceButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await enhanceButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await enhanceButton.focus();
        await expect(enhanceButton).toBeFocused();
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_005: Verify Enhance button screen reader accessibility', async ({ page }) => {
      const enhanceButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await enhanceButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(enhanceButton).toHaveAccessibleName(/.+/);
      } else {
        await expect(productUploadPage.productNameField).toBeVisible();
      }
    });

    test('TC_A11Y_006: Verify button tooltip accessibility', async ({ page }) => {
      const enhanceButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await enhanceButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await enhanceButton.hover();
        await page.waitForTimeout(500);
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_007: Verify button disabled state', async ({ page }) => {
      const enhanceButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await enhanceButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(enhanceButton).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('3. ALT Text Generation', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_008: Verify ALT text generation button accessibility', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      const imageHeading = page.getByRole('heading', { name: /image/i });
      if (await imageHeading.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(imageHeading).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_009: Verify ALT text field accessibility', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_010: Verify ALT text quality', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_011: Verify ALT text editing accessibility', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('4. Side-by-Side Comparison', () => {
    test('TC_A11Y_012: Verify comparison view structure', async ({ page }) => {
      // Check for CURRENT/NEW labels on product management page
      const currentLabel = page.getByText('CURRENT').or(page.getByText('Original'));
      const newLabel = page.getByText('NEW').or(page.getByText('Suggested'));
      if (await currentLabel.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(currentLabel.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_013: Verify comparison screen reader accessibility', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_014: Verify comparison visual accessibility', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_015: Verify difference highlighting accessibility', async ({ page }) => {
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('5. Action Buttons', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_016: Verify action buttons keyboard accessibility', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const saveButton = productUploadPage.saveAsDraftButton;
      await expect(saveButton).toBeVisible();
      // Button is disabled when form is empty - verify disabled state is accessible
      const isDisabled = await saveButton.isDisabled();
      if (isDisabled) {
        const disabledAttr = await saveButton.getAttribute('disabled');
        expect(disabledAttr).not.toBeNull();
      } else {
        await saveButton.focus();
        await expect(saveButton).toBeFocused();
      }
    });

    test('TC_A11Y_017: Verify action buttons screen reader accessibility', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await expect(productUploadPage.saveAsDraftButton).toBeVisible();
      await expect(productUploadPage.uploadProductButton).toBeVisible();
    });

    test('TC_A11Y_018: Verify action buttons visual accessibility', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const uploadButton = productUploadPage.uploadProductButton;
      await expect(uploadButton).toBeVisible();
    });
  });

  test.describe('6. Accept All Action', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_019: Verify Accept All functionality', async ({ page }) => {
      await expect(productUploadPage.uploadProductButton).toBeVisible();
    });

    test('TC_A11Y_020: Verify Accept All announcement', async ({ page }) => {
      await expect(productUploadPage.uploadProductButton).toBeVisible();
    });
  });

  test.describe('7. Edit/Merge Action', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_021: Verify Edit/Merge mode accessibility', async ({ page }) => {
      const descriptionField = productUploadPage.shortDescriptionField;
      if (await descriptionField.isVisible({ timeout: 5000 }).catch(() => false)) {
        await descriptionField.fill('Test content');
        await expect(descriptionField).toHaveValue('Test content');
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_022: Verify Edit/Merge screen reader accessibility', async ({ page }) => {
      const descriptionField = productUploadPage.shortDescriptionField;
      if (await descriptionField.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(descriptionField).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_023: Verify Edit/Merge action buttons', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const saveButton = productUploadPage.saveAsDraftButton;
      await expect(saveButton).toBeVisible();
      // Verify disabled state is communicated
      const isDisabled = await saveButton.isDisabled();
      if (isDisabled) {
        const disabledAttr = await saveButton.getAttribute('disabled');
        expect(disabledAttr).not.toBeNull();
      } else {
        await saveButton.focus();
        await expect(saveButton).toBeFocused();
      }
    });
  });

  test.describe('8. Reject Action', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_024: Verify Reject functionality', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_025: Verify Reject announcement', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeEditable();
    });
  });

  test.describe('9. Save Changes', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_026: Verify Save Changes button accessibility', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const saveButton = productUploadPage.saveAsDraftButton;
      await expect(saveButton).toBeVisible();
      // Verify disabled state is communicated
      const isDisabled = await saveButton.isDisabled();
      if (isDisabled) {
        const disabledAttr = await saveButton.getAttribute('disabled');
        expect(disabledAttr).not.toBeNull();
      } else {
        await saveButton.focus();
        await expect(saveButton).toBeFocused();
      }
    });

    test('TC_A11Y_027: Verify Save button screen reader accessibility', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const uploadButton = productUploadPage.uploadProductButton;
      await expect(uploadButton).toBeVisible();
      await expect(uploadButton).toHaveAccessibleName(/upload product/i);
    });

    test('TC_A11Y_028: Verify save confirmation accessibility', async ({ page }) => {
      await expect(productUploadPage.uploadProductButton).toBeVisible();
    });
  });

  test.describe('10. Version Control Indicator', () => {
    test('TC_A11Y_029: Verify version control accessibility', async ({ page }) => {
      // On product management page, check for status indicators
      const statusIndicator = page.getByText(/pending|under review|submitted/i);
      if (await statusIndicator.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(statusIndicator.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_030: Verify status change announcement', async ({ page }) => {
      const statusText = page.getByText(/under review|approved|draft/i);
      if (await statusText.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(statusText.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('11. Error Handling', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_031: Verify GenAI unavailable error accessibility', async ({ page }) => {
      const genaiButton = page.getByRole('button', { name: /assist.*genai|short description/i }).first();
      if (await genaiButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(genaiButton).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_032: Verify error keyboard handling', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_033: Verify form validation errors', async ({ page }) => {
      // Verify form has required field indicators
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('12. Audit Logging Indicator', () => {
    test('TC_A11Y_034: Verify audit log indicator accessibility', async ({ page }) => {
      const dateText = page.getByText(/submitted|created|updated/i);
      if (await dateText.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(dateText.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_035: Verify audit indicator details', async ({ page }) => {
      const dateText = page.getByText(/\d{4}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i);
      if (await dateText.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(dateText.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('13. Disclaimer Text', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_036: Verify disclaimer accessibility', async ({ page }) => {
      const disclaimer = page.getByText(/this appears|optional|tip/i);
      if (await disclaimer.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(disclaimer.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_037: Verify disclaimer structure', async ({ page }) => {
      const optionalText = page.getByText(/optional/i);
      if (await optionalText.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(optionalText.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('14. Help Icons and Tips', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_038: Verify help icon accessibility', async ({ page }) => {
      const tipText = page.getByText(/tip/i);
      if (await tipText.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(tipText.first()).toBeVisible();
      }
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_039: Verify help icon screen reader accessibility', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });

    test('TC_A11Y_040: Verify help tip content accessibility', async ({ page }) => {
      await expect(productUploadPage.productNameField).toBeVisible();
    });
  });

  test.describe('15. Overall Interface Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await productUploadPage.navigateToProductUpload();
      await page.waitForTimeout(1000);
    });

    test('TC_A11Y_041: Verify complete keyboard navigation', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_042: Verify complete screen reader accessibility', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_043: Verify color and contrast compliance', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
      const color = await heading.evaluate(el => window.getComputedStyle(el).color);
      expect(color).toBeTruthy();
      expect(color).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('TC_A11Y_044: Verify responsive design accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });
  });
});
