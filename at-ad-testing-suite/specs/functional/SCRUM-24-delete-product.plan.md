# SCRUM-24 Test Plan

## Application Overview

Test plan for validating product deletion functionality including soft delete, hard delete, confirmation dialogs, admin visibility, media handling, notifications, audit trails, and WCAG 2.1 AA compliance.

## Test Scenarios

### 1. Access Delete Option

**Seed:** `tests/seed/vendor-product-list.spec.ts`

#### 1.1. Verify Delete Product option visibility

**File:** `tests/functional/delete-option-visibility.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Product Management Page
  3. Locate Delete Product option for owned products

**Expected Results:**
  - Delete Product option is visible for each owned product
  - Option is accessible in action column
  - Button is clearly labeled

#### 1.2. Verify delete option only for owned products

**File:** `tests/functional/delete-owned-products-only.spec.ts`

**Steps:**
  1. Login as approved AP
  2. View product list
  3. Check delete option availability

**Expected Results:**
  - Delete option available only for AP's own products
  - No delete option for products owned by others
  - Authorization is enforced

#### 1.3. Delete product under review

**File:** `tests/functional/delete-product-under-review.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Locate product with "Under Review" status
  3. Click Delete Product
  4. Confirm deletion

**Expected Results:**
  - Delete option is available for products under review
  - Product can be deleted before publishing
  - Deletion is successful

### 2. Confirmation Prompt

**Seed:** `tests/seed/vendor-product-list.spec.ts`

#### 2.1. Display confirmation dialog

**File:** `tests/functional/delete-confirmation-dialog.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click Delete Product
  3. Observe confirmation dialog

**Expected Results:**
  - Confirmation dialog appears
  - Warning message displays: "This will permanently delete <Product Name>. This action cannot be undone."
  - Dialog includes "Delete Product" and "Cancel" buttons
  - Product name is shown in message

#### 2.2. Cancel deletion

**File:** `tests/functional/cancel-deletion.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click Delete Product
  3. Click Cancel in confirmation dialog
  4. Verify product status

**Expected Results:**
  - Dialog closes without action
  - Product remains in list
  - No deletion occurs
  - Product status unchanged

#### 2.3. Confirm deletion

**File:** `tests/functional/confirm-deletion.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Click Delete Product
  3. Click Delete Product in confirmation dialog
  4. Verify deletion

**Expected Results:**
  - Product is deleted after confirmation
  - Confirmation message appears
  - Product removed from list
  - Action is logged

### 3. Deletion Rules for Published Products

**Seed:** `tests/seed/vendor-published-products.spec.ts`

#### 3.1. Delete published product from catalog

**File:** `tests/functional/delete-published-product.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Delete published product
  3. Confirm deletion
  4. Login as PwD user
  5. Search for deleted product in catalog

**Expected Results:**
  - Product removed from public catalog immediately
  - Product not visible to PwD users
  - Deletion record is stored
  - Product shows deleted status to AP

#### 3.2. Verify deleted product visible to AP with status

**File:** `tests/functional/deleted-status-visible-to-ap.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Delete published product
  3. Check product list

**Expected Results:**
  - Deleted product still visible to AP
  - Product shows "Deleted" status
  - AP can view deletion details
  - Product marked as inactive

### 4. Deletion Rules for Draft/Pending Products

**Seed:** `tests/seed/vendor-draft-products.spec.ts`

#### 4.1. Delete draft product completely

**File:** `tests/functional/delete-draft-product.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Delete product in draft status
  3. Confirm deletion
  4. Check product list

**Expected Results:**
  - Draft product is deleted completely
  - Product removed from AP's product list
  - No trace in active products
  - Deletion is logged

#### 4.2. Delete pending product completely

