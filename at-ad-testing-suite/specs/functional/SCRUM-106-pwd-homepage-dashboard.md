# Test Plan: PwD Portal Homepage and Dashboard

**Document Version:** 1.0  
**Date:** 2025-01-29  
**Jira Issue:** SCRUM-106  
**Story:** PwD- Landing on Portal Homepage and Dashboard  
**Priority:** Medium  
**Status:** In Progress

---

## Overview

Test plan for PWD portal homepage and dashboard functionality including navigation, authentication, featured content, and user-specific views for logged-in and non-logged-in users.

**Base URL:** https://hub-ui-admin-dev.swarajability.org

---

## Requirements Traceability Matrix

| Test Suite | Jira Issue | Acceptance Criteria |
|------------|------------|---------------------|
| Homepage Access and Navigation | SCRUM-106 | AC #1, #2 |
| Homepage Content Sections | SCRUM-106 | AC #3, #4, #5 |
| Dashboard - Authenticated Users | SCRUM-106 | AC #7 |
| Authentication and Session Management | SCRUM-106 | AC #1, #9 |
| Header and Footer | SCRUM-106 | AC #6 |
| Responsive Design | SCRUM-106 | AC #8 |
| Performance and Error Handling | SCRUM-106 | AC #9 |

---

## Test Suites

### Suite 1: Homepage Access and Navigation

#### TC-001: Non-authenticated user can access homepage
**Priority:** Critical  
**Preconditions:** User is not logged in

**Steps:**
1. Navigate to the PWD portal homepage
2. Verify page loads successfully
3. Verify AT/AD portal branding is visible
4. Verify Sign In/Register options are displayed

**Expected Results:**
- Homepage loads within 3 seconds
- AT/AD portal label is clearly visible
- Sign In and Register buttons are present and accessible
- No dashboard or device matcher tabs are visible

---

#### TC-002: Top navigation tabs are visible and functional
**Priority:** Critical  
**Preconditions:** User is not logged in

**Steps:**
1. Navigate to homepage as non-authenticated user
2. Verify presence of Home, Catalog, Stories, Help & Resources tabs
3. Click on each tab
4. Verify navigation to corresponding pages

**Expected Results:**
- All 4 tabs (Home, Catalog, Stories, Help & Resources) are visible
- Dashboard and Device Matcher tabs are NOT visible for non-authenticated users
- Each tab navigates to the correct page
- Active tab is highlighted

---

#### TC-003: Authenticated user sees additional navigation tabs
**Priority:** High  
**Preconditions:** User has valid credentials

**Steps:**
1. Login as registered PWD user
2. Navigate to homepage/dashboard
3. Verify presence of all navigation tabs including Dashboard and Device Matcher
4. Click on Dashboard tab
5. Click on Device Matcher tab

**Expected Results:**
- All 6 tabs are visible (Home, Catalog, Stories, Help & Resources, Dashboard, Device Matcher)
- Dashboard tab navigates to personalized dashboard
- Device Matcher tab is accessible
- User remains authenticated across navigation

---

### Suite 2: Homepage Content Sections

#### TC-004: Hero carousel displays for all user types
**Priority:** High  
**Preconditions:** None

**Steps:**
1. Navigate to homepage
2. Verify carousel is present
3. Verify PWD slide with 'Explore Catalog' and 'Success Stories' buttons
4. Wait for carousel to auto-advance or manually navigate
5. Verify Donors slide with 'Donate Now' and 'See Impact Stories' buttons
6. Navigate to next slide
7. Verify Vendors slide with 'Register Now' and 'View Catalog' buttons

**Expected Results:**
- Carousel displays with 3 slides
- Each slide shows appropriate directive text
- PWD slide has 2 action buttons that navigate correctly
- Donors slide has 2 action buttons that navigate correctly
- Vendors slide has 2 action buttons that navigate correctly
- Carousel auto-advances or has manual controls

---

#### TC-005: Summary widgets display key metrics
**Priority:** Medium  
**Preconditions:** None

**Steps:**
1. Navigate to homepage
2. Scroll to summary widgets section
3. Verify Total Devices widget is visible
4. Verify Verified Vendors widget is visible
5. Verify Success Stories widget is visible
6. Verify Community Members widget is visible
7. Check if widgets are animated

**Expected Results:**
- All 4 widgets are displayed
- Each widget shows a numeric value
- Widgets are non-interactive (informative only)
- Widgets display animation effects
- Data is readable and properly formatted

---

#### TC-006: Featured Devices section displays correctly
**Priority:** High  
**Preconditions:** None

**Steps:**
1. Navigate to homepage
2. Scroll to Featured Devices section
3. Verify device cards are displayed
4. Verify 'View All' button is present
5. Click 'View All' button
6. Verify navigation to catalog page

**Expected Results:**
- Featured Devices section is visible
- Multiple device cards are displayed with consistent styling
- Each card matches catalog page card design
- 'View All' button navigates to catalog page
- Device information is clearly displayed

---

#### TC-007: Non-authenticated user prompted to sign in on View Details
**Priority:** High  
**Preconditions:** User is not logged in

