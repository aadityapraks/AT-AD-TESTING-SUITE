# SCRUM-27 Accessibility Test Plan

## Application Overview

Comprehensive accessibility test plan for Admin Manage External Product Links feature (SCRUM-27) covering WCAG 2.1 AA compliance for product links management, link review queue, flagged links, disable/remove actions, confirmation dialogs, status indicators, notifications, audit trail, and security alerts.

## Test Scenarios

### 1. Product Links Management Access

**Seed:** `seed.spec.ts`

#### 1.1. TC_A11Y_001: Verify Product Links section navigation

**File:** `tests/accessibility/scrum27-links-access.spec.ts`

**Steps:**
  1. Login as admin
  2. Navigate to Admin Dashboard
  3. Tab to Product Links management section
  4. Verify focus indicator visible
  5. Press Enter to access section

**Expected Results:**
  - Navigation link keyboard accessible
  - Link has clear accessible name: 'Product Links'
  - Focus indicator visible with 3:1 contrast
  - Link activates with Enter key
  - Section loads successfully

#### 1.2. TC_A11Y_002: Verify page title and landmarks

**File:** `tests/accessibility/scrum27-links-access.spec.ts`

**Steps:**
  1. Navigate to Product Links section
  2. Verify page title is descriptive
  3. Use screen reader to navigate landmarks
  4. Check main, navigation landmarks
  5. Verify skip links

**Expected Results:**
  - Page title includes 'Product Links' or 'Link Management'
  - Main content has role='main'
  - Navigation has role='navigation'
  - Skip to main content link present
  - All landmarks have accessible names

#### 1.3. TC_A11Y_003: Verify heading structure

**File:** `tests/accessibility/scrum27-links-access.spec.ts`

**Steps:**
  1. Navigate to Product Links page
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

### 2. Product Links Table

**Seed:** `seed.spec.ts`

#### 2.1. TC_A11Y_004: Verify links table structure

**File:** `tests/accessibility/scrum27-links-table.spec.ts`

**Steps:**
  1. Navigate to product links table
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

