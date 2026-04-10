# Functional Test Plan: SCRUM-387 — Caregiver - Edit PwD Profile Created by Caregiver (Pre-Login to SwarajAbility)

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-387](https://youth4jobs.atlassian.net//browse/SCRUM-387) |
| Status      | In QA                                        |
| Assignee    | Aaditya Prakash                              |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that a caregiver can edit PwD profiles they created, before the PwD logs into SwarajAbility. Covers: `<New>` label on caregiver-created PwDs (AC1), Edit Profile enabled (AC2), editable fields (AC3), save changes (AC4), updated details reflected (AC5). Edge cases: mandatory field validation, cancel edit.

### Out of Scope
- Concurrent edit conflict (cannot simulate)
- Partial save rollback (backend-dependent)
- Session loss mid-edit (cannot simulate)
- Audit log verification (backend)

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Profile page accessible, PwD list visible                        | TC_SCRUM387_001, 002, 003                 | Highest  |
| Caregiver-created PwD marked as New (AC1)                        | TC_SCRUM387_004, 005                      | Highest  |
| Edit Profile enabled for caregiver-created PwD (AC2)             | TC_SCRUM387_006, 007                      | Highest  |
| Editable fields: name, DOB, gender, contact, disability (AC3)   | TC_SCRUM387_008, 009                      | Highest  |
| Save changes successfully (AC4)                                  | TC_SCRUM387_010, 011                      | Highest  |
| Updated details reflected on PwD list and profile (AC5)          | TC_SCRUM387_012                           | High     |
| Cancel edit discards changes                                     | TC_SCRUM387_013, 014                      | High     |
| Mandatory field validation (EC)                                  | TC_SCRUM387_015                           | High     |
| Page refresh retains saved state                                 | TC_SCRUM387_016                           | Medium   |
| PwD usable for recommendations after edit                        | TC_SCRUM387_017                           | Medium   |
| Mobile viewport renders edit correctly                           | TC_SCRUM387_018                           | Low      |
| Back navigation works                                            | TC_SCRUM387_019                           | Low      |
| Page has correct heading                                         | TC_SCRUM387_020                           | Lowest   |

---



## 3. Test Scenarios

### Feature: Profile Access

---

### TC_SCRUM387_001 — Caregiver can navigate to profile page
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Login as caregiver.
2. Navigate to profile page.
3. Verify profile content visible.
**Expected Results**:
- Profile page loads.

---

### TC_SCRUM387_002 — PwD management section accessible
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: Caregiver is on profile page.
**Test Steps**:
1. On profile page.
2. Verify PwD management section visible.
**Expected Results**:
- PwD management section accessible.

---

### TC_SCRUM387_003 — PwD profiles list is visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: Caregiver has PwDs linked.
**Test Steps**:
1. Navigate to PwD management.
2. Verify list of PwD profiles visible.
**Expected Results**:
- PwD profiles list visible.

---

### Feature: New Label

---

### TC_SCRUM387_004 — Caregiver-created PwD marked as New
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: PwD was created by caregiver and has not logged in.
**Test Steps**:
1. View PwD list.
2. Verify caregiver-created PwD has 'New' label/badge.
**Expected Results**:
- 'New' label visible on caregiver-created PwD.

---

### TC_SCRUM387_005 — New label distinguishes caregiver-created PwDs
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: PwD list visible.
**Test Steps**:
1. View PwD list.
2. Verify New label is visually distinct.
**Expected Results**:
- New label is visually distinct.

---

### Feature: Edit Enabled

---

### TC_SCRUM387_006 — Edit Profile enabled for caregiver-created PwD
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: PwD has not logged into SwarajAbility.
**Test Steps**:
1. Click on caregiver-created PwD.
2. Verify Edit Profile button is visible and enabled.
**Expected Results**:
- Edit Profile button enabled.

---

### TC_SCRUM387_007 — Clicking Edit Profile opens edit mode
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: Viewing caregiver-created PwD profile.
**Test Steps**:
1. Click Edit Profile.
2. Verify form fields become editable.
**Expected Results**:
- Edit mode opens with editable fields.

---

### Feature: Editable Fields

---

### TC_SCRUM387_008 — Editable fields include name, DOB, gender, disability
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: In edit mode for caregiver-created PwD.
**Test Steps**:
1. Click Edit Profile.
2. Verify fields for name, DOB, gender, disability are present.
**Expected Results**:
- Personal and disability fields present.

---

### TC_SCRUM387_009 — Editable fields include contact and address
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: In edit mode for caregiver-created PwD.
**Test Steps**:
1. Click Edit Profile.
2. Verify fields for email, phone, address/location are present.
**Expected Results**:
- Contact and address fields present.

---

### Feature: Save Changes

---

### TC_SCRUM387_010 — Save Changes button visible in edit mode
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: In edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Verify Save Changes button visible.
**Expected Results**:
- Save Changes button visible.

---

### TC_SCRUM387_011 — Clicking Save Changes shows success confirmation
**Priority**: Highest
**Related Jira Issue**: SCRUM-387
**Preconditions**: In edit mode with valid data.
**Test Steps**:
1. Click Edit Profile.
2. Click Save Changes.
3. Verify success message.
**Expected Results**:
- Success confirmation shown.

---

### Feature: Updated Details Reflected

---

### TC_SCRUM387_012 — Updated details reflected on PwD list and profile view
**Priority**: High
**Related Jira Issue**: SCRUM-387
**Preconditions**: Changes saved successfully.
**Test Steps**:
1. After saving, verify PwD list shows updated info.
2. Verify profile view shows updated info.
**Expected Results**:
- Updated details reflected.

---

### Feature: Cancel Edit

---

### TC_SCRUM387_013 — Cancel button visible in edit mode
**Priority**: High
**Related Jira Issue**: SCRUM-387
**Preconditions**: In edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Verify Cancel button visible.
**Expected Results**:
- Cancel button visible.

---

### TC_SCRUM387_014 — Clicking Cancel discards unsaved changes
**Priority**: High
**Related Jira Issue**: SCRUM-387
**Preconditions**: In edit mode with unsaved changes.
**Test Steps**:
1. Click Edit Profile.
2. Make a change.
3. Click Cancel.
4. Verify profile reverts.
**Expected Results**:
- Unsaved changes discarded.

---

### Feature: Validation

---

### TC_SCRUM387_015 — Mandatory field validation on save
**Priority**: High
**Related Jira Issue**: SCRUM-387
**Preconditions**: In edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Clear a mandatory field.
3. Click Save.
4. Verify validation error.
**Expected Results**:
- Validation error shown for empty mandatory field.

---

### Feature: Edge Case — Persistence

---

### TC_SCRUM387_016 — Page refresh retains saved state
**Priority**: Medium
**Related Jira Issue**: SCRUM-387
**Preconditions**: Changes saved successfully.
**Test Steps**:
1. After saving, reload page.
2. Verify saved values retained.
**Expected Results**:
- Saved state persists after refresh.

---

### Feature: Edge Case — Usability

---

### TC_SCRUM387_017 — PwD usable for recommendations after edit
**Priority**: Medium
**Related Jira Issue**: SCRUM-387
**Preconditions**: PwD profile edited and saved.
**Test Steps**:
1. After editing PwD, navigate to catalog.
2. Verify PwD appears in dropdown for recommendations.
**Expected Results**:
- Edited PwD available in recommendations dropdown.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM387_018 — Mobile viewport renders edit mode correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-387
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Navigate to PwD edit.
2. Set mobile viewport.
3. Verify content visible.
**Expected Results**:
- Edit mode renders correctly on mobile.

---

### TC_SCRUM387_019 — Back navigation from PwD profile works
**Priority**: Low
**Related Jira Issue**: SCRUM-387
**Preconditions**: Caregiver is on PwD profile.
**Test Steps**:
1. On PwD profile.
2. Go back.
3. Verify previous page loads.
**Expected Results**:
- Back navigation works.

---

### TC_SCRUM387_020 — Profile page has correct heading
**Priority**: Lowest
**Related Jira Issue**: SCRUM-387
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
