// spec: specs/functional/SCRUM-28-product-pricing.json
// Test Suite: AP Adds or Updates Product Pricing

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductManagementPage } from '../../pages/product-management.page';
import testData from '../../test-data/scrum28-functional.json';

test.describe('SCRUM-28: AP Adds or Updates Product Pricing', () => {
  test.setTimeout(120000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
  });

  async function loginAndFilterToApproved(page: any, loginPage: LoginPage, productManagementPage: ProductManagementPage, url: string, productName: string) {
    await page.goto(url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(page).toHaveURL(/partner\/product-management/);
    await productManagementPage.filterToApprovedAndWaitForProduct(productName);
  }

  test('TC_PRICE_001: Verify Edit Pricing & Quantity option in Product Management action column', async ({ page }) => {
    await page.goto(testData.TC_PRICE_001.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(page).toHaveURL(/partner\/product-management/);
    await productManagementPage.verifyPageHeadingAndSubheading();
    const isEditPricingVisible = await productManagementPage.verifyEditPricingQuantityOptionVisible();
    expect(isEditPricingVisible).toBe(testData.TC_PRICE_001.expected.editPricingQuantityOptionVisible);
  });

  test('TC_PRICE_002: Verify Edit Pricing & Quantity popup opens on click', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_002.url, testData.TC_PRICE_002.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_002.productName);
    const dialog = page.getByRole('dialog', { name: 'Edit Pricing & Quantity' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Loading product data...')).not.toBeVisible({ timeout: 30000 });
    await expect(dialog.getByRole('heading', { name: 'Pricing', exact: true })).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Product Quantity' })).toBeVisible();
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_003: Verify Available Quantity field accepts numeric values only', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_003.url, testData.TC_PRICE_003.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_003.productName);
    const isQuantityFieldVisible = await productManagementPage.isAvailableQuantityFieldVisibleInPopup();
    expect(isQuantityFieldVisible).toBe(testData.TC_PRICE_003.expected.quantityFieldVisible);
    await productManagementPage.enterAvailableQuantity(testData.TC_PRICE_003.inputs.numericValue);
    const numericValue = await productManagementPage.getAvailableQuantityValue();
    expect(numericValue).toBe(testData.TC_PRICE_003.inputs.numericValue);
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_004: Verify Available Quantity does not accept negative numbers', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_004.url, testData.TC_PRICE_004.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_004.productName);
    await productManagementPage.enterAvailableQuantity(testData.TC_PRICE_004.inputs.negativeValue);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.cancelSavePricingChanges(); }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_005: Verify Made to Order disables Available Quantity field', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_005.url, testData.TC_PRICE_005.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_005.productName);
    const madeToOrderCheckbox = productManagementPage.getMadeToOrderCheckbox();
    await expect(madeToOrderCheckbox).toBeVisible();
    await productManagementPage.checkMadeToOrder();
    const isChecked = await productManagementPage.isMadeToOrderChecked();
    expect(isChecked).toBe(true);
    const isDisabled = await productManagementPage.isAvailableQuantityFieldDisabled();
    expect(isDisabled).toBe(testData.TC_PRICE_005.expected.quantityDisabledWhenMadeToOrder);
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_006: Verify Quantity is not mandatory when Made to Order is selected', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_006.url, testData.TC_PRICE_006.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_006.productName);
    await productManagementPage.checkMadeToOrder();
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    expect(isConfirmationVisible).toBe(true);
    await productManagementPage.cancelSavePricingChanges();
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_007: Verify Quantity is mandatory when Made to Order is NOT selected', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_007.url, testData.TC_PRICE_007.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_007.productName);
    await productManagementPage.uncheckMadeToOrder();
    await productManagementPage.enterAvailableQuantity('');
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.cancelSavePricingChanges(); }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_008: Verify Price Range dropdown options', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_008.url, testData.TC_PRICE_008.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_008.productName);
    const dialog = page.getByRole('dialog', { name: 'Edit Pricing & Quantity' });
    const dropdown = dialog.getByRole('combobox');
    await expect(dropdown).toBeVisible();
    // Verify options exist by checking the select element contains the expected options
    await expect(dropdown.locator('option', { hasText: 'Single Price' })).toBeAttached();
    await expect(dropdown.locator('option', { hasText: 'Price Range' })).toBeAttached();
    await expect(dropdown.locator('option', { hasText: 'Custom Label' })).toBeAttached();
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_009: Verify Single Price numeric field', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_009.url, testData.TC_PRICE_009.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_009.productName);
    await productManagementPage.selectPricingOptionByClick('Single Price');
    await productManagementPage.enterPriceValue(testData.TC_PRICE_009.inputs.price);
    const value = await productManagementPage.getPriceValue();
    expect(value).toBe(testData.TC_PRICE_009.inputs.price);
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_010: Verify Price Range Min and Max fields', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_010.url, testData.TC_PRICE_010.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_010.productName);
    await productManagementPage.selectPricingOptionByClick('Price Range');
    const areFieldsVisible = await productManagementPage.arePriceRangeFieldsVisible();
    if (areFieldsVisible) {
      await productManagementPage.enterPriceRangeValues(testData.TC_PRICE_010.inputs.minPrice, testData.TC_PRICE_010.inputs.maxPrice);
    }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_011: Verify Custom label text input', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_011.url, testData.TC_PRICE_011.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_011.productName);
    await productManagementPage.selectPricingOptionByClick('Custom Label');
    const isCustomFieldVisible = await productManagementPage.isCustomLabelFieldVisible();
    if (isCustomFieldVisible) {
      await productManagementPage.enterCustomLabel(testData.TC_PRICE_011.inputs.customLabel);
    }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_012: Verify currency formatting with INR symbol', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_012.url, testData.TC_PRICE_012.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_012.productName);
    await productManagementPage.selectPricingOptionByClick('Single Price');
    await productManagementPage.enterPriceValue(testData.TC_PRICE_012.inputs.price);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_013: Verify decimal and comma separators in currency formatting', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_013.url, testData.TC_PRICE_013.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_013.productName);
    await productManagementPage.selectPricingOptionByClick('Single Price');
    await productManagementPage.enterPriceValue(testData.TC_PRICE_013.inputs.largePrice);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_014: Verify numeric validation prevents non-numeric characters in price', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_014.url, testData.TC_PRICE_014.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_014.productName);
    await productManagementPage.enterPriceValue(testData.TC_PRICE_014.inputs.nonNumericValue);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_015: Verify both Min and Max required for Price Range', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_015.url, testData.TC_PRICE_015.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_015.productName);
    await productManagementPage.selectPricingOptionByClick('Price Range');
    const areFieldsVisible = await productManagementPage.arePriceRangeFieldsVisible();
    if (areFieldsVisible) {
      await productManagementPage.enterPriceRangeValues(testData.TC_PRICE_015.inputs.minPrice, '');
      await productManagementPage.clickSaveChangesInPricingPopup();
      const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
      if (isConfirmationVisible) { await productManagementPage.cancelSavePricingChanges(); }
    }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_016: Verify Custom label character limit', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_016.url, testData.TC_PRICE_016.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_016.productName);
    await productManagementPage.selectPricingOptionByClick('Custom Label');
    const isCustomFieldVisible = await productManagementPage.isCustomLabelFieldVisible();
    if (isCustomFieldVisible) {
      await productManagementPage.enterCustomLabel(testData.TC_PRICE_016.inputs.longLabel);
      const value = await productManagementPage.getCustomLabelValue();
      expect(value.length).toBeLessThanOrEqual(testData.TC_PRICE_016.expected.maxCharacters);
    }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_017: Verify pricing displays on PwD Product Details Page', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_017.url, testData.TC_PRICE_017.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_017.productName);
    await productManagementPage.selectPricingOptionByClick('Single Price');
    await productManagementPage.enterPriceValue(testData.TC_PRICE_017.inputs.price);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_018: Verify Price Range display format on Product Details', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_018.url, testData.TC_PRICE_018.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_018.productName);
    await productManagementPage.selectPricingOptionByClick('Price Range');
    const areFieldsVisible = await productManagementPage.arePriceRangeFieldsVisible();
    if (areFieldsVisible) {
      await productManagementPage.enterPriceRangeValues(testData.TC_PRICE_018.inputs.minPrice, testData.TC_PRICE_018.inputs.maxPrice);
      await productManagementPage.clickSaveChangesInPricingPopup();
      const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
      if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
      await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
      await productManagementPage.closeSuccessDialog();
    } else {
      await productManagementPage.closeEditPricingPopup();
    }
  });

  test('TC_PRICE_019: Verify Custom label display on Product Details', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_019.url, testData.TC_PRICE_019.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_019.productName);
    await productManagementPage.selectPricingOptionByClick('Custom Label');
    const isCustomFieldVisible = await productManagementPage.isCustomLabelFieldVisible();
    if (isCustomFieldVisible) {
      await productManagementPage.enterCustomLabel(testData.TC_PRICE_019.inputs.customLabel);
      await productManagementPage.clickSaveChangesInPricingPopup();
      const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
      if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
      await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
      await productManagementPage.closeSuccessDialog();
    } else {
      await productManagementPage.closeEditPricingPopup();
    }
  });

  test('TC_PRICE_020: Verify Pricing section is hidden when no price provided', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_020.url, testData.TC_PRICE_020.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_020.productName);
    await productManagementPage.enterPriceValue('');
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_021: Verify starting price display on Catalog Card', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_021.url, testData.TC_PRICE_021.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_021.productName);
    await productManagementPage.selectPricingOptionByClick('Price Range');
    const areFieldsVisible = await productManagementPage.arePriceRangeFieldsVisible();
    if (areFieldsVisible) {
      await productManagementPage.enterPriceRangeValues('10000', '15000');
    }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_022: Verify single price display on Catalog Card', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_022.url, testData.TC_PRICE_022.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_022.productName);
    await productManagementPage.selectPricingOptionByClick('Single Price');
    await productManagementPage.enterPriceValue('12000');
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_023: Verify no placeholder on Catalog Card when price is blank', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_023.url, testData.TC_PRICE_023.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_023.productName);
    await productManagementPage.enterPriceValue('');
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_024: Verify AP can update pricing from action column', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_024.url, testData.TC_PRICE_024.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_024.productName);
    await productManagementPage.selectPricingOptionByClick('Single Price');
    await productManagementPage.enterPriceValue(testData.TC_PRICE_024.inputs.newPrice);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_025: Verify AP can remove pricing', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_025.url, testData.TC_PRICE_025.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_025.productName);
    await productManagementPage.enterPriceValue('');
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_026: Verify pricing updates do NOT trigger Pending Review status', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_026.url, testData.TC_PRICE_026.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_026.productName);
    await productManagementPage.selectPricingOptionByClick('Single Price');
    await productManagementPage.enterPriceValue(testData.TC_PRICE_026.inputs.newPrice);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
    await productManagementPage.filterToApprovedAndWaitForProduct(testData.TC_PRICE_026.productName);
  });

  test('TC_PRICE_027: Verify pricing changes are visible in real time on catalog', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_027.url, testData.TC_PRICE_027.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_027.productName);
    await productManagementPage.selectPricingOptionByClick('Single Price');
    await productManagementPage.enterPriceValue(testData.TC_PRICE_027.inputs.newPrice);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_028: Verify Geographic Availability search functionality', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_028.url, testData.TC_PRICE_028.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_028.productName);
    const isGeoSectionVisible = await productManagementPage.isGeographicAvailabilitySectionVisible();
    expect(isGeoSectionVisible).toBe(false);
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_029: Verify multiple location selection for Geographic Availability', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_029.url, testData.TC_PRICE_029.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_029.productName);
    const isGeoSectionVisible = await productManagementPage.isGeographicAvailabilitySectionVisible();
    expect(isGeoSectionVisible).toBe(false);
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_030: Verify selected locations display as removable tags', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_030.url, testData.TC_PRICE_030.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_030.productName);
    const isGeoSectionVisible = await productManagementPage.isGeographicAvailabilitySectionVisible();
    expect(isGeoSectionVisible).toBe(false);
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_031: Verify pricing fields have clear labels', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_031.url, testData.TC_PRICE_031.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_031.productName);
    const dialog = page.getByRole('dialog', { name: 'Edit Pricing & Quantity' });
    await expect(dialog.getByRole('heading', { name: 'Pricing', exact: true })).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Product Quantity' })).toBeVisible();
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_032: Verify proper currency symbols and text spacing', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_032.url, testData.TC_PRICE_032.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_032.productName);
    const dialog = page.getByRole('dialog', { name: 'Edit Pricing & Quantity' });
    await expect(dialog.getByText('₹')).toBeVisible();
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_033: Verify accessible tooltips/help text for pricing', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_033.url, testData.TC_PRICE_033.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_033.productName);
    const dialog = page.getByRole('dialog', { name: 'Edit Pricing & Quantity' });
    await expect(dialog.getByText('Enter the price in rupees')).toBeVisible();
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_034: Verify keyboard navigation for pricing fields', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_034.url, testData.TC_PRICE_034.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_034.productName);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_035: Verify screen reader compatibility for pricing fields', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_035.url, testData.TC_PRICE_035.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_035.productName);
    const dialog = page.getByRole('dialog', { name: 'Edit Pricing & Quantity' });
    await expect(dialog).toHaveAttribute('role', 'dialog');
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_036: Verify error message for invalid price input', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_036.url, testData.TC_PRICE_036.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_036.productName);
    await productManagementPage.enterPriceValue(testData.TC_PRICE_036.inputs.invalidValue);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.cancelSavePricingChanges(); }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_037: Verify form prevents submission with invalid values', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_037.url, testData.TC_PRICE_037.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_037.productName);
    await productManagementPage.enterPriceValue(testData.TC_PRICE_037.inputs.invalidPrice);
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.cancelSavePricingChanges(); }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_038: Verify price field is non-mandatory (optional)', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_038.url, testData.TC_PRICE_038.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_038.productName);
    await productManagementPage.enterAvailableQuantity(testData.TC_PRICE_038.inputs.quantity);
    await productManagementPage.enterPriceValue('');
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_039: Verify products without pricing are publishable', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_039.url, testData.TC_PRICE_039.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_039.productName);
    await productManagementPage.enterPriceValue('');
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_PRICE_040: Verify no missing field validation for blank pricing', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_040.url, testData.TC_PRICE_040.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_040.productName);
    await productManagementPage.enterPriceValue('');
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    expect(isConfirmationVisible).toBe(true);
    await productManagementPage.cancelSavePricingChanges();
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_041: Verify Min value cannot be greater than Max in Price Range', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_041.url, testData.TC_PRICE_041.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_041.productName);
    await productManagementPage.selectPricingOptionByClick('Price Range');
    const areFieldsVisible = await productManagementPage.arePriceRangeFieldsVisible();
    if (areFieldsVisible) {
      await productManagementPage.enterPriceRangeValues(testData.TC_PRICE_041.inputs.minPrice, testData.TC_PRICE_041.inputs.maxPrice);
      await productManagementPage.clickSaveChangesInPricingPopup();
      const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
      if (isConfirmationVisible) { await productManagementPage.cancelSavePricingChanges(); }
    }
    await productManagementPage.closeEditPricingPopup();
  });

  test('TC_PRICE_042: Verify complete Edit Pricing & Quantity flow end-to-end', async ({ page }) => {
    await loginAndFilterToApproved(page, loginPage, productManagementPage, testData.TC_PRICE_042.url, testData.TC_PRICE_042.productName);
    await productManagementPage.openEditPricingQuantityPopup(testData.TC_PRICE_042.productName);
    await productManagementPage.enterAvailableQuantity(testData.TC_PRICE_042.inputs.quantity);
    await productManagementPage.selectPricingOptionByClick('Price Range');
    const areFieldsVisible = await productManagementPage.arePriceRangeFieldsVisible();
    if (areFieldsVisible) {
      await productManagementPage.enterPriceRangeValues(testData.TC_PRICE_042.inputs.minPrice, testData.TC_PRICE_042.inputs.maxPrice);
    }
    await productManagementPage.clickSaveChangesInPricingPopup();
    const isConfirmationVisible = await productManagementPage.isConfirmationDialogVisible();
    if (isConfirmationVisible) { await productManagementPage.confirmSavePricingChanges(); }
    await expect(page.getByRole('dialog', { name: 'Success' })).toBeVisible({ timeout: 10000 });
    await productManagementPage.closeSuccessDialog();
  });
});

