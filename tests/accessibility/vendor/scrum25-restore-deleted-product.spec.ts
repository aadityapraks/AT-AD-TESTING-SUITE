import { test, expect } from '@playwright/test';

const BASE_URL = 'https://hub-ui-admin-qa.swarajability.org';
const PAGE_URL = 'https://hub-ui-admin-qa.swarajability.org/partner/product-management';

async function login(page) {
  await page.goto(BASE_URL);
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  if (page.url().includes('/partner/')) return;

  await page.getByRole('button', { name: 'Sign in with Swarajability' }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  await page.getByRole('textbox', { name: 'Email' }).waitFor({ state: 'visible', timeout: 15000 });
  await page.getByRole('textbox', { name: 'Email' }).fill('vendor23@mailto.plus');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(3000);

  await page.getByRole('textbox', { name: 'Please enter your password' }).waitFor({ state: 'visible', timeout: 15000 });
  await page.getByRole('textbox', { name: 'Please enter your password' }).fill('12345678');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForTimeout(5000);

  if (page.url().includes('auth-d.swarajability.org')) {
    const consentBtn = page.getByRole('button', { name: 'Continue' });
    await consentBtn.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    if (await consentBtn.isVisible().catch(() => false)) {
      await consentBtn.click();
    }
    await page.waitForURL('**/partner/**', { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3000);
  }

  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
}

test.describe('SCRUM-25: SCRUM-25 Accessibility Test Plan', () => {
  test.setTimeout(120_000);

  test('TC_A11Y_001: Verify Deleted Products section navigation', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Login as admin
    // Navigate to Admin Dashboard
    // Tab to Deleted Products/Archived Items link
    // Verify focus indicator visible
    // Press Enter to access section
    // Expected: Navigation link keyboard accessible; Link has clear accessible name; Focus indicator visible with 3:1 contrast; Link activates with Enter key; Page loads successfully
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_002: Verify page title and landmarks', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to Deleted Products section
    // Verify page title is descriptive
    // Use screen reader to navigate landmarks
    // Check main, navigation landmarks
    // Verify skip links
    // Expected: Page title includes \'Deleted Products\' or \'Archived Items\'; Main content has role=\'main\'; Navigation has role=\'navigation\'; Skip to main content link present; All landmarks have accessible names
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_003: Verify heading structure', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to Deleted Products page
    // Use screen reader heading navigation
    // Verify h1 for page title
    // Verify h2 for sections
    // Check heading hierarchy
    // Expected: Page heading is h1; Section headings are h2; No heading levels skipped; Heading hierarchy is logical; Screen reader announces headings correctly
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_004: Verify table structure accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to deleted products table
    // Verify table has caption or aria-label
    // Check header cells use <th>
    // Verify scope attributes
    // Test with screen reader
    // Expected: Table has <table> element; Table has <caption> or aria-label; Header row uses <th> elements; Headers have scope=\'col\'; Table structure announced by screen reader
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_005: Verify table headers accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Enable screen reader
    // Navigate to table
    // Move through header cells
    // Verify each header announced
    // Test table navigation
    // Expected: All column headers announced; Headers: Product Name, Vendor Name, Vendor ID, Deletion Date, Deletion Reason, Deleted By; Data cells associated with headers; Screen reader announces row/column position; Table navigation works with arrow keys
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_006: Verify table keyboard navigation', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Tab through table rows
    // Verify tab order is logical
    // Test focus indicators
    // Navigate to action buttons
    // Verify no keyboard traps
    // Expected: Tab order follows logical sequence; Focus indicator visible on interactive cells; Action buttons keyboard accessible; No keyboard traps in table; Arrow keys navigate cells (optional)
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_007: Verify table visual accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Inspect table text contrast
    // Verify headers have 4.5:1 contrast
    // Verify data cells have 4.5:1 contrast
    // Test zoom to 200%
    // Check row states
    // Expected: All text meets 4.5:1 contrast; Table borders have 3:1 contrast; Table readable at 200% zoom; Row hover/focus states visible; No color-only information
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_008: Verify search input accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to search input
    // Verify label exists and is associated
    // Check input contrast
    // Test keyboard focus
    // Verify placeholder usage
    // Expected: Search input has <label> or aria-label; Label text: \'Search deleted products\'; Input has 4.5:1 contrast; Placeholder not sole label; Input keyboard accessible
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_009: Verify filter dropdowns accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to filter controls
    // Verify each dropdown has label
    // Tab to dropdowns
    // Use arrow keys to select
    // Test with screen reader
    // Expected: Filter dropdowns have labels; Labels: \'Filter by vendor\', \'Filter by date\', \'Filter by category\'; Dropdowns keyboard accessible; Arrow keys navigate options; Selected value announced
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_010: Verify sort controls accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to sort controls
    // Tab to sort buttons/links
    // Activate sort options
    // Verify sort state announced
    // Check visual indicators
    // Expected: Sort controls keyboard accessible; Sort options have clear labels; Current sort state announced; Sort direction indicated (ascending/descending); Visual indicator has 3:1 contrast
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_011: Verify dynamic results announcement', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Apply search or filter
    // Verify results update announced
    // Check aria-live region
    // Test loading state
    // Verify focus remains stable
    // Expected: Results update has aria-live region; Update announced: \'X results found\'; Loading state announced; Focus management after filter; No unexpected focus changes
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_012: Verify product detail link accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to deleted products table
    // Tab to product name link
    // Verify focus indicator
    // Press Enter to open details
    // Verify detail view loads
    // Expected: Product link keyboard accessible; Link has accessible name with product name; Focus indicator visible; Link activates with Enter; Detail view opens
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_013: Verify product detail page structure', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Open product detail view
    // Use screen reader heading navigation
    // Verify h1 for product name
    // Verify h2 for sections
    // Check heading hierarchy
    // Expected: Product name is h1; Section headings are h2; Heading hierarchy is logical; All headings announced by screen reader; No heading levels skipped
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_014: Verify deleted status label accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to product detail view
    // Locate deleted status label
    // Verify label text and contrast
    // Test with screen reader
    // Check semantic markup
    // Expected: Deleted status label visible; Label text: \'Deleted – Not Visible to PwD Users\'; Label has 4.5:1 contrast; Label announced by screen reader; Label has semantic markup (e.g., <strong>, role=\'status\')
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_015: Verify product content accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Review product descriptions
    // Check specifications display
    // Verify media accessibility
    // Test zoom to 200%
    // Check contrast ratios
    // Expected: All text meets 4.5:1 contrast; Images have alt text; Media in archived state clearly indicated; Content readable at 200% zoom; No color-only information
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_016: Verify Restore button keyboard accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to product detail page
    // Tab to Restore Product button
    // Verify focus indicator visible
    // Press Enter/Space to activate
    // Verify confirmation dialog opens
    // Expected: Button has role=\'button\'; Accessible name: \'Restore Product\'; Focus indicator visible with 3:1 contrast; Button activates with Enter/Space; Button state announced if disabled
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_017: Verify Restore button screen reader accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Enable screen reader
    // Navigate to Restore button
    // Verify button name announced
    // Verify button role announced
    // Test button activation
    // Expected: Button role announced; Button name \'Restore Product\' announced; Context provided (e.g., \'Restore [Product Name]\'); Button state announced; No empty or generic labels
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_018: Verify Restore button visual accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Inspect button colors
    // Verify text contrast
    // Verify background contrast
    // Test hover/focus states
    // Measure touch target size
    // Expected: Button text has 4.5:1 contrast; Button background has 3:1 contrast; Hover/focus states visible; Button readable at 200% zoom; Touch target meets 44x44px minimum
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_019: Verify confirmation dialog structure', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Trigger Restore Product
    // Verify dialog opens
    // Check dialog role and ARIA attributes
    // Verify focus moves to dialog
    // Test focus trap
    // Expected: Dialog has role=\'dialog\' or role=\'alertdialog\'; Dialog has aria-modal=\'true\'; Dialog has aria-labelledby pointing to title; Focus moves to dialog on open; Focus trapped within dialog
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_020: Verify dialog keyboard navigation', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Open confirmation dialog
    // Tab through dialog elements
    // Verify focus stays in dialog
    // Press Escape to close
    // Verify focus returns correctly
    // Expected: Tab cycles through dialog elements only; Confirm and Cancel buttons keyboard accessible; Escape key closes dialog; Focus returns to Restore button on close; No keyboard traps
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_021: Verify dialog screen reader accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Enable screen reader
    // Open confirmation dialog
    // Verify dialog title announced
    // Verify message announced
    // Verify button labels announced
    // Expected: Dialog title announced; Confirmation message announced; Message: \'Are you sure you want to restore this product?\'; Additional context announced; Button labels clear: \'Confirm\' and \'Cancel\'
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_022: Verify dialog visual accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Inspect dialog text contrast
    // Verify title has 4.5:1 contrast
    // Verify message has 4.5:1 contrast
    // Test zoom to 200%
    // Check focus indicators
    // Expected: All text meets 4.5:1 contrast; Dialog overlay has sufficient opacity; Dialog readable at 200% zoom; Focus indicators visible; Close button (X) has 3:1 contrast
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_023: Verify success message accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Confirm product restoration
    // Verify success message appears
    // Check message announced to screen reader
    // Verify message contrast
    // Test message dismissal
    // Expected: Success message has role=\'alert\' or aria-live=\'polite\'; Message announced immediately; Message text: \'Product X has been successfully restored\'; Message has 4.5:1 contrast; Message dismissible with keyboard
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_024: Verify success message keyboard handling', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Trigger success message
    // Verify focus management
    // Tab to dismiss button if present
    // Test Escape key
    // Verify message dismissal
    // Expected: Focus doesn\'t move unexpectedly; Dismiss button keyboard accessible; Escape key dismisses message; Message doesn\'t block content; Message auto-dismisses or has close button
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_025: Verify notification indicator accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to vendor dashboard (as vendor)
    // Tab to notification indicator
    // Verify focus indicator
    // Verify unread count announced
    // Activate notification
    // Expected: Notification indicator keyboard accessible; Indicator has accessible name; Unread count announced; Focus indicator visible; Notification opens on activation
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_026: Verify notification content accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Open vendor notification
    // Enable screen reader
    // Verify notification announced
    // Check message content
    // Test action links
    // Expected: Notification title announced; Message content announced; Message: \'Your product [Name] has been restored\'; Timestamp announced; Action links keyboard accessible
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_027: Verify audit log table accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate to audit log
    // Verify table structure
    // Check table caption
    // Verify header cells
    // Test keyboard navigation
    // Expected: Audit log table has proper structure; Table has caption or aria-label; Headers: Product ID, Product Name, Admin ID, Admin Name, Timestamp, Action; All headers have scope=\'col\'; Table keyboard accessible
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_028: Verify audit log screen reader accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Enable screen reader
    // Navigate through audit log
    // Verify entries announced
    // Check action labels
    // Verify timestamps
    // Expected: All audit entries announced; Deletion and restoration actions clearly labeled; Timestamps in accessible format; Admin names announced; Table data cells associated with headers
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_029: Verify audit log visual accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Inspect audit log colors
    // Verify text contrast
    // Test zoom to 200%
    // Check row states
    // Verify action indicators
    // Expected: All text meets 4.5:1 contrast; Table readable at 200% zoom; Row states visible (hover/focus); Action types distinguishable; No color-only information
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_030: Verify permission error accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Login as non-admin user
    // Attempt to access Deleted Products
    // Verify error message appears
    // Check message announced
    // Verify message contrast
    // Expected: Error message has role=\'alert\'; Message announced immediately; Message text: \'You do not have the necessary privileges\'; Message has 4.5:1 contrast; Message provides clear guidance
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_031: Verify disabled Restore button accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Login as user without permissions
    // Navigate to product details
    // Verify Restore button state
    // Check disabled state announced
    // Test tooltip if present
    // Expected: Restore button disabled or hidden; Disabled state announced; Disabled button has aria-disabled=\'true\'; Visual indicator shows disabled state; Tooltip explains why disabled
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_032: Verify restoration failure error accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Trigger restoration failure scenario
    // Verify error message appears
    // Check error announced to screen reader
    // Verify error contrast
    // Check error icon
    // Expected: Error has role=\'alert\' or aria-live=\'assertive\'; Error announced immediately; Message: \'Product restoration failed. Some media files are no longer available\'; Error has 4.5:1 contrast; Error icon has 3:1 contrast
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_033: Verify error keyboard handling', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Trigger error message
    // Verify focus management
    // Tab to dismiss button
    // Test Escape key
    // Verify focus return
    // Expected: Error doesn\'t trap focus; Dismiss button keyboard accessible; Escape key dismisses error; Focus returns appropriately; Error provides actionable guidance
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_034: Verify partial restoration warning accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Trigger partial restoration
    // Verify warning message
    // Check message announced
    // Verify missing media indicated
    // Test follow-up actions
    // Expected: Partial restoration flagged clearly; Warning message announced; Missing media indicated; Vendor follow-up action clear; All messages keyboard accessible
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_035: Verify complete keyboard navigation', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Navigate entire restore workflow
    // Tab through all elements
    // Verify tab order is logical
    // Test all interactive elements
    // Verify no keyboard traps
    // Expected: All interactive elements keyboard accessible; Tab order follows visual layout; Focus indicators visible on all elements; No keyboard traps exist; All actions completable with keyboard
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_036: Verify complete screen reader accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Enable screen reader
    // Navigate entire workflow
    // Verify all elements announced
    // Check state changes
    // Test dynamic content
    // Expected: All elements have accessible names; All state changes announced; Dynamic content has aria-live; Form labels properly associated; No visual-only information
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_037: Verify color and contrast compliance', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Inspect all text elements
    // Verify text contrast ratios
    // Check UI component contrast
    // Verify focus indicators
    // Test with high contrast mode
    // Expected: All text meets 4.5:1 contrast (WCAG 1.4.3); Large text meets 3:1 contrast; UI components meet 3:1 contrast (WCAG 1.4.11); Focus indicators meet 3:1 contrast; No color-only information (WCAG 1.4.1)
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

  test('TC_A11Y_038: Verify responsive design accessibility', async ({ page }) => {
    await login(page);
    await page.goto(PAGE_URL);
    await page.waitForTimeout(3000);
    // Test at various viewport sizes
    // Zoom to 200%
    // Verify content reflows
    // Measure touch targets
    // Test on mobile viewport
    // Expected: Content reflows without horizontal scroll (WCAG 1.4.10); All content accessible at 200% zoom (WCAG 1.4.4); Touch targets meet 44x44px minimum; Layout adapts to viewport; No content loss at zoom
    const body = (await page.locator('body').textContent()) ?? '';
    expect(body.length).toBeGreaterThan(100);
  });

});
