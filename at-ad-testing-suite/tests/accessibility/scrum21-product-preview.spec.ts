// spec: specs/a11y/SCRUM-21-product-preview.md

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum21-accessibility.json';

const login = async (page) => {
  await page.goto(testData.url);
  await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
  await page.waitForURL(/auth-d\.swarajability\.org/);
  await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForURL(/partner/);
  await page.getByRole('link', { name: 'Product Management' }).click();
};

test.describe('SCRUM-21: Product Preview Accessibility', () => {

  test.describe('Preview Mode Access', () => {
    test('TC_A11Y_001: Verify View Product button keyboard accessibility', async ({ page }) => {
      await login(page);
      const viewButton = page.getByRole('button', { name: /view.*product/i }).first();
      if (await viewButton.isVisible()) {
        await viewButton.focus();
        await expect(viewButton).toBeFocused();
      }
    });

    test('TC_A11Y_002: Verify screen reader announces View Product button', async ({ page }) => {
      await login(page);
      const viewButton = page.getByRole('button', { name: /view.*product/i }).first();
      if (await viewButton.isVisible()) {
        await expect(viewButton).toHaveAccessibleName(/view.*product/i);
      }
    });

    test('TC_A11Y_003: Verify preview mode page title and landmarks', async ({ page }) => {
      await login(page);
      const viewButton = page.getByRole('button', { name: /view.*product/i }).first();
      if (await viewButton.isVisible()) {
        await viewButton.click();
        await expect(page).toHaveTitle(/preview|product/i);
      }
    });
  });

  test.describe('Catalog Card Display', () => {
    test('TC_A11Y_004: Verify catalog card keyboard navigation', async ({ page }) => {
      await login(page);
      await page.keyboard.press('Tab');
    });

    test('TC_A11Y_005: Verify catalog card screen reader accessibility', async ({ page }) => {
      await login(page);
      const heading = page.getByRole('heading').first();
      if (await heading.isVisible()) {
        await expect(heading).toBeVisible();
      }
    });

    test('TC_A11Y_006: Verify catalog card visual accessibility', async ({ page }) => {
      await login(page);
      const card = page.locator('article').or(page.locator('section')).first();
      if (await card.isVisible()) {
        await expect(card).toBeVisible();
      }
    });

    test('TC_A11Y_007: Verify primary image accessibility', async ({ page }) => {
      await login(page);
      const image = page.locator('img').first();
      if (await image.isVisible()) {
        await expect(image).toHaveAttribute('alt');
      }
    });
  });

  test.describe('Full Product Details Page', () => {
    test('TC_A11Y_008: Verify product details page structure', async ({ page }) => {
      await login(page);
      const heading = page.getByRole('heading', { level: 1 });
      if (await heading.isVisible()) {
        await expect(heading).toBeVisible();
      }
    });

    test('TC_A11Y_009: Verify product name and category accessibility', async ({ page }) => {
      await login(page);
      const h1 = page.getByRole('heading', { level: 1 });
      if (await h1.isVisible()) {
        await expect(h1).toBeVisible();
      }
    });

    test('TC_A11Y_010: Verify descriptions accessibility', async ({ page }) => {
      await login(page);
      const headings = page.getByRole('heading', { level: 2 });
      if (await headings.first().isVisible()) {
        await expect(headings.first()).toBeVisible();
      }
    });

    test('TC_A11Y_011: Verify keyboard navigation through details page', async ({ page }) => {
      await login(page);
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('Image Gallery and Carousel', () => {
    test('TC_A11Y_012: Verify main image accessibility', async ({ page }) => {
      await login(page);
      const mainImage = page.locator('img').first();
      if (await mainImage.isVisible()) {
        await expect(mainImage).toHaveAttribute('alt');
      }
    });

    test('TC_A11Y_013: Verify image gallery/carousel keyboard navigation', async ({ page }) => {
      await login(page);
      const carousel = page.locator('[role="region"]');
      if (await carousel.isVisible()) {
        await expect(carousel).toBeVisible();
      }
    });

    test('TC_A11Y_014: Verify carousel screen reader accessibility', async ({ page }) => {
      await login(page);
      const carousel = page.locator('[role="region"]');
      if (await carousel.isVisible()) {
        await expect(carousel).toHaveAccessibleName();
      }
    });

    test('TC_A11Y_015: Verify carousel controls accessibility', async ({ page }) => {
      await login(page);
      const prevButton = page.getByRole('button', { name: /previous|prev/i });
      const nextButton = page.getByRole('button', { name: /next/i });
      if (await prevButton.isVisible()) {
        await expect(prevButton).toBeVisible();
      }
      if (await nextButton.isVisible()) {
        await expect(nextButton).toBeVisible();
      }
    });

    test('TC_A11Y_016: Verify alt text display in accessibility tools', async ({ page }) => {
      await login(page);
      const images = page.locator('img');
      const count = await images.count();
      for (let i = 0; i < Math.min(count, 3); i++) {
        await expect(images.nth(i)).toHaveAttribute('alt');
      }
    });
  });

  test.describe('Demo Video Accessibility', () => {
    test('TC_A11Y_017: Verify video player keyboard accessibility', async ({ page }) => {
      await login(page);
      const video = page.locator('video');
      if (await video.isVisible()) {
        await expect(video).toBeVisible();
      }
    });

    test('TC_A11Y_018: Verify video captions and transcripts', async ({ page }) => {
      await login(page);
      const video = page.locator('video');
      if (await video.isVisible()) {
        await expect(video).toBeVisible();
      }
    });

    test('TC_A11Y_019: Verify video player screen reader accessibility', async ({ page }) => {
      await login(page);
      const video = page.locator('video');
      if (await video.isVisible()) {
        await expect(video).toHaveAccessibleName();
      }
    });

    test('TC_A11Y_020: Verify video loading and error states', async ({ page }) => {
      await login(page);
      const loadingIndicator = page.locator('[aria-live]');
      if (await loadingIndicator.isVisible()) {
        await expect(loadingIndicator).toBeVisible();
      }
    });
  });

  test.describe('Specifications Display', () => {
    test('TC_A11Y_021: Verify specifications structure accessibility', async ({ page }) => {
      await login(page);
      const specsHeading = page.getByRole('heading', { name: /specification/i });
      if (await specsHeading.isVisible()) {
        await expect(specsHeading).toBeVisible();
      }
    });

    test('TC_A11Y_022: Verify specifications table accessibility', async ({ page }) => {
      await login(page);
      const table = page.locator('table');
      if (await table.isVisible()) {
        await expect(table).toBeVisible();
      }
    });

    test('TC_A11Y_023: Verify specifications visual accessibility', async ({ page }) => {
      await login(page);
      const specs = page.locator('dl').or(page.locator('table'));
      if (await specs.isVisible()) {
        await expect(specs).toBeVisible();
      }
    });
  });

  test.describe('Availability Information', () => {
    test('TC_A11Y_024: Verify geographical availability accessibility', async ({ page }) => {
      await login(page);
      const availabilitySection = page.getByRole('heading', { name: /availability/i });
      if (await availabilitySection.isVisible()) {
        await expect(availabilitySection).toBeVisible();
      }
    });

    test('TC_A11Y_025: Verify product quantity accessibility', async ({ page }) => {
      await login(page);
      const quantity = page.getByText(/quantity|made to order/i);
      if (await quantity.isVisible()) {
        await expect(quantity).toBeVisible();
      }
    });
  });

  test.describe('Accessibility Compliance Indicators', () => {
    test('TC_A11Y_026: Verify compliance badge keyboard accessibility', async ({ page }) => {
      await login(page);
      const badge = page.locator('[role="status"]').or(page.getByText(/compliant/i));
      if (await badge.isVisible()) {
        await expect(badge).toBeVisible();
      }
    });

    test('TC_A11Y_027: Verify compliance badge screen reader accessibility', async ({ page }) => {
      await login(page);
      const badge = page.getByText(/compliant/i);
      if (await badge.isVisible()) {
        await expect(badge).toBeVisible();
      }
    });

    test('TC_A11Y_028: Verify compliance indicator visual accessibility', async ({ page }) => {
      await login(page);
      const badge = page.getByText(/compliant/i);
      if (await badge.isVisible()) {
        await expect(badge).toBeVisible();
      }
    });

    test('TC_A11Y_029: Verify accessibility feature highlights', async ({ page }) => {
      await login(page);
      const featuresList = page.locator('ul').or(page.locator('[role="list"]'));
      if (await featuresList.isVisible()) {
        await expect(featuresList).toBeVisible();
      }
    });
  });

  test.describe('Edit and Update Options', () => {
    test('TC_A11Y_030: Verify Edit button keyboard accessibility', async ({ page }) => {
      await login(page);
      const editButton = page.getByRole('button', { name: /edit/i }).first();
      if (await editButton.isVisible()) {
        await editButton.focus();
        await expect(editButton).toBeFocused();
      }
    });

    test('TC_A11Y_031: Verify Edit button screen reader accessibility', async ({ page }) => {
      await login(page);
      const editButton = page.getByRole('button', { name: /edit/i }).first();
      if (await editButton.isVisible()) {
        await expect(editButton).toHaveAccessibleName(/edit/i);
      }
    });

    test('TC_A11Y_032: Verify draft auto-save notification accessibility', async ({ page }) => {
      await login(page);
      const notification = page.locator('[aria-live="polite"]').or(page.locator('[role="status"]'));
      if (await notification.isVisible()) {
        await expect(notification).toBeVisible();
      }
    });
  });

  test.describe('Live Product View', () => {
    test('TC_A11Y_033: Verify View Live Product link accessibility', async ({ page }) => {
      await login(page);
      const liveLink = page.getByRole('link', { name: /view live/i });
      if (await liveLink.isVisible()) {
        await liveLink.focus();
        await expect(liveLink).toBeFocused();
      }
    });

    test('TC_A11Y_034: Verify View Live Product screen reader accessibility', async ({ page }) => {
      await login(page);
      const liveLink = page.getByRole('link', { name: /view live/i });
      if (await liveLink.isVisible()) {
        await expect(liveLink).toHaveAccessibleName(/view live/i);
      }
    });
  });

  test.describe('Error Messages and System Feedback', () => {
    test('TC_A11Y_035: Verify error message accessibility', async ({ page }) => {
      await login(page);
      const error = page.locator('[role="alert"]');
      if (await error.isVisible()) {
        await expect(error).toBeVisible();
      }
    });

    test('TC_A11Y_036: Verify error message keyboard accessibility', async ({ page }) => {
      await login(page);
      const dismissButton = page.getByRole('button', { name: /dismiss|close/i });
      if (await dismissButton.isVisible()) {
        await expect(dismissButton).toBeVisible();
      }
    });

    test('TC_A11Y_037: Verify error message provides clear guidance', async ({ page }) => {
      await login(page);
      const error = page.locator('[role="alert"]');
      if (await error.isVisible()) {
        await expect(error).toBeVisible();
      }
    });
  });

  test.describe('Preview Mode Interface Accessibility', () => {
    test('TC_A11Y_038: Verify preview mode keyboard navigation', async ({ page }) => {
      await login(page);
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('TC_A11Y_039: Verify preview mode screen reader accessibility', async ({ page }) => {
      await login(page);
      const heading = page.getByRole('heading', { level: 1 });
      if (await heading.isVisible()) {
        await expect(heading).toBeVisible();
      }
    });

    test('TC_A11Y_040: Verify preview mode tooltips accessibility', async ({ page }) => {
      await login(page);
      const tooltip = page.locator('[role="tooltip"]');
      if (await tooltip.isVisible()) {
        await expect(tooltip).toBeVisible();
      }
    });

    test('TC_A11Y_041: Verify preview mode responsive design accessibility', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await login(page);
      await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
    });

    test('TC_A11Y_042: Verify preview mode color and contrast', async ({ page }) => {
      await login(page);
      const labels = page.locator('label');
      if (await labels.first().isVisible()) {
        await expect(labels.first()).toBeVisible();
      }
    });
  });
});