**File:** `tests/accessibility/scrum27-links-table.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to table
  3. Move through header cells
  4. Verify each header announced
  5. Test table navigation

**Expected Results:**
  - All column headers announced
  - Headers: Product Name, Product ID, AP Name, AP ID, Link Type, URL, Status, Last Verified
  - Data cells associated with headers
  - Screen reader announces row/column position
  - Table navigation works

#### 2.3. TC_A11Y_006: Verify table keyboard navigation

**File:** `tests/accessibility/scrum27-links-table.spec.ts`

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
  - Links keyboard accessible

#### 2.4. TC_A11Y_007: Verify table visual accessibility

**File:** `tests/accessibility/scrum27-links-table.spec.ts`

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

### 3. Link Status Indicators

**Seed:** `seed.spec.ts`

#### 3.1. TC_A11Y_008: Verify status badge accessibility

**File:** `tests/accessibility/scrum27-status-indicators.spec.ts`

**Steps:**
  1. Navigate to links with different statuses
  2. Verify each status has text label
  3. Check for color-only indicators
  4. Verify icons present
  5. Test with screen reader

**Expected Results:**
  - Status badges have text labels
  - Labels: 'Active', 'Disabled', 'Flagged'
  - Status not indicated by color alone (WCAG 1.4.1)
  - Icons accompany color coding
  - Status announced by screen reader

#### 3.2. TC_A11Y_009: Verify status visual accessibility

**File:** `tests/accessibility/scrum27-status-indicators.spec.ts`

**Steps:**
  1. Inspect status badge colors
  2. Verify text contrast
  3. Verify background contrast
  4. Test high contrast mode
  5. Test zoom to 200%

**Expected Results:**
  - Badge text has 4.5:1 contrast
  - Badge background has 3:1 contrast
  - Status distinguishable in high contrast mode
  - Badges readable at 200% zoom
  - Visual indicators clear

#### 3.3. TC_A11Y_010: Verify link type indicator accessibility

**File:** `tests/accessibility/scrum27-status-indicators.spec.ts`

**Steps:**
  1. Navigate to link type column
  2. Verify type labels present
  3. Check text contrast
  4. Test with screen reader
  5. Verify no color-only indicators

**Expected Results:**
  - Link type clearly labeled
  - Labels: 'Amazon' or 'Website'
  - Type announced by screen reader
  - Type has 4.5:1 contrast
  - Type not color-only

### 4. Link Review Queue

**Seed:** `seed.spec.ts`

#### 4.1. TC_A11Y_011: Verify Link Review Queue navigation

**File:** `tests/accessibility/scrum27-review-queue.spec.ts`

**Steps:**
  1. Navigate to Link Review Queue link
  2. Tab to queue link
  3. Verify focus indicator
  4. Check flagged count badge
  5. Activate with Enter

**Expected Results:**
  - Queue link keyboard accessible
  - Link has accessible name: 'Link Review Queue'
  - Badge shows flagged count
  - Count announced: 'X flagged links'
  - Focus indicator visible

#### 4.2. TC_A11Y_012: Verify flagged links table accessibility

**File:** `tests/accessibility/scrum27-review-queue.spec.ts`

**Steps:**
  1. Open Link Review Queue
  2. Verify table structure
  3. Check table caption
  4. Verify header cells
  5. Test keyboard navigation

**Expected Results:**
  - Flagged links table has proper structure
  - Table caption indicates flagged status
  - All headers have scope attributes
  - Table keyboard accessible
  - Screen reader announces structure

#### 4.3. TC_A11Y_013: Verify issue tag accessibility

**File:** `tests/accessibility/scrum27-review-queue.spec.ts`

**Steps:**
  1. Navigate to flagged links
  2. Verify issue tags present
  3. Check tag text labels
  4. Test with screen reader
  5. Verify contrast ratios

**Expected Results:**
  - Issue tags have text labels
  - Tags: 'Broken Link', 'Invalid Redirect', 'Suspicious Domain', 'Inaccessible Resource'
  - Tags not color-only
  - Tags announced by screen reader
  - Tags have 4.5:1 contrast

### 5. Sandbox Preview Window

**Seed:** `seed.spec.ts`

#### 5.1. TC_A11Y_014: Verify preview button accessibility

**File:** `tests/accessibility/scrum27-preview.spec.ts`

**Steps:**
  1. Navigate to flagged link
  2. Tab to Preview button
  3. Verify focus indicator
  4. Press Enter/Space
  5. Verify preview opens

**Expected Results:**
  - Preview button keyboard accessible
  - Button has accessible name: 'Preview Link'
  - Focus indicator visible
  - Button activates with Enter/Space
  - Preview window opens

#### 5.2. TC_A11Y_015: Verify preview window structure

**File:** `tests/accessibility/scrum27-preview.spec.ts`

**Steps:**
  1. Open preview window
  2. Check dialog role if modal
  3. Verify focus management
  4. Press Escape to close
  5. Verify focus return

**Expected Results:**
  - Preview has role='dialog' or opens in new window
  - If dialog: has aria-modal='true'
  - Focus moves to preview
  - Escape closes preview
  - Focus returns to trigger button

#### 5.3. TC_A11Y_016: Verify preview content accessibility

**File:** `tests/accessibility/scrum27-preview.spec.ts`

**Steps:**
  1. Open preview window
  2. Enable screen reader
  3. Verify title announced
  4. Check URL display
  5. Test close button

**Expected Results:**
  - Preview title announced
  - URL displayed and announced
  - Content area keyboard accessible
  - Close button keyboard accessible
  - All text has 4.5:1 contrast

### 6. Disable Link Action

**Seed:** `seed.spec.ts`

#### 6.1. TC_A11Y_017: Verify Disable button accessibility

**File:** `tests/accessibility/scrum27-disable-action.spec.ts`

**Steps:**
  1. Navigate to link actions
  2. Tab to Disable Link button
  3. Verify focus indicator
  4. Press Enter/Space
  5. Verify confirmation opens

**Expected Results:**
  - Disable button keyboard accessible
  - Button has accessible name: 'Disable Link'
  - Focus indicator visible with 3:1 contrast
  - Button activates with Enter/Space
  - Confirmation dialog opens

#### 6.2. TC_A11Y_018: Verify Disable button screen reader accessibility

**File:** `tests/accessibility/scrum27-disable-action.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Disable button
  3. Verify button name announced
  4. Verify button role announced
  5. Test button activation

**Expected Results:**
  - Button role announced
  - Button name 'Disable Link' announced
  - Context provided (e.g., 'Disable link for [Product]')
  - Button state announced
  - No empty or generic labels

#### 6.3. TC_A11Y_019: Verify Disable button visual accessibility

**File:** `tests/accessibility/scrum27-disable-action.spec.ts`

**Steps:**
  1. Inspect button colors
  2. Verify text contrast
  3. Verify background contrast
  4. Test hover/focus states
  5. Measure touch target

