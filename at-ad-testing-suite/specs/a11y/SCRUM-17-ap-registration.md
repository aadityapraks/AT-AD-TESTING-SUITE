# Accessibility Test Plan: AP Registration/Sign in (WCAG 2.1 AA)

**Document Version:** 1.0  
**Date:** 2025-01-29  
**Jira Issue:** SCRUM-17  
**Story:** Assistive Partner (AP) Registration/Sign in from Y4J Hub  
**Priority:** Medium  
**WCAG Level:** AA (Level 2.1)

---

## Overview

Comprehensive accessibility test plan for Assistive Partner registration and sign-in flow ensuring WCAG 2.1 AA compliance. Tests cover form accessibility, keyboard navigation, screen reader compatibility, OTP verification, and error handling.

---

## UI Components Identified

### Navigation Elements
- "Register as Assistive Partner" link
- "Sign in with Swarajability" link (SSO)

### Form Elements
- Text inputs (Organization Name, Contact Person, Email, Phone, Address, City, Pincode, Description, Website)
- Dropdowns (Organization Type, State, District, Mandal)
- File upload (Logo/Certificate)
- OTP input fields (6-digit numeric)
- Buttons (Send OTP, Verify, Resend OTP, Submit)

### Dynamic Elements
- OTP input section (appears after Send OTP)
- Verification status indicators
- Error messages (inline and summary)
- Success confirmation message
- Disabled/enabled button states

---

## Accessibility Test Cases

### Suite 1: Keyboard Navigation

#### TC_A11Y_001: Form tab order is logical
**WCAG:** 2.4.3 Focus Order (Level A)  
**Component:** Registration form  
**Priority:** Critical

**Steps:**
1. Navigate to registration page
2. Press Tab from first field
3. Verify focus moves through: Organization Name → Type → Contact Person → Email → Send OTP → Phone → Send OTP → State → District → Mandal → Address → Pincode → City → Description → Website → Upload → Submit

**Expected Results:**
- Tab order follows visual layout top-to-bottom
- All form fields receive focus
- No focus jumps or traps

---

#### TC_A11Y_002: All form controls keyboard accessible
**WCAG:** 2.1.1 Keyboard (Level A)  
**Component:** All form controls  
**Priority:** Critical

**Steps:**
1. Tab to each dropdown (Type, State, District, Mandal)
2. Press Space/Enter to open dropdown
3. Use arrow keys to select option
4. Tab to file upload, press Enter to open file dialog
5. Tab to all buttons, press Enter/Space to activate

**Expected Results:**
- Dropdowns open with Space/Enter
- Arrow keys navigate dropdown options
- File upload accessible via keyboard
- All buttons activate with Enter/Space

---

#### TC_A11Y_003: Focus indicators visible
**WCAG:** 2.4.7 Focus Visible (Level AA)  
**Component:** All focusable elements  
**Priority:** Critical

**Steps:**
1. Tab through all form fields
2. Verify visible focus indicator on each element
3. Check focus indicator contrast (minimum 3:1)

**Expected Results:**
- All fields show clear focus indicator
- Focus indicator has 3:1 contrast minimum
- Focus not obscured by other elements

---

#### TC_A11Y_004: No keyboard traps
**WCAG:** 2.1.2 No Keyboard Trap (Level A)  
**Component:** Dropdowns, OTP fields  
**Priority:** Critical

**Steps:**
1. Tab into State dropdown
2. Open dropdown and navigate options
3. Press Escape or Tab to exit
4. Tab into OTP input fields
5. Verify ability to tab out

**Expected Results:**
- Can exit all dropdowns with Escape/Tab
- No focus traps in OTP fields
- Can navigate entire form with keyboard only

---

### Suite 2: Form Labels and Instructions

#### TC_A11Y_005: All form fields have labels
**WCAG:** 3.3.2 Labels or Instructions (Level A)  
**Component:** All input fields  
**Priority:** Critical

**Steps:**
1. Inspect each form field
2. Verify visible label present
3. Check label programmatically associated (for/id or aria-labelledby)
4. Verify placeholder is not the only label

**Expected Results:**
- All fields have visible labels
- Labels associated with inputs
- Labels remain visible when focused
- Placeholder text is supplementary

