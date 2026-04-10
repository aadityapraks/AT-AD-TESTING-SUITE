# Functional Test Plan: SCRUM-75 — PwD Search for Products within the Catalog

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 2.0                                          |
| Date        | 2025-07-17                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-75](https://youth4jobs.atlassian.net//browse/SCRUM-75) |
| Status      | In QA                                        |
| Assignee    | Kamilath Rifka Sameem Ali                    |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1&p=f&t=DSuDYKTS0kIUwmPN-0) |

### Scope & Objectives
Validate that a PwD user can search for specific products, vendors, or assistive technology resources within the catalog using the search bar — including autocomplete suggestions, result count updates, no-results messaging, and pagination of search results. This plan covers functional testing only — accessibility testing is out of scope.

### Out of Scope
- Accessibility testing (WCAG 2.1 AA) — to be covered separately
- Product detail page functionality
- Filter panel interactions (covered by SCRUM-74)
- Backend API performance testing

---

## 2. Requirements Traceability Matrix

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Search bar supports product name search                          | TC_SCRUM75_001                            | Highest  |
| Search bar supports keyword search                               | TC_SCRUM75_002                            | Highest  |
| Search bar supports vendor name search                           | TC_SCRUM75_003                            | Highest  |
| Search suggestions appear after min 3 characters                 | TC_SCRUM75_004, TC_SCRUM75_005            | Highest  |
| Multiple suggestions appear for common terms                     | TC_SCRUM75_006                            | High     |
| Pressing Enter triggers search and filters results               | TC_SCRUM75_007                            | Highest  |
| Selecting a suggestion filters results                           | TC_SCRUM75_008                            | High     |
| Search results show total count                                  | TC_SCRUM75_009                            | Highest  |
| Search results display product cards                             | TC_SCRUM75_010                            | High     |
| Search filters results — count decreases                         | TC_SCRUM75_011                            | High     |
| No results displays message                                      | TC_SCRUM75_012                            | High     |
| No results hides pagination                                      | TC_SCRUM75_013                            | High     |
| Pagination available for >6 search results                       | TC_SCRUM75_014                            | High     |
| Clearing search restores full catalog                            | TC_SCRUM75_015                            | High     |
| Search combined with filters works correctly                     | TC_SCRUM75_016                            | High     |
| Reset All clears search term                                     | TC_SCRUM75_017                            | High     |
| Search term persists in bar after results load                   | TC_SCRUM75_018                            | High     |
| Search persists after pagination navigation                      | TC_SCRUM75_019                            | High     |
| Search does not trigger full page reload                         | TC_SCRUM75_020                            | High     |
| Search bar placeholder text is visible                           | TC_SCRUM75_021                            | Medium   |
| Suggestions dropdown closes on Escape key                        | TC_SCRUM75_022                            | High     |
| Suggestions dropdown closes on outside click                     | TC_SCRUM75_023                            | Medium   |
| Partial product name search returns results                      | TC_SCRUM75_024                            | High     |
| Search is case-insensitive                                       | TC_SCRUM75_025                            | High     |
| Search with leading/trailing whitespace is trimmed               | TC_SCRUM75_026                            | Medium   |
| Search with special characters does not break the page           | TC_SCRUM75_027                            | High     |
| Search results update device count to zero then back             | TC_SCRUM75_028                            | Medium   |
| Rapid sequential searches return correct final results           | TC_SCRUM75_029                            | High     |
| Empty search submission shows full catalog                       | TC_SCRUM75_030                            | Medium   |
| Search with only whitespace is treated as empty                  | TC_SCRUM75_031                            | Medium   |
| Search bar is focusable on mobile viewport                       | TC_SCRUM75_032                            | High     |
| Long search term does not overflow or break layout               | TC_SCRUM75_033                            | Medium   |

---

## 3. Test Scenarios

### Feature: Search — Core Functionality

---

### TC_SCRUM75_001 — Product Name Search Returns Matching Results
**Priority**: Highest
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type a known product name (e.g., "wheelchair") in the search bar.
2. Click "Apply Filter".
3. Observe the catalog results.
**Test Data**: Search term: "wheelchair"
**Expected Results**:
- Step 3: Results display products matching "wheelchair"; device count updates.
**Postconditions**: Search results are displayed.

