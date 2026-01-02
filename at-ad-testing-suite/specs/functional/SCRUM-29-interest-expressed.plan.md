# SCRUM-29 Test Plan

## Application Overview

Test plan for validating Interest Expressed functionality including summary metrics, interest list view, search/filter/sort, view details modal, reveal contact details, notifications, download/export, privacy compliance, and WCAG 2.1 AA compliance.

## Test Scenarios

### 1. Access and Navigation

**Seed:** `tests/seed/vendor-dashboard.spec.ts`

#### 1.1. Verify Interest Expressed tab visibility

**File:** `tests/functional/interest-tab-visibility.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to vendor dashboard
  3. Locate Interest Expressed tab

**Expected Results:**
  - Interest Expressed tab is visible in navigation
  - Tab is accessible and clickable
  - Tab label is clear

#### 1.2. Load interest summary page

**File:** `tests/functional/load-interest-summary.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click Interest Expressed tab
  3. Observe page load

**Expected Results:**
  - Page loads without errors
  - Clear heading is displayed
  - Description explains section purpose
  - Content is visible

### 2. Summary Metrics and Notifications

**Seed:** `tests/seed/vendor-dashboard-metrics.spec.ts`

#### 2.1. Display Total Interest metric

**File:** `tests/functional/display-total-interest.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View dashboard
  3. Locate Total Interest widget

**Expected Results:**
  - Total Interest metric is displayed
  - Cumulative interest count is shown
  - Widget is clearly visible
  - Count is accurate

#### 2.2. Increment count in real time

**File:** `tests/functional/realtime-count-increment.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View Total Interest count
  3. PwD user expresses new interest
  4. Observe count update

**Expected Results:**
  - New interests increment total count
  - Update occurs in near real time
  - Count is accurate
  - No page refresh needed

#### 2.3. Display notification indicator

**File:** `tests/functional/notification-indicator.spec.ts`

**Steps:**
  1. PwD user expresses interest
  2. Login as AP
  3. View dashboard

**Expected Results:**
  - Notification indicator appears
  - Indicator shows new interest recorded
  - Visual cue is clear
  - Indicator is clickable

#### 2.4. Link notification to Interest Expressed section

**File:** `tests/functional/notification-link.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click notification indicator
  3. Observe navigation

**Expected Results:**
  - Notification links directly to Interest Expressed section
  - Navigation is seamless
  - Relevant interest is highlighted
  - No page errors

### 3. Interest List View

**Seed:** `tests/seed/interest-list.spec.ts`

#### 3.1. Display interest list columns

**File:** `tests/functional/display-interest-columns.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. View interest list

**Expected Results:**
  - Name & basic profile details (age, disability type) displayed
  - Location (city, state) displayed
  - Interested product(s) displayed
  - Number of shares displayed
  - Interest date displayed
  - Action (View Details) button displayed

#### 3.2. Verify pagination

**File:** `tests/functional/verify-pagination.spec.ts`

**Steps:**
  1. Login as approved AP with many interests
  2. Navigate to Interest Expressed
  3. Check pagination controls

**Expected Results:**
  - Results are paginated
  - Result count is visible (e.g., "Showing 1–10 of X results")
  - Pagination controls are functional
  - Navigation between pages works

#### 3.3. Verify default sorting

**File:** `tests/functional/verify-default-sorting.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Check list order

**Expected Results:**
  - Default sorting is Newest First
  - Most recent interests appear at top
  - Sorting is consistent
  - Dates are in descending order

### 4. Search, Filter, and Sort

**Seed:** `tests/seed/interest-list.spec.ts`

#### 4.1. Search by name

**File:** `tests/functional/search-by-name.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Enter name in search field
  4. Observe results

**Expected Results:**
  - Search by name is functional
  - Results filter instantly
  - Matching records are displayed
  - No full page reload

#### 4.2. Search by location

**File:** `tests/functional/search-by-location.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Enter location in search field
  4. Observe results

**Expected Results:**
  - Search by location is functional
  - Results filter by city/state
  - Matching records are displayed
  - Search is accurate

#### 4.3. Search by product

**File:** `tests/functional/search-by-product.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Enter product name in search field
  4. Observe results

**Expected Results:**
  - Search by product is functional
  - Results show interests for that product
  - Matching records are displayed
  - Search is accurate

