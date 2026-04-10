# SCRUM-293: PwD Profile Management — Functional Test Plan

## Story

As a Person with Disability (PWD) using the AT/AD Portal, I want a dedicated Profile section where I can view, manage, and export my personal information, preferences, and activity (wishlist and inquiries), so that my experience on the platform is personalized, accurate, and easy to manage.

## Acceptance Criteria Summary

- **AC1–3 (Navigation & Access)**: Profile accessible only to authenticated PWD users; Profile tab loads by default; tab switching causes no data loss or reload errors
- **AC4–6 (Profile Header)**: Header always displays name, email, contextual tags; Export Data button visible on all tabs; exported data is user-specific
- **AC7–10 (Personal Information)**: Read-only by default; Edit Profile enables editable fields; save only on explicit confirmation; updated data reflects immediately
- **AC11 (Wishlist)**: Displays all bookmarked devices; each item shows name, image, price, View Details CTA; View Details navigates to catalog; removing device updates count; empty state message when empty
- **AC12 (Inquiries)**: All inquiries visible in chronological order with device name, image, price, AP contact details
- **AC13 (Settings)**: Export Data and Delete Account options; settings persist across sessions
- **AC14–16 (Accessibility)**: Screen-reader compatible; keyboard navigable; WCAG contrast/spacing

## Test Suites (30 Tests)

### Suite 1: Navigation & Access (AC1–3) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM293_001 | Unauthenticated user is redirected away from profile page |
| TC_SCRUM293_002 | Authenticated PWD can access profile via direct URL |
| TC_SCRUM293_003 | Profile tab is selected by default on page load |
| TC_SCRUM293_004 | Tab switching does not cause page reload errors |

### Suite 2: Profile Header (AC4–6) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM293_005 | Header displays user full name |
| TC_SCRUM293_006 | Header displays user email |
| TC_SCRUM293_007 | Header displays contextual tags (location, occupation, disability) |
| TC_SCRUM293_008 | Export Data button is visible in header |

### Suite 3: Profile Tab — Personal Information (AC7–10) — 5 tests
| ID | Title |
|---|---|
| TC_SCRUM293_009 | Personal Information section is visible with fields |
| TC_SCRUM293_010 | Fields are read-only by default |
| TC_SCRUM293_011 | Edit Profile button is visible |
| TC_SCRUM293_012 | Clicking Edit Profile enables editable fields with Save/Cancel |
| TC_SCRUM293_013 | Clicking Cancel reverts to read-only mode |

### Suite 4: Wishlist Tab (AC11) — 6 tests
| ID | Title |
|---|---|
| TC_SCRUM293_014 | Wishlist tab is clickable and displays content |
| TC_SCRUM293_015 | Wishlist shows device count indicator |
| TC_SCRUM293_016 | Each wishlist card shows device image, name, and price |
| TC_SCRUM293_017 | Each wishlist card has View Details CTA |
| TC_SCRUM293_018 | View Details navigates to product/catalog page |
| TC_SCRUM293_019 | Wishlist bookmark toggle is present on cards |

### Suite 5: Inquiries Tab (AC12) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM293_020 | Inquiries tab is clickable and displays content |
| TC_SCRUM293_021 | Inquiry items show device name and image |
| TC_SCRUM293_022 | Inquiry items show device price |
| TC_SCRUM293_023 | Inquiry items show AP contact details |

### Suite 6: Settings Tab (AC13) — 4 tests
| ID | Title |
|---|---|
| TC_SCRUM293_024 | Settings tab is clickable and displays content |
| TC_SCRUM293_025 | Export Data / Download your data section is visible |
| TC_SCRUM293_026 | Delete Account section is visible |
| TC_SCRUM293_027 | Export Data button is functional |

### Suite 7: Header Persistence Across Tabs (AC4) — 3 tests
| ID | Title |
|---|---|
| TC_SCRUM293_028 | Header name and email remain visible on Wishlist tab |
| TC_SCRUM293_029 | Header name and email remain visible on Inquiries tab |
| TC_SCRUM293_030 | Header name and email remain visible on Settings tab |


## 3. Test Scenarios

### Feature: Navigation & Access

---

