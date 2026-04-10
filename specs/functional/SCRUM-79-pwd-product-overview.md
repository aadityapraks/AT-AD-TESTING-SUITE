# SCRUM-79: PwD - View Product Overview Section (Header and Gallery) — Functional Test Plan

**Version:** 1.0
**Story:** SCRUM-79
**Total Test Cases:** 33
**Test Type:** Functional (no accessibility tests)

---

## User Story

**As a** PwD user viewing a product,
**I want to** see clear product images, name, tags, price, rating, and availability,
**So that** I can understand the product at a glance and decide if I want to know more.

---

## Acceptance Criteria Summary

1. Top section displays: Product name, tags, rating (stars + review count), price, stock status, available geographies, description, CTAs (Contact Vendor, Save, Share)
2. Image gallery shows: main image, thumbnails, clicking thumbnail replaces main image, carousel navigation
3. Images load without noticeable delay
4. "In Stock" / "Out of Stock" labels update based on availability
5. "Save" bookmarks the product (if logged in)
6. "Share" opens share modal or native share options (mobile) / copy link (desktop)

---



## 3. Test Scenarios

### Feature: Product Header Information

---

### TC_SCRUM79_001 — Product Name is Visible on Details Page
**Priority**: Highest
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is logged in and on a product details page.
**Test Steps**:
1. Log in and navigate to a product details page.
2. Verify the product name heading is visible.
**Expected Results**:
- Product name heading is visible.

---

### TC_SCRUM79_002 — Product Name is Rendered as H1 Heading
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Inspect the product name element tag.
**Expected Results**:
- Product name is rendered as an H1 heading.

---

### TC_SCRUM79_003 — Product Tags are Displayed
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Look for product tags/badges.
**Expected Results**:
- Product tags/badges are displayed.

---

### TC_SCRUM79_004 — Product Tags Contain Category Information
**Priority**: Low
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Read the tag text content.
**Expected Results**:
- Tags contain category information text.

---

### TC_SCRUM79_005 — Average Rating is Displayed with Star Icon
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify the rating value is visible.
**Expected Results**:
- Average rating value is visible.

---

### TC_SCRUM79_006 — Star Icon is Present Next to Rating
**Priority**: Low
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Check for star SVG icon near rating.
**Expected Results**:
- Star SVG icon is present next to the rating.

---

### TC_SCRUM79_007 — Review Count is Displayed
**Priority**: Medium
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify review count text is visible.
**Expected Results**:
- Review count text is visible.

---

### TC_SCRUM79_008 — Price is Displayed When Available
**Priority**: Highest
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify the price is visible.
**Expected Results**:
- Price is visible when available.

---

### TC_SCRUM79_009 — Stock Status Badge is Visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify stock status badge is visible.
**Expected Results**:
- Stock status badge (e.g., 'In Stock') is visible.

---

### TC_SCRUM79_010 — Product Description is Displayed
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify description text is visible.
**Expected Results**:
- Product description text is visible.

---

### TC_SCRUM79_011 — Available Geographies Section is Visible
**Priority**: Medium
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify geography information is displayed.
**Expected Results**:
- Available geographies section is visible.

---

### Feature: Call-to-Action Buttons

---

### TC_SCRUM79_012 — Contact Vendor Button is Visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify 'Contact Vendor' button is visible.
**Expected Results**:
- 'Contact Vendor' button is visible.

---

### TC_SCRUM79_013 — Save Button is Visible
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify Save button is visible.
**Expected Results**:
- Save button is visible.

---

### TC_SCRUM79_014 — Save Button Has Bookmark Icon
**Priority**: Lowest
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Inspect Save button for SVG icon.
**Expected Results**:
- Save button contains a bookmark SVG icon.

---

### TC_SCRUM79_015 — Share Button is Visible
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify Share button is visible.
**Expected Results**:
- Share button is visible.

---

### TC_SCRUM79_016 — Share Button Opens Share Panel
**Priority**: Highest
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Click the Share button.
3. Verify the share off-canvas panel opens.
**Expected Results**:
- Clicking Share opens the share off-canvas panel.

---

### TC_SCRUM79_017 — Share Panel Contains Share Heading
**Priority**: Low
**Related Jira Issue**: SCRUM-79
**Preconditions**: Share panel is open.
**Test Steps**:
1. Click Share button.
2. Verify the share panel heading.
**Expected Results**:
- Share panel contains a heading.

