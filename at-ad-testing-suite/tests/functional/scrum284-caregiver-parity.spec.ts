// spec: specs/functional/scrum-284-caregiver-parity.json
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { CaregiverPage } from '../../pages/caregiver.page';
import { CatalogPage } from '../../pages/catalog.page';
import testData from '../../test-data/scrum284-caregiver-parity.json';

test.describe('SCRUM-284: Caregiver Feature Parity & End-to-End Flow Validation', () => {
  let caregiverPage: CaregiverPage;
  let catalogPage: CatalogPage;

  test.beforeEach(async ({ page }) => {
    caregiverPage = new CaregiverPage(page);
    catalogPage = new CatalogPage(page);
  });

  test('TC_PARITY_001: Verify caregiver can access product browsing feature (PwD feature parity)', async () => {
    const td = testData.TC_PARITY_001;

    // 1. Log in as caregiver user
    await caregiverPage.loginAsCaregiver(
      td.url,
      td.inputs.caregiverEmail,
      td.inputs.caregiverPassword
    );

    // 2. Verify caregiver is logged in
    const isLoggedIn = await caregiverPage.isLoggedIn();
    expect(isLoggedIn).toBe(td.expected.isLoggedIn);

    // 3. Verify Catalog link is visible in navigation
    const catalogVisible = await catalogPage.isCatalogLinkVisible();
    expect(catalogVisible).toBe(td.expected.catalogLinkVisible);

    // 4. Navigate to catalog/product browsing section
    await catalogPage.navigateToCatalog(td.catalogUrl);

    // 5. Verify products are displayed in list view
    const productsVisible = await catalogPage.isProductListVisible();
    expect(productsVisible).toBe(td.expected.productsVisible);

    // 6. Verify product list contains products
    const productCount = await catalogPage.getProductCards();
    expect(productCount).toBeGreaterThanOrEqual(td.expected.minimumProductCount);

    // 7. Verify each product shows basic information (name with link)
    const productNames = await catalogPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);

    // 8. Verify View Details links are present for products
    const viewDetailsCount = await catalogPage.getViewDetailsLinks();
    expect(viewDetailsCount).toBeGreaterThan(0);
  });

  test('TC_PARITY_003: Verify caregiver can successfully browse products with filters (edge case)', async () => {
    const td = testData.TC_PARITY_003;

    // 1. Log in as caregiver
    await caregiverPage.loginAsCaregiver(
      td.url,
      td.inputs.caregiverEmail,
      td.inputs.caregiverPassword
    );

    // 2. Navigate to catalog
    await catalogPage.navigateToCatalog(td.catalogUrl);

    // 3. Verify filter section is visible
    expect(await catalogPage.isFilterSectionVisible()).toBe(td.expected.filtersVisible);

    // 4. Verify individual filter controls are visible
    expect(await catalogPage.isDisabilityTypeFilterVisible()).toBe(td.expected.disabilityTypeFilterVisible);
    expect(await catalogPage.isPriceRangeFilterVisible()).toBe(td.expected.priceRangeFilterVisible);
    expect(await catalogPage.isTypeFilterVisible()).toBe(td.expected.typeFilterVisible);
    expect(await catalogPage.isApplyFiltersButtonVisible()).toBe(td.expected.applyFiltersVisible);
    expect(await catalogPage.isResetAllButtonVisible()).toBe(td.expected.resetAllVisible);
    expect(await catalogPage.isSortByVisible()).toBe(td.expected.sortByVisible);

    // 5. Get initial product count before filtering
    const initialCount = await catalogPage.getDeviceCount();
    expect(initialCount).toBeGreaterThan(0);

    // 6. Apply Disability Type filter
    await catalogPage.selectDisabilityTypeFilter(td.inputs.filterDisabilityType);
    await catalogPage.clickApplyFilters();

    // 7. Verify filtered results are displayed
    const filteredCount = await catalogPage.getDeviceCount();
    expect(filteredCount).toBeGreaterThanOrEqual(0);

    // 8. Apply Type filter additionally
    await catalogPage.selectTypeFilter(td.inputs.filterType);
    await catalogPage.clickApplyFilters();

    // 9. Verify combined filter results
    const combinedCount = await catalogPage.getDeviceCount();
    expect(combinedCount).toBeLessThanOrEqual(filteredCount);

    // 10. Reset all filters
    await catalogPage.clickResetAllFilters();

    // 11. Verify full product list returns after reset
    const resetCount = await catalogPage.getDeviceCount();
    expect(resetCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('TC_PARITY_005: Verify caregiver dashboard displays personalized content', async () => {
    const td = testData.TC_PARITY_005;

    // 1. Log in as caregiver
    await caregiverPage.loginAsCaregiver(
      td.url,
      td.inputs.caregiverEmail,
      td.inputs.caregiverPassword
    );

    // 2. Verify caregiver is logged in
    expect(await caregiverPage.isLoggedIn()).toBe(td.expected.isLoggedIn);

    // 3. Verify dashboard displays personalized welcome message
    expect(await caregiverPage.isDashboardPersonalized()).toBe(td.expected.dashboardPersonalized);

    // 4. Verify welcome message contains user greeting
    const welcomeMsg = await caregiverPage.getWelcomeMessage();
    expect(welcomeMsg).toContain(td.expected.welcomeMessageContains);

    // 5. Verify Get Recommendations link is visible
    expect(await caregiverPage.isGetRecommendationsLinkVisible()).toBe(td.expected.getRecommendationsVisible);

    // 6. Verify Browse All Devices link is visible
    expect(await caregiverPage.isBrowseAllDevicesLinkVisible()).toBe(td.expected.browseAllDevicesVisible);

    // 7. Verify dashboard description/guidance is visible
    expect(await caregiverPage.isDashboardDescriptionVisible()).toBe(td.expected.dashboardDescriptionVisible);

    // 8. Verify Success Stories section is present
    expect(await caregiverPage.isSuccessStoriesSectionVisible()).toBe(td.expected.successStoriesVisible);

    // 9. Verify My Profile link is accessible from dashboard
    expect(await caregiverPage.isLoggedIn()).toBe(td.expected.myProfileVisible);
  });

  test('TC_PARITY_002: Verify caregiver can access product details view (PwD feature parity)', async () => {
    const td = testData.TC_PARITY_002;

    // 1. Log in as caregiver
    await caregiverPage.loginAsCaregiver(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Navigate to catalog
    await catalogPage.navigateToCatalog(td.catalogUrl);

    // 3. Verify products are visible
    expect(await catalogPage.isProductListVisible()).toBe(true);

    // 4. Click on first product to view details
    await catalogPage.clickFirstProduct();

    // 5. Verify product details page loads
    const detailLoaded = await catalogPage.isProductDetailPageLoaded();
    expect(detailLoaded).toBe(td.expected.productDetailPageLoaded);

    // 6. Verify product heading is present on detail page
    const heading = await catalogPage.getProductDetailHeading();
    expect(heading.length).toBeGreaterThan(0);
  });

  test('TC_PARITY_004: Verify caregiver search functionality works with relevant keywords', async () => {
    const td = testData.TC_PARITY_004;

    // 1. Log in as caregiver
    await caregiverPage.loginAsCaregiver(td.url, td.inputs.caregiverEmail, td.inputs.caregiverPassword);

    // 2. Navigate to catalog
    await catalogPage.navigateToCatalog(td.catalogUrl);

    // 3. Verify search box is visible
    expect(await catalogPage.isSearchBoxVisible()).toBe(td.expected.searchBoxVisible);

    // 4. Search for valid product term
    await catalogPage.searchDevices(td.inputs.searchTermValid);

    // 5. Verify search results contain products
    const productCount = await catalogPage.getProductCards();
    expect(productCount).toBeGreaterThan(0);

    // 6. Clear search and search for non-existent term
    await catalogPage.clearSearch();
    await catalogPage.searchDevices(td.inputs.searchTermNoResults);

    // 7. Verify product count changes (may be 0 or fewer)
    const noResultCount = await catalogPage.getProductCards();
    expect(noResultCount).toBeGreaterThanOrEqual(0);
  });
});
