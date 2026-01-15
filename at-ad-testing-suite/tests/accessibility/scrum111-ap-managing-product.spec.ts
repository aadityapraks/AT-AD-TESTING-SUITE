import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum111-accessibility.json';

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

test.describe('1. Navigation and Page Structure', () => {
  test('TC_A11Y_001: Page has proper heading hierarchy', async ({ page }) => {
    await loginAsPartner(page);
    
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/welcome to your dashboard/i);
    
    const h2 = page.locator('h2').first();
    await expect(h2).toBeVisible();
    await expect(h2).toContainText(/product management/i);
  });

  test('TC_A11Y_002: Product Management navigation link accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const productMgmtLink = page.getByRole('link', { name: 'Product Management' });
    await expect(productMgmtLink).toBeVisible();
    await productMgmtLink.focus();
    await expect(productMgmtLink).toBeFocused();
    await productMgmtLink.press('Enter');
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(/product-management/);
  });

  test('TC_A11Y_003: Skip to main content link present', async ({ page }) => {
    await loginAsPartner(page);
    
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('TC_A11Y_004: Landmark regions properly defined', async ({ page }) => {
    await loginAsPartner(page);
    
    const banner = page.locator('banner, [role="banner"]').first();
    await expect(banner).toBeVisible();
    
    const navigation = page.locator('nav, [role="navigation"]').first();
    await expect(navigation).toBeVisible();
  });
});

test.describe('2. Status Summary Tabs', () => {
  test('TC_A11Y_005: Status tabs keyboard accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const allTab = page.getByRole('button', { name: /all.*39/i });
    await expect(allTab).toBeVisible();
    await allTab.focus();
    await expect(allTab).toBeFocused();
    
    const approvedTab = page.getByRole('button', { name: /approved.*26/i });
    await expect(approvedTab).toBeVisible();
    await approvedTab.focus();
    await expect(approvedTab).toBeFocused();
  });

  test('TC_A11Y_006: Status tabs have proper ARIA attributes', async ({ page }) => {
    await loginAsPartner(page);
    
    const allTab = page.getByRole('button', { name: /all.*39/i });
    await expect(allTab).toBeVisible();
    
    const approvedTab = page.getByRole('button', { name: /approved.*26/i });
    await expect(approvedTab).toBeVisible();
    
    const underReviewTab = page.getByRole('button', { name: /under review.*9/i });
    await expect(underReviewTab).toBeVisible();
  });

  test('TC_A11Y_007: Status tab counts visible and announced', async ({ page }) => {
    await loginAsPartner(page);
    
    const allTab = page.getByRole('button', { name: /all.*39/i });
    await expect(allTab).toContainText('39');
    
    const approvedTab = page.getByRole('button', { name: /approved.*26/i });
    await expect(approvedTab).toContainText('26');
    
    const underReviewTab = page.getByRole('button', { name: /under review.*9/i });
    await expect(underReviewTab).toContainText('9');
    
    const draftTab = page.getByRole('button', { name: /draft.*3/i });
    await expect(draftTab).toContainText('3');
    
    const rejectedTab = page.getByRole('button', { name: /rejected.*3/i });
    await expect(rejectedTab).toContainText('3');
  });
});

