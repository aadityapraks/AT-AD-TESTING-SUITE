# Accessibility Issues Identified – SCRUM-17

**Jira Story:** SCRUM-17  
**Feature:** Assistive Partner (AP) Registration and Sign-in from Y4J Hub  
**WCAG Target:** WCAG 2.1 AA  
**Date:** 2025-01-29  
**Total Issues:** 17 (4 Critical, 6 High, 7 Medium)

---

## Critical Issues

### A11Y-SCRUM17-001
**WCAG Criterion:** 4.1.3 Status Messages (Level AA)  
**Component:** OTP Send Confirmation  
**Observed Behavior:** When user clicks "Send OTP" button, a visual message "OTP sent to your email" appears, but no aria-live region exists to announce this to screen readers.  
**Why This Is a Problem:** Screen reader users receive no feedback that the OTP was sent. They don't know if the action succeeded or if they should wait.  
**Who Is Impacted:** Screen reader users (blind users)  
**Severity:** Critical  
**Evidence:** The OTP sent message is a dynamic status update that appears without focus change. Without aria-live="polite" or role="status", screen readers remain silent.  
**Fix:** Wrap the "OTP sent" message in a container with `aria-live="polite"` or `role="status"`.

---

### A11Y-SCRUM17-002
**WCAG Criterion:** 2.4.3 Focus Order (Level A)  
**Component:** OTP Input Field Appearance  
**Observed Behavior:** After clicking "Send OTP", the OTP input field appears dynamically below the email field, but focus remains on the "Send OTP" button. User must manually tab to find the new input.  
**Why This Is a Problem:** Keyboard and screen reader users don't know a new field appeared. They must explore the page to discover it, breaking the natural flow.  
**Who Is Impacted:** Keyboard-only users, screen reader users  
**Severity:** Critical  
**Evidence:** Dynamic form fields that appear without focus management create confusion. Users expect focus to move to the newly revealed content.  
**Fix:** After OTP is sent, programmatically move focus to the OTP input field using `element.focus()`.

---

### A11Y-SCRUM17-003
**WCAG Criterion:** 3.3.1 Error Identification (Level A)  
**Component:** Form Validation Errors  
**Observed Behavior:** When form is submitted with missing required fields, error messages appear visually next to each field, but are not programmatically linked to the inputs.  
**Why This Is a Problem:** Screen reader users navigating to an invalid field hear only the label, not the error message. They don't know what's wrong.  
**Who Is Impacted:** Screen reader users  
**Severity:** Critical  
**Evidence:** Error messages must be associated with their inputs using `aria-describedby` pointing to the error message ID. Without this, errors are invisible to assistive technology.  
**Fix:** Add `aria-describedby="email-error"` to the email input, and ensure error message has `id="email-error"`. Set `aria-invalid="true"` on invalid fields.

---

### A11Y-SCRUM17-004
**WCAG Criterion:** 4.1.2 Name, Role, Value (Level A)  
**Component:** Verify Button Disabled State  
**Observed Behavior:** The "Verify" button is disabled until 6 digits are entered. The disabled state is only indicated visually (grayed out), without `aria-disabled="true"` or proper state announcement.  
**Why This Is a Problem:** Screen reader users tab to the button and hear "Verify, button" with no indication it's disabled. They attempt to activate it and nothing happens, causing confusion.  
**Who Is Impacted:** Screen reader users  
**Severity:** Critical  
**Evidence:** Disabled buttons must have `aria-disabled="true"` or the `disabled` attribute. Screen readers must announce "Verify, button, disabled" or "Verify, button, unavailable".  
**Fix:** Add `disabled` attribute or `aria-disabled="true"` to the button. When enabled, remove the attribute and announce the state change.

---

## High Severity Issues

### A11Y-SCRUM17-005
**WCAG Criterion:** 4.1.3 Status Messages (Level AA)  
**Component:** OTP Verification Success  
**Observed Behavior:** After successful OTP verification, a green checkmark and "Verified" text appear next to the email field, but this status change is not announced to screen readers.  
**Why This Is a Problem:** Screen reader users don't receive confirmation that verification succeeded. They must manually navigate back to check the status.  
**Who Is Impacted:** Screen reader users  
**Severity:** High  
**Evidence:** Status changes that don't move focus require aria-live announcements. The verification success is critical feedback that must be communicated.  
**Fix:** Add `aria-live="polite"` to the verification status container, or use `role="status"` with text content "Email verified successfully".

---

### A11Y-SCRUM17-006
**WCAG Criterion:** 4.1.2 Name, Role, Value (Level A)  
**Component:** Cascading Dropdowns (State → District → Mandal)  
**Observed Behavior:** When State is selected, District dropdown becomes enabled, but this state change is not announced. Screen reader users don't know District is now available.  
**Why This Is a Problem:** Users tab past the disabled District dropdown, then later wonder why they can't complete the form. The relationship between dropdowns is not communicated.  
**Who Is Impacted:** Screen reader users  
**Severity:** High  
**Evidence:** Dependent form controls that change from disabled to enabled must announce this change. Without aria-live or focus management, the change is silent.  
**Fix:** When District becomes enabled, announce "District field is now available" using aria-live="polite". Consider adding `aria-describedby` to State dropdown explaining "Selecting a state will enable district selection".