---

### TC_SCRUM79_018 — Contact Vendor Button Opens Off-Canvas
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Click 'Contact Vendor' button.
3. Verify off-canvas panel opens.
**Expected Results**:
- Clicking 'Contact Vendor' opens an off-canvas panel.

---

### Feature: Image Gallery

---

### TC_SCRUM79_019 — Gallery Section is Visible
**Priority**: Highest
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify the gallery section is visible.
**Expected Results**:
- Gallery section is visible.

---

### TC_SCRUM79_020 — Main Product Image is Displayed
**Priority**: Highest
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify the main image is present with a valid src.
**Expected Results**:
- Main product image is present with a valid src.

---

### TC_SCRUM79_021 — Gallery Counter Shows Image Position
**Priority**: Medium
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify gallery counter is visible.
**Expected Results**:
- Gallery counter showing image position is visible.

---

### TC_SCRUM79_022 — Gallery Thumbnails are Displayed
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify thumbnails are present.
**Expected Results**:
- Gallery thumbnails are present.

---

### TC_SCRUM79_023 — First Thumbnail is Active by Default
**Priority**: Medium
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Check which thumbnail has the active state.
**Expected Results**:
- First thumbnail has the active state by default.

---

### TC_SCRUM79_024 — Clicking Thumbnail Changes Active State
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Click the second thumbnail.
3. Verify active state changes.
**Expected Results**:
- Clicking second thumbnail changes the active state.

---

### TC_SCRUM79_025 — Clicking Thumbnail Updates Gallery Counter
**Priority**: Medium
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Click the second thumbnail.
3. Verify gallery counter updates.
**Expected Results**:
- Gallery counter updates after clicking a thumbnail.

---

### TC_SCRUM79_026 — Gallery Next Button Advances Slide
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Click the Next button.
3. Verify gallery counter changes.
**Expected Results**:
- Gallery counter changes after clicking Next.

---

### TC_SCRUM79_027 — Gallery Previous Button Goes Back
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: User clicked Next to advance the gallery.
**Test Steps**:
1. Click Next to advance.
2. Click Previous.
3. Verify gallery counter changes back.
**Expected Results**:
- Gallery counter changes back after clicking Previous.

---

### TC_SCRUM79_028 — Gallery Badge Shows Media Type
**Priority**: Low
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify gallery badge is visible.
**Expected Results**:
- Gallery badge showing media type is visible.

---

### TC_SCRUM79_029 — Gallery Description is Displayed
**Priority**: Medium
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Verify gallery description text is visible.
**Expected Results**:
- Gallery description text is visible.

---

### Feature: Responsive & Layout

---

### TC_SCRUM79_030 — Product Overview Renders on Mobile Viewport
**Priority**: High
**Related Jira Issue**: SCRUM-79
**Preconditions**: Browser viewport set to mobile (375x667).
**Test Steps**:
1. Set viewport to mobile (375x667).
2. Navigate to a product details page.
3. Verify product name and gallery are visible.
**Expected Results**:
- Product name and gallery are visible on mobile.

---

### TC_SCRUM79_031 — Product Overview Renders on Tablet Viewport
**Priority**: Medium
**Related Jira Issue**: SCRUM-79
**Preconditions**: Browser viewport set to tablet (768x1024).
**Test Steps**:
1. Set viewport to tablet (768x1024).
2. Navigate to a product details page.
3. Verify product name and gallery are visible.
**Expected Results**:
- Product name and gallery are visible on tablet.

---

### TC_SCRUM79_032 — Images Load Without Noticeable Delay
**Priority**: Medium
**Related Jira Issue**: SCRUM-79
**Preconditions**: User is on a product details page.
**Test Steps**:
1. Navigate to a product details page.
2. Measure time for first image to be attached.
**Expected Results**:
- First image loads within acceptable time threshold.

---

### TC_SCRUM79_033 — No Horizontal Overflow on Product Overview
**Priority**: Lowest
**Related Jira Issue**: SCRUM-79
**Preconditions**: Browser viewport set to mobile.
**Test Steps**:
1. Set viewport to mobile.
2. Navigate to a product details page.
3. Check body scroll width.
**Expected Results**:
- Body scroll width does not exceed viewport width.

---

## Test Data

