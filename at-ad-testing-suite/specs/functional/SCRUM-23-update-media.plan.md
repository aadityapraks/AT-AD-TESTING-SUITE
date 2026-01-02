# SCRUM-23 Test Plan

## Application Overview

Test plan for validating product media update functionality including primary image management, additional images (up to 5), 3D mockup images (up to 3), demo videos, ALT text, captions, preview, and WCAG 2.1 AA compliance.

## Test Scenarios

### 1. Access Media Update Section

**Seed:** `tests/seed/vendor-product-list.spec.ts`

#### 1.1. Access Edit Product media section

**File:** `tests/functional/access-media-section.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Vendor Product Management page
  3. Click Edit Product for a product
  4. Locate media section

**Expected Results:**
  - Edit Product option is accessible
  - Media section is visible
  - Previously uploaded images displayed in gallery view
  - Demo videos displayed clearly

### 2. Primary Image Management

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 2.1. Verify primary image marked clearly

**File:** `tests/functional/primary-image-marked.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product media section
  3. Locate primary image

**Expected Results:**
  - Primary image is clearly marked as "Primary"
  - Visual indicator distinguishes it from other images
  - Label is accessible to screen readers

#### 2.2. Replace primary image

**File:** `tests/functional/replace-primary-image.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product media section
  3. Click replace on primary image
  4. Upload new image
  5. Save changes

**Expected Results:**
  - Replace option is functional
  - New image uploads successfully
  - Primary image is updated
  - Product card preview reflects change

#### 2.3. Reassign another image as primary

**File:** `tests/functional/reassign-primary-image.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product with multiple images
  3. Select different image
  4. Click "Set as Primary"
  5. Verify change

**Expected Results:**
  - Set as Primary option is available
  - Selected image becomes primary
  - Previous primary becomes regular image
  - Product card preview updates automatically

### 3. Additional Image Uploads

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 3.1. Upload up to 5 additional images

**File:** `tests/functional/upload-additional-images.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product media section
  3. Upload 5 additional images (JPG/PNG)
  4. Verify previews

**Expected Results:**
  - Up to 5 additional images can be uploaded
  - JPG and PNG formats are supported
  - Previews display for all uploaded images
  - Upload limit is enforced

#### 3.2. Reorder images

**File:** `tests/functional/reorder-images.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product with multiple images
  3. Drag and drop to reorder images
  4. Save changes

**Expected Results:**
  - Images can be reordered
  - Drag and drop is functional
  - New order is saved
  - Order reflects on product page

#### 3.3. Replace existing image

**File:** `tests/functional/replace-existing-image.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product media section
  3. Click replace on an image
  4. Upload new image
  5. Save changes

**Expected Results:**
  - Replace option is available for each image
  - New image uploads successfully
  - Old image is replaced
  - Changes are saved

#### 3.4. Delete image

**File:** `tests/functional/delete-image.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product media section
  3. Click delete on an image
  4. Confirm deletion
  5. Save changes

**Expected Results:**
  - Delete option is available
  - Confirmation prompt appears
  - Image is removed from gallery
  - Changes are saved

### 4. 3D Mockup Images

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 4.1. Upload up to 3 mockup images

**File:** `tests/functional/upload-3d-mockup-images.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product media section
  3. Locate 3D Mockup section
  4. Upload 3 mockup images
  5. Verify image tip is displayed

**Expected Results:**
  - 3D Mockup section is visible
  - Up to 3 mockup images can be uploaded
  - Image tip is displayed
  - Upload limit is enforced at 3 images

### 5. Demo Video Updates

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 5.1. Upload new video file

**File:** `tests/functional/upload-video-file.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product media section
  3. Upload MP4 video file
  4. Wait for upload completion

**Expected Results:**
  - Video upload option is available
  - MP4 format is supported
  - File type is validated before upload
  - Upload progress is displayed

#### 5.2. Embed YouTube link

**File:** `tests/functional/embed-youtube-link.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product media section
  3. Enter YouTube video URL
  4. Preview embedded video

**Expected Results:**
  - YouTube embed option is available
  - URL is validated
  - Video preview displays correctly
  - Embed is functional

#### 5.3. Embed Vimeo link

**File:** `tests/functional/embed-vimeo-link.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open Edit Product media section
  3. Enter Vimeo video URL
  4. Preview embedded video

**Expected Results:**
  - Vimeo embed option is available
  - URL is validated
  - Video preview displays correctly
  - Embed is functional

