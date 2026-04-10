# Functional Test Plan: SCRUM-402 — Caregiver - Switch Between Generic Search and PwD-Specific Recommendations

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-402](https://youth4jobs.atlassian.net//browse/SCRUM-402) |
| Status      | In QA                                        |
| Assignee    | Aaditya Prakash                              |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that a logged-in Caregiver can seamlessly switch between generic product search/browsing and PwD-specific personalized recommendations. Covers: selecting a PwD after generic browsing triggers a prompt/transition, confirming shows personalized results, clearing PwD selection returns to generic catalog, UI clearly indicates current mode ("Generic Catalog" vs "Recommendations for <PwD>"), and edge cases (filter conflicts on mode switch, mid-session PwD change, cached results).

### Out of Scope
- Accessibility testing (ARIA labels, screen reader compatibility, focus management, color contrast) — to be covered separately
- PwD profile creation/editing (covered by other stories)
- Product detail page functionality (covered by SCRUM-78–83)
- Backend API performance testing
- Caregiver registration/login flow
- Generic browsing without PwD (covered by SCRUM-399)
- Initial PwD recommendation view (covered by SCRUM-396)

---

## 2. Requirements Traceability Matrix (33 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Selecting PwD after generic browsing prompts/transitions to recommendations | TC_SCRUM402_001, 002, 003, 004           | Highest  |
| On confirmation, catalog refreshes with personalized results     | TC_SCRUM402_005, 006, 007, 008, 009      | Highest  |
| Caregiver can clear PwD selection to return to generic browsing  | TC_SCRUM402_010, 011, 012, 013, 014      | Highest  |
| UI clearly indicates current mode                                | TC_SCRUM402_015, 016, 017, 018           | Highest  |
| Filters applied before PwD selection handled on mode switch      | TC_SCRUM402_019, 020, 021                | High     |
| PwD selection changed mid-session refreshes recommendations      | TC_SCRUM402_022, 023, 024                | High     |
| Cached results mismatch / force refresh                          | TC_SCRUM402_025, 026                     | Medium   |
| Mobile viewport renders mode switch correctly                    | TC_SCRUM402_027                          | Medium   |
| Rapid mode switching does not cause stale data                   | TC_SCRUM402_028                          | Medium   |
| Full round-trip mode switching works repeatedly                  | TC_SCRUM402_029                          | High     |
| Search/sort/pagination functional across mode switches           | TC_SCRUM402_030, 031, 032               | High     |
| Filters in recommendation mode cleared by Reset All              | TC_SCRUM402_033                          | High     |

---

## 3. Test Scenarios

### Feature: Select PwD After Generic Browsing — Prompt/Transition (AC1)

---

### TC_SCRUM402_001 — Caregiver Starts in Generic Catalog Mode
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is logged in and on the catalog page, no PwD explicitly selected for recommendations.
**Test Steps**:
1. Login as caregiver.
2. Navigate to the catalog page.
3. Verify the catalog page loads (URL contains `/catalog`).
4. Verify device count text is visible.
**Expected Results**:
- Catalog page loads in generic browsing mode with device count visible.
**Postconditions**: Caregiver is on the catalog page in generic mode.

---

### TC_SCRUM402_002 — PwD Dropdown is Available for Selection During Generic Browsing
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is on the catalog page in generic mode.
**Test Steps**:
1. Verify the PwD dropdown trigger (`.catalog-caregiver-pwd-trigger`) is visible.
2. Click the trigger to open the dropdown.
3. Verify at least one PwD option is listed.
**Expected Results**:
- PwD dropdown is accessible and lists available PwDs during generic browsing.
**Postconditions**: Dropdown is open with PwD options.

---

### TC_SCRUM402_003 — Selecting a PwD From Dropdown Updates Trigger Text
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is on the catalog page, PwD dropdown is open.
**Test Steps**:
1. Open the PwD dropdown.
2. Note the first PwD option text.
3. Click the first PwD option.
4. Verify the trigger name text updates to reflect the selected PwD.
**Expected Results**:
- PwD trigger name updates to show the selected PwD's name.
**Postconditions**: A PwD is selected in the dropdown.

---

### TC_SCRUM402_004 — Show Recommendations Button Becomes Enabled After PwD Selection
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Select a PwD from the dropdown (index 0).
2. Verify the Show Recommendations button is enabled (not disabled).
**Expected Results**:
- Show Recommendations button transitions from disabled to enabled after PwD selection.
**Postconditions**: Button is ready to be clicked.

---

### Feature: Confirmation Shows Personalized Results (AC2)

---

### TC_SCRUM402_005 — Clicking Show Recommendations Transitions to Personalized View
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: A PwD is selected from the dropdown.
**Test Steps**:
1. Select a PwD from the dropdown.
2. Click "Show Recommendations".
3. Wait for catalog to refresh.
4. Verify the page has device/product/catalog content.
**Expected Results**:
- Catalog refreshes and displays personalized recommendation results.
**Postconditions**: Caregiver is viewing personalized recommendations.

---

### TC_SCRUM402_006 — Personalized View Shows Device Cards
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Show Recommendations has been clicked.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Verify at least one product card is visible OR an empty state is shown.
**Expected Results**:
- Product cards are displayed or an appropriate empty state message is shown.
**Postconditions**: Recommendation results are visible.

---

### TC_SCRUM402_007 — Personalized View Shows Price on Device Cards
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Recommendations are displayed with device cards.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Verify the page body contains a price in ₹ format.
**Expected Results**:
- At least one device card shows a price (₹ symbol with digits).
**Postconditions**: Price information is visible in recommendation view.

---

### TC_SCRUM402_008 — Personalized View Shows View Details Links
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Recommendations are displayed.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Count "View details" links on the page.
**Expected Results**:
- At least one "View details" link is present.
**Postconditions**: Device cards have actionable CTAs.

---

### TC_SCRUM402_009 — Device Count Updates After Showing Recommendations
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Note the initial device count in generic mode.
2. Select a PwD and click "Show Recommendations".
3. Check if device count text is visible (may differ from generic count).
**Expected Results**:
- Device count text is present after switching to recommendation view.
**Postconditions**: Device count reflects recommendation results.

---

### Feature: Clear PwD Selection Returns to Generic Browsing (AC3)

---

### TC_SCRUM402_010 — Caregiver Can Return to Generic Mode After Viewing Recommendations
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is viewing personalized recommendations.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Click "Reset All" to clear filters/recommendation context.
3. Verify the catalog returns to showing the full generic catalog (device count visible).
**Expected Results**:
- Catalog returns to generic browsing mode after reset.
**Postconditions**: Caregiver is back in generic catalog mode.

---

### TC_SCRUM402_011 — Generic Mode After Reset Shows Full Device Count
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver has returned to generic mode after recommendations.
**Test Steps**:
1. Note the initial device count before any PwD selection.
2. Select a PwD, click "Show Recommendations".
3. Click "Reset All".
4. Wait for catalog to refresh.
5. Verify device count is restored to the initial value.
**Expected Results**:
- Device count matches the original full catalog count.
**Postconditions**: Full catalog is restored.

---

### TC_SCRUM402_012 — Recommendation Banner Disappears After Returning to Generic Mode
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver was viewing recommendations and returned to generic mode.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Click "Reset All".
3. Wait for catalog to refresh.
4. Verify `.catalog-recommendation-banner` is NOT visible.
**Expected Results**:
- Recommendation banner is hidden after returning to generic mode.
**Postconditions**: No recommendation context is active.

---

### TC_SCRUM402_013 — No Personalization Labels After Returning to Generic Mode
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver returned to generic mode.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Click "Reset All".
3. Wait for catalog to refresh.
4. Verify `.catalog-recommendation-badge` is NOT visible.
**Expected Results**:
- No personalized badge is displayed after returning to generic mode.
**Postconditions**: Catalog is in generic mode.

---

### TC_SCRUM402_014 — Product Cards Still Visible After Returning to Generic Mode
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver returned to generic mode.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Click "Reset All".
3. Wait for catalog to refresh.
4. Verify at least one product card is visible.
5. Verify at least one "View details" link is present.
**Expected Results**:
- Product cards are displayed in generic mode after returning from recommendations.
**Postconditions**: Full catalog is browsable.

---

### Feature: UI Clearly Indicates Current Mode (AC4)

---

### TC_SCRUM402_015 — Generic Mode Does Not Show Recommendation Label
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is on the catalog page in generic mode (no Show Recommendations clicked).
**Test Steps**:
1. Verify `.catalog-recommendation-banner` is NOT visible (or has aria-hidden="true").
2. Verify `.catalog-recommendation-badge` is NOT visible.
**Expected Results**:
- No recommendation-specific UI elements are visible in generic mode.
**Postconditions**: UI correctly indicates generic mode.

---

### TC_SCRUM402_016 — Caregiver Banner is Visible in Both Modes
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Verify `.catalog-caregiver-banner` is visible in generic mode.
2. Select a PwD and click "Show Recommendations".
3. Verify `.catalog-caregiver-banner` is still visible in recommendation mode.
**Expected Results**:
- Caregiver banner remains visible regardless of mode.
**Postconditions**: Banner is persistent across modes.

---

### TC_SCRUM402_017 — PwD Trigger Name Reflects Selected PwD in Recommendation Mode
**Priority**: Highest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver has selected a PwD and clicked Show Recommendations.
**Test Steps**:
1. Select a PwD from the dropdown.
2. Read the PwD trigger name text.
3. Click "Show Recommendations".
4. Verify the PwD trigger name still shows the selected PwD's name.
**Expected Results**:
- PwD trigger name accurately reflects the selected PwD in recommendation mode.
**Postconditions**: UI clearly shows which PwD's recommendations are being viewed.

---

### TC_SCRUM402_018 — Mode Indicator Changes When Switching Between Generic and Recommendations
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Verify recommendation banner is NOT visible (generic mode).
2. Select a PwD and click "Show Recommendations".
3. Verify the page body contains "recommendation" or "catalog" content.
4. Click "Reset All".
5. Verify recommendation banner is NOT visible again (back to generic).
**Expected Results**:
- UI mode indicator changes appropriately when switching between generic and recommendation modes.
**Postconditions**: Mode transitions are clearly reflected in the UI.

---

### Feature: Edge Case — Filters Before PwD Selection (EC1)

---

### TC_SCRUM402_019 — Filters Applied Before PwD Selection Are Preserved or Reset on Mode Switch
**Priority**: Medium
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is on the catalog page in generic mode.
**Test Steps**:
1. Select "Device" from Type filter.
2. Click "Apply Filters".
3. Wait for results to update.
4. Select a PwD from the dropdown.
5. Click "Show Recommendations".
6. Verify the page has content (body length > 100).
**Expected Results**:
- System handles the mode switch gracefully — either preserves compatible filters or resets them.
**Postconditions**: Catalog is in recommendation mode.

---

### TC_SCRUM402_020 — Search Term Applied Before PwD Selection Handled on Mode Switch
**Priority**: Medium
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver has an active search in generic mode.
**Test Steps**:
1. Type "wheelchair" in the search bar and press Enter.
2. Click "Apply Filters".
3. Wait for results.
4. Select a PwD from the dropdown.
5. Click "Show Recommendations".
6. Verify the page has content.
**Expected Results**:
- System handles search term gracefully on mode switch — either preserves or clears it.
**Postconditions**: Recommendation view is displayed.

---

### TC_SCRUM402_021 — Price Range Filter Before PwD Selection Handled on Mode Switch
**Priority**: Medium
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver has a price range filter active in generic mode.
**Test Steps**:
1. Select a price range from the dropdown (index 1).
2. Click "Apply Filters".
3. Wait for results.
4. Select a PwD from the dropdown.
5. Click "Show Recommendations".
6. Verify the page has content.
**Expected Results**:
- System handles price filter gracefully on mode switch.
**Postconditions**: Recommendation view is displayed.

---

### Feature: Edge Case — PwD Changed Mid-Session (EC2)

---

### TC_SCRUM402_022 — Changing PwD Mid-Session Updates Trigger Name
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is viewing recommendations for one PwD.
**Test Steps**:
1. Select PwD at index 0 and click "Show Recommendations".
2. Read the PwD trigger name.
3. Open the PwD dropdown again.
4. If more than one PwD exists, select PwD at index 1.
5. Verify the trigger name text changed (or remains if only one PwD).
**Expected Results**:
- PwD trigger name updates to reflect the newly selected PwD.
**Postconditions**: New PwD is selected.

---

### TC_SCRUM402_023 — Changing PwD and Clicking Show Recommendations Refreshes Results
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is viewing recommendations for one PwD.
**Test Steps**:
1. Select PwD at index 0 and click "Show Recommendations".
2. Verify page has content.
3. Select a different PwD (index 1 if available, else index 0).
4. Click "Show Recommendations" again.
5. Verify page has content.
**Expected Results**:
- Recommendations refresh for the newly selected PwD.
**Postconditions**: Updated recommendations are displayed.

---

### TC_SCRUM402_024 — Show Recommendations Button Remains Enabled After PwD Switch
**Priority**: Medium
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver has switched PwD selection.
**Test Steps**:
1. Select PwD at index 0.
2. Verify Show Recommendations button is enabled.
3. Select a different PwD (index 1 if available).
4. Verify Show Recommendations button is still enabled.
**Expected Results**:
- Button remains enabled after switching PwD selection.
**Postconditions**: Button is ready for use.

---

### Feature: Edge Case — Cached Results / Force Refresh (EC3)

---

### TC_SCRUM402_025 — Page Reload After Recommendations Returns to Clean State
**Priority**: Low
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is viewing recommendations.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Reload the page.
3. Wait for page to load.
4. Verify the PwD dropdown trigger is visible.
5. Verify the catalog has content (device count or product cards).
**Expected Results**:
- Page reload returns to a clean state with no stale recommendation data.
**Postconditions**: Catalog is in a fresh state.

---

### TC_SCRUM402_026 — Navigating Away and Back Resets Recommendation Context
**Priority**: Low
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is viewing recommendations.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Navigate to the homepage.
3. Navigate back to the catalog page.
4. Verify the catalog loads with device count visible.
5. Verify `.catalog-recommendation-banner` is NOT visible.
**Expected Results**:
- Navigating away and back resets the recommendation context.
**Postconditions**: Catalog is in generic mode.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM402_027 — Mobile Viewport Renders Mode Switch Correctly
**Priority**: Lowest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Set viewport to mobile (375×667).
2. Verify the page body contains "catalog".
3. Verify the PwD dropdown trigger is visible.
**Expected Results**:
- Mode switch UI elements render correctly on mobile viewport.
**Postconditions**: Mobile layout is functional.

---

### TC_SCRUM402_028 — Rapid Mode Switching Does Not Cause Stale Data
**Priority**: Low
**Related Jira Issue**: SCRUM-402
**Preconditions**: A PwD is selected.
**Test Steps**:
1. Click "Show Recommendations".
2. Immediately click "Reset All".
3. Wait for page to settle.
4. Verify the page has content (body length > 100).
**Expected Results**:
- No stale or corrupted data is displayed after rapid mode switching.
**Postconditions**: Page is in a stable state.

---

### Feature: Additional Mode Switch Scenarios

---

### TC_SCRUM402_029 — Full Round-Trip Generic → Recommendations → Generic → Recommendations
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Note the initial device count in generic mode.
2. Select a PwD and click "Show Recommendations".
3. Verify page has content.
4. Click "Reset All" to return to generic mode.
5. Verify device count matches initial count.
6. Select a PwD and click "Show Recommendations" again.
7. Verify page has content.
**Expected Results**:
- Repeated mode switching works correctly with no data corruption or count mismatch.
**Postconditions**: Caregiver is in recommendation mode after full round-trip.

---

### TC_SCRUM402_030 — Search Bar Remains Functional in Recommendation Mode
**Priority**: High
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is viewing recommendations.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Verify the search bar is visible and enabled.
3. Type "wheelchair" in the search bar.
4. Click "Apply Filters".
5. Verify the page has content.
**Expected Results**:
- Search bar is functional within recommendation mode.
**Postconditions**: Search results are displayed within recommendation context.

---

### TC_SCRUM402_031 — Sorting Works After Switching to Recommendation Mode
**Priority**: Medium
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is viewing recommendations.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Verify the sort dropdown is visible.
3. Select "Name: A to Z".
4. Wait for results to update.
5. Verify at least one product heading exists.
**Expected Results**:
- Sorting is functional within recommendation mode.
**Postconditions**: Products are sorted within recommendation context.

---

### TC_SCRUM402_032 — Pagination Persists After Mode Switch Back to Generic
**Priority**: Low
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver has switched from recommendations back to generic mode.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Click "Reset All" to return to generic mode.
3. Verify pagination navigation is visible.
4. Click "Next >".
5. Verify pagination is still visible on page 2.
**Expected Results**:
- Pagination works correctly after returning to generic mode from recommendations.
**Postconditions**: User is on page 2 of generic catalog.

---

### TC_SCRUM402_033 — Filter Applied in Recommendation Mode Cleared by Reset All
**Priority**: Lowest
**Related Jira Issue**: SCRUM-402
**Preconditions**: Caregiver is viewing recommendations with a filter applied.
**Test Steps**:
1. Select a PwD and click "Show Recommendations".
2. Select "Device" from Type filter.
3. Click "Apply Filters".
4. Click "Reset All".
5. Verify device count is greater than 0.
6. Verify no personalized badge is visible.
**Expected Results**:
- Reset All clears both the filter and the recommendation context.
**Postconditions**: Full generic catalog is restored.

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
- Authentication uses the new SSO flow: "Sign In/Register" → popup → "Sign In with SwarajAbility" → Email → "Log in" → Password → "Continue" → Consent "Continue" → redirect.
- The caregiver banner (`.catalog-caregiver-banner`) is visible to authenticated caregivers in both modes.
- The PwD dropdown trigger (`.catalog-caregiver-pwd-trigger`) is accessible in both generic and recommendation modes.
- The "Show Recommendations" button (`.catalog-caregiver-show-btn`) is disabled until a PwD is selected.
- "Reset All" clears filters and returns to generic catalog mode.
- The recommendation banner (`.catalog-recommendation-banner`) is only visible when recommendations are actively displayed.
- No "Recommendations for <PwD Name>" label or `.catalog-recommendation-badge` should appear in generic browsing mode.
- **Known Bug**: `.catalog-recommendation-banner` has class `atad-pwd-only` and `aria-hidden="true"`, making it invisible to caregivers (SCRUM-396 TC_031 confirmed bug).
- **Dependency**: SCRUM-396 covers initial PwD recommendation view; SCRUM-399 covers generic browsing; SCRUM-402 covers switching between the two modes.
- **Dependency**: CaregiverRecommendationsPage.ts is reused as the page object.

---

## 6. Open Questions / Clarifications Needed

1. **Prompt on PwD selection**: Does the system show an explicit prompt ("Show recommendations for this PwD?") or does the caregiver need to manually click "Show Recommendations" after selecting a PwD?
2. **Filter preservation**: When switching from generic to recommendation mode, are previously applied filters preserved, reset, or selectively reapplied?
3. **Clear PwD mechanism**: Is there an explicit "Clear PwD" / "Back to Generic" button, or does "Reset All" serve this purpose?
4. **Mode indicator text**: Does the UI show explicit "Generic Catalog" text, or is the absence of recommendation labels the indicator?
5. **Auto-refresh on PwD change**: When changing PwD mid-session, do recommendations auto-refresh or does the caregiver need to click "Show Recommendations" again?
