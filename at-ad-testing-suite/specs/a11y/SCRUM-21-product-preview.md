# SCRUM-21 Accessibility Test Plan

## Application Overview

Comprehensive accessibility test plan for AP Product Preview feature (SCRUM-21) covering WCAG 2.1 AA compliance for preview mode, catalog card display, full product details page, media verification, specifications, accessibility compliance indicators, and edit options.

## Test Scenarios

### 1. Preview Mode Access

**Seed:** `seed.spec.ts`

#### 1.1. TC_A11Y_001: Verify View Product button keyboard accessibility

**File:** `tests/accessibility/scrum21-preview-access.spec.ts`

**Steps:**
  1. Navigate to Product Management page
  2. Tab to View Product button in actions column
  3. Verify focus indicator visible with 3:1 contrast
  4. Press Enter/Space to activate button
  5. Verify preview mode opens

**Expected Results:**
  - View Product button has role='button'
  - Accessible name is 'View Product' or similar
  - Focus indicator visible (WCAG 2.4.7)
  - Button activates with Enter and Space keys
  - Preview opens in same or new window/modal

#### 1.2. TC_A11Y_002: Verify screen reader announces View Product button

**File:** `tests/accessibility/scrum21-preview-access.spec.ts`

**Steps:**
  1. Enable screen reader (NVDA/JAWS)
  2. Navigate to Product Management page
  3. Tab to View Product button
  4. Verify button name and role announced
  5. Verify button state announced

**Expected Results:**
  - Button role announced
  - Accessible name 'View Product' announced
  - Button state (enabled/disabled) announced
  - No empty or generic labels
  - Context provided (e.g., 'View Product for [Product Name]')

#### 1.3. TC_A11Y_003: Verify preview mode page title and landmarks

**File:** `tests/accessibility/scrum21-preview-access.spec.ts`

**Steps:**
  1. Open preview mode
  2. Verify page title is descriptive
  3. Use screen reader to navigate by landmarks
  4. Verify main, navigation landmarks exist
  5. Check for skip links

**Expected Results:**
  - Page title includes 'Preview' and product name
  - Main content has role='main' or <main>
  - Navigation has role='navigation' or <nav>
  - Skip to main content link present
  - All landmarks have accessible names

### 2. Catalog Card Display

**Seed:** `seed.spec.ts`

#### 2.1. TC_A11Y_004: Verify catalog card keyboard navigation

**File:** `tests/accessibility/scrum21-catalog-card.spec.ts`

**Steps:**
  1. Open preview mode showing catalog card
  2. Tab through card elements
  3. Verify product name is focusable if interactive
  4. Verify image is accessible
  5. Test keyboard activation

**Expected Results:**
  - All interactive elements keyboard accessible
  - Tab order follows visual layout
  - Focus indicator visible with 3:1 contrast
  - Non-interactive elements not in tab order
  - Card has semantic structure (article/section)

#### 2.2. TC_A11Y_005: Verify catalog card screen reader accessibility

