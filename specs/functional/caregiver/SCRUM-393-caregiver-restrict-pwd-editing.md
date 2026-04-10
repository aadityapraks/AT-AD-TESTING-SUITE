# Functional Test Plan: SCRUM-393 — Caregiver - Restrict Editing for PwD Profiles Pulled from SwarajAbility

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-393](https://youth4jobs.atlassian.net//browse/SCRUM-393) |
| Status      | In QA                                        |
| Assignee    | Aaditya Prakash                              |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that PwD profiles sourced from SwarajAbility are displayed as read-only for caregivers with "Pre verified" label, no Edit Profile action, tooltip explaining non-editable status, while still allowing use for inquiries/recommendations/tracking. Edge cases: mixed editable + non-editable PwDs.

### Out of Scope
- URL manipulation / deep link blocking (backend-dependent)
- SwarajAbility data refresh automation
- Backend API rejection testing

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Profile page accessible, PwD list visible                        | TC_SCRUM393_001, 002, 003                 | Highest  |
| SwarajAbility PwD labeled "Pre verified" (AC1)                   | TC_SCRUM393_004, 005                      | Highest  |
| No Edit Profile action for SwarajAbility PwD (AC1)               | TC_SCRUM393_006, 007                      | Highest  |
| Profile fields in read-only mode (AC2)                           | TC_SCRUM393_008, 009                      | Highest  |
| Caregiver can still view profile (AC3)                           | TC_SCRUM393_010                           | Highest  |
| Caregiver can use profile for recommendations (AC3)              | TC_SCRUM393_011                           | High     |
| Tooltip/helper explains non-editable status (AC4)                | TC_SCRUM393_012, 013                      | High     |
| Mixed list: correct actions per PwD (EC)                         | TC_SCRUM393_014, 015                      | High     |
| Page refresh retains read-only state                             | TC_SCRUM393_016                           | Medium   |
| No save/submit button for restricted PwD                         | TC_SCRUM393_017                           | Medium   |
| Mobile viewport renders correctly                                | TC_SCRUM393_018                           | Low      |
| Back navigation works                                            | TC_SCRUM393_019                           | Low      |
| Page has correct heading                                         | TC_SCRUM393_020                           | Lowest   |

---



## 3. Test Scenarios

### Feature: Profile Access

---

### TC_SCRUM393_001 — Caregiver can navigate to profile page
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Login as caregiver.
2. Navigate to profile page.
3. Verify profile content visible.
**Expected Results**:
- Profile page loads.

---

### TC_SCRUM393_002 — PwD management section accessible
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: Caregiver is on profile page.
**Test Steps**:
1. On profile page.
2. Verify PwD management section or list visible.
**Expected Results**:
- PwD management section accessible.

---

### TC_SCRUM393_003 — PwD profiles list is visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: Caregiver has PwDs linked.
**Test Steps**:
1. Navigate to PwD management.
2. Verify list of PwD profiles visible.
**Expected Results**:
- PwD profiles list visible.

---

### Feature: Pre Verified Label

---

### TC_SCRUM393_004 — SwarajAbility PwD labeled 'Pre verified'
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: PwD list has SwarajAbility-sourced profile.
**Test Steps**:
1. View PwD list.
2. Verify SwarajAbility-sourced PwD has 'Pre verified' label/badge.
**Expected Results**:
- 'Pre verified' label visible.

---

### TC_SCRUM393_005 — Pre verified label distinguishes SwarajAbility PwDs
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: PwD list visible.
**Test Steps**:
1. View PwD list.
2. Verify label is visually distinct (badge, icon, or text).
**Expected Results**:
- Label is visually distinct.

---

### Feature: Edit Restricted

---

### TC_SCRUM393_006 — No Edit Profile action for SwarajAbility PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: Viewing SwarajAbility PwD profile.
**Test Steps**:
1. Click on SwarajAbility-sourced PwD.
2. Verify Edit Profile button is absent or disabled.
**Expected Results**:
- Edit Profile action not available.

---

### TC_SCRUM393_007 — Edit button hidden or disabled for restricted PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: Viewing restricted PwD profile.
**Test Steps**:
1. On restricted PwD profile.
2. Verify no Edit button visible or it is disabled.
**Expected Results**:
- Edit button hidden or disabled.

---

### Feature: Read-Only Fields

---

### TC_SCRUM393_008 — Profile fields displayed in read-only mode
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: Viewing restricted PwD profile.
**Test Steps**:
1. On restricted PwD profile.
2. Verify fields are displayed but not editable.
**Expected Results**:
- Fields displayed in read-only mode.

---

### TC_SCRUM393_009 — Input fields disabled or absent for restricted PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: Viewing restricted PwD profile.
**Test Steps**:
1. On restricted PwD profile.
2. Verify input fields are disabled/readonly or not present.
**Expected Results**:
- Input fields disabled or absent.

---

### Feature: View Still Allowed

---

### TC_SCRUM393_010 — Caregiver can still view profile details
**Priority**: Highest
**Related Jira Issue**: SCRUM-393
**Preconditions**: Viewing restricted PwD profile.
**Test Steps**:
1. On restricted PwD profile.
2. Verify name, disability, and other details visible.
**Expected Results**:
- Profile details visible.

---

### TC_SCRUM393_011 — Caregiver can use restricted PwD for recommendations
**Priority**: High
**Related Jira Issue**: SCRUM-393
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Navigate to catalog.
2. Verify restricted PwD appears in PwD dropdown for recommendations.
**Expected Results**:
- Restricted PwD available in dropdown.

---

### Feature: Tooltip / Helper Text

---

### TC_SCRUM393_012 — Tooltip or helper text explains non-editable status
**Priority**: High
**Related Jira Issue**: SCRUM-393
**Preconditions**: Viewing restricted PwD profile.
**Test Steps**:
1. On restricted PwD profile.
2. Verify tooltip or helper text about non-editable status.
**Expected Results**:
- Tooltip/helper text explains status.

---

### TC_SCRUM393_013 — Helper text contains managed/verified keywords
**Priority**: High
**Related Jira Issue**: SCRUM-393
**Preconditions**: Viewing restricted PwD profile.
**Test Steps**:
1. Verify page body contains 'verified', 'managed', 'SwarajAbility', or 'cannot edit'.
**Expected Results**:
- Keywords present in helper text.

---

### Feature: Mixed List

---

### TC_SCRUM393_014 — Mixed list shows correct actions per PwD — editable PwD has Edit
**Priority**: High
**Related Jira Issue**: SCRUM-393
**Preconditions**: Caregiver has both editable and restricted PwDs.
**Test Steps**:
1. View PwD list.
2. Verify editable PwD has Edit action available.
**Expected Results**:
- Editable PwD has Edit action.

---

### TC_SCRUM393_015 — Mixed list shows correct actions per PwD — restricted PwD has no Edit
**Priority**: High
**Related Jira Issue**: SCRUM-393
**Preconditions**: Caregiver has both editable and restricted PwDs.
**Test Steps**:
1. View PwD list.
2. Verify restricted PwD does NOT have Edit action.
**Expected Results**:
- Restricted PwD has no Edit action.

---

### Feature: Edge Case — Persistence

---

### TC_SCRUM393_016 — Page refresh retains read-only state
**Priority**: Medium
**Related Jira Issue**: SCRUM-393
**Preconditions**: Viewing restricted PwD profile.
**Test Steps**:
1. On restricted PwD profile.
2. Reload page.
3. Verify still read-only.
**Expected Results**:
- Read-only state persists after refresh.

---

### Feature: Edit Restricted

---

### TC_SCRUM393_017 — No save/submit button for restricted PwD
**Priority**: Medium
**Related Jira Issue**: SCRUM-393
**Preconditions**: Viewing restricted PwD profile.
**Test Steps**:
1. On restricted PwD profile.
2. Scroll through page.
3. Verify no Save/Submit button.
**Expected Results**:
- No save/submit button present.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM393_018 — Mobile viewport renders restricted profile correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-393
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Navigate to restricted PwD profile.
2. Set mobile viewport.
3. Verify content visible.
**Expected Results**:
- Restricted profile renders correctly on mobile.

---

### TC_SCRUM393_019 — Back navigation from PwD profile works
**Priority**: Low
**Related Jira Issue**: SCRUM-393
**Preconditions**: Caregiver is on PwD profile.
**Test Steps**:
1. On PwD profile.
2. Go back.
3. Verify previous page loads.
**Expected Results**:
- Back navigation works.

---

### TC_SCRUM393_020 — Profile page has correct heading
**Priority**: Lowest
**Related Jira Issue**: SCRUM-393
**Preconditions**: Caregiver is on PwD profile.
**Test Steps**:
1. Verify page heading contains 'profile' or PwD name.
**Expected Results**:
- Correct heading displayed.

---

## Test Data

| Data Item          | Value                                    |
|--------------------|------------------------------------------|
| Caregiver email    | `cg1@yopmail.com`                        |
| Caregiver password | `cg1@141G`                               |
| Base URL           | `https://qa-atad.swarajability.org/`     |
| Desktop viewport   | 1280×720                                 |
| Mobile viewport    | 375×667                                  |
