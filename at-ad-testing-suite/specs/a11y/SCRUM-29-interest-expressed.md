# SCRUM-29 Accessibility Test Plan: Interest Expressed

## Application Overview

Comprehensive accessibility test plan for Assistive Partner Interest Expressed feature ensuring WCAG 2.1 AA compliance. Tests cover navigation, summary metrics, interest list table, search/filter/sort controls, View Details modal, Reveal Contact button, notification center, download functionality, keyboard navigation, screen reader support, and error states.

## Test Scenarios

### 1. Navigation and Page Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Interest Expressed tab accessible

**File:** `tests/accessibility/scrum29-interest/navigation-tab.spec.ts`

**Steps:**
  1. Navigate to vendor dashboard
  2. Locate 'Interest Expressed' tab
  3. Tab to navigation link
  4. Verify focus indicator visible
  5. Press Enter to activate
  6. Verify page loads

**Expected Results:**
  - Tab keyboard accessible
  - Tab has accessible name 'Interest Expressed'
  - Enter/Space activates tab
  - Focus indicator visible
  - aria-current='page' when active

#### 1.2. TC_A11Y_002: Page has proper heading

**File:** `tests/accessibility/scrum29-interest/page-heading.spec.ts`

**Steps:**
  1. Navigate to Interest Expressed page
  2. Verify H1 heading present
  3. Check heading text clear
  4. Verify description explains purpose
  5. Use screen reader heading navigation

**Expected Results:**
  - Page has H1 heading
  - Heading: 'Interest Expressed'
  - Description text visible
  - Screen reader can navigate to heading
  - Heading level appropriate

### 2. Summary Metrics Widget

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_003: Total Interest widget accessible

**File:** `tests/accessibility/scrum29-interest/total-interest-widget.spec.ts`

**Steps:**
  1. Locate Total Interest widget
  2. Verify widget has label
  3. Check count value visible
  4. Use screen reader to verify announcement
  5. Verify widget semantically marked

**Expected Results:**
  - Widget has accessible name
  - Count value announced
  - Screen reader: 'Total Interest: 89'
  - Widget has role='region' or appropriate ARIA
  - Visual and programmatic label

#### 2.2. TC_A11Y_004: Widget update announced

**File:** `tests/accessibility/scrum29-interest/widget-update-announced.spec.ts`

**Steps:**
  1. Trigger new interest (if possible)
  2. Verify count increments
  3. Check aria-live announces update
  4. Verify screen reader announces
  5. Check focus not moved

**Expected Results:**
  - Count updates announced via aria-live
  - aria-live='polite' or 'assertive'
  - Screen reader announces new count
  - Visual update clear
  - No focus disruption

### 3. Interest List Table

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_005: Interest list has table structure

**File:** `tests/accessibility/scrum29-interest/table-structure.spec.ts`

**Steps:**
  1. Locate interest list
  2. Verify table element present
  3. Check table has caption
  4. Use screen reader to verify table announced
  5. Verify table semantically correct

**Expected Results:**
  - Table has <table> element or role='table'
  - Table has caption or aria-label
  - Caption: 'Interest Expressed List'
  - Screen reader announces table
  - Table structure semantic

#### 3.2. TC_A11Y_006: Table headers accessible

**File:** `tests/accessibility/scrum29-interest/table-headers.spec.ts`

**Steps:**
  1. Inspect table headers
  2. Verify all columns have headers
  3. Check headers use <th> or role
  4. Verify scope='col' present
  5. Use screen reader to verify headers

**Expected Results:**
  - All headers have <th> or role='columnheader'
  - Headers: Name, Location, Product, Shares, Date, Action
  - Headers have scope='col'
  - Screen reader announces headers
  - Headers associated with data cells

#### 3.3. TC_A11Y_007: Table rows and cells accessible

**File:** `tests/accessibility/scrum29-interest/table-rows.spec.ts`

