# Functional Test Plan: SCRUM-86 — PwD - Handle Missing, Unsafe, or Disabled Links



## 3. Test Scenarios

### Feature: Product Access

---

### TC_SCRUM86_001 — Product detail page loads for target product
**Priority**: Highest
**Related Jira Issue**: SCRUM-86
**Preconditions**: PwD logged in.
**Test Steps**:
1. Login.
2. Search target product.
3. Click View details.
4. Verify H1 visible.
**Expected Results**:
- Product detail page loads.

---

### TC_SCRUM86_002 — Contact Vendor popup opens
**Priority**: Highest
**Related Jira Issue**: SCRUM-86
**Preconditions**: On product detail.
**Test Steps**:
1. Open Contact Vendor popup.
2. Verify dialog visible.
**Expected Results**:
- Popup opens.

---

### Feature: Missing Links Hidden

---

### TC_SCRUM86_003 — Missing links are hidden — no empty href buttons visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-86
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify no a[href=''] or a:not([href]) visible.
**Expected Results**:
- No empty/missing links visible.

---

### TC_SCRUM86_004 — No blank or dead links on the interface
**Priority**: Highest
**Related Jira Issue**: SCRUM-86
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify all visible links have valid href starting with http.
**Expected Results**:
- No blank/dead links.

---

### TC_SCRUM86_005 — No broken link text (e.g., 'undefined', 'null')
**Priority**: Highest
**Related Jira Issue**: SCRUM-86
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify no link text contains 'undefined' or 'null'.
**Expected Results**:
- No broken link text.

---

### Feature: Unsafe Link Placeholder

---

### TC_SCRUM86_006 — Unsafe/expired link shows placeholder message
**Priority**: Highest
**Related Jira Issue**: SCRUM-86
**Preconditions**: Product has unsafe/expired link.
**Test Steps**:
1. Open popup.
2. If unsafe link exists, verify placeholder message visible.
**Expected Results**:
- Placeholder message shown.

---

### TC_SCRUM86_007 — Placeholder message text is user-friendly
**Priority**: High
**Related Jira Issue**: SCRUM-86
**Preconditions**: Placeholder message visible.
**Test Steps**:
1. If placeholder visible, verify text is clear and non-technical.
**Expected Results**:
- Message is user-friendly.

---

### Feature: Fallback

---

### TC_SCRUM86_008 — Contact Vendor option remains available as fallback
**Priority**: Highest
**Related Jira Issue**: SCRUM-86
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify vendor contact info (name, phone, email) still visible.
**Expected Results**:
- Vendor contact info available.

---

### TC_SCRUM86_009 — Vendor name visible in popup as fallback
**Priority**: Highest
**Related Jira Issue**: SCRUM-86
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify vendor name visible.
**Expected Results**:
- Vendor name visible.

---

### TC_SCRUM86_010 — Vendor phone visible in popup as fallback
**Priority**: High
**Related Jira Issue**: SCRUM-86
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify phone number visible.
**Expected Results**:
- Phone visible.

---

### TC_SCRUM86_011 — Vendor email visible in popup as fallback
**Priority**: High
**Related Jira Issue**: SCRUM-86
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Verify email visible.
**Expected Results**:
- Email visible.

---

### Feature: Accessibility — Placeholder

---

### TC_SCRUM86_012 — Placeholder messages use role=alert for assistive tech
**Priority**: High
**Related Jira Issue**: SCRUM-86
**Preconditions**: Placeholder message visible.
**Test Steps**:
1. If placeholder visible, verify it has role='alert' or aria-live.
**Expected Results**:
- role=alert present.

---

### Feature: Accessibility — Non-Color Cues

---

### TC_SCRUM86_013 — Error states use non-color cues (icons or text)
**Priority**: High
**Related Jira Issue**: SCRUM-86
**Preconditions**: Error state visible.
**Test Steps**:
1. If error/placeholder visible, verify it uses icon or text, not color alone.
**Expected Results**:
- Non-color cues used.

---

### Feature: Accessibility — Contrast

---

### TC_SCRUM86_014 — Placeholder messages meet 4.5:1 contrast ratio
**Priority**: Medium
**Related Jira Issue**: SCRUM-86
**Preconditions**: Placeholder visible.
**Test Steps**:
1. If placeholder visible, verify text color vs background meets 4.5:1.
**Expected Results**:
- Contrast ratio met.

---

### Feature: Popup Behavior

---

### TC_SCRUM86_015 — Popup can be closed and reopened after viewing links
**Priority**: Medium
**Related Jira Issue**: SCRUM-86
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Close via Esc.
3. Reopen.
4. Verify content intact.
**Expected Results**:
- Popup reopens with content.

---

### TC_SCRUM86_016 — Pressing Esc closes popup
**Priority**: Medium
**Related Jira Issue**: SCRUM-86
**Preconditions**: Popup open.
**Test Steps**:
1. Open popup.
2. Press Esc.
3. Verify closed.
**Expected Results**:
- Esc closes popup.

---

### Feature: Navigation

---

### TC_SCRUM86_017 — URL unchanged after popup interaction
**Priority**: Low
**Related Jira Issue**: SCRUM-86
**Preconditions**: On product detail.
**Test Steps**:
1. Note URL.
2. Open/close popup.
3. Verify URL same.
**Expected Results**:
- URL unchanged.

---

### Feature: Responsive

---

### TC_SCRUM86_018 — Mobile viewport — popup renders correctly
**Priority**: Low
**Related Jira Issue**: SCRUM-86
**Preconditions**: Mobile viewport.
**Test Steps**:
1. Set mobile viewport.
2. Open popup.
3. Verify content visible.
**Expected Results**:
- Popup renders on mobile.

---

### Feature: Navigation

---

### TC_SCRUM86_019 — Page refresh retains product detail
**Priority**: Lowest
**Related Jira Issue**: SCRUM-86
**Preconditions**: On product detail.
**Test Steps**:
1. Reload page.
2. Verify product detail intact.
**Expected Results**:
- Product detail retained.

---

### TC_SCRUM86_020 — Back navigation works
**Priority**: Lowest
**Related Jira Issue**: SCRUM-86
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
