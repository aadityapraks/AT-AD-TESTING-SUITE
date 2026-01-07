# SCRUM-79 Test Plan

## Application Overview

Test plan for SCRUM-79: PwD - View Product Overview Section (Header and Gallery). This covers product header information, image gallery with thumbnails and carousel, CTAs (Contact Vendor, Save, Share), and full accessibility compliance.

## Test Scenarios

### 1. Product Header Section

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify product header elements

**File:** `tests/functional/scrum79-header-elements.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Verify all header elements are present

**Expected Results:**
  - Product name is displayed
  - Product tags are shown (e.g., 'Mobility', 'Physical')
  - Average rating with stars and review count is visible
  - Price is displayed (if available)
  - Stock status is shown (e.g., 'In Stock', 'Out of Stock')
  - Available geographies: 3 shown upfront, rest as number with hyperlink
  - Description is displayed
  - CTAs are visible: Contact Vendor, Save, Share

### 2. Available Geographies

**Seed:** `tests/seed.spec.ts`

#### 2.1. Verify available geographies display and popup

**File:** `tests/functional/scrum79-geographies-display.spec.ts`

**Steps:**
  1. Navigate to Product Details Page with multiple geographies
  2. Verify 3 geographies shown
  3. Click on additional geographies link
  4. Verify popup opens with all geographies

**Expected Results:**
  - 3 geographies are shown upfront
  - Additional geographies shown as number with hyperlink
  - Clicking hyperlink opens popup with all geographies

### 3. Image Gallery

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify image gallery display

**File:** `tests/functional/scrum79-gallery-display.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Verify main image is displayed
  3. Verify thumbnails are present
  4. Verify carousel controls

**Expected Results:**
  - One main product image is displayed
  - Thumbnails are shown below or beside main image
  - Carousel controls are available

#### 3.2. Switch main image via thumbnail click

**File:** `tests/functional/scrum79-thumbnail-click.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click on a thumbnail
  3. Verify main image updates

**Expected Results:**
  - Clicking thumbnail replaces main image
  - Selected thumbnail is visually indicated

#### 3.3. Navigate images via carousel

**File:** `tests/functional/scrum79-carousel-navigation.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Use carousel controls to navigate
  3. Verify images change

**Expected Results:**
  - Carousel navigates through images
  - Images change smoothly

#### 3.4. Verify image load performance

**File:** `tests/functional/scrum79-image-load-performance.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Measure image load time
  3. Verify no noticeable delay

**Expected Results:**
  - Images load without noticeable delay

### 4. Stock Status

**Seed:** `tests/seed.spec.ts`

#### 4.1. Verify stock status updates

**File:** `tests/functional/scrum79-stock-status-update.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Verify stock status label
  3. Check status reflects actual availability

**Expected Results:**
  - Stock status updates automatically
  - Label shows 'In Stock' or 'Out of Stock' based on availability

### 5. Save Functionality

**Seed:** `tests/seed.spec.ts`

#### 5.1. Save product when logged in

**File:** `tests/functional/scrum79-save-product.spec.ts`

**Steps:**
  1. Log in as user
  2. Navigate to Product Details Page
  3. Click Save button
  4. Verify product is bookmarked

**Expected Results:**
  - Clicking Save bookmarks the product
  - Product appears in user's saved items

### 6. Share Functionality

**Seed:** `tests/seed.spec.ts`

#### 6.1. Share product on mobile

**File:** `tests/functional/scrum79-share-mobile.spec.ts`

**Steps:**
  1. Set viewport to mobile
  2. Navigate to Product Details Page
  3. Click Share button
  4. Verify share modal or native options

**Expected Results:**
  - Share modal opens on mobile
  - Native share options available (email, social media)

#### 6.2. Share product on desktop

**File:** `tests/functional/scrum79-share-desktop.spec.ts`

**Steps:**
  1. Set viewport to desktop
  2. Navigate to Product Details Page
  3. Click Share/Copy button
  4. Verify link is copied

**Expected Results:**
  - Copy icon is present on desktop
  - Clicking copy icon copies product link

### 7. Header Accessibility

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify product tags accessibility

**File:** `tests/accessibility/scrum79-tags-aria.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Check product tags
  3. Verify aria-labels on tags

**Expected Results:**
  - Product tags use semantic badges
  - Tags have aria-labels (e.g., 'Category: Mobility')

#### 7.2. Verify stock badge accessibility

**File:** `tests/accessibility/scrum79-stock-badge-a11y.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Check stock badge contrast
  3. Verify screen reader announcement

**Expected Results:**
  - Stock badges meet 4.5:1 contrast ratio
  - Stock status is announced by screen readers

### 8. Gallery Accessibility

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify main image ALT text

**File:** `tests/accessibility/scrum79-image-alt-text.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Check main image ALT attribute
  3. Verify descriptive text

**Expected Results:**
  - Main image has descriptive ALT text

#### 8.2. Verify thumbnail keyboard support

**File:** `tests/accessibility/scrum79-thumbnail-keyboard.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Tab to thumbnails
  3. Use Enter/Space to activate
  4. Verify focus rings

**Expected Results:**
  - Thumbnails have focus rings
  - Thumbnails are keyboard activatable
  - Enter/Space activates thumbnail

#### 8.3. Verify selected thumbnail announcement

**File:** `tests/accessibility/scrum79-thumbnail-selected.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Select a thumbnail
  3. Verify aria-selected attribute
  4. Check screen reader announcement

**Expected Results:**
  - Selected thumbnail has aria-selected='true'
  - Screen readers announce selected state

#### 8.4. Verify image index announcement

**File:** `tests/accessibility/scrum79-image-index-announcement.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Navigate through images
  3. Verify screen reader announces index

**Expected Results:**
  - Screen readers announce image index (e.g., 'Image 1 of 3')

#### 8.5. Verify reduced-motion support

**File:** `tests/accessibility/scrum79-reduced-motion.spec.ts`

**Steps:**
  1. Enable prefers-reduced-motion
  2. Navigate to Product Details Page
  3. Use carousel
  4. Verify no motion transitions

**Expected Results:**
  - Gallery transitions respect prefers-reduced-motion
  - No motion when reduced-motion is enabled

### 9. CTA Accessibility

**Seed:** `tests/seed.spec.ts`

#### 9.1. Verify CTA keyboard support and focus

**File:** `tests/accessibility/scrum79-cta-keyboard.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Tab to CTAs
  3. Verify keyboard operability
  4. Check focus states and aria-pressed

**Expected Results:**
  - All CTAs are keyboard-operable
  - CTAs have visible focus states
  - Toggleable buttons expose aria-pressed

### 10. Visual Accessibility

**Seed:** `tests/seed.spec.ts`

#### 10.1. Verify image scaling with text resize

**File:** `tests/accessibility/scrum79-image-zoom.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Increase text size to 200%
  3. Verify images scale correctly
  4. Check for layout shifts

**Expected Results:**
  - Images scale correctly at 200% text resize
  - No layout shift occurs
