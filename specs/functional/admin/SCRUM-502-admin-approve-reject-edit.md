# Functional Test Plan: SCRUM-502 — Admin - Approve or Reject Edit Request

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2026-04-13                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-502](https://youth4jobs.atlassian.net//browse/SCRUM-502) |
| Status      | In Progress                                  |
| Assignee    | Mayank Bamania                               |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that an Admin can approve or reject product edit requests independently from product approval. Covers the Approve Edit and Reject Edit buttons in the product detail dialog for pending edits, the reject edit modal with mandatory reason, disabled confirm when empty, and product retaining previous values on rejection.

### Out of Scope
- New product submission approval/rejection (SCRUM-493/496)
- Compare Changes diff view (SCRUM-499)
- Vendor notification delivery verification
- Accessibility testing

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)         | Priority |
|------------------------------------------------------------------|----------------------|----------|
| Detail dialog shows Approve Edit and Reject Edit buttons         | TC_001–003           | Highest  |
| Approve Edit applies changes, product remains Approved           | TC_004–005           | Highest  |
| Reject Edit requires rejection reason                            | TC_006–009           | Highest  |
| Confirm Rejection disabled when reason empty                     | TC_010–012           | Highest  |
| Reject edit modal shows vendor notification info                 | TC_013–014           | High     |
| Cancel/close reject edit modal                                   | TC_015–017           | High     |
| Edge cases                                                       | TC_018–020           | Medium   |

---

## 3. Test Scenarios

### TC_SCRUM502_001 — Approve Edit Button Visible in Detail Dialog
**Priority**: Highest | **Preconditions**: Admin opens View Details on a Pending Edit product.
**Steps**: 1. Observe dialog footer. **Expected**: "Approve Edit" button visible.

### TC_SCRUM502_002 — Reject Edit Button Visible in Detail Dialog
**Priority**: Highest | **Preconditions**: Detail dialog open for pending edit product.
**Steps**: 1. Observe dialog footer. **Expected**: "Reject Edit" button visible.

### TC_SCRUM502_003 — Compare Changes Button Visible in Detail Dialog
**Priority**: High | **Preconditions**: Detail dialog open for pending edit product.
**Steps**: 1. Observe dialog footer. **Expected**: "Compare Changes" button visible.

### TC_SCRUM502_004 — Approve Edit Button is Clickable
**Priority**: Highest | **Preconditions**: Detail dialog open for pending edit product.
**Steps**: 1. Verify button is enabled. **Expected**: Button is enabled.

### TC_SCRUM502_005 — Product Removed from Pending Edits After Approve Edit
**Priority**: Highest | **Preconditions**: Admin clicks Approve Edit.
**Steps**: 1. Click "Approve Edit". 2. Observe Pending Edits. **Expected**: Product removed from list.

### TC_SCRUM502_006 — Clicking Reject Edit Opens Rejection Modal
**Priority**: Highest | **Preconditions**: Detail dialog open for pending edit product.
**Steps**: 1. Click "Reject Edit". **Expected**: Dialog "Reject Product Edit" opens.

### TC_SCRUM502_007 — Reject Edit Modal Shows Product Name
**Priority**: High | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Observe subtitle. **Expected**: Subtitle contains product name.

### TC_SCRUM502_008 — Rejection Reason Textbox is Visible
**Priority**: Highest | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Observe reason field. **Expected**: Textbox "Rejection Reason *" visible.

### TC_SCRUM502_009 — Rejection Reason is Marked as Required
**Priority**: Highest | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Observe label. **Expected**: Label contains asterisk (*).

### TC_SCRUM502_010 — Confirm Rejection Disabled When Reason Empty
**Priority**: Highest | **Preconditions**: Reject edit modal open with empty reason.
**Steps**: 1. Observe button state. **Expected**: Button is disabled.

### TC_SCRUM502_011 — Confirm Rejection Enables After Entering Reason
**Priority**: Highest | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Type reason. 2. Observe button. **Expected**: Button becomes enabled.

### TC_SCRUM502_012 — Confirm Rejection Disables When Reason Cleared
**Priority**: High | **Preconditions**: Reject edit modal with reason entered.
**Steps**: 1. Clear reason. 2. Observe button. **Expected**: Button becomes disabled.

### TC_SCRUM502_013 — Modal Shows Vendor Notification Info
**Priority**: High | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Observe info text. **Expected**: Text mentions vendor will be notified.

### TC_SCRUM502_014 — Modal Shows Resubmission Info
**Priority**: High | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Observe info text. **Expected**: Text mentions vendor can resubmit.

### TC_SCRUM502_015 — Cancel Button is Visible
**Priority**: High | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Observe footer. **Expected**: "Cancel" button visible.

### TC_SCRUM502_016 — Cancel Closes Modal Without Rejecting
**Priority**: High | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Click Cancel. **Expected**: Modal closes.

### TC_SCRUM502_017 — Close (×) Button Closes Modal
**Priority**: Medium | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Click × button. **Expected**: Modal closes.

### TC_SCRUM502_018 — Reason Accepts Special Characters
**Priority**: Medium | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Enter special characters. **Expected**: Accepted.

### TC_SCRUM502_019 — Reason Accepts Long Text
**Priority**: Medium | **Preconditions**: Reject edit modal is open.
**Steps**: 1. Enter 200+ characters. **Expected**: Accepted.

### TC_SCRUM502_020 — Product Detail Dialog Shows Approved Status
**Priority**: Medium | **Preconditions**: Detail dialog open for pending edit product.
**Steps**: 1. Observe status badge. **Expected**: Status shows "Approved".

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Admin Portal URL                 | `https://hub-ui-admin-qa.swarajability.org/`             |
| Admin Email                      | `pv@mailto.plus`                                         |
| Admin Password                   | `23456789`                                               |

---

## 5. Assumptions & Dependencies

- Pending Edits tab contains products with edit requests.
- Approve Edit and Reject Edit are destructive actions.
- Rejection reason is mandatory — Confirm Rejection disabled when empty.