---

#### TC_A11Y_006: Required fields indicated
**WCAG:** 3.3.2 Labels or Instructions (Level A)  
**Component:** Required fields  
**Priority:** Critical

**Steps:**
1. Identify all required fields
2. Verify visual indicator (asterisk or "required" text)
3. Check aria-required="true" on required fields
4. Verify legend explains required indicator

**Expected Results:**
- Required fields marked with asterisk
- aria-required="true" present
- Legend explains asterisk meaning
- Not relying on color alone

---

#### TC_A11Y_007: Field instructions provided
**WCAG:** 3.3.2 Labels or Instructions (Level A)  
**Component:** Complex fields (Address, OTP)  
**Priority:** High

**Steps:**
1. Check Address field has instruction about dropdown sequence
2. Verify OTP field explains 6-digit format
3. Check file upload shows accepted formats
4. Verify instructions linked with aria-describedby

**Expected Results:**
- Complex fields have clear instructions
- Instructions visible before interaction
- Instructions linked to fields
- Format requirements explained

---

### Suite 3: Error Identification and Handling

#### TC_A11Y_008: Error messages are clear and specific
**WCAG:** 3.3.1 Error Identification (Level A), 3.3.3 Error Suggestion (Level AA)  
**Component:** Form validation  
**Priority:** Critical

**Steps:**
1. Submit form with empty required fields
2. Verify error messages appear
3. Check errors are specific (e.g., "Organization Name is required")
4. Enter invalid email format
5. Verify error suggests correction

**Expected Results:**
- Errors identified in text
- Error messages are specific
- Errors suggest how to fix
- No generic "Error" messages

---

#### TC_A11Y_009: Errors linked to form fields
**WCAG:** 3.3.1 Error Identification (Level A)  
**Component:** Error messages  
**Priority:** Critical

**Steps:**
1. Submit form with errors
2. Verify aria-describedby links error to field
3. Check aria-invalid="true" on fields with errors
4. Verify error message has unique ID

**Expected Results:**
- Errors linked with aria-describedby
- aria-invalid="true" on invalid fields
- Screen reader announces errors
- Error IDs are unique

---

#### TC_A11Y_010: Error summary at top of form
**WCAG:** 3.3.1 Error Identification (Level A)  
**Component:** Error summary  
**Priority:** High

**Steps:**
1. Submit form with multiple errors
2. Verify error summary appears at top
3. Check focus moves to error summary
4. Verify summary links to individual errors

**Expected Results:**
- Error summary appears at form top
- Focus moves to summary on submit
- Summary lists all errors
- Links jump to specific fields

---

#### TC_A11Y_011: OTP error handling accessible
**WCAG:** 3.3.1 Error Identification (Level A)  
**Component:** OTP verification  
**Priority:** Critical

**Steps:**
1. Enter invalid OTP
2. Click Verify
3. Verify inline error message appears
4. Check error announced by screen reader
5. Verify error linked to OTP field

**Expected Results:**
- Invalid OTP shows inline error
- Error announced automatically
- Error linked with aria-describedby
- Verification status remains "Unverified"

---

### Suite 4: Screen Reader Compatibility

#### TC_A11Y_012: Form structure announced
**WCAG:** 1.3.1 Info and Relationships (Level A)  
**Component:** Form structure  
**Priority:** High

**Steps:**
1. Navigate to form with screen reader
2. Verify form landmark announced
3. Check fieldset/legend for grouped fields
4. Verify heading structure (H1 for page, H2 for sections)

**Expected Results:**
- Form has role="form" or <form> element
- Address fields grouped in fieldset
- Headings describe form sections
- Form purpose clear from structure

---

#### TC_A11Y_013: Dropdown accessible names and states
**WCAG:** 4.1.2 Name, Role, Value (Level A)  
**Component:** Dropdowns (Type, State, District, Mandal)  
**Priority:** Critical

**Steps:**
1. Tab to Organization Type dropdown
2. Verify screen reader announces label and role
3. Check aria-expanded state announced
4. Open dropdown, verify options announced
5. Select option, verify selection announced

**Expected Results:**
- Dropdown label announced
- Role "combobox" or "listbox" announced
- aria-expanded state changes
- Selected value announced
- Option count announced

