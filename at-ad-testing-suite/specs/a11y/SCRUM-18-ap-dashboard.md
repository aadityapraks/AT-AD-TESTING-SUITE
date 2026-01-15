# SCRUM-18 Accessibility Test Plan

## Application Overview

Comprehensive accessibility test plan for Assistive Partner Dashboard Homepage (SCRUM-18) covering WCAG 2.1 AA compliance for navigation, widgets, tabs, and notification centre.

## Test Scenarios

### 1. Dashboard Navigation and Structure

**Seed:** `seed.spec.ts`

#### 1.1. TC_A11Y_001: Verify keyboard navigation through main navigation buttons

**File:** `tests/accessibility/scrum18-dashboard-navigation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Press Tab key to navigate through Dashboard, Help & Resources, Profile, and Logout buttons
  3. Verify focus indicator is visible on each button
  4. Verify tab order follows logical left-to-right sequence
  5. Press Enter on each button to verify activation

**Expected Results:**
  - All 4 navigation buttons are keyboard accessible
  - Focus indicator has 3:1 contrast ratio (WCAG 2.4.7)
  - Tab order is logical: Dashboard → Help → Profile → Logout
  - Enter key activates each button
  - No keyboard traps exist

#### 1.2. TC_A11Y_002: Verify screen reader announces navigation buttons correctly

**File:** `tests/accessibility/scrum18-dashboard-navigation.spec.ts`

**Steps:**
  1. Enable screen reader (NVDA/JAWS)
  2. Navigate to dashboard
  3. Tab through each navigation button
  4. Verify screen reader announces button name and role
  5. Verify current page state is announced (aria-current)

**Expected Results:**
  - Each button has accessible name matching visible text
  - Role 'button' or 'link' is announced
  - Current page (Dashboard) has aria-current='page'
  - Button states (pressed/not pressed) are announced
  - No empty or generic labels like 'button' or 'click here'

#### 1.3. TC_A11Y_003: Verify welcome message is accessible to screen readers

**File:** `tests/accessibility/scrum18-dashboard-navigation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to dashboard
  3. Verify welcome message with organization name is present
  4. Use screen reader to read welcome message
  5. Verify heading level is appropriate (h1 or h2)

**Expected Results:**
  - Welcome message is announced by screen reader
  - Organization name is included in announcement
  - Heading level follows logical hierarchy
  - Text has 4.5:1 contrast ratio (WCAG 1.4.3)
  - Message is programmatically associated with page

#### 1.4. TC_A11Y_004: Verify page title and landmarks

**File:** `tests/accessibility/scrum18-dashboard-navigation.spec.ts`

**Steps:**
  1. Navigate to dashboard
  2. Verify page title is descriptive
  3. Use screen reader to navigate by landmarks
  4. Verify main, navigation, and complementary landmarks exist
  5. Verify skip links are present

**Expected Results:**
  - Page title includes 'Dashboard' and organization name
  - Main content area has role='main' or <main> element
  - Navigation has role='navigation' or <nav> element
  - Skip to main content link is first focusable element
  - All landmarks have accessible names

### 2. Summary Widgets Accessibility

**Seed:** `seed.spec.ts`

#### 2.1. TC_A11Y_005: Verify summary widgets are keyboard accessible

**File:** `tests/accessibility/scrum18-widgets.spec.ts`

**Steps:**
  1. Navigate to dashboard
  2. Tab through all 4 summary widgets (Total Products, Total Interest, Total Listings, Avg Rating)
  3. Verify each widget is focusable if interactive
  4. Verify focus indicator is visible
  5. Test keyboard activation if widgets are clickable

**Expected Results:**
  - All interactive widgets are keyboard accessible
  - Focus indicator visible with 3:1 contrast
  - Non-interactive widgets are not in tab order
  - Enter/Space activates clickable widgets
  - Tab order follows visual layout

#### 2.2. TC_A11Y_006: Verify screen reader announces widget content correctly

