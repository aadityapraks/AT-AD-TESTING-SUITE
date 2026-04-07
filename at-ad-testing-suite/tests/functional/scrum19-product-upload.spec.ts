// spec: specs/functional/SCRUM-19-product-upload.json
// seed: at-ad-testing-suite/seed.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductUploadPage } from '../../pages/product-upload.page';
import testData from '../../test-data/scrum19-product-upload.json';

test.describe('SCRUM-19: AP Uploads Product/Technology', () => {
  let loginPage: LoginPage;
  let productUploadPage: ProductUploadPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productUploadPage = new ProductUploadPage(page);
    await page.goto(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await productUploadPage.navigateToProductUpload();
  });

  test('TC_UPLOAD_001: Verify Product Upload option is accessible from AP Dashboard', async () => {
    const tc001Data = testData.TC_UPLOAD_001;
    const productUploadVisible = await productUploadPage.verifyProductUploadOptionVisible();
    expect(productUploadVisible).toBe(tc001Data.expected.productUploadVisible);
    const productUploadClickable = await productUploadPage.verifyProductUploadOptionClickable();
    expect(productUploadClickable).toBe(tc001Data.expected.productUploadClickable);
  });

  test('TC_UPLOAD_002: Verify Product Upload tab navigation with 4 tabs', async () => {
    const tc002Data = testData.TC_UPLOAD_002;
    const tabNavigationVisible = await productUploadPage.verifyTabNavigationVisible();
    expect(tabNavigationVisible).toBe(tc002Data.expected.tabNavigationVisible);
    const tabCount = await productUploadPage.getTabCount();
    expect(tabCount).toBe(tc002Data.expected.tabCount);
    const dedicatedSectionAvailable = await productUploadPage.verifyDedicatedUploadSectionAvailable();
    expect(dedicatedSectionAvailable).toBe(tc002Data.expected.dedicatedSectionAvailable);
  });

  test('TC_UPLOAD_003: Verify Product Name mandatory field', async () => {
    const tc003Data = testData.TC_UPLOAD_003;
    const fieldVisible = await productUploadPage.verifyProductNameFieldVisible();
    expect(fieldVisible).toBe(tc003Data.expected.fieldVisible);
    const fieldMandatory = await productUploadPage.verifyProductNameFieldMandatory();
    expect(fieldMandatory).toBe(tc003Data.expected.fieldMandatory);
    await productUploadPage.enterProductName(tc003Data.inputs.productName);
    const enteredValue = await productUploadPage.getProductNameValue();
    expect(enteredValue).toBe(tc003Data.inputs.productName);
  });

  test('TC_UPLOAD_004: Verify Product Type dropdown (Device or Technology)', async () => {
    const tc004Data = testData.TC_UPLOAD_004;
    const dropdownVisible = await productUploadPage.verifyProductTypeDropdownVisible();
    expect(dropdownVisible).toBe(tc004Data.expected.dropdownVisible);
    await productUploadPage.selectProductTypeOption(tc004Data.inputs.selectedOption);
  });

  test('TC_UPLOAD_005: Verify Disability Type dropdown options', async () => {
    const tc005Data = testData.TC_UPLOAD_005;
    const dropdownVisible = await productUploadPage.verifyDisabilityTypeDropdownVisible();
    expect(dropdownVisible).toBe(tc005Data.expected.dropdownVisible);
    await productUploadPage.selectDisabilityType(tc005Data.inputs.selectedOption);
  });

  test('TC_UPLOAD_006: Verify Disability Percentage dropdown options', async () => {
    const tc006Data = testData.TC_UPLOAD_006;
    const dropdownVisible = await productUploadPage.verifyDisabilityPercentageDropdownVisible();
    expect(dropdownVisible).toBe(tc006Data.expected.dropdownVisible);
    await productUploadPage.selectDisabilityPercentage(tc006Data.inputs.selectedOption);
  });

  test('TC_UPLOAD_007: Verify Short Description field with ~200 character limit', async () => {
    const tc007Data = testData.TC_UPLOAD_007;
    await productUploadPage.verifyShortDescriptionFieldVisible();
    await productUploadPage.verifyCharacterCountIndicatorVisible();
    await productUploadPage.enterShortDescription(tc007Data.inputs.textWithin200Chars);
    const valueAfterValidInput = await productUploadPage.getShortDescriptionValue();
    expect(valueAfterValidInput.length).toBeLessThanOrEqual(tc007Data.expected.characterLimit);
    await productUploadPage.attemptToEnterTextBeyondLimit(tc007Data.inputs.textExceeding200Chars, tc007Data.expected.characterLimit);
    const isLimitEnforced = await productUploadPage.verifyCharacterLimitEnforced(tc007Data.expected.characterLimit);
    expect(isLimitEnforced).toBe(true);
  });

  test('TC_UPLOAD_008: Verify Assist with GenAI button for Short Description', async () => {
    const tc008Data = testData.TC_UPLOAD_008;
    await productUploadPage.enterShortDescriptionForGenAI(tc008Data.inputs.shortDescriptionText);
    const genAIButtonVisible = await productUploadPage.verifyGenAIButtonVisibleForField('Short Description');
    expect(genAIButtonVisible).toBe(tc008Data.expected.genAIButtonVisible);
  });

  test('TC_UPLOAD_009: Verify Detailed Description field with GenAI assist', async () => {
    const tc009Data = testData.TC_UPLOAD_009;
    await productUploadPage.verifyDetailedDescriptionFieldVisible();
    await productUploadPage.enterDetailedDescription(tc009Data.inputs.detailedDescription);
    const genAIButtonAvailable = await productUploadPage.verifyGenAIButtonVisibleForField('Detailed Description');
    expect(genAIButtonAvailable).toBe(tc009Data.expected.genAIButtonAvailable);
  });

  test('TC_UPLOAD_010: Verify text fields support basic formatting', async () => {
    const tc010Data = testData.TC_UPLOAD_010;
    await productUploadPage.enterDetailedDescription(tc010Data.inputs.textWithBullets);
    const bulletPointsPreserved = await productUploadPage.verifyFormattingPreserved(productUploadPage.detailedDescriptionField, '•');
    expect(bulletPointsPreserved).toBe(tc010Data.expected.bulletPointsSupported);
  });

  test('TC_UPLOAD_011: Verify Product Unique Feature field with help icon', async () => {
    const tc011Data = testData.TC_UPLOAD_011;
    const fieldVisible = await productUploadPage.verifyUniqueFeatureFieldVisible();
    expect(fieldVisible).toBe(tc011Data.expected.fieldVisible);
    const helpIconPresent = await productUploadPage.verifyHelpIconPresent();
    expect(helpIconPresent).toBe(tc011Data.expected.helpIconPresent);
    await productUploadPage.enterUniqueFeatureText(tc011Data.inputs.uniqueFeatureText);
  });

  test('TC_UPLOAD_012: Verify GenAI assist for Product Unique Feature', async () => {
    const tc012Data = testData.TC_UPLOAD_012;
    await productUploadPage.enterUniqueFeatureText(tc012Data.inputs.uniqueFeatureText);
    const genAIButtonWorks = await productUploadPage.verifyGenAIButtonVisibleForUniqueFeatures();
    expect(genAIButtonWorks).toBe(tc012Data.expected.genAIButtonWorks);
  });

  test('TC_UPLOAD_013: Verify Buying Guide field with GenAI assist', async () => {
    const tc013Data = testData.TC_UPLOAD_013;
    const fieldVisible = await productUploadPage.verifyBuyingGuideFieldVisible();
    expect(fieldVisible).toBe(tc013Data.expected.fieldVisible);
    await productUploadPage.enterBuyingGuideContent(tc013Data.inputs.buyingGuideContent);
  });

  test('TC_UPLOAD_027: Verify Specifications Section with structured fields', async () => {
    const tc027Data = testData.TC_UPLOAD_027;
    const sectionVisible = await productUploadPage.verifySpecificationsSectionVisible();
    expect(sectionVisible).toBe(tc027Data.expected.sectionVisible);
    const allFieldsPresent = await productUploadPage.verifyAllSpecificationFieldsPresent();
    expect(allFieldsPresent).toBe(tc027Data.expected.allFieldsPresent);
    await productUploadPage.fillSpecificationFields({
      dimensions: tc027Data.inputs.dimensions,
      weight: tc027Data.inputs.weight,
      material: tc027Data.inputs.material,
      powerRequirements: tc027Data.inputs.powerRequirements,
      accessibilityFeatures: tc027Data.inputs.accessibilityFeatures
    });
  });

  test('TC_UPLOAD_028: Verify Generate Specifications with GenAI', async () => {
    const tc028Data = testData.TC_UPLOAD_028;
    const genAIButtonVisible = await productUploadPage.verifyGenAIButtonForSpecifications();
    expect(genAIButtonVisible).toBe(tc028Data.expected.genAIButtonVisible);
  });

  test('TC_UPLOAD_029: Verify Geographical Availability - Pan-India option', async () => {
    const tc029Data = testData.TC_UPLOAD_029;
    const sectionVisible = await productUploadPage.verifyGeographicalAvailabilitySectionVisible();
    expect(sectionVisible).toBe(tc029Data.expected.sectionVisible);
    const panIndiaAvailable = await productUploadPage.verifyPanIndiaOptionAvailable();
    expect(panIndiaAvailable).toBe(tc029Data.expected.panIndiaAvailable);
    await productUploadPage.selectPanIndiaOption();
    const selectionSaved = await productUploadPage.verifyPanIndiaSelectionSaved();
    expect(selectionSaved).toBe(tc029Data.expected.selectionSaved);
  });

  test('TC_UPLOAD_030: Verify Geographical Availability - Specific Areas with search', async () => {
    const tc030Data = testData.TC_UPLOAD_030;
    const specificAreasAvailable = await productUploadPage.verifySpecificAreasOptionAvailable();
    expect(specificAreasAvailable).toBe(tc030Data.expected.specificAreasAvailable);
    await productUploadPage.selectSpecificAreasOption();
    const searchFunctionalityWorks = await productUploadPage.verifySearchFunctionalityAvailable();
    expect(searchFunctionalityWorks).toBe(tc030Data.expected.searchFunctionalityWorks);
    await productUploadPage.selectMultipleAreas(tc030Data.inputs.areas);
    const multipleSelectionsAllowed = await productUploadPage.verifyMultipleSelectionsAllowed();
    expect(multipleSelectionsAllowed).toBe(tc030Data.expected.multipleSelectionsAllowed);
    const selectionsAreSaved = await productUploadPage.verifySelectionsAreSaved();
    expect(selectionsAreSaved).toBe(tc030Data.expected.selectionsAreSaved);
  });

  test('TC_UPLOAD_031: Verify Product Serviceable Area dropdowns', async () => {
    const tc031Data = testData.TC_UPLOAD_031;
    const sectionVisible = await productUploadPage.verifyServiceableAreaSectionVisible();
    expect(sectionVisible).toBe(tc031Data.expected.sectionVisible);
    const allOptionsAvailable = await productUploadPage.verifyServiceableAreaOptionsAvailable();
    expect(allOptionsAvailable).toBe(tc031Data.expected.allOptionsAvailable);
    await productUploadPage.selectServiceableAreaState(tc031Data.inputs.state);
    const districtPopulates = await productUploadPage.verifyDistrictPopulatesBasedOnState();
    expect(districtPopulates).toBe(tc031Data.expected.districtPopulatesBasedOnState);
  });

  test('TC_UPLOAD_032: Verify Product Quantity numeric field', async () => {
    const tc032Data = testData.TC_UPLOAD_032;
    const fieldVisible = await productUploadPage.verifyQuantityFieldVisible();
    expect(fieldVisible).toBe(tc032Data.expected.fieldVisible);
    const numericValidation = await productUploadPage.verifyQuantityAcceptsNumericOnly();
    expect(numericValidation).toBe(tc032Data.expected.numericAccepted);
  });

  test('TC_UPLOAD_033: Verify Made to Order toggle', async () => {
    const tc033Data = testData.TC_UPLOAD_033;
    const toggleVisible = await productUploadPage.verifyMadeToOrderToggleVisible();
    expect(toggleVisible).toBe(tc033Data.expected.toggleVisible);
    await productUploadPage.enableMadeToOrderToggle();
    const quantityFieldAdjusts = await productUploadPage.verifyQuantityFieldAdjustsForMadeToOrder();
    expect(quantityFieldAdjusts).toBe(tc033Data.expected.quantityFieldAdjusts);
    const toggleStateSaved = await productUploadPage.verifyMadeToOrderToggleStateSaved();
    expect(toggleStateSaved).toBe(tc033Data.expected.toggleStateSaved);
  });

  test('TC_UPLOAD_034: Verify Amazon Buy Link field', async () => {
    const tc034Data = testData.TC_UPLOAD_034;
    const fieldVisible = await productUploadPage.verifyAmazonBuyLinkFieldVisible();
    expect(fieldVisible).toBe(tc034Data.expected.fieldVisible);
    await productUploadPage.enterAmazonBuyLink(tc034Data.inputs.amazonUrl);
  });

  test('TC_UPLOAD_035: Verify Product Website Link field', async () => {
    const tc035Data = testData.TC_UPLOAD_035;
    const fieldVisible = await productUploadPage.verifyProductWebsiteLinkFieldVisible();
    expect(fieldVisible).toBe(tc035Data.expected.fieldVisible);
    await productUploadPage.enterProductWebsiteLink(tc035Data.inputs.websiteUrl);
  });

  test('TC_UPLOAD_036: Verify Price Range dropdown options', async () => {
    const tc036Data = testData.TC_UPLOAD_036;
    const dropdownVisible = await productUploadPage.verifyPriceRangeDropdownVisible();
    expect(dropdownVisible).toBe(tc036Data.expected.dropdownVisible);
  });

  test('TC_UPLOAD_037: Verify Single Price numeric field', async () => {
    const tc037Data = testData.TC_UPLOAD_037;
    await productUploadPage.selectSinglePriceOption();
    const fieldVisible = await productUploadPage.verifySinglePriceFieldVisible();
    expect(fieldVisible).toBe(tc037Data.expected.fieldVisible);
    await productUploadPage.enterSinglePrice(tc037Data.inputs.price);
    const enteredPrice = await productUploadPage.getSinglePriceValue();
    expect(enteredPrice).toBe(tc037Data.inputs.price);
  });

  test('TC_UPLOAD_038: Verify Price Range Min and Max fields', async () => {
    const tc038Data = testData.TC_UPLOAD_038;
    await productUploadPage.selectPriceRangeOption();
    const minMaxFieldsVisible = await productUploadPage.verifyMinMaxPriceFieldsVisible();
    expect(minMaxFieldsVisible).toBe(tc038Data.expected.minMaxFieldsVisible);
    await productUploadPage.enterPriceRange(tc038Data.inputs.minPrice, tc038Data.inputs.maxPrice);
  });

  test('TC_UPLOAD_039: Verify Custom label text input for pricing', async () => {
    const tc039Data = testData.TC_UPLOAD_039;
    await productUploadPage.selectCustomPriceLabelOption();
    await productUploadPage.enterCustomPriceLabel(tc039Data.inputs.customLabel);
  });

  test('TC_UPLOAD_040: Verify Support Helpline Number field', async () => {
    const tc040Data = testData.TC_UPLOAD_040;
    const fieldVisible = await productUploadPage.verifySupportHelplineFieldVisible();
    expect(fieldVisible).toBe(tc040Data.expected.fieldVisible);
    await productUploadPage.enterSupportHelplineNumber(tc040Data.inputs.helplineNumber);
  });

  test('TC_UPLOAD_041: Verify Expected Delivery Time field', async () => {
    const tc041Data = testData.TC_UPLOAD_041;
    const fieldVisible = await productUploadPage.verifyDeliveryTimeFieldVisible();
    expect(fieldVisible).toBe(tc041Data.expected.fieldVisible);
    await productUploadPage.enterDeliveryTime(tc041Data.inputs.deliveryDays);
  });

  test('TC_UPLOAD_042: Verify Tags/Metadata field', async () => {
    const tc042Data = testData.TC_UPLOAD_042;
    const fieldVisible = await productUploadPage.verifyTagsFieldVisible();
    expect(fieldVisible).toBe(tc042Data.expected.fieldVisible);
    await productUploadPage.enterTags(tc042Data.inputs.tags);
  });

  test('TC_UPLOAD_043: Verify Other Links field', async () => {
    const tc043Data = testData.TC_UPLOAD_043;
    const fieldVisible = await productUploadPage.verifyOtherLinksFieldVisible();
    expect(fieldVisible).toBe(tc043Data.expected.fieldVisible);
    await productUploadPage.enterOtherLinks(tc043Data.inputs.otherLinks);
  });

  test('TC_UPLOAD_044: Verify Save as Draft button functionality', async () => {
    const tc044Data = testData.TC_UPLOAD_044;
    await productUploadPage.fillPartialProductDetails({
      productName: tc044Data.inputs.productName,
      shortDescription: tc044Data.inputs.shortDescription
    });
    const saveAsDraftButtonVisible = await productUploadPage.verifySaveAsDraftButtonVisible();
    expect(saveAsDraftButtonVisible).toBe(tc044Data.expected.saveAsDraftButtonVisible);
    await productUploadPage.clickSaveAsDraft();
    const draftSavedSuccessfully = await productUploadPage.verifyDraftSavedSuccessfully();
    expect(draftSavedSuccessfully).toBe(tc044Data.expected.draftSavedSuccessfully);
    const confirmationMessageShown = await productUploadPage.verifyDraftConfirmationMessageShown();
    expect(confirmationMessageShown).toBe(tc044Data.expected.confirmationMessageShown);
  });

  test('TC_UPLOAD_045: Verify draft product appears in Product Management', async () => {
    const tc045Data = testData.TC_UPLOAD_045;
    await productUploadPage.fillPartialProductDetails({ productName: 'Draft Test Product', shortDescription: 'Test draft product' });
    await productUploadPage.clickSaveAsDraft();
    await productUploadPage.navigateToProductManagement();
    const draftProductVisible = await productUploadPage.verifyDraftProductVisible('Draft Test Product');
    expect(draftProductVisible).toBe(tc045Data.expected.draftProductVisible);
    const statusShowsDraft = await productUploadPage.verifyDraftStatusShown();
    expect(statusShowsDraft).toBe(tc045Data.expected.statusShowsDraft);
  });

  test('TC_UPLOAD_046: Verify draft product can be edited and uploaded', async () => {
    const tc046Data = testData.TC_UPLOAD_046;
    await productUploadPage.fillPartialProductDetails({ productName: 'Edit Draft Product', shortDescription: 'Test edit draft' });
    await productUploadPage.clickSaveAsDraft();
    await productUploadPage.navigateToProductManagement();
    await productUploadPage.clickEditDraftProduct();
    const savedDataLoaded = await productUploadPage.verifySavedDataLoaded('Edit Draft Product');
    expect(savedDataLoaded).toBe(tc046Data.expected.savedDataLoaded);
  });

  test('TC_UPLOAD_047: Verify draft does not go for admin review', async () => {
    const tc047Data = testData.TC_UPLOAD_047;
    await productUploadPage.fillPartialProductDetails({ productName: 'No Review Draft', shortDescription: 'Test no admin review' });
    await productUploadPage.clickSaveAsDraft();
    const notInAdminQueue = await productUploadPage.verifyDraftNotInAdminQueue();
    expect(notInAdminQueue).toBe(tc047Data.expected.notInAdminQueue);
  });

  test('TC_UPLOAD_048: Verify mandatory field validation before submission', async () => {
    const tc048Data = testData.TC_UPLOAD_048;
    await productUploadPage.clickUploadProductButton();
    const validationErrorsDisplayed = await productUploadPage.verifyValidationErrorsDisplayed();
    expect(validationErrorsDisplayed).toBe(tc048Data.expected.validationErrorsDisplayed);
  });

  test('TC_UPLOAD_050: Verify successful submission confirmation message', async () => {
    const tc050Data = testData.TC_UPLOAD_050;
    await productUploadPage.fillAllMandatoryFields({
      productName: tc050Data.inputs.productName,
      productType: tc050Data.inputs.productType,
      disabilityType: tc050Data.inputs.disabilityType,
      shortDescription: tc050Data.inputs.shortDescription
    });
    await productUploadPage.clickUploadProductButton();
    const confirmationShown = await productUploadPage.verifySubmissionSuccessMessage();
    expect(confirmationShown).toBe(tc050Data.expected.confirmationMessageShown);
  });

  test('TC_UPLOAD_051: Verify form supports keyboard navigation', async () => {
    const tc051Data = testData.TC_UPLOAD_051;
    const keyboardNavigationWorks = await productUploadPage.verifyKeyboardNavigationWorks();
    expect(keyboardNavigationWorks).toBe(tc051Data.expected.keyboardNavigationWorks);
    await productUploadPage.navigateFormWithKeyboard(5);
    const focusIndicatorVisible = await productUploadPage.verifyFocusIndicatorVisible();
    expect(focusIndicatorVisible).toBe(tc051Data.expected.allFieldsFocusable);
  });

  test('TC_UPLOAD_052: Verify visual focus indicators on form elements', async () => {
    const tc052Data = testData.TC_UPLOAD_052;
    const focusIndicatorsVisible = await productUploadPage.verifyFocusIndicatorsOnAllElements();
    expect(focusIndicatorsVisible).toBe(tc052Data.expected.focusIndicatorsVisible);
  });

  test('TC_UPLOAD_053: Verify all labels and buttons meet WCAG 2.1 AA', async () => {
    const tc053Data = testData.TC_UPLOAD_053;
    const allFieldsHaveLabels = await productUploadPage.verifyAllFieldsHaveLabels();
    expect(allFieldsHaveLabels).toBe(tc053Data.expected.allFieldsHaveLabels);
    const buttonsAccessible = await productUploadPage.verifyButtonsAccessible();
    expect(buttonsAccessible).toBe(tc053Data.expected.buttonsAccessible);
  });

  test('TC_UPLOAD_057: Verify user-friendly error for failed submission', async () => {
    const tc057Data = testData.TC_UPLOAD_057;
    await productUploadPage.setupSubmissionFailureRoute();
    await productUploadPage.fillAllMandatoryFields({
      productName: tc057Data.inputs.productName,
      productType: tc057Data.inputs.productType,
      disabilityType: tc057Data.inputs.disabilityType,
      shortDescription: tc057Data.inputs.shortDescription
    });
    await productUploadPage.clickUploadProductButton();
    const errorMessageShown = await productUploadPage.verifySubmissionErrorMessageDisplayed();
    expect(errorMessageShown).toBe(tc057Data.expected.errorMessageShown);
    const dataNotLost = await productUploadPage.verifyFormDataNotLost();
    expect(dataNotLost).toBe(tc057Data.expected.dataNotLost);
    await productUploadPage.clearSubmissionRoutes();
  });
});
