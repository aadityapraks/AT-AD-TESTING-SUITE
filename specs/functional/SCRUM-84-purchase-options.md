# Functional Test Plan: SCRUM-84 — PwD - View Available Purchase Options

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-84](https://youth4jobs.atlassian.net//browse/SCRUM-84) |
| Status      | In QA                                        |
| Assignee    | Kamilath Rifka Sameem Ali                    |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?p=f&t=ThxKWawF59kREh5H-0) |

### Scope & Objectives
Validate that PwD users can view available purchase options (Amazon, Flipkart, vendor website) via the Contact Vendor popup on the product detail page. Covers: popup opens with Buy Online section (AC1), marketplace links displayed (AC2), consistent button/link style (AC3), only valid links shown (AC4), links open in new tab (AC5), empty state message (AC6), responsive layout (AC7).

### Out of Scope
- Vendor-side link management
- Backend link validation logic
- Payment/checkout flow on external sites

---



## 3. Test Scenarios

### Feature: Product Detail Access

---

### TC_SCRUM84_001 — Product detail page loads with product heading
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: PwD is logged in.
**Test Steps**:
1. Login as PwD.
2. Navigate to catalog.
3. Click first View details.
4. Verify H1 heading visible.
**Expected Results**:
- Product detail page loads with heading.

---

### Feature: Contact Vendor Button

---

### TC_SCRUM84_002 — Contact Vendor button visible on product detail page
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: PwD is on product detail page.
**Test Steps**:
1. Navigate to product detail.
2. Verify Contact Vendor button visible.
**Expected Results**:
- Contact Vendor button visible.

---

### TC_SCRUM84_003 — Clicking Contact Vendor opens popup
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: PwD is on product detail page.
**Test Steps**:
1. Click Contact Vendor.
2. Verify popup/dialog opens.
**Expected Results**:
- Popup opens.

---

### Feature: Buy Online Section

---

### TC_SCRUM84_004 — Popup contains Buy Online section
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: Contact Vendor popup is open.
**Test Steps**:
1. Open Contact Vendor popup.
2. Verify popup body contains 'buy online' or 'purchase' text.
**Expected Results**:
- Buy Online section visible.

---

### TC_SCRUM84_005 — Buy Online section shows marketplace links
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: Contact Vendor popup is open.
**Test Steps**:
1. Open popup.
2. Verify links for Amazon, Flipkart, or vendor website present.
**Expected Results**:
- Marketplace links visible.

---

### Feature: Marketplace Links

---

### TC_SCRUM84_006 — Amazon link is present in Buy Online section
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: Product has Amazon purchase link.
**Test Steps**:
1. Open popup.
2. Verify link containing 'amazon' exists.
**Expected Results**:
- Amazon link present.

---

### TC_SCRUM84_007 — Additional purchase link (Flipkart or other) present in Buy Online section
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: Product has Flipkart purchase link.
**Test Steps**:
1. Open popup.
2. Verify any e-commerce or vendor purchase link exists.
**Expected Results**:
- At least one purchase link present.

---

### TC_SCRUM84_008 — Vendor website link is present in Buy Online section
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Product has vendor website link.
**Test Steps**:
1. Open popup.
2. Verify vendor website link exists.
**Expected Results**:
- Vendor website link present.

---

### Feature: Link Style

---

### TC_SCRUM84_009 — Each purchase option is a button or link element
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: Buy Online section has links.
**Test Steps**:
1. Open popup.
2. Verify purchase options are <a> or <button> elements.
**Expected Results**:
- Options are button or link elements.

---

### TC_SCRUM84_010 — Purchase links have consistent styling
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Multiple purchase links visible.
**Test Steps**:
1. Open popup.
2. Verify all purchase links have similar visual style.
**Expected Results**:
- Consistent styling across links.

---

### Feature: Link Validity

---

### TC_SCRUM84_011 — Purchase links have valid href attributes
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: Buy Online section has links.
**Test Steps**:
1. Open popup.
2. Verify each purchase link has a non-empty href starting with http.
**Expected Results**:
- All links have valid href.

---

### TC_SCRUM84_012 — Only valid active links are displayed
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Buy Online section visible.
**Test Steps**:
1. Open popup.
2. Verify no broken or empty links visible.
**Expected Results**:
- Only valid links displayed.

---

### Feature: New Tab Behavior

---

### TC_SCRUM84_013 — Clicking Amazon link opens in new tab
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: Amazon link present.
**Test Steps**:
1. Open popup.
2. Verify Amazon link has target='_blank'.
**Expected Results**:
- Amazon link opens in new tab.

---

### TC_SCRUM84_014 — Clicking Flipkart link opens in new tab
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: Flipkart link present.
**Test Steps**:
1. Open popup.
2. Verify Flipkart link has target='_blank'.
**Expected Results**:
- Flipkart link opens in new tab.

---

### TC_SCRUM84_015 — Clicking vendor website link opens in new tab
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Vendor website link present.
**Test Steps**:
1. Open popup.
2. Verify vendor website link has target='_blank'.
**Expected Results**:
- Vendor link opens in new tab.

---

### TC_SCRUM84_016 — Purchase links have rel='noopener' for security
**Priority**: Medium
**Related Jira Issue**: SCRUM-84
**Preconditions**: Purchase links present.
**Test Steps**:
1. Open popup.
2. Verify external links have rel='noopener' or 'noreferrer'.
**Expected Results**:
- Links have rel='noopener'.

---

### Feature: Empty State

---

### TC_SCRUM84_017 — No online purchase options message when no links available
**Priority**: Highest
**Related Jira Issue**: SCRUM-84
**Preconditions**: Product has no purchase links.
**Test Steps**:
1. Navigate to product with no purchase links.
2. Open popup.
3. Verify message 'No online purchase options currently available'.
**Expected Results**:
- Empty state message shown.

