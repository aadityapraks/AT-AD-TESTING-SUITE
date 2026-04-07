// spec: specs/functional/SCRUM-26-external-links.plan.md
// seed: tests/seed/vendor-product-list.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ExternalLinksPage } from '../../pages/external-links.page';
import testData from '../../test-data/scrum26-functional.json';

test.describe('1. Add Link Form Controls', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let externalLinksPage: ExternalLinksPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    externalLinksPage = new ExternalLinksPage(page);
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
  });

  test('TC_LINK_001: Verify Add Link Button and Dropdown Options', async ({ page }) => {
    // 1. Navigate to Product Upload Form
    await externalLinksPage.navigateToProductUpload();

    // 2. Locate Additional Information section
    await externalLinksPage.scrollToAdditionalInfoSection();

    // 3. Verify Add Link button is present and clickable
    await externalLinksPage.verifyAddLinkButtonVisible();

    // 4. Click Add Link button
    await externalLinksPage.clickAddLink();

    // 5. Verify link row appears with Link Type and URL input fields
    await externalLinksPage.verifyDropdownOptions(testData.expected.dropdownOptions);
  });

  test('TC_LINK_002: Add Amazon Purchase Link Field', async ({ page }) => {
    // 1. Navigate to Product Upload Form
    await externalLinksPage.navigateToProductUpload();

    // 2. Scroll to Additional Information section
    await externalLinksPage.scrollToAdditionalInfoSection();

    // 3. Click Add Link button
    await externalLinksPage.clickAddLink();

    // 4. Verify Link Type input field is visible and labelled correctly
    await externalLinksPage.verifyLinkTypeFieldVisible();

    // 5. Verify URL input field is visible
    await externalLinksPage.verifyUrlFieldVisible();

    // 6. Verify Remove button is present (field is optional — can be removed)
    await externalLinksPage.verifyRemoveLinkButtonVisible(1);

    // 7. Verify counter shows 1 link added
    await externalLinksPage.verifyLinkRowCount(1);
  });

  test('TC_LINK_003: Add Multiple Link Types Simultaneously', async ({ page }) => {
    // 1. Navigate to Product Upload Form
    await externalLinksPage.navigateToProductUpload();

    // 2. Scroll to Additional Information section
    await externalLinksPage.scrollToAdditionalInfoSection();

    // 3. Add Amazon Purchase Link
    await externalLinksPage.addLinkRow(0, testData.inputs.links[0].type, testData.inputs.links[0].url);

    // 4. Add Flipkart Purchase Link
    await externalLinksPage.addLinkRow(1, testData.inputs.links[1].type, testData.inputs.links[1].url);

    // 5. Add Official Website Link
    await externalLinksPage.addLinkRow(2, testData.inputs.links[2].type, testData.inputs.links[2].url);

    // 6. Verify all 3 link rows are displayed with correct values
    await externalLinksPage.verifyLinkRowCount(3);
    await externalLinksPage.verifyLinkRowValues(0, testData.inputs.links[0].type, testData.inputs.links[0].url);
    await externalLinksPage.verifyLinkRowValues(1, testData.inputs.links[1].type, testData.inputs.links[1].url);
    await externalLinksPage.verifyLinkRowValues(2, testData.inputs.links[2].type, testData.inputs.links[2].url);

    // 7. Verify each link row has a remove button
    await externalLinksPage.verifyRemoveButtonVisible(1);
    await externalLinksPage.verifyRemoveButtonVisible(2);
    await externalLinksPage.verifyRemoveButtonVisible(3);
  });
});