#### 5.4. Preview video before finalizing

**File:** `tests/functional/preview-video.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Upload or embed video
  3. Click preview button
  4. Test video playback

**Expected Results:**
  - Preview option is available
  - Video plays correctly
  - Playback controls are functional
  - AP can verify video before saving

### 6. ALT Text Management

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 6.1. Add ALT text to uploaded image

**File:** `tests/functional/add-alt-text.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Upload new image
  3. Add ALT text in provided field
  4. Save changes

**Expected Results:**
  - ALT text field is available for each image
  - Text input is functional
  - ALT text is required
  - Changes are saved

#### 6.2. Verify missing ALT text prompt

**File:** `tests/functional/missing-alt-text-prompt.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Upload image without ALT text
  3. Attempt to save
  4. Observe validation

**Expected Results:**
  - System prompts for missing ALT text
  - Validation message is clear
  - Form does not submit without ALT text
  - Error is highlighted

#### 6.3. Generate ALT text with GenAI

**File:** `tests/functional/generate-alt-text-genai.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Upload image
  3. Click "Generate ALT Text with GenAI"
  4. Review generated text
  5. Accept or edit

**Expected Results:**
  - GenAI option is available
  - ALT text is generated automatically
  - Generated text is descriptive and accurate
  - AP can edit before saving

### 7. Video Captions and Subtitles

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 7.1. Upload subtitle file for video

**File:** `tests/functional/upload-subtitle-file.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Upload or embed video
  3. Upload .SRT caption file
  4. Preview video with captions

**Expected Results:**
  - Caption upload option is available
  - .SRT format is supported
  - Captions display in video preview
  - File is validated

#### 7.2. Add embedded captions

**File:** `tests/functional/add-embedded-captions.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Upload video
  3. Add embedded captions
  4. Preview video

**Expected Results:**
  - Embedded caption option is available
  - Captions can be added directly
  - Captions display correctly
  - Changes are saved

#### 7.3. Verify caption warning for videos

**File:** `tests/functional/caption-warning-message.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Upload video without captions
  3. Observe warning message

**Expected Results:**
  - Warning message displays
  - Message states: "Adding captions improves accessibility for hearing-impaired users."
  - Warning is clearly visible
  - Video can still be saved but warning persists

### 8. Preview and Validation

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 8.1. Preview updated media on product page

**File:** `tests/functional/preview-media-product-page.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Update product media
  3. Click "Preview Media"
  4. Review PwD-facing product page

**Expected Results:**
  - Preview Media option is available
  - Primary image displays correctly
  - Gallery/carousel layout is functional
  - Video player displays with controls

#### 8.2. Verify gallery carousel layout

**File:** `tests/functional/verify-gallery-carousel.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Preview product with multiple images
  3. Test carousel navigation

**Expected Results:**
  - Carousel displays all images
  - Navigation controls are functional
  - Images load properly
  - Layout is responsive

#### 8.3. Verify video player with captions

**File:** `tests/functional/verify-video-player-captions.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Preview product with video
  3. Test video playback
  4. Enable captions

**Expected Results:**
  - Video player is functional
  - Playback controls work properly
  - Captions display when enabled
  - Player is accessible

#### 8.4. Verify loading speed and visibility

**File:** `tests/functional/verify-loading-performance.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Preview product page
  3. Monitor media loading times
  4. Check visibility of all elements

**Expected Results:**
  - Images load within acceptable time
  - Video loads without delay
  - All media is visible
  - Performance is acceptable

### 9. Saving and Approval Workflow

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 9.1. Save media updates with validation

**File:** `tests/functional/save-media-updates.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Update product media
  3. Add required ALT text and captions
  4. Click "Save Changes"

**Expected Results:**
  - System validates ALT text presence
  - System validates caption requirements
  - Confirmation message appears
  - Changes are saved

#### 9.2. Verify confirmation message

**File:** `tests/functional/media-update-confirmation.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Save media updates
  3. Observe confirmation message

**Expected Results:**
  - Confirmation message displays
  - Message states: "Your media updates have been submitted and will be visible after admin approval."
  - Message is clearly visible
  - Message can be dismissed

#### 9.3. Verify Pending Review status

**File:** `tests/functional/media-pending-review-status.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Save media updates
  3. Check product status

**Expected Results:**
  - Product status changes to "Pending Review"
  - Status is visible in product list
  - Product awaits admin approval
  - Status change is logged

