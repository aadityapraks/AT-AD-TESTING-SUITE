# SCRUM-106: PwD - Landing on Portal Homepage and Dashboard — Functional Test Plan

## Story
As a PwD with existing profile on SwarajAbility, I want to access the home page of PwD portal, so that I can easily view all products, services, catalog page, browse success stories and perform key actions such as signing in using my SwarajAbility credentials or registering a new profile.

## Acceptance Criteria Summary
- **AC1**: Home page accessible; AT/AD portal branding; Sign In/Register option; only logged-in PwDs access dashboard; unauthenticated users see Sign In popup for protected actions
- **AC2**: Top nav tabs: Home, Catalog, Stories, Help & Resources, Dashboard (logged-in only), Device Matcher (logged-in only) — each navigates to corresponding page
- **AC3**: Hero carousel with 3 slides: PwD ("Explore Catalog" + "Success Stories"), Donors ("Donate Now" + "Impact Stories"), Vendors ("Register Now" + "View Vendors") — each button navigates correctly
- **AC4**: Summary widgets: Total Devices, Verified Vendors, Success Stories, Community Members — non-interactive, animated, informative
- **AC5**: Featured Devices section with product cards; "View All" → catalog; "View Details" on cards
- **AC6**: Success Stories section with story cards; "Read More" → stories page; clicking story navigates to story page
- **AC7**: Header and Footer follow standard design
- **AC8**: Dashboard (logged-in): welcome directive, "Get Recommendations" → catalog, "Browse All Devices" → catalog, Logout visible
- **AC9**: Responsive across desktop, tablet, mobile

## Test Suites (33 Tests)

### Suite 1: Home Page Access & Branding (AC1) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM106_001 | Home page loads successfully |
| TC_SCRUM106_002 | Page has AT/AD portal branding (logo visible) |
| TC_SCRUM106_003 | Sign In/Register button is visible for unauthenticated users |
| TC_SCRUM106_004 | Sign In/Register button is hidden after login |

### Suite 2: Navigation Tabs (AC2) — 5 tests
| ID | Title |
|---|---|
| TC_SCRUM106_005 | Home nav link is present and navigates to home page |
| TC_SCRUM106_006 | Catalog nav link is present and navigates to catalog page |
| TC_SCRUM106_007 | Stories nav link is present and navigates to stories page |
| TC_SCRUM106_008 | Help & Resources nav link is present and navigates to help page |
| TC_SCRUM106_009 | Logout link is visible after login |

### Suite 3: Hero Carousel (AC3) — 5 tests
| ID | Title |
|---|---|
| TC_SCRUM106_010 | Hero carousel is present with multiple slides |
| TC_SCRUM106_011 | PwD slide has Explore Catalog and Success Stories buttons |
| TC_SCRUM106_012 | Donors slide has Donate Now and Impact Stories buttons |
| TC_SCRUM106_013 | Vendors slide has Register Now and View Vendors buttons |
| TC_SCRUM106_014 | Explore Catalog button navigates to catalog page |

### Suite 4: Summary Widgets (AC4) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM106_015 | Total Devices counter is displayed |
| TC_SCRUM106_016 | Verified Vendors counter is displayed |
| TC_SCRUM106_017 | Success Stories counter is displayed |
| TC_SCRUM106_018 | Community Members counter is displayed |

### Suite 5: Featured Devices Section (AC5) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM106_019 | Featured Devices heading is visible |
| TC_SCRUM106_020 | Featured device cards are displayed |
| TC_SCRUM106_021 | View All button navigates to catalog page |
| TC_SCRUM106_022 | View Details button is present on product card |

### Suite 6: Success Stories Section (AC6) — 3 tests
| ID | Title |
|---|---|
| TC_SCRUM106_023 | Success Stories heading is visible on home page |
| TC_SCRUM106_024 | Story cards are displayed in the section |
| TC_SCRUM106_025 | Read More button navigates to stories page |

