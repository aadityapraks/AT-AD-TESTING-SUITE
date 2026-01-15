# Accessibility Test Plan: AP Managing Product Dashboard (WCAG 2.1 AA)

## Application Overview

Comprehensive accessibility test plan for Assistive Partner Product Management Dashboard ensuring WCAG 2.1 AA compliance. Tests cover navigation, status tabs, product listing table, search/filter/sort controls, actions menu, and dynamic content updates.

## Test Scenarios

### 1. Navigation and Page Structure

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Page has proper heading hierarchy

**File:** `tests/accessibility/SCRUM-111/page-structure.spec.ts`

**Steps:**
  1. Navigate to Product Management dashboard
  2. Use screen reader heading navigation (H key)
  3. Verify H1 exists for page title
  4. Verify H2 for major sections (Status Overview, Product Listing, Approval Timeline)
  5. Check no heading levels are skipped

**Expected Results:**
  - One H1 per page ('Product Management' or similar)
  - Logical heading hierarchy without skipped levels
  - Screen reader can navigate by headings
  - All sections have descriptive headings

#### 1.2. TC_A11Y_002: Product Management navigation link accessible

**File:** `tests/accessibility/SCRUM-111/navigation-link.spec.ts`

**Steps:**
  1. Navigate to main dashboard
  2. Tab to Product Management navigation link
  3. Verify focus indicator visible
  4. Press Enter to activate
  5. Verify active state visually indicated
  6. Check aria-current='page' attribute present

**Expected Results:**
  - Link keyboard accessible with Tab
  - Focus indicator has 3:1 contrast minimum
  - Enter activates navigation
  - Active tab has aria-current='page'
  - Visual highlight distinguishable without color alone

#### 1.3. TC_A11Y_003: Skip to main content link present

**File:** `tests/accessibility/SCRUM-111/skip-link.spec.ts`

**Steps:**
  1. Load Product Management page
  2. Press Tab once from page load
  3. Verify skip link becomes visible
  4. Press Enter to activate
  5. Verify focus moves to main content

**Expected Results:**
  - Skip link is first focusable element
  - Link visible on focus
  - Activating skips navigation
  - Focus moves to product listing area

#### 1.4. TC_A11Y_004: Landmark regions properly defined

**File:** `tests/accessibility/SCRUM-111/landmarks.spec.ts`

**Steps:**
  1. Navigate to Product Management page
  2. Use screen reader landmark navigation
  3. Verify banner/header landmark exists
  4. Verify navigation landmark exists
  5. Verify main landmark exists
  6. Verify contentinfo/footer landmark exists

**Expected Results:**
  - Page has proper landmark structure
  - Main content in <main> or role='main'
  - Navigation in <nav> or role='navigation'
  - Screen reader can navigate by landmarks

### 2. Status Summary Tabs

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_005: Status tabs keyboard accessible

**File:** `tests/accessibility/SCRUM-111/status-tabs-keyboard.spec.ts`

**Steps:**
  1. Navigate to Product Management page
  2. Tab to status tabs (All, Approved, Under Review, Draft, Rejected)
  3. Verify all tabs receive focus
  4. Use arrow keys to navigate between tabs
  5. Press Enter/Space to activate tab
  6. Verify focus remains on activated tab

**Expected Results:**
  - All tabs keyboard accessible
  - Arrow keys navigate between tabs
  - Enter/Space activates tab
  - Focus indicator visible on all tabs
  - No keyboard traps

#### 2.2. TC_A11Y_006: Status tabs have proper ARIA attributes

**File:** `tests/accessibility/SCRUM-111/status-tabs-aria.spec.ts`

**Steps:**
  1. Inspect status tabs with screen reader
  2. Verify role='tablist' on container
  3. Verify role='tab' on each tab
  4. Check aria-selected='true' on active tab
  5. Verify aria-controls links to tabpanel
  6. Check tab counts announced (e.g., 'All (25)')

