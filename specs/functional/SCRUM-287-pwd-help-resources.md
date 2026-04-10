# SCRUM-287: PwDs Accessing Help & Resources — Functional Test Plan

## Story

As a PwD user on the AT/AD Portal, I want to access a centralized Help & Resources section that provides guides, FAQs, and direct support options, so that I can easily understand how to use the platform, find suitable assistive devices, resolve doubts independently, and reach support when needed.

## Acceptance Criteria Summary

- **AC1**: Help & Resources link in top nav bar; active state highlighted; clicking opens Help landing page without losing session
- **AC2**: Landing page shows title "Help & Resources", subtitle, search input, three tabs (Help Topics, FAQ, Contact Us) — one active at a time
- **AC3**: Search bar searches across help articles, guides, FAQs; results update on keyword; "no results found" message for no matches
- **AC4**: Help Topics tab shows categorized topic cards with category title, short description, number of articles; clicking category shows article list
- **AC5**: Article detail page shows title, category label, read time, last updated date, step-by-step content, "Back to Help Center" link, "Was this article helpful?" Yes/No, Related Articles, "Share this article"
- **AC6**: FAQ tab shows expandable accordion; each FAQ expands/collapses on click; only one expanded at a time
- **AC7**: Contact Us tab shows Email Support (email, response time, Send Email), Phone Support (number, hours, Call Now), Regional Support Centers (location + contact)
- **AC8**: Accessibility & Usability (out of scope — functional tests only)
- **AC9**: Error handling — friendly message if content unavailable; "Need more help?" / "Get in Touch" CTA
- **AC10**: Non-functional — read-only content, page load performance, responsive

## Test Suites (33 Tests)

### Suite 1: Navigation & Entry Point (AC1) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM287_001 | Help & Resources link is visible in top navigation bar |
| TC_SCRUM287_002 | Clicking Help & Resources navigates to help-center page |
| TC_SCRUM287_003 | Help & Resources nav link is visually highlighted as active on help page |
| TC_SCRUM287_004 | Help page loads within acceptable time |

### Suite 2: Landing Page Overview (AC2) — 5 tests
| ID | Title |
|---|---|
| TC_SCRUM287_005 | Page displays H1 title "Help & Resources" |
| TC_SCRUM287_006 | Page displays descriptive subtitle below title |
| TC_SCRUM287_007 | Search input is visible with correct placeholder |
| TC_SCRUM287_008 | Three tabs are present: Help Topics, FAQ, Contact Us |
| TC_SCRUM287_009 | Only one tab is active at a time |

### Suite 3: Search Functionality (AC3) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM287_010 | Search input accepts text input |
| TC_SCRUM287_011 | Typing a keyword updates visible results |
| TC_SCRUM287_012 | Searching for non-existent term shows no results message |
| TC_SCRUM287_013 | Clearing search restores original content |

### Suite 4: Help Topics Section (AC4) — 5 tests
| ID | Title |
|---|---|
| TC_SCRUM287_014 | Help Topics tab displays category cards |
| TC_SCRUM287_015 | Each category card shows title, description, and article count |
| TC_SCRUM287_016 | Clicking View articles reveals article list within category |
| TC_SCRUM287_017 | Article cards display title and description |
| TC_SCRUM287_018 | Clicking an article card navigates to article detail page |

### Suite 5: Article Detail Page (AC5) — 5 tests
| ID | Title |
|---|---|
| TC_SCRUM287_019 | Article page displays H1 title |
| TC_SCRUM287_020 | Article page shows read time and last updated date |
| TC_SCRUM287_021 | Article page has "Back to Help Center" link that navigates back |
| TC_SCRUM287_022 | Article page has step-by-step content with headings |
| TC_SCRUM287_023 | Article page has "Was this article helpful?" prompt with Yes/No options |

### Suite 6: FAQs Section (AC6) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM287_024 | FAQ tab displays "Frequently Asked Questions" heading |
| TC_SCRUM287_025 | FAQ items are displayed in accordion format |
| TC_SCRUM287_026 | Clicking a FAQ expands it to show the answer |
| TC_SCRUM287_027 | Expanding one FAQ collapses the previously expanded one |

### Suite 7: Contact Us Section (AC7) — 3 tests
| ID | Title |
|---|---|
| TC_SCRUM287_028 | Contact Us tab displays Email Support with email address and Send Email action |
| TC_SCRUM287_029 | Contact Us tab displays Phone Support with number and Call Now action |
| TC_SCRUM287_030 | Contact Us tab displays Regional Support Centers with locations and numbers |

### Suite 8: Responsive & Edge Cases (AC9/AC10) — 3 tests
| ID | Title |
|---|---|
| TC_SCRUM287_031 | Help page is accessible on mobile viewport via hamburger menu |
| TC_SCRUM287_032 | Share this article section is visible on article detail page |
| TC_SCRUM287_033 | No horizontal overflow on mobile viewport |