**File:** `tests/accessibility/scrum21-catalog-card.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to catalog card
  3. Verify product name announced
  4. Verify short description announced
  5. Verify image alt text announced

**Expected Results:**
  - Product name has proper heading level (h2/h3)
  - Short description announced clearly
  - Primary image has meaningful alt text
  - Card has aria-label or aria-labelledby
  - All content programmatically accessible

#### 2.3. TC_A11Y_006: Verify catalog card visual accessibility

**File:** `tests/accessibility/scrum21-catalog-card.spec.ts`

**Steps:**
  1. Inspect text color contrast
  2. Verify product name has 4.5:1 contrast
  3. Verify description text has 4.5:1 contrast
  4. Test zoom to 200%
  5. Verify no color-only information

**Expected Results:**
  - Product name meets 4.5:1 contrast (WCAG 1.4.3)
  - Description text meets 4.5:1 contrast
  - Card readable at 200% zoom (WCAG 1.4.4)
  - Information not conveyed by color alone (WCAG 1.4.1)
  - Image borders/separators have 3:1 contrast

#### 2.4. TC_A11Y_007: Verify primary image accessibility

**File:** `tests/accessibility/scrum21-catalog-card.spec.ts`

**Steps:**
  1. Inspect primary image element
  2. Verify alt attribute exists
  3. Verify alt text is meaningful
  4. Check image loading states
  5. Test with images disabled

**Expected Results:**
  - Image has alt attribute
  - Alt text describes product meaningfully
  - Alt text not generic (e.g., 'image', 'photo')
  - Loading state announced to screen readers
  - Fallback text available if image fails

### 3. Full Product Details Page

**Seed:** `seed.spec.ts`

#### 3.1. TC_A11Y_008: Verify product details page structure

**File:** `tests/accessibility/scrum21-details-page.spec.ts`

**Steps:**
  1. Switch to product details page view
  2. Use screen reader to navigate headings
  3. Verify heading hierarchy is logical
  4. Check landmark regions
  5. Verify page structure

**Expected Results:**
  - Heading hierarchy follows logical order (h1, h2, h3)
  - Product name is h1
  - Section headings are h2 (Description, Specifications, etc.)
  - No heading levels skipped
  - Landmarks properly structured

#### 3.2. TC_A11Y_009: Verify product name and category accessibility

**File:** `tests/accessibility/scrum21-details-page.spec.ts`

**Steps:**
  1. Navigate to product details page
  2. Verify product name is h1
  3. Verify category is announced
  4. Check text contrast
  5. Test with screen reader

**Expected Results:**
  - Product name is h1 with 4.5:1 contrast
  - Category has semantic markup
  - Category announced by screen reader
  - Text readable at 200% zoom
  - No color-only information

#### 3.3. TC_A11Y_010: Verify descriptions accessibility

**File:** `tests/accessibility/scrum21-details-page.spec.ts`

**Steps:**
  1. Navigate to short description
  2. Navigate to detailed description
  3. Verify both have proper headings
  4. Check text contrast
  5. Test readability at 200% zoom

**Expected Results:**
  - Short description has h2 heading
  - Detailed description has h2 heading
  - Text has 4.5:1 contrast ratio
  - Content readable at 200% zoom
  - Paragraphs properly structured

#### 3.4. TC_A11Y_011: Verify keyboard navigation through details page

**File:** `tests/accessibility/scrum21-details-page.spec.ts`

**Steps:**
  1. Tab through all interactive elements
  2. Verify tab order is logical
  3. Test focus indicators
  4. Verify no keyboard traps
  5. Test all interactive elements

**Expected Results:**
  - Tab order follows visual layout
  - Focus indicator visible on all elements
  - No keyboard traps exist
  - All interactive elements keyboard accessible
  - Focus management is logical

### 4. Image Gallery and Carousel

**Seed:** `seed.spec.ts`

#### 4.1. TC_A11Y_012: Verify main image accessibility

**File:** `tests/accessibility/scrum21-media.spec.ts`

**Steps:**
  1. Navigate to main image
  2. Verify alt text exists and is meaningful
  3. Check image contrast with background
  4. Test image zoom/enlarge functionality
  5. Verify keyboard accessibility

**Expected Results:**
  - Main image has meaningful alt text
  - Alt text describes product accurately
  - Image has 3:1 contrast with background
  - Zoom/enlarge is keyboard accessible
  - Focus indicator visible on interactive image

#### 4.2. TC_A11Y_013: Verify image gallery/carousel keyboard navigation

**File:** `tests/accessibility/scrum21-media.spec.ts`

**Steps:**
  1. Navigate to image gallery/carousel
  2. Use Tab to focus on carousel
  3. Use Arrow keys to navigate images
  4. Test Home/End keys
  5. Verify keyboard activation

**Expected Results:**
  - Carousel has role='region' with aria-label
  - Arrow keys navigate between images
  - Home/End keys jump to first/last image
  - Current image indicated (aria-current)
  - Image count announced (e.g., '2 of 5')

#### 4.3. TC_A11Y_014: Verify carousel screen reader accessibility

**File:** `tests/accessibility/scrum21-media.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to carousel
  3. Move through images
  4. Verify alt text announced
  5. Verify position announced

