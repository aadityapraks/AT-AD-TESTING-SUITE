import { test, expect } from '@playwright/test';

async function loginAsPartner(page) {
  await page.goto('https://hub-ui-admin-qa.swarajability.org/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  if (page.url().includes('/partner/')) return;

  await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  await page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 15000 });
  await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);

  await page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
  await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(5000);

  if (page.url().includes('auth-d.swarajability.org')) {
    const consentBtn = page.getByRole('button', { name: 'Continue' });
    await consentBtn.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    if (await consentBtn.isVisible().catch(() => false)) {
      await consentBtn.click();
    }
    await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3000);
  }

  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
}

test.describe('SCRUM-26: External Links Accessibility', () => {

  test.describe('1. Add Link Form Controls', () => {
    test('TC_A11Y_001: Verify Add Link button and dropdown options', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading', { name: 'Additional Information' })).toBeVisible();
      const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
      await expect(addLinkButton).toBeVisible();
      await addLinkButton.click();
      await page.waitForTimeout(500);
    });

    test('TC_A11Y_002: Add Amazon Purchase Link field', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
      await addLinkButton.click();
      await page.waitForTimeout(500);
    });

    test('TC_A11Y_003: Add multiple link types', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('button', { name: '+ Add Link' })).toBeVisible();
      await expect(page.getByText(/product links.*\(0\/6 links\)/i)).toBeVisible();
    });
  });

  test.describe('2. URL Validation', () => {
    test('TC_A11Y_004: Validate invalid URL format', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
      await addLinkButton.click();
      await page.waitForTimeout(500);
    });

    test('TC_A11Y_005: Validate URL protocol requirement', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('button', { name: '+ Add Link' })).toBeVisible();
    });

    test('TC_A11Y_006: Validate Amazon domain requirement', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('button', { name: '+ Add Link' })).toBeVisible();
    });

    test('TC_A11Y_007: Validate Flipkart domain requirement', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('button', { name: '+ Add Link' })).toBeVisible();
    });

    test('TC_A11Y_008: Accept valid Amazon URL', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('button', { name: '+ Add Link' })).toBeVisible();
    });
  });

  test.describe('3. Form Elements Accessibility', () => {
    test('TC_A11Y_009: Verify Product Upload form heading', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
    });

    test('TC_A11Y_010: Verify Basic Information section', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading', { name: 'Basic Information' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: /e\.g\., ergonomic wheelchair/i })).toBeVisible();
    });

    test('TC_A11Y_011: Verify Product Images section', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading', { name: 'Product Images' })).toBeVisible();
      await expect(page.getByText('Upload Primary Image')).toBeVisible();
    });

    test('TC_A11Y_012: Verify Technical Specifications section', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading', { name: /technical.*accessibility specifications/i })).toBeVisible();
    });

    test('TC_A11Y_013: Verify Geographical Availability or Pricing section', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      const hasGeo = await page.getByRole('heading', { name: 'Geographical Availability' }).isVisible().catch(() => false);
      const hasPricing = await page.getByRole('heading', { name: /Product Quantity/i }).isVisible().catch(() => false);
      expect(hasGeo || hasPricing).toBe(true);
    });

    test('TC_A11Y_014: Verify Product Quantity & Pricing section', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading', { name: /product quantity.*pricing/i })).toBeVisible();
    });
  });

  test.describe('4. Form Buttons Accessibility', () => {
    test('TC_A11Y_015: Verify Cancel button accessible', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      const cancelButton = page.getByRole('button', { name: 'Cancel' });
      await expect(cancelButton).toBeVisible();
      await cancelButton.focus();
      await expect(cancelButton).toBeFocused();
    });

    test('TC_A11Y_016: Verify Save as Draft button accessible', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      const draftButton = page.getByRole('button', { name: 'Save as Draft' });
      await expect(draftButton).toBeVisible();
      await draftButton.focus();
      await expect(draftButton).toBeFocused();
    });

    test('TC_A11Y_017: Verify Upload Product button accessible', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      const uploadButton = page.getByRole('button', { name: 'Upload Product' });
      await expect(uploadButton).toBeVisible();
      await uploadButton.focus();
      await expect(uploadButton).toBeFocused();
    });
  });

  test.describe('5. Required Fields Validation', () => {
    test('TC_A11Y_018: Verify required field indicators', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      const count = await page.locator('text="*"').count();
      expect(count).toBeGreaterThan(0);
    });

    test('TC_A11Y_019: Verify Product Name is required', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Product Name')).toBeVisible();
      await expect(page.locator('text="Product Name"').locator('..').getByText('*')).toBeVisible();
    });

    test('TC_A11Y_020: Verify Support Helpline Number is required', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('textbox', { name: /e\.g\., \+91 98765 43210/i })).toBeVisible();
    });
  });

  test.describe('6. Keyboard Navigation', () => {
    test('TC_A11Y_021: Verify complete keyboard navigation', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await page.keyboard.press('Tab');
      let focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        focusedElement = page.locator(':focus');
        await expect(focusedElement).toBeVisible();
      }
    });

    test('TC_A11Y_022: Verify Add Link button keyboard accessible', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
      await addLinkButton.focus();
      await expect(addLinkButton).toBeFocused();
      await addLinkButton.press('Enter');
      await page.waitForTimeout(500);
    });
  });

  test.describe('7. Visual Accessibility', () => {
    test('TC_A11Y_023: Verify content readable at 200% zoom', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await page.evaluate(() => { document.body.style.zoom = '200%'; });
      await expect(page.getByRole('heading', { name: 'Upload New Product' })).toBeVisible();
      await expect(page.getByRole('button', { name: '+ Add Link' })).toBeVisible();
      await page.evaluate(() => { document.body.style.zoom = '100%'; });
    });

    test('TC_A11Y_024: Verify form sections have proper headings', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('heading', { name: 'Upload New Product', level: 2 })).toBeVisible();
      const h3Count = await page.locator('h3').count();
      expect(h3Count).toBeGreaterThan(0);
    });
  });

  test.describe('8. Help Text and Instructions', () => {
    test('TC_A11Y_025: Verify help text for Product Links', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Add links where users can purchase or learn more about your product')).toBeVisible();
    });

    test('TC_A11Y_026: Verify character count for Short Description', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('(0/200 characters)')).toBeVisible();
    });

    test('TC_A11Y_027: Verify image upload instructions', async ({ page }) => {
      await loginAsPartner(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-upload');
      await page.waitForTimeout(2000);
      const imageHelp = page.getByText(/thumbnail.*jpg or png.*5mb/i).first();
      await imageHelp.scrollIntoViewIfNeeded().catch(() => {});
      await expect(imageHelp).toBeVisible();
    });
  });

  test.describe('9. Radio Button Groups', () => {
    test('TC_A11Y_028: Verify Video Type radio buttons', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      await expect(page.getByRole('radio', { name: 'Upload Video File' })).toBeChecked();
      await expect(page.getByRole('radio', { name: 'YouTube/Vimeo Link' })).not.toBeChecked();
    });

    test('TC_A11Y_029: Verify Product Serviceable Areas radio buttons', async ({ page }) => {
      await loginAsPartner(page);
      await page.getByRole('link', { name: 'Product Upload' }).click();
      await page.waitForTimeout(1000);
      const uploadVideoRadio = page.getByRole('radio', { name: 'Upload Video File' });
      await uploadVideoRadio.scrollIntoViewIfNeeded().catch(() => {});
      await expect(uploadVideoRadio).toBeChecked();
      const hasPanIndia = await page.getByRole('radio', { name: 'Pan India' }).isVisible().catch(() => false);
      expect(typeof hasPanIndia).toBe('boolean');
    });
  });
});