### Suite 7: Header, Footer & Dashboard (AC7, AC8) — 5 tests
| ID | Title |
|---|---|
| TC_SCRUM106_026 | Header is present with logo |
| TC_SCRUM106_027 | Footer is present with links |
| TC_SCRUM106_028 | Get Recommendations button visible after login |
| TC_SCRUM106_029 | Browse All Devices button visible after login |
| TC_SCRUM106_030 | About PwD Portal section is visible |

### Suite 8: Responsive (AC9) — 3 tests
| ID | Title |
|---|---|
| TC_SCRUM106_031 | Home page renders on mobile viewport |
| TC_SCRUM106_032 | Home page renders on tablet viewport |
| TC_SCRUM106_033 | No horizontal overflow on mobile |


## 3. Test Scenarios

### Feature: Home Page Access & Branding

---

### TC_SCRUM106_001 — Home page loads successfully
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User navigates to base URL.
**Test Steps**:
1. Navigate to base URL.
2. Verify page loads.
**Expected Results**:
- Home page loads successfully.

---

### TC_SCRUM106_002 — Page has AT/AD portal branding (logo visible)
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify logo image in header.
**Expected Results**:
- AT/AD portal logo is visible in header.

---

### TC_SCRUM106_003 — Sign In/Register button is visible for unauthenticated users
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is not logged in.
**Test Steps**:
1. Verify Sign In/Register button visible.
**Expected Results**:
- Sign In/Register button is visible.

---

### TC_SCRUM106_004 — Sign In/Register button is hidden after login
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is logged in.
**Test Steps**:
1. Login.
2. Verify Sign In/Register not visible.
**Expected Results**:
- Sign In/Register button is hidden.

---

### Feature: Navigation Tabs

---

### TC_SCRUM106_005 — Home nav link is present and navigates to home page
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify Home link.
2. Click and verify URL.
**Expected Results**:
- Home nav link is present and navigates to home page.

---

### TC_SCRUM106_006 — Catalog nav link is present and navigates to catalog page
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify Catalog link.
2. Click and verify URL.
**Expected Results**:
- Catalog nav link navigates to catalog page.

---

### TC_SCRUM106_007 — Stories nav link is present and navigates to stories page
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify Stories link.
2. Click and verify URL.
**Expected Results**:
- Stories nav link navigates to stories page.

---

### TC_SCRUM106_008 — Help & Resources nav link is present and navigates to help page
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify Help & Resources link.
2. Click and verify URL.
**Expected Results**:
- Help & Resources nav link navigates to help page.

---

### TC_SCRUM106_009 — Logout link is visible after login
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is logged in.
**Test Steps**:
1. Login.
2. Verify Logout link visible.
**Expected Results**:
- Logout link is visible.

---

### Feature: Hero Carousel

---

### TC_SCRUM106_010 — Hero carousel is present with multiple slides
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify swiper carousel.
2. Verify multiple slides.
**Expected Results**:
- Hero carousel is present with multiple slides.

---

### TC_SCRUM106_011 — PwD slide has Explore Catalog and Success Stories buttons
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Find PwD slide.
2. Verify both buttons.
**Expected Results**:
- PwD slide has Explore Catalog and Success Stories buttons.

---

### TC_SCRUM106_012 — Donors slide has Donate Now and Impact Stories buttons
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Find Donors slide.
2. Verify both buttons.
**Expected Results**:
- Donors slide has Donate Now and Impact Stories buttons.

---

### TC_SCRUM106_013 — Vendors slide has Register Now and View Vendors buttons
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Find Vendors slide.
2. Verify both buttons.
**Expected Results**:
- Vendors slide has Register Now and View Vendors buttons.

---

### TC_SCRUM106_014 — Explore Catalog button navigates to catalog page
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Click Explore Catalog.
2. Verify catalog URL.
**Expected Results**:
- Explore Catalog button navigates to catalog page.

---

### Feature: Summary Widgets

---

### TC_SCRUM106_015 — Total Devices counter is displayed
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify counter with 'Across all categories' label.
**Expected Results**:
- Total Devices counter with 'Across all categories' label is displayed.

---

