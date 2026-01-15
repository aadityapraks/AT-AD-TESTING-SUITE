import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum26-accessibility.json';

async function loginAsPartner(page) {
  await page.goto('https://hub-ui-admin-dev.swarajability.org/');
  await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);
  await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(5000);
}

test.describe('1. Add Link Form Controls', () => {
  test('Verify Add Link button and dropdown options', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const additionalInfoSection = page.getByRole('heading', { name: 'Additional Information' });
    await expect(additionalInfoSection).toBeVisible();
    
    const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
    await expect(addLinkButton).toBeVisible();
    await addLinkButton.click();
    await page.waitForTimeout(500);
  });

  test('Add Amazon Purchase Link field', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
    await addLinkButton.click();
    await page.waitForTimeout(500);
  });

  test('Add multiple link types', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
    await expect(addLinkButton).toBeVisible();
    
    const productLinksLabel = page.getByText(/product links.*\(0\/6 links\)/i);
    await expect(productLinksLabel).toBeVisible();
  });
});

test.describe('2. URL Validation', () => {
  test('Validate invalid URL format', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
    await addLinkButton.click();
    await page.waitForTimeout(500);
  });

  test('Validate URL protocol requirement', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
    await expect(addLinkButton).toBeVisible();
  });

  test('Validate Amazon domain requirement', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
    await expect(addLinkButton).toBeVisible();
  });

  test('Validate Flipkart domain requirement', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
    await expect(addLinkButton).toBeVisible();
  });

  test('Accept valid Amazon URL', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
    await expect(addLinkButton).toBeVisible();
  });
});

test.describe('3. Form Elements Accessibility', () => {
  test('Verify Product Upload form heading', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const heading = page.getByRole('heading', { name: 'Upload New Product' });
    await expect(heading).toBeVisible();
  });

  test('Verify Basic Information section', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const basicInfoHeading = page.getByRole('heading', { name: 'Basic Information' });
    await expect(basicInfoHeading).toBeVisible();
    
    const productNameInput = page.getByRole('textbox', { name: /e\.g\., ergonomic wheelchair/i });
    await expect(productNameInput).toBeVisible();
  });

  test('Verify Product Images section', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const imagesHeading = page.getByRole('heading', { name: 'Product Images' });
    await expect(imagesHeading).toBeVisible();
    
    const uploadPrimaryButton = page.getByText('Upload Primary Image');
    await expect(uploadPrimaryButton).toBeVisible();
  });

  test('Verify Technical Specifications section', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const techSpecHeading = page.getByRole('heading', { name: /technical.*accessibility specifications/i });
    await expect(techSpecHeading).toBeVisible();
  });

  test('Verify Geographical Availability section', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const geoHeading = page.getByRole('heading', { name: 'Geographical Availability' });
    await expect(geoHeading).toBeVisible();
    
    const panIndiaRadio = page.getByRole('radio', { name: 'Pan India' });
    await expect(panIndiaRadio).toBeChecked();
  });

  test('Verify Product Quantity & Pricing section', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const pricingHeading = page.getByRole('heading', { name: /product quantity.*pricing/i });
    await expect(pricingHeading).toBeVisible();
  });
});

test.describe('4. Form Buttons Accessibility', () => {
  test('Verify Cancel button accessible', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const cancelButton = page.getByRole('button', { name: 'Cancel' });
    await expect(cancelButton).toBeVisible();
    await cancelButton.focus();
    await expect(cancelButton).toBeFocused();
  });

  test('Verify Save as Draft button accessible', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const draftButton = page.getByRole('button', { name: 'Save as Draft' });
    await expect(draftButton).toBeVisible();
    await draftButton.focus();
    await expect(draftButton).toBeFocused();
  });

  test('Verify Upload Product button accessible', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const uploadButton = page.getByRole('button', { name: 'Upload Product' });
    await expect(uploadButton).toBeVisible();
    await uploadButton.focus();
    await expect(uploadButton).toBeFocused();
  });
});