**File:** `tests/accessibility/scrum18-widgets.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to each summary widget
  3. Verify widget label is announced
  4. Verify numeric value is announced
  5. Verify unit/context is announced (e.g., 'products', 'rating out of 5')

**Expected Results:**
  - Widget label announced: 'Total Products', 'Total Interest', etc.
  - Numeric value announced clearly
  - Context provided (e.g., '4.5 out of 5 stars')
  - Widgets have role='region' or appropriate ARIA role
  - Each widget has aria-label or aria-labelledby

#### 2.3. TC_A11Y_007: Verify widget visual accessibility

**File:** `tests/accessibility/scrum18-widgets.spec.ts`

**Steps:**
  1. Inspect widget text color contrast
  2. Verify label text has 4.5:1 contrast ratio
  3. Verify numeric values have 4.5:1 contrast ratio
  4. Test zoom to 200% - verify widgets remain readable
  5. Verify widgets don't rely on color alone for meaning

**Expected Results:**
  - All text meets 4.5:1 contrast ratio (WCAG 1.4.3)
  - Large text (18pt+) meets 3:1 contrast ratio
  - Widgets readable at 200% zoom (WCAG 1.4.4)
  - Information not conveyed by color alone (WCAG 1.4.1)
  - Widget borders/separators have 3:1 contrast

#### 2.4. TC_A11Y_008: Verify dynamic widget updates are announced

**File:** `tests/accessibility/scrum18-widgets.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Trigger action that updates widget values (e.g., add product)
  3. Verify screen reader announces the update
  4. Check for aria-live region on widgets
  5. Verify update doesn't disrupt user's current focus

**Expected Results:**
  - Widget updates have aria-live='polite' or 'assertive'
  - Screen reader announces new values
  - Update announcement is clear and contextual
  - Focus is not moved unexpectedly
  - Visual indicator shows update occurred

### 3. Tab Navigation Accessibility

**Seed:** `seed.spec.ts`

#### 3.1. TC_A11Y_009: Verify keyboard navigation through tabs

**File:** `tests/accessibility/scrum18-tabs.spec.ts`

**Steps:**
  1. Navigate to tab navigation area
  2. Press Tab to focus on tab list
  3. Use Arrow keys (Left/Right) to navigate between tabs
  4. Press Enter/Space to activate selected tab
  5. Verify Home/End keys jump to first/last tab

**Expected Results:**
  - Tab list has role='tablist'
  - Individual tabs have role='tab'
  - Arrow keys navigate between tabs (WCAG 2.1.1)
  - Enter/Space activates selected tab
  - Home/End keys work as expected
  - Only one tab is in tab order at a time

#### 3.2. TC_A11Y_010: Verify screen reader announces tab states

**File:** `tests/accessibility/scrum18-tabs.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to tab list
  3. Move through each tab
  4. Verify selected tab state is announced
  5. Verify tab count is announced (e.g., 'tab 1 of 4')

**Expected Results:**
  - Tab role announced: 'Product Management tab'
  - Selected state announced: 'selected' or 'active'
  - Tab position announced: '1 of 4'
  - aria-selected='true' on active tab
  - aria-selected='false' on inactive tabs

#### 3.3. TC_A11Y_011: Verify tab panel accessibility

**File:** `tests/accessibility/scrum18-tabs.spec.ts`

**Steps:**
  1. Activate each tab
  2. Verify associated tab panel is displayed
  3. Check tab panel has role='tabpanel'
  4. Verify tab panel is labeled by its tab
  5. Test keyboard navigation into tab panel content

**Expected Results:**
  - Tab panel has role='tabpanel'
  - Tab panel has aria-labelledby pointing to tab
  - Only active tab panel is visible
  - Tab panel content is keyboard accessible
  - Focus moves to tab panel after tab activation (optional)

#### 3.4. TC_A11Y_012: Verify tab visual accessibility

**File:** `tests/accessibility/scrum18-tabs.spec.ts`

**Steps:**
  1. Inspect tab text contrast
  2. Verify active tab has visual indicator
  3. Verify focus indicator on tabs
  4. Test tabs at 200% zoom
  5. Verify tabs don't rely on color alone

**Expected Results:**
  - Tab text has 4.5:1 contrast ratio
  - Active tab indicator has 3:1 contrast
  - Focus indicator visible with 3:1 contrast
  - Tabs usable at 200% zoom
  - Active state not indicated by color alone

### 4. Notification Centre Accessibility

**Seed:** `seed.spec.ts`

#### 4.1. TC_A11Y_013: Verify bell icon button accessibility

**File:** `tests/accessibility/scrum18-notifications.spec.ts`

**Steps:**
  1. Navigate to bell icon button
  2. Verify button is keyboard accessible
  3. Press Enter/Space to activate
  4. Verify unread count badge is accessible
  5. Check focus indicator visibility

**Expected Results:**
  - Bell icon has role='button'
  - Accessible name: 'Notifications' or 'View notifications'
  - Unread count announced: '5 unread notifications'
  - Button activates with Enter/Space
  - Focus indicator visible with 3:1 contrast
  - Badge has aria-label with count

#### 4.2. TC_A11Y_014: Verify notification popup modal accessibility

**File:** `tests/accessibility/scrum18-notifications.spec.ts`

**Steps:**
  1. Open notification popup
  2. Verify focus moves to modal
  3. Test keyboard navigation within modal
  4. Press Escape to close modal
  5. Verify focus returns to bell icon

**Expected Results:**
  - Modal has role='dialog' or 'alertdialog'
  - Modal has aria-modal='true'
  - Focus trapped within modal
  - Escape key closes modal
  - Focus returns to trigger button
  - Modal has accessible name (aria-label)

#### 4.3. TC_A11Y_015: Verify notification list accessibility

**File:** `tests/accessibility/scrum18-notifications.spec.ts`

**Steps:**
  1. Open notification popup
  2. Navigate through notification list
  3. Verify each notification is keyboard accessible
  4. Test 'Mark as read' button on each notification
  5. Test 'Mark all as read' button

**Expected Results:**
  - Notification list has role='list'
  - Each notification has role='listitem'
  - Notification content is accessible
  - Action buttons are keyboard accessible
  - Timestamp is announced by screen reader
  - Read/unread state is announced

#### 4.4. TC_A11Y_016: Verify notification popup screen reader announcements

**File:** `tests/accessibility/scrum18-notifications.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Open notification popup
  3. Verify modal opening is announced
  4. Navigate through notifications
  5. Verify notification content is announced
  6. Test 'View All Notifications' link

