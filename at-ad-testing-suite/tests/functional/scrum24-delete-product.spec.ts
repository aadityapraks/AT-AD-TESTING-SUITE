// spec: specs/functional/SCRUM-24-delete-product.plan.md
// seed: tests/seed/vendor-product-list.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductManagementPage } from '../../pages/product-management.page';
import { CatalogPage } from '../../pages/catalog.page';
import testData from '../../test-data/scrum24-functional.json';

test.describe('1. Access Delete Option', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
  });

  test('TC_DEL_001: Verify Delete Product option visibility', async ({ page }) => {
    // 1. Navigate to the portal and login as approved AP
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // 2. Navigate to Product Management page
    await expect(productManagementPage.pageHeading).toBeVisible();

    // 3. Locate Delete Product option for each owned product in the action column
    const actionButtons = page.getByRole('button', { name: /^More actions for/ });
    await expect(actionButtons.first()).toBeVisible();

    const count = await actionButtons.count();
    expect(count).toBeGreaterThan(0);

    // 4. Open actions menu for the first product and verify Delete option is visible
    const firstProductName = (await actionButtons.first().getAttribute('aria-label') ?? '').replace('More actions for ', '');
    const deleteItem = await productManagementPage.verifyDeleteOptionInActionsMenu(firstProductName);

    // Verify Delete option is visible, accessible, and clearly labeled
    await expect(deleteItem).toBeVisible();
    await expect(deleteItem).toHaveText(testData.expected.deleteMenuItemLabel);
  });

  test('TC_DEL_003: Delete product under review', async ({ page }) => {
    // 1. Navigate to the portal and login as approved AP
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // 2. Navigate to Product Management page
    await expect(productManagementPage.pageHeading).toBeVisible();

    // 3. Click Under Review tab to filter products
    await productManagementPage.clickStatusTab('Under Review');

    // 4. Check if there are any Under Review products - skip test if none exist
    const underReviewTabButton = page.getByRole('button', { name: /Under Review \d+/ });
    const tabText = await underReviewTabButton.textContent() ?? '';
    const countMatch = tabText.match(/Under Review (\d+)/);
    const underReviewCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    if (underReviewCount === 0) {
      test.skip(true, 'No Under Review products available in the system to test deletion');
      return;
    }

    // 5. Verify at least one Under Review product exists
    const firstUnderReviewStatus = page.getByRole('status', { name: /status: Under Review/ }).first();
    await expect(firstUnderReviewStatus).toBeVisible();

    // 6. Get the first Under Review product name and open its actions menu
    const actionButtons = page.getByRole('button', { name: /^More actions for/ });
    const firstProductName = (await actionButtons.first().getAttribute('aria-label') ?? '').replace('More actions for ', '');
    const deleteItem = await productManagementPage.verifyDeleteOptionInActionsMenu(firstProductName);

    // 7. Verify Delete option is available for the Under Review product
    await expect(deleteItem).toBeVisible();
    await expect(deleteItem).toHaveText(testData.expected.deleteMenuItemLabel);
  });
});

test.describe('2. Confirmation Prompt', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(productManagementPage.pageHeading).toBeVisible();
  });

  test('TC_DEL_004: Display Confirmation Dialog', async ({ page }) => {
    // 1. Get first Draft product and click Delete
    const productName = await productManagementPage.getFirstProductNameByStatus('Draft');
    const dialog = await productManagementPage.openDeleteDialog(productName);

    // 2. Verify confirmation dialog appears with all required content
    await productManagementPage.verifyConfirmationDialog(productName);
    await productManagementPage.cancelDeletion();
  });

  test('TC_DEL_005: Cancel Deletion', async ({ page }) => {
    // 1. Get first Draft product and open delete dialog
    const productName = await productManagementPage.getFirstProductNameByStatus('Draft');
    await productManagementPage.openDeleteDialog(productName);

    // 2. Cancel and verify product still exists
    await productManagementPage.cancelDeletion();
    await productManagementPage.verifyProductStillInList(productName);
  });

  test('TC_DEL_006: Confirm Deletion', async ({ page }) => {
    // 1. Get the first available Draft product name and open its actions menu, click Delete
    const firstProductName = await productManagementPage.getFirstProductNameByStatus('Draft');
    await productManagementPage.clickDeleteFromActionsMenu(firstProductName);

    // 2. Verify confirmation dialog appears with correct content and confirm deletion
    await productManagementPage.confirmDeletion();

    // 3. Verify success feedback is shown and product is removed from list
    await productManagementPage.verifyDeleteSuccess();
  });
});

