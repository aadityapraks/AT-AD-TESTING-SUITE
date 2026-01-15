# SCRUM-23 Accessibility Test Plan

## Application Overview

Comprehensive accessibility test plan for Assistive Partner Updates Product Photos and Demo Videos (SCRUM-23) covering WCAG 2.1 AA compliance for media gallery, image uploads, video management, ALT text generation, preview functionality, and approval workflow.

## Test Scenarios

### 1. Edit Product Access and Media Gallery

**Seed:** `seed.spec.ts`

#### 1.1. TC_A11Y_001: Verify keyboard navigation to Edit Product option

**File:** `tests/accessibility/scrum23-edit-product-access.spec.ts`

**Steps:**
  1. Login as approved AP
  2. Navigate to Vendor Product Management page
  3. Tab through product list to Edit Product button
  4. Verify focus indicator is visible
  5. Press Enter to activate Edit Product

**Expected Results:**
  - Edit Product button is keyboard accessible
  - Focus indicator has 3:1 contrast ratio (WCAG 2.4.7)
  - Enter key activates button
  - No keyboard traps exist
  - Tab order is logical

#### 1.2. TC_A11Y_002: Verify screen reader announces Edit Product button

**File:** `tests/accessibility/scrum23-edit-product-access.spec.ts`

**Steps:**
  1. Enable screen reader
  2. Navigate to product list
  3. Focus on Edit Product button
  4. Verify button name and role announced
  5. Verify associated product name announced

**Expected Results:**
  - Button role announced
  - Accessible name includes product context
  - Button state announced if disabled
  - No empty or generic labels

#### 1.3. TC_A11Y_003: Verify media gallery view accessibility

**File:** `tests/accessibility/scrum23-media-gallery.spec.ts`

**Steps:**
  1. Open Edit Product media section
  2. Verify gallery has proper landmark role
  3. Tab through all images and videos
  4. Verify each item is keyboard accessible
  5. Check focus order follows visual layout

**Expected Results:**
  - Gallery has role='region' with aria-label
  - All media items are keyboard accessible
  - Focus indicator visible with 3:1 contrast
  - Tab order follows logical sequence
  - Gallery structure announced by screen reader

#### 1.4. TC_A11Y_004: Verify gallery visual accessibility

**File:** `tests/accessibility/scrum23-media-gallery.spec.ts`

**Steps:**
  1. Inspect gallery text contrast
  2. Test gallery at 200% zoom
  3. Verify borders/separators have 3:1 contrast
  4. Check gallery doesn't rely on color alone
  5. Verify all labels are readable

**Expected Results:**
  - Text has 4.5:1 contrast ratio (WCAG 1.4.3)
  - Gallery usable at 200% zoom (WCAG 1.4.4)
  - Information not conveyed by color alone (WCAG 1.4.1)
  - Borders have 3:1 contrast
  - All content remains visible when zoomed

### 2. Primary Image Management

**Seed:** `seed.spec.ts`

#### 2.1. TC_A11Y_005: Verify primary image indicator accessibility

**File:** `tests/accessibility/scrum23-primary-image.spec.ts`

**Steps:**
  1. Navigate to media gallery
  2. Locate primary image
  3. Verify "Primary" indicator is visible
  4. Check screen reader announces primary status
  5. Verify indicator has sufficient contrast

**Expected Results:**
  - Primary indicator has aria-label or visible text
  - Screen reader announces "Primary image"
  - Indicator has 3:1 contrast ratio
  - Indicator not conveyed by color alone
  - Visual and programmatic indication present

#### 2.2. TC_A11Y_006: Verify replace primary image button accessibility

**File:** `tests/accessibility/scrum23-primary-image.spec.ts`

**Steps:**
  1. Focus on primary image
  2. Tab to Replace button
  3. Verify focus indicator visible
  4. Press Enter to activate
  5. Verify file picker opens

**Expected Results:**
  - Replace button keyboard accessible
  - Accessible name: "Replace primary image"
  - Focus indicator has 3:1 contrast
  - Enter/Space activates button
  - Button state announced by screen reader

#### 2.3. TC_A11Y_007: Verify reassign primary image functionality

**File:** `tests/accessibility/scrum23-primary-image.spec.ts`

**Steps:**
  1. Navigate to non-primary image
  2. Tab to "Set as Primary" button
  3. Verify button is keyboard accessible
  4. Activate with Enter/Space
  5. Verify primary status updates announced

