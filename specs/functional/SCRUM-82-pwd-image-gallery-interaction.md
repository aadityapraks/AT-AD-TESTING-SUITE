# Functional Test Plan: SCRUM-82 — PwD - Interact with Product Image Gallery

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-15                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-82](https://youth4jobs.atlassian.net//browse/SCRUM-82) |
| Status      | In QA                                        |
| Assignee    | Kunal Tainwala                               |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?node-id=0-1) |

### Scope & Objectives
Validate that a PwD user can interact with the product image gallery on the product details page. Covers: main image display, thumbnail display and interaction, carousel/slider navigation, gallery capacity and slide count, demo video playback, image aspect ratio and quality, and responsive gallery layout.

### Out of Scope
- Accessibility testing (ARIA labels, screen reader, focus management) — covered separately
- Image upload/management by vendors
- Backend image processing

---

## 2. Requirements Traceability Matrix (33 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Main product image visible at top of gallery                     | TC_SCRUM82_001, 002, 003, 004             | Highest  |
| Thumbnail images displayed and interactive                       | TC_SCRUM82_005, 006, 007, 008, 009, 010   | Highest  |
| Carousel/slider navigation works                                 | TC_SCRUM82_011, 012, 013, 014, 015        | Highest  |
| Gallery capacity and slide count                                 | TC_SCRUM82_016, 017, 018, 019, 020        | High     |
| Demo video playback                                              | TC_SCRUM82_021, 022, 023, 024, 025        | High     |
| Image aspect ratio and quality                                   | TC_SCRUM82_026, 027, 028, 029             | Medium   |
| Responsive gallery layout                                        | TC_SCRUM82_030, 031, 032, 033             | High     |

---

## 3. Test Scenarios

### Feature: Main Image Display

---

### TC_SCRUM82_001 — Main product image is visible at top of gallery
**Priority**: Highest
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is logged in and on the wheelchair product page.
**Test Steps**:
1. Log in and navigate to wheelchair product.
2. Verify main image is visible.
**Expected Results**:
- Main product image is visible at top of gallery.

---

### TC_SCRUM82_002 — Main image has valid src attribute
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate to product.
2. Verify main image src is a valid URL.
**Expected Results**:
- Main image src is a valid URL.

---

### TC_SCRUM82_003 — Main image has alt text
**Priority**: Medium
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate to product.
2. Verify main image has alt attribute.
**Expected Results**:
- Main image has an alt attribute.

---

### TC_SCRUM82_004 — Main image is rendered at prominent size
**Priority**: Low
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate to product.
2. Verify image is at least 200x100px.
**Expected Results**:
- Image is at least 200x100px.

---

### Feature: Thumbnail Display & Interaction

---

### TC_SCRUM82_005 — Thumbnail images are displayed below main image
**Priority**: Highest
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate to product.
2. Verify thumbnails are visible.
**Expected Results**:
- Thumbnail images are visible below main image.

---

### TC_SCRUM82_006 — At least one thumbnail is present
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate to product.
2. Count thumbnails.
**Expected Results**:
- At least one thumbnail is present.

---

### TC_SCRUM82_007 — First thumbnail is active by default
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate to product.
2. Verify first thumb has active state.
**Expected Results**:
- First thumbnail has active state.

---

### TC_SCRUM82_008 — Clicking second thumbnail updates active state
**Priority**: Highest
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Click second thumbnail.
2. Verify it becomes active.
**Expected Results**:
- Second thumbnail becomes active after clicking.

---

### TC_SCRUM82_009 — Clicking thumbnail updates main image src
**Priority**: Highest
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Note main image src.
2. Click different thumbnail.
3. Verify src changed.
**Expected Results**:
- Main image src changes after clicking a different thumbnail.

---

### TC_SCRUM82_010 — Clicking each thumbnail sequentially works
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Click each thumbnail in order.
2. Verify each becomes active.
**Expected Results**:
- Each thumbnail becomes active when clicked sequentially.

---

### Feature: Carousel Navigation

---

### TC_SCRUM82_011 — Next button is visible when multiple images exist
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Verify Next button or multiple thumbnails present.
**Expected Results**:
- Next button or multiple thumbnails are present.

---

### TC_SCRUM82_012 — Clicking Next advances to next slide
**Priority**: Highest
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Click Next or second thumbnail.
2. Verify slide advances.
**Expected Results**:
- Slide advances after clicking Next or second thumbnail.

---

### TC_SCRUM82_013 — Previous button navigates back
**Priority**: Highest
**Related Jira Issue**: SCRUM-82
**Preconditions**: User advanced the gallery slide.
**Test Steps**:
1. Advance slide.
2. Go back.
3. Verify previous slide shown.
**Expected Results**:
- Previous slide is shown after going back.

---

### TC_SCRUM82_014 — Gallery counter updates on navigation
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate slides.
2. Verify counter text changes.
**Expected Results**:
- Gallery counter text changes on navigation.

---

### TC_SCRUM82_015 — Carousel wraps or stops at boundaries
**Priority**: Medium
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the last slide.
**Test Steps**:
1. Navigate to last slide.
2. Click Next.
3. Verify wraps or stays.
**Expected Results**:
- Carousel wraps to first or stays at last.

---

