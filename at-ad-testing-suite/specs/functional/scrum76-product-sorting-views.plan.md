# SCRUM-76 Test Plan

## Application Overview

Test plan for SCRUM-76: PwD - Sort and View Product Listings. This covers sorting functionality, grid/list view toggle, product card content, pagination, and full accessibility compliance.

## Test Scenarios

### 1. Sorting Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify sorting dropdown options

**File:** `tests/functional/scrum76-sorting-dropdown.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Locate sorting dropdown
  3. Verify all sorting options are present

**Expected Results:**
  - Sorting dropdown is visible
  - Options include: Most Popular, Highest Rated, Price: Low to High, Price: High to Low, Alphabetical (A-Z)

#### 1.2. Sort by Most Popular

**File:** `tests/functional/scrum76-sort-most-popular.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select 'Most Popular' from dropdown
  3. Verify products are sorted correctly

**Expected Results:**
  - Products are sorted by popularity
  - Results refresh instantly without page reload

#### 1.3. Sort by Highest Rated

**File:** `tests/functional/scrum76-sort-highest-rated.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select 'Highest Rated' from dropdown
  3. Verify products are sorted by rating

**Expected Results:**
  - Products are sorted by rating (highest first)
  - Results refresh instantly

#### 1.4. Sort by Price: Low to High

**File:** `tests/functional/scrum76-sort-price-low-high.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select 'Price: Low to High' from dropdown
  3. Verify products are sorted correctly

**Expected Results:**
  - Products are sorted by price (low to high)
  - Results refresh instantly

#### 1.5. Sort by Price: High to Low

**File:** `tests/functional/scrum76-sort-price-high-low.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select 'Price: High to Low' from dropdown
  3. Verify products are sorted correctly

**Expected Results:**
  - Products are sorted by price (high to low)
  - Results refresh instantly

#### 1.6. Sort by Alphabetical (A-Z)

**File:** `tests/functional/scrum76-sort-alphabetical.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select 'Alphabetical (A-Z)' from dropdown
  3. Verify products are sorted alphabetically

**Expected Results:**
  - Products are sorted alphabetically (A-Z)
  - Results refresh instantly

### 2. View Toggle

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify view toggle buttons

**File:** `tests/functional/scrum76-view-toggle-buttons.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Locate view toggle buttons
  3. Verify both buttons are present

**Expected Results:**
  - Grid view button is present
  - List view button is present
  - One view mode is selected by default

#### 2.2. Switch to grid view

**File:** `tests/functional/scrum76-grid-view.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Click grid view button
  3. Verify grid layout displays

**Expected Results:**
  - Products display in grid format
  - 2 columns are shown based on screen size
  - Layout is visually correct

#### 2.3. Switch to list view

**File:** `tests/functional/scrum76-list-view.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Click list view button
  3. Verify list layout displays

**Expected Results:**
  - Products display in list format
  - Expanded information is shown
  - Layout is visually correct

### 3. Product Card Content

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify product card elements in grid view

**File:** `tests/functional/scrum76-product-card-elements.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select grid view
  3. Verify all card elements are present

**Expected Results:**
  - Product image is displayed
  - Product name is displayed
  - Tags show disability and category (e.g., 'Mobility', 'Auditory')
  - Rating shows stars and review count
  - Short description is truncated
  - Key features are listed
  - Availability badge is shown (e.g., 'In Stock')

### 4. Pagination

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify pagination with sorted results

**File:** `tests/functional/scrum76-pagination-display.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Apply sorting
  3. Verify pagination appears if needed

**Expected Results:**
  - Pagination appears when products exceed threshold
  - Pagination controls function correctly

### 5. Sorting Accessibility

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify sorting dropdown keyboard support

**File:** `tests/accessibility/scrum76-sorting-keyboard.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Tab to sorting dropdown
  3. Use arrow keys to navigate
  4. Press Enter to select

**Expected Results:**
  - Dropdown is keyboard accessible
  - Supports aria-expanded attribute
  - Supports aria-activedescendant attribute
  - Arrow keys navigate options
  - Enter selects option

#### 5.2. Verify sorting ARIA live announcements

**File:** `tests/accessibility/scrum76-sorting-announcement.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Change sorting option
  3. Verify ARIA live region announces update

**Expected Results:**
  - Sorting triggers ARIA live region announcement
  - Announcement indicates results have updated

### 6. View Toggle Accessibility

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify view toggle ARIA attributes

**File:** `tests/accessibility/scrum76-view-toggle-aria.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Check aria-pressed on view buttons
  3. Toggle views and verify aria-pressed updates

**Expected Results:**
  - View toggle buttons have accessible names
  - aria-pressed reflects current state
  - Selected view is visually indicated
  - Selected view is programmatically indicated

#### 6.2. Verify view toggle keyboard support

**File:** `tests/accessibility/scrum76-view-toggle-keyboard.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Tab to view toggle buttons
  3. Use Enter/Space to toggle views

**Expected Results:**
  - View toggle buttons are keyboard accessible
  - Tab focuses buttons
  - Enter/Space toggles view

### 7. Product Card Accessibility

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify grid view reading order

**File:** `tests/accessibility/scrum76-grid-reading-order.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select grid view
  3. Verify logical reading order for screen readers

**Expected Results:**
  - Grid items have logical reading order
  - Screen readers can navigate cards sequentially

#### 7.2. Verify list view heading structure

**File:** `tests/accessibility/scrum76-list-heading-structure.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select list view
  3. Verify h3 headings for product names

**Expected Results:**
  - Product names use h3 heading structure
  - Expanded information is properly structured
  - Screen readers can navigate list items

#### 7.3. Verify product card keyboard navigation

**File:** `tests/accessibility/scrum76-card-keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Use Tab to navigate cards
  3. Verify no focus traps

**Expected Results:**
  - Tab navigates through product cards
  - Arrow keys can navigate cards
  - No focus traps exist

#### 7.4. Verify focus and hover contrast

**File:** `tests/accessibility/scrum76-focus-contrast.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Tab through elements
  3. Check focus indicator contrast ratios
  4. Hover over elements and check contrast

**Expected Results:**
  - Focus indicators meet 3:1 contrast ratio
  - Hover indicators meet 3:1 contrast ratio
  - Focus states are visually distinct

### 8. Pagination Accessibility

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify pagination accessibility (SCRUM-74 criteria)

**File:** `tests/accessibility/scrum76-pagination-a11y.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Verify pagination accessibility per SCRUM-74

**Expected Results:**
  - Pagination meets all SCRUM-74 accessibility criteria
  - Keyboard navigation works correctly
  - ARIA attributes are properly set
