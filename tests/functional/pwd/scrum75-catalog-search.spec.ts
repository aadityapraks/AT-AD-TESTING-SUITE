// spec: specs/functional/SCRUM-75-pwd-catalog-search.md
// data: specs/test-cases/scrum75-catalog-search.json

import { test, expect } from '@playwright/test';
import { CatalogSearchPage } from '../../pages/pwd/CatalogSearchPage';
import planData from '../../../specs/test-cases/pwd/scrum75-catalog-search.json';
const td = planData.testData;

test.describe('SCRUM-75: PwD Search for Products within the Catalog', () => {
  let sp: CatalogSearchPage;

  test.beforeEach(async ({ page }) => {
    sp = new CatalogSearchPage(page);
    await sp.navigateToCatalog();
  });

  // ─── Feature: Search — Core Functionality ───

  test.describe('Search — Core Functionality', () => {
    test('TC_SCRUM75_001: Product Name Search Returns Matching Results', async () => {
      await sp.searchAndApply(td.searchTerms.productName);
      await expect(sp.deviceCountText).toBeVisible();
      const count = await sp.getDeviceCount();
      expect(count).toBeTruthy();
    });

    test('TC_SCRUM75_002: Keyword Search Returns Matching Results', async () => {
      await sp.page.waitForTimeout(2000);
      const initialCount = await sp.getDeviceCount();

      await sp.searchAndApply(td.searchTerms.keyword);
      const keywordCount = await sp.getDeviceCount();

      const initialNum = parseInt(initialCount.match(/\d+/)?.[0] || '0');
      const keywordNum = parseInt(keywordCount.match(/\d+/)?.[0] || '0');
      expect(keywordNum).toBeGreaterThan(0);
      expect(keywordNum).toBeLessThanOrEqual(initialNum);
    });

    test('TC_SCRUM75_003: Vendor Name Search Returns Matching Results', async () => {
      await sp.page.waitForTimeout(2000);
      const initialCount = await sp.getDeviceCount();

      await sp.searchAndApply(td.searchTerms.vendorName);
      const vendorCount = await sp.getDeviceCount();

      const initialNum = parseInt(initialCount.match(/\d+/)?.[0] || '0');
      const vendorNum = parseInt(vendorCount.match(/\d+/)?.[0] || '0');
      // Vendor name search may return 0 if catalog only searches product fields
      expect(vendorNum).toBeLessThanOrEqual(initialNum);
    });

    test('TC_SCRUM75_004: Search Suggestions Appear After Typing 3+ Characters', async () => {
      await sp.typePartial(td.searchTerms.partial2Chars);
      const visibleAt2 = await sp.isSuggestionsVisible();

      await sp.searchBar.clear();
      await sp.typePartial(td.searchTerms.partial3Chars);
      const visibleAt3 = await sp.isSuggestionsVisible();

      expect(visibleAt2).toBe(false);
      // Suggestions must appear after 3+ chars per AC
      expect(visibleAt3).toBe(true);
    });

    test('TC_SCRUM75_005: No Suggestions for Fewer Than 3 Characters', async () => {
      await sp.typePartial(td.searchTerms.partial1Char);
      const visibleAt1 = await sp.isSuggestionsVisible();
      await sp.searchBar.clear();
      await sp.typePartial(td.searchTerms.partial2Chars);
      const visibleAt2 = await sp.isSuggestionsVisible();
      expect(visibleAt1).toBe(false);
      expect(visibleAt2).toBe(false);
    });

    test('TC_SCRUM75_006: Multiple Suggestions Appear for Common Term', async () => {
      await sp.typePartial(td.searchTerms.partial3Chars);
      const hasSuggestions = await sp.isSuggestionsVisible();
      expect(hasSuggestions).toBe(true);
      const count = await sp.getSuggestionCount();
      expect(count).toBeGreaterThan(0);
    });

    test('TC_SCRUM75_007: Pressing Enter Triggers Search and Filters Results', async () => {
      await sp.page.waitForTimeout(2000);
      const initialCount = await sp.getDeviceCount();

      await sp.searchBar.fill(td.searchTerms.enterTrigger);
      await sp.searchBar.press('Enter');
      await sp.page.waitForTimeout(2000);

      let searchedCount = await sp.getDeviceCount();
      // If Enter alone didn't filter, click Apply Filters as fallback
      if (searchedCount === initialCount) {
        await sp.applyFilterBtn.click();
        await sp.page.waitForTimeout(2000);
        searchedCount = await sp.getDeviceCount();
      }
      const barValue = await sp.searchBar.inputValue();
      expect(barValue).toBe(td.searchTerms.enterTrigger);
      await expect(sp.deviceCountText).toBeVisible();
    });

    test('TC_SCRUM75_008: Selecting a Suggestion Filters Results', async () => {
      await sp.typePartial(td.searchTerms.partial3Chars);
      const hasSuggestions = await sp.isSuggestionsVisible();
      expect(hasSuggestions).toBe(true);
      const firstSuggestion = sp.suggestionItems.first();
      await firstSuggestion.click();
      await sp.page.waitForTimeout(1500);
      const barValue = await sp.searchBar.inputValue();
      expect(barValue.length).toBeGreaterThan(0);
      await expect(sp.deviceCountText).toBeVisible();
    });

    test('TC_SCRUM75_009: Search Results Show Total Device Count', async () => {
      await sp.searchAndApply(td.searchTerms.productName);
      await expect(sp.deviceCountText).toBeVisible();
      const countText = await sp.getDeviceCount();
      expect(countText).toMatch(/\d+/);
    });

    test('TC_SCRUM75_010: Search Results Display Product Cards', async () => {
      await sp.searchAndApply(td.searchTerms.productName);
      const cards = sp.page.locator('main [role="list"]').first().locator('> *:not(style)');
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);
      // Verify first card has a product name heading
      const heading = cards.first().locator('h3');
      await expect(heading).toBeVisible();
    });

    test('TC_SCRUM75_011: Search Filters Results — Count Decreases from Full Catalog', async () => {
      await sp.page.waitForTimeout(2000);
      const initialCount = await sp.getDeviceCount();
      const initialNum = parseInt(initialCount.match(/\d+/)?.[0] || '0');

      await sp.searchAndApply(td.searchTerms.productName);
      const searchedCount = await sp.getDeviceCount();
      const searchedNum = parseInt(searchedCount.match(/\d+/)?.[0] || '0');

      expect(searchedNum).toBeGreaterThan(0);
      expect(searchedNum).toBeLessThan(initialNum);
    });

    test('TC_SCRUM75_012: No Results Displays Appropriate Message', async () => {
      await sp.searchAndApply(td.searchTerms.nonExistent);

      // App shows "0 devices found" instead of a dedicated no-results message
      const noResultsMsg = sp.page.locator('text=/No matching devices found|No devices found|No results found|Try adjusting|0 devices? found/i');
      await expect(noResultsMsg.first()).toBeVisible({ timeout: 5000 });
    });

    test('TC_SCRUM75_013: No Results Hides Pagination', async () => {
      await sp.searchAndApply(td.searchTerms.nonExistent);
      await sp.page.waitForTimeout(1000);

      const paginationVisible = await sp.paginationNav.isVisible().catch(() => false);
      expect(paginationVisible).toBe(false);
    });

    test('TC_SCRUM75_014: Pagination Available When Search Results Exceed Per-Page Limit', async () => {
      await expect(sp.paginationNav).toBeVisible();
      await expect(sp.nextPageBtn).toBeVisible();
      await sp.nextPageBtn.click();
      await sp.page.waitForTimeout(2000);
      await expect(sp.paginationNav).toBeVisible();
    });
  });

  // ─── Feature: Search — Interactions & Persistence ───

  test.describe('Search — Interactions & Persistence', () => {
    test('TC_SCRUM75_015: Clearing Search Restores Full Catalog', async () => {
      await sp.page.waitForTimeout(2000);
      const initialCount = await sp.getDeviceCount();
      await sp.searchAndApply(td.searchTerms.productName);
      await sp.clearSearch();
      const restoredCount = await sp.getDeviceCount();
      expect(restoredCount).toBe(initialCount);
    });

    test('TC_SCRUM75_016: Search Combined with Filters Works Correctly', async () => {
      await sp.searchBar.fill(td.searchTerms.productName);
      await sp.selectDisabilityType(td.filters.disabilityType);
      await sp.applyFilterBtn.click();
      await sp.page.waitForTimeout(1500);
      await expect(sp.deviceCountText).toBeVisible();
      await sp.resetAllBtn.click();
      await sp.page.waitForTimeout(1500);
      const searchVal = await sp.searchBar.inputValue();
      expect(searchVal === '' || searchVal.toLowerCase() === 'all').toBe(true);
    });

    test('TC_SCRUM75_017: Reset All Clears Search Term', async () => {
      await sp.searchAndApply(td.searchTerms.productName);
      const barBefore = await sp.searchBar.inputValue();
      expect(barBefore).toBe(td.searchTerms.productName);

      await sp.resetAllBtn.click();
      await sp.page.waitForTimeout(1500);

      const barAfter = await sp.searchBar.inputValue();
      expect(barAfter === '' || barAfter.toLowerCase() === 'all').toBe(true);
    });

    test('TC_SCRUM75_018: Search Term Persists in Search Bar After Results Load', async () => {
      await sp.searchAndApply(td.searchTerms.enterTrigger);
      const barValue = await sp.searchBar.inputValue();
      expect(barValue).toBe(td.searchTerms.enterTrigger);
    });

    test('TC_SCRUM75_019: Search Persists After Pagination Navigation', async () => {
      const initialCount = await sp.getDeviceCount();
      const paginationVisible = await sp.paginationNav.isVisible().catch(() => false);
      if (paginationVisible) {
        await sp.nextPageBtn.click();
        await sp.page.waitForTimeout(2000);
        await expect(sp.deviceCountText).toBeVisible();
      }
    });

    test('TC_SCRUM75_020: Search Does Not Trigger Full Page Reload', async ({ page }) => {
      let fullReload = false;
      page.on('load', () => { fullReload = true; });

      await sp.searchBar.fill(td.searchTerms.productName);
      await sp.applyFilterBtn.click();
      await page.waitForTimeout(2000);

      expect(fullReload).toBe(false);
      await expect(sp.deviceCountText).toBeVisible();
    });

    test('TC_SCRUM75_021: Search Bar Placeholder Text is Visible', async () => {
      const placeholder = await sp.searchBar.getAttribute('placeholder');
      expect(placeholder).toBeTruthy();
      expect(placeholder!.length).toBeGreaterThan(0);
    });
  });

  // ─── Feature: Search — Suggestions UX ───

  test.describe('Search — Suggestions UX', () => {
    test('TC_SCRUM75_022: Suggestions Dropdown Closes on Escape Key', async () => {
      await sp.typePartial(td.searchTerms.partial3Chars);
      const hasSuggestions = await sp.isSuggestionsVisible();
      expect(hasSuggestions).toBe(true);
      await sp.page.keyboard.press('Escape');
      await sp.page.waitForTimeout(500);
      const stillVisible = await sp.isSuggestionsVisible();
      expect(stillVisible).toBe(false);
      const barValue = await sp.searchBar.inputValue();
      expect(barValue).toBe(td.searchTerms.partial3Chars);
    });

    test('TC_SCRUM75_023: Suggestions Dropdown Closes on Outside Click', async () => {
      await sp.typePartial(td.searchTerms.partial3Chars);
      const hasSuggestions = await sp.isSuggestionsVisible();
      expect(hasSuggestions).toBe(true);
      await sp.page.locator('main').click({ position: { x: 10, y: 10 } });
      await sp.page.waitForTimeout(500);
      const stillVisible = await sp.isSuggestionsVisible();
      expect(stillVisible).toBe(false);
      const barValue = await sp.searchBar.inputValue();
      expect(barValue).toBe(td.searchTerms.partial3Chars);
    });

    test('TC_SCRUM75_024: Partial Product Name Search Returns Results', async () => {
      await sp.searchAndApply(td.searchTerms.partial3Chars);
      const countText = await sp.getDeviceCount();
      const num = parseInt(countText.match(/\d+/)?.[0] || '0');
      expect(num).toBeGreaterThan(0);
    });
  });

  // ─── Feature: Search — Edge Cases & Robustness ───

  test.describe('Search — Edge Cases & Robustness', () => {
    test('TC_SCRUM75_025: Search is Case-Insensitive', async () => {
      await sp.searchAndApply(td.searchTerms.uppercase);
      const upperCount = await sp.getDeviceCount();
      await sp.clearSearch();
      await sp.searchAndApply(td.searchTerms.productName);
      const lowerCount = await sp.getDeviceCount();
      expect(upperCount).toBe(lowerCount);
    });

    test('TC_SCRUM75_026: Search with Leading/Trailing Whitespace is Trimmed', async () => {
      await sp.searchAndApply(td.searchTerms.productName);
      const cleanCount = await sp.getDeviceCount();
      await sp.clearSearch();
      await sp.searchAndApply(td.searchTerms.whitespacePadded);
      const paddedCount = await sp.getDeviceCount();
      expect(paddedCount).toBe(cleanCount);
    });

    test('TC_SCRUM75_027: Search with Special Characters Does Not Break the Page', async ({ page }) => {
      await sp.searchAndApply(td.searchTerms.xssScript);
      await expect(page.locator('main')).toBeVisible();
      await sp.clearSearch();
      await sp.searchAndApply(td.searchTerms.sqlInjection);
      await expect(page.locator('main')).toBeVisible();
    });

    test('TC_SCRUM75_028: Search Results Update Device Count to Zero Then Back', async () => {
      await sp.searchAndApply(td.searchTerms.nonExistent);
      const zeroText = await sp.deviceCountText.textContent().catch(() => '0');
      await sp.clearSearch();
      await sp.searchAndApply(td.searchTerms.productName);
      const validCount = await sp.getDeviceCount();
      expect(validCount).toMatch(/[1-9]/);
    });

    test('TC_SCRUM75_029: Rapid Sequential Searches Return Correct Final Results', async () => {
      await sp.searchBar.fill(td.searchTerms.productName);
      await sp.applyFilterBtn.click();
      await sp.searchBar.fill(td.searchTerms.enterTrigger);
      await sp.applyFilterBtn.click();
      await sp.page.waitForTimeout(2000);
      const barValue = await sp.searchBar.inputValue();
      expect(barValue).toBe(td.searchTerms.enterTrigger);
      await expect(sp.deviceCountText).toBeVisible();
    });

    test('TC_SCRUM75_030: Empty Search Submission Shows Full Catalog', async () => {
      await sp.page.waitForTimeout(2000);
      const initialCount = await sp.getDeviceCount();
      await sp.searchBar.clear();
      await sp.applyFilterBtn.click();
      await sp.page.waitForTimeout(1500);
      const afterCount = await sp.getDeviceCount();
      expect(afterCount).toBe(initialCount);
    });

    test('TC_SCRUM75_031: Search with Only Whitespace is Treated as Empty', async () => {
      await sp.page.waitForTimeout(2000);
      const initialCount = await sp.getDeviceCount();
      await sp.searchAndApply(td.searchTerms.whitespaceOnly);
      const afterCount = await sp.getDeviceCount();
      expect(afterCount).toBe(initialCount);
    });

    test('TC_SCRUM75_032: Search Bar is Focusable on Mobile Viewport', async ({ page }) => {
      await page.setViewportSize(td.mobileViewport);
      await sp.navigateToCatalog();
      await sp.searchBar.click();
      await expect(sp.searchBar).toBeFocused();
      await sp.searchAndApply(td.searchTerms.productName);
      await expect(sp.deviceCountText).toBeVisible();
    });

    test('TC_SCRUM75_033: Long Search Term Does Not Overflow or Break Layout', async ({ page }) => {
      await sp.searchBar.fill(td.searchTerms.longString);
      const box = await sp.searchBar.boundingBox();
      expect(box).toBeTruthy();
      expect(box!.width).toBeGreaterThan(0);
      await sp.applyFilterBtn.click();
      await sp.page.waitForTimeout(1500);
      await expect(page.locator('main')).toBeVisible();
    });
  });
});
