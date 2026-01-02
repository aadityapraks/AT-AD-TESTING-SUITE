# SCRUM-30 Test Plan

## Application Overview

Test plan for validating Reviews & Ratings functionality including dashboard widgets, product feedback summary, individual reviews, moderation, notifications, catalog display, privacy, and WCAG 2.1 AA compliance.

## Test Scenarios

### 1. Access Reviews & Ratings Section

**Seed:** `tests/seed/vendor-dashboard.spec.ts`

#### 1.1. Access Reviews & Ratings from menu

**File:** `tests/functional/access-reviews-section.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to main menu
  3. Click Reviews & Ratings

**Expected Results:**
  - Reviews & Ratings section is accessible from main menu
  - Section loads without errors
  - Page displays correctly

#### 1.2. Display dashboard widgets

**File:** `tests/functional/display-review-widgets.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Reviews & Ratings
  3. View dashboard widgets

**Expected Results:**
  - Average Rating widget is displayed
  - Total Reviews widget is displayed
  - Products Reviewed widget is displayed
  - All widgets show accurate data

#### 1.3. Display Product Reviews section

**File:** `tests/functional/display-product-reviews-section.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Reviews & Ratings
  3. Locate Product Reviews section

**Expected Results:**
  - Product Reviews section is visible
  - Product search is available
  - Sort/filters for All ratings and Highest Rated are present
  - Section layout matches design

#### 1.4. View product list with ratings

**File:** `tests/functional/view-product-list-ratings.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Reviews & Ratings
  3. View product list

**Expected Results:**
  - List displays AP's products
  - Average rating is shown for each product
  - Total number of reviews is displayed
  - Data is accurate

#### 1.5. Open Product Feedback Summary Page

**File:** `tests/functional/open-feedback-summary.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Reviews & Ratings
  3. Click on a product

**Expected Results:**
  - Product Feedback Summary Page opens
  - Detailed feedback is displayed
  - Navigation is seamless

### 2. Product Feedback Summary View

**Seed:** `tests/seed/product-feedback.spec.ts`

#### 2.1. Display product name and category

**File:** `tests/functional/display-product-info.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Feedback Summary
  3. Check product information

**Expected Results:**
  - Product name is displayed
  - Product category is displayed
  - Information is accurate
  - Layout matches design

#### 2.2. Display average rating

**File:** `tests/functional/display-average-rating.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Feedback Summary
  3. Check average rating

**Expected Results:**
  - Average rating is displayed (e.g., 4.3 / 5)
  - Rating is calculated correctly
  - Visual representation is clear
  - Format is consistent

#### 2.3. Display total number of reviews

**File:** `tests/functional/display-total-reviews.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Feedback Summary
  3. Check review count

**Expected Results:**
  - Total number of reviews is displayed
  - Count is accurate
  - Number is clearly visible

#### 2.4. Display rating distribution

**File:** `tests/functional/display-rating-distribution.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Feedback Summary
  3. View rating distribution

**Expected Results:**
  - Bar chart displays distribution (5★, 4★, 3★, etc.)
  - Chart is accurate
  - Visual representation is clear
  - All rating levels are shown

#### 2.5. Display most recent review date

**File:** `tests/functional/display-recent-review-date.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Feedback Summary
  3. Check review date

**Expected Results:**
  - Date of most recent review is displayed
  - Date is accurate
  - Format is clear

#### 2.6. Auto-recalculate ratings

**File:** `tests/functional/auto-recalculate-ratings.spec.ts`

**Steps:**
  1. Product has existing reviews
  2. PwD submits new review
  3. Admin approves review
  4. AP views Product Feedback Summary

**Expected Results:**
  - Ratings are automatically recalculated
  - New review is included in average
  - Distribution chart updates
  - Changes reflect immediately

### 3. Individual Review Display

**Seed:** `tests/seed/product-reviews.spec.ts`

#### 3.1. Display Customer Reviews section

**File:** `tests/functional/display-customer-reviews.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Feedback Summary
  3. Locate Customer Reviews section

**Expected Results:**
  - Section title: "Customer Reviews, All approved reviews from verified users"
  - Section is clearly visible
  - Layout is organized

#### 3.2. Display sort and filter options

**File:** `tests/functional/display-review-filters.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Feedback Summary
  3. Check filter options

**Expected Results:**
  - All Ratings filter is available
  - Most Recent sort option is available
  - Dropdowns are functional
  - Filters work correctly

#### 3.3. Display review card elements

**File:** `tests/functional/display-review-card.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Product Feedback Summary
  3. View individual review cards

**Expected Results:**
  - Star rating (1 to 5) is displayed
  - Anonymous user identifier shown (e.g., "PwD User 1084" or "Verified User")
  - Review text (up to 500 characters) is displayed
  - Date of submission is shown

#### 3.4. Verify no identifiable user information

**File:** `tests/functional/verify-anonymous-reviews.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View review cards
  3. Check for user information

