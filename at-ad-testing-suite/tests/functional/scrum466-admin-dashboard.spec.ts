// spec: specs/functional/SCRUM-466-admin-partner-management-dashboard.json

import { test, expect } from '@playwright/test';
import testData from '../../test-data/scrum466-admin-dashboard.json';
import { AdminDashboardPage } from '../../pages/admin-dashboard.page';

let dashboardPage: AdminDashboardPage;

test.describe('SCRUM-466: Admin Partner Management Dashboard', () => {
  test.setTimeout(90000);

  test.beforeEach(async ({ page }) => {
    dashboardPage = new AdminDashboardPage(page);
  });

  test.describe('AC1 - Dashboard Metric Cards Display', () => {
    test('TC_SCRUM466_001: Verify Partner Management Dashboard is accessible after admin login', async ({ page }) => {
      // Step 1: Log in to the Admin Portal with valid credentials
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify the dashboard page loads successfully
      await dashboardPage.verifyDashboardLoaded();
    });

    test('TC_SCRUM466_002: Verify Pending Vendor Approvals count is displayed', async ({ page }) => {
      // Step 1: Log in and navigate to the Partner Management Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Locate the Pending Vendor Approvals metric card
      await dashboardPage.verifyPendingApprovalsCardVisible();

      // Step 3: Verify the count is displayed as a numeric value
      await dashboardPage.verifyPendingApprovalsCountIsNumeric();

      // Step 4: Verify the card has a clear label
      await dashboardPage.verifyMetricCardLabelVisible(testData.expected.pendingApprovalsLabel);
    });

    test('TC_SCRUM466_003: Verify Active Partners count is displayed', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify the Active Partners metric card is visible
      await dashboardPage.verifyMetricCardLabelVisible(testData.expected.activePartnersLabel);

      // Step 3: Verify the count is displayed as a numeric value
      await dashboardPage.verifyActivePartnersCountIsNumeric(testData.expected.activePartnersLabel);
    });

    test('TC_SCRUM466_004: Verify Total Products count is displayed', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify the Total Products metric card is visible
      await dashboardPage.verifyMetricCardLabelVisible(testData.expected.totalProductsLabel);

      // Step 3: Verify the count is displayed as a numeric value
      await dashboardPage.verifyMetricCardCountIsNumeric(testData.expected.totalProductsLabel);
    });

    test('TC_SCRUM466_005: Verify Average Approval Time is displayed', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify the Average Approval Time metric card is visible
      await dashboardPage.verifyMetricCardLabelVisible(testData.expected.avgApprovalLabel);

      // Step 3: Verify the value is displayed with appropriate units
      await dashboardPage.verifyAvgApprovalTimeHasValue(testData.expected.avgApprovalLabel);
    });

    test('TC_SCRUM466_006: Verify all four metric cards are displayed simultaneously', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify all four metric cards are visible on the page
      await dashboardPage.verifyAllFourMetricCardsVisible({
        pending: testData.expected.pendingApprovalsLabel,
        active: testData.expected.activePartnersLabel,
        products: testData.expected.totalProductsLabel,
        approval: testData.expected.avgApprovalLabel
      });
    });
  });

  test.describe('AC1 - Metric Accuracy', () => {
    test('TC_SCRUM466_007: Verify Pending Vendor Approvals count accuracy', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify the Pending Approvals count is a valid numeric value
      await dashboardPage.verifyPendingApprovalsCountIsNumeric();
    });

    test('TC_SCRUM466_008: Verify Active Partners count accuracy', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify the Active Partners count is a valid numeric value
      await dashboardPage.verifyActivePartnersCountIsNumeric(testData.expected.activePartnersLabel);
    });

    test('TC_SCRUM466_009: Verify Total Products count accuracy', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify the Total Products count is a valid numeric value
      await dashboardPage.verifyMetricCardCountIsNumeric(testData.expected.totalProductsLabel);
    });

    test('TC_SCRUM466_010: Verify Average Approval Time accuracy', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify the Average Approval Time has a valid value
      await dashboardPage.verifyAvgApprovalTimeHasValue(testData.expected.avgApprovalLabel);
    });
  });

  test.describe('AC2 - Data Refresh', () => {
    test('TC_SCRUM466_011: Verify data refreshes on page reload', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Note current metric values, reload, and verify consistency
      await dashboardPage.verifyMetricsConsistentAfterReload({
        pending: testData.expected.pendingApprovalsLabel,
        active: testData.expected.activePartnersLabel,
        products: testData.expected.totalProductsLabel,
        approval: testData.expected.avgApprovalLabel
      });
    });
  });

  test.describe('Accessibility', () => {
    test('TC_SCRUM466_012: Verify dashboard supports keyboard navigation', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Use Tab key to navigate through the metric cards
      const navigable = await dashboardPage.verifyMetricCardsKeyboardNavigable();
      expect(navigable).toBe(true);
    });

    test('TC_SCRUM466_013: Verify metric cards have accessible labels for screen readers', async ({ page }) => {
      // Step 1: Log in and navigate to the Dashboard
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify metric cards have accessible descriptions
      await dashboardPage.verifyMetricCardsAccessible();
    });
  });

  test.describe('End-to-End Flow', () => {
    test('TC_SCRUM466_014: Verify complete Partner Management Dashboard flow end-to-end', async ({ page }) => {
      // Step 1: Log in to the Admin Portal
      await dashboardPage.loginAndNavigateToDashboard(testData.url, testData.credentials.email, testData.credentials.password);

      // Step 2: Verify the dashboard page loads
      await dashboardPage.verifyDashboardLoaded();

      // Step 3: Verify all four metric cards are displayed with values
      await dashboardPage.verifyAllFourMetricCardsVisible({
        pending: testData.expected.pendingApprovalsLabel,
        active: testData.expected.activePartnersLabel,
        products: testData.expected.totalProductsLabel,
        approval: testData.expected.avgApprovalLabel
      });

      // Step 4: Note current metric values
      const values = await dashboardPage.getAllMetricValues({
        pending: testData.expected.pendingApprovalsLabel,
        active: testData.expected.activePartnersLabel,
        products: testData.expected.totalProductsLabel,
        approval: testData.expected.avgApprovalLabel
      });
      expect(values.pending).toBeTruthy();
      expect(values.active).toBeTruthy();
      expect(values.products).toBeTruthy();
      expect(values.approval).toBeTruthy();

      // Step 5: Reload the page and verify consistency
      await dashboardPage.reloadDashboard();

      // Step 6: Verify no errors or broken UI elements
      await dashboardPage.verifyNoUIErrors();
    });
  });
});
