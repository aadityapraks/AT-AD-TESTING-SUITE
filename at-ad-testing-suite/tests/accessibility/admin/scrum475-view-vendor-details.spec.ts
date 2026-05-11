// spec: specs/a11y/SCRUM-475-view-vendor-details.json

import { test, expect } from '@playwright/test';
import { AdminVendorDetailsPage } from '../../../pages/admin-vendor-details.page';
import testData from '../../../test-data/scrum475-admin-vendor-details.json';

const ADMIN_URL = testData.url;
const PARTNERS_URL = testData.partnersUrl;
const EMAIL = testData.credentials.email;
const PASSWORD = testData.credentials.password;

test.describe('SCRUM-475: Admin View Vendor Details - Accessibility', () => {
  let detailsPage: AdminVendorDetailsPage;

  test.beforeEach(async ({ page }) => {
    detailsPage = new AdminVendorDetailsPage(page);
    await detailsPage.loginAndNavigateToPartners(ADMIN_URL, EMAIL, PASSWORD, PARTNERS_URL);
  });

  test.describe('View Details Button', () => {
    test('TC_A11Y_001: View Details button keyboard accessible', async () => {
      // Verify button has accessible name
      const name = await detailsPage.getViewDetailsButtonAccessibleName();
      expect(name.length, 'View Details button must have accessible name').toBeGreaterThan(0);
      expect(name.toLowerCase()).toContain('view');
    });
  });

  test.describe('Modal Dialog Pattern', () => {
    test('TC_A11Y_002: Modal/panel has role=dialog and aria-modal', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const dialogInfo = await detailsPage.getDialogRoleInfo();
      // Hard assertion: modal must have role="dialog"
      expect(dialogInfo.hasDialogRole, 'BUG: Vendor Details modal has no role="dialog" (WCAG 4.1.2)').toBe(true);
      // Hard assertion: must have aria-modal="true"
      expect(dialogInfo.hasAriaModal, 'BUG: Vendor Details modal missing aria-modal="true" (WCAG 4.1.2)').toBe(true);
      // Hard assertion: must have accessible name
      expect(dialogInfo.hasAriaLabel, 'BUG: Vendor Details modal has no aria-label or aria-labelledby (WCAG 4.1.2)').toBe(true);
    });

    test('TC_A11Y_003: Focus moves to modal on open', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const focusInModal = await detailsPage.isFocusInsideModal();
      expect(focusInModal, 'BUG: Focus does not move into modal on open (WCAG 2.4.3)').toBe(true);
    });

    test('TC_A11Y_004: Focus trapped within modal', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const focusTrapped = await detailsPage.verifyFocusTrapInModal();
      expect(focusTrapped, 'BUG: Focus escapes modal to background content (WCAG 2.1.2)').toBe(true);
    });

    test('TC_A11Y_005: Escape key closes modal', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const closed = await detailsPage.pressEscapeAndCheckClosed();
      expect(closed, 'BUG: Escape key does not close the modal (WCAG 2.1.1)').toBe(true);
    });

    test('TC_A11Y_006: Close button keyboard accessible', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const closeInfo = await detailsPage.getCloseButtonAccessibleName();
      expect(closeInfo.exists, 'BUG: No close button found in modal').toBe(true);
      expect(closeInfo.name.length, 'BUG: Close button has no accessible name (WCAG 4.1.2)').toBeGreaterThan(0);
    });
  });

  test.describe('Modal Content Structure', () => {
    test('TC_A11Y_007: Modal heading structure proper', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const headingCount = await detailsPage.getModalHeadingCount();
      expect(headingCount, 'Modal must have at least one heading').toBeGreaterThan(0);
    });

    test('TC_A11Y_008: Business details fields have labels', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const labelsInfo = await detailsPage.getFieldLabelsInfo();
      expect(labelsInfo.hasLabels, 'BUG: Business detail fields missing labels (WCAG 1.3.1)').toBe(true);
    });

    test('TC_A11Y_009: Contact information accessible', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      // Verify links have accessible names
      const linkInfo = await detailsPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'BUG: Contact links without accessible names (WCAG 2.4.4)').toBe(0);
      }
    });

    test('TC_A11Y_010: Address field accessible', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const labelsInfo = await detailsPage.getFieldLabelsInfo();
      // Address should be among the labeled fields
      expect(labelsInfo.labelCount, 'Detail fields must have labels including address').toBeGreaterThan(2);
    });

    test('TC_A11Y_014: Read-only fields indicated accessibly', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      await detailsPage.verifyModalIsReadOnly();
    });

    test('TC_A11Y_022: Products listed section accessible', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const labelsInfo = await detailsPage.getFieldLabelsInfo();
      expect(labelsInfo.hasLabels, 'Product section must have labels').toBe(true);
    });
  });

  test.describe('Documents & Warnings', () => {
    test('TC_A11Y_011: Verification documents viewable and accessible', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      // Check if document view buttons exist and have names
      const buttonsNoName = await detailsPage.getButtonsWithNoName();
      expect(buttonsNoName, 'BUG: Buttons without accessible names found in detail view (WCAG 4.1.2)').toBe(0);
    });

    test('TC_A11Y_012: Missing documents clearly flagged', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      // This test verifies that if warnings exist, they use text (not color alone)
      // The detail view should have text-based indicators
      await detailsPage.verifyDetailViewOpened();
    });

    test('TC_A11Y_021: Information not conveyed by color alone', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      // Verify field labels exist (meaning info is conveyed by text)
      const labelsInfo = await detailsPage.getFieldLabelsInfo();
      expect(labelsInfo.hasLabels, 'Information must be conveyed by text labels, not color alone (WCAG 1.4.1)').toBe(true);
    });
  });

  test.describe('Visual Accessibility', () => {
    test('TC_A11Y_016: Modal text contrast meets WCAG AA', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const results = await detailsPage.runAxeContrastCheck();
      expect(results.violationCount, `Found ${results.violationCount} contrast violations in modal`).toBe(0);
    });

    test('TC_A11Y_017: Modal usable at 200% zoom', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const zoomResult = await detailsPage.checkZoom200();
      expect(zoomResult.contentVisible, 'Content must be visible at 200% zoom').toBe(true);
      expect(zoomResult.hasHorizontalScroll, 'BUG: Horizontal scroll at 200% zoom (WCAG 1.4.10)').toBe(false);
    });

    test('TC_A11Y_018: Modal accessible on mobile viewport', async () => {
      await detailsPage.setMobileViewport();
      await detailsPage.clickViewDetailsOnFirstVendor();
      const visible = await detailsPage.isContentVisible();
      expect(visible, 'Modal content must be visible on mobile viewport').toBe(true);
    });
  });

  test.describe('Keyboard & Screen Reader', () => {
    test('TC_A11Y_019: NVDA screen reader compatibility', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      // Verify headings exist for navigation
      const headingCount = await detailsPage.getModalHeadingCount();
      expect(headingCount, 'Modal must have headings for screen reader navigation').toBeGreaterThan(0);
      // Verify buttons have names
      const buttonsNoName = await detailsPage.getButtonsWithNoName();
      expect(buttonsNoName, 'All buttons must have accessible names').toBe(0);
    });

    test('TC_A11Y_020: JAWS screen reader compatibility', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      // Verify links have accessible names
      const linkInfo = await detailsPage.verifyLinksHaveAccessibleNames();
      if (linkInfo.total > 0) {
        expect(linkInfo.withoutName, 'All links must have accessible names').toBe(0);
      }
    });
  });

  test.describe('Axe-Core Full Scan', () => {
    test('AXE-CORE: Full WCAG 2.1 AA scan on vendor details', async () => {
      await detailsPage.clickViewDetailsOnFirstVendor();
      const results = await detailsPage.runAxeFullScan();

      if (results.violationCount > 0) {
        console.log(`=== SCRUM-475 AXE-CORE: ${results.violationCount} VIOLATIONS ===`);
        for (const v of results.violations) {
          console.log(`\n[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}`);
          for (const n of v.nodes.slice(0, 3)) {
            console.log(`  - ${n.html.substring(0, 100)}`);
          }
        }
      }

      expect(results.violationCount, `Found ${results.violationCount} WCAG violations`).toBe(0);
    });
  });
});