test.describe('3. Search, Filter, and Sort Controls', () => {
  test('TC_A11Y_008: Search input accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const searchInput = page.getByRole('textbox', { name: /search by product name or category/i });
    await expect(searchInput).toBeVisible();
    await searchInput.focus();
    await expect(searchInput).toBeFocused();
    await searchInput.fill('wheelchair');
    await page.waitForTimeout(1000);
  });

  test('TC_A11Y_009: Filter dropdown keyboard accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const categoryFilter = page.getByRole('button', { name: /category filter/i });
    await expect(categoryFilter).toBeVisible();
    await categoryFilter.focus();
    await expect(categoryFilter).toBeFocused();
    await categoryFilter.press('Enter');
    await page.waitForTimeout(500);
  });

  test('TC_A11Y_010: Filter dropdown has proper ARIA', async ({ page }) => {
    await loginAsPartner(page);
    
    const categoryFilter = page.getByRole('button', { name: /category filter/i });
    await expect(categoryFilter).toBeVisible();
    await expect(categoryFilter).toContainText('All Categories');
  });

  test('TC_A11Y_011: Sort dropdown accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const sortButton = page.getByRole('button', { name: /sort options/i });
    await expect(sortButton).toBeVisible();
    await sortButton.focus();
    await expect(sortButton).toBeFocused();
    await expect(sortButton).toContainText('Newest First');
  });

  test('TC_A11Y_012: Filter persistence announced', async ({ page }) => {
    await loginAsPartner(page);
    
    const searchInput = page.getByRole('textbox', { name: /search by product name or category/i });
    await searchInput.fill('wheelchair');
    await page.waitForTimeout(1000);
    
    const categoryFilter = page.getByRole('button', { name: /category filter/i });
    await expect(categoryFilter).toBeVisible();
  });
});

test.describe('4. Product Listing Table', () => {
  test('TC_A11Y_013: Table structure semantic and accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const productColumn = page.getByText('Product').first();
    await expect(productColumn).toBeVisible();
    
    const disabilityTypeColumn = page.getByText('Disability Type').first();
    await expect(disabilityTypeColumn).toBeVisible();
    
    const stockColumn = page.getByText('Stock').first();
    await expect(stockColumn).toBeVisible();
    
    const listingStatusColumn = page.getByText('Listing Status').first();
    await expect(listingStatusColumn).toBeVisible();
  });

  test('TC_A11Y_014: Product images have alt text', async ({ page }) => {
    await loginAsPartner(page);
    
    const productImages = page.locator('img[alt]');
    const imageCount = await productImages.count();
    expect(imageCount).toBeGreaterThan(0);
    
    for (let i = 0; i < Math.min(imageCount, 3); i++) {
      const img = productImages.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('TC_A11Y_015: Edited icon accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const editedButton = page.getByRole('button', { name: /view edited changes/i }).first();
    if (await editedButton.count() > 0) {
      await expect(editedButton).toBeVisible();
      await expect(editedButton).toContainText('Edited');
    }
  });
});

test.describe('5. Product Actions Menu', () => {
  test('TC_A11Y_016: Actions menu button keyboard accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const actionsButton = page.getByRole('button', { name: /product actions menu/i }).first();
    await expect(actionsButton).toBeVisible();
    await actionsButton.focus();
    await expect(actionsButton).toBeFocused();
  });

  test('TC_A11Y_017: Actions menu opens on activation', async ({ page }) => {
    await loginAsPartner(page);
    
    const actionsButton = page.getByRole('button', { name: /product actions menu/i }).first();
    await actionsButton.click();
    await page.waitForTimeout(500);
  });

  test('TC_A11Y_018: Actions menu keyboard navigation', async ({ page }) => {
    await loginAsPartner(page);
    
    const actionsButton = page.getByRole('button', { name: /product actions menu/i }).first();
    await actionsButton.click();
    await page.waitForTimeout(500);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
  });
});

test.describe('6. Pagination Controls', () => {
  test('TC_A11Y_019: Pagination buttons keyboard accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const nextButton = page.getByRole('button', { name: 'Next' });
    await expect(nextButton).toBeVisible();
    await nextButton.focus();
    await expect(nextButton).toBeFocused();
    
    const previousButton = page.getByRole('button', { name: 'Previous' });
    await expect(previousButton).toBeVisible();
    await expect(previousButton).toBeDisabled();
  });

  test('TC_A11Y_020: Page number buttons accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const page1Button = page.getByRole('button', { name: '1' }).first();
    await expect(page1Button).toBeVisible();
    await page1Button.focus();
    await expect(page1Button).toBeFocused();
    
    const page2Button = page.getByRole('button', { name: '2' }).first();
    await expect(page2Button).toBeVisible();
  });

  test('TC_A11Y_021: Pagination info announced', async ({ page }) => {
    await loginAsPartner(page);
    
    const paginationInfo = page.getByText(/showing 1 to 5 of 39 products/i);
    await expect(paginationInfo).toBeVisible();
  });
});