---

#### TC_A11Y_014: OTP dynamic content announced
**WCAG:** 4.1.3 Status Messages (Level AA)  
**Component:** OTP section  
**Priority:** Critical

**Steps:**
1. Enter email and click Send OTP
2. Verify OTP sent message announced
3. Check OTP input field appearance announced
4. Enter OTP and verify
5. Verify verification success announced

**Expected Results:**
- "OTP sent" announced with aria-live
- OTP field appearance announced
- Verification success announced
- Status changes don't require focus

---

#### TC_A11Y_015: Button states announced
**WCAG:** 4.1.2 Name, Role, Value (Level A)  
**Component:** Buttons (Send OTP, Verify, Submit)  
**Priority:** High

**Steps:**
1. Tab to Verify button before entering 6 digits
2. Verify disabled state announced
3. Enter 6 digits
4. Verify enabled state announced
5. Check aria-disabled attribute

**Expected Results:**
- Disabled buttons announced as disabled
- aria-disabled="true" when disabled
- Enabled state announced when active
- Button purpose clear from name

---

#### TC_A11Y_016: File upload accessible
**WCAG:** 4.1.2 Name, Role, Value (Level A)  
**Component:** File upload (Logo/Certificate)  
**Priority:** High

**Steps:**
1. Tab to file upload control
2. Verify label announced
3. Check accepted file types announced
4. Press Enter to open file dialog
5. Select file, verify filename announced

**Expected Results:**
- Upload button has accessible name
- Accepted formats announced
- File selection announced
- Optional status clear

---

#### TC_A11Y_017: Success message announced
**WCAG:** 4.1.3 Status Messages (Level AA)  
**Component:** Submission confirmation  
**Priority:** High

**Steps:**
1. Complete and submit form
2. Verify success message appears
3. Check message announced automatically
4. Verify aria-live="polite" or role="status"

**Expected Results:**
- Success message announced automatically
- Message has aria-live or role="status"
- User doesn't need to find message
- Message is clear and complete

---

### Suite 5: Visual Accessibility

#### TC_A11Y_018: Color contrast - Text
**WCAG:** 1.4.3 Contrast (Minimum) (Level AA)  
**Component:** All text  
**Priority:** Critical

**Steps:**
1. Measure contrast for labels, body text, headings
2. Verify minimum 4.5:1 for normal text
3. Verify minimum 3:1 for large text
4. Check error messages have sufficient contrast

**Expected Results:**
- Normal text has 4.5:1 contrast
- Large text has 3:1 contrast
- Error text has 4.5:1 contrast
- All text meets WCAG AA

---

#### TC_A11Y_019: Color contrast - Form controls
**WCAG:** 1.4.11 Non-text Contrast (Level AA)  
**Component:** Form field borders, buttons  
**Priority:** Critical

**Steps:**
1. Measure contrast for input borders
2. Check dropdown borders
3. Verify button borders/backgrounds
4. Check focus indicators

**Expected Results:**
- Input borders have 3:1 contrast
- Dropdown borders have 3:1 contrast
- Button boundaries have 3:1 contrast
- Focus indicators have 3:1 contrast

---

#### TC_A11Y_020: Not relying on color alone
**WCAG:** 1.4.1 Use of Color (Level A)  
**Component:** Required fields, errors, verification status  
**Priority:** High

**Steps:**
1. Check required fields marked with asterisk, not just color
2. Verify error messages have icons, not just red color
3. Check verification status has text ("Verified"), not just green
4. Verify disabled buttons have visual indicator beyond color

**Expected Results:**
- Required marked with asterisk
- Errors have icons and text
- Verification status has text label
- Disabled state clear without color

---

#### TC_A11Y_021: Text resize to 200%
**WCAG:** 1.4.4 Resize Text (Level AA)  
**Component:** Entire form  
**Priority:** High

**Steps:**
1. Zoom browser to 200%
2. Verify all labels remain visible
3. Check no text overlap
4. Verify all fields remain usable

**Expected Results:**
- All text scales to 200%
- No horizontal scrolling
- No text truncation
- Form remains functional

---

### Suite 6: Form Behavior and Validation

