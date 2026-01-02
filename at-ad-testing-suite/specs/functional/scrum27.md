# Test Cases for SCRUM27

## Common Positive Test Cases

### TC-SCRUM27-P001
**Test Name:** Access Product Links Management Section

**Precondition:** Admin user is logged in with proper permissions

**Steps:**
1. Navigate to Admin Dashboard
2. Locate "Product Links" management section
3. Verify all external links are displayed with required details

**Expected Result:** Product Links section displays all external links with Product Name, AP Name, Link Type, URL, Status, and Last Verified Date

---

### TC-SCRUM27-P002
**Test Name:** View Flagged Links in Review Queue

**Precondition:** System has flagged links from automated scanning

**Steps:**
1. Navigate to "Link Review Queue"
2. Verify flagged links are displayed
3. Check issue tags are visible for each flagged link

**Expected Result:** Flagged links appear with system-detected issue tags like "Broken Link", "Invalid Redirect", "Suspicious Domain"

---

### TC-SCRUM27-P003
**Test Name:** Disable Unsafe External Link

**Precondition:** Admin is viewing a flagged link

**Steps:**
1. Select a flagged link
2. Click "Disable Link" option
3. Verify confirmation message appears

**Expected Result:** Link is disabled with message "Link successfully disabled and hidden from product page" and status updates to "Disabled"

---

### TC-SCRUM27-P004
**Test Name:** Remove External Link Permanently

**Precondition:** Admin is viewing an unsafe link

**Steps:**
1. Select link to remove
2. Click "Remove Link" option
3. Confirm deletion in confirmation dialog

**Expected Result:** Link is permanently removed with message "Link permanently removed from product record"

---

### TC-SCRUM27-P005
**Test Name:** Restore Previously Disabled Link

**Precondition:** Link was previously disabled and AP provided verified replacement

**Steps:**
1. Locate disabled link in management section
2. Click "Restore" or "Reactivate" option
3. Verify link status changes to Active

**Expected Result:** Link is restored to "Active" status and reappears on product details page

---

## Common Negative Test Cases

### TC-SCRUM27-N001
**Test Name:** Unauthorized Access to Product Links Management

**Precondition:** User without admin privileges attempts access

**Steps:**
1. Try to access Product Links management section
2. Verify access restriction

**Expected Result:** Access denied with appropriate error message about insufficient privileges

---

### TC-SCRUM27-N002
**Test Name:** Cancel Link Removal Action

**Precondition:** Admin initiates link removal

**Steps:**
1. Click "Remove Link" option
2. Click "Cancel" in confirmation dialog
3. Verify link remains unchanged

**Expected Result:** Removal cancelled, link status remains unchanged

---

### TC-SCRUM27-N003
**Test Name:** Attempt to Restore Link Without Verification

**Precondition:** Disabled link has not been verified safe

**Steps:**
1. Try to restore unverified disabled link
2. Check system response

**Expected Result:** System prevents restoration or shows warning about unverified link

---

## Validation Test Cases

### TC-SCRUM27-V001
**Test Name:** Validate Automated Link Scanning for Broken Links

**Precondition:** System performs periodic automated link validation

**Steps:**
1. Add product with broken URL (404 error)
2. Wait for automated scanning cycle
3. Verify link is flagged as "Broken Link"

**Expected Result:** System automatically flags unreachable links as "Inactive" or "Broken Link"

---

### TC-SCRUM27-V002
**Test Name:** Validate HTTPS Protocol Check

**Precondition:** Product has external link with HTTP protocol

**Steps:**
1. Submit product with HTTP (non-HTTPS) link
2. Wait for automated validation
3. Check if link is flagged

**Expected Result:** System flags links not using valid HTTPS protocol

---

### TC-SCRUM27-V003
**Test Name:** Verify AP Notification After Link Disable

**Precondition:** Admin disables a product link

**Steps:**
1. Disable external link for a product
2. Check AP receives notification
3. Verify notification content

**Expected Result:** AP receives automatic notification stating link has been disabled with reason

---

### TC-SCRUM27-V004
**Test Name:** Validate PwD View After Link Removal

**Precondition:** Admin removes external link from product

