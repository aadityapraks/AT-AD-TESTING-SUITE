# Functional Test Plan: SCRUM-76 — PwD Sort and View Product Listings

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 3.0                                          |
| Date        | 2025-07-17                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-76](https://youth4jobs.atlassian.net//browse/SCRUM-76) |
| Status      | In QA                                        |
| Assignee    | Kamilath Rifka Sameem Ali                    |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?p=f&t=ThxKWawF59kREh5H-0) |

### Scope & Objectives
Validate that a PwD user can sort product listings using the Sort By dropdown and view product cards with all required information. This plan covers functional testing only — accessibility testing is out of scope.

### Out of Scope
- Accessibility testing (WCAG 2.1 AA) — to be covered separately
- Product detail page functionality
- Filter panel interactions (covered by SCRUM-74)
- Search functionality (covered by SCRUM-75)
- Backend API performance testing

---

## 2. Requirements Traceability Matrix

| Acceptance Criteria                                              | Test Case(s)                        | Priority |
|------------------------------------------------------------------|-------------------------------------|----------|
| Sort dropdown includes all required options                      | TC_SCRUM76_001                      | Highest  |
| Sort by Most Popular works correctly                             | TC_SCRUM76_002                      | High     |
| Sort by Highest Rated works correctly                            | TC_SCRUM76_003                      | High     |
| Sort by Price: Low to High works correctly                       | TC_SCRUM76_004                      | High     |
| Sort by Price: High to Low works correctly                       | TC_SCRUM76_005                      | High     |
| Sort by Alphabetical (A–Z) works correctly                       | TC_SCRUM76_006                      | High     |
| Sorting refreshes results instantly                              | TC_SCRUM76_007                      | Highest  |
| Grid view displays product cards in 2 columns                   | TC_SCRUM76_008                      | High     |
| Product card includes product image                              | TC_SCRUM76_009                      | High     |
| Product card includes product name                               | TC_SCRUM76_010                      | High     |
| Product card includes tags (disability/category)                 | TC_SCRUM76_011                      | High     |
| Product card includes rating (stars + review count)              | TC_SCRUM76_012                      | High     |
| Product card includes short description (truncated)              | TC_SCRUM76_013                      | High     |
| Product card includes key features                               | TC_SCRUM76_014                      | High     |
| Product card includes availability badge                         | TC_SCRUM76_015                      | High     |
| Product card price is displayed                                  | TC_SCRUM76_016                      | High     |
| Product card "View details" link is present and clickable        | TC_SCRUM76_017                      | High     |
| Pagination available for >X products per page                    | TC_SCRUM76_018                      | High     |
| Default sort order on page load                                  | TC_SCRUM76_019                      | Medium   |
| Sort dropdown resets on Reset All                                | TC_SCRUM76_020                      | Medium   |
| Sort persists after pagination navigation                        | TC_SCRUM76_021                      | High     |
| Sort combined with filters works correctly                       | TC_SCRUM76_022                      | High     |
| Grid view responsive on mobile viewport                          | TC_SCRUM76_023                      | High     |
| Sort order is correct for Alphabetical (A–Z)                     | TC_SCRUM76_024                      | High     |
| Sort dropdown is keyboard navigable                              | TC_SCRUM76_025                      | High     |
| Rapid sort switching returns correct final results               | TC_SCRUM76_026                      | High     |
| Sort persists after browser back/forward navigation              | TC_SCRUM76_027                      | High     |
| Product cards maintain consistent height in grid                 | TC_SCRUM76_028                      | Medium   |
| Sort dropdown visible on mobile viewport                         | TC_SCRUM76_029                      | High     |
| No horizontal overflow on any sort option                        | TC_SCRUM76_030                      | Medium   |
| Price sort validates actual ordering (Low to High)               | TC_SCRUM76_031                      | High     |
| Price sort validates actual ordering (High to Low)               | TC_SCRUM76_032                      | High     |
| Multiple sort changes do not duplicate product cards             | TC_SCRUM76_033                      | High     |