**Expected Results:**
  - Carousel role and label announced
  - Each image alt text announced
  - Image position announced (e.g., 'Image 2 of 5')
  - Navigation controls have accessible names
  - Previous/Next buttons clearly labeled

#### 4.4. TC_A11Y_015: Verify carousel controls accessibility

**File:** `tests/accessibility/scrum21-media.spec.ts`

**Steps:**
  1. Navigate to carousel controls
  2. Verify Previous/Next buttons keyboard accessible
  3. Check button labels
  4. Test disabled states
  5. Verify focus indicators

**Expected Results:**
  - Previous/Next buttons have role='button'
  - Buttons have clear accessible names
  - Disabled state announced (aria-disabled)
  - Focus indicator visible with 3:1 contrast
  - Buttons activate with Enter/Space

#### 4.5. TC_A11Y_016: Verify alt text display in accessibility tools

**File:** `tests/accessibility/scrum21-media.spec.ts`

**Steps:**
  1. Open browser accessibility inspector
  2. Inspect each image
  3. Verify alt text is present
  4. Verify alt text matches uploaded content
  5. Test with images disabled

**Expected Results:**
  - All images have alt attributes
  - Alt text matches what AP entered during upload
  - Alt text is meaningful and descriptive
  - No empty alt attributes on meaningful images
  - Decorative images have alt=''

### 5. Demo Video Accessibility

**Seed:** `seed.spec.ts`

#### 5.1. TC_A11Y_017: Verify video player keyboard accessibility

**File:** `tests/accessibility/scrum21-video.spec.ts`

**Steps:**
  1. Navigate to demo video
  2. Tab to video player controls
  3. Test Play/Pause with keyboard
  4. Test volume controls with keyboard
  5. Test fullscreen with keyboard

**Expected Results:**
  - Video player is keyboard accessible
  - Play/Pause button has clear label
  - Volume controls keyboard accessible
  - Fullscreen toggle keyboard accessible
  - All controls have focus indicators

#### 5.2. TC_A11Y_018: Verify video captions and transcripts

**File:** `tests/accessibility/scrum21-video.spec.ts`

**Steps:**
  1. Play demo video
  2. Check for captions/subtitles option
  3. Enable captions if available
  4. Check for transcript link
  5. Verify caption quality

**Expected Results:**
  - Captions available if audio present (WCAG 1.2.2)
  - Caption toggle is keyboard accessible
  - Captions synchronized with audio
  - Transcript provided or linked
  - Caption text has sufficient contrast

#### 5.3. TC_A11Y_019: Verify video player screen reader accessibility

