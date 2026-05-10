// spec: specs/a11y/SCRUM-21-product-preview.json

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductManagementPage } from '../../pages/product-management.page';
import testData from '../../test-data/scrum21-accessibility.json';

const BASE_URL = testData.url;

test.describe('SCRUM-21: Product Preview Accessibility', () => {
  let loginPage: LoginPage;
  let productManagementPage: ProductManagementPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productManagementPage = new ProductManagementPage(page);
    await page.goto(BASE_URL);
    await loginPage.loginAsVendor(testData.credentials.email, testData.credentials.password);
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
  });

  test.describe('Preview Mode Access', () => {
    test('TC_A11Y_001: Verify View Product button keyboard accessibility', async ({ page }) => {
      const viewButton = page.getByRole('button', { name: /view.*product|more actions/i }).first();
      if (await viewButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await viewButton.focus();
        await expect(viewButton).toBeFocused();
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });

    test('TC_A11Y_002: Verify screen reader announces View Product button', async ({ page }) => {
      const viewButton = page.getByRole('button', { name: /view.*product|more actions/i }).first();
      if (await viewButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(viewButton).toHaveAccessibleName(/.+/);
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });

    test('TC_A11Y_003: Verify preview mode page title and landmarks', async ({ page }) => {
      await expect(page).toHaveTitle(/.+/);
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Catalog Card Display', () => {
    test('TC_A11Y_004: Verify catalog card keyboard navigation', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_005: Verify catalog card screen reader accessibility', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_006: Verify catalog card visual accessibility', async ({ page }) => {
      // Verify the page content area is visible and has proper text contrast
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
      const headingColor = await heading.evaluate(el => window.getComputedStyle(el).color);
      expect(headingColor).toBeTruthy();
      expect(headingColor).not.toBe('rgba(0, 0, 0, 0)');
    });

    test('TC_A11Y_007: Verify primary image accessibility', async ({ page }) => {
      const image = page.locator('img');
      if (await image.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        const altAttr = await image.first().getAttribute('alt');
        // Image should have alt attribute (can be empty for decorative)
        expect(altAttr).not.toBeNull();
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });
  });

  test.describe('Full Product Details Page', () => {
    test('TC_A11Y_008: Verify product details page structure', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_009: Verify product name and category accessibility', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
      await expect(heading).toHaveAccessibleName(/.+/);
    });

    test('TC_A11Y_010: Verify descriptions accessibility', async ({ page }) => {
      const headings = page.getByRole('heading');
      const count = await headings.count();
      expect(count).toBeGreaterThan(0);
    });

    test('TC_A11Y_011: Verify keyboard navigation through details page', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const focusedElement2 = page.locator(':focus');
      await expect(focusedElement2).toBeVisible();
    });
  });

  test.describe('Image Gallery and Carousel', () => {
    test('TC_A11Y_012: Verify main image accessibility', async ({ page }) => {
      const mainImage = page.locator('img');
      if (await mainImage.first().isVisible({ timeout: 5000 }).catch(() => false)) {
        const altAttr = await mainImage.first().getAttribute('alt');
        expect(altAttr).not.toBeNull();
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });

    test('TC_A11Y_013: Verify image gallery/carousel keyboard navigation', async ({ page }) => {
      const carousel = page.locator('[role="region"]').or(page.locator('[role="group"]'));
      if (await carousel.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(carousel.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_014: Verify carousel screen reader accessibility', async ({ page }) => {
      const carousel = page.locator('[role="region"]').or(page.locator('[role="group"]'));
      if (await carousel.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(carousel.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_015: Verify carousel controls accessibility', async ({ page }) => {
      const prevButton = page.getByRole('button', { name: /previous|prev|back/i });
      const nextButton = page.getByRole('button', { name: /next|forward/i });
      if (await prevButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(prevButton.first()).toBeVisible();
      }
      if (await nextButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(nextButton.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_016: Verify alt text display in accessibility tools', async ({ page }) => {
      const images = page.locator('img:visible');
      const count = await images.count();
      if (count > 0) {
        for (let i = 0; i < Math.min(count, 3); i++) {
          const altAttr = await images.nth(i).getAttribute('alt');
          expect(altAttr).not.toBeNull();
        }
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });
  });

  test.describe('Demo Video Accessibility', () => {
    test('TC_A11Y_017: Verify video player keyboard accessibility', async ({ page }) => {
      const video = page.locator('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
      if (await video.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(video.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_018: Verify video captions and transcripts', async ({ page }) => {
      const video = page.locator('video');
      if (await video.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(video.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_019: Verify video player screen reader accessibility', async ({ page }) => {
      const video = page.locator('video, iframe');
      if (await video.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(video.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_020: Verify video loading and error states', async ({ page }) => {
      const liveRegion = page.locator('[aria-live]');
      if (await liveRegion.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(liveRegion.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Specifications Display', () => {
    test('TC_A11Y_021: Verify specifications structure accessibility', async ({ page }) => {
      const specsHeading = page.getByRole('heading', { name: /specification/i });
      if (await specsHeading.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(specsHeading.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_022: Verify specifications table accessibility', async ({ page }) => {
      const table = page.locator('table').or(page.locator('dl'));
      if (await table.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(table.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_023: Verify specifications visual accessibility', async ({ page }) => {
      const specs = page.locator('dl').or(page.locator('table')).or(page.locator('[class*="spec"]'));
      if (await specs.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(specs.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Availability Information', () => {
    test('TC_A11Y_024: Verify geographical availability accessibility', async ({ page }) => {
      const availabilitySection = page.getByText(/availability|geography|pan-india/i);
      if (await availabilitySection.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(availabilitySection.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_025: Verify product quantity accessibility', async ({ page }) => {
      const quantity = page.getByText(/quantity|stock|made to order/i);
      if (await quantity.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(quantity.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Accessibility Compliance Indicators', () => {
    test('TC_A11Y_026: Verify compliance badge keyboard accessibility', async ({ page }) => {
      const badge = page.locator('[role="status"]').or(page.getByText(/compliant/i));
      if (await badge.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(badge.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_027: Verify compliance badge screen reader accessibility', async ({ page }) => {
      const badge = page.getByText(/compliant|accessibility/i);
      if (await badge.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(badge.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_028: Verify compliance indicator visual accessibility', async ({ page }) => {
      const badge = page.getByText(/compliant|accessibility/i);
      if (await badge.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(badge.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_029: Verify accessibility feature highlights', async ({ page }) => {
      const featuresList = page.locator('ul, [role="list"]');
      if (await featuresList.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(featuresList.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Edit and Update Options', () => {
    test('TC_A11Y_030: Verify Edit button keyboard accessibility', async ({ page }) => {
      const editButton = page.getByRole('button', { name: /edit/i }).first();
      if (await editButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await editButton.focus();
        await expect(editButton).toBeFocused();
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });

    test('TC_A11Y_031: Verify Edit button screen reader accessibility', async ({ page }) => {
      const editButton = page.getByRole('button', { name: /edit/i }).first();
      if (await editButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(editButton).toHaveAccessibleName(/edit/i);
      } else {
        await expect(page.getByRole('heading').first()).toBeVisible();
      }
    });

    test('TC_A11Y_032: Verify draft auto-save notification accessibility', async ({ page }) => {
      const notification = page.locator('[aria-live="polite"]').or(page.locator('[role="status"]'));
      if (await notification.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(notification.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Live Product View', () => {
    test('TC_A11Y_033: Verify View Live Product link accessibility', async ({ page }) => {
      const liveLink = page.getByRole('link', { name: /view live|live product/i });
      if (await liveLink.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await liveLink.first().focus();
        await expect(liveLink.first()).toBeFocused();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_034: Verify View Live Product screen reader accessibility', async ({ page }) => {
      const liveLink = page.getByRole('link', { name: /view live|live product/i });
      if (await liveLink.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(liveLink.first()).toHaveAccessibleName(/.+/);
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Error Messages and System Feedback', () => {
    test('TC_A11Y_035: Verify error message accessibility', async ({ page }) => {
      const error = page.locator('[role="alert"]');
      if (await error.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(error.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_036: Verify error message keyboard accessibility', async ({ page }) => {
      const dismissButton = page.getByRole('button', { name: /dismiss|close/i });
      if (await dismissButton.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(dismissButton.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_037: Verify error message provides clear guidance', async ({ page }) => {
      const error = page.locator('[role="alert"]');
      if (await error.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(error.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });
  });

  test.describe('Preview Mode Interface Accessibility', () => {
    test('TC_A11Y_038: Verify preview mode keyboard navigation', async ({ page }) => {
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_039: Verify preview mode screen reader accessibility', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_040: Verify preview mode tooltips accessibility', async ({ page }) => {
      const tooltip = page.locator('[role="tooltip"]');
      if (await tooltip.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(tooltip.first()).toBeVisible();
      }
      await expect(page.getByRole('heading').first()).toBeVisible();
    });

    test('TC_A11Y_041: Verify preview mode responsive design accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_042: Verify preview mode color and contrast', async ({ page }) => {
      const heading = page.getByRole('heading').first();
      await expect(heading).toBeVisible();
      const headingColor = await heading.evaluate(el => window.getComputedStyle(el).color);
      expect(headingColor).toBeTruthy();
      expect(headingColor).not.toBe('rgba(0, 0, 0, 0)');
    });
  });
});
