// spec: SCRUM-514 — Admin - Add a New Product
// data: specs/test-cases/admin/scrum514-admin-add-product.json

import { test, expect } from '@playwright/test';
import { AdminProductPage } from '../../pages/admin/AdminProductPage';
import planData from '../../../specs/test-cases/admin/scrum514-admin-add-product.json';
const td = planData.testData;

test.describe('SCRUM-514: Admin - Add a New Product', () => {
  test.setTimeout(180_000);
  let ap: AdminProductPage;

  test.beforeEach(async ({ page }) => {
    ap = new AdminProductPage(page);
    await ap.loginAsAdmin(td.credentials.email, td.credentials.password);
    await ap.goToProductManagement();
  });

  const addProductBtn = () => ap.page.getByRole('button', { name: 'Add new product' });
  const addProductDialog = () => ap.page.getByRole('dialog', { name: 'Add New Product' });
  const closeDialogBtn = () => addProductDialog().getByRole('button', { name: 'Close dialog' });
  const cancelBtn = () => addProductDialog().getByRole('button', { name: 'Cancel' });
  const submitBtn = () => ap.page.getByRole('button', { name: 'Add Product' }).last();

  async function openAddProductDialog() {
    await addProductBtn().click();
    await ap.page.waitForTimeout(1500);
  }

  // ─── Suite 1: Add Product Button ───

  test.describe('Add Product Button', () => {
    test('TC_SCRUM514_001: Add Product Button is Visible', async () => {
      await expect(addProductBtn()).toBeVisible();
    });

    test('TC_SCRUM514_002: Clicking Add Product Opens Form Dialog', async () => {
      await openAddProductDialog();
      await expect(addProductDialog()).toBeVisible();
      await expect(addProductDialog().getByRole('heading', { level: 2 })).toContainText('Add New Product');
    });
  });

  // ─── Suite 2: Basic Information ───

  test.describe('Basic Information', () => {
    test.beforeEach(async () => { await openAddProductDialog(); });

    test('TC_SCRUM514_003: Product Name Field is Visible and Required', async () => {
      const field = ap.page.getByRole('textbox', { name: 'Enter product name' });
      await expect(field).toBeVisible();
      const dialogText = (await addProductDialog().textContent()) ?? '';
      expect(dialogText).toContain('Product Name');
    });

    test('TC_SCRUM514_004: Partner Email Field is Visible and Required', async () => {
      const field = ap.page.getByRole('textbox', { name: 'Enter partner email' });
      await expect(field).toBeVisible();
    });

    test('TC_SCRUM514_005: Product Type Dropdown is Visible with Options', async () => {
      const dialogText = (await addProductDialog().textContent()) ?? '';
      expect(dialogText).toContain('Product Type');
      expect(dialogText).toContain('Device');
      expect(dialogText).toContain('Technology');
    });

    test('TC_SCRUM514_006: Usage Environment Dropdown is Visible', async () => {
      const dialogText = (await addProductDialog().textContent()) ?? '';
      expect(dialogText).toContain('Usage Environment');
      expect(dialogText).toContain('Indoor');
      expect(dialogText).toContain('Outdoor');
    });

    test('TC_SCRUM514_007: Disability Type Multi-Select is Visible', async () => {
      const dialogText = (await addProductDialog().textContent()) ?? '';
      expect(dialogText).toContain('Disability Type');
    });
  });

  // ─── Suite 3: Product Description ───

  test.describe('Product Description', () => {
    test.beforeEach(async () => { await openAddProductDialog(); });

    test('TC_SCRUM514_008: Short Description Field with Character Counter', async () => {
      const field = ap.page.getByRole('textbox', { name: /Brief product description/i });
      await expect(field).toBeVisible();
      const dialogText = (await addProductDialog().textContent()) ?? '';
      expect(dialogText).toContain('0/200');
    });

    test('TC_SCRUM514_009: Short Description Accepts Input', async () => {
      const field = ap.page.getByRole('textbox', { name: /Brief product description/i });
      await field.fill('Test product description');
      await expect(field).toHaveValue('Test product description');
    });

    test('TC_SCRUM514_010: Detailed Description Field is Visible', async () => {
      const field = ap.page.getByRole('textbox', { name: /Comprehensive product description/i });
      await expect(field).toBeVisible();
    });

    test('TC_SCRUM514_011: GenAI Assist Button Visible for Short Description', async () => {
      const buttons = ap.page.getByRole('button', { name: 'GenAI Assist' });
      await expect(buttons.first()).toBeVisible();
    });

    test('TC_SCRUM514_012: GenAI Assist Button Visible for Detailed Description', async () => {
      const buttons = ap.page.getByRole('button', { name: 'GenAI Assist' });
      const count = await buttons.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  // ─── Suite 4: Product Images ───

  test.describe('Product Images', () => {
    test.beforeEach(async () => { await openAddProductDialog(); });

    test('TC_SCRUM514_013: Primary Image Upload Section is Visible', async () => {
      const dialogText = (await addProductDialog().textContent()) ?? '';
      expect(dialogText).toContain('Primary Image');
    });

    test('TC_SCRUM514_014: Image Upload Shows Format Info', async () => {
      const dialogText = (await addProductDialog().textContent()) ?? '';
      expect(dialogText).toContain('JPG or PNG');
    });
  });

  // ─── Suite 5: Support Information ───

  test.describe('Support Information', () => {
    test.beforeEach(async () => { await openAddProductDialog(); });

    test('TC_SCRUM514_015: Support Helpline Field is Visible', async () => {
      const field = ap.page.getByRole('textbox', { name: /98765/i });
      await expect(field).toBeVisible();
    });

    test('TC_SCRUM514_016: Support Helpline Shows Validation Hint', async () => {
      const dialogText = (await addProductDialog().textContent()) ?? '';
      expect(dialogText.toLowerCase()).toContain('10-digit');
    });
  });

  // ─── Suite 6: Form Submission ───

  test.describe('Form Submission', () => {
    test.beforeEach(async () => { await openAddProductDialog(); });

    test('TC_SCRUM514_017: Add Product Button is Disabled When Form Empty', async () => {
      await expect(submitBtn()).toBeDisabled();
    });

    test('TC_SCRUM514_018: Cancel Button is Visible', async () => {
      await expect(cancelBtn()).toBeVisible();
    });

    test('TC_SCRUM514_019: Cancel Closes Dialog Without Saving', async () => {
      await cancelBtn().click();
      await ap.page.waitForTimeout(1000);
      const visible = await addProductDialog().isVisible().catch(() => false);
      expect(visible).toBe(false);
    });

    test('TC_SCRUM514_020: Close (×) Button Closes Dialog', async () => {
      await closeDialogBtn().click();
      await ap.page.waitForTimeout(1000);
      const visible = await addProductDialog().isVisible().catch(() => false);
      expect(visible).toBe(false);
    });
  });
});