| Field | Value |
|---|---|
| Base URL | https://qa-atad.swarajability.org/ |
| Catalog URL | https://qa-atad.swarajability.org/catalog/ |
| Credentials | candidate8new1@mailto.plus / 123456 |
| Page Load Threshold | 5000ms |
| Image Load Threshold | 5000ms |

---

## Test Scenarios

### Feature: Product Header Information (TC_SCRUM79_001–011)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM79_001 | Product Name is Visible on Details Page | Highest |
| TC_SCRUM79_002 | Product Name is Rendered as H1 Heading | High |
| TC_SCRUM79_003 | Product Tags are Displayed | High |
| TC_SCRUM79_004 | Product Tags Contain Category Information | Low |
| TC_SCRUM79_005 | Average Rating is Displayed with Star Icon | High |
| TC_SCRUM79_006 | Star Icon is Present Next to Rating | Low |
| TC_SCRUM79_007 | Review Count is Displayed | Medium |
| TC_SCRUM79_008 | Price is Displayed When Available | Highest |
| TC_SCRUM79_009 | Stock Status Badge is Visible | Highest |
| TC_SCRUM79_010 | Product Description is Displayed | High |
| TC_SCRUM79_011 | Available Geographies Section is Visible | Medium |

### Feature: Call-to-Action Buttons (TC_SCRUM79_012–018)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM79_012 | Contact Vendor Button is Visible | Highest |
| TC_SCRUM79_013 | Save Button is Visible | High |
| TC_SCRUM79_014 | Save Button Has Bookmark Icon | Lowest |
| TC_SCRUM79_015 | Share Button is Visible | High |
| TC_SCRUM79_016 | Share Button Opens Share Panel | Highest |
| TC_SCRUM79_017 | Share Panel Contains Share Heading | Low |
| TC_SCRUM79_018 | Contact Vendor Button Opens Off-Canvas | High |

### Feature: Image Gallery (TC_SCRUM79_019–029)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM79_019 | Gallery Section is Visible | Highest |
| TC_SCRUM79_020 | Main Product Image is Displayed | Highest |
| TC_SCRUM79_021 | Gallery Counter Shows Image Position | Medium |
| TC_SCRUM79_022 | Gallery Thumbnails are Displayed | High |
| TC_SCRUM79_023 | First Thumbnail is Active by Default | Medium |
| TC_SCRUM79_024 | Clicking Thumbnail Changes Active State | High |
| TC_SCRUM79_025 | Clicking Thumbnail Updates Gallery Counter | Medium |
| TC_SCRUM79_026 | Gallery Next Button Advances Slide | High |
| TC_SCRUM79_027 | Gallery Previous Button Goes Back | High |
| TC_SCRUM79_028 | Gallery Badge Shows Media Type | Low |
| TC_SCRUM79_029 | Gallery Description is Displayed | Medium |

### Feature: Responsive & Layout (TC_SCRUM79_030–033)

| ID | Title | Priority |
|---|---|---|
| TC_SCRUM79_030 | Product Overview Renders on Mobile Viewport | High |
| TC_SCRUM79_031 | Product Overview Renders on Tablet Viewport | Medium |
| TC_SCRUM79_032 | Images Load Without Noticeable Delay | Medium |
| TC_SCRUM79_033 | No Horizontal Overflow on Product Overview | Lowest |

---

## Traceability Matrix

| AC# | Acceptance Criteria | Test Cases |
|---|---|---|
| AC1 | Top section displays product info | TC_001–011 |
| AC2 | Image gallery with thumbnails and carousel | TC_019–029 |
| AC3 | Images load without delay | TC_032 |
| AC4 | Stock status labels | TC_009 |
| AC5 | Save bookmarks product | TC_013, TC_014 |
| AC6 | Share opens share options | TC_015–017 |
| AC7 | Contact Vendor CTA | TC_012, TC_018 |

---

## Assumptions

1. Tests run as authenticated PwD user (candidate8new1@mailto.plus)
2. At least one product exists in the catalog with images, price, and stock status
3. Product "Wheelchair 16-03" is used as the reference product for DOM inspection
4. No accessibility testing — functional only
5. Login flow uses Authentik auth with shadow DOM consent page handling

## Open Questions

1. Does the Save button persist state across page refreshes? (Not tested — requires wishlist API)
2. What happens when a product has no images? (Edge case — depends on test data)
3. Geography "+N more" popup behavior when more than 3 geographies exist