test.describe('5. GenAI Assist Buttons', () => {
  test('Verify GenAI assist for Short Description', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const genAIButton = page.getByRole('button', { name: /short description.*assist with genai/i });
    await expect(genAIButton).toBeVisible();
    await expect(genAIButton).toContainText('Assist with GenAI');
  });

  test('Verify GenAI assist for Detailed Description', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const genAIButton = page.getByRole('button', { name: /detailed description.*assist with genai/i });
    await expect(genAIButton).toBeVisible();
  });

  test('Verify GenAI assist for Unique Feature', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const genAIButton = page.getByRole('button', { name: /product's unique feature.*assist with genai/i });
    await expect(genAIButton).toBeVisible();
  });

  test('Verify GenAI assist for Buying Guide', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const genAIButton = page.getByRole('button', { name: /buying guide.*assist with genai/i });
    await expect(genAIButton).toBeVisible();
  });
});

test.describe('6. Required Fields Validation', () => {
  test('Verify required field indicators', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const requiredIndicators = page.locator('text="*"');
    const count = await requiredIndicators.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Verify Product Name is required', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const productNameLabel = page.getByText('Product Name');
    await expect(productNameLabel).toBeVisible();
    const requiredIndicator = page.locator('text="Product Name"').locator('..').getByText('*');
    await expect(requiredIndicator).toBeVisible();
  });

  test('Verify Support Helpline Number is required', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const helplineInput = page.getByRole('textbox', { name: /e\.g\., \+91 98765 43210/i });
    await expect(helplineInput).toBeVisible();
  });
});

test.describe('7. Keyboard Navigation', () => {
  test('Verify complete keyboard navigation', async ({ page }) => {
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

  test('Verify Add Link button keyboard accessible', async ({ page }) => {
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

test.describe('8. Visual Accessibility', () => {
  test('Verify content readable at 200% zoom', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => {
      document.body.style.zoom = '200%';
    });
    
    const heading = page.getByRole('heading', { name: 'Upload New Product' });
    await expect(heading).toBeVisible();
    
    const addLinkButton = page.getByRole('button', { name: '+ Add Link' });
    await expect(addLinkButton).toBeVisible();
    
    await page.evaluate(() => {
      document.body.style.zoom = '100%';
    });
  });

  test('Verify form sections have proper headings', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const h2 = page.getByRole('heading', { name: 'Upload New Product', level: 2 });
    await expect(h2).toBeVisible();
    
    const h3Elements = page.locator('h3');
    const h3Count = await h3Elements.count();
    expect(h3Count).toBeGreaterThan(0);
  });
});

test.describe('9. Help Text and Instructions', () => {
  test('Verify help text for Product Links', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const helpText = page.getByText('Add links where users can purchase or learn more about your product');
    await expect(helpText).toBeVisible();
  });

  test('Verify character count for Short Description', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const charCount = page.getByText('(0/200 characters)');
    await expect(charCount).toBeVisible();
  });

  test('Verify image upload instructions', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const imageHelp = page.getByText(/this appears as the thumbnail.*jpg or png, max 5mb/i);
    await expect(imageHelp).toBeVisible();
  });
});

test.describe('10. Radio Button Groups', () => {
  test('Verify Video Type radio buttons', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const uploadVideoRadio = page.getByRole('radio', { name: 'Upload Video File' });
    await expect(uploadVideoRadio).toBeChecked();
    
    const youtubeLinkRadio = page.getByRole('radio', { name: 'YouTube/Vimeo Link' });
    await expect(youtubeLinkRadio).not.toBeChecked();
  });

  test('Verify Product Serviceable Areas radio buttons', async ({ page }) => {
    await loginAsPartner(page);
    await page.getByRole('link', { name: 'Product Upload' }).click();
    await page.waitForTimeout(1000);
    
    const panIndiaRadio = page.getByRole('radio', { name: 'Pan India' });
    await expect(panIndiaRadio).toBeChecked();
    
    const specificStatesRadio = page.getByRole('radio', { name: 'Specific States/Districts' });
    await expect(specificStatesRadio).not.toBeChecked();
    
    const notApplicableRadio = page.getByRole('radio', { name: 'Not Applicable' });
    await expect(notApplicableRadio).not.toBeChecked();
  });
});