**Expected Results:**
  - Set as Primary button keyboard accessible
  - Button has clear accessible name
  - Action result announced via aria-live
  - Visual update has 3:1 contrast
  - Focus management is logical

#### 2.4. TC_A11Y_008: Verify primary image preview update

**File:** `tests/accessibility/scrum23-primary-image.spec.ts`

**Steps:**
  1. Update primary image
  2. Verify preview updates automatically
  3. Check screen reader announces update
  4. Verify preview has proper ALT text
  5. Test preview at 200% zoom

**Expected Results:**
  - Preview update announced via aria-live='polite'
  - Preview image has meaningful ALT text
  - Update doesn't disrupt keyboard focus
  - Preview readable at 200% zoom
  - Loading state announced if applicable

### 3. Additional Image Uploads

**Seed:** `seed.spec.ts`

#### 3.1. TC_A11Y_009: Verify upload button accessibility

**File:** `tests/accessibility/scrum23-image-upload.spec.ts`

**Steps:**
  1. Navigate to upload section
  2. Tab to Upload Images button
  3. Verify focus indicator visible
  4. Press Enter to activate
  5. Verify file picker opens

**Expected Results:**
  - Upload button keyboard accessible
  - Accessible name: "Upload product images"
  - Focus indicator has 3:1 contrast
  - Enter/Space activates button
  - File limit (5 images) announced

#### 3.2. TC_A11Y_010: Verify file format validation messages

**File:** `tests/accessibility/scrum23-image-upload.spec.ts`

**Steps:**
  1. Attempt to upload unsupported format
  2. Verify error message appears
  3. Check screen reader announces error
  4. Verify error has sufficient contrast
  5. Test keyboard focus on error

**Expected Results:**
  - Error message has role='alert' or aria-live='assertive'
  - Message clearly states supported formats (JPG, PNG)
  - Text has 4.5:1 contrast ratio
  - Error linked to upload control
  - Focus moves to error or remains on control

#### 3.3. TC_A11Y_011: Verify image preview accessibility

**File:** `tests/accessibility/scrum23-image-upload.spec.ts`

**Steps:**
  1. Upload valid images
  2. Verify previews are keyboard accessible
  3. Tab through all preview controls
  4. Check screen reader announces image details
  5. Verify preview actions are accessible

**Expected Results:**
  - Each preview has accessible name
  - Preview controls (reorder, replace, delete) keyboard accessible
  - Image filename announced by screen reader
  - Preview has proper ARIA attributes
  - All controls have visible focus indicators

#### 3.4. TC_A11Y_012: Verify reorder images functionality

**File:** `tests/accessibility/scrum23-image-upload.spec.ts`

**Steps:**
  1. Focus on image in gallery
  2. Locate reorder controls (up/down arrows)
  3. Verify controls are keyboard accessible
  4. Use Enter/Space to reorder
  5. Verify new order announced

**Expected Results:**
  - Reorder buttons keyboard accessible
  - Accessible names: "Move image up", "Move image down"
  - Reorder result announced via aria-live
  - Focus remains on moved item
  - Visual order matches programmatic order

#### 3.5. TC_A11Y_013: Verify delete image functionality

**File:** `tests/accessibility/scrum23-image-upload.spec.ts`

**Steps:**
  1. Focus on image preview
  2. Tab to Delete button
  3. Verify button is keyboard accessible
  4. Press Enter to delete
  5. Verify deletion announced

**Expected Results:**
  - Delete button keyboard accessible
  - Accessible name: "Delete [filename]"
  - Confirmation dialog appears (if applicable)
  - Deletion announced via aria-live
  - Focus moves to logical next element

### 4. 3D Mockup Images

**Seed:** `seed.spec.ts`

#### 4.1. TC_A11Y_014: Verify 3D mockup section accessibility

**File:** `tests/accessibility/scrum23-3d-mockup.spec.ts`

**Steps:**
  1. Navigate to 3D mockup section
  2. Verify section has proper heading
  3. Tab through upload controls
  4. Check image limit (3) is announced
  5. Verify image tip is accessible

**Expected Results:**
  - Section has descriptive heading (h2 or h3)
  - Upload limit announced: "Upload up to 3 images"
  - Image tip has role='tooltip' or aria-describedby
  - All controls keyboard accessible
  - Focus indicators visible

#### 4.2. TC_A11Y_015: Verify 3D mockup image tip accessibility

**File:** `tests/accessibility/scrum23-3d-mockup.spec.ts`