### TC_SCRUM293_001 — Unauthenticated user is redirected away from profile page
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is not logged in.
**Test Steps**:
1. Open profile URL without login.
2. Verify redirect to login or home page.
**Expected Results**:
- User is redirected away from profile page.

---

### TC_SCRUM293_002 — Authenticated PWD can access profile via direct URL
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is logged in as PWD.
**Test Steps**:
1. Login as PWD.
2. Navigate to profile URL.
3. Verify profile page loads.
**Expected Results**:
- Profile page loads via direct URL.

---

### TC_SCRUM293_003 — Profile tab is selected by default on page load
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Navigate to profile page.
2. Verify Profile tab has active state.
**Expected Results**:
- Profile tab is selected by default.

---

### TC_SCRUM293_004 — Tab switching does not cause page reload errors
**Priority**: Medium
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Click each tab sequentially.
2. Verify no console errors or page crashes.
**Expected Results**:
- No console errors or page crashes when switching tabs.

---

### Feature: Profile Header

---

### TC_SCRUM293_005 — Header displays user full name
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Navigate to profile page.
2. Verify .atad-up-name is visible with non-empty text.
**Expected Results**:
- User full name is visible in header.

---

### TC_SCRUM293_006 — Header displays user email
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Navigate to profile page.
2. Verify .atad-up-email is visible with email text.
**Expected Results**:
- User email is visible in header.

---

### TC_SCRUM293_007 — Header displays contextual tags (location, occupation, disability)
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Navigate to profile page.
2. Verify .atad-up-tag elements are visible.
**Expected Results**:
- Contextual tags (location, occupation, disability) are visible.

---

### TC_SCRUM293_008 — Export Data button is visible in header
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Navigate to profile page.
2. Verify Export Data button/link is visible.
**Expected Results**:
- Export Data button is visible in header.

---

### Feature: Profile Tab — Personal Information

---

### TC_SCRUM293_009 — Personal Information section is visible with fields
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Navigate to profile page.
2. Verify Personal Information section is visible.
3. Verify profile fields are displayed.
**Expected Results**:
- Personal Information section with fields is visible.

---

### TC_SCRUM293_010 — Fields are read-only by default
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Navigate to profile page.
2. Verify input fields are disabled or read-only.
**Expected Results**:
- Input fields are disabled or read-only.

---

### TC_SCRUM293_011 — Edit Profile button is visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Navigate to profile page.
2. Verify Edit Profile button is visible.
**Expected Results**:
- Edit Profile button is visible.

---

### TC_SCRUM293_012 — Clicking Edit Profile enables editable fields with Save/Cancel
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User clicks Edit Profile.
**Test Steps**:
1. Click Edit Profile.
2. Verify fields become editable.
3. Verify Save and Cancel buttons appear.
**Expected Results**:
- Fields become editable with Save and Cancel buttons.

---

### TC_SCRUM293_013 — Clicking Cancel reverts to read-only mode
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is in edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Click Cancel.
3. Verify fields return to read-only.
**Expected Results**:
- Clicking Cancel reverts to read-only mode.

---

### Feature: Wishlist Tab

---

### TC_SCRUM293_014 — Wishlist tab is clickable and displays content
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Click Wishlist tab.
2. Verify wishlist panel content is visible.
**Expected Results**:
- Wishlist tab is clickable and displays content.

---

### TC_SCRUM293_015 — Wishlist shows device count indicator
**Priority**: Medium
**Related Jira Issue**: SCRUM-293
**Preconditions**: Wishlist tab is active.
**Test Steps**:
1. Click Wishlist tab.
2. Verify device count text is visible.
**Expected Results**:
- Device count indicator is visible.

---

### TC_SCRUM293_016 — Each wishlist card shows device image, name, and price
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: Wishlist tab is active.
**Test Steps**:
1. Click Wishlist tab.
2. Verify first card has image, name, and price.
**Expected Results**:
- First card shows device image, name, and price.

---

### TC_SCRUM293_017 — Each wishlist card has View Details CTA
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: Wishlist tab is active.
**Test Steps**:
1. Click Wishlist tab.
2. Verify View Details link/button on card.
**Expected Results**:
- View Details CTA is present on card.