---

## 3. Test Scenarios

### Feature: Sort Dropdown — Options & Functionality

---

### TC_SCRUM76_001 — Sort Dropdown Contains All Required Options
**Priority**: Highest
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Locate the "Sort by" dropdown on the catalog page.
2. Click/open the dropdown.
3. Verify the available options.
**Test Data**: Expected options: Latest, Most Popular, Highest Rated, Price: Low to High, Price: High to Low, Name: A to Z
**Expected Results**:
- Step 3: Dropdown lists all 6 sort options.
**Postconditions**: Dropdown closes; no sort change applied.

---

### TC_SCRUM76_002 — Sort by Most Popular Reorders Results
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page with default sort.
**Test Steps**:
1. Note the first product displayed.
2. Select "Most Popular" from the Sort by dropdown.
3. Observe the product order.
**Expected Results**:
- Step 3: Products are reordered by popularity; device count remains the same.
**Postconditions**: Sort by Most Popular is active.

---

### TC_SCRUM76_003 — Sort by Highest Rated Reorders Results
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Highest Rated" from the Sort by dropdown.
2. Observe the first few product cards.
3. Verify device count remains the same as before sort.
**Expected Results**:
- Step 3: Products are reordered; device count does not change (sort should not re-filter).
**Postconditions**: Sort by Highest Rated is active.

---

### TC_SCRUM76_004 — Sort by Price: Low to High Reorders Results
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Price: Low to High" from the Sort by dropdown.
2. Observe the first few product cards.
3. Verify device count remains the same as before sort.
**Expected Results**:
- Step 3: Products are reordered by price ascending; device count does not change.
**Postconditions**: Sort by Price: Low to High is active.

---

### TC_SCRUM76_005 — Sort by Price: High to Low Reorders Results
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Price: High to Low" from the Sort by dropdown.
2. Observe the first few product cards.
3. Verify device count remains the same as before sort.
**Expected Results**:
- Step 3: Products are reordered by price descending; device count does not change.
**Postconditions**: Sort by Price: High to Low is active.

---

### TC_SCRUM76_006 — Sort by Alphabetical (A–Z) Reorders Results
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Name: A to Z" from the Sort by dropdown.
2. Observe the first few product cards.
3. Verify the first product's name comes alphabetically before the second product's name.
**Expected Results**:
- Step 3: Products are ordered alphabetically by name (A–Z); device count remains the same.
**Postconditions**: Sort by Name: A to Z is active.

---

### TC_SCRUM76_007 — Sorting Refreshes Results Instantly (No Page Reload)
**Priority**: Highest
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Note the current product order.
2. Select a different sort option (e.g., "Most Popular").
3. Observe the page behavior.
**Expected Results**:
- Step 3: Results reorder instantly without a full page reload; no loading spinner persists.
**Postconditions**: Sort applied; page did not reload.

---

### Feature: Product Card — Display & Content

---

### TC_SCRUM76_008 — Grid View Displays Product Cards in 2 Columns
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page in grid view (default).
**Test Steps**:
1. Observe the product grid layout.
2. Verify products are displayed in a 2-column grid on desktop viewport.
**Test Data**: Viewport: 1280x720 (desktop)
**Expected Results**:
- Step 2: Products are arranged in 2 columns per row.
**Postconditions**: Grid view is active.

---

### TC_SCRUM76_009 — Product Card Includes Product Image
**Priority**: Medium
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the first product card.
2. Verify an image element is present within the card.
**Expected Results**:
- Step 2: Product card contains a visible image (or placeholder image).
**Postconditions**: Product image is displayed.

---

### TC_SCRUM76_010 — Product Card Includes Product Name
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the first product card.
2. Verify a heading (h3) with the product name is present.
**Expected Results**:
- Step 2: Product card contains a heading with the product name.
**Postconditions**: Product name is displayed.