**Steps:**
1. Navigate to homepage as non-authenticated user
2. Scroll to Featured Devices section
3. Click 'View Details' button on any device card
4. Verify sign in/register popup appears

**Expected Results:**
- 'View Details' button is clickable
- Sign in/Register popup is displayed
- Popup prevents access to detailed view
- User can close popup and return to homepage

---

#### TC-008: Success Stories section displays correctly
**Priority:** Medium  
**Preconditions:** None

**Steps:**
1. Navigate to homepage
2. Scroll to Success Stories section
3. Verify story cards are displayed
4. Verify 'Read More' button is present
5. Click on a story card
6. Verify navigation to Stories page with selected story
7. Return to homepage
8. Click 'Read More' button
9. Verify navigation to Stories page

**Expected Results:**
- Success Stories section is visible
- Multiple story cards are displayed
- Story cards match Stories page design
- Clicking story card navigates to Stories page
- 'Read More' button navigates to Stories page
- Story content is readable

---

### Suite 3: Dashboard - Authenticated Users

#### TC-009: Successful login redirects to dashboard
**Priority:** Critical  
**Preconditions:** User has valid SwarajAbility credentials

**Steps:**
1. Navigate to homepage
2. Click Sign In button
3. Enter valid SwarajAbility credentials
4. Submit login form
5. Verify redirect to personalized dashboard

**Expected Results:**
- Login form accepts credentials
- User is authenticated successfully
- User is redirected to dashboard immediately after login
- Dashboard displays personalized content
- Welcome message with user name is displayed

---

#### TC-010: Dashboard displays personalized sections
**Priority:** High  
**Preconditions:** User is logged in

**Steps:**
1. Login as registered PWD user
2. Verify welcome directive text is displayed
3. Verify 'Get Recommendations' button is present
4. Verify 'Browse All Devices' button is present
5. Scroll to verify Recommended Section
6. Scroll to verify Success Stories section
7. Scroll to verify About PWD Portal section

**Expected Results:**
- Welcome message addresses user personally
- 'Get Recommendations' button is visible and clickable
- 'Browse All Devices' button is visible and clickable
- Recommended Section displays personalized device recommendations
- Success Stories section is present
- About PWD Portal section displays animated cards

---

#### TC-011: Dashboard action buttons navigate correctly
**Priority:** High  
**Preconditions:** User is logged in

**Steps:**
1. Login as registered PWD user
2. Click 'Get Recommendations' button
3. Verify navigation to Catalog page with recommendations toggle
4. Navigate back to dashboard
5. Click 'Browse All Devices' button
6. Verify navigation to Catalog page

**Expected Results:**
- 'Get Recommendations' navigates to Catalog with personalized recommendations
- Recommendations toggle is active on Catalog page
- 'Browse All Devices' navigates to full Catalog page
- User remains authenticated during navigation

---

#### TC-012: Dashboard recommended section View All and View Details
**Priority:** High  
**Preconditions:** User is logged in

**Steps:**
1. Login as registered PWD user
2. Scroll to Recommended Section on dashboard
3. Click 'View All' button
4. Verify navigation to detailed Catalog page
5. Navigate back to dashboard
6. Click 'View Details' on a product card
7. Verify navigation to product detail page

**Expected Results:**
- 'View All' navigates to Catalog page
- 'View Details' on product card navigates to product detail page
- User can access detailed information without additional prompts
- Navigation maintains user session

---

#### TC-013: Only registered users can access dashboard
**Priority:** Critical  
**Preconditions:** User is not logged in

**Steps:**
1. As non-authenticated user, attempt to navigate directly to dashboard URL
2. Verify redirect to login or homepage
3. Verify dashboard tab is not visible in navigation

**Expected Results:**
- Non-authenticated users cannot access dashboard
- User is redirected to login page or homepage
- Dashboard tab is hidden from non-authenticated users
- Appropriate message is displayed

---

### Suite 4: Authentication and Session Management

#### TC-014: User can register new profile
**Priority:** High  
**Preconditions:** User does not have an account

**Steps:**
1. Navigate to homepage
2. Click Register button
3. Fill in registration form with valid data
4. Submit registration
5. Verify successful registration
6. Verify redirect to dashboard or confirmation page

**Expected Results:**
- Registration form is accessible
- Form accepts valid user data
- Registration completes successfully
- User receives confirmation
- User can access dashboard after registration

---

#### TC-015: Session timeout after inactivity
**Priority:** Medium  
**Preconditions:** User is logged in

**Steps:**
1. Login as registered PWD user
2. Wait for 30 minutes of inactivity
3. Attempt to navigate or perform action
4. Verify session timeout message
5. Verify redirect to login page

**Expected Results:**
- Session remains active during user activity
- Session expires after 30 minutes of inactivity
- User is notified of session timeout
- User is redirected to login page
- User must re-authenticate to continue

---

### Suite 5: Header and Footer

#### TC-016: Header displays consistently across pages
**Priority:** Medium  
**Preconditions:** None

