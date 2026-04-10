# Functional Test Plan: SCRUM-83 — PwD - View Product Reviews and Ratings

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-15                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-83](https://youth4jobs.atlassian.net//browse/SCRUM-83) |
| Status      | In QA                                        |
| Assignee    | Kunal Tainwala                               |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that a PwD user can view product reviews and ratings on the product details page. Covers: average rating display, reviews tab access, review list content (reviewer name, star rating, text, date), no reviews placeholder, submit review form, form validation, and responsive layout.

### Out of Scope
- Accessibility testing (ARIA labels, screen reader, focus management) — covered separately
- Review moderation/admin functionality
- Backend review storage

---

## 2. Requirements Traceability Matrix (33 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Average rating visible near top of product page                  | TC_SCRUM83_001, 002, 003, 004, 005        | Highest  |
| Reviews tab accessible and shows content                         | TC_SCRUM83_006, 007, 008, 009             | Highest  |
| Review list shows reviewer name, rating, text, date              | TC_SCRUM83_010, 011, 012, 013, 014, 015   | Highest  |
| No reviews placeholder shown when empty                          | TC_SCRUM83_016, 017                       | High     |
| Submit review form with rating and text                          | TC_SCRUM83_018, 019, 020, 021, 022, 023, 024, 025 | Highest |
| Form validation (empty rating, empty text, char limit)           | TC_SCRUM83_026, 027, 028, 029             | Medium   |
| Responsive layout for mobile and tablet                          | TC_SCRUM83_030, 031, 032, 033             | High     |

---

## 3. Test Scenarios

### Feature: Average Rating Display

---

### TC_SCRUM83_001 — Average rating is visible near top of product page
**Priority**: Highest
**Related Jira Issue**: SCRUM-83
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate to product page.
2. Verify rating value is visible.
**Expected Results**:
- Average rating value is visible near top.

---

### TC_SCRUM83_002 — Rating value is between 0 and 5
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: User is on the product page.
**Test Steps**:
1. Read rating text.
2. Verify it parses to 0-5.
**Expected Results**:
- Rating value parses to a number between 0 and 5.

---

### TC_SCRUM83_003 — Star icon is displayed next to rating
**Priority**: Medium
**Related Jira Issue**: SCRUM-83
**Preconditions**: User is on the product page.
**Test Steps**:
1. Verify star SVG icon near rating.
**Expected Results**:
- Star SVG icon is displayed next to rating.

---

### TC_SCRUM83_004 — Review count is displayed near rating
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: User is on the product page.
**Test Steps**:
1. Verify review count text is visible.
**Expected Results**:
- Review count text is visible near rating.

---

### TC_SCRUM83_005 — Review count shows number in parentheses
**Priority**: Low
**Related Jira Issue**: SCRUM-83
**Preconditions**: User is on the product page.
**Test Steps**:
1. Read review count.
2. Verify format like (N reviews).
**Expected Results**:
- Review count shows number in parentheses format.

---

### Feature: Reviews Tab Access

---

### TC_SCRUM83_006 — Reviews tab is present in product tabs
**Priority**: Highest
**Related Jira Issue**: SCRUM-83
**Preconditions**: User is on the product details page.
**Test Steps**:
1. Verify Reviews tab exists.
**Expected Results**:
- Reviews tab exists in product tabs.

---

### TC_SCRUM83_007 — Clicking Reviews tab shows review content
**Priority**: Highest
**Related Jira Issue**: SCRUM-83
**Preconditions**: User is on the product details page.
**Test Steps**:
1. Click Reviews tab.
2. Verify panel visible.
**Expected Results**:
- Clicking Reviews tab shows review content panel.

---

### TC_SCRUM83_008 — Reviews tab panel is visible after click
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is clicked.
**Test Steps**:
1. Click Reviews tab.
2. Verify tab panel visible.
**Expected Results**:
- Tab panel is visible.

---

### TC_SCRUM83_009 — Reviews tab content is non-empty
**Priority**: Medium
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Click Reviews tab.
2. Verify content text length > 0.
**Expected Results**:
- Content text length > 0.

---

### Feature: Review List Content

---

### TC_SCRUM83_010 — Each review shows reviewer name or anonymous
**Priority**: Highest
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Click Reviews tab.
2. Verify each review has a name.
**Expected Results**:
- Each review shows a reviewer name or anonymous.

---

### TC_SCRUM83_011 — Each review shows star rating
**Priority**: Highest
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Verify each review has star rating.
**Expected Results**:
- Each review shows a star rating.

---

### TC_SCRUM83_012 — Each review shows review text
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Verify each review has text content.
**Expected Results**:
- Each review has text content.

---

### TC_SCRUM83_013 — Each review shows date posted
**Priority**: Medium
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Verify each review has a date.
**Expected Results**:
- Each review has a date.

---

### TC_SCRUM83_014 — Star ratings are between 1 and 5
**Priority**: Low
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Parse star count from each review.
2. Verify 1-5 range.
**Expected Results**:
- Star count is between 1 and 5.

---

### TC_SCRUM83_015 — Reviews are listed newest first
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Read dates from reviews.
2. Verify descending order.
**Expected Results**:
- Reviews are listed in descending date order (newest first).

---

### Feature: No Reviews Placeholder

---

### TC_SCRUM83_016 — Product with no reviews shows placeholder text
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: User is on a product with no reviews.
**Test Steps**:
1. Find product with no reviews.
2. Verify placeholder visible.
**Expected Results**:
- Placeholder text is visible.

---

### TC_SCRUM83_017 — Placeholder contains "No reviews yet" or similar
**Priority**: Low
**Related Jira Issue**: SCRUM-83
**Preconditions**: User is on a product with no reviews.
**Test Steps**:
1. Read placeholder text.
2. Verify it says no reviews.
**Expected Results**:
- Placeholder says "No reviews yet" or similar.

---

### Feature: Submit Review Form

---

### TC_SCRUM83_018 — Write a review button or form is visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Click Reviews tab.
2. Verify write review option visible.
**Expected Results**:
- Write a review button or form is visible.

---

### TC_SCRUM83_019 — Review text box is present
**Priority**: Highest
**Related Jira Issue**: SCRUM-83
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Verify textarea or text input for review.
**Expected Results**:
- Textarea or text input for review is present.

---

### TC_SCRUM83_020 — Text box accepts text input
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review form is visible.
**Test Steps**:
1. Type text into review box.
2. Verify text appears.
**Expected Results**:
- Typed text appears in the text box.

---

### TC_SCRUM83_021 — Star rating selector is present in form
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review form is visible.
**Test Steps**:
1. Verify star rating input in review form.
**Expected Results**:
- Star rating input is present in the form.

---

### TC_SCRUM83_022 — Submit button is present
**Priority**: Highest
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review form is visible.
**Test Steps**:
1. Verify Submit button visible.
**Expected Results**:
- Submit button is visible.

---

### TC_SCRUM83_023 — Text box accepts up to 700 characters
**Priority**: Medium
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review form is visible.
**Test Steps**:
1. Type 700 chars.
2. Verify accepted.
**Expected Results**:
- Text box accepts up to 700 characters.

---

### TC_SCRUM83_024 — Submit with valid rating and text succeeds
**Priority**: Highest
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review form is filled with valid data.
**Test Steps**:
1. Select rating.
2. Type review.
3. Click Submit.
4. Verify success.
**Expected Results**:
- Submission succeeds.

---

### TC_SCRUM83_025 — Review count updates after submission
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review was submitted.
**Test Steps**:
1. Note count before.
2. Submit review.
3. Verify count incremented.
**Expected Results**:
- Review count increments after submission.

---

### Feature: Form Validation

---

### TC_SCRUM83_026 — Submit without rating shows error or is prevented
**Priority**: Medium
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review form has text but no rating.
**Test Steps**:
1. Type text but no rating.
2. Click Submit.
3. Verify error or prevention.
**Expected Results**:
- Error shown or submission prevented.

---

### TC_SCRUM83_027 — Submit with empty text is handled
**Priority**: Medium
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review form has rating but no text.
**Test Steps**:
1. Select rating but no text.
2. Click Submit.
3. Verify behavior.
**Expected Results**:
- Behavior is handled gracefully.

---

### TC_SCRUM83_028 — Text box does not accept beyond character limit
**Priority**: Low
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review form is visible.
**Test Steps**:
1. Type 701+ chars.
2. Verify truncated or blocked.
**Expected Results**:
- Text beyond 700 chars is truncated or blocked.

---

### TC_SCRUM83_029 — Submit button is disabled or hidden when form is invalid
**Priority**: Lowest
**Related Jira Issue**: SCRUM-83
**Preconditions**: Review form is empty.
**Test Steps**:
1. Leave form empty.
2. Check Submit button state.
**Expected Results**:
- Submit button is disabled or hidden.

---

### Feature: Responsive

---

### TC_SCRUM83_030 — Reviews tab renders on mobile viewport
**Priority**: High
**Related Jira Issue**: SCRUM-83
**Preconditions**: Browser viewport set to mobile (375x667).
**Test Steps**:
1. Set viewport to mobile.
2. Click Reviews tab.
3. Verify visible.
**Expected Results**:
- Reviews tab content is visible on mobile.

---

### TC_SCRUM83_031 — Reviews tab renders on tablet viewport
**Priority**: Medium
**Related Jira Issue**: SCRUM-83
**Preconditions**: Browser viewport set to tablet (768x1024).
**Test Steps**:
1. Set viewport to tablet.
2. Click Reviews tab.
3. Verify visible.
**Expected Results**:
- Reviews tab content is visible on tablet.

---

### TC_SCRUM83_032 — Review form is usable on mobile
**Priority**: Lowest
**Related Jira Issue**: SCRUM-83
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set viewport to mobile.
2. Verify text box and submit visible.
**Expected Results**:
- Review form text box and submit are visible.

---

### TC_SCRUM83_033 — No horizontal overflow on mobile
**Priority**: Low
**Related Jira Issue**: SCRUM-83
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set viewport to mobile.
2. Check body scroll width.
**Expected Results**:
- No horizontal overflow on mobile.

---

## 4. Test Data Requirements

| Data Item          | Value                                    |
|--------------------|------------------------------------------|
| PwD email          | `candidate8new1@mailto.plus`             |
| PwD password       | `123456`                                 |
| Base URL           | `https://qa-atad.swarajability.org/`     |
| Catalog URL        | `https://qa-atad.swarajability.org/catalog/` |
| Desktop viewport   | 1280×720                                 |
| Tablet viewport    | 768×1024                                 |
| Mobile viewport    | 375×667                                  |

---

## 5. Assumptions & Dependencies

- Product page has a Reviews tab with review list and submit form.
- Average rating (0-5) and review count are displayed near the top of the product page.
- Each review shows reviewer name, star rating, review text, and date.
- Products with no reviews show a placeholder message.
- Review form has star rating selector, text box (up to 700 chars), and submit button.
- Reviews are listed newest first.
- Layout is responsive across desktop, tablet, and mobile viewports.
