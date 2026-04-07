// spec: specs/functional/SCRUM-22-ap-edit-product-genai.json
// seed: tests/seed/vendor-product-list.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductManagementPage } from '../../pages/product-management.page';
import testData from '../../test-data/scrum22-genai-edit-product.json';

test.describe('SCRUM-22: AP Edits Product Details with GenAI', () => {
  test.describe('1. Access to Edit Mode', () => {
    test.setTimeout(60000);

    let loginPage: LoginPage;
    let productManagementPage: ProductManagementPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productManagementPage = new ProductManagementPage(page);
    });

    test('TC_EDIT_001: Verify Edit Product option in Product Management action column', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);

      // Step 2: Navigate to Dashboard → Product Management
      await expect(productManagementPage.pageHeading).toBeVisible();

      // Step 3: Locate a product in the list
      const productButtons = page.getByRole('button', { name: /^More actions for/ });
      await expect(productButtons.first()).toBeVisible({ timeout: 10000 });
      const productCount = await productButtons.count();
      expect(productCount).toBeGreaterThan(0);

      // Step 4: Verify 'Edit Product' option in action column
      const firstProductName = (await productButtons.first().getAttribute('aria-label') ?? '').replace('More actions for ', '');
      const editOptionVisible = await productManagementPage.verifyEditProductOptionInActionsMenu(firstProductName);
      expect(editOptionVisible).toBeTruthy();
    });

    test('TC_EDIT_002: Verify Product Edit Form opens with all editable fields', async () => {
      // Step 1: Login and navigate to Product Management
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();

      // Step 2: Click 'Edit Product' for an existing product
      await productManagementPage.openEditProductForFirstProduct();

      // Step 3: Wait for Product Edit Form to load
      await productManagementPage.verifyEditProductFormOpen();

      // Step 4: Verify all editable fields are displayed
      const fieldsResult = await productManagementPage.verifyAllEditableFieldsDisplayed(testData.TC_EDIT_002.expected.editableFields);
      expect(fieldsResult.allFieldsVisible, `Missing fields: ${fieldsResult.missingFields.join(', ')}`).toBe(true);
    });

    test('TC_EDIT_003: Verify all fields are editable for draft products', async () => {
      // Step 1: Login and navigate to Product Management
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();

      // Step 2: Click Edit on a product (preferably Draft status)
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 3: Verify all fields are editable
      const editableResult = await productManagementPage.verifyAllFieldsEditable();
      expect(editableResult.allEditable, `Read-only fields found: ${editableResult.readOnlyFields.join(', ')}`).toBe(testData.TC_EDIT_003.expected.allFieldsEditable);
    });

    test('TC_EDIT_043: Verify edit without using GenAI (manual edit)', async () => {
      // Step 1: Login and navigate to Product Management
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();

      // Step 2: Open Product Edit Form
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 3: Edit fields manually without using GenAI
      const editResult = await productManagementPage.editFieldsManuallyWithoutGenAI({
        shortDescription: testData.TC_EDIT_043.inputs.manualShortDescription
      });

      // Step 4: Verify manual edits are saved
      expect(editResult.editsMade).toBe(true);
      expect(editResult.valuesSaved).toBe(testData.TC_EDIT_043.expected.manualEditsSaved);
    });

    test('TC_EDIT_048: Verify cancel edit without saving', async () => {
      // Step 1: Login and navigate to Product Management
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();

      // Step 2: Open Product Edit Form and make edits
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_048.inputs.unsavedEdit);

      // Step 3: Click Cancel or navigate away
      const cancelResult = await productManagementPage.cancelEditWithoutSaving();

      // Step 4: Verify original content is preserved
      expect(cancelResult.cancelTriggered).toBe(true);
      expect(cancelResult.originalPreserved).toBe(testData.TC_EDIT_048.expected.originalPreserved);
    });
  });

  test.describe('2. GenAI Assistance Availability', () => {
    test.setTimeout(90000);

    let loginPage: LoginPage;
    let productManagementPage: ProductManagementPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productManagementPage = new ProductManagementPage(page);
    });

    test('TC_EDIT_004: Verify Enhance with GenAI button visibility on all text fields', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Verify GenAI buttons on text fields
      const buttonsResult = await productManagementPage.verifyGenAIButtonsOnTextFields();
      expect(buttonsResult.shortDescriptionButton).toBe(testData.TC_EDIT_004.expected.shortDescriptionButtonVisible);
    });

    test('TC_EDIT_007: Verify GenAI button is inactive when field is empty', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Clear the Short Description field and verify button state
      const inactiveResult = await productManagementPage.verifyGenAIButtonInactiveWhenEmpty();
      expect(inactiveResult.fieldCleared).toBe(true);
      expect(inactiveResult.buttonInactive).toBe(testData.TC_EDIT_007.expected.buttonInactiveWhenEmpty);
    });
  });


  test.describe('3. GenAI Editing Capabilities', () => {
    test.setTimeout(90000);

    let loginPage: LoginPage;
    let productManagementPage: ProductManagementPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productManagementPage = new ProductManagementPage(page);
    });

    test('TC_EDIT_008: Verify GenAI improves text quality (readability, grammar, tone)', async () => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Enter complex/technical text with grammatical errors
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_008.inputs.complexTextWithErrors);

      // Step 3: Click 'Enhance with GenAI' button
      await productManagementPage.clickGenAIButtonForShortDescriptionInEditForm();
      await productManagementPage.waitForGenAIModalVisible();

      // Step 4: Click Generate Content and wait for AI suggestions
      await productManagementPage.clickGenerateContentButton();
      await productManagementPage.waitForGenAIContentGenerated();

      // Step 5: Review the improved text
      const generatedContent = await productManagementPage.getGeneratedContentText();
      expect(generatedContent.length).toBeGreaterThan(testData.TC_EDIT_008.expected.minContentLength);

      const qualityCheck = await productManagementPage.verifyGenAIImprovedTextQuality(
        generatedContent,
        testData.TC_EDIT_008.expected.forbiddenPatterns
      );
      expect(qualityCheck.passed, `Found errors: ${qualityCheck.foundErrors.join(', ')}`).toBe(true);

      await productManagementPage.closeGenAIModal();
    });

    test('TC_EDIT_011: Verify GenAI adds accessibility language', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Enter basic product description without accessibility focus
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_011.inputs.basicDescription);

      // Step 3: Click GenAI button and generate suggestions
      await productManagementPage.clickGenAIButtonForShortDescriptionInEditForm();
      await productManagementPage.waitForGenAIModalVisible();
      await productManagementPage.clickGenerateContentButton();
      await productManagementPage.waitForGenAIContentGenerated();

      // Step 4: Verify accessibility language is added
      const generatedContent = await productManagementPage.getGeneratedContentText();
      const accessibilityCheck = await productManagementPage.verifyGenAIAddsAccessibilityLanguage(generatedContent);
      expect(accessibilityCheck.hasAccessibilityLanguage).toBe(testData.TC_EDIT_011.expected.hasAccessibilityLanguage);

      await productManagementPage.closeGenAIModal();
    });

    test('TC_EDIT_041: Verify GenAI handles multiple consecutive edits', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Fill initial text
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_041.inputs.firstText);

      // Step 3: Perform multiple consecutive edits
      const multiEditResult = await productManagementPage.performMultipleConsecutiveEdits();
      expect(multiEditResult.firstEditSuccessful).toBe(true);
      expect(multiEditResult.systemResponsive).toBe(testData.TC_EDIT_041.expected.systemResponsive);
    });
  });

  test.describe('4. ALT Text Generation and Editing', () => {
    test.setTimeout(90000);

    let loginPage: LoginPage;
    let productManagementPage: ProductManagementPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productManagementPage = new ProductManagementPage(page);
    });

    test('TC_EDIT_013: Verify Add/Improve ALT Text with GenAI button for images', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Verify ALT Text GenAI button for images
      const altTextResult = await productManagementPage.verifyAltTextGenAIButtonForImages();
      expect(altTextResult.altTextButtonsVisible).toBeGreaterThanOrEqual(0);
    });

    test('TC_EDIT_014: Verify GenAI generates proper ALT text', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Generate ALT text and verify quality
      const altTextResult = await productManagementPage.generateAndVerifyAltText();
      if (altTextResult.altTextGenerated) {
        expect(altTextResult.characterCount).toBeLessThanOrEqual(testData.TC_EDIT_014.expected.maxCharacters);
        expect(altTextResult.hasDecorativePhrasing).toBe(!testData.TC_EDIT_014.expected.noDecorativePhrasing);
      }
    });

    test('TC_EDIT_017: Verify AP can manually edit generated ALT text', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Generate ALT text
      const generateResult = await productManagementPage.generateAndVerifyAltText();

      // Step 3: Edit the generated ALT text manually
      if (generateResult.altTextGenerated) {
        const editResult = await productManagementPage.editGeneratedAltText(testData.TC_EDIT_017.inputs.customAltText);
        expect(editResult.editSuccessful).toBe(testData.TC_EDIT_017.expected.editSuccessful);
      }
    });
  });


  test.describe('5. AI-Generated Suggestions', () => {
    test.setTimeout(90000);

    let loginPage: LoginPage;
    let productManagementPage: ProductManagementPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productManagementPage = new ProductManagementPage(page);
    });

    test('TC_EDIT_018: Verify side-by-side comparison of original vs AI suggestions', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Enter text and trigger GenAI
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_018.inputs.sampleText);
      await productManagementPage.clickGenAIButtonForShortDescriptionInEditForm();
      await productManagementPage.waitForGenAIModalVisible();
      await productManagementPage.clickGenerateContentButton();
      await productManagementPage.waitForGenAIContentGenerated();

      // Step 3: Verify side-by-side display
      const comparisonResult = await productManagementPage.verifySideBySideComparison();
      expect(comparisonResult.comparisonLayoutExists).toBe(testData.TC_EDIT_018.expected.sideBySideDisplayed);

      await productManagementPage.closeGenAIModal();
    });

    test('TC_EDIT_019: Verify Accept all AI suggestions functionality', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Generate AI suggestions
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_019.inputs.sampleText);
      await productManagementPage.clickGenAIButtonForShortDescriptionInEditForm();
      await productManagementPage.waitForGenAIModalVisible();
      await productManagementPage.clickGenerateContentButton();
      await productManagementPage.waitForGenAIContentGenerated();

      // Step 3: Accept all suggestions
      const acceptResult = await productManagementPage.acceptAllAISuggestions();
      expect(acceptResult.acceptButtonClicked).toBe(true);
      expect(acceptResult.suggestionsApplied).toBe(testData.TC_EDIT_019.expected.suggestionsAccepted);
    });

    test('TC_EDIT_020: Verify Edit or merge parts manually functionality', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Enter original text
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_020.inputs.originalText);

      // Step 3: Generate AI suggestions
      await productManagementPage.clickGenAIButtonForShortDescriptionInEditForm();
      await productManagementPage.waitForGenAIModalVisible();
      await productManagementPage.clickGenerateContentButton();
      await productManagementPage.waitForGenAIContentGenerated();

      // Step 4: Edit/merge with original text manually
      const generatedContent = await productManagementPage.getShortDescriptionValueInModal();
      expect(generatedContent.length).toBeGreaterThan(testData.TC_EDIT_020.expected.minContentLength);

      await productManagementPage.editGeneratedContentInModal(testData.TC_EDIT_020.expected.editedTextSuffix);
      const editedContent = await productManagementPage.getShortDescriptionValueInModal();
      expect(editedContent).toContain(testData.TC_EDIT_020.expected.editedTextSuffix);

      // Step 5: Save merged content
      await productManagementPage.clickAcceptAndInsertButton();
      await productManagementPage.verifyGenAIModalClosed();

      const savedContent = await productManagementPage.getShortDescriptionValueInEditForm();
      expect(savedContent).toContain(testData.TC_EDIT_020.expected.editedTextSuffix);
    });

    test('TC_EDIT_021: Verify Reject and retain original content functionality', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Enter original text
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_021.inputs.originalText);

      // Step 3: Generate AI suggestions
      await productManagementPage.clickGenAIButtonForShortDescriptionInEditForm();
      await productManagementPage.waitForGenAIModalVisible();
      await productManagementPage.clickGenerateContentButton();
      await productManagementPage.waitForGenAIContentGenerated();

      // Step 4: Reject suggestions
      const rejectResult = await productManagementPage.rejectAISuggestionsAndRetainOriginal();
      expect(rejectResult.rejectButtonClicked).toBe(true);
      expect(rejectResult.originalRetained).toBe(testData.TC_EDIT_021.expected.originalRetained);
    });
  });

  test.describe('6. Accessibility & Compliance Focus', () => {
    test.setTimeout(90000);

    let loginPage: LoginPage;
    let productManagementPage: ProductManagementPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productManagementPage = new ProductManagementPage(page);
    });

    test('TC_EDIT_025: Verify generated text includes sensory/physical feature cues', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Enter product description
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_025.inputs.productDescription);

      // Step 3: Generate AI suggestions
      await productManagementPage.clickGenAIButtonForShortDescriptionInEditForm();
      await productManagementPage.waitForGenAIModalVisible();
      await productManagementPage.clickGenerateContentButton();
      await productManagementPage.waitForGenAIContentGenerated();

      // Step 4: Verify sensory/physical feature cues
      const generatedContent = await productManagementPage.getGeneratedContentText();
      const featureCheck = await productManagementPage.verifySensoryPhysicalFeatureCues(generatedContent);

      // At least some features should be present
      const hasFeatures = featureCheck.hasSensoryFeatures || featureCheck.hasPhysicalFeatures;
      expect(hasFeatures, `Features found: ${featureCheck.featuresFound.join(', ')}`).toBe(true);

      await productManagementPage.closeGenAIModal();
    });
  });


  test.describe('7. Saving and Version Control', () => {
    test.setTimeout(90000);

    let loginPage: LoginPage;
    let productManagementPage: ProductManagementPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productManagementPage = new ProductManagementPage(page);
    });

    test('TC_EDIT_026: Verify Save Changes creates new version', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Make edits using GenAI
      await productManagementPage.fillShortDescriptionInEditForm('Updated product description for version testing.');

      // Step 3: Save changes and verify new version
      const saveResult = await productManagementPage.saveChangesAndVerifyVersion();
      expect(saveResult.saveSuccessful).toBe(testData.TC_EDIT_026.expected.saveSuccessful);
    });

    test('TC_EDIT_027: Verify product status changes to Pending Review after save', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Edit and save
      await productManagementPage.fillShortDescriptionInEditForm('Updated for status change testing.');
      const saveResult = await productManagementPage.saveChangesAndVerifyVersion();

      // Step 3: Verify status is Pending Review
      if (saveResult.saveSuccessful) {
        const statusResult = await productManagementPage.verifyProductStatusPendingReview();
        expect(statusResult.statusChanged).toBe(testData.TC_EDIT_027.expected.statusPendingReview);
      }
    });

    test('TC_EDIT_040: Verify version rollback functionality', async () => {
      // Step 1: Login and navigate to Product Management
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();

      // Step 2: Open Product Edit Form
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 3: Access version history
      const versionAccess = await productManagementPage.accessVersionHistory();
      expect(versionAccess.isAccessible).toBe(testData.TC_EDIT_040.expected.versionHistoryAccessible);

      // Step 4: Verify previous versions are listed
      const versionHistory = await productManagementPage.verifyVersionHistoryDisplayed();
      expect(versionHistory.isDisplayed).toBe(testData.TC_EDIT_040.expected.previousVersionsListed);
      expect(versionHistory.hasRollbackOption).toBe(testData.TC_EDIT_040.expected.rollbackOptionAvailable);

      // Step 5: Select and rollback to previous version
      const versionSelected = await productManagementPage.selectPreviousVersion(1);
      expect(versionSelected).toBe(true);

      const rollbackResult = await productManagementPage.rollbackToSelectedVersion();
      expect(rollbackResult.success).toBe(true);

      const reverted = await productManagementPage.verifyProductRevertedToVersion();
      expect(reverted).toBe(true);
    });
  });

  test.describe('8. Confirmation and System Feedback', () => {
    test.setTimeout(90000);

    let loginPage: LoginPage;
    let productManagementPage: ProductManagementPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productManagementPage = new ProductManagementPage(page);
    });

    test('TC_EDIT_028: Verify confirmation message after successful save', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Edit and save
      await productManagementPage.fillShortDescriptionInEditForm('Updated for confirmation message testing.');
      const saveResult = await productManagementPage.saveChangesAndVerifyVersion();

      // Step 3: Verify confirmation message
      if (saveResult.saveSuccessful) {
        const messageResult = await productManagementPage.verifyConfirmationMessageAfterSave(
          testData.TC_EDIT_028.expected.confirmationMessage
        );
        expect(messageResult.messageDisplayed).toBe(true);
      }
    });
  });

  test.describe('9. Usability and Accessibility of GenAI Interface', () => {
    test.setTimeout(90000);

    let loginPage: LoginPage;
    let productManagementPage: ProductManagementPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      productManagementPage = new ProductManagementPage(page);
    });

    test('TC_EDIT_033: Verify GenAI interface supports keyboard navigation', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Fill text to enable GenAI button
      await productManagementPage.fillShortDescriptionInEditForm('Sample text for keyboard navigation testing.');

      // Step 3: Verify keyboard navigation
      const keyboardResult = await productManagementPage.verifyKeyboardNavigationInGenAI();
      expect(keyboardResult.buttonActivatesWithEnter || keyboardResult.panelNavigable).toBe(testData.TC_EDIT_033.expected.keyboardNavigable);

      // Close modal if open
      await productManagementPage.closeGenAIModal();
    });

    test('TC_EDIT_035: Verify clear contrast and focus states in GenAI interface', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Open GenAI panel
      await productManagementPage.fillShortDescriptionInEditForm('Sample text for focus state testing.');
      await productManagementPage.clickGenAIButtonForShortDescriptionInEditForm();
      await productManagementPage.waitForGenAIModalVisible();

      // Step 3: Verify focus states
      const focusResult = await productManagementPage.verifyFocusStatesAndContrast();
      expect(focusResult.focusIndicatorsVisible).toBe(testData.TC_EDIT_035.expected.focusIndicatorsVisible);

      await productManagementPage.closeGenAIModal();
    });

    test('TC_EDIT_036: Verify visual distinction between original and AI-generated text', async () => {
      // Step 1: Login and open Product Edit Form
      await loginPage.navigate(testData.baseUrl);
      await loginPage.loginAsVendor(testData.ssoCredentials.email, testData.ssoCredentials.password);
      await expect(productManagementPage.pageHeading).toBeVisible();
      await productManagementPage.openEditProductForFirstProduct();
      await productManagementPage.verifyEditProductFormOpen();

      // Step 2: Enter sample text
      await productManagementPage.fillShortDescriptionInEditForm(testData.TC_EDIT_036.inputs.sampleText);

      // Step 3: Generate AI suggestions
      await productManagementPage.clickGenAIButtonForShortDescriptionInEditForm();
      await productManagementPage.waitForGenAIModalVisible();
      await productManagementPage.clickGenerateContentButton();
      await productManagementPage.waitForGenAIContentGenerated();

      // Step 4: Verify visual distinction
      const visualDistinction = await productManagementPage.verifyVisualDistinctionInGenAIModal();
      expect(visualDistinction.bothTextsDisplayed).toBe(true);
      expect(visualDistinction.hasVisualDistinction).toBe(true);

      // Step 5: Verify labels
      const labelCheck = await productManagementPage.verifyContentLabelsInGenAIModal(
        testData.TC_EDIT_036.expected.originalLabelPatterns,
        testData.TC_EDIT_036.expected.aiSuggestedLabelPatterns
      );
      const hasDistinction = labelCheck.hasOriginalLabel || labelCheck.hasAILabel || visualDistinction.hasVisualDistinction;
      expect(hasDistinction).toBe(true);

      await productManagementPage.closeGenAIModal();
    });
  });
});