test.describe('2. URL Validation', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let externalLinksPage: ExternalLinksPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    externalLinksPage = new ExternalLinksPage(page);
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
  });

  test('TC_VAL_001: Validate Invalid URL Format', async ({ page }) => {
    // 1. Navigate to Product Upload Form
    await externalLinksPage.navigateToProductUpload();

    // 2. Scroll to Additional Information section and add a link row
    await externalLinksPage.scrollToAdditionalInfoSection();
    await externalLinksPage.clickAddLink();

    // 3. Enter invalid URL in the URL field
    await externalLinksPage.enterLinkUrl(0, testData.inputs.invalidUrl);

    // 4. Attempt to submit the form
    await externalLinksPage.clickUploadProduct();

    // 5. Verify form does not submit — page stays on product upload
    await externalLinksPage.verifyPageStaysOnUpload();

    // 6. Verify URL field still contains the invalid value (not cleared)
    await externalLinksPage.verifyUrlFieldValue(0, testData.inputs.invalidUrl);
  });

  test('TC_VAL_002: Validate URL Protocol Requirement', async ({ page }) => {
    // 1. Navigate to Product Upload Form
    await externalLinksPage.navigateToProductUpload();

    // 2. Scroll to Additional Information section and add a link row
    await externalLinksPage.scrollToAdditionalInfoSection();
    await externalLinksPage.clickAddLink();

    // 3. Enter URL without protocol in the URL field
    await externalLinksPage.enterLinkUrl(0, testData.inputs.noProtocolUrl);

    // 4. Attempt to submit the form
    await externalLinksPage.clickUploadProduct();

    // 5. Verify form does not submit — page stays on product upload
    await externalLinksPage.verifyPageStaysOnUpload();

    // 6. Verify URL field still contains the no-protocol value
    await externalLinksPage.verifyUrlFieldValue(0, testData.inputs.noProtocolUrl);
  });

  test('TC_VAL_003: Validate Amazon Domain Requirement', async ({ page }) => {
    // 1. Navigate to Product Upload Form
    await externalLinksPage.navigateToProductUpload();

    // 2. Scroll to Additional Information section and add a link row
    await externalLinksPage.scrollToAdditionalInfoSection();
    await externalLinksPage.clickAddLink();

    // 3. Set link type to Amazon Purchase Link
    await externalLinksPage.enterLinkType(0, testData.inputs.links[0].type);

    // 4. Enter a non-Amazon URL in the URL field
    await externalLinksPage.enterLinkUrl(0, testData.inputs.nonAmazonUrl);

    // 5. Attempt to submit the form
    await externalLinksPage.clickUploadProduct();

    // 6. Verify form does not submit — page stays on product upload
    await externalLinksPage.verifyPageStaysOnUpload();

    // 7. Verify URL field still contains the non-Amazon URL
    await externalLinksPage.verifyUrlFieldValue(0, testData.inputs.nonAmazonUrl);
  });

  test('TC_VAL_004: Validate Flipkart Domain Requirement', async ({ page }) => {
    // 1. Navigate to Product Upload Form
    await externalLinksPage.navigateToProductUpload();

    // 2. Scroll to Additional Information section and add a link row
    await externalLinksPage.scrollToAdditionalInfoSection();
    await externalLinksPage.clickAddLink();

    // 3. Set link type label to Flipkart Purchase Link
    await externalLinksPage.enterLinkType(0, testData.inputs.links[1].type);

    // 4. Enter a non-Flipkart URL in the URL field
    await externalLinksPage.enterLinkUrl(0, testData.inputs.nonFlipkartUrl);

    // 5. Attempt to submit the form
    await externalLinksPage.clickUploadProduct();

    // 6. Verify form does not submit — page stays on product upload
    await externalLinksPage.verifyPageStaysOnUpload();

    // 7. Verify URL field still contains the non-Flipkart URL (not cleared or rejected)
    await externalLinksPage.verifyUrlFieldValue(0, testData.inputs.nonFlipkartUrl);
  });

  test('TC_VAL_005: Accept Valid Amazon URL', async ({ page }) => {
    // 1. Navigate to Product Upload Form
    await externalLinksPage.navigateToProductUpload();

    // 2. Scroll to Additional Information section and add a link row
    await externalLinksPage.scrollToAdditionalInfoSection();
    await externalLinksPage.clickAddLink();

    // 3. Set link type to Amazon Purchase Link
    await externalLinksPage.enterLinkType(0, testData.inputs.links[0].type);

    // 4. Enter a valid Amazon URL
    await externalLinksPage.enterLinkUrl(0, testData.inputs.validAmazonUrl);

    // 5. Verify no error state — URL field retains the valid value
    await externalLinksPage.verifyUrlFieldValue(0, testData.inputs.validAmazonUrl);

    // 6. Verify link row count shows 1 link
    await externalLinksPage.verifyLinkRowCount(1);
  });
});

test.describe('3. PwD Product Details Display', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let externalLinksPage: ExternalLinksPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    externalLinksPage = new ExternalLinksPage(page);
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
  });

  test('TC_DISP_002: Display Amazon Link with Proper Labeling', async ({ page }) => {
    // 1. Navigate to approved product details page on public catalog
    await externalLinksPage.navigateToPublicProductPage(testData.inputs.productSlug);

    // 2. Verify product heading is visible
    await externalLinksPage.verifyProductHeadingVisible();

    // 3. Verify Contact Vendor button is present and visible
    await externalLinksPage.verifyContactVendorButtonVisible();

    // 4. Click Contact Vendor to open vendor details panel
    await externalLinksPage.clickContactVendor();

    // 5. Verify vendor details panel heading is visible
    await externalLinksPage.verifyVendorDetailsPanelVisible();

    // 6. Verify product links container is present in the panel
    await externalLinksPage.verifyProductLinksContainerVisible();
  });
});

test.describe('6. Edit and Update Links', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let externalLinksPage: ExternalLinksPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    externalLinksPage = new ExternalLinksPage(page);
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
  });

  test('TC_EDIT_001: AP Updates Amazon Link', async ({ page }) => {
    // 1. Navigate to Product Management page
    await externalLinksPage.navigateToProductManagement();

    // 2. Wait for approved products to be visible
    await externalLinksPage.verifyApprovedProductsVisible();

    // 3. Open Edit dialog for the first approved product
    await externalLinksPage.openEditDialogForProduct(testData.inputs.editProductName);

    // 4. Add Amazon Purchase Link with valid URL in the edit dialog
    await externalLinksPage.addLinkRowInEditDialog(0, testData.inputs.links[0].type, testData.inputs.validAmazonUrl);

    // 5. Save changes by clicking Update Product
    await externalLinksPage.clickUpdateProduct();

    // 6. Verify dialog closes and product list is visible
    await externalLinksPage.verifyEditDialogClosed();

    // 7. Verify product now shows Edited badge indicating pending review
    await externalLinksPage.verifyProductHasEditedBadge(testData.inputs.editProductName);

    // 8. Verify Under Review count increased (product moved to Under Review)
    await externalLinksPage.verifyUnderReviewCountAtLeast(1);
  });
});
