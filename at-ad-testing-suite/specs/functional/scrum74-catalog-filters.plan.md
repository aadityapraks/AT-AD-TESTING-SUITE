# SCRUM-74 Test Plan

## Application Overview

Test plan for SCRUM-74: PwD - View Catalog Landing Page with Filters. This covers filter functionality, dynamic result updates, pagination with full accessibility compliance, and responsive behavior.

## Test Scenarios

### 1. Filter Panel Elements

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify filter panel elements and defaults

**File:** `tests/functional/scrum74-filter-elements.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Verify all filter categories are displayed
  3. Check default 'All' selections

**Expected Results:**
  - All filter categories are visible
  - Default 'All' is selected for each filter type
  - Search bar is present
  - Disability Type dropdown shows: All, Physical, Visual, Auditory, Cognitive, Speech
  - Sub Category dropdown shows: All, Mobility, Hearing, Communication, Home Automation, Reading and Writing
  - Type dropdown shows: All, Device, Technology, Both
  - Price Range shows: All Prices, Under 20,000, 20,000-50,000, 50,000-1,00,000, 1,00,000+
  - Availability checkbox is present
  - Min Rating slider is present
  - Apply Filter and Reset All buttons are visible

### 2. Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. Apply multiple filters simultaneously

**File:** `tests/functional/scrum74-multiple-filters.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select filters from multiple categories
  3. Click Apply Filter
  4. Verify results update dynamically

**Expected Results:**
  - Multiple filters can be selected simultaneously
  - Selected filters show visual checkmarks
  - Results update dynamically without page reload
  - Device count updates (e.g., '6 devices found')

#### 2.2. Reset all filters

**File:** `tests/functional/scrum74-reset-filters.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Apply multiple filters
  3. Click Reset All button
  4. Verify all filters are cleared

**Expected Results:**
  - All filters are cleared
  - Results show all products
  - Device count resets to total
  - Visual checkmarks are removed

#### 2.3. Verify device count updates with filters

**File:** `tests/functional/scrum74-device-count-update.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Note initial device count
  3. Apply a filter
  4. Verify count updates
  5. Apply additional filters
  6. Verify count updates again

**Expected Results:**
  - Device count updates automatically
  - Count reflects active filters accurately

### 3. Pagination Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify pagination display

**File:** `tests/functional/scrum74-pagination-display.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Ensure results exceed 6 products
  3. Verify pagination controls appear

**Expected Results:**
  - Pagination appears when results exceed 6 products
  - 2 products per row are displayed
  - Page numbers are visible
  - Previous and Next buttons are present

#### 3.2. Navigate through pagination

**File:** `tests/functional/scrum74-pagination-navigation.spec.ts`

**Steps:**
  1. Navigate to the Catalog page with multiple pages
  2. Click Next button
  3. Verify page 2 loads
  4. Click page number
  5. Click Previous button

**Expected Results:**
  - Clicking page numbers navigates to that page
  - Previous button navigates to previous page
  - Next button navigates to next page
  - Results update for each page

#### 3.3. Verify pagination boundary states

**File:** `tests/functional/scrum74-pagination-boundaries.spec.ts`

**Steps:**
  1. Navigate to first page
  2. Verify Previous is disabled
  3. Navigate to last page
  4. Verify Next is disabled

**Expected Results:**
  - Previous button is disabled on first page
  - Next button is disabled on last page
  - Disabled buttons are visually distinguishable

### 4. Responsive Design

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify mobile responsive behavior

**File:** `tests/functional/scrum74-mobile-responsive.spec.ts`

**Steps:**
  1. Set viewport to mobile size (375x667)
  2. Navigate to the Catalog page
  3. Verify filter panel collapses
  4. Check pagination layout

**Expected Results:**
  - Filter panel collapses on mobile
  - Pagination shows fewer page links (e.g., 1 … 4 5 6 … 10)
  - Previous and Next remain visible
  - Touch targets are ≥ 44px
  - No horizontal scrolling

#### 4.2. Verify text resize to 200%

**File:** `tests/functional/scrum74-text-resize.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Increase text size to 200%
  3. Verify pagination labels don't truncate or overlap

**Expected Results:**
  - Pagination labels adjust without truncation when text is resized to 200%
  - All elements remain accessible

### 5. Filter Accessibility

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify filter keyboard navigation