**File:** `tests/accessibility/scrum21-video.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to video player
  3. Verify player controls announced
  4. Verify video state announced
  5. Test control activation

**Expected Results:**
  - Video player has accessible name
  - Play/Pause state announced
  - Volume level announced
  - Time elapsed/remaining announced
  - All controls have clear labels

#### 5.4. TC_A11Y_020: Verify video loading and error states

**File:** `tests/accessibility/scrum21-video.spec.ts`

**Steps:**
  1. Observe video loading state
  2. Verify loading announced to screen readers
  3. Test video error scenario
  4. Verify error message accessibility
  5. Check error message contrast

**Expected Results:**
  - Loading state has aria-live announcement
  - Loading indicator visible and accessible
  - Error messages have 4.5:1 contrast
  - Error announced to screen readers
  - Error provides clear guidance

### 6. Specifications Display

**Seed:** `seed.spec.ts`

#### 6.1. TC_A11Y_021: Verify specifications structure accessibility

**File:** `tests/accessibility/scrum21-specifications.spec.ts`

**Steps:**
  1. Navigate to specifications section
  2. Verify section has proper heading
  3. Check if displayed as table or list
  4. Verify semantic markup
  5. Test with screen reader

**Expected Results:**
  - Specifications section has h2 heading
  - If table: has <table> with <th> headers
  - If list: uses <dl>, <dt>, <dd> elements
  - Key-value pairs clearly associated
  - Screen reader announces structure correctly

#### 6.2. TC_A11Y_022: Verify specifications table accessibility

**File:** `tests/accessibility/scrum21-specifications.spec.ts`

**Steps:**
  1. If specifications use table format
  2. Verify table has caption or aria-label
  3. Check header cells have scope attribute
  4. Test keyboard navigation through table
  5. Verify screen reader announces headers

**Expected Results:**
  - Table has <caption> or aria-label
  - Header cells use <th> with scope='row' or 'col'
  - Table structure announced by screen reader
  - Data cells associated with headers
  - Table readable at 200% zoom

#### 6.3. TC_A11Y_023: Verify specifications visual accessibility

**File:** `tests/accessibility/scrum21-specifications.spec.ts`

**Steps:**
  1. Inspect specification text contrast
  2. Verify labels have 4.5:1 contrast
  3. Verify values have 4.5:1 contrast
  4. Test zoom to 200%
  5. Check for color-only information

**Expected Results:**
  - All text meets 4.5:1 contrast ratio
  - Specifications readable at 200% zoom
  - No information conveyed by color alone
  - Borders/separators have 3:1 contrast
  - Layout remains usable when zoomed

### 7. Availability Information

**Seed:** `seed.spec.ts`

#### 7.1. TC_A11Y_024: Verify geographical availability accessibility

**File:** `tests/accessibility/scrum21-availability.spec.ts`

**Steps:**
  1. Navigate to availability section
  2. Verify section heading exists
  3. Check 'All Areas' or region display
  4. Verify text contrast
  5. Test with screen reader

**Expected Results:**
  - Availability section has h2 heading
  - Geographic info clearly labeled
  - Text has 4.5:1 contrast ratio
  - Screen reader announces availability
  - Information readable at 200% zoom

#### 7.2. TC_A11Y_025: Verify product quantity accessibility

**File:** `tests/accessibility/scrum21-availability.spec.ts`

**Steps:**
  1. Navigate to quantity information
  2. Verify quantity or 'Made to Order' label
  3. Check label association
  4. Verify text contrast
  5. Test screen reader announcement

**Expected Results:**
  - Quantity has clear label
  - 'Made to Order' badge is accessible
  - Text has 4.5:1 contrast
  - Screen reader announces quantity/status
  - Information not color-dependent

### 8. Accessibility Compliance Indicators

**Seed:** `seed.spec.ts`

#### 8.1. TC_A11Y_026: Verify compliance badge keyboard accessibility

**File:** `tests/accessibility/scrum21-compliance.spec.ts`

**Steps:**
  1. Navigate to accessibility compliance indicator
  2. Tab to compliance badge/status
  3. Verify focus indicator if interactive
  4. Test keyboard activation if clickable
  5. Check tooltip accessibility

**Expected Results:**
  - Compliance indicator keyboard accessible
  - Badge has accessible name
  - Tooltip triggered by focus and hover
  - Tooltip dismissible with Escape key
  - Focus indicator visible if interactive

#### 8.2. TC_A11Y_027: Verify compliance badge screen reader accessibility

**File:** `tests/accessibility/scrum21-compliance.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to compliance indicator
  3. Verify status announced
  4. Check for additional information
  5. Test tooltip announcement

**Expected Results:**
  - Compliance status announced clearly
  - Status values: 'Compliant', 'Minor Adjustments Suggested'
  - Additional info available via aria-describedby
  - Tooltip content announced
  - No visual-only information

#### 8.3. TC_A11Y_028: Verify compliance indicator visual accessibility

**File:** `tests/accessibility/scrum21-compliance.spec.ts`

**Steps:**
  1. Inspect compliance badge colors
  2. Verify text has 4.5:1 contrast
  3. Verify icon/badge has 3:1 contrast
  4. Check for color-only status
  5. Test at 200% zoom

