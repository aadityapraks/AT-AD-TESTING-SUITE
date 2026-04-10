# Functional Test Plan: SCRUM-384 — Caregiver - Access Control & Data Integrity for PwD Management

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-384](https://youth4jobs.atlassian.net//browse/SCRUM-384) |
| Status      | In QA                                        |
| Assignee    | Aaditya Prakash                              |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that caregivers can only view/manage/delete PwDs linked to their account. Covers: PwD list shows only linked PwDs (AC1), delete/view restricted to authorized (AC2), unauthenticated access blocked. Edge cases: page refresh, mobile viewport.

### Out of Scope
- Audit log verification (backend)
- Session expiry during delete (cannot simulate)
- Concurrent session deletion (cannot simulate)

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Profile page accessible, PwD list visible                        | TC_SCRUM384_001, 002, 003                 | Highest  |
| Only linked PwDs shown (AC1)                                     | TC_SCRUM384_004, 005                      | Highest  |
| View action available for linked PwDs (AC2)                      | TC_SCRUM384_006, 007                      | Highest  |
| Delete action available for authorized PwDs (AC2)                | TC_SCRUM384_008, 009                      | Highest  |
| Unauthenticated user cannot access PwD management                | TC_SCRUM384_010                           | Highest  |
| Delete confirmation required before removal                      | TC_SCRUM384_011, 012                      | High     |
| PwD list updates after deletion                                  | TC_SCRUM384_013                           | High     |
| No unauthorized PwDs visible                                     | TC_SCRUM384_014                           | High     |
| Page refresh retains PwD list                                    | TC_SCRUM384_015                           | Medium   |
| PwD count reflects linked PwDs only                              | TC_SCRUM384_016                           | Medium   |
| PwD usable for catalog after access control check                | TC_SCRUM384_017                           | Medium   |
| Mobile viewport renders correctly                                | TC_SCRUM384_018                           | Low      |
| Back navigation works                                            | TC_SCRUM384_019                           | Low      |
| Page has correct heading                                         | TC_SCRUM384_020                           | Lowest   |

---



## 3. Test Scenarios

### Feature: Profile Access

---

### TC_SCRUM384_001 — Caregiver can navigate to profile page
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Login as caregiver.
2. Navigate to profile page.
3. Verify profile content visible.
**Expected Results**:
- Profile page loads.

---

### TC_SCRUM384_002 — PwD management section accessible
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver is on profile page.
**Test Steps**:
1. On profile page.
2. Verify PwD management section visible.
**Expected Results**:
- PwD management section accessible.

---

### TC_SCRUM384_003 — PwD profiles list is visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver has PwDs linked.
**Test Steps**:
1. Navigate to PwD management.
2. Verify list of PwD profiles visible.
**Expected Results**:
- PwD profiles list visible.

---

### Feature: Linked PwDs Only

---

### TC_SCRUM384_004 — Only linked PwDs shown in list
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver has PwDs linked.
**Test Steps**:
1. View PwD list.
2. Verify all PwDs belong to this caregiver.
**Expected Results**:
- Only linked PwDs shown.

---

### TC_SCRUM384_005 — PwD list does not show other caregivers' PwDs
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver is on PwD management.
**Test Steps**:
1. View PwD list.
2. Verify no unauthorized PwDs visible.
**Expected Results**:
- No unauthorized PwDs visible.

---

### Feature: View Restricted

---

### TC_SCRUM384_006 — View action available for linked PwDs
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: PwD list visible.
**Test Steps**:
1. Click on a linked PwD.
2. Verify profile details visible.
**Expected Results**:
- Profile details visible for linked PwD.

---

### TC_SCRUM384_007 — PwD profile view shows name and details
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: Viewing linked PwD profile.
**Test Steps**:
1. View linked PwD profile.
2. Verify name and disability info visible.
**Expected Results**:
- Name and details visible.

---

### Feature: Delete Restricted

---

### TC_SCRUM384_008 — Delete action available for authorized PwDs
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver has PwDs they created.
**Test Steps**:
1. View PwD list.
2. Verify Delete/Remove button or action exists.
**Expected Results**:
- Delete action available.

---

### TC_SCRUM384_009 — Delete action not available for unauthorized PwDs
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: PwD list has restricted profiles.
**Test Steps**:
1. View PwD list.
2. Verify restricted PwDs do not have Delete action.
**Expected Results**:
- No delete for unauthorized PwDs.

---

### Feature: Unauthenticated Access Blocked

---

### TC_SCRUM384_010 — Unauthenticated user cannot access PwD management
**Priority**: Highest
**Related Jira Issue**: SCRUM-384
**Preconditions**: User is not logged in.
**Test Steps**:
1. Open profile page without login.
2. Verify redirected to login or access denied.
**Expected Results**:
- Access blocked for unauthenticated user.

---

### Feature: Delete Confirmation

---

### TC_SCRUM384_011 — Delete confirmation required before removal
**Priority**: High
**Related Jira Issue**: SCRUM-384
**Preconditions**: Delete action available.
**Test Steps**:
1. Click Delete on a PwD.
2. Verify confirmation dialog/prompt appears.
**Expected Results**:
- Confirmation required before delete.

---

### TC_SCRUM384_012 — Cancel delete keeps PwD in list
**Priority**: High
**Related Jira Issue**: SCRUM-384
**Preconditions**: Delete confirmation shown.
**Test Steps**:
1. Click Delete.
2. Cancel confirmation.
3. Verify PwD still in list.
**Expected Results**:
- PwD remains in list after cancel.

---

### Feature: Delete Action

---

### TC_SCRUM384_013 — PwD list updates after deletion
**Priority**: High
**Related Jira Issue**: SCRUM-384
**Preconditions**: Delete action confirmed.
**Test Steps**:
1. Delete a PwD.
2. Confirm deletion.
3. Verify PwD removed from list.
**Expected Results**:
- PwD removed from list.

---

### Feature: Linked PwDs Only

---

### TC_SCRUM384_014 — No unauthorized PwDs visible after page load
**Priority**: High
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver is on PwD management.
**Test Steps**:
1. Reload PwD management page.
2. Verify only linked PwDs shown.
**Expected Results**:
- Only linked PwDs after reload.

---

### Feature: Edge Case — Persistence

---

### TC_SCRUM384_015 — Page refresh retains PwD list
**Priority**: Medium
**Related Jira Issue**: SCRUM-384
**Preconditions**: PwD list visible.
**Test Steps**:
1. View PwD list.
2. Reload page.
3. Verify list retained.
**Expected Results**:
- PwD list persists after refresh.

---

### Feature: Linked PwDs Only

---

### TC_SCRUM384_016 — PwD count reflects linked PwDs only
**Priority**: Medium
**Related Jira Issue**: SCRUM-384
**Preconditions**: PwD list visible.
**Test Steps**:
1. View PwD list.
2. Verify count matches number of linked PwDs.
**Expected Results**:
- Count reflects linked PwDs.

---

### Feature: Usability

---

### TC_SCRUM384_017 — PwD usable for catalog after access control check
**Priority**: Medium
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver has linked PwDs.
**Test Steps**:
1. Navigate to catalog.
2. Verify linked PwDs appear in dropdown.
**Expected Results**:
- Linked PwDs available in catalog dropdown.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM384_018 — Mobile viewport renders PwD management correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-384
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Navigate to PwD management.
2. Set mobile viewport.
3. Verify content visible.
**Expected Results**:
- PwD management renders correctly on mobile.

---

### TC_SCRUM384_019 — Back navigation from PwD management works
**Priority**: Low
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver is on PwD management.
**Test Steps**:
1. On PwD management.
2. Go back.
3. Verify previous page loads.
**Expected Results**:
- Back navigation works.

---

### TC_SCRUM384_020 — PwD management page has correct heading
**Priority**: Lowest
**Related Jira Issue**: SCRUM-384
**Preconditions**: Caregiver is on PwD management.
**Test Steps**:
1. Verify page heading contains 'profile' or 'PwD' or 'manage'.
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
