# SCRUM-24 Accessibility Test Plan

## Application Overview

Comprehensive accessibility test plan for Assistive Partner Deletes a Product (SCRUM-24) covering WCAG 2.1 AA compliance for delete button, confirmation dialog, system feedback, error handling, and audit trail.

## Test Scenarios

### 1. Delete Product Button Access

**Seed:** `seed.spec.ts`

#### 1.1. TC_A11Y_001: Verify Delete Product button keyboard accessibility

**File:** `tests/accessibility/scrum24-delete-button.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Management page
  3. Tab to Delete Product button for owned product
  4. Verify focus indicator is visible
  5. Press Enter/Space to activate

**Expected Results:**
  - Delete button keyboard accessible
  - Focus indicator has 3:1 contrast ratio (WCAG 2.4.7)
  - Enter/Space activates button
  - Button only available for owned products
  - No keyboard traps exist

#### 1.2. TC_A11Y_002: Verify Delete button screen reader announcement

**File:** `tests/accessibility/scrum24-delete-button.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to product list
  3. Focus on Delete Product button
  4. Verify button name and role announced
  5. Verify associated product name announced

**Expected Results:**
  - Button role announced
  - Accessible name: "Delete [Product Name]"
  - Product context announced
  - Button state announced if disabled
  - Warning conveyed in accessible name

#### 1.3. TC_A11Y_003: Verify Delete button visual accessibility

**File:** `tests/accessibility/scrum24-delete-button.spec.ts`

**Steps:**
  1. Inspect Delete button contrast
  2. Verify button text has 4.5:1 contrast
  3. Verify button at 200% zoom
  4. Check button doesn't rely on color alone
  5. Verify icon has text alternative

**Expected Results:**
  - Button text has 4.5:1 contrast (WCAG 1.4.3)
  - Button usable at 200% zoom (WCAG 1.4.4)
  - Delete action not indicated by color alone
  - Icon has accessible name or aria-label
  - Visual warning indicator present

#### 1.4. TC_A11Y_004: Verify Delete button disabled state

**File:** `tests/accessibility/scrum24-delete-button.spec.ts`

**Steps:**
  1. Navigate to product not owned by AP
  2. Verify Delete button is disabled or hidden
  3. Check disabled state announced by screen reader
  4. Verify disabled button has aria-disabled
  5. Verify disabled state has sufficient contrast

**Expected Results:**
  - Unauthorized products have disabled/hidden Delete
  - Disabled state has aria-disabled='true'
  - Screen reader announces disabled state
  - Disabled button has 3:1 contrast
  - Tooltip explains why disabled (optional)

### 2. Confirmation Dialog Accessibility

**Seed:** `seed.spec.ts`

#### 2.1. TC_A11Y_005: Verify confirmation dialog keyboard accessibility

**File:** `tests/accessibility/scrum24-confirmation-dialog.spec.ts`

**Steps:**
  1. Click Delete Product button
  2. Verify focus moves to dialog
  3. Tab through dialog controls
  4. Press Escape to close
  5. Verify focus returns to Delete button

**Expected Results:**
  - Dialog has role='dialog' or 'alertdialog'
  - Focus moves to dialog on open
  - Focus trapped within dialog
  - Escape closes dialog
  - Focus returns to trigger button

#### 2.2. TC_A11Y_006: Verify dialog screen reader announcement

