# SCRUM-31 Test Plan

## Application Overview

Test plan for validating AP response functionality to reviews and questions including interaction panel, response submission, admin moderation, visibility on PwD portal, notifications, editing/withdrawing, content guidelines, privacy, and WCAG 2.1 AA compliance.

## Test Scenarios

### 1. Access Interaction Panel

**Seed:** `tests/seed/vendor-dashboard.spec.ts`

#### 1.1. Access Reviews & Ratings section

**File:** `tests/functional/access-reviews-section.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to dashboard
  3. Click Reviews & Ratings section

**Expected Results:**
  - Reviews & Ratings section is accessible
  - Section loads without errors
  - Approved reviews are displayed

#### 1.2. Access Queries section

**File:** `tests/functional/access-queries-section.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to dashboard
  3. Click Queries section

**Expected Results:**
  - Queries section is accessible
  - Section loads without errors
  - User-submitted questions are displayed

#### 1.3. Display review entry details

**File:** `tests/functional/display-review-entry.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View Reviews & Ratings section
  3. Check review entry information

**Expected Results:**
  - Product Name is displayed
  - Star Rating is shown
  - Review Text is visible
  - Submission Date is displayed
  - Anonymous User Tag shown (e.g., "PwD User 1021")
  - Status displayed (Approved / Pending / Flagged)

#### 1.4. Display question entry details

**File:** `tests/functional/display-question-entry.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View Queries section
  3. Check question entry information

**Expected Results:**
  - Product Name is displayed
  - Question Text is visible
  - Submission Date is displayed
  - Anonymous User Tag is shown
  - Status is displayed

### 2. Responding to Reviews

**Seed:** `tests/seed/approved-reviews.spec.ts`

#### 2.1. Add response to review

**File:** `tests/functional/add-review-response.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View approved review
  3. Click "Respond to Review" button
  4. Enter response text (up to 500 characters)
  5. Submit response

**Expected Results:**
  - "Respond to Review" button is visible
  - Text input field appears
  - Character limit is 500
  - Response is submitted successfully

#### 2.2. Display moderation label

**File:** `tests/functional/display-moderation-label.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click Respond to Review
  3. Check for label

**Expected Results:**
  - Label displays: "Your response will be visible publicly after admin approval."
  - Label is clearly visible
  - Message is informative

#### 2.3. Response enters Pending Moderation

**File:** `tests/functional/response-pending-moderation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Submit response to review
  3. Check response status

**Expected Results:**
  - Response enters Pending Moderation status
  - Response is not immediately published
  - Status is visible to AP
  - Timestamp is recorded

### 3. Responding to Questions

**Seed:** `tests/seed/user-questions.spec.ts`

#### 3.1. View question details

**File:** `tests/functional/view-question-details.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Queries section
  3. View question entry

**Expected Results:**
  - Question text is displayed
  - Timestamp is shown
  - Context is provided (e.g., "Asked about Product Availability")
  - All details are clear

#### 3.2. Post response to question

