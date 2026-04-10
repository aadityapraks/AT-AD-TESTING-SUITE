# Functional Test Plan: SCRUM-421 — Caregiver - View Wishlist Items Tagged to a PwD

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-22                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-421](https://youth4jobs.atlassian.net//browse/SCRUM-421) |
| Status      | In QA                                        |
| Assignee    | prathamesh v                                 |
| Reporter    | Avinash Lavangal                             |
| Priority    | Medium                                       |

### Scope & Objectives
Validate that a caregiver can view wishlist items tagged to a PwD from the Caregiver Profile. Covers: wishlist accessible from profile (AC1), item details display (AC2), PwD tagging (AC3–4), wishlist count (AC5), View Details navigation (AC6), session persistence (AC7). Edge cases: empty wishlist, no PwDs.

### Out of Scope
- Adding/removing wishlist items (covered by SCRUM-414)
- PwD deletion scenarios (cannot test without destructive action)
- Out of stock/delisted product marking (backend-dependent)

---

## 2. Requirements Traceability Matrix (20 Test Cases)

| Acceptance Criteria                                              | Test Case(s)                              | Priority |
|------------------------------------------------------------------|-------------------------------------------|----------|
| Wishlist accessible from Caregiver Profile (AC1)                 | TC_SCRUM421_001, 002, 003                 | Highest  |
| Wishlist tab/section visible on profile                          | TC_SCRUM421_004                           | Highest  |
| Wishlist items display product name and price (AC2)              | TC_SCRUM421_005, 006                      | Highest  |
| Wishlist items display PwD name tag (AC2)                        | TC_SCRUM421_007                           | Highest  |
| Wishlist items have View Details CTA (AC2)                       | TC_SCRUM421_008                           | Highest  |
| View Details navigates to product detail page (AC6)              | TC_SCRUM421_009                           | Highest  |
| Wishlist count reflects total saved items (AC5)                  | TC_SCRUM421_010                           | High     |
| Items tagged to one PwD only (AC3)                               | TC_SCRUM421_011                           | High     |
| Single PwD → auto-assigned tag (AC4)                             | TC_SCRUM421_012                           | High     |
| Wishlist persists across sessions (AC7)                          | TC_SCRUM421_013                           | High     |
| Empty wishlist shows empty state message (EC)                    | TC_SCRUM421_014, 015                      | Medium   |
| Product image visible in wishlist items (AC2)                    | TC_SCRUM421_016                           | Medium   |
| Mobile viewport renders wishlist correctly                       | TC_SCRUM421_017                           | Low      |
| Back navigation from wishlist works                              | TC_SCRUM421_018                           | Low      |
| Wishlist page has correct heading                                | TC_SCRUM421_019                           | Lowest   |
| Page refresh retains wishlist content                            | TC_SCRUM421_020                           | Lowest   |

---

## 3. Test Scenarios

### TC_SCRUM421_001 — Caregiver Can Navigate to Profile Page
**Priority**: Highest
**Steps**: Login → navigate to profile → verify profile content.
**Expected**: Profile page loads.

### TC_SCRUM421_002 — Wishlist Tab/Link Visible on Profile Page
**Priority**: Highest
**Steps**: On profile → verify Wishlist tab/link visible.
**Expected**: Wishlist tab is visible.

### TC_SCRUM421_003 — Clicking Wishlist Tab Shows Wishlist Content
**Priority**: Highest
**Steps**: Click Wishlist tab → verify wishlist content loads.
**Expected**: Wishlist section is displayed.

### TC_SCRUM421_004 — Wishlist Section Has Heading or Title
**Priority**: Highest
**Steps**: Navigate to wishlist → verify heading contains "wishlist".
**Expected**: Wishlist heading visible.

### TC_SCRUM421_005 — Wishlist Items Display Product Name
**Priority**: Highest
**Steps**: Navigate to wishlist → verify items have product names.
**Expected**: Product names visible in wishlist items.

### TC_SCRUM421_006 — Wishlist Items Display Price
**Priority**: Highest
**Steps**: Navigate to wishlist → verify items show price in ₹ format.
**Expected**: Price visible in wishlist items.

### TC_SCRUM421_007 — Wishlist Items Display PwD Name Tag
**Priority**: Highest
**Steps**: Navigate to wishlist → verify items have PwD name tag/badge.
**Expected**: PwD name tag visible on wishlist items.

### TC_SCRUM421_008 — Wishlist Items Have View Details CTA
**Priority**: Highest
**Steps**: Navigate to wishlist → verify View Details link/button exists.
**Expected**: View Details CTA present on wishlist items.

### TC_SCRUM421_009 — View Details Navigates to Product Detail Page
**Priority**: Highest
**Steps**: Click View Details on wishlist item → verify URL contains /product/.
**Expected**: Navigates to product detail page.

### TC_SCRUM421_010 — Wishlist Count Reflects Total Saved Items
**Priority**: High
**Steps**: Navigate to wishlist → verify count text or item count visible.
**Expected**: Wishlist count reflects total items.

### TC_SCRUM421_011 — Items Tagged to One PwD Only
**Priority**: High
**Steps**: Navigate to wishlist → verify each item has exactly one PwD tag.
**Expected**: Each item tagged to one PwD.

### TC_SCRUM421_012 — Single PwD Auto-Assigned Tag
**Priority**: High
**Steps**: Navigate to wishlist → if one PwD, verify tag is auto-assigned.
**Expected**: PwD tag auto-assigned for single PwD.

### TC_SCRUM421_013 — Wishlist Persists Across Sessions
**Priority**: High
**Steps**: View wishlist → reload page → verify wishlist still shows items.
**Expected**: Wishlist persists after reload.

### TC_SCRUM421_014 — Empty Wishlist Shows Empty State Message
**Priority**: Medium
**Steps**: Navigate to wishlist → if empty, verify empty state message.
**Expected**: Empty state message shown when no items.

### TC_SCRUM421_015 — No PwDs Shows Guidance Message
**Priority**: Medium
**Steps**: Navigate to wishlist → if no PwDs, verify guidance message.
**Expected**: Guidance like "Add a PwD to save products" shown.

### TC_SCRUM421_016 — Product Image Visible in Wishlist Items
**Priority**: Medium
**Steps**: Navigate to wishlist → verify items have product images.
**Expected**: Product images visible.

### TC_SCRUM421_017 — Mobile Viewport Renders Wishlist Correctly
**Priority**: Low
**Steps**: Navigate to wishlist → set mobile viewport → verify content.
**Expected**: Wishlist renders correctly on mobile.

### TC_SCRUM421_018 — Back Navigation From Wishlist Works
**Priority**: Low
**Steps**: Navigate to wishlist → go back → verify previous page loads.
**Expected**: Back navigation works.

### TC_SCRUM421_019 — Wishlist Page Has Correct Heading
**Priority**: Lowest
**Steps**: Verify page heading contains "wishlist" or profile name.
**Expected**: Correct heading displayed.

### TC_SCRUM421_020 — Page Refresh Retains Wishlist Content
**Priority**: Lowest
**Steps**: View wishlist → reload → verify content retained.
**Expected**: Content retained after refresh.

---

## 4. Test Data Requirements

| Data Item                        | Value / Description                                      |
|----------------------------------|----------------------------------------------------------|
| Caregiver email                  | `cg1@yopmail.com`                                        |
| Caregiver password               | `cg1@141G`                                               |
| Base URL                         | `https://qa-atad.swarajability.org/`                     |
| Desktop viewport                 | 1280×720                                                 |
| Mobile viewport                  | 375×667                                                  |

---

## 5. Assumptions & Dependencies

- Wishlist is accessible from the Caregiver Profile page via a tab or link.
- The caregiver account has at least one PwD linked.
- Wishlist may or may not have items depending on prior test runs.
- **Dependency**: SCRUM-414 covers adding to wishlist; SCRUM-421 covers viewing.
- **DO NOT CHANGE**: CaregiverRecommendationsPage.ts must not be modified.
