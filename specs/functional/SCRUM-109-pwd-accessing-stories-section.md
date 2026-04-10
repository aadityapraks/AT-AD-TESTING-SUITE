# SCRUM-109: PwD - Accessing Stories Section — Functional Test Plan

## Story
As a PwD Portal User, I want to browse and read success stories so that I can get inspired by others' journeys.

## Acceptance Criteria Summary
- **AC1**: Stories page navigation from top nav; heading "Success Stories" + subtitle "Real experiences from the community."
- **AC2**: Story cards: cover image, category tag, title, author+avatar, date, summary (2 lines), "Read Story" CTA, Like/Share icons
- **AC3**: ≥6 stories load by default; pagination/infinite scroll if more exist
- **AC4**: Like icon toggles count + filled/outlined state; Share icon opens share options
- **AC5**: Clicking "Read Story" or card opens Story Details page
- **AC6**: Details page: cover image, title, author+avatar+date, Like/Share, "My Journey" heading, narrative, Before/After badges, "The Impact" section, Device Featured box (image, name, vendor, rating, "View Device Details"), "Back to Stories", "Read More Success Stories"
- **AC7**: Before/After badges visible, correct colors, no text truncation
- **AC8**: "View Device Details" navigates to catalog product page
- **AC9**: "View All Stories" navigates back to Stories listing
- **AC10**: Responsive across desktop/tablet/mobile
- **AC11**: Page loads within 3s

## Test Suites (33 Tests)

### Suite 1: Stories Page Navigation (AC1) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM109_001 | Stories link is visible in top navigation |
| TC_SCRUM109_002 | Clicking Stories nav link opens stories page |
| TC_SCRUM109_003 | Page displays "Success Stories" heading |
| TC_SCRUM109_004 | Page displays subtitle "Real experiences from the community." |

### Suite 2: Story Cards Display (AC2) — 7 tests
| ID | Title |
|---|---|
| TC_SCRUM109_005 | Story card has cover image |
| TC_SCRUM109_006 | Story card has category tag |
| TC_SCRUM109_007 | Story card has story title |
| TC_SCRUM109_008 | Story card has author name and avatar |
| TC_SCRUM109_009 | Story card has published date |
| TC_SCRUM109_010 | Story card has summary text |
| TC_SCRUM109_011 | Story card has "Read Story" CTA |

### Suite 3: Stories Count & Pagination (AC3) — 2 tests
| ID | Title |
|---|---|
| TC_SCRUM109_012 | At least 6 stories load by default |
| TC_SCRUM109_013 | Pagination or load-more is available if more stories exist |

### Suite 4: Like & Share (AC4) — 3 tests
| ID | Title |
|---|---|
| TC_SCRUM109_014 | Like icon is visible on story card |
| TC_SCRUM109_015 | Share icon is visible on story card |
| TC_SCRUM109_016 | Clicking Like icon toggles state |

### Suite 5: Story Details Navigation (AC5) — 2 tests
| ID | Title |
|---|---|
| TC_SCRUM109_017 | Clicking "Read Story" opens story details page |
| TC_SCRUM109_018 | Story details page URL changes from listing |

### Suite 6: Story Details Content (AC6, AC7) — 10 tests
| ID | Title |
|---|---|
| TC_SCRUM109_019 | Details page shows cover image |
| TC_SCRUM109_020 | Details page shows story title |
| TC_SCRUM109_021 | Details page shows author name and date |
| TC_SCRUM109_022 | Details page has Like and Share buttons |
| TC_SCRUM109_023 | Details page has "My Journey" section |
| TC_SCRUM109_024 | Details page has Before/After comparison badges |
| TC_SCRUM109_025 | Details page has "The Impact" section |
| TC_SCRUM109_026 | Device Featured box shows device name and image |
| TC_SCRUM109_027 | "Back to Stories" link is present |
| TC_SCRUM109_028 | "Read More Success Stories" CTA is present |

### Suite 7: Detail Page Navigation (AC8, AC9) — 2 tests
| ID | Title |
|---|---|
| TC_SCRUM109_029 | "View Device Details" navigates to product page |
| TC_SCRUM109_030 | "View All Stories" / "Back to Stories" navigates to stories listing |

### Suite 8: Responsive (AC10) — 3 tests
| ID | Title |
|---|---|
| TC_SCRUM109_031 | Stories page renders on mobile viewport |
| TC_SCRUM109_032 | Stories page renders on tablet viewport |
| TC_SCRUM109_033 | No horizontal overflow on mobile |


## 3. Test Scenarios

### Feature: Stories Page Navigation

---

### TC_SCRUM109_001 — Stories link is visible in top navigation
**Priority**: Highest
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Verify Stories link in top nav.
**Expected Results**:
- Stories link is visible in top navigation.

---

### TC_SCRUM109_002 — Clicking Stories nav link opens stories page
**Priority**: Highest
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the homepage.
**Test Steps**:
1. Click Stories link.
2. Verify stories page loads.
**Expected Results**:
- Clicking Stories link opens the stories page.

---

### TC_SCRUM109_003 — Page displays Success Stories heading
**Priority**: Highest
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify heading text.
**Expected Results**:
- 'Success Stories' heading is displayed.

---

### TC_SCRUM109_004 — Page displays subtitle Real experiences from the community.
**Priority**: Medium
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify subtitle text.
**Expected Results**:
- Subtitle 'Real experiences from the community.' is displayed.

---

### Feature: Story Cards Display

---

### TC_SCRUM109_005 — Story card has cover image
**Priority**: Highest
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify first card has img.
**Expected Results**:
- First story card has a cover image.

---