**File:** `tests/accessibility/scrum74-filter-keyboard.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Use Tab to navigate through filters
  3. Use Enter/Space to select filters
  4. Verify keyboard operability

**Expected Results:**
  - All filter options are keyboard-operable
  - Tab/Shift+Tab navigates through filters
  - Filter checkboxes have aria-checked attributes
  - Filter labels have aria-label values

#### 5.2. Verify filter screen reader support

**File:** `tests/accessibility/scrum74-filter-screen-reader.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Apply filters
  3. Verify ARIA live region announcements
  4. Test Clear All with keyboard

**Expected Results:**
  - Active filters are announced to screen readers
  - Filter section is collapsible and focus-managed
  - Clear All button is keyboard accessible
  - ARIA live region announces result updates (e.g., '6 devices found')

#### 5.3. Verify filter color contrast

**File:** `tests/accessibility/scrum74-filter-contrast.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Check contrast ratios for filter elements
  3. Verify text size compliance

**Expected Results:**
  - Filter elements meet 4.5:1 contrast ratio
  - Text size meets WCAG 2.1 AA standards

### 6. Pagination Accessibility

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify pagination keyboard navigation

**File:** `tests/accessibility/scrum74-pagination-keyboard.spec.ts`

**Steps:**
  1. Navigate to the Catalog page with pagination
  2. Tab through pagination elements
  3. Verify focus order
  4. Use Enter/Space to navigate pages

**Expected Results:**
  - All pagination elements are keyboard focusable
  - Focus order is logical (Previous → Page 1 → Page 2 → Next)
  - Enter and Spacebar activate page links
  - No keyboard traps

#### 6.2. Verify pagination ARIA attributes

**File:** `tests/accessibility/scrum74-pagination-aria.spec.ts`

**Steps:**
  1. Navigate to the Catalog page with pagination
  2. Check pagination landmark region
  3. Verify ARIA labels on all elements
  4. Check aria-current on active page

**Expected Results:**
  - Pagination has role='navigation' and aria-label='Pagination'
  - Page links have descriptive aria-labels (e.g., 'Page 2')
  - Current page has aria-current='page'
  - Previous/Next have aria-labels ('Go to previous page', 'Go to next page')
  - Screen readers announce total pages (e.g., 'Page 2 of 8')

#### 6.3. Verify pagination focus indicators

**File:** `tests/accessibility/scrum74-pagination-focus.spec.ts`

**Steps:**
  1. Navigate to the Catalog page with pagination
  2. Tab to pagination elements
  3. Verify visible focus outlines
  4. Check contrast ratios

**Expected Results:**
  - Focused element has visible focus outline (≥ 3:1 contrast)
  - Hover and focus states are distinguishable
  - Focus indicator is consistent across browsers

#### 6.4. Verify pagination color contrast

**File:** `tests/accessibility/scrum74-pagination-contrast.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Check contrast for active/inactive states
  3. Verify disabled button states

**Expected Results:**
  - Active/inactive page numbers meet 4.5:1 contrast
  - Disabled buttons are visually distinguishable
  - Disabled buttons have aria-disabled='true'
  - Hover states are perceivable

#### 6.5. Verify pagination structure

**File:** `tests/accessibility/scrum74-pagination-structure.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Measure pagination element sizes
  3. Verify ellipses are not focusable

**Expected Results:**
  - Pagination elements are ≥ 44x44px
  - Ellipses have aria-hidden='true'
  - Ellipses are not focusable

#### 6.6. Verify pagination live announcements

**File:** `tests/accessibility/scrum74-pagination-announcements.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Navigate to next page
  3. Verify ARIA live region announcement
  4. Check focus management

**Expected Results:**
  - ARIA live region announces page changes (e.g., 'Page 3 loaded. 6 devices displayed')
  - Focus shifts to top of product list or page heading
  - Screen readers don't re-read entire page layout

#### 6.7. Verify pagination with assistive technologies

**File:** `tests/accessibility/scrum74-pagination-assistive-tech.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Test pagination with screen readers
  3. Verify no focus jumps or scroll issues

**Expected Results:**
  - Pagination works with NVDA
  - Pagination works with JAWS
  - Pagination works with VoiceOver
  - No hidden focus jumps
  - No unexpected scroll resets

### 7. Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify empty results handling

**File:** `tests/functional/scrum74-empty-results.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Apply filters that return no results
  3. Verify empty state message

**Expected Results:**
  - Message displays: 'No more products to display'
  - Message is announced via role='alert'
  - Next button is disabled with aria-disabled='true'

#### 7.2. Verify pagination error handling

**File:** `tests/functional/scrum74-pagination-error.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Simulate pagination load failure
  3. Verify error message and focus management

**Expected Results:**
  - Error message displays: 'Unable to load page X. Please try again'
  - Error is announced via ARIA live region
  - Focus remains on pagination area