**Expected Results:**
  - Modal opening announced: 'Notifications dialog'
  - Notification count announced
  - Each notification content read clearly
  - Timestamps announced in accessible format
  - Action buttons have clear labels
  - 'View All Notifications' link is accessible

#### 4.5. TC_A11Y_017: Verify detailed notification centre page accessibility

**File:** `tests/accessibility/scrum18-notifications.spec.ts`

**Steps:**
  1. Navigate to detailed notification centre
  2. Verify page heading and structure
  3. Test keyboard navigation through filter tabs
  4. Verify widget counters are accessible
  5. Test back button functionality

**Expected Results:**
  - Page has descriptive heading (h1)
  - Filter tabs follow tab pattern (role='tablist')
  - Widget counters are announced
  - Back button is keyboard accessible
  - Back button returns to dashboard
  - Page structure is logical for screen readers

#### 4.6. TC_A11Y_018: Verify notification centre filter tabs accessibility

**File:** `tests/accessibility/scrum18-notifications.spec.ts`

**Steps:**
  1. Navigate to notification centre
  2. Test keyboard navigation through filter tabs (All, Unread, Interest, Updates, Reviews, Admin)
  3. Verify unread count badges on tabs
  4. Test arrow key navigation
  5. Verify selected tab state

**Expected Results:**
  - Filter tabs have role='tablist'
  - Each filter has role='tab'
  - Arrow keys navigate between filters
  - Unread counts announced with tabs
  - Selected tab has aria-selected='true'
  - Tab count badges are accessible

#### 4.7. TC_A11Y_019: Verify notification actions accessibility

**File:** `tests/accessibility/scrum18-notifications.spec.ts`

**Steps:**
  1. Navigate to notification in list
  2. Test 'Mark as read' button
  3. Test 'Dismiss' button
  4. Verify action confirmation is announced
  5. Test undo functionality if available

**Expected Results:**
  - Action buttons are keyboard accessible
  - Button labels are clear and descriptive
  - Action result announced to screen reader
  - Visual feedback provided for actions
  - Confirmation uses aria-live region
  - Focus management after action is logical

#### 4.8. TC_A11Y_020: Verify notification visual accessibility

**File:** `tests/accessibility/scrum18-notifications.spec.ts`

**Steps:**
  1. Inspect notification text contrast
  2. Verify unread indicator contrast
  3. Test notifications at 200% zoom
  4. Verify timestamps are readable
  5. Check notification categories use more than color

**Expected Results:**
  - Notification text has 4.5:1 contrast
  - Unread indicator has 3:1 contrast
  - Notifications readable at 200% zoom
  - Timestamps have sufficient contrast
  - Categories not indicated by color alone
  - Icons have text alternatives

### 5. Responsive and Mobile Accessibility

**Seed:** `seed.spec.ts`

#### 5.1. TC_A11Y_021: Verify mobile viewport accessibility

**File:** `tests/accessibility/scrum18-responsive.spec.ts`

**Steps:**
  1. Resize browser to mobile viewport (375px)
  2. Verify all content is accessible
  3. Test touch target sizes (minimum 44x44px)
  4. Verify no horizontal scrolling required
  5. Test zoom to 200%

**Expected Results:**
  - All content accessible on mobile
  - Touch targets meet 44x44px minimum (WCAG 2.5.5)
  - No horizontal scrolling at standard zoom
  - Content reflows at 200% zoom (WCAG 1.4.10)
  - Navigation remains accessible