**Steps:**
  1. Navigate through table rows
  2. Verify row structure semantic
  3. Check cells associated with headers
  4. Use screen reader to read rows
  5. Verify row navigation works

**Expected Results:**
  - Each row has role='row' or <tr>
  - Cells have role='cell' or <td>
  - Data cells associated with headers
  - Screen reader reads row data correctly
  - Row count announced

### 4. Pagination Controls

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_008: Pagination count accessible

**File:** `tests/accessibility/scrum29-interest/pagination-count.spec.ts`

**Steps:**
  1. Locate result count text
  2. Verify count displays clearly
  3. Check aria-live present
  4. Apply filter
  5. Verify count updates and announced

**Expected Results:**
  - Result count visible: 'Showing 1-10 of X'
  - Count has aria-live='polite'
  - Screen reader announces count
  - Count updates when filtering
  - Text has 4.5:1 contrast

#### 4.2. TC_A11Y_009: Pagination buttons accessible

**File:** `tests/accessibility/scrum29-interest/pagination-buttons.spec.ts`

**Steps:**
  1. Locate pagination controls
  2. Tab to pagination buttons
  3. Verify focus indicators visible
  4. Check button labels clear
  5. Verify current page indicated
  6. Check disabled state accessible

**Expected Results:**
  - Pagination buttons keyboard accessible
  - Buttons have accessible names
  - Current page has aria-current='page'
  - Disabled buttons have aria-disabled='true'
  - Focus indicators visible

### 5. Search Functionality

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_010: Search field has label

**File:** `tests/accessibility/scrum29-interest/search-field-label.spec.ts`

**Steps:**
  1. Locate search input
  2. Verify visible label present
  3. Check label associated with input
  4. Verify placeholder text present
  5. Check autocomplete attribute

**Expected Results:**
  - Search field has visible label
  - Label: 'Search interests'
  - Label associated with input (for/id)
  - Placeholder supplementary, not sole label
  - Field has autocomplete attribute

#### 5.2. TC_A11Y_011: Search results announced

**File:** `tests/accessibility/scrum29-interest/search-results-announced.spec.ts`

**Steps:**
  1. Enter search query
  2. Trigger search
  3. Verify results update
  4. Check aria-live announces results
  5. Use screen reader to verify

**Expected Results:**
  - Search results announced via aria-live
  - Announcement: 'X results found'
  - Screen reader announces results
  - Loading state announced
  - No results state announced

### 6. Filter Controls

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_012: State filter accessible

**File:** `tests/accessibility/scrum29-interest/state-filter.spec.ts`

**Steps:**
  1. Locate State filter dropdown
  2. Tab to filter
  3. Verify focus indicator visible
  4. Open dropdown with Enter/Space
  5. Navigate options with Arrow keys
  6. Select option with Enter

**Expected Results:**
  - State filter keyboard accessible
  - Filter has accessible name
  - Options keyboard navigable
  - Selected option announced
  - Filter updates list

#### 6.2. TC_A11Y_013: Disability type filter accessible

**File:** `tests/accessibility/scrum29-interest/disability-filter.spec.ts`

**Steps:**
  1. Locate Disability Type filter
  2. Tab to filter
  3. Open filter
  4. Navigate options
  5. Select multiple if supported
  6. Verify selections announced

**Expected Results:**
  - Disability type filter accessible
  - Filter has accessible name
  - Options keyboard navigable
  - Selected option announced
  - Multiple selections supported

#### 6.3. TC_A11Y_014: Applied filters accessible

**File:** `tests/accessibility/scrum29-interest/applied-filters.spec.ts`

**Steps:**
  1. Apply multiple filters
  2. Verify applied filters displayed
  3. Tab to remove buttons
  4. Press Enter to remove filter
  5. Verify removal announced
  6. Check clear all button accessible

**Expected Results:**
  - Applied filters visible
  - Each filter has remove button
  - Remove buttons keyboard accessible
  - Removal announced via aria-live
  - Clear all filters button accessible