**Steps:**
1. Remove link from product
2. View product details page as PwD user
3. Verify placeholder message appears

**Expected Result:** Removed link no longer visible, placeholder message "This external link is currently unavailable" displays

---

## Edge Case Test Cases

### TC-SCRUM27-E001
**Test Name:** Handle Multiple Flagged Links from Same AP

**Precondition:** Single AP has 3+ products with unsafe links

**Steps:**
1. System detects threshold breach (3+ unsafe links)
2. Verify admin receives alert
3. Check alert contains AP details

**Expected Result:** Admin receives alert when AP exceeds unsafe link threshold

---

### TC-SCRUM27-E002
**Test Name:** Disable Link with No Alternative Links

**Precondition:** Product has only one external link

**Steps:**
1. Disable the only external link for product
2. View product details page
3. Verify appropriate message displays

**Expected Result:** Product displays placeholder message with no external links visible

---

### TC-SCRUM27-E003
**Test Name:** Process Link with Suspicious Domain Redirect

**Precondition:** External link redirects to non-product domain

**Steps:**
1. Submit link that redirects to suspicious domain
2. Wait for automated scanning
3. Verify link is flagged

**Expected Result:** System flags link as "Invalid Redirect" or "Suspicious Domain"

---

## Advanced Test Cases

### TC-SCRUM27-A001
**Test Name:** Audit Trail Recording for Link Actions

**Precondition:** Admin performs disable/remove/restore actions

**Steps:**
1. Disable a link
2. Remove another link
3. Restore a previously disabled link
4. Check audit trail entries

**Expected Result:** Audit log records all actions with Admin ID, timestamp, action type, and reason

---

### TC-SCRUM27-A002
**Test Name:** Preview Flagged Link in Secure Sandbox

**Precondition:** Admin is reviewing flagged link

**Steps:**
1. Select flagged link from review queue
2. Click preview option
3. Verify link opens in secure sandbox window

**Expected Result:** Link opens in secure sandbox preview for admin inspection without security risk

---

### TC-SCRUM27-A003
**Test Name:** Blacklisted Domain Automatic Blocking

**Precondition:** System maintains blacklist of unsafe domains

**Steps:**
1. Submit product with link to blacklisted domain
2. Verify system response
3. Check if link is automatically blocked

**Expected Result:** System automatically blocks URLs pointing to known unsafe or blacklisted domains

---

### TC-SCRUM27-A004
**Test Name:** Historical Version Retention for Disabled Links

**Precondition:** Link has been disabled and modified multiple times

**Steps:**
1. Disable a link
2. AP submits updated link
3. Check system retains historical versions
4. Verify version history is accessible

**Expected Result:** System retains historical versions of disabled links for traceability

---

## Network & Connectivity Related Test Cases

### TC-SCRUM27-NET001
**Test Name:** Link Validation During Network Timeout

**Precondition:** Automated link scanning encounters network timeout

**Steps:**
1. Trigger automated link validation
2. Simulate network timeout for specific URLs
3. Verify system flags timeout errors

**Expected Result:** System flags links with timeout errors as "Inaccessible Resource"

---

### TC-SCRUM27-NET002
**Test Name:** Disable Link Action During Network Interruption

**Precondition:** Admin initiates link disable action

**Steps:**
1. Click disable link button
2. Simulate network disconnection during action
3. Reconnect network and verify status

**Expected Result:** System handles network interruption with appropriate error handling and retry mechanism

---

### TC-SCRUM27-NET003
**Test Name:** Load Product Links Management with Slow Network

**Precondition:** Admin accesses links management with slow connection

**Steps:**
1. Navigate to Product Links section with slow network
2. Monitor loading behavior
3. Verify eventual successful load

**Expected Result:** Loading indicators display, links list eventually loads completely

---

### TC-SCRUM27-NET004
**Test Name:** API Failure During Automated Link Scanning

**Precondition:** Backend API experiences failures during scanning

**Steps:**
1. Trigger automated link validation cycle
2. Simulate API failure
3. Check error handling and retry logic

**Expected Result:** System logs API failure, implements retry mechanism, and alerts admin if persistent failure occurs
