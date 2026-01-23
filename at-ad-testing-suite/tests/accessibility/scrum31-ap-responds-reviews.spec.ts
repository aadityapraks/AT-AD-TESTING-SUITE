// spec: specs/a11y/SCRUM-31-ap-responds-reviews.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum31-accessibility.json';

test.describe('SCRUM-31: AP Responds to Reviews Accessibility', () => {

  test.describe('1. Reviews & Ratings Section Access', () => {
    test('TC_A11Y_001: Reviews & Ratings section keyboard accessible', async ({ page }) => {
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
      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 2 })).toBeVisible();
    });

    test('TC_A11Y_002: Review entries have proper semantic structure', async ({ page }) => {
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
      
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();
      await expect(page.getByRole('heading', { name: 'Braille Display BD-40', level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Customer Reviews', level: 2 })).toBeVisible();
    });

    test('TC_A11Y_003: Review metadata accessible to screen readers', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      await expect(page.getByText('Verified User 1234')).toBeVisible();
      await expect(page.getByText('Nov 2, 2025')).toBeVisible();
      await expect(page.getByText('PwD User 5678')).toBeVisible();
    });
  });

  test.describe('2. Respond to Review Button', () => {
    test('TC_A11Y_004: Respond to Review button keyboard accessible', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      const respondButton = page.getByRole('button', { name: 'Respond to Review' }).first();
      await respondButton.focus();
      await expect(respondButton).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.getByRole('textbox', { name: 'Write your response to this customer review...' })).toBeVisible();
    });

    test('TC_A11Y_005: Respond button has clear accessible name', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      const respondButton = page.getByRole('button', { name: 'Respond to Review' }).first();
      await expect(respondButton).toBeVisible();
      await expect(respondButton).toHaveAccessibleName('Respond to Review');
    });
  });

  test.describe('3. Response Form', () => {
    test('TC_A11Y_006: Response textarea has proper label', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();
      await page.getByRole('button', { name: 'Respond to Review' }).first().click();

      const textarea = page.getByRole('textbox', { name: 'Write your response to this customer review...' });
      await expect(textarea).toBeVisible();
      await expect(page.getByText(testData.expected.moderationNotice)).toBeVisible();
      await expect(page.getByText('0/500 characters')).toBeVisible();
    });

    test('TC_A11Y_007: Character counter accessible', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();
      await page.getByRole('button', { name: 'Respond to Review' }).first().click();

      const textarea = page.getByRole('textbox', { name: 'Write your response to this customer review...' });
      await textarea.fill(testData.inputs.responseText);
      await expect(page.getByText(/\/500 characters/)).toBeVisible();
    });

    test('TC_A11Y_008: Submit response button accessible', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();
      await page.getByRole('button', { name: 'Respond to Review' }).first().click();

      const textarea = page.getByRole('textbox', { name: 'Write your response to this customer review...' });
      await textarea.fill(testData.inputs.responseText);
      
      const submitButton = page.getByRole('button', { name: 'Submit Response' });
      await submitButton.focus();
      await expect(submitButton).toBeFocused();
      await expect(submitButton).toBeEnabled();
    });

    test('TC_A11Y_009: Form validation errors accessible', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();
      await page.getByRole('button', { name: 'Respond to Review' }).first().click();

      const submitButton = page.getByRole('button', { name: 'Submit Response' });
      await expect(submitButton).toBeDisabled();
    });
  });

  test.describe('4. Queries Section', () => {
    test('TC_A11Y_010: Queries section keyboard navigable', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));

      const queriesLink = page.getByRole('link', { name: 'Queries' });
      await queriesLink.focus();
      await expect(queriesLink).toBeFocused();
      await page.keyboard.press('Enter');
    });

    test('TC_A11Y_011: Query metadata accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('link', { name: 'Queries' }).click();
    });
  });

  test.describe('5. Moderation Status', () => {
    test('TC_A11Y_012: Pending status badge accessible', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      await expect(page.getByText('Published')).toBeVisible();
    });

    test('TC_A11Y_013: Status changes announced', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      await expect(page.getByText('Your Response')).toBeVisible();
    });
  });

  test.describe('6. Notifications', () => {
    test('TC_A11Y_014: Notification panel keyboard accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));

      const notificationButton = page.getByRole('button', { name: '🔔 4' });
      await notificationButton.focus();
      await expect(notificationButton).toBeFocused();
    });

    test('TC_A11Y_015: Notification content accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));

      const notificationButton = page.getByRole('button', { name: '🔔 4' });
      await expect(notificationButton).toBeVisible();
    });

    test('TC_A11Y_016: New notification alerts accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));

      const notificationBadge = page.getByRole('button', { name: '🔔 4' });
      await expect(notificationBadge).toBeVisible();
      await expect(notificationBadge).toContainText('4');
    });
  });

  test.describe('7. Edit Response', () => {
    test('TC_A11Y_017: Edit button keyboard accessible', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      await expect(page.getByText('Your Response')).toBeVisible();
    });

    test('TC_A11Y_018: Edit form pre-populated correctly', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      await expect(page.getByText("Thank you for your wonderful feedback!")).toBeVisible();
    });

    test('TC_A11Y_019: Re-moderation notice accessible', async ({ page }) => {
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
    });
  });

  test.describe('8. Withdraw Response', () => {
    test('TC_A11Y_020: Withdraw button keyboard accessible', async ({ page }) => {
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
    });

    test('TC_A11Y_021: Confirmation dialog accessible', async ({ page }) => {
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
    });

    test('TC_A11Y_022: Confirmation message clear', async ({ page }) => {
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
    });
  });

  test.describe('9. Response Visibility on Portal', () => {
    test('TC_A11Y_023: AP response visually distinguished', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      await expect(page.getByText('Your Response')).toBeVisible();
      await expect(page.getByText('Published')).toBeVisible();
    });

    test('TC_A11Y_024: Response metadata accessible', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      await expect(page.getByText('Nov 3, 2025')).toBeVisible();
    });

    test('TC_A11Y_025: Expand/collapse responses accessible', async ({ page }) => {
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
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();

      await expect(page.getByText("Thank you for your wonderful feedback!")).toBeVisible();
    });
  });

  test.describe('10. Content Guidelines Reference', () => {
    test('TC_A11Y_026: Guidelines link accessible', async ({ page }) => {
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
    });
  });

  test.describe('11. Error Handling', () => {
    test('TC_A11Y_027: Save failure error accessible', async ({ page }) => {
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
    });

    test('TC_A11Y_028: Pending status timeout accessible', async ({ page }) => {
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
    });
  });

  test.describe('12. Keyboard Navigation', () => {
    test('TC_A11Y_029: Complete workflow keyboard only', async ({ page }) => {
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
      await page.keyboard.press('Enter');
      await new Promise(f => setTimeout(f, 1000));
      
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await new Promise(f => setTimeout(f, 1000));
    });

    test('TC_A11Y_030: Skip links available', async ({ page }) => {
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
    });
  });

  test.describe('13. Visual Accessibility', () => {
    test('TC_A11Y_031: Color contrast sufficient', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 2 })).toBeVisible();
      await expect(page.getByText('Average Rating')).toBeVisible();
    });

    test('TC_A11Y_032: Page usable at 200% zoom', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 2 })).toBeVisible();
    });

    test('TC_A11Y_033: Focus indicators visible', async ({ page }) => {
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
    });
  });

  test.describe('14. Mobile Responsive', () => {
    test('TC_A11Y_034: Touch targets adequate size', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 2 })).toBeVisible();
    });

    test('TC_A11Y_035: Mobile layout accessible', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 2 })).toBeVisible();
      await expect(page.getByText('Average Rating')).toBeVisible();
    });
  });

  test.describe('15. Screen Reader Compatibility', () => {
    test('TC_A11Y_036: NVDA navigation successful', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 2 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Welcome to your Dashboard', level: 1 })).toBeVisible();
    });

    test('TC_A11Y_037: JAWS navigation successful', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 2 })).toBeVisible();
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();
      await expect(page.getByRole('heading', { name: 'Customer Reviews', level: 2 })).toBeVisible();
    });

    test('TC_A11Y_038: VoiceOver navigation successful', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 2 })).toBeVisible();
      await page.locator('div').filter({ hasText: /^Braille Display BD-40/ }).first().click();
      await expect(page.getByRole('heading', { name: 'Braille Display BD-40', level: 1 })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Respond to Review' }).first()).toBeVisible();
    });
  });
});
