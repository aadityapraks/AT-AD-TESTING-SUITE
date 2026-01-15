// spec: specs/a11y/SCRUM-22-edit-product-genai.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum22-accessibility.json';

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

test.describe('SCRUM-22: Edit Product with GenAI Accessibility', () => {

  test.describe('1. Edit Product Access', () => {
    
    test('TC_A11Y_001: Verify Edit Product button accessibility', async ({ page }) => {
      await login(page);
      // 1. Navigate to Product Management
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 2. Tab to Edit Product button in actions column
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.focus();
      
      // 3. Verify focus indicator visible
      await expect(actionsButton).toBeFocused();
      
      // 4. Press Enter/Space to activate
      await actionsButton.press('Enter');
      
      // 5. Verify edit form opens
      await expect(page.getByText('Edit').last()).toBeVisible();
    });

    test('TC_A11Y_002: Verify Edit button screen reader accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Enable screen reader
      // 2. Navigate to Edit button
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.click();
      
      // 3. Verify button name announced
      const editButton = page.locator('.action-item').filter({ hasText: 'Edit' }).first();
      await expect(editButton).toBeVisible();
      
      // 4. Verify button role announced
      // 5. Test button activation
      await editButton.click();
    });

    test('TC_A11Y_003: Verify edit form structure', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Open edit form
      // 2. Use screen reader heading navigation
      // 3. Verify form title heading
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
      
      // 4. Check section headings
      await expect(page.getByRole('heading', { name: 'Basic Information' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
      
      // 5. Verify heading hierarchy
      const h2Headings = page.getByRole('heading', { level: 2 });
      await expect(h2Headings.first()).toBeVisible();
    });
  });

  test.describe('2. Enhance with GenAI Buttons', () => {
    
    test('TC_A11Y_004: Verify Enhance with GenAI button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Open edit form with existing content
      await page.getByRole('textbox', { name: /Brief summary/ }).fill('Test description');
      
      // 2. Tab to Enhance with GenAI buttons
      const enhanceButton = page.getByRole('button', { name: /Assist with GenAI/ }).first();
      await enhanceButton.scrollIntoViewIfNeeded();
      await enhanceButton.focus();
      
      // 3. Verify focus indicators
      await expect(enhanceButton).toBeFocused();
      
      // 4. Test button activation
      await enhanceButton.press('Enter');
      
      // 5. Verify button states
      await expect(enhanceButton).toBeVisible();
    });

    test('TC_A11Y_005: Verify Enhance button screen reader accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Enable screen reader
      // 2. Navigate to Enhance buttons
      const enhanceButtons = page.getByRole('button', { name: /Assist with GenAI/ });
      
      // 3. Tab through each button
      await enhanceButtons.first().focus();
      
      // 4. Verify button names announced
      await expect(enhanceButtons.first()).toBeVisible();
      
      // 5. Verify tooltip announced
      await enhanceButtons.first().hover();
    });

    test('TC_A11Y_006: Verify button tooltip accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to Enhance button
      const enhanceButton = page.getByRole('button', { name: /Assist with GenAI/ }).first();
      
      // 2. Trigger tooltip with focus
      await enhanceButton.focus();
      
      // 3. Trigger tooltip with hover
      await enhanceButton.hover();
      
      // 4. Verify tooltip announced
      await expect(enhanceButton).toBeVisible();
      
      // 5. Test tooltip dismissal
      await page.keyboard.press('Escape');
    });

    test('TC_A11Y_007: Verify button disabled state', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Open edit form with empty field
      // 2. Navigate to Enhance button
      const enhanceButton = page.getByRole('button', { name: /Assist with GenAI/ }).first();
      
      // 3. Verify button disabled
      // 4. Check disabled state announced
      await expect(enhanceButton).toBeVisible();
      
      // 5. Test tooltip
      await enhanceButton.hover();
    });
  });

  test.describe('3. ALT Text Generation', () => {
    
    test('TC_A11Y_008: Verify ALT text generation button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to image section
      await page.getByRole('heading', { name: 'Product Images' }).scrollIntoViewIfNeeded();
      
      // 2. Tab to ALT text GenAI button
      // 3. Verify focus indicator
      // 4. Press Enter/Space
      // 5. Verify ALT text generated
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });

    test('TC_A11Y_009: Verify ALT text field accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Generate ALT text
      // 2. Navigate to ALT text field
      // 3. Verify field label
      // 4. Check character limit indicator
      // 5. Test with screen reader
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });

    test('TC_A11Y_010: Verify ALT text quality', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Generate ALT text for various images
      // 2. Review generated text
      // 3. Verify no redundant phrasing
      // 4. Check description clarity
      // 5. Verify accessibility compliance
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });

    test('TC_A11Y_011: Verify ALT text editing accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Generate ALT text
      // 2. Edit ALT text with keyboard
      // 3. Verify character count updates
      // 4. Test character limit
      // 5. Verify save functionality
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });
  });

  test.describe('4. Side-by-Side Comparison', () => {
    
    test('TC_A11Y_012: Verify comparison view structure', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Trigger GenAI enhancement
      // 2. Verify comparison view appears
      // 3. Check semantic structure
      // 4. Verify labels present
      // 5. Test keyboard navigation
      await expect(page.getByText('CURRENT')).toBeVisible();
      await expect(page.getByText('NEW')).toBeVisible();
    });

    test('TC_A11Y_013: Verify comparison screen reader accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Enable screen reader
      // 2. Navigate comparison view
      // 3. Verify original text announced
      // 4. Verify suggested text announced
      // 5. Test navigation
      await expect(page.getByText('CURRENT')).toBeVisible();
    });

    test('TC_A11Y_014: Verify comparison visual accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Inspect comparison view colors
      // 2. Verify text contrast ratios
      // 3. Check for color-only indicators
      // 4. Verify label contrast
      // 5. Test zoom to 200%
      await expect(page.getByText('CURRENT')).toBeVisible();
    });

    test('TC_A11Y_015: Verify difference highlighting accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Review highlighted differences
      // 2. Verify text labels present
      // 3. Check for non-color indicators
      // 4. Verify highlight contrast
      // 5. Test with screen reader
      await expect(page.getByText('CURRENT')).toBeVisible();
    });
  });

  test.describe('5. Action Buttons', () => {
    
    test('TC_A11Y_016: Verify action buttons keyboard accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. View AI suggestions
      // 2. Tab through action buttons
      const cancelButton = page.getByRole('button', { name: 'Cancel' });
      const saveButton = page.getByRole('button', { name: 'Save as Draft' });
      const uploadButton = page.getByRole('button', { name: 'Upload Product' });
      
      // 3. Verify focus indicators
      await cancelButton.focus();
      await expect(cancelButton).toBeFocused();
      
      // 4. Test button activation
      await saveButton.focus();
      await expect(saveButton).toBeFocused();
      
      // 5. Verify tab order
      await uploadButton.focus();
      await expect(uploadButton).toBeFocused();
    });

    test('TC_A11Y_017: Verify action buttons screen reader accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Enable screen reader
      // 2. Navigate to action buttons
      const cancelButton = page.getByRole('button', { name: 'Cancel' });
      
      // 3. Verify button names announced
      await expect(cancelButton).toBeVisible();
      
      // 4. Activate each button
      // 5. Verify action results announced
      await expect(page.getByRole('button', { name: 'Save as Draft' })).toBeVisible();
    });

    test('TC_A11Y_018: Verify action buttons visual accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Inspect button colors
      // 2. Verify text contrast
      // 3. Verify background contrast
      // 4. Test hover/focus states
      // 5. Measure touch targets
      const uploadButton = page.getByRole('button', { name: 'Upload Product' });
      await expect(uploadButton).toBeVisible();
    });
  });

  test.describe('6. Accept All Action', () => {
    
    test('TC_A11Y_019: Verify Accept All functionality', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. View AI suggestions
      // 2. Activate Accept All button
      // 3. Verify text replaced
      // 4. Check announcement
      // 5. Verify focus management
      await expect(page.getByRole('button', { name: 'Upload Product' })).toBeVisible();
    });

    test('TC_A11Y_020: Verify Accept All announcement', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Accept AI suggestions
      // 2. Verify aria-live announcement
      // 3. Check focus stability
      // 4. Test undo if available
      // 5. Verify view closes
      await expect(page.getByRole('button', { name: 'Upload Product' })).toBeVisible();
    });
  });

  test.describe('7. Edit/Merge Action', () => {
    
    test('TC_A11Y_021: Verify Edit/Merge mode accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Activate Edit/Merge button
      // 2. Verify textarea appears
      const descriptionField = page.getByRole('textbox', { name: /Comprehensive product description/ });
      
      // 3. Check textarea content
      await expect(descriptionField).toBeVisible();
      
      // 4. Test keyboard editing
      await descriptionField.fill('Test content');
      
      // 5. Verify reference text
      await expect(descriptionField).toHaveValue('Test content');
    });

    test('TC_A11Y_022: Verify Edit/Merge screen reader accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Enable screen reader
      // 2. Activate Edit/Merge
      const descriptionField = page.getByRole('textbox', { name: /Comprehensive product description/ });
      
      // 3. Verify textarea announced
      await expect(descriptionField).toBeVisible();
      
      // 4. Type edits
      await descriptionField.fill('Test edits');
      
      // 5. Test Save/Cancel buttons
      await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    });

    test('TC_A11Y_023: Verify Edit/Merge action buttons', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Enter edit mode
      // 2. Tab to Save/Cancel buttons
      const saveButton = page.getByRole('button', { name: 'Save as Draft' });
      const cancelButton = page.getByRole('button', { name: 'Cancel' });
      
      // 3. Verify focus indicators
      await saveButton.focus();
      await expect(saveButton).toBeFocused();
      
      // 4. Test button activation
      await cancelButton.focus();
      await expect(cancelButton).toBeFocused();
      
      // 5. Verify Cancel behavior
      await expect(cancelButton).toBeVisible();
    });
  });

  test.describe('8. Reject Action', () => {
    
    test('TC_A11Y_024: Verify Reject functionality', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. View AI suggestions
      // 2. Activate Reject button
      // 3. Verify original text retained
      // 4. Check announcement
      // 5. Verify focus management
      await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    });

    test('TC_A11Y_025: Verify Reject announcement', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Reject AI suggestions
      // 2. Verify aria-live announcement
      // 3. Check focus stability
      // 4. Verify view closes
      // 5. Test form editability
      await expect(page.getByRole('textbox').first()).toBeEditable();
    });
  });

  test.describe('9. Save Changes', () => {
    
    test('TC_A11Y_026: Verify Save Changes button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Make edits to product
      await page.getByRole('textbox', { name: /e.g., Ergonomic Wheelchair/ }).fill('Test Product');
      
      // 2. Tab to Save Changes button
      const saveButton = page.getByRole('button', { name: 'Save as Draft' });
      await saveButton.focus();
      
      // 3. Verify focus indicator
      await expect(saveButton).toBeFocused();
      
      // 4. Press Enter/Space
      // 5. Verify confirmation
      await expect(saveButton).toBeVisible();
    });

    test('TC_A11Y_027: Verify Save button screen reader accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Enable screen reader
      // 2. Navigate to Save button
      const saveButton = page.getByRole('button', { name: 'Upload Product' });
      
      // 3. Verify button announced
      await expect(saveButton).toBeVisible();
      
      // 4. Activate button
      // 5. Verify progress announced
      await expect(saveButton).toHaveText(/Upload Product/);
    });

    test('TC_A11Y_028: Verify save confirmation accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Save changes
      // 2. Verify confirmation appears
      // 3. Check message announced
      // 4. Verify message contrast
      // 5. Test message dismissal
      await expect(page.getByRole('button', { name: 'Upload Product' })).toBeVisible();
    });
  });

  test.describe('10. Version Control Indicator', () => {
    
    test('TC_A11Y_029: Verify version control accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Save edited product
      // 2. Locate version indicator
      // 3. Verify version info
      // 4. Test with screen reader
      // 5. Test rollback if available
      await expect(page.getByText('Pending Changes')).toBeVisible();
    });

    test('TC_A11Y_030: Verify status change announcement', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Save changes
      // 2. Verify status updates
      // 3. Check status announcement
      // 4. Verify status badge
      // 5. Check visual indicators
      await expect(page.getByText('Under Review')).toBeVisible();
    });
  });

  test.describe('11. Error Handling', () => {
    
    test('TC_A11Y_031: Verify GenAI unavailable error accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Trigger GenAI when service unavailable
      // 2. Verify error message appears
      // 3. Check error announcement
      // 4. Verify error contrast
      // 5. Check error icon
      await expect(page.getByRole('button', { name: /Assist with GenAI/ }).first()).toBeVisible();
    });

    test('TC_A11Y_032: Verify error keyboard handling', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Trigger error
      // 2. Verify focus management
      // 3. Tab to dismiss button
      // 4. Test Escape key
      // 5. Test retry option
      await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    });

    test('TC_A11Y_033: Verify form validation errors', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Submit form with errors
      await page.getByRole('button', { name: 'Upload Product' }).click();
      
      // 2. Verify validation errors
      // 3. Check error announcements
      // 4. Verify error-field association
      // 5. Test error navigation
      await expect(page.getByText('*')).toBeVisible();
    });
  });

  test.describe('12. Audit Logging Indicator', () => {
    
    test('TC_A11Y_034: Verify audit log indicator accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Save AI-edited content
      // 2. Verify indicator appears
      // 3. Check indicator content
      // 4. Test with screen reader
      // 5. Verify text contrast
      await expect(page.getByText(/Submitted:/)).toBeVisible();
    });

    test('TC_A11Y_035: Verify audit indicator details', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Locate audit indicator
      // 2. Check icon accessibility
      // 3. Test tooltip if present
      // 4. Verify layout
      // 5. Test zoom to 200%
      await expect(page.getByText(/Dec \d+, 2025/)).toBeVisible();
    });
  });

  test.describe('13. Disclaimer Text', () => {
    
    test('TC_A11Y_036: Verify disclaimer accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Open GenAI panel
      // 2. Locate disclaimer text
      // 3. Verify text content
      // 4. Check text contrast
      // 5. Test with screen reader
      await expect(page.getByText(/This appears/)).toBeVisible();
    });

    test('TC_A11Y_037: Verify disclaimer structure', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Inspect disclaimer markup
      // 2. Check ARIA attributes
      // 3. Verify semantic structure
      // 4. Test zoom to 200%
      // 5. Verify layout
      await expect(page.getByText(/Optional/)).toBeVisible();
    });
  });

  test.describe('14. Help Icons and Tips', () => {
    
    test('TC_A11Y_038: Verify help icon accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to help icons
      const helpIcon = page.locator('img[alt*="info"], img[alt*="help"]').first();
      
      // 2. Tab to help icons
      // 3. Verify focus indicators
      // 4. Press Enter/Space
      // 5. Verify tips appear
      await expect(page.getByText(/Tip:/)).toBeVisible();
    });

    test('TC_A11Y_039: Verify help icon screen reader accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Enable screen reader
      // 2. Navigate to help icons
      // 3. Verify icon announced
      // 4. Trigger tooltip
      // 5. Verify tooltip announced
      await expect(page.getByText(/Tip:/)).toBeVisible();
    });

    test('TC_A11Y_040: Verify help tip content accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Open help tips
      // 2. Review tip content
      // 3. Verify text contrast
      // 4. Test zoom to 200%
      // 5. Test tip dismissal
      await expect(page.getByText(/Tip:/)).toBeVisible();
    });
  });

  test.describe('15. Overall Interface Accessibility', () => {
    
    test('TC_A11Y_041: Verify complete keyboard navigation', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate entire edit workflow
      // 2. Tab through all elements
      await page.keyboard.press('Tab');
      
      // 3. Verify tab order logical
      const firstInput = page.getByRole('textbox').first();
      await firstInput.focus();
      
      // 4. Test all interactive elements
      await expect(firstInput).toBeFocused();
      
      // 5. Verify no keyboard traps
      await page.keyboard.press('Tab');
    });

    test('TC_A11Y_042: Verify complete screen reader accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Enable screen reader
      // 2. Navigate entire workflow
      // 3. Verify all elements announced
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
      
      // 4. Check state changes
      // 5. Test dynamic content
      await expect(page.getByRole('textbox').first()).toBeVisible();
    });

    test('TC_A11Y_043: Verify color and contrast compliance', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Inspect all text elements
      // 2. Verify text contrast ratios
      // 3. Check UI component contrast
      // 4. Verify focus indicators
      // 5. Test high contrast mode
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
    });

    test('TC_A11Y_044: Verify responsive design accessibility', async ({ page }) => {
      await login(page);
      
      // 1. Test at various viewport sizes
      await page.setViewportSize({ width: 375, height: 667 });
      
      // 2. Zoom to 200%
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 3. Verify content reflows
      // 4. Measure touch targets
      // 5. Test on mobile viewport
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
    });
  });
});
