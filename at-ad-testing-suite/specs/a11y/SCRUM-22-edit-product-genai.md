# SCRUM-22 Accessibility Test Plan

## Application Overview

Comprehensive accessibility test plan for Edit Product with GenAI feature (SCRUM-22) covering WCAG 2.1 AA compliance for Edit Product button, product edit form, Enhance with GenAI buttons, ALT text generation, side-by-side comparison, Accept/Edit/Reject actions, version control, confirmation messages, audit logging, and help icons.

## Test Scenarios

### 1. Edit Product Access

**Seed:** `seed.spec.ts`

#### 1.1. TC_A11Y_001: Verify Edit Product button accessibility

**File:** `tests/accessibility/scrum22-edit-access.spec.ts`

**Steps:**
  1. Navigate to Product Management
  2. Tab to Edit Product button in actions column
  3. Verify focus indicator visible
  4. Press Enter/Space to activate
  5. Verify edit form opens

**Expected Results:**
  - Edit button keyboard accessible
  - Button has accessible name: 'Edit Product'
  - Focus indicator visible with 3:1 contrast
  - Button activates with Enter/Space
  - Edit form opens

#### 1.2. TC_A11Y_002: Verify Edit button screen reader accessibility

**File:** `tests/accessibility/scrum22-edit-access.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Edit button
  3. Verify button name announced
  4. Verify button role announced
  5. Test button activation

**Expected Results:**
  - Button role announced
  - Button name 'Edit Product' announced
  - Context provided (e.g., 'Edit [Product Name]')
  - Button state announced
  - No empty or generic labels

#### 1.3. TC_A11Y_003: Verify edit form structure

**File:** `tests/accessibility/scrum22-edit-access.spec.ts`

**Steps:**
  1. Open edit form
  2. Use screen reader heading navigation
  3. Verify form title heading
  4. Check section headings
  5. Verify heading hierarchy

**Expected Results:**
  - Form has proper heading structure
  - Form title is h1 or h2
  - Section headings are h2 or h3
  - Heading hierarchy logical
  - All headings announced

### 2. Enhance with GenAI Buttons

**Seed:** `seed.spec.ts`

#### 2.1. TC_A11Y_004: Verify Enhance with GenAI button accessibility

**File:** `tests/accessibility/scrum22-enhance-buttons.spec.ts`

**Steps:**
  1. Open edit form with existing content
  2. Tab to Enhance with GenAI buttons
  3. Verify focus indicators
  4. Test button activation
  5. Verify button states

**Expected Results:**
  - Enhance buttons keyboard accessible
  - Buttons present for: Short Description, Detailed Description, Specifications, ALT Text
  - Focus indicators visible
  - Buttons activate with Enter/Space
  - Buttons enabled only when text present

#### 2.2. TC_A11Y_005: Verify Enhance button screen reader accessibility

**File:** `tests/accessibility/scrum22-enhance-buttons.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Enhance buttons
  3. Tab through each button
  4. Verify button names announced
  5. Verify tooltip announced

**Expected Results:**
  - Button role announced
  - Button name announced with field context
  - Tooltip text announced on focus
  - Tooltip: 'Use GenAI to improve clarity, tone, or accessibility'
  - Button state announced

#### 2.3. TC_A11Y_006: Verify button tooltip accessibility

**File:** `tests/accessibility/scrum22-enhance-buttons.spec.ts`

**Steps:**
  1. Navigate to Enhance button
  2. Trigger tooltip with focus
  3. Trigger tooltip with hover
  4. Verify tooltip announced
  5. Test tooltip dismissal

**Expected Results:**
  - Tooltip triggered by focus and hover
  - Tooltip has role='tooltip'
  - Tooltip content announced
  - Escape dismisses tooltip
  - Tooltip has 4.5:1 contrast

#### 2.4. TC_A11Y_007: Verify button disabled state

**File:** `tests/accessibility/scrum22-enhance-buttons.spec.ts`

**Steps:**
  1. Open edit form with empty field
  2. Navigate to Enhance button
  3. Verify button disabled
  4. Check disabled state announced
  5. Test tooltip

**Expected Results:**
  - Button disabled if field empty
  - Disabled state has aria-disabled='true'
  - Disabled state announced
  - Visual indicator shows disabled
  - Tooltip explains requirement

### 3. ALT Text Generation

**Seed:** `seed.spec.ts`

#### 3.1. TC_A11Y_008: Verify ALT text generation button accessibility

**File:** `tests/accessibility/scrum22-alt-text.spec.ts`