**Steps:**
  1. Focus on image tip icon
  2. Verify tooltip appears on focus/hover
  3. Check screen reader announces tip content
  4. Press Escape to close tooltip
  5. Verify tooltip has sufficient contrast

**Expected Results:**
  - Tip icon has accessible name: "3D mockup guidelines"
  - Tooltip appears on focus and hover
  - Tooltip content announced by screen reader
  - Escape key closes tooltip
  - Tooltip text has 4.5:1 contrast ratio

### 5. Demo Video Updates

**Seed:** `seed.spec.ts`

#### 5.1. TC_A11Y_016: Verify video upload button accessibility

**File:** `tests/accessibility/scrum23-video-upload.spec.ts`

**Steps:**
  1. Navigate to demo video section
  2. Tab to Upload Video button
  3. Verify focus indicator visible
  4. Press Enter to activate
  5. Verify file picker opens

**Expected Results:**
  - Upload button keyboard accessible
  - Accessible name: "Upload demo video"
  - Supported format (MP4) announced
  - Focus indicator has 3:1 contrast
  - File size limit announced

#### 5.2. TC_A11Y_017: Verify video embed link input accessibility

**File:** `tests/accessibility/scrum23-video-upload.spec.ts`

**Steps:**
  1. Navigate to embed link option
  2. Tab to input field
  3. Verify field has visible label
  4. Type YouTube/Vimeo URL
  5. Verify validation feedback is accessible

**Expected Results:**
  - Input has associated label
  - Label has 4.5:1 contrast ratio
  - Placeholder text (if any) not sole label
  - Validation errors announced by screen reader
  - Error messages linked to input (aria-describedby)

#### 5.3. TC_A11Y_018: Verify video preview player accessibility

**File:** `tests/accessibility/scrum23-video-upload.spec.ts`

**Steps:**
  1. Upload or embed video
  2. Navigate to video preview
  3. Tab through player controls
  4. Verify all controls keyboard accessible
  5. Test play/pause with Enter/Space

**Expected Results:**
  - Video player has role='region' with label
  - All controls keyboard accessible
  - Play/Pause button has clear accessible name
  - Volume, seek controls keyboard accessible
  - Focus indicators visible on all controls

#### 5.4. TC_A11Y_019: Verify video file validation messages

**File:** `tests/accessibility/scrum23-video-upload.spec.ts`

**Steps:**
  1. Attempt to upload invalid file type
  2. Verify error message appears
  3. Check screen reader announces error
  4. Attempt to upload oversized file
  5. Verify size limit error is accessible

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Message states valid formats and size limits
  - Text has 4.5:1 contrast ratio
  - Error linked to upload control
  - User can retry without losing progress

### 6. ALT Text and Captions

**Seed:** `seed.spec.ts`

#### 6.1. TC_A11Y_020: Verify ALT text input field accessibility

**File:** `tests/accessibility/scrum23-alt-text.spec.ts`

**Steps:**
  1. Upload image
  2. Navigate to ALT text field
  3. Verify field has visible label
  4. Verify required indicator is accessible
  5. Type ALT text and verify character count

**Expected Results:**
  - Input has associated label: "ALT text"
  - Required indicator announced: "required"
  - Label has 4.5:1 contrast ratio
  - Character count announced dynamically
  - Help text available and accessible

#### 6.2. TC_A11Y_021: Verify missing ALT text prompt

**File:** `tests/accessibility/scrum23-alt-text.spec.ts`

**Steps:**
  1. Upload image without ALT text
  2. Attempt to save
  3. Verify prompt appears
  4. Check screen reader announces prompt
  5. Verify prompt has sufficient contrast

**Expected Results:**
  - Prompt has role='alert' or aria-live='assertive'
  - Message clearly states ALT text required
  - Text has 4.5:1 contrast ratio
  - Focus moves to ALT text field
  - Prompt linked to relevant field

#### 6.3. TC_A11Y_022: Verify Generate ALT Text with GenAI button

**File:** `tests/accessibility/scrum23-alt-text.spec.ts`

**Steps:**
  1. Navigate to Generate ALT Text button
  2. Verify button is keyboard accessible
  3. Press Enter to activate
  4. Verify loading state is announced
  5. Verify generated text is announced

**Expected Results:**
  - Button keyboard accessible
  - Accessible name: "Generate ALT text with GenAI"
  - Loading state announced via aria-live
  - Generated text announced when ready
  - Focus management is logical

#### 6.4. TC_A11Y_023: Verify video caption upload accessibility

**File:** `tests/accessibility/scrum23-captions.spec.ts`

