# SCRUM-25 Accessibility Test Plan

## Application Overview

Comprehensive accessibility test plan for Admin Restore Deleted Products feature (SCRUM-25) covering WCAG 2.1 AA compliance for deleted products list, search/filter, product details view, restore button, confirmation dialog, notifications, audit trail, permissions, and error handling.

## Test Scenarios

### 1. Deleted Products List Access

**Seed:** `seed.spec.ts`

#### 1.1. TC_A11Y_001: Verify Deleted Products section navigation

**File:** `tests/accessibility/scrum25-deleted-list-access.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to Admin Dashboard
  3. Tab to Deleted Products/Archived Items link
  4. Verify focus indicator visible
  5. Press Enter to access section

**Expected Results:**
  - Navigation link keyboard accessible
  - Link has clear accessible name
  - Focus indicator visible with 3:1 contrast
  - Link activates with Enter key
  - Page loads successfully

#### 1.2. TC_A11Y_002: Verify page title and landmarks

**File:** `tests/accessibility/scrum25-deleted-list-access.spec.ts`

**Steps:**
  1. Navigate to Deleted Products section
  2. Verify page title is descriptive
  3. Use screen reader to navigate landmarks
  4. Check main, navigation landmarks
  5. Verify skip links

**Expected Results:**
  - Page title includes 'Deleted Products' or 'Archived Items'
  - Main content has role='main'
  - Navigation has role='navigation'
  - Skip to main content link present
  - All landmarks have accessible names

#### 1.3. TC_A11Y_003: Verify heading structure

**File:** `tests/accessibility/scrum25-deleted-list-access.spec.ts`

**Steps:**
  1. Navigate to Deleted Products page
  2. Use screen reader heading navigation
  3. Verify h1 for page title
  4. Verify h2 for sections
  5. Check heading hierarchy

**Expected Results:**
  - Page heading is h1
  - Section headings are h2
  - No heading levels skipped
  - Heading hierarchy is logical
  - Screen reader announces headings correctly

### 2. Deleted Products Table

**Seed:** `seed.spec.ts`

#### 2.1. TC_A11Y_004: Verify table structure accessibility

**File:** `tests/accessibility/scrum25-deleted-table.spec.ts`

**Steps:**
  1. Navigate to deleted products table
  2. Verify table has caption or aria-label
  3. Check header cells use <th>
  4. Verify scope attributes
  5. Test with screen reader

**Expected Results:**
  - Table has <table> element
  - Table has <caption> or aria-label
  - Header row uses <th> elements
  - Headers have scope='col'
  - Table structure announced by screen reader

#### 2.2. TC_A11Y_005: Verify table headers accessibility

**File:** `tests/accessibility/scrum25-deleted-table.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to table
  3. Move through header cells
  4. Verify each header announced
  5. Test table navigation

**Expected Results:**
  - All column headers announced
  - Headers: Product Name, Vendor Name, Vendor ID, Deletion Date, Deletion Reason, Deleted By
  - Data cells associated with headers
  - Screen reader announces row/column position
  - Table navigation works with arrow keys

#### 2.3. TC_A11Y_006: Verify table keyboard navigation

**File:** `tests/accessibility/scrum25-deleted-table.spec.ts`

**Steps:**
  1. Tab through table rows
  2. Verify tab order is logical
  3. Test focus indicators
  4. Navigate to action buttons
  5. Verify no keyboard traps

**Expected Results:**
  - Tab order follows logical sequence
  - Focus indicator visible on interactive cells
  - Action buttons keyboard accessible
  - No keyboard traps in table
  - Arrow keys navigate cells (optional)

#### 2.4. TC_A11Y_007: Verify table visual accessibility

**File:** `tests/accessibility/scrum25-deleted-table.spec.ts`

**Steps:**
  1. Inspect table text contrast
  2. Verify headers have 4.5:1 contrast
  3. Verify data cells have 4.5:1 contrast
  4. Test zoom to 200%
  5. Check row states

**Expected Results:**
  - All text meets 4.5:1 contrast
  - Table borders have 3:1 contrast
  - Table readable at 200% zoom
  - Row hover/focus states visible
  - No color-only information

### 3. Search and Filter Controls

