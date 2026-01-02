# Test Cases for SCRUM21

## TC_SCRUM21_001
**Test Name:** Access Product Preview Mode from Product Management

**Precondition:** AP is logged in and has uploaded at least one product

**Steps:**
1. Navigate to Product Management page
2. Locate uploaded product in the list
3. Click "View Product" option in actions column

**Expected Result:** Preview opens showing product as it appears to PwD users in catalog

---

## TC_SCRUM21_002
**Test Name:** Verify Catalog Card Display Elements

**Precondition:** Product preview mode is open

**Steps:**
1. View the catalog card display
2. Verify product name is displayed
3. Verify short description is visible
4. Verify primary image is shown
5. Check text length and image cropping in card format

**Expected Result:** All catalog card elements display correctly with proper formatting

---

## TC_SCRUM21_003
**Test Name:** Navigate to Full Product Details Page

**Precondition:** Product preview mode is open in catalog card view

**Steps:**
1. Switch to product details page view
2. Verify product name and category display
3. Check short and detailed descriptions
4. Verify main and additional images load
5. Review specifications section
6. Check availability information
7. Verify demo video if uploaded

**Expected Result:** All product details display correctly in structured layout

---

## TC_SCRUM21_004
**Test Name:** Verify Media Display and Functionality

**Precondition:** Product with images and video is in preview mode

**Steps:**
1. Check main image displays at top of page
2. Navigate through additional images in gallery/carousel
3. Verify alt text appears in accessibility tools
4. Play demo video and check captions/transcripts

**Expected Result:** All media elements display and function correctly with accessibility features

---

## TC_SCRUM21_005
**Test Name:** Validate Specifications and Availability Display

**Precondition:** Product with specifications and availability data is in preview

**Steps:**
1. Review specifications layout (key-value or bullet points)
2. Verify geographical availability shows correctly
3. Check product quantity or "Made to Order" label visibility

**Expected Result:** Specifications and availability information display in clean, structured format

---

## TC_SCRUM21_006
**Test Name:** Check Accessibility Compliance Indicators

**Precondition:** Product is in preview mode

**Steps:**
1. Review accessibility features highlighted in preview
2. Check screen-reader friendly structure
3. Verify alt text availability indicators
4. Review heading hierarchy compliance
5. Check contrast and text visibility status
6. Locate accessibility readiness badge/note

**Expected Result:** Accessibility compliance indicators show current status with clear feedback

---

## TC_SCRUM21_007
**Test Name:** Edit Product from Preview Mode

**Precondition:** Product is in preview mode

**Steps:**
1. Click return to edit mode option
2. Modify product description
3. Replace an image
4. Update specifications
5. Save changes

**Expected Result:** Edits are auto-saved as draft and preview updates accordingly

---

## TC_SCRUM21_008
**Test Name:** View Live Published Product

**Precondition:** Product is approved and published

**Steps:**
1. Navigate to vendor dashboard
2. Locate published items section
3. Click "View Live Product" link

**Expected Result:** Live version opens showing product as PwD users see it in public catalog

---

## TC_SCRUM21_009
**Test Name:** Handle Media Loading Errors

**Precondition:** Product with oversized image or unsupported video format

**Steps:**
1. Access preview mode for problematic product
2. Observe error messages for failed media
3. Attempt to re-upload corrected content from same view

**Expected Result:** Clear error messages display with option to immediately correct content

---

## TC_SCRUM21_010
**Test Name:** Verify Preview Mode Accessibility for APs

**Precondition:** AP with accessibility needs is using preview mode

**Steps:**
1. Navigate preview using keyboard only
2. Test screen reader compatibility
3. Check tooltip availability for key sections
4. Verify interface follows accessibility standards

**Expected Result:** Preview mode is fully accessible with keyboard navigation and screen reader support