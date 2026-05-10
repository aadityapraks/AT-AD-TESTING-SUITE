# SCRUM-514: Admin Add a New Product - Accessibility Bugs

---

## Bug 1: 7 form input fields missing programmatic labels (Critical)

**Summary:** [A11Y] CRITICAL - 7 input fields on Admin Add Product form have no label, aria-label, or aria-labelledby (WCAG 1.3.1)

**Type:** Bug
**Priority:** Critical
**Severity:** Critical
**Component:** Admin - Add Product Form / Input Fields
**Labels:** accessibility, wcag, form-labels, screen-reader, a11y-audit
**Linked Issue:** SCRUM-514
**Affects Version:** QA
**Environment:** https://hub-ui-admin-qa.swarajability.org/admin/products

**Description:**
7 input fields on the Admin Add New Product form have no programmatic label association. They rely solely on placeholder text or visual proximity. Screen reader users cannot identify what information to enter.

**Steps to Reproduce:**
1. Log in as Admin (pv@mailto.plus)
2. Navigate to Product Management → Add Product
3. Inspect form input fields
4. Check for `<label for>`, `aria-label`, or `aria-labelledby` — 7 fields have NONE

**Expected Result:**
All fields should have `<label for="fieldId">` or `aria-label`.

**Actual Result:**
7 fields have no programmatic label. Screen readers announce only "edit" with no context.

**WCAG Reference:** 1.3.1 Info and Relationships (Level A), 4.1.2 Name, Role, Value (Level A)
**Impact:** Screen reader users cannot identify the purpose of 7 form fields.

**Suggested Fix:**
Add `<label for="fieldId">` elements or `aria-label` attributes to all unlabeled inputs.

---

## Bug 2: 3 select dropdowns have no accessible name (Critical)

**Summary:** [A11Y] CRITICAL - 3 select elements (Product Type, Usage Environment, Disability Percentage) have no accessible name (WCAG 4.1.2)

**Type:** Bug
**Priority:** Critical
**Severity:** Critical
**Component:** Admin - Add Product Form / Dropdowns
**Labels:** accessibility, wcag, select-name, form-labels, a11y-audit
**Linked Issue:** SCRUM-514
**Affects Version:** QA
**Environment:** https://hub-ui-admin-qa.swarajability.org/admin/products

**Description:**
Three `<select>` elements on the Add Product form have no accessible name. Axe-core reports `select-name` violation for:
- `<select name="productType">`
- `<select name="usageEnvironment">`
- `<select name="disabilityPercentage">`

Screen readers announce these as "combobox" with no indication of what to select.

**Steps to Reproduce:**
1. Log in as Admin
2. Navigate to Product Management → Add Product
3. Inspect the Product Type, Usage Environment, and Disability Percentage dropdowns
4. Check for associated `<label>`, `aria-label`, or `aria-labelledby` — NONE

**Expected Result:**
```html
<label for="productType">Product Type</label>
<select id="productType" name="productType">...</select>
```

**Actual Result:**
```html
<select name="productType" class="form-select">...</select>
```
No label, no aria-label. Screen reader announces: "combobox".

**WCAG Reference:** 4.1.2 Name, Role, Value (Level A)
**Axe Rule:** select-name
**Impact:** Screen reader users cannot identify what these dropdowns are for.

**Suggested Fix:**
Add `<label for="...">` or `aria-label` to each select element.

---

## Bug 3: No required/aria-required on mandatory fields (Major)

**Summary:** [A11Y] Admin Add Product form mandatory fields have no required or aria-required attribute (WCAG 3.3.2)

**Type:** Bug
**Priority:** High
**Severity:** Major
**Component:** Admin - Add Product Form / Required Fields
**Labels:** accessibility, wcag, form-validation, required-fields, a11y-audit
**Linked Issue:** SCRUM-514
**Affects Version:** QA
**Environment:** https://hub-ui-admin-qa.swarajability.org/admin/products

**Description:**
The Add Product form has mandatory fields but none have `required` or `aria-required="true"`. Screen readers cannot announce which fields are mandatory.

**WCAG Reference:** 3.3.2 Labels or Instructions (Level A)

**Suggested Fix:**
Add `aria-required="true"` to all mandatory fields.

---

## Bug 4: "Select disability type first" placeholder insufficient contrast (Major)

**Summary:** [A11Y] Placeholder text "Select disability type first" has insufficient contrast on Admin Add Product form (WCAG 1.4.3)

**Type:** Bug
**Priority:** High
**Severity:** Major
**Component:** Admin - Add Product Form / Disability Type Dropdown
**Labels:** accessibility, wcag, color-contrast, placeholder, a11y-audit
**Linked Issue:** SCRUM-514
**Affects Version:** QA
**Environment:** https://hub-ui-admin-qa.swarajability.org/admin/products

**Description:**
The "Select disability type first" placeholder label has insufficient color contrast, failing WCAG 2.1 AA minimum of 4.5:1.

**WCAG Reference:** 1.4.3 Contrast (Minimum) - Level AA
**Axe Rule:** color-contrast

**Suggested Fix:**
Darken the placeholder text color to achieve 4.5:1 contrast.
