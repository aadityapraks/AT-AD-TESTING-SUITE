# SCRUM-110: PwD - Access to Device Recommendations and Functionality — Functional Test Plan

## Story
As a PwD user, I want personalized assistive device recommendations based on my needs, preferences, and profile data from Swarajability.

## Acceptance Criteria Summary
- **AC1**: "Get Recommendation" on Home navigates to Catalog page
- **AC1.2**: Page displays "Personalized for You" badge, "Your Personalized Device Recommendations" title, toggle for recommended devices with count
- **AC2**: System captures profile data and generates personalized recommendations
- **AC3**: Data persistence — selections remain when navigating back/forth; error handling for network failures
- **AC4**: UI consistency — card layout, shadows, radio indicators, typography, progress bar
- **AC5**: Responsive across desktop/tablet/mobile

## Test Suites (33 Tests)

### Suite 1: Navigation & Page Access (4 tests)
| ID | Title |
|---|---|
| TC_SCRUM110_001 | Get Recommendations link is visible on Home page |
| TC_SCRUM110_002 | Clicking Get Recommendations navigates to Catalog page |
| TC_SCRUM110_003 | Catalog page URL contains /catalog/ |
| TC_SCRUM110_004 | Catalog page loads with product cards |

### Suite 2: Recommendation Banner Display (6 tests)
| ID | Title |
|---|---|
| TC_SCRUM110_005 | Personalized for You badge is visible |
| TC_SCRUM110_006 | Title "Your Personalized Device Recommendations" is displayed |
| TC_SCRUM110_007 | Subtitle text is displayed |
| TC_SCRUM110_008 | Recommendation toggle is present |
| TC_SCRUM110_009 | Toggle label says "Show Only Recommended Devices" |
| TC_SCRUM110_010 | Device count hint is displayed near toggle |

### Suite 3: Recommendation Toggle Functionality (5 tests)
| ID | Title |
|---|---|
| TC_SCRUM110_011 | Toggle is clickable |
| TC_SCRUM110_012 | Toggle changes state on click |
| TC_SCRUM110_013 | Toggling on filters catalog to recommended devices |
| TC_SCRUM110_014 | Toggling off shows all devices again |
| TC_SCRUM110_015 | Device count updates when toggle is activated |

### Suite 4: Catalog Product Cards (5 tests)
| ID | Title |
|---|---|
| TC_SCRUM110_016 | Product cards are displayed on catalog page |
| TC_SCRUM110_017 | Product card has image |
| TC_SCRUM110_018 | Product card has title |
| TC_SCRUM110_019 | Product card has price |
| TC_SCRUM110_020 | Product card has View Details CTA |

### Suite 5: Catalog Filters (4 tests)
| ID | Title |
|---|---|
| TC_SCRUM110_021 | Disability Type filter is present |
| TC_SCRUM110_022 | Type filter is present |
| TC_SCRUM110_023 | Price Range filter is present |
| TC_SCRUM110_024 | Apply Filters button is present |

### Suite 6: Sorting & Pagination (3 tests)
| ID | Title |
|---|---|
| TC_SCRUM110_025 | Sort dropdown is present |
| TC_SCRUM110_026 | Pagination is present when multiple pages exist |
| TC_SCRUM110_027 | Device count text is displayed |

### Suite 7: View Details Navigation (3 tests)
| ID | Title |
|---|---|
| TC_SCRUM110_028 | Clicking View Details opens product detail page |
| TC_SCRUM110_029 | Product detail page shows product title |
| TC_SCRUM110_030 | Back navigation returns to catalog |

### Suite 8: Responsive (3 tests)
| ID | Title |
|---|---|
| TC_SCRUM110_031 | Catalog page renders on mobile viewport |
| TC_SCRUM110_032 | Catalog page renders on tablet viewport |
| TC_SCRUM110_033 | No horizontal overflow on mobile |


## 3. Test Scenarios

### Feature: Navigation & Page Access

---

### TC_SCRUM110_001 — Get Recommendations link is visible on Home page
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is logged in and on the Home page.
**Test Steps**:
1. Navigate to Home.
2. Verify Get Recommendations link.
**Expected Results**:
- Get Recommendations link is visible.

---

### TC_SCRUM110_002 — Clicking Get Recommendations navigates to Catalog page
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Home page.
**Test Steps**:
1. Click Get Recommendations.
2. Verify catalog page.
**Expected Results**:
- Clicking Get Recommendations navigates to Catalog page.

---

### TC_SCRUM110_003 — Catalog page URL contains /catalog/
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify URL.
**Expected Results**:
- URL contains /catalog/.

---

### TC_SCRUM110_004 — Catalog page loads with product cards
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify product cards visible.
**Expected Results**:
- Product cards are visible.

---

### Feature: Recommendation Banner Display

---

### TC_SCRUM110_005 — Personalized for You badge is visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify badge text.
**Expected Results**:
- 'Personalized for You' badge is visible.

---

### TC_SCRUM110_006 — Title Your Personalized Device Recommendations is displayed
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify title.
**Expected Results**:
- 'Your Personalized Device Recommendations' title is displayed.

---

### TC_SCRUM110_007 — Subtitle text is displayed
**Priority**: Medium
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify subtitle.
**Expected Results**:
- Subtitle text is displayed.

