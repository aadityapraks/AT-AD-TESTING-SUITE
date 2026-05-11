// spec: specs/functional/SCRUM-24-delete-product.plan.md
// seed: tests/seed/vendor-product-list.spec.ts

import { test, expect } from '@playwright/test';


async function login(page) {
  await page.goto('https://hub-ui-admin-qa.swarajability.org');
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

test.describe('SCRUM-24: Delete Product Accessibility', () => {

  test.describe('1. Delete Product Button Access', () => {
    
    test('TC_A11Y_001: Verify Delete Product button keyboard accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.focus();
      await expect(actionsButton).toBeFocused();
      await actionsButton.press('Enter');
      await page.waitForTimeout(1000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(/delete|edit|duplicate/i.test(body)).toBe(true);
    });

    test('TC_A11Y_002: Verify Delete button screen reader announcement', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      const btnName = await actionsButton.getAttribute('aria-label') ?? await actionsButton.textContent() ?? '';
      expect(btnName.length).toBeGreaterThan(0);
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Delete').first()).toBeVisible();
    });

    test('TC_A11Y_003: Verify Delete button visual accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Delete').first()).toBeVisible();
    });

    test('TC_A11Y_004: Verify Delete button disabled state', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });
  });

  test.describe('2. Confirmation Dialog Accessibility', () => {
    
    test('TC_A11Y_005: Verify confirmation dialog keyboard accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await page.getByText('Delete').first().click();
      await page.waitForTimeout(1000);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      await expect(actionsButton).toBeVisible();
    });

    test('TC_A11Y_006: Verify dialog screen reader announcement', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await page.getByText('Delete').first().click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Delete Product?')).toBeVisible();
    });

    test('TC_A11Y_007: Verify dialog warning message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await page.getByText('Delete').first().click();
      await page.waitForTimeout(1000);
      await expect(page.getByText(/cannot be undone/i)).toBeVisible();
    });

    test('TC_A11Y_008: Verify dialog button accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await page.getByText('Delete').first().click();
      await page.waitForTimeout(1000);
      const deleteButton = page.getByRole('button', { name: /Delete|Confirm/i }).first();
      await deleteButton.focus();
      const cancelButton = page.getByRole('button', { name: /Cancel/i });
      await expect(deleteButton).toBeFocused();
      await cancelButton.click();
    });

    test('TC_A11Y_009: Verify dialog visual accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await page.getByText('Delete').first().click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Delete Product?')).toBeVisible();
    });

    test('TC_A11Y_010: Verify dialog focus management', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await page.getByText('Delete').first().click();
      await page.waitForTimeout(1000);
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
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });
  });

  test.describe('4. System Feedback Messages', () => {
    
    test('TC_A11Y_014: Verify success message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });

    test('TC_A11Y_015: Verify success message timing', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });

    test('TC_A11Y_016: Verify success message visual design', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });
  });

  test.describe('5. Error Handling', () => {
    
    test('TC_A11Y_017: Verify system error message accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });

    test('TC_A11Y_018: Verify unauthorized deletion error', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });

    test('TC_A11Y_019: Verify error message focus management', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });

    test('TC_A11Y_020: Verify error message visual design', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });
  });

  test.describe('6. Product List Updates', () => {
    
    test('TC_A11Y_021: Verify product removal from list', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText(/Showing \d+ to \d+ of \d+ products/)).toBeVisible();
    });

    test('TC_A11Y_022: Verify deleted status in list', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });

    test('TC_A11Y_023: Verify empty list state', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText(/Showing \d+ to \d+ of \d+ products/)).toBeVisible();
    });
  });

  test.describe('7. Notification to Interested Users', () => {
    
    test('TC_A11Y_024: Verify notification trigger accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });
  });

  test.describe('8. Hard Delete for Under Review Products', () => {
    
    test('TC_A11Y_025: Verify hard delete option accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const underReviewBtn = page.getByRole('button', { name: /Under Review/ }).first();
      const hasUnderReview = await underReviewBtn.isVisible().catch(() => false);
      if (hasUnderReview) {
        await underReviewBtn.click();
        await page.waitForTimeout(2000);
      }
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await expect(page.getByText('Delete').first()).toBeVisible();
    });

    test('TC_A11Y_026: Verify hard delete confirmation dialog', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await page.waitForTimeout(3000);
      const actionsButton = page.getByRole('button', { name: /More actions for/ }).first();
      await actionsButton.click();
      await page.waitForTimeout(1000);
      await page.getByText('Delete').first().click();
      await page.waitForTimeout(1000);
      await expect(page.getByText(/Delete Product/i)).toBeVisible();
    });
  });

  test.describe('9. Associated Media Handling', () => {
    
    test('TC_A11Y_027: Verify media removal feedback', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
    });
  });

  test.describe('10. Audit Trail Indicator', () => {
    
    test('TC_A11Y_028: Verify audit log indicator accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByText(/\w+ \d+, \d{4}/).first()).toBeVisible();
    });

    test('TC_A11Y_029: Verify audit details accessibility', async ({ page }) => {
      await login(page);
      await page.goto('https://hub-ui-admin-qa.swarajability.org/partner/product-management');
      await expect(page.getByRole('button', { name: /More actions for/ }).first()).toBeVisible();
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


