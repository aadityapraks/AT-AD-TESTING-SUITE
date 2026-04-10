# SCRUM-81: PwD - Explore Product Tabs (Features, Reviews Etc) — Functional Test Plan

## Story
**As a** PwD user,
**I want to** switch between information tabs,
**so that** I can explore detailed information easily.

## Tabs
1. Features
2. Technical and Accessibility
3. Buying Guide
4. Reviews
5. Raise a Query

## Test Suites & Cases (33 Functional Tests)

### Suite 1: Tab Presence & Structure (6 tests)
| ID | Title | Priority |
|---|---|---|
| TC_SCRUM81_001 | All five tabs are visible on product details page | Highest |
| TC_SCRUM81_002 | Features tab is present | High |
| TC_SCRUM81_003 | Technical and Accessibility tab is present | High |
| TC_SCRUM81_004 | Buying Guide tab is present | High |
| TC_SCRUM81_005 | Reviews tab is present | High |
| TC_SCRUM81_006 | Raise a Query tab is present | High |

### Suite 2: Tab Switching Behavior (6 tests)
| ID | Title | Priority |
|---|---|---|
| TC_SCRUM81_007 | First tab is active by default | Highest |
| TC_SCRUM81_008 | Clicking a tab makes it active | Highest |
| TC_SCRUM81_009 | Only one tab content is visible at a time | Highest |
| TC_SCRUM81_010 | Tab switching does not reload the page | High |
| TC_SCRUM81_011 | Active tab is visually highlighted | Medium |
| TC_SCRUM81_012 | Switching all tabs sequentially works | High |

### Suite 3: Features Tab Content (4 tests)
| ID | Title | Priority |
|---|---|---|
| TC_SCRUM81_013 | Features tab displays content when active | Highest |
| TC_SCRUM81_014 | Features tab shows key product features | High |
| TC_SCRUM81_015 | Features tab has "Who is it for" section | Medium |
| TC_SCRUM81_016 | Features tab content is non-empty | Low |

### Suite 4: Technical and Accessibility Tab Content (4 tests)
| ID | Title | Priority |
|---|---|---|
| TC_SCRUM81_017 | Technical and Accessibility tab displays content | Highest |
| TC_SCRUM81_018 | Technical specifications section is visible | High |
| TC_SCRUM81_019 | Accessibility features section is visible | High |
| TC_SCRUM81_020 | Technical tab content is non-empty | Low |

### Suite 5: Buying Guide Tab Content (3 tests)
| ID | Title | Priority |
|---|---|---|
| TC_SCRUM81_021 | Buying Guide tab displays content | Highest |
| TC_SCRUM81_022 | "Before you Buy" section is visible | Medium |
| TC_SCRUM81_023 | Buying Guide content is non-empty | Low |

### Suite 6: Reviews Tab Content (4 tests)
| ID | Title | Priority |
|---|---|---|
| TC_SCRUM81_024 | Reviews tab displays content | Highest |
| TC_SCRUM81_025 | Reviews section shows ratings or "No reviews yet" | High |
| TC_SCRUM81_026 | Write a review option is available | Medium |
| TC_SCRUM81_027 | Reviews tab content is non-empty | Low |

### Suite 7: Raise a Query Tab Content (3 tests)
| ID | Title | Priority |
|---|---|---|
| TC_SCRUM81_028 | Raise a Query tab displays content | Highest |
| TC_SCRUM81_029 | Ask the assistive partner section is visible | Medium |
| TC_SCRUM81_030 | Raise a Query content is non-empty | Lowest |

### Suite 8: Responsive & Edge Cases (3 tests)
| ID | Title | Priority |
|---|---|---|
| TC_SCRUM81_031 | Tabs render correctly on mobile viewport | High |
| TC_SCRUM81_032 | Tabs render correctly on tablet viewport | Medium |
| TC_SCRUM81_033 | Tab content persists after page refresh | Lowest |


## 3. Test Scenarios

### Feature: Tab Presence & Structure

---

### TC_SCRUM81_001 — All five tabs are visible on product details page
**Priority**: Highest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is logged in and on a product details page.
**Test Steps**:
1. Log in as PwD user.
2. Navigate to catalog.
3. Click View Details on a product.
4. Verify all 5 tabs are visible.
**Expected Results**:
- All 5 tabs are visible.

---

### TC_SCRUM81_002 — Features tab is present
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Verify Features tab exists.
**Expected Results**:
- Features tab exists.