---

### TC_SCRUM110_008 — Recommendation toggle is present
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify toggle input.
**Expected Results**:
- Recommendation toggle input is present.

---

### TC_SCRUM110_009 — Toggle label says Show Only Recommended Devices
**Priority**: Medium
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify toggle label text.
**Expected Results**:
- Toggle label says 'Show Only Recommended Devices'.

---

### TC_SCRUM110_010 — Device count hint is displayed near toggle
**Priority**: Medium
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify count hint text.
**Expected Results**:
- Device count hint text is displayed near toggle.

---

### Feature: Recommendation Toggle Functionality

---

### TC_SCRUM110_011 — Toggle is clickable
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Click toggle.
2. Verify no error.
**Expected Results**:
- Toggle is clickable without error.

---

### TC_SCRUM110_012 — Toggle changes state on click
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Check state before.
2. Click.
3. Check state after.
**Expected Results**:
- Toggle state changes on click.

---

### TC_SCRUM110_013 — Toggling on filters catalog to recommended devices
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: Toggle is enabled.
**Test Steps**:
1. Enable toggle.
2. Verify catalog filters.
**Expected Results**:
- Catalog filters to recommended devices.

---

### TC_SCRUM110_014 — Toggling off shows all devices again
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: Toggle was enabled.
**Test Steps**:
1. Enable then disable toggle.
2. Verify all devices.
**Expected Results**:
- Disabling toggle shows all devices again.

---

### TC_SCRUM110_015 — Device count updates when toggle is activated
**Priority**: Medium
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Note count.
2. Toggle.
3. Verify count changes.
**Expected Results**:
- Device count updates when toggle is activated.

---

### Feature: Catalog Product Cards

---

### TC_SCRUM110_016 — Product cards are displayed on catalog page
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify cards visible.
**Expected Results**:
- Product cards are displayed.

---

### TC_SCRUM110_017 — Product card has image
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify img on first card.
**Expected Results**:
- First product card has an image.

---

### TC_SCRUM110_018 — Product card has title
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify title text.
**Expected Results**:
- First product card has a title.

---

### TC_SCRUM110_019 — Product card has price
**Priority**: Medium
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify price text.
**Expected Results**:
- First product card has a price.

---

### TC_SCRUM110_020 — Product card has View Details CTA
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify View Details link.
**Expected Results**:
- View Details CTA is visible on product card.

---

### Feature: Catalog Filters

---

### TC_SCRUM110_021 — Disability Type filter is present
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify filter visible.
**Expected Results**:
- Disability Type filter is present.

---

### TC_SCRUM110_022 — Type filter is present
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify Type filter.
**Expected Results**:
- Type filter is present.

---

### TC_SCRUM110_023 — Price Range filter is present
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify Price filter.
**Expected Results**:
- Price Range filter is present.

---

### TC_SCRUM110_024 — Apply Filters button is present
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify Apply Filters button.
**Expected Results**:
- Apply Filters button is present.

---

### Feature: Sorting & Pagination

---

### TC_SCRUM110_025 — Sort dropdown is present
**Priority**: Medium
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify sort control.
**Expected Results**:
- Sort dropdown is present.

---

### TC_SCRUM110_026 — Pagination is present when multiple pages exist
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify pagination.
**Expected Results**:
- Pagination is present when multiple pages exist.

---

### TC_SCRUM110_027 — Device count text is displayed
**Priority**: Low
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Verify devices found text.
**Expected Results**:
- Device count text is displayed.

---

### Feature: View Details Navigation

---

### TC_SCRUM110_028 — Clicking View Details opens product detail page
**Priority**: Highest
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on the Catalog page.
**Test Steps**:
1. Click View Details.
2. Verify product page.
**Expected Results**:
- Clicking View Details opens product detail page.

---

### TC_SCRUM110_029 — Product detail page shows product title
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on a product detail page.
**Test Steps**:
1. Verify h1 title.
**Expected Results**:
- Product title (h1) is visible.

---

### TC_SCRUM110_030 — Back navigation returns to catalog
**Priority**: High
**Related Jira Issue**: SCRUM-110
**Preconditions**: User is on a product detail page.
**Test Steps**:
1. Go back.
2. Verify catalog URL.
**Expected Results**:
- Back navigation returns to catalog URL.

---

### Feature: Responsive

---

### TC_SCRUM110_031 — Catalog page renders on mobile viewport
**Priority**: Low
**Related Jira Issue**: SCRUM-110
**Preconditions**: Browser viewport set to mobile (375x667).
**Test Steps**:
1. Set mobile viewport.
2. Verify content.
**Expected Results**:
- Catalog page content is visible on mobile.

---

### TC_SCRUM110_032 — Catalog page renders on tablet viewport
**Priority**: Low
**Related Jira Issue**: SCRUM-110
**Preconditions**: Browser viewport set to tablet (768x1024).
**Test Steps**:
1. Set tablet viewport.
2. Verify content.
**Expected Results**:
- Catalog page content is visible on tablet.

---

### TC_SCRUM110_033 — No horizontal overflow on mobile
**Priority**: Lowest
**Related Jira Issue**: SCRUM-110
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set mobile viewport.
2. Check scroll width.
**Expected Results**:
- No horizontal overflow on mobile.

---
