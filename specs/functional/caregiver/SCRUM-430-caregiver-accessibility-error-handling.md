# Functional Test Plan: SCRUM-430 — Caregiver - Accessibility & Error Handling

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-430](https://youth4jobs.atlassian.net//browse/SCRUM-430) |
| Status      | In QA                                        |
| Assignee    | Aaditya Prakash                              |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate WCAG 2.1 compliance (keyboard navigation, screen-reader labels, focus states, dark mode) and error handling (clear messages, graceful failures) for the caregiver experience across catalog, product detail, and profile pages.

### Out of Scope
- Full WCAG audit (separate accessibility story)
- Network failure simulation (cannot reliably simulate)
- Session timeout simulation

---

## 2. Requirements Traceability Matrix (19 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Keyboard navigation on catalog (AC1)                             | TC_SCRUM430_001, 002                      | Highest  |
| Screen-reader labels on catalog (AC1)                            | TC_SCRUM430_003, 004                      | Highest  |
| Focus states visible on interactive elements (AC1)               | TC_SCRUM430_005, 006                      | Highest  |
| Dark mode toggle works (AC1)                                     | TC_SCRUM430_007, 008                      | Highest  |
| Keyboard navigation on product detail (AC1)                      | TC_SCRUM430_009                           | High     |
| Screen-reader labels on product detail (AC1)                     | TC_SCRUM430_010                           | High     |
| ARIA roles on caregiver-specific elements (AC1)                  | TC_SCRUM430_011                           | High     |
| Error messages are clear (AC2)                                   | TC_SCRUM430_012                           | High     |
| Form validation shows actionable errors (AC2)                    | TC_SCRUM430_013                           | Medium   |
| 404 page handles gracefully (AC3)                                | TC_SCRUM430_014                           | Medium   |
| Empty state messages are user-friendly (AC3)                     | TC_SCRUM430_015                           | Medium   |
| Skip navigation link present (AC1)                               | TC_SCRUM430_016                           | Low      |
| Images have alt text (AC1)                                       | TC_SCRUM430_017                           | Low      |
| Color contrast sufficient (AC1)                                  | TC_SCRUM430_018                           | Lowest   |
| Language attribute set on HTML (AC1)                              | TC_SCRUM430_019                           | Lowest   |

---



## 3. Test Scenarios

### Feature: Keyboard Navigation

---

### TC_SCRUM430_001 — Catalog page is keyboard navigable — Tab moves focus
**Priority**: Highest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Login as caregiver.
2. Navigate to catalog.
3. Press Tab repeatedly.
4. Verify focus moves through interactive elements.
**Expected Results**:
- Tab key moves focus through interactive elements.

---

### TC_SCRUM430_002 — Catalog filters operable via keyboard
**Priority**: Highest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Tab to filter dropdowns.
2. Use arrow keys to select option.
3. Tab to Apply Filters.
4. Press Enter.
**Expected Results**:
- Filters operable via keyboard.

---

### Feature: Screen-Reader Labels

---

### TC_SCRUM430_003 — Search bar has accessible label
**Priority**: Highest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Verify search bar has aria-label or associated label element.
**Expected Results**:
- Search bar has accessible label.

---

### TC_SCRUM430_004 — Filter dropdowns have accessible labels
**Priority**: Highest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Verify each filter dropdown has aria-label or label element.
**Expected Results**:
- Filter dropdowns have accessible labels.

---

### Feature: Focus States

---

### TC_SCRUM430_005 — Focus indicator visible on buttons
**Priority**: Highest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Tab to Apply Filters button.
2. Verify visible focus indicator (outline/ring).
**Expected Results**:
- Focus indicator visible on buttons.

---

### TC_SCRUM430_006 — Focus indicator visible on links
**Priority**: Highest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Tab to View details link.
2. Verify visible focus indicator.
**Expected Results**:
- Focus indicator visible on links.

---

### Feature: Dark Mode

---

### TC_SCRUM430_007 — Dark mode toggle exists and is functional
**Priority**: Highest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on any page.
**Test Steps**:
1. Locate dark mode toggle.
2. Click it.
3. Verify page switches to dark mode.
**Expected Results**:
- Dark mode toggle works.

---

### TC_SCRUM430_008 — Dark mode applies to catalog page
**Priority**: Highest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Dark mode is enabled.
**Test Steps**:
1. Enable dark mode.
2. Navigate to catalog.
3. Verify dark-mode class on HTML element.
**Expected Results**:
- Dark mode applied to catalog.

---

### Feature: Keyboard Navigation

---

### TC_SCRUM430_009 — Product detail page is keyboard navigable
**Priority**: High
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on product detail page.
**Test Steps**:
1. Navigate to product detail.
2. Press Tab.
3. Verify focus moves through elements.
**Expected Results**:
- Product detail page keyboard navigable.

---

### Feature: Screen-Reader Labels

---

### TC_SCRUM430_010 — Product detail page has screen-reader labels
**Priority**: High
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on product detail page.
**Test Steps**:
1. Navigate to product detail.
2. Verify H1 heading exists.
3. Verify images have alt text.
**Expected Results**:
- Screen-reader labels present.

---

### TC_SCRUM430_011 — Caregiver-specific elements have ARIA roles
**Priority**: High
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Navigate to catalog.
2. Verify caregiver banner has appropriate role or label.
3. Verify PwD dropdown has aria attributes.
**Expected Results**:
- Caregiver elements have ARIA roles.

---

### Feature: Error Messages

---

### TC_SCRUM430_012 — Zero search results shows clear message
**Priority**: High
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Search 'xyznonexistent99999'.
2. Apply.
3. Verify clear empty state message.
**Expected Results**:
- Clear empty state message shown.

---

### TC_SCRUM430_013 — Form validation shows actionable errors
**Priority**: Medium
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is in profile edit mode.
**Test Steps**:
1. Navigate to profile edit.
2. Clear a required field.
3. Submit.
4. Verify inline error message.
**Expected Results**:
- Actionable inline error shown.

---

### Feature: Graceful Error Handling

---

### TC_SCRUM430_014 — 404 page handles gracefully
**Priority**: Medium
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Navigate to invalid URL.
2. Verify 404 or error page loads.
3. Verify page has navigation back to home.
**Expected Results**:
- 404 page shown with navigation.

---

### TC_SCRUM430_015 — Empty state messages are user-friendly
**Priority**: Medium
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on an empty section.
**Test Steps**:
1. Navigate to wishlist or inquiries.
2. If empty, verify user-friendly empty state message.
**Expected Results**:
- User-friendly empty state message.

---

### Feature: Keyboard Navigation

---

### TC_SCRUM430_016 — Skip navigation link present
**Priority**: Low
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on any page.
**Test Steps**:
1. Press Tab on page load.
2. Verify 'Skip to content' or similar link appears.
**Expected Results**:
- Skip navigation link present.

---

### Feature: Screen-Reader Labels

---

### TC_SCRUM430_017 — Images have alt text
**Priority**: Low
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Navigate to catalog.
2. Verify product images have alt attributes.
**Expected Results**:
- Images have alt text.

---

### Feature: Visual Accessibility

---

### TC_SCRUM430_018 — Color contrast sufficient on catalog page
**Priority**: Lowest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on catalog page.
**Test Steps**:
1. Navigate to catalog.
2. Verify text is readable against background.
**Expected Results**:
- Color contrast is sufficient.

---

### TC_SCRUM430_019 — Language attribute set on HTML element
**Priority**: Lowest
**Related Jira Issue**: SCRUM-430
**Preconditions**: Caregiver is on any page.
**Test Steps**:
1. Verify HTML element has lang attribute set.
**Expected Results**:
- HTML lang attribute is set.

---

## Test Data

| Data Item          | Value                                    |
|--------------------|------------------------------------------|
| Caregiver email    | `cg1@yopmail.com`                        |
| Caregiver password | `cg1@141G`                               |
| Base URL           | `https://qa-atad.swarajability.org/`     |
| Desktop viewport   | 1280×720                                 |
| Mobile viewport    | 375×667                                  |