---

### TC_SCRUM75_002 — Keyword Search Returns Matching Results
**Priority**: Highest
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Note the full catalog device count.
2. Type a keyword (e.g., "mobility") in the search bar.
3. Click "Apply Filter".
4. Observe the device count.
**Test Data**: Search term: "mobility"
**Expected Results**:
- Step 4: Keyword search returns results — count is > 0 and <= full catalog.
**Postconditions**: Keyword search results displayed.

---

### TC_SCRUM75_003 — Vendor Name Search Returns Matching Results
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Note the full catalog device count.
2. Search by vendor name.
3. Observe the device count.
**Test Data**: Search term: "vendor23"
**Expected Results**:
- Step 3: Vendor search returns filtered results — count is less than full catalog but > 0.
**Postconditions**: Vendor search results displayed.

---

### TC_SCRUM75_004 — Search Suggestions Appear After Typing 3+ Characters
**Priority**: Highest
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type 2 characters (e.g., "wh") — observe if suggestions appear.
2. Type a 3rd character (e.g., "whe") — observe if suggestions appear.
**Test Data**: Partial terms: "wh" (2 chars), "whe" (3 chars)
**Expected Results**:
- Step 1: No suggestions dropdown appears.
- Step 2: Suggestions dropdown appears with matching suggestions.
**Postconditions**: Suggestions are visible.

---

### TC_SCRUM75_005 — No Suggestions for Fewer Than 3 Characters
**Priority**: Low
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type 1 character (e.g., "w") — observe.
2. Type a 2nd character (e.g., "wh") — observe.
**Test Data**: Partial terms: "w" (1 char), "wh" (2 chars)
**Expected Results**:
- Steps 1 & 2: No suggestions dropdown appears.
**Postconditions**: No suggestions visible.

---

### TC_SCRUM75_006 — Multiple Suggestions Appear for Common Term
**Priority**: Medium
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type 3+ characters of a common term (e.g., "whe").
2. Observe the suggestions dropdown.
**Test Data**: Partial term: "whe"
**Expected Results**:
- Step 2: Suggestions dropdown shows one or more matching suggestions.
**Postconditions**: Suggestions visible.

---

### TC_SCRUM75_007 — Pressing Enter Triggers Search and Filters Results
**Priority**: Highest
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type a search term (e.g., "hearing").
2. Press Enter (not the Apply button).
3. Observe the catalog results and device count.
**Test Data**: Search term: "hearing"
**Expected Results**:
- Step 3: Results are filtered; device count changes from full catalog.
**Postconditions**: Search results displayed via Enter key.

---

### TC_SCRUM75_008 — Selecting a Suggestion Filters Results
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page; suggestions are visible.
**Test Steps**:
1. Type at least 3 characters to trigger suggestions (e.g., "whe").
2. Click on a suggestion from the dropdown.
3. Observe the catalog results.
**Test Data**: Partial term: "whe"
**Expected Results**:
- Step 2: Selected suggestion populates the search bar.
- Step 3: Results filter accordingly; device count updates.
**Postconditions**: Search results reflect the selected suggestion.

---

### TC_SCRUM75_009 — Search Results Show Total Device Count
**Priority**: Highest
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Search for a term that returns results (e.g., "wheelchair").
2. Observe the device count text.
**Test Data**: Search term: "wheelchair"
**Expected Results**:
- Step 2: Device count text is visible and contains a number (e.g., "3 devices found").
**Postconditions**: Count reflects search results.

---

### TC_SCRUM75_010 — Search Results Display Product Cards
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Search for a known product name (e.g., "wheelchair").
2. Observe the product grid.
**Test Data**: Search term: "wheelchair"
**Expected Results**:
- Step 2: Product cards are visible in the grid with product name headings (h3).
**Postconditions**: Product cards displayed.

---