### 7. Sort Controls

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_015: Sort dropdown accessible

**File:** `tests/accessibility/scrum29-interest/sort-dropdown.spec.ts`

**Steps:**
  1. Locate sort dropdown
  2. Tab to dropdown
  3. Open with Enter/Space
  4. Navigate options with Arrow keys
  5. Select option
  6. Verify list updates

**Expected Results:**
  - Sort dropdown keyboard accessible
  - Options: Newest First, Oldest First
  - Selected option announced
  - aria-expanded toggles
  - Sort updates list

#### 7.2. TC_A11Y_016: Sort change announced

**File:** `tests/accessibility/scrum29-interest/sort-announced.spec.ts`

**Steps:**
  1. Change sort order
  2. Verify list updates
  3. Check aria-live announces change
  4. Use screen reader to verify
  5. Verify visual indicator present

**Expected Results:**
  - Sort change announced via aria-live
  - Announcement: 'Sorted by Newest First'
  - Screen reader announces change
  - Visual indicator of sort order
  - List updates without page reload

### 8. View Details Button

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_017: View Details button accessible

**File:** `tests/accessibility/scrum29-interest/view-details-button.spec.ts`

**Steps:**
  1. Locate View Details button in row
  2. Tab to button
  3. Verify focus indicator visible
  4. Check button has accessible name
  5. Press Enter to activate
  6. Verify modal opens

**Expected Results:**
  - Button keyboard accessible
  - Button has accessible name 'View Details'
  - Enter/Space activates button
  - Focus indicator visible
  - Button in each table row

### 9. View Details Modal

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_018: Modal has proper ARIA

**File:** `tests/accessibility/scrum29-interest/modal-aria.spec.ts`

**Steps:**
  1. Open View Details modal
  2. Verify role='dialog'
  3. Check aria-modal='true'
  4. Verify aria-labelledby present
  5. Check focus moves to modal
  6. Use screen reader to verify

**Expected Results:**
  - Modal has role='dialog'
  - aria-modal='true' present
  - Modal has accessible name
  - Focus moves to modal
  - Screen reader announces modal

#### 9.2. TC_A11Y_019: Modal focus trap works

**File:** `tests/accessibility/scrum29-interest/modal-focus-trap.spec.ts`

**Steps:**
  1. Open modal
  2. Tab through all elements
  3. Verify tab stays in modal
  4. Tab to last element
  5. Tab again, verify focus cycles
  6. Try Shift+Tab

**Expected Results:**
  - Focus trapped within modal
  - Tab cycles through modal elements
  - Shift+Tab works in reverse
  - Cannot tab to background content
  - No keyboard traps

#### 9.3. TC_A11Y_020: Modal close accessible

**File:** `tests/accessibility/scrum29-interest/modal-close.spec.ts`

**Steps:**
  1. Open modal
  2. Press Escape key
  3. Verify modal closes
  4. Check focus returns
  5. Reopen modal
  6. Tab to Close button
  7. Press Enter
  8. Verify closes

**Expected Results:**
  - Escape closes modal
  - Close (X) button keyboard accessible
  - Clicking outside closes modal
  - Focus returns to View Details button
  - Modal closure announced

#### 9.4. TC_A11Y_021: Modal content has labels

**File:** `tests/accessibility/scrum29-interest/modal-content-labels.spec.ts`

**Steps:**
  1. Open modal
  2. Verify all sections have labels
  3. Check personal info labeled
  4. Verify date/time labeled
  5. Check contact info labeled
  6. Verify location labeled

**Expected Results:**
  - All labels visible
  - Personal info: Age, Disability Type
  - Date/time displayed
  - Masked contact visible
  - Location and address visible

### 10. Reveal Contact Details

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_022: Reveal Details button accessible

**File:** `tests/accessibility/scrum29-interest/reveal-button.spec.ts`

**Steps:**
  1. Open modal
  2. Locate Reveal Details button
  3. Tab to button
  4. Verify focus indicator visible
  5. Check button has accessible name
  6. Press Enter to reveal

