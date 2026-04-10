# Functional Test Plan: SCRUM-85 — PwD - Accessibility for Purchase Links



## 3. Test Scenarios

### Feature: Product Access

---

### TC_SCRUM85_001 — Product detail page loads for target product
**Priority**: Highest
**Related Jira Issue**: SCRUM-85
**Preconditions**: PwD logged in.
**Test Steps**:
1. Login.
2. Search 'wheelchair 28th jan'.
3. Click View details.
4. Verify H1 visible.
**Expected Results**:
- Product detail page loads.

---

### TC_SCRUM85_002 — Contact Vendor popup opens
**Priority**: Highest
**Related Jira Issue**: SCRUM-85
**Preconditions**: On product detail.
**Test Steps**:
1. Open Contact Vendor popup.
2. Verify dialog visible.
**Expected Results**:
- Popup opens.

---

### Feature: Semantic Heading

---

### TC_SCRUM85_003 — Buy Online heading is semantic (h2 or h3)
**Priority**: Highest
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify Buy Online heading is h2 or h3 element.
**Expected Results**:
- Heading is h2 or h3.

---

### TC_SCRUM85_004 — Buy Online heading is screen-reader navigable
**Priority**: Highest
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify heading has text content.
**Expected Results**:
- Heading navigable by screen reader.

---

### Feature: Accessible Labels

---

### TC_SCRUM85_005 — Purchase links have aria-label describing action and destination
**Priority**: Highest
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open with links.
**Test Steps**:
1. Open popup.
2. Verify purchase links have aria-label or descriptive text.
**Expected Results**:
- Links have accessible labels.

---

### TC_SCRUM85_006 — Aria-label includes 'opens in new tab' for external links
**Priority**: Highest
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open with external links.
**Test Steps**:
1. Open popup.
2. Verify external links mention 'new tab' in aria-label or sr-only text.
**Expected Results**:
- New tab indicated in label.

---

### TC_SCRUM85_007 — External link icons include hidden text or ARIA label
**Priority**: High
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify external link icons have sr-only text or aria-label.
**Expected Results**:
- Icons have accessible text.

---

### Feature: Keyboard Operability

---

### TC_SCRUM85_008 — Purchase links are keyboard operable with Tab
**Priority**: Highest
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Press Tab.
3. Verify focus reaches purchase links.
**Expected Results**:
- Links reachable via Tab.

---

### TC_SCRUM85_009 — Purchase links activatable via Enter key
**Priority**: Highest
**Related Jira Issue**: SCRUM-85
**Preconditions**: Focus on purchase link.
**Test Steps**:
1. Tab to a purchase link.
2. Press Enter.
3. Verify action triggered.
**Expected Results**:
- Enter activates link.

---

### Feature: Focus Order

---

### TC_SCRUM85_010 — Focus order flows logically in popup
**Priority**: High
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Tab through elements.
3. Verify logical order.
**Expected Results**:
- Focus order is logical.

---

### Feature: Focus Indicators

---

### TC_SCRUM85_011 — Focus indicators clearly visible on purchase links
**Priority**: Highest
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Tab to purchase link.
2. Verify visible focus outline/ring.
**Expected Results**:
- Focus indicator visible.

---

### Feature: Color Contrast

---

### TC_SCRUM85_012 — Links meet minimum color contrast ratio 4.5:1
**Priority**: High
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify link text color vs background meets 4.5:1.
**Expected Results**:
- Contrast ratio met.

---

### Feature: Link States

---

### TC_SCRUM85_013 — Link states (default, hover, focus) are visually distinct
**Priority**: High
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Observe default state.
3. Hover link.
4. Tab to link.
5. Verify states differ.
**Expected Results**:
- States visually distinct.

---

### Feature: Disabled Links

---

### TC_SCRUM85_014 — Disabled links are programmatically hidden
**Priority**: High
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify no disabled/greyed-out links visible (hidden instead).
**Expected Results**:
- Disabled links hidden, not greyed.

---

### Feature: Screen Reader

---

### TC_SCRUM85_015 — Screen reader announces link purpose and context
**Priority**: Medium
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify links have text content or aria-label describing purpose.
**Expected Results**:
- Link purpose announced.

---

### Feature: Mobile Touch

---

### TC_SCRUM85_016 — Mobile touch targets >= 44x44 px
**Priority**: Medium
**Related Jira Issue**: SCRUM-85
**Preconditions**: Mobile viewport.
**Test Steps**:
1. Set mobile viewport.
2. Open popup.
3. Verify link bounding box >= 44x44.
**Expected Results**:
- Touch targets >= 44x44.

---

### Feature: Navigation Safety

---

### TC_SCRUM85_017 — No unexpected navigation after clicking link
**Priority**: Medium
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Click a purchase link.
3. Verify original page still intact.
**Expected Results**:
- No unexpected navigation.

---

### Feature: Dialog ARIA

---

### TC_SCRUM85_018 — Popup dialog has proper ARIA role
**Priority**: Low
**Related Jira Issue**: SCRUM-85
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify dialog has role='dialog'.
**Expected Results**:
- Dialog has proper role.

---

### Feature: Navigation

---

### TC_SCRUM85_019 — Page refresh retains product detail
**Priority**: Low
**Related Jira Issue**: SCRUM-85
**Preconditions**: On product detail.
**Test Steps**:
1. Reload page.
2. Verify product detail intact.
**Expected Results**:
- Product detail retained.

---

### TC_SCRUM85_020 — Back navigation works from product detail
**Priority**: Lowest
**Related Jira Issue**: SCRUM-85
**Preconditions**: On product detail.
**Test Steps**:
1. Go back.
2. Verify catalog loads.
**Expected Results**:
- Back navigation works.

---

## Test Data
| Data Item | Value |
|-----------|-------|
| PwD email | `candidate8new1@mailto.plus` |
| PwD password | `123456` |
| Base URL | `https://qa-atad.swarajability.org/` |
| Target Product | `wheelchair 28th jan` |
| Desktop viewport | 1280×720 |
| Mobile viewport | 375×667 |