### TC_SCRUM75_011 — Search Filters Results — Count Decreases from Full Catalog
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Note the full catalog device count.
2. Search for a specific term (e.g., "wheelchair").
3. Compare the searched count with the full catalog count.
**Test Data**: Search term: "wheelchair"
**Expected Results**:
- Step 3: Searched count is > 0 and < full catalog count.
**Postconditions**: Filtered results displayed.

---

### TC_SCRUM75_012 — No Results Displays Appropriate Message
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type a non-existent search term (e.g., "xyznonexistent99999").
2. Click "Apply Filter".
3. Observe the catalog area.
**Test Data**: Search term: "xyznonexistent99999"
**Expected Results**:
- Step 3: A "no results" message is displayed (e.g., "No matching devices found. Try adjusting filters or search terms.").
**Postconditions**: Empty state shown.

---

### TC_SCRUM75_013 — No Results Hides Pagination
**Priority**: Medium
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Search for a non-existent term (e.g., "xyznonexistent99999").
2. Observe the pagination area.
**Test Data**: Search term: "xyznonexistent99999"
**Expected Results**:
- Step 2: Pagination is hidden or not visible when there are no results.
**Postconditions**: No pagination shown.

---

### TC_SCRUM75_014 — Pagination Available When Search Results Exceed Per-Page Limit
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: Catalog has more products than the per-page limit.
**Test Steps**:
1. Verify pagination controls are visible on the full catalog.
2. Click "Next" or page 2.
3. Observe the results on page 2.
**Expected Results**:
- Step 1: Pagination controls visible.
- Step 3: Next page loads with results.
**Postconditions**: Pagination works.

---

### Feature: Search — Interactions & Persistence

---

### TC_SCRUM75_015 — Clearing Search Restores Full Catalog
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User has an active search with filtered results.
**Test Steps**:
1. Note the full catalog device count.
2. Search for a term and apply.
3. Clear the search bar and apply.
4. Compare the restored count with the initial count.
**Test Data**: Search term: "wheelchair"
**Expected Results**:
- Step 4: Full catalog restored; device count matches initial.
**Postconditions**: No search active.

---

### TC_SCRUM75_016 — Search Combined with Filters Works Correctly
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type a search term (e.g., "wheelchair").
2. Select a disability type filter (e.g., "Amputation").
3. Click "Apply Filter".
4. Observe the catalog results.
5. Click "Reset All".
6. Observe the catalog results.
**Test Data**: Search term: "wheelchair", Disability Type: "Amputation"
**Expected Results**:
- Step 4: Results match both search term AND filter.
- Step 6: All filters and search cleared; full catalog restored.
**Postconditions**: No filters or search active.

---

### TC_SCRUM75_017 — Reset All Clears Search Term
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User has an active search.
**Test Steps**:
1. Search for a term (e.g., "wheelchair") and apply.
2. Verify search bar contains the term.
3. Click "Reset All".
4. Observe the search bar value.
**Test Data**: Search term: "wheelchair"
**Expected Results**:
- Step 4: Search bar is cleared after Reset All.
**Postconditions**: Search bar empty.

---

### TC_SCRUM75_018 — Search Term Persists in Search Bar After Results Load
**Priority**: Medium
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type "hearing" in the search bar.
2. Click "Apply Filter".
3. Wait for results to load.
4. Observe the search bar value.
**Test Data**: Search term: "hearing"
**Expected Results**:
- Step 4: The search bar still contains "hearing" after results load.
**Postconditions**: Search term visible in bar.

---

### TC_SCRUM75_019 — Search Persists After Pagination Navigation
**Priority**: Medium
**Related Jira Issue**: SCRUM-75
**Preconditions**: Catalog has pagination.
**Test Steps**:
1. Note the device count.
2. Click "Next" in pagination.
3. Observe the device count.
**Expected Results**:
- Step 3: Device count remains consistent across pagination.
**Postconditions**: Search persists.

---

### TC_SCRUM75_020 — Search Does Not Trigger Full Page Reload
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Listen for page load events.
2. Type a search term and click "Apply Filter".
3. Check if a full page reload occurred.
**Test Data**: Search term: "wheelchair"
**Expected Results**:
- Step 3: No full page reload; results update dynamically.
**Postconditions**: Search applied without reload.

