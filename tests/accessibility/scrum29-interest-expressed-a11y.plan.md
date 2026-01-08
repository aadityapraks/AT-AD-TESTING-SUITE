# SCRUM-29 Accessibility Test Plan

## Application Overview

Accessibility test plan for SCRUM-29 Interest Expressed functionality, ensuring WCAG 2.1 AA compliance for vendors viewing and managing interest data from PwD users. Tests cover keyboard navigation, screen reader compatibility, visual accessibility, and form interactions.

## Test Scenarios

### 1. Keyboard Navigation - Interest List

**Seed:** `tests/seed/vendor-dashboard.spec.ts`

#### 1.1. TC_A11Y_SCRUM29_001: Tab order follows logical sequence in interest list

**File:** `tests/accessibility/scrum29-interest-tab-order.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Press Tab key repeatedly
  4. Verify focus moves through: navigation tabs → search field → filter dropdowns → sort dropdown → table rows → pagination controls
  5. Verify no elements are skipped
  6. Verify focus order matches visual layout

**Expected Results:**
  - PASS if: Tab order is logical and follows visual layout from top to bottom, left to right
  - FAIL if: Focus jumps unexpectedly, skips interactive elements, or does not follow reading order

#### 1.2. TC_A11Y_SCRUM29_002: Focus indicator visible on all interactive elements

**File:** `tests/accessibility/scrum29-focus-indicator.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Tab through all interactive elements
  4. Verify visible focus indicator on: tabs, buttons, links, search field, dropdowns, table rows, pagination
  5. Measure focus indicator contrast ratio

**Expected Results:**
  - PASS if: Focus indicator is visible with minimum 3:1 contrast ratio against background on all elements
  - FAIL if: Any interactive element lacks visible focus indicator or contrast is below 3:1

#### 1.3. TC_A11Y_SCRUM29_003: No keyboard traps in interest list

**File:** `tests/accessibility/scrum29-no-keyboard-traps.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Tab through entire page
  4. Verify ability to move forward and backward through all elements
  5. Test Shift+Tab to move backwards
  6. Verify no element traps keyboard focus

**Expected Results:**
  - PASS if: User can navigate through all elements and return using Tab/Shift+Tab without getting trapped
  - FAIL if: Focus gets stuck on any element and cannot be moved away using standard keyboard navigation

#### 1.4. TC_A11Y_SCRUM29_004: Enter/Space activates buttons and controls

**File:** `tests/accessibility/scrum29-keyboard-activation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Tab to View Details button
  4. Press Enter key
  5. Verify modal opens
  6. Tab to filter dropdown
  7. Press Space key
  8. Verify dropdown opens

**Expected Results:**
  - PASS if: Enter and Space keys activate buttons, open dropdowns, and trigger actions as expected
  - FAIL if: Keyboard activation does not work or requires mouse interaction

#### 1.5. TC_A11Y_SCRUM29_005: Escape closes modal and returns focus

**File:** `tests/accessibility/scrum29-modal-escape.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Click View Details to open modal
  4. Press Escape key
  5. Verify modal closes
  6. Verify focus returns to View Details button that opened the modal

**Expected Results:**
  - PASS if: Escape closes modal and focus returns to triggering element
  - FAIL if: Escape does not close modal or focus is lost after closing

### 2. Screen Reader - Interest List Announcements

**Seed:** `tests/seed/vendor-dashboard.spec.ts`

#### 2.1. TC_A11Y_SCRUM29_006: Interest Expressed tab has accessible name

**File:** `tests/accessibility/scrum29-tab-accessible-name.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to dashboard
  3. Inspect Interest Expressed tab with screen reader
  4. Verify accessible name is announced
  5. Verify role is 'tab' or 'link'

**Expected Results:**
  - PASS if: Screen reader announces 'Interest Expressed' with appropriate role
  - FAIL if: Tab lacks accessible name or role is not announced

#### 2.2. TC_A11Y_SCRUM29_007: Data table has proper structure and labels

**File:** `tests/accessibility/scrum29-table-structure.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Inspect table with screen reader
  4. Verify table has caption or aria-label
  5. Verify column headers use <th> with scope='col'
  6. Navigate through table cells
  7. Verify headers are announced with each cell

**Expected Results:**
  - PASS if: Table has accessible name, headers are properly marked, and screen reader announces column headers with cell content
  - FAIL if: Table lacks structure, headers are not announced, or navigation is confusing

#### 2.3. TC_A11Y_SCRUM29_008: Search field has accessible label

**File:** `tests/accessibility/scrum29-search-label.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Focus on search field
  4. Verify screen reader announces label
  5. Verify placeholder is not the only label
  6. Check for aria-label or associated <label>