**Seed:** `seed.spec.ts`

#### 3.1. TC_A11Y_008: Verify search input accessibility

**File:** `tests/accessibility/scrum25-search-filter.spec.ts`

**Steps:**
  1. Navigate to search input
  2. Verify label exists and is associated
  3. Check input contrast
  4. Test keyboard focus
  5. Verify placeholder usage

**Expected Results:**
  - Search input has <label> or aria-label
  - Label text: 'Search deleted products'
  - Input has 4.5:1 contrast
  - Placeholder not sole label
  - Input keyboard accessible

#### 3.2. TC_A11Y_009: Verify filter dropdowns accessibility

**File:** `tests/accessibility/scrum25-search-filter.spec.ts`

**Steps:**
  1. Navigate to filter controls
  2. Verify each dropdown has label
  3. Tab to dropdowns
  4. Use arrow keys to select
  5. Test with screen reader

**Expected Results:**
  - Filter dropdowns have labels
  - Labels: 'Filter by vendor', 'Filter by date', 'Filter by category'
  - Dropdowns keyboard accessible
  - Arrow keys navigate options
  - Selected value announced

#### 3.3. TC_A11Y_010: Verify sort controls accessibility

**File:** `tests/accessibility/scrum25-search-filter.spec.ts`

**Steps:**
  1. Navigate to sort controls
  2. Tab to sort buttons/links
  3. Activate sort options
  4. Verify sort state announced
  5. Check visual indicators

**Expected Results:**
  - Sort controls keyboard accessible
  - Sort options have clear labels
  - Current sort state announced
  - Sort direction indicated (ascending/descending)
  - Visual indicator has 3:1 contrast

#### 3.4. TC_A11Y_011: Verify dynamic results announcement

**File:** `tests/accessibility/scrum25-search-filter.spec.ts`

**Steps:**
  1. Apply search or filter
  2. Verify results update announced
  3. Check aria-live region
  4. Test loading state
  5. Verify focus remains stable

**Expected Results:**
  - Results update has aria-live region
  - Update announced: 'X results found'
  - Loading state announced
  - Focus management after filter
  - No unexpected focus changes

### 4. Product Detail View

**Seed:** `seed.spec.ts`

#### 4.1. TC_A11Y_012: Verify product detail link accessibility

**File:** `tests/accessibility/scrum25-product-details.spec.ts`

**Steps:**
  1. Navigate to deleted products table
  2. Tab to product name link
  3. Verify focus indicator
  4. Press Enter to open details
  5. Verify detail view loads

**Expected Results:**
  - Product link keyboard accessible
  - Link has accessible name with product name
  - Focus indicator visible
  - Link activates with Enter
  - Detail view opens

#### 4.2. TC_A11Y_013: Verify product detail page structure

**File:** `tests/accessibility/scrum25-product-details.spec.ts`

**Steps:**
  1. Open product detail view
  2. Use screen reader heading navigation
  3. Verify h1 for product name
  4. Verify h2 for sections
  5. Check heading hierarchy

**Expected Results:**
  - Product name is h1
  - Section headings are h2
  - Heading hierarchy is logical
  - All headings announced by screen reader
  - No heading levels skipped

#### 4.3. TC_A11Y_014: Verify deleted status label accessibility

**File:** `tests/accessibility/scrum25-product-details.spec.ts`

**Steps:**
  1. Navigate to product detail view
  2. Locate deleted status label
  3. Verify label text and contrast
  4. Test with screen reader
  5. Check semantic markup

**Expected Results:**
  - Deleted status label visible
  - Label text: 'Deleted – Not Visible to PwD Users'
  - Label has 4.5:1 contrast
  - Label announced by screen reader
  - Label has semantic markup (e.g., <strong>, role='status')

#### 4.4. TC_A11Y_015: Verify product content accessibility

**File:** `tests/accessibility/scrum25-product-details.spec.ts`

**Steps:**
  1. Review product descriptions
  2. Check specifications display
  3. Verify media accessibility
  4. Test zoom to 200%
  5. Check contrast ratios

**Expected Results:**
  - All text meets 4.5:1 contrast
  - Images have alt text
  - Media in archived state clearly indicated
  - Content readable at 200% zoom
  - No color-only information