#### 4.4. Filter by state

**File:** `tests/functional/filter-by-state.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Select state from filter
  4. Observe results

**Expected Results:**
  - Filter by state is functional
  - Results update instantly
  - Only selected state records shown
  - No page reload

#### 4.5. Filter by disability type

**File:** `tests/functional/filter-by-disability.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Select disability type from filter
  4. Observe results

**Expected Results:**
  - Filter by disability type is functional
  - Results update instantly
  - Only selected type records shown
  - Filter is accurate

#### 4.6. Change sort order

**File:** `tests/functional/change-sort-order.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Change sort to Oldest First
  4. Observe results

**Expected Results:**
  - Sort order can be changed
  - Results reorder accordingly
  - Oldest interests appear first
  - Sorting is consistent

### 5. View Details Modal

**Seed:** `tests/seed/interest-list.spec.ts`

#### 5.1. Open View Details modal

**File:** `tests/functional/open-view-details-modal.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Click View Details on an interest
  4. Observe modal

**Expected Results:**
  - Modal opens without navigating away
  - Modal displays over current page
  - Content is visible
  - Page remains in background

#### 5.2. Display modal content

**File:** `tests/functional/display-modal-content.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Review displayed information

**Expected Results:**
  - Personal information summary (age, disability type) displayed
  - Date and time when interest was expressed shown
  - Masked contact information displayed
  - Location and full address shown
  - List of products PwD is interested in displayed

#### 5.3. Close modal with X icon

**File:** `tests/functional/close-modal-x-icon.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Click Close (X) icon

**Expected Results:**
  - Modal closes
  - Returns to interest list
  - No data is lost
  - Page state is preserved

#### 5.4. Close modal by clicking outside

**File:** `tests/functional/close-modal-outside-click.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Click outside modal area

**Expected Results:**
  - Modal closes
  - Returns to interest list
  - Interaction is intuitive
  - Page state is preserved

### 6. Reveal Contact Details

**Seed:** `tests/seed/interest-list.spec.ts`

#### 6.1. Verify masked contact by default

**File:** `tests/functional/verify-masked-contact.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Check contact information

**Expected Results:**
  - Contact details are masked by default
  - Phone number is hidden
  - Email is hidden
  - Privacy is protected

#### 6.2. Reveal contact details

**File:** `tests/functional/reveal-contact-details.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Click Reveal Details button
  4. Observe contact information

**Expected Results:**
  - Phone number is explicitly revealed
  - Email is explicitly revealed
  - Action is logged for audit
  - Details are clearly visible

#### 6.3. Verify reveal only for own products

**File:** `tests/functional/reveal-own-products-only.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Attempt to view interest for another AP's product
  3. Check reveal option

**Expected Results:**
  - Vendor can only reveal details for PwD users who expressed interest in their products
  - Authorization is enforced
  - No unauthorized access
  - Security is maintained

### 7. Product Interest Details

**Seed:** `tests/seed/interest-list.spec.ts`

#### 7.1. Display product interest details

**File:** `tests/functional/display-product-interest.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open View Details modal
  3. Review product information

**Expected Results:**
  - Product name is displayed
  - Product image thumbnail is shown
  - Number of times product was shared is displayed
  - All details are accurate

#### 7.2. Show only owned products

**File:** `tests/functional/show-owned-products-only.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View interest list
  3. Check products displayed

**Expected Results:**
  - Only products owned by logged-in AP are shown
  - No products from other APs visible
  - Authorization is enforced
  - Data is filtered correctly

### 8. Data Accuracy and Permissions

**Seed:** `tests/seed/interest-list.spec.ts`

#### 8.1. Verify data accuracy

**File:** `tests/functional/verify-data-accuracy.spec.ts`

**Steps:**
  1. PwD user expresses interest
  2. Login as AP
  3. View interest data
  4. Compare with PwD submission

**Expected Results:**
  - Interest data matches actual PwD submissions
  - All fields are accurate
  - No data corruption
  - Information is reliable

#### 8.2. Prevent editing interest records