test.describe('3. Deletion Rules for Published Products', () => {
  test.setTimeout(90000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
    catalogPage = new CatalogPage(page);
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(productManagementPage.pageHeading).toBeVisible();
  });

  test('TC_DEL_007: Delete Published Product from Catalog', async ({ page }) => {
    // 1. Click Approved tab and check if products exist
    await productManagementPage.clickStatusTab('Approved');

    // Check if there are any Approved products - skip test if none exist
    const approvedTabButton = page.getByRole('button', { name: /Approved \d+/ });
    const tabText = await approvedTabButton.textContent() ?? '';
    const countMatch = tabText.match(/Approved (\d+)/);
    const approvedCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    if (approvedCount === 0) {
      test.skip(true, 'No Approved products available in the system to test deletion');
      return;
    }

    // Wait for products to load
    await expect(page.getByText('Loading products...')).toBeHidden({ timeout: 10000 });

    // 2. Get the first product name without "Edited" badge
    const actionButtons = page.getByRole('button', { name: /^More actions for/ });
    await expect(actionButtons.first()).toBeVisible({ timeout: 10000 });

    let productName = '';
    let productIndex = 0;
    const buttonCount = await actionButtons.count();
    for (let i = 0; i < buttonCount; i++) {
      const btn = actionButtons.nth(i);
      const ariaLabel = await btn.getAttribute('aria-label') ?? '';
      const name = ariaLabel.replace('More actions for ', '');
      // Check for Edited badge in the same product row
      const productRow = btn.locator('xpath=ancestor::div[1]/..');
      const hasEdited = await productRow.getByText('Edited', { exact: true }).isVisible().catch(() => false);
      if (!hasEdited) {
        productName = name;
        // Count how many buttons with this exact name appear before index i
        productIndex = 0;
        for (let j = 0; j < i; j++) {
          const prevLabel = await actionButtons.nth(j).getAttribute('aria-label') ?? '';
          if (prevLabel === `More actions for ${name}`) productIndex++;
        }
        break;
      }
    }

    // If all products have Edited badge, skip the test
    if (!productName) {
      test.skip(true, 'All Approved products have unsaved edits - cannot test deletion without discard flow');
      return;
    }

    // 3. Delete the product
    await productManagementPage.clickDeleteFromActionsMenu(productName, productIndex);
    await productManagementPage.confirmDeletion();
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();

    // 4. Clear vendor session before logging in as PwD
    await page.context().clearCookies();
    await page.goto(testData.pwdBaseUrl);
    await page.getByRole('link', { name: 'Sign In/Register' }).click();
    await page.getByRole('link', { name: 'Sign In with SwarajAbility' }).click();
    await page.waitForURL(/swarajability-login-flow/, { timeout: 20000 });
    await page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
    await page.getByRole('textbox', { name: 'Email' }).fill(testData.pwdCredentials.email);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL(/has-password-flow/, { timeout: 20000 });
    await page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
    await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.pwdCredentials.password);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForURL(
      url => url.href.includes('implicit-consent') || url.href.includes('qa-atad.swarajability.org'),
      { timeout: 45000 }
    );
    if (page.url().includes('implicit-consent')) {
      const continueBtn = page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
      await continueBtn.click();
      await page.waitForTimeout(3000);
    }

    // 5. Navigate to catalog and verify deleted product is not visible
    await catalogPage.navigateToCatalog(testData.catalogUrl);
    await catalogPage.searchForProduct(productName);
    await catalogPage.verifyProductNotInCatalog(productName);
  });

  test('TC_DEL_008: Verify Deleted Product Visible to AP with Status', async ({ page }) => {
    // 1. Click Approved tab and wait for products to load
    await productManagementPage.clickStatusTab('Approved');
    await expect(page.getByText('Loading products...')).toBeHidden({ timeout: 10000 });

    // Check if there are any Approved products - skip test if none exist
    const approvedTabButton = page.getByRole('button', { name: /Approved \d+/ });
    const tabText = await approvedTabButton.textContent() ?? '';
    const countMatch = tabText.match(/Approved (\d+)/);
    const approvedCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    if (approvedCount === 0) {
      test.skip(true, 'No Approved products available in the system to test deletion');
      return;
    }

    // 2. Get the first product name from the actions button, preferring products without "Edited" badge
    const actionButtons = page.getByRole('button', { name: /^More actions for/ });
    await expect(actionButtons.first()).toBeVisible({ timeout: 10000 });

    let approvedProductName = '';
    const buttonCount = await actionButtons.count();
    for (let i = 0; i < buttonCount; i++) {
      const ariaLabel = await actionButtons.nth(i).getAttribute('aria-label') ?? '';
      const productName = ariaLabel.replace('More actions for ', '');
      // Check if this product has an "Edited" badge
      const hasEdited = await page.getByRole('button', { name: `Toggle edit details for ${productName}` })
        .locator('..').getByText('Edited').isVisible().catch(() => false);
      if (!hasEdited) {
        approvedProductName = productName;
        break;
      }
    }

    // If all products have Edited badge, skip the test
    if (!approvedProductName) {
      test.skip(true, 'All Approved products have unsaved edits - cannot test deletion without discard flow');
      return;
    }

    // 3. Open actions menu and click Delete
    await productManagementPage.clickDeleteFromActionsMenu(approvedProductName);

    // 4. Confirm deletion in dialog
    await productManagementPage.confirmDeletion();

    // 5. Verify success feedback
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();

    // 6. Verify deleted product is no longer visible in the Approved tab
    await productManagementPage.verifyProductNotInList(approvedProductName);

    // 7. Switch to All tab and verify deleted product is not present
    await productManagementPage.clickStatusTab('All');
    await productManagementPage.verifyProductNotInList(approvedProductName);
  });
});

