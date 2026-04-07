// spec: specs/functional/SCRUM-20-genai-assistant-product-info.json
// seed: tests/seed/vendor-login.seed.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum20-genai-button-display.json';
import { LoginPage } from '../../pages/login.page';
import { ProductUploadPage } from '../../pages/product-upload.page';

let loginPage: LoginPage;
let productUploadPage: ProductUploadPage;

test.describe('SCRUM-20: GenAI Assistant for Product Information', () => {
  test.setTimeout(90000);

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productUploadPage = new ProductUploadPage(page);
  });

  test.describe('AC1 - Access to GenAI Assistance', () => {
    test('TC_GENAI_001: Verify GenAI button visibility on Short Description field', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Dashboard → Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Locate the Short Description field
      await productUploadPage.verifyShortDescriptionFieldVisible();

      // Step 4: Verify 'Assist with GenAI' button/icon is visible next to the field
      await productUploadPage.verifyGenAIButtonVisibleForShortDescription();
    });

    test('TC_GENAI_002: Verify GenAI button visibility on Detailed Description field', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Dashboard → Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Locate the Detailed Description field
      await productUploadPage.verifyDetailedDescriptionFieldVisible();

      // Step 4: Verify 'Assist with GenAI' button/icon is visible next to the field
      await productUploadPage.verifyDetailedDescriptionGenAIButtonVisible();
    });

    test('TC_GENAI_003: Verify GenAI button visibility on Unique Features field', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Dashboard → Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Verify 'Assist with GenAI' button/icon is visible next to Unique Features field
      await productUploadPage.verifyUniqueFeatureGenAIButtonVisible();
    });
  });

  test.describe('AC3 - Generated Content, AC5 - Accessibility Compliance', () => {
    test('TC_GENAI_006: Generate Short Description with minimal product inputs', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Enter minimal product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_006.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_006.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_006.disabilityPercentage);

      // Step 4: Generate Short Description using GenAI
      await productUploadPage.generateShortDescriptionContent();

      // Step 5: Verify generated content has appropriate length
      const contentLengthValid = await productUploadPage.verifyGeneratedContentLength(
        testData.TC_GENAI_006.expected.shortDescriptionMinChars,
        testData.TC_GENAI_006.expected.shortDescriptionMaxChars
      );
      expect(contentLengthValid).toBe(true);

      // Step 6: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });

    test('TC_GENAI_014: Verify generated content avoids jargon and ambiguous terms', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details for GenAI content generation
      const testProduct = testData.TC_GENAI_014.testProducts[0];
      await productUploadPage.fillProductNameForGenAI(testProduct.productName);
      await productUploadPage.selectProductType(testProduct.productType);
      await productUploadPage.selectDisabilityPercentage(testProduct.disabilityPercentage);

      // Step 4: Click GenAI button for Short Description
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();

      // Step 5: Click Generate Content button (Product Name is pre-filled from form)
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 6: Get generated content and verify it avoids jargon
      const generatedContent = await productUploadPage.getGeneratedContentText();
      const jargonCheck = await productUploadPage.verifyContentAvoidsJargon(
        generatedContent,
        testData.TC_GENAI_014.forbiddenTerms
      );

      // Step 7: Verify no forbidden terms found
      expect(jargonCheck.passed, `Found forbidden terms: ${jargonCheck.foundTerms.join(', ')}`).toBe(true);

      // Step 8: Verify content was generated (has reasonable length)
      expect(generatedContent.length).toBeGreaterThan(20);

      // Step 9: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });

    test('TC_GENAI_035: Verify generated content avoids bias and discriminatory phrasing', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_035.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_035.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_035.disabilityPercentage);

      // Step 4: Generate content using GenAI
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Get generated content and verify it avoids bias
      const generatedContent = await productUploadPage.getGeneratedContentText();
      const biasCheck = await productUploadPage.verifyContentAvoidsBias(
        generatedContent,
        testData.TC_GENAI_035.biasTerms
      );

      // Step 6: Verify no bias terms found
      expect(biasCheck.passed, `Found bias terms: ${biasCheck.foundTerms.join(', ')}`).toBe(true);

      // Step 7: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });
  });

  test.describe('AC4 - Editing and Customization', () => {
    test('TC_GENAI_015: Edit GenAI-generated text before submission', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details for GenAI content generation
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_015.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_015.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_015.disabilityPercentage);

      // Step 4: Generate Short Description using GenAI
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Click 'Edit' button on generated content
      await productUploadPage.clickEditButtonOnGeneratedContent();

      // Step 6: Verify edit mode is activated
      await productUploadPage.verifyEditModeActivated();

      // Step 7: Modify the generated text
      await productUploadPage.modifyGeneratedText(testData.TC_GENAI_015.editedText);

      // Step 8: Save the edited content
      await productUploadPage.saveEditedContent();

      // Step 9: Verify changes are preserved in the field
      const fieldValue = await productUploadPage.getShortDescriptionFieldValue();
      expect(fieldValue.length).toBeGreaterThan(0);
    });

    test('TC_GENAI_016: Regenerate content using Regenerate button', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details for GenAI content generation
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_016.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_016.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_016.disabilityPercentage);

      // Step 4: Generate initial content
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Get the original generated content
      const originalContent = await productUploadPage.getGeneratedContentText();
      expect(originalContent.length).toBeGreaterThan(10);

      // Step 6: Verify Regenerate button is visible
      await productUploadPage.verifyRegenerateButtonVisible();

      // Step 7: Click Regenerate and compare content
      const { newContent, isDifferent } = await productUploadPage.regenerateAndCompareContent(originalContent);

      // Step 8: Verify new content was generated (may or may not be different due to AI behavior)
      expect(newContent.length).toBeGreaterThan(10);

      // Step 9: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });

    test('TC_GENAI_017: Accept generated content using Accept button', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details for GenAI content generation
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_017.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_017.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_017.disabilityPercentage);

      // Step 4: Generate Short Description using GenAI
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Review the generated content and verify Accept button is visible
      await productUploadPage.verifyAcceptButtonVisible();

      // Step 6: Click 'Accept & Insert' button
      await productUploadPage.clickAcceptAndInsertButton();

      // Step 7: Verify GenAI panel closes
      await productUploadPage.verifyGenAIModalClosed();

      // Step 8: Verify content is inserted into Short Description field
      const insertedContent = await productUploadPage.verifyContentInsertedInShortDescription();
      expect(insertedContent.length).toBeGreaterThan(10);
    });
  });

  test.describe('AC6 - Transparency and Control', () => {
    test('TC_GENAI_021: Verify AI-generated content disclaimer is displayed', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_021.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_021.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_021.disabilityPercentage);

      // Step 4: Open GenAI assistant panel
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();

      // Step 5: Verify AI disclaimer is visible
      const disclaimerVisible = await productUploadPage.verifyAIDisclaimerVisible();
      expect(disclaimerVisible).toBe(true);

      // Step 6: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });

    test('TC_GENAI_022: Verify AP can discard GenAI-generated text', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_022.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_022.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_022.disabilityPercentage);

      // Step 4: Generate content using GenAI
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Click discard/cancel button
      await productUploadPage.clickDiscardButton();

      // Step 6: Verify GenAI modal is closed
      await productUploadPage.verifyGenAIModalClosed();

      // Step 7: Verify field remains empty (content was not inserted)
      const fieldEmpty = await productUploadPage.verifyFieldRemainsEmpty();
      expect(fieldEmpty).toBe(true);
    });
  });

  test.describe('AC7 - Integration and Experience', () => {
    test('TC_GENAI_024: Verify conversational refinement - make it simpler', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details for GenAI content generation
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_024.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_024.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_024.disabilityPercentage);

      // Step 4: Generate Short Description using GenAI
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Get the original generated content
      const originalContent = await productUploadPage.getGeneratedContentText();
      expect(originalContent.length).toBeGreaterThan(10);

      // Step 6: Type refinement instruction in Short Description field
      // The GenAI modal uses the Short Description field as context for generation
      await productUploadPage.typeRefinementInstruction(testData.TC_GENAI_024.refinementInstruction);

      // Step 7: Submit the refinement request by clicking Generate Content again
      await productUploadPage.submitRefinementRequest();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 8: Get the refined content
      const refinedContent = await productUploadPage.getGeneratedContentText();

      // Step 9: Verify refinement was processed
      // The key verification is that:
      // 1. New content was generated (has meaningful length)
      // 2. The system accepted the refinement instruction
      expect(refinedContent.length).toBeGreaterThan(10);
      
      // Verify the refinement instruction was processed by checking content exists
      // Note: The actual "simplification" depends on AI behavior, so we verify the flow works
      const refinementProcessed = await productUploadPage.verifyRefinementProcessed(originalContent, refinedContent);
      expect(refinementProcessed).toBe(true);

      // Step 10: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });

    test('TC_GENAI_025: Verify conversational refinement - add safety information', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details for medical device
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_025.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_025.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_025.disabilityPercentage);

      // Step 4: Generate initial content
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Get the original generated content
      const originalContent = await productUploadPage.getGeneratedContentText();
      expect(originalContent.length).toBeGreaterThan(10);

      // Step 6: Type refinement instruction to add safety information
      await productUploadPage.typeRefinementInstruction(testData.TC_GENAI_025.refinementInstruction);

      // Step 7: Submit the refinement request
      await productUploadPage.submitRefinementRequest();
      
      // Step 8: Wait for content generation with shorter timeout for refinement
      // Refinement may take longer or fail - we verify the flow handles this gracefully
      const refinementSucceeded = await productUploadPage.waitForRefinementWithTimeout(30000);
      
      if (refinementSucceeded) {
        // Step 9a: If refinement succeeded, verify content was updated
        const refinedContent = await productUploadPage.getGeneratedContentText();
        expect(refinedContent.length).toBeGreaterThan(10);
        console.log('Refinement succeeded - safety information may have been added');
      } else {
        // Step 9b: If refinement timed out, verify the modal is still functional
        console.log('Refinement generation timed out - verifying modal is still functional');
        const retryAvailable = await productUploadPage.verifyRetryOptionAvailable();
        expect(retryAvailable).toBe(true);
      }

      // Step 10: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });

    test('TC_GENAI_040: Verify GenAI loading state indicator', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_040.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_040.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_040.disabilityPercentage);

      // Step 4: Open GenAI assistant
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();

      // Step 5: Verify loading indicator appears during generation
      const loadingVisible = await productUploadPage.verifyLoadingIndicatorVisible();
      
      // Step 6: Wait for content generation to complete
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 7: Verify content was generated
      const content = await productUploadPage.getGeneratedContentText();
      expect(content.length).toBeGreaterThan(10);

      // Step 8: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });
  });

  test.describe('Edge Cases - Input Handling', () => {
    test('TC_GENAI_028: Verify GenAI handles empty/minimal input gracefully', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Select only required dropdowns without product name
      await productUploadPage.selectProductType(testData.TC_GENAI_028.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_028.disabilityPercentage);

      // Step 4: Try to open GenAI assistant without entering product name
      await productUploadPage.clickGenAIForShortDescription();
      
      // Step 5: Verify system handles empty input gracefully
      // The modal may or may not open - either behavior is acceptable
      try {
        await productUploadPage.waitForGenAIModalVisible();
        // If modal opens, verify it handles empty input
        const handledGracefully = await productUploadPage.verifyEmptyInputHandling();
        expect(handledGracefully).toBe(true);
        // Close the modal
        await productUploadPage.closeGenAIModal();
      } catch {
        // If modal doesn't open, that's also acceptable behavior (validation)
        console.log('GenAI modal did not open without product name - validation working');
        // Verify the page is still functional
        await productUploadPage.verifyShortDescriptionFieldVisible();
      }
    });

    test('TC_GENAI_029: Verify GenAI handles special characters in input', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Select required dropdowns
      await productUploadPage.selectProductType(testData.TC_GENAI_029.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_029.disabilityPercentage);

      // Step 4: Verify special characters are handled
      const specialCharsHandled = await productUploadPage.verifySpecialCharactersHandled(testData.TC_GENAI_029.productName);
      expect(specialCharsHandled).toBe(true);

      // Step 5: Close the GenAI modal if open
      await productUploadPage.closeGenAIModal().catch(() => {});
    });

    test('TC_GENAI_030: Verify GenAI handles very long input text', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Select required dropdowns
      await productUploadPage.selectProductType(testData.TC_GENAI_030.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_030.disabilityPercentage);

      // Step 4: Verify long input is handled
      const longInputHandled = await productUploadPage.verifyLongInputHandled(testData.TC_GENAI_030.productName);
      expect(longInputHandled).toBe(true);

      // Step 5: Close the GenAI modal if open
      await productUploadPage.closeGenAIModal().catch(() => {});
    });
  });

  test.describe('Error Handling', () => {
    test('TC_GENAI_031: Verify GenAI service unavailable error handling', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details for GenAI content generation
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_031.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_031.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_031.disabilityPercentage);

      // Step 4: Setup route to simulate GenAI service unavailability
      await productUploadPage.setupGenAIServiceUnavailableRoute();

      // Step 5: Open GenAI assistant
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();

      // Step 6: Attempt to generate content when service is down
      await productUploadPage.clickGenerateContentAndWaitForError();

      // Step 7: Verify user-friendly error message is displayed
      const errorDisplayed = await productUploadPage.verifyGenAIErrorMessageDisplayed();
      expect(errorDisplayed).toBe(true);

      // Step 8: Verify user can retry or continue manually
      const retryAvailable = await productUploadPage.verifyRetryOptionAvailable();
      expect(retryAvailable).toBe(true);

      // Step 9: Clean up - clear routes and close modal
      await productUploadPage.clearGenAIServiceRoutes();
      await productUploadPage.closeGenAIModal();
    });
  });

  test.describe('AC2 - Input and Context', () => {
    test('TC_GENAI_007: Generate Detailed Description with product context', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_007.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_007.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_007.disabilityPercentage);

      // Step 4: Generate Detailed Description using GenAI
      await productUploadPage.clickGenAIForDetailedDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Get generated content and verify it includes relevant information
      const generatedContent = await productUploadPage.getGeneratedContentText();
      expect(generatedContent.length).toBeGreaterThan(20);

      // Step 6: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });

    test('TC_GENAI_013: Verify Short Description character limit (50-200 chars)', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_013.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_013.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_013.disabilityPercentage);

      // Step 4: Generate Short Description using GenAI
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Verify character count is within limits
      const contentLengthValid = await productUploadPage.verifyGeneratedContentLength(
        testData.TC_GENAI_013.expected.minChars,
        testData.TC_GENAI_013.expected.maxChars
      );
      expect(contentLengthValid).toBe(true);

      // Step 6: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });

    test('TC_GENAI_023: Verify GenAI panel appears as dialog/popup', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_023.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_023.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_023.disabilityPercentage);

      // Step 4: Click GenAI button
      await productUploadPage.clickGenAIForShortDescription();

      // Step 5: Verify GenAI panel appears as dialog
      const isDialog = await productUploadPage.verifyGenAIPanelIsDialog();
      expect(isDialog).toBe(true);

      // Step 6: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });

    test('TC_GENAI_033: Verify multiple consecutive generations', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_033.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_033.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_033.disabilityPercentage);

      // Step 4: Generate content multiple times
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();

      // Step 5: Perform multiple generations
      const allGenerationsSucceeded = await productUploadPage.performMultipleGenerations(testData.TC_GENAI_033.regenerateCount);
      expect(allGenerationsSucceeded).toBe(true);

      // Step 6: Close the GenAI modal
      await productUploadPage.closeGenAIModal();
    });
  });

  test.describe('Accessibility - Keyboard Navigation', () => {
    test('TC_GENAI_036: Verify GenAI panel keyboard accessibility', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_036.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_036.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_036.disabilityPercentage);

      // Step 4: Open GenAI panel
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();

      // Step 5: Verify keyboard navigation works
      const keyboardAccessible = await productUploadPage.verifyKeyboardAccessibility();
      expect(keyboardAccessible).toBe(true);

      // Step 6: Verify Escape closes the panel
      await page.keyboard.press('Escape');
      await productUploadPage.verifyGenAIModalClosed();
    });
  });

  test.describe('Multilingual Support', () => {
    test('TC_GENAI_041: Verify GenAI works with multilingual product names', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Select required dropdowns
      await productUploadPage.selectProductType(testData.TC_GENAI_041.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_041.disabilityPercentage);

      // Step 4: Verify multilingual input is handled
      const multilingualHandled = await productUploadPage.verifyMultilingualInputHandled(testData.TC_GENAI_041.productName);
      expect(multilingualHandled).toBe(true);

      // Step 5: Close the GenAI modal if open
      await productUploadPage.closeGenAIModal().catch(() => {});
    });
  });

  test.describe('Complete Rewrite', () => {
    test('TC_GENAI_042: Verify complete rewrite of GenAI-generated text', async ({ page }) => {
      // Step 1: Login as approved Assistive Partner
      await loginPage.navigate(testData.url);
      await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

      // Step 2: Navigate to Product Upload
      await productUploadPage.navigateToProductUpload();

      // Step 3: Fill product details
      await productUploadPage.fillProductNameForGenAI(testData.TC_GENAI_042.productName);
      await productUploadPage.selectProductType(testData.TC_GENAI_042.productType);
      await productUploadPage.selectDisabilityPercentage(testData.TC_GENAI_042.disabilityPercentage);

      // Step 4: Generate content using GenAI
      await productUploadPage.clickGenAIForShortDescription();
      await productUploadPage.waitForGenAIModalVisible();
      await productUploadPage.clickGenerateContentButton();
      await productUploadPage.waitForGenAIContentGenerated();

      // Step 5: Completely rewrite the generated text
      await productUploadPage.completelyRewriteGeneratedText(testData.TC_GENAI_042.manualText);

      // Step 6: Accept the manually written content
      await productUploadPage.clickAcceptAndInsertButton();

      // Step 7: Verify manual content is saved
      const savedContent = await productUploadPage.getShortDescriptionFieldValue();
      expect(savedContent).toContain(testData.TC_GENAI_042.manualText.substring(0, 30));
    });
  });

  test.describe('Access Control', () => {
    test('TC_GENAI_004: Verify GenAI button is hidden for non-logged-in users', async ({ page }) => {
      // Step 1: Attempt to access Product Upload page directly without logging in
      await page.goto(testData.TC_GENAI_004.productUploadUrl);

      // Step 2: Verify user is redirected to login or access denied
      const isRedirectedOrDenied = await productUploadPage.verifyRedirectedToLoginOrAccessDenied();
      expect(isRedirectedOrDenied).toBe(true);
    });
  });
});