### TC_SCRUM106_016 — Verified Vendors counter is displayed
**Priority**: Medium
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify counter with 'Trusted partners' label.
**Expected Results**:
- Verified Vendors counter with 'Trusted partners' label is displayed.

---

### TC_SCRUM106_017 — Success Stories counter is displayed
**Priority**: Medium
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify counter with 'Lives transformed' label.
**Expected Results**:
- Success Stories counter with 'Lives transformed' label is displayed.

---

### TC_SCRUM106_018 — Community Members counter is displayed
**Priority**: Medium
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify counter with 'Active users' label.
**Expected Results**:
- Community Members counter with 'Active users' label is displayed.

---

### Feature: Featured Devices Section

---

### TC_SCRUM106_019 — Featured Devices heading is visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify 'Featured Devices' heading.
**Expected Results**:
- 'Featured Devices' heading is visible.

---

### TC_SCRUM106_020 — Featured device cards are displayed
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify product cards present.
**Expected Results**:
- Featured device product cards are displayed.

---

### TC_SCRUM106_021 — View All button navigates to catalog page
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Click View All.
2. Verify catalog URL.
**Expected Results**:
- View All button navigates to catalog page.

---

### TC_SCRUM106_022 — View Details button is present on product card
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify View Details link on card.
**Expected Results**:
- View Details button is present on product card.

---

### Feature: Success Stories Section

---

### TC_SCRUM106_023 — Success Stories heading is visible on home page
**Priority**: Highest
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify 'Success Stories' heading.
**Expected Results**:
- 'Success Stories' heading is visible.

---

### TC_SCRUM106_024 — Story cards are displayed in the section
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify story cards present.
**Expected Results**:
- Story cards are displayed in the section.

---

### TC_SCRUM106_025 — Read More button navigates to stories page
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Click Read More.
2. Verify stories URL.
**Expected Results**:
- Read More button navigates to stories page.

---

### Feature: Header, Footer & Dashboard

---

### TC_SCRUM106_026 — Header is present with logo
**Priority**: Medium
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify header and logo.
**Expected Results**:
- Header is present with logo.

---

### TC_SCRUM106_027 — Footer is present with links
**Priority**: Medium
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify footer and links.
**Expected Results**:
- Footer is present with links.

---

### TC_SCRUM106_028 — Get Recommendations button visible after login
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is logged in.
**Test Steps**:
1. Login.
2. Verify Get Recommendations button.
**Expected Results**:
- Get Recommendations button is visible.

---

### TC_SCRUM106_029 — Browse All Devices button visible after login
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is logged in.
**Test Steps**:
1. Login.
2. Verify Browse All Devices button.
**Expected Results**:
- Browse All Devices button is visible.

---

### TC_SCRUM106_030 — About PwD Portal section is visible
**Priority**: Low
**Related Jira Issue**: SCRUM-106
**Preconditions**: User is on the home page.
**Test Steps**:
1. Verify 'About PwD Portal' heading.
**Expected Results**:
- 'About PwD Portal' section is visible.

---

### Feature: Responsive

---

### TC_SCRUM106_031 — Home page renders on mobile viewport
**Priority**: High
**Related Jira Issue**: SCRUM-106
**Preconditions**: Browser viewport set to mobile (375x667).
**Test Steps**:
1. Set mobile viewport.
2. Verify content visible.
**Expected Results**:
- Home page content is visible on mobile.

---

### TC_SCRUM106_032 — Home page renders on tablet viewport
**Priority**: Low
**Related Jira Issue**: SCRUM-106
**Preconditions**: Browser viewport set to tablet (768x1024).
**Test Steps**:
1. Set tablet viewport.
2. Verify content visible.
**Expected Results**:
- Home page content is visible on tablet.

---

### TC_SCRUM106_033 — No horizontal overflow on mobile
**Priority**: Lowest
**Related Jira Issue**: SCRUM-106
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set mobile viewport.
2. Check scroll width.
**Expected Results**:
- No horizontal overflow on mobile.

---
