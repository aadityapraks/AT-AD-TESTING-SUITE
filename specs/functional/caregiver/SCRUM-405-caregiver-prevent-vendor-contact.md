# Functional Test Plan: SCRUM-405 — Caregiver - Prevent Vendor Contact Without PwD Selection

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 2.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-405](https://youth4jobs.atlassian.net//browse/SCRUM-405) |
| Status      | In QA                                        |
| Assignee    | Kamilath Rifka Sameem Ali                    |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that the system prevents a logged-in Caregiver from contacting a vendor unless a PwD profile is selected. Covers: Contact Vendor button disabled state when no PwD is selected, inline guidance when attempting contact without PwD, mandatory PwD selection indicator, and edge cases.

### Out of Scope
- PwD profile creation/editing flow
- Vendor contact form submission success flow (after PwD is selected)
- Backend API performance testing
- Accessibility testing (screen reader, keyboard-only)

---

## 2. Requirements Traceability Matrix (29 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Product detail page accessible from catalog                      | TC_SCRUM405_001, 002, 003                 | Highest  |
| Contact Vendor button/section exists on product detail           | TC_SCRUM405_004, 005                      | Highest  |
| No PwD profile → message and CTA states                         | TC_SCRUM405_006, 007, 008, 009, 010       | Highest  |
| Click Contact Vendor without PwD → blocked                      | TC_SCRUM405_011, 012, 013, 014            | Highest  |
| PwD selection mandatory indicator                                | TC_SCRUM405_015, 016                      | High     |
| PwD selection on product detail page                             | TC_SCRUM405_017, 018                      | High     |
| Contact Vendor enabled after PwD selection                       | TC_SCRUM405_019, 020                      | Highest  |
| PwDs exist but none selected → blocked                          | TC_SCRUM405_021, 022                      | High     |
| Page refresh retains state                                       | TC_SCRUM405_023, 024                      | Medium   |
| Contact Vendor form fields                                       | TC_SCRUM405_025, 026                      | Medium   |
| Mobile viewport, back navigation, consistency                    | TC_SCRUM405_027, 028, 029                 | Low      |

---

## 3. Test Scenarios

### Feature: Product Detail Page Access (Prerequisite)

---

### TC_SCRUM405_001 — Caregiver Can Navigate to Product Detail Page From Catalog
**Priority**: Highest
**Preconditions**: Caregiver is logged in and on the catalog page.
**Test Steps**: Login → catalog → click View details → verify URL contains /product/.
**Expected Results**: Caregiver navigates to a product detail page.

---

### TC_SCRUM405_002 — Product Detail Page Has Product Heading
**Priority**: Highest
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**: Verify H1 heading visible with non-empty text.
**Expected Results**: Product heading is displayed.

---

### TC_SCRUM405_003 — Product Detail Page Has Price
**Priority**: High
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**: Verify body contains ₹ price.
**Expected Results**: Price in ₹ format visible.

---

### Feature: Contact Vendor Button Presence

---

### TC_SCRUM405_004 — Contact Vendor Button/Section Exists on Product Detail Page
**Priority**: Highest
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**: Scroll to bottom → verify Contact Vendor element present.
**Expected Results**: Contact Vendor element is present.

---

### TC_SCRUM405_005 — Contact Vendor Section is Accessible on Page
**Priority**: High
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**: Scroll → verify contact/vendor/inquiry text present.
**Expected Results**: Contact section is accessible.

---

### Feature: No PwD Profile — Disabled State

---

### TC_SCRUM405_006 — "No PwD profiles found" Message When No PwD Exists
**Priority**: Highest
**Preconditions**: Caregiver has no PwD profiles.
**Test Steps**: Navigate to product detail → check for message.
**Expected Results**: Message state is validated.

---

### TC_SCRUM405_007 — "Add PwD Profile" CTA Visible When No PwD Exists
**Priority**: Highest
**Preconditions**: Caregiver has no PwD profiles.
**Test Steps**: Navigate to product detail → check for CTA.
**Expected Results**: CTA state is validated.

---

### TC_SCRUM405_008 — "Add PwD Profile" CTA Not Primary When PwDs Exist
**Priority**: Highest
**Preconditions**: Caregiver has PwD profiles.
**Test Steps**: Navigate to product detail → verify PwD selection is primary.
**Expected Results**: PwD selection is primary interaction.

---

### TC_SCRUM405_009 — Contact Vendor Button Disabled When No PwD Profile Exists
**Priority**: Highest
**Preconditions**: Caregiver has no PwD profiles.
**Test Steps**: Navigate to product detail → locate Contact Vendor → verify disabled.
**Expected Results**: Contact Vendor button is disabled.

---

### TC_SCRUM405_010 — Contact Vendor Button State Reflects PwD Availability
**Priority**: Highest
**Preconditions**: Caregiver is on product detail page.
**Test Steps**: Locate Contact Vendor → check state.
**Expected Results**: Button state reflects PwD availability.

---

### Feature: Contact Without PwD — Blocked

---

### TC_SCRUM405_011 — Clicking Contact Vendor Without PwD Does Not Submit Inquiry
**Priority**: Highest
**Preconditions**: Caregiver has no PwD selected.
**Test Steps**: Attempt Contact Vendor → verify no success message.
**Expected Results**: Inquiry is not submitted.

---

### TC_SCRUM405_012 — No Navigation Away After Blocked Contact Attempt
**Priority**: Highest
**Preconditions**: Caregiver attempted contact without PwD.
**Test Steps**: Attempt Contact Vendor → verify URL still contains /product/.
**Expected Results**: Caregiver remains on product page.

---

### TC_SCRUM405_013 — Inline Guidance Displayed When Contact Attempted Without PwD
**Priority**: Highest
**Preconditions**: Caregiver attempted contact without PwD.
**Test Steps**: Attempt Contact Vendor → check for validation message.
**Expected Results**: Inline guidance about PwD displayed.

---

### TC_SCRUM405_014 — Inline Guidance Contains PwD/Select Keywords
**Priority**: Highest
**Preconditions**: Caregiver attempted contact without PwD.
**Test Steps**: Verify body contains PwD/select/required keywords.
**Expected Results**: Guidance references PwD selection requirement.

---

### Feature: Mandatory Indicator

---

### TC_SCRUM405_015 — PwD Selection Field Has Mandatory Indicator
**Priority**: High
**Preconditions**: Caregiver is on product detail page.
**Test Steps**: Look for asterisk or 'required' near PwD field.
**Expected Results**: Mandatory indicator present.

---

### TC_SCRUM405_016 — PwD Selection Dropdown/Field Present on Product Detail
**Priority**: High
**Preconditions**: Caregiver is on product detail page.
**Test Steps**: Check for PwD selection element.
**Expected Results**: PwD selection element present.

---

### Feature: PwD Selection on Product Detail

---

### TC_SCRUM405_017 — PwD Dropdown on Product Detail Lists Available PwDs
**Priority**: High
**Preconditions**: Caregiver is on product detail page.
**Test Steps**: Locate PwD selection → verify options.
**Expected Results**: PwD dropdown lists available PwDs.

---

### TC_SCRUM405_018 — Selecting a PwD Updates the Selection State
**Priority**: High
**Preconditions**: Caregiver is on product detail page.
**Test Steps**: Select PwD → verify state updates.
**Expected Results**: Selection state updated.

---

### Feature: Contact Vendor Enabled After PwD Selection

---

### TC_SCRUM405_019 — Contact Vendor Button Enabled After PwD Selection
**Priority**: Highest
**Preconditions**: Caregiver selected a PwD.
**Test Steps**: Select PwD → verify Contact Vendor enabled.
**Expected Results**: Contact Vendor button enabled.

---

### TC_SCRUM405_020 — Contact Vendor Button is Clickable After PwD Selection
**Priority**: Highest
**Preconditions**: Caregiver selected a PwD.
**Test Steps**: Select PwD → click Contact Vendor → verify response.
**Expected Results**: Contact Vendor button is clickable.

---

### Feature: Edge Case — PwDs Exist None Selected

---

### TC_SCRUM405_021 — Contact Vendor Blocked When PwDs Exist But None Selected
**Priority**: High
**Preconditions**: PwDs exist but none selected.
**Test Steps**: Do NOT select PwD → attempt Contact Vendor → verify blocked.
**Expected Results**: Contact Vendor is blocked.

---

### TC_SCRUM405_022 — Validation Message When PwDs Exist But None Selected
**Priority**: Medium
**Preconditions**: PwDs exist but none selected.
**Test Steps**: Attempt Contact Vendor → check for validation message.
**Expected Results**: Validation message displayed.

---

### Feature: Edge Case — Page Refresh

---

### TC_SCRUM405_023 — Page Refresh Retains Contact Vendor Disabled State
**Priority**: Medium
**Preconditions**: Caregiver is on product detail page.
**Test Steps**: Verify state → reload → verify state persists.
**Expected Results**: Disabled state persists after refresh.

---

### TC_SCRUM405_024 — PwD Selection State Resets on Page Refresh
**Priority**: Low
**Preconditions**: Caregiver selected a PwD.
**Test Steps**: Select PwD → reload → verify state.
**Expected Results**: State handled gracefully on refresh.

---

### Feature: Contact Vendor Form

---

### TC_SCRUM405_025 — Contact Vendor Section Has Form Fields or Contact Info
**Priority**: Medium
**Preconditions**: Caregiver is on product detail page.
**Test Steps**: Scroll to contact section → verify content.
**Expected Results**: Contact section has form fields or contact info.

---

### TC_SCRUM405_026 — Contact Vendor Form Requires PwD Before Showing Full Form
**Priority**: Medium
**Preconditions**: Caregiver has no PwD selected.
**Test Steps**: Check form hidden without PwD → select PwD → check form visible.
**Expected Results**: Form gated behind PwD selection.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM405_027 — Mobile Viewport Renders Contact Vendor Section Correctly
**Priority**: Lowest
**Preconditions**: Browser viewport set to mobile.
**Test Steps**: Navigate to product detail → set mobile viewport → verify content.
**Expected Results**: Contact Vendor section renders correctly.

---

### TC_SCRUM405_028 — Back to Catalog Link Works From Product Detail Page
**Priority**: Low
**Preconditions**: Caregiver is on product detail page.
**Test Steps**: Click back to catalog → verify URL contains /catalog.
**Expected Results**: Navigation to catalog works.

---

### TC_SCRUM405_029 — Multiple Products Have Consistent Contact Vendor Behavior
**Priority**: Low
**Preconditions**: Caregiver is on catalog page.
**Test Steps**: Check first product → go back → check second product.
**Expected Results**: Consistent behavior across products.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Caregiver email                  | `cg1@yopmail.com`                                        |
| Caregiver password               | `cg1@141G`                                               |
| Base URL                         | `https://qa-atad.swarajability.org/`                     |
| Catalog URL                      | `https://qa-atad.swarajability.org/catalog/`             |
| Desktop viewport                 | 1280×720                                                 |
| Mobile viewport                  | 375×667                                                  |

---

## 5. Assumptions & Dependencies

- The caregiver account `cg1@yopmail.com` has at least one PwD linked to it.
- Authentication uses the SSO flow.
- Product detail page accessed via "View details" links on catalog.
- Contact Vendor button/section exists on product detail page.
- PwD selection is required before contacting a vendor.
- **Note**: The test account HAS PwD profiles, so "No PwD" tests document behavior rather than assert absence.
- **DO NOT CHANGE**: CaregiverRecommendationsPage.ts must not be modified.