---

### TC_SCRUM75_021 — Search Bar Placeholder Text is Visible
**Priority**: Lowest
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Observe the search bar before typing.
2. Check for placeholder text.
**Expected Results**:
- Step 2: Search bar has visible placeholder text describing its purpose.
**Postconditions**: Placeholder visible.

---

### Feature: Search — Suggestions UX

---

### TC_SCRUM75_022 — Suggestions Dropdown Closes on Escape Key
**Priority**: Medium
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page; suggestions are visible.
**Test Steps**:
1. Type at least 3 characters (e.g., "whe").
2. Wait for suggestions dropdown to appear.
3. Press the Escape key.
4. Observe the suggestions dropdown.
**Test Data**: Partial term: "whe"
**Expected Results**:
- Step 4: Suggestions dropdown closes; search bar retains the typed text.
**Postconditions**: Dropdown dismissed.

---

### TC_SCRUM75_023 — Suggestions Dropdown Closes on Outside Click
**Priority**: Low
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page; suggestions are visible.
**Test Steps**:
1. Type at least 3 characters (e.g., "whe").
2. Wait for suggestions dropdown to appear.
3. Click anywhere outside the search bar and suggestions.
4. Observe the suggestions dropdown.
**Test Data**: Partial term: "whe"
**Expected Results**:
- Step 4: Suggestions dropdown closes; search bar retains the typed text.
**Postconditions**: Dropdown dismissed.

---

### TC_SCRUM75_024 — Partial Product Name Search Returns Results
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type a partial product name (e.g., "whe" — 3 chars).
2. Click "Apply Filter".
3. Observe the results.
**Test Data**: Partial term: "whe"
**Expected Results**:
- Step 3: Results are returned for the partial search term; count > 0.
**Postconditions**: Partial search results displayed.

---

### Feature: Search — Edge Cases & Robustness

---

### TC_SCRUM75_025 — Search is Case-Insensitive
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type "WHEELCHAIR" (all uppercase) and apply.
2. Note the device count.
3. Clear and type "wheelchair" (all lowercase) and apply.
4. Compare the device count.
**Test Data**: Search terms: "WHEELCHAIR", "wheelchair"
**Expected Results**:
- Step 4: Both searches return the same results and device count.
**Postconditions**: Search results displayed.

---

### TC_SCRUM75_026 — Search with Leading/Trailing Whitespace is Trimmed
**Priority**: Medium
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Search "wheelchair" (clean) — note count.
2. Search "  wheelchair  " (padded) — compare count.
**Test Data**: Search terms: "wheelchair", "  wheelchair  "
**Expected Results**:
- Step 2: Same results — whitespace is trimmed.
**Postconditions**: Search results displayed.

---

### TC_SCRUM75_027 — Search with Special Characters Does Not Break the Page
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type `<script>alert('x')</script>` and apply.
2. Observe the page.
3. Clear and type `'; DROP TABLE --` and apply.
4. Observe the page.
**Test Data**: Special strings: XSS script, SQL injection
**Expected Results**:
- Steps 2 & 4: Page does not break, no script execution, no error.
**Postconditions**: Page remains functional.

---

### TC_SCRUM75_028 — Search Results Update Device Count to Zero Then Back
**Priority**: Medium
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Search for a non-existent term — observe 0 count.
2. Clear and search for a valid term — observe positive count.
**Test Data**: Search terms: "xyznonexistent99999", "wheelchair"
**Expected Results**:
- Step 2: Device count transitions from 0 to a positive number.
**Postconditions**: Count correctly updates.

---

### TC_SCRUM75_029 — Rapid Sequential Searches Return Correct Final Results
**Priority**: Medium
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type "wheelchair" and click "Apply Filter".
2. Immediately type "hearing" and click "Apply Filter" again.
3. Wait for results to load.
4. Observe the search bar and results.
**Test Data**: Search terms: "wheelchair" then "hearing"
**Expected Results**:
- Step 4: Results reflect "hearing" — no stale results from "wheelchair".
**Postconditions**: Correct results for last search.

