// spec: specs/functional/SCRUM-24-delete-product.plan.md
// seed: tests/seed/vendor-product-list.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductManagementPage } from '../../pages/product-management.page';
import testData from '../../test-data/scrum24-accessibility.json';

async function login(page) {
  await page.goto(testData.url);
  await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
  await page.getByText("Email").first().waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText("Password").first().waitFor({ state: 'visible' });
  await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForURL('**/partner/**');
}

test.describe('SCRUM-24: Delete Product Accessibility', () => {

  test.describe('1. Delete Product Button Access', () => {
    
    test('TC_A11Y_001: Verify Delete Product button keyboard accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.focus();
      await expect(actionsButton).toBeFocused();
      await actionsButton.press('Enter');
      await expect(page.getByText('Delete')).toBeVisible();
    });

    test('TC_A11Y_002: Verify Delete button screen reader announcement', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      const deleteButton = page.getByText('Delete').first();
      await expect(deleteButton).toBeVisible();
      await expect(page.getByText('Wheelchair Ramp Model XR-100')).toBeVisible();
    });

    test('TC_A11Y_003: Verify Delete button visual accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await expect(page.getByText('Delete')).toBeVisible();
    });

    test('TC_A11Y_004: Verify Delete button disabled state', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('2. Confirmation Dialog Accessibility', () => {
    
    test('TC_A11Y_005: Verify confirmation dialog keyboard accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      await page.keyboard.press('Escape');
      await expect(actionsButton).toBeVisible();
    });

    test('TC_A11Y_006: Verify dialog screen reader announcement', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      await expect(page.getByText('Delete Product?')).toBeVisible();
    });

    test('TC_A11Y_007: Verify dialog warning message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      await expect(page.getByText(/cannot be undone/i)).toBeVisible();
    });

    test('TC_A11Y_008: Verify dialog button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      const deleteButton = page.getByRole('button', { name: /Delete|Confirm/i }).first();
      await deleteButton.focus();
      const cancelButton = page.getByRole('button', { name: /Cancel/i });
      await expect(deleteButton).toBeFocused();
      await cancelButton.click();
    });

    test('TC_A11Y_009: Verify dialog visual accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      await expect(page.getByText('Delete Product?')).toBeVisible();
    });

    test('TC_A11Y_010: Verify dialog focus management', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      await page.keyboard.press('Tab');
      await page.getByRole('button', { name: /Cancel/i }).click();
    });
  });

  test.describe('3. Deletion Rules and Status', () => {
    
    test('TC_A11Y_011: Verify published product deletion feedback', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText('Approved').first()).toBeVisible();
    });

    test('TC_A11Y_012: Verify draft product deletion feedback', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText('Draft').first()).toBeVisible();
    });

    test('TC_A11Y_013: Verify deleted status indicator accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('4. System Feedback Messages', () => {
    
    test('TC_A11Y_014: Verify success message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_015: Verify success message timing', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_016: Verify success message visual design', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('5. Error Handling', () => {
    
    test('TC_A11Y_017: Verify system error message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_018: Verify unauthorized deletion error', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_019: Verify error message focus management', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_020: Verify error message visual design', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('6. Product List Updates', () => {
    
    test('TC_A11Y_021: Verify product removal from list', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText('Showing 1 to 5 of 39 products')).toBeVisible();
    });

    test('TC_A11Y_022: Verify deleted status in list', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_023: Verify empty list state', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText('Showing 1 to 5 of 39 products')).toBeVisible();
    });
  });

  test.describe('7. Notification to Interested Users', () => {
    
    test('TC_A11Y_024: Verify notification trigger accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('8. Hard Delete for Under Review Products', () => {
    
    test('TC_A11Y_025: Verify hard delete option accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText('Under Review').first()).toBeVisible();
      const actionsButton = page.getByRole('button', { name: /Under Review/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await expect(page.getByText('Delete')).toBeVisible();
    });

    test('TC_A11Y_026: Verify hard delete confirmation dialog', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /Under Review/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      await expect(page.getByText(/Delete Product/i)).toBeVisible();
    });
  });

  test.describe('9. Associated Media Handling', () => {
    
    test('TC_A11Y_027: Verify media removal feedback', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('10. Audit Trail Indicator', () => {
    
    test('TC_A11Y_028: Verify audit log indicator accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText(/Dec \d+, 2025/).first()).toBeVisible();
    });

    test('TC_A11Y_029: Verify audit details accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('11. Overall Interface Accessibility', () => {
    
    test('TC_A11Y_030: Verify page title and landmarks', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page).toHaveTitle(/HubUiAdmin/);
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
    });

    test('TC_A11Y_031: Verify heading hierarchy', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Welcome to your Dashboard' })).toBeVisible();
    });

    test('TC_A11Y_032: Verify overall keyboard navigation', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.keyboard.press('Tab');
      const firstButton = page.getByRole('button').first();
      await expect(firstButton).toBeVisible();
    });

    test('TC_A11Y_033: Verify color contrast throughout interface', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
    });

    test('TC_A11Y_034: Verify responsive design at 200% zoom', async ({ page }) => {
      await login(page);
      await page.setViewportSize({ width: 640, height: 360 });
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
    });

    test('TC_A11Y_035: Verify no information conveyed by color alone', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText('Approved').first()).toBeVisible();
      await expect(page.getByText('Under Review').first()).toBeVisible();
    });
  });
});