---

### A11Y-SCRUM17-007
**WCAG Criterion:** 3.3.1 Error Identification (Level A)  
**Component:** Invalid OTP Error  
**Observed Behavior:** When user enters wrong OTP and clicks Verify, an error message "Invalid OTP" appears visually, but is not announced to screen readers and not linked to the OTP input field.  
**Why This Is a Problem:** Screen reader users don't hear the error. They don't know verification failed or why.  
**Who Is Impacted:** Screen reader users  
**Severity:** High  
**Evidence:** Inline error messages appearing after user action must be announced via aria-live and linked to the field via aria-describedby.  
**Fix:** Add `aria-live="assertive"` to error message container. Link error to OTP field with `aria-describedby="otp-error"`. Set `aria-invalid="true"` on OTP input.

---

### A11Y-SCRUM17-008
**WCAG Criterion:** 2.4.3 Focus Order (Level A)  
**Component:** Form Submission Error Summary  
**Observed Behavior:** When form is submitted with errors, an error summary appears at the top of the form, but focus remains on the Submit button at the bottom. Users don't know errors occurred.  
**Why This Is a Problem:** Keyboard and screen reader users miss the error summary entirely. They don't know submission failed or what to fix.  
**Who Is Impacted:** Keyboard-only users, screen reader users  
**Severity:** High  
**Evidence:** Error summaries must receive focus on form submission failure. This is a standard pattern for accessible forms.  
**Fix:** Move focus to the error summary heading after validation fails. Use `errorSummary.focus()` and ensure the summary has `tabindex="-1"` and `role="alert"`.

---

### A11Y-SCRUM17-009
**WCAG Criterion:** 3.3.2 Labels or Instructions (Level A)  
**Component:** OTP Input Field  
**Observed Behavior:** The OTP input field appears with placeholder "Enter 6-digit OTP" but no visible label or programmatic label.  
**Why This Is a Problem:** Screen reader users hear "Edit, text" with no context about what to enter. Placeholder text is not a substitute for labels and disappears when typing.  
**Who Is Impacted:** Screen reader users, cognitive disability users  
**Severity:** High  
**Evidence:** All form inputs require visible labels. Placeholders are not accessible labels and are not announced consistently.  
**Fix:** Add a visible `<label for="otp-input">Enter OTP</label>` or use `aria-label="Enter 6-digit OTP code"` on the input.

---

### A11Y-SCRUM17-010
**WCAG Criterion:** 4.1.3 Status Messages (Level AA)  
**Component:** OTP Expiry Notification  
**Observed Behavior:** When OTP expires, an error message "OTP has expired. Please request a new one" appears visually, but is not announced to screen readers.  
**Why This Is a Problem:** Screen reader users attempt to verify an expired OTP and receive no feedback about why verification fails.  
**Who Is Impacted:** Screen reader users  
**Severity:** High  
**Evidence:** Time-based status changes must be announced. Expiry is a critical state change that affects user workflow.  
**Fix:** Use `aria-live="assertive"` for expiry message since it's time-sensitive and requires immediate attention.

---

## Medium Severity Issues

### A11Y-SCRUM17-011
**WCAG Criterion:** 1.4.1 Use of Color (Level A)  
**Component:** Required Field Indicators  
**Observed Behavior:** Required fields are marked with a red asterisk (*), but no programmatic indication exists. Color is the only differentiator.  
**Why This Is a Problem:** Screen reader users don't know which fields are required. Color-blind users may not see the red asterisk.  
**Who Is Impacted:** Screen reader users, color-blind users  
**Severity:** Medium  
**Evidence:** Required fields must have `aria-required="true"` or `required` attribute. Visual indicators alone are insufficient.  
**Fix:** Add `aria-required="true"` to all required inputs. Include text "(required)" in labels or provide a legend explaining the asterisk.

---

### A11Y-SCRUM17-012
**WCAG Criterion:** 2.5.3 Label in Name (Level A)  
**Component:** File Upload Button  
**Observed Behavior:** The file upload button shows "Upload Logo" visually, but has `aria-label="Choose file"` which doesn't match the visible text.  
**Why This Is a Problem:** Voice control users say "Click Upload Logo" but the command fails because the accessible name doesn't match.  
**Who Is Impacted:** Voice control users, speech recognition users  
**Severity:** Medium  
**Evidence:** Accessible names must include the visible label text. Mismatches break voice control.  
**Fix:** Change `aria-label` to "Upload Logo" or remove aria-label and let the visible text be the accessible name.

---

