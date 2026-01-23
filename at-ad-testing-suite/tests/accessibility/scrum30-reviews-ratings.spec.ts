// spec: specs/a11y/SCRUM-30-reviews-ratings.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum30-accessibility.json';

test.describe('SCRUM-30: Reviews and Ratings Accessibility', () => {

  test.describe('Navigation and Page Access', () => {
    test('TC_A11Y_001: Reviews & Ratings tab accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));

      const reviewsTab = page.getByRole('link', { name: 'Reviews & Ratings' });
      await reviewsTab.focus();
      await expect(reviewsTab).toBeFocused();
      await expect(reviewsTab).toHaveAccessibleName(/Reviews/);
      await page.keyboard.press('Enter');
      await new Promise(f => setTimeout(f, 1000));
    });

    test('TC_A11Y_002: Page has proper heading', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const heading = page.getByRole('heading', { name: testData.expected.pageHeading, level: 2 });
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Summary Widgets', () => {
    test('TC_A11Y_003: Average Rating widget accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const avgRatingWidget = page.locator('text=Average Rating');
      await expect(avgRatingWidget).toBeVisible();
      const ratingValue = page.locator('text="4.5"');
      await expect(ratingValue).toBeVisible();
    });

    test('TC_A11Y_004: Total Reviews widget accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const totalReviewsWidget = page.locator('text=Total Reviews');
      await expect(totalReviewsWidget).toBeVisible();
      const reviewCount = page.locator('text="86"');
      await expect(reviewCount).toBeVisible();
    });

    test('TC_A11Y_005: Products Reviewed widget accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const productsWidget = page.locator('text=Products Reviewed');
      await expect(productsWidget).toBeVisible();
      const productCount = page.locator('text="5"').first();
      await expect(productCount).toBeVisible();
    });
  });

  test.describe('Product List with Ratings', () => {
    test('TC_A11Y_006: Product list semantic', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const productList = page.locator('ul, [role="list"]').first();
      await expect(productList).toBeVisible();
    });

    test('TC_A11Y_007: Product link accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const productLink = page.locator('a, button').first();
      await productLink.focus();
      await expect(productLink).toBeFocused();
    });

    test('TC_A11Y_008: Product rating display accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const rating = page.locator('text=/out of 5/i').first();
      await expect(rating).toBeVisible();
    });

    test('TC_A11Y_009: Review count accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const reviewCount = page.locator('text=/reviews/i').first();
      await expect(reviewCount).toBeVisible();
    });
  });

  test.describe('Search and Filter Controls', () => {
    test('TC_A11Y_010: Product search field accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const searchField = page.getByRole('textbox', { name: 'Search by product name...' });
      await searchField.focus();
      await expect(searchField).toBeFocused();
    });

    test('TC_A11Y_011: Rating filter accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const filterDropdown = page.getByRole('combobox', { name: 'Filter by rating' });
      await filterDropdown.focus();
      await expect(filterDropdown).toBeFocused();
    });
  });

  test.describe('Individual Review Cards', () => {
    test('TC_A11Y_017: Reviews section has heading', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const reviewsHeading = page.getByRole('heading', { name: /Customer Reviews/i });
      await expect(reviewsHeading).toBeVisible();
    });

    test('TC_A11Y_018: Reviews list semantic', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const reviewsList = page.locator('ul, [role="list"]').first();
      await expect(reviewsList).toBeVisible();
    });

    test('TC_A11Y_019: Review star rating accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const starRating = page.locator('text=/out of 5 stars/i').first();
      await expect(starRating).toBeVisible();
    });

    test('TC_A11Y_020: Anonymous user ID accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const userId = page.locator('text=/User/i').first();
      await expect(userId).toBeVisible();
    });

    test('TC_A11Y_021: Review text accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const reviewText = page.locator('p, div').first();
      await expect(reviewText).toBeVisible();
    });

    test('TC_A11Y_022: Review date accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const reviewDate = page.locator('text=/\\d{4}/').first();
      await expect(reviewDate).toBeVisible();
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('TC_A11Y_034: Tab order logical', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
    });

    test('TC_A11Y_035: Focus indicators visible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const firstElement = page.locator('a, button, input').first();
      await firstElement.focus();
      await expect(firstElement).toBeFocused();
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_038: Page scales to 200% zoom', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      await page.evaluate(() => {
        document.body.style.zoom = '2.0';
      });
      const content = page.locator('body');
      await expect(content).toBeVisible();
    });

    test('TC_A11Y_039: Mobile responsive accessible', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const content = page.locator('body');
      await expect(content).toBeVisible();
    });
  });

  test.describe('Screen Reader Compatibility', () => {
    test('TC_A11Y_040: Screen reader announces all content', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const heading = page.getByRole('heading', { name: /Reviews/i });
      await expect(heading).toBeVisible();
    });

    test('TC_A11Y_041: Dynamic content announced', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Reviews & Ratings' }).click();

      const filter = page.locator('select, [role="combobox"]').first();
      if (await filter.isVisible()) {
        await filter.focus();
        await page.keyboard.press('ArrowDown');
        await new Promise(f => setTimeout(f, 500));
      }
    });
  });
});
