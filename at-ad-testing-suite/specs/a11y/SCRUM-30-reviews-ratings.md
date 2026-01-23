# SCRUM-30 Accessibility Test Plan: Reviews and Ratings

## Application Overview

Comprehensive accessibility test plan for Assistive Partner Reviews and Ratings feature ensuring WCAG 2.1 AA compliance. Tests cover navigation, summary widgets, product list, rating distribution chart, individual review cards, star ratings, search/filter/sort controls, notifications, empty states, error handling, keyboard navigation, and screen reader support.

## Test Scenarios

### 1. Navigation and Page Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC_A11Y_001: Reviews & Ratings tab accessible

**File:** `tests/accessibility/scrum30-reviews/navigation-tab.spec.ts`

**Steps:**
  1. Navigate to AP dashboard
  2. Locate 'Reviews & Ratings' tab
  3. Tab to navigation link
  4. Verify focus indicator visible
  5. Press Enter to activate
  6. Verify page loads

**Expected Results:**
  - Tab keyboard accessible
  - Tab has accessible name 'Reviews & Ratings'
  - Enter/Space activates tab
  - Focus indicator visible
  - aria-current='page' when active

#### 1.2. TC_A11Y_002: Page has proper heading

**File:** `tests/accessibility/scrum30-reviews/page-heading.spec.ts`

**Steps:**
  1. Navigate to Reviews & Ratings page
  2. Verify H1 heading present
  3. Check heading text clear
  4. Verify description explains purpose
  5. Use screen reader heading navigation

**Expected Results:**
  - Page has H1 heading
  - Heading: 'Reviews & Ratings'
  - Description text visible
  - Screen reader can navigate to heading
  - Heading level appropriate

### 2. Summary Widgets

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC_A11Y_003: Average Rating widget accessible

**File:** `tests/accessibility/scrum30-reviews/average-rating-widget.spec.ts`

**Steps:**
  1. Locate Average Rating widget
  2. Verify widget has label
  3. Check rating value visible
  4. Use screen reader to verify announcement
  5. Verify widget semantically marked

**Expected Results:**
  - Widget has accessible name
  - Rating value announced
  - Screen reader: 'Average Rating: 4.3 out of 5'
  - Widget has role='region'
  - Visual and programmatic label

#### 2.2. TC_A11Y_004: Total Reviews widget accessible

**File:** `tests/accessibility/scrum30-reviews/total-reviews-widget.spec.ts`

**Steps:**
  1. Locate Total Reviews widget
  2. Verify widget has label
  3. Check count visible
  4. Use screen reader to verify
  5. Verify updates announced

**Expected Results:**
  - Widget has accessible name
  - Count value announced
  - Screen reader: 'Total Reviews: 68'
  - Widget has role='region'
  - Count updates announced

#### 2.3. TC_A11Y_005: Products Reviewed widget accessible

**File:** `tests/accessibility/scrum30-reviews/products-reviewed-widget.spec.ts`

**Steps:**
  1. Locate Products Reviewed widget
  2. Verify widget has label
  3. Check count visible
  4. Use screen reader to verify
  5. Verify widget accessible

**Expected Results:**
  - Widget has accessible name
  - Count announced
  - Screen reader: 'Products Reviewed: 6'
  - Widget accessible
  - Visual label clear

### 3. Product List with Ratings

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC_A11Y_006: Product list semantic

**File:** `tests/accessibility/scrum30-reviews/product-list-structure.spec.ts`

**Steps:**
  1. Locate product list
  2. Verify list structure semantic
  3. Check each product is list item
  4. Use screen reader to verify list
  5. Verify count announced

**Expected Results:**
  - List has semantic structure
  - List uses <ul> or role='list'
  - Each product is <li> or role='listitem'
  - Screen reader announces list
  - Product count announced

#### 3.2. TC_A11Y_007: Product link accessible

**File:** `tests/accessibility/scrum30-reviews/product-link-accessible.spec.ts`

**Steps:**
  1. Locate product in list
  2. Tab to product link
  3. Verify focus indicator visible
  4. Check accessible name
  5. Press Enter to open
  6. Verify summary page loads

**Expected Results:**
  - Product name is link or button
  - Link/button keyboard accessible
  - Has accessible name
  - Enter/Space activates
  - Opens feedback summary page

#### 3.3. TC_A11Y_008: Product rating display accessible

