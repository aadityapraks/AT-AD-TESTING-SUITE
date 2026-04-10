# Functional Test Plan: SCRUM-496 — Admin - Reject New Product Submission

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2026-04-13                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-496](https://youth4jobs.atlassian.net//browse/SCRUM-496) |
| Status      | In Progress                                  |
| Assignee    | Mayank Bamania                               |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that an Admin user can reject a new product submission with a mandatory reason, see the rejection confirmation modal with vendor notification info, and verify the product is removed from the active review list after rejection. Covers rejection modal, mandatory reason field, disabled confirm button when empty, cancel/close actions, validation, and edge cases.

### Out of Scope
- Approve product flow (covered by SCRUM-493)
- Vendor notification delivery verification
- Backend API performance testing
- Accessibility testing

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)         | Priority |
|------------------------------------------------------------------|----------------------|----------|
| Clicking Reject opens rejection modal                            | TC_001–003           | Highest  |
| Rejection reason field is mandatory                              | TC_004–007           | Highest  |
| System informs: vendor notified, can resubmit                    | TC_008–009           | High     |
| Confirm Rejection disabled when reason empty                     | TC_010–012           | Highest  |
| On confirmation: product removed from list                       | TC_013–014           | Highest  |
| Cancel/close modal without action                                | TC_015–017           | High     |
| Validation and edge cases                                        | TC_018–020           | Medium   |

---

## 3. Test Scenarios

### Feature: Reject Button & Modal

---

### TC_SCRUM496_001 — Reject Product Button is Visible
**Priority**: Highest
**Preconditions**: Admin has opened product detail dialog from New Submissions.
**Test Steps**:
1. Observe dialog footer buttons.
**Expected Results**:
- "Reject Product" button is visible.

---

### TC_SCRUM496_002 — Clicking Reject Opens Rejection Modal
**Priority**: Highest
**Preconditions**: Product detail dialog is open.
**Test Steps**:
1. Click "Reject Product".
**Expected Results**:
- Dialog with heading "Reject Product" opens.

---

### TC_SCRUM496_003 — Rejection Modal Shows Product Name
**Priority**: High
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Observe modal subtitle.
**Expected Results**:
- Subtitle contains product name.

---

### Feature: Rejection Reason

---

### TC_SCRUM496_004 — Rejection Reason Textbox is Visible
**Priority**: Highest
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Observe reason field.
**Expected Results**:
- Textbox labeled "Rejection Reason *" is visible.

---

### TC_SCRUM496_005 — Rejection Reason is Marked as Required
**Priority**: Highest
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Observe label.
**Expected Results**:
- Label contains asterisk (*).

---

### TC_SCRUM496_006 — Rejection Reason Accepts Input
**Priority**: High
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Type text into reason textbox.
**Expected Results**:
- Text is accepted and displayed.

---

### TC_SCRUM496_007 — Rejection Reason is Initially Empty
**Priority**: Medium
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Observe textbox value.
**Expected Results**:
- Textbox is empty.

---

### Feature: Vendor Info

---

### TC_SCRUM496_008 — Modal Shows Vendor Notification Info
**Priority**: High
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Observe info text.
**Expected Results**:
- Text mentions vendor will be notified.

---

### TC_SCRUM496_009 — Modal Shows Resubmission Info
**Priority**: High
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Observe info text.
**Expected Results**:
- Text mentions vendor can resubmit.

---

### Feature: Button State

---

### TC_SCRUM496_010 — Confirm Rejection Disabled When Reason Empty
**Priority**: Highest
**Preconditions**: Rejection modal open with empty reason.
**Test Steps**:
1. Observe button state.
**Expected Results**:
- Button is disabled.

---

### TC_SCRUM496_011 — Confirm Rejection Enables After Entering Reason
**Priority**: Highest
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Type a reason.
2. Observe button state.
**Expected Results**:
- Button becomes enabled.

---

### TC_SCRUM496_012 — Confirm Rejection Disables When Reason Cleared
**Priority**: High
**Preconditions**: Rejection modal with reason entered.
**Test Steps**:
1. Clear reason.
2. Observe button state.
**Expected Results**:
- Button becomes disabled.

---

### Feature: Confirm Rejection

---

### TC_SCRUM496_013 — Confirm Rejection is Clickable With Reason
**Priority**: Highest
**Preconditions**: Rejection modal with reason entered.
**Test Steps**:
1. Enter reason.
2. Observe button.
**Expected Results**:
- Button is enabled.

---

### TC_SCRUM496_014 — Product Removed After Rejection
**Priority**: High
**Preconditions**: Admin confirms rejection.
**Test Steps**:
1. Enter reason.
2. Click Confirm Rejection.
**Expected Results**:
- Product removed from New Submissions.

---

### Feature: Cancel/Close

---

### TC_SCRUM496_015 — Cancel Button is Visible
**Priority**: High
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Observe modal footer.
**Expected Results**:
- "Cancel" button is visible.

---

### TC_SCRUM496_016 — Cancel Closes Modal Without Rejecting
**Priority**: High
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Click Cancel.
**Expected Results**:
- Modal closes.

---

### TC_SCRUM496_017 — Close Button Closes Modal Without Rejecting
**Priority**: Medium
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Click close button.
**Expected Results**:
- Modal closes.

---

### Feature: Validation & Edge Cases

---

### TC_SCRUM496_018 — Reason Accepts Special Characters
**Priority**: Medium
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Enter text with special characters.
**Expected Results**:
- Special characters accepted.

---

### TC_SCRUM496_019 — Reason Accepts Long Text
**Priority**: Medium
**Preconditions**: Rejection modal is open.
**Test Steps**:
1. Enter 200+ characters.
**Expected Results**:
- Long text accepted.

---

### TC_SCRUM496_020 — Reopening Modal After Cancel Shows Empty Reason
**Priority**: Medium
**Preconditions**: Admin cancelled previous rejection.
**Test Steps**:
1. Open modal.
2. Enter reason.
3. Cancel.
4. Reopen.
**Expected Results**:
- Reason field is empty on reopen.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Admin Portal URL                 | `https://hub-ui-admin-qa.swarajability.org/`             |
| Admin Email                      | `pv@mailto.plus`                                         |
| Admin Password                   | `23456789`                                               |
| Desktop viewport                 | 1280×720                                                 |
| Tablet viewport                  | 768×1024                                                 |
| Mobile viewport                  | 375×667                                                  |

---

## 5. Assumptions & Dependencies

- Admin user has product management permissions.
- New Submissions tab contains products with "Under Review" status.
- Rejecting a product is a destructive action — TC_014 will actually reject a product.
- The rejection reason field is mandatory — Confirm Rejection is disabled when empty.
