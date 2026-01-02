# Test Cases for SCRUM19

## TC_SCRUM19_001
**Test Name:** Verify Product Upload Access from Dashboard

**Precondition:** AP is logged in to dashboard

**Steps:**
1. Navigate to AP Dashboard
2. Locate "Product Upload" tab
3. Click on Product Upload tab

**Expected Result:** Product Upload form is accessible and loads successfully

---

## TC_SCRUM19_002
**Test Name:** Verify Basic Product Information Mandatory Fields Validation

**Precondition:** User is on Product Upload form

**Steps:**
1. Leave mandatory fields empty: Product Name, Product Type, Disability type, Disability percentage, Short Description, Detailed Description
2. Click Upload Product button
3. Verify error messages for all mandatory fields

**Expected Result:** Form displays validation errors for all missing mandatory fields and prevents submission

---

## TC_SCRUM19_003
**Test Name:** Verify Successful Product Information Entry

**Precondition:** User is on Product Upload form

**Steps:**
1. Enter Product Name: "Smart Mobility Walker"
2. Select Product Type: "Device"
3. Select Disability type: "Mobility"
4. Select Disability percentage: "60-80%"
5. Enter Short Description (under 200 characters)
6. Enter Detailed Description

**Expected Result:** All basic product information fields accept valid data without errors

---

## TC_SCRUM19_004
**Test Name:** Verify GenAI Assist Functionality

**Precondition:** User is filling product descriptions

**Steps:**
1. Click "Assist with GenAI" for Short Description
2. Click "Assist with GenAI" for Detailed Description
3. Click "Assist with GenAI" for Unique Features
4. Verify generated content appears in respective fields

**Expected Result:** GenAI generates appropriate content for each field when requested

---

## TC_SCRUM19_005
**Test Name:** Verify Primary Image Upload and Validation

**Precondition:** User is in Product Images section

**Steps:**
1. Upload primary image (JPG format, under 5MB)
2. Verify preview thumbnail display
3. Add Alt Text for primary image
4. Attempt to upload invalid format file

**Expected Result:** Valid image uploads successfully with preview, Alt Text is saved, invalid format is rejected

---

## TC_SCRUM19_006
**Test Name:** Verify Multiple Additional Images Upload

**Precondition:** User is in Product Images section

**Steps:**
1. Upload 5 additional images (JPG/PNG, under 5MB each)
2. Verify preview thumbnails for all images
3. Remove one uploaded image
4. Replace one uploaded image

**Expected Result:** Up to 5 additional images upload successfully, removal and replacement functions work correctly

---

## TC_SCRUM19_007
**Test Name:** Verify Demo Video Upload Functionality

**Precondition:** User is in Demo Video section

**Steps:**
1. Upload demo video file within size/duration limits
2. Alternatively, enter YouTube/Vimeo link
3. Verify video preview or link validation

**Expected Result:** Video uploads successfully or valid link is accepted with appropriate preview

---

## TC_SCRUM19_008
**Test Name:** Verify Specifications Section with GenAI

**Precondition:** User is in Specifications section

**Steps:**
1. Enter manual specifications: Dimensions, Weight, Material, Power requirements, Accessibility features
2. Click "Generate Specifications" for GenAI assistance
3. Verify generated specifications appear correctly

**Expected Result:** Manual specifications are saved and GenAI generates relevant technical specifications

---

## TC_SCRUM19_009
**Test Name:** Verify Geographical Availability Selection

**Precondition:** User is in Geographical Availability section

**Steps:**
1. Select "Pan-India" option
2. Change to "Specific Areas" and select multiple states/cities
3. Verify multiple selections are saved

**Expected Result:** Both Pan-India and specific area selections work correctly with multiple selections allowed

---

## TC_SCRUM19_010
**Test Name:** Verify Product Quantity and Made to Order

**Precondition:** User is in Product Quantity section

**Steps:**
1. Enter numeric quantity value
2. Toggle "Made to Order" option
3. Verify quantity field behavior with toggle

**Expected Result:** Numeric quantity accepts valid numbers and Made to Order toggle functions correctly

---

## TC_SCRUM19_011
**Test Name:** Verify Additional Information Fields

**Precondition:** User is in Additional Information section

**Steps:**
1. Enter Amazon Buy Link
2. Enter Product Website Link
3. Toggle between "Exact price" and "Price range"
4. Enter price values and tags

**Expected Result:** All additional information fields accept valid data and price toggle works correctly

---

## TC_SCRUM19_012
**Test Name:** Verify Save as Draft Functionality

**Precondition:** User has partially filled product form

**Steps:**
1. Fill some mandatory and optional fields
2. Click "Save as Draft" button
3. Navigate to Product Management page
4. Verify draft product appears in list

**Expected Result:** Product is saved as draft and appears in Product Management for future editing

---

## TC_SCRUM19_013
**Test Name:** Verify Complete Product Submission

**Precondition:** User has filled all mandatory fields

**Steps:**
1. Complete all required sections of product form
2. Click "Upload Product" button
3. Verify confirmation message display
4. Check for automated email confirmation

**Expected Result:** Product submits successfully with confirmation message and email sent to vendor

---

## TC_SCRUM19_014
**Test Name:** Verify File Size and Format Validation

**Precondition:** User is uploading media files

**Steps:**
1. Attempt to upload image over 5MB size limit
2. Attempt to upload unsupported file format
3. Verify error messages for invalid uploads

**Expected Result:** System rejects oversized files and unsupported formats with clear error messages