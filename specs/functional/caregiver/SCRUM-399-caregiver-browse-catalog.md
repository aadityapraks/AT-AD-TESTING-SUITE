# Functional Test Plan: SCRUM-399 — Caregiver - Browse and Search Product Catalog Without Selecting a PwD

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-399](https://youth4jobs.atlassian.net//browse/SCRUM-399) |
| Status      | In QA                                        |
| Assignee    | Aaditya Prakash                              |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that a logged-in Caregiver can browse and search the assistive device catalog without selecting a PwD from the dropdown. Covers catalog access, full catalog display with device count, search/filter/sort functionality, recommendation section remaining inactive, absence of personalization labels, and edge cases (manual filter, PwD selection transition, zero results).

### Out of Scope
- Accessibility testing (ARIA labels, screen reader compatibility, focus management, color contrast) — to be covered separately
- PwD selection and recommendation flow (covered by SCRUM-396)
- Product detail page functionality (covered by SCRUM-78–83)
- Backend API performance testing

---

## 2. Requirements Traceability Matrix (26 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Caregiver can access catalog without selecting a PwD             | TC_SCRUM399_001, 002, 003                 | Highest  |
| Search bar is fully functional                                   | TC_SCRUM399_004, 005, 006                 | High     |
| Filters are fully functional                                     | TC_SCRUM399_007, 008, 009, 010            | High     |
| Sorting is fully functional                                      | TC_SCRUM399_011, 012                      | High     |
| System displays full catalog results                             | TC_SCRUM399_013, 014                      | Highest  |
| "X devices found" count is displayed                             | TC_SCRUM399_015                           | Highest  |
| Recommendation section remains inactive or informational         | TC_SCRUM399_016, 017                      | Highest  |
| No personalization labels are shown                              | TC_SCRUM399_018                           | Highest  |
| Later PwD selection prompts to refresh as recommendations        | TC_SCRUM399_019, 020                      | High     |
| Zero results after filtering shows empty state with reset        | TC_SCRUM399_021, 022                      | Medium   |
| Pagination works without PwD selection                           | TC_SCRUM399_023                           | Low      |
| Mobile viewport renders correctly                                | TC_SCRUM399_024                           | Lowest   |
| Reset All restores full catalog                                  | TC_SCRUM399_025                           | Low      |
| Product cards display required information                       | TC_SCRUM399_026                           | Low      |

---

## 3. Test Scenarios

### Feature: Catalog Access Without PwD Selection (AC1)

---

### TC_SCRUM399_001 — Caregiver Can Access Catalog Page Without Selecting a PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Login as caregiver.
2. Navigate to the catalog page.
3. Verify the catalog page loads with the H1 heading "Assistive Device Catalog".
**Expected Results**:
- Catalog page loads successfully without requiring PwD selection.
**Postconditions**: Caregiver is on the catalog page.

---

### TC_SCRUM399_002 — Caregiver Banner is Visible on Catalog Without PwD Selection
**Priority**: Highest
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is logged in and on the catalog page.
**Test Steps**:
1. Verify the `.catalog-caregiver-banner` element is visible.
**Expected Results**:
- Caregiver banner is visible on the catalog page.
**Postconditions**: Banner is displayed.

---

### TC_SCRUM399_003 — PwD Dropdown Shows No PwD Selected by Default
**Priority**: Highest
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page, no PwD selected.
**Test Steps**:
1. Verify the PwD dropdown trigger is visible.
2. Check if the trigger name text indicates no specific PwD is actively selected or shows a default/first PwD.
**Expected Results**:
- PwD dropdown trigger is visible and accessible.
**Postconditions**: Dropdown is in default state.

---

### Feature: Search Bar Functionality (AC2)

---

### TC_SCRUM399_004 — Search Bar is Visible and Enabled
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page without PwD selection.
**Test Steps**:
1. Verify the search bar ("Search devices") is visible and enabled.
**Expected Results**:
- Search bar is visible and ready for input.
**Postconditions**: Search bar is functional.

---

### TC_SCRUM399_005 — Search Returns Matching Results
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Type "wheelchair" in the search bar.
2. Press Enter.
3. Click "Apply Filters".
4. Verify device count is visible.
**Expected Results**:
- Results filter to matching items; device count is visible.
**Postconditions**: Search results are displayed.

---

### TC_SCRUM399_006 — Search Clear Restores Full Catalog
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Search is active with results.
**Test Steps**:
1. Clear the search bar.
2. Press Enter.
3. Click "Apply Filters".
4. Verify device count matches initial full catalog count.
**Expected Results**:
- Full catalog is restored after clearing search.
**Postconditions**: Full catalog is displayed.

---

### Feature: Filter Functionality (AC2)

---

### TC_SCRUM399_007 — All Filter Dropdowns are Visible
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Verify Disability Type, Sub Category, Type, Price Range dropdowns are visible.
2. Verify Apply Filters and Reset All buttons are visible.
**Expected Results**:
- All filter controls are rendered and visible.
**Postconditions**: Filter panel is fully displayed.

---

### TC_SCRUM399_008 — Type Filter Works
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Select "Device" from Type dropdown.
2. Click "Apply Filters".
3. Verify device count is visible.
**Expected Results**:
- Device count updates to reflect filtered results.
**Postconditions**: Filter is active.

---

### TC_SCRUM399_009 — Price Range Filter Works
**Priority**: Medium
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Note the initial device count.
2. Select a specific price range.
3. Click "Apply Filters".
4. Verify device count is ≤ initial count.
**Expected Results**:
- Filtered device count is less than or equal to the initial count.
**Postconditions**: Price filter is active.

---

### TC_SCRUM399_010 — Multiple Filters Applied Simultaneously
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Select "Visual" from Disability Type.
2. Select "Device" from Type.
3. Click "Apply Filters".
4. Verify device count is visible.
**Expected Results**:
- Device count reflects combined filter results.
**Postconditions**: Two filters are active simultaneously.

---

### Feature: Sorting Functionality (AC2)

---

### TC_SCRUM399_011 — Sort Dropdown is Visible with Options
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Verify the "Sort by" dropdown is visible.
2. Verify it contains multiple sorting options.
**Expected Results**:
- Sort dropdown is visible with multiple options.
**Postconditions**: Sorting is ready for use.

---

### TC_SCRUM399_012 — Sorting Changes Product Order
**Priority**: Medium
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Note the first product heading.
2. Select "Name: A to Z" from Sort by.
3. Wait for results to update.
4. Note the first product heading again.
**Expected Results**:
- Product order changes after sorting (or remains same if already sorted).
**Postconditions**: Sort is applied.

---

### Feature: Full Catalog Display (AC3)

---

### TC_SCRUM399_013 — Full Catalog Results are Displayed
**Priority**: Highest
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page, no filters applied.
**Test Steps**:
1. Verify at least one product card is visible.
2. Verify at least one "View details" link is present.
**Expected Results**:
- Product cards are rendered with detail links.
**Postconditions**: Catalog displays products.

---

### TC_SCRUM399_014 — Product Cards Have Headings
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Catalog has products displayed.
**Test Steps**:
1. Verify at least one product card has an H3 heading.
**Expected Results**:
- Product cards have headings.
**Postconditions**: Product cards are properly structured.

---

### TC_SCRUM399_015 — "X Devices Found" Count is Displayed
**Priority**: Highest
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Verify the device count text matching "X devices found" is visible.
2. Verify the count is greater than 0.
**Expected Results**:
- Device count text is visible with a positive number.
**Postconditions**: Device count is accurate.

---

### Feature: Recommendation Section Inactive (AC4)

---

### TC_SCRUM399_016 — Show Recommendations Button is Not Active Without PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page, no PwD explicitly selected.
**Test Steps**:
1. Check the Show Recommendations button state.
2. If a PwD is auto-selected, button may be enabled (acceptable).
3. If no PwD is selected, button should be disabled.
**Expected Results**:
- Button state correctly reflects PwD selection state.
**Postconditions**: Recommendation section is not actively triggered.

---

### TC_SCRUM399_017 — Recommendation Banner is Not Visible Without Clicking Show
**Priority**: Highest
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page, Show Recommendations not clicked.
**Test Steps**:
1. Verify the `.catalog-recommendation-banner` is NOT visible (or has aria-hidden="true").
**Expected Results**:
- Recommendation banner is hidden when not actively triggered.
**Postconditions**: No recommendation context is active.

---

### Feature: No Personalization Labels (AC5)

---

### TC_SCRUM399_018 — No Personalized Badge is Visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page without recommendations.
**Test Steps**:
1. Verify `.catalog-recommendation-badge` is NOT visible.
**Expected Results**:
- No personalized badge is displayed.
**Postconditions**: Catalog is in generic mode.

---

### Feature: Edge Cases

---

### TC_SCRUM399_019 — Selecting PwD After Browsing Shows Show Recommendations Button Enabled
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is browsing catalog without PwD selection.
**Test Steps**:
1. Select a PwD from the dropdown (index 0).
2. Verify the Show Recommendations button is enabled.
**Expected Results**:
- Button becomes enabled after PwD selection.
**Postconditions**: System is ready to show recommendations.

---

### TC_SCRUM399_020 — Selecting PwD and Clicking Show Recommendations Transitions to Recommendation View
**Priority**: High
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver selected a PwD.
**Test Steps**:
1. Select a PwD from the dropdown.
2. Click "Show Recommendations".
3. Verify the page has device/product/catalog content.
**Expected Results**:
- System transitions from generic catalog to recommendation view.
**Postconditions**: Recommendation results are displayed.

---

### TC_SCRUM399_021 — Zero Results After Filtering Shows Empty State
**Priority**: Medium
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Type "xyznonexistentdevice99999" in the search bar.
2. Press Enter and click "Apply Filters".
3. Verify device count shows "0" or a "no results" message.
**Expected Results**:
- Empty state is shown with zero results.
**Postconditions**: Empty state is displayed.

---

### TC_SCRUM399_022 — Reset All Available After Zero Results
**Priority**: Medium
**Related Jira Issue**: SCRUM-399
**Preconditions**: Zero results are displayed after filtering.
**Test Steps**:
1. Apply a filter that yields zero results.
2. Verify "Reset All" button is visible.
3. Click "Reset All".
4. Verify device count is restored to initial value.
**Expected Results**:
- Reset All is available and restores full catalog.
**Postconditions**: Full catalog is restored.

---

### TC_SCRUM399_023 — Pagination Works Without PwD Selection
**Priority**: Low
**Related Jira Issue**: SCRUM-399
**Preconditions**: Catalog has more than one page of results.
**Test Steps**:
1. Verify pagination navigation is visible.
2. Click "Next >".
3. Verify pagination is still visible on page 2.
**Expected Results**:
- Pagination navigates correctly without PwD selection.
**Postconditions**: User is on page 2.

---

### TC_SCRUM399_024 — Mobile Viewport Renders Correctly
**Priority**: Lowest
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Set viewport to mobile (375×667).
2. Verify the page body contains "catalog".
**Expected Results**:
- Catalog page renders correctly on mobile viewport.
**Postconditions**: Mobile layout is functional.

---

### TC_SCRUM399_025 — Reset All Restores Full Catalog
**Priority**: Low
**Related Jira Issue**: SCRUM-399
**Preconditions**: Caregiver has filters applied.
**Test Steps**:
1. Note the initial device count.
2. Apply a filter (Type = "Device").
3. Click "Reset All".
4. Verify device count matches the initial count.
**Expected Results**:
- Device count is restored to the initial value after reset.
**Postconditions**: Full catalog restored.

---

### TC_SCRUM399_026 — Product Cards Display Price and View Details
**Priority**: Low
**Related Jira Issue**: SCRUM-399
**Preconditions**: Catalog has products displayed.
**Test Steps**:
1. Verify the page body contains a price in ₹ format.
2. Verify at least one "View details" link is present.
**Expected Results**:
- Product cards show price and have actionable CTAs.
**Postconditions**: Product cards are properly displayed.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Caregiver email                  | `cg1@yopmail.com`                                        |
| Caregiver password               | `cg1@141G`                                               |
| Base URL                         | `https://qa-atad.swarajability.org/`                     |
| Catalog URL                      | `https://qa-atad.swarajability.org/catalog/`             |
| Login required                   | Yes — caregiver must be authenticated                    |
| Desktop viewport                 | 1280×720                                                 |
| Mobile viewport                  | 375×667                                                  |
| Non-existent search term         | `xyznonexistentdevice99999`                              |

---

## 5. Assumptions & Dependencies

- The caregiver account `cg1@yopmail.com` has at least one PwD linked to it.
- Authentication uses the new SSO flow: "Sign In/Register" → popup → "Sign In with SwarajAbility" → Email → "Log in" → Password → "Continue" → Consent "Continue" → redirect.
- The caregiver banner (`.catalog-caregiver-banner`) is visible to authenticated caregivers.
- Without clicking "Show Recommendations", the catalog displays the full generic catalog.
- No "Recommendations for <PwD Name>" label or `.catalog-recommendation-badge` should appear in generic browsing mode.
- All standard catalog filters, sorting, search, and pagination work identically to the PwD catalog experience.
- **Dependency**: SCRUM-396 covers the PwD selection and recommendation flow; SCRUM-399 covers the generic browsing mode.
- **Dependency**: CaregiverRecommendationsPage.ts is reused as the page object (contains all needed locators and login method).
