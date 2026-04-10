# Functional Test Plan: SCRUM-411 — Caregiver - Enforce PwD Selection When PwDs Exist but None Selected

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 2.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-411](https://youth4jobs.atlassian.net//browse/SCRUM-411) |
| Status      | In QA                                        |
| Assignee    | prathamesh v                                 |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that the system enforces PwD selection before a caregiver can express interest in a product. Covers: Express Interest blocked without PwD selection, validation message, button enabled after PwD selection. Edge cases: deselecting PwD, page refresh, multiple PwD switching, mobile viewport.

### Out of Scope
- PwD dropdown listing on product detail page (not implemented — PwD selection is on catalog page)
- Contact Vendor button click behavior (navigates away/closes page — app behavior)
- Vendor-side dashboard testing
- Backend API performance testing

---

## 2. Requirements Traceability Matrix (16 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Product detail page accessible, Express Interest button exists   | TC_SCRUM411_001, 002, 003                 | Highest  |
| PwD dropdown available on product detail page                    | TC_SCRUM411_004                           | Highest  |
| Express Interest blocked without PwD selection (AC1)             | TC_SCRUM411_005, 006, 007                 | Highest  |
| Express Interest enabled after PwD selection (AC1)               | TC_SCRUM411_008                           | Highest  |
| Deselecting PwD re-blocks Express Interest (EC1)                 | TC_SCRUM411_009, 010                      | High     |
| Page refresh retains enforcement state (EC2)                     | TC_SCRUM411_011, 012                      | Medium   |
| Multiple PwD switching (EC3)                                     | TC_SCRUM411_013                           | Medium   |
| Mobile viewport renders enforcement correctly                    | TC_SCRUM411_014                           | Low      |
| Multiple products have consistent enforcement                    | TC_SCRUM411_015                           | Low      |
| Back navigation retains PwD selection state                      | TC_SCRUM411_016                           | Lowest   |

---

## 3. Test Scenarios

### TC_SCRUM411_001 — Caregiver Can Navigate to Product Detail Page From Catalog
**Priority**: Highest | **Preconditions**: Caregiver logged in.
**Steps**: Login → catalog → click View details → verify URL.
**Expected**: Caregiver navigates to product detail page.

### TC_SCRUM411_002 — Product Detail Page Has Product Heading
**Priority**: Highest | **Preconditions**: On product detail page.
**Steps**: Verify H1 heading visible.
**Expected**: Product heading displayed.

### TC_SCRUM411_003 — Express Interest / Contact Vendor Button Exists
**Priority**: Highest | **Preconditions**: On product detail page.
**Steps**: Scroll to bottom → verify element exists.
**Expected**: Express Interest / Contact Vendor element present.

### TC_SCRUM411_004 — PwD Selection Dropdown Available on Product Detail Page
**Priority**: Highest | **Preconditions**: On product detail page with PwDs linked.
**Steps**: Scroll to interest area → verify PwD selection element.
**Expected**: PwD selection mechanism available.

### TC_SCRUM411_005 — Express Interest Blocked When No PwD Selected
**Priority**: Highest | **Preconditions**: No PwD selected.
**Steps**: Attempt Express Interest → verify blocked.
**Expected**: Express Interest blocked without PwD.

### TC_SCRUM411_006 — No Success/Confirmation After Blocked Attempt
**Priority**: Highest | **Preconditions**: Attempted without PwD.
**Steps**: Attempt → verify no success message, URL unchanged.
**Expected**: No success; remains on product page.

### TC_SCRUM411_007 — Validation Message Displayed Without PwD
**Priority**: Highest | **Preconditions**: Attempted without PwD.
**Steps**: Verify body contains PwD/select/required keywords.
**Expected**: Validation message shown.

### TC_SCRUM411_008 — Express Interest Enabled After PwD Selection
**Priority**: Highest | **Preconditions**: PwDs available.
**Steps**: Select PwD → verify button enabled.
**Expected**: Button enabled after selection.

### TC_SCRUM411_009 — Deselecting PwD Re-Blocks Express Interest
**Priority**: High | **Preconditions**: PwD selected.
**Steps**: Select → deselect → verify blocked.
**Expected**: Deselecting re-blocks interest.

### TC_SCRUM411_010 — No Success After Deselection and Blocked Attempt
**Priority**: High | **Preconditions**: PwD deselected.
**Steps**: Attempt → verify no success, URL unchanged.
**Expected**: Remains blocked.

### TC_SCRUM411_011 — Page Refresh Retains Blocked State
**Priority**: Medium | **Preconditions**: No PwD selected.
**Steps**: Verify blocked → reload → verify still blocked.
**Expected**: Refresh doesn't bypass enforcement.

### TC_SCRUM411_012 — Page Refresh After PwD Selection Handles State
**Priority**: Medium | **Preconditions**: PwD selected.
**Steps**: Select → reload → verify consistent state.
**Expected**: State handled gracefully.

### TC_SCRUM411_013 — Switching PwD Keeps Express Interest Enabled
**Priority**: Medium | **Preconditions**: Multiple PwDs linked.
**Steps**: Select #1 → switch to #2 → verify enabled.
**Expected**: Switching keeps interest enabled.

### TC_SCRUM411_014 — Mobile Viewport Renders Enforcement Correctly
**Priority**: Low | **Preconditions**: Logged in.
**Steps**: Product detail → mobile viewport → verify elements.
**Expected**: Renders correctly on mobile.

### TC_SCRUM411_015 — Multiple Products Have Consistent Enforcement
**Priority**: Low | **Preconditions**: On catalog.
**Steps**: Check first product → back → check second product.
**Expected**: Consistent across products.

### TC_SCRUM411_016 — Back Navigation Retains PwD Selection State
**Priority**: Lowest | **Preconditions**: PwD selected.
**Steps**: Select → back → forward → verify state.
**Expected**: State handled gracefully.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Caregiver email                  | `cg1@yopmail.com`                                        |
| Caregiver password               | `cg1@141G`                                               |
| Base URL                         | `https://qa-atad.swarajability.org/`                     |
| Catalog URL                      | `https://qa-atad.swarajability.org/catalog/`             |
| Desktop viewport                 | 1280×720                                                 |
| Mobile viewport                  | 375×667                                                  |

---

## 5. Assumptions & Dependencies

- The caregiver account `cg1@yopmail.com` has at least one PwD linked.
- PwD selection dropdown (`.catalog-caregiver-pwd-option`) is on the catalog page, NOT on the product detail page.
- Clicking Contact Vendor on product detail may navigate away or close the page context.
- **DO NOT CHANGE**: CaregiverRecommendationsPage.ts must not be modified.