### 5. Restore Product Button

**Seed:** `seed.spec.ts`

#### 5.1. TC_A11Y_016: Verify Restore button keyboard accessibility

**File:** `tests/accessibility/scrum25-restore-button.spec.ts`

**Steps:**
  1. Navigate to product detail page
  2. Tab to Restore Product button
  3. Verify focus indicator visible
  4. Press Enter/Space to activate
  5. Verify confirmation dialog opens

**Expected Results:**
  - Button has role='button'
  - Accessible name: 'Restore Product'
  - Focus indicator visible with 3:1 contrast
  - Button activates with Enter/Space
  - Button state announced if disabled

#### 5.2. TC_A11Y_017: Verify Restore button screen reader accessibility

**File:** `tests/accessibility/scrum25-restore-button.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Restore button
  3. Verify button name announced
  4. Verify button role announced
  5. Test button activation

**Expected Results:**
  - Button role announced
  - Button name 'Restore Product' announced
  - Context provided (e.g., 'Restore [Product Name]')
  - Button state announced
  - No empty or generic labels

#### 5.3. TC_A11Y_018: Verify Restore button visual accessibility

**File:** `tests/accessibility/scrum25-restore-button.spec.ts`

**Steps:**
  1. Inspect button colors
  2. Verify text contrast
  3. Verify background contrast
  4. Test hover/focus states
  5. Measure touch target size

**Expected Results:**
  - Button text has 4.5:1 contrast
  - Button background has 3:1 contrast
  - Hover/focus states visible
  - Button readable at 200% zoom
  - Touch target meets 44x44px minimum

### 6. Confirmation Dialog

**Seed:** `seed.spec.ts`

#### 6.1. TC_A11Y_019: Verify confirmation dialog structure

**File:** `tests/accessibility/scrum25-confirmation-dialog.spec.ts`

**Steps:**
  1. Trigger Restore Product
  2. Verify dialog opens
  3. Check dialog role and ARIA attributes
  4. Verify focus moves to dialog
  5. Test focus trap

**Expected Results:**
  - Dialog has role='dialog' or role='alertdialog'
  - Dialog has aria-modal='true'
  - Dialog has aria-labelledby pointing to title
  - Focus moves to dialog on open
  - Focus trapped within dialog

#### 6.2. TC_A11Y_020: Verify dialog keyboard navigation

**File:** `tests/accessibility/scrum25-confirmation-dialog.spec.ts`

**Steps:**
  1. Open confirmation dialog
  2. Tab through dialog elements
  3. Verify focus stays in dialog
  4. Press Escape to close
  5. Verify focus returns correctly

**Expected Results:**
  - Tab cycles through dialog elements only
  - Confirm and Cancel buttons keyboard accessible
  - Escape key closes dialog
  - Focus returns to Restore button on close
  - No keyboard traps

#### 6.3. TC_A11Y_021: Verify dialog screen reader accessibility

**File:** `tests/accessibility/scrum25-confirmation-dialog.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Open confirmation dialog
  3. Verify dialog title announced
  4. Verify message announced
  5. Verify button labels announced

**Expected Results:**
  - Dialog title announced
  - Confirmation message announced
  - Message: 'Are you sure you want to restore this product?'
  - Additional context announced
  - Button labels clear: 'Confirm' and 'Cancel'

#### 6.4. TC_A11Y_022: Verify dialog visual accessibility

**File:** `tests/accessibility/scrum25-confirmation-dialog.spec.ts`

**Steps:**
  1. Inspect dialog text contrast
  2. Verify title has 4.5:1 contrast
  3. Verify message has 4.5:1 contrast
  4. Test zoom to 200%
  5. Check focus indicators

**Expected Results:**
  - All text meets 4.5:1 contrast
  - Dialog overlay has sufficient opacity
  - Dialog readable at 200% zoom
  - Focus indicators visible
  - Close button (X) has 3:1 contrast

### 7. Success Message

**Seed:** `seed.spec.ts`

#### 7.1. TC_A11Y_023: Verify success message accessibility

**File:** `tests/accessibility/scrum25-success-message.spec.ts`

