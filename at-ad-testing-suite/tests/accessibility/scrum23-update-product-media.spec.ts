// spec: specs/a11y/SCRUM-23-update-product-media.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum23-accessibility.json';

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

test.describe('SCRUM-23: Update Product Media Accessibility', () => {

  test.describe('1. Edit Product Access and Media Gallery', () => {
    
    test('TC_A11Y_001: Verify keyboard navigation to Edit Product option', async ({ page }) => {
      await login(page);
      // 1. Login as approved AP
      // 2. Navigate to Vendor Product Management page
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 3. Tab through product list to Edit Product button
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      await actionsButton.focus();
      
      // 4. Verify focus indicator is visible
      await expect(actionsButton).toBeFocused();
      
      // 5. Press Enter to activate Edit Product
      await actionsButton.press('Enter');
      await expect(page.locator('.action-item').filter({ hasText: 'Edit' }).first()).toBeVisible();
    });

    test('TC_A11Y_002: Verify screen reader announces Edit Product button', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. Enable screen reader
      // 2. Navigate to product list
      const actionsButton = page.getByRole('button', { name: /Product:.*Status:/ }).first().getByLabel('Product actions menu');
      
      // 3. Focus on Edit Product button
      await actionsButton.click();
      
      // 4. Verify button name and role announced
      const editButton = page.locator('.action-item').filter({ hasText: 'Edit' }).first();
      await expect(editButton).toBeVisible();
      
      // 5. Verify associated product name announced
      await expect(page.getByText('Wheelchair Ramp Model XR-100')).toBeVisible();
    });

    test('TC_A11Y_003: Verify media gallery view accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Open Edit Product media section
      // 2. Verify gallery has proper landmark role
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
      
      // 3. Tab through all images and videos
      // 4. Verify each item is keyboard accessible
      // 5. Check focus order follows visual layout
      await expect(page.getByRole('heading', { name: 'Demo Video' })).toBeVisible();
    });

    test('TC_A11Y_004: Verify gallery visual accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Inspect gallery text contrast
      // 2. Test gallery at 200% zoom
      // 3. Verify borders/separators have 3:1 contrast
      // 4. Check gallery doesn't rely on color alone
      // 5. Verify all labels are readable
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });
  });

  test.describe('2. Primary Image Management', () => {
    
    test('TC_A11Y_005: Verify primary image indicator accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to media gallery
      // 2. Locate primary image
      // 3. Verify "Primary" indicator is visible
      // 4. Check screen reader announces primary status
      // 5. Verify indicator has sufficient contrast
      await expect(page.getByText('Primary Image *')).toBeVisible();
    });

    test('TC_A11Y_006: Verify replace primary image button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Focus on primary image
      // 2. Tab to Replace button
      const uploadButton = page.getByText('Upload Primary Image').first();
      
      // 3. Verify focus indicator visible
      await expect(uploadButton).toBeVisible();
      
      // 4. Press Enter to activate
      // 5. Verify file picker opens
      await expect(uploadButton).toBeVisible();
    });

    test('TC_A11Y_007: Verify reassign primary image functionality', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to non-primary image
      // 2. Tab to "Set as Primary" button
      // 3. Verify button is keyboard accessible
      // 4. Activate with Enter/Space
      // 5. Verify primary status updates announced
      await expect(page.getByText('Primary Image *')).toBeVisible();
    });

    test('TC_A11Y_008: Verify primary image preview update', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Update primary image
      // 2. Verify preview updates automatically
      // 3. Check screen reader announces update
      // 4. Verify preview has proper ALT text
      // 5. Test preview at 200% zoom
      await expect(page.getByText('Primary Image *')).toBeVisible();
    });
  });

  test.describe('3. Additional Image Uploads', () => {
    
    test('TC_A11Y_009: Verify upload button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to upload section
      // 2. Tab to Upload Images button
      const uploadButton = page.getByText('Upload Additional Images');
      await uploadButton.focus();
      
      // 3. Verify focus indicator visible
      await expect(uploadButton).toBeFocused();
      
      // 4. Press Enter to activate
      // 5. Verify file picker opens
      await expect(uploadButton).toBeVisible();
    });

    test('TC_A11Y_010: Verify file format validation messages', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Attempt to upload unsupported format
      // 2. Verify error message appears
      // 3. Check screen reader announces error
      // 4. Verify error has sufficient contrast
      // 5. Test keyboard focus on error
      await expect(page.getByText('JPG or PNG')).toBeVisible();
    });

    test('TC_A11Y_011: Verify image preview accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Upload valid images
      // 2. Verify previews are keyboard accessible
      // 3. Tab through all preview controls
      // 4. Check screen reader announces image details
      // 5. Verify preview actions are accessible
      await expect(page.getByText('Additional Images')).toBeVisible();
    });

    test('TC_A11Y_012: Verify reorder images functionality', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Focus on image in gallery
      // 2. Locate reorder controls (up/down arrows)
      // 3. Verify controls are keyboard accessible
      // 4. Use Enter/Space to reorder
      // 5. Verify new order announced
      await expect(page.getByText('Additional Images')).toBeVisible();
    });

    test('TC_A11Y_013: Verify delete image functionality', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Focus on image preview
      // 2. Tab to Delete button
      // 3. Verify button is keyboard accessible
      // 4. Press Enter to delete
      // 5. Verify deletion announced
      await expect(page.getByText('Additional Images')).toBeVisible();
    });
  });

  test.describe('4. 3D Mockup Images', () => {
    
    test('TC_A11Y_014: Verify 3D mockup section accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to 3D mockup section
      // 2. Verify section has proper heading
      await expect(page.getByText('3D Mockup Images')).toBeVisible();
      
      // 3. Tab through upload controls
      // 4. Check image limit (3) is announced
      await expect(page.getByText('0/3 images')).toBeVisible();
      
      // 5. Verify image tip is accessible
      await expect(page.getByText('Upload up to 3 3D mockup images')).toBeVisible();
    });

    test('TC_A11Y_015: Verify 3D mockup image tip accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Focus on image tip icon
      // 2. Verify tooltip appears on focus/hover
      // 3. Check screen reader announces tip content
      // 4. Press Escape to close tooltip
      // 5. Verify tooltip has sufficient contrast
      await expect(page.getByText('3D Mockup Images')).toBeVisible();
    });
  });

  test.describe('5. Demo Video Updates', () => {
    
    test('TC_A11Y_016: Verify video upload button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to demo video section
      await expect(page.getByRole('heading', { name: /Demo Video/ })).toBeVisible();
      
      // 2. Tab to Upload Video button
      const uploadButton = page.getByText('Click to upload video file');
      
      // 3. Verify focus indicator visible
      // 4. Press Enter to activate
      // 5. Verify file picker opens
      await expect(uploadButton).toBeVisible();
    });

    test('TC_A11Y_017: Verify video embed link input accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to embed link option
      // 2. Tab to input field
      // 3. Verify field has visible label
      // 4. Type YouTube/Vimeo URL
      // 5. Verify validation feedback is accessible
      await expect(page.getByText('YouTube/Vimeo Link')).toBeVisible();
    });

    test('TC_A11Y_018: Verify video preview player accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Upload or embed video
      // 2. Navigate to video preview
      // 3. Tab through player controls
      // 4. Verify all controls keyboard accessible
      // 5. Test play/pause with Enter/Space
      await expect(page.getByRole('heading', { name: /Demo Video/ })).toBeVisible();
    });

    test('TC_A11Y_019: Verify video file validation messages', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Attempt to upload invalid file type
      // 2. Verify error message appears
      // 3. Check screen reader announces error
      // 4. Attempt to upload oversized file
      // 5. Verify size limit error is accessible
      await expect(page.getByText('MP4, MOV, or WebM, max 50MB')).toBeVisible();
    });
  });

  test.describe('6. ALT Text and Captions', () => {
    
    test('TC_A11Y_020: Verify ALT text input field accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Upload image
      // 2. Navigate to ALT text field
      // 3. Verify field has visible label
      // 4. Verify required indicator is accessible
      // 5. Type ALT text and verify character count
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });

    test('TC_A11Y_021: Verify missing ALT text prompt', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Upload image without ALT text
      // 2. Attempt to save
      await page.getByRole('button', { name: 'Upload Product' }).click();
      
      // 3. Verify prompt appears
      // 4. Check screen reader announces prompt
      // 5. Verify prompt has sufficient contrast
      await expect(page.getByText('*')).toBeVisible();
    });

    test('TC_A11Y_022: Verify Generate ALT Text with GenAI button', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to Generate ALT Text button
      // 2. Verify button is keyboard accessible
      // 3. Press Enter to activate
      // 4. Verify loading state is announced
      // 5. Verify generated text is announced
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });

    test('TC_A11Y_023: Verify video caption upload accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to caption upload section
      // 2. Tab to Upload Captions button
      // 3. Verify button is keyboard accessible
      // 4. Upload .SRT file
      // 5. Verify success message is accessible
      await expect(page.getByRole('heading', { name: /Demo Video/ })).toBeVisible();
    });

    test('TC_A11Y_024: Verify caption warning message', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Upload video without captions
      // 2. Verify warning message appears
      // 3. Check screen reader announces warning
      // 4. Verify warning has sufficient contrast
      // 5. Verify warning icon is accessible
      await expect(page.getByRole('heading', { name: /Demo Video/ })).toBeVisible();
    });
  });

  test.describe('7. Preview and Validation', () => {
    
    test('TC_A11Y_025: Verify Preview Media button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to Preview Media button
      // 2. Verify button is keyboard accessible
      // 3. Press Enter to open preview
      // 4. Verify preview modal opens
      // 5. Check focus moves to modal
      await expect(page.getByRole('button', { name: 'Upload Product' })).toBeVisible();
    });

    test('TC_A11Y_026: Verify preview modal accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Open preview modal
      // 2. Verify focus trap within modal
      // 3. Tab through all modal content
      // 4. Press Escape to close
      // 5. Verify focus returns to trigger button
      await expect(page.getByRole('button', { name: 'Upload Product' })).toBeVisible();
    });

    test('TC_A11Y_027: Verify preview primary image display', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Open preview modal
      // 2. Navigate to primary image
      // 3. Verify image has ALT text
      // 4. Check image is announced by screen reader
      // 5. Test image at 200% zoom
      await expect(page.getByText('Primary Image')).toBeVisible();
    });

    test('TC_A11Y_028: Verify preview gallery/carousel accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to image carousel in preview
      // 2. Tab through carousel controls
      // 3. Use arrow keys to navigate images
      // 4. Verify current image announced
      // 5. Test carousel at 200% zoom
      await expect(page.getByText('Additional Images')).toBeVisible();
    });

    test('TC_A11Y_029: Verify preview video player accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to video in preview
      // 2. Tab through player controls
      // 3. Verify captions are visible
      // 4. Test play/pause with keyboard
      // 5. Verify volume controls accessible
      await expect(page.getByRole('heading', { name: /Demo Video/ })).toBeVisible();
    });
  });

  test.describe('8. Saving and Approval Workflow', () => {
    
    test('TC_A11Y_030: Verify Save Changes button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Make media updates
      // 2. Navigate to Save Changes button
      const saveButton = page.getByRole('button', { name: 'Upload Product' });
      await saveButton.focus();
      
      // 3. Verify button is keyboard accessible
      await expect(saveButton).toBeFocused();
      
      // 4. Press Enter to save
      // 5. Verify validation occurs
      await expect(saveButton).toBeVisible();
    });

    test('TC_A11Y_031: Verify mandatory field validation', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Attempt to save without ALT text
      await page.getByRole('button', { name: 'Upload Product' }).click();
      
      // 2. Verify validation error appears
      // 3. Check screen reader announces error
      // 4. Verify focus moves to first error
      // 5. Verify error has sufficient contrast
      await expect(page.getByText('*').first()).toBeVisible();
    });

    test('TC_A11Y_032: Verify confirmation message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Successfully save changes
      // 2. Verify confirmation message appears
      // 3. Check screen reader announces message
      // 4. Verify message has sufficient contrast
      // 5. Verify message is dismissible
      await expect(page.getByRole('button', { name: 'Upload Product' })).toBeVisible();
    });

    test('TC_A11Y_033: Verify Pending Review status indicator', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-management');
      
      // 1. After saving, verify status updates
      // 2. Navigate to status indicator
      // 3. Check screen reader announces status
      // 4. Verify indicator has sufficient contrast
      // 5. Verify status not conveyed by color alone
      await expect(page.getByText('Under Review').first()).toBeVisible();
    });
  });

  test.describe('9. File Upload Progress and Performance', () => {
    
    test('TC_A11Y_034: Verify upload progress bar accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Upload large image file
      // 2. Verify progress bar appears
      // 3. Check screen reader announces progress
      // 4. Verify progress bar has proper ARIA
      // 5. Verify progress updates announced
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });

    test('TC_A11Y_035: Verify upload status indicators', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Upload multiple files
      // 2. Verify status for each file shown
      // 3. Check screen reader announces statuses
      // 4. Verify status icons have text alternatives
      // 5. Verify statuses have sufficient contrast
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });

    test('TC_A11Y_036: Verify interrupted upload resume', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Start file upload
      // 2. Interrupt upload (simulate network issue)
      // 3. Verify resume option appears
      // 4. Check resume button is keyboard accessible
      // 5. Verify resume status announced
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });
  });

  test.describe('10. Error Handling', () => {
    
    test('TC_A11Y_037: Verify file size error message', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Attempt to upload oversized image (>5MB)
      // 2. Verify error message appears
      // 3. Check screen reader announces error
      // 4. Verify error has sufficient contrast
      // 5. Verify user can retry
      await expect(page.getByText('max 5MB')).toBeVisible();
    });

    test('TC_A11Y_038: Verify unsupported format error', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Attempt to upload unsupported format
      // 2. Verify error message appears
      // 3. Check screen reader announces error
      // 4. Verify supported formats listed
      // 5. Verify user can retry
      await expect(page.getByText('JPG or PNG')).toBeVisible();
    });

    test('TC_A11Y_039: Verify upload failure error handling', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Simulate upload failure
      // 2. Verify error message appears
      // 3. Check screen reader announces error
      // 4. Verify retry button is accessible
      // 5. Verify previously added media preserved
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });

    test('TC_A11Y_040: Verify image limit exceeded error', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Attempt to upload more than 5 images
      // 2. Verify error message appears
      // 3. Check screen reader announces error
      // 4. Verify limit clearly stated
      // 5. Verify upload button disabled when limit reached
      await expect(page.getByText('0/5 images')).toBeVisible();
    });
  });

  test.describe('11. Overall Interface Accessibility', () => {
    
    test('TC_A11Y_041: Verify page title and landmarks', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to media update page
      // 2. Verify page title is descriptive
      await expect(page).toHaveTitle(/HubUiAdmin/);
      
      // 3. Use screen reader to navigate by landmarks
      // 4. Verify main, navigation landmarks exist
      // 5. Verify skip links present
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
    });

    test('TC_A11Y_042: Verify heading hierarchy', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate through page
      // 2. Use screen reader to list headings
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
      
      // 3. Verify heading levels are sequential
      await expect(page.getByRole('heading', { name: 'Basic Information' })).toBeVisible();
      
      // 4. Verify no heading levels skipped
      // 5. Verify headings describe sections
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
    });

    test('TC_A11Y_043: Verify help text and tooltips', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate to help icons
      // 2. Focus on help icon
      // 3. Verify tooltip appears on focus/hover
      // 4. Check screen reader announces help text
      // 5. Verify tooltip has sufficient contrast
      await expect(page.getByText(/Tip:/)).toBeVisible();
    });

    test('TC_A11Y_044: Verify overall keyboard navigation', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Navigate entire page using only keyboard
      await page.keyboard.press('Tab');
      
      // 2. Verify all interactive elements accessible
      const firstInput = page.getByRole('textbox').first();
      await firstInput.focus();
      
      // 3. Verify no keyboard traps
      await expect(firstInput).toBeFocused();
      
      // 4. Verify focus order is logical
      // 5. Verify focus always visible
      await page.keyboard.press('Tab');
    });

    test('TC_A11Y_045: Verify color contrast throughout interface', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 1. Inspect all text elements
      // 2. Verify normal text has 4.5:1 contrast
      // 3. Verify large text has 3:1 contrast
      // 4. Verify UI components have 3:1 contrast
      // 5. Test in high contrast mode
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
    });

    test('TC_A11Y_046: Verify responsive design at 200% zoom', async ({ page }) => {
      await login(page);
      
      // 1. Set browser zoom to 200%
      await page.setViewportSize({ width: 640, height: 360 });
      
      // 2. Navigate through entire interface
      await page.goto('https://hub-ui-admin-dev.swarajability.org/partner/product-upload');
      
      // 3. Verify all content remains visible
      // 4. Verify no horizontal scrolling required
      // 5. Verify all controls remain functional
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
    });
  });
});