**File:** `tests/accessibility/scrum30-reviews/product-rating-display.spec.ts`

**Steps:**
  1. View product with rating
  2. Verify stars visible
  3. Check text rating present
  4. Use screen reader to verify
  5. Verify not relying on visual alone

**Expected Results:**
  - Rating displayed with stars
  - Screen reader: '4.3 out of 5 stars'
  - Star icons have aria-hidden='true'
  - Rating value in text
  - Not relying on stars alone

#### 3.4. TC_A11Y_009: Review count accessible

**File:** `tests/accessibility/scrum30-reviews/review-count-display.spec.ts`

**Steps:**
  1. View product in list
  2. Locate review count
  3. Verify count visible
  4. Check text clear
  5. Use screen reader to verify

**Expected Results:**
  - Review count visible
  - Text: '68 reviews'
  - Count associated with product
  - Screen reader announces count
  - Count has sufficient contrast

### 4. Search and Filter Controls

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC_A11Y_010: Product search field accessible

**File:** `tests/accessibility/scrum30-reviews/search-field.spec.ts`

**Steps:**
  1. Locate product search field
  2. Verify visible label present
  3. Check label associated
  4. Tab to field
  5. Verify focus indicator visible

**Expected Results:**
  - Search field has visible label
  - Label: 'Search products'
  - Label associated with input
  - Placeholder supplementary
  - Field keyboard accessible

#### 4.2. TC_A11Y_011: Rating filter accessible

**File:** `tests/accessibility/scrum30-reviews/rating-filter.spec.ts`

**Steps:**
  1. Locate rating filter dropdown
  2. Tab to dropdown
  3. Open with Enter/Space
  4. Navigate options with Arrow keys
  5. Select option
  6. Verify list updates

**Expected Results:**
  - Filter dropdown accessible
  - Options: All Ratings, Highest Rated
  - Keyboard navigable
  - Selected option announced
  - aria-expanded toggles

### 5. Product Feedback Summary Page

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC_A11Y_012: Summary page heading accessible

**File:** `tests/accessibility/scrum30-reviews/summary-page-heading.spec.ts`

**Steps:**
  1. Open product feedback summary
  2. Verify H1 heading present
  3. Check product name in heading
  4. Verify category displayed
  5. Use screen reader to verify all info

**Expected Results:**
  - Page has H1 with product name
  - Category displayed
  - Average rating visible
  - Total reviews count visible
  - All info screen reader accessible

#### 5.2. TC_A11Y_013: Average rating display accessible

**File:** `tests/accessibility/scrum30-reviews/summary-average-rating.spec.ts`

**Steps:**
  1. View average rating on summary
  2. Verify stars visible
  3. Check text rating present
  4. Use screen reader to verify
  5. Measure contrast

**Expected Results:**
  - Rating displayed clearly
  - Screen reader: '4.3 out of 5 stars'
  - Star icons have aria-hidden='true'
  - Text rating present
  - Rating has 4.5:1 contrast

#### 5.3. TC_A11Y_014: Rating distribution chart accessible

**File:** `tests/accessibility/scrum30-reviews/rating-distribution-chart.spec.ts`

**Steps:**
  1. Locate rating distribution chart
  2. Verify chart has accessible name
  3. Check alt text or aria-label
  4. Verify data available as text
  5. Use screen reader to access data

**Expected Results:**
  - Chart has accessible name
  - Chart has role='img' or appropriate ARIA
  - Alt text or aria-label describes data
  - Data also in text/table format
  - Screen reader can access data

#### 5.4. TC_A11Y_015: Chart bars accessible

**File:** `tests/accessibility/scrum30-reviews/chart-bars-accessible.spec.ts`

**Steps:**
  1. Inspect chart bars
  2. Verify each bar labeled
  3. Check counts visible
  4. Use screen reader to verify
  5. Verify not color-dependent

**Expected Results:**
  - Each bar labeled
  - Labels: '5 stars', '4 stars', etc.
  - Count for each rating visible
  - Screen reader announces data
  - Not relying on color alone

#### 5.5. TC_A11Y_016: Recent review date accessible

**File:** `tests/accessibility/scrum30-reviews/recent-review-date.spec.ts`

**Steps:**
  1. Locate most recent review date
  2. Verify label present
  3. Check date format clear
  4. Use screen reader to verify
  5. Verify semantic markup