**Expected Results:**
  - Tabs use proper ARIA tab pattern
  - Active tab has aria-selected='true'
  - Tab counts announced by screen reader
  - aria-controls links tab to content panel
  - Screen reader announces 'tab X of Y'

#### 2.3. TC_A11Y_007: Status tab counts visible and announced

**File:** `tests/accessibility/SCRUM-111/status-tab-counts.spec.ts`

**Steps:**
  1. Navigate to status tabs
  2. Verify count badges visible for each status
  3. Check counts have sufficient contrast (4.5:1)
  4. Use screen reader to verify counts announced
  5. Filter products and verify counts update
  6. Check updated counts announced via aria-live

**Expected Results:**
  - Count badges visible on all tabs
  - Counts have 4.5:1 contrast minimum
  - Screen reader announces counts
  - Dynamic count updates announced
  - aria-live region announces changes

### 3. Search, Filter, and Sort Controls

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_008: Search input accessible

**File:** `tests/accessibility/SCRUM-111/search-input.spec.ts`

**Steps:**
  1. Tab to search input field
  2. Verify visible label present
  3. Check label associated with input (for/id)
  4. Verify placeholder is supplementary, not sole label
  5. Type search query
  6. Verify search results update announced

**Expected Results:**
  - Search input has visible label
  - Label programmatically associated
  - Placeholder not the only label
  - Search results update announced via aria-live
  - Input has autocomplete='off' or appropriate value

#### 3.2. TC_A11Y_009: Filter dropdown keyboard accessible

**File:** `tests/accessibility/SCRUM-111/filter-dropdown.spec.ts`

**Steps:**
  1. Tab to Disability Type filter dropdown
  2. Verify focus indicator visible
  3. Press Space/Enter to open dropdown
  4. Use arrow keys to navigate options
  5. Press Enter to select option
  6. Verify dropdown closes and filter applies

**Expected Results:**
  - Dropdown opens with Space/Enter
  - Arrow keys navigate options
  - Enter selects option
  - Escape closes dropdown
  - Selected value announced
  - Filter application announced

#### 3.3. TC_A11Y_010: Filter dropdown has proper ARIA

**File:** `tests/accessibility/SCRUM-111/filter-aria.spec.ts`

**Steps:**
  1. Inspect filter dropdown with screen reader
  2. Verify role='combobox' or 'listbox'
  3. Check aria-expanded state changes
  4. Verify aria-label or associated label
  5. Check selected option has aria-selected='true'
  6. Verify option count announced

**Expected Results:**
  - Dropdown has proper role
  - aria-expanded toggles correctly
  - Accessible name present
  - Selected option marked with aria-selected
  - Screen reader announces option count

#### 3.4. TC_A11Y_011: Sort dropdown accessible

**File:** `tests/accessibility/SCRUM-111/sort-dropdown.spec.ts`

**Steps:**
  1. Tab to Sort By dropdown
  2. Verify label visible and associated
  3. Open dropdown with keyboard
  4. Navigate sort options (Newest First, Name A-Z, etc.)
  5. Select option
  6. Verify sort applied and announced

**Expected Results:**
  - Sort dropdown keyboard accessible
  - All sort options reachable
  - Selected sort option announced
  - Sort application announced via aria-live
  - Visual indicator shows active sort

#### 3.5. TC_A11Y_012: Filter persistence announced

**File:** `tests/accessibility/SCRUM-111/filter-persistence.spec.ts`

**Steps:**
  1. Apply search filter
  2. Apply disability type filter
  3. Apply sort option
  4. Verify all filters persist visually
  5. Check active filters announced by screen reader
  6. Verify filter summary region exists

**Expected Results:**
  - Active filters visually indicated
  - Filter summary announced
  - aria-live region announces filter changes
  - Clear filters button accessible
  - Filter state persists on page interactions

### 4. Product Listing Table

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_013: Table structure semantic and accessible

