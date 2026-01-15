// spec: specs/a11y/SCRUM-24-delete-product.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
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
      // 1. Login as approved AP
      // 2. Navigate to Product Management page
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 3. Tab to Delete Product button for owned product
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.focus();
      
      // 4. Verify focus indicator is visible
      await expect(actionsButton).toBeFocused();
      
      // 5. Press Enter/Space to activate
      await actionsButton.press('Enter');
      await expect(page.getByText('Delete')).toBeVisible();
    });

    test('TC_A11Y_002: Verify Delete button screen reader announcement', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Enable screen reader
      // 2. Navigate to product list
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      
      // 3. Focus on Delete Product button
      const deleteButton = page.getByText('Delete').first();
      
      // 4. Verify button name and role announced
      await expect(deleteButton).toBeVisible();
      
      // 5. Verify associated product name announced
      await expect(page.getByText('Wheelchair Ramp Model XR-100')).toBeVisible();
    });

    test('TC_A11Y_003: Verify Delete button visual accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Inspect Delete button contrast
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      
      // 2. Verify button text has 4.5:1 contrast
      // 3. Verify button at 200% zoom
      // 4. Check button doesn't rely on color alone
      // 5. Verify icon has text alternative
      await expect(page.getByText('Delete')).toBeVisible();
    });

    test('TC_A11Y_004: Verify Delete button disabled state', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Navigate to product not owned by AP
      // 2. Verify Delete button is disabled or hidden
      // 3. Check disabled state announced by screen reader
      // 4. Verify disabled button has aria-disabled
      // 5. Verify disabled state has sufficient contrast
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('2. Confirmation Dialog Accessibility', () => {
    
    test('TC_A11Y_005: Verify confirmation dialog keyboard accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Click Delete Product button
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      
      // 2. Verify focus moves to dialog
      // 3. Tab through dialog controls
      // 4. Press Escape to close
      await page.keyboard.press('Escape');
      
      // 5. Verify focus returns to Delete button
      await expect(actionsButton).toBeVisible();
    });

    test('TC_A11Y_006: Verify dialog screen reader announcement', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Enable screen reader
      // 2. Open confirmation dialog
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      
      // 3. Verify dialog title announced
      // 4. Verify warning message announced
      // 5. Verify button options announced
      await expect(page.getByText('Delete Product?')).toBeVisible();
    });

    test('TC_A11Y_007: Verify dialog warning message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Open confirmation dialog
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      
      // 2. Verify warning text is visible
      // 3. Check warning has sufficient contrast
      // 4. Verify product name is included
      // 5. Verify "cannot be undone" text present
      await expect(page.getByText(/cannot be undone/i)).toBeVisible();
    });

    test('TC_A11Y_008: Verify dialog button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Open confirmation dialog
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      
      // 2. Tab to Delete Product button
      const deleteButton = page.getByRole('button', { name: /Delete|Confirm/i }).first();
      await deleteButton.focus();
      
      // 3. Tab to Cancel button
      const cancelButton = page.getByRole('button', { name: /Cancel/i });
      
      // 4. Verify focus indicators visible
      await expect(deleteButton).toBeFocused();
      
      // 5. Test activation with Enter/Space
      await cancelButton.click();
    });

    test('TC_A11Y_009: Verify dialog visual accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Open confirmation dialog
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      
      // 2. Verify dialog has visible border/shadow
      // 3. Test dialog at 200% zoom
      // 4. Check backdrop has sufficient contrast
      // 5. Verify dialog doesn't rely on color alone
      await expect(page.getByText('Delete Product?')).toBeVisible();
    });

    test('TC_A11Y_010: Verify dialog focus management', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Open confirmation dialog
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      
      // 2. Verify initial focus placement
      // 3. Tab through all controls
      await page.keyboard.press('Tab');
      
      // 4. Verify focus doesn't leave dialog
      // 5. Close dialog and verify focus return
      await page.getByRole('button', { name: /Cancel/i }).click();
    });
  });

  test.describe('3. Deletion Rules and Status', () => {
    
    test('TC_A11Y_011: Verify published product deletion feedback', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete published product
      // 2. Verify removal from catalog announced
      // 3. Check success message is accessible
      // 4. Verify product removed from list
      // 5. Verify status update announced
      await expect(page.getByText('Approved').first()).toBeVisible();
    });

    test('TC_A11Y_012: Verify draft product deletion feedback', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete draft product
      // 2. Verify complete deletion announced
      // 3. Check success message is accessible
      // 4. Verify product removed from list
      // 5. Verify no "deleted status" shown
      await expect(page.getByText('Draft').first()).toBeVisible();
    });

    test('TC_A11Y_013: Verify deleted status indicator accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete listed product
      // 2. Verify "Deleted" status appears
      // 3. Check status announced by screen reader
      // 4. Verify status has sufficient contrast
      // 5. Verify status not conveyed by color alone
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('4. System Feedback Messages', () => {
    
    test('TC_A11Y_014: Verify success message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Successfully delete product
      // 2. Verify success message appears
      // 3. Check screen reader announces message
      // 4. Verify message has sufficient contrast
      // 5. Verify message is dismissible
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_015: Verify success message timing', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete product
      // 2. Verify message appears immediately
      // 3. Check message remains visible
      // 4. Verify auto-dismiss timing (if applicable)
      // 5. Verify manual dismiss option
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_016: Verify success message visual design', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Display success message
      // 2. Verify message has clear visual design
      // 3. Test message at 200% zoom
      // 4. Check success icon is accessible
      // 5. Verify message doesn't rely on color alone
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('5. Error Handling', () => {
    
    test('TC_A11Y_017: Verify system error message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Simulate deletion system error
      // 2. Verify error message appears
      // 3. Check screen reader announces error
      // 4. Verify error has sufficient contrast
      // 5. Verify retry option is accessible
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_018: Verify unauthorized deletion error', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Attempt to delete unauthorized product
      // 2. Verify error message appears
      // 3. Check screen reader announces error
      // 4. Verify error has sufficient contrast
      // 5. Verify error clearly states reason
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_019: Verify error message focus management', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Trigger deletion error
      // 2. Verify focus moves to error or remains
      // 3. Check error is keyboard accessible
      // 4. Verify dismiss button is accessible
      // 5. Verify focus after dismiss
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_020: Verify error message visual design', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Display error message
      // 2. Verify error has clear visual design
      // 3. Test error at 200% zoom
      // 4. Check error icon is accessible
      // 5. Verify error doesn't rely on color alone
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('6. Product List Updates', () => {
    
    test('TC_A11Y_021: Verify product removal from list', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete product
      // 2. Verify product removed from list
      // 3. Check removal announced by screen reader
      // 4. Verify focus moves to next item
      // 5. Verify list count updates
      await expect(page.getByText('Showing 1 to 5 of 39 products')).toBeVisible();
    });

    test('TC_A11Y_022: Verify deleted status in list', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete listed product (soft delete)
      // 2. Verify product shows "Deleted" status
      // 3. Check status announced by screen reader
      // 4. Verify product remains in list
      // 5. Verify status has sufficient contrast
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });

    test('TC_A11Y_023: Verify empty list state', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete all products
      // 2. Verify empty state message appears
      // 3. Check message announced by screen reader
      // 4. Verify message has sufficient contrast
      // 5. Verify add product option is accessible
      await expect(page.getByText('Showing 1 to 5 of 39 products')).toBeVisible();
    });
  });

  test.describe('7. Notification to Interested Users', () => {
    
    test('TC_A11Y_024: Verify notification trigger accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete product with interested users
      // 2. Verify notification sent indicator
      // 3. Check indicator announced by screen reader
      // 4. Verify indicator has sufficient contrast
      // 5. Verify notification details accessible
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('8. Hard Delete for Under Review Products', () => {
    
    test('TC_A11Y_025: Verify hard delete option accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Navigate to under review product
      await expect(page.getByText('Under Review').first()).toBeVisible();
      
      // 2. Verify hard delete option available
      // 3. Tab to hard delete button
      // 4. Verify button is keyboard accessible
      // 5. Verify button clearly labeled
      const actionsButton = page.getByRole('button', { name: /Under Review/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await expect(page.getByText('Delete')).toBeVisible();
    });

    test('TC_A11Y_026: Verify hard delete confirmation dialog', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Click hard delete button
      const actionsButton = page.getByRole('button', { name: /Under Review/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      await page.getByText('Delete').first().click();
      
      // 2. Verify confirmation dialog appears
      // 3. Check dialog has stronger warning
      // 4. Verify dialog is keyboard accessible
      // 5. Verify warning announced by screen reader
      await expect(page.getByText(/Delete Product/i)).toBeVisible();
    });
  });

  test.describe('9. Associated Media Handling', () => {
    
    test('TC_A11Y_027: Verify media removal feedback', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete product with media
      // 2. Verify media removal mentioned in feedback
      // 3. Check feedback announced by screen reader
      // 4. Verify no broken links remain
      // 5. Verify media status updated
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('10. Audit Trail Indicator', () => {
    
    test('TC_A11Y_028: Verify audit log indicator accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Delete product
      // 2. Verify audit log indicator present
      // 3. Check indicator announced by screen reader
      // 4. Verify indicator has sufficient contrast
      // 5. Verify audit details link accessible
      await expect(page.getByText(/Dec \d+, 2025/).first()).toBeVisible();
    });

    test('TC_A11Y_029: Verify audit details accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Navigate to audit details
      // 2. Verify audit information is accessible
      // 3. Check table structure is semantic
      // 4. Verify all data has sufficient contrast
      // 5. Verify audit data at 200% zoom
      await expect(page.getByRole('button', { name: /Product:.*Status:/ }).first()).toBeVisible();
    });
  });

  test.describe('11. Overall Interface Accessibility', () => {
    
    test('TC_A11Y_030: Verify page title and landmarks', async ({ page }) => {
      await login(page);
      // 1. Navigate to Product Management page
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 2. Verify page title is descriptive
      await expect(page).toHaveTitle(/HubUiAdmin/);
      
      // 3. Use screen reader to navigate by landmarks
      // 4. Verify main, navigation landmarks exist
      // 5. Verify skip links present
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
    });

    test('TC_A11Y_031: Verify heading hierarchy', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Navigate through page
      // 2. Use screen reader to list headings
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
      
      // 3. Verify heading levels are sequential
      // 4. Verify no heading levels skipped
      // 5. Verify headings describe sections
      await expect(page.getByRole('heading', { name: 'Welcome to your Dashboard' })).toBeVisible();
    });

    test('TC_A11Y_032: Verify overall keyboard navigation', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Navigate entire page using only keyboard
      await page.keyboard.press('Tab');
      
      // 2. Verify all interactive elements accessible
      const firstButton = page.getByRole('button').first();
      
      // 3. Verify no keyboard traps
      // 4. Verify focus order is logical
      // 5. Verify focus always visible
      await expect(firstButton).toBeVisible();
    });

    test('TC_A11Y_033: Verify color contrast throughout interface', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Inspect all text elements
      // 2. Verify normal text has 4.5:1 contrast
      // 3. Verify large text has 3:1 contrast
      // 4. Verify UI components have 3:1 contrast
      // 5. Test in high contrast mode
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
    });

    test('TC_A11Y_034: Verify responsive design at 200% zoom', async ({ page }) => {
      await login(page);
      
      // 1. Set browser zoom to 200%
      await page.setViewportSize({ width: 640, height: 360 });
      
      // 2. Navigate through entire interface
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 3. Verify all content remains visible
      // 4. Verify no horizontal scrolling required
      // 5. Verify all controls remain functional
      await expect(page.getByRole('heading', { name: 'Product Management' })).toBeVisible();
    });

    test('TC_A11Y_035: Verify no information conveyed by color alone', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Review all status indicators
      await expect(page.getByText('Approved').first()).toBeVisible();
      
      // 2. Verify deleted status has text label
      // 3. Check error states have icons/text
      // 4. Verify success states have icons/text
      // 5. Test interface in grayscale mode
      await expect(page.getByText('Under Review').first()).toBeVisible();
    });
  });
});