**Expected Results:**
  - Button text has 4.5:1 contrast
  - Button background has 3:1 contrast
  - Hover/focus states visible
  - Button readable at 200% zoom
  - Touch target meets 44x44px

### 7. Remove Link Action

**Seed:** `seed.spec.ts`

#### 7.1. TC_A11Y_020: Verify Remove button accessibility

**File:** `tests/accessibility/scrum27-remove-action.spec.ts`

**Steps:**
  1. Navigate to link actions
  2. Tab to Remove Link button
  3. Verify focus indicator
  4. Press Enter/Space
  5. Verify confirmation opens

**Expected Results:**
  - Remove button keyboard accessible
  - Button has accessible name: 'Remove Link'
  - Focus indicator visible
  - Button activates with Enter/Space
  - Confirmation dialog opens

#### 7.2. TC_A11Y_021: Verify Remove button screen reader accessibility

**File:** `tests/accessibility/scrum27-remove-action.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Remove button
  3. Verify button name announced
  4. Verify warning announced
  5. Test button activation

**Expected Results:**
  - Button role announced
  - Button name 'Remove Link' announced
  - Warning context provided
  - Button state announced
  - Permanent action indicated

#### 7.3. TC_A11Y_022: Verify Remove button visual accessibility

**File:** `tests/accessibility/scrum27-remove-action.spec.ts`

**Steps:**
  1. Inspect Remove button styling
  2. Verify text contrast
  3. Verify background contrast
  4. Check warning indicators
  5. Test zoom to 200%

**Expected Results:**
  - Button styled distinctly from Disable
  - Text has 4.5:1 contrast
  - Background has 3:1 contrast
  - Warning color not sole indicator
  - Button readable at 200% zoom

### 8. Confirmation Dialogs

**Seed:** `seed.spec.ts`

#### 8.1. TC_A11Y_023: Verify confirmation dialog structure

**File:** `tests/accessibility/scrum27-confirmation.spec.ts`

**Steps:**
  1. Trigger Disable or Remove action
  2. Verify dialog opens
  3. Check dialog role and ARIA
  4. Verify focus moves to dialog
  5. Test focus trap

**Expected Results:**
  - Dialog has role='dialog' or role='alertdialog'
  - Dialog has aria-modal='true'
  - Dialog has aria-labelledby
  - Focus moves to dialog
  - Focus trapped within dialog

#### 8.2. TC_A11Y_024: Verify dialog keyboard navigation

**File:** `tests/accessibility/scrum27-confirmation.spec.ts`

**Steps:**
  1. Open confirmation dialog
  2. Tab through dialog elements
  3. Verify focus stays in dialog
  4. Press Escape to close
  5. Verify focus return

**Expected Results:**
  - Tab cycles through dialog only
  - Confirm and Cancel buttons keyboard accessible
  - Escape key closes dialog
  - Focus returns to trigger button
  - No keyboard traps

#### 8.3. TC_A11Y_025: Verify dialog screen reader accessibility

**File:** `tests/accessibility/scrum27-confirmation.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Open confirmation dialog
  3. Verify title announced
  4. Verify message announced
  5. Verify button labels

**Expected Results:**
  - Dialog title announced
  - Confirmation message announced
  - Action consequences explained
  - Button labels clear
  - Warning level appropriate

#### 8.4. TC_A11Y_026: Verify dialog visual accessibility

**File:** `tests/accessibility/scrum27-confirmation.spec.ts`

**Steps:**
  1. Inspect dialog text contrast
  2. Verify title contrast
  3. Verify message contrast
  4. Test zoom to 200%
  5. Check focus indicators

**Expected Results:**
  - All text meets 4.5:1 contrast
  - Dialog overlay has sufficient opacity
  - Dialog readable at 200% zoom
  - Focus indicators visible
  - Close button has 3:1 contrast

### 9. Success Messages

**Seed:** `seed.spec.ts`

#### 9.1. TC_A11Y_027: Verify success message accessibility

**File:** `tests/accessibility/scrum27-success-messages.spec.ts`

**Steps:**
  1. Confirm disable or remove action
  2. Verify success message appears
  3. Check message announced
  4. Verify message contrast
  5. Test message dismissal

**Expected Results:**
  - Success message has role='alert' or aria-live='polite'
  - Message announced immediately
  - Message text clear: 'Link successfully disabled' or 'Link permanently removed'
  - Message has 4.5:1 contrast
  - Message dismissible with keyboard