**File:** `tests/accessibility/SCRUM-111/table-structure.spec.ts`

**Steps:**
  1. Navigate to product listing
  2. Verify table uses <table> element or role='table'
  3. Check table has caption or aria-label
  4. Verify column headers use <th> with scope='col'
  5. Check row headers if applicable
  6. Use screen reader table navigation

**Expected Results:**
  - Table uses semantic HTML or ARIA
  - Table has accessible name
  - Column headers properly marked
  - Screen reader announces row/column count
  - Table navigation works (Ctrl+Alt+Arrow)

#### 4.2. TC_A11Y_014: Product images have alt text

**File:** `tests/accessibility/SCRUM-111/product-images.spec.ts`

**Steps:**
  1. Inspect product images in listing
  2. Verify all images have alt attribute
  3. Check alt text is descriptive (product name)
  4. Verify decorative images have alt=''
  5. Use screen reader to verify alt announced

**Expected Results:**
  - All product images have alt text
  - Alt text describes product meaningfully
  - No missing alt attributes
  - Screen reader announces image descriptions
  - Decorative images properly marked

#### 4.3. TC_A11Y_015: Edited icon accessible

**File:** `tests/accessibility/SCRUM-111/edited-icon.spec.ts`

**Steps:**
  1. Locate product with 'Edited' indicator
  2. Verify icon has accessible name
  3. Check aria-label or visually hidden text present
  4. Verify icon not conveyed by color alone
  5. Use screen reader to verify 'Edited' announced

**Expected Results:**
  - Edited icon has accessible name
  - Icon meaning conveyed to screen readers
  - Visual indicator includes text or label
  - Not relying on color alone
  - Tooltip or label explains edited state

#### 4.4. TC_A11Y_016: Status indicators accessible

**File:** `tests/accessibility/SCRUM-111/status-indicators.spec.ts`

**Steps:**
  1. Review status badges (Approved, Under Review, Draft, Rejected)
  2. Verify status conveyed by text, not color alone
  3. Check status badges have sufficient contrast
  4. Verify screen reader announces status
  5. Check aria-label if needed for clarity

**Expected Results:**
  - Status includes text label
  - Status badges have 4.5:1 contrast
  - Not relying on color alone
  - Screen reader announces status clearly
  - Icons supplemented with text

#### 4.5. TC_A11Y_017: Visibility status accessible

**File:** `tests/accessibility/SCRUM-111/visibility-status.spec.ts`

**Steps:**
  1. Locate Active/Inactive visibility indicators
  2. Verify status conveyed by text
  3. Check toggle control if present is accessible
  4. Verify screen reader announces visibility state
  5. Check state changes announced

**Expected Results:**
  - Visibility status has text label
  - Toggle accessible via keyboard
  - State changes announced via aria-live
  - Not relying on color alone
  - Clear indication of Active vs Inactive

#### 4.6. TC_A11Y_018: Color-coded borders accessible

**File:** `tests/accessibility/SCRUM-111/color-borders.spec.ts`

**Steps:**
  1. Review products with color-coded left borders
  2. Verify Blue (Under Review), Orange (Pending), Green (Approved)
  3. Check status also conveyed by text label
  4. Verify borders have 3:1 contrast with background
  5. Confirm not relying on color alone

**Expected Results:**
  - Color borders have 3:1 contrast
  - Status conveyed by text, not just color
  - Screen reader announces status
  - Visual indicators include text labels
  - WCAG 1.4.1 Use of Color satisfied

### 5. Actions Menu

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_019: Three-dot menu keyboard accessible

**File:** `tests/accessibility/SCRUM-111/actions-menu-keyboard.spec.ts`

**Steps:**
  1. Tab to three-dot (more) menu button
  2. Verify focus indicator visible
  3. Press Enter/Space to open menu
  4. Use arrow keys to navigate menu items
  5. Press Enter to select action
  6. Press Escape to close menu

