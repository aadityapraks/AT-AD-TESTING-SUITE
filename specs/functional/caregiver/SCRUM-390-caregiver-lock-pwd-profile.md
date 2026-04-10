# Functional Test Plan: SCRUM-390 — Caregiver - Lock PwD Profile Editing After PwD Logs into SwarajAbility

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-390](https://youth4jobs.atlassian.net//browse/SCRUM-390) |
| Status      | In QA                                        |
| Assignee    | Aaditya Prakash                              |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that the system locks PwD profile editing for a caregiver once the PwD logs into SwarajAbility. Covers: profile status change to "SwarajAbility-owned" (AC1), edit option disabled (AC1), read-only view with informational message (AC2), caregiver PwD profile page accessible, PwD list shows locked status. Edge cases: page refresh retains lock, mobile viewport.

### Out of Scope
- PwD login flow (separate PwD story)
- Backend API rejection testing (cannot test from UI)
- Concurrent editing scenarios (PwD logs in while caregiver editing)
- Deep link redirect testing

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Caregiver can navigate to PwD profile management                 | TC_SCRUM390_001, 002, 003                 | Highest  |
| PwD list visible with PwD names                                  | TC_SCRUM390_004, 005                      | Highest  |
| Locked PwD profile shows read-only view (AC2)                    | TC_SCRUM390_006, 007                      | Highest  |
| Edit option disabled for locked PwD (AC1)                        | TC_SCRUM390_008, 009                      | Highest  |
| Informational message displayed (AC2)                            | TC_SCRUM390_010, 011                      | Highest  |
| Profile status shows "SwarajAbility-owned" (AC1)                 | TC_SCRUM390_012                           | High     |
| Unlocked PwD profile still editable                              | TC_SCRUM390_013                           | High     |
| PwD profile fields visible in read-only mode                     | TC_SCRUM390_014                           | High     |
| Page refresh retains locked state                                | TC_SCRUM390_015                           | Medium   |
| Multiple PwDs show correct lock status per PwD                   | TC_SCRUM390_016                           | Medium   |
| No save/submit button visible for locked PwD                     | TC_SCRUM390_017                           | Medium   |
| Mobile viewport renders locked profile correctly                 | TC_SCRUM390_018                           | Low      |
| Back navigation from PwD profile works                           | TC_SCRUM390_019                           | Low      |
| Profile page has correct heading                                 | TC_SCRUM390_020                           | Lowest   |

---



## 3. Test Scenarios

### Feature: PwD Profile Management Access

---

### TC_SCRUM390_001 — Caregiver can navigate to profile page
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Login as caregiver.
2. Navigate to profile page.
3. Verify profile content visible.
**Expected Results**:
- Profile page loads.

---

### TC_SCRUM390_002 — PwD management section accessible from profile
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: Caregiver is on profile page.
**Test Steps**:
1. On profile page.
2. Verify PwD management section or tab visible.
**Expected Results**:
- PwD management section accessible.

---

### TC_SCRUM390_003 — PwD profiles list is visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: Caregiver has PwDs linked.
**Test Steps**:
1. Navigate to PwD management.
2. Verify list of PwD profiles visible.
**Expected Results**:
- PwD profiles list visible.

---

### Feature: PwD List Display

---

### TC_SCRUM390_004 — PwD list shows PwD names
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: PwD list is visible.
**Test Steps**:
1. Verify each PwD entry has a name.
**Expected Results**:
- PwD names displayed.

---

### TC_SCRUM390_005 — PwD list shows profile status indicator
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: PwD list is visible.
**Test Steps**:
1. Verify PwD entries have status indicator (locked/unlocked/owned).
**Expected Results**:
- Status indicator visible per PwD.

---

### Feature: Locked PwD — Read-Only View

---

### TC_SCRUM390_006 — Locked PwD profile shows read-only view
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: PwD has logged into SwarajAbility (profile locked).
**Test Steps**:
1. Click on a PwD whose profile is locked.
2. Verify profile fields are displayed but not editable.
**Expected Results**:
- Profile displayed in read-only mode.

---

### TC_SCRUM390_007 — Locked PwD profile fields are not editable
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: Viewing locked PwD profile.
**Test Steps**:
1. On locked PwD profile.
2. Verify input fields are disabled or not present.
**Expected Results**:
- Fields are disabled/read-only.

---

### Feature: Edit Disabled

---

### TC_SCRUM390_008 — Edit option disabled for locked PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: Viewing locked PwD profile.
**Test Steps**:
1. On locked PwD profile.
2. Verify Edit button is disabled, hidden, or absent.
**Expected Results**:
- Edit option is disabled.

---

### TC_SCRUM390_009 — No edit/save actions available for locked PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: Viewing locked PwD profile.
**Test Steps**:
1. On locked PwD profile.
2. Verify no Save/Submit/Update buttons visible.
**Expected Results**:
- No save/submit actions available.

---

### Feature: Informational Message

---

### TC_SCRUM390_010 — Informational message displayed for locked PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: Viewing locked PwD profile.
**Test Steps**:
1. On locked PwD profile.
2. Verify message about profile being managed by PwD is visible.
**Expected Results**:
- Informational message displayed.

---

### TC_SCRUM390_011 — Informational message contains SwarajAbility/managed keywords
**Priority**: Highest
**Related Jira Issue**: SCRUM-390
**Preconditions**: Viewing locked PwD profile.
**Test Steps**:
1. Verify message contains 'managed', 'SwarajAbility', 'cannot be edited', or similar.
**Expected Results**:
- Message references SwarajAbility ownership.

---

### Feature: Profile Status

---

### TC_SCRUM390_012 — Profile status shows SwarajAbility-owned
**Priority**: High
**Related Jira Issue**: SCRUM-390
**Preconditions**: PwD has logged into SwarajAbility.
**Test Steps**:
1. On locked PwD profile.
2. Verify status label shows 'SwarajAbility-owned' or 'locked' or 'managed'.
**Expected Results**:
- Status shows SwarajAbility-owned.

---

### Feature: Unlocked PwD — Editable

---

### TC_SCRUM390_013 — Unlocked PwD profile is still editable
**Priority**: High
**Related Jira Issue**: SCRUM-390
**Preconditions**: PwD has NOT logged into SwarajAbility.
**Test Steps**:
1. Click on a PwD whose profile is NOT locked.
2. Verify Edit button is visible/enabled.
**Expected Results**:
- Edit option available for unlocked PwD.

---

### Feature: Locked PwD — Read-Only View

---

### TC_SCRUM390_014 — PwD profile fields visible in read-only mode
**Priority**: High
**Related Jira Issue**: SCRUM-390
**Preconditions**: Viewing locked PwD profile.
**Test Steps**:
1. On locked PwD profile.
2. Verify name, disability, and other fields are displayed (read-only).
**Expected Results**:
- Profile fields visible but not editable.

---

### Feature: Edge Case — Persistence

---

### TC_SCRUM390_015 — Page refresh retains locked state
**Priority**: Medium
**Related Jira Issue**: SCRUM-390
**Preconditions**: Viewing locked PwD profile.
**Test Steps**:
1. On locked PwD profile.
2. Reload page.
3. Verify profile still locked/read-only.
**Expected Results**:
- Locked state persists after refresh.

---

### Feature: Edge Case — Multiple PwDs

---

### TC_SCRUM390_016 — Multiple PwDs show correct lock status per PwD
**Priority**: Medium
**Related Jira Issue**: SCRUM-390
**Preconditions**: Caregiver has multiple PwDs with different lock states.
**Test Steps**:
1. View PwD list.
2. Verify each PwD shows correct locked/unlocked status.
**Expected Results**:
- Correct status per PwD.

---

### Feature: Edit Disabled

---

### TC_SCRUM390_017 — No save/submit button visible for locked PwD
**Priority**: Medium
**Related Jira Issue**: SCRUM-390
**Preconditions**: Viewing locked PwD profile.
**Test Steps**:
1. On locked PwD profile.
2. Scroll through page.
3. Verify no Save/Submit button.
**Expected Results**:
- No save/submit button present.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM390_018 — Mobile viewport renders locked profile correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-390
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Navigate to locked PwD profile.
2. Set mobile viewport.
3. Verify content visible.
**Expected Results**:
- Locked profile renders correctly on mobile.

---

### TC_SCRUM390_019 — Back navigation from PwD profile works
**Priority**: Low
**Related Jira Issue**: SCRUM-390
**Preconditions**: Caregiver is on PwD profile.
**Test Steps**:
1. On PwD profile.
2. Go back.
3. Verify previous page loads.
**Expected Results**:
- Back navigation works.

---

### TC_SCRUM390_020 — Profile page has correct heading
**Priority**: Lowest
**Related Jira Issue**: SCRUM-390
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