**File:** `tests/functional/post-question-response.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View user question
  3. Click Respond button
  4. Enter response explaining product details
  5. Submit response

**Expected Results:**
  - Response field is available
  - AP can explain product details or usage
  - Response is submitted successfully
  - Response enters moderation queue

#### 3.3. Response routed through moderation

**File:** `tests/functional/question-response-moderation.spec.ts`

**Steps:**
  1. AP submits response to question
  2. Check response status
  3. Verify visibility

**Expected Results:**
  - Response is routed through admin moderation
  - Response is not immediately visible to PwD users
  - Status shows Pending Moderation
  - Moderation workflow is enforced

### 4. Admin Moderation Workflow

**Seed:** `tests/seed/admin-moderation.spec.ts`

#### 4.1. Admin reviews AP response

**File:** `tests/functional/admin-review-response.spec.ts`

**Steps:**
  1. AP submits response
  2. Login as admin
  3. View pending responses
  4. Review response content

**Expected Results:**
  - Admin can view pending responses
  - Response content is displayed
  - Admin can review for accuracy, tone, compliance
  - Review interface is functional

#### 4.2. Admin approves response

**File:** `tests/functional/admin-approve-response.spec.ts`

**Steps:**
  1. Admin reviews response
  2. Click Approve
  3. Check response visibility

**Expected Results:**
  - Admin can approve response
  - Response becomes visible on product details page
  - Status changes to Approved
  - AP receives approval notification

#### 4.3. Admin rejects response

**File:** `tests/functional/admin-reject-response.spec.ts`

**Steps:**
  1. Admin reviews response
  2. Click Reject
  3. Provide feedback reason
  4. Check AP notification

**Expected Results:**
  - Admin can reject response
  - AP receives notification with feedback reason
  - Response is not published
  - Rejection is logged

#### 4.4. Admin edits response

**File:** `tests/functional/admin-edit-response.spec.ts`

**Steps:**
  1. Admin reviews response
  2. Make minor formatting or content fixes
  3. Approve edited response

**Expected Results:**
  - Admin can edit response (optional)
  - Minor fixes can be made before approval
  - Edited version is published
  - Edit is logged

### 5. Response Visibility on PwD Portal

**Seed:** `tests/seed/pwd-product-details.spec.ts`

#### 5.1. Display approved response

**File:** `tests/functional/display-approved-response.spec.ts`

**Steps:**
  1. Admin approves AP response
  2. Login as PwD user
  3. View product details page
  4. Locate response

**Expected Results:**
  - Approved response is displayed beneath review/question
  - Label shows: "Response from Assistive Partner"
  - Response is clearly visible
  - Placement is appropriate

#### 5.2. Display response metadata

**File:** `tests/functional/display-response-metadata.spec.ts`

**Steps:**
  1. Login as PwD user
  2. View product with AP response
  3. Check response details

**Expected Results:**
  - Response includes timestamp
  - AP organization name is displayed
  - Metadata is accurate
  - Information is clear

#### 5.3. Visual distinction from user posts

**File:** `tests/functional/visual-distinction-response.spec.ts`

**Steps:**
  1. Login as PwD user
  2. View product with reviews and responses
  3. Check visual styling

**Expected Results:**
  - Responses are visually distinguished from user posts
  - Shaded background or indentation is used
  - Visual cues are clear
  - Layout is organized

### 6. Notification and Tracking

**Seed:** `tests/seed/vendor-notifications.spec.ts`

#### 6.1. Notify AP of new review

**File:** `tests/functional/notify-new-review.spec.ts`

**Steps:**
  1. PwD submits review
  2. Admin approves review
  3. Login as AP
  4. Check notifications

**Expected Results:**
  - AP receives notification for new review
  - Notification appears in dashboard
  - Optional email is sent
  - Notification is clear

#### 6.2. Notify AP of new question

**File:** `tests/functional/notify-new-question.spec.ts`

**Steps:**
  1. PwD submits question
  2. Login as AP
  3. Check notifications

**Expected Results:**
  - AP receives notification for new question
  - Notification appears in dashboard
  - Optional email is sent
  - Notification is clear

#### 6.3. Notify AP of response approval

**File:** `tests/functional/notify-response-approval.spec.ts`

**Steps:**
  1. AP submits response
  2. Admin approves response
  3. Check AP notifications

**Expected Results:**
  - AP receives approval notification
  - Notification states: "Your response to 'Smart Hearing Aid X' has been approved and published."
  - Notification appears in dashboard
  - Optional email is sent

#### 6.4. Notify AP of response rejection

**File:** `tests/functional/notify-response-rejection.spec.ts`

**Steps:**
  1. AP submits response
  2. Admin rejects response with feedback
  3. Check AP notifications

**Expected Results:**
  - AP receives rejection notification
  - Notification includes feedback reason
  - Notification appears in dashboard
  - Optional email is sent

### 7. Editing or Withdrawing Responses

**Seed:** `tests/seed/ap-responses.spec.ts`

#### 7.1. Edit pending response

**File:** `tests/functional/edit-pending-response.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View pending response
  3. Click Edit
  4. Modify response text
  5. Submit changes