**Steps:**
  1. Confirm product restoration
  2. Verify success message appears
  3. Check message announced to screen reader
  4. Verify message contrast
  5. Test message dismissal

**Expected Results:**
  - Success message has role='alert' or aria-live='polite'
  - Message announced immediately
  - Message text: 'Product X has been successfully restored'
  - Message has 4.5:1 contrast
  - Message dismissible with keyboard

#### 7.2. TC_A11Y_024: Verify success message keyboard handling

**File:** `tests/accessibility/scrum25-success-message.spec.ts`

**Steps:**
  1. Trigger success message
  2. Verify focus management
  3. Tab to dismiss button if present
  4. Test Escape key
  5. Verify message dismissal

**Expected Results:**
  - Focus doesn't move unexpectedly
  - Dismiss button keyboard accessible
  - Escape key dismisses message
  - Message doesn't block content
  - Message auto-dismisses or has close button

### 8. Vendor Notification

**Seed:** `seed.spec.ts`

#### 8.1. TC_A11Y_025: Verify notification indicator accessibility

**File:** `tests/accessibility/scrum25-vendor-notification.spec.ts`

**Steps:**
  1. Navigate to vendor dashboard (as vendor)
  2. Tab to notification indicator
  3. Verify focus indicator
  4. Verify unread count announced
  5. Activate notification

**Expected Results:**
  - Notification indicator keyboard accessible
  - Indicator has accessible name
  - Unread count announced
  - Focus indicator visible
  - Notification opens on activation

#### 8.2. TC_A11Y_026: Verify notification content accessibility

**File:** `tests/accessibility/scrum25-vendor-notification.spec.ts`

**Steps:**
  1. Open vendor notification
  2. Enable screen reader
  3. Verify notification announced
  4. Check message content
  5. Test action links

**Expected Results:**
  - Notification title announced
  - Message content announced
  - Message: 'Your product [Name] has been restored'
  - Timestamp announced
  - Action links keyboard accessible

### 9. Audit Trail

**Seed:** `seed.spec.ts`

#### 9.1. TC_A11Y_027: Verify audit log table accessibility

**File:** `tests/accessibility/scrum25-audit-trail.spec.ts`

**Steps:**
  1. Navigate to audit log
  2. Verify table structure
  3. Check table caption
  4. Verify header cells
  5. Test keyboard navigation

**Expected Results:**
  - Audit log table has proper structure
  - Table has caption or aria-label
  - Headers: Product ID, Product Name, Admin ID, Admin Name, Timestamp, Action
  - All headers have scope='col'
  - Table keyboard accessible

#### 9.2. TC_A11Y_028: Verify audit log screen reader accessibility

