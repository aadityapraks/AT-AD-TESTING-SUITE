# Functional Test Plan: SCRUM-290 — PwD Accessing Notifications

## 1. Test Plan Overview

| Field       | Details                                      |
|-------------|----------------------------------------------|
| Version     | 1.0                                          |
| Date        | 2025-07-23                                   |
| Author      | QA Team                                      |
| Jira Story  | [SCRUM-290](https://youth4jobs.atlassian.net//browse/SCRUM-290) |
| Status      | In Progress                                  |
| Assignee    | Kamilath Rifka Sameem Ali                    |
| Reporter    | Priyesh Jha                                  |
| Priority    | Medium                                       |
| Figma       | [PWDs Design](https://www.figma.com/make/Ljz9XTnMlB3vjtUwcYiuzA/PWDs?p=f&t=ThxKWawF59kREh5H-0) |

### Scope & Objectives
Validate that a logged-in PwD user can view and manage notifications relevant to their disability profile, saved devices, and platform activity. Covers: notification bell icon with unread badge, dropdown panel with quick view, full notifications page, mark as read (individual and all), dismiss, notification types (Recommendations, Price Drop, Availability, Community/Stories), empty state, keyboard navigation, screen reader compatibility, and performance.

### Out of Scope
- Push notification delivery mechanism (backend)
- Admin notification management
- Caregiver notification flow
- Notification preference settings (if separate story)

---

## 2. Requirements Traceability Matrix

### Functional (22 Test Cases)

| Acceptance Criteria                              | Test Case(s)                    | Priority |
|--------------------------------------------------|---------------------------------|----------|
| Bell icon visible on all authenticated pages     | TC_SCRUM290_001, 002            | Critical |
| Bell opens dropdown without reload               | TC_SCRUM290_003, 004            | Critical |
| View All navigates to full page                  | TC_SCRUM290_005                 | High     |
| Notifications in reverse chronological order     | TC_SCRUM290_006, 007            | High     |
| Unread visually distinguishable                  | TC_SCRUM290_008, 009            | High     |
| Unread count badge accurate                      | TC_SCRUM290_010                 | Critical |
| Mark individual as read                          | TC_SCRUM290_011                 | High     |
| Mark all read                                    | TC_SCRUM290_012                 | High     |
| Read status persists                             | TC_SCRUM290_013                 | High     |
| Dismiss notification                             | TC_SCRUM290_014, 015            | High     |
| Click navigates to context                       | TC_SCRUM290_016                 | High     |
| Private to logged-in user                        | TC_SCRUM290_017                 | Critical |
| Empty state handled                              | TC_SCRUM290_018                 | Medium   |
| Keyboard accessible                              | TC_SCRUM290_019                 | High     |
| Mobile viewport                                  | TC_SCRUM290_020                 | Medium   |
| Performance < 3s                                 | TC_SCRUM290_021                 | High     |
| Count updates after action                       | TC_SCRUM290_022                 | High     |

### Accessibility (20 Test Cases)

| WCAG Criteria                                    | Test Case(s)                    | Priority |
|--------------------------------------------------|---------------------------------|----------|
| Accessible name on bell icon                     | TC_A11Y_001                     | Critical |
| Keyboard focusable                               | TC_A11Y_002, 011, 012, 013     | Critical |
| Screen reader badge text                         | TC_A11Y_003                     | High     |
| Dropdown ARIA role                               | TC_A11Y_004, 005, 006          | High     |
| Heading structure                                | TC_A11Y_007                     | High     |
| Semantic markup                                  | TC_A11Y_008                     | High     |
| Color independence (1.4.1)                       | TC_A11Y_009                     | Critical |
| Text alternatives (1.1.1)                        | TC_A11Y_010                     | High     |
| Zoom/reflow (1.4.4, 1.4.10)                     | TC_A11Y_014, 015               | Medium   |
| Contrast (1.4.3)                                 | TC_A11Y_016                     | High     |
| Focus visible (2.4.7)                            | TC_A11Y_017                     | High     |
| Empty/error state                                | TC_A11Y_018, 019               | Medium   |
| Live region (4.1.3)                              | TC_A11Y_020                     | High     |

---

## 3. Test Data Requirements

| Data Item          | Value / Description                          |
|--------------------|----------------------------------------------|
| PwD email          | `candidate8new1@mailto.plus`                 |
| PwD password       | `123456`                                     |
| Base URL           | `https://qa-atad.swarajability.org/`         |
| Notifications URL  | `https://qa-atad.swarajability.org/notifications/` |
| Desktop viewport   | 1280×720                                     |
| Mobile viewport    | 375×667                                      |

---

## 4. Assumptions & Dependencies

- The PwD account has at least some notifications (or the empty state is testable).
- Authentication uses the existing SSO flow via `auth-d.swarajability.org`.
- The notification bell icon is in the global header on all authenticated pages.
- The `/notifications/` URL is the full notifications page (may differ — tests handle gracefully).
- Notification types (Recommendations, Price Drop, Availability, Stories) may not all be present for the test account.
- **Dependency**: ProfilePage.ts login method is reused for PwD authentication.
- **Dependency**: SCRUM-293 covers profile management; SCRUM-290 covers notifications.

---

## 5. Files Created

| File | Path |
|------|------|
| Functional spec | `tests/functional/pwd/scrum290-pwd-notifications.spec.ts` |
| Accessibility spec | `tests/accessibility/pwd/scrum290-pwd-notifications.spec.ts` |
| Test cases JSON | `specs/test-cases/pwd/scrum290-pwd-notifications.json` |
| This document | `specs/functional/pwd/SCRUM-290-pwd-notifications.md` |