**Expected Results:**
  - Button keyboard accessible
  - Button has accessible name 'Reveal Details'
  - Enter/Space activates button
  - Focus indicator visible
  - Button positioned clearly

#### 10.2. TC_A11Y_023: Contact reveal announced

**File:** `tests/accessibility/scrum29-interest/reveal-announced.spec.ts`

**Steps:**
  1. Click Reveal Details
  2. Verify contact info displays
  3. Check aria-live announces reveal
  4. Use screen reader to verify
  5. Verify phone and email visible

**Expected Results:**
  - Contact reveal announced via aria-live
  - Announcement: 'Contact details revealed'
  - Phone and email now visible
  - Screen reader announces revealed data
  - Visual change clear

#### 10.3. TC_A11Y_024: Masked contact accessible

**File:** `tests/accessibility/scrum29-interest/masked-contact-accessible.spec.ts`

**Steps:**
  1. View modal before reveal
  2. Verify contact info masked
  3. Check masking format clear
  4. Use screen reader to verify masked state
  5. Verify visual indication present

**Expected Results:**
  - Masked format clear
  - Example: '***-***-1234'
  - Screen reader: 'Phone number masked'
  - Visual indication of masking
  - Not relying on asterisks alone

### 11. Product Interest List in Modal

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_025: Product list semantic

**File:** `tests/accessibility/scrum29-interest/product-list-structure.spec.ts`

**Steps:**
  1. Open modal
  2. Locate product interest list
  3. Verify list structure semantic
  4. Check each product is list item
  5. Use screen reader to verify list

**Expected Results:**
  - Products in semantic list
  - List uses <ul> or role='list'
  - Each product is <li> or role='listitem'
  - Screen reader announces list
  - Product count announced

#### 11.2. TC_A11Y_026: Product images have alt text

**File:** `tests/accessibility/scrum29-interest/product-image-alt.spec.ts`

**Steps:**
  1. View product list in modal
  2. Inspect product images
  3. Verify alt text present
  4. Check alt text descriptive
  5. Use screen reader to verify

**Expected Results:**
  - Product images have alt text
  - Alt text: Product name
  - Thumbnails not essential for understanding
  - Screen reader announces product name
  - Images decorative if name present

#### 11.3. TC_A11Y_027: Share count accessible

**File:** `tests/accessibility/scrum29-interest/share-count-accessible.spec.ts`

**Steps:**
  1. View product in modal
  2. Locate share count
  3. Verify count has label
  4. Check count visible
  5. Use screen reader to verify

**Expected Results:**
  - Share count visible
  - Label: 'Shared X times'
  - Count associated with product
  - Screen reader announces count
  - Count has sufficient contrast

### 12. Notification Center

**Seed:** `tests/seed.spec.ts`

#### 12.1. TC_A11Y_028: Notification button accessible

**File:** `tests/accessibility/scrum29-interest/notification-button.spec.ts`

**Steps:**
  1. Locate notification bell icon
  2. Tab to notification button
  3. Verify focus indicator visible
  4. Check button has accessible name
  5. Verify unread count announced
  6. Press Enter to open

**Expected Results:**
  - Notification button keyboard accessible
  - Button has accessible name
  - Unread count badge announced
  - Badge: 'X unread notifications'
  - Focus indicator visible

#### 12.2. TC_A11Y_029: Notification panel ARIA

**File:** `tests/accessibility/scrum29-interest/notification-panel-aria.spec.ts`

**Steps:**
  1. Open notification panel
  2. Verify panel has proper role
  3. Check aria-label present
  4. Verify focus management
  5. Use screen reader to verify

**Expected Results:**
  - Panel has role='region' or 'dialog'
  - Panel has accessible name
  - Focus moves to panel
  - Panel keyboard navigable
  - Screen reader announces panel

#### 12.3. TC_A11Y_030: Notification list accessible

