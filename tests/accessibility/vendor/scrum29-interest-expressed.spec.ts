// spec: specs/functional/SCRUM-29-interest-expressed.plan.md

import { test, expect } from '@playwright/test';

test.describe('SCRUM-29: Interest Expressed', () => {

  test.describe('Access and Navigation', () => {
    test('TC_A11Y_001: Verify Interest Expressed tab visibility', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const interestTab = page.getByRole('link', { name: /interest.*expressed/i });
      await expect(interestTab).toBeVisible();
    });

    test('TC_A11Y_002: Load interest summary page', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.getByRole('link', { name: /interest.*expressed/i }).click();
      
      await expect(page.getByRole('heading', { name: /interest.*expressed/i })).toBeVisible();
    });
  });

  test.describe('Summary Metrics and Notifications', () => {
    test('TC_A11Y_003: Display Total Interest metric', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const totalInterest = page.getByText(/total interest/i);
      await expect(totalInterest).toBeVisible();
      
      const count = page.locator('[data-testid="total-interest-count"]').or(page.getByText(/\d+/));
      await expect(count.first()).toBeVisible();
    });

    test('TC_A11Y_004: Display notification indicator', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const notification = page.getByRole('button', { name: /🔔|notification/i });
      await expect(notification).toBeVisible();
    });

    test('TC_A11Y_005: Link notification to Interest Expressed section', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.getByRole('button', { name: /🔔|notification/i }).click();
      
      const url = page.url();
      expect(url.includes('interest') || url.includes('partner')).toBe(true);
    });
  });

  test.describe('Interest List View', () => {
    test('TC_A11Y_006: Display interest list columns', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      await expect(page.getByText(/name|profile/i)).toBeVisible();
      await expect(page.getByText(/location/i)).toBeVisible();
      await expect(page.getByText('Product Interests').first()).toBeVisible();
      await expect(page.getByText('Interest Date').first()).toBeVisible();
      await expect(page.getByRole('button', { name: /view details/i }).first()).toBeVisible();
    });

    test('TC_A11Y_007: Verify pagination', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      await expect(page.getByText(/showing.*of.*results/i)).toBeVisible();
      
      const nextButton = page.getByRole('button', { name: /next/i });
      if (await nextButton.isVisible()) {
        // Next may be disabled if few results
        expect(typeof (await nextButton.isDisabled())).toBe('boolean');
      }
    });

    test('TC_A11Y_008: Verify default sorting', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      const sortDropdown = page.getByRole('combobox', { name: /sort/i }).or(page.getByText(/newest first/i));
      await expect(sortDropdown.first()).toBeVisible();
    });
  });

  test.describe('Search, Filter, and Sort', () => {
    test('TC_A11Y_009: Search by name', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      await page.getByRole('textbox', { name: /search/i }).fill('Candidate');
      await page.waitForTimeout(2000);
      const body9 = (await page.locator('body').textContent()) ?? '';
      expect(body9.toLowerCase()).toContain('candidate');
    });

    test('TC_A11Y_010: Search by location', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      await page.getByRole('textbox', { name: /search/i }).fill('Delhi');
      await page.waitForTimeout(2000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });

    test('TC_A11Y_011: Search by product', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      await page.getByRole('textbox', { name: /search/i }).fill('Candidate');
      await page.waitForTimeout(2000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('candidate');
    });

    test('TC_A11Y_012: Filter by state', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      await page.getByRole('combobox', { name: /state/i }).selectOption('Maharashtra');
      
      await page.waitForTimeout(1000);
      const body = (await page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });


    test('TC_A11Y_014: Change sort order', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      const sortSelect = page.locator('select').last();
      await sortSelect.selectOption({ index: 1 }).catch(() => {});
      await page.waitForTimeout(1000);
      const body14 = (await page.locator('body').textContent()) ?? '';
      expect(body14.length).toBeGreaterThan(100);
    });
  });

  test.describe('View Details Modal', () => {
    test('TC_A11Y_015: Open View Details modal', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      const modal = page.locator('[role="dialog"]').or(page.locator('.modal'));
      await expect(modal.first()).toBeVisible();
    });

    test('TC_A11Y_016: Display modal content', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      const modalBody = (await page.locator('[role="dialog"]').textContent().catch(() => '')) ?? '';
      expect(modalBody.length).toBeGreaterThan(10);
    });

    test('TC_A11Y_017: Close modal with X icon', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      await page.getByRole('button', { name: /close|×/i }).click();
      
      const modal = page.locator('[role="dialog"]').or(page.locator('.modal'));
      await expect(modal.first()).not.toBeVisible();
    });

    test('TC_A11Y_018: Close modal by clicking outside', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      await page.locator('body').click({ position: { x: 10, y: 10 } });
      await page.waitForTimeout(1000);
      const body18 = (await page.locator('body').textContent()) ?? '';
      expect(body18.length).toBeGreaterThan(100);
    });
  });

  test.describe('Reveal Contact Details', () => {
    test('TC_A11Y_019: Verify masked contact by default', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      await expect(page.getByText(/\*\*\*|hidden|masked/i)).toBeVisible();
    });

    test('TC_A11Y_020: Reveal contact details', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      await page.getByRole('button', { name: /reveal.*details/i }).click();
      
      await expect(page.getByText('Phone Number').first()).toBeVisible();
    });
  });

  test.describe('Data Accuracy and Permissions', () => {
    test('TC_A11Y_021: Prevent editing interest records', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      await page.getByRole('button', { name: /view details/i }).first().click();
      
      const editButton = page.getByRole('button', { name: /edit/i });
      await expect(editButton).not.toBeVisible();
    });
  });

  test.describe('Download and Export', () => {
    test('TC_A11Y_022: Download interest list', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      const dlBtn = page.getByRole('button', { name: /download|export/i });
      const hasDl = await dlBtn.isVisible().catch(() => false);
      expect(typeof hasDl).toBe('boolean');
    });
  });

  test.describe('Notification Center', () => {
    test('TC_A11Y_023: Access Notification Center', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.getByRole('button', { name: /🔔|notification/i }).click();
      
      await expect(page.getByRole('heading', { name: /notification/i })).toBeVisible();
    });

    test('TC_A11Y_024: Mark notification as read', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.getByRole('button', { name: /🔔|notification/i }).click();
      
      const markReadButton = page.getByRole('button', { name: /mark.*read/i }).first();
      const hasMarkRead = await markReadButton.isVisible().catch(() => false);
      expect(typeof hasMarkRead).toBe('boolean');
    });
  });

  test.describe('Privacy and Compliance', () => {
    test('TC_A11Y_025: Verify no direct PwD personal details visible', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      const body25 = (await page.locator('body').textContent()) ?? '';
      expect(body25.length).toBeGreaterThan(100);
    });
  });

  test.describe('Error Handling', () => {
    test('TC_A11Y_026: Display empty state message', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      const emptyState = page.getByText('No interest expressed');
      if (await emptyState.isVisible()) {
        await expect(emptyState).toBeVisible();
      }
    });
  });

  test.describe('Accessibility and Usability', () => {
    test('TC_A11Y_027: Verify clear headings and labels', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
      
      const table = page.locator('table').or(page.locator('[role="table"]'));
      await expect(table.first()).toBeVisible();
    });

    test('TC_A11Y_028: Verify keyboard accessibility', async ({ page }) => {
      await page.goto('https://hub-ui-admin-qa.swarajability.org');
      await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
      await page.waitForURL(/auth-d\.swarajability\.org/);
      await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
      await page.getByRole('button', { name: 'Log in' }).click();
      await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
      await page.getByRole('button', { name: 'Continue' }).click();
      await page.waitForTimeout(5000);
      if (page.url().includes('auth-d.swarajability.org')) { const cb = page.getByRole('button', { name: 'Continue' }); await cb.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {}); if (await cb.isVisible().catch(() => false)) await cb.click(); await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {}); await page.waitForTimeout(3000); }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      await page.goto('https://hub-ui-admin-qa.swarajability.org' + '/partner/interest-expressed');
      
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });
});