**Expected Results:**
  - Date has visible label
  - Label: 'Most Recent Review'
  - Date format clear
  - Screen reader announces date
  - Date semantically marked

### 6. Individual Review Cards

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC_A11Y_017: Reviews section has heading

**File:** `tests/accessibility/scrum30-reviews/reviews-section-heading.spec.ts`

**Steps:**
  1. Locate Customer Reviews section
  2. Verify H2 heading present
  3. Check subtitle visible
  4. Use screen reader heading navigation
  5. Verify heading hierarchy

**Expected Results:**
  - Section has H2 heading
  - Heading: 'Customer Reviews'
  - Subtitle visible
  - Screen reader navigates to section
  - Heading level appropriate

#### 6.2. TC_A11Y_018: Reviews list semantic

**File:** `tests/accessibility/scrum30-reviews/reviews-list-structure.spec.ts`

**Steps:**
  1. Locate reviews list
  2. Verify list structure semantic
  3. Check each review is list item
  4. Use screen reader to verify
  5. Verify count announced

**Expected Results:**
  - Reviews in semantic list
  - List uses <ul> or role='list'
  - Each review is <li> or role='listitem'
  - Screen reader announces list
  - Review count announced

#### 6.3. TC_A11Y_019: Review star rating accessible

**File:** `tests/accessibility/scrum30-reviews/review-star-rating.spec.ts`

**Steps:**
  1. View individual review
  2. Verify stars visible
  3. Check text rating present
  4. Use screen reader to verify
  5. Verify accessible to all users

**Expected Results:**
  - Star rating visible
  - Screen reader: '4 out of 5 stars'
  - Stars have aria-hidden='true'
  - Text rating present
  - Not relying on stars alone

#### 6.4. TC_A11Y_020: Anonymous user ID accessible

**File:** `tests/accessibility/scrum30-reviews/anonymous-user-id.spec.ts`

**Steps:**
  1. View review card
  2. Locate user identifier
  3. Verify identifier visible
  4. Check contrast sufficient
  5. Use screen reader to verify

**Expected Results:**
  - User identifier visible
  - Text: 'PwD User 1084' or 'Verified User'
  - Identifier has sufficient contrast
  - Screen reader announces identifier
  - Privacy maintained

#### 6.5. TC_A11Y_021: Review text accessible

**File:** `tests/accessibility/scrum30-reviews/review-text-accessible.spec.ts`

**Steps:**
  1. View review text
  2. Verify text readable
  3. Check contrast sufficient
  4. Use screen reader to read
  5. Test long review expansion

**Expected Results:**
  - Review text readable
  - Text has 4.5:1 contrast
  - Text wraps properly
  - Screen reader reads text
  - Long reviews expandable

#### 6.6. TC_A11Y_022: Review date accessible

**File:** `tests/accessibility/scrum30-reviews/review-date-accessible.spec.ts`

**Steps:**
  1. Locate review date
  2. Verify date visible
  3. Check format clear
  4. Use screen reader to verify
  5. Measure contrast

**Expected Results:**
  - Date has label
  - Date format clear
  - Screen reader announces date
  - Date has sufficient contrast
  - Date semantically marked

### 7. Review Sort and Filter

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC_A11Y_023: Review filter accessible

**File:** `tests/accessibility/scrum30-reviews/review-filter-dropdown.spec.ts`

**Steps:**
  1. Locate review filter dropdown
  2. Tab to dropdown
  3. Open with Enter/Space
  4. Navigate options
  5. Select option
  6. Verify reviews update

**Expected Results:**
  - Dropdown keyboard accessible
  - Options: All Ratings, Most Recent
  - Arrow keys navigate
  - Selected option announced
  - Filter updates reviews

#### 7.2. TC_A11Y_024: Filter change announced

**File:** `tests/accessibility/scrum30-reviews/filter-change-announced.spec.ts`

**Steps:**
  1. Change review filter
  2. Verify reviews update
  3. Check aria-live announces
  4. Use screen reader to verify
  5. Verify visual feedback

**Expected Results:**
  - Filter change announced via aria-live
  - Announcement: 'Filtered by Most Recent'
  - Screen reader announces change
  - Visual indicator present
  - Reviews update without page reload

### 8. Expandable Review Text

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC_A11Y_025: Expand review button accessible

**File:** `tests/accessibility/scrum30-reviews/expand-button.spec.ts`