**Expected Results:**
  - AP can edit pending response
  - Changes are saved
  - Edited response remains in moderation queue
  - Edit is logged

#### 7.2. Edit approved response

**File:** `tests/functional/edit-approved-response.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View approved response
  3. Click Edit
  4. Modify response text
  5. Submit changes

**Expected Results:**
  - AP can edit approved response
  - Edited response re-enters admin moderation queue
  - Response is not immediately republished
  - Edit is logged

#### 7.3. Withdraw response

**File:** `tests/functional/withdraw-response.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View response
  3. Click Withdraw/Delete
  4. Confirm deletion

**Expected Results:**
  - AP can withdraw (delete) response
  - Confirmation prompt appears
  - Response is removed after confirmation
  - Deletion is logged

### 8. Content Guidelines

**Seed:** `tests/seed/ap-responses.spec.ts`

#### 8.1. Validate no promotional content

**File:** `tests/functional/validate-no-promotional.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Submit response with promotional content
  3. Admin reviews response

**Expected Results:**
  - Platform communication policies are enforced
  - No promotional discussions allowed
  - Admin can flag violations
  - Guidelines are clear

#### 8.2. Validate no pricing discussions

**File:** `tests/functional/validate-no-pricing.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Submit response with pricing information
  3. Admin reviews response

**Expected Results:**
  - No pricing discussions allowed
  - Admin can flag violations
  - Policy is enforced
  - Guidelines are clear

#### 8.3. Validate no personal contact sharing

**File:** `tests/functional/validate-no-contact-sharing.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Submit response with personal contact info
  3. Admin reviews response

**Expected Results:**
  - No personal contact sharing allowed
  - Admin can flag violations
  - Policy is enforced
  - Privacy is protected

#### 8.4. Validate neutral and inclusive language

**File:** `tests/functional/validate-neutral-language.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Submit response
  3. Admin reviews for tone and language

**Expected Results:**
  - Language must be neutral, factual, and inclusive
  - Admin reviews for appropriateness
  - Compliance with accessibility policies
  - No discriminatory language

#### 8.5. Validate no medical statements

**File:** `tests/functional/validate-no-medical.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Submit response with medical/diagnostic statements
  3. Admin reviews response

**Expected Results:**
  - Medical or diagnostic statements are not allowed
  - Admin can flag violations
  - Policy is enforced
  - Guidelines are clear

#### 8.6. Allow product manual references

**File:** `tests/functional/allow-manual-references.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Submit response with link to product manual
  3. Admin reviews response

**Expected Results:**
  - Short reference note or link to product manual is allowed
  - Website link can be included if relevant
  - Admin approves appropriate references
  - Guidelines are followed

### 9. Accessibility and UI Compliance

**Seed:** `tests/seed/ap-responses.spec.ts`

#### 9.1. Verify keyboard navigation

**File:** `tests/functional/response-keyboard-navigation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate response interface using keyboard
  3. Test all controls

**Expected Results:**
  - Response text boxes are keyboard navigable
  - Buttons are keyboard accessible
  - Tab order is logical
  - All functions work via keyboard

#### 9.2. Verify screen reader compatibility

**File:** `tests/functional/response-screen-reader.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Use screen reader to navigate response interface
  3. Test all elements

**Expected Results:**
  - Screen reader accessible
  - Clear labels: "Respond," "Edit," "Pending Admin Review"
  - ARIA attributes are present
  - Navigation is intuitive

#### 9.3. Verify visual contrast

**File:** `tests/functional/response-visual-contrast.spec.ts`

**Steps:**
  1. Login as PwD user
  2. View product with reviews and responses
  3. Check visual contrast

**Expected Results:**
  - Visual contrast between user reviews and vendor responses
  - Color contrast meets WCAG 2.1 AA
  - Distinction is clear
  - Readability is maintained

#### 9.4. Verify expandable responses

**File:** `tests/functional/expandable-responses.spec.ts`

**Steps:**
  1. Login as PwD user
  2. View long response
  3. Test expand/collapse functionality

**Expected Results:**
  - Responses can be expanded/collapsed for readability
  - Functionality is intuitive
  - All text is accessible when expanded
  - Interaction is smooth

