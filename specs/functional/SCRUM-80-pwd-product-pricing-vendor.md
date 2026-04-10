# SCRUM-80: PwD - View Product Pricing and Vendor Information — Functional Test Plan

**Version:** 2.0
**Story:** SCRUM-80
**Total Test Cases:** 33
**Test Type:** Functional

---

## User Story

**As a** PwD user,
**I want to** view the product's price and vendor details,
**So that** I can understand the cost and the seller's reputation.

---

## Acceptance Criteria Summary

1. Product price is displayed clearly below the product name
2. If pricing is not available, placeholder text appears (e.g., "Contact vendor for pricing")
3. Clicking "Contact Vendor" opens a popup with vendor contact details; clicks are tracked as interest for analytics
4. Vendor popup includes: vendor name, vendor logo (if available), phone numbers, email, address, website

---



## 3. Test Scenarios

### Feature: Product Price Display

---

### TC_SCRUM80_001 — Product price is visible on the product details page
**Priority**: Highest
**Related Jira Issue**: SCRUM-80
**Preconditions**: User is logged in and on a product details page.
**Test Steps**:
1. Log in and navigate to a product details page.
2. Verify the price element is visible.
**Expected Results**:
- Price element is visible.

---

### TC_SCRUM80_002 — Price is displayed below the product name
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Compare vertical position of product name and price elements.
**Expected Results**:
- Price is positioned below the product name.

---

### TC_SCRUM80_003 — Price includes proper currency symbol (₹)
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Read the price text content.
**Expected Results**:
- Price includes ₹ currency symbol.

---

### Feature: Price Unavailable State

---

### TC_SCRUM80_004 — Placeholder text shown when price is unavailable
**Priority**: Highest
**Related Jira Issue**: SCRUM-80
**Preconditions**: User is on a product with no price set.
**Test Steps**:
1. Navigate to a product that has no price set.
2. Verify placeholder text is displayed.
**Expected Results**:
- Placeholder text is displayed instead of price.

---

### Feature: Contact Vendor Button

---

### TC_SCRUM80_005 — Contact Vendor button is visible on product details page
**Priority**: Highest
**Related Jira Issue**: SCRUM-80
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify 'Contact Vendor' button is visible.
**Expected Results**:
- 'Contact Vendor' button is visible.

---

### TC_SCRUM80_006 — Clicking Contact Vendor opens the vendor popup
**Priority**: Highest
**Related Jira Issue**: SCRUM-80
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Click 'Contact Vendor' button.
3. Verify popup opens.
**Expected Results**:
- Clicking 'Contact Vendor' opens the vendor popup.

---

### TC_SCRUM80_007 — Contact Vendor button is keyboard-focusable and activatable via Enter
**Priority**: Medium
**Related Jira Issue**: SCRUM-80
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Tab to the Contact Vendor button.
2. Press Enter.
3. Verify popup opens.
**Expected Results**:
- Contact Vendor button is focusable via Tab and activatable via Enter.

---

### TC_SCRUM80_008 — Opening popup does not cause page navigation or reload
**Priority**: Medium
**Related Jira Issue**: SCRUM-80
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Note the current URL.
2. Click Contact Vendor.
3. Compare URL after popup opens.
**Expected Results**:
- URL does not change when popup opens.

---

### Feature: Vendor Popup Content

---

### TC_SCRUM80_009 — Vendor popup displays vendor name
**Priority**: Highest
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify vendor name is visible.
**Expected Results**:
- Vendor name is visible in the popup.

---

### TC_SCRUM80_010 — Vendor popup displays vendor logo when available
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Check for vendor logo image.
**Expected Results**:
- Vendor logo image is present when available.

---

### TC_SCRUM80_011 — Vendor popup displays phone number(s)
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify phone number text is visible.
**Expected Results**:
- Phone number text is visible.

---

### TC_SCRUM80_012 — Phone number is rendered as tel: link
**Priority**: Medium
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify phone is an <a href='tel:'> link.
**Expected Results**:
- Phone is rendered as a tel: link.

---

### TC_SCRUM80_013 — Vendor popup displays email address
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify email text is visible.
**Expected Results**:
- Email address text is visible.

---

### TC_SCRUM80_014 — Email is rendered as mailto: link
**Priority**: Medium
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify email is an <a href='mailto:'> link.
**Expected Results**:
- Email is rendered as a mailto: link.

---

### TC_SCRUM80_015 — Vendor popup displays vendor address
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify address text is visible.
**Expected Results**:
- Vendor address text is visible.

---

### TC_SCRUM80_016 — Vendor popup displays vendor website link
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify website link is present with valid href.
**Expected Results**:
- Website link is present with valid href.

---

### Feature: Vendor Popup Dialog Behavior

---