**Steps:**
  1. Navigate to image section
  2. Tab to ALT text GenAI button
  3. Verify focus indicator
  4. Press Enter/Space
  5. Verify ALT text generated

**Expected Results:**
  - ALT text button keyboard accessible
  - Button has accessible name: 'Add/Improve ALT Text with GenAI'
  - Focus indicator visible
  - Button activates with Enter/Space
  - GenAI generates ALT text

#### 3.2. TC_A11Y_009: Verify ALT text field accessibility

**File:** `tests/accessibility/scrum22-alt-text.spec.ts`

**Steps:**
  1. Generate ALT text
  2. Navigate to ALT text field
  3. Verify field label
  4. Check character limit indicator
  5. Test with screen reader

**Expected Results:**
  - Generated ALT text announced
  - ALT text field has label
  - Character limit indicated: '~125 characters'
  - Character count announced
  - Remaining characters announced

#### 3.3. TC_A11Y_010: Verify ALT text quality

**File:** `tests/accessibility/scrum22-alt-text.spec.ts`

**Steps:**
  1. Generate ALT text for various images
  2. Review generated text
  3. Verify no redundant phrasing
  4. Check description clarity
  5. Verify accessibility compliance

**Expected Results:**
  - ALT text avoids 'image of' phrasing
  - Description is clear and neutral
  - Key visual details included
  - Text relevant to PwD users
  - Text follows accessibility guidelines

#### 3.4. TC_A11Y_011: Verify ALT text editing accessibility

**File:** `tests/accessibility/scrum22-alt-text.spec.ts`

**Steps:**
  1. Generate ALT text
  2. Edit ALT text with keyboard
  3. Verify character count updates
  4. Test character limit
  5. Verify save functionality

**Expected Results:**
  - ALT text field keyboard editable
  - Edit preserves character count
  - Character limit enforced
  - Exceeding limit announced
  - Save button updates with edits

### 4. Side-by-Side Comparison

**Seed:** `seed.spec.ts`

#### 4.1. TC_A11Y_012: Verify comparison view structure

**File:** `tests/accessibility/scrum22-comparison.spec.ts`

**Steps:**
  1. Trigger GenAI enhancement
  2. Verify comparison view appears
  3. Check semantic structure
  4. Verify labels present
  5. Test keyboard navigation

**Expected Results:**
  - Comparison view has semantic structure
  - Original and suggested text clearly labeled
  - Labels: 'Original' and 'AI Suggested'
  - Both versions keyboard accessible
  - Visual distinction clear

#### 4.2. TC_A11Y_013: Verify comparison screen reader accessibility

**File:** `tests/accessibility/scrum22-comparison.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate comparison view
  3. Verify original text announced
  4. Verify suggested text announced
  5. Test navigation

**Expected Results:**
  - Original text announced with label
  - Suggested text announced with label
  - Differences highlighted
  - Highlights announced by screen reader
  - Navigation between versions clear

#### 4.3. TC_A11Y_014: Verify comparison visual accessibility

**File:** `tests/accessibility/scrum22-comparison.spec.ts`

**Steps:**
  1. Inspect comparison view colors
  2. Verify text contrast ratios
  3. Check for color-only indicators
  4. Verify label contrast
  5. Test zoom to 200%

**Expected Results:**
  - Original text has 4.5:1 contrast
  - Suggested text has 4.5:1 contrast
  - Visual distinction not color-only (WCAG 1.4.1)
  - Labels have 4.5:1 contrast
  - Comparison readable at 200% zoom

#### 4.4. TC_A11Y_015: Verify difference highlighting accessibility

**File:** `tests/accessibility/scrum22-comparison.spec.ts`

**Steps:**
  1. Review highlighted differences
  2. Verify text labels present
  3. Check for non-color indicators
  4. Verify highlight contrast
  5. Test with screen reader

**Expected Results:**
  - Differences highlighted with text labels
  - Highlights use icons or patterns
  - Highlight meaning clear without color
  - Highlight has 3:1 contrast
  - Highlight announced by screen reader

### 5. Action Buttons

**Seed:** `seed.spec.ts`

#### 5.1. TC_A11Y_016: Verify action buttons keyboard accessibility

**File:** `tests/accessibility/scrum22-action-buttons.spec.ts`

**Steps:**
  1. View AI suggestions
  2. Tab through action buttons
  3. Verify focus indicators
  4. Test button activation
  5. Verify tab order

**Expected Results:**
  - All action buttons keyboard accessible
  - Buttons: Accept All, Edit/Merge, Reject
  - Focus indicators visible
  - Buttons activate with Enter/Space
  - Tab order logical

#### 5.2. TC_A11Y_017: Verify action buttons screen reader accessibility

**File:** `tests/accessibility/scrum22-action-buttons.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to action buttons
  3. Verify button names announced
  4. Activate each button
  5. Verify action results announced