### Feature: Gallery Capacity & Slide Count

---

### TC_SCRUM82_016 — Gallery has multiple slides
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate to product.
2. Verify slide count > 1.
**Expected Results**:
- Gallery has more than 1 slide.

---

### TC_SCRUM82_017 — Gallery supports up to 10 images
**Priority**: Low
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Navigate to product.
2. Verify slide count <= 10.
**Expected Results**:
- Gallery has 10 or fewer slides.

---

### TC_SCRUM82_018 — Slide count matches thumbnail count
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Count slides and thumbnails.
2. Verify they match.
**Expected Results**:
- Slide count matches thumbnail count.

---

### TC_SCRUM82_019 — Each slide contains an image or video element
**Priority**: Medium
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Iterate all slides.
2. Verify each has img or video.
**Expected Results**:
- Each slide contains an image or video element.

---

### TC_SCRUM82_020 — Gallery counter shows current position out of total
**Priority**: Medium
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Verify counter matches N/M format.
**Expected Results**:
- Counter shows N/M format.

---

### Feature: Demo Video

---

### TC_SCRUM82_021 — Gallery badge indicates video presence
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Verify gallery has video badge or video element.
**Expected Results**:
- Gallery has video badge or video element.

---

### TC_SCRUM82_022 — Video badge text contains Video keyword
**Priority**: Low
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Read badge text.
2. Verify it contains 'video'.
**Expected Results**:
- Badge text contains 'video' keyword.

---

### TC_SCRUM82_023 — Clicking video badge opens video player
**Priority**: Highest
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Click Play/Preview.
2. Verify video player opens.
**Expected Results**:
- Video player opens after clicking play/preview.

---

### TC_SCRUM82_024 — Video plays without page reload
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Note URL.
2. Click Play.
3. Verify URL unchanged.
**Expected Results**:
- URL unchanged after clicking play.

---

### TC_SCRUM82_025 — Video player element is present after clicking play
**Priority**: Medium
**Related Jira Issue**: SCRUM-82
**Preconditions**: User clicked play.
**Test Steps**:
1. Click Play.
2. Verify video/iframe element visible.
**Expected Results**:
- Video/iframe element is visible.

---

### Feature: Image Aspect Ratio & Quality

---

### TC_SCRUM82_026 — Gallery slides use aspect ratio CSS class
**Priority**: Low
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Check first slide class.
2. Verify contains 'aspect'.
**Expected Results**:
- First slide class contains 'aspect'.

---

### TC_SCRUM82_027 — All slides share same aspect ratio class
**Priority**: Medium
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Get aspect class from first slide.
2. Verify all slides have same class.
**Expected Results**:
- All slides share the same aspect ratio class.

---

### TC_SCRUM82_028 — Main image loads within acceptable time
**Priority**: Medium
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Measure time for main image to attach.
2. Verify under threshold.
**Expected Results**:
- Main image loads within acceptable time.

---

### TC_SCRUM82_029 — All slide images have valid src
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: User is on the product page.
**Test Steps**:
1. Iterate all slides.
2. Verify each image has valid URL src.
**Expected Results**:
- All slide images have valid URL src.

---

### Feature: Responsive Gallery

---

### TC_SCRUM82_030 — Gallery renders on mobile viewport
**Priority**: High
**Related Jira Issue**: SCRUM-82
**Preconditions**: Browser viewport set to mobile (375x667).
**Test Steps**:
1. Set viewport to 375x667.
2. Verify gallery visible.
**Expected Results**:
- Gallery is visible on mobile.

---

### TC_SCRUM82_031 — Gallery renders on tablet viewport
**Priority**: Medium
**Related Jira Issue**: SCRUM-82
**Preconditions**: Browser viewport set to tablet (768x1024).
**Test Steps**:
1. Set viewport to 768x1024.
2. Verify gallery visible.
**Expected Results**:
- Gallery is visible on tablet.

---

### TC_SCRUM82_032 — No horizontal overflow on mobile
**Priority**: Lowest
**Related Jira Issue**: SCRUM-82
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set viewport to mobile.
2. Check body scroll width.
**Expected Results**:
- No horizontal overflow on mobile.

---

### TC_SCRUM82_033 — Thumbnails remain visible on mobile
**Priority**: Lowest
**Related Jira Issue**: SCRUM-82
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set viewport to mobile.
2. Verify thumbnails still visible.
**Expected Results**:
- Thumbnails remain visible on mobile.

---

## 4. Test Data Requirements

| Data Item          | Value                                    |
|--------------------|------------------------------------------|
| PwD email          | `candidate8new1@mailto.plus`             |
| PwD password       | `123456`                                 |
| Base URL           | `https://qa-atad.swarajability.org/`     |
| Catalog URL        | `https://qa-atad.swarajability.org/catalog/` |
| Desktop viewport   | 1280×720                                 |
| Tablet viewport    | 768×1024                                 |
| Mobile viewport    | 375×667                                  |

---

## 5. Assumptions & Dependencies

- Product page has an image gallery with thumbnails and carousel navigation.
- Gallery supports images and optional demo video.
- Thumbnails update the main image on click.
- Carousel navigation (Next/Previous) works for multiple slides.
- Gallery is responsive across desktop, tablet, and mobile viewports.