**Expected Results:**
  - PASS if: Search field has programmatically associated label announced by screen reader
  - FAIL if: Field relies only on placeholder or visual label without proper association

#### 2.4. TC_A11Y_SCRUM29_009: Filter and sort controls have accessible names

**File:** `tests/accessibility/scrum29-filter-accessible-names.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Tab to state filter dropdown
  4. Verify screen reader announces purpose (e.g., 'Filter by state')
  5. Tab to disability type filter
  6. Verify accessible name
  7. Tab to sort dropdown
  8. Verify accessible name

**Expected Results:**
  - PASS if: All filter and sort controls have clear, descriptive accessible names
  - FAIL if: Controls lack accessible names or names are ambiguous

#### 2.5. TC_A11Y_SCRUM29_010: Dynamic content updates announced with aria-live

**File:** `tests/accessibility/scrum29-aria-live.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Apply a filter
  4. Verify screen reader announces result count update
  5. Change sort order
  6. Verify screen reader announces list reordering
  7. Check for aria-live region

**Expected Results:**
  - PASS if: Filter and sort changes are announced to screen reader users via aria-live regions
  - FAIL if: Dynamic updates occur silently without screen reader notification

#### 2.6. TC_A11Y_SCRUM29_011: Pagination controls have accessible labels

**File:** `tests/accessibility/scrum29-pagination-labels.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section with multiple pages
  3. Tab to pagination controls
  4. Verify Previous/Next buttons have accessible names
  5. Verify page number buttons announce current page
  6. Verify disabled state is announced

**Expected Results:**
  - PASS if: Pagination controls have clear accessible names and states (current, disabled) are announced
  - FAIL if: Controls lack accessible names or states are not communicated

### 3. Screen Reader - View Details Modal

**Seed:** `tests/seed/interest-list.spec.ts`

#### 3.1. TC_A11Y_SCRUM29_012: Modal has aria-modal and accessible name

**File:** `tests/accessibility/scrum29-modal-aria.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Click View Details button
  4. Verify modal has role='dialog'
  5. Verify aria-modal='true'
  6. Verify aria-labelledby or aria-label provides accessible name
  7. Verify screen reader announces modal opening

**Expected Results:**
  - PASS if: Modal has proper ARIA attributes and screen reader announces it as a dialog with accessible name
  - FAIL if: Modal lacks ARIA attributes or is not announced properly

#### 3.2. TC_A11Y_SCRUM29_013: Focus trapped within modal

**File:** `tests/accessibility/scrum29-modal-focus-trap.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Tab through all elements in modal
  4. Verify focus stays within modal
  5. Tab from last element
  6. Verify focus returns to first element in modal
  7. Shift+Tab from first element
  8. Verify focus moves to last element in modal

**Expected Results:**
  - PASS if: Focus is trapped within modal and cycles through modal elements only
  - FAIL if: Focus escapes modal to background content

#### 3.3. TC_A11Y_SCRUM29_014: Masked contact info announced correctly

**File:** `tests/accessibility/scrum29-masked-contact-announcement.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Navigate to contact information section
  4. Verify screen reader announces masked state
  5. Verify accessible description indicates contact is hidden
  6. Check for aria-label or aria-describedby

**Expected Results:**
  - PASS if: Screen reader clearly announces that contact information is masked/hidden
  - FAIL if: Masked state is not communicated to screen reader users

#### 3.4. TC_A11Y_SCRUM29_015: Reveal Details button state change announced

**File:** `tests/accessibility/scrum29-reveal-button-announcement.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Focus on Reveal Details button
  4. Verify button has accessible name
  5. Click button to reveal contact
  6. Verify screen reader announces contact information is now visible
  7. Verify aria-live region announces change

**Expected Results:**
  - PASS if: Revealing contact details triggers screen reader announcement of newly visible information
  - FAIL if: State change occurs silently without notification

#### 3.5. TC_A11Y_SCRUM29_016: Close button has accessible name

**File:** `tests/accessibility/scrum29-modal-close-button.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Tab to close (X) button
  4. Verify screen reader announces purpose (e.g., 'Close dialog')
  5. Verify button is not just an icon without text alternative

**Expected Results:**
  - PASS if: Close button has accessible name like 'Close' or 'Close dialog'
  - FAIL if: Button is announced only as 'X' or lacks accessible name

### 4. Visual Accessibility - Color and Contrast

**Seed:** `tests/seed/vendor-dashboard.spec.ts`

