# SCRUM-82 Test Plan

## Application Overview

Test plan for SCRUM-82: PwD - Product Image Gallery Interaction. This covers main image display, thumbnail navigation, image gallery (up to 10 images), lightbox modal, demo video player, and full accessibility compliance.

## Test Scenarios

### 1. Gallery Display

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify gallery display structure

**File:** `tests/functional/scrum82-gallery-display.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Verify main image is displayed
  3. Verify thumbnails are present

**Expected Results:**
  - Main product image is displayed prominently
  - Thumbnail images are displayed below main image
  - Gallery supports up to 10 images

### 2. Thumbnail Interaction

**Seed:** `tests/seed.spec.ts`

#### 2.1. Update main image via thumbnail click

**File:** `tests/functional/scrum82-thumbnail-click.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click on a thumbnail
  3. Verify main image updates

**Expected Results:**
  - Clicking thumbnail updates main image
  - Main image changes to selected thumbnail

#### 2.2. Update main image via carousel

**File:** `tests/functional/scrum82-carousel-navigation.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Use carousel controls
  3. Verify main image updates

**Expected Results:**
  - Carousel navigation updates main image
  - Images cycle through gallery

### 3. Image Aspect Ratio

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify consistent aspect ratio

**File:** `tests/functional/scrum82-aspect-ratio.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. View all images in gallery
  3. Verify aspect ratio consistency

**Expected Results:**
  - All images maintain same aspect ratio
  - No distortion occurs

### 4. Lightbox Modal

**Seed:** `tests/seed.spec.ts`

#### 4.1. Open lightbox with high-resolution image

**File:** `tests/functional/scrum82-lightbox-open.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click on main image
  3. Verify lightbox opens

**Expected Results:**
  - Clicking main image opens lightbox
  - High-resolution image is displayed in lightbox

#### 4.2. Close lightbox via Close button

**File:** `tests/functional/scrum82-lightbox-close-button.spec.ts`

**Steps:**
  1. Open lightbox
  2. Click Close button
  3. Verify lightbox closes

**Expected Results:**
  - Clicking Close button closes lightbox

#### 4.3. Close lightbox via Esc key

**File:** `tests/functional/scrum82-lightbox-esc.spec.ts`

**Steps:**
  1. Open lightbox
  2. Press Esc key
  3. Verify lightbox closes

**Expected Results:**
  - Pressing Esc closes lightbox

### 5. Demo Video

**Seed:** `tests/seed.spec.ts`

#### 5.1. Verify video button display

**File:** `tests/functional/scrum82-video-button-display.spec.ts`

**Steps:**
  1. Navigate to Product Details Page with demo video
  2. Verify Preview/Play Video button is visible

**Expected Results:**
  - Preview or Play Video button is visible in gallery

#### 5.2. Play demo video in popup

**File:** `tests/functional/scrum82-video-playback.spec.ts`

**Steps:**
  1. Navigate to Product Details Page with demo video
  2. Click Preview/Play Video button
  3. Verify video plays in popup

**Expected Results:**
  - Clicking button opens popup with video player
  - Video plays in embedded player
  - No page reload occurs

### 6. Gallery Accessibility

**Seed:** `tests/seed.spec.ts`

#### 6.1. Verify gallery layout accessibility

**File:** `tests/accessibility/scrum82-gallery-layout.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Verify gallery structure

**Expected Results:**
  - Gallery displays 1 main image + up to 5 thumbnails
  - Layout is accessible

#### 6.2. Verify thumbnail button accessibility

**File:** `tests/accessibility/scrum82-thumbnail-buttons.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Inspect thumbnails
  3. Verify button role and ALT text

**Expected Results:**
  - Thumbnails are implemented as buttons
  - Thumbnails have descriptive ALT text

#### 6.3. Verify image update announcement

**File:** `tests/accessibility/scrum82-image-update-announcement.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Click thumbnail
  3. Verify ARIA live region announcement

**Expected Results:**
  - ARIA live region announces main image update
  - Announcement occurs when thumbnail is selected

#### 6.4. Verify image aspect ratio and contrast

**File:** `tests/accessibility/scrum82-image-quality.spec.ts`

**Steps:**
  1. Navigate to Product Details Page
  2. Check all images
  3. Verify aspect ratio and contrast

**Expected Results:**
  - Images maintain consistent aspect ratio
  - Images have high contrast

### 7. Lightbox Accessibility

**Seed:** `tests/seed.spec.ts`

#### 7.1. Verify lightbox focus trap

**File:** `tests/accessibility/scrum82-lightbox-focus-trap.spec.ts`

**Steps:**
  1. Open lightbox
  2. Tab through controls
  3. Verify focus stays within lightbox

**Expected Results:**
  - Keyboard focus is trapped inside lightbox
  - Tab cycles through lightbox controls only

#### 7.2. Verify lightbox Close button accessibility

**File:** `tests/accessibility/scrum82-lightbox-close-button-a11y.spec.ts`

**Steps:**
  1. Open lightbox
  2. Verify Close button visibility
  3. Tab to Close button
  4. Activate with keyboard

**Expected Results:**
  - Close button is clearly visible
  - Close button is keyboard accessible

### 8. Video Player Accessibility

**Seed:** `tests/seed.spec.ts`

#### 8.1. Verify video player captions and controls

**File:** `tests/accessibility/scrum82-video-captions-controls.spec.ts`

**Steps:**
  1. Open demo video
  2. Verify captions are available
  3. Verify transcript is available
  4. Test keyboard controls

**Expected Results:**
  - Video player includes captions
  - Video player includes transcripts
  - Video player has keyboard controls

#### 8.2. Verify video respects reduced-motion

**File:** `tests/accessibility/scrum82-video-reduced-motion.spec.ts`

**Steps:**
  1. Enable prefers-reduced-motion
  2. Open demo video
  3. Verify no autoplay or motion

**Expected Results:**
  - Motion respects prefers-reduced-motion setting
  - Autoplay respects prefers-reduced-motion setting