**Expected Results:**
  - Reviews never display name
  - Reviews never display email
  - Reviews never display contact information
  - User privacy is protected

### 4. New Review Notifications

**Seed:** `tests/seed/pwd-submit-review.spec.ts`

#### 4.1. Receive in-app notification

**File:** `tests/functional/receive-review-notification.spec.ts`

**Steps:**
  1. PwD submits review for AP's product
  2. Admin approves review
  3. Login as AP
  4. Check dashboard

**Expected Results:**
  - In-app notification appears
  - Notification states: "New review received for 'Wheelchair Lite 3.0'"
  - Notification is clearly visible
  - No user data is included

#### 4.2. Receive email summary

**File:** `tests/functional/receive-review-email.spec.ts`

**Steps:**
  1. PwD submits review for AP's product
  2. Admin approves review
  3. Check AP's email

**Expected Results:**
  - Optional email summary is sent
  - Email contains product name
  - Email contains rating and timestamp
  - No user data is included

#### 4.3. Link notification to review page

**File:** `tests/functional/notification-link-review.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click review notification
  3. Observe navigation

**Expected Results:**
  - Notification links directly to product's review summary page
  - Navigation is seamless
  - Correct product is displayed

### 5. Review Moderation and Status

**Seed:** `tests/seed/review-moderation.spec.ts`

#### 5.1. Verify pending moderation status

**File:** `tests/functional/verify-pending-moderation.spec.ts`

**Steps:**
  1. PwD submits new review
  2. Login as AP
  3. Check for new review

**Expected Results:**
  - New review has "Pending moderation" status
  - Review is visible only to admin and PwD
  - Review is not visible to AP or public
  - Status is enforced

#### 5.2. GenAI flags review for admin

**File:** `tests/functional/genai-flag-review.spec.ts`

**Steps:**
  1. PwD submits review with inappropriate content
  2. GenAI flags review
  3. Login as admin
  4. Check flagged review

**Expected Results:**
  - GenAI flags review automatically
  - Admin can review flagged content
  - Status shows "Flagged"
  - Admin can approve or reject

#### 5.3. Admin approves review

**File:** `tests/functional/admin-approve-review.spec.ts`

**Steps:**
  1. Admin reviews pending review
  2. Admin approves review
  3. Login as AP
  4. Check reviews

**Expected Results:**
  - Approved review becomes public
  - Review is visible to AP
  - Status changes to "Published"
  - Review appears in product feedback

#### 5.4. Admin rejects review

**File:** `tests/functional/admin-reject-review.spec.ts`

**Steps:**
  1. Admin reviews flagged review
  2. Admin rejects review
  3. Check PwD notifications
  4. Verify removal from product

**Expected Results:**
  - Rejected review is removed
  - PwD receives notification of rejection
  - Review is not visible on product
  - Deletion is logged

#### 5.5. AP sees only approved reviews

**File:** `tests/functional/ap-sees-approved-only.spec.ts`

**Steps:**
  1. Multiple reviews exist with different statuses
  2. Login as AP
  3. View product reviews

**Expected Results:**
  - AP can only see approved reviews
  - Pending reviews are not visible
  - Flagged reviews are not visible
  - Only published reviews are shown

#### 5.6. AP responds to approved comments

**File:** `tests/functional/ap-respond-approved.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View approved review
  3. Attempt to respond

**Expected Results:**
  - AP can respond only to approved comments
  - Response option is available for approved reviews
  - No response option for pending/flagged reviews

### 6. Ratings Summary on Catalog

**Seed:** `tests/seed/pwd-catalog.spec.ts`

#### 6.1. Display rating on catalog card

**File:** `tests/functional/display-rating-catalog-card.spec.ts`

**Steps:**
  1. Product has reviews
  2. Login as PwD user
  3. Browse catalog
  4. View product card

**Expected Results:**
  - Average rating is visible on catalog card (e.g., ★★★★☆ 4.3/5)
  - Rating is clearly displayed
  - Format is consistent

#### 6.2. Display rating on product details page

**File:** `tests/functional/display-rating-details-page.spec.ts`

**Steps:**
  1. Product has reviews
  2. Login as PwD user
  3. Open product details page
  4. Check rating display

**Expected Results:**
  - Average rating is visible on product details page
  - Rating is prominently displayed
  - Format matches catalog card

#### 6.3. Click rating to scroll to reviews

**File:** `tests/functional/click-rating-scroll-reviews.spec.ts`

**Steps:**
  1. Login as PwD user
  2. Open product details page
  3. Click on rating

**Expected Results:**
  - Page scrolls to Reviews section
  - Reviews section is highlighted
  - Navigation is smooth

#### 6.4. Display no ratings message