---

### TC_SCRUM84_018 — Empty state message is user-friendly
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: No purchase links available.
**Test Steps**:
1. Verify empty state message is clear and non-technical.
**Expected Results**:
- Message is user-friendly.

---

### Feature: Popup Content

---

### TC_SCRUM84_019 — Popup still shows vendor contact info alongside Buy Online
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Contact Vendor popup open.
**Test Steps**:
1. Open popup.
2. Verify vendor name, phone, email visible alongside Buy Online.
**Expected Results**:
- Vendor info and Buy Online both visible.

---

### Feature: Popup Behavior

---

### TC_SCRUM84_020 — Popup has close mechanism
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Popup is open.
**Test Steps**:
1. Open popup.
2. Verify close button/link present.
**Expected Results**:
- Close mechanism present.

---

### TC_SCRUM84_021 — Pressing Esc closes the popup
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Popup is open.
**Test Steps**:
1. Open popup.
2. Press Escape.
3. Verify popup closes.
**Expected Results**:
- Esc closes popup.

---

### TC_SCRUM84_022 — Popup can be reopened after closing
**Priority**: Medium
**Related Jira Issue**: SCRUM-84
**Preconditions**: Popup was closed.
**Test Steps**:
1. Open popup.
2. Close it.
3. Reopen.
4. Verify content visible.
**Expected Results**:
- Popup reopens with content.

---

### TC_SCRUM84_023 — URL does not change when popup opens
**Priority**: Medium
**Related Jira Issue**: SCRUM-84
**Preconditions**: PwD is on product detail.
**Test Steps**:
1. Note URL.
2. Open popup.
3. Verify URL unchanged.
**Expected Results**:
- URL unchanged.

---

### Feature: Keyboard Accessibility

---

### TC_SCRUM84_024 — Purchase links are keyboard accessible
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Popup is open.
**Test Steps**:
1. Open popup.
2. Tab to purchase links.
3. Verify focus reaches them.
**Expected Results**:
- Purchase links keyboard accessible.

---

### TC_SCRUM84_025 — Purchase links have visible focus indicator
**Priority**: Medium
**Related Jira Issue**: SCRUM-84
**Preconditions**: Popup is open.
**Test Steps**:
1. Tab to a purchase link.
2. Verify focus outline visible.
**Expected Results**:
- Focus indicator visible.

---

### TC_SCRUM84_026 — Purchase links have accessible labels
**Priority**: Medium
**Related Jira Issue**: SCRUM-84
**Preconditions**: Popup is open.
**Test Steps**:
1. Verify purchase links have aria-label or descriptive text.
**Expected Results**:
- Accessible labels present.

---

### Feature: Responsive Layout

---

### TC_SCRUM84_027 — Mobile viewport — popup fits without clipping
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Mobile viewport (375×667).
**Test Steps**:
1. Set mobile viewport.
2. Open popup.
3. Verify popup fits.
**Expected Results**:
- Popup fits mobile viewport.

---

### TC_SCRUM84_028 — Mobile viewport — Buy Online links visible
**Priority**: High
**Related Jira Issue**: SCRUM-84
**Preconditions**: Mobile viewport.
**Test Steps**:
1. Set mobile viewport.
2. Open popup.
3. Verify Buy Online links visible.
**Expected Results**:
- Buy Online links visible on mobile.

---

### TC_SCRUM84_029 — Tablet viewport — popup renders correctly
**Priority**: Medium
**Related Jira Issue**: SCRUM-84
**Preconditions**: Tablet viewport (768×1024).
**Test Steps**:
1. Set tablet viewport.
2. Open popup.
3. Verify content visible.
**Expected Results**:
- Popup renders on tablet.

---

### Feature: Consistency

---

### TC_SCRUM84_030 — Multiple products have consistent Buy Online behavior
**Priority**: Low
**Related Jira Issue**: SCRUM-84
**Preconditions**: PwD is on catalog.
**Test Steps**:
1. Check popup on first product.
2. Go back.
3. Check popup on second product.
**Expected Results**:
- Consistent behavior across products.

---

### Feature: Link Style

---

### TC_SCRUM84_031 — Purchase links text is descriptive (e.g., Buy on Amazon)
**Priority**: Low
**Related Jira Issue**: SCRUM-84
**Preconditions**: Purchase links present.
**Test Steps**:
1. Open popup.
2. Verify link text is descriptive, not just URL.
**Expected Results**:
- Descriptive link text.

---

### Feature: Navigation

---

### TC_SCRUM84_032 — Back navigation from product detail works after popup interaction
**Priority**: Low
**Related Jira Issue**: SCRUM-84
**Preconditions**: PwD interacted with popup.
**Test Steps**:
1. Open and close popup.
2. Navigate back.
3. Verify catalog loads.
**Expected Results**:
- Back navigation works.

---

### TC_SCRUM84_033 — Page refresh retains product detail after popup interaction
**Priority**: Lowest
**Related Jira Issue**: SCRUM-84
**Preconditions**: PwD interacted with popup.
**Test Steps**:
1. Open and close popup.
2. Reload page.
3. Verify product detail intact.
**Expected Results**:
- Product detail intact after refresh.

---

## Test Data

| Data Item          | Value                                    |
|--------------------|------------------------------------------|
| PwD email          | `candidate8new1@mailto.plus`             |
| PwD password       | `123456`                                 |
| Base URL           | `https://qa-atad.swarajability.org/`     |
| Desktop viewport   | 1280×720                                 |
| Mobile viewport    | 375×667                                  |
