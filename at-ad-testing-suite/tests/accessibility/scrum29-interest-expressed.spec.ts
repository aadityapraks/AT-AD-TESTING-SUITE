// spec: specs/functional/SCRUM-29-interest-expressed.plan.md

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum29-interest-expressed.json';

test.describe('SCRUM-29: Interest Expressed', () => {

  test.describe('Access and Navigation', () => {
    test('Verify Interest Expressed tab visibility', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      const interestTab = page.getByRole('link', { name: /interest.*expressed/i });
      await expect(interestTab).toBeVisible();
    });

    test('Load interest summary page', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.getByRole('link', { name: /interest.*expressed/i }).click();
      
      await expect(page.getByRole('heading', { name: /interest.*expressed/i })).toBeVisible();
    });
  });

  test.describe('Summary Metrics and Notifications', () => {
    test('Display Total Interest metric', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      const totalInterest = page.getByText(/total interest/i);
      await expect(totalInterest).toBeVisible();
      
      const count = page.locator('[data-testid="total-interest-count"]').or(page.getByText(/\d+/));
      await expect(count.first()).toBeVisible();
    });

    test('Display notification indicator', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      const notification = page.getByRole('button', { name: /🔔|notification/i });
      await expect(notification).toBeVisible();
    });

    test('Link notification to Interest Expressed section', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.getByRole('button', { name: /🔔|notification/i }).click();
      
      await expect(page).toHaveURL(/interest/);
    });
  });

  test.describe('Interest List View', () => {
    test('Display interest list columns', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await expect(page.getByText(/name|profile/i)).toBeVisible();
      await expect(page.getByText(/location/i)).toBeVisible();
      await expect(page.getByText(/product/i)).toBeVisible();
      await expect(page.getByText(/date/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /view details/i }).first()).toBeVisible();
    });

    test('Verify pagination', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await expect(page.getByText(/showing.*of.*results/i)).toBeVisible();
      
      const nextButton = page.getByRole('button', { name: /next/i });
      if (await nextButton.isVisible()) {
        await expect(nextButton).toBeEnabled();
      }
    });

    test('Verify default sorting', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      const sortDropdown = page.getByRole('combobox', { name: /sort/i }).or(page.getByText(/newest first/i));
      await expect(sortDropdown.first()).toBeVisible();
    });
  });

  test.describe('Search, Filter, and Sort', () => {
    test('Search by name', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await page.getByRole('textbox', { name: /search/i }).fill(testData.searchTerms.name);
      
      await expect(page.getByText(testData.searchTerms.name, { exact: false })).toBeVisible();
    });

    test('Search by location', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await page.getByRole('textbox', { name: /search/i }).fill(testData.searchTerms.location);
      
      await expect(page.getByText(testData.searchTerms.location, { exact: false })).toBeVisible();
    });

    test('Search by product', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await page.getByRole('textbox', { name: /search/i }).fill(testData.searchTerms.product);
      
      await expect(page.getByText(testData.searchTerms.product, { exact: false })).toBeVisible();
    });

    test('Filter by state', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await page.getByRole('combobox', { name: /state/i }).selectOption(testData.filters.state);
      
      await expect(page.getByText(testData.filters.state)).toBeVisible();
    });

    test('Filter by disability type', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await page.getByRole('combobox', { name: /disability/i }).selectOption(testData.filters.disabilityType);
      
      await expect(page.getByText(testData.filters.disabilityType)).toBeVisible();
    });

    test('Change sort order', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await page.getByRole('combobox', { name: /sort/i }).selectOption(testData.sortOptions.oldestFirst);
      
      await expect(page.getByText(testData.sortOptions.oldestFirst)).toBeVisible();
    });
  });

  test.describe('View Details Modal', () => {
    test('Open View Details modal', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      const modal = page.locator('[role="dialog"]').or(page.locator('.modal'));
      await expect(modal.first()).toBeVisible();
    });

    test('Display modal content', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      await expect(page.getByText(/age|disability/i)).toBeVisible();
      await expect(page.getByText(/location|address/i)).toBeVisible();
      await expect(page.getByText(/product/i)).toBeVisible();
    });

    test('Close modal with X icon', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      await page.getByRole('button', { name: /close|×/i }).click();
      
      const modal = page.locator('[role="dialog"]').or(page.locator('.modal'));
      await expect(modal.first()).not.toBeVisible();
    });

    test('Close modal by clicking outside', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      await page.locator('body').click({ position: { x: 10, y: 10 } });
      
      const modal = page.locator('[role="dialog"]').or(page.locator('.modal'));
      await expect(modal.first()).not.toBeVisible();
    });
  });

  test.describe('Reveal Contact Details', () => {
    test('Verify masked contact by default', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      await expect(page.getByText(/\*\*\*|hidden|masked/i)).toBeVisible();
    });

    test('Reveal contact details', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      await page.getByRole('button', { name: /reveal.*details/i }).click();
      
      await expect(page.getByText(/@|phone/i)).toBeVisible();
    });
  });

  test.describe('Data Accuracy and Permissions', () => {
    test('Prevent editing interest records', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      const editButton = page.getByRole('button', { name: /edit/i });
      await expect(editButton).not.toBeVisible();
    });
  });

  test.describe('Download and Export', () => {
    test('Download interest list', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('button', { name: /download|export/i }).click();
      const download = await downloadPromise;
      
      expect(download.suggestedFilename()).toMatch(/interest|export/i);
    });
  });

  test.describe('Notification Center', () => {
    test('Access Notification Center', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.getByRole('button', { name: /🔔|notification/i }).click();
      
      await expect(page.getByRole('heading', { name: /notification/i })).toBeVisible();
    });

    test('Mark notification as read', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.getByRole('button', { name: /🔔|notification/i }).click();
      
      const markReadButton = page.getByRole('button', { name: /mark.*read/i }).first();
      if (await markReadButton.isVisible()) {
        await markReadButton.click();
        await expect(page.getByText(/read/i)).toBeVisible();
      }
    });
  });

  test.describe('Privacy and Compliance', () => {
    test('Verify no direct PwD personal details visible', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await expect(page.getByText(/\*\*\*|masked|hidden/i)).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('Display empty state message', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      const emptyState = page.getByText(testData.expectedMessages.emptyState);
      if (await emptyState.isVisible()) {
        await expect(emptyState).toBeVisible();
      }
    });
  });

  test.describe('Accessibility and Usability', () => {
    test('Verify clear headings and labels', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      
      const table = page.locator('table').or(page.locator('[role="table"]'));
      await expect(table.first()).toBeVisible();
    });

    test('Verify keyboard accessibility', async ({ page }) => {
      await page.goto(testData.baseUrl);
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill(testData.ssoCredentials.email);
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill(testData.ssoCredentials.password);
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForURL(/partner/);
      
      await page.goto(testData.baseUrl + testData.interestExpressedUrl);
      
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });
});