**File:** `tests/accessibility/scrum29-interest/notification-list.spec.ts`

**Steps:**
  1. Open notification panel
  2. Verify list structure
  3. Navigate through notifications
  4. Check read/unread announced
  5. Verify timestamps accessible

**Expected Results:**
  - Notifications in semantic list
  - Each notification is list item
  - Notification content accessible
  - Read/Unread status announced
  - Timestamp accessible

#### 12.4. TC_A11Y_031: Notification actions accessible

**File:** `tests/accessibility/scrum29-interest/notification-actions.spec.ts`

**Steps:**
  1. Open notification
  2. Tab to Mark as Read button
  3. Press Enter
  4. Verify action announced
  5. Tab to Delete button
  6. Verify accessible

**Expected Results:**
  - Mark as read button accessible
  - Delete button accessible
  - Buttons have clear labels
  - Actions announced via aria-live
  - Focus managed after action

#### 12.5. TC_A11Y_032: Unread indicator accessible

**File:** `tests/accessibility/scrum29-interest/notification-unread-indicator.spec.ts`

**Steps:**
  1. View unread notification
  2. Verify unread indicator present
  3. Check not relying on color alone
  4. Use screen reader to verify unread
  5. Verify visual distinction

**Expected Results:**
  - Unread indicator not color alone
  - Icon or text indicates unread
  - Screen reader announces unread
  - Visual distinction clear
  - WCAG 1.4.1 satisfied

### 13. Download Functionality

**Seed:** `tests/seed.spec.ts`

#### 13.1. TC_A11Y_033: Download button accessible

**File:** `tests/accessibility/scrum29-interest/download-button.spec.ts`

**Steps:**
  1. Locate Download List button
  2. Tab to button
  3. Verify focus indicator visible
  4. Check button has accessible name
  5. Press Enter to download
  6. Verify download starts

**Expected Results:**
  - Download button keyboard accessible
  - Button has accessible name 'Download List'
  - Enter/Space activates download
  - Focus indicator visible
  - Download starts on activation

#### 13.2. TC_A11Y_034: Download status announced

**File:** `tests/accessibility/scrum29-interest/download-status-announced.spec.ts`

**Steps:**
  1. Click Download button
  2. Verify download starts
  3. Check aria-live announces progress
  4. Use screen reader to verify
  5. Verify completion announced

**Expected Results:**
  - Download progress announced
  - aria-live announces status
  - Screen reader: 'Download started'
  - Completion announced
  - Error announced if fails

### 14. Empty State

**Seed:** `tests/seed.spec.ts`

#### 14.1. TC_A11Y_035: Empty state accessible

**File:** `tests/accessibility/scrum29-interest/empty-state-message.spec.ts`

**Steps:**
  1. View page with no interests
  2. Verify empty state message displays
  3. Check message has proper role
  4. Use screen reader to verify
  5. Verify message helpful

**Expected Results:**
  - Empty state message visible
  - Message: 'No interests recorded yet'
  - Message has proper semantics
  - Screen reader announces message
  - Message clear and helpful

### 15. Error States

**Seed:** `tests/seed.spec.ts`

#### 15.1. TC_A11Y_036: Error message accessible

**File:** `tests/accessibility/scrum29-interest/error-message.spec.ts`

**Steps:**
  1. Trigger data load error
  2. Verify error message displays
  3. Check error has role='alert'
  4. Use screen reader to verify
  5. Verify retry option accessible

**Expected Results:**
  - Error message visible
  - Message: 'Unable to load interest data'
  - Error has role='alert'
  - Screen reader announces error
  - Retry option provided

### 16. Keyboard Navigation

**Seed:** `tests/seed.spec.ts`

#### 16.1. TC_A11Y_037: Tab order logical

**File:** `tests/accessibility/scrum29-interest/tab-order.spec.ts`

**Steps:**
  1. Tab from page start
  2. Verify tab order follows layout
  3. Check all controls reachable
  4. Verify no keyboard traps
  5. Tab through entire page