---

### TC_SCRUM81_003 — Technical and Accessibility tab is present
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Verify Technical and Accessibility tab exists.
**Expected Results**:
- Technical and Accessibility tab exists.

---

### TC_SCRUM81_004 — Buying Guide tab is present
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Verify Buying Guide tab exists.
**Expected Results**:
- Buying Guide tab exists.

---

### TC_SCRUM81_005 — Reviews tab is present
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Verify Reviews tab exists.
**Expected Results**:
- Reviews tab exists.

---

### TC_SCRUM81_006 — Raise a Query tab is present
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Verify Raise a Query tab exists.
**Expected Results**:
- Raise a Query tab exists.

---

### Feature: Tab Switching Behavior

---

### TC_SCRUM81_007 — First tab is active by default
**Priority**: Highest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Verify the first tab is active by default.
**Expected Results**:
- First tab is active by default.

---

### TC_SCRUM81_008 — Clicking a tab makes it active
**Priority**: Highest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Click the second tab.
3. Verify it becomes active.
**Expected Results**:
- Clicking a tab makes it active.

---

### TC_SCRUM81_009 — Only one tab content is visible at a time
**Priority**: Highest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Click each tab.
3. Verify only one tab panel is visible at a time.
**Expected Results**:
- Only one tab content panel is visible at a time.

---

### TC_SCRUM81_010 — Tab switching does not reload the page
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Note the URL.
3. Click a different tab.
4. Verify URL has not changed.
**Expected Results**:
- URL does not change when switching tabs.

---

### TC_SCRUM81_011 — Active tab is visually highlighted
**Priority**: Medium
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Click a tab.
3. Verify the active tab has distinct visual styling.
**Expected Results**:
- Active tab has distinct visual styling.

---

### TC_SCRUM81_012 — Switching all tabs sequentially works
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Click each of the 5 tabs in order.
3. Verify each becomes active and shows content.
**Expected Results**:
- Each of the 5 tabs becomes active and shows content.

---

### Feature: Features Tab Content

---

### TC_SCRUM81_013 — Features tab displays content when active
**Priority**: Highest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to product details page.
2. Click Features tab.
3. Verify content panel is visible.
**Expected Results**:
- Features tab content panel is visible when active.

---

### TC_SCRUM81_014 — Features tab shows key product features
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: Features tab is active.
**Test Steps**:
1. Click Features tab.
2. Verify feature list or feature text is displayed.
**Expected Results**:
- Feature list or feature text is displayed.

---

### TC_SCRUM81_015 — Features tab has Who is it for section
**Priority**: Medium
**Related Jira Issue**: SCRUM-81
**Preconditions**: Features tab is active.
**Test Steps**:
1. Click Features tab.
2. Verify 'Who is it for' section or similar heading is present.
**Expected Results**:
- 'Who is it for' section or similar heading is present.

---

### TC_SCRUM81_016 — Features tab content is non-empty
**Priority**: Low
**Related Jira Issue**: SCRUM-81
**Preconditions**: Features tab is active.
**Test Steps**:
1. Click Features tab.
2. Verify the content area has non-empty text.
**Expected Results**:
- Content area has non-empty text.

---

### Feature: Technical and Accessibility Tab Content

---

### TC_SCRUM81_017 — Technical and Accessibility tab displays content
**Priority**: Highest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Click Technical and Accessibility tab.
2. Verify content panel is visible.
**Expected Results**:
- Technical and Accessibility tab content is visible when active.

---

### TC_SCRUM81_018 — Technical specifications section is visible
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: Technical and Accessibility tab is active.
**Test Steps**:
1. Click Technical and Accessibility tab.
2. Verify technical specifications content is displayed.
**Expected Results**:
- Technical specifications content is displayed.

---

### TC_SCRUM81_019 — Accessibility features section is visible
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: Technical and Accessibility tab is active.
**Test Steps**:
1. Click Technical and Accessibility tab.
2. Verify accessibility features content is displayed.
**Expected Results**:
- Accessibility features content is displayed.

---

### TC_SCRUM81_020 — Technical tab content is non-empty
**Priority**: Low
**Related Jira Issue**: SCRUM-81
**Preconditions**: Technical and Accessibility tab is active.
**Test Steps**:
1. Click Technical and Accessibility tab.
2. Verify the content area has non-empty text.
**Expected Results**:
- Content area has non-empty text.

---

### Feature: Buying Guide Tab Content

