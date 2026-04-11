
# Page-by-Page Specification: AlumNet
**Stack:** React + Tailwind + Shadcn/UI  
**Design System:** Neo-Industrial / Dark Mode / High Density

---

## 1. Public Routes

### 1.1. Landing Page (`/`)
* **Design:** Hero section with a "Glassmorphic" card showing a mock directory. Use a high-contrast "Safety Orange" or "Electric Blue" CTA.
* **Content:**
    * **Value Prop:** "The Private Mentorship Network for [College Name]."
    * **Features:** Alumni Discovery, Direct Scheduling, Built-in Video, Referral Board.
    * **CTA:** "Apply for Institutional Access" (For Colleges) and "Login" (For Students/Alumni).

### 1.2. Institutional Application (`/apply`)
* **Design:** Multi-step minimalist form with a progress bar.
* **Content:** * Fieldset: Institute Name, Location, Website, Official Email Domain.
    * Fieldset: Point of Contact Name, Designation, Official Email.
    * Fieldset: Verification Document Upload (Drag & Drop Zone).

---

## 2. Super Admin Routes (`/super-admin/*`)
*Internal isolation: Only users with `role: 'superAdmin'` claim can enter.*

### 2.1. Global Command Center (`/super-admin/dashboard`)
* **Design:** 3-column grid of metrics.
* **Content:**
    * Total Colleges (Active/Pending), Global User Count, Server Status.
    * **Pending Requests Table:** Rows with College Name, Domain, and "Quick Action" buttons (Approve/Reject).

### 2.2. College Management (`/super-admin/colleges`)
* **Design:** Filterable list of all onboarded institutions.
* **Content:** Card-based view showing College Name, Admin Name, User Limit, and "Suspend" toggle.

---

## 3. College Admin Routes (`/admin/*`)
*Internal isolation: `role: 'collegeAdmin'` + `collegeId` check.*

### 3.1. Provisioning Dashboard (`/admin/dashboard`)
* **Design:** Focused on "Batch Actions."
* **Content:**
    * **CSV Upload Zone:** Industrial-styled drag-and-drop for `students.csv` and `alumni.csv`.
    * **Invite Log:** A terminal-style scrolling window showing real-time account creation status.
    * **Quick Links:** "Edit College Profile," "View Analytics."

### 3.2. User Management (`/admin/users`)
* **Design:** High-density data table (Shadcn DataTable).
* **Content:** List of all users. Columns: Name, Role, Email, Batch, Verification Status.
* **Action:** Resend Invite, Edit Role, Revoke Access.

---

## 4. Student & Alumni Shared Routes

### 4.1. Auth: First-Time Login (`/setup-profile`)
* **Design:** Forced modal or full-page splash.
* **Content:** "Welcome to your College Network. Please set your password and complete your profile."
* **Fields:** Profile Bio, Skills (Tags), LinkedIn URL, Avatar Upload.

### 4.2. Alumni Directory (`/directory`)
* **Design:** Sidebar filters (Left) + Search bar (Top) + Alumni Grid (Center).
* **Content:**
    * **Search:** CMD+K style or persistent search bar.
    * **Cards:** Name, Company (e.g., Google), Years of Exp, Skill Tags, "Book Session" CTA.

### 4.3. Profile View (`/profile/:uid`)
* **Design:** Two-column layout. Left: Bio/Stats. Right: Activity/Portfolio.
* **Content (Alumni):** Work history, "How I can help," and "Availability Calendar" (Shadcn Calendar component).
* **Content (Student):** Academic details, "Project Showcase" (Masonry grid of project cards with GitHub links).

### 4.4. Real-time Huddle (`/messages`)
* **Design:** Three-pane layout (Conversations List | Active Chat | User Info/Files).
* **Content:** * Thread list with unread badges.
    * Chat window with bubble-less layout.
    * Right pane: "Next Meeting" details and "Schedule Call" button.

### 4.5. Meeting Room (`/meeting/:sessionId`)
* **Design:** Full-screen Video UI (via Dyte/Jitsi).
* **Content:**
    * Video grid.
    * Sidebar: Shared "Interactive Roadmap" (Whiteboard/Text).
    * "End Session" and "Provide Feedback" buttons.

---

## 5. Components Architecture (For Agents)

| Component Name | Description | Key Props |
| :--- | :--- | :--- |
| `StatusBadge` | Small dot + text (Verified/Online/Away) | `status`, `label` |
| `IndustrialButton` | Sharp-edged, high contrast button | `variant`, `isLoading` |
| `GlassCard` | Semi-transparent card with backdrop blur | `children`, `hoverEffect` |
| `CommandPalette` | Floating search for global navigation | `data` (Users/Routes) |
| `SlotSelector` | 30-min block selector for scheduling | `availableSlots`, `onSelect` |

---

## 6. Global Navigation Structure
* **Top Bar:** College Logo (Left), Search (Center), User Profile/Notifications (Right).
* **Side Nav:** Dashboard, Directory, Messages, Job Board, Settings.

---

**Instruction for Agents:** *Maintain the `#0A0A0A` and `#141414` background colors across all dashboards. Use `JetBrains Mono` for all batch years and timestamps. Ensure every page layout respects the `collegeId` scope.*