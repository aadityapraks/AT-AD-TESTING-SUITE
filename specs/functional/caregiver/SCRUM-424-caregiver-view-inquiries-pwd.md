# Functional Test Plan: SCRUM-424 — Caregiver - View Product Inquiries Tagged to a PwD

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-424](https://youth4jobs.atlassian.net//browse/SCRUM-424) |
| Status      | In QA                                        |
| Assignee    | prathamesh v                                 |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that a caregiver can view product inquiries tagged to a PwD from the Caregiver Profile. Covers: inquiries accessible from profile (AC1), inquiry details display (AC2), inquiry count (AC3), read-only (AC4), mandatory PwD tagging (AC5). Edge cases: empty inquiries, no PwDs.

### Out of Scope
- Creating new inquiries (covered by SCRUM-405/411)
- PwD deletion scenarios (destructive)
- Vendor data change scenarios (backend-dependent)
- Network failure retry (cannot simulate reliably)

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Inquiries accessible from Caregiver Profile (AC1)                | TC_SCRUM424_001, 002, 003                 | Highest  |
| Inquiries section has heading/title                              | TC_SCRUM424_004                           | Highest  |
| Inquiry displays product name (AC2)                              | TC_SCRUM424_005                           | Highest  |
| Inquiry displays inquiry date (AC2)                              | TC_SCRUM424_006                           | Highest  |
| Inquiry displays PwD name tag (AC2)                              | TC_SCRUM424_007                           | Highest  |
| Inquiry displays vendor details (AC2)                            | TC_SCRUM424_008                           | Highest  |
| Inquiry displays product image (AC2)                             | TC_SCRUM424_009                           | High     |
| Inquiry count displayed at section level (AC3)                   | TC_SCRUM424_010                           | High     |
| Inquiries are read-only (AC4)                                    | TC_SCRUM424_011, 012                      | High     |
| PwD tagging mandatory and visible (AC5)                          | TC_SCRUM424_013                           | High     |
| Empty inquiries shows empty state (EC)                           | TC_SCRUM424_014, 015                      | Medium   |
| Inquiries persist across page refresh                            | TC_SCRUM424_016                           | Medium   |
| Mobile viewport renders inquiries correctly                      | TC_SCRUM424_017                           | Low      |
| Back navigation from inquiries works                             | TC_SCRUM424_018                           | Low      |
| Inquiries page has correct heading                               | TC_SCRUM424_019                           | Lowest   |
| Page refresh retains inquiry content                             | TC_SCRUM424_020                           | Lowest   |

---

## 3–6. (See JSON and spec for full details)



## 3. Test Scenarios

### Feature: Inquiries Access from Profile

---

### TC_SCRUM424_001 — Caregiver can navigate to profile page
**Priority**: Highest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Login as caregiver.
2. Navigate to profile page.
3. Verify profile content visible.
**Expected Results**:
- Profile page loads.

---

### TC_SCRUM424_002 — Inquiries tab/link visible on profile page
**Priority**: Highest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Caregiver is on profile page.
**Test Steps**:
1. On profile page.
2. Verify Inquiries tab/link visible.
**Expected Results**:
- Inquiries tab is visible.

---

### TC_SCRUM424_003 — Clicking Inquiries tab shows inquiries content
**Priority**: Highest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Caregiver is on profile page.
**Test Steps**:
1. Click Inquiries tab.
2. Verify inquiries content loads.
**Expected Results**:
- Inquiries section is displayed.

---

### TC_SCRUM424_004 — Inquiries section has heading or title
**Priority**: Highest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Caregiver is on inquiries section.
**Test Steps**:
1. Navigate to inquiries.
2. Verify heading contains 'inquir'.
**Expected Results**:
- Inquiries heading visible.

---

### Feature: Inquiry Details

---

### TC_SCRUM424_005 — Inquiry displays product name
**Priority**: Highest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items.
**Test Steps**:
1. Navigate to inquiries.
2. Verify items have product names.
**Expected Results**:
- Product names visible.

---

### TC_SCRUM424_006 — Inquiry displays inquiry date
**Priority**: Highest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items.
**Test Steps**:
1. Navigate to inquiries.
2. Verify items show date/timestamp.
**Expected Results**:
- Inquiry date visible.

---

### TC_SCRUM424_007 — Inquiry displays PwD name tag
**Priority**: Highest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items tagged to PwD.
**Test Steps**:
1. Navigate to inquiries.
2. Verify items have PwD name tag.
**Expected Results**:
- PwD name tag visible.

---

### TC_SCRUM424_008 — Inquiry displays vendor details
**Priority**: Highest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items.
**Test Steps**:
1. Navigate to inquiries.
2. Verify items show vendor name, email, phone, or website.
**Expected Results**:
- Vendor details visible.

---

### TC_SCRUM424_009 — Inquiry displays product image
**Priority**: High
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items.
**Test Steps**:
1. Navigate to inquiries.
2. Verify items have product images.
**Expected Results**:
- Product images visible.

---

### Feature: Inquiry Count

---

### TC_SCRUM424_010 — Inquiry count displayed at section level
**Priority**: High
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section loaded.
**Test Steps**:
1. Navigate to inquiries.
2. Verify count text or item count visible.
**Expected Results**:
- Inquiry count reflects total.

---

### Feature: Read-Only Inquiries

---

### TC_SCRUM424_011 — Inquiries are read-only — no edit button
**Priority**: High
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items.
**Test Steps**:
1. Navigate to inquiries.
2. Verify no Edit or Delete buttons on inquiry items.
**Expected Results**:
- No edit/delete buttons present.

---

### TC_SCRUM424_012 — Inquiries are read-only — no delete button
**Priority**: High
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items.
**Test Steps**:
1. Navigate to inquiries.
2. Verify no Delete or Remove action on inquiry items.
**Expected Results**:
- No delete/remove action present.

---

### Feature: PwD Tagging

---

### TC_SCRUM424_013 — PwD tagging mandatory and always visible
**Priority**: High
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items.
**Test Steps**:
1. Navigate to inquiries.
2. Verify each inquiry has a PwD tag visible.
**Expected Results**:
- PwD tag visible on every inquiry.

---

### Feature: Edge Case — Empty State

---

### TC_SCRUM424_014 — Empty inquiries shows empty state message
**Priority**: Medium
**Related Jira Issue**: SCRUM-424
**Preconditions**: No inquiries exist.
**Test Steps**:
1. Navigate to inquiries.
2. If empty, verify empty state message.
**Expected Results**:
- Empty state message shown.

---

### TC_SCRUM424_015 — No PwDs shows appropriate state
**Priority**: Medium
**Related Jira Issue**: SCRUM-424
**Preconditions**: Caregiver has no PwDs.
**Test Steps**:
1. Navigate to inquiries.
2. If no PwDs, verify appropriate message.
**Expected Results**:
- Appropriate state shown.

---

### Feature: Session Persistence

---

### TC_SCRUM424_016 — Inquiries persist across page refresh
**Priority**: Medium
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items.
**Test Steps**:
1. View inquiries.
2. Reload page.
3. Verify inquiries still visible.
**Expected Results**:
- Inquiries persist after reload.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM424_017 — Mobile viewport renders inquiries correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-424
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Navigate to inquiries.
2. Set mobile viewport.
3. Verify content visible.
**Expected Results**:
- Inquiries render correctly on mobile.

---

### TC_SCRUM424_018 — Back navigation from inquiries works
**Priority**: Low
**Related Jira Issue**: SCRUM-424
**Preconditions**: Caregiver is on inquiries section.
**Test Steps**:
1. Navigate to inquiries.
2. Go back.
3. Verify previous page loads.
**Expected Results**:
- Back navigation works.

---

### TC_SCRUM424_019 — Inquiries page has correct heading
**Priority**: Lowest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Caregiver is on inquiries section.
**Test Steps**:
1. Verify heading contains 'inquir' or profile name.
**Expected Results**:
- Correct heading displayed.

---

### TC_SCRUM424_020 — Page refresh retains inquiry content
**Priority**: Lowest
**Related Jira Issue**: SCRUM-424
**Preconditions**: Inquiries section has items.
**Test Steps**:
1. View inquiries.
2. Reload.
3. Verify content retained.
**Expected Results**:
- Content retained after refresh.

---

## Test Data

| Data Item          | Value                                    |
|--------------------|------------------------------------------|
| Caregiver email    | `cg1@yopmail.com`                        |
| Caregiver password | `cg1@141G`                               |
| Base URL           | `https://qa-atad.swarajability.org/`     |
| Desktop viewport   | 1280×720                                 |
| Mobile viewport    | 375×667                                  |