#### 4.1. TC_A11Y_SCRUM29_017: Text color contrast meets WCAG AA (4.5:1)

**File:** `tests/accessibility/scrum29-text-contrast.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Measure contrast ratio for all text elements
  4. Check: headings, body text, table content, labels, buttons
  5. Verify minimum 4.5:1 for normal text
  6. Verify minimum 3:1 for large text (18pt+ or 14pt+ bold)

**Expected Results:**
  - PASS if: All text meets minimum contrast ratios (4.5:1 normal, 3:1 large)
  - FAIL if: Any text has insufficient contrast

#### 4.2. TC_A11Y_SCRUM29_018: Interactive elements contrast meets WCAG AA (3:1)

**File:** `tests/accessibility/scrum29-interactive-contrast.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Measure contrast for interactive elements
  4. Check: button borders, input borders, focus indicators, icons
  5. Verify minimum 3:1 contrast against adjacent colors

**Expected Results:**
  - PASS if: All interactive elements have 3:1 minimum contrast
  - FAIL if: Any interactive element has insufficient contrast

#### 4.3. TC_A11Y_SCRUM29_019: Not relying on color alone for information

**File:** `tests/accessibility/scrum29-color-independence.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Check notification indicators
  4. Verify new/unread status uses icon or text in addition to color
  5. Check filter active states
  6. Verify active filters use visual indicator beyond color
  7. Test with grayscale/color blindness simulation

**Expected Results:**
  - PASS if: All information conveyed by color is also available through text, icons, or patterns
  - FAIL if: Any information relies solely on color to convey meaning

#### 4.4. TC_A11Y_SCRUM29_020: Page readable at 200% zoom

**File:** `tests/accessibility/scrum29-zoom-200.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Zoom browser to 200%
  4. Verify all content is visible without horizontal scrolling
  5. Verify no content is cut off or overlapping
  6. Verify table remains usable
  7. Test modal at 200% zoom

**Expected Results:**
  - PASS if: All content remains readable and functional at 200% zoom without horizontal scrolling
  - FAIL if: Content is cut off, overlaps, or requires horizontal scrolling

### 5. Forms and Inputs - Search and Filters

**Seed:** `tests/seed/interest-list.spec.ts`

#### 5.1. TC_A11Y_SCRUM29_021: Search field has associated label

**File:** `tests/accessibility/scrum29-search-field-label.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Inspect search field
  4. Verify <label> element with for attribute, or aria-labelledby
  5. Verify label is visible or properly hidden with aria-label
  6. Test with screen reader

**Expected Results:**
  - PASS if: Search field has programmatically associated label
  - FAIL if: Field lacks proper label association

#### 5.2. TC_A11Y_SCRUM29_022: Filter dropdowns have labels

**File:** `tests/accessibility/scrum29-filter-labels.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Inspect state filter dropdown
  4. Verify label association
  5. Inspect disability type filter
  6. Verify label association
  7. Inspect sort dropdown
  8. Verify label association

**Expected Results:**
  - PASS if: All filter and sort dropdowns have associated labels
  - FAIL if: Any dropdown lacks proper label

#### 5.3. TC_A11Y_SCRUM29_023: Autocomplete attributes for search

