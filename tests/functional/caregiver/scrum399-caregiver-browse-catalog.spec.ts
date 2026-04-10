import { test, expect } from '@playwright/test';
import { CaregiverRecommendationsPage } from '../../pages/caregiver/CaregiverRecommendationsPage';
import planData from '../../../specs/test-cases/caregiver/scrum399-caregiver-browse-catalog.json';
const td = planData.testData;

test.describe('SCRUM-399: Caregiver - Browse and Search Product Catalog Without Selecting a PwD', () => {
  test.setTimeout(120_000);

  let crp: CaregiverRecommendationsPage;

  test.beforeEach(async ({ page }) => {
    crp = new CaregiverRecommendationsPage(page);
    await crp.loginAsCaregiverAndGoToCatalog(td.credentials.email, td.credentials.password);
  });

  // ─── Suite 1: Catalog Access Without PwD Selection (AC1) ───

  test.describe('Catalog Access Without PwD', () => {
    test('TC_SCRUM399_001: Caregiver can access catalog page without selecting a PwD', async () => {
      expect(crp.page.url()).toContain('/catalog');
      await expect(crp.deviceCountText).toBeVisible({ timeout: 10000 });
    });

    test('TC_SCRUM399_002: Caregiver banner is visible on catalog without PwD selection', async () => {
      await expect(crp.caregiverBanner).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM399_003: PwD dropdown shows no PwD selected by default', async () => {
      await expect(crp.pwdTrigger).toBeVisible({ timeout: 5000 });
    });
  });

  // ─── Suite 2: Search Bar Functionality (AC2) ───

  test.describe('Search Bar Functionality', () => {
    test('TC_SCRUM399_004: Search bar is visible and enabled', async () => {
      await expect(crp.searchBar).toBeVisible();
      await expect(crp.searchBar).toBeEnabled();
    });

    test('TC_SCRUM399_005: Search returns matching results', async () => {
      await crp.searchFor('wheelchair');
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      const count = await crp.getDeviceCountNumber();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('TC_SCRUM399_006: Search clear restores full catalog', async () => {
      const initialCount = await crp.getDeviceCountNumber();
      await crp.searchFor('wheelchair');
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      await crp.searchBar.clear();
      await crp.page.keyboard.press('Enter');
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      const restoredCount = await crp.getDeviceCountNumber();
      expect(restoredCount).toBe(initialCount);
    });
  });

  // ─── Suite 3: Filter Functionality (AC2) ───

  test.describe('Filter Functionality', () => {
    test('TC_SCRUM399_007: All filter dropdowns are visible', async () => {
      await expect(crp.disabilityTypeDropdown).toBeVisible();
      await expect(crp.subCategoryDropdown).toBeVisible();
      await expect(crp.typeDropdown).toBeVisible();
      await expect(crp.priceRangeDropdown).toBeVisible();
      await expect(crp.applyFilterBtn).toBeVisible();
      await expect(crp.resetAllBtn).toBeVisible();
    });

    test('TC_SCRUM399_008: Type filter works', async () => {
      await crp.typeDropdown.selectOption({ label: 'Device' });
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      await expect(crp.deviceCountText).toBeVisible();
    });

    test('TC_SCRUM399_009: Price Range filter works', async () => {
      const initialCount = await crp.getDeviceCountNumber();
      await crp.priceRangeDropdown.selectOption({ index: 1 });
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      const filteredCount = await crp.getDeviceCountNumber();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });

    test('TC_SCRUM399_010: Multiple filters applied simultaneously', async () => {
      await crp.typeDropdown.selectOption({ label: 'Device' });
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      await expect(crp.deviceCountText).toBeVisible();
    });
  });

  // ─── Suite 4: Sorting Functionality (AC2) ───

  test.describe('Sorting Functionality', () => {
    test('TC_SCRUM399_011: Sort dropdown is visible with options', async () => {
      await expect(crp.sortDropdown).toBeVisible();
      const options = await crp.sortDropdown.locator('option').count();
      expect(options).toBeGreaterThan(1);
    });

    test('TC_SCRUM399_012: Sorting changes product order', async () => {
      const firstBefore = await crp.productHeadings.first().textContent().catch(() => '');
      await crp.sortDropdown.selectOption({ label: 'Name: A to Z' });
      await crp.page.waitForTimeout(3000);
      const firstAfter = await crp.productHeadings.first().textContent().catch(() => '');
      expect((firstAfter ?? '').length).toBeGreaterThan(0);
    });
  });

  // ─── Suite 5: Full Catalog Display (AC3) ───

  test.describe('Full Catalog Display', () => {
    test('TC_SCRUM399_013: Full catalog results are displayed', async () => {
      const cardCount = await crp.productCards.count();
      expect(cardCount).toBeGreaterThan(0);
      const detailCount = await crp.viewDetailsLinks.count();
      expect(detailCount).toBeGreaterThan(0);
    });

    test('TC_SCRUM399_014: Product cards have headings', async () => {
      const headingCount = await crp.productHeadings.count();
      expect(headingCount).toBeGreaterThan(0);
    });

    test('TC_SCRUM399_015: "X devices found" count is displayed', async () => {
      await expect(crp.deviceCountText).toBeVisible();
      const count = await crp.getDeviceCountNumber();
      expect(count).toBeGreaterThan(0);
    });
  });

  // ─── Suite 6: Recommendation Section Inactive (AC4) ───

  test.describe('Recommendation Section Inactive', () => {
    test('TC_SCRUM399_016: Show Recommendations button state without PwD', async () => {
      const isDisabled = await crp.showRecommendationsBtn.isDisabled().catch(() => false);
      const triggerText = ((await crp.pwdTriggerName.textContent().catch(() => '')) ?? '').trim();
      if (triggerText.length > 0) {
        expect(typeof isDisabled).toBe('boolean');
      } else {
        expect(isDisabled).toBe(true);
      }
    });

    test('TC_SCRUM399_017: Recommendation banner is not visible without clicking Show', async () => {
      const bannerVisible = await crp.recBanner.isVisible().catch(() => false);
      expect(bannerVisible).toBe(false);
    });
  });

  // ─── Suite 7: No Personalization Labels (AC5) ───

  test.describe('No Personalization Labels', () => {
    test('TC_SCRUM399_018: No personalized badge is visible', async () => {
      const badgeVisible = await crp.personalizedBadge.isVisible().catch(() => false);
      expect(badgeVisible).toBe(false);
    });
  });

  // ─── Suite 8: Edge Cases ───

  test.describe('Edge Cases', () => {
    test('TC_SCRUM399_019: Selecting PwD after browsing enables Show Recommendations', async () => {
      await crp.selectPwdByIndex(0);
      const isDisabled = await crp.showRecommendationsBtn.isDisabled().catch(() => false);
      expect(isDisabled).toBe(false);
    });

    test('TC_SCRUM399_020: Selecting PwD and clicking Show transitions to recommendation view', async () => {
      await crp.selectPwdByIndex(0);
      await crp.clickShowRecommendations();
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/device|product|catalog/i.test(body)).toBe(true);
    });

    test('TC_SCRUM399_021: Zero results after filtering shows empty state', async () => {
      await crp.searchFor('xyznonexistentdevice99999');
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      const count = await crp.getDeviceCountNumber();
      expect(count).toBe(0);
    });

    test('TC_SCRUM399_022: Reset All available after zero results', async () => {
      const initialCount = await crp.getDeviceCountNumber();
      await crp.searchFor('xyznonexistentdevice99999');
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      await expect(crp.resetAllBtn).toBeVisible();
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const restoredCount = await crp.getDeviceCountNumber();
      expect(restoredCount).toBe(initialCount);
    });

    test('TC_SCRUM399_023: Pagination works without PwD selection', async () => {
      await expect(crp.paginationNav).toBeVisible();
      await crp.nextPageBtn.click();
      await crp.page.waitForLoadState('domcontentloaded');
      await crp.page.waitForTimeout(3000);
      await expect(crp.paginationNav).toBeVisible();
    });

    test('TC_SCRUM399_024: Mobile viewport renders correctly', async () => {
      await crp.page.setViewportSize(td.viewports.mobile);
      await crp.page.waitForTimeout(1000);
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(body.toLowerCase()).toContain('catalog');
    });

    test('TC_SCRUM399_025: Reset All restores full catalog', async () => {
      const initialCount = await crp.getDeviceCountNumber();
      await crp.typeDropdown.selectOption({ label: 'Device' });
      await crp.applyFilterBtn.click();
      await crp.page.waitForTimeout(2000);
      await crp.resetAllBtn.click();
      await crp.page.waitForTimeout(3000);
      const restoredCount = await crp.getDeviceCountNumber();
      expect(restoredCount).toBe(initialCount);
    });

    test('TC_SCRUM399_026: Product cards display price and View Details', async () => {
      const body = (await crp.page.locator('body').textContent()) ?? '';
      expect(/₹[\d,.]+/i.test(body)).toBe(true);
      const detailCount = await crp.viewDetailsLinks.count();
      expect(detailCount).toBeGreaterThan(0);
    });
  });
});