#### TC_A11Y_022: Autocomplete attributes
**WCAG:** 1.3.5 Identify Input Purpose (Level AA)  
**Component:** Form fields  
**Priority:** Medium

**Steps:**
1. Inspect Organization Name field
2. Verify autocomplete="organization"
3. Check Email has autocomplete="email"
4. Verify Phone has autocomplete="tel"
5. Check Address fields have appropriate autocomplete

**Expected Results:**
- Organization has autocomplete="organization"
- Email has autocomplete="email"
- Phone has autocomplete="tel"
- Address fields have autocomplete values

---

#### TC_A11Y_023: Input constraints announced
**WCAG:** 3.3.2 Labels or Instructions (Level A)  
**Component:** OTP, Phone, Pincode fields  
**Priority:** High

**Steps:**
1. Tab to OTP field
2. Verify 6-digit constraint announced
3. Check Phone field format announced
4. Verify Pincode accepts numeric only
5. Check constraints in aria-describedby

**Expected Results:**
- OTP field announces 6-digit requirement
- Phone format explained
- Numeric-only fields identified
- Constraints linked to fields

---

#### TC_A11Y_024: Cascading dropdown accessibility
**WCAG:** 4.1.2 Name, Role, Value (Level A)  
**Component:** State → District → Mandal dropdowns  
**Priority:** High

**Steps:**
1. Select State
2. Verify District dropdown becomes enabled
3. Check enabled state announced
4. Select District
5. Verify Mandal dropdown becomes enabled

**Expected Results:**
- Dependent dropdowns initially disabled
- Disabled state announced
- Enabling announced automatically
- Relationship between dropdowns clear

---

#### TC_A11Y_025: Duplicate email error accessible
**WCAG:** 3.3.1 Error Identification (Level A)  
**Component:** Duplicate registration handling  
**Priority:** High

**Steps:**
1. Enter already registered email
2. Submit form
3. Verify duplicate error message appears
4. Check error is specific and helpful
5. Verify error announced by screen reader

**Expected Results:**
- Duplicate error clearly identified
- Message suggests login or contact support
- Error announced automatically
- Error linked to email field

---

### Suite 7: OTP Verification Accessibility

#### TC_A11Y_026: Send OTP button accessible
**WCAG:** 2.1.1 Keyboard (Level A), 4.1.2 Name, Role, Value (Level A)  
**Component:** Send OTP buttons  
**Priority:** Critical

**Steps:**
1. Tab to Send OTP button (Email)
2. Verify button has accessible name
3. Press Enter to send OTP
4. Verify action announced
5. Repeat for Phone OTP

**Expected Results:**
- Button has clear name ("Send OTP to Email")
- Button activates with Enter/Space
- OTP sent status announced
- Button becomes disabled after sending

---

#### TC_A11Y_027: OTP input field accessibility
**WCAG:** 3.3.2 Labels or Instructions (Level A)  
**Component:** OTP input fields  
**Priority:** Critical

**Steps:**
1. Send OTP
2. Verify OTP input field appears
3. Check field has label
4. Verify 6-digit instruction present
5. Check numeric-only constraint

**Expected Results:**
- OTP field has label
- 6-digit requirement explained
- Field accepts numeric only
- maxlength="6" attribute present

---

#### TC_A11Y_028: Resend OTP accessible
**WCAG:** 2.1.1 Keyboard (Level A)  
**Component:** Resend OTP button  
**Priority:** High

**Steps:**
1. Wait for OTP expiry or click Resend
2. Verify Resend button accessible
3. Press Enter to resend
4. Verify new OTP sent message announced

**Expected Results:**
- Resend button keyboard accessible
- Button has clear accessible name
- Resend action announced
- Previous OTP invalidation announced

---

#### TC_A11Y_029: OTP expiry message accessible
**WCAG:** 4.1.3 Status Messages (Level AA)  
**Component:** OTP expiry notification  
**Priority:** High

**Steps:**
1. Send OTP
2. Wait for expiry time
3. Attempt to verify expired OTP
4. Verify expiry message appears
5. Check message announced by screen reader

**Expected Results:**
- Expiry message appears
- Message announced with aria-live
- Message suggests resending OTP
- Error is clear and actionable

---