---

### TC_SCRUM76_011 — Product Card Includes Tags (Disability/Category)
**Priority**: Medium
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the first product card.
2. Verify tags/badges are displayed (e.g., "Mobility", "Auditory", disability type, category).
**Expected Results**:
- Step 2: At least one tag/badge is visible on the product card.
**Postconditions**: Tags are displayed.

---

### TC_SCRUM76_012 — Product Card Includes Rating (Stars + Review Count)
**Priority**: Medium
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the first product card.
2. Verify a star rating element is present.
3. Verify a review count is displayed (e.g., "(2)").
**Expected Results**:
- Step 2: Star rating is visible.
- Step 3: Review count is displayed next to the rating.
**Postconditions**: Rating and review count are displayed.

---

### TC_SCRUM76_013 — Product Card Includes Short Description (Truncated)
**Priority**: Medium
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the first product card.
2. Verify a short description text is present.
**Expected Results**:
- Step 2: A short description is visible on the product card.
**Postconditions**: Description is displayed.

---

### TC_SCRUM76_014 — Product Card Includes Key Features
**Priority**: Low
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the first product card.
2. Verify a "Key Features" section or text is present.
**Expected Results**:
- Step 2: Key features text is visible on the product card.
**Postconditions**: Key features are displayed.

---

### TC_SCRUM76_015 — Product Card Includes Availability Badge
**Priority**: Low
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the first product card.
2. Verify an availability badge is present (e.g., "In Stock").
**Expected Results**:
- Step 2: Availability badge is visible (e.g., "In Stock", "Out of Stock").
**Postconditions**: Availability badge is displayed.

---

### TC_SCRUM76_016 — Product Card Price is Displayed
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the first product card.
2. Verify a price is displayed (e.g., "₹899.99" or "₹12000").
**Expected Results**:
- Step 2: Price text is visible on the product card.
**Postconditions**: Price is displayed.

---

### TC_SCRUM76_017 — Product Card "View Details" Link is Present and Clickable
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the first product card.
2. Verify a "View details" link is present.
3. Click the "View details" link.
4. Observe the navigation.
**Expected Results**:
- Step 2: "View details" link is visible.
- Step 4: Clicking opens sign-in modal or navigates to the product detail page.
**Postconditions**: Product detail page or sign-in modal is shown.

---

### TC_SCRUM76_018 — Pagination Available When Products Exceed Per-Page Limit
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: Catalog has more products than the per-page limit.
**Test Steps**:
1. Navigate to the catalog landing page with no filters.
2. Observe the pagination component below the product list.
3. Verify pagination controls are visible.
**Expected Results**:
- Step 3: Pagination controls (Previous, page numbers, Next) are visible.
**Postconditions**: Pagination is active.

---

### Feature: Sort Interactions & Persistence

---

### TC_SCRUM76_019 — Default Sort Order on Page Load
**Priority**: Medium
**Related Jira Issue**: SCRUM-76
**Preconditions**: User navigates to the catalog landing page for the first time.
**Test Steps**:
1. Navigate to the catalog landing page.
2. Observe the Sort by dropdown default value.
**Expected Results**:
- Step 2: Sort dropdown shows "Latest" as the default selected option.
**Postconditions**: Default sort is active.

---

### TC_SCRUM76_020 — Sort Dropdown Resets on Reset All
**Priority**: Medium
**Related Jira Issue**: SCRUM-76
**Preconditions**: User has changed the sort order.
**Test Steps**:
1. Select "Price: High to Low" from the Sort by dropdown.
2. Click "Reset All".
3. Observe the Sort by dropdown value.
**Expected Results**:
- Step 3: Sort dropdown reverts to the default value ("Latest").
**Postconditions**: Sort is reset.

---