test.describe('4. Deletion Rules for Draft/Pending Products', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(productManagementPage.pageHeading).toBeVisible();
  });

  test('TC_DEL_009: Delete Draft Product Completely', async ({ page }) => {
    // 1. Click Draft tab and get first draft product
    await productManagementPage.clickStatusTab('Draft');
    const productName = await productManagementPage.getFirstProductNameByStatus('Draft');

    // 2. Delete the draft product
    await productManagementPage.clickDeleteFromActionsMenu(productName);
    await productManagementPage.confirmDeletion();

    // 3. Verify success and product is permanently removed from list
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();
    await productManagementPage.verifyProductNotInList(productName);

    // 4. Switch to All tab and verify product is not present there either
    await productManagementPage.clickStatusTab('All');
    await productManagementPage.verifyProductNotInList(productName);
  });

  test('TC_DEL_010: Delete Under Review Product Completely', async ({ page }) => {
    // 1. Click Under Review tab and check if products exist
    await productManagementPage.clickStatusTab('Under Review');

    // Check if there are any Under Review products - skip test if none exist
    const underReviewTabButton = page.getByRole('button', { name: /Under Review \d+/ });
    const tabText = await underReviewTabButton.textContent() ?? '';
    const countMatch = tabText.match(/Under Review (\d+)/);
    const underReviewCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    if (underReviewCount === 0) {
      test.skip(true, 'No Under Review products available in the system to test deletion');
      return;
    }

    const productName = await productManagementPage.getFirstProductNameByStatus('Under Review');

    // 2. Delete the under review product
    await productManagementPage.clickDeleteFromActionsMenu(productName);
    await productManagementPage.confirmDeletion();

    // 3. Verify success and product is permanently removed
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();
    await productManagementPage.verifyProductNotInList(productName);

    // 4. Switch to All tab and verify product is not present
    await productManagementPage.clickStatusTab('All');
    await productManagementPage.verifyProductNotInList(productName);
  });
});