**File:** `tests/functional/delete-pending-product.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Delete product in pending status
  3. Confirm deletion
  4. Check product list

**Expected Results:**
  - Pending product is deleted completely
  - Product removed from AP's product list
  - Admin review queue is updated
  - Deletion is logged

### 5. Soft Deletion and Admin Visibility

**Seed:** `tests/seed/admin-deleted-products.spec.ts`

#### 5.1. Verify soft delete for published products

**File:** `tests/functional/soft-delete-published.spec.ts`

**Steps:**
  1. AP deletes published product
  2. Login as admin
  3. View deleted products in backend

**Expected Results:**
  - Product moved to "Archived" or "Deleted" state
  - Data integrity is maintained
  - Admin can view deleted item
  - Metadata includes deletion date, reason, user ID

#### 5.2. Admin hard deletes soft deleted product

**File:** `tests/functional/admin-hard-delete.spec.ts`

**Steps:**
  1. AP soft deletes product
  2. Login as admin
  3. Locate soft deleted product
  4. Perform hard delete

**Expected Results:**
  - Admin can hard delete soft deleted products
  - Hard delete option only available for soft deleted items
  - Product permanently removed
  - Action is logged

#### 5.3. Vendor hard deletes under review product

**File:** `tests/functional/vendor-hard-delete-under-review.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Locate product under review
  3. Delete product
  4. Verify deletion type

**Expected Results:**
  - Under review products can be hard deleted by vendor
  - Product is permanently removed
  - No soft delete state
  - Deletion is complete

#### 5.4. Vendor hard deletes rejected product

**File:** `tests/functional/vendor-hard-delete-rejected.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Locate rejected product
  3. Delete product
  4. Verify deletion type

**Expected Results:**
  - Rejected products can be hard deleted by vendor
  - Product is permanently removed
  - No soft delete state
  - Deletion is complete

### 6. AP Opt-Out Scenario

**Seed:** `tests/seed/vendor-opt-out.spec.ts`

#### 6.1. Auto soft delete on AP opt-out

**File:** `tests/functional/auto-soft-delete-opt-out.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Opt out of system
  3. Login as admin
  4. Check all AP's products

**Expected Results:**
  - All products move to soft delete automatically
  - Products removed from public catalog
  - Admin can view all soft deleted products
  - Data is preserved for audit

### 7. User Notifications

**Seed:** `tests/seed/pwd-user-interests.spec.ts`

#### 7.1. Notify users with existing interests

**File:** `tests/functional/notify-interested-users.spec.ts`

**Steps:**
  1. PwD user saves product to interests
  2. AP deletes the product
  3. Login as PwD user
  4. Check notifications

**Expected Results:**
  - Users with interests receive notification
  - Notification states product is unavailable
  - Message is clear and informative
  - Notification is accessible

### 8. System Feedback

**Seed:** `tests/seed/vendor-product-list.spec.ts`

#### 8.1. Display success confirmation message

**File:** `tests/functional/deletion-success-message.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Delete product
  3. Confirm deletion
  4. Observe confirmation message

**Expected Results:**
  - Confirmation message appears
  - Message states: "Product 'X' has been deleted successfully and is no longer visible in the catalog."
  - Product name is included
  - Message is clearly visible

#### 8.2. Verify product removed from lists

**File:** `tests/functional/product-removed-from-lists.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Delete product
  3. Check AP's product list
  4. Login as PwD user
  5. Check catalog

**Expected Results:**
  - Product no longer in AP's active product list
  - Product not visible in PwD catalog
  - Search results exclude deleted product
  - Product is effectively hidden

### 9. Error Handling

**Seed:** `tests/seed/vendor-product-list.spec.ts`

#### 9.1. Handle system error during deletion

**File:** `tests/functional/deletion-system-error.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Attempt to delete product
  3. Simulate system error
  4. Observe error message

**Expected Results:**
  - Error message displays
  - Message states: "Unable to delete the product at this time. Please try again later or contact support."
  - Product remains in list
  - AP can retry later

#### 9.2. Block unauthorized deletion attempts

**File:** `tests/functional/block-unauthorized-deletion.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Attempt to delete product owned by another AP
  3. Observe error message

**Expected Results:**
  - Deletion is blocked
  - Error message: "You do not have permission to delete this product."
  - Authorization is enforced
  - Product remains unchanged

### 10. Associated Media Handling

**Seed:** `tests/seed/vendor-product-with-media.spec.ts`

#### 10.1. Mark media inactive on deletion

