# Test Cases for SCRUM18

## TC_SCRUM18_001
**Test Name:** Verify Dashboard Access for Approved AP

**Precondition:** AP is approved and authenticated

**Steps:**
1. Login with valid AP credentials
2. Verify redirection to AP Dashboard

**Expected Result:** AP is redirected to dashboard immediately after successful login

---

## TC_SCRUM18_002
**Test Name:** Verify Access Restriction for Unapproved AP

**Precondition:** AP registration is pending approval

**Steps:**
1. Login with unapproved AP credentials
2. Verify message display

**Expected Result:** Message "Your registration is under review" is displayed instead of dashboard

---

## TC_SCRUM18_003
**Test Name:** Verify Dashboard Header Elements

**Precondition:** Approved AP is logged in to dashboard

**Steps:**
1. Verify welcome message with organization name
2. Check presence of 4 navigation buttons: Dashboard, Help and Resources, Profile, Logout
3. Click each button to verify navigation

**Expected Result:** Welcome message displays organization name and all 4 buttons navigate to correct pages

---

## TC_SCRUM18_004
**Test Name:** Verify Summary Widgets Display

**Precondition:** AP is on dashboard page

**Steps:**
1. Locate summary widgets section
2. Verify display of: Total Products, Total Interest, Total Listings, Avg. Rating
3. Check widget styling matches Figma design

**Expected Result:** All 4 key metrics widgets are displayed with correct styling

---

## TC_SCRUM18_005
**Test Name:** Verify Tab Navigation Functionality

**Precondition:** AP is on dashboard page

**Steps:**
1. Locate 4 tabs: Product Management, Product Upload, Interest Expressed, Review and Ratings
2. Click on each tab
3. Verify navigation to corresponding detailed pages

**Expected Result:** Each tab navigates to its respective detailed page

---

## TC_SCRUM18_006
**Test Name:** Verify Notification Bell Icon Functionality

**Precondition:** AP has notifications in system

**Steps:**
1. Locate bell icon on dashboard
2. Verify notification count flag display
3. Click on bell icon
4. Verify popup with recent notifications list

**Expected Result:** Bell icon shows notification count and popup displays recent notifications with timestamps

---

## TC_SCRUM18_007
**Test Name:** Verify Notification Management Actions

**Precondition:** Notification popup is open

**Steps:**
1. Click "Mark all as read" button
2. Verify individual notification dismiss functionality
3. Click "View All Notifications" button

**Expected Result:** All notifications marked as read, individual dismiss works, and detailed notification center opens

---

## TC_SCRUM18_008
**Test Name:** Verify Detailed Notification Center

**Precondition:** User is in detailed notification center

**Steps:**
1. Verify widgets: Total, Unread, Interest notification counts
2. Check tabs: All, Unread, Interest, Updates, Reviews, Admin with counts
3. Verify notification list with read/delete buttons
4. Click back button

**Expected Result:** All widgets and tabs display correct counts, notification actions work, back button returns to dashboard

---

## TC_SCRUM18_009
**Test Name:** Verify Dashboard Responsiveness

**Precondition:** Dashboard is loaded

**Steps:**
1. Test dashboard on desktop resolution
2. Test on tablet resolution
3. Test on mobile resolution
4. Verify all elements are properly displayed

**Expected Result:** Dashboard is responsive and functional across all device types

---

## TC_SCRUM18_010
**Test Name:** Verify Dashboard Performance and Session Timeout

**Precondition:** AP attempts to access dashboard

**Steps:**
1. Measure dashboard load time
2. Remain inactive for 30+ minutes
3. Attempt to perform action after timeout

**Expected Result:** Dashboard loads within 3 seconds and session times out after 30 minutes of inactivity