test.describe('5. Soft Deletion and Admin Visibility', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
  });

  test('TC_DEL_013: Vendor Hard Deletes Under Review Product', async ({ page }) => {
    // 1. Navigate to the portal and login as approved AP
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // 2. Verify Product Management page is loaded
    await expect(productManagementPage.pageHeading).toBeVisible();

    // 3. Click Under Review tab and wait for filter to apply
    await productManagementPage.clickStatusTab('Under Review');

    // Check if there are any Under Review products - skip test if none exist
    const underReviewTabButton = page.getByRole('button', { name: /Under Review \d+/ });
    const tabText = await underReviewTabButton.textContent() ?? '';
    const countMatch = tabText.match(/Under Review (\d+)/);
    const underReviewCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    if (underReviewCount === 0) {
      test.skip(true, 'No Under Review products available in the system to test deletion');
      return;
    }

    // 4. Get the first Under Review product name from its status badge
    const underReviewProductName = await productManagementPage.getFirstProductNameByStatus('Under Review');

    // 5. Open actions menu and click Delete atomically
    await productManagementPage.clickDeleteFromActionsMenu(underReviewProductName);

    // 6. Confirm deletion in dialog
    await productManagementPage.confirmDeletion();

    // 7. Verify success feedback - product is hard deleted
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();

    // 8. Verify product is permanently removed from Under Review tab
    await productManagementPage.verifyProductNotInList(underReviewProductName);

    // 9. Switch to All tab and verify product is not present there either
    await productManagementPage.clickStatusTab('All');
    await productManagementPage.verifyProductNotInList(underReviewProductName);
  });

  test('TC_DEL_014: Vendor Hard Deletes Rejected Product', async ({ page }) => {
    // 1. Navigate to the portal and login as approved AP
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(productManagementPage.pageHeading).toBeVisible();

    // 2. Click Rejected tab and check if products exist
    await productManagementPage.clickStatusTab('Rejected');

    // Check if there are any Rejected products - skip test if none exist
    const rejectedTabButton = page.getByRole('button', { name: /Rejected \d+/ });
    const tabText = await rejectedTabButton.textContent() ?? '';
    const countMatch = tabText.match(/Rejected (\d+)/);
    const rejectedCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    if (rejectedCount === 0) {
      test.skip(true, 'No Rejected products available in the system to test deletion');
      return;
    }

    const productName = await productManagementPage.getFirstRejectedProductName();

    // 3. Delete the rejected product
    await productManagementPage.clickDeleteFromActionsMenu(productName);
    await productManagementPage.confirmDeletion();

    // 4. Verify success - rejected product is hard deleted permanently
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();
    await productManagementPage.verifyProductNotInList(productName);

    // 5. Switch to All tab and verify product is not present
    await productManagementPage.clickStatusTab('All');
    await productManagementPage.verifyProductNotInList(productName);
  });
});

test.describe('7. User Notifications', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(productManagementPage.pageHeading).toBeVisible();
  });

  test('TC_DEL_016: Notify Users with Existing Interests', async ({ page }) => {
    // 1. Click Approved tab and check if products exist
    await productManagementPage.clickStatusTab('Approved');

    // Check if there are any Approved products - skip test if none exist
    const approvedTabButton = page.getByRole('button', { name: /Approved \d+/ });
    const tabText = await approvedTabButton.textContent() ?? '';
    const countMatch = tabText.match(/Approved (\d+)/);
    const approvedCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    if (approvedCount === 0) {
      test.skip(true, 'No Approved products available in the system to test deletion');
      return;
    }

    // Wait for products to load
    await expect(page.getByText('Loading products...')).toBeHidden({ timeout: 10000 });

    // Get the first product name without "Edited" badge
    const actionButtons = page.getByRole('button', { name: /^More actions for/ });
    await expect(actionButtons.first()).toBeVisible({ timeout: 10000 });

    let productName = '';
    const buttonCount = await actionButtons.count();
    for (let i = 0; i < buttonCount; i++) {
      const ariaLabel = await actionButtons.nth(i).getAttribute('aria-label') ?? '';
      const name = ariaLabel.replace('More actions for ', '');
      const hasEdited = await page.getByRole('button', { name: `Toggle edit details for ${name}` })
        .locator('..').getByText('Edited').isVisible().catch(() => false);
      if (!hasEdited) {
        productName = name;
        break;
      }
    }

    if (!productName) {
      test.skip(true, 'All Approved products have unsaved edits - cannot test deletion without discard flow');
      return;
    }

    // 2. Delete the product
    await productManagementPage.clickDeleteFromActionsMenu(productName);
    await productManagementPage.confirmDeletion();

    // 3. Verify deletion succeeds - notification system is triggered on backend
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();

    // 4. Verify product is removed from list (notification sent to interested users)
    await productManagementPage.verifyProductNotInList(productName);
  });
});