**Expected Results:**
  - Badge text has 4.5:1 contrast
  - Badge icon/background has 3:1 contrast
  - Status not indicated by color alone (WCAG 1.4.1)
  - Text or icon accompanies color
  - Badge readable at 200% zoom

#### 8.4. TC_A11Y_029: Verify accessibility feature highlights

**File:** `tests/accessibility/scrum21-compliance.spec.ts`

**Steps:**
  1. Navigate to accessibility features list
  2. Verify screen-reader friendly structure noted
  3. Verify alt text availability noted
  4. Verify heading hierarchy noted
  5. Verify contrast compliance noted

**Expected Results:**
  - Features list has proper heading
  - Each feature clearly labeled
  - List uses semantic markup (<ul>, <li>)
  - All features announced by screen reader
  - Text has 4.5:1 contrast

### 9. Edit and Update Options

**Seed:** `seed.spec.ts`

#### 9.1. TC_A11Y_030: Verify Edit button keyboard accessibility

**File:** `tests/accessibility/scrum21-edit-options.spec.ts`

**Steps:**
  1. Navigate to Edit button in preview
  2. Tab to Edit button
  3. Verify focus indicator visible
  4. Press Enter/Space to activate
  5. Verify edit mode opens

**Expected Results:**
  - Edit button keyboard accessible
  - Button has role='button'
  - Accessible name is 'Edit' or 'Edit Product'
  - Focus indicator visible with 3:1 contrast
  - Button activates with Enter/Space

#### 9.2. TC_A11Y_031: Verify Edit button screen reader accessibility

**File:** `tests/accessibility/scrum21-edit-options.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to Edit button
  3. Verify button name announced
  4. Verify button role announced
  5. Test button activation

**Expected Results:**
  - Button role announced
  - Accessible name 'Edit Product' announced
  - Context provided (e.g., 'Edit [Product Name]')
  - Button state announced
  - No empty or generic labels

#### 9.3. TC_A11Y_032: Verify draft auto-save notification accessibility

**File:** `tests/accessibility/scrum21-edit-options.spec.ts`

**Steps:**
  1. Make edit in preview mode
  2. Observe auto-save notification
  3. Verify notification announced to screen reader
  4. Check notification contrast
  5. Verify notification dismissal

**Expected Results:**
  - Auto-save notification has aria-live='polite'
  - Notification announced by screen reader
  - Notification text has 4.5:1 contrast
  - Notification dismissible with keyboard
  - Notification doesn't trap focus

### 10. Live Product View

**Seed:** `seed.spec.ts`

#### 10.1. TC_A11Y_033: Verify View Live Product link accessibility

**File:** `tests/accessibility/scrum21-live-view.spec.ts`

**Steps:**
  1. Navigate to vendor dashboard
  2. Find View Live Product link
  3. Tab to link
  4. Verify focus indicator
  5. Activate with Enter

**Expected Results:**
  - Link has role='link'
  - Accessible name is 'View Live Product'
  - Focus indicator visible with 3:1 contrast
  - Link activates with Enter key
  - Link opens live product page

#### 10.2. TC_A11Y_034: Verify View Live Product screen reader accessibility

**File:** `tests/accessibility/scrum21-live-view.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to View Live Product link
  3. Verify link name announced
  4. Verify link destination announced
  5. Test link activation

**Expected Results:**
  - Link role announced
  - Link text 'View Live Product' announced
  - Context provided (e.g., 'for [Product Name]')
  - Opens in new window announced if applicable
  - No generic link text like 'click here'

### 11. Error Messages and System Feedback

**Seed:** `seed.spec.ts`

#### 11.1. TC_A11Y_035: Verify error message accessibility

**File:** `tests/accessibility/scrum21-errors.spec.ts`

**Steps:**
  1. Trigger error (e.g., image too large)
  2. Verify error message appears
  3. Check error announced to screen reader
  4. Verify error message contrast
  5. Test error dismissal

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Error announced immediately by screen reader
  - Error text has 4.5:1 contrast
  - Error icon has 3:1 contrast
  - Error not indicated by color alone