#### 9.2. TC_A11Y_028: Verify success message keyboard handling

**File:** `tests/accessibility/scrum27-success-messages.spec.ts`

**Steps:**
  1. Trigger success message
  2. Verify focus management
  3. Tab to dismiss button
  4. Test Escape key
  5. Verify message dismissal

**Expected Results:**
  - Focus doesn't move unexpectedly
  - Dismiss button keyboard accessible
  - Escape key dismisses message
  - Message doesn't block content
  - Auto-dismiss or close button present

#### 9.3. TC_A11Y_029: Verify status update announcement

**File:** `tests/accessibility/scrum27-success-messages.spec.ts`

**Steps:**
  1. Complete disable/remove action
  2. Verify table updates
  3. Check aria-live announcement
  4. Test with screen reader
  5. Verify focus stability

**Expected Results:**
  - Table updates with new status
  - Status change has aria-live announcement
  - Update announced: 'Link status changed to Disabled'
  - Visual indicator shows change
  - No unexpected focus changes

### 10. PwD Product View Impact

**Seed:** `seed.spec.ts`

#### 10.1. TC_A11Y_030: Verify unavailable link placeholder accessibility

**File:** `tests/accessibility/scrum27-pwd-view.spec.ts`

**Steps:**
  1. View PwD product page with disabled link
  2. Verify placeholder message present
  3. Check message text and contrast
  4. Test with screen reader
  5. Verify semantic markup

**Expected Results:**
  - Placeholder message visible
  - Message text: 'This external link is currently unavailable'
  - Message has 4.5:1 contrast
  - Message announced by screen reader
  - Message has semantic markup

#### 10.2. TC_A11Y_031: Verify remaining links accessibility

**File:** `tests/accessibility/scrum27-pwd-view.spec.ts`

**Steps:**
  1. View product with partial links
  2. Tab to remaining links
  3. Verify link names
  4. Check focus indicators
  5. Test link activation

**Expected Results:**
  - Remaining links keyboard accessible
  - Links have clear accessible names
  - Link purpose clear from context
  - Focus indicators visible
  - Links activate with Enter

### 11. AP Notification

**Seed:** `seed.spec.ts`

#### 11.1. TC_A11Y_032: Verify AP notification indicator accessibility

**File:** `tests/accessibility/scrum27-ap-notification.spec.ts`

**Steps:**
  1. Login as AP
  2. Navigate to dashboard
  3. Tab to notification indicator
  4. Verify focus indicator
  5. Activate notification

**Expected Results:**
  - Notification indicator keyboard accessible
  - Indicator has accessible name
  - Unread count announced
  - Focus indicator visible
  - Notification opens on activation

#### 11.2. TC_A11Y_033: Verify notification content accessibility

**File:** `tests/accessibility/scrum27-ap-notification.spec.ts`

**Steps:**
  1. Open AP notification
  2. Enable screen reader
  3. Verify notification announced
  4. Check message content
  5. Test action links

**Expected Results:**
  - Notification title announced
  - Message content announced
  - Message: 'Your [Amazon/Website] link for product X has been disabled'
  - Reason explained
  - Action links keyboard accessible

### 12. Audit Trail

**Seed:** `seed.spec.ts`

#### 12.1. TC_A11Y_034: Verify audit log table accessibility

**File:** `tests/accessibility/scrum27-audit-trail.spec.ts`

**Steps:**
  1. Navigate to audit log
  2. Verify table structure
  3. Check table caption
  4. Verify header cells
  5. Test keyboard navigation

**Expected Results:**
  - Audit log table has proper structure
  - Table has caption or aria-label
  - Headers: Admin Name, Admin ID, Action, Timestamp, Reason, Flag Type
  - All headers have scope='col'
  - Table keyboard accessible

#### 12.2. TC_A11Y_035: Verify audit log screen reader accessibility