**File:** `tests/functional/prevent-editing-interests.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View interest details
  3. Attempt to edit fields

**Expected Results:**
  - Vendors cannot edit interest records
  - Vendors cannot delete interest records
  - Vendors cannot modify interest records
  - Data integrity is maintained

#### 8.3. Block viewing interests for non-owned products

**File:** `tests/functional/block-non-owned-interests.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Attempt to view interests for products not owned
  3. Check access

**Expected Results:**
  - Vendors cannot view interests for products they do not own
  - Access is blocked
  - Authorization is enforced
  - Security is maintained

### 9. Download and Export

**Seed:** `tests/seed/interest-list.spec.ts`

#### 9.1. Download interest list

**File:** `tests/functional/download-interest-list.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Click Download List button
  4. Verify downloaded file

**Expected Results:**
  - Download List button is functional
  - File downloads successfully
  - Downloaded data includes only permitted fields
  - Privacy rules are respected

#### 9.2. Export reflects filters and sorting

**File:** `tests/functional/export-reflects-filters.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Apply filters and sorting
  3. Download interest list
  4. Verify exported data

**Expected Results:**
  - Export reflects applied filters
  - Export reflects current sorting
  - Only filtered results are exported
  - Data is accurate

### 10. Notification of New Interest

**Seed:** `tests/seed/pwd-express-interest.spec.ts`

#### 10.1. Receive in-app notification

**File:** `tests/functional/receive-inapp-notification.spec.ts`

**Steps:**
  1. PwD user expresses interest in AP's product
  2. Login as AP
  3. Check dashboard for notification

**Expected Results:**
  - AP receives automated in-app notification
  - Notification appears on dashboard
  - Notification includes product name and timestamp
  - No PwD identity or contact info included

#### 10.2. Receive email alert

**File:** `tests/functional/receive-email-alert.spec.ts`

**Steps:**
  1. PwD user expresses interest in AP's product
  2. Check AP's email inbox

**Expected Results:**
  - AP receives email alert
  - Email subject: "New Interest Expressed in Your Product 'Smart Cane V2'."
  - Email includes product and timestamp
  - No sensitive PwD details included

### 11. Notification Center

**Seed:** `tests/seed/vendor-notifications.spec.ts`

#### 11.1. Access Notification Center

**File:** `tests/functional/access-notification-center.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to dashboard
  3. Click Notification Center

**Expected Results:**
  - Notification Center is accessible from dashboard
  - All recent alerts are displayed
  - Notifications include interests, comments, admin messages
  - Interface is clear

#### 11.2. Display notification details

**File:** `tests/functional/display-notification-details.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Notification Center
  3. Review notification entries

**Expected Results:**
  - Each notification includes Product Name
  - Date & Time is displayed
  - Type (Interest / Update / Review) is shown
  - Status (Read / Unread) is indicated

#### 11.3. Mark notification as read

**File:** `tests/functional/mark-notification-read.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Notification Center
  3. Mark notification as read

**Expected Results:**
  - AP can mark notifications as read
  - Status changes from Unread to Read
  - Visual indicator updates
  - Action is saved

#### 11.4. Delete notification

**File:** `tests/functional/delete-notification.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Notification Center
  3. Delete a notification

**Expected Results:**
  - AP can delete notifications from view
  - Notification is removed
  - List updates accordingly
  - Action is confirmed

### 12. Data Refresh and Updates

**Seed:** `tests/seed/interest-list.spec.ts`

#### 12.1. Auto-refresh interest data

**File:** `tests/functional/auto-refresh-interest.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View Interest Expressed section
  3. Wait for auto-refresh interval
  4. Observe updates

**Expected Results:**
  - Section updates automatically in real time or at intervals
  - New interests appear without manual refresh
  - Data is current
  - Updates are seamless

#### 12.2. Display unread notifications

**File:** `tests/functional/display-unread-notifications.spec.ts`

**Steps:**
  1. New interest is expressed
  2. Login as AP
  3. Check notifications

**Expected Results:**
  - New notifications appear as unread
  - Unread status persists until viewed
  - Visual indicator is clear
  - Count is accurate

#### 12.3. Filter by product category

**File:** `tests/functional/filter-by-category.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Filter by product category
  4. Observe results

**Expected Results:**
  - AP can filter interests by product category
  - Results update accordingly
  - Only selected category shown
  - Filter is functional

#### 12.4. Filter by date range