**File:** `tests/functional/display-no-ratings.spec.ts`

**Steps:**
  1. Product has no reviews
  2. Login as PwD user
  3. View product

**Expected Results:**
  - Message displays: "No ratings available"
  - No empty stars are shown
  - Message is clear
  - UI is clean

### 7. Privacy and Compliance

**Seed:** `tests/seed/product-reviews.spec.ts`

#### 7.1. Verify anonymous review display

**File:** `tests/functional/verify-anonymous-display.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View product reviews
  3. Check reviewer information

**Expected Results:**
  - All reviews are displayed anonymously
  - PwD user privacy is protected
  - No identifiable information is shown
  - Compliance is maintained

#### 7.2. Prevent direct reviewer contact

**File:** `tests/functional/prevent-reviewer-contact.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View reviews
  3. Check for contact options

**Expected Results:**
  - APs cannot contact reviewers directly
  - No contact information is available
  - No direct messaging option
  - Privacy is enforced

#### 7.3. Verify moderated AP responses

**File:** `tests/functional/verify-moderated-responses.spec.ts`

**Steps:**
  1. AP response feature is available
  2. AP submits response
  3. Check moderation process

**Expected Results:**
  - AP responses go through admin moderation
  - System mediation is enforced
  - Responses are not immediately public
  - Moderation workflow is followed

### 8. Error Handling

**Seed:** `tests/seed/product-reviews.spec.ts`

#### 8.1. Handle review data load failure

**File:** `tests/functional/handle-review-load-error.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Reviews & Ratings
  3. Simulate data load failure
  4. Observe error message

**Expected Results:**
  - Error message displays
  - Message states: "Unable to load reviews at the moment. Please try again later."
  - User can retry
  - Error is handled gracefully

#### 8.2. Display no reviews message

**File:** `tests/functional/display-no-reviews.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View product with no reviews
  3. Check message

**Expected Results:**
  - Friendly message appears
  - Message states: "No reviews received yet for this product."
  - Message is clearly visible
  - UI is clean

### 9. Accessibility and UI Standards

**Seed:** `tests/seed/product-reviews.spec.ts`

#### 9.1. Verify screen-reader friendly ratings

**File:** `tests/functional/screen-reader-ratings.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Use screen reader to navigate reviews
  3. Check star rating announcements

**Expected Results:**
  - Star ratings are screen-reader friendly
  - Announced as "4 out of 5 stars"
  - ARIA labels are present
  - Accessible to all users

#### 9.2. Verify keyboard navigation

**File:** `tests/functional/reviews-keyboard-navigation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate reviews using keyboard
  3. Test all interactive elements

**Expected Results:**
  - Keyboard-accessible navigation through reviews
  - Tab order is logical
  - All controls are accessible
  - Focus indicators are visible

#### 9.3. Verify high-contrast labels

**File:** `tests/functional/reviews-high-contrast.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View Reviews & Ratings section
  3. Check color contrast

**Expected Results:**
  - High-contrast labels for rating scales
  - High-contrast labels for filters
  - Color contrast meets WCAG 2.1 AA
  - Visual elements are clear

#### 9.4. Verify expandable review text

**File:** `tests/functional/expandable-review-text.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View long review
  3. Test expand/collapse functionality

**Expected Results:**
  - Longer reviews are expandable
  - Expand/collapse is functional
  - Text is fully readable when expanded
  - Interaction is intuitive

### 10. Audit Trail

**Seed:** `tests/seed/admin-audit-logs.spec.ts`

#### 10.1. Log review submission

**File:** `tests/functional/log-review-submission.spec.ts`

**Steps:**
  1. PwD submits review
  2. Login as admin
  3. Check audit logs

**Expected Results:**
  - Review submission is logged
  - Log includes timestamp
  - User ID and product ID are recorded
  - Action is traceable

#### 10.2. Log review approval

**File:** `tests/functional/log-review-approval.spec.ts`

**Steps:**
  1. Admin approves review
  2. Check audit logs

**Expected Results:**
  - Approval action is logged
  - Log includes admin ID and timestamp
  - Review ID is recorded
  - Action is traceable

#### 10.3. Log review flagging

**File:** `tests/functional/log-review-flagging.spec.ts`

**Steps:**
  1. GenAI flags review
  2. Admin reviews flagged content
  3. Check audit logs

**Expected Results:**
  - Flagging action is logged
  - Log includes timestamp
  - Reason for flagging is recorded
  - Action is traceable

#### 10.4. Generate review activity reports

**File:** `tests/functional/generate-review-reports.spec.ts`

**Steps:**
  1. Multiple reviews are submitted
  2. Login as admin
  3. Generate review activity report

**Expected Results:**
  - Admin can generate reports
  - Reports show review activity per AP
  - Reports show activity per product category
  - Data is accurate and exportable