#### TC_A11Y_030: Verification status accessible
**WCAG:** 4.1.3 Status Messages (Level AA)  
**Component:** Verified/Unverified status  
**Priority:** High

**Steps:**
1. Successfully verify email OTP
2. Verify "Verified" status appears
3. Check status announced by screen reader
4. Verify visual indicator (checkmark + text)
5. Check aria-live announces change

**Expected Results:**
- Verification status announced
- Status has text label, not just icon
- aria-live="polite" announces change
- Status persists visually

---

### Suite 8: SSO Sign-in Accessibility

#### TC_A11Y_031: SSO link accessible
**WCAG:** 2.1.1 Keyboard (Level A), 2.4.4 Link Purpose (Level A)  
**Component:** "Sign in with Swarajability" link  
**Priority:** High

**Steps:**
1. Tab to SSO sign-in link
2. Verify link has clear accessible name
3. Press Enter to activate
4. Verify navigation to SSO

**Expected Results:**
- Link keyboard accessible
- Link purpose clear from text
- Link activates with Enter
- Focus indicator visible

---

### Suite 9: Responsive and Mobile

#### TC_A11Y_032: Touch targets minimum size
**WCAG:** 2.5.5 Target Size (Level AAA - Best Practice)  
**Component:** Buttons on mobile  
**Priority:** Medium

**Steps:**
1. Set viewport to mobile (375x667)
2. Measure Send OTP, Verify, Submit buttons
3. Verify minimum 44x44px
4. Check spacing between buttons

**Expected Results:**
- All buttons at least 44x44px
- Adequate spacing between targets
- Easy to tap without errors

---

#### TC_A11Y_033: Form usable on mobile
**WCAG:** 1.4.10 Reflow (Level AA)  
**Component:** Entire form  
**Priority:** High

**Steps:**
1. View form on mobile viewport
2. Verify no horizontal scrolling
3. Check all fields visible and usable
4. Verify dropdowns work on touch

**Expected Results:**
- Form adapts to mobile width
- No horizontal scrolling
- All functionality available
- Touch interactions work

---

### Suite 10: Page Structure

#### TC_A11Y_034: Heading hierarchy
**WCAG:** 1.3.1 Info and Relationships (Level A)  
**Component:** Page structure  
**Priority:** High

**Steps:**
1. Navigate with screen reader
2. Use heading navigation (H key)
3. Verify H1 for page title
4. Check H2 for form sections

**Expected Results:**
- One H1 per page
- Logical heading hierarchy
- No skipped levels
- Headings describe content

---

#### TC_A11Y_035: Language attribute
**WCAG:** 3.1.1 Language of Page (Level A)  
**Component:** HTML document  
**Priority:** High

**Steps:**
1. View page source
2. Check <html lang="en">
3. Verify correct language code

**Expected Results:**
- HTML has lang attribute
- Language code is correct
- Screen readers pronounce correctly

---

#### TC_A11Y_036: Form has accessible name
**WCAG:** 4.1.2 Name, Role, Value (Level A)  
**Component:** Form element  
**Priority:** Medium

**Steps:**
1. Inspect form element
2. Verify aria-label or aria-labelledby
3. Check form purpose clear

**Expected Results:**
- Form has accessible name
- Name describes form purpose
- Screen reader announces form

---

## Test Data Requirements

- **Screen Readers:** NVDA, JAWS, VoiceOver
- **Browsers:** Chrome, Firefox, Safari, Edge
- **Contrast Analyzer:** WebAIM, axe DevTools
- **Test Email/Phone:** Valid for OTP testing
- **Duplicate Email:** Already registered email

---

## Open Questions

1. **OTP Expiry Time:** What is the exact expiry duration?
2. **Resend Rate Limit:** How many resends allowed? Time window?
3. **File Upload:** Accepted formats and size limits?
4. **Address Dropdowns:** Are they searchable/filterable?
5. **Error Recovery:** Can users save partial progress?

---

## References

- **Jira:** [SCRUM-17](https://youth4jobs.atlassian.net/browse/SCRUM-17)
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **Figma:** [Vendor Portal Design](https://www.figma.com/make/RnG8RNtZCAeLfgL4XaBGLW/Vendor---Distributor-Portal)