### 10. File Size and Performance Standards

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 10.1. Enforce image size limit

**File:** `tests/functional/enforce-image-size-limit.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Attempt to upload image > 5 MB
  3. Observe validation

**Expected Results:**
  - Upload is blocked
  - Error message: "File too large"
  - Size limit (5 MB) is displayed
  - AP can select different file

#### 10.2. Enforce video size limit

**File:** `tests/functional/enforce-video-size-limit.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Attempt to upload video > 100 MB
  3. Observe validation

**Expected Results:**
  - Upload is blocked
  - Error message: "File too large"
  - Size limit (100 MB) is displayed
  - AP can select different file

#### 10.3. Display upload progress bar

**File:** `tests/functional/upload-progress-bar.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Upload large image or video
  3. Observe progress indicator

**Expected Results:**
  - Progress bar is displayed
  - Percentage or status is shown
  - Upload can be monitored
  - Completion is indicated

#### 10.4. Resume interrupted upload

**File:** `tests/functional/resume-interrupted-upload.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Start uploading large file
  3. Simulate interruption
  4. Resume upload within session

**Expected Results:**
  - Upload resumes automatically
  - Progress is maintained
  - File uploads successfully
  - Session context is preserved

### 11. Error Handling

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 11.1. Prevent unsupported file types

**File:** `tests/functional/prevent-unsupported-formats.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Attempt to upload unsupported format (e.g., .gif, .bmp)
  3. Observe validation

**Expected Results:**
  - Upload is blocked
  - Error message: "Format not supported"
  - Supported formats are listed
  - AP can select valid file

#### 11.2. Handle upload failure gracefully

**File:** `tests/functional/handle-upload-failure.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Simulate upload failure
  3. Observe error handling

**Expected Results:**
  - Clear error message is displayed
  - Reason for failure is explained
  - AP can retry upload
  - Previously added media is not lost

#### 11.3. Retry upload without losing media

**File:** `tests/functional/retry-upload-preserve-media.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Upload multiple images
  3. One upload fails
  4. Retry failed upload

**Expected Results:**
  - Failed upload can be retried
  - Successfully uploaded media is preserved
  - No data loss occurs
  - Form state is maintained

### 12. Accessibility and UI Compliance

**Seed:** `tests/seed/vendor-edit-product-media.spec.ts`

#### 12.1. Verify keyboard accessibility

**File:** `tests/functional/media-keyboard-accessibility.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate media section using keyboard
  3. Test all controls (upload, delete, preview)

**Expected Results:**
  - All controls are keyboard accessible
  - Tab order is logical
  - Enter/Space activates controls
  - Focus indicators are visible

#### 12.2. Verify high contrast and focus indicators

**File:** `tests/functional/media-contrast-focus.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Open media management interface
  3. Check color contrast
  4. Test focus states

**Expected Results:**
  - Color contrast meets WCAG 2.1 AA
  - Focus indicators are clearly visible
  - High contrast mode is supported
  - Visual cues are accessible

#### 12.3. Verify tooltips and help text

**File:** `tests/functional/media-tooltips-help.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Hover over help icons
  3. Review tooltip content

**Expected Results:**
  - Tooltips explain ALT text best practices
  - Help text explains caption requirements
  - Guidance is clear and actionable
  - Tooltips are accessible

### 13. Audit and Version History

**Seed:** `tests/seed/admin-audit-logs.spec.ts`

#### 13.1. Log media updates in audit trail

**File:** `tests/functional/audit-log-media-updates.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Update product media
  3. Save changes
  4. Login as admin
  5. View audit logs

**Expected Results:**
  - Media updates are logged
  - Log includes timestamp and user ID
  - Photo and video updates are recorded
  - Action type is specified

#### 13.2. Preserve previous media versions

**File:** `tests/functional/preserve-media-versions.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Replace product images
  3. Save changes
  4. Login as admin
  5. Check version history

**Expected Results:**
  - Previous media versions are preserved
  - Versions remain available until admin approval
  - Rollback is possible
  - Version history is accessible

#### 13.3. Admin compares old and new media

**File:** `tests/functional/admin-compare-media.spec.ts`

**Steps:**
  1. AP updates product media
  2. Login as admin
  3. Review product in admin panel
  4. View media comparison

**Expected Results:**
  - Admin can view old and new media side-by-side
  - Comparison view is clear
  - Changes are highlighted
  - Admin can make informed approval decision