**Steps:**
1. Navigate to homepage
2. Verify header elements (logo, navigation, auth buttons)
3. Navigate to Catalog page
4. Verify header remains consistent
5. Navigate to Stories page
6. Verify header remains consistent
7. Login and verify header updates with user info

**Expected Results:**
- Header is present on all pages
- Header design matches Figma specifications
- Navigation tabs are consistent
- Auth buttons update based on login state
- Header is responsive

---

#### TC-017: Footer displays consistently across pages
**Priority:** Low  
**Preconditions:** None

**Steps:**
1. Navigate to homepage
2. Scroll to footer
3. Verify footer content and links
4. Navigate to other pages
5. Verify footer remains consistent

**Expected Results:**
- Footer is present on all pages
- Footer design matches Figma specifications
- All footer links are functional
- Footer is responsive

---

### Suite 6: Responsive Design

#### TC-018: Homepage responsive on desktop
**Priority:** High  
**Preconditions:** None

**Steps:**
1. Set viewport to desktop size (1920x1080)
2. Navigate to homepage
3. Verify all sections display correctly
4. Verify navigation is horizontal
5. Verify carousel displays properly

**Expected Results:**
- All content is visible and properly aligned
- Navigation bar is horizontal
- Carousel displays full-width
- Device cards display in grid layout
- No horizontal scrolling required

---

#### TC-019: Homepage responsive on tablet
**Priority:** Medium  
**Preconditions:** None

**Steps:**
1. Set viewport to tablet size (768x1024)
2. Navigate to homepage
3. Verify all sections adapt to tablet layout
4. Verify navigation adapts appropriately
5. Test touch interactions

**Expected Results:**
- Content adapts to tablet width
- Navigation may collapse to hamburger menu
- Carousel remains functional
- Device cards adjust to 2-column layout
- Touch targets are appropriately sized

---

#### TC-020: Homepage responsive on mobile
**Priority:** High  
**Preconditions:** None

**Steps:**
1. Set viewport to mobile size (375x667)
2. Navigate to homepage
3. Verify all sections adapt to mobile layout
4. Verify navigation collapses to hamburger menu
5. Test mobile interactions

**Expected Results:**
- Content stacks vertically
- Navigation is hamburger menu
- Carousel is swipeable
- Device cards display single column
- All buttons are easily tappable

---

### Suite 7: Performance and Error Handling

#### TC-021: Homepage loads within performance threshold
**Priority:** High  
**Preconditions:** None

**Steps:**
1. Clear browser cache
2. Navigate to homepage
3. Measure time to load key content
4. Verify load time is under 3 seconds

**Expected Results:**
- Homepage loads within 3 seconds under normal conditions
- Key content (hero, navigation) loads first
- Images load progressively
- No blocking resources delay rendering

---

#### TC-022: Error handling for data retrieval failures
**Priority:** Medium  
**Preconditions:** None

**Steps:**
1. Simulate API failure for featured devices
2. Navigate to homepage
3. Verify error message is displayed
4. Verify page remains functional
5. Simulate API failure for success stories
6. Verify appropriate error handling

**Expected Results:**
- Clear error messages appear for failed data retrieval
- Page does not crash or become unresponsive
- Other sections continue to function
- User can retry or navigate away
- Error messages are user-friendly

---

#### TC-023: Downtime message displays correctly
**Priority:** Low  
**Preconditions:** System is in maintenance mode

**Steps:**
1. Simulate system downtime
2. Attempt to access homepage
3. Verify downtime message is displayed
4. Verify message is clear and informative

**Expected Results:**
- Downtime message is displayed prominently
- Message explains the situation clearly
- Contact information or retry option is provided
- Page design remains intact

---

## Test Data Requirements

- **Valid PWD User Credentials:** Email and password for existing SwarajAbility account
- **New User Registration Data:** Valid email, name, password, disability profile
- **Featured Devices:** Sample device data for testing card display
- **Success Stories:** Sample story data for testing story cards

---

## Assumptions & Dependencies

- SwarajAbility authentication service is operational
- Figma designs are finalized and accessible
- API endpoints for devices, stories, and user data are available
- Test environment mirrors production configuration
- WCAG 2.1 AA compliance requirements are documented

---

## Open Questions / Clarifications Needed

1. **Featured Devices Logic:** What is the logic for selecting featured devices? (Random or curated?)
2. **Success Stories Logic:** What is the logic for selecting featured stories? (Random or curated?)
3. **Session Timeout:** Confirm exact timeout duration (30 minutes mentioned)
4. **Error Messages:** Specific wording for error messages and downtime notifications
5. **Carousel Timing:** Auto-advance timing for hero carousel
6. **Widget Data Source:** Where do summary widget metrics come from?

---

## References

- **Jira Story:** [SCRUM-106](https://youth4jobs.atlassian.net/browse/SCRUM-106)
- **Figma Design:** [PWDs Portal Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1&p=f&t=DSuDYKTS0kIUwmPN-0)
- **Related Story:** [SCRUM-73 - Catalog Page](https://youth4jobs.atlassian.net/browse/SCRUM-73)