### TC_SCRUM80_017 — Vendor popup has a visible title
**Priority**: Medium
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify popup title/heading is visible.
**Expected Results**:
- Popup title/heading is visible.

---

### TC_SCRUM80_018 — Popup renders as a dialog element
**Priority**: Medium
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Inspect the popup container for role attribute.
**Expected Results**:
- Popup container has dialog role.

---

### TC_SCRUM80_019 — Popup behaves as a modal overlay
**Priority**: Medium
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify it has aria-modal='true' or is a native <dialog>.
**Expected Results**:
- Popup has aria-modal='true' or is a native dialog.

---

### TC_SCRUM80_020 — Dialog content uses paragraphs and links
**Priority**: Low
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify <p> and <a> elements exist inside dialog.
**Expected Results**:
- Dialog content contains paragraphs and links.

---

### TC_SCRUM80_021 — Dialog has a close mechanism
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify close link/button is present.
**Expected Results**:
- Close link/button is present.

---

### Feature: Popup Keyboard & Focus

---

### TC_SCRUM80_022 — Focus moves inside dialog on open
**Priority**: Highest
**Related Jira Issue**: SCRUM-80
**Preconditions**: User clicks Contact Vendor.
**Test Steps**:
1. Click Contact Vendor to open popup.
2. Check which element has focus.
**Expected Results**:
- Focus moves inside the dialog on open.

---

### TC_SCRUM80_023 — Tab key cycles within dialog without escaping
**Priority**: Highest
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Press Tab 5 times.
3. Verify dialog is still open.
**Expected Results**:
- Tab key cycles within dialog without escaping.

---

### TC_SCRUM80_024 — Pressing Esc closes the dialog
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Press Escape key.
3. Verify dialog closes.
**Expected Results**:
- Pressing Esc closes the dialog.

---

### TC_SCRUM80_025 — Focus returns to Contact Vendor button after dialog closes
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup was open and closed.
**Test Steps**:
1. Open vendor popup.
2. Close via Esc.
3. Check which element has focus.
**Expected Results**:
- Focus returns to Contact Vendor button.

---

### TC_SCRUM80_026 — All links inside dialog are reachable via Tab
**Priority**: Medium
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Tab through all links.
3. Verify dialog stays open.
**Expected Results**:
- All links inside dialog are reachable via Tab.

---

### TC_SCRUM80_027 — Focus indicators are visible on interactive elements
**Priority**: Low
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Tab to an element.
3. Verify outline or box-shadow is visible.
**Expected Results**:
- Focus indicators are visible on interactive elements.

---

### Feature: Responsive & Layout

---

### TC_SCRUM80_028 — Background page is non-interactive while popup is open
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Verify dialog role is present.
**Expected Results**:
- Background page is non-interactive.

---

### TC_SCRUM80_029 — Dialog fits within mobile viewport without clipping
**Priority**: High
**Related Jira Issue**: SCRUM-80
**Preconditions**: Browser viewport set to mobile (375x667).
**Test Steps**:
1. Set viewport to mobile (375x667).
2. Open vendor popup.
3. Verify dialog fits within viewport.
**Expected Results**:
- Dialog fits within mobile viewport without clipping.

---

### TC_SCRUM80_030 — Close control has non-zero dimensions
**Priority**: Low
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup is open.
**Test Steps**:
1. Open vendor popup.
2. Measure close control bounding box.
**Expected Results**:
- Close control has non-zero dimensions.

---

### TC_SCRUM80_031 — Close control remains visible at small viewport
**Priority**: Low
**Related Jira Issue**: SCRUM-80
**Preconditions**: Browser viewport set to 375x400.
**Test Steps**:
1. Set viewport to 375x400.
2. Open vendor popup.
3. Verify close control is visible.
**Expected Results**:
- Close control remains visible at small viewport.

---

### TC_SCRUM80_032 — Dialog scrolls internally when content exceeds viewport
**Priority**: Lowest
**Related Jira Issue**: SCRUM-80
**Preconditions**: Browser viewport set to 375x400.
**Test Steps**:
1. Set viewport to 375x400.
2. Open vendor popup.
3. Verify vendor name is still readable.
**Expected Results**:
- Dialog scrolls internally when content exceeds viewport.

---

### TC_SCRUM80_033 — Vendor popup can be reopened after closing
**Priority**: Lowest
**Related Jira Issue**: SCRUM-80
**Preconditions**: Vendor popup was closed.
**Test Steps**:
1. Open vendor popup.
2. Close via Esc.
3. Reopen vendor popup.
4. Verify content is visible.
**Expected Results**:
- Vendor popup can be reopened and content is visible.

---

## Test Data

| Field | Value |
|---|---|
| Base URL | https://qa-atad.swarajability.org/ |
| Product Details URL | https://qa-atad.swarajability.org/catalog/{product-slug} |
| Credentials | candidate8new1@mailto.plus / 123456 |
| Page Load Threshold | 5000ms |