**File:** `tests/functional/filter-by-date-range.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Select date range filter
  4. Observe results

**Expected Results:**
  - AP can filter interests by date range
  - Results show only interests within range
  - Filter is accurate
  - Date selection is intuitive

### 13. Privacy and Compliance

**Seed:** `tests/seed/interest-list.spec.ts`

#### 13.1. Verify no direct PwD personal details visible

**File:** `tests/functional/no-pwd-personal-details.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View interest list
  3. Check displayed information

**Expected Results:**
  - No direct PwD personal details visible to APs
  - Contact info is masked by default
  - Privacy is protected
  - Data minimization principles followed

#### 13.2. Verify data minimization

**File:** `tests/functional/verify-data-minimization.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View interest data
  3. Check what information is displayed

**Expected Results:**
  - System shows only counts and metadata allowed by privacy policy
  - Minimal data is exposed
  - Privacy policy is enforced
  - Compliance is maintained

### 14. Error Handling

**Seed:** `tests/seed/interest-list.spec.ts`

#### 14.1. Display empty state message

**File:** `tests/functional/display-empty-state.spec.ts`

**Steps:**
  1. Login as approved AP with no interests
  2. Navigate to Interest Expressed
  3. Observe message

**Expected Results:**
  - Empty state message displays
  - Message states: "No interests recorded yet for your products."
  - Message is clearly visible
  - UI is clean

#### 14.2. Handle data retrieval error

**File:** `tests/functional/handle-data-error.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Simulate data retrieval issue
  4. Observe error message

**Expected Results:**
  - Error message appears
  - Message states: "Unable to load interest data at this time. Please try again later."
  - User can retry
  - Error is handled gracefully

### 15. Accessibility and Usability

**Seed:** `tests/seed/interest-list.spec.ts`

#### 15.1. Verify clear headings and labels

**File:** `tests/functional/verify-headings-labels.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Interest Expressed
  3. Check headings and data table labels

**Expected Results:**
  - Clear headings are present
  - Data tables are properly labeled
  - Structure is semantic
  - WCAG 2.1 AA compliance

#### 15.2. Verify keyboard accessibility

**File:** `tests/functional/interest-keyboard-access.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate Interest Expressed using keyboard
  3. Test filters and controls

**Expected Results:**
  - Keyboard accessible controls for filters
  - Navigation is fully keyboard accessible
  - Tab order is logical
  - All functions work via keyboard

#### 15.3. Verify screen reader compatibility

**File:** `tests/functional/interest-screen-reader.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Use screen reader to navigate Interest Expressed
  3. Test all elements

**Expected Results:**
  - Screen reader accessible
  - All content is announced
  - ARIA labels are present
  - Navigation is intuitive

#### 15.4. Verify notification color contrast

**File:** `tests/functional/notification-color-contrast.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View notifications
  3. Check color indicators

**Expected Results:**
  - Notifications use readable, high-contrast colors
  - New/unread alerts are clearly indicated
  - Color contrast meets WCAG 2.1 AA
  - Visual cues are accessible

### 16. Audit and Tracking

**Seed:** `tests/seed/admin-audit-logs.spec.ts`

#### 16.1. Log notification generation and viewing

**File:** `tests/functional/log-notification-activity.spec.ts`

**Steps:**
  1. Notifications are generated
  2. AP views notifications
  3. Login as admin
  4. Check audit logs

**Expected Results:**
  - All notifications generated are logged
  - All notifications viewed are logged
  - Timestamps are recorded
  - Audit trail is complete

#### 16.2. Track contact detail reveals

**File:** `tests/functional/track-contact-reveals.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Reveal PwD contact details
  3. Login as admin
  4. Check tracking logs

**Expected Results:**
  - Each click on Reveal Details is tracked
  - Log includes AP ID and timestamp
  - PwD ID is recorded
  - Compliance tracking is maintained

#### 16.3. Generate engagement reports

**File:** `tests/functional/generate-engagement-reports.spec.ts`

**Steps:**
  1. Multiple interests are expressed
  2. Login as admin
  3. Generate engagement report

**Expected Results:**
  - Admin can view aggregate reports
  - Report shows AP engagement metrics
  - Report includes "Top 10 products by user interest"
  - Data is accurate and exportable
