# Functional Test Plan: SCRUM-499 — Admin - Review & Approve Product Edit Requests

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2026-04-13                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-499](https://youth4jobs.atlassian.net//browse/SCRUM-499) |
| Status      | In Progress                                  |
| Assignee    | Mayank Bamania                               |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that an Admin can review product edit requests under the Pending Edits tab, compare old vs new values, approve changes, and verify the product is removed from the pending list. Covers Pending Edits tab, product cards with edit info, Compare Changes dialog, current vs proposed diff, approve action, and edge cases.

### Out of Scope
- New product submission approval/rejection (SCRUM-493/496)
- Vendor notification delivery verification
- Backend API performance testing
- Accessibility testing

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)         | Priority |
|------------------------------------------------------------------|----------------------|----------|
| Products with edits appear under Pending Edits                   | TC_001–003           | Highest  |
| Product card shows Pending Edit Request and submission date      | TC_004–006           | High     |
| Clicking Compare Changes highlights old vs new values            | TC_007–011           | Highest  |
| Admin can Approve Edit → Changes applied                         | TC_012–014           | Highest  |
| Cancel/close compare dialog without action                       | TC_015–017           | High     |
| Edge cases                                                       | TC_018–020           | Medium   |

---

## 3. Test Scenarios

### TC_SCRUM499_001 — Pending Edits Tab is Visible
**Priority**: Highest | **Preconditions**: Admin on Product Management page.
**Steps**: 1. Observe tabs. **Expected**: "Pending Edits" tab is visible.

### TC_SCRUM499_002 — Pending Edits Tab Shows Count
**Priority**: High | **Preconditions**: Admin on Product Management page.
**Steps**: 1. Observe tab badge. **Expected**: Tab shows numeric count.

### TC_SCRUM499_003 — Pending Edits Tab Lists Products with Edits
**Priority**: Highest | **Preconditions**: Admin clicks Pending Edits tab.
**Steps**: 1. Click tab. 2. Observe product cards. **Expected**: Product cards are listed.

### TC_SCRUM499_004 — Product Card Shows Pending Edit Request Label
**Priority**: High | **Preconditions**: Admin on Pending Edits tab.
**Steps**: 1. Observe first product card. **Expected**: "Pending Edit Request" text visible.

### TC_SCRUM499_005 — Product Card Shows Submission Date
**Priority**: High | **Preconditions**: Admin on Pending Edits tab.
**Steps**: 1. Observe first product card. **Expected**: "Submitted on" date visible.

### TC_SCRUM499_006 — Product Card Shows Compare Changes Link
**Priority**: High | **Preconditions**: Admin on Pending Edits tab.
**Steps**: 1. Observe first product card. **Expected**: "Compare changes →" button visible.

### TC_SCRUM499_007 — Compare Changes Button is Visible
**Priority**: Highest | **Preconditions**: Admin on Pending Edits tab.
**Steps**: 1. Observe product card buttons. **Expected**: "Compare Changes" button visible.

### TC_SCRUM499_008 — Clicking Compare Changes Opens Dialog
**Priority**: Highest | **Preconditions**: Admin on Pending Edits tab.
**Steps**: 1. Click "Compare Changes". **Expected**: Dialog with heading "Compare Product Changes" opens.

### TC_SCRUM499_009 — Compare Dialog Shows Current vs Proposed Columns
**Priority**: Highest | **Preconditions**: Compare dialog is open.
**Steps**: 1. Observe dialog content. **Expected**: "Current" and "Proposed" sections visible.

### TC_SCRUM499_010 — Compare Dialog Shows Changed Field Values
**Priority**: High | **Preconditions**: Compare dialog is open.
**Steps**: 1. Observe diff content. **Expected**: At least one field with old/new values displayed.

### TC_SCRUM499_011 — Compare Dialog Shows Review Subtitle
**Priority**: Medium | **Preconditions**: Compare dialog is open.
**Steps**: 1. Observe subtitle. **Expected**: "Review changes requested by vendor" text visible.

### TC_SCRUM499_012 — Approve Changes Button is Visible
**Priority**: Highest | **Preconditions**: Compare dialog is open.
**Steps**: 1. Observe dialog footer. **Expected**: "Approve Changes" button visible.

### TC_SCRUM499_013 — Approve Changes Button is Clickable
**Priority**: Highest | **Preconditions**: Compare dialog is open.
**Steps**: 1. Verify button is enabled. **Expected**: Button is enabled.

### TC_SCRUM499_014 — Product Removed from Pending Edits After Approval
**Priority**: High | **Preconditions**: Admin clicks Approve Changes.
**Steps**: 1. Click "Approve Changes". 2. Observe Pending Edits tab. **Expected**: Product removed from list.

### TC_SCRUM499_015 — Close Button is Visible in Compare Dialog
**Priority**: High | **Preconditions**: Compare dialog is open.
**Steps**: 1. Observe dialog footer. **Expected**: "Close" button visible.

### TC_SCRUM499_016 — Close Button Closes Compare Dialog
**Priority**: High | **Preconditions**: Compare dialog is open.
**Steps**: 1. Click "Close". **Expected**: Dialog closes without approving.

### TC_SCRUM499_017 — Close (×) Button Closes Compare Dialog
**Priority**: Medium | **Preconditions**: Compare dialog is open.
**Steps**: 1. Click × button. **Expected**: Dialog closes.

### TC_SCRUM499_018 — View Details Button is Visible on Pending Edit Card
**Priority**: Medium | **Preconditions**: Admin on Pending Edits tab.
**Steps**: 1. Observe product card. **Expected**: "View Details" button visible.

### TC_SCRUM499_019 — Pagination is Visible on Pending Edits
**Priority**: Medium | **Preconditions**: Pending Edits has multiple pages.
**Steps**: 1. Observe pagination. **Expected**: Pagination controls visible.

### TC_SCRUM499_020 — Product Card Shows Approved Status Badge
**Priority**: Medium | **Preconditions**: Admin on Pending Edits tab.
**Steps**: 1. Observe product card status. **Expected**: Status badge shows "Approved".

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Admin Portal URL                 | `https://hub-ui-admin-qa.swarajability.org/`             |
| Admin Email                      | `pv@mailto.plus`                                         |
| Admin Password                   | `23456789`                                               |

---

## 5. Assumptions & Dependencies

- Admin user has product management permissions.
- Pending Edits tab contains products with edit requests.
- Approving changes is a destructive action — TC_014 will apply changes.