**Steps:**
  1. Navigate to caption upload section
  2. Tab to Upload Captions button
  3. Verify button is keyboard accessible
  4. Upload .SRT file
  5. Verify success message is accessible

**Expected Results:**
  - Upload button keyboard accessible
  - Accessible name: "Upload caption file"
  - Supported format (.SRT) announced
  - Success message has aria-live='polite'
  - File name announced after upload

#### 6.5. TC_A11Y_024: Verify caption warning message

**File:** `tests/accessibility/scrum23-captions.spec.ts`

**Steps:**
  1. Upload video without captions
  2. Verify warning message appears
  3. Check screen reader announces warning
  4. Verify warning has sufficient contrast
  5. Verify warning icon is accessible

**Expected Results:**
  - Warning has role='alert' or aria-live='polite'
  - Message: "Adding captions improves accessibility"
  - Text has 4.5:1 contrast ratio
  - Warning icon has accessible name
  - Warning doesn't block interaction

### 7. Preview and Validation

**Seed:** `seed.spec.ts`

#### 7.1. TC_A11Y_025: Verify Preview Media button accessibility

**File:** `tests/accessibility/scrum23-preview.spec.ts`

**Steps:**
  1. Navigate to Preview Media button
  2. Verify button is keyboard accessible
  3. Press Enter to open preview
  4. Verify preview modal opens
  5. Check focus moves to modal

**Expected Results:**
  - Button keyboard accessible
  - Accessible name: "Preview media"
  - Focus moves to preview modal
  - Modal has role='dialog' or 'region'
  - Modal is announced by screen reader

#### 7.2. TC_A11Y_026: Verify preview modal accessibility

**File:** `tests/accessibility/scrum23-preview.spec.ts`

**Steps:**
  1. Open preview modal
  2. Verify focus trap within modal
  3. Tab through all modal content
  4. Press Escape to close
  5. Verify focus returns to trigger button

**Expected Results:**
  - Modal has role='dialog' and aria-modal='true'
  - Focus trapped within modal
  - All content keyboard accessible
  - Escape closes modal
  - Focus returns to Preview button

#### 7.3. TC_A11Y_027: Verify preview primary image display

**File:** `tests/accessibility/scrum23-preview.spec.ts`

**Steps:**
  1. Open preview modal
  2. Navigate to primary image
  3. Verify image has ALT text
  4. Check image is announced by screen reader
  5. Test image at 200% zoom

**Expected Results:**
  - Image has meaningful ALT text
  - ALT text announced by screen reader
  - Image readable at 200% zoom
  - Image has proper contrast if text overlay
  - Image loading state announced

#### 7.4. TC_A11Y_028: Verify preview gallery/carousel accessibility

**File:** `tests/accessibility/scrum23-preview.spec.ts`

**Steps:**
  1. Navigate to image carousel in preview
  2. Tab through carousel controls
  3. Use arrow keys to navigate images
  4. Verify current image announced
  5. Test carousel at 200% zoom

**Expected Results:**
  - Carousel has role='region' with label
  - Previous/Next buttons keyboard accessible
  - Arrow keys navigate images
  - Current position announced: "Image 2 of 5"
  - All controls visible at 200% zoom

#### 7.5. TC_A11Y_029: Verify preview video player accessibility

**File:** `tests/accessibility/scrum23-preview.spec.ts`

**Steps:**
  1. Navigate to video in preview
  2. Tab through player controls
  3. Verify captions are visible
  4. Test play/pause with keyboard
  5. Verify volume controls accessible

**Expected Results:**
  - Video player keyboard accessible
  - Captions visible and toggleable
  - All controls have accessible names
  - Keyboard shortcuts work (Space for play/pause)
  - Focus indicators visible on controls

### 8. Saving and Approval Workflow

**Seed:** `seed.spec.ts`

#### 8.1. TC_A11Y_030: Verify Save Changes button accessibility

**File:** `tests/accessibility/scrum23-save-workflow.spec.ts`

**Steps:**
  1. Make media updates
  2. Navigate to Save Changes button
  3. Verify button is keyboard accessible
  4. Press Enter to save
  5. Verify validation occurs

**Expected Results:**
  - Button keyboard accessible
  - Accessible name: "Save changes"
  - Focus indicator has 3:1 contrast
  - Enter/Space activates button
  - Loading state announced during save

#### 8.2. TC_A11Y_031: Verify mandatory field validation

**File:** `tests/accessibility/scrum23-save-workflow.spec.ts`