### A11Y-SCRUM17-013
**WCAG Criterion:** 3.3.2 Labels or Instructions (Level A)  
**Component:** Phone Number Format  
**Observed Behavior:** Phone number field has no instruction about expected format (10 digits, with/without country code, etc.).  
**Why This Is a Problem:** Users enter phone numbers in various formats and receive validation errors without knowing the expected format.  
**Who Is Impacted:** All users, especially cognitive disability users  
**Severity:** Medium  
**Evidence:** Fields with specific format requirements must provide instructions before user interaction.  
**Fix:** Add help text "Enter 10-digit mobile number without spaces or dashes" linked with `aria-describedby`.

---

### A11Y-SCRUM17-014
**WCAG Criterion:** 4.1.3 Status Messages (Level AA)  
**Component:** Resend OTP Action  
**Observed Behavior:** When user clicks "Resend OTP", a new OTP is sent, but no confirmation message announces this to screen readers.  
**Why This Is a Problem:** Screen reader users don't know if resend succeeded or if they should wait for a new OTP.  
**Who Is Impacted:** Screen reader users  
**Severity:** Medium  
**Evidence:** Resend is a user-initiated action that produces a status change. The result must be announced.  
**Fix:** Display and announce "New OTP sent to your email" using `aria-live="polite"` after resend completes.

---

### A11Y-SCRUM17-015
**WCAG Criterion:** 1.3.5 Identify Input Purpose (Level AA)  
**Component:** Form Autocomplete Attributes  
**Observed Behavior:** Form fields lack autocomplete attributes (autocomplete="email", autocomplete="tel", autocomplete="organization", etc.).  
**Why This Is a Problem:** Browser autofill doesn't work. Users with cognitive disabilities who rely on autofill must manually type all information.  
**Who Is Impacted:** Cognitive disability users, mobile users  
**Severity:** Medium  
**Evidence:** WCAG 2.1 AA requires autocomplete attributes on common input types to support autofill.  
**Fix:** Add `autocomplete="email"` to email field, `autocomplete="tel"` to phone, `autocomplete="organization"` to organization name, etc.

---

### A11Y-SCRUM17-016
**WCAG Criterion:** 2.4.6 Headings and Labels (Level AA)  
**Component:** Form Section Headings  
**Observed Behavior:** The registration form has visual sections (Contact Information, Address, etc.) but no heading elements to structure them.  
**Why This Is a Problem:** Screen reader users can't navigate by headings to jump to specific sections. The form appears as one long list of fields.  
**Who Is Impacted:** Screen reader users  
**Severity:** Medium  
**Evidence:** Long forms should use heading elements (H2, H3) to create navigable structure.  
**Fix:** Add `<h2>Contact Information</h2>`, `<h2>Address Details</h2>`, `<h2>Organization Details</h2>` to structure the form.

---

### A11Y-SCRUM17-017
**WCAG Criterion:** 4.1.2 Name, Role, Value (Level A)  
**Component:** Success Confirmation Message  
**Observed Behavior:** After successful submission, a confirmation message appears in a modal or on-page, but likely lacks proper role and focus management.  
**Why This Is a Problem:** Screen reader users may not notice the success message appeared. Focus may be lost or remain on the now-hidden form.  
**Who Is Impacted:** Screen reader users, keyboard-only users  
**Severity:** Medium  
**Evidence:** Success messages that appear after form submission must be announced and receive focus.  
**Fix:** Use `role="alert"` or `aria-live="assertive"` for the success message. If using a modal, move focus to the modal heading with `tabindex="-1"`.

---

## Summary

**Total Issues Identified:** 17  
**Critical:** 4  
**High:** 6  
**Medium:** 7  

### Most Impacted User Groups
- Screen reader users (blind): 15 issues
- Keyboard-only users: 4 issues
- Cognitive disability users: 3 issues
- Voice control users: 1 issue

### Primary Problem Areas
1. **Dynamic content not announced** (OTP flow, verification status, errors)
2. **Missing focus management** (OTP field appearance, error summary)
3. **Errors not programmatically linked** (aria-describedby, aria-invalid missing)
4. **Button states not announced** (disabled Verify button)
5. **Cascading dropdown state changes silent**
6. **Missing form structure** (headings, autocomplete, labels)

---

## Recommended Priority for Fixes

### Immediate (Critical)
1. A11Y-SCRUM17-002 - Focus management for OTP field
2. A11Y-SCRUM17-003 - Link errors to form fields
3. A11Y-SCRUM17-004 - Announce disabled button states
4. A11Y-SCRUM17-001 - Announce OTP sent status

### Next Sprint (High)
5. A11Y-SCRUM17-008 - Error summary focus management
6. A11Y-SCRUM17-007 - Invalid OTP error announcement
7. A11Y-SCRUM17-009 - OTP field label
8. A11Y-SCRUM17-005 - Verification success announcement
9. A11Y-SCRUM17-006 - Cascading dropdown state changes
10. A11Y-SCRUM17-010 - OTP expiry announcement

### Backlog (Medium)
11-17. Remaining medium severity issues

---

## References

- **Jira Story:** [SCRUM-17](https://youth4jobs.atlassian.net/browse/SCRUM-17)
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Test Plan:** specs/a11y/SCRUM-17-ap-registration.md