#### 11.2. TC_A11Y_036: Verify error message keyboard accessibility

**File:** `tests/accessibility/scrum21-errors.spec.ts`

**Steps:**
  1. Trigger error message
  2. Verify focus moves to error or stays in place
  3. Tab to error dismiss button if present
  4. Test Escape key to dismiss
  5. Verify focus management

**Expected Results:**
  - Error doesn't trap keyboard focus
  - Dismiss button keyboard accessible
  - Escape key dismisses error
  - Focus returns to trigger element
  - Error doesn't block keyboard navigation

#### 11.3. TC_A11Y_037: Verify error message provides clear guidance

**File:** `tests/accessibility/scrum21-errors.spec.ts`

**Steps:**
  1. Trigger various errors
  2. Verify each error message is specific
  3. Check for actionable guidance
  4. Verify error examples provided
  5. Test error recovery

**Expected Results:**
  - Error messages are specific and clear
  - Guidance provided (e.g., 'Max size: 5MB')
  - Error explains what went wrong
  - Error suggests how to fix
  - Re-upload option keyboard accessible

### 12. Preview Mode Interface Accessibility

**Seed:** `seed.spec.ts`

#### 12.1. TC_A11Y_038: Verify preview mode keyboard navigation

**File:** `tests/accessibility/scrum21-preview-interface.spec.ts`

**Steps:**
  1. Open preview mode
  2. Tab through all interface elements
  3. Verify tab order is logical
  4. Test all interactive elements
  5. Verify no keyboard traps

**Expected Results:**
  - All elements keyboard accessible
  - Tab order follows visual layout
  - Focus indicators visible on all elements
  - No keyboard traps exist
  - Escape closes preview if modal

#### 12.2. TC_A11Y_039: Verify preview mode screen reader accessibility

**File:** `tests/accessibility/scrum21-preview-interface.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Open preview mode
  3. Navigate through interface
  4. Verify all elements announced
  5. Test tooltips and hints

**Expected Results:**
  - Preview mode announced to screen reader
  - All controls have accessible names
  - Tooltips announced on focus
  - Hints like 'This is how your description appears' announced
  - Mode changes announced (card view vs details view)

#### 12.3. TC_A11Y_040: Verify preview mode tooltips accessibility

**File:** `tests/accessibility/scrum21-preview-interface.spec.ts`

**Steps:**
  1. Navigate to elements with tooltips
  2. Trigger tooltip with focus
  3. Trigger tooltip with hover
  4. Verify tooltip content announced
  5. Test tooltip dismissal

**Expected Results:**
  - Tooltips triggered by focus and hover
  - Tooltip content announced by screen reader
  - Tooltips have role='tooltip'
  - Tooltips dismissible with Escape
  - Tooltip text has 4.5:1 contrast

#### 12.4. TC_A11Y_041: Verify preview mode responsive design accessibility

**File:** `tests/accessibility/scrum21-preview-interface.spec.ts`

**Steps:**
  1. Test preview at various viewport sizes
  2. Verify content reflows at 200% zoom
  3. Test on mobile viewport
  4. Verify touch targets are 44x44px minimum
  5. Test orientation changes

**Expected Results:**
  - Content reflows without horizontal scroll (WCAG 1.4.10)
  - All content accessible at 200% zoom
  - Touch targets meet 44x44px minimum
  - No content loss at different viewports
  - Orientation changes don't break layout

#### 12.5. TC_A11Y_042: Verify preview mode color and contrast

**File:** `tests/accessibility/scrum21-preview-interface.spec.ts`

**Steps:**
  1. Inspect all text elements
  2. Verify text has 4.5:1 contrast
  3. Verify UI components have 3:1 contrast
  4. Check focus indicators
  5. Test with high contrast mode

**Expected Results:**
  - All text meets 4.5:1 contrast (WCAG 1.4.3)
  - Large text meets 3:1 contrast
  - UI components meet 3:1 contrast (WCAG 1.4.11)
  - Focus indicators meet 3:1 contrast
  - Interface usable in high contrast mode