**Steps:**
  1. Locate long review
  2. Tab to 'Read more' button
  3. Verify focus indicator visible
  4. Press Enter to expand
  5. Verify text expands
  6. Check button changes

**Expected Results:**
  - Expand button keyboard accessible
  - Button has accessible name 'Read more'
  - Enter/Space expands text
  - Expanded state announced
  - Button changes to 'Read less'

#### 8.2. TC_A11Y_026: Text expansion announced

**File:** `tests/accessibility/scrum30-reviews/expand-announced.spec.ts`

**Steps:**
  1. Expand review text
  2. Verify aria-expanded changes
  3. Check aria-live announces
  4. Use screen reader to verify
  5. Test collapse functionality

**Expected Results:**
  - Expansion announced via aria-live
  - aria-expanded='true' when expanded
  - Screen reader announces expansion
  - Focus remains on button
  - Collapse works same way

### 9. Catalog Card Rating Display

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC_A11Y_027: Catalog card rating accessible

**File:** `tests/accessibility/scrum30-reviews/catalog-card-rating.spec.ts`

**Steps:**
  1. View product catalog card
  2. Locate rating display
  3. Verify stars visible
  4. Check text rating present
  5. Use screen reader to verify
  6. Measure contrast

**Expected Results:**
  - Rating visible on card
  - Screen reader: '4.3 out of 5 stars'
  - Stars have aria-hidden='true'
  - Text rating present
  - Rating has 4.5:1 contrast

#### 9.2. TC_A11Y_028: Rating link scrolls to reviews

**File:** `tests/accessibility/scrum30-reviews/rating-link-scroll.spec.ts`

**Steps:**
  1. Navigate to product details
  2. Tab to rating link
  3. Press Enter
  4. Verify scrolls to reviews
  5. Check focus management
  6. Verify scroll announced

**Expected Results:**
  - Rating is link or button
  - Link keyboard accessible
  - Clicking scrolls to reviews
  - Focus moves to reviews section
  - Scroll announced

### 10. No Ratings State

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC_A11Y_029: No ratings message accessible

**File:** `tests/accessibility/scrum30-reviews/no-ratings-message.spec.ts`

**Steps:**
  1. View product with no ratings
  2. Verify message displays
  3. Check message clear
  4. Use screen reader to verify
  5. Verify no empty stars shown

**Expected Results:**
  - Message visible
  - Text: 'No ratings available'
  - Message has proper semantics
  - Screen reader announces message
  - No empty star display

### 11. No Reviews State

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC_A11Y_030: No reviews message accessible

**File:** `tests/accessibility/scrum30-reviews/no-reviews-message.spec.ts`

**Steps:**
  1. View product with no reviews
  2. Verify empty state displays
  3. Check message clear
  4. Use screen reader to verify
  5. Verify message helpful

**Expected Results:**
  - Empty state message visible
  - Text: 'No reviews received yet'
  - Message has proper semantics
  - Screen reader announces message
  - Message helpful

### 12. Error States

**Seed:** `tests/seed.spec.ts`

#### 12.1. TC_A11Y_031: Error message accessible

**File:** `tests/accessibility/scrum30-reviews/error-message.spec.ts`

**Steps:**
  1. Trigger review load error
  2. Verify error message displays
  3. Check error has role='alert'
  4. Use screen reader to verify
  5. Verify retry option accessible

**Expected Results:**
  - Error message visible
  - Text: 'Unable to load reviews'
  - Error has role='alert'
  - Screen reader announces error
  - Retry option provided

### 13. Notification for New Review

**Seed:** `tests/seed.spec.ts`

#### 13.1. TC_A11Y_032: New review notification accessible

**File:** `tests/accessibility/scrum30-reviews/new-review-notification.spec.ts`

**Steps:**
  1. Trigger new review notification
  2. Verify notification appears
  3. Check role='status' or aria-live
  4. Use screen reader to verify
  5. Verify dismissible

**Expected Results:**
  - Notification appears
  - Text: 'New review received for [Product]'
  - Notification has role='status' or aria-live
  - Screen reader announces notification
  - Notification dismissible

#### 13.2. TC_A11Y_033: Notification link accessible

**File:** `tests/accessibility/scrum30-reviews/notification-link.spec.ts`

**Steps:**
  1. View notification
  2. Tab to notification link
  3. Verify focus indicator visible
  4. Press Enter
  5. Verify navigates to review
  6. Check focus management

