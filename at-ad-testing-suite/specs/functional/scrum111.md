# Test Cases for SCRUM111

## TC_SCRUM111_001
**Test Name:** Verify Dashboard Summary Cards Display

**Precondition:** Vendor is logged in and has product listings

**Steps:**
1. Navigate to vendor dashboard
2. Verify four summary cards are displayed: Total Products, Total Interest, Total Listings, Avg. Rating
3. Check each card shows label, count, and trend indicator

**Expected Result:** All four summary cards display correctly with proper data

---

## TC_SCRUM111_002
**Test Name:** Verify Navigation Tabs Structure

**Precondition:** Vendor is on dashboard page

**Steps:**
1. Check navigation tabs are present: Product Upload, Product Management, Interest Expressed, Listing, Reviews & Ratings
2. Verify "Listing" tab is selected by default

**Expected Result:** All navigation tabs display with Listing tab active by default

---

## TC_SCRUM111_003
**Test Name:** Verify Product Listing Section Headers

**Precondition:** Vendor is on Listing tab

**Steps:**
1. Check "Product Listing" section title is displayed
2. Verify subheading "Track your product listing submissions and approval status"
3. Check "Your Product Listings" subsection with supporting text

**Expected Result:** All section headers and descriptions display correctly

---

## TC_SCRUM111_004
**Test Name:** Apply Status Filter Pills

**Precondition:** Vendor has products with different statuses

**Steps:**
1. View status filter pills: All, Under Review, Approved with counts
2. Click "Under Review" filter
3. Verify results update instantly
4. Select multiple filters simultaneously

**Expected Result:** Filters work correctly and update results in real-time

---

## TC_SCRUM111_005
**Test Name:** Search Products by Name

**Precondition:** Vendor has multiple products listed

**Steps:**
1. Locate search bar labeled "Search by product name…"
2. Enter partial product name
3. Verify filtered results display matching products

**Expected Result:** Search filters products by name with partial match support

---

## TC_SCRUM111_006
**Test Name:** Filter by Category

**Precondition:** Vendor has products in different categories

**Steps:**
1. Click category dropdown showing "All Categories"
2. Select specific category
3. Verify only products from selected category display

**Expected Result:** Category filter shows only relevant products

---

## TC_SCRUM111_007
**Test Name:** Sort Product Listings

**Precondition:** Vendor has multiple products with different submission dates

**Steps:**
1. Click sorting dropdown showing "Newest First"
2. Select "Oldest First" option
3. Verify listings reorder accordingly

**Expected Result:** Sorting options work correctly and reorder listings

---

## TC_SCRUM111_008
**Test Name:** Verify Product Card Elements

**Precondition:** Vendor has at least one product listing

**Steps:**
1. View product listing card
2. Check product icon, name, category label, submission date, status indicator are displayed
3. Verify color-coded left border matches status (Blue/Orange/Green)
4. Check status label text matches backend status

**Expected Result:** All card elements display correctly with proper color coding

---

## TC_SCRUM111_009
**Test Name:** Verify Official AT Badge Display

**Precondition:** Vendor has Official AT products

**Steps:**
1. Locate Official AT product cards
2. Verify "Official AT" badge is displayed

**Expected Result:** Official AT badge appears on appropriate product cards

---

## TC_SCRUM111_010
**Test Name:** Navigate to Product Details

**Precondition:** Vendor has product listings displayed

**Steps:**
1. Click anywhere on a product card
2. Verify navigation to product details screen

**Expected Result:** Product details screen opens when card is clicked

---

## TC_SCRUM111_011
**Test Name:** Verify Status Error Indicators

**Precondition:** Vendor has products with pending/error statuses

**Steps:**
1. Locate cards with orange alert icons
2. Hover over alert icon to view tooltip

**Expected Result:** Orange alert icons display with explanatory tooltips for error statuses

---

## TC_SCRUM111_012
**Test Name:** Verify Filter Persistence

**Precondition:** Vendor is on Listing page with filters applied

**Steps:**
1. Apply search filter and status filter
2. Navigate within Listing page
3. Verify filters remain applied

**Expected Result:** Filter selections persist during page navigation

---

## TC_SCRUM111_013
**Test Name:** Verify Approval Process Timeline Panel

**Precondition:** Vendor is on Listing page

**Steps:**
1. Scroll to bottom of page
2. Verify "Approval Process Timeline" panel displays
3. Check standard timeline (1-2 days) and Official AT timeline (3-5 days)
4. Verify email notification note is present

**Expected Result:** Timeline panel displays at bottom with correct information

---

## TC_SCRUM111_014
**Test Name:** Handle Empty Search Results

**Precondition:** Vendor has product listings

**Steps:**
1. Enter search term that matches no products
2. Apply filters that result in zero matches

**Expected Result:** Clear empty state message displays "No products found"

---

## TC_SCRUM111_015
**Test Name:** Verify Vendor Authentication Required

**Precondition:** User is not authenticated as vendor

**Steps:**
1. Attempt to access vendor dashboard URL directly

**Expected Result:** Access denied or redirect to login page

---

## TC_SCRUM111_016
**Test Name:** Verify Page Responsiveness

**Precondition:** Vendor is logged in

**Steps:**
1. Access dashboard on desktop browser
2. Resize to tablet dimensions
3. Resize to mobile dimensions
4. Verify layout adapts properly

**Expected Result:** Page displays correctly across all device sizes

---

## TC_SCRUM111_017
**Test Name:** Verify Page Load Performance

**Precondition:** Vendor credentials are valid

**Steps:**
1. Navigate to vendor dashboard
2. Measure page load time

**Expected Result:** Key content loads within 3 seconds under normal conditions