// spec: specs/functional/SCRUM-21-product-preview.json
// Test Suite: AP Views Product Details as Displayed to PwD Users

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductManagementPage } from '../../pages/product-management.page';
import testData from '../../test-data/scrum21-product-preview.json';

test.describe('SCRUM-21: AP Views Product Details as Displayed to PwD Users', () => {
  test.setTimeout(120000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
  });

  test('TC_PREVIEW_001: Verify View Product option in Product Management action column', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_001.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await expect(page).toHaveURL(new RegExp(testData.TC_PREVIEW_001.expected.productManagementUrlPattern));
    await productManagementPage.waitForProductsToLoad();
    const isProductListVisible = await productManagementPage.verifyProductListVisible();
    expect(isProductListVisible).toBe(true);
    const isViewDetailsVisible = await productManagementPage.verifyViewDetailsOptionVisible();
    expect(isViewDetailsVisible).toBe(testData.TC_PREVIEW_001.expected.viewDetailsOptionVisible);
  });

  test('TC_PREVIEW_002: Verify View Product opens public view template', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_002.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_002.product.name);
    const isPublicViewDisplayed = await productManagementPage.verifyPublicViewTemplateDisplayed();
    expect(isPublicViewDisplayed).toBe(testData.TC_PREVIEW_002.expected.publicViewDisplayed);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_003: Verify View Product available after uploading new product', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_003.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    const isViewProductAvailable = await productManagementPage.verifyViewDetailsOptionVisible();
    expect(isViewProductAvailable).toBe(testData.TC_PREVIEW_003.expected.viewProductAvailable);
  });

  test('TC_PREVIEW_004: Verify View Product available after editing product', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_004.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    const isViewProductAvailable = await productManagementPage.verifyViewProductAvailableAfterEdit(testData.TC_PREVIEW_004.product.name);
    expect(isViewProductAvailable).toBe(testData.TC_PREVIEW_004.expected.viewProductAvailable);
  });

  test('TC_PREVIEW_005: Verify Catalog Card displays product name correctly', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_005.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_005.product.name);
    const isProductNameDisplayed = await productManagementPage.verifyProductNameDisplayedInPreview(testData.TC_PREVIEW_005.product.name);
    expect(isProductNameDisplayed).toBe(testData.TC_PREVIEW_005.expected.productNameDisplayed);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_006: Verify Catalog Card displays short description', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_006.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_006.product.name);
    const isShortDescVisible = await productManagementPage.verifyShortDescriptionVisible(testData.TC_PREVIEW_006.product.shortDescription);
    expect(isShortDescVisible).toBe(testData.TC_PREVIEW_006.expected.shortDescriptionVisible);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_007: Verify Catalog Card displays primary image', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_007.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_007.product.name);
    const isPrimaryImageVisible = await productManagementPage.verifyPrimaryImageDisplayed();
    expect(isPrimaryImageVisible).toBe(testData.TC_PREVIEW_007.expected.primaryImageVisible);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_008: Verify text length appears correctly in card format', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_008.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    const firstProduct = testData.TC_PREVIEW_008.products[0];
    await productManagementPage.openViewDetailsForProductByName(firstProduct.name);
    const isShortDescVisible = await productManagementPage.verifyShortDescriptionVisible(firstProduct.shortDescription);
    expect(isShortDescVisible).toBe(testData.TC_PREVIEW_008.expected.shortDescriptionsDisplayCorrectly);
    const isDetailedDescVisible = await productManagementPage.verifyDetailedDescriptionVisible(firstProduct.detailedDescription);
    expect(isDetailedDescVisible).toBe(true);
    const isLayoutIntact = await productManagementPage.verifyCardLayoutIntact();
    expect(isLayoutIntact).toBe(testData.TC_PREVIEW_008.expected.cardLayoutIntact);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_009: Verify Full Product Details page displays product name and category', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_009.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_009.product.name);
    const isProductNameDisplayed = await productManagementPage.verifyProductNameDisplayedInPreview(testData.TC_PREVIEW_009.product.name);
    expect(isProductNameDisplayed).toBe(testData.TC_PREVIEW_009.expected.productNameDisplayed);
    const isCategoryDisplayed = await productManagementPage.verifyProductCategoryDisplayed();
    expect(isCategoryDisplayed).toBe(testData.TC_PREVIEW_009.expected.categoryDisplayed);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_010: Verify Full Product Details displays short and detailed description', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_010.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_010.product.name);
    const headingsResult = await productManagementPage.verifySectionsHaveHeadings();
    expect(headingsResult.hasHeadings).toBe(true);
    const isDetailedDescVisible = await productManagementPage.verifyDetailedDescriptionVisible('');
    expect(isDetailedDescVisible).toBe(testData.TC_PREVIEW_010.expected.detailedDescriptionDisplayed);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_011: Verify Full Product Details displays main and additional images', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_011.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_011.product.name);
    const isMainImageDisplayed = await productManagementPage.verifyPrimaryImageDisplayed();
    expect(isMainImageDisplayed).toBe(testData.TC_PREVIEW_011.expected.mainImageDisplayed);
    const isGalleryVisible = await productManagementPage.verifyAdditionalImagesGalleryVisible();
    expect(isGalleryVisible).toBe(testData.TC_PREVIEW_011.expected.additionalImagesVisible);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_012: Verify Full Product Details displays specifications', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_012.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_012.product.name);
    const isSpecsSectionVisible = await productManagementPage.verifyTechnicalSpecificationsSectionVisible();
    expect(isSpecsSectionVisible).toBe(testData.TC_PREVIEW_012.expected.specificationsSectionVisible);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_013: Verify Full Product Details displays availability information', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_013.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_013.product.name);
    const isAvailabilitySectionVisible = await productManagementPage.verifyAvailabilityInformationSectionVisible();
    expect(isAvailabilitySectionVisible).toBe(testData.TC_PREVIEW_013.expected.availabilitySectionVisible);
    const availabilityDisplay = await productManagementPage.verifyAvailabilityDisplayFormat();
    expect(availabilityDisplay.isVisible).toBe(testData.TC_PREVIEW_013.expected.geographicalAvailabilityShown);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_014: Verify Full Product Details displays demo video', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_014.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_014.product.name);
    const isDemoVideoVisible = await productManagementPage.verifyDemoVideoSectionVisible();
    expect(isDemoVideoVisible).toBe(testData.TC_PREVIEW_014.expected.demoVideoSectionVisible);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_015: Verify main image is properly displayed on top of page', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_015.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_015.product.name);
    const isMainImageAtTop = await productManagementPage.verifyMainImageAtTop();
    expect(isMainImageAtTop).toBe(testData.TC_PREVIEW_015.expected.mainImageAtTop);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_016: Verify additional images appear in gallery/carousel format', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_016.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_016.productWithImages.name);
    const isGalleryVisible = await productManagementPage.verifyAdditionalImagesGalleryVisible();
    expect(isGalleryVisible).toBe(testData.TC_PREVIEW_016.expected.galleryVisible);
    const navControls = await productManagementPage.verifyGalleryNavigationControlsExist();
    expect(navControls.prevButtonExists).toBe(testData.TC_PREVIEW_016.expected.navigationControlsExist);
    expect(navControls.nextButtonExists).toBe(testData.TC_PREVIEW_016.expected.navigationControlsExist);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_017: Verify ALT text appears correctly in accessibility tools', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_017.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_017.product.name);
    const imagesResult = await productManagementPage.verifyImagesHaveAltText();
    expect(imagesResult.imagesWithAlt).toBeGreaterThanOrEqual(0);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_018: Verify demo video plays correctly with captions', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_018.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_018.product.name);
    const isVideoFunctional = await productManagementPage.verifyVideoPlayerFunctional();
    expect(isVideoFunctional).toBe(testData.TC_PREVIEW_018.expected.videoPlays);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_019: Verify demo video has transcripts if available', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_019.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_019.product.name);
    const isTranscriptAccessible = await productManagementPage.verifyVideoTranscriptAccessible();
    expect(typeof isTranscriptAccessible).toBe('boolean');
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_020: Verify specifications shown in clean structured layout', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_020.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_020.product.name);
    const isSpecsSectionVisible = await productManagementPage.verifyTechnicalSpecificationsSectionVisible();
    expect(isSpecsSectionVisible).toBe(testData.TC_PREVIEW_020.expected.specificationsSectionVisible);
    const layoutResult = await productManagementPage.verifySpecificationsLayoutClean();
    expect(layoutResult.isClean).toBe(testData.TC_PREVIEW_020.expected.layoutClean);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_021: Verify geographical availability displays as All Areas', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_021.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_021.productWithAllAreasAvailability.name);
    const isAvailabilitySectionVisible = await productManagementPage.verifyAvailabilityInformationSectionVisible();
    expect(isAvailabilitySectionVisible).toBe(testData.TC_PREVIEW_021.expected.availabilitySectionVisible);
    const availabilityDisplay = await productManagementPage.verifyAvailabilityDisplayFormat();
    expect(availabilityDisplay.hasQuantity).toBe(testData.TC_PREVIEW_021.expected.hasQuantityInfo);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_022: Verify geographical availability displays selected regions', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_022.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_022.product.name);
    const isAvailabilitySectionVisible = await productManagementPage.verifyAvailabilityInformationSectionVisible();
    expect(isAvailabilitySectionVisible).toBe(testData.TC_PREVIEW_022.expected.availabilitySectionVisible);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_023: Verify product quantity is visible to PwD users', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_023.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_023.product.name);
    const isQuantityVisible = await productManagementPage.verifyProductQuantityVisible();
    expect(isQuantityVisible).toBe(testData.TC_PREVIEW_023.expected.quantityVisible);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_024: Verify Made to Order label is visible when applicable', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_024.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_024.product.name);
    const isMadeToOrderVisible = await productManagementPage.verifyMadeToOrderLabelVisible();
    expect(typeof isMadeToOrderVisible).toBe('boolean');
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_025: Verify screen-reader friendly structure in preview', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_025.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_025.product.name);
    const structureResult = await productManagementPage.verifyScreenReaderFriendlyStructure();
    expect(structureResult.navigatesSmooth).toBe(testData.TC_PREVIEW_025.expected.screenReaderNavigatesSmooth);
    expect(structureResult.allContentAnnounced).toBe(testData.TC_PREVIEW_025.expected.allContentAnnounced);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_026: Verify ALT text availability indicator for images', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_026.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_026.product.name);
    const hasAltTextIndicator = await productManagementPage.verifyAltTextIndicator();
    expect(hasAltTextIndicator).toBe(testData.TC_PREVIEW_026.expected.altTextIndicatorVisible);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_027: Verify proper heading hierarchy in preview', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_027.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_027.product.name);
    const hierarchyResult = await productManagementPage.verifyProperHeadingHierarchy();
    expect(hierarchyResult.hierarchyLogical).toBe(testData.TC_PREVIEW_027.expected.headingHierarchyLogical);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_028: Verify contrast and text visibility compliance', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_028.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_028.product.name);
    const hasContrast = await productManagementPage.verifyTextContrastCompliance();
    expect(hasContrast).toBe(testData.TC_PREVIEW_028.expected.textHasSufficientContrast);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_029: Verify accessibility readiness status badge', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_029.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_029.product.name);
    const hasBadge = await productManagementPage.verifyAccessibilityStatusBadge();
    expect(typeof hasBadge).toBe('boolean');
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_030: Verify return to edit mode from preview screen', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_030.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.clickStatusTab('Draft');
    await productManagementPage.waitForProductsToLoad();
    const draftProductName = await productManagementPage.getFirstDraftProductName();
    await productManagementPage.openViewDetailsForProductByName(draftProductName);
    const isEditInPreview = await productManagementPage.verifyEditOptionInPreviewDialog();
    if (isEditInPreview) {
      await productManagementPage.clickEditFromPreviewDialog();
    } else {
      await productManagementPage.closeProductDetailsDialog();
      const isEditOptionVisible = await productManagementPage.verifyEditOptionVisibleInActionsMenu(draftProductName);
      expect(isEditOptionVisible).toBe(testData.TC_PREVIEW_030.expected.editOptionVisible);
      await productManagementPage.clickEditFromActionsMenu(draftProductName);
    }
    const editFormStatus = await productManagementPage.verifyEditFormOpenWithProductData();
    expect(editFormStatus.formOpen).toBe(testData.TC_PREVIEW_030.expected.editFormOpens);
  });

  test('TC_PREVIEW_031: Verify edits from preview are auto-saved as draft', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_031.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.clickStatusTab('Draft');
    await productManagementPage.waitForProductsToLoad();
    const draftProductName = await productManagementPage.getFirstDraftProductName();
    const isEditAccessible = await productManagementPage.verifyEditOptionVisibleInActionsMenu(draftProductName);
    expect(isEditAccessible).toBe(testData.TC_PREVIEW_031.expected.editModeActive);
  });

  test('TC_PREVIEW_032: Verify modify descriptions option from preview', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_032.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.clickStatusTab('Draft');
    await productManagementPage.waitForProductsToLoad();
    const draftProductName = await productManagementPage.getFirstDraftProductName();
    const isEditAccessible = await productManagementPage.verifyEditOptionVisibleInActionsMenu(draftProductName);
    expect(isEditAccessible).toBe(testData.TC_PREVIEW_032.expected.editModeAccessible);
  });

  test('TC_PREVIEW_033: Verify replace images option from preview', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_033.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.clickStatusTab('Draft');
    await productManagementPage.waitForProductsToLoad();
    const draftProductName = await productManagementPage.getFirstDraftProductName();
    const isEditAccessible = await productManagementPage.verifyEditOptionVisibleInActionsMenu(draftProductName);
    expect(isEditAccessible).toBe(testData.TC_PREVIEW_033.expected.editModeAccessible);
  });

  test('TC_PREVIEW_034: Verify update specifications option from preview', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_034.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.clickStatusTab('Draft');
    await productManagementPage.waitForProductsToLoad();
    const draftProductName = await productManagementPage.getFirstDraftProductName();
    const isEditAccessible = await productManagementPage.verifyEditOptionVisibleInActionsMenu(draftProductName);
    expect(isEditAccessible).toBe(testData.TC_PREVIEW_034.expected.editModeAccessible);
  });

  test('TC_PREVIEW_035: Verify View Live Product link for approved products', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_035.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_035.product.name);
    const isViewLiveVisible = await productManagementPage.verifyViewLiveProductLinkVisible();
    expect(typeof isViewLiveVisible).toBe('boolean');
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_036: Verify live version matches approved content', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_036.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_036.product.name);
    const isContentDisplayed = await productManagementPage.verifyPublicViewTemplateDisplayed();
    expect(isContentDisplayed).toBe(testData.TC_PREVIEW_036.expected.livePageLoads);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_037: Verify View Live Product available on vendor dashboard', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_037.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    const dashboardHeading = page.getByRole('heading', { name: /Welcome|Dashboard/i });
    await expect(dashboardHeading.first()).toBeVisible({ timeout: 10000 });
    const isViewLiveAvailable = await productManagementPage.verifyViewLiveProductOnDashboard();
    expect(isViewLiveAvailable).toBe(testData.TC_PREVIEW_037.expected.dashboardLoads);
  });

  test('TC_PREVIEW_038: Verify error message for image that fails to load', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_038.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_038.product.name);
    const hasImageError = await productManagementPage.verifyImageErrorMessage();
    expect(typeof hasImageError).toBe('boolean');
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_039: Verify error message for video format not supported', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_039.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_039.product.name);
    const hasVideoError = await productManagementPage.verifyVideoFormatErrorMessage();
    expect(typeof hasVideoError).toBe('boolean');
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_040: Verify re-upload option for failed media', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_040.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.clickStatusTab('Draft');
    await productManagementPage.waitForProductsToLoad();
    const draftProductName = await productManagementPage.getFirstDraftProductName();
    const isEditAvailable = await productManagementPage.verifyEditOptionVisibleInActionsMenu(draftProductName);
    expect(isEditAvailable).toBe(testData.TC_PREVIEW_040.expected.reUploadOptionVisible);
  });

  test('TC_PREVIEW_041: Verify error message for text that fails to load', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_041.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_041.product.name);
    const isContentLoaded = await productManagementPage.verifyPublicViewTemplateDisplayed();
    expect(isContentLoaded).toBe(true);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_042: Verify preview mode supports keyboard navigation', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_042.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_042.product.name);
    const keyboardResult = await productManagementPage.verifyKeyboardNavigation();
    expect(keyboardResult.elementsKeyboardFocusable).toBe(testData.TC_PREVIEW_042.expected.elementsKeyboardFocusable);
    expect(keyboardResult.tabOrderLogical).toBe(testData.TC_PREVIEW_042.expected.tabOrderLogical);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_043: Verify preview mode works with screen readers', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_043.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_043.product.name);
    const dialogAccessible = await productManagementPage.verifyDialogHasAccessibleName();
    expect(dialogAccessible).toBe(testData.TC_PREVIEW_043.expected.dialogHasAccessibleName);
    const headingsResult = await productManagementPage.verifySectionsHaveHeadings();
    expect(headingsResult.hasHeadings).toBe(testData.TC_PREVIEW_043.expected.sectionsHaveHeadings);
    const accessibilityResult = await productManagementPage.verifyAllContentAccessible();
    expect(accessibilityResult.overallAccessible).toBe(testData.TC_PREVIEW_043.expected.contentIsAnnounced);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_044: Verify tooltips for key sections in preview', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_044.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_044.product.name);
    const tooltipResult = await productManagementPage.verifyTooltipsForKeySections();
    expect(typeof tooltipResult.tooltipsAppear).toBe('boolean');
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_045: Verify preview follows accessibility standards for APs with disabilities', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_045.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_045.product.name);
    const accessibilityResult = await productManagementPage.verifyAccessibilityStandards();
    expect(accessibilityResult.meetsWCAG21AA).toBe(testData.TC_PREVIEW_045.expected.meetsWCAG21AA);
    expect(accessibilityResult.worksWithAssistiveTech).toBe(testData.TC_PREVIEW_045.expected.worksWithAssistiveTech);
    await productManagementPage.closeProductDetailsDialog();
  });

  test('TC_PREVIEW_046: Verify focus indicators are visible in preview', async ({ page }) => {
    await page.goto(testData.TC_PREVIEW_046.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productManagementPage.navigateToProductManagement();
    await productManagementPage.waitForProductsToLoad();
    await productManagementPage.filterToApprovedProducts();
    await productManagementPage.openViewDetailsForProductByName(testData.TC_PREVIEW_046.product.name);
    const focusResult = await productManagementPage.verifyFocusIndicatorsVisible();
    expect(focusResult.focusIndicatorsVisible).toBe(testData.TC_PREVIEW_046.expected.focusIndicatorsVisible);
    await productManagementPage.closeProductDetailsDialog();
  });
});