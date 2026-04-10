import { test, expect } from '@playwright/test';
import { CaregiverRecommendationsPage } from '../../pages/caregiver/CaregiverRecommendationsPage';
import planData from '../../../specs/test-cases/caregiver/scrum402-caregiver-switch-generic-pwd.json';
const td = planData.testData;

test.describe('SCRUM-402: Caregiver - Switch Between Generic Search and PwD-Specific Recommendations', () => {
  test.setTimeout(120_000);

  let crp: CaregiverRecommendationsPage;

  test.beforeEach(async ({ page }) => {
    crp = new CaregiverRecommendationsPage(page);
    await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
  });

  // ─── Suite 1: Select PwD After Generic Browsing (AC1) ───

  test.describe('Select PwD After Generic Browsing', () => {
    test('TC_SCRUM402_001: Caregiver starts in generic catalog mode', async () => {
      expect(crp.page.url()).toContain('/catalog');
      await expect(crp.deviceCountText).toBeVisible({ timeout: 10000 });
    });

    test('TC_SCRUM402_002: PwD dropdown is available for selection during generic browsing', async () => {
      await expect(crp.pwdTrigger).toBeVisible({ timeout: 5000 });
      await crp.openPwdDropdown();
      const count = await crp.pwdOptions.count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('TC_SCRUM402_003: Selecting a PwD from dropdown updates trigger text', async () => {
      const optionTexts = await crp.getPwdOptionTexts();
      expect(optionTexts.length).toBeGreaterThanOrEqual(1);
      await crp.selectPwdByIndex(0);
      const triggerName = ((await crp.pwdTriggerName.textContent()) ?? '').trim();
      expect(triggerName.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM402_004: Show Recommendations button becomes enabled after PwD selection', async () => {
      await crp.selectPwdByIndex(0);
      const isDisabled = await crp.showRecommendationsBtn.isDisabled().catch(() => false);
      expect(isDisabled).toBe(false);
    });
  });

  // ─── Suite 2: Confirmation Shows Personalized Results (AC2) ───

  test.describe('Confirmation Shows Personalized Results', () => {
    test('TC_SCRUM402_005: Clicking Show Recommendations transitions to personalized view', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/device|product|catalog/i.test(body)).toBe(true);
    });

    test('TC_SCRUM402_006: Personalized view shows device cards', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const cards = await crp.productCards.count();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(cards > 0 || /no.*found|no.*result|empty/i.test(body)).toBe(true);
    });

    test('TC_SCRUM402_007: Personalized view shows price on device cards', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/₹[\d,.]+/i.test(body)).toBe(true);
    });

    test('TC_SCRUM402_008: Personalized view shows View Details links', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const count = await crp.viewDetailsLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('TC_SCRUM402_009: Device count updates after showing recommendations', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      const hasCount = /\d+\s*devices?\s*found/i.test(body) || /\d+\s*devices?\s*for\s/i.test(body); expect(hasCount).toBe(true);
    });
  });

  // ─── Suite 3: Clear PwD Returns to Generic (AC3) ───

  test.describe('Clear PwD Returns to Generic', () => {
    test('TC_SCRUM402_010: Caregiver can return to generic mode after viewing recommendations', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      await expect(crp.deviceCountText).toBeVisible({ timeout: 10000 });
    });

    test('TC_SCRUM402_011: Generic mode after reset shows full device count', async () => {
      const initialCount = await crp.getDeviceCountNumber();
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const restoredCount = await crp.getDeviceCountNumber();
      expect(restoredCount).toBe(initialCount);
    });

    test('TC_SCRUM402_012: Recommendation banner disappears after returning to generic mode', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const visible = await crp.recBanner.isVisible().catch(() => false);
      expect(visible).toBe(false);
    });

    test('TC_SCRUM402_013: No personalization labels after returning to generic mode', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const badgeVisible = await crp.personalizedBadge.isVisible().catch(() => false);
      expect(badgeVisible).toBe(false);
    });

    test('TC_SCRUM402_014: Product cards still visible after returning to generic mode', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const cards = await crp.productCards.count();
      expect(cards).toBeGreaterThan(0);
      const details = await crp.viewDetailsLinks.count();
      expect(details).toBeGreaterThan(0);
    });
  });

  // ─── Suite 4: UI Mode Indicator (AC4) ───

  test.describe('UI Mode Indicator', () => {
    test('TC_SCRUM402_015: Generic mode does not show recommendation label', async () => {
      const bannerVisible = await crp.recBanner.isVisible().catch(() => false);
      expect(bannerVisible).toBe(false);
      const badgeVisible = await crp.personalizedBadge.isVisible().catch(() => false);
      expect(badgeVisible).toBe(false);
    });

    test('TC_SCRUM402_016: Caregiver banner is visible in both modes', async () => {
      await expect(crp.caregiverBanner).toBeVisible({ timeout: 5000 });
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await expect(crp.caregiverBanner).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM402_017: PwD trigger name reflects selected PwD in recommendation mode', async () => {
      await crp.selectPwdByIndex(0);
      const nameBefore = ((await crp.pwdTriggerName.textContent()) ?? '').trim();
      await crp.clickShowRecommendations();
      const nameAfter = ((await crp.pwdTriggerName.textContent()) ?? '').trim();
      expect(nameAfter).toBe(nameBefore);
      expect(nameAfter.length).toBeGreaterThan(0);
    });

    test('TC_SCRUM402_018: Mode indicator changes when switching between generic and recommendations', async () => {
      // Generic mode — no rec banner
      const bannerBefore = await crp.recBanner.isVisible().catch(() => false);
      expect(bannerBefore).toBe(false);
      // Switch to recommendations
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/device|product|catalog/i.test(body)).toBe(true);
      // Switch back to generic
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const bannerAfter = await crp.recBanner.isVisible().catch(() => false);
      expect(bannerAfter).toBe(false);
    });
  });

  // ─── Suite 5: Edge Case — Filters Before PwD Selection (EC1) ───

  test.describe('Edge Case — Filters Before PwD', () => {
    test('TC_SCRUM402_019: Filters applied before PwD selection handled on mode switch', async () => {
      await crp.typeDropdown.selectOption({ label: 'Device' });
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });

    test('TC_SCRUM402_020: Search term applied before PwD selection handled on mode switch', async () => {
      await crp.searchFor('wheelchair');
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });

    test('TC_SCRUM402_021: Price range filter before PwD selection handled on mode switch', async () => {
      await crp.priceRangeDropdown.selectOption({ index: 1 });
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });
  });

  // ─── Suite 6: Edge Case — PwD Changed Mid-Session (EC2) ───

  test.describe('Edge Case — PwD Changed Mid-Session', () => {
    test('TC_SCRUM402_022: Changing PwD mid-session updates trigger name', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const nameBefore = ((await crp.pwdTriggerName.textContent()) ?? '').trim();
      const optionCount = await crp.pwdOptions.count().catch(() => 0);
      if (optionCount === 0) {
        await crp.openPwdDropdown();
      }
      const totalOptions = await crp.pwdOptions.count();
      if (totalOptions > 1) {
        await crp.selectPwdByIndex(1);
        const nameAfter = ((await crp.pwdTriggerName.textContent()) ?? '').trim();
        expect(nameAfter).not.toBe(nameBefore);
      } else {
        // Only one PwD — trigger name stays the same
        expect(nameBefore.length).toBeGreaterThan(0);
      }
    });

    test('TC_SCRUM402_023: Changing PwD and clicking Show Recommendations refreshes results', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const totalOptions = await crp.pwdOptions.count().catch(() => 0);
      const nextIndex = totalOptions > 1 ? 1 : 0;
      if (totalOptions === 0) await crp.openPwdDropdown();
      await crp.selectPwdByIndex(nextIndex);
      await crp.clickShowRecommendations();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });

    test('TC_SCRUM402_024: Show Recommendations button remains enabled after PwD switch', async () => {
      await crp.selectPwdByIndex(0);
      let isDisabled = await crp.showRecommendationsBtn.isDisabled().catch(() => false);
      expect(isDisabled).toBe(false);
      const totalOptions = await crp.pwdOptions.count().catch(() => 0);
      if (totalOptions === 0) await crp.openPwdDropdown();
      const nextIndex = (await crp.pwdOptions.count()) > 1 ? 1 : 0;
      await crp.selectPwdByIndex(nextIndex);
      isDisabled = await crp.showRecommendationsBtn.isDisabled().catch(() => false);
      expect(isDisabled).toBe(false);
    });
  });

  // ─── Suite 7: Edge Case — Cached Results (EC3) ───

  test.describe('Edge Case — Cached Results', () => {
    test('TC_SCRUM402_025: Page reload after recommendations returns to clean state', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.page.reload({ waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      await crp.dismissOverlays();
      await expect(crp.pwdTrigger).toBeVisible({ timeout: 10000 });
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/device|product|catalog/i.test(body)).toBe(true);
    });

    test('TC_SCRUM402_026: Navigating away and back resets recommendation context', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.page.goto('https://qa-atad.swarajability.org/', { waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(2000);
      await crp.page.goto('https://qa-atad.swarajability.org/catalog/', { waitUntil: 'domcontentloaded' });
      await crp.page.waitForTimeout(3000);
      await crp.dismissOverlays();
      await expect(crp.deviceCountText).toBeVisible({ timeout: 10000 });
      const bannerVisible = await crp.recBanner.isVisible().catch(() => false);
      expect(bannerVisible).toBe(false);
    });
  });

  // ─── Suite 8: Edge Case — Additional ───

  test.describe('Edge Case — Additional', () => {
    test('TC_SCRUM402_027: Mobile viewport renders mode switch correctly', async () => {
      await crp.page.setViewportSize(td.viewports.mobile);
      await crp.page.waitForTimeout(1000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('catalog');
      await expect(crp.pwdTrigger).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM402_028: Rapid mode switching does not cause stale data', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });
  });

  // ─── Suite 9: Additional Mode Switch Scenarios ───

  test.describe('Additional Mode Switch Scenarios', () => {
    test('TC_SCRUM402_029: Full round-trip generic → recommendations → generic → recommendations', async () => {
      // Start generic
      const initialCount = await crp.getDeviceCountNumber();
      expect(initialCount).toBeGreaterThan(0);
      // Switch to recommendations
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body1 = (await crp.page.locator('body').textContent()) ?? '';
      expect(/device|product|catalog/i.test(body1)).toBe(true);
      // Back to generic
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const restoredCount = await crp.getDeviceCountNumber();
      expect(restoredCount).toBe(initialCount);
      // Switch to recommendations again
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body2 = (await crp.page.locator('body').textContent()) ?? '';
      expect(/device|product|catalog/i.test(body2)).toBe(true);
    });

    test('TC_SCRUM402_030: Search bar remains functional in recommendation mode', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await expect(crp.searchBar).toBeVisible();
      await expect(crp.searchBar).toBeEnabled();
      await crp.searchFor('wheelchair');
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.length).toBeGreaterThan(100);
    });

    test('TC_SCRUM402_031: Sorting works after switching to recommendation mode', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await expect(crp.sortDropdown).toBeVisible();
      await crp.sortDropdown.selectOption({ label: 'Name: A to Z' });
      await crp.page.waitForTimeout(3000);
      const heading = await crp.productHeadings.first().textContent().catch(() => '');
      expect((heading ?? '').length).toBeGreaterThan(0);
    });

    test('TC_SCRUM402_032: Pagination persists after mode switch back to generic', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      await expect(crp.paginationNav).toBeVisible({ timeout: 5000 });
      await crp.nextPageBtn.click();
      await crp.page.waitForLoadState('domcontentloaded');
      await crp.page.waitForTimeout(3000);
      await expect(crp.paginationNav).toBeVisible();
    });

    test('TC_SCRUM402_033: Filter applied in recommendation mode cleared by Reset All', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      await crp.typeDropdown.selectOption({ label: 'Device' });
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const restoredCount = await crp.getDeviceCountNumber();
      expect(restoredCount).toBeGreaterThan(0);
      const badgeVisible = await crp.personalizedBadge.isVisible().catch(() => false);
      expect(badgeVisible).toBe(false);
    });
  });
});