**File:** `tests/accessibility/scrum29-autocomplete.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed section
  3. Inspect search field HTML
  4. Check for autocomplete attribute
  5. Verify appropriate value (e.g., autocomplete='off' or 'name')

**Expected Results:**
  - PASS if: Search field has appropriate autocomplete attribute
  - FAIL if: Autocomplete attribute is missing or incorrect

### 6. Notifications Accessibility

**Seed:** `tests/seed/vendor-notifications.spec.ts`

#### 6.1. TC_A11Y_SCRUM29_024: Notification indicator has accessible name

**File:** `tests/accessibility/scrum29-notification-indicator.spec.ts`

**Steps:**
  1. PwD user expresses interest
  2. Login as AP
  3. Navigate to dashboard
  4. Inspect notification indicator
  5. Verify accessible name (e.g., '4 new notifications')
  6. Verify not just a visual badge without text alternative

**Expected Results:**
  - PASS if: Notification indicator has accessible name announcing count
  - FAIL if: Indicator is visual only without text alternative

#### 6.2. TC_A11Y_SCRUM29_025: New notification announced with aria-live

**File:** `tests/accessibility/scrum29-notification-announcement.spec.ts`

**Steps:**
  1. Login as AP
  2. Keep Interest Expressed section open
  3. Trigger new interest expression
  4. Verify screen reader announces new notification
  5. Check for aria-live='polite' or 'assertive' region

**Expected Results:**
  - PASS if: New notifications are announced to screen reader users via aria-live
  - FAIL if: Notifications appear silently

#### 6.3. TC_A11Y_SCRUM29_026: Notification Center keyboard accessible

**File:** `tests/accessibility/scrum29-notification-center-keyboard.spec.ts`

**Steps:**
  1. Login as AP
  2. Tab to Notification Center icon
  3. Press Enter or Space to open
  4. Verify panel opens
  5. Tab through notifications
  6. Verify Mark as Read and Delete actions are keyboard accessible
  7. Press Escape to close

**Expected Results:**
  - PASS if: Notification Center is fully keyboard accessible including all actions
  - FAIL if: Any functionality requires mouse interaction

### 7. Error Handling and Empty States

**Seed:** `tests/seed/interest-list.spec.ts`

#### 7.1. TC_A11Y_SCRUM29_027: Empty state message is accessible

**File:** `tests/accessibility/scrum29-empty-state.spec.ts`

**Steps:**
  1. Login as AP with no interests
  2. Navigate to Interest Expressed section
  3. Verify empty state message is visible
  4. Verify message has proper heading structure
  5. Test with screen reader
  6. Verify message is announced

**Expected Results:**
  - PASS if: Empty state message is properly structured and announced by screen readers
  - FAIL if: Message is not accessible or lacks semantic structure

#### 7.2. TC_A11Y_SCRUM29_028: Error message announced and accessible

**File:** `tests/accessibility/scrum29-error-message.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to Interest Expressed section
  3. Simulate data retrieval error
  4. Verify error message appears
  5. Verify screen reader announces error
  6. Check for aria-live region
  7. Verify error has appropriate role (e.g., role='alert')

**Expected Results:**
  - PASS if: Error message is announced immediately via aria-live or role='alert'
  - FAIL if: Error appears silently without screen reader notification

#### 7.3. TC_A11Y_SCRUM29_029: No results message after search is accessible

**File:** `tests/accessibility/scrum29-no-results.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to Interest Expressed section
  3. Enter search term with no matches
  4. Verify 'No results found' message appears
  5. Verify message is announced by screen reader
  6. Check for aria-live region

**Expected Results:**
  - PASS if: No results message is announced to screen reader users
  - FAIL if: Message appears silently

### 8. Download and Export Accessibility

**Seed:** `tests/seed/interest-list.spec.ts`

#### 8.1. TC_A11Y_SCRUM29_030: Download button has accessible name

**File:** `tests/accessibility/scrum29-download-button.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to Interest Expressed section
  3. Locate Download List button
  4. Verify accessible name (e.g., 'Download interest list')
  5. Verify not just an icon without text alternative
  6. Test with screen reader

**Expected Results:**
  - PASS if: Download button has clear accessible name
  - FAIL if: Button lacks accessible name or is ambiguous

#### 8.2. TC_A11Y_SCRUM29_031: Download action announced

**File:** `tests/accessibility/scrum29-download-announcement.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to Interest Expressed section
  3. Click Download List button
  4. Verify screen reader announces download starting
  5. Verify success/completion message is announced
  6. Check for aria-live region

**Expected Results:**
  - PASS if: Download action and completion are announced to screen reader users
  - FAIL if: Download occurs silently

### 9. Responsive and Mobile Accessibility

**Seed:** `tests/seed/vendor-dashboard.spec.ts`

#### 9.1. TC_A11Y_SCRUM29_032: Touch targets minimum 44x44 pixels

**File:** `tests/accessibility/scrum29-touch-targets.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to Interest Expressed section
  3. Resize viewport to mobile size (375px width)
  4. Measure touch target sizes for all interactive elements
  5. Check: buttons, links, table rows, pagination controls
  6. Verify minimum 44x44 pixels

**Expected Results:**
  - PASS if: All touch targets are at least 44x44 pixels on mobile viewports
  - FAIL if: Any interactive element is smaller than 44x44 pixels

#### 9.2. TC_A11Y_SCRUM29_033: Mobile navigation keyboard accessible

**File:** `tests/accessibility/scrum29-mobile-keyboard.spec.ts`

**Steps:**
  1. Login as AP
  2. Resize to mobile viewport
  3. Navigate to Interest Expressed section
  4. Test keyboard navigation on mobile layout
  5. Verify hamburger menu (if present) is keyboard accessible
  6. Verify all functionality available via keyboard

**Expected Results:**
  - PASS if: All mobile navigation and functionality is keyboard accessible
  - FAIL if: Any mobile-specific controls require touch interaction