#### 5.2. TC_A11Y_022: Verify tablet viewport accessibility

**File:** `tests/accessibility/scrum18-responsive.spec.ts`

**Steps:**
  1. Resize browser to tablet viewport (768px)
  2. Verify layout adapts appropriately
  3. Test keyboard navigation
  4. Verify widgets remain accessible
  5. Test tab navigation

**Expected Results:**
  - Layout adapts without loss of functionality
  - All interactive elements remain accessible
  - Keyboard navigation works correctly
  - Content readable without horizontal scroll
  - Focus indicators remain visible

#### 5.3. TC_A11Y_023: Verify orientation accessibility

**File:** `tests/accessibility/scrum18-responsive.spec.ts`

**Steps:**
  1. Test dashboard in portrait orientation
  2. Test dashboard in landscape orientation
  3. Verify content accessible in both orientations
  4. Check for orientation-locked content
  5. Verify no loss of functionality

**Expected Results:**
  - Dashboard works in both orientations (WCAG 1.3.4)
  - No content locked to specific orientation
  - All functionality available in both orientations
  - Layout adapts appropriately
  - No information loss when rotating

### 6. Error States and Messages

**Seed:** `seed.spec.ts`

#### 6.1. TC_A11Y_024: Verify 'under review' message accessibility

**File:** `tests/accessibility/scrum18-error-states.spec.ts`

**Steps:**
  1. Login as unapproved AP
  2. Verify 'under review' message is displayed
  3. Test screen reader announcement
  4. Verify message has appropriate role
  5. Check visual contrast

**Expected Results:**
  - Message has role='alert' or role='status'
  - Screen reader announces message automatically
  - Message text has 4.5:1 contrast ratio
  - Message is keyboard accessible if interactive
  - Clear instructions provided to user

#### 6.2. TC_A11Y_025: Verify error message accessibility

**File:** `tests/accessibility/scrum18-error-states.spec.ts`

**Steps:**
  1. Trigger error condition (e.g., network failure)
  2. Verify error message is displayed
  3. Test screen reader announcement
  4. Verify error icon has text alternative
  5. Check error message contrast

**Expected Results:**
  - Error has role='alert' for immediate announcement
  - Error message announced by screen reader
  - Error icon has alt text or aria-label
  - Error text has 4.5:1 contrast
  - Error provides clear recovery instructions

#### 6.3. TC_A11Y_026: Verify loading states accessibility

**File:** `tests/accessibility/scrum18-error-states.spec.ts`

**Steps:**
  1. Trigger dashboard data loading
  2. Verify loading indicator is accessible
  3. Test screen reader announcement
  4. Verify loading doesn't trap keyboard focus
  5. Check loading indicator contrast

**Expected Results:**
  - Loading indicator has aria-live='polite'
  - Screen reader announces loading state
  - Loading message: 'Loading dashboard data'
  - Keyboard focus not trapped during loading
  - Loading indicator has sufficient contrast
  - Loading completion announced

### 7. Session and Timeout Accessibility

**Seed:** `seed.spec.ts`

#### 7.1. TC_A11Y_027: Verify session timeout warning accessibility

**File:** `tests/accessibility/scrum18-session.spec.ts`

**Steps:**
  1. Wait for session timeout warning (before 30 min)
  2. Verify warning modal appears
  3. Test keyboard accessibility of warning
  4. Verify screen reader announcement
  5. Test 'Extend session' button

**Expected Results:**
  - Timeout warning has role='alertdialog'
  - Warning announced immediately (aria-live='assertive')
  - Modal is keyboard accessible
  - Focus moves to modal
  - 'Extend session' button is accessible
  - Countdown timer is announced periodically

#### 7.2. TC_A11Y_028: Verify logout accessibility

**File:** `tests/accessibility/scrum18-session.spec.ts`

**Steps:**
  1. Navigate to Logout button
  2. Activate logout with keyboard
  3. Verify logout confirmation if present
  4. Verify redirect to login page
  5. Test screen reader announcements

**Expected Results:**
  - Logout button is keyboard accessible
  - Confirmation modal (if any) is accessible
  - Logout action announced to screen reader
  - Redirect to login page is smooth
  - Login page is keyboard accessible

### 8. Color and Contrast Compliance

**Seed:** `seed.spec.ts`

#### 8.1. TC_A11Y_029: Verify text color contrast ratios

**File:** `tests/accessibility/scrum18-contrast.spec.ts`

**Steps:**
  1. Inspect all text elements on dashboard
  2. Measure contrast ratios using color contrast analyzer
  3. Verify normal text has 4.5:1 ratio
  4. Verify large text has 3:1 ratio
  5. Check link text contrast