**File:** `tests/functional/mark-media-inactive.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Delete product with images and videos
  3. Confirm deletion
  4. Verify media status

**Expected Results:**
  - All associated media marked inactive
  - Images removed from live content store
  - Videos removed from live content store
  - Documents marked inactive

#### 10.2. Verify no broken links in catalog

**File:** `tests/functional/no-broken-media-links.spec.ts`

**Steps:**
  1. AP deletes product with media
  2. Login as PwD user
  3. Browse catalog
  4. Check for broken links or placeholders

**Expected Results:**
  - No broken links visible
  - No placeholder images shown
  - Catalog displays cleanly
  - Media cleanup is complete

### 11. Accessibility and UI Standards

**Seed:** `tests/seed/vendor-product-list.spec.ts`

#### 11.1. Verify keyboard accessibility

**File:** `tests/functional/delete-keyboard-accessibility.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Delete button using keyboard
  3. Activate delete using Enter/Space
  4. Navigate confirmation dialog with keyboard

**Expected Results:**
  - Delete button is keyboard accessible
  - Tab order is logical
  - Enter/Space activates delete
  - Dialog is fully keyboard navigable

#### 11.2. Verify screen reader compatibility

**File:** `tests/functional/delete-screen-reader.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Use screen reader to navigate
  3. Activate delete option
  4. Navigate confirmation dialog

**Expected Results:**
  - Screen reader announces delete button
  - Confirmation dialog is announced
  - Warning message is read clearly
  - All buttons are accessible

#### 11.3. Verify color contrast and focus states

**File:** `tests/functional/delete-contrast-focus.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to delete option
  3. Check color contrast
  4. Test focus indicators

**Expected Results:**
  - Color contrast meets WCAG 2.1 AA
  - Focus indicators are clearly visible
  - Dialog text is readable
  - Buttons have clear visual states

### 12. Audit Trail

**Seed:** `tests/seed/admin-audit-logs.spec.ts`

#### 12.1. Log deletion event details

**File:** `tests/functional/audit-log-deletion.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Delete product
  3. Confirm deletion
  4. Login as admin
  5. View audit logs

**Expected Results:**
  - Deletion event is logged
  - Log includes product name and ID
  - Log includes AP name and ID
  - Log includes deletion date and time
  - Action recorded as "Deleted by Vendor"

#### 12.2. Generate deletion reports

**File:** `tests/functional/admin-deletion-reports.spec.ts`

**Steps:**
  1. Multiple APs delete products
  2. Login as admin
  3. Generate deletion report
  4. Review report data

**Expected Results:**
  - Admin can generate deletion reports
  - Report includes all vendor-initiated deletions
  - Data is accurate and complete
  - Report can be exported

### 13. Impact on Analytics and Recommendations

**Seed:** `tests/seed/pwd-catalog-analytics.spec.ts`

#### 13.1. Exclude deleted products from search

**File:** `tests/functional/exclude-from-search.spec.ts`

**Steps:**
  1. AP deletes product
  2. Login as PwD user
  3. Search for deleted product
  4. Check search results

**Expected Results:**
  - Deleted product not in search results
  - Search excludes deleted items
  - Only active products are shown
  - Search functionality is accurate

#### 13.2. Exclude from recommendations

**File:** `tests/functional/exclude-from-recommendations.spec.ts`

**Steps:**
  1. AP deletes product
  2. Login as PwD user
  3. View product recommendations
  4. Check if deleted product appears

**Expected Results:**
  - Deleted product not in recommendations
  - Recommendation engine excludes deleted items
  - Only active products are recommended
  - System is updated immediately

#### 13.3. Exclude from analytics dashboards

**File:** `tests/functional/exclude-from-analytics.spec.ts`

**Steps:**
  1. AP deletes product
  2. Login as admin
  3. View analytics dashboard
  4. Check active product metrics

**Expected Results:**
  - Deleted product excluded from active metrics
  - Dashboard shows only active products
  - Counts are accurate
  - Real-time updates are reflected

#### 13.4. Preserve historical engagement data

**File:** `tests/functional/preserve-historical-data.spec.ts`

**Steps:**
  1. Product has views and saves
  2. AP deletes product
  3. Login as admin
  4. View aggregated analytics

**Expected Results:**
  - Historical data (views, saves) is preserved
  - Data remains in aggregated analytics
  - Product name is not displayed
  - Data integrity is maintained
