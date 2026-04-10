# Functional Test Plan: SCRUM-408 — Caregiver - Guide Caregiver to Add PwD Before Inquiry

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-408](https://youth4jobs.atlassian.net//browse/SCRUM-408) |
| Status      | In QA                                        |
| Assignee    | prathamesh v                                 |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that the system guides a logged-in Caregiver to add a PwD profile before making a vendor inquiry. Covers: "Add PwD Profile" CTA navigates to PwD registration flow, after successful PwD creation user returns to product page with newly added PwD auto-selected/selectable and Contact Vendor enabled, helper text explains why PwD selection is required. Edge cases: PwD creation abandoned (returns with no PwD selected), PwD limit reached (clear message, CTA disabled), network failure during PwD creation (retry option).

### Out of Scope
- Full PwD registration form field validation (covered by PwD registration stories)
- Vendor contact form submission success flow (after PwD is selected)
- Backend API performance testing
- Caregiver registration/login flow
- Accessibility testing (screen reader, keyboard-only)

---

## 2. Requirements Traceability Matrix (30 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Product detail page accessible from catalog                      | TC_SCRUM408_001, 002                      | Highest  |
| "Add PwD Profile" CTA visible on product detail page             | TC_SCRUM408_003, 004                      | Highest  |
| Clicking "Add PwD Profile" navigates to PwD registration flow    | TC_SCRUM408_005, 006                      | Highest  |
| PwD registration page loads correctly                            | TC_SCRUM408_007, 008                      | Highest  |
| After PwD creation → returned to product page                    | TC_SCRUM408_009, 010                      | Highest  |
| Newly added PwD is auto-selected or selectable                   | TC_SCRUM408_011, 012                      | Highest  |
| Contact Vendor button becomes enabled after PwD creation         | TC_SCRUM408_013, 014                      | Highest  |
| Helper text explains why PwD selection is required               | TC_SCRUM408_015, 016, 017                 | High     |
| Helper text visible before PwD selection                         | TC_SCRUM408_018, 019                      | High     |
| PwD creation abandoned → returns with no PwD selected (EC1)      | TC_SCRUM408_020, 021                      | High     |
| PwD limit reached → clear message shown, CTA disabled (EC2)      | TC_SCRUM408_022, 023                      | Medium   |
| Network failure during PwD creation → retry option (EC3)         | TC_SCRUM408_024, 025                      | Medium   |
| Mobile viewport renders Add PwD flow correctly                   | TC_SCRUM408_026                           | Low      |
| Multiple products have consistent Add PwD CTA behavior           | TC_SCRUM408_027                           | Low      |
| Page refresh retains Add PwD CTA state                           | TC_SCRUM408_028                           | Low      |
| Back navigation from PwD registration returns to product page    | TC_SCRUM408_029                           | Lowest   |
| Add PwD CTA styling is distinct and discoverable                 | TC_SCRUM408_030                           | Lowest   |

---

## 3. Test Scenarios

### Feature: Product Detail Page Access (Prerequisite)

---

### TC_SCRUM408_001 — Caregiver Can Navigate to Product Detail Page From Catalog
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is logged in and on the catalog page.
**Test Steps**:
1. Login as caregiver.
2. Navigate to the catalog page.
3. Click the first "View details" link.
4. Verify the URL contains `/product/` or page has product content.
**Expected Results**:
- Caregiver navigates to a product detail page.
**Postconditions**: Caregiver is on a product detail page.

---

### TC_SCRUM408_002 — Product Detail Page Has Product Heading
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Navigate to a product detail page.
2. Verify an H1 heading is visible with non-empty text.
**Expected Results**:
- Product detail page displays a product heading.
**Postconditions**: Product detail page is loaded.

---

### Feature: "Add PwD Profile" CTA Presence (AC1)

---

### TC_SCRUM408_003 — "Add PwD Profile" CTA Visible on Product Detail Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Navigate to a product detail page.
2. Scroll to bottom to ensure all content is loaded.
3. Check for "Add PwD Profile" button, link, or CTA element.
**Expected Results**:
- "Add PwD Profile" CTA is visible on the product detail page (or page contains "Add PwD" text).
**Postconditions**: CTA is identified.

---

### TC_SCRUM408_004 — "Add PwD Profile" CTA is a Clickable Element
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Navigate to a product detail page.
2. Locate the "Add PwD Profile" element.
3. Verify it is a button, link, or clickable element.
**Expected Results**:
- "Add PwD Profile" CTA is a clickable element (button or link).
**Postconditions**: CTA is interactive.

---

### Feature: "Add PwD Profile" Navigation to Registration (AC1)

---

### TC_SCRUM408_005 — Clicking "Add PwD Profile" Navigates to PwD Registration Flow
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page with "Add PwD Profile" CTA visible.
**Test Steps**:
1. Navigate to a product detail page.
2. Click the "Add PwD Profile" CTA.
3. Verify the URL changes or a registration form/modal appears.
**Expected Results**:
- Caregiver is navigated to the PwD registration flow.
**Postconditions**: PwD registration flow is initiated.

---

### TC_SCRUM408_006 — PwD Registration Flow URL or Modal is Correct
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver clicked "Add PwD Profile".
**Test Steps**:
1. Click "Add PwD Profile".
2. Verify the URL contains registration-related path (e.g., `/register`, `/add-pwd`, `/profile`) or a modal/form is displayed.
**Expected Results**:
- PwD registration flow is correctly loaded.
**Postconditions**: Registration flow is active.

---

### Feature: PwD Registration Page Loads (AC1)

---

### TC_SCRUM408_007 — PwD Registration Page Has Form Fields
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on the PwD registration flow.
**Test Steps**:
1. Click "Add PwD Profile".
2. Verify the page/modal contains form fields (textboxes, dropdowns, or input elements).
**Expected Results**:
- PwD registration form has input fields.
**Postconditions**: Form is ready for input.

---

### TC_SCRUM408_008 — PwD Registration Page Has Submit/Save Button
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on the PwD registration flow.
**Test Steps**:
1. Click "Add PwD Profile".
2. Verify a "Submit", "Save", "Create", or "Add" button exists.
**Expected Results**:
- PwD registration form has a submit/save action.
**Postconditions**: Form can be submitted.

---

### Feature: After PwD Creation — Return to Product Page (AC2)

---

### TC_SCRUM408_009 — After PwD Creation User Returns to Product Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver completed PwD registration.
**Test Steps**:
1. Navigate to product detail page.
2. Click "Add PwD Profile".
3. Complete PwD registration (or simulate completion).
4. Verify the URL returns to `/product/` or product page content is visible.
**Expected Results**:
- User is returned to the product page after PwD creation.
**Postconditions**: Caregiver is back on product detail page.

---

### TC_SCRUM408_010 — Product Page Content is Intact After Return From PwD Creation
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver returned to product page after PwD creation.
**Test Steps**:
1. After returning from PwD creation, verify the product heading (H1) is still visible.
2. Verify the page body contains product-related content.
**Expected Results**:
- Product page content is intact after returning from PwD creation.
**Postconditions**: Product page is fully loaded.

---

### Feature: Newly Added PwD Auto-Selected/Selectable (AC2)

---

### TC_SCRUM408_011 — Newly Added PwD is Auto-Selected or Selectable After Creation
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver returned to product page after PwD creation.
**Test Steps**:
1. After PwD creation and return to product page, check the PwD selection element.
2. Verify the newly added PwD is auto-selected or available in the dropdown.
**Expected Results**:
- Newly added PwD is auto-selected or selectable.
**Postconditions**: PwD is available for vendor contact.

---

### TC_SCRUM408_012 — PwD Dropdown Shows Updated List After New PwD Creation
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver returned to product page after PwD creation.
**Test Steps**:
1. After PwD creation, locate the PwD selection dropdown/trigger.
2. Open the dropdown.
3. Verify the list includes the newly created PwD.
**Expected Results**:
- PwD dropdown reflects the newly created PwD.
**Postconditions**: PwD list is updated.

---

### Feature: Contact Vendor Enabled After PwD Creation (AC2)

---

### TC_SCRUM408_013 — Contact Vendor Button Becomes Enabled After PwD Creation
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver returned to product page with newly created PwD selected.
**Test Steps**:
1. After PwD creation and return, verify the Contact Vendor button is enabled.
**Expected Results**:
- Contact Vendor button is enabled after PwD creation.
**Postconditions**: Button is ready for use.

---

### TC_SCRUM408_014 — Contact Vendor Button is Clickable After PwD Creation
**Priority**: Highest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Contact Vendor is enabled after PwD creation.
**Test Steps**:
1. After PwD creation, click the Contact Vendor button.
2. Verify the page responds (form opens, modal appears, or navigation occurs).
**Expected Results**:
- Contact Vendor button is functional after PwD creation.
**Postconditions**: Contact flow is initiated.

---

### Feature: Helper Text Explains PwD Requirement (AC3)

---

### TC_SCRUM408_015 — Helper Text Visible on Product Detail Page
**Priority**: High
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Navigate to a product detail page.
2. Scroll to the Contact Vendor / PwD selection area.
3. Verify helper text is visible explaining PwD selection requirement.
**Expected Results**:
- Helper text is visible near the PwD selection / Contact Vendor area.
**Postconditions**: Helper text is displayed.

---

### TC_SCRUM408_016 — Helper Text Contains PwD/Required Keywords
**Priority**: High
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Navigate to a product detail page.
2. Verify the page body contains keywords like "PwD", "required", "select", "add", or "profile".
**Expected Results**:
- Helper text references PwD selection requirement.
**Postconditions**: Helper text is informative.

---

### TC_SCRUM408_017 — Helper Text Explains Why PwD Selection is Needed
**Priority**: High
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Navigate to a product detail page.
2. Verify the page body contains explanatory text about why PwD is needed for vendor contact (e.g., "to contact vendor", "inquiry", "personalized").
**Expected Results**:
- Helper text explains the purpose of PwD selection.
**Postconditions**: Explanation is clear.

---

### Feature: Helper Text Visibility Before PwD Selection

---

### TC_SCRUM408_018 — Helper Text Visible Before Any PwD is Selected
**Priority**: High
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page, no PwD selected.
**Test Steps**:
1. Navigate to a product detail page without selecting a PwD.
2. Verify helper text or guidance is visible.
**Expected Results**:
- Helper text is shown before PwD selection.
**Postconditions**: Guidance is proactive.

---

### TC_SCRUM408_019 — Helper Text Disappears or Changes After PwD is Selected
**Priority**: High
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Note the helper text state before PwD selection.
2. Select a PwD (if dropdown available).
3. Verify the helper text changes, disappears, or updates.
**Expected Results**:
- Helper text state updates after PwD selection.
**Postconditions**: UI reflects PwD selection.

---

### Feature: Edge Case — PwD Creation Abandoned (EC1)

---

### TC_SCRUM408_020 — Abandoning PwD Creation Returns to Product Page With No PwD Selected
**Priority**: High
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver clicked "Add PwD Profile" and is on registration flow.
**Test Steps**:
1. Click "Add PwD Profile".
2. Navigate back (browser back or cancel) without completing registration.
3. Verify the URL returns to `/product/` or product page content is visible.
4. Verify no PwD is selected.
**Expected Results**:
- Caregiver returns to product page with no PwD selected.
**Postconditions**: Contact Vendor remains blocked.

---

### TC_SCRUM408_021 — Contact Vendor Remains Disabled After Abandoned PwD Creation
**Priority**: High
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver abandoned PwD creation and returned to product page.
**Test Steps**:
1. After abandoning PwD creation, verify Contact Vendor button state.
2. Verify it is disabled or blocked.
**Expected Results**:
- Contact Vendor remains disabled after abandoned PwD creation.
**Postconditions**: System correctly handles abandoned flow.

---

### Feature: Edge Case — PwD Limit Reached (EC2)

---

### TC_SCRUM408_022 — Clear Message Shown When PwD Limit is Reached
**Priority**: Medium
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver has reached the maximum number of PwD profiles.
**Test Steps**:
1. Navigate to a product detail page.
2. Check for a message indicating PwD limit has been reached.
**Expected Results**:
- A clear message is shown when PwD limit is reached.
**Postconditions**: Message is informative.

---

### TC_SCRUM408_023 — "Add PwD Profile" CTA Disabled When PwD Limit Reached
**Priority**: Medium
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver has reached the maximum number of PwD profiles.
**Test Steps**:
1. Navigate to a product detail page.
2. Locate the "Add PwD Profile" CTA.
3. Verify it is disabled or not clickable.
**Expected Results**:
- "Add PwD Profile" CTA is disabled when PwD limit is reached.
**Postconditions**: CTA is correctly disabled.

---

### Feature: Edge Case — Network Failure During PwD Creation (EC3)

---

### TC_SCRUM408_024 — Retry Option Provided on Network Failure During PwD Creation
**Priority**: Medium
**Related Jira Issue**: SCRUM-408
**Preconditions**: Network failure occurs during PwD creation.
**Test Steps**:
1. Click "Add PwD Profile".
2. Simulate or observe network failure scenario.
3. Verify a retry option or error message is displayed.
**Expected Results**:
- Retry option or error message is provided on network failure.
**Postconditions**: User can retry.

---

### TC_SCRUM408_025 — Error Message on Network Failure is User-Friendly
**Priority**: Medium
**Related Jira Issue**: SCRUM-408
**Preconditions**: Network failure occurred during PwD creation.
**Test Steps**:
1. Observe the error message displayed on network failure.
2. Verify it is user-friendly (not a raw error code).
**Expected Results**:
- Error message is clear and user-friendly.
**Postconditions**: User understands the issue.

---

### Feature: Edge Case — Additional

---

### TC_SCRUM408_026 — Mobile Viewport Renders Add PwD Flow Correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is logged in.
**Test Steps**:
1. Navigate to a product detail page.
2. Set viewport to mobile (375×667).
3. Verify "Add PwD Profile" CTA or PwD-related content is visible.
**Expected Results**:
- Add PwD flow renders correctly on mobile viewport.
**Postconditions**: Mobile layout is functional.

---

### TC_SCRUM408_027 — Multiple Products Have Consistent Add PwD CTA Behavior
**Priority**: Low
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on the catalog page.
**Test Steps**:
1. Click the first "View details" link, verify Add PwD / PwD-related content exists.
2. Navigate back to catalog.
3. Click the second "View details" link, verify same content exists.
**Expected Results**:
- Add PwD CTA behavior is consistent across different products.
**Postconditions**: Consistency is validated.

---

### TC_SCRUM408_028 — Page Refresh Retains Add PwD CTA State
**Priority**: Low
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Navigate to a product detail page.
2. Note the Add PwD CTA state.
3. Reload the page.
4. Verify the CTA state is retained.
**Expected Results**:
- Page refresh does not break the Add PwD CTA.
**Postconditions**: CTA state persists.

---

### TC_SCRUM408_029 — Back Navigation From PwD Registration Returns to Product Page
**Priority**: Lowest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver clicked "Add PwD Profile" and is on registration flow.
**Test Steps**:
1. Click "Add PwD Profile".
2. Use browser back button.
3. Verify the URL returns to `/product/` or product page content is visible.
**Expected Results**:
- Browser back from PwD registration returns to product page.
**Postconditions**: Navigation is correct.

---

### TC_SCRUM408_030 — Add PwD CTA Styling is Distinct and Discoverable
**Priority**: Lowest
**Related Jira Issue**: SCRUM-408
**Preconditions**: Caregiver is on a product detail page.
**Test Steps**:
1. Navigate to a product detail page.
2. Scroll to the PwD / Contact Vendor area.
3. Verify the page body contains "Add PwD" or "add" and "profile" related text.
**Expected Results**:
- Add PwD CTA is discoverable on the page.
**Postconditions**: CTA is visible.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Caregiver email                  | `cg1@yopmail.com`                                        |
| Caregiver password               | `cg1@141G`                                               |
| Base URL                         | `https://qa-atad.swarajability.org/`                     |
| Catalog URL                      | `https://qa-atad.swarajability.org/catalog/`             |
| Login required                   | Yes — caregiver must be authenticated                    |
| Desktop viewport                 | 1280×720                                                 |
| Mobile viewport                  | 375×667                                                  |
| PwD accounts linked to caregiver | At least 1 PwD with profile data                         |

---

## 5. Assumptions & Dependencies

- The caregiver account `cg1@yopmail.com` has at least one PwD linked to it.
- Authentication uses the SSO flow: "Sign In/Register" → popup → "Sign In with SwarajAbility" → Email → "Log in" → Password → "Continue" → Consent "Continue" → redirect.
- The product detail page is accessed via "View details" links on the catalog page.
- An "Add PwD Profile" CTA (button or link) exists on the product detail page when no PwD is selected or as an additional option.
- Clicking "Add PwD Profile" navigates to a PwD registration flow (new page, modal, or inline form).
- After successful PwD creation, the user is returned to the product page with the new PwD auto-selected or selectable.
- Helper text near the PwD selection / Contact Vendor area explains why PwD selection is required.
- **Note**: The test account `cg1@yopmail.com` HAS PwD profiles, so "Add PwD Profile" CTA may not be prominently shown. Tests verify the CTA's existence and behavior where applicable.
- **Note**: EC2 (PwD limit reached) and EC3 (network failure) are difficult to test with the standard test account — tests document expected behavior.
- **Dependency**: SCRUM-405 covers preventing vendor contact without PwD; SCRUM-408 covers guiding the caregiver to add a PwD.
- **DO NOT CHANGE**: CaregiverRecommendationsPage.ts page object must not be modified.

---

## 6. Open Questions / Clarifications Needed

1. **Add PwD CTA location**: Is the "Add PwD Profile" CTA on the product detail page, in the PwD dropdown, or both?
2. **PwD registration flow**: Is it a new page, modal, or inline form?
3. **Return behavior**: After PwD creation, does the system auto-redirect to the product page or does the user manually navigate back?
4. **PwD limit**: What is the maximum number of PwD profiles a caregiver can have?
5. **Network failure retry**: Is the retry option a button, auto-retry, or a "try again" link?