**Expected Results:**
  - Button roles announced
  - Button names announced: 'Accept All', 'Edit/Merge', 'Reject'
  - Button states announced
  - Action results announced
  - No empty or generic labels

#### 5.3. TC_A11Y_018: Verify action buttons visual accessibility

**File:** `tests/accessibility/scrum22-action-buttons.spec.ts`

**Steps:**
  1. Inspect button colors
  2. Verify text contrast
  3. Verify background contrast
  4. Test hover/focus states
  5. Measure touch targets

**Expected Results:**
  - Button text has 4.5:1 contrast
  - Button backgrounds have 3:1 contrast
  - Hover/focus states visible
  - Buttons distinguishable
  - Touch targets meet 44x44px

### 6. Accept All Action

**Seed:** `seed.spec.ts`

#### 6.1. TC_A11Y_019: Verify Accept All functionality

**File:** `tests/accessibility/scrum22-accept-action.spec.ts`

**Steps:**
  1. View AI suggestions
  2. Activate Accept All button
  3. Verify text replaced
  4. Check announcement
  5. Verify focus management

**Expected Results:**
  - Accept action replaces original text
  - Replacement announced: 'AI suggestions accepted'
  - Form field updates
  - Update announced by screen reader
  - Focus moves to updated field

#### 6.2. TC_A11Y_020: Verify Accept All announcement

**File:** `tests/accessibility/scrum22-accept-action.spec.ts`

**Steps:**
  1. Accept AI suggestions
  2. Verify aria-live announcement
  3. Check focus stability
  4. Test undo if available
  5. Verify view closes

**Expected Results:**
  - Accepted text has aria-live announcement
  - Update doesn't disrupt focus
  - Visual indicator shows acceptance
  - Undo option keyboard accessible if available
  - Comparison view closes

### 7. Edit/Merge Action

**Seed:** `seed.spec.ts`

#### 7.1. TC_A11Y_021: Verify Edit/Merge mode accessibility

**File:** `tests/accessibility/scrum22-edit-merge.spec.ts`

**Steps:**
  1. Activate Edit/Merge button
  2. Verify textarea appears
  3. Check textarea content
  4. Test keyboard editing
  5. Verify reference text

**Expected Results:**
  - Edit mode activates textarea
  - Textarea contains suggested text
  - Textarea keyboard accessible
  - Original text available for reference
  - Character count shown if applicable

#### 7.2. TC_A11Y_022: Verify Edit/Merge screen reader accessibility

**File:** `tests/accessibility/scrum22-edit-merge.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Activate Edit/Merge
  3. Verify textarea announced
  4. Type edits
  5. Test Save/Cancel buttons

**Expected Results:**
  - Textarea role announced
  - Label announced
  - Current text announced
  - Edits announced as typed
  - Save/Cancel buttons keyboard accessible

#### 7.3. TC_A11Y_023: Verify Edit/Merge action buttons

**File:** `tests/accessibility/scrum22-edit-merge.spec.ts`

**Steps:**
  1. Enter edit mode
  2. Tab to Save/Cancel buttons
  3. Verify focus indicators
  4. Test button activation
  5. Verify Cancel behavior

**Expected Results:**
  - Save button has accessible name
  - Cancel button has accessible name
  - Focus indicators visible
  - Buttons activate with Enter/Space
  - Cancel restores original

### 8. Reject Action

**Seed:** `seed.spec.ts`

#### 8.1. TC_A11Y_024: Verify Reject functionality

**File:** `tests/accessibility/scrum22-reject-action.spec.ts`

**Steps:**
  1. View AI suggestions
  2. Activate Reject button
  3. Verify original text retained
  4. Check announcement
  5. Verify focus management

**Expected Results:**
  - Reject action retains original text
  - Rejection announced: 'AI suggestions rejected'
  - Original text remains in field
  - Comparison view closes
  - Focus returns to form field

#### 8.2. TC_A11Y_025: Verify Reject announcement

**File:** `tests/accessibility/scrum22-reject-action.spec.ts`

**Steps:**
  1. Reject AI suggestions
  2. Verify aria-live announcement
  3. Check focus stability
  4. Verify view closes
  5. Test form editability

**Expected Results:**
  - Rejection has aria-live announcement
  - Update doesn't disrupt focus
  - Visual indicator shows rejection
  - Comparison view closes
  - Form remains editable

### 9. Save Changes

**Seed:** `seed.spec.ts`

#### 9.1. TC_A11Y_026: Verify Save Changes button accessibility

**File:** `tests/accessibility/scrum22-save-changes.spec.ts`

**Steps:**
  1. Make edits to product
  2. Tab to Save Changes button
  3. Verify focus indicator
  4. Press Enter/Space
  5. Verify confirmation

**Expected Results:**
  - Save Changes button keyboard accessible
  - Button has accessible name
  - Focus indicator visible
  - Button activates with Enter/Space
  - Confirmation appears

#### 9.2. TC_A11Y_027: Verify Save button screen reader accessibility

**File:** `tests/accessibility/scrum22-save-changes.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Save button
  3. Verify button announced
  4. Activate button
  5. Verify progress announced