---

### TC_SCRUM81_021 — Buying Guide tab displays content
**Priority**: Highest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Click Buying Guide tab.
2. Verify content panel is visible.
**Expected Results**:
- Buying Guide tab content is visible when active.

---

### TC_SCRUM81_022 — Before you Buy section is visible
**Priority**: Medium
**Related Jira Issue**: SCRUM-81
**Preconditions**: Buying Guide tab is active.
**Test Steps**:
1. Click Buying Guide tab.
2. Verify 'Before you Buy' section or similar content is present.
**Expected Results**:
- 'Before you Buy' section or similar content is present.

---

### TC_SCRUM81_023 — Buying Guide content is non-empty
**Priority**: Low
**Related Jira Issue**: SCRUM-81
**Preconditions**: Buying Guide tab is active.
**Test Steps**:
1. Click Buying Guide tab.
2. Verify the content area has non-empty text.
**Expected Results**:
- Content area has non-empty text.

---

### Feature: Reviews Tab Content

---

### TC_SCRUM81_024 — Reviews tab displays content
**Priority**: Highest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Click Reviews tab.
2. Verify content panel is visible.
**Expected Results**:
- Reviews tab content is visible when active.

---

### TC_SCRUM81_025 — Reviews section shows ratings or No reviews yet
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Click Reviews tab.
2. Verify either user reviews/ratings are shown or 'No reviews yet' message is displayed.
**Expected Results**:
- User reviews/ratings or 'No reviews yet' message is displayed.

---

### TC_SCRUM81_026 — Write a review option is available
**Priority**: Medium
**Related Jira Issue**: SCRUM-81
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Click Reviews tab.
2. Verify a 'Write a review' button or link is present.
**Expected Results**:
- 'Write a review' button or link is present.

---

### TC_SCRUM81_027 — Reviews tab content is non-empty
**Priority**: Low
**Related Jira Issue**: SCRUM-81
**Preconditions**: Reviews tab is active.
**Test Steps**:
1. Click Reviews tab.
2. Verify the content area has non-empty text.
**Expected Results**:
- Content area has non-empty text.

---

### Feature: Raise a Query Tab Content

---

### TC_SCRUM81_028 — Raise a Query tab displays content
**Priority**: Highest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Click Raise a Query tab.
2. Verify content panel is visible.
**Expected Results**:
- Raise a Query tab content is visible when active.

---

### TC_SCRUM81_029 — Ask the assistive partner section is visible
**Priority**: Medium
**Related Jira Issue**: SCRUM-81
**Preconditions**: Raise a Query tab is active.
**Test Steps**:
1. Click Raise a Query tab.
2. Verify 'Ask the assistive partner' section or query form is present.
**Expected Results**:
- 'Ask the assistive partner' section or query form is present.

---

### TC_SCRUM81_030 — Raise a Query content is non-empty
**Priority**: Lowest
**Related Jira Issue**: SCRUM-81
**Preconditions**: Raise a Query tab is active.
**Test Steps**:
1. Click Raise a Query tab.
2. Verify the content area has non-empty text.
**Expected Results**:
- Content area has non-empty text.

---

### Feature: Responsive & Edge Cases

---

### TC_SCRUM81_031 — Tabs render correctly on mobile viewport
**Priority**: High
**Related Jira Issue**: SCRUM-81
**Preconditions**: Browser viewport set to mobile (375x667).
**Test Steps**:
1. Set viewport to mobile (375x667).
2. Navigate to product details page.
3. Verify tabs are visible and clickable.
**Expected Results**:
- Tabs are visible and clickable on mobile.

---

### TC_SCRUM81_032 — Tabs render correctly on tablet viewport
**Priority**: Medium
**Related Jira Issue**: SCRUM-81
**Preconditions**: Browser viewport set to tablet (768x1024).
**Test Steps**:
1. Set viewport to tablet (768x1024).
2. Navigate to product details page.
3. Verify tabs are visible and clickable.
**Expected Results**:
- Tabs are visible and clickable on tablet.

---

### TC_SCRUM81_033 — Tab content persists after page refresh
**Priority**: Lowest
**Related Jira Issue**: SCRUM-81
**Preconditions**: User clicked a non-default tab.
**Test Steps**:
1. Navigate to product details page.
2. Click a non-default tab.
3. Refresh the page.
4. Verify the product page still loads with tabs visible.
**Expected Results**:
- Product page still loads with tabs visible after refresh.

---
