# Functional Test Plan: SCRUM-427 — Caregiver - Feature Parity with PwD Experience

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-427](https://youth4jobs.atlassian.net//browse/SCRUM-427) |
| Status      | In QA                                        |
| Assignee    | prathamesh v                                 |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that common platform features (Product Catalog, Product Details, Success Stories, Help & Resources, FAQs) are functionally and behaviorally consistent for Caregivers compared to PwD experience. Covers: catalog parity (AC1), product detail parity (AC1), success stories parity (AC1), help & resources parity (AC1), UI consistency (AC2), caregiver-specific elements (AC2).

### Out of Scope
- Caregiver-specific features (PwD selection, wishlist, inquiries — separate stories)
- Accessibility testing
- Backend API performance testing

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Catalog page loads with filters, sort, search (AC1)              | TC_SCRUM427_001, 002, 003                 | Highest  |
| Product cards display correctly (AC1)                            | TC_SCRUM427_004                           | Highest  |
| Product detail page loads with full content (AC1)                | TC_SCRUM427_005, 006                      | Highest  |
| Success Stories page accessible and functional (AC1)             | TC_SCRUM427_007, 008                      | Highest  |
| Help & Resources page accessible (AC1)                           | TC_SCRUM427_009, 010                      | High     |
| FAQ section accessible (AC1)                                     | TC_SCRUM427_011                           | High     |
| Caregiver banner visible as caregiver-specific element (AC2)     | TC_SCRUM427_012                           | High     |
| Navigation consistent with PwD experience (AC2)                  | TC_SCRUM427_013                           | High     |
| Pagination works on catalog (AC1)                                | TC_SCRUM427_014                           | Medium   |
| Sorting works on catalog (AC1)                                   | TC_SCRUM427_015                           | Medium   |
| Search works on catalog (AC1)                                    | TC_SCRUM427_016                           | Medium   |
| Home/dashboard accessible (AC1)                                  | TC_SCRUM427_017                           | Low      |
| Mobile viewport renders pages correctly (AC2)                    | TC_SCRUM427_018                           | Low      |
| Footer links accessible (AC2)                                    | TC_SCRUM427_019                           | Lowest   |
| Header navigation consistent (AC2)                               | TC_SCRUM427_020                           | Lowest   |

---



## 3. Test Scenarios

### Feature: Catalog Parity

---

### TC_SCRUM427_001 — Catalog page loads with device count for caregiver
**Priority**: Highest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Login as caregiver.
2. Navigate to catalog.
3. Verify device count text visible.
**Expected Results**:
- Catalog page loads with device count.

---

### TC_SCRUM427_002 — Catalog filters visible for caregiver
**Priority**: Highest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Verify Disability Type, Type, Price Range dropdowns visible.
2. Verify Apply Filters and Reset All buttons visible.
**Expected Results**:
- All filter controls visible.

---

### TC_SCRUM427_003 — Catalog sort dropdown visible for caregiver
**Priority**: Highest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Verify Sort by dropdown visible with multiple options.
**Expected Results**:
- Sort dropdown visible with options.

---

### TC_SCRUM427_004 — Product cards display correctly for caregiver
**Priority**: Highest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Verify product cards visible.
2. Verify View details links present.
3. Verify product headings present.
**Expected Results**:
- Product cards with headings and View details links.

---

### Feature: Product Detail Parity

---

### TC_SCRUM427_005 — Product detail page loads for caregiver
**Priority**: Highest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Click first View details.
2. Verify URL contains /product/.
3. Verify H1 heading visible.
**Expected Results**:
- Product detail page loads with heading.

---

### TC_SCRUM427_006 — Product detail page shows price for caregiver
**Priority**: Highest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on product detail page.
**Test Steps**:
1. Navigate to product detail.
2. Verify body contains ₹ price.
**Expected Results**:
- Price in ₹ format visible.

---

### Feature: Success Stories Parity

---

### TC_SCRUM427_007 — Success Stories page accessible for caregiver
**Priority**: Highest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Navigate to Success Stories page.
2. Verify page loads with story content.
**Expected Results**:
- Success Stories page loads.

---

### TC_SCRUM427_008 — Success Stories display story cards for caregiver
**Priority**: Highest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on Success Stories page.
**Test Steps**:
1. Verify story cards or content visible.
2. Verify at least one story present.
**Expected Results**:
- Story cards visible.

---

### Feature: Help & Resources Parity

---

### TC_SCRUM427_009 — Help & Resources page accessible for caregiver
**Priority**: High
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Navigate to Help & Resources page.
2. Verify page loads with content.
**Expected Results**:
- Help & Resources page loads.

---

### TC_SCRUM427_010 — Help & Resources has resource content for caregiver
**Priority**: High
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on Help & Resources page.
**Test Steps**:
1. Verify page body contains help/resource/guide content.
**Expected Results**:
- Resource content visible.

---

### Feature: FAQ Parity

---

### TC_SCRUM427_011 — FAQ section accessible for caregiver
**Priority**: High
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Navigate to FAQ section.
2. Verify FAQ content or accordion visible.
**Expected Results**:
- FAQ section accessible.

---

### Feature: UI Consistency

---

### TC_SCRUM427_012 — Caregiver banner visible as caregiver-specific element
**Priority**: High
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Navigate to catalog.
2. Verify caregiver banner visible.
**Expected Results**:
- Caregiver banner visible.

---

### TC_SCRUM427_013 — Navigation consistent with PwD experience
**Priority**: High
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Verify header navigation links present (Catalog, Stories, Help, Profile).
**Expected Results**:
- Navigation links consistent.

---

### Feature: Catalog Parity

---

### TC_SCRUM427_014 — Pagination works on catalog for caregiver
**Priority**: Medium
**Related Jira Issue**: SCRUM-427
**Preconditions**: Catalog has multiple pages.
**Test Steps**:
1. Verify pagination visible.
2. Click Next.
3. Verify page 2 loads.
**Expected Results**:
- Pagination works.

---

### TC_SCRUM427_015 — Sorting works on catalog for caregiver
**Priority**: Medium
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Select 'Name: A to Z'.
2. Verify product order updates.
**Expected Results**:
- Sorting changes product order.

---

### TC_SCRUM427_016 — Search works on catalog for caregiver
**Priority**: Medium
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Search 'wheelchair'.
2. Apply.
3. Verify results update.
**Expected Results**:
- Search returns matching results.

---

### Feature: General Parity

---

### TC_SCRUM427_017 — Home/dashboard accessible for caregiver
**Priority**: Low
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Navigate to home page.
2. Verify page loads with content.
**Expected Results**:
- Home page loads.

---

### Feature: UI Consistency

---

### TC_SCRUM427_018 — Mobile viewport renders pages correctly for caregiver
**Priority**: Low
**Related Jira Issue**: SCRUM-427
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Navigate to catalog.
2. Set mobile viewport.
3. Verify content visible.
**Expected Results**:
- Pages render correctly on mobile.

---

### TC_SCRUM427_019 — Footer links accessible for caregiver
**Priority**: Lowest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is on any page.
**Test Steps**:
1. Scroll to footer.
2. Verify footer links present (Privacy, Terms, Accessibility).
**Expected Results**:
- Footer links accessible.

---

### TC_SCRUM427_020 — Header navigation consistent for caregiver
**Priority**: Lowest
**Related Jira Issue**: SCRUM-427
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Verify header has logo, navigation links, and user menu.
**Expected Results**:
- Header navigation consistent.

---

## Test Data

| Data Item          | Value                                    |
|--------------------|------------------------------------------|
| Caregiver email    | `cg1@yopmail.com`                        |
| Caregiver password | `cg1@141G`                               |
| Base URL           | `https://qa-atad.swarajability.org/`     |
| Desktop viewport   | 1280×720                                 |
| Mobile viewport    | 375×667                                  |