---

## Out of Scope

- Accessibility testing (WCAG 2.1 AA contrast, semantic markup, ARIA attributes) — to be covered separately
- Backend API performance testing
- Analytics tracking validation

---

## Test Scenarios

### Suite 1: Product Price Display (TC_SCRUM80_001–003)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM80_001 | Product price is visible on the product details page | Highest |
| TC_SCRUM80_002 | Price is displayed below the product name | High |
| TC_SCRUM80_003 | Price includes proper currency symbol (₹) | High |

### Suite 2: Price Unavailable State (TC_SCRUM80_004)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM80_004 | Placeholder text shown when price is unavailable | Highest |

### Suite 3: Contact Vendor Button (TC_SCRUM80_005–008)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM80_005 | "Contact Vendor" button is visible on product details page | Highest |
| TC_SCRUM80_006 | Clicking "Contact Vendor" opens the vendor popup | Highest |
| TC_SCRUM80_007 | "Contact Vendor" button is keyboard-focusable and activatable via Enter | Medium |
| TC_SCRUM80_008 | Opening popup does not cause page navigation or reload | Medium |

### Suite 4: Vendor Popup — Content (TC_SCRUM80_009–016)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM80_009 | Vendor popup displays vendor name | Highest |
| TC_SCRUM80_010 | Vendor popup displays vendor logo (when available) | High |
| TC_SCRUM80_011 | Vendor popup displays phone number(s) | High |
| TC_SCRUM80_012 | Phone number is rendered as `tel:` link | Medium |
| TC_SCRUM80_013 | Vendor popup displays email address | High |
| TC_SCRUM80_014 | Email is rendered as `mailto:` link | Medium |
| TC_SCRUM80_015 | Vendor popup displays vendor address | High |
| TC_SCRUM80_016 | Vendor popup displays vendor website link | High |

### Suite 5: Vendor Popup — Dialog Behavior (TC_SCRUM80_017–021)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM80_017 | Vendor popup has a visible title | Medium |
| TC_SCRUM80_018 | Popup renders as a dialog element | Medium |
| TC_SCRUM80_019 | Popup behaves as a modal overlay | Medium |
| TC_SCRUM80_020 | Dialog content uses paragraphs and links | Low |
| TC_SCRUM80_021 | Dialog has a close mechanism | High |

### Suite 6: Popup Keyboard & Focus (TC_SCRUM80_022–027)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM80_022 | Focus moves inside dialog on open | Highest |
| TC_SCRUM80_023 | Tab key cycles within dialog without escaping | Highest |
| TC_SCRUM80_024 | Pressing Esc closes the dialog | High |
| TC_SCRUM80_025 | Focus returns to Contact Vendor button after dialog closes | High |
| TC_SCRUM80_026 | All links inside dialog are reachable via Tab | Medium |
| TC_SCRUM80_027 | Focus indicators are visible on interactive elements | Low |

### Suite 7: Responsive & Layout (TC_SCRUM80_028–033)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM80_028 | Background page is non-interactive while popup is open | High |
| TC_SCRUM80_029 | Dialog fits within mobile viewport without clipping | High |
| TC_SCRUM80_030 | Close control has non-zero dimensions | Low |
| TC_SCRUM80_031 | Close control remains visible at small viewport | Low |
| TC_SCRUM80_032 | Dialog scrolls internally when content exceeds viewport | Lowest |
| TC_SCRUM80_033 | Vendor popup can be reopened after closing | Lowest |

---

## Traceability Matrix

| AC# | Acceptance Criteria | Test Cases |
|---|---|---|
| AC1 | Price displayed clearly below product name | TC_001–003 |
| AC2 | Placeholder text when pricing unavailable | TC_004 |
| AC3 | Contact Vendor opens popup | TC_005–008 |
| AC4 | Vendor popup includes name, logo, phone, email, address, website | TC_009–016 |
| Popup | Dialog behavior, title, close mechanism | TC_017–021 |
| Keyboard | Keyboard operability, focus management | TC_022–027 |
| Responsive | Mobile layout, scroll, reopen | TC_028–033 |

---

## Assumptions

1. Tests run as authenticated PwD user (candidate8new1@mailto.plus)
2. At least one product exists with a visible price and associated vendor
3. At least one product exists without a price to test the placeholder state
4. Vendor popup is a modal dialog (Elementor off-canvas widget with shadow DOM)
5. Login flow uses Authentik auth with shadow DOM consent page handling

## Open Questions

1. Is the vendor popup the same "Contact Vendor" off-canvas from SCRUM-79, or a separate modal?
2. What is the exact placeholder text when price is unavailable?
3. How is the analytics tracking implemented — API call, GTM event, or data attribute?
4. Can a product have multiple vendors, and if so, how are they listed in the popup?