**Expected Results:**
  - Tab order: Search → Filters → Sort → Table → Pagination
  - Order follows visual layout
  - All interactive elements reachable
  - No keyboard traps
  - Focus visible throughout

#### 16.2. TC_A11Y_038: Focus indicators visible

**File:** `tests/accessibility/scrum29-interest/focus-indicators.spec.ts`

**Steps:**
  1. Tab through all elements
  2. Verify focus indicator on each
  3. Check focus has 3:1 contrast
  4. Verify focus not obscured
  5. Check indicator thickness

**Expected Results:**
  - All focusable elements show focus
  - Focus indicators have 3:1 contrast
  - Focus visible and not obscured
  - Indicator thickness adequate
  - WCAG 2.4.7 satisfied

### 17. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 17.1. TC_A11Y_039: Text contrast meets WCAG AA

**File:** `tests/accessibility/scrum29-interest/text-contrast.spec.ts`

**Steps:**
  1. Measure contrast for all text
  2. Check table text has 4.5:1
  3. Check button text has 4.5:1
  4. Verify error text has 4.5:1
  5. Check all text meets standard

**Expected Results:**
  - All text has 4.5:1 contrast
  - Table headers have 4.5:1
  - Button text has 4.5:1
  - Error text has 4.5:1
  - All text meets WCAG AA

#### 17.2. TC_A11Y_040: UI component contrast

**File:** `tests/accessibility/scrum29-interest/component-contrast.spec.ts`

**Steps:**
  1. Measure table border contrast
  2. Check button borders
  3. Verify filter control borders
  4. Check focus indicators
  5. Verify all meet 3:1

**Expected Results:**
  - Table borders have 3:1 contrast
  - Button borders have 3:1
  - Filter controls have 3:1
  - Focus indicators have 3:1
  - All UI components meet WCAG 1.4.11

#### 17.3. TC_A11Y_041: Page scales to 200% zoom

**File:** `tests/accessibility/scrum29-interest/zoom-200.spec.ts`

**Steps:**
  1. Zoom browser to 200%
  2. Verify all content visible
  3. Check table usable
  4. Verify no horizontal scrolling
  5. Check all functionality works

**Expected Results:**
  - All content visible at 200%
  - No text truncation
  - Table remains usable
  - No horizontal scrolling
  - Functionality preserved

#### 17.4. TC_A11Y_042: Mobile responsive accessible

**File:** `tests/accessibility/scrum29-interest/mobile-responsive.spec.ts`

**Steps:**
  1. Set viewport to mobile (375x667)
  2. Navigate to Interest Expressed
  3. Verify all content accessible
  4. Check touch targets adequate
  5. Test all functionality

**Expected Results:**
  - Page accessible on mobile
  - Touch targets 44x44px minimum
  - Table scrolls horizontally if needed
  - All controls usable
  - No loss of functionality

### 18. Screen Reader Compatibility

**Seed:** `tests/seed.spec.ts`

#### 18.1. TC_A11Y_043: Screen reader announces all content

**File:** `tests/accessibility/scrum29-interest/screen-reader-comprehensive.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate through entire page
  3. Verify all sections announced
  4. Check table navigation works
  5. Verify all content accessible

**Expected Results:**
  - All sections announced
  - Table structure announced
  - Row and column headers announced
  - Cell data announced correctly
  - Navigation landmarks work

#### 18.2. TC_A11Y_044: Dynamic content announced

**File:** `tests/accessibility/scrum29-interest/screen-reader-dynamic.spec.ts`

**Steps:**
  1. Apply filter
  2. Verify change announced
  3. Change sort order
  4. Verify announced
  5. Open modal
  6. Verify announced
  7. Check all updates accessible

**Expected Results:**
  - Filter changes announced
  - Sort changes announced
  - Search results announced
  - Modal opening announced
  - All dynamic updates accessible