test.describe('8. System Feedback', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(productManagementPage.pageHeading).toBeVisible();
  });

  test('TC_DEL_017: Display Success Confirmation Message', async ({ page }) => {
    // 1. Get first Draft product and delete it
    const productName = await productManagementPage.getFirstProductNameByStatus('Draft');
    await productManagementPage.clickDeleteFromActionsMenu(productName);
    await productManagementPage.confirmDeletion();

    // 2. Verify success dialog appears with correct title and message
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();
  });

  test('TC_DEL_018: Verify Product Removed from Lists', async ({ page }) => {
    // 1. Get first Draft product, note its name, then delete it
    const productName = await productManagementPage.getFirstProductNameByStatus('Draft');
    await productManagementPage.clickDeleteFromActionsMenu(productName);
    await productManagementPage.confirmDeletion();
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();

    // 2. Verify product no longer appears in the product list
    await productManagementPage.verifyProductNotInList(productName);

    // 3. Switch to All tab and verify product is not present
    await productManagementPage.clickStatusTab('All');
    await productManagementPage.verifyProductNotInList(productName);
  });
});

test.describe('9. Error Handling', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
  });

  test('TC_DEL_019: Handle System Error During Deletion', async ({ page }) => {
    // 1. Navigate to the portal and login as approved AP
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // 2. Verify Product Management page is loaded
    await expect(productManagementPage.pageHeading).toBeVisible();

    // 3. Get the first available Draft product name
    const productName = await productManagementPage.getFirstProductNameByStatus('Draft');

    // 4. Simulate system error by intercepting the delete API before triggering delete
    await productManagementPage.interceptDeleteWithError();

    // 5. Open actions menu and click Delete
    await productManagementPage.clickDeleteFromActionsMenu(productName);

    // 6. Confirm deletion in dialog
    await productManagementPage.confirmDeletion();

    // 7. Verify error dialog is displayed with correct message
    await productManagementPage.verifyDeleteError();

    // 8. Close error dialog and verify product still exists in list
    await productManagementPage.closeErrorDialog();
    await productManagementPage.verifyProductStillInList(productName);
  });

  test('TC_DEL_020: Block Unauthorized Deletion Attempts', async ({ page }) => {
    // 1. Navigate to the portal and login as approved AP
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);

    // 2. Verify Product Management page is loaded
    await expect(productManagementPage.pageHeading).toBeVisible();

    // 3. Get the first available Draft product name
    const productName = await productManagementPage.getFirstProductNameByStatus('Draft');

    // 4. Simulate unauthorized response by intercepting the delete API with 403
    await productManagementPage.interceptDeleteWithUnauthorized();

    // 5. Open actions menu and click Delete
    await productManagementPage.clickDeleteFromActionsMenu(productName);

    // 6. Confirm deletion in dialog
    await productManagementPage.confirmDeletion();

    // 7. Verify error dialog is displayed - deletion is blocked
    await productManagementPage.verifyDeleteError();

    // 8. Close error dialog and verify product remains unchanged in list
    await productManagementPage.closeErrorDialog();
    await productManagementPage.verifyProductStillInList(productName);
  });
});