**Expected Results:**
  - Menu button keyboard accessible
  - Enter/Space opens menu
  - Arrow keys navigate menu items
  - Enter activates menu item
  - Escape closes menu
  - Focus returns to menu button on close

#### 5.2. TC_A11Y_020: Actions menu has proper ARIA

**File:** `tests/accessibility/SCRUM-111/actions-menu-aria.spec.ts`

**Steps:**
  1. Inspect actions menu button
  2. Verify aria-haspopup='menu' or 'true'
  3. Check aria-expanded state toggles
  4. Verify menu has role='menu'
  5. Check menu items have role='menuitem'
  6. Verify aria-label describes menu purpose

**Expected Results:**
  - Button has aria-haspopup
  - aria-expanded toggles on open/close
  - Menu uses proper ARIA menu pattern
  - Menu items have role='menuitem'
  - Accessible name describes actions

#### 5.3. TC_A11Y_021: Disabled menu items indicated

**File:** `tests/accessibility/SCRUM-111/disabled-actions.spec.ts`

**Steps:**
  1. Open actions menu for Under Review product
  2. Verify restricted actions visually disabled
  3. Check disabled items have aria-disabled='true'
  4. Verify disabled items not keyboard focusable
  5. Use screen reader to verify disabled state announced

**Expected Results:**
  - Disabled items visually distinguishable
  - aria-disabled='true' on disabled items
  - Disabled items not in tab order
  - Screen reader announces disabled state
  - Tooltip explains why disabled (optional)

#### 5.4. TC_A11Y_022: Menu focus trap works correctly

**File:** `tests/accessibility/SCRUM-111/menu-focus-trap.spec.ts`

**Steps:**
  1. Open actions menu
  2. Tab through all menu items
  3. Verify focus cycles within menu
  4. Press Escape to close
  5. Verify focus returns to menu button
  6. Check no focus lost

**Expected Results:**
  - Focus trapped within open menu
  - Tab cycles through menu items
  - Escape closes menu
  - Focus returns to trigger button
  - No keyboard trap (can exit)

### 6. Dynamic Content and Status Updates

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_023: Filter results update announced

**File:** `tests/accessibility/SCRUM-111/filter-results-announced.spec.ts`

**Steps:**
  1. Apply search filter
  2. Verify results update without page reload
  3. Check aria-live region announces result count
  4. Apply additional filter
  5. Verify cumulative results announced
  6. Clear filters and verify announcement

**Expected Results:**
  - Result count announced via aria-live='polite'
  - Updates don't interrupt screen reader
  - Message format: 'X products found'
  - No page reload required
  - Loading state announced if applicable

#### 6.2. TC_A11Y_024: Status tab switch announced

**File:** `tests/accessibility/SCRUM-111/tab-switch-announced.spec.ts`

**Steps:**
  1. Click/activate different status tab
  2. Verify content updates without reload
  3. Check aria-live announces new results
  4. Verify tab panel has role='tabpanel'
  5. Check tabpanel has aria-labelledby linking to tab

**Expected Results:**
  - Tab switch updates content dynamically
  - New results announced via aria-live
  - Tabpanel properly associated with tab
  - Screen reader announces tab change
  - Focus management handled correctly

#### 6.3. TC_A11Y_025: Product action success announced

**File:** `tests/accessibility/SCRUM-111/action-success-announced.spec.ts`

**Steps:**
  1. Perform action (e.g., Mark as Inactive)
  2. Verify success message appears
  3. Check message announced via aria-live
  4. Verify message has role='status' or aria-live='polite'
  5. Check message dismissible or auto-dismisses

**Expected Results:**
  - Success message announced automatically
  - Message has aria-live or role='status'
  - User doesn't need to find message
  - Message clear and specific
  - Dismiss button accessible if present

#### 6.4. TC_A11Y_026: Pending changes section accessible

**File:** `tests/accessibility/SCRUM-111/pending-changes.spec.ts`

