# Functional Test Plan: SCRUM-414 — Caregiver - Prompt PwD Selection During Wishlist Action

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-414](https://youth4jobs.atlassian.net//browse/SCRUM-414) |
| Status      | In QA                                        |
| Assignee    | prathamesh v                                 |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that the system prompts a caregiver to select a PwD when adding a product to the wishlist. Covers: "Add to Wishlist" triggers PwD selection modal/dropdown (AC1), single PwD selection only (AC2), "Confirm Add" disabled until PwD selected (AC3), success toast on confirmation (AC4). Edge cases: cancel selection, switch PwD mid-flow, incomplete PwD profile still selectable.

### Out of Scope
- Wishlist management (view/remove items) — separate story
- PwD profile creation/editing flow
- Backend API performance testing
- Accessibility testing (screen reader, keyboard-only)

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Product detail page accessible, wishlist button exists           | TC_SCRUM414_001, 002, 003                 | Highest  |
| Clicking Add to Wishlist without PwD → modal/dropdown (AC1)      | TC_SCRUM414_004, 005                      | Highest  |
| Modal/dropdown lists available PwDs (AC1)                        | TC_SCRUM414_006                           | Highest  |
| Caregiver must select one PwD only (AC2)                         | TC_SCRUM414_007                           | Highest  |
| Confirm Add button disabled until PwD selected (AC3)             | TC_SCRUM414_008, 009                      | Highest  |
| On confirmation → product added, success toast (AC4)             | TC_SCRUM414_010, 011                      | Highest  |
| Cancel PwD selection → no wishlist entry (EC1)                   | TC_SCRUM414_012, 013                      | High     |
| Switch PwD mid-flow → final selection respected (EC4)            | TC_SCRUM414_014                           | High     |
| Incomplete PwD profile still selectable (EC3)                    | TC_SCRUM414_015                           | Medium   |
| Page refresh retains wishlist state                              | TC_SCRUM414_016                           | Medium   |
| Mobile viewport renders wishlist flow correctly                  | TC_SCRUM414_017                           | Low      |
| Multiple products have consistent wishlist behavior              | TC_SCRUM414_018                           | Low      |
| Wishlist button state changes after adding                       | TC_SCRUM414_019                           | Lowest   |
| Back navigation from product detail retains catalog state        | TC_SCRUM414_020                           | Lowest   |

---

## 3. Test Scenarios

### Feature: Product Detail Access & Wishlist Button

---

### TC_SCRUM414_001 — Caregiver Can Navigate to Product Detail Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver is logged in and on the catalog page.
**Test Steps**:
1. Login as caregiver.
2. Navigate to catalog.
3. Click first "View details" link.
4. Verify URL contains `/product/` or page has product content.
**Expected Results**:
- Caregiver navigates to a product detail page.

---

### TC_SCRUM414_002 — Product Detail Page Has Product Heading
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Verify H1 heading is visible with non-empty text.
**Expected Results**:
- Product detail page displays a product heading.

---

### TC_SCRUM414_003 — Add to Wishlist Button Exists on Product Detail Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Scroll to bottom.
2. Verify an "Add to Wishlist", "Wishlist", or heart/like button exists.
**Expected Results**:
- Wishlist button/element is present on the product detail page.

---

### Feature: Add to Wishlist Triggers PwD Selection (AC1)

---

### TC_SCRUM414_004 — Clicking Add to Wishlist Without PwD Shows PwD Selection Prompt
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver is on product detail page, no PwD selected.
**Test Steps**:
1. Click "Add to Wishlist" button.
2. Verify a modal, dropdown, or PwD selection prompt appears.
**Expected Results**:
- PwD selection prompt appears after clicking Add to Wishlist.

---

### TC_SCRUM414_005 — PwD Selection Prompt is a Modal or Dropdown
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver clicked Add to Wishlist.
**Test Steps**:
1. Click Add to Wishlist.
2. Verify the prompt is a modal dialog, dropdown, or inline selection.
**Expected Results**:
- PwD selection is presented as a modal or dropdown.

---

### TC_SCRUM414_006 — PwD Selection Lists Available PwDs
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: PwD selection prompt is visible.
**Test Steps**:
1. Click Add to Wishlist.
2. Verify at least one PwD option is listed.
**Expected Results**:
- PwD selection lists caregiver's linked PwDs.

---

### Feature: Single PwD Selection (AC2)

---

### TC_SCRUM414_007 — Caregiver Can Select Only One PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: PwD selection prompt is visible with multiple PwDs.
**Test Steps**:
1. Select PwD #1.
2. Attempt to select PwD #2.
3. Verify only one PwD is selected (radio-style, not multi-select).
**Expected Results**:
- Only one PwD can be selected at a time.

---

### Feature: Confirm Add Button State (AC3)

---

### TC_SCRUM414_008 — Confirm Add Button Disabled Until PwD Selected
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: PwD selection prompt is visible, no PwD selected.
**Test Steps**:
1. Click Add to Wishlist.
2. Verify "Confirm Add" or equivalent button is disabled.
**Expected Results**:
- Confirm button is disabled until PwD is selected.

---

### TC_SCRUM414_009 — Confirm Add Button Enabled After PwD Selection
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: PwD selection prompt is visible.
**Test Steps**:
1. Select a PwD.
2. Verify Confirm Add button becomes enabled.
**Expected Results**:
- Confirm button transitions to enabled after PwD selection.

---

### Feature: Confirmation — Product Added & Success Toast (AC4)

---

### TC_SCRUM414_010 — Clicking Confirm Adds Product to Wishlist
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: PwD is selected, Confirm Add is enabled.
**Test Steps**:
1. Select a PwD and click Confirm Add.
2. Verify the page responds (modal closes, button state changes, or confirmation shown).
**Expected Results**:
- Product is added to the wishlist.

---

### TC_SCRUM414_011 — Success Toast Shows "Added to <PwD Name>'s wishlist"
**Priority**: Highest
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver confirmed wishlist addition.
**Test Steps**:
1. After confirming, verify a success toast/message appears.
2. Verify it contains "added to" and "wishlist" text.
**Expected Results**:
- Success toast displays "Added to <PwD Name>'s wishlist".

---

### Feature: Edge Case — Cancel PwD Selection (EC1)

---

### TC_SCRUM414_012 — Cancelling PwD Selection Creates No Wishlist Entry
**Priority**: High
**Related Jira Issue**: SCRUM-414
**Preconditions**: PwD selection prompt is visible.
**Test Steps**:
1. Click Add to Wishlist.
2. Cancel or close the PwD selection prompt without selecting.
3. Verify no success toast appears.
**Expected Results**:
- No wishlist entry is created on cancel.

---

### TC_SCRUM414_013 — Wishlist Button State Unchanged After Cancel
**Priority**: High
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver cancelled PwD selection.
**Test Steps**:
1. After cancelling, verify the Add to Wishlist button is still in its original state.
**Expected Results**:
- Wishlist button state is unchanged after cancel.

---

### Feature: Edge Case — Switch PwD Mid-Flow (EC4)

---

### TC_SCRUM414_014 — Switching PwD Mid-Flow Respects Final Selection
**Priority**: High
**Related Jira Issue**: SCRUM-414
**Preconditions**: PwD selection prompt is visible with multiple PwDs.
**Test Steps**:
1. Select PwD #1.
2. Switch to PwD #2.
3. Click Confirm Add.
4. Verify the success toast references PwD #2.
**Expected Results**:
- Final PwD selection is respected in the wishlist entry.

---

### Feature: Edge Case — Incomplete PwD Profile (EC3)

---

### TC_SCRUM414_015 — Incomplete PwD Profile is Still Selectable
**Priority**: Medium
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver has a PwD with incomplete profile.
**Test Steps**:
1. Click Add to Wishlist.
2. Verify all PwDs are listed including those with incomplete profiles.
3. Select a PwD.
4. Verify Confirm Add is enabled.
**Expected Results**:
- PwD with incomplete profile is still selectable.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM414_016 — Page Refresh Retains Wishlist State
**Priority**: Medium
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver added a product to wishlist.
**Test Steps**:
1. Add product to wishlist.
2. Reload the page.
3. Verify the wishlist button state reflects the addition.
**Expected Results**:
- Page refresh retains wishlist state.

---

### TC_SCRUM414_017 — Mobile Viewport Renders Wishlist Flow Correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Navigate to product detail page.
2. Set viewport to mobile (375×667).
3. Verify wishlist button and PwD-related content are visible.
**Expected Results**:
- Wishlist flow renders correctly on mobile.

---

### TC_SCRUM414_018 — Multiple Products Have Consistent Wishlist Behavior
**Priority**: Low
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Click first View details, verify wishlist button exists.
2. Go back to catalog.
3. Click second View details, verify same behavior.
**Expected Results**:
- Wishlist behavior is consistent across products.

---

### TC_SCRUM414_019 — Wishlist Button State Changes After Adding
**Priority**: Lowest
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver added product to wishlist.
**Test Steps**:
1. After adding to wishlist, verify the button state changes (e.g., filled heart, "Added", disabled).
**Expected Results**:
- Wishlist button reflects that product has been added.

---

### TC_SCRUM414_020 — Back Navigation From Product Detail Retains Catalog State
**Priority**: Lowest
**Related Jira Issue**: SCRUM-414
**Preconditions**: Caregiver is on product detail page.
**Test Steps**:
1. Navigate back to catalog.
2. Verify catalog page loads correctly.
**Expected Results**:
- Back navigation retains catalog state.

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
- Authentication uses the SSO flow.
- An "Add to Wishlist" button (or heart/like icon) exists on the product detail page.
- Clicking it without PwD selected triggers a PwD selection modal/dropdown.
- Only one PwD can be selected at a time (radio-style).
- "Confirm Add" button is disabled until a PwD is selected.
- Success toast shows "Added to <PwD Name>'s wishlist".
- **Dependency**: SCRUM-405/408/411 cover vendor contact PwD enforcement; SCRUM-414 covers wishlist PwD enforcement.
- **DO NOT CHANGE**: CaregiverRecommendationsPage.ts page object must not be modified.

---

## 6. Open Questions / Clarifications Needed

1. **Wishlist button location**: Is it on the product detail page, catalog cards, or both?
2. **Modal vs inline**: Is the PwD selection a modal dialog or inline dropdown?
3. **Searchable dropdown**: For EC2 (long PwD list), is the dropdown searchable by default?
4. **Wishlist page**: Where does the caregiver view their wishlist items?
