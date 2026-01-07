# SCRUM-73 Test Plan

## Application Overview

Test plan for SCRUM-73: PwD - Navigate to Catalog Tab from Home Page. This covers navigation to the Assistive Device Catalog, verification of page elements including filters, sorting, pagination, and accessibility compliance.

## Test Scenarios

### 1. Catalog Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Catalog tab is visible in navigation

**File:** `tests/functional/scrum73-catalog-tab-visibility.spec.ts`

**Steps:**
  1. Navigate to the home page
  2. Locate the Catalog tab in the global navigation bar
  3. Verify the Catalog tab is visible

**Expected Results:**
  - Catalog tab is present in the navigation bar
  - Tab has proper ARIA label 'Open assistive device catalog'

#### 1.2. Navigate to Catalog page from home

**File:** `tests/functional/scrum73-catalog-navigation.spec.ts`

**Steps:**
  1. Navigate to the home page
  2. Click on the Catalog tab
  3. Wait for page to load

**Expected Results:**
  - User is redirected to the Assistive Device Catalog page
  - Page loads within 3 seconds
  - Page title displays 'Assistive Device Catalog'
  - Breadcrumb shows 'Home → Catalog'

### 2. Catalog Page Elements

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify filter section elements

**File:** `tests/functional/scrum73-filter-section.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Locate the filter section
  3. Verify all filter components are present

**Expected Results:**
  - Search bar is visible
  - Disability Type dropdown shows options: All, Physical, Visual, Auditory, Cognitive, Speech
  - Sub Category dropdown shows: All, Mobility, Hearing, Communication, Home Automation, Reading and Writing
  - Type dropdown shows: All, Device, Technology, Both
  - Price Range dropdown shows: All Prices, Under 20,000, 20,000-50,000, 50,000-1,00,000, 1,00,000+
  - Availability checkbox is present
  - Min Rating slider is present
  - Apply Filter button is visible
  - Reset All button is visible

#### 2.2. Verify device count display

**File:** `tests/functional/scrum73-device-count.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Check the device count display without filters
  3. Apply a filter
  4. Check the device count updates

**Expected Results:**
  - Total device count is displayed when no filters are applied
  - Device count updates based on filter selection

#### 2.3. Verify sorting dropdown

**File:** `tests/functional/scrum73-sorting.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Locate the sorting dropdown
  3. Verify sorting options

**Expected Results:**
  - Sorting dropdown is visible
  - Options include: Most Popular, Highest Rated, Price Low to High, Price High to Low, Name: A-Z

#### 2.4. Verify pagination

**File:** `tests/functional/scrum73-pagination.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Check pagination controls
  3. Verify device cards per page

**Expected Results:**
  - Pagination controls are visible
  - Each page displays 6 device cards (or device-appropriate count)

#### 2.5. Verify Shopping Tips section

**File:** `tests/functional/scrum73-shopping-tips.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Scroll to Shopping Tips and Guidance section
  3. Verify section content

**Expected Results:**
  - Shopping Tips and Guidance section is visible
  - Before You Buy subsection is present
  - Need Help Choosing subsection is present

### 3. Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. Apply and reset filters

**File:** `tests/functional/scrum73-filter-apply-reset.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Select filters from multiple dropdowns
  3. Click Apply Filter button
  4. Verify results update
  5. Click Reset All button

**Expected Results:**
  - Filters are applied and results update accordingly
  - Device count reflects filtered results
  - Reset All clears all selected filters
  - Page returns to showing all devices

### 4. Responsive Design

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify responsive layout on desktop

**File:** `tests/functional/scrum73-responsive-desktop.spec.ts`

**Steps:**
  1. Set viewport to desktop size (1920x1080)
  2. Navigate to the Catalog page
  3. Verify layout and elements

**Expected Results:**
  - Page layout is properly displayed
  - All elements are visible and accessible
  - No horizontal scrolling required

#### 4.2. Verify responsive layout on tablet

**File:** `tests/functional/scrum73-responsive-tablet.spec.ts`

**Steps:**
  1. Set viewport to tablet size (768x1024)
  2. Navigate to the Catalog page
  3. Verify layout adjusts appropriately

**Expected Results:**
  - Page layout adjusts for tablet view
  - All elements remain accessible
  - No horizontal scrolling required

#### 4.3. Verify responsive layout on mobile

**File:** `tests/functional/scrum73-responsive-mobile.spec.ts`

**Steps:**
  1. Set viewport to mobile size (375x667)
  2. Navigate to the Catalog page
  3. Verify layout adjusts appropriately

**Expected Results:**
  - Page layout adjusts for mobile view
  - All elements remain accessible
  - No horizontal scrolling required

### 5. Accessibility

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify keyboard navigation

**File:** `tests/accessibility/scrum73-keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate to the home page
  2. Use Tab key to focus on Catalog tab
  3. Press Enter to navigate
  4. Verify focus management

**Expected Results:**
  - Catalog tab is keyboard-focusable
  - Enter key triggers navigation
  - Space key triggers navigation
  - Focus moves to h1 'Assistive Device Catalog' after navigation

#### 5.2. Verify ARIA labels and screen reader compatibility

**File:** `tests/accessibility/scrum73-aria-labels.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Check ARIA labels on navigation elements
  3. Verify page structure for screen readers

**Expected Results:**
  - Catalog tab has aria-label='Open assistive device catalog'
  - Page heading (h1) is properly labeled
  - All interactive elements have appropriate ARIA attributes

#### 5.3. Verify color contrast

**File:** `tests/accessibility/scrum73-color-contrast.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Check color contrast of navigation items
  3. Verify active and inactive states

**Expected Results:**
  - Active menu items meet 4.5:1 contrast ratio
  - Inactive menu items meet 4.5:1 contrast ratio
  - All text elements meet WCAG AA standards

#### 5.4. Run automated accessibility scan

**File:** `tests/accessibility/scrum73-a11y-scan.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Run axe-core accessibility scan
  3. Check for violations

**Expected Results:**
  - No critical accessibility violations
  - Page passes WCAG 2.1 Level AA standards

### 6. Performance

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify page load time

**File:** `tests/functional/scrum73-page-load-performance.spec.ts`

**Steps:**
  1. Navigate to the home page
  2. Record start time
  3. Click Catalog tab
  4. Measure time until page is fully loaded

**Expected Results:**
  - Catalog page loads within 3 seconds under normal conditions