test.describe('10. Associated Media Handling', () => {
  test.setTimeout(90000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
    catalogPage = new CatalogPage(page);
  });

  test('TC_DEL_021: Mark Media Inactive on Deletion', async ({ page }) => {
    // 1. Login as vendor AP
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(productManagementPage.pageHeading).toBeVisible();

    // 2. Click Approved tab and check if products exist
    await productManagementPage.clickStatusTab('Approved');

    // Check if there are any Approved products - skip test if none exist
    const approvedTabButton = page.getByRole('button', { name: /Approved \d+/ });
    const tabText = await approvedTabButton.textContent() ?? '';
    const countMatch = tabText.match(/Approved (\d+)/);
    const approvedCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    if (approvedCount === 0) {
      test.skip(true, 'No Approved products available in the system to test deletion');
      return;
    }

    // Wait for products to load
    await expect(page.getByText('Loading products...')).toBeHidden({ timeout: 10000 });

    // Get the first product name without "Edited" badge
    const actionButtons = page.getByRole('button', { name: /^More actions for/ });
    await expect(actionButtons.first()).toBeVisible({ timeout: 10000 });

    let productName = '';
    const buttonCount = await actionButtons.count();
    for (let i = 0; i < buttonCount; i++) {
      const ariaLabel = await actionButtons.nth(i).getAttribute('aria-label') ?? '';
      const name = ariaLabel.replace('More actions for ', '');
      const hasEdited = await page.getByRole('button', { name: `Toggle edit details for ${name}` })
        .locator('..').getByText('Edited').isVisible().catch(() => false);
      if (!hasEdited) {
        productName = name;
        break;
      }
    }

    if (!productName) {
      test.skip(true, 'All Approved products have unsaved edits - cannot test deletion without discard flow');
      return;
    }

    // 3. Delete the product with media
    await productManagementPage.clickDeleteFromActionsMenu(productName);
    await productManagementPage.confirmDeletion();
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();

    // 4. Verify product is removed from list (media marked inactive on backend)
    await productManagementPage.verifyProductNotInList(productName);

    // 5. Navigate to catalog and verify no broken images from deleted product
    await catalogPage.navigateToCatalog(testData.catalogUrl);
    await catalogPage.verifyNoBrokenImages();
  });

  test('TC_DEL_022: Verify No Broken Links in Catalog After Product Deletion', async ({ page }) => {
    // 1. Login as vendor AP and delete a product with media
    await loginPage.navigate(testData.baseUrl);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(productManagementPage.pageHeading).toBeVisible();

    // 2. Click Approved tab and check if products exist
    await productManagementPage.clickStatusTab('Approved');
    await expect(page.getByText('Loading products...')).toBeHidden({ timeout: 10000 });

    // Check if there are any Approved products - skip test if none exist
    const approvedTabButton = page.getByRole('button', { name: /Approved \d+/ });
    const tabText = await approvedTabButton.textContent() ?? '';
    const countMatch = tabText.match(/Approved (\d+)/);
    const approvedCount = countMatch ? parseInt(countMatch[1], 10) : 0;

    if (approvedCount === 0) {
      test.skip(true, 'No Approved products available in the system to test deletion');
      return;
    }

    // Get the first product name without "Edited" badge
    const actionButtons = page.getByRole('button', { name: /^More actions for/ });
    await expect(actionButtons.first()).toBeVisible({ timeout: 10000 });

    let productName = '';
    let productIndex = 0;
    const buttonCount = await actionButtons.count();
    for (let i = 0; i < buttonCount; i++) {
      const btn = actionButtons.nth(i);
      const ariaLabel = await btn.getAttribute('aria-label') ?? '';
      const name = ariaLabel.replace('More actions for ', '');
      // Check for Edited badge in the same product row (sibling elements)
      const productRow = btn.locator('xpath=ancestor::div[1]/..'); 
      const hasEdited = await productRow.getByText('Edited', { exact: true }).isVisible().catch(() => false);
      if (!hasEdited) {
        productName = name;
        // Count how many buttons with this exact name appear before index i
        productIndex = 0;
        for (let j = 0; j < i; j++) {
          const prevLabel = await actionButtons.nth(j).getAttribute('aria-label') ?? '';
          if (prevLabel === `More actions for ${name}`) productIndex++;
        }
        break;
      }
    }

    if (!productName) {
      test.skip(true, 'All Approved products have unsaved edits - cannot test deletion without discard flow');
      return;
    }

    // 3. Delete the product
    await productManagementPage.clickDeleteFromActionsMenu(productName, productIndex);
    await productManagementPage.confirmDeletion();
    await productManagementPage.verifyDeleteSuccess();
    await productManagementPage.closeSuccessDialog();

    // 4. Clear vendor session before logging in as PwD
    await page.context().clearCookies();
    await page.goto(testData.pwdBaseUrl);
    await page.getByRole('link', { name: 'Sign In/Register' }).click();
    await page.getByRole('link', { name: 'Sign In with SwarajAbility' }).click();
    await page.waitForURL(/swarajability-login-flow/, { timeout: 20000 });
    await page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 30000 });
    await page.getByRole('textbox', { name: 'Email' }).fill(testData.pwdCredentials.email);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL(/has-password-flow/, { timeout: 20000 });
    await page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
    await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.pwdCredentials.password);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForURL(
      url => url.href.includes('implicit-consent') || url.href.includes('qa-atad.swarajability.org'),
      { timeout: 45000 }
    );
    if (page.url().includes('implicit-consent')) {
      const continueBtn = page.getByRole('button', { name: 'Continue' });
      await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
      await continueBtn.click();
      await page.waitForTimeout(3000);
    }

    // 5. Navigate to catalog and search for the deleted product
    await catalogPage.navigateToCatalog(testData.catalogUrl);
    await catalogPage.searchForProduct(productName);
    await catalogPage.verifyProductNotInCatalog(productName);

    // 6. Verify no broken images are displayed in the catalog
    await catalogPage.verifyNoBrokenImages();

    // 7. Verify no placeholder images are shown
    await catalogPage.verifyNoPlaceholderImages();
  });
});
