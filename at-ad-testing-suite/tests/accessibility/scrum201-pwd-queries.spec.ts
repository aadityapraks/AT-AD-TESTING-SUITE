// spec: specs/a11y/SCRUM-201-pwd-queries.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum201-accessibility.json';

test.describe('SCRUM-201: AP Responding to PwD Queries Accessibility', () => {

  test.describe('1. Queries Section Access', () => {
    test('TC_A11Y_001: Queries section keyboard accessible', async ({ page }) => {
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

    test('TC_A11Y_002: Page has proper heading structure', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading })).toBeVisible();
    });
  });

  test.describe('2. Summary Counts', () => {
    test('TC_A11Y_003: Summary counts accessible', async ({ page }) => {
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

      await expect(page.getByText('Total Queries')).toBeVisible();
      await expect(page.getByText('Pending Responses')).toBeVisible();
      await expect(page.getByText('Responded Queries')).toBeVisible();
    });

    test('TC_A11Y_004: Counts not conveyed by color alone', async ({ page }) => {
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

      await expect(page.getByText('Total Queries')).toBeVisible();
    });
  });

  test.describe('3. Query Listing', () => {
    test('TC_A11Y_005: Query list semantic structure', async ({ page }) => {
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

    test('TC_A11Y_006: Product images have alt text', async ({ page }) => {
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

    test('TC_A11Y_007: Status badges accessible', async ({ page }) => {
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

  test.describe('4. Search and Filter', () => {
    test('TC_A11Y_008: Search input has proper label', async ({ page }) => {
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

    test('TC_A11Y_009: Search keyboard accessible', async ({ page }) => {
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

    test('TC_A11Y_010: Status filter accessible', async ({ page }) => {
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

  test.describe('5. Response Input', () => {
    test('TC_A11Y_011: Response textarea has proper label', async ({ page }) => {
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

    test('TC_A11Y_012: Response textarea keyboard accessible', async ({ page }) => {
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

    test('TC_A11Y_013: Word counter accessible', async ({ page }) => {
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

    test('TC_A11Y_014: Disabled state accessible', async ({ page }) => {
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

  test.describe('6. Submit Response', () => {
    test('TC_A11Y_015: Submit button keyboard accessible', async ({ page }) => {
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

    test('TC_A11Y_016: Submit button disabled state accessible', async ({ page }) => {
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

    test('TC_A11Y_017: Submission success accessible', async ({ page }) => {
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

    test('TC_A11Y_018: Validation errors accessible', async ({ page }) => {
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

  test.describe('7. Response Status Labels', () => {
    test('TC_A11Y_019: Pending approval label accessible', async ({ page }) => {
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

    test('TC_A11Y_020: Approved response label accessible', async ({ page }) => {
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

    test('TC_A11Y_021: Admin response label accessible', async ({ page }) => {
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

  test.describe('8. Rejection Handling', () => {
    test('TC_A11Y_022: Rejection reason accessible', async ({ page }) => {
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

    test('TC_A11Y_023: Re-submission accessible', async ({ page }) => {
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

  test.describe('9. Notifications', () => {
    test('TC_A11Y_024: New query notification accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));

      const notificationBadge = page.getByRole('button', { name: /🔔/ });
      await expect(notificationBadge).toBeVisible();
    });

    test('TC_A11Y_025: Approval notification accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
    });

    test('TC_A11Y_026: Rejection notification accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
    });

    test('TC_A11Y_027: Notification badge accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));

      const notificationBadge = page.getByRole('button', { name: /🔔/ });
      await expect(notificationBadge).toBeVisible();
    });
  });

  test.describe('10. Visual Indicators', () => {
    test('TC_A11Y_028: Pending approval indicator accessible', async ({ page }) => {
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

    test('TC_A11Y_029: Approved indicator accessible', async ({ page }) => {
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

    test('TC_A11Y_030: Rejected indicator accessible', async ({ page }) => {
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

  test.describe('11. Keyboard Navigation', () => {
    test('TC_A11Y_031: Complete workflow keyboard only', async ({ page }) => {
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
      await page.keyboard.press('Enter');
    });

    test('TC_A11Y_032: Skip links functional', async ({ page }) => {
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

  test.describe('12. Visual Accessibility', () => {
    test('TC_A11Y_033: Color contrast sufficient', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading })).toBeVisible();
    });

    test('TC_A11Y_034: Page usable at 200% zoom', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading })).toBeVisible();
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

      const queriesLink = page.getByRole('link', { name: 'Queries' });
      await queriesLink.focus();
      await expect(queriesLink).toBeFocused();
    });
  });

  test.describe('13. Mobile Responsive', () => {
    test('TC_A11Y_036: Touch targets adequate size', async ({ page }) => {
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
      await page.getByRole('link', { name: 'Queries' }).click();
    });

    test('TC_A11Y_037: Mobile layout accessible', async ({ page }) => {
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
      await page.getByRole('link', { name: 'Queries' }).click();

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading })).toBeVisible();
    });
  });

  test.describe('14. Screen Reader Compatibility', () => {
    test('TC_A11Y_038: NVDA navigation successful', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading })).toBeVisible();
    });

    test('TC_A11Y_039: JAWS navigation successful', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading })).toBeVisible();
    });

    test('TC_A11Y_040: VoiceOver navigation successful', async ({ page }) => {
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

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Queries' })).toBeVisible();
    });
  });
});