**Expected Results:**
  - Normal text (< 18pt) has 4.5:1 contrast (WCAG 1.4.3)
  - Large text (≥ 18pt) has 3:1 contrast
  - Link text has 4.5:1 contrast
  - Placeholder text has 4.5:1 contrast
  - Disabled text has 3:1 contrast (if visible)

#### 8.2. TC_A11Y_030: Verify non-text contrast ratios

**File:** `tests/accessibility/scrum18-contrast.spec.ts`

**Steps:**
  1. Inspect UI component boundaries
  2. Measure button border contrast
  3. Check widget separator contrast
  4. Verify focus indicator contrast
  5. Check icon contrast

**Expected Results:**
  - UI component boundaries have 3:1 contrast (WCAG 1.4.11)
  - Button borders have 3:1 contrast
  - Focus indicators have 3:1 contrast
  - Icons have 3:1 contrast against background
  - Active/inactive states distinguishable

#### 8.3. TC_A11Y_031: Verify information not conveyed by color alone

**File:** `tests/accessibility/scrum18-contrast.spec.ts`

**Steps:**
  1. Review all color-coded information
  2. Verify additional indicators exist (icons, text, patterns)
  3. Test with grayscale/color blindness simulation
  4. Check notification categories
  5. Verify status indicators

**Expected Results:**
  - Color not sole means of conveying information (WCAG 1.4.1)
  - Icons or text accompany color coding
  - Information distinguishable in grayscale
  - Notification types have icons + text
  - Status uses text labels, not just color

### 9. Focus Management and Navigation

**Seed:** `seed.spec.ts`

#### 9.1. TC_A11Y_032: Verify focus order is logical

**File:** `tests/accessibility/scrum18-focus.spec.ts`

**Steps:**
  1. Start at top of dashboard
  2. Press Tab repeatedly through entire page
  3. Document focus order
  4. Verify order matches visual layout
  5. Check for focus order issues

**Expected Results:**
  - Focus order follows reading order (WCAG 2.4.3)
  - Tab order: header → nav → widgets → tabs → notifications
  - No unexpected focus jumps
  - Focus order matches visual layout
  - All interactive elements in tab order

#### 9.2. TC_A11Y_033: Verify focus is visible at all times

**File:** `tests/accessibility/scrum18-focus.spec.ts`

**Steps:**
  1. Tab through all interactive elements
  2. Verify focus indicator on each element
  3. Measure focus indicator contrast
  4. Check focus indicator size/thickness
  5. Verify focus not hidden by other elements

**Expected Results:**
  - Focus indicator visible on all elements (WCAG 2.4.7)
  - Focus indicator has 3:1 contrast ratio
  - Focus indicator at least 2px thick
  - Focus not obscured by overlays
  - Custom focus styles meet requirements

#### 9.3. TC_A11Y_034: Verify no keyboard traps exist

**File:** `tests/accessibility/scrum18-focus.spec.ts`

**Steps:**
  1. Navigate through entire dashboard with keyboard
  2. Test all modals and popups
  3. Verify ability to exit all components
  4. Test Escape key functionality
  5. Check for infinite loops

**Expected Results:**
  - No keyboard traps exist (WCAG 2.1.2)
  - User can exit all components with keyboard
  - Escape key closes modals/popups
  - Tab/Shift+Tab work throughout
  - Focus can reach all interactive elements

### 10. Screen Reader Compatibility

**Seed:** `seed.spec.ts`

#### 10.1. TC_A11Y_035: Verify NVDA screen reader compatibility

**File:** `tests/accessibility/scrum18-screen-reader.spec.ts`

**Steps:**
  1. Enable NVDA screen reader
  2. Navigate through entire dashboard
  3. Verify all content is announced
  4. Test interactive elements
  5. Check for NVDA-specific issues

**Expected Results:**
  - All content accessible with NVDA
  - Headings announced correctly
  - Buttons and links announced with role
  - Form elements have labels
  - Dynamic content updates announced
  - No NVDA-specific errors

#### 10.2. TC_A11Y_036: Verify JAWS screen reader compatibility

**File:** `tests/accessibility/scrum18-screen-reader.spec.ts`

**Steps:**
  1. Enable JAWS screen reader
  2. Navigate through entire dashboard
  3. Test all interactive elements
  4. Verify ARIA attributes work correctly
  5. Check for JAWS-specific issues

**Expected Results:**
  - All content accessible with JAWS
  - ARIA roles announced correctly
  - Live regions work properly
  - Tables (if any) have proper structure
  - No JAWS-specific errors