## 3. Test Scenarios

### Feature: Navigation & Entry Point

---

### TC_SCRUM287_001 — Help & Resources link is visible in top navigation bar
**Priority**: Highest
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Navigate to base URL.
2. Verify Help & Resources link is visible in nav.
**Expected Results**:
- Help & Resources link is visible in top navigation.

---

### TC_SCRUM287_002 — Clicking Help & Resources navigates to help-center page
**Priority**: Highest
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Click Help & Resources nav link.
2. Verify URL contains /help-center.
**Expected Results**:
- Clicking Help & Resources navigates to /help-center.

---

### TC_SCRUM287_003 — Help & Resources nav link is visually highlighted as active on help page
**Priority**: Low
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Navigate to help-center page.
2. Check Help & Resources link for active/current class.
**Expected Results**:
- Help & Resources link has active/current class.

---

### TC_SCRUM287_004 — Help page loads within acceptable time
**Priority**: Medium
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Measure navigation time to help-center page.
2. Verify loads within 5 seconds.
**Expected Results**:
- Help page loads within 5 seconds.

---

### Feature: Landing Page Overview

---

### TC_SCRUM287_005 — Page displays H1 title Help & Resources
**Priority**: Highest
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Navigate to help-center page.
2. Verify H1 text is Help & Resources.
**Expected Results**:
- H1 title 'Help & Resources' is displayed.

---

### TC_SCRUM287_006 — Page displays descriptive subtitle below title
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Navigate to help-center page.
2. Verify subtitle text is visible.
**Expected Results**:
- Descriptive subtitle is visible below title.

---

### TC_SCRUM287_007 — Search input is visible with correct placeholder
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Navigate to help-center page.
2. Verify search input is visible with placeholder text.
**Expected Results**:
- Search input is visible with placeholder text.

---

### TC_SCRUM287_008 — Three tabs are present: Help Topics, FAQ, Contact Us
**Priority**: Highest
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Navigate to help-center page.
2. Verify all three tab buttons are visible.
**Expected Results**:
- Help Topics, FAQ, and Contact Us tabs are visible.

---

### TC_SCRUM287_009 — Only one tab is active at a time
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Navigate to help-center page.
2. Click each tab and verify only one has active state.
**Expected Results**:
- Only one tab has active state at a time.

---

### Feature: Search Functionality

---

### TC_SCRUM287_010 — Search input accepts text input
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Navigate to help-center page.
2. Type text into search input.
3. Verify input value matches typed text.
**Expected Results**:
- Search input accepts text.

---

### TC_SCRUM287_011 — Typing a keyword updates visible results
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Type a keyword into search.
2. Verify visible article items update.
**Expected Results**:
- Typing a keyword updates visible results.

---

### TC_SCRUM287_012 — Searching for non-existent term shows no results message
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Type a non-existent term into search.
2. Verify no results or empty state is shown.
**Expected Results**:
- Non-existent term shows no results message.

---

### TC_SCRUM287_013 — Clearing search restores original content
**Priority**: Medium
**Related Jira Issue**: SCRUM-287
**Preconditions**: User searched for a term.
**Test Steps**:
1. Type a keyword into search.
2. Clear the search input.
3. Verify original content is restored.
**Expected Results**:
- Clearing search restores original content.

---

### Feature: Help Topics Section

---

### TC_SCRUM287_014 — Help Topics tab displays category cards
**Priority**: Highest
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Navigate to help-center page.
2. Verify Help Topics tab is active by default.
3. Verify category headings are visible.
**Expected Results**:
- Help Topics tab displays category cards.

---

### TC_SCRUM287_015 — Each category card shows title, description, and article count
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: Help Topics tab is active.
**Test Steps**:
1. Verify each category has h3 title, description text, and article count.
**Expected Results**:
- Each category shows title, description, and article count.

---

### TC_SCRUM287_016 — Clicking View articles reveals article list within category
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: Help Topics tab is active.
**Test Steps**:
1. Click View articles toggle on first category.
2. Verify article items become visible.
**Expected Results**:
- Clicking View articles reveals article list.

---

### TC_SCRUM287_017 — Article cards display title and description
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: Category articles are expanded.
**Test Steps**:
1. Expand first category articles.
2. Verify article cards have heading and description.
**Expected Results**:
- Article cards have heading and description.

---

### TC_SCRUM287_018 — Clicking an article card navigates to article detail page
**Priority**: Highest
**Related Jira Issue**: SCRUM-287
**Preconditions**: Help Topics tab is active.
**Test Steps**:
1. Click first article card link.
2. Verify URL contains /help-article/.
**Expected Results**:
- Clicking article card navigates to /help-article/.

---

### Feature: Article Detail Page

---

### TC_SCRUM287_019 — Article page displays H1 title
**Priority**: Highest
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on an article detail page.
**Test Steps**:
1. Navigate to article URL.
2. Verify H1 is visible with article title.
**Expected Results**:
- H1 title is visible with article title.