**Steps:**
  1. Attempt to save without ALT text
  2. Verify validation error appears
  3. Check screen reader announces error
  4. Verify focus moves to first error
  5. Verify error has sufficient contrast

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Error message clearly states missing fields
  - Focus moves to first invalid field
  - Error text has 4.5:1 contrast ratio
  - Error linked to field via aria-describedby

#### 8.3. TC_A11Y_032: Verify confirmation message accessibility

**File:** `tests/accessibility/scrum23-save-workflow.spec.ts`

**Steps:**
  1. Successfully save changes
  2. Verify confirmation message appears
  3. Check screen reader announces message
  4. Verify message has sufficient contrast
  5. Verify message is dismissible

**Expected Results:**
  - Message has role='alert' or aria-live='polite'
  - Text: "Media updates submitted for approval"
  - Text has 4.5:1 contrast ratio
  - Message announced by screen reader
  - Close button keyboard accessible

#### 8.4. TC_A11Y_033: Verify Pending Review status indicator

**File:** `tests/accessibility/scrum23-save-workflow.spec.ts`

**Steps:**
  1. After saving, verify status updates
  2. Navigate to status indicator
  3. Check screen reader announces status
  4. Verify indicator has sufficient contrast
  5. Verify status not conveyed by color alone

**Expected Results:**
  - Status has accessible label: "Pending Review"
  - Screen reader announces status change
  - Indicator has 3:1 contrast ratio
  - Status includes text, not just color
  - Status update announced via aria-live

### 9. File Upload Progress and Performance

**Seed:** `seed.spec.ts`

#### 9.1. TC_A11Y_034: Verify upload progress bar accessibility

**File:** `tests/accessibility/scrum23-upload-progress.spec.ts`

**Steps:**
  1. Upload large image file
  2. Verify progress bar appears
  3. Check screen reader announces progress
  4. Verify progress bar has proper ARIA
  5. Verify progress updates announced

**Expected Results:**
  - Progress bar has role='progressbar'
  - aria-valuenow, aria-valuemin, aria-valuemax set
  - Progress percentage announced dynamically
  - Visual progress has 3:1 contrast
  - Completion announced via aria-live

#### 9.2. TC_A11Y_035: Verify upload status indicators

**File:** `tests/accessibility/scrum23-upload-progress.spec.ts`

**Steps:**
  1. Upload multiple files
  2. Verify status for each file shown
  3. Check screen reader announces statuses
  4. Verify status icons have text alternatives
  5. Verify statuses have sufficient contrast

**Expected Results:**
  - Each file has status: "Uploading", "Complete", "Failed"
  - Status announced by screen reader
  - Icons have accessible names
  - Status text has 4.5:1 contrast ratio
  - Status not conveyed by color alone

#### 9.3. TC_A11Y_036: Verify interrupted upload resume

**File:** `tests/accessibility/scrum23-upload-progress.spec.ts`

**Steps:**
  1. Start file upload
  2. Interrupt upload (simulate network issue)
  3. Verify resume option appears
  4. Check resume button is keyboard accessible
  5. Verify resume status announced

**Expected Results:**
  - Resume button keyboard accessible
  - Accessible name: "Resume upload"
  - Interruption announced via aria-live
  - Resume action announced
  - Progress continues from interruption point

### 10. Error Handling

**Seed:** `seed.spec.ts`

#### 10.1. TC_A11Y_037: Verify file size error message

**File:** `tests/accessibility/scrum23-error-handling.spec.ts`

**Steps:**
  1. Attempt to upload oversized image (>5MB)
  2. Verify error message appears
  3. Check screen reader announces error
  4. Verify error has sufficient contrast
  5. Verify user can retry

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Message: "File too large. Maximum 5 MB"
  - Text has 4.5:1 contrast ratio
  - Error linked to upload control
  - User can select different file

#### 10.2. TC_A11Y_038: Verify unsupported format error

**File:** `tests/accessibility/scrum23-error-handling.spec.ts`

**Steps:**
  1. Attempt to upload unsupported format
  2. Verify error message appears
  3. Check screen reader announces error
  4. Verify supported formats listed
  5. Verify user can retry

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Message: "Format not supported. Use JPG or PNG"
  - Text has 4.5:1 contrast ratio
  - Error clearly states valid formats
  - User can select different file

#### 10.3. TC_A11Y_039: Verify upload failure error handling

**File:** `tests/accessibility/scrum23-error-handling.spec.ts`

**Steps:**
  1. Simulate upload failure
  2. Verify error message appears
  3. Check screen reader announces error
  4. Verify retry button is accessible
  5. Verify previously added media preserved