### 10. Privacy and Security

**Seed:** `tests/seed/ap-responses.spec.ts`

#### 10.1. Verify anonymized AP responses

**File:** `tests/functional/verify-anonymized-responses.spec.ts`

**Steps:**
  1. AP submits response
  2. Admin approves
  3. Login as PwD user
  4. View response

**Expected Results:**
  - AP responses show only organization name
  - Individual vendor user details are not shown
  - Responses are anonymized by default
  - Privacy is protected

#### 10.2. Verify PwD details remain hidden

**File:** `tests/functional/verify-pwd-details-hidden.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View reviews and questions
  3. Check for PwD information

**Expected Results:**
  - PwD users' personal details remain hidden at all times
  - No identifiable information is visible
  - Privacy is enforced
  - Compliance is maintained

#### 10.3. Verify portal-only communication

**File:** `tests/functional/verify-portal-only-communication.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Attempt to contact user directly
  3. Check for direct messaging options

**Expected Results:**
  - Communication happens entirely within portal
  - No direct messaging is available
  - No external contact options
  - Security is enforced

### 11. Audit Trail and Reporting

**Seed:** `tests/seed/admin-audit-logs.spec.ts`

#### 11.1. Log response submission

**File:** `tests/functional/log-response-submission.spec.ts`

**Steps:**
  1. AP submits response
  2. Login as admin
  3. Check audit logs

**Expected Results:**
  - Response submission is logged
  - Log includes Product ID, AP ID, Timestamp
  - Action recorded as "Submitted"
  - Log is complete

#### 11.2. Log response edit

**File:** `tests/functional/log-response-edit.spec.ts`

**Steps:**
  1. AP edits response
  2. Login as admin
  3. Check audit logs

**Expected Results:**
  - Response edit is logged
  - Log includes before and after values
  - Action recorded as "Edited"
  - Timestamp is recorded

#### 11.3. Log moderation actions

**File:** `tests/functional/log-moderation-actions.spec.ts`

**Steps:**
  1. Admin approves/rejects response
  2. Check audit logs

**Expected Results:**
  - Moderation actions are logged
  - Log includes admin ID and timestamp
  - Action recorded as "Approved" or "Rejected"
  - Reason is recorded for rejections

#### 11.4. Log response deletion

**File:** `tests/functional/log-response-deletion.spec.ts`

**Steps:**
  1. AP withdraws response
  2. Login as admin
  3. Check audit logs

**Expected Results:**
  - Response deletion is logged
  - Log includes Product ID, AP ID, Timestamp
  - Action recorded as "Deleted"
  - Log is complete

#### 11.5. Generate response time reports

**File:** `tests/functional/generate-response-time-reports.spec.ts`

**Steps:**
  1. Multiple responses are submitted
  2. Login as admin
  3. Generate report

**Expected Results:**
  - Admin can generate reports
  - Report shows average response time by vendor
  - Data is accurate
  - Report is exportable

#### 11.6. Generate approval rate reports

**File:** `tests/functional/generate-approval-rate-reports.spec.ts`

**Steps:**
  1. Multiple responses are moderated
  2. Login as admin
  3. Generate report

**Expected Results:**
  - Admin can generate reports
  - Report shows percentage of responses approved vs. rejected
  - Data is accurate
  - Metrics are clear

### 12. Error Handling

**Seed:** `tests/seed/ap-responses.spec.ts`

#### 12.1. Handle response save failure

**File:** `tests/functional/handle-response-save-error.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Submit response
  3. Simulate save failure
  4. Observe error message

**Expected Results:**
  - Error message displays
  - Message states: "Unable to save your response at this time. Please try again later."
  - User can retry
  - Error is handled gracefully

#### 12.2. Display pending status with timestamp

**File:** `tests/functional/display-pending-timestamp.spec.ts`

**Steps:**
  1. AP submits response
  2. Admin moderation is delayed
  3. Check response status

**Expected Results:**
  - Response remains in Pending status
  - Visible timestamp is displayed
  - Status is clear
  - AP can track submission time
