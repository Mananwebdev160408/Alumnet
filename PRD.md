
# PRD: AlumNet (SaaS Architecture)
**Project Lead:** Manan Gupta  
**Stack:** React.js, Tailwind CSS, Firebase (Auth, Firestore, Cloud Functions, Storage, FCM)  
**Architecture:** Multi-tenant B2B SaaS (Institutional Isolation)

---

## 1. System Overview
AlumNet is a high-trust, invite-only mentorship platform. It operates on a **Request-Approval-Invite** model. 
1. **Colleges** apply for access. 
2. **Super Admin** (You) approves them. 
3. **College Admins** invite their specific alumni/students via CSV. 
4. Users interact via **Real-time Chat, Video, and Scheduling.**

---

## 2. User Roles & Permissions (RBAC)
*Must be enforced via Firebase Custom Claims.*

| Role | Permissions |
| :--- | :--- |
| **Super Admin** | Full platform access; Approve/Reject/Suspend Colleges; Global Analytics. |
| **College Admin** | Manage College Profile; CSV Bulk-Upload (Users); View College Analytics. |
| **Alumni** | Edit Mentor Profile; Set Availability; Post Job Referrals; Host Video/Chat. |
| **Student** | View Alumni Directory (Internal Only); Book Sessions; Showcase Projects; Chat. |

---

## 3. Technical Module Specifications

### Module A: Institutional Lifecycle (The Gateway)
* **A1. Public Application Form:** A React form for colleges to submit data (`name`, `official_domain`, `poc_email`, `poc_name`, `documents`).
* **A2. Approval Engine:** A Super Admin view to "Approve" a college. 
    * *Trigger:* On click, a Cloud Function creates the `collegeAdmin` Auth account and sets `{ role: 'collegeAdmin', collegeId: 'AUTO_GEN_ID' }` as custom claims.
* **A3. Multi-Tenancy:** Every Firestore document (User, Chat, Session) MUST contain a `collegeId`. Security Rules must block any cross-tenant read/writes.

### Module B: The Provisioning Engine (Invite Only)
* **B1. CSV Parser:** A React component to handle `Alumni.csv` and `Student.csv`.
* **B2. Bulk Invite Cloud Function:** * Input: Array of user objects.
    * Action: `admin.auth().createUser()`, set `role` claim, and create a Firestore doc with `status: 'pending_setup'`.
    * Email: Send a "Welcome to AlumNet" email with temporary credentials via Firebase Email Extension.

### Module C: Mentorship & Interaction
* **C1. Unified Directory:** A searchable grid with filters (Batch, Company, Skill). 
    * *Agent Instruction:* Implement client-side filtering or Algolia for high performance.
* **C2. Slot-Based Scheduling:** * Alumni set a `weekly_slots` map in Firestore.
    * Students book via a "Request Session" flow. Prevents double-booking using Firestore Transactions.
* **C3. Real-time Chat:** Messaging module using Firestore `onSnapshot`. Includes timestamps and unread counters.
* **C4. Native Video Signaling:** A "Join Meeting" button that appears 5 minutes before a scheduled session. Integrates with Dyte or Jitsi React SDK.

---

## 4. Data Models (Firestore Schema)

### `Colleges` (Collection)
```typescript
{
  id: string,
  name: string,
  domain: string,
  status: "pending" | "active" | "suspended",
  adminUid: string,
  createdAt: timestamp
}
```

### `Users` (Collection)
```typescript
{
  uid: string,
  email: string,
  role: "student" | "alumni" | "collegeAdmin" | "superAdmin",
  collegeId: string,
  profile: {
    name: string,
    bio: string,
    skills: string[],
    company: string, // Alumni only
    projects: { title: string, link: string }[] // Students only
  },
  availability: Map<string, string[]>, // Day: ["09:00", "14:00"]
  status: "pending_setup" | "active"
}
```

---

## 5. Security Guardrails (For Agents)
1.  **Claim-Based Routing:** The React Router must check `auth.currentUser.getIdTokenResult()` for the `role` claim before rendering dashboards.
2.  **Firestore Rules:** * `allow read: if request.auth.token.collegeId == resource.data.collegeId;`
    * `allow write: if request.auth.token.role == 'collegeAdmin' && request.auth.token.collegeId == request.resource.data.collegeId;`
3.  **Data Validation:** All Cloud Functions must use `zod` or similar for schema validation of incoming data.

---

## 6. UI/UX Guidelines (Industrial Style)
* **Theme:** Dark/Light mode support with a preference for **Neo-Brutalism** (High contrast, sharp borders) or **Glassmorphism**.
* **Library:** Tailwind CSS + Shadcn/UI.
* **State Management:** Zustand (for Auth state and college settings).

---

---

### End of PRD
**Instructions for AI Agent:** *Please strictly adhere to the `collegeId` isolation logic. Do not allow any public signups. All user creation must happen via the Admin Provisioning Engine (Module B).*