**File:** `tests/accessibility/scrum25-audit-trail.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate through audit log
  3. Verify entries announced
  4. Check action labels
  5. Verify timestamps

**Expected Results:**
  - All audit entries announced
  - Deletion and restoration actions clearly labeled
  - Timestamps in accessible format
  - Admin names announced
  - Table data cells associated with headers

#### 9.3. TC_A11Y_029: Verify audit log visual accessibility

**File:** `tests/accessibility/scrum25-audit-trail.spec.ts`

**Steps:**
  1. Inspect audit log colors
  2. Verify text contrast
  3. Test zoom to 200%
  4. Check row states
  5. Verify action indicators

**Expected Results:**
  - All text meets 4.5:1 contrast
  - Table readable at 200% zoom
  - Row states visible (hover/focus)
  - Action types distinguishable
  - No color-only information

### 10. Permissions and Security

**Seed:** `seed.spec.ts`

#### 10.1. TC_A11Y_030: Verify permission error accessibility

**File:** `tests/accessibility/scrum25-permissions.spec.ts`

**Steps:**
  1. Login as non-admin user
  2. Attempt to access Deleted Products
  3. Verify error message appears
  4. Check message announced
  5. Verify message contrast

**Expected Results:**
  - Error message has role='alert'
  - Message announced immediately
  - Message text: 'You do not have the necessary privileges'
  - Message has 4.5:1 contrast
  - Message provides clear guidance

#### 10.2. TC_A11Y_031: Verify disabled Restore button accessibility

**File:** `tests/accessibility/scrum25-permissions.spec.ts`

**Steps:**
  1. Login as user without permissions
  2. Navigate to product details
  3. Verify Restore button state
  4. Check disabled state announced
  5. Test tooltip if present

**Expected Results:**
  - Restore button disabled or hidden
  - Disabled state announced
  - Disabled button has aria-disabled='true'
  - Visual indicator shows disabled state
  - Tooltip explains why disabled

### 11. Error Handling

**Seed:** `seed.spec.ts`

#### 11.1. TC_A11Y_032: Verify restoration failure error accessibility

**File:** `tests/accessibility/scrum25-error-handling.spec.ts`

**Steps:**
  1. Trigger restoration failure scenario
  2. Verify error message appears
  3. Check error announced to screen reader
  4. Verify error contrast
  5. Check error icon

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Error announced immediately
  - Message: 'Product restoration failed. Some media files are no longer available'
  - Error has 4.5:1 contrast
  - Error icon has 3:1 contrast

#### 11.2. TC_A11Y_033: Verify error keyboard handling

**File:** `tests/accessibility/scrum25-error-handling.spec.ts`

**Steps:**
  1. Trigger error message
  2. Verify focus management
  3. Tab to dismiss button
  4. Test Escape key
  5. Verify focus return

**Expected Results:**
  - Error doesn't trap focus
  - Dismiss button keyboard accessible
  - Escape key dismisses error
  - Focus returns appropriately
  - Error provides actionable guidance

#### 11.3. TC_A11Y_034: Verify partial restoration warning accessibility

**File:** `tests/accessibility/scrum25-error-handling.spec.ts`

**Steps:**
  1. Trigger partial restoration
  2. Verify warning message
  3. Check message announced
  4. Verify missing media indicated
  5. Test follow-up actions

**Expected Results:**
  - Partial restoration flagged clearly
  - Warning message announced
  - Missing media indicated
  - Vendor follow-up action clear
  - All messages keyboard accessible

### 12. Overall Interface Accessibility

**Seed:** `seed.spec.ts`

#### 12.1. TC_A11Y_035: Verify complete keyboard navigation

**File:** `tests/accessibility/scrum25-overall-interface.spec.ts`

**Steps:**
  1. Navigate entire restore workflow
  2. Tab through all elements
  3. Verify tab order is logical
  4. Test all interactive elements
  5. Verify no keyboard traps

**Expected Results:**
  - All interactive elements keyboard accessible
  - Tab order follows visual layout
  - Focus indicators visible on all elements
  - No keyboard traps exist
  - All actions completable with keyboard

#### 12.2. TC_A11Y_036: Verify complete screen reader accessibility

**File:** `tests/accessibility/scrum25-overall-interface.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate entire workflow
  3. Verify all elements announced
  4. Check state changes
  5. Test dynamic content

**Expected Results:**
  - All elements have accessible names
  - All state changes announced
  - Dynamic content has aria-live
  - Form labels properly associated
  - No visual-only information

#### 12.3. TC_A11Y_037: Verify color and contrast compliance

**File:** `tests/accessibility/scrum25-overall-interface.spec.ts`

**Steps:**
  1. Inspect all text elements
  2. Verify text contrast ratios
  3. Check UI component contrast
  4. Verify focus indicators
  5. Test with high contrast mode

**Expected Results:**
  - All text meets 4.5:1 contrast (WCAG 1.4.3)
  - Large text meets 3:1 contrast
  - UI components meet 3:1 contrast (WCAG 1.4.11)
  - Focus indicators meet 3:1 contrast
  - No color-only information (WCAG 1.4.1)

#### 12.4. TC_A11Y_038: Verify responsive design accessibility

**File:** `tests/accessibility/scrum25-overall-interface.spec.ts`

**Steps:**
  1. Test at various viewport sizes
  2. Zoom to 200%
  3. Verify content reflows
  4. Measure touch targets
  5. Test on mobile viewport

**Expected Results:**
  - Content reflows without horizontal scroll (WCAG 1.4.10)
  - All content accessible at 200% zoom (WCAG 1.4.4)
  - Touch targets meet 44x44px minimum
  - Layout adapts to viewport
  - No content loss at zoom