**Expected Results:**
  - Button role announced
  - Button name 'Save Changes' announced
  - Button state announced
  - Saving progress announced
  - Completion announced

#### 9.3. TC_A11Y_028: Verify save confirmation accessibility

**File:** `tests/accessibility/scrum22-save-changes.spec.ts`

**Steps:**
  1. Save changes
  2. Verify confirmation appears
  3. Check message announced
  4. Verify message contrast
  5. Test message dismissal

**Expected Results:**
  - Confirmation has role='alert' or aria-live
  - Message: 'Your product details have been updated and submitted for review'
  - Message announced immediately
  - Message has 4.5:1 contrast
  - Message dismissible with keyboard

### 10. Version Control Indicator

**Seed:** `seed.spec.ts`

#### 10.1. TC_A11Y_029: Verify version control accessibility

**File:** `tests/accessibility/scrum22-version-control.spec.ts`

**Steps:**
  1. Save edited product
  2. Locate version indicator
  3. Verify version info
  4. Test with screen reader
  5. Test rollback if available

**Expected Results:**
  - Version indicator visible
  - Indicator shows current version
  - Previous version accessible
  - Version info announced by screen reader
  - Rollback option keyboard accessible

#### 10.2. TC_A11Y_030: Verify status change announcement

**File:** `tests/accessibility/scrum22-version-control.spec.ts`

**Steps:**
  1. Save changes
  2. Verify status updates
  3. Check status announcement
  4. Verify status badge
  5. Check visual indicators

**Expected Results:**
  - Status change announced
  - New status: 'Pending Review'
  - Status has aria-live announcement
  - Status badge has 4.5:1 contrast
  - Status not color-only

### 11. Error Handling

**Seed:** `seed.spec.ts`

#### 11.1. TC_A11Y_031: Verify GenAI unavailable error accessibility

**File:** `tests/accessibility/scrum22-errors.spec.ts`

**Steps:**
  1. Trigger GenAI when service unavailable
  2. Verify error message appears
  3. Check error announcement
  4. Verify error contrast
  5. Check error icon

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Error announced immediately
  - Message: 'AI assistant is temporarily offline'
  - Error has 4.5:1 contrast
  - Error icon has 3:1 contrast

#### 11.2. TC_A11Y_032: Verify error keyboard handling

**File:** `tests/accessibility/scrum22-errors.spec.ts`

**Steps:**
  1. Trigger error
  2. Verify focus management
  3. Tab to dismiss button
  4. Test Escape key
  5. Test retry option

**Expected Results:**
  - Error doesn't trap focus
  - Dismiss button keyboard accessible
  - Escape key dismisses error
  - Focus returns appropriately
  - Retry option keyboard accessible

#### 11.3. TC_A11Y_033: Verify form validation errors

**File:** `tests/accessibility/scrum22-errors.spec.ts`

**Steps:**
  1. Submit form with errors
  2. Verify validation errors
  3. Check error announcements
  4. Verify error-field association
  5. Test error navigation

**Expected Results:**
  - Validation errors announced
  - Errors linked to fields with aria-describedby
  - Required field errors clear
  - Error summary provided if multiple
  - Errors keyboard accessible

### 12. Audit Logging Indicator

**Seed:** `seed.spec.ts`

#### 12.1. TC_A11Y_034: Verify audit log indicator accessibility

**File:** `tests/accessibility/scrum22-audit.spec.ts`

**Steps:**
  1. Save AI-edited content
  2. Verify indicator appears
  3. Check indicator content
  4. Test with screen reader
  5. Verify text contrast