**Steps:**
  1. Navigate to edited product
  2. Expand/view Pending Changes section
  3. Verify section has heading
  4. Check Current vs New comparison accessible
  5. Verify table or list structure semantic
  6. Use screen reader to navigate changes

**Expected Results:**
  - Pending Changes has descriptive heading
  - Comparison uses table or definition list
  - Current and New values clearly labeled
  - Screen reader can navigate comparison
  - Submission date announced

### 7. Modals and Dialogs

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_027: Delete confirmation modal accessible

**File:** `tests/accessibility/SCRUM-111/delete-modal.spec.ts`

**Steps:**
  1. Trigger delete action
  2. Verify modal appears
  3. Check focus moves to modal
  4. Verify modal has role='dialog' or 'alertdialog'
  5. Check aria-modal='true' present
  6. Verify modal has accessible name (aria-labelledby)

**Expected Results:**
  - Modal has role='dialog' or 'alertdialog'
  - aria-modal='true' present
  - Focus moves to modal on open
  - Modal has accessible name
  - Modal description provided (aria-describedby)

#### 7.2. TC_A11Y_028: Modal focus trap works

**File:** `tests/accessibility/SCRUM-111/modal-focus-trap.spec.ts`

**Steps:**
  1. Open delete confirmation modal
  2. Tab through modal elements
  3. Verify focus cycles within modal
  4. Press Escape to close
  5. Verify focus returns to trigger button
  6. Check background content not accessible

**Expected Results:**
  - Focus trapped within modal
  - Tab cycles through modal elements
  - Escape closes modal
  - Focus returns to delete button
  - Background content has aria-hidden='true'

#### 7.3. TC_A11Y_029: Modal buttons keyboard accessible

**File:** `tests/accessibility/SCRUM-111/modal-buttons.spec.ts`

**Steps:**
  1. Open modal
  2. Tab to Cancel button
  3. Verify focus indicator visible
  4. Tab to Confirm/Delete button
  5. Press Enter to activate
  6. Verify action executes

**Expected Results:**
  - All modal buttons keyboard accessible
  - Focus indicators visible
  - Enter/Space activates buttons
  - Button labels clear and descriptive
  - Destructive action clearly labeled

### 8. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_030: Text contrast meets WCAG AA

**File:** `tests/accessibility/SCRUM-111/text-contrast.spec.ts`

**Steps:**
  1. Measure contrast for all text elements
  2. Check body text has 4.5:1 minimum
  3. Check large text (18pt+) has 3:1 minimum
  4. Verify status labels have sufficient contrast
  5. Check disabled text has 4.5:1 if conveying info

**Expected Results:**
  - Normal text has 4.5:1 contrast
  - Large text has 3:1 contrast
  - All text meets WCAG AA
  - Status indicators have sufficient contrast
  - Placeholder text has 4.5:1 contrast

#### 8.2. TC_A11Y_031: UI component contrast meets WCAG AA

**File:** `tests/accessibility/SCRUM-111/component-contrast.spec.ts`

**Steps:**
  1. Measure contrast for input borders
  2. Check button borders/backgrounds
  3. Verify dropdown borders
  4. Check focus indicators
  5. Verify status badge borders

**Expected Results:**
  - Input borders have 3:1 contrast
  - Button boundaries have 3:1 contrast
  - Dropdown borders have 3:1 contrast
  - Focus indicators have 3:1 contrast
  - All UI components meet WCAG 1.4.11

#### 8.3. TC_A11Y_032: Focus indicators visible

**File:** `tests/accessibility/SCRUM-111/focus-indicators.spec.ts`

**Steps:**
  1. Tab through all interactive elements
  2. Verify focus indicator on each element
  3. Check focus indicator has 3:1 contrast
  4. Verify focus not obscured by other elements
  5. Check focus indicator thickness adequate

**Expected Results:**
  - All focusable elements show focus indicator
  - Focus indicators have 3:1 contrast minimum
  - Focus visible and not obscured
  - Indicator thickness at least 2px
  - WCAG 2.4.7 Focus Visible satisfied

