# SCRUM-442: Admin Sign-In - Accessibility Bugs

---

## Bug 1: SSO login page missing lang attribute on HTML element

**Summary:** [A11Y] SSO login page (authentik) missing `lang` attribute on `<html>` element - screen readers cannot determine page language (WCAG 3.1.1)

**Type:** Bug
**Priority:** High
**Severity:** Major
**Component:** Admin Sign-In - SSO Login Page
**Labels:** accessibility, wcag, language, a11y-audit
**Linked Issue:** SCRUM-442
**Affects Version:** QA
**Environment:** https://hub-ui-admin-qa.swarajability.org/ → SSO flow (authentik)

**Description:**
The SSO login page (powered by authentik) does not have a `lang` attribute on the `<html>` element. Screen readers rely on this attribute to determine the language of the page content and apply correct pronunciation rules. Without it, screen readers may mispronounce text or use incorrect language settings.

**Steps to Reproduce:**
1. Navigate to https://hub-ui-admin-qa.swarajability.org/
2. Click "Sign in with Swarajability" button
3. Wait for SSO login page to load (authentik)
4. Inspect the `<html>` element in DevTools
5. Check for `lang` attribute

**Expected Result:**
The `<html>` element should have `lang="en"` (or appropriate language code):
```html
<html lang="en">
```

**Actual Result:**
The `<html>` element has no `lang` attribute:
```html
<html>
```

**WCAG Reference:** 3.1.1 Language of Page (Level A)
**Impact:** Screen readers cannot determine the language of the page, potentially mispronouncing all content for users who rely on text-to-speech.

**Note:** This is on the third-party SSO provider (authentik) page, not the main application. The fix needs to be applied in the authentik configuration or template.

**Suggested Fix:**
Add `lang="en"` to the `<html>` element in the authentik flow template:
```html
<html lang="en">
```