**Expected Results:**
  - Notification is link
  - Link keyboard accessible
  - Link has accessible name
  - Clicking navigates to review
  - Focus managed appropriately

### 14. Keyboard Navigation

**Seed:** `tests/seed.spec.ts`

#### 14.1. TC_A11Y_034: Tab order logical

**File:** `tests/accessibility/scrum30-reviews/tab-order.spec.ts`

**Steps:**
  1. Tab from page start
  2. Verify tab order follows layout
  3. Check all controls reachable
  4. Verify no keyboard traps
  5. Tab through entire page

**Expected Results:**
  - Tab order: Widgets → Search → Filters → Product List
  - Order follows visual layout
  - All interactive elements reachable
  - No keyboard traps
  - Focus visible throughout

#### 14.2. TC_A11Y_035: Focus indicators visible

**File:** `tests/accessibility/scrum30-reviews/focus-indicators.spec.ts`

**Steps:**
  1. Tab through all elements
  2. Verify focus indicator on each
  3. Check focus has 3:1 contrast
  4. Verify focus not obscured
  5. Check indicator thickness

**Expected Results:**
  - All focusable elements show focus
  - Focus indicators have 3:1 contrast
  - Focus visible and not obscured
  - Indicator thickness adequate
  - WCAG 2.4.7 satisfied

### 15. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 15.1. TC_A11Y_036: Text contrast meets WCAG AA

**File:** `tests/accessibility/scrum30-reviews/text-contrast.spec.ts`

**Steps:**
  1. Measure contrast for all text
  2. Check star ratings contrast
  3. Check button text
  4. Verify review text
  5. Check all meets standard

**Expected Results:**
  - All text has 4.5:1 contrast
  - Star ratings have 3:1 contrast
  - Button text has 4.5:1
  - Review text has 4.5:1
  - All text meets WCAG AA

#### 15.2. TC_A11Y_037: Not relying on color alone

**File:** `tests/accessibility/scrum30-reviews/not-color-only.spec.ts`

**Steps:**
  1. Review star ratings
  2. Check text rating present
  3. Inspect chart
  4. Verify patterns/labels used
  5. Test in grayscale

**Expected Results:**
  - Rating not conveyed by color alone
  - Stars supplemented with text
  - Chart uses patterns/labels
  - Status not color-dependent
  - WCAG 1.4.1 satisfied

#### 15.3. TC_A11Y_038: Page scales to 200% zoom

**File:** `tests/accessibility/scrum30-reviews/zoom-200.spec.ts`

**Steps:**
  1. Zoom browser to 200%
  2. Verify all content visible
  3. Check reviews readable
  4. Verify no horizontal scrolling
  5. Check all functionality works

**Expected Results:**
  - All content visible at 200%
  - No text truncation
  - Reviews remain readable
  - No horizontal scrolling
  - Functionality preserved

#### 15.4. TC_A11Y_039: Mobile responsive accessible

**File:** `tests/accessibility/scrum30-reviews/mobile-responsive.spec.ts`

**Steps:**
  1. Set viewport to mobile (375x667)
  2. Navigate to Reviews & Ratings
  3. Verify all content accessible
  4. Check touch targets adequate
  5. Test all functionality

**Expected Results:**
  - Page accessible on mobile
  - Touch targets 44x44px minimum
  - Reviews readable
  - All controls usable
  - No loss of functionality

### 16. Screen Reader Compatibility

**Seed:** `tests/seed.spec.ts`

#### 16.1. TC_A11Y_040: Screen reader announces all content

**File:** `tests/accessibility/scrum30-reviews/screen-reader-comprehensive.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate through entire page
  3. Verify all sections announced
  4. Check star ratings announced
  5. Verify all content accessible

**Expected Results:**
  - All sections announced
  - Star ratings announced as text
  - Review content read correctly
  - Navigation landmarks work
  - All content accessible

#### 16.2. TC_A11Y_041: Dynamic content announced

**File:** `tests/accessibility/scrum30-reviews/screen-reader-dynamic.spec.ts`

**Steps:**
  1. Apply filter
  2. Verify change announced
  3. Expand review
  4. Verify announced
  5. Trigger notification
  6. Verify announced

**Expected Results:**
  - Filter changes announced
  - Review expansion announced
  - New notifications announced
  - Chart data announced
  - All dynamic updates accessible