#### 8.4. TC_A11Y_033: Page scales to 200% without loss

**File:** `tests/accessibility/SCRUM-111/text-resize.spec.ts`

**Steps:**
  1. Zoom browser to 200%
  2. Verify all text remains visible
  3. Check no horizontal scrolling required
  4. Verify all functionality remains available
  5. Check no text truncation or overlap

**Expected Results:**
  - All text scales to 200%
  - No horizontal scrolling
  - No text truncation
  - All features remain usable
  - Layout adapts responsively

#### 8.5. TC_A11Y_034: Responsive design accessible on mobile

**File:** `tests/accessibility/SCRUM-111/mobile-responsive.spec.ts`

**Steps:**
  1. Set viewport to mobile (375x667)
  2. Verify all content accessible
  3. Check touch targets minimum 44x44px
  4. Verify no horizontal scrolling
  5. Check all functionality available

**Expected Results:**
  - Page adapts to mobile viewport
  - Touch targets at least 44x44px
  - No horizontal scrolling
  - All features accessible on mobile
  - Text readable without zoom

### 9. Empty States and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_035: Empty state message accessible

**File:** `tests/accessibility/SCRUM-111/empty-state.spec.ts`

**Steps:**
  1. Apply filter producing zero results
  2. Verify empty state message appears
  3. Check message has proper heading
  4. Verify message announced by screen reader
  5. Check message provides helpful guidance

**Expected Results:**
  - Empty state has descriptive heading
  - Message announced via aria-live
  - Message clear and helpful
  - Suggests action to resolve (clear filters)
  - Not just 'No results'

#### 9.2. TC_A11Y_036: Error messages accessible

**File:** `tests/accessibility/SCRUM-111/error-messages.spec.ts`

**Steps:**
  1. Trigger error condition (e.g., network failure)
  2. Verify error message appears
  3. Check error announced via aria-live='assertive'
  4. Verify error has role='alert'
  5. Check error message specific and actionable

**Expected Results:**
  - Error announced immediately
  - Error has role='alert' or aria-live='assertive'
  - Error message specific and clear
  - Suggests resolution steps
  - Dismiss button accessible if present

#### 9.3. TC_A11Y_037: Loading states announced

**File:** `tests/accessibility/SCRUM-111/loading-states.spec.ts`

**Steps:**
  1. Trigger data loading (filter, sort, etc.)
  2. Verify loading indicator appears
  3. Check loading state announced
  4. Verify aria-busy='true' on container
  5. Check completion announced

**Expected Results:**
  - Loading state announced via aria-live
  - Container has aria-busy='true' during load
  - Loading indicator visible
  - Completion announced
  - Focus management handled correctly

### 10. Approval Process Timeline Panel

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_038: Timeline panel accessible

**File:** `tests/accessibility/SCRUM-111/timeline-panel.spec.ts`

**Steps:**
  1. Navigate to bottom of page
  2. Locate Approval Process Timeline panel
  3. Verify panel has heading
  4. Check timeline information accessible
  5. Verify panel remains visible (fixed position)

**Expected Results:**
  - Panel has descriptive heading
  - Timeline information in semantic list
  - Screen reader can access all info
  - Fixed positioning doesn't obscure content
  - Panel accessible via keyboard

### 11. Forms and Input Validation

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_039: Inline editing accessible

**File:** `tests/accessibility/SCRUM-111/inline-editing.spec.ts`

**Steps:**
  1. Activate Edit Pricing & Quantity
  2. Verify edit mode accessible
  3. Check input fields have labels
  4. Verify validation errors accessible
  5. Check save/cancel buttons accessible

**Expected Results:**
  - Edit mode keyboard accessible
  - All inputs have labels
  - Validation errors linked to inputs
  - Error messages announced
  - Save/Cancel buttons clearly labeled