**File:** `tests/accessibility/scrum24-confirmation-dialog.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Open confirmation dialog
  3. Verify dialog title announced
  4. Verify warning message announced
  5. Verify button options announced

**Expected Results:**
  - Dialog role announced: 'dialog' or 'alert dialog'
  - Dialog title announced via aria-labelledby
  - Warning message announced
  - Product name included in announcement
  - "Cannot be undone" warning announced

#### 2.3. TC_A11Y_007: Verify dialog warning message accessibility

**File:** `tests/accessibility/scrum24-confirmation-dialog.spec.ts`

**Steps:**
  1. Open confirmation dialog
  2. Verify warning text is visible
  3. Check warning has sufficient contrast
  4. Verify product name is included
  5. Verify "cannot be undone" text present

**Expected Results:**
  - Warning text: "This will permanently delete [Product Name]"
  - Text has 4.5:1 contrast ratio (WCAG 1.4.3)
  - Product name clearly identified
  - "Cannot be undone" warning visible
  - Warning icon has accessible name

#### 2.4. TC_A11Y_008: Verify dialog button accessibility

**File:** `tests/accessibility/scrum24-confirmation-dialog.spec.ts`

**Steps:**
  1. Open confirmation dialog
  2. Tab to Delete Product button
  3. Tab to Cancel button
  4. Verify focus indicators visible
  5. Test activation with Enter/Space

**Expected Results:**
  - Both buttons keyboard accessible
  - Accessible names: "Delete Product", "Cancel"
  - Focus indicators have 3:1 contrast
  - Enter/Space activates buttons
  - Tab order: Delete → Cancel (or reverse)

#### 2.5. TC_A11Y_009: Verify dialog visual accessibility

**File:** `tests/accessibility/scrum24-confirmation-dialog.spec.ts`

**Steps:**
  1. Open confirmation dialog
  2. Verify dialog has visible border/shadow
  3. Test dialog at 200% zoom
  4. Check backdrop has sufficient contrast
  5. Verify dialog doesn't rely on color alone

**Expected Results:**
  - Dialog border has 3:1 contrast
  - Dialog usable at 200% zoom
  - Backdrop darkens background (optional)
  - Warning not conveyed by color alone
  - All text readable at 200% zoom

#### 2.6. TC_A11Y_010: Verify dialog focus management

**File:** `tests/accessibility/scrum24-confirmation-dialog.spec.ts`

**Steps:**
  1. Open confirmation dialog
  2. Verify initial focus placement
  3. Tab through all controls
  4. Verify focus doesn't leave dialog
  5. Close dialog and verify focus return

**Expected Results:**
  - Initial focus on Cancel or first element
  - Tab cycles through dialog controls only
  - Shift+Tab reverses navigation
  - Focus cannot leave dialog (focus trap)
  - Focus returns to Delete button on close

### 3. Deletion Rules and Status

**Seed:** `seed.spec.ts`

#### 3.1. TC_A11Y_011: Verify published product deletion feedback

**File:** `tests/accessibility/scrum24-deletion-rules.spec.ts`

**Steps:**
  1. Delete published product
  2. Verify removal from catalog announced
  3. Check success message is accessible
  4. Verify product removed from list
  5. Verify status update announced

**Expected Results:**
  - Success message has aria-live='polite'
  - Message: "Product removed from catalog"
  - Screen reader announces removal
  - Visual update has 3:1 contrast
  - Product no longer in list

#### 3.2. TC_A11Y_012: Verify draft product deletion feedback

**File:** `tests/accessibility/scrum24-deletion-rules.spec.ts`

**Steps:**
  1. Delete draft product
  2. Verify complete deletion announced
  3. Check success message is accessible
  4. Verify product removed from list
  5. Verify no "deleted status" shown

**Expected Results:**
  - Success message has aria-live='polite'
  - Message: "Draft product deleted"
  - Complete removal announced
  - Product not in list
  - No soft delete status shown

#### 3.3. TC_A11Y_013: Verify deleted status indicator accessibility

**File:** `tests/accessibility/scrum24-deletion-rules.spec.ts`

**Steps:**
  1. Delete listed product
  2. Verify "Deleted" status appears
  3. Check status announced by screen reader
  4. Verify status has sufficient contrast
  5. Verify status not conveyed by color alone

**Expected Results:**
  - Status label: "Deleted"
  - Screen reader announces status
  - Status has 4.5:1 contrast ratio
  - Status includes text, not just color
  - Status icon has accessible name

### 4. System Feedback Messages

**Seed:** `seed.spec.ts`

#### 4.1. TC_A11Y_014: Verify success message accessibility

**File:** `tests/accessibility/scrum24-feedback-messages.spec.ts`

**Steps:**
  1. Successfully delete product
  2. Verify success message appears
  3. Check screen reader announces message
  4. Verify message has sufficient contrast
  5. Verify message is dismissible

**Expected Results:**
  - Message has role='alert' or aria-live='polite'
  - Text: "Product 'X' deleted successfully"
  - Text has 4.5:1 contrast ratio
  - Screen reader announces message
  - Close button keyboard accessible

#### 4.2. TC_A11Y_015: Verify success message timing

**File:** `tests/accessibility/scrum24-feedback-messages.spec.ts`

**Steps:**
  1. Delete product
  2. Verify message appears immediately
  3. Check message remains visible
  4. Verify auto-dismiss timing (if applicable)
  5. Verify manual dismiss option

**Expected Results:**
  - Message appears within 1 second
  - Message visible for at least 5 seconds
  - Auto-dismiss after reasonable time
  - Manual dismiss button available
  - Dismiss button keyboard accessible

#### 4.3. TC_A11Y_016: Verify success message visual design

**File:** `tests/accessibility/scrum24-feedback-messages.spec.ts`

**Steps:**
  1. Display success message
  2. Verify message has clear visual design
  3. Test message at 200% zoom
  4. Check success icon is accessible
  5. Verify message doesn't rely on color alone

**Expected Results:**
  - Message has clear border/background
  - Message readable at 200% zoom
  - Success icon has accessible name
  - Success not indicated by color alone
  - All text has 4.5:1 contrast

### 5. Error Handling

**Seed:** `seed.spec.ts`

#### 5.1. TC_A11Y_017: Verify system error message accessibility

**File:** `tests/accessibility/scrum24-error-handling.spec.ts`

**Steps:**
  1. Simulate deletion system error
  2. Verify error message appears
  3. Check screen reader announces error
  4. Verify error has sufficient contrast
  5. Verify retry option is accessible

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Message: "Unable to delete. Try again later"
  - Text has 4.5:1 contrast ratio
  - Screen reader announces error
  - Retry/support options keyboard accessible

#### 5.2. TC_A11Y_018: Verify unauthorized deletion error

**File:** `tests/accessibility/scrum24-error-handling.spec.ts`

**Steps:**
  1. Attempt to delete unauthorized product
  2. Verify error message appears
  3. Check screen reader announces error
  4. Verify error has sufficient contrast
  5. Verify error clearly states reason

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Message: "No permission to delete this product"
  - Text has 4.5:1 contrast ratio
  - Reason clearly stated
  - Error icon has accessible name

#### 5.3. TC_A11Y_019: Verify error message focus management

**File:** `tests/accessibility/scrum24-error-handling.spec.ts`

**Steps:**
  1. Trigger deletion error
  2. Verify focus moves to error or remains
  3. Check error is keyboard accessible
  4. Verify dismiss button is accessible
  5. Verify focus after dismiss

**Expected Results:**
  - Focus moves to error or stays on button
  - Error message keyboard accessible
  - Dismiss button has accessible name
  - Enter/Space dismisses error
  - Focus returns to logical element

#### 5.4. TC_A11Y_020: Verify error message visual design

**File:** `tests/accessibility/scrum24-error-handling.spec.ts`

**Steps:**
  1. Display error message
  2. Verify error has clear visual design
  3. Test error at 200% zoom
  4. Check error icon is accessible
  5. Verify error doesn't rely on color alone

**Expected Results:**
  - Error has distinct border/background
  - Error readable at 200% zoom
  - Error icon has accessible name
  - Error not indicated by color alone
  - All text has 4.5:1 contrast

### 6. Product List Updates

**Seed:** `seed.spec.ts`

#### 6.1. TC_A11Y_021: Verify product removal from list

**File:** `tests/accessibility/scrum24-list-updates.spec.ts`

**Steps:**
  1. Delete product
  2. Verify product removed from list
  3. Check removal announced by screen reader
  4. Verify focus moves to next item
  5. Verify list count updates

**Expected Results:**
  - Product removed from visual list
  - Removal announced via aria-live
  - Focus moves to next/previous product
  - List count updates and announced
  - No empty placeholder remains

#### 6.2. TC_A11Y_022: Verify deleted status in list

**File:** `tests/accessibility/scrum24-list-updates.spec.ts`

**Steps:**
  1. Delete listed product (soft delete)
  2. Verify product shows "Deleted" status
  3. Check status announced by screen reader
  4. Verify product remains in list
  5. Verify status has sufficient contrast

**Expected Results:**
  - Product remains in list with status
  - Status: "Deleted" announced
  - Status has 4.5:1 contrast ratio
  - Status not conveyed by color alone
  - Product actions disabled/hidden

#### 6.3. TC_A11Y_023: Verify empty list state

**File:** `tests/accessibility/scrum24-list-updates.spec.ts`

**Steps:**
  1. Delete all products
  2. Verify empty state message appears
  3. Check message announced by screen reader
  4. Verify message has sufficient contrast
  5. Verify add product option is accessible

**Expected Results:**
  - Empty state message visible
  - Message: "No products available"
  - Screen reader announces empty state
  - Text has 4.5:1 contrast ratio
  - Add product button keyboard accessible

### 7. Notification to Interested Users

**Seed:** `seed.spec.ts`

#### 7.1. TC_A11Y_024: Verify notification trigger accessibility

**File:** `tests/accessibility/scrum24-notifications.spec.ts`

**Steps:**
  1. Delete product with interested users
  2. Verify notification sent indicator
  3. Check indicator announced by screen reader
  4. Verify indicator has sufficient contrast
  5. Verify notification details accessible

**Expected Results:**
  - Notification indicator visible
  - Indicator announced by screen reader
  - Text has 4.5:1 contrast ratio
  - Notification count shown (if applicable)
  - Details link keyboard accessible

### 8. Hard Delete for Under Review Products

**Seed:** `seed.spec.ts`

#### 8.1. TC_A11Y_025: Verify hard delete option accessibility

**File:** `tests/accessibility/scrum24-hard-delete.spec.ts`

**Steps:**
  1. Navigate to under review product
  2. Verify hard delete option available
  3. Tab to hard delete button
  4. Verify button is keyboard accessible
  5. Verify button clearly labeled

**Expected Results:**
  - Hard delete button keyboard accessible
  - Accessible name: "Permanently delete"
  - Focus indicator has 3:1 contrast
  - Button distinct from soft delete
  - Warning conveyed in label

#### 8.2. TC_A11Y_026: Verify hard delete confirmation dialog

**File:** `tests/accessibility/scrum24-hard-delete.spec.ts`

**Steps:**
  1. Click hard delete button
  2. Verify confirmation dialog appears
  3. Check dialog has stronger warning
  4. Verify dialog is keyboard accessible
  5. Verify warning announced by screen reader

**Expected Results:**
  - Dialog has role='alertdialog'
  - Warning: "Permanently delete - cannot be recovered"
  - Dialog keyboard accessible
  - Warning announced by screen reader
  - Buttons clearly labeled

### 9. Associated Media Handling

**Seed:** `seed.spec.ts`

#### 9.1. TC_A11Y_027: Verify media removal feedback

**File:** `tests/accessibility/scrum24-media-handling.spec.ts`

**Steps:**
  1. Delete product with media
  2. Verify media removal mentioned in feedback
  3. Check feedback announced by screen reader
  4. Verify no broken links remain
  5. Verify media status updated

**Expected Results:**
  - Success message mentions media removal
  - Message announced by screen reader
  - No broken image placeholders
  - Media marked inactive in system
  - Feedback has 4.5:1 contrast

### 10. Audit Trail Indicator

**Seed:** `seed.spec.ts`

#### 10.1. TC_A11Y_028: Verify audit log indicator accessibility

**File:** `tests/accessibility/scrum24-audit-trail.spec.ts`

**Steps:**
  1. Delete product
  2. Verify audit log indicator present
  3. Check indicator announced by screen reader
  4. Verify indicator has sufficient contrast
  5. Verify audit details link accessible

**Expected Results:**
  - Audit indicator visible
  - Indicator announced: "Deletion logged"
  - Text has 4.5:1 contrast ratio
  - View audit link keyboard accessible
  - Link has clear accessible name

#### 10.2. TC_A11Y_029: Verify audit details accessibility

**File:** `tests/accessibility/scrum24-audit-trail.spec.ts`

**Steps:**
  1. Navigate to audit details
  2. Verify audit information is accessible
  3. Check table structure is semantic
  4. Verify all data has sufficient contrast
  5. Verify audit data at 200% zoom

**Expected Results:**
  - Audit table has proper headers
  - Headers have scope attribute
  - All text has 4.5:1 contrast
  - Table readable at 200% zoom
  - Screen reader announces table structure

### 11. Overall Interface Accessibility

**Seed:** `seed.spec.ts`

#### 11.1. TC_A11Y_030: Verify page title and landmarks

**File:** `tests/accessibility/scrum24-overall-interface.spec.ts`

**Steps:**
  1. Navigate to Product Management page
  2. Verify page title is descriptive
  3. Use screen reader to navigate by landmarks
  4. Verify main, navigation landmarks exist
  5. Verify skip links present

**Expected Results:**
  - Page title: "Product Management"
  - Main content has role='main'
  - Navigation has role='navigation'
  - Skip to main content link available
  - All landmarks have accessible names

#### 11.2. TC_A11Y_031: Verify heading hierarchy

**File:** `tests/accessibility/scrum24-overall-interface.spec.ts`

**Steps:**
  1. Navigate through page
  2. Use screen reader to list headings
  3. Verify heading levels are sequential
  4. Verify no heading levels skipped
  5. Verify headings describe sections

**Expected Results:**
  - Heading hierarchy is logical (h1 → h2 → h3)
  - No heading levels skipped
  - Each section has descriptive heading
  - Headings have 4.5:1 contrast ratio
  - Screen reader can navigate by headings

#### 11.3. TC_A11Y_032: Verify overall keyboard navigation

**File:** `tests/accessibility/scrum24-overall-interface.spec.ts`

**Steps:**
  1. Navigate entire page using only keyboard
  2. Verify all interactive elements accessible
  3. Verify no keyboard traps
  4. Verify focus order is logical
  5. Verify focus always visible

**Expected Results:**
  - All controls keyboard accessible
  - Tab order follows visual layout
  - No keyboard traps exist
  - Focus indicators always visible (3:1 contrast)
  - Shift+Tab reverses navigation

#### 11.4. TC_A11Y_033: Verify color contrast throughout interface

**File:** `tests/accessibility/scrum24-overall-interface.spec.ts`

**Steps:**
  1. Inspect all text elements
  2. Verify normal text has 4.5:1 contrast
  3. Verify large text has 3:1 contrast
  4. Verify UI components have 3:1 contrast
  5. Test in high contrast mode

**Expected Results:**
  - Normal text: 4.5:1 contrast (WCAG 1.4.3)
  - Large text (18pt+): 3:1 contrast
  - UI components: 3:1 contrast (WCAG 1.4.11)
  - Focus indicators: 3:1 contrast
  - Interface usable in high contrast mode

#### 11.5. TC_A11Y_034: Verify responsive design at 200% zoom

**File:** `tests/accessibility/scrum24-overall-interface.spec.ts`

**Steps:**
  1. Set browser zoom to 200%
  2. Navigate through entire interface
  3. Verify all content remains visible
  4. Verify no horizontal scrolling required
  5. Verify all controls remain functional

**Expected Results:**
  - All content visible at 200% zoom (WCAG 1.4.4)
  - No horizontal scrolling required
  - Text doesn't overlap or truncate
  - All controls remain accessible
  - Layout adapts appropriately

#### 11.6. TC_A11Y_035: Verify no information conveyed by color alone

**File:** `tests/accessibility/scrum24-overall-interface.spec.ts`

**Steps:**
  1. Review all status indicators
  2. Verify deleted status has text label
  3. Check error states have icons/text
  4. Verify success states have icons/text
  5. Test interface in grayscale mode

**Expected Results:**
  - All statuses have text labels
  - Errors have icons and text
  - Success has icons and text
  - No information by color alone (WCAG 1.4.1)
  - Interface usable in grayscale

