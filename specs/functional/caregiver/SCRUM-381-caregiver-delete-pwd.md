# Functional Test Plan: SCRUM-381 — Caregiver - Delete a PwD from Care Network

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-381](https://youth4jobs.atlassian.net//browse/SCRUM-381) |
| Status      | In QA                                        |
| Assignee    | Aaditya Prakash                              |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that a caregiver can delete a PwD from their care network. Covers: delete icon on PwD cards (AC1), confirmation modal (AC2), delete action removes PwD and updates count (AC3), cancel closes modal (AC4), product interests retained with PwD tag (AC5).

### Out of Scope
- Backend error simulation
- Linked PwD blocking (requires specific data setup)
- Double-click prevention (race condition)
- Actual destructive deletion in test (avoid data loss)

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Profile page accessible, PwD list visible                        | TC_SCRUM381_001, 002, 003                 | Highest  |
| Delete icon on PwD cards (AC1)                                   | TC_SCRUM381_004, 005                      | Highest  |
| Confirmation modal with PwD name and warning (AC2)               | TC_SCRUM381_006, 007, 008                 | Highest  |
| Cancel closes modal without changes (AC4)                        | TC_SCRUM381_009, 010                      | Highest  |
| Delete removes PwD and shows success (AC3)                       | TC_SCRUM381_011, 012                      | High     |
| PwD count updates after deletion (AC3)                           | TC_SCRUM381_013                           | High     |
| Product interests retained with PwD tag (AC5)                    | TC_SCRUM381_014                           | High     |
| Page refresh retains updated list                                | TC_SCRUM381_015                           | Medium   |
| PwD dropdown updates after deletion                              | TC_SCRUM381_016                           | Medium   |
| Multiple PwDs — delete one keeps others                          | TC_SCRUM381_017                           | Medium   |
| Mobile viewport renders delete flow correctly                    | TC_SCRUM381_018                           | Low      |
| Back navigation works                                            | TC_SCRUM381_019                           | Low      |
| Page has correct heading                                         | TC_SCRUM381_020                           | Lowest   |

---



## 3. Test Scenarios

### Feature: Profile Access

---

### TC_SCRUM381_001 — Caregiver can navigate to profile page
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Login as caregiver.
2. Navigate to profile page.
3. Verify profile content visible.
**Expected Results**:
- Profile page loads.

---

### TC_SCRUM381_002 — PwD management section accessible
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: Caregiver is on profile page.
**Test Steps**:
1. On profile page.
2. Verify PwD management section visible.
**Expected Results**:
- PwD management section accessible.

---

### TC_SCRUM381_003 — PwD profiles list is visible with PwD cards
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: Caregiver has PwDs linked.
**Test Steps**:
1. Navigate to PwD management.
2. Verify PwD cards visible.
**Expected Results**:
- PwD cards visible.

---

### Feature: Delete Icon

---

### TC_SCRUM381_004 — Delete icon available on PwD card
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: PwD cards visible.
**Test Steps**:
1. View PwD cards.
2. Verify delete/trash icon exists on card.
**Expected Results**:
- Delete icon present on PwD card.

---

### TC_SCRUM381_005 — Delete icon is clickable
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: Delete icon visible.
**Test Steps**:
1. Locate delete icon.
2. Verify it is a clickable element.
**Expected Results**:
- Delete icon is clickable.

---

### Feature: Confirmation Modal

---

### TC_SCRUM381_006 — Clicking delete opens confirmation modal
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: Delete icon clicked.
**Test Steps**:
1. Click delete icon.
2. Verify confirmation modal/dialog appears.
**Expected Results**:
- Confirmation modal appears.

---

### TC_SCRUM381_007 — Confirmation modal shows PwD name
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: Confirmation modal visible.
**Test Steps**:
1. Click delete.
2. Verify modal contains PwD name.
**Expected Results**:
- PwD name shown in modal.

---

### TC_SCRUM381_008 — Confirmation modal shows irreversible warning
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: Confirmation modal visible.
**Test Steps**:
1. Click delete.
2. Verify modal contains warning about irreversible action.
**Expected Results**:
- Irreversible warning shown.

---

### Feature: Cancel Action

---

### TC_SCRUM381_009 — Cancel closes modal without changes
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: Confirmation modal visible.
**Test Steps**:
1. Click delete.
2. Click Cancel in modal.
3. Verify modal closes.
4. Verify PwD still in list.
**Expected Results**:
- Modal closes, PwD remains.

---

### TC_SCRUM381_010 — PwD remains in list after cancel
**Priority**: Highest
**Related Jira Issue**: SCRUM-381
**Preconditions**: Cancel clicked on confirmation modal.
**Test Steps**:
1. After cancelling delete, verify PwD card still visible.
**Expected Results**:
- PwD still in list.

---

### Feature: Delete Action

---

### TC_SCRUM381_011 — Confirming delete removes PwD from list
**Priority**: High
**Related Jira Issue**: SCRUM-381
**Preconditions**: Confirmation modal visible.
**Test Steps**:
1. Click delete.
2. Confirm deletion.
3. Verify PwD removed from list.
**Expected Results**:
- PwD removed from list.

---

### TC_SCRUM381_012 — Success message shown after deletion
**Priority**: High
**Related Jira Issue**: SCRUM-381
**Preconditions**: Delete confirmed.
**Test Steps**:
1. After confirming delete, verify success message/toast.
**Expected Results**:
- Success message displayed.

---

### TC_SCRUM381_013 — PwD count updates after deletion
**Priority**: High
**Related Jira Issue**: SCRUM-381
**Preconditions**: PwD deleted.
**Test Steps**:
1. After deletion, verify PwD count decremented.
**Expected Results**:
- PwD count updated.

---

### Feature: Interests Retained

---

### TC_SCRUM381_014 — Product interests retained with PwD name tag after deletion
**Priority**: High
**Related Jira Issue**: SCRUM-381
**Preconditions**: PwD had product interests before deletion.
**Test Steps**:
1. After deletion, navigate to inquiries/interests.
2. Verify tagged items still reference PwD name.
**Expected Results**:
- Product interests retained with PwD tag.

---

### Feature: Edge Case — Persistence

---

### TC_SCRUM381_015 — Page refresh retains updated list after deletion
**Priority**: Medium
**Related Jira Issue**: SCRUM-381
**Preconditions**: PwD deleted.
**Test Steps**:
1. After deletion, reload page.
2. Verify deleted PwD not in list.
**Expected Results**:
- Deleted PwD not in list after refresh.

---

### Feature: Edge Case — Catalog

---

### TC_SCRUM381_016 — PwD dropdown on catalog updates after deletion
**Priority**: Medium
**Related Jira Issue**: SCRUM-381
**Preconditions**: PwD deleted.
**Test Steps**:
1. After deletion, navigate to catalog.
2. Verify deleted PwD not in dropdown.
**Expected Results**:
- Deleted PwD not in catalog dropdown.

---

### Feature: Edge Case — Multiple PwDs

---

### TC_SCRUM381_017 — Deleting one PwD keeps others in list
**Priority**: Medium
**Related Jira Issue**: SCRUM-381
**Preconditions**: Caregiver has multiple PwDs.
**Test Steps**:
1. Delete one PwD.
2. Verify other PwDs still in list.
**Expected Results**:
- Other PwDs remain.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM381_018 — Mobile viewport renders delete flow correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-381
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set mobile viewport.
2. Navigate to PwD management.
3. Verify delete icon and content visible.
**Expected Results**:
- Delete flow renders correctly on mobile.

---

### TC_SCRUM381_019 — Back navigation from PwD management works
**Priority**: Low
**Related Jira Issue**: SCRUM-381
**Preconditions**: Caregiver is on PwD management.
**Test Steps**:
1. On PwD management.
2. Go back.
3. Verify previous page loads.
**Expected Results**:
- Back navigation works.

---

### TC_SCRUM381_020 — PwD management page has correct heading
**Priority**: Lowest
**Related Jira Issue**: SCRUM-381
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
