# AlumNet Page Specifications & Route Matrix

This document outlines the front-end page layouts, routes, and core functionalities for each user role in the AlumNet platform.

---

## Table of Contents
- [Student Pages](#student-pages)
- [Alumni Pages](#alumni-pages)
- [College Admin Pages](#college-admin-pages)
- [System Admin Pages](#system-admin-pages)

---

## Student Pages
These pages are accessible only to authenticated users with the `student` role. Routes are prefixed with `/student`.

| # | Page | Route | Description / Core Features |
|---|------|-------|-----------------------------|
| 1 | **Student Dashboard** | `/student/dashboard` | Main landing hub after login. Shows pending connection requests, upcoming mentorship sessions, active referral statuses, recommended alumni, upcoming events, and announcements. |
| 2 | **Alumni Directory** | `/student/alumni` | Search and filter verified alumni by company, domain, graduation year, location, and mentoring/referral availability. |
| 3 | **Alumni Profile** | `/student/alumni/:alumniId` | Detailed profile of an alumnus. Shows bio, expertise tags, endorsements, average rating, and actions: connect, book mentorship, or request referral. |
| 4 | **My Connections** | `/student/connections` | List of all connected alumni with links to message or book sessions. Includes pending sent requests. |
| 5 | **Send Connection Request** | `/student/alumni/:alumniId/connect` | Modal/page to write a short note (max 150 chars) and send a connection request. |
| 6 | **Messages / Chat** | `/student/messages` | Inbox listing all active conversations sorted by latest message. Supports text, emojis, and file sharing. |
| 7 | **Chat Window** | `/student/messages/:conversationId` | 1:1 real-time messaging interface with read receipts. |
| 8 | **Book Mentorship** | `/student/mentorship/book/:alumniId` | Calendar view of available slots for selecting, specifying agenda (max 200 chars), and booking. |
| 9 | **My Mentorship Sessions** | `/student/mentorship` | View upcoming and past mentorship sessions, with feedback and review forms for past sessions. |
| 10 | **Request Referral** | `/student/referral/new/:alumniId` | Form to request a job referral. Includes target role, job link, resume upload, and pitch (max 300 chars). |
| 11 | **My Referral Requests** | `/student/referrals` | Track status of sent referrals: *Pending, Under Review, Referred, Declined*, or *Expired*. |
| 12 | **Job Board** | `/student/jobs` | Browse jobs and internships posted by verified alumni. Filterable by type, company, and location. |
| 13 | **Job Detail & Apply** | `/student/jobs/:jobId` | Detailed job descriptions with one-click application sending resume and profile info. |
| 14 | **My Applications** | `/student/applications` | Track application status: *Applied, Viewed, Shortlisted*, or *Rejected*. |
| 15 | **Events** | `/student/events` | Browse upcoming institutional events (webinars, career fairs, etc.). |
| 16 | **Event Detail & RSVP** | `/student/events/:eventId` | View event agenda, speakers, date, and RSVP. Access recordings and resources for past events. |
| 17 | **My Profile** | `/student/profile` | Editable student profile containing bio, interests, projects, resume, and privacy controls. |
| 18 | **Notifications** | `/student/notifications` | Feed of in-app notifications (connection actions, messages, session confirmations, referral updates). |
| 19 | **Settings** | `/student/settings` | Account configurations: passwords, email digests, privacy toggles, and deletion requests. |

---

## Alumni Pages
These pages are accessible only to authenticated users with the `alumni` role. Routes are prefixed with `/alumni`.

| # | Page | Route | Description / Core Features |
|---|------|-------|-----------------------------|
| 1 | **Alumni Dashboard** | `/alumni/dashboard` | Main hub showing pending connections, upcoming sessions, pending referral requests, new messages, and college events. |
| 2 | **My Profile** | `/alumni/profile` | Editable profile. Features toggles for **Open to Mentor** (with weekly slot setup) and **Open to Refer** (with target companies). |
| 3 | **Connection Requests** | `/alumni/connections/requests` | List of incoming student connections with student notes. Actions: *Accept* or *Decline* with feedback. |
| 4 | **My Connections** | `/alumni/connections` | List of all connected students with direct links to message them or view profiles. |
| 5 | **Messages / Chat** | `/alumni/messages` | Same inbox layout as student. Allows managing messages/requests from non-connected students. |
| 6 | **Chat Window** | `/alumni/messages/:conversationId` | 1:1 real-time messaging interface. Includes auto-reply configuration. |
| 7 | **Manage Mentorship Availability** | `/alumni/mentorship/availability` | Calendar view to set recurring weekly availability or block dates. |
| 8 | **Mentorship Requests** | `/alumni/mentorship/requests` | Approve, reschedule, or decline incoming mentorship bookings from students. |
| 9 | **My Mentorship Sessions** | `/alumni/mentorship/sessions` | View confirmed sessions (with video links), and manage student reviews or private session notes. |
| 10 | **Referral Queue** | `/alumni/referrals` | Review student referral requests: resumes, pitches, and profiles. Actions: *Accept, Chat*, or *Decline*. |
| 11 | **Post a Job** | `/alumni/jobs/new` | Post job and internship openings. Submitted for College Admin review before publishing. |
| 12 | **My Job Postings** | `/alumni/jobs` | Track and edit jobs posted by the alumnus. Shows status: *Pending Approval, Live*, or *Closed*. |
| 13 | **Events** | `/alumni/events` | List of upcoming events. Includes a toggle to mark **Available to Speak** for future events. |
| 14 | **Event Detail & RSVP** | `/alumni/events/:eventId` | View event agenda, speakers, and RSVP status. |
| 15 | **Notifications** | `/alumni/notifications` | Feed of in-app alerts (new requests, messages, session confirmations, college announcements). |
| 16 | **Settings** | `/alumni/settings` | Configure passwords, email notifications, auto-replies, and privacy rules. |

---

## College Admin Pages
These pages are accessible only to authenticated users with the `college_admin` role. Routes are prefixed with `/admin`.

| # | Page | Route | Description / Core Features |
|---|------|-------|-----------------------------|
| 1 | **Admin Dashboard** | `/admin/dashboard` | High-level metrics: user sign-ups, active users, connections, sessions, referrals, and moderation alerts. |
| 2 | **User Verification Queue** | `/admin/users/verify` | List of newly registered users awaiting verification. Actions: *Approve* or *Reject* (sends email feedback). |
| 3 | **Student Management** | `/admin/users/students` | Manage verified students. Search, filter, export lists to CSV, suspend, or remove accounts. |
| 4 | **Alumni Management** | `/admin/users/alumni` | Manage verified alumni. Search, filter, edit details, toggle availability flags, or remove. |
| 5 | **User Profile Detail** | `/admin/users/:userId` | Comprehensive admin view of any user's profile, including activity audit, warning logs, and status controls. |
| 6 | **Content Moderation** | `/admin/moderation` | Review flagged messages and profile sections. Actions: *Dismiss, Warn User, Remove Content*, or *Suspend User*. |
| 7 | **Events Management** | `/admin/events` | Create and manage college events. Track RSVPs, mark attendance, and upload post-event resources. |
| 8 | **Create / Edit Event** | `/admin/events/new` or `/:eventId/edit` | Form to set event metadata: name, type, date, capacity, online/offline, speakers (links to alumni database). |
| 9 | **Job Postings Approval** | `/admin/jobs` | Queue of job posts submitted by alumni awaiting review before publication. |
| 10 | **Announcements** | `/admin/announcements` | Publish institutional announcements as pinned dashboard banners and broadcast alerts. |
| 11 | **Analytics** | `/admin/analytics` | Charts and diagrams covering user growth, active users, top mentors, and the referral funnel. |
| 12 | **Bulk User Import** | `/admin/import` | Onboard students or alumni via CSV templates. Includes preview mode before execution. |
| 13 | **Settings** | `/admin/settings` | Institutional settings: branding, whitelisted email domains, and module toggles (e.g. disable job board). |

---

## System Admin Pages
These pages are accessible only to system super-admins. Routes are prefixed with `/sysadmin`.

| # | Page | Route | Description / Core Features |
|---|------|-------|-----------------------------|
| 1 | **System Dashboard** | `/sysadmin/dashboard` | Global statistics across all registered colleges: DAU/MAU, health metrics, and escalations. |
| 2 | **College Management** | `/sysadmin/colleges` | Manage onboarding of institutions. View, suspend, edit settings, or delete college environments. |
| 3 | **Add / Edit College** | `/sysadmin/colleges/new` or `/:collegeId/edit` | Setup institutional settings, domains, assign College Admin POCs, subscription tiers, and feature flags. |
| 4 | **Global User Management** | `/sysadmin/users` | Platform-wide user management. Override local admin decisions, reset passwords, or manage permissions. |
| 5 | **Role Management** | `/sysadmin/roles` | Assign or revoke College Admin roles for users across all institutions. |
| 6 | **Feature Flags** | `/sysadmin/features` | Manage experimental or tiered feature rollouts (e.g. group mentorship, bulk imports) per college. |
| 7 | **Audit Logs** | `/sysadmin/audit` | Comprehensive, exportable audit trail of administrative activities across the platform. |
| 8 | **Escalation Queue** | `/sysadmin/escalations` | Resolve complaints or tickets escalated by college admins. |
| 9 | **Platform Analytics** | `/sysadmin/analytics` | Cross-institution benchmark metrics: engagement averages, feature adoption, and system error rates. |
| 10 | **System Health** | `/sysadmin/health` | Live monitoring of API response times, database pools, message queues, WebSockets, and cron jobs. |
| 11 | **Settings** | `/sysadmin/settings` | Global configurations: default flags, SMTP servers, rate limits, whitelists, and platform maintenance banners. |
