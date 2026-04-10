# Functional Test Plan: SCRUM-417 — Caregiver - Caregiver Profile Edit

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-417](https://youth4jobs.atlassian.net//browse/SCRUM-417) |
| Status      | In QA                                        |
| Assignee    | Kamilath Rifka Sameem Ali                    |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that a caregiver can view and edit their profile. Covers: profile summary display (AC1), profile tabs (AC1), Edit Profile makes fields editable (AC2), read-only fields stay locked (AC2), Save Changes validates and persists (AC3), Cancel discards changes (AC4), data validation rules (AC5). Edge cases: read-only field attempt, page refresh after save.

### Out of Scope
- Wishlist/Inquiries/Settings tab content (separate stories)
- Export Data functionality (read-only action, separate test)
- Network failure / session timeout scenarios (cannot simulate reliably)
- Backend API performance testing

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Profile page accessible with summary fields (AC1)               | TC_SCRUM417_001, 002, 003                 | Highest  |
| Profile tabs visible (AC1)                                       | TC_SCRUM417_004                           | Highest  |
| Edit Profile and Export Data CTAs visible (AC1)                  | TC_SCRUM417_005                           | Highest  |
| Edit Profile makes fields editable (AC2)                         | TC_SCRUM417_006, 007                      | Highest  |
| Email and Aadhaar remain read-only (AC2)                         | TC_SCRUM417_008                           | Highest  |
| Save Changes validates and persists (AC3)                        | TC_SCRUM417_009, 010, 011                 | Highest  |
| Cancel Edit discards changes (AC4)                               | TC_SCRUM417_012, 013                      | High     |
| Phone must be valid numeric (AC5)                                | TC_SCRUM417_014                           | High     |
| Caregiving experience must be numeric (AC5)                      | TC_SCRUM417_015                           | High     |
| Mandatory fields cannot be empty (AC5)                           | TC_SCRUM417_016                           | Medium   |
| Page refresh after save retains updated values                   | TC_SCRUM417_017                           | Medium   |
| Mobile viewport renders profile correctly                        | TC_SCRUM417_018                           | Low      |
| Profile page has correct heading                                 | TC_SCRUM417_019                           | Low      |
| Back navigation from profile works                               | TC_SCRUM417_020                           | Lowest   |

---

## 3. Test Scenarios

### Feature: Profile Page Access & Summary (AC1)

---

### TC_SCRUM417_001 — Caregiver Can Navigate to Profile Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Login as caregiver.
2. Navigate to the profile page.
3. Verify the URL contains `/profile` or page has profile content.
**Expected Results**:
- Caregiver navigates to the profile page.

---

### TC_SCRUM417_002 — Profile Summary Displays Full Name and Email
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is on the profile page.
**Test Steps**:
1. Verify the page body contains a name (non-empty text).
2. Verify the page body contains an email address.
**Expected Results**:
- Full Name and Email are displayed in the profile summary.

---

### TC_SCRUM417_003 — Profile Summary Displays Location and Caregiver Type
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is on the profile page.
**Test Steps**:
1. Verify the page body contains location-related text (city/state).
2. Verify the page body contains caregiver type or relationship info.
**Expected Results**:
- Location and Caregiver Type/Relationship are displayed.

---

### TC_SCRUM417_004 — Profile Tabs Are Visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is on the profile page.
**Test Steps**:
1. Verify tabs or navigation for Profile, Wishlist, Inquiries, Settings are visible.
**Expected Results**:
- Profile tabs are visible on the page.

---

### TC_SCRUM417_005 — Edit Profile and Export Data CTAs Visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is on the profile page.
**Test Steps**:
1. Verify "Edit Profile" button/link is visible.
2. Verify "Export Data" button/link is visible.
**Expected Results**:
- Both CTAs are visible on the profile page.

---

### Feature: Edit Profile — Editable Fields (AC2)

---

### TC_SCRUM417_006 — Clicking Edit Profile Makes Fields Editable
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is on the profile page.
**Test Steps**:
1. Click "Edit Profile".
2. Verify form fields (textboxes, dropdowns) become visible/editable.
**Expected Results**:
- Profile fields become editable after clicking Edit Profile.

---

### TC_SCRUM417_007 — Editable Fields Include Name, Phone, Location, Role, Relationship, Experience
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is in edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Verify the page contains fields for name, phone, location, occupation/role, relationship, experience.
**Expected Results**:
- All editable fields are present in edit mode.

---

### TC_SCRUM417_008 — Email and Aadhaar Fields Remain Read-Only
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is in edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Locate the email field — verify it is disabled or read-only.
3. Locate the Aadhaar field — verify it is disabled or read-only.
**Expected Results**:
- Email and Aadhaar fields are not editable.

---

### Feature: Save Changes (AC3)

---

### TC_SCRUM417_009 — Save Changes Button is Visible in Edit Mode
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is in edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Verify "Save Changes" or "Save" button is visible.
**Expected Results**:
- Save Changes button is visible in edit mode.

---

### TC_SCRUM417_010 — Clicking Save Changes Shows Success Confirmation
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver edited profile fields.
**Test Steps**:
1. Click Edit Profile.
2. Make a minor edit (if possible).
3. Click Save Changes.
4. Verify a success message/toast appears.
**Expected Results**:
- Success confirmation is shown after saving.

---

### TC_SCRUM417_011 — Profile View Refreshes With Updated Values After Save
**Priority**: Highest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver saved changes.
**Test Steps**:
1. After saving, verify the profile view shows updated values.
2. Verify the page is no longer in edit mode.
**Expected Results**:
- Profile view reflects the saved changes.

---

### Feature: Cancel Edit (AC4)

---

### TC_SCRUM417_012 — Cancel Button is Visible in Edit Mode
**Priority**: High
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is in edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Verify "Cancel" button is visible.
**Expected Results**:
- Cancel button is visible in edit mode.

---

### TC_SCRUM417_013 — Clicking Cancel Discards Unsaved Changes
**Priority**: High
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is in edit mode with unsaved changes.
**Test Steps**:
1. Click Edit Profile.
2. Make a change to a field.
3. Click Cancel.
4. Verify the profile reverts to the last saved state.
**Expected Results**:
- Unsaved changes are discarded on cancel.

---

### Feature: Data Validation (AC5)

---

### TC_SCRUM417_014 — Phone Number Must Be Valid Numeric
**Priority**: High
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is in edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Locate the phone field.
3. Verify it accepts only numeric input or has validation.
**Expected Results**:
- Phone field validates for numeric input.

---

### TC_SCRUM417_015 — Caregiving Experience Must Be Numeric
**Priority**: High
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is in edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Locate the caregiving experience field.
3. Verify it accepts only numeric input.
**Expected Results**:
- Experience field validates for numeric input.

---

### TC_SCRUM417_016 — Mandatory Fields Cannot Be Empty on Save
**Priority**: Medium
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is in edit mode.
**Test Steps**:
1. Click Edit Profile.
2. Clear a mandatory field.
3. Click Save Changes.
4. Verify an error/validation message appears.
**Expected Results**:
- Saving with empty mandatory fields shows validation error.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM417_017 — Page Refresh After Save Retains Updated Values
**Priority**: Medium
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver saved profile changes.
**Test Steps**:
1. After saving, reload the page.
2. Verify the profile still shows the updated values.
**Expected Results**:
- Page refresh retains saved profile values.

---

### TC_SCRUM417_018 — Mobile Viewport Renders Profile Correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Navigate to profile page.
2. Set viewport to mobile (375×667).
3. Verify profile content is visible.
**Expected Results**:
- Profile page renders correctly on mobile.

---

### TC_SCRUM417_019 — Profile Page Has Correct Heading
**Priority**: Low
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is on the profile page.
**Test Steps**:
1. Verify the page has a heading containing "profile" or caregiver name.
**Expected Results**:
- Profile page has an appropriate heading.

---

### TC_SCRUM417_020 — Back Navigation From Profile Works
**Priority**: Lowest
**Related Jira Issue**: SCRUM-417
**Preconditions**: Caregiver is on the profile page.
**Test Steps**:
1. Navigate back (browser back or home link).
2. Verify the previous page loads correctly.
**Expected Results**:
- Back navigation from profile works correctly.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Caregiver email                  | `cg1@yopmail.com`                                        |
| Caregiver password               | `cg1@141G`                                               |
| Base URL                         | `https://qa-atad.swarajability.org/`                     |
| Login required                   | Yes — caregiver must be authenticated                    |
| Desktop viewport                 | 1280×720                                                 |
| Mobile viewport                  | 375×667                                                  |

---

## 5. Assumptions & Dependencies

- The caregiver account `cg1@yopmail.com` has a profile page accessible via navigation.
- Profile page URL contains `/profile` or is accessible from the header/menu.
- Edit Profile toggles fields between view and edit mode.
- Email and Aadhaar are read-only (disabled/greyed out) in edit mode.
- Save Changes validates mandatory fields before persisting.
- Cancel discards all unsaved changes.
- **DO NOT CHANGE**: CaregiverRecommendationsPage.ts page object must not be modified.

---

## 6. Open Questions / Clarifications Needed

1. **Profile URL**: What is the exact URL for the caregiver profile page?
2. **Edit mode**: Does Edit Profile open a new page, modal, or inline edit?
3. **Mandatory fields**: Which fields are mandatory vs optional?
4. **Export Data**: What format is the export (CSV, PDF, JSON)?
