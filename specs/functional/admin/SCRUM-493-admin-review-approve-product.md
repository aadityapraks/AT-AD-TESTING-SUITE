# Functional Test Plan: SCRUM-493 — Admin - Review & Approve New Product Submission

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2026-04-13                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-493](https://youth4jobs.atlassian.net//browse/SCRUM-493) |
| Status      | In Progress                                  |
| Assignee    | Mayank Bamania                               |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that an Admin user can review new product submissions, view full product details, approve products with optional notes, and see correct status transitions. Covers New Submissions tab, product detail dialog, approval confirmation modal, impact summary, approval notes, status change, and edge cases.

### Out of Scope
- Reject product flow (covered by SCRUM-496)
- Vendor notification delivery verification
- Backend API performance testing
- Accessibility testing

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)         | Priority |
|------------------------------------------------------------------|----------------------|----------|
| Products under New Submissions show status Under Review          | TC_001–003           | Highest  |
| Admin can click View Details to see full product information     | TC_004–007           | Highest  |
| Clicking Approve shows approval confirmation modal               | TC_008–011           | Highest  |
| Admin can add optional approval notes                            | TC_012–013           | High     |
| On confirmation: status changes, product moves                   | TC_014–017           | Highest  |
| Pagination and edge cases                                        | TC_018–020           | Medium   |

---

## 3. Test Scenarios

### Feature: New Submissions Tab

---

### TC_SCRUM493_001 — New Submissions Tab is Visible
**Priority**: Highest
**Preconditions**: Admin is logged in on Product Management page.
**Test Steps**:
1. Navigate to Product Management.
2. Verify "New Submissions" tab is visible.
**Expected Results**:
- "New Submissions" tab is visible.

---

### TC_SCRUM493_002 — New Submissions Tab Shows Product Count
**Priority**: High
**Preconditions**: Admin is on Product Management page.
**Test Steps**:
1. Observe the "New Submissions" tab.
**Expected Results**:
- Tab shows a numeric count.

---

### TC_SCRUM493_003 — Products Show Under Review Status
**Priority**: Highest
**Preconditions**: Admin clicks "New Submissions" tab.
**Test Steps**:
1. Click "New Submissions" tab.
2. Observe first product card.
**Expected Results**:
- Product card displays "Under Review" status.

---

### Feature: Product Detail Dialog

---

### TC_SCRUM493_004 — View Details Opens Product Detail Dialog
**Priority**: Highest
**Preconditions**: Admin is on New Submissions tab.
**Test Steps**:
1. Click "View Details" on first product.
**Expected Results**:
- Dialog with heading "Product Details" opens.

---

### TC_SCRUM493_005 — Dialog Shows Product Name
**Priority**: High
**Preconditions**: Product detail dialog is open.
**Test Steps**:
1. Observe dialog content.
**Expected Results**:
- Product name is displayed as H3 heading.

---

### TC_SCRUM493_006 — Dialog Shows Status Badge
**Priority**: High
**Preconditions**: Product detail dialog is open.
**Test Steps**:
1. Observe status badge.
**Expected Results**:
- Status shows "Under Review".

---

### TC_SCRUM493_007 — Dialog Shows Price and Stock
**Priority**: High
**Preconditions**: Product detail dialog is open.
**Test Steps**:
1. Observe price and stock sections.
**Expected Results**:
- Price with ₹ and stock quantity displayed.

---

### Feature: Approve Flow

---

### TC_SCRUM493_008 — Approve Product Button is Visible
**Priority**: Highest
**Preconditions**: Product detail dialog is open.
**Test Steps**:
1. Observe dialog footer.
**Expected Results**:
- "Approve Product" button is visible.

---

### TC_SCRUM493_009 — Clicking Approve Opens Confirmation Modal
**Priority**: Highest
**Preconditions**: Product detail dialog is open.
**Test Steps**:
1. Click "Approve Product".
**Expected Results**:
- Dialog with heading "Approve Product" opens.

