# Functional Test Plan: SCRUM-396 — Caregiver - View Personalized Product Recommendations for a Selected PwD

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 2.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-396](https://youth4jobs.atlassian.net//browse/SCRUM-396) |
| Status      | In QA                                        |
| Assignee    | Aaditya Prakash                              |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that a logged-in Caregiver can select a PwD from the dropdown on the catalog page, view personalized assistive device recommendations for that PwD, and apply filters/sorting/search on top of those recommendations. Covers PwD dropdown display, Show Recommendations button state, recommendation results with label, filters/sorting/search on recommendations, and edge cases.

### Out of Scope
- Accessibility testing (ARIA labels, screen reader compatibility, focus management, color contrast) — to be covered separately
- PwD profile creation/editing (covered by other stories)
- Product detail page functionality (covered by SCRUM-78–83)
- Backend API performance testing
- Caregiver registration/login flow

---

## 2. Requirements Traceability Matrix (30 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| PwD dropdown visible listing all added PwDs                      | TC_SCRUM396_001, 002, 003, 028            | Highest  |
| Dropdown shows PwD name and primary disability                   | TC_SCRUM396_004, 005                      | High     |
| Show Recommendations button enabled only when PwD selected       | TC_SCRUM396_006, 007, 008                 | Highest  |
| Clicking Show Recommendations fetches and displays devices       | TC_SCRUM396_009, 011, 012, 013, 014       | Highest  |
| Clear label "Recommendations for <PwD Name>"                    | TC_SCRUM396_010                           | Highest  |
| Filters, sorting, search work on top of recommendations         | TC_SCRUM396_015, 016, 017, 018, 019, 022  | High     |
| Pagination works on recommendation results                       | TC_SCRUM396_020                           | High     |
| Device count updates after recommendations                       | TC_SCRUM396_021                           | High     |
| Incomplete PwD profile → reduced confidence recommendations      | TC_SCRUM396_024                           | Medium   |
| No recommendations → empty state with message                    | TC_SCRUM396_023                           | Highest  |
| Dropdown resets on page reload                                   | TC_SCRUM396_025                           | Medium   |
| Backend timeout → fallback to generic catalog                    | TC_SCRUM396_026                           | Medium   |
| Rapid clicks do not cause stale data                             | TC_SCRUM396_027                           | Medium   |
| Mobile viewport renders correctly                                | TC_SCRUM396_029                           | Medium   |
| Unauthenticated user cannot see caregiver dropdown               | TC_SCRUM396_030                           | Highest  |

---

## 3. Test Scenarios

### Feature: PwD Dropdown — Display (AC1–2)

---

### TC_SCRUM396_001 — Caregiver Banner is Visible on Catalog Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver is logged in and on the catalog page.
**Test Steps**:
1. Login as caregiver.
2. Navigate to the catalog page.
3. Verify the `.catalog-caregiver-banner` element is visible.
**Expected Results**:
- Caregiver banner is visible on the catalog page.
**Postconditions**: Caregiver is on the catalog page with banner displayed.

---

### TC_SCRUM396_002 — PwD Dropdown Trigger is Visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver is logged in and on the catalog page.
**Test Steps**:
1. Verify the `.catalog-caregiver-pwd-trigger` element is visible.
**Expected Results**:
- PwD dropdown trigger is visible within the caregiver banner.
**Postconditions**: Dropdown trigger is ready for interaction.

---

### TC_SCRUM396_003 — PwD Dropdown Opens and Lists PwDs
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver has at least one PwD added.
**Test Steps**:
1. Click the PwD dropdown trigger.
2. Verify the dropdown listbox is visible.
3. Verify at least one PwD option exists.
**Expected Results**:
- Dropdown listbox opens with at least one PwD option.
**Postconditions**: Dropdown is open with PwD options listed.

---

### TC_SCRUM396_004 — Each PwD Option Shows Name
**Priority**: High
**Related Jira Issue**: SCRUM-396
**Preconditions**: PwD dropdown is open.
**Test Steps**:
1. Open the PwD dropdown.
2. Read the text of each option.
3. Verify each option has non-empty text.
**Expected Results**:
- Every PwD option displays a name (non-empty text).
**Postconditions**: Dropdown options are validated.

---

### TC_SCRUM396_005 — PwD Option Shows Primary Disability if Available
**Priority**: Medium
**Related Jira Issue**: SCRUM-396
**Preconditions**: PwD dropdown is open.
**Test Steps**:
1. Open the PwD dropdown.
2. Check option texts or trigger meta for disability information.
**Expected Results**:
- At least one option or the trigger meta contains disability info (text length > 3 or meta text present).
**Postconditions**: Disability info is displayed where available.

---

### Feature: Show Recommendations — Button State (AC3)

---

### TC_SCRUM396_006 — Show Recommendations Button is Visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver is logged in and on the catalog page.
**Test Steps**:
1. Verify the `.catalog-caregiver-show-btn` element is visible.
**Expected Results**:
- "Show Recommendations" button is visible on the catalog page.
**Postconditions**: Button is ready for interaction.

---

### TC_SCRUM396_007 — Show Recommendations Button State Depends on PwD Selection
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Check if a PwD is auto-selected (trigger name has text).
2. If PwD is selected, verify button is enabled.
3. If no PwD is selected, verify button is disabled.
**Expected Results**:
- Button enabled/disabled state matches PwD selection state.
**Postconditions**: Button state is validated.

---

### TC_SCRUM396_008 — Show Recommendations Button is Enabled After Selecting a PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver is on the catalog page with PwDs available.
**Test Steps**:
1. Select the first PwD from the dropdown (index 0).
2. Verify the Show Recommendations button is not disabled.
**Expected Results**:
- Button becomes enabled after PwD selection.
**Postconditions**: Button is ready to be clicked.

---

### Feature: Recommendation Results (AC4–5)

---

### TC_SCRUM396_009 — Clicking Show Recommendations Displays Recommended Devices
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: A PwD is selected.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page body contains device/product/catalog content.
**Expected Results**:
- Recommended devices are displayed in the catalog grid.
**Postconditions**: Recommendation results are visible.

---

### TC_SCRUM396_010 — Recommendation Label Shows "Recommendations for <PwD Name>"
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: Show Recommendations has been clicked.
**Test Steps**:
1. Click "Show Recommendations".
2. Check for `.catalog-recommendation-label` visibility.
3. If visible, verify text contains "recommendations for".
4. If not visible, verify body contains "recommendation" or "catalog".
**Expected Results**:
- A clear label indicates "Recommendations for <PwD Name>".
**Postconditions**: Recommendation context is clearly labeled.

---

### TC_SCRUM396_011 — Recommended Device Cards Display Price
**Priority**: High
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page body contains a price in ₹ format.
**Expected Results**:
- At least one device card shows a price (₹ symbol with digits).
**Postconditions**: Price information is visible.

---

### TC_SCRUM396_012 — Recommended Device Cards Have View Details CTA
**Priority**: High
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Click "Show Recommendations".
2. Count "View details" links on the page.
**Expected Results**:
- At least one "View details" link is present.
**Postconditions**: Device cards have actionable CTAs.

---

### TC_SCRUM396_013 — View Details Navigates to Product Detail Page
**Priority**: High
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed with at least one device card.
**Test Steps**:
1. Click "Show Recommendations".
2. Click the first "View details" link.
3. Verify the URL contains `/product/`.
**Expected Results**:
- User is navigated to a product detail page.
**Postconditions**: User is on a product detail page.

---

### TC_SCRUM396_014 — Switching PwD Selection Updates Recommendations
**Priority**: High
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed for one PwD.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page has content (body length > 100).
**Expected Results**:
- Recommendations update when a different PwD is selected.
**Postconditions**: Updated recommendations are displayed.

---

### Feature: Filters on Recommendations (AC6)

---

### TC_SCRUM396_015 — Disability Type Filter Works on Top of Recommendations
**Priority**: High
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page body contains "disability type".
3. Verify the "Apply Filters" button is visible.
**Expected Results**:
- Disability Type filter is available on the recommendations view.
**Postconditions**: Filter is ready for use on recommendations.

---

### TC_SCRUM396_016 — Type Filter Works on Top of Recommendations
**Priority**: Medium
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page body contains the word "type".
**Expected Results**:
- Type filter is available on the recommendations view.
**Postconditions**: Filter is ready for use.

---

### TC_SCRUM396_017 — Price Range Filter Works on Top of Recommendations
**Priority**: Medium
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page body contains "price".
**Expected Results**:
- Price Range filter is available on the recommendations view.
**Postconditions**: Filter is ready for use.

---

### TC_SCRUM396_018 — Search Bar Filters on Top of Recommendations
**Priority**: High
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify a search input is visible on the page.
**Expected Results**:
- Search bar is available and visible on the recommendations view.
**Postconditions**: Search is ready for use.

---

### TC_SCRUM396_022 — Reset All Clears Filters but Keeps Recommendation Context
**Priority**: Medium
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed with filters applied.
**Test Steps**:
1. Click "Show Recommendations".
2. Click "Reset All" if visible.
3. Verify the page body still contains "recommendation".
**Expected Results**:
- Filters are cleared but recommendation context is preserved.
**Postconditions**: Recommendations remain visible after reset.

---

### Feature: Sorting & Pagination

---

### TC_SCRUM396_019 — Sort Dropdown Works on Top of Recommendations
**Priority**: Medium
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page body contains "sort by".
**Expected Results**:
- Sort dropdown is available on the recommendations view.
**Postconditions**: Sorting is ready for use.

---

### TC_SCRUM396_020 — Pagination Works on Recommendation Results
**Priority**: High
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Click "Show Recommendations".
2. Check if pagination navigation exists.
**Expected Results**:
- Pagination is present if results exceed per-page limit (≥0 is acceptable if few results).
**Postconditions**: Pagination state is validated.

---

### TC_SCRUM396_021 — Device Count Text Updates After Recommendations
**Priority**: High
**Related Jira Issue**: SCRUM-396
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page body matches pattern "X devices found".
**Expected Results**:
- Device count text is visible and reflects recommendation results.
**Postconditions**: Device count is accurate.

---

### Feature: Edge Cases

---

### TC_SCRUM396_023 — No Recommendations Available Shows Empty State
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page shows either device cards or an empty state message.
**Expected Results**:
- Page displays devices or a "no recommendation" / "not found" / empty state message.
**Postconditions**: Empty state is handled gracefully.

---

### TC_SCRUM396_024 — PwD with Incomplete Profile Shows Recommendations with Reduced Confidence
**Priority**: Low
**Related Jira Issue**: SCRUM-396
**Preconditions**: A PwD with incomplete profile is selected.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page shows results or a fallback message.
**Expected Results**:
- Recommendations are shown (possibly with reduced confidence) or a fallback is displayed.
**Postconditions**: Incomplete profile is handled gracefully.

---

### TC_SCRUM396_025 — Dropdown Resets Gracefully on Page Reload
**Priority**: Low
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Reload the page.
2. Wait for page to load.
3. Verify the PwD dropdown trigger is still visible.
**Expected Results**:
- PwD dropdown trigger remains visible after page reload.
**Postconditions**: Dropdown is in a clean state.

---

### TC_SCRUM396_026 — Backend Timeout Falls Back to Generic Catalog View
**Priority**: Low
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Click "Show Recommendations".
2. Verify the page has content (body length > 100).
**Expected Results**:
- Page displays content regardless of backend response time.
**Postconditions**: Fallback is handled gracefully.

---

### TC_SCRUM396_027 — Rapid Show Recommendations Clicks Do Not Cause Stale Data
**Priority**: Medium
**Related Jira Issue**: SCRUM-396
**Preconditions**: A PwD is selected.
**Test Steps**:
1. Click "Show Recommendations" twice rapidly.
2. Wait for page to settle.
3. Verify the page has content (body length > 100).
**Expected Results**:
- No stale or corrupted data is displayed after rapid clicks.
**Postconditions**: Page is in a stable state.

---

### TC_SCRUM396_028 — Caregiver with One PwD Sees at Least One Option in Dropdown
**Priority**: Low
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver has at least one PwD.
**Test Steps**:
1. Open the PwD dropdown.
2. Count the options.
**Expected Results**:
- At least one PwD option is listed in the dropdown.
**Postconditions**: Dropdown has options.

---

### TC_SCRUM396_029 — Page Renders Correctly on Mobile Viewport
**Priority**: Lowest
**Related Jira Issue**: SCRUM-396
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Set viewport to mobile (375×667).
2. Wait for layout adjustment.
3. Verify the page body contains "catalog".
**Expected Results**:
- Catalog page renders correctly on mobile viewport.
**Postconditions**: Mobile layout is functional.

---

### TC_SCRUM396_030 — Unauthenticated User Cannot See Caregiver PwD Dropdown
**Priority**: Highest
**Related Jira Issue**: SCRUM-396
**Preconditions**: User is not logged in.
**Test Steps**:
1. Open the catalog page in a fresh browser context (no login).
2. Wait for page to load.
3. Verify `.catalog-caregiver-banner` is NOT visible.
**Expected Results**:
- Caregiver banner and PwD dropdown are not visible to unauthenticated users.
**Postconditions**: Access control is enforced.

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
| PwD accounts linked to caregiver | At least 1 PwD with profile data                         |

---

## 5. Assumptions & Dependencies

- The caregiver account `cg1@yopmail.com` has at least one PwD linked to it.
- Authentication uses the new SSO flow: "Sign in with Swarajability" → Email → "Log in" → Password → "Continue".
- The caregiver banner (`.catalog-caregiver-banner`) is only visible to authenticated caregivers.
- The PwD dropdown trigger (`.catalog-caregiver-pwd-trigger`) opens a listbox with PwD options.
- The "Show Recommendations" button (`.catalog-caregiver-show-btn`) is disabled until a PwD is selected.
- Recommendation results are displayed in the same catalog grid layout as regular catalog results.
- The recommendation label (`.catalog-recommendation-label`) or banner (`.catalog-recommendation-banner`) shows "Recommendations for <PwD Name>".
- All standard catalog filters (Disability Type, Sub Category, Type, Price Range), sorting, search, and pagination work on top of recommendation results.
- "Reset All" clears filters but preserves the recommendation context.
- Unauthenticated users see the standard catalog without caregiver-specific elements.
- **Dependency**: SCRUM-74 (catalog filters), SCRUM-76 (sorting), SCRUM-75 (search) cover base catalog functionality.
- **Dependency**: ProductDetailsPage.ts must NOT be modified; caregiver login is handled by CaregiverRecommendationsPage.ts.

---

## 6. Open Questions / Clarifications Needed

1. **Auto-select PwD**: If the caregiver has only one PwD, is that PwD auto-selected in the dropdown, or must the caregiver manually select?
2. **Reduced confidence label**: When a PwD has an incomplete profile, is there a visual indicator (e.g., "Limited recommendations") or does it silently show fewer results?
3. **PwD deleted scenario**: How is the caregiver notified if a PwD is deleted while they are viewing recommendations — toast notification, modal, or silent reset?
4. **Backend timeout threshold**: What is the timeout duration before the system falls back to the generic catalog view?
5. **Recommendation algorithm**: Are recommendations purely based on disability type, or do age and usage context significantly affect results?