---

### TC_SCRUM287_020 — Article page shows read time and last updated date
**Priority**: Medium
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on an article detail page.
**Test Steps**:
1. Navigate to article URL.
2. Verify read time and updated date are visible.
**Expected Results**:
- Read time and last updated date are visible.

---

### TC_SCRUM287_021 — Article page has Back to Help Center link that navigates back
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on an article detail page.
**Test Steps**:
1. Navigate to article URL.
2. Verify Back to Help Center link is visible.
3. Click it and verify navigation to help-center.
**Expected Results**:
- Back to Help Center link navigates back.

---

### TC_SCRUM287_022 — Article page has step-by-step content with headings
**Priority**: Medium
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on an article detail page.
**Test Steps**:
1. Navigate to article URL.
2. Verify content headings (h3) are present.
**Expected Results**:
- Step-by-step content with h3 headings is present.

---

### TC_SCRUM287_023 — Article page has Was this article helpful prompt with Yes/No options
**Priority**: Medium
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on an article detail page.
**Test Steps**:
1. Navigate to article URL.
2. Verify helpful prompt text and Yes/No buttons are visible.
**Expected Results**:
- 'Was this article helpful' prompt with Yes/No is visible.

---

### Feature: FAQs Section

---

### TC_SCRUM287_024 — FAQ tab displays Frequently Asked Questions heading
**Priority**: Highest
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Click FAQ tab.
2. Verify Frequently Asked Questions heading is visible.
**Expected Results**:
- FAQ tab displays 'Frequently Asked Questions' heading.

---

### TC_SCRUM287_025 — FAQ items are displayed in accordion format
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: FAQ tab is active.
**Test Steps**:
1. Click FAQ tab.
2. Verify FAQ items use details/summary elements.
3. Verify at least 6 FAQ items are present.
**Expected Results**:
- FAQ items are in accordion format with at least 6 items.

---

### TC_SCRUM287_026 — Clicking a FAQ expands it to show the answer
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: FAQ tab is active.
**Test Steps**:
1. Click FAQ tab.
2. Click first FAQ summary.
3. Verify details element is open.
**Expected Results**:
- Clicking a FAQ expands it to show the answer.

---

### TC_SCRUM287_027 — Expanding one FAQ collapses the previously expanded one
**Priority**: Medium
**Related Jira Issue**: SCRUM-287
**Preconditions**: FAQ tab is active.
**Test Steps**:
1. Expand first FAQ.
2. Expand second FAQ.
3. Verify first FAQ is collapsed.
**Expected Results**:
- Expanding one FAQ collapses the previously expanded one.

---

### Feature: Contact Us Section

---

### TC_SCRUM287_028 — Contact Us tab displays Email Support with email address and Send Email action
**Priority**: Highest
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on the help-center page.
**Test Steps**:
1. Click Contact Us tab.
2. Verify Email Support heading, email address, response time, and Send Email link are visible.
**Expected Results**:
- Contact Us tab shows Email Support with email and Send Email action.

---

### TC_SCRUM287_029 — Contact Us tab displays Phone Support with number and Call Now action
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: Contact Us tab is active.
**Test Steps**:
1. Click Contact Us tab.
2. Verify Phone Support heading, phone number, hours, and Call Now link are visible.
**Expected Results**:
- Phone Support with number and Call Now action is visible.

---

### TC_SCRUM287_030 — Contact Us tab displays Regional Support Centers with locations and numbers
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: Contact Us tab is active.
**Test Steps**:
1. Click Contact Us tab.
2. Verify Regional Support Centers heading and at least 3 locations with phone numbers.
**Expected Results**:
- Regional Support Centers with locations and numbers are visible.

---

### Feature: Responsive & Edge Cases

---

### TC_SCRUM287_031 — Help page is accessible on mobile viewport via hamburger menu
**Priority**: High
**Related Jira Issue**: SCRUM-287
**Preconditions**: Browser viewport set to mobile (375x667).
**Test Steps**:
1. Set viewport to mobile.
2. Open hamburger menu.
3. Verify Help & Resources link is visible.
4. Click it and verify navigation.
**Expected Results**:
- Help page is accessible via hamburger menu on mobile.

---

### TC_SCRUM287_032 — Share this article section is visible on article detail page
**Priority**: Low
**Related Jira Issue**: SCRUM-287
**Preconditions**: User is on an article detail page.
**Test Steps**:
1. Navigate to article URL.
2. Verify Share this story heading is visible.
**Expected Results**:
- 'Share this article' section is visible.

---

### TC_SCRUM287_033 — No horizontal overflow on mobile viewport
**Priority**: Lowest
**Related Jira Issue**: SCRUM-287
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set viewport to mobile.
2. Navigate to help-center page.
3. Verify body scrollWidth does not exceed viewport.
**Expected Results**:
- No horizontal overflow on mobile.

---