### TC_SCRUM76_021 — Sort Persists After Pagination Navigation
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page with sort applied.
**Test Steps**:
1. Select "Price: Low to High" from the Sort by dropdown.
2. Click "Next" or page 2 in pagination.
3. Observe the Sort by dropdown value.
4. Observe the product order on page 2.
**Expected Results**:
- Step 3: Sort dropdown still shows "Price: Low to High".
- Step 4: Products on page 2 continue the ascending price order.
**Postconditions**: Sort persists across pagination.

---

### TC_SCRUM76_022 — Sort Combined with Filters Works Correctly
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Device" from the Type filter dropdown.
2. Click "Apply Filters".
3. Select "Highest Rated" from the Sort by dropdown.
4. Observe the results.
**Test Data**: Type: Device, Sort: Highest Rated
**Expected Results**:
- Step 4: Only "Device" type products are shown, sorted by highest rating; device count remains the same after sort.
**Postconditions**: Filter + sort are both active.

---

### TC_SCRUM76_023 — Grid View Responsive on Mobile Viewport
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: Browser viewport set to mobile width (375px).
**Test Steps**:
1. Open the catalog landing page on a mobile viewport.
2. Observe the product grid layout.
3. Verify products are displayed in a single column or adjusted layout.
**Test Data**: Viewport: 375x667
**Expected Results**:
- Step 3: Product cards stack in a single column on mobile; no horizontal overflow.
**Postconditions**: Grid is responsive.

---

### TC_SCRUM76_024 — Sort Order is Correct for Alphabetical (A–Z)
**Priority**: Highest
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Name: A to Z" from the Sort by dropdown.
2. Extract the name from the first product card.
3. Extract the name from the second product card.
4. Compare the two names alphabetically.
**Expected Results**:
- Step 4: First product name comes before or equals the second product name alphabetically.
**Postconditions**: Sort order verified.

---

### Feature: Edge Cases & Robustness

---

### TC_SCRUM76_025 — Sort Dropdown is Keyboard Navigable
**Priority**: Medium
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Tab to the Sort by dropdown to focus it.
2. Press Enter to open the dropdown.
3. Use ArrowDown keys to navigate options.
4. Press Enter to select an option.
5. Verify the sort changes from default.
**Expected Results**:
- Step 5: Sort dropdown can be fully operated via keyboard; selected sort option changes from default.
**Postconditions**: Sort changed via keyboard.

---

### TC_SCRUM76_026 — Rapid Sort Switching Returns Correct Final Results
**Priority**: Medium
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Rapidly switch sort from "Most Popular" to "Price: High to Low" to "Name: A to Z" without waiting.
2. Wait for results to settle.
3. Verify the final sort selection and product order.
**Expected Results**:
- Step 3: Sort dropdown shows "Name: A to Z"; products are in alphabetical order.
**Postconditions**: Final sort is applied correctly.

---

### TC_SCRUM76_027 — Sort Persists After Browser Back/Forward Navigation
**Priority**: Medium
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Most Popular" from the Sort by dropdown.
2. Navigate to page 2 via pagination.
3. Click browser Back button.
4. Verify the sort dropdown value.
**Expected Results**:
- Step 4: Sort dropdown still shows "Most Popular" after navigating back.
**Postconditions**: Sort persists across browser navigation.

---

### TC_SCRUM76_028 — Product Cards Maintain Consistent Height in Grid
**Priority**: Lowest
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page with at least 2 product cards.
**Test Steps**:
1. Observe the first two product cards in the grid.
2. Compare their bounding box heights.
**Expected Results**:
- Step 2: Cards in the same row have similar height (within 20px tolerance).
**Postconditions**: Grid layout is consistent.

---