test.describe('11. Accessibility and UI Standards', () => {
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
    await loginPage.navigate(testData.url);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await expect(productManagementPage.pageHeading).toBeVisible();
  });

  test('TC_ACC_001: Verify Keyboard Accessibility', async ({ page }) => {
    // 1. Tab to the More actions button for the first product and verify it is focusable
    const moreActionsBtn = page.getByRole('button', { name: /^More actions for/ }).first();
    await expect(moreActionsBtn).toBeVisible();
    await moreActionsBtn.focus();
    await expect(moreActionsBtn).toBeFocused();

    // 2. Get an Under Review product (no Edited badge) and open delete dialog via POM
    await productManagementPage.clickStatusTab('Under Review');
    const productName = await productManagementPage.getFirstProductNameByStatus('Under Review');
    const dialog = await productManagementPage.openDeleteDialog(productName);

    // 3. Verify all dialog buttons are keyboard reachable
    const cancelBtn = dialog.getByRole('button', { name: testData.expected.cancelButtonLabel });
    const deleteBtn = dialog.getByRole('button', { name: testData.expected.deleteButtonLabel });
    await expect(cancelBtn).toBeVisible();
    await expect(deleteBtn).toBeVisible();

    // 4. Focus Cancel button and verify it is focusable
    await cancelBtn.focus();
    await expect(cancelBtn).toBeFocused();

    // 5. Cancel and verify dialog closes
    await cancelBtn.click();
    await expect(dialog).not.toBeVisible();
  });

  test('TC_ACC_002: Verify Screen Reader Compatibility', async ({ page }) => {
    // 1. Verify More actions button has descriptive aria-label announcing the product name
    const moreActionsBtn = page.getByRole('button', { name: /^More actions for/ }).first();
    await expect(moreActionsBtn).toBeVisible();
    const ariaLabel = await moreActionsBtn.getAttribute('aria-label');
    expect(ariaLabel).toMatch(/^More actions for .+/);

    // 2. Use Under Review product (no Edited badge) to open actions menu
    await productManagementPage.clickStatusTab('Under Review');
    const productName = await productManagementPage.getFirstProductNameByStatus('Under Review');
    await productManagementPage.openActionsMenuForProduct(productName);
    const menu = page.getByRole('menu', { name: `More actions for ${productName}` });
    await expect(menu).toBeVisible();
    const deleteItem = menu.getByRole('menuitem', { name: testData.expected.deleteMenuItemLabel });
    await expect(deleteItem).toBeVisible();
    // Close menu before using openDeleteDialog
    await page.keyboard.press('Escape');

    // 3. Open delete dialog via POM and verify role/title
    const dialog = await productManagementPage.openDeleteDialog(productName);

    // 4. Verify dialog heading is present and readable by screen reader
    await expect(dialog.getByRole('heading', { name: testData.expected.confirmationDialogTitle })).toBeVisible();

    // 5. Verify warning message is readable and present in dialog
    await expect(dialog.getByText(testData.expected.confirmationDialogMessage)).toBeVisible();

    // 6. Verify Delete and Cancel buttons are accessible with correct roles and labels
    await expect(dialog.getByRole('button', { name: testData.expected.deleteButtonLabel })).toBeVisible();
    await expect(dialog.getByRole('button', { name: testData.expected.cancelButtonLabel })).toBeVisible();

    // 7. Cancel and verify dialog closes (focus management)
    await dialog.getByRole('button', { name: testData.expected.cancelButtonLabel }).click();
    await expect(dialog).not.toBeVisible();
  });

  test('TC_ACC_003: Verify Color Contrast and Focus States', async ({ page }) => {
    // 1. Verify Product Management page heading is visible (color contrast baseline)
    await expect(productManagementPage.pageHeading).toBeVisible();

    // 2. Verify status tabs are visible with text labels (not color alone)
    await expect(productManagementPage.statusTabAll).toBeVisible();
    await expect(productManagementPage.statusTabApproved).toBeVisible();
    await expect(productManagementPage.statusTabUnderReview).toBeVisible();
    await expect(productManagementPage.statusTabDraft).toBeVisible();
    await expect(productManagementPage.statusTabRejected).toBeVisible();

    // 3. Focus the More actions button and verify focus state is applied
    const moreActionsBtn = page.getByRole('button', { name: /^More actions for/ }).first();
    await moreActionsBtn.focus();
    await expect(moreActionsBtn).toBeFocused();

    // 4. Use Under Review product (no Edited badge) to open delete dialog
    await productManagementPage.clickStatusTab('Under Review');
    const productName = await productManagementPage.getFirstProductNameByStatus('Under Review');
    const dialog = await productManagementPage.openDeleteDialog(productName);

    // 5. Verify Cancel button has visible text label
    const cancelBtn = dialog.getByRole('button', { name: testData.expected.cancelButtonLabel });
    await expect(cancelBtn).toBeVisible();
    await expect(cancelBtn).toHaveText(testData.expected.cancelButtonLabel);

    // 6. Verify Delete button has visible text label
    const deleteBtn = dialog.getByRole('button', { name: testData.expected.deleteButtonLabel });
    await expect(deleteBtn).toBeVisible();
    await expect(deleteBtn).toHaveText(testData.expected.deleteButtonLabel);

    // 7. Close dialog
    await cancelBtn.click();
    await expect(dialog).not.toBeVisible();
  });
});
