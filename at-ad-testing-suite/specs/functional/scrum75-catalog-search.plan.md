# SCRUM-75 Test Plan

## Application Overview

Test plan for SCRUM-75: PwD - Search for Products within the Catalog. This covers search bar functionality, auto-suggestions, search results with pagination, and full accessibility compliance.

## Test Scenarios

### 1. Search Bar Elements

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify search bar presence and labels

**File:** `tests/functional/scrum75-search-bar-display.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Locate the search bar
  3. Verify placeholder text and ARIA attributes

**Expected Results:**
  - Search bar is visible at the top
  - Placeholder text is clear and descriptive
  - Search bar has ARIA label

### 2. Search Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search by product name

**File:** `tests/functional/scrum75-search-product-name.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Enter product name (e.g., 'SmartWheelchair')
  3. Press Enter
  4. Verify filtered results

**Expected Results:**
  - Search accepts product name input
  - Results filter based on product name
  - Result count displays (e.g., '3 devices found')

#### 2.2. Search by keywords

**File:** `tests/functional/scrum75-search-keywords.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Enter keywords (e.g., 'mobility', 'Bluetooth', 'voice control')
  3. Press Enter
  4. Verify filtered results

**Expected Results:**
  - Search accepts keyword input
  - Results filter based on keywords
  - Result count displays correctly

#### 2.3. Verify search suggestions appear

**File:** `tests/functional/scrum75-search-suggestions.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Type 3 letters in search bar
  3. Verify suggestions dropdown appears

**Expected Results:**
  - Suggestions appear after typing 3 letters
  - Suggestions are relevant to typed text

#### 2.4. Select search suggestion

**File:** `tests/functional/scrum75-select-suggestion.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Type to trigger suggestions
  3. Click a suggestion
  4. Verify results filter accordingly

**Expected Results:**
  - Clicking suggestion filters results
  - Result count updates
  - Selected suggestion appears in search bar

#### 2.5. Verify no results message

**File:** `tests/functional/scrum75-no-results.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Enter search term with no matches
  3. Press Enter
  4. Verify no results message displays

**Expected Results:**
  - Message displays: 'No matching devices found. Try adjusting filters or search terms.'
  - Message is visible to users

### 3. Search with Pagination

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify pagination with search results

**File:** `tests/functional/scrum75-search-pagination.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Search for term with 6+ results
  3. Verify pagination appears
  4. Navigate through pages

**Expected Results:**
  - Pagination appears when search results exceed 6 products
  - Pagination controls function correctly
  - Results display 6 products per page

### 4. Search Accessibility

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify search bar keyboard support

**File:** `tests/accessibility/scrum75-search-keyboard.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Tab to search bar
  3. Type search term
  4. Press Enter
  5. Verify search executes

**Expected Results:**
  - Search bar is keyboard focusable
  - Typed characters are announced by screen readers
  - Enter key triggers search

#### 4.2. Verify suggestions keyboard navigation

**File:** `tests/accessibility/scrum75-suggestions-keyboard.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Type to trigger suggestions
  3. Use arrow keys to navigate
  4. Press Enter to select

**Expected Results:**
  - Suggestions dropdown is accessible
  - Up/down arrows navigate suggestions
  - Enter selects highlighted suggestion
  - Escape closes suggestions

#### 4.3. Verify search results ARIA announcements

**File:** `tests/accessibility/scrum75-results-announcement.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Perform search
  3. Verify ARIA live region announces result count

**Expected Results:**
  - Result count is announced via ARIA live region
  - Announcement includes count (e.g., '3 devices found')

#### 4.4. Verify search results keyboard navigation

**File:** `tests/accessibility/scrum75-results-keyboard.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Perform search
  3. Use Tab to navigate results
  4. Verify focus order

**Expected Results:**
  - Search results are keyboard navigable
  - Tab moves through result items
  - Focus order is logical

#### 4.5. Verify no results message accessibility

**File:** `tests/accessibility/scrum75-no-results-alert.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Search for non-existent term
  3. Verify role='alert' on message

**Expected Results:**
  - No results message has role='alert'
  - Message is announced to screen readers

#### 4.6. Verify search color contrast

**File:** `tests/accessibility/scrum75-search-contrast.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Check search bar contrast ratios
  3. Verify focus indicators

**Expected Results:**
  - Search bar meets WCAG AA contrast requirements
  - Focus indicator is visible and meets 3:1 contrast
  - Search button (if present) meets contrast requirements

#### 4.7. Verify search with assistive technologies

**File:** `tests/accessibility/scrum75-assistive-tech.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Test search with screen readers
  3. Verify voice input compatibility

**Expected Results:**
  - Search works with voice input
  - Search works with screen readers
  - All functionality is accessible via assistive technology

#### 4.8. Verify pagination accessibility (SCRUM-74 criteria)

**File:** `tests/accessibility/scrum75-pagination-a11y.spec.ts`

**Steps:**
  1. Navigate to the Catalog page
  2. Perform search with 6+ results
  3. Verify pagination accessibility per SCRUM-74

**Expected Results:**
  - Pagination meets all SCRUM-74 accessibility criteria
  - Keyboard navigation works correctly
  - ARIA attributes are properly set
  - Focus management is correct