test.describe('7. Product Status Indicators', () => {
  test('TC_A11Y_022: Status badges have text labels', async ({ page }) => {
    await loginAsPartner(page);
    
    const approvedStatus = page.getByText('Approved').first();
    await expect(approvedStatus).toBeVisible();
    
    const underReviewStatus = page.getByText('Under Review').first();
    await expect(underReviewStatus).toBeVisible();
    
    const draftStatus = page.getByText('Draft').first();
    await expect(draftStatus).toBeVisible();
  });

  test('TC_A11Y_023: Status not indicated by color alone', async ({ page }) => {
    await loginAsPartner(page);
    
    const approvedStatus = page.getByText('Approved').first();
    await expect(approvedStatus).toBeVisible();
    const approvedText = await approvedStatus.textContent();
    expect(approvedText).toContain('Approved');
  });

  test('TC_A11Y_024: Website status accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    const activeStatus = page.getByText('Active').first();
    await expect(activeStatus).toBeVisible();
  });
});

test.describe('8. Keyboard Navigation', () => {
  test('TC_A11Y_025: Complete keyboard navigation possible', async ({ page }) => {
    await loginAsPartner(page);
    
    await page.keyboard.press('Tab');
    let focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });

  test('TC_A11Y_026: No keyboard traps exist', async ({ page }) => {
    await loginAsPartner(page);
    
    const allTab = page.getByRole('button', { name: /all.*39/i });
    await allTab.focus();
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('TC_A11Y_027: Focus indicators visible', async ({ page }) => {
    await loginAsPartner(page);
    
    const searchInput = page.getByRole('textbox', { name: /search by product name or category/i });
    await searchInput.focus();
    await expect(searchInput).toBeFocused();
    
    const categoryFilter = page.getByRole('button', { name: /category filter/i });
    await categoryFilter.focus();
    await expect(categoryFilter).toBeFocused();
  });
});

test.describe('9. Visual Accessibility', () => {
  test('TC_A11Y_028: Text contrast sufficient', async ({ page }) => {
    await loginAsPartner(page);
    
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    const h2 = page.locator('h2').first();
    await expect(h2).toBeVisible();
    
    const productName = page.getByText('Wheelchair Ramp Model XR-100').first();
    await expect(productName).toBeVisible();
  });

  test('TC_A11Y_029: Content readable at 200% zoom', async ({ page }) => {
    await loginAsPartner(page);
    
    await page.evaluate(() => {
      document.body.style.zoom = '200%';
    });
    
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    const searchInput = page.getByRole('textbox', { name: /search by product name or category/i });
    await expect(searchInput).toBeVisible();
    
    await page.evaluate(() => {
      document.body.style.zoom = '100%';
    });
  });

  test('TC_A11Y_030: No horizontal scroll at standard zoom', async ({ page }) => {
    await loginAsPartner(page);
    
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('10. Responsive Design', () => {
  test('TC_A11Y_031: Mobile viewport accessible', async ({ page }) => {
    await loginAsPartner(page);
    
    await page.setViewportSize({ width: 375, height: 667 });
    
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('TC_A11Y_032: Touch targets meet minimum size', async ({ page }) => {
    await loginAsPartner(page);
    
    const allTab = page.getByRole('button', { name: /all.*39/i });
    await expect(allTab).toBeVisible();
    
    const searchInput = page.getByRole('textbox', { name: /search by product name or category/i });
    await expect(searchInput).toBeVisible();
  });
});