**File:** `tests/accessibility/scrum27-audit-trail.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate through audit log
  3. Verify entries announced
  4. Check action labels
  5. Verify timestamps

**Expected Results:**
  - All audit entries announced
  - Actions clearly labeled: 'Disabled', 'Removed', 'Restored'
  - Timestamps in accessible format
  - Admin names announced
  - Reasons announced

#### 12.3. TC_A11Y_036: Verify audit log visual accessibility

**File:** `tests/accessibility/scrum27-audit-trail.spec.ts`

**Steps:**
  1. Inspect audit log colors
  2. Verify text contrast
  3. Test zoom to 200%
  4. Check row states
  5. Verify action indicators

**Expected Results:**
  - All text meets 4.5:1 contrast
  - Table readable at 200% zoom
  - Row states visible
  - Action types distinguishable
  - No color-only information

### 13. Security Alerts

**Seed:** `seed.spec.ts`

#### 13.1. TC_A11Y_037: Verify security alert accessibility

**File:** `tests/accessibility/scrum27-security-alerts.spec.ts`

**Steps:**
  1. Trigger security alert (3+ unsafe links)
  2. Verify alert appears
  3. Check alert announced
  4. Verify alert contrast
  5. Check alert icon

**Expected Results:**
  - Alert has role='alert' or aria-live='assertive'
  - Alert announced immediately
  - Message: 'Multiple unsafe links detected from AP [Name]'
  - Alert has 4.5:1 contrast
  - Alert icon has 3:1 contrast

#### 13.2. TC_A11Y_038: Verify alert keyboard handling

**File:** `tests/accessibility/scrum27-security-alerts.spec.ts`

**Steps:**
  1. Trigger security alert
  2. Verify focus management
  3. Tab to action buttons
  4. Test Escape key
  5. Verify focus return

**Expected Results:**
  - Alert doesn't trap focus
  - View details button keyboard accessible
  - Dismiss button keyboard accessible
  - Escape key dismisses alert
  - Focus management appropriate

#### 13.3. TC_A11Y_039: Verify alert visual accessibility

**File:** `tests/accessibility/scrum27-security-alerts.spec.ts`

**Steps:**
  1. Inspect alert styling
  2. Verify severity indicators
  3. Check for color-only info
  4. Test zoom to 200%
  5. Test high contrast mode

**Expected Results:**
  - Alert severity indicated by text
  - Severity not color-only
  - Icon accompanies color
  - Alert readable at 200% zoom
  - High contrast mode compatible

### 14. Reactivation Process

**Seed:** `seed.spec.ts`

#### 14.1. TC_A11Y_040: Verify Restore button accessibility

**File:** `tests/accessibility/scrum27-reactivation.spec.ts`

**Steps:**
  1. Navigate to disabled link
  2. Tab to Restore Link button
  3. Verify focus indicator
  4. Press Enter/Space
  5. Verify confirmation opens

**Expected Results:**
  - Restore button keyboard accessible
  - Button has accessible name: 'Restore Link'
  - Focus indicator visible
  - Button activates with Enter/Space
  - Confirmation dialog opens

#### 14.2. TC_A11Y_041: Verify Restore button screen reader accessibility

**File:** `tests/accessibility/scrum27-reactivation.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Restore button
  3. Verify button name announced
  4. Verify context announced
  5. Test button activation

**Expected Results:**
  - Button role announced
  - Button name 'Restore Link' announced
  - Context provided
  - Button state announced
  - Verification requirement indicated

#### 14.3. TC_A11Y_042: Verify restoration announcement

**File:** `tests/accessibility/scrum27-reactivation.spec.ts`

**Steps:**
  1. Complete restore action
  2. Verify status update
  3. Check aria-live announcement
  4. Test with screen reader
  5. Verify visual update

**Expected Results:**
  - Restored status announced
  - Status change has aria-live
  - Update: 'Link restored to Active status'
  - Visual indicator shows change
  - Product page updates announced

### 15. Overall Interface Accessibility

**Seed:** `seed.spec.ts`

#### 15.1. TC_A11Y_043: Verify complete keyboard navigation

**File:** `tests/accessibility/scrum27-overall-interface.spec.ts`

**Steps:**
  1. Navigate entire link management workflow
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

#### 15.2. TC_A11Y_044: Verify complete screen reader accessibility

**File:** `tests/accessibility/scrum27-overall-interface.spec.ts`

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

#### 15.3. TC_A11Y_045: Verify color and contrast compliance

**File:** `tests/accessibility/scrum27-overall-interface.spec.ts`

**Steps:**
  1. Inspect all text elements
  2. Verify text contrast ratios
  3. Check UI component contrast
  4. Verify focus indicators
  5. Test high contrast mode

**Expected Results:**
  - All text meets 4.5:1 contrast (WCAG 1.4.3)
  - Large text meets 3:1 contrast
  - UI components meet 3:1 contrast (WCAG 1.4.11)
  - Focus indicators meet 3:1 contrast
  - No color-only information (WCAG 1.4.1)

#### 15.4. TC_A11Y_046: Verify responsive design accessibility

**File:** `tests/accessibility/scrum27-overall-interface.spec.ts`

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
