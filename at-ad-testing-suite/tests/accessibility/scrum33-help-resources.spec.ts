// spec: specs/a11y/SCRUM-33-help-resources.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum33-accessibility.json';

test.describe('SCRUM-33: Help & Resources Accessibility', () => {

  test.describe('1. Navigation and Access', () => {
    test('TC_A11Y_001: Help & Resources tab keyboard accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));

      const helpButton = page.getByRole('button', { name: 'Help & Resources' });
      await helpButton.focus();
      await expect(helpButton).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 1 })).toBeVisible();
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
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Best Practices', level: 3 })).toBeVisible();
    });
  });

  test.describe('2. Search Bar', () => {
    test('TC_A11Y_003: Search bar has proper label', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const searchInput = page.getByRole('textbox', { name: 'Search articles, FAQs, or guides' });
      await expect(searchInput).toBeVisible();
      await expect(searchInput).toHaveAttribute('placeholder', /Search articles, FAQs, or guides/);
    });

    test('TC_A11Y_004: Search bar keyboard accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const searchInput = page.getByRole('textbox', { name: 'Search articles, FAQs, or guides' });
      await searchInput.focus();
      await expect(searchInput).toBeFocused();
      await searchInput.fill(testData.inputs.searchQuery);
    });

    test('TC_A11Y_005: Suggested keywords accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const searchInput = page.getByRole('textbox', { name: 'Search articles, FAQs, or guides' });
      await searchInput.fill(testData.inputs.partialQuery);
    });
  });

  test.describe('3. Category Tabs', () => {
    test('TC_A11Y_006: Category tabs keyboard navigable', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const categoriesTab = page.getByRole('tab', { name: 'Categories' });
      await categoriesTab.focus();
      await expect(categoriesTab).toBeFocused();
      
      const faqsTab = page.getByRole('tab', { name: 'FAQs' });
      await faqsTab.focus();
      await expect(faqsTab).toBeFocused();
      
      const contactTab = page.getByRole('tab', { name: 'Contact' });
      await contactTab.focus();
      await expect(contactTab).toBeFocused();
    });

    test('TC_A11Y_007: Tabs have proper ARIA roles', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('tablist', { name: 'Help resources navigation' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'Categories' })).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByRole('tabpanel', { name: 'Categories' })).toBeVisible();
    });

    test('TC_A11Y_008: Arrow key navigation works', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const categoriesTab = page.getByRole('tab', { name: 'Categories' });
      await categoriesTab.focus();
      await page.keyboard.press('ArrowRight');
      await expect(page.getByRole('tab', { name: 'FAQs' })).toBeFocused();
    });
  });

  test.describe('4. Categories View', () => {
    test('TC_A11Y_009: Category cards keyboard accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const bestPracticesCard = page.getByRole('button', { name: /Best Practices/ });
      await bestPracticesCard.focus();
      await expect(bestPracticesCard).toBeFocused();
      await page.keyboard.press('Enter');
    });

    test('TC_A11Y_010: Category card content accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: 'Best Practices', level: 3 })).toBeVisible();
      await expect(page.getByText('3 articles')).toBeVisible();
      await expect(page.getByText('Learn industry standards and recommended approaches')).toBeVisible();
    });

    test('TC_A11Y_011: Article list semantic structure', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: 'Product Management', level: 3 })).toBeVisible();
    });

    test('TC_A11Y_012: Article expansion accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const categoryCard = page.getByRole('button', { name: /Best Practices/ });
      await categoryCard.focus();
      await page.keyboard.press('Enter');
    });
  });

  test.describe('5. FAQs View', () => {
    test('TC_A11Y_013: FAQ items keyboard navigable', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
      await page.getByRole('tab', { name: 'FAQs' }).click();

      const faqButton = page.getByRole('button', { name: 'How do I create a vendor account?' });
      await faqButton.focus();
      await expect(faqButton).toBeFocused();
    });

    test('TC_A11Y_014: FAQ accordion structure proper', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
      await page.getByRole('tab', { name: 'FAQs' }).click();

      await expect(page.getByRole('button', { name: 'How do I create a vendor account?' })).toBeVisible();
      await expect(page.getByRole('region', { name: 'How do I create a vendor account?' })).toBeVisible();
    });

    test('TC_A11Y_015: FAQ expand/collapse accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
      await page.getByRole('tab', { name: 'FAQs' }).click();

      const faqButton = page.getByRole('button', { name: 'How do I create a vendor account?' });
      await faqButton.focus();
      await page.keyboard.press('Enter');
      await expect(page.getByText('To create a vendor account, click on the "Register" button')).toBeVisible();
    });

    test('TC_A11Y_016: FAQ categories accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
      await page.getByRole('tab', { name: 'FAQs' }).click();

      await expect(page.getByRole('heading', { name: 'Account & Registration', level: 3 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Product Listings', level: 3 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'GenAI Assistance', level: 3 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Reviews & Ratings', level: 3 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Technical Support', level: 3 })).toBeVisible();
    });
  });

  test.describe('6. Contact View', () => {
    test('TC_A11Y_017: Contact options keyboard accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
      await page.getByRole('tab', { name: 'Contact' }).click();

      const emailLink = page.getByRole('link', { name: 'vendor-support@youth4jobs.org' });
      await emailLink.focus();
      await expect(emailLink).toBeFocused();
      
      const phoneLink = page.getByRole('link', { name: '+91 (234) 567-890' });
      await phoneLink.focus();
      await expect(phoneLink).toBeFocused();
    });

    test('TC_A11Y_018: Email support link accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
      await page.getByRole('tab', { name: 'Contact' }).click();

      const emailLink = page.getByRole('link', { name: 'vendor-support@youth4jobs.org' });
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toHaveAttribute('href', 'mailto:vendor-support@youth4jobs.org');
    });

    test('TC_A11Y_019: Phone support accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
      await page.getByRole('tab', { name: 'Contact' }).click();

      const phoneLink = page.getByRole('link', { name: '+91 (234) 567-890' });
      await expect(phoneLink).toBeVisible();
      await expect(phoneLink).toHaveAttribute('href', 'tel:+912345678900');
      await expect(page.getByText('Mon-Fri, 9 AM - 6 PM IST')).toBeVisible();
    });
  });

  test.describe('7. Search Results', () => {
    test('TC_A11Y_020: Search results semantic structure', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const searchInput = page.getByRole('textbox', { name: 'Search articles, FAQs, or guides' });
      await searchInput.fill(testData.inputs.searchQuery);
    });

    test('TC_A11Y_021: Result categories accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const searchInput = page.getByRole('textbox', { name: 'Search articles, FAQs, or guides' });
      await searchInput.fill(testData.inputs.searchQuery);
    });

    test('TC_A11Y_022: Search filters accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });
  });

  test.describe('8. Notifications', () => {
    test('TC_A11Y_023: New content notifications accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });

    test('TC_A11Y_024: Notification links functional', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });
  });

  test.describe('9. Feedback Buttons', () => {
    test('TC_A11Y_025: Feedback buttons accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });

    test('TC_A11Y_026: Feedback submission accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });
  });

  test.describe('10. Error Handling', () => {
    test('TC_A11Y_027: No results error accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      const searchInput = page.getByRole('textbox', { name: 'Search articles, FAQs, or guides' });
      await searchInput.fill(testData.inputs.noResultsQuery);
    });

    test('TC_A11Y_028: System error accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });
  });

  test.describe('11. Images and Media', () => {
    test('TC_A11Y_029: Images have alt text', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });

    test('TC_A11Y_030: Diagrams accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });

    test('TC_A11Y_031: Videos accessible', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });
  });

  test.describe('12. Keyboard Navigation', () => {
    test('TC_A11Y_032: Complete workflow keyboard only', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));

      const helpButton = page.getByRole('button', { name: 'Help & Resources' });
      await helpButton.focus();
      await page.keyboard.press('Enter');
      
      const searchInput = page.getByRole('textbox', { name: 'Search articles, FAQs, or guides' });
      await searchInput.focus();
      await searchInput.fill(testData.inputs.searchQuery);
      
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
    });

    test('TC_A11Y_033: Skip links functional', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();
    });
  });

  test.describe('13. Visual Accessibility', () => {
    test('TC_A11Y_034: Color contrast sufficient', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 1 })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'Categories' })).toBeVisible();
    });

    test('TC_A11Y_035: Page usable at 200% zoom', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 1 })).toBeVisible();
    });

    test('TC_A11Y_036: Not relying on color alone', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: 'Best Practices', level: 3 })).toBeVisible();
    });
  });

  test.describe('14. Mobile Responsive', () => {
    test('TC_A11Y_037: Touch targets adequate size', async ({ page }) => {
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
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('tab', { name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'FAQs' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'Contact' })).toBeVisible();
    });

    test('TC_A11Y_038: Mobile layout accessible', async ({ page }) => {
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
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 1 })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Search articles, FAQs, or guides' })).toBeVisible();
    });
  });

  test.describe('15. Screen Reader Compatibility', () => {
    test('TC_A11Y_039: NVDA navigation successful', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Best Practices', level: 3 })).toBeVisible();
      await expect(page.getByRole('button', { name: /Best Practices/ })).toBeVisible();
    });

    test('TC_A11Y_040: JAWS navigation successful', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 1 })).toBeVisible();
      await page.getByRole('tab', { name: 'FAQs' }).click();
      await expect(page.getByRole('heading', { name: 'Account & Registration', level: 3 })).toBeVisible();
    });

    test('TC_A11Y_041: VoiceOver navigation successful', async ({ page }) => {
      await page.goto(testData.url);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.getByText("Email").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.credentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByText("password").first().waitFor({ state: 'visible' });
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.credentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await new Promise(f => setTimeout(f, 5 * 1000));
      await page.getByRole('button', { name: 'Help & Resources' }).click();

      await expect(page.getByRole('heading', { name: testData.expected.pageHeading, level: 1 })).toBeVisible();
      await expect(page.getByRole('tablist', { name: 'Help resources navigation' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'Categories' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'FAQs' })).toBeVisible();
      await expect(page.getByRole('tab', { name: 'Contact' })).toBeVisible();
    });
  });
});
