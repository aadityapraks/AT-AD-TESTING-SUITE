# Test Cases for SCRUM25

## Common Positive Test Cases

### TC-SCRUM25-P001
**Test Name:** Access Deleted Products Section Successfully

**Precondition:** Admin user is logged in with proper permissions

**Steps:**
1. Navigate to Admin Dashboard
2. Click on "Deleted Products" or "Archived Items" section
3. Verify list displays with product details

**Expected Result:** Deleted products list loads with Product Name, Vendor Name, Deletion Date, Reason, and Deleted By information

---

### TC-SCRUM25-P002
**Test Name:** View Deleted Product Details

**Precondition:** Admin is on deleted products list

**Steps:**
1. Click on a deleted product record
2. Review product detail view
3. Verify all product information is displayed

**Expected Result:** Product details page opens showing name, descriptions, media, specifications with "Deleted – Not Visible to PwD Users" label

---

### TC-SCRUM25-P003
**Test Name:** Successfully Restore Deleted Product

**Precondition:** Admin is viewing deleted product details

**Steps:**
1. Click "Restore Product" button
2. Confirm restoration in dialog box
3. Verify success message appears

**Expected Result:** Product restored with "Pending Review" status and success confirmation message

---

### TC-SCRUM25-P004
**Test Name:** Search and Filter Deleted Products

**Precondition:** Admin has access to deleted products section

**Steps:**
1. Use search functionality to find specific product
2. Apply filters by vendor, date, or category
3. Verify filtered results display correctly

**Expected Result:** Search and filter functions work correctly showing relevant deleted products

---

## Common Negative Test Cases

### TC-SCRUM25-N001
**Test Name:** Unauthorized Access to Deleted Products

**Precondition:** User without admin privileges attempts access

**Steps:**
1. Try to access deleted products section
2. Verify access restriction

**Expected Result:** Access denied with appropriate error message about insufficient privileges

---

### TC-SCRUM25-N002
**Test Name:** Restore Product Without Proper Permissions

**Precondition:** User without restore permissions views deleted product

**Steps:**
1. Attempt to click restore button
2. Try to restore product

**Expected Result:** Error message "You do not have the necessary privileges to restore this product"

---

### TC-SCRUM25-N003
**Test Name:** Cancel Product Restoration

**Precondition:** Admin clicks restore button

**Steps:**
1. Click "Restore Product" button
2. Click "Cancel" in confirmation dialog
3. Verify product remains deleted

**Expected Result:** Restoration cancelled, product stays in deleted state

---

## Validation Test Cases

### TC-SCRUM25-V001
**Test Name:** Validate Restoration Confirmation Dialog

**Precondition:** Admin clicks restore product button

**Steps:**
1. Verify confirmation dialog appears with correct message
2. Check dialog contains proper warning text
3. Validate confirm and cancel options are present

**Expected Result:** Dialog displays "Are you sure you want to restore this product? It will become visible to the vendor and, once approved, will be republished on the catalog"

---

### TC-SCRUM25-V002
**Test Name:** Verify Post-Restoration Status Change

**Precondition:** Product has been successfully restored

**Steps:**
1. Check product status in admin panel
2. Verify product appears in vendor dashboard
3. Confirm product is in review queue

**Expected Result:** Product status shows "Pending Review" and appears in appropriate queues

---

### TC-SCRUM25-V003
**Test Name:** Validate Vendor Notification After Restoration

**Precondition:** Product restoration is completed

**Steps:**
1. Check vendor receives email notification
2. Verify notification content is accurate
3. Confirm dashboard notification appears

**Expected Result:** Vendor receives email and dashboard notification about product restoration

---

## Edge Case Test Cases

### TC-SCRUM25-E001
**Test Name:** Restore Product with Missing Media Files

**Precondition:** Deleted product has associated media that is no longer available

**Steps:**
1. Attempt to restore product with missing media
2. Check system response

**Expected Result:** Error message "Product restoration failed. Some media files are no longer available" or partial restoration flag

---

### TC-SCRUM25-E002
**Test Name:** Restore Product Multiple Times

**Precondition:** Product has already been restored once

**Steps:**
1. Try to restore the same product again
2. Verify system behavior

**Expected Result:** System prevents duplicate restoration or shows appropriate message

---

### TC-SCRUM25-E003
**Test Name:** Empty Deleted Products List

**Precondition:** No products have been deleted

**Steps:**
1. Access deleted products section
2. Verify empty state display

**Expected Result:** Appropriate empty state message displays when no deleted products exist

---

## Advanced Test Cases

### TC-SCRUM25-A001
**Test Name:** Audit Trail Recording for Restoration

**Precondition:** Admin performs product restoration

**Steps:**
1. Restore a deleted product
2. Check audit log entries
3. Verify complete audit trail information

**Expected Result:** Audit log records Product ID, Admin details, timestamp, and "Restored by Admin" action

---

### TC-SCRUM25-A002
**Test Name:** Bulk Restoration Operations

**Precondition:** Multiple products are deleted and admin needs to restore several

**Steps:**
1. Select multiple deleted products
2. Perform bulk restoration if available
3. Verify all products are restored correctly

**Expected Result:** Bulk restoration completes successfully with appropriate status updates

---

### TC-SCRUM25-A003
**Test Name:** Media and Data Integrity After Restoration

**Precondition:** Deleted product had images, videos, and metadata

**Steps:**
1. Restore product with complete media set
2. Verify all media files are properly linked
3. Check metadata integrity

**Expected Result:** All media and metadata restored without broken references

---

## Network & Connectivity Related Test Cases

### TC-SCRUM25-NET001
**Test Name:** Product Restoration During Network Interruption

**Precondition:** Admin initiates product restoration process

**Steps:**
1. Click restore product button
2. Simulate network disconnection during restoration
3. Reconnect network and check status

**Expected Result:** System handles network interruption gracefully with appropriate error handling

---

### TC-SCRUM25-NET002
**Test Name:** Load Deleted Products List with Slow Network

**Precondition:** Admin accesses deleted products section with slow connection

**Steps:**
1. Navigate to deleted products with slow network
2. Monitor loading behavior
3. Verify eventual successful load

**Expected Result:** Loading indicators display, list eventually loads completely

---

### TC-SCRUM25-NET003
**Test Name:** API Timeout During Product Details Retrieval

**Precondition:** Backend API experiences delays

**Steps:**
1. Click on deleted product to view details
2. Wait for API timeout scenario
3. Check error handling

**Expected Result:** Timeout error message displays with retry option

---

### TC-SCRUM25-NET004
**Test Name:** Partial Data Submission During Restoration

**Precondition:** Network issues occur during restoration process

**Steps:**
1. Start product restoration
2. Simulate partial data transmission failure
3. Verify system recovery

**Expected Result:** System detects incomplete restoration and provides recovery options