---

### TC_SCRUM293_018 — View Details navigates to product/catalog page
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: Wishlist tab is active.
**Test Steps**:
1. Click View Details on first wishlist card.
2. Verify navigation to product page.
**Expected Results**:
- View Details navigates to product page.

---

### TC_SCRUM293_019 — Wishlist bookmark toggle is present on cards
**Priority**: Low
**Related Jira Issue**: SCRUM-293
**Preconditions**: Wishlist tab is active.
**Test Steps**:
1. Click Wishlist tab.
2. Verify bookmark icon/toggle is visible on cards.
**Expected Results**:
- Bookmark toggle is visible on cards.

---

### Feature: Inquiries Tab

---

### TC_SCRUM293_020 — Inquiries tab is clickable and displays content
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Click Inquiries tab.
2. Verify inquiries panel content is visible.
**Expected Results**:
- Inquiries tab is clickable and displays content.

---

### TC_SCRUM293_021 — Inquiry items show device name and image
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: Inquiries tab is active.
**Test Steps**:
1. Click Inquiries tab.
2. Verify inquiry items have device name and image.
**Expected Results**:
- Inquiry items show device name and image.

---

### TC_SCRUM293_022 — Inquiry items show device price
**Priority**: Medium
**Related Jira Issue**: SCRUM-293
**Preconditions**: Inquiries tab is active.
**Test Steps**:
1. Click Inquiries tab.
2. Verify inquiry items display price.
**Expected Results**:
- Inquiry items display price.

---

### TC_SCRUM293_023 — Inquiry items show AP contact details
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: Inquiries tab is active.
**Test Steps**:
1. Click Inquiries tab.
2. Verify AP contact details (name, phone, email) are shown.
**Expected Results**:
- AP contact details (name, phone, email) are shown.

---

### Feature: Settings Tab

---

### TC_SCRUM293_024 — Settings tab is clickable and displays content
**Priority**: Highest
**Related Jira Issue**: SCRUM-293
**Preconditions**: User is on the profile page.
**Test Steps**:
1. Click Settings tab.
2. Verify settings panel content is visible.
**Expected Results**:
- Settings tab is clickable and displays content.

---

### TC_SCRUM293_025 — Export Data / Download your data section is visible
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: Settings tab is active.
**Test Steps**:
1. Click Settings tab.
2. Verify Export/Download data section is visible.
**Expected Results**:
- Export/Download data section is visible.

---

### TC_SCRUM293_026 — Delete Account section is visible
**Priority**: High
**Related Jira Issue**: SCRUM-293
**Preconditions**: Settings tab is active.
**Test Steps**:
1. Click Settings tab.
2. Verify Delete Account section is visible.
**Expected Results**:
- Delete Account section is visible.

---

### TC_SCRUM293_027 — Export Data button is functional
**Priority**: Medium
**Related Jira Issue**: SCRUM-293
**Preconditions**: Settings tab is active.
**Test Steps**:
1. Click Settings tab.
2. Verify Export All Data button is clickable.
**Expected Results**:
- Export All Data button is clickable.

---

### Feature: Header Persistence Across Tabs

---

### TC_SCRUM293_028 — Header name and email remain visible on Wishlist tab
**Priority**: Low
**Related Jira Issue**: SCRUM-293
**Preconditions**: Wishlist tab is active.
**Test Steps**:
1. Click Wishlist tab.
2. Verify header name and email are still visible.
**Expected Results**:
- Header name and email remain visible.

---

### TC_SCRUM293_029 — Header name and email remain visible on Inquiries tab
**Priority**: Low
**Related Jira Issue**: SCRUM-293
**Preconditions**: Inquiries tab is active.
**Test Steps**:
1. Click Inquiries tab.
2. Verify header name and email are still visible.
**Expected Results**:
- Header name and email remain visible.

---

### TC_SCRUM293_030 — Header name and email remain visible on Settings tab
**Priority**: Lowest
**Related Jira Issue**: SCRUM-293
**Preconditions**: Settings tab is active.
**Test Steps**:
1. Click Settings tab.
2. Verify header name and email are still visible.
**Expected Results**:
- Header name and email remain visible.

---
