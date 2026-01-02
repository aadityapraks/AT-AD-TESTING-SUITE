# Test Cases for SCRUM17

## TC_SCRUM17_001
**Test Name:** Verify AP Registration Link Visibility and Navigation

**Precondition:** Y4J Hub portal is accessible and loaded

**Steps:**
1. Navigate to Y4J Hub portal
2. Locate "Register as Assistive Partner" link
3. Click on the registration link

**Expected Result:** User is redirected to AP Registration page with clear purpose and eligibility criteria displayed

---

## TC_SCRUM17_002
**Test Name:** Verify SSO Sign-in Link for Existing APs

**Precondition:** Y4J Hub portal is accessible

**Steps:**
1. Navigate to Y4J Hub portal
2. Locate "Sign in with Swarajability" link
3. Click on the SSO sign-in link

**Expected Result:** User is redirected to Assistive Partner Portal dashboard via SSO

---

## TC_SCRUM17_003
**Test Name:** Verify Mandatory Fields Validation in Registration Form

**Precondition:** User is on AP Registration page

**Steps:**
1. Leave all mandatory fields empty
2. Click Submit button
3. Verify error messages for: Organization Name, Type of Organization, Contact Person Name, Official Email ID, Phone Number, Registered Address, Short Description

**Expected Result:** Form displays error messages for all missing mandatory fields and prevents submission

---

## TC_SCRUM17_004
**Test Name:** Verify Successful Registration Form Submission

**Precondition:** User is on AP Registration page

**Steps:**
1. Fill Organization Name: "Test Assistive Tech"
2. Select Type of Organization: "Manufacturer"
3. Enter Contact Person Name: "John Doe"
4. Enter Official Email ID: "john@testassistive.com"
5. Enter Phone Number: "9876543210"
6. Enter Registered Address: "123 Tech Street, City"
7. Enter Short Description: "Assistive devices for mobility"
8. Click Submit button

**Expected Result:** Confirmation message displayed and acknowledgment email sent to registered email

---

## TC_SCRUM17_005
**Test Name:** Verify Duplicate Email Registration Handling

**Precondition:** Email "existing@test.com" already exists in system

**Steps:**
1. Fill registration form with existing email "existing@test.com"
2. Complete all other mandatory fields
3. Click Submit button

**Expected Result:** Error message "This email is already registered. Please log in or contact Y4J support." is displayed

---

## TC_SCRUM17_006
**Test Name:** Verify Invalid Email Format Validation

**Precondition:** User is on AP Registration page

**Steps:**
1. Fill all mandatory fields
2. Enter invalid email format: "invalidemail"
3. Click Submit button

**Expected Result:** Error message for invalid email format is displayed and form submission is prevented

---

## TC_SCRUM17_007
**Test Name:** Verify Admin Notification and Dashboard Update

**Precondition:** Valid registration form is submitted

**Steps:**
1. Submit valid registration form
2. Check admin dashboard for new registration entry
3. Verify registration status shows "Pending Review"

**Expected Result:** Admin receives notification email and registration appears in dashboard with "Pending Review" status

---

## TC_SCRUM17_008
**Test Name:** Verify Accessibility Standards Compliance

**Precondition:** User is on AP Registration page

**Steps:**
1. Navigate using keyboard only (Tab key)
2. Verify all form fields are accessible
3. Check form labels and error messages with screen reader
4. Verify high-contrast text visibility

**Expected Result:** Page supports keyboard navigation, screen readers, and meets WCAG 2.1 AA standards

---

## TC_SCRUM17_009
**Test Name:** Verify Optional Fields Functionality

**Precondition:** User is on AP Registration page

**Steps:**
1. Fill all mandatory fields
2. Add Website: "www.testassistive.com"
3. Upload organization logo file
4. Submit form

**Expected Result:** Form submits successfully with optional fields included in submission data