---

### TC_SCRUM75_030 — Empty Search Submission Shows Full Catalog
**Priority**: Lowest
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Ensure the search bar is empty.
2. Click "Apply Filter".
3. Observe the catalog results.
**Expected Results**:
- Step 3: Full catalog displayed; device count shows total.
**Postconditions**: Full catalog visible.

---

### TC_SCRUM75_031 — Search with Only Whitespace is Treated as Empty
**Priority**: Medium
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type only spaces (e.g., "   ") in the search bar.
2. Click "Apply Filter".
3. Observe the catalog results.
**Test Data**: Search term: "   " (spaces only)
**Expected Results**:
- Step 3: Full catalog displayed — whitespace-only input treated as empty.
**Postconditions**: Full catalog visible.

---

### TC_SCRUM75_032 — Search Bar is Focusable on Mobile Viewport
**Priority**: High
**Related Jira Issue**: SCRUM-75
**Preconditions**: Browser viewport set to mobile width (375px).
**Test Steps**:
1. Open the catalog on a mobile viewport.
2. Click the search bar.
3. Type a search term and submit.
4. Observe the results.
**Test Data**: Viewport: 375x667, Search term: "wheelchair"
**Expected Results**:
- Step 2: Search bar receives focus.
- Step 4: Results display correctly on mobile.
**Postconditions**: Search works on mobile.

---

### TC_SCRUM75_033 — Long Search Term Does Not Overflow or Break Layout
**Priority**: Lowest
**Related Jira Issue**: SCRUM-75
**Preconditions**: User is on the catalog landing page.
**Test Steps**:
1. Type a very long string (200+ characters) in the search bar.
2. Observe the search bar layout.
3. Click "Apply Filter".
4. Observe the page layout.
**Test Data**: 200+ character string
**Expected Results**:
- Step 2: Search bar handles long text gracefully.
- Step 4: Page layout remains intact.
**Postconditions**: Page not broken.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Known product name               | "wheelchair"                                             |
| Known keyword                    | "mobility"                                               |
| Known vendor name                | "vendor23"                                               |
| Partial term for suggestions     | "whe" (3 chars), "wh" (2 chars), "w" (1 char)           |
| Enter trigger term               | "hearing"                                                |
| Non-existent search term         | "xyznonexistent99999"                                    |
| Uppercase search term            | "WHEELCHAIR"                                             |
| Whitespace-padded term           | "  wheelchair  "                                         |
| Special characters               | `<script>alert('x')</script>`, `'; DROP TABLE --`        |
| Whitespace-only input            | "   " (spaces only)                                      |
| Long string (200+ chars)         | Stress test for input overflow                           |
| Mobile viewport                  | 375x667                                                  |

---

## 5. Assumptions & Dependencies

- The catalog landing page is publicly accessible at `https://qa-atad.swarajability.org/catalog/` — no login required.
- The search bar is located within the filter panel on the catalog page.
- Search suggestions appear only after a minimum of 3 characters are typed.
- Pressing Enter or clicking "Apply Filter" triggers the search.
- Search results update dynamically without full page reload (SPA behavior).
- Pagination follows the same behavior as SCRUM-74.
- Pagination is client-side — URL stays at `/catalog/`.
- On mobile viewport (375px), the navbar Catalog link is hidden behind a hamburger menu.
- **Dependency**: SCRUM-74 (catalog filters and pagination).

---

## 6. Open Questions / Clarifications Needed

1. **Suggestion trigger**: Do suggestions appear as-you-type after 3 characters, or only after a debounce delay?
2. **Suggestion source**: Do suggestions come from product names only, or also vendor names and resource titles?
3. **Search scope**: Does the search bar search within currently filtered results, or reset filters?
4. **Search + filters interaction**: Combined (AND logic) or does filter override search?
5. **Clear search behavior**: Is there a dedicated "clear" (X) button, or must the user manually delete?
6. **Max suggestions**: How many suggestions are shown in the dropdown at most?