### TC_SCRUM109_006 — Story card has category tag
**Priority**: Medium
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify category tag visible.
**Expected Results**:
- Category tag is visible on story card.

---

### TC_SCRUM109_007 — Story card has story title
**Priority**: Highest
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify title text on card.
**Expected Results**:
- Story title text is visible on card.

---

### TC_SCRUM109_008 — Story card has author name and avatar
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify author name and avatar initial.
**Expected Results**:
- Author name and avatar initial are visible.

---

### TC_SCRUM109_009 — Story card has published date
**Priority**: Medium
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify date on card.
**Expected Results**:
- Published date is visible on card.

---

### TC_SCRUM109_010 — Story card has summary text
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify summary text present.
**Expected Results**:
- Summary text is present on card.

---

### TC_SCRUM109_011 — Story card has Read Story CTA
**Priority**: Highest
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify Read Story button.
**Expected Results**:
- 'Read Story' button is visible on card.

---

### Feature: Stories Count & Pagination

---

### TC_SCRUM109_012 — At least 6 stories load by default
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Count story cards.
2. Verify >= 6.
**Expected Results**:
- At least 6 story cards are loaded.

---

### TC_SCRUM109_013 — Pagination or load-more is available if more stories exist
**Priority**: Low
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Check for pagination or load-more.
**Expected Results**:
- Pagination or load-more is available.

---

### Feature: Like & Share

---

### TC_SCRUM109_014 — Like icon is visible on story card
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify like icon on first card.
**Expected Results**:
- Like icon is visible on first card.

---

### TC_SCRUM109_015 — Share icon is visible on story card
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Verify share icon on first card.
**Expected Results**:
- Share icon is visible on first card.

---

### TC_SCRUM109_016 — Clicking Like icon toggles state
**Priority**: Medium
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Click like.
2. Verify state change.
**Expected Results**:
- Like icon state toggles on click.

---

### Feature: Story Details Navigation

---

### TC_SCRUM109_017 — Clicking Read Story opens story details page
**Priority**: Highest
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on the stories page.
**Test Steps**:
1. Click Read Story on first card.
2. Verify details page loads.
**Expected Results**:
- Clicking Read Story opens story details page.

---

### TC_SCRUM109_018 — Story details page URL changes from listing
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User clicked Read Story.
**Test Steps**:
1. Verify URL is different from listing.
**Expected Results**:
- URL changes from listing page.

---

### Feature: Story Details Content

---

### TC_SCRUM109_019 — Details page shows cover image
**Priority**: Highest
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify cover image on details page.
**Expected Results**:
- Cover image is visible.

---

### TC_SCRUM109_020 — Details page shows story title
**Priority**: Highest
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify title heading.
**Expected Results**:
- Story title heading is visible.

---

### TC_SCRUM109_021 — Details page shows author name and date
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify author and date visible.
**Expected Results**:
- Author name and date are visible.

---

### TC_SCRUM109_022 — Details page has Like and Share buttons
**Priority**: Medium
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify like and share on details.
**Expected Results**:
- Like and Share buttons are visible.

---

### TC_SCRUM109_023 — Details page has My Journey section
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify My Journey heading.
**Expected Results**:
- 'My Journey' heading is visible.

---

### TC_SCRUM109_024 — Details page has Before/After comparison badges
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify Before and After badges.
**Expected Results**:
- Before and After comparison badges are visible.

---

### TC_SCRUM109_025 — Details page has The Impact section
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify The Impact heading.
**Expected Results**:
- 'The Impact' heading is visible.

---

### TC_SCRUM109_026 — Device Featured box shows device name and image
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify device box with name and image.
**Expected Results**:
- Device Featured box shows device name and image.

---

### TC_SCRUM109_027 — Back to Stories link is present
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify Back to Stories CTA.
**Expected Results**:
- 'Back to Stories' link is present.

---

### TC_SCRUM109_028 — Read More Success Stories CTA is present
**Priority**: Low
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Verify Read More CTA.
**Expected Results**:
- 'Read More Success Stories' CTA is present.

---

### Feature: Detail Page Navigation

---

### TC_SCRUM109_029 — View Device Details navigates to product page
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Click View Device Details.
2. Verify product page.
**Expected Results**:
- Clicking View Device Details navigates to product page.

---

### TC_SCRUM109_030 — View All Stories / Back to Stories navigates to stories listing
**Priority**: High
**Related Jira Issue**: SCRUM-109
**Preconditions**: User is on a story details page.
**Test Steps**:
1. Click Back to Stories.
2. Verify stories listing.
**Expected Results**:
- Clicking Back to Stories navigates to stories listing.

---

### Feature: Responsive

---

### TC_SCRUM109_031 — Stories page renders on mobile viewport
**Priority**: Medium
**Related Jira Issue**: SCRUM-109
**Preconditions**: Browser viewport set to mobile (375x667).
**Test Steps**:
1. Set mobile viewport.
2. Verify content visible.
**Expected Results**:
- Stories page content is visible on mobile.

---

### TC_SCRUM109_032 — Stories page renders on tablet viewport
**Priority**: Low
**Related Jira Issue**: SCRUM-109
**Preconditions**: Browser viewport set to tablet (768x1024).
**Test Steps**:
1. Set tablet viewport.
2. Verify content visible.
**Expected Results**:
- Stories page content is visible on tablet.

---

### TC_SCRUM109_033 — No horizontal overflow on mobile
**Priority**: Lowest
**Related Jira Issue**: SCRUM-109
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set mobile viewport.
2. Check scroll width.
**Expected Results**:
- No horizontal overflow on mobile.

---