**Expected Results:**
  - Error has role='alert' or aria-live='assertive'
  - Message explains failure reason
  - Retry button keyboard accessible
  - Text has 4.5:1 contrast ratio
  - Other uploaded files not lost

#### 10.4. TC_A11Y_040: Verify image limit exceeded error

**File:** `tests/accessibility/scrum23-error-handling.spec.ts`

**Steps:**
  1. Attempt to upload more than 5 images
  2. Verify error message appears
  3. Check screen reader announces error
  4. Verify limit clearly stated
  5. Verify upload button disabled when limit reached

**Expected Results:**
  - Error has role='alert' or aria-live='polite'
  - Message: "Maximum 5 images allowed"
  - Text has 4.5:1 contrast ratio
  - Upload button disabled with aria-disabled='true'
  - Disabled state announced by screen reader

### 11. Overall Interface Accessibility

**Seed:** `seed.spec.ts`

#### 11.1. TC_A11Y_041: Verify page title and landmarks

**File:** `tests/accessibility/scrum23-overall-interface.spec.ts`

**Steps:**
  1. Navigate to media update page
  2. Verify page title is descriptive
  3. Use screen reader to navigate by landmarks
  4. Verify main, navigation landmarks exist
  5. Verify skip links present

**Expected Results:**
  - Page title: "Edit Product Media - [Product Name]"
  - Main content has role='main'
  - Navigation has role='navigation'
  - Skip to main content link available
  - All landmarks have accessible names

#### 11.2. TC_A11Y_042: Verify heading hierarchy

**File:** `tests/accessibility/scrum23-overall-interface.spec.ts`

**Steps:**
  1. Navigate through page
  2. Use screen reader to list headings
  3. Verify heading levels are sequential
  4. Verify no heading levels skipped
  5. Verify headings describe sections

**Expected Results:**
  - Heading hierarchy is logical (h1 → h2 → h3)
  - No heading levels skipped
  - Each section has descriptive heading
  - Headings have 4.5:1 contrast ratio
  - Screen reader can navigate by headings

#### 11.3. TC_A11Y_043: Verify help text and tooltips

**File:** `tests/accessibility/scrum23-overall-interface.spec.ts`

**Steps:**
  1. Navigate to help icons
  2. Focus on help icon
  3. Verify tooltip appears on focus/hover
  4. Check screen reader announces help text
  5. Verify tooltip has sufficient contrast

**Expected Results:**
  - Help icons keyboard accessible
  - Tooltips appear on focus and hover
  - Help text announced by screen reader
  - Tooltip text has 4.5:1 contrast ratio
  - Escape closes tooltip

#### 11.4. TC_A11Y_044: Verify overall keyboard navigation

**File:** `tests/accessibility/scrum23-overall-interface.spec.ts`

**Steps:**
  1. Navigate entire page using only keyboard
  2. Verify all interactive elements accessible
  3. Verify no keyboard traps
  4. Verify focus order is logical
  5. Verify focus always visible

**Expected Results:**
  - All controls keyboard accessible
  - Tab order follows visual layout
  - No keyboard traps exist
  - Focus indicators always visible (3:1 contrast)
  - Shift+Tab reverses navigation

#### 11.5. TC_A11Y_045: Verify color contrast throughout interface

**File:** `tests/accessibility/scrum23-overall-interface.spec.ts`

**Steps:**
  1. Inspect all text elements
  2. Verify normal text has 4.5:1 contrast
  3. Verify large text has 3:1 contrast
  4. Verify UI components have 3:1 contrast
  5. Test in high contrast mode

**Expected Results:**
  - Normal text: 4.5:1 contrast (WCAG 1.4.3)
  - Large text (18pt+): 3:1 contrast
  - UI components: 3:1 contrast (WCAG 1.4.11)
  - Focus indicators: 3:1 contrast
  - Interface usable in high contrast mode

#### 11.6. TC_A11Y_046: Verify responsive design at 200% zoom

**File:** `tests/accessibility/scrum23-overall-interface.spec.ts`

**Steps:**
  1. Set browser zoom to 200%
  2. Navigate through entire interface
  3. Verify all content remains visible
  4. Verify no horizontal scrolling required
  5. Verify all controls remain functional

**Expected Results:**
  - All content visible at 200% zoom (WCAG 1.4.4)
  - No horizontal scrolling required
  - Text doesn't overlap or truncate
  - All controls remain accessible
  - Layout adapts appropriately

