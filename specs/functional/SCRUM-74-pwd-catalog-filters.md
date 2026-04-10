# Functional Test Plan: SCRUM-74 — PwD View Catalog Landing Page with Filters

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 3.0                                          |
| Date        | 2025-07-17                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-74](https://youth4jobs.atlassian.net//browse/SCRUM-74) |
| Status      | In QA                                        |
| Assignee    | Kamilath Rifka Sameem Ali                    |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that a PwD user can view the catalog landing page, apply filters by disability type, pricing, and category, and receive dynamically updated results. This plan covers functional testing only — accessibility testing is out of scope.

### Out of Scope
- Accessibility testing (WCAG 2.1 AA) — to be covered separately
- Product detail page functionality
- Vendor/resource search result pages
- Backend API performance testing

---

## 2. Requirements Traceability Matrix

| Acceptance Criteria                                              | Test Case(s)                        | Priority |
|------------------------------------------------------------------|-------------------------------------|----------|
| Filter panel visible with all filter options                     | TC_SCRUM74_001                      | Highest  |
| Default "All" selected across all filters                        | TC_SCRUM74_002                      | High     |
| Disability Type dropdown options                                 | TC_SCRUM74_003                      | Highest  |
| Sub Category dropdown options                                    | TC_SCRUM74_004                      | Medium   |
| Type dropdown options                                            | TC_SCRUM74_005                      | High     |
| Price Range filter options                                       | TC_SCRUM74_006                      | High     |
| Availability checkbox filter                                     | TC_SCRUM74_007                      | Medium   |
| Min Rating slider filter                                         | TC_SCRUM74_008                      | Medium   |
| Device count updates automatically                               | TC_SCRUM74_009                      | Highest  |
| Multiple filters simultaneously                                  | TC_SCRUM74_010                      | Highest  |
| Results refresh without page reload                              | TC_SCRUM74_011                      | Highest  |
| Selected filters visually highlighted with checkmarks            | TC_SCRUM74_012                      | Medium   |
| Apply Filter CTA                                                 | TC_SCRUM74_013                      | Highest  |
| Reset All CTA                                                    | TC_SCRUM74_014                      | Highest  |
| Global search bar                                                | TC_SCRUM74_015                      | High     |
| No results state                                                 | TC_SCRUM74_016                      | High     |
| Pagination (>6 products per page)                                | TC_SCRUM74_017, TC_SCRUM74_018      | High     |
| Filter panel collapses on mobile                                 | TC_SCRUM74_019                      | High     |
| Device count visible after filter change                         | TC_SCRUM74_020                      | High     |
| Pagination responsive on mobile                                  | TC_SCRUM74_021                      | Medium   |
| Pagination error handling                                        | TC_SCRUM74_022                      | Medium   |
| Sort dropdown options and default                                | TC_SCRUM74_023                      | Low      |
| Product cards display required information                       | TC_SCRUM74_024                      | High     |
| Search with non-existent term shows no results                   | TC_SCRUM74_025                      | Low      |
| Filters persist after pagination navigation                      | TC_SCRUM74_026                      | High     |
| Rapid filter switching returns correct results                   | TC_SCRUM74_027                      | Medium   |
| Filter dropdowns are keyboard navigable                          | TC_SCRUM74_028                      | Medium   |
| Filters persist after browser back/forward                       | TC_SCRUM74_029                      | Medium   |
| Device count text format validation                              | TC_SCRUM74_030                      | Low      |
| Reset All restores device count to initial                       | TC_SCRUM74_031                      | High     |
| No horizontal overflow on mobile with filters                    | TC_SCRUM74_032                      | Low      |
| Price range filter reduces device count                          | TC_SCRUM74_033                      | High     |

---

## 3. Test Scenarios

### Feature: Filter Panel — Display & Defaults

---

### TC_SCRUM74_001 — Filter Panel Renders with All Expected Sections
**Priority**: Highest
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Navigate to the catalog landing page.
2. Observe the filter panel on the page.
3. Verify the following filter controls are visible: Search bar, Disability Type dropdown, Sub Category dropdown, Type dropdown, Price Range dropdown, Availability checkbox, Min Rating slider.
4. Verify the "Apply Filter" and "Reset All" CTAs are present.
**Expected Results**:
- Step 3: All 7 filter controls are rendered correctly.
- Step 4: Both CTAs are visible and enabled.
**Postconditions**: Catalog page is in default state.

---

### TC_SCRUM74_002 — Default State: "All" Selected Across All Filters
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: User navigates to the catalog landing page without applying any filters.
**Test Steps**:
1. Navigate to the catalog landing page.
2. Inspect the Disability Type dropdown.
3. Inspect the Sub Category dropdown.
4. Inspect the Type dropdown.
5. Inspect the Price Range dropdown.
**Expected Results**:
- Steps 2–5: Each dropdown shows "All" as the selected/default value.
**Postconditions**: No filters are active; full catalog is displayed.

---

### Feature: Filter Dropdowns — Options Validation

---

### TC_SCRUM74_003 — Disability Type Dropdown Contains Correct Options
**Priority**: Highest
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Click/open the Disability Type dropdown.
2. Verify the available options.
**Expected Results**:
- Step 2: Dropdown lists options including All, Visual, Speech, and more than 3 total options.
**Postconditions**: Dropdown closes; no filter applied.

---

### TC_SCRUM74_004 — Sub Category Dropdown Contains Correct Options
**Priority**: Medium
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Click/open the Sub Category dropdown.
2. Verify the available options.
**Expected Results**:
- Step 2: Dropdown lists options including "All" with at least 1 option.
**Postconditions**: Dropdown closes; no filter applied.

---

### TC_SCRUM74_005 — Type Dropdown Contains Correct Options
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Click/open the Type dropdown.
2. Verify the available options.
**Expected Results**:
- Step 2: Dropdown lists exactly: All, Device, Technology, Both.
**Postconditions**: Dropdown closes; no filter applied.

---

### TC_SCRUM74_006 — Price Range Filter Contains Correct Options
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Click/open the Price Range dropdown.
2. Verify the available options.
**Expected Results**:
- Step 2: Dropdown lists at least 5 options including "All Prices".
**Postconditions**: Dropdown closes; no filter applied.

---

### Feature: Filter Interactions

---

### TC_SCRUM74_007 — Availability Checkbox Filters Results
**Priority**: Medium
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog has products with varying availability statuses.
**Test Steps**:
1. Navigate to the catalog landing page.
2. Check the Availability checkbox.
3. Click "Apply Filters".
4. Observe the catalog results.
**Expected Results**:
- Step 2: Checkbox is visually checked.
- Step 4: Device count is visible after applying.
**Postconditions**: Availability filter is active.

---

### TC_SCRUM74_008 — Min Rating Slider Filters Results
**Priority**: Medium
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog has products with varying ratings.
**Test Steps**:
1. Set the Min Rating slider to 3.
2. Click "Apply Filters".
3. Set the slider to 5.
4. Click "Apply Filters".
**Expected Results**:
- Device count is visible after each apply.
**Postconditions**: Rating filter is active.

---

### TC_SCRUM74_009 — Device Count Updates Automatically on Filter Change
**Priority**: Highest
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog has products across multiple disability types.
**Test Steps**:
1. Note the initial device count.
2. Select "Visual" from Disability Type and apply.
3. Note the new count.
4. Select "Amputation" from Disability Type and apply.
5. Note the new count.
**Expected Results**:
- At least one filter change produces a different device count.
**Postconditions**: Filter is active; count reflects filtered results.

---

### TC_SCRUM74_010 — Multiple Filters Applied Simultaneously
**Priority**: Highest
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog has products across multiple categories.
**Test Steps**:
1. Select "Visual" from Disability Type.
2. Select "Device" from Type.
3. Click "Apply Filters".
4. Observe the catalog results.
**Expected Results**:
- Device count is visible reflecting combined filter results.
**Postconditions**: Two filters are active simultaneously.

---

### TC_SCRUM74_011 — Results Refresh Without Page Reload
**Priority**: Highest
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Device" from Type.
2. Click "Apply Filters".
3. Observe the page behavior.
**Expected Results**:
- Page does NOT perform a full reload; results update dynamically.
**Postconditions**: Filter applied; no full page reload.

---

### TC_SCRUM74_012 — Selected Filters Visually Highlighted with Checkmarks
**Priority**: Medium
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Visual" from Disability Type.
2. Observe the dropdown value.
**Expected Results**:
- Selected value is not empty, confirming visual selection.
**Postconditions**: Filter is visually active.

---

### TC_SCRUM74_013 — Apply Filter CTA Applies All Selected Filters
**Priority**: Highest
**Related Jira Issue**: SCRUM-74
**Preconditions**: User has selected multiple filters but not yet applied.
**Test Steps**:
1. Select "Speech" from Disability Type.
2. Select "Device" from Type.
3. Click "Apply Filter".
4. Observe the catalog results.
**Expected Results**:
- Device count is visible reflecting Speech + Device filters.
**Postconditions**: Filters are applied and results are filtered.

---

### TC_SCRUM74_014 — Reset All CTA Clears All Active Filters
**Priority**: Highest
**Related Jira Issue**: SCRUM-74
**Preconditions**: Multiple filters are currently active.
**Test Steps**:
1. Apply filters: Disability Type = "Visual", Type = "Device".
2. Click "Reset All".
3. Observe the filter panel.
**Expected Results**:
- All dropdowns revert to "All"; Availability unchecked.
**Postconditions**: No filters active; catalog shows all products.

---

### TC_SCRUM74_015 — Global Search Bar Filters Devices/Vendors/Resources
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog has products with known names.
**Test Steps**:
1. Type "wheelchair" in the search bar.
2. Press Enter.
3. Observe the results.
4. Clear the search bar and press Enter.
5. Observe the results.
**Expected Results**:
- Step 3: Results filter to matching items.
- Step 5: Full catalog is restored.
**Postconditions**: Search cleared; full catalog visible.

---

### TC_SCRUM74_016 — No Results State When Filters Yield No Matches
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog exists with known data.
**Test Steps**:
1. Select "Speech" from Disability Type.
2. Set Min Rating slider to max.
3. Click "Apply Filter".
4. Observe the catalog area.
**Expected Results**:
- A "0 devices found" or "no results" message is displayed.
**Postconditions**: Empty state is shown; filters remain active.

---

### Feature: Pagination

---

### TC_SCRUM74_017 — Pagination Appears When Products Exceed Per-Page Limit
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog has more than 6 products.
**Test Steps**:
1. Navigate to the catalog landing page with no filters.
2. Observe the pagination component below the product list.
**Expected Results**:
- Pagination controls (Previous, page numbers, Next) are visible.
**Postconditions**: Pagination is active.

---

### TC_SCRUM74_018 — Pagination Navigation Works Correctly
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog has more than 6 products; user is on page 1.
**Test Steps**:
1. Click "Next".
2. Observe pagination is still visible.
3. Click "Previous".
4. Observe pagination is still visible.
5. Click page 3.
6. Observe pagination is still visible.
**Expected Results**:
- Pagination navigates correctly between pages; controls remain visible.
**Postconditions**: Pagination navigates correctly.

---

### TC_SCRUM74_019 — Filter Panel Collapses on Mobile Screens
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: Browser viewport set to mobile width (375px).
**Test Steps**:
1. Set viewport to mobile (375x667).
2. Navigate to the catalog page.
3. Observe the filter panel state.
4. Verify a "Collapse filters" toggle button is visible.
**Expected Results**:
- Filter panel has a collapse toggle on mobile.
**Postconditions**: Mobile filter interaction works correctly.

---

### TC_SCRUM74_020 — Device Count Text is Visible After Filter Change
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Verify device count text is visible on page load.
2. Select "Device" from Type and apply.
3. Verify device count text is still visible.
**Expected Results**:
- Device count text remains visible before and after filter change.
**Postconditions**: Device count is always visible.

---

### TC_SCRUM74_021 — Pagination Responsive on Mobile Viewport
**Priority**: Medium
**Related Jira Issue**: SCRUM-74
**Preconditions**: Viewport set to mobile width (375px).
**Test Steps**:
1. Set viewport to mobile (375x667).
2. Navigate to the catalog page.
3. Verify pagination and Next button are visible.
4. Verify Next button has reasonable height.
**Expected Results**:
- Pagination is visible on mobile; Next button is tappable.
**Postconditions**: Pagination is usable on mobile.

---

### TC_SCRUM74_022 — Pagination Error Handling on Load Failure
**Priority**: Medium
**Related Jira Issue**: SCRUM-74
**Preconditions**: Network can be blocked via dev tools.
**Test Steps**:
1. Block pagination API requests.
2. Click "Next".
3. Unblock requests and navigate to catalog.
4. Verify page recovers.
**Expected Results**:
- Page recovers after network failure; device count is visible.
**Postconditions**: Error is handled gracefully.

---

### Feature: Additional Coverage

---

### TC_SCRUM74_023 — Sort Dropdown Contains Correct Options and Defaults to Latest
**Priority**: Low
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Locate the "Sort by" dropdown.
2. Verify it is visible.
3. Verify it contains more than one option.
**Expected Results**:
- Sort dropdown is visible with multiple options.
**Postconditions**: No sort applied.

---

### TC_SCRUM74_024 — Product Cards Display Required Information
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog has products displayed.
**Test Steps**:
1. Observe the product cards in the catalog grid.
2. Verify at least one product card has a heading.
3. Verify at least one "View details" link is present.
**Expected Results**:
- Product card has a heading.
- "View details" link is visible.
**Postconditions**: Catalog page displays product cards correctly.

---

### TC_SCRUM74_025 — Search With Non-Existent Term Shows Zero or No Results
**Priority**: Low
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type "xyznonexistentdevice99999" in the search bar.
2. Press Enter and click "Apply Filters".
3. Observe the catalog results.
**Expected Results**:
- Device count shows "0" or a "no results" message is displayed.
**Postconditions**: No results state is shown.

---

### TC_SCRUM74_026 — Filters Persist After Pagination Navigation
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: Catalog has enough filtered results to span multiple pages.
**Test Steps**:
1. Select "Device" from Type and apply.
2. Click "Next" to navigate to page 2.
3. Verify Type dropdown still shows "Device".
**Expected Results**:
- Type dropdown retains "Device" after pagination.
**Postconditions**: Filters are preserved across pagination.

---

### Feature: Edge Cases & Robustness

---

### TC_SCRUM74_027 — Rapid Filter Switching Returns Correct Results
**Priority**: Medium
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Rapidly switch Disability Type from "Visual" to "Speech" to "Amputation".
2. Click "Apply Filters".
3. Verify the final selected value is "Amputation".
4. Verify device count is visible.
**Expected Results**:
- Dropdown shows "Amputation"; device count reflects the final filter.
**Postconditions**: Final filter is applied correctly.

---

### TC_SCRUM74_028 — Filter Dropdowns are Keyboard Navigable
**Priority**: Medium
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Focus the Disability Type dropdown.
2. Use ArrowDown keys to navigate options.
3. Press Enter to select.
4. Verify the selected value changed from "All".
**Expected Results**:
- Dropdown can be operated via keyboard; selected value changes.
**Postconditions**: Filter changed via keyboard.

---

### TC_SCRUM74_029 — Filters Persist After Browser Back/Forward
**Priority**: Medium
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Select "Device" from Type and apply.
2. Navigate to page 2 via pagination.
3. Click browser Back button.
4. Verify Type dropdown still shows "Device".
**Expected Results**:
- Type dropdown retains "Device" after navigating back.
**Postconditions**: Filters persist across browser navigation.

---

### TC_SCRUM74_030 — Device Count Text Format Validation
**Priority**: Low
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the device count text on page load.
2. Verify it matches the expected format.
**Expected Results**:
- Device count text matches pattern: "<number> device(s) found".
**Postconditions**: Format is correct.

---

### TC_SCRUM74_031 — Reset All Restores Device Count to Initial
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Note the initial device count.
2. Apply a filter (Type = "Device").
3. Click "Reset All".
4. Verify device count matches the initial count.
**Expected Results**:
- Device count is restored to the initial value after reset.
**Postconditions**: Full catalog restored.

---

### TC_SCRUM74_032 — No Horizontal Overflow on Mobile with Filters Applied
**Priority**: Low
**Related Jira Issue**: SCRUM-74
**Preconditions**: Viewport set to mobile (375px).
**Test Steps**:
1. Set viewport to mobile (375x667).
2. Navigate to catalog and apply a filter.
3. Check the page body scroll width.
**Expected Results**:
- Page body scroll width does not exceed viewport width.
**Postconditions**: No layout overflow.

---

### TC_SCRUM74_033 — Price Range Filter Reduces Device Count
**Priority**: High
**Related Jira Issue**: SCRUM-74
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Note the initial device count.
2. Select a specific price range (e.g., "Under ₹20,000").
3. Click "Apply Filters".
4. Compare the filtered count to the initial count.
**Expected Results**:
- Filtered device count is less than or equal to the initial count.
**Postconditions**: Price range filter is active.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| PwD user account                 | Not required — catalog is publicly accessible            |
| Catalog with >6 products         | At least 7 products across multiple disability types     |
| Products with varied ratings     | Products with ratings 1–5 stars                          |
| Products with varied prices      | Products spanning all price range brackets               |
| Products with varied availability| Mix of available and unavailable products                |
| Known device name for search     | e.g., "wheelchair", "hearing aid"                        |
| Filter combination with 0 results| Specific filter combo known to return no products        |
| Mobile viewport                  | 375x667                                                  |
| Desktop viewport                 | 1280x720                                                 |

---

## 5. Assumptions & Dependencies

- The catalog landing page is publicly accessible at `https://qa-atad.swarajability.org/catalog/` — no login required.
- Filter options (Disability Type, Sub Category, Type, Price Range) are populated from the backend.
- "Apply Filters" button is required to trigger filtering; filters do not auto-apply on selection.
- Figma design is the source of truth for visual layout and filter panel structure.
- Pagination uses full page navigation (not AJAX) with URL params like `?e-page-xxx=2`.
- On mobile viewport, the catalog link is inside a hamburger menu (three-line icon).
- Dropdowns are native `<select>` elements (combobox role), not custom button-based dropdowns.
- The "Type" dropdown requires exact label matching to avoid ambiguity with "Disability Type".
- **Known Issue**: TC_SCRUM74_018 (Pagination Navigation) intermittently fails due to full page navigation losing DOM context after "Previous" click — this is a site behavior issue, not a test defect.
- **Dependency**: SCRUM-75 (search functionality) and SCRUM-76 (sort functionality) are tested separately.

---

## 6. Open Questions / Clarifications Needed

1. **Auto-apply vs. manual apply**: AC states "Selecting a filter automatically refreshes the results (no page reload)" but also mentions an "Apply Filter" CTA. Clarify: does the catalog update on each filter selection, or only after clicking "Apply Filter"?
2. **Min Rating slider**: What is the scale (1–5 stars, 1–10)? What is the default/minimum position?
3. **Availability checkbox**: What does "availability" mean — in-stock only, or also includes pre-order/coming soon?
4. **Search bar scope**: Does the global search bar search within the current filtered results, or does it reset all filters and search the full catalog?
5. **Pagination + filters**: When filters are applied and results span multiple pages, does navigating to page 2 maintain the active filters?
6. **"Reset All" vs. "Clear All"**: The story mentions both "Reset All" (in AC) and "Clear All" (in Accessibility section). Confirm the correct label.
7. **Mobile filter toggle**: Is there a specific button/icon to expand/collapse the filter panel on mobile, or does it auto-collapse?