---

### TC_SCRUM493_010 — Confirmation Modal Shows Product Name
**Priority**: High
**Preconditions**: Approval confirmation modal is open.
**Test Steps**:
1. Observe modal subtitle.
**Expected Results**:
- Subtitle contains product name.

---

### TC_SCRUM493_011 — Confirmation Modal Shows Impact Summary
**Priority**: High
**Preconditions**: Approval confirmation modal is open.
**Test Steps**:
1. Observe impact summary list.
**Expected Results**:
- List contains vendor access/credentials items.

---

### Feature: Approval Notes

---

### TC_SCRUM493_012 — Approval Notes Textbox is Visible
**Priority**: High
**Preconditions**: Approval confirmation modal is open.
**Test Steps**:
1. Observe notes section.
**Expected Results**:
- Textbox labeled "Approval Notes (Optional)" is visible.

---

### TC_SCRUM493_013 — Approval Notes Accepts Input
**Priority**: High
**Preconditions**: Approval confirmation modal is open.
**Test Steps**:
1. Type text into notes textbox.
**Expected Results**:
- Text is accepted and displayed.

---

### Feature: Confirm & Cancel

---

### TC_SCRUM493_014 — Confirm Approval Button is Visible
**Priority**: Highest
**Preconditions**: Approval confirmation modal is open.
**Test Steps**:
1. Observe modal footer.
**Expected Results**:
- "Confirm Approval" button is visible.

---

### TC_SCRUM493_015 — Cancel Button is Visible
**Priority**: High
**Preconditions**: Approval confirmation modal is open.
**Test Steps**:
1. Observe modal footer.
**Expected Results**:
- "Cancel" button is visible.

---

### TC_SCRUM493_016 — Cancel Returns from Confirmation Modal
**Priority**: High
**Preconditions**: Approval confirmation modal is open.
**Test Steps**:
1. Click "Cancel".
**Expected Results**:
- Modal closes without approving.

---

### TC_SCRUM493_017 — Product Disappears After Approval
**Priority**: Highest
**Preconditions**: Approval confirmation modal is open.
**Test Steps**:
1. Click "Confirm Approval".
2. Observe New Submissions.
**Expected Results**:
- Product removed from New Submissions.

---

### Feature: Pagination & Edge Cases

---

### TC_SCRUM493_018 — Pagination is Visible on New Submissions
**Priority**: Medium
**Preconditions**: New Submissions has multiple pages.
**Test Steps**:
1. Observe pagination controls.
**Expected Results**:
- Pagination with Next/Previous is visible.

---

### TC_SCRUM493_019 — All Products Tab Shows Total Count
**Priority**: Medium
**Preconditions**: Admin is on Product Management page.
**Test Steps**:
1. Observe "All Products" tab.
**Expected Results**:
- Tab shows a numeric count.

---

### TC_SCRUM493_020 — Close Button on Detail Dialog Works
**Priority**: Medium
**Preconditions**: Product detail dialog is open.
**Test Steps**:
1. Click close button.
**Expected Results**:
- Dialog closes.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Admin Portal URL                 | `https://hub-ui-admin-qa.swarajability.org/`             |
| Admin Email                      | `pv@mailto.plus`                                         |
| Admin Password                   | `23456789`                                               |
| Product Management URL           | `https://hub-ui-admin-qa.swarajability.org/admin/products` |
| Desktop viewport                 | 1280×720                                                 |
| Tablet viewport                  | 768×1024                                                 |
| Mobile viewport                  | 375×667                                                  |

---

## 5. Assumptions & Dependencies

- Admin user `pv@mailto.plus` has admin role with product management permissions.
- SSO login via `auth-d.swarajability.org` is required.
- New Submissions tab contains products with "Under Review" status.
- Approving a product is a destructive action — TC_017 will actually approve a product.
- The admin portal is an Angular SPA at `hub-ui-admin-qa.swarajability.org`.
