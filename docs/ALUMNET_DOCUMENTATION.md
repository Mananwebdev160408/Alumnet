# AlumNet Technical Documentation

## Centralized Institutional Mentorship Platform

---

**Version:** 1.0.0  
**Last Updated:** April 2026  
**Stack:** MERN (MongoDB/Express/React/Node.js) + Firebase (Authentication/Storage/Firestore)

---

## Table of Contents

1. [Executive Summary & Vision](#1-executive-summary--vision)
2. [User Roles & Permissions Matrix](#2-user-roles--permissions-matrix)
3. [Page-Level Functional Requirements](#3-page-level-functional-requirements)
4. [Technical Architecture](#4-technical-architecture)
5. [UI/UX Philosophy](#5-ux-philosophy)
6. [Future Roadmap](#6-future-roadmap)

---

## 1. Executive Summary & Vision

### 1.1 Platform Overview

AlumNet is a **closed-loop, institutional-exclusive SaaS mentorship platform** designed to bridge the gap between academic institutions and their alumni networks. Unlike open platforms like LinkedIn, AlumNet operates on **verified institutional trust**—every member is pre-validated through their college or university.

### 1.2 The Closed-Loop Ecosystem

The "Closed-Loop" concept addresses the fundamental friction in traditional networking:

| Aspect | Traditional Platforms (LinkedIn) | AlumNet |
|--------|----------------------------------|---------|
| **Verification** | Self-reported, easily faked | Institution-verified alumni |
| **Network Quality** | Noise-heavy, spam-filled | Curated, trusted connections |
| **Mentorship Intent** | Transactional job hunting | Genuine career guidance |
| **Privacy** | Public profile mandatory | Granular privacy controls |
| **Alumni Exclusivity** | None | Institution-locked |

### 1.3 Value Proposition

- **For Students:** Direct access to verified alumni mentors, internship referrals, and career guidance
- **For Alumni:** Meaningful way to give back, source quality referrals, build legacy
- **For Institutions:** Centralized alumni engagement platform, measurable mentorship outcomes
- **For Employers:** Direct pipeline to institution-verified talent

---

## 2. User Roles & Permissions Matrix

### 2.1 Role Hierarchy

```
┌─────────────────────────────────────────┐
│           SUPER ADMIN (Platform)         │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐ │
│  │      COLLEGE ADMIN (Per College)   │ │
│  ├─────────────────────────────────────┤ │
│  │  ALUMNI         │      STUDENTS     │ │
│  └─────────────────┴──────────────────┘ │
└─────────────────────────────────────────┘
```

### 2.2 Detailed Permissions Matrix

| Feature | Super Admin | College Admin | Alumni | Student |
|---------|-------------|---------------|--------|---------|
| **Platform Management** | | | | |
| Create/manage colleges | ✅ | ❌ | ❌ | ❌ |
| Platform-wide analytics | ✅ | ❌ | ❌ | ❌ |
| **College Management** | | | | |
| Manage college settings | ✅ | ✅ | ❌ | ❌ |
| Approve College Admins | ✅ | ❌ | ❌ | ❌ |
| Manage college users | ✅ | ✅ | ❌ | ❌ |
| **User Management** | | | | |
| View all users | ✅ | College-only | ❌ | ❌ |
| Invite users | ✅ | ✅ | ❌ | ❌ |
| Suspend/remove users | ✅ | ✅ | ❌ | ❌ |
| **Directory Access** | | | | |
| Search all alumni | ✅ | ✅ | ✅ | ✅ |
| View full profiles | ✅ | ✅ | ✅ | ✅ |
| Filter by college | ✅ | ✅ | ✅ | ✅ |
| **Connections** | | | | |
| Send connection requests | ✅ | ✅ | ✅ | ✅ |
| Accept/decline requests | ✅ | ✅ | ✅ | ✅ |
| View connection list | ✅ | ✅ | ✅ | ✅ |
| **Mentorship** | | | | |
| Become a mentor | ✅ | ✅ | ✅ | ❌ |
| Book mentorship sessions | ✅ | ✅ | ✅ | ✅ |
| View mentor directory | ✅ | ✅ | ✅ | ✅ |
| Manage availability slots | ✅ | ✅ | ✅ | ❌ |
| **Messaging** | | | | |
| Real-time chat | ✅ | ✅ | ✅ | ✅ |
| Send messages | ✅ | ✅ | ✅ | ✅ |
| Video call integration | ✅ | ✅ | ✅ | ✅ |
| **Referral Portal** | | | | |
| Post job referrals | ✅ | ✅ | ✅ | ❌ |
| Apply to referrals | ✅ | ✅ | ✅ | ✅ |
| Manage posted referrals | ✅ | ✅ | ✅ | ❌ |
| **Settings & Profile** | | | | |
| Edit own profile | ✅ | ✅ | ✅ | ✅ |
| Privacy settings | ✅ | ✅ | ✅ | ✅ |
| Notification preferences | ✅ | ✅ | ✅ | ✅ |
| Theme customization | ✅ | ✅ | ✅ | ✅ |

### 2.3 Role-Specific Capabilities

#### Super Admin
- Full platform administrative control
- Manage all colleges and institutions
- Access cross-institution analytics
- Configure platform-wide settings
- Manage subscription tiers

#### College Admin
- Manage users within their assigned college(s)
- Approve new alumni/student accounts
- View college-specific analytics
- Configure college branding
- Moderate college content

#### Alumni
- Full profile creation and editing
- Offer mentorship sessions
- Post job referrals
- Connect with other alumni and students
- Participate in messaging

#### Student
- Basic profile with graduation year/major
- Browse alumni directory
- Request mentorship sessions
- Apply to job referrals
- Connect with alumni

---

## 3. Page-Level Functional Requirements

### 3.1 Onboarding: Institutional-Led Provisioning System

#### 3.1.1 Invite-Only Logic Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    ONBOARDING WORKFLOW                      │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│  │ Institution │    │   College   │    │    User     │       │
│  │  Application│───▶│    Admin    │───▶│   Invite    │       │
│  │   (Apply)   │    │   Created   │    │   Sent      │       │
│  └─────────────┘    └─────────────┘    └─���───────────┘       │
│         │                                       │            │
│         ▼                                       ▼            │
│  ┌─────────────┐                        ┌─────────────┐       │
│  │  Approval   │                        │   Account   │       │
│  │  Pending    │                        │  Activation│       │
│  └─────────────┘                        └─────────────┘       │
│         │                                       │            │
│         ▼                                       ▼            │
│  ┌─────────────┐                        ┌─────────────┐       │
│  │ Institution │                        │    Role     │       │
│  │  Onboarded  │                        │  Assigned   │       │
│  └─────────────┘                        └─────────────┘       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

#### 3.1.2 Key Onboarding Features

| Step | Feature | Description |
|------|---------|-------------|
| 1 | **Institution Application** | Multi-step form collecting institutional details, POC information, verification documents |
| 2 | **Verification Processing** | Admin review of accreditation documents |
| 3 | **College Admin Creation** | First admin account provisioned automatically |
| 4 | **Bulk User Import** | CSV upload capability for alumni/student rosters |
| 5 | **Individual Invites** | Email-based invite links with expiration |
| 6 | **Role Assignment** | Automatic role assignment based on invite type |

#### 3.1.3 Invite Link Structure

```
/invite/:collegeId/:role/:token
```

- **collegeId**: Encrypted institution identifier
- **role**: `alumni` | `student` | `college-admin`
- **token**: Time-limited JWT with 7-day expiration

---

### 3.2 Alumni Discovery: Search/Filter Engine

#### 3.2.1 Directory Page Features

| Filter Category | Options | Behavior |
|-----------------|---------|----------|
| **Industry** | Technology, Finance, Healthcare, Marketing, Consulting, etc. | Multi-select dropdown |
| **Company** | Auto-populated from user profiles | Type-ahead search |
| **Graduation Year** | Range slider (e.g., 2010-2025) | Inclusive range |
| **Expertise** | Skills tags from profiles | Multi-select with autocomplete |
| **Location** | City, Country, Remote | Geolocation-aware |
| **Mentorship Availability** | Available Now, Schedule-based | Toggle filter |

#### 3.2.2 Search Implementation

- **Real-time search** across name, company, occupation, skills
- **Fuzzy matching** for typo tolerance
- **Relevance scoring** based on profile completeness
- **Pagination** with infinite scroll option

#### 3.2.3 Directory View Modes

1. **Grid View**: Visual card-based layout with avatar, name, company, graduation year
2. **List View**: Compact table format for quick scanning
3. **Map View** (Future): Geographic distribution visualization

#### 3.2.4 Search Results Display

Each result card displays:
- Profile avatar (with institution verification badge)
- Full name and graduation year ("Class of '23")
- Current occupation and company
- Top 3 skills/expertise tags
- Mentorship availability indicator
- "Connect" and "View Profile" actions

---

### 3.3 Mentorship Module: Slot-Based Scheduling System

#### 3.3.1 Session Booking Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   MENTORSHIP BOOKING FLOW                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Student              Platform              Mentor            │
│    │                     │                    │               │
│    │  Browse Mentors     │                    │               │
│    │────────────────────▶│                    │               │
│    │                     │                    │               │
│    │  Select Mentor     │                    │               │
│    │────────────────────▶│                    │               │
│    │                     │                    │               │
│    │  View Availability  │                    │               │
│    │◀────────────────────│                    │               │
│    │                     │                    │               │
│    │  Select Time Slot   │                    │               │
│    │────────────────────▶│                    │               │
│    │                     │                    │               │
│    │                     │──── Notify ───────▶│               │
│    │                     │                    │               │
│    │  Confirmation       │                    │               │
│    │◀────────────────────│                    │               │
│    │                     │                    │               │
│    │  Calendar Updated   │                    │               │
│    │                     │                    │               │
│    │  Join Video Call    │                    │               │
│    │◀────────────────────│◀─── Video Link ────│               │
│    │                     │                    │               │
└─────────────────────────────────────────────────────────────┘
```

#### 3.3.2 Availability Management

| Feature | Description |
|---------|-------------|
| **Weekly Templates** | Recurring availability patterns |
| **One-time Blocks** | Vacation, special events |
| **Buffer Time** | Configurable break between sessions (15-60 min) |
| **Max Sessions/Week** | Prevent overbooking (default: 10) |
| **Session Duration** | 30, 45, 60 minute options |

#### 3.3.3 Slot System Rules

- Slots are 30-minute increments
- Double-booking prevention enforced
- Automatic timezone conversion for global users
- Cancellation policy: 24-hour advance notice
- Reschedule requests with mutual consent

#### 3.3.4 Video Call Integration

| Integration | Provider |
|------------|----------|
| **Primary Video** | Google Meet API |
| **Fallback** | Zoom SDK |
| **Recording** | Optional, with consent |
| **Screen Share** | Enabled by default |

---

### 3.4 Referral Portal: Job Referral Workflow

#### 3.4.1 Referral Posting Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   REFERRAL WORKFLOW                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Alumni                    Platform              Students    │
│    │                          │                     │         │
│    │  Create Referral         │                     │         │
│    │─────────────────────────▶│                     │         │
│    │                          │                     │         │
│    │  Validation              │                     │         │
│    │─────────────────────────▶│                     │         │
│    │                          │                     │         │
│    │  Published               │                     │         │
│    │◀─────────────────────────│                     │         │
│    │                          │                     │         │
│    │                          │  Notify Matching    │         │
│    │                          │────────────────────▶│         │
│    │                          │                     │         │
│    │  View Applications      │                     │         │
│    │◀─────────────────────────│◀────────────────────│         │
│    │                          │                     │         │
│    │  Review & Refer          │                     │         │
│    │─────────────────────────▶│                     │         │
│    │                          │                     │         │
│    │  Status Updates          │                     │         │
│    │◀─────────────────────────│◀────────────────────│         │
│    │                          │                     │         │
└─────────────────────────────────────────────────────────────┘
```

#### 3.4.2 Referral Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Job Title | Text | Yes | 5-100 characters |
| Company | Text | Yes | Auto-complete from database |
| Location | Text | Yes | City, Country or "Remote" |
| Employment Type | Select | Yes | Full-time, Part-time, Internship, Contract |
| Job URL | URL | Yes | Valid URL format |
| Application Deadline | Date | Yes | Future date only |
| Description | Rich Text | Yes | Min 200 characters |
| Target Majors | Multi-select | No | Department filtering |
| Target Graduation Year | Range | No | Class year filtering |
| Referral Instructions | Text | No | Internal notes for applicants |

#### 3.4.3 Referral Status Tracking

| Status | Description |
|--------|-------------|
| **Open** | Accepting applications |
| **In Review** | Alumni reviewing candidates |
| **Referred** | Student referred to company |
| **Closed** | Position filled or deadline passed |
| **Expired** | Automatically closed after deadline |

---

### 3.5 Communication Hub: Real-time Chat Mechanics

#### 3.5.1 Chat Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   MESSAGING ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │ Client  │────▶│ Firebase    │────▶│ Cloud       │       │
│  │ (React) │◀────│ Realtime DB │◀────│ Functions   │       │
│  └─────────┘     └─────────────┘     └─────────────┘       │
│       │                                      │               │
│       │           ┌─────────────┐            │               │
│       └──────────▶│ Firestore   │◀───────────┘               │
│                   │ (Messages) │                             │
│                   └─────────────┘                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### 3.5.2 Messaging Features

| Feature | Implementation |
|---------|-----------------|
| **Real-time sync** | Firebase Realtime Database listeners |
| **Message types** | Text, images, files, links |
| **Read receipts** | Timestamp + "seen" indicator |
| **Typing indicators** | Presence API |
| **Message search** | Firestore full-text search |
| **Media sharing** | Firebase Storage with compression |
| **Video calls** | WebRTC via Google Meet SDK |

#### 3.5.3 Conversation Management

- **Direct messages**: 1:1 between any two connected users
- **Group chats**: Up to 50 participants per group
- **Thread replies**: Reply to specific messages
- **Message reactions**: Emoji reactions
- **Starred messages**: Bookmark important conversations

#### 3.5.4 Notification Rules

| Event | Default | User Configurable |
|-------|---------|-------------------|
| New direct message | ✅ | ✅ |
| New group message | ❌ | ✅ |
| @mentions | ✅ | ✅ |
| Message while offline | ✅ | ✅ |
| Batch notifications | Every 15 min | ✅ |

---

## 4. Technical Architecture

### 4.1 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                              │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    React 19 + TypeScript                      │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │    │
│  │  │ TanStack│ │ React   │ │ shadcn/ │ │ Framer  │            │    │
│  │  │  Query  │ │  Router │ │   UI    │ │  Motion │            │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘            │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND LAYER                               │
│  ┌────────────────────┐    ┌────────────────────────────────────┐  │
│  │  Firebase Services  │    │        Node.js + Express API        │  │
│  │  ┌───────────────┐  │    │  ┌─────────┐ ┌─────────┐           │  │
│  │  │ Authentication│  │    │  │   API   │ │  Socket │           │  │
│  │  │  (Auth)       │  │    │  │Routes   │ │  Server │           │  │
│  │  └───────────────┘  │    │  └─────────┘ └─────────┘           │  │
│  │  ┌───────────────┐  │    │  ┌─────────────────────────────┐  │  │
│  │  │ Cloud Firestore│  │    │  │      Middleware Layer       │  │  │
│  │  │  (Database)    │  │    │  │  ┌─────────┐ ┌─────────┐   │  │  │
│  │  └───────────────┘  │    │  │  │   Auth  │ │  Rate   │   │  │  │
│  │  ┌───────────────┐  │    │  │  │  Guard  │ │ Limit   │   │  │  │
│  │  │ Cloud Storage │  │    │  │  └─────────┘ └─────────┘   │  │  │
│  │  │  (Files)      │  │    │  └─────────────────────────────┘  │  │
│  │  └───────────────┘  │    └────────────────────────────────────┘  │
│  │  ┌───────────────┐  │                                             │
│  │  │ Cloud Functions│ │                                             │
│  │  │  (Serverless) │  │                                             │
│  │  └───────────────┘  │                                             │
│  └────────────────────┘                                             │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Database Schema Overview

#### 4.2.1 Firestore Collections

##### Users Collection
```
/users/{userId}
```

| Field | Type | Description |
|-------|------|-------------|
| `uid` | string | Firebase Auth user ID |
| `email` | string | User email address |
| `name` | string | Display name |
| `role` | enum | `super_admin`, `college_admin`, `alumni`, `student` |
| `collegeId` | string | Reference to college document |
| `collegeName` | string | Denormalized college name |
| `avatar` | string | URL to profile image |
| `graduationYear` | number | Year of graduation |
| `branch` | string | Major/department |
| `occupation` | string | Current job title |
| `company` | string | Current employer |
| `bio` | string | User biography |
| `skills` | array | List of skill tags |
| `linkedin` | string | LinkedIn profile URL |
| `personalWebsite` | string | Personal portfolio URL |
| `location` | string | City, Country |
| `isMentor` | boolean | Can offer mentorship |
| `mentorSlots` | object | Availability configuration |
| `createdAt` | timestamp | Account creation date |
| `updatedAt` | timestamp | Last profile update |
| `lastActiveAt` | timestamp | Last activity timestamp |
| `isVerified` | boolean | Account verification status |
| `privacySettings` | object | User privacy preferences |

##### Colleges Collection
```
/colleges/{collegeId}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Full institution name |
| `shortName` | string | Abbreviated name |
| `slug` | string | URL-friendly identifier |
| `logo` | string | Institution logo URL |
| `website` | string | Official website |
| `location` | string | City, Country |
| `type` | enum | `university`, `college`, `institute` |
| `adminIds` | array | List of admin user IDs |
| `stats` | object | Aggregated statistics |
| `settings` | object | College-specific settings |
| `createdAt` | timestamp | Onboarding date |
| `isActive` | boolean | Platform access status |
| `subscriptionTier` | enum | `free`, `premium`, `enterprise` |

##### Sessions Collection
```
/sessions/{sessionId}
```

| Field | Type | Description |
|-------|------|-------------|
| `mentorId` | string | Mentor user reference |
| `studentId` | string | Student user reference |
| `collegeId` | string | Institution reference |
| `scheduledAt` | timestamp | Session start time |
| `duration` | number | Duration in minutes |
| `status` | enum | `pending`, `confirmed`, `completed`, `cancelled` |
| `meetingLink` | string | Video call URL |
| `notes` | string | Session notes |
| `feedback` | object | Post-session feedback |
| `createdAt` | timestamp | Booking timestamp |
| `updatedAt` | timestamp | Last modification |

##### Referrals Collection
```
/referrals/{referralId}
```

| Field | Type | Description |
|-------|------|-------------|
| `postedBy` | string | Alumni user reference |
| `collegeId` | string | Institution reference |
| `title` | string | Job title |
| `company` | string | Company name |
| `location` | string | Job location |
| `employmentType` | enum | Job type |
| `jobUrl` | string | Application URL |
| `deadline` | timestamp | Application deadline |
| `description` | string | Job description |
| `targetMajors` | array | Recommended majors |
| `targetYears` | array | Target graduation years |
| `status` | enum | `open`, `in_review`, `referred`, `closed` |
| `applications` | array | List of applicants |
| `createdAt` | timestamp | Posting date |
| `updatedAt` | timestamp | Last modification |

##### Connections Collection
```
/connections/{connectionId}
```

| Field | Type | Description |
|-------|------|-------------|
| `requesterId` | string | User who sent request |
| `recipientId` | string | User who received request |
| `status` | enum | `pending`, `accepted`, `declined` |
| `createdAt` | timestamp | Request timestamp |
| `updatedAt` | timestamp | Status change timestamp |

##### Messages Collection
```
/conversations/{conversationId}/messages/{messageId}
```

| Field | Type | Description |
|-------|------|-------------|
| `senderId` | string | Message sender |
| `content` | string | Message text |
| `type` | enum | `text`, `image`, `file`, `link` |
| `mediaUrl` | string | Attached media URL |
| `readBy` | array | Users who read message |
| `createdAt` | timestamp | Send timestamp |
| `editedAt` | timestamp | Last edit timestamp |
| `reactions` | object | Emoji reactions |

### 4.3 Firebase Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User                    Firebase                 App         │
│   │                          │                       │       │
│   │  Sign In Request         │                       │       │
│   │─────────────────────────▶│                       │       │
│   │                          │                       │       │
│   │  Verify Credentials      │                       │       │
│   │─────────────────────────▶│                       │       │
│   │                          │                       │       │
│   │  ID Token Generated      │                       │       │
│   │◀─────────────────────────│                       │       │
│   │                          │                       │       │
│   │  ID Token                │                       │       │
│   │─────────────────────────▶│                       │       │
│   │                          │                       │       │
│   │  Fetch User Profile      │                       │       │
│   │─────────────────────────▶│                       │       │
│   │                          │                       │       │
│   │  User Context + Role     │                       │       │
│   │◀─────────────────────────│                       │       │
│   │                          │                       │       │
│   │  Route Protection        │                       │       │
│   │  Evaluation              │                       │       │
│   │◀─────────────────────────│                       │       │
│   │                          │                       │       │
│   │  Authenticated Access    │                       │       │
│   │◀─────────────────────────│───────────────────────▶│       │
│   │                          │                       │       │
└─────────────────────────────────────────────────────────────┘
```

#### Auth Implementation

```typescript
// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Auth State Observer Pattern
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const role = userDoc.data()?.role || "alumni";
    setUserRole(role);
  }
});
```

### 4.4 API Design Principles

#### 4.4.1 RESTful Endpoint Structure

```
Base URL: /api/v1

Resources:
  /auth          - Authentication operations
  /users         - User management
  /colleges      - College management
  /sessions      - Mentorship sessions
  /referrals     - Job referrals
  /connections   - Network connections
  /messages      - Messaging
  /analytics     - Platform analytics
```

#### 4.4.2 Endpoint Examples

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/colleges` | List all colleges |
| `GET` | `/api/v1/colleges/:id` | Get college details |
| `POST` | `/api/v1/colleges` | Create new college |
| `PATCH` | `/api/v1/colleges/:id` | Update college |
| `DELETE` | `/api/v1/colleges/:id` | Delete college |
| `GET` | `/api/v1/users?role=alumni&collegeId=x` | Filter users |
| `GET` | `/api/v1/users/:id` | Get user profile |
| `PATCH` | `/api/v1/users/:id` | Update profile |
| `POST` | `/api/v1/sessions` | Book mentorship |
| `PATCH` | `/api/v1/sessions/:id/status` | Update session status |
| `GET` | `/api/v1/referrals?status=open` | List open referrals |
| `POST` | `/api/v1/referrals/:id/apply` | Apply to referral |

#### 4.4.3 Response Format

```json
{
  "success": true,
  "data": { },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  },
  "message": "Operation successful"
}
```

#### 4.4.4 Error Handling

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

---

## 5. UI/UX Philosophy

### 5.1 Industrial Productivity Aesthetic

AlumNet embraces an **"Industrial Productivity"** design philosophy—a fusion of brutalist architecture-inspired boldness with professional software ergonomics. The interface prioritizes **information density** without sacrificing clarity.

### 5.2 Design Principles

| Principle | Implementation |
|-----------|----------------|
| **High Density** | Compact layouts, efficient use of space, maximum data visibility |
| **Dark Mode Capability** | Full dark theme support with automatic system detection |
| **Professional Ergonomics** | Minimal clicks, intuitive keyboard navigation, accessible shortcuts |
| **Visual Hierarchy** | Clear information layers, consistent spacing system |
| **Trust Indicators** | Verification badges, institution logos, security notices |

### 5.3 Color System

#### Light Theme
| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#D43D61` | CTAs, active states, brand accents |
| Secondary | Variable | Supporting actions |
| Background | `#FFFFFF` | Page backgrounds |
| Surface | `#F5F5F5` | Cards, elevated surfaces |
| Border | `#E5E5E5` | Dividers, outlines |
| Text Primary | `#1A1A1A` | Headings, important text |
| Text Secondary | `#666666` | Body text, descriptions |

#### Dark Theme
| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#E84871` | CTAs with higher contrast for dark backgrounds |
| Background | `#0A0A0A` | Page backgrounds |
| Surface | `#1A1A1A` | Cards, elevated surfaces |
| Border | `#2A2A2A` | Dividers, outlines |
| Text Primary | `#FAFAFA` | Headings, important text |
| Text Secondary | `#A0A0A0` | Body text, descriptions |

### 5.4 Typography System

| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| H1 | System Serif | Bold | 48-60px | Tight (-0.02em) |
| H2 | System Serif | Bold | 36-48px | Tight (-0.02em) |
| H3 | System Sans | Black | 24px | Normal |
| Body | System Sans | Medium | 14-16px | Normal |
| Caption | System Sans | Bold | 10-12px | Wide (0.1em) |
| Badge | System Sans | Black | 10px | Wider (0.2em) |

### 5.5 Component Patterns

#### Cards
- Sharp corners (border-radius: 0) for brutalist aesthetic
- Heavy borders (2-4px solid)
- Drop shadows with offset (no blur)
- Grayscale-to-color hover transitions on images

#### Buttons
- Bold uppercase labels with wide letter-spacing
- Press-down transforms on interaction
- Heavy shadows that collapse on click
- High contrast between primary and secondary actions

#### Forms
- Full-width inputs with bold borders
- Clear focus states with primary color
- Inline validation feedback
- Generous padding for touch targets

#### Navigation
- Persistent sidebar on desktop
- Bottom navigation on mobile
- Command palette (Cmd+K) for power users
- Breadcrumb trail for deep navigation

### 5.6 Interaction Design

| Pattern | Description |
|---------|-------------|
| **Hover States** | Subtle lift effect with shadow expansion |
| **Loading States** | Skeleton screens with pulse animation |
| **Transitions** | 300-500ms with custom easing curves |
| **Gestures** | Swipe actions on mobile cards |
| **Keyboard Nav** | Full tab navigation support |
| **Shortcuts** | Global command palette, contextual actions |

### 5.7 Accessibility Standards

- WCAG 2.1 AA compliance minimum
- Keyboard navigation throughout
- Screen reader friendly labels
- Color contrast ratios ≥ 4.5:1
- Focus indicators on all interactive elements
- Reduced motion support

---

## 6. Future Roadmap

### 6.1 Phase 1: AI-Powered Features (Q3 2026)

#### 6.1.1 Agentic AI Mentorship Matching

```
┌─────────────────────────────────────────────────────────────┐
│              AI MENTORSHIP MATCHING SYSTEM                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Student Profile          AI Engine          Mentor Profile  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │ Skills      │    │             │    │ Expertise   │     │
│  │ Goals       │───▶│   Matching  │◀───│ Availability│     │
│  │ Industry    │    │   Algorithm │    │ Teaching    │     │
│  │ Personality │    │             │    │ Style       │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                            │                                 │
│                            ▼                                 │
│                    ┌─────────────┐                          │
│                    │  Match Score│                          │
│                    │  + Reasoning│                          │
│                    └─────────────┘                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Algorithm Components:**
- **Skill Gap Analysis**: Identifies areas where student needs growth
- **Experience Matching**: Aligns mentor expertise with student goals
- **Availability Syncing**: Finds mutually available time slots
- **Personality Compatibility**: MBTI/flavor-based matching
- **Success Probability Scoring**: Historical outcome prediction

#### 6.1.2 AI-Assisted Resume Auditing

| Feature | Description |
|---------|-------------|
| **Resume Analysis** | Upload PDF/DOCX for instant feedback |
| **ATS Optimization** | Keyword matching and formatting suggestions |
| **Content Improvement** | Action verb suggestions, quantification guidance |
| **Industry Alignment** | Tailoring tips for specific roles |
| **Comparison Tool** | Side-by-side resume vs. job description |
| **Version History** | Track improvements over time |

**AI Model Integration:**
- Custom fine-tuned model for career documents
- Integration with LinkedIn profile data
- Industry-specific resume templates
- Real-time suggestions as user types

### 6.2 Phase 2: Platform Expansion (Q4 2026)

#### 6.2.1 Mobile Application

- Native iOS/Android apps
- Offline-first architecture
- Push notifications with intelligent batching
- Widget support for quick actions

#### 6.2.2 Enterprise Features

- SSO integration (SAML, OIDC)
- Custom branding for institutions
- API access for HR systems
- Analytics dashboards for institutions
- Bulk user management

### 6.3 Phase 3: Community Features (2027)

#### 6.3.1 Alumni Events

- Virtual and hybrid event hosting
- Calendar integration
- RSVP management
- Networking breakout rooms

#### 6.3.2 Alumni Marketplace

- Career services marketplace
- Mentorship package purchases
- Alumni directory premium features
- Verified credential badges

---

## Appendix A: Environment Configuration

### Firebase Setup

Create a `.env` file with the following variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can read their own data and all users can read basic info
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId 
                   || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super_admin';
    }
    
    // College admins can manage their college's users
    match /users/{userId} {
      allow create: if request.auth != null 
                    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['super_admin', 'college_admin'];
      allow update: if request.auth.uid == userId 
                    || (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'college_admin' 
                        && resource.data.collegeId == request.resource.data.collegeId);
    }
    
    // Colleges - Super admins only
    match /colleges/{collegeId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super_admin';
    }
    
    // Sessions - participants and college admins
    match /sessions/{sessionId} {
      allow read: if request.auth.uid in [resource.data.mentorId, resource.data.studentId] 
                  || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['super_admin', 'college_admin'];
      allow create: if request.auth != null;
      allow update: if request.auth.uid in [resource.data.mentorId, resource.data.studentId];
    }
    
    // Messages - conversation participants only
    match /conversations/{conversationId}/messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

---

## Appendix B: Deployment Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] Firebase security rules tested
- [ ] Email verification enabled
- [ ] Storage bucket configured
- [ ] Domain whitelisted

### Production
- [ ] Build completes without errors: `npm run build`
- [ ] TypeScript compilation passes: `npm run typecheck`
- [ ] ESLint passes: `npm run lint`
- [ ] All environment variables set in production
- [ ] CDN assets optimized
- [ ] Monitoring and logging configured

---

**End of Documentation**