### TC_SCRUM76_029 — Sort Dropdown Visible on Mobile Viewport
**Priority**: High
**Related Jira Issue**: SCRUM-76
**Preconditions**: Browser viewport set to mobile width (375px).
**Test Steps**:
1. Set viewport to mobile (375x667).
2. Navigate to the catalog page.
3. Verify the Sort by dropdown is visible.
4. Verify all sort options are available.
**Test Data**: Viewport: 375x667
**Expected Results**:
- Step 3: Sort dropdown is visible on mobile.
- Step 4: All 6 sort options are available.
**Postconditions**: Sort dropdown works on mobile.

---

### TC_SCRUM76_030 — No Horizontal Overflow on Any Sort Option
**Priority**: Lowest
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Cycle through all 6 sort options.
2. After each sort, check the page body scroll width.
3. Verify no horizontal overflow occurs.
**Expected Results**:
- Step 3: Page body scroll width does not exceed viewport width for any sort option.
**Postconditions**: No layout overflow.

---

### TC_SCRUM76_031 — Price Sort Validates Actual Price Ordering (Low to High)
**Priority**: Highest
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Price: Low to High" from the Sort by dropdown.
2. Extract prices from the first 3 product cards.
3. Compare each consecutive pair.
**Expected Results**:
- Step 3: Each product's price is greater than or equal to the previous product's price.
**Postconditions**: Price ascending order verified.

---

### TC_SCRUM76_032 — Price Sort Validates Actual Price Ordering (High to Low)
**Priority**: Highest
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Price: High to Low" from the Sort by dropdown.
2. Extract prices from the first 3 product cards.
3. Compare each consecutive pair.
**Expected Results**:
- Step 3: Each product's price is less than or equal to the previous product's price.
**Postconditions**: Price descending order verified.

---

### TC_SCRUM76_033 — Multiple Sort Changes Do Not Duplicate Product Cards
**Priority**: Low
**Related Jira Issue**: SCRUM-76
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Note the initial product card count on the page.
2. Switch sort to "Most Popular", then "Price: Low to High", then "Name: A to Z".
3. Compare the final product card count to the initial count.
**Expected Results**:
- Step 3: Product card count remains the same after multiple sort changes; no duplicates appear.
**Postconditions**: No duplicate cards.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Sort options                     | Latest, Most Popular, Highest Rated, Price: Low to High, Price: High to Low, Name: A to Z |
| Default sort                     | Latest                                                   |
| Products with varied prices      | Products spanning multiple price points                  |
| Products with varied ratings     | Products with ratings 0–5 stars                          |
| Products with varied names       | Products with names starting with different letters      |
| Mobile viewport                  | 375x667                                                  |
| Desktop viewport                 | 1280x720                                                 |

---

## 5. Assumptions & Dependencies

- The catalog landing page is publicly accessible at `https://qa-atad.swarajability.org/catalog/` — no login required.
- Navigation to catalog: Home → Navbar click "Catalog" (aria-label: "Open assistive device catalog").
- The Sort by dropdown is a native `<select>` element (combobox role) located above the product grid.
- Default sort order is "Latest".
- Grid view is the default view; list view toggle is not implemented.
- Product cards are rendered inside a semantic list (`role="list"`).
- Sorting updates results dynamically without full page reload (SPA behavior).
- Pagination follows the same behavior as SCRUM-74.
- Pagination is client-side — URL stays at `/catalog/` and does not change with page navigation.
- On mobile viewport (375px), the navbar Catalog link is hidden behind a hamburger menu.
- **Dependency**: SCRUM-74 (pagination behavior is inherited).

---

## 6. Open Questions / Clarifications Needed

1. **Per-page limit**: The AC says pagination for more than 'X' products — what is the exact per-page limit? (Currently appears to be 9 based on testing.)
2. **"Most Popular" definition**: How is popularity determined — by number of views, purchases, or reviews?
3. **Sort + pagination**: When sorting is changed, does pagination reset to page 1?
4. **Sort persistence**: Does the sort selection persist across browser refresh or only within the session?
5. **Default sort on filter change**: When filters are applied, does the sort reset to "Latest" or maintain the current sort?