**Expected Results:**
  - AI-edit indicator visible
  - Indicator shows timestamp and user
  - Indicator has 4.5:1 contrast
  - Indicator announced by screen reader
  - Indicator has semantic markup

#### 12.2. TC_A11Y_035: Verify audit indicator details

**File:** `tests/accessibility/scrum22-audit.spec.ts`

**Steps:**
  1. Locate audit indicator
  2. Check icon accessibility
  3. Test tooltip if present
  4. Verify layout
  5. Test zoom to 200%

**Expected Results:**
  - Indicator icon keyboard accessible if interactive
  - Icon has accessible name
  - Tooltip provides details
  - Indicator doesn't block content
  - Indicator readable at 200% zoom

### 13. Disclaimer Text

**Seed:** `seed.spec.ts`

#### 13.1. TC_A11Y_036: Verify disclaimer accessibility

**File:** `tests/accessibility/scrum22-disclaimer.spec.ts`

**Steps:**
  1. Open GenAI panel
  2. Locate disclaimer text
  3. Verify text content
  4. Check text contrast
  5. Test with screen reader

**Expected Results:**
  - Disclaimer visible on GenAI panel
  - Text: 'AI-generated content must be reviewed before publishing'
  - Disclaimer has 4.5:1 contrast
  - Disclaimer announced by screen reader
  - Disclaimer has semantic markup

#### 13.2. TC_A11Y_037: Verify disclaimer structure

**File:** `tests/accessibility/scrum22-disclaimer.spec.ts`

**Steps:**
  1. Inspect disclaimer markup
  2. Check ARIA attributes
  3. Verify semantic structure
  4. Test zoom to 200%
  5. Verify layout

**Expected Results:**
  - Disclaimer has role='note' or <aside>
  - Disclaimer has aria-label if needed
  - Text clearly associated with GenAI
  - Disclaimer readable at 200% zoom
  - Disclaimer doesn't block content

### 14. Help Icons and Tips

**Seed:** `seed.spec.ts`

#### 14.1. TC_A11Y_038: Verify help icon accessibility

**File:** `tests/accessibility/scrum22-help-icons.spec.ts`

**Steps:**
  1. Navigate to help icons
  2. Tab to help icons
  3. Verify focus indicators
  4. Press Enter/Space
  5. Verify tips appear

**Expected Results:**
  - Help icons keyboard accessible
  - Icons have accessible names
  - Icons have role='button'
  - Focus indicators visible
  - Icons activate with Enter/Space

#### 14.2. TC_A11Y_039: Verify help icon screen reader accessibility

**File:** `tests/accessibility/scrum22-help-icons.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to help icons
  3. Verify icon announced
  4. Trigger tooltip
  5. Verify tooltip announced

**Expected Results:**
  - Icon role announced
  - Icon name announced: 'Help' or 'Accessibility tip'
  - Tooltip triggered by focus and hover
  - Tooltip content announced
  - Escape dismisses tooltip

#### 14.3. TC_A11Y_040: Verify help tip content accessibility

**File:** `tests/accessibility/scrum22-help-icons.spec.ts`

**Steps:**
  1. Open help tips
  2. Review tip content
  3. Verify text contrast
  4. Test zoom to 200%
  5. Test tip dismissal

**Expected Results:**
  - Tips provide clear guidance
  - Examples: 'Write effective accessibility-compliant content'
  - Tips have 4.5:1 contrast
  - Tips readable at 200% zoom
  - Tips keyboard dismissible

### 15. Overall Interface Accessibility

**Seed:** `seed.spec.ts`

#### 15.1. TC_A11Y_041: Verify complete keyboard navigation

**File:** `tests/accessibility/scrum22-overall-interface.spec.ts`

**Steps:**
  1. Navigate entire edit workflow
  2. Tab through all elements
  3. Verify tab order logical
  4. Test all interactive elements
  5. Verify no keyboard traps

**Expected Results:**
  - All interactive elements keyboard accessible
  - Tab order follows visual layout
  - Focus indicators visible on all elements
  - No keyboard traps exist
  - All actions completable with keyboard

#### 15.2. TC_A11Y_042: Verify complete screen reader accessibility

**File:** `tests/accessibility/scrum22-overall-interface.spec.ts`

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

#### 15.3. TC_A11Y_043: Verify color and contrast compliance

**File:** `tests/accessibility/scrum22-overall-interface.spec.ts`

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

#### 15.4. TC_A11Y_044: Verify responsive design accessibility

**File:** `tests/accessibility/scrum22-overall-interface.spec.ts`

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
  - Form adapts to viewport
  - No content loss at zoom
