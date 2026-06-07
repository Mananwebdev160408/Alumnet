# AlumNet: Closed-Loop Institutional Mentorship & Engagement Platform

[![Smart India Hackathon 2025](https://img.shields.io/badge/SIH-2025-blue.svg)](https://www.sih.gov.in/)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Firebase%20%7C%20Tailwind-orange.svg)]()
[![AI Enabled](https://img.shields.io/badge/AI-Azure%20AI%20Inference-purple.svg)]()

AlumNet is a premium, **closed-loop institutional SaaS mentorship and alumni engagement platform** developed by **Team Syntax Squad** for the **Smart India Hackathon (SIH) 2025** (Problem Statement #25017). Unlike open platforms, AlumNet operates on pre-verified institutional trust—locking connectivity exclusively within a university's verified network to deliver high-quality mentorship, job referrals, and career outcomes.

---

## 🚀 Key Features

*   **🔒 Verified Onboarding**: Institution-led invitation flows and bulk verification queues.
*   **📂 Multi-Role Architecture**: Dedicated access views for **Students**, **Alumni**, **College Admins**, and **System Super-Admins**.
*   **📅 Slot-Based Mentorship**: Availability calendar syncing, automatic timezones, and integrations for video sessions.
*   **💼 Job Referral Portal**: Exclusive job boards, application workflows, and referral queue status trackers.
*   **💬 Real-time Communication**: 1:1 chat, media uploads, auto-replies, and notification digest settings.
*   **🤖 AI-Powered Assistant**: Custom-tailored assistant powered by **Azure AI Inference** to answer platform inquiries, assist with alumni navigation, and guide users.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, React Router, TanStack Query, Tailwind CSS, shadcn/ui, Framer Motion |
| **Backend & Auth** | Firebase Authentication, Firebase Cloud Functions (v2), Node.js, Express |
| **Database & Storage** | Cloud Firestore, Cloud Storage, Firebase Realtime Database (for chat sync) |
| **AI Integration** | Azure AI Inference SDK, Github Models (GPT-4o) |

---

## 📁 Project Directory Structure

```
client/                         # Project Root
├── src/                        # Source files
│   ├── components/             # Reusable UI components & layouts
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Config, context providers, and utils
│   └── pages/                  # Page views organized by role / route
├── functions/                  # Firebase Cloud Functions (Backend APIs)
│   ├── index.js                # Cloud function handlers (e.g. AI Chat backend)
│   └── package.json            # Cloud function package config
├── scripts/                    # Database seeding & administrative scripts
├── docs/                       # Project Documentation (Route specs, tech docs)
│   ├── ALUMNET_DOCUMENTATION.md # In-depth technical architecture
│   └── pages_specification.md   # Front-end pages & route matrix
├── file.txt                    # Raw page specifications
└── package.json                # Node project configuration
```

---

## ⚙️ Development Setup

Follow these steps to run the client application and backend cloud functions locally.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [Firebase CLI](https://firebase.google.com/docs/cli) installed globally:
    ```sh
    npm install -g firebase-tools
    ```

### 1. Running the Client Locally

1.  **Install dependencies** using `npm` or `bun`:
    ```sh
    npm install
    # or
    bun install
    ```
2.  **Configure environment variables**:
    Create a `.env.local` file based on `.env.example`:
    ```env
    VITE_FIREBASE_API_KEY="your-api-key"
    VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain.firebaseapp.com"
    VITE_FIREBASE_PROJECT_ID="your-project-id"
    VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket.appspot.com"
    VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
    VITE_FIREBASE_APP_ID="your-app-id"
    VITE_AICHAT_FUNCTION_URL="http://127.0.0.1:5001/your-project-id/us-central1/aichat" # Local emulator URL
    ```
3.  **Run the development server**:
    ```sh
    npm run dev
    ```

### 2. Running Backend Cloud Functions Locally

1.  Navigate to the `functions` directory:
    ```sh
    cd functions
    ```
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Configure local secret keys. Set your `GITHUB_TOKEN` secret for the AI assistant chatbot:
    ```sh
    firebase functions:secrets:set GITHUB_TOKEN="your_github_token"
    ```
4.  Run the Firebase Emulator Suite to emulate functions locally:
    ```sh
    firebase emulators:start
    ```

### 3. Seeding the Database

To run the seeding script and populate your Firestore instance with sample mock data (students, alumni, sessions, referrals, and admin configurations):

1.  Set up the Firebase admin credentials. Make sure you place your `firebase-service-account.json` file in this directory.
2.  Run the seed script:
    ```sh
    npm run seed
    ```

---

## 📚 Further Documentation

For deeper details, consult the following documentation in the [docs](file:///c:/Users/asus/OneDrive/Documents/code%20zone/alumnet-ongoing/network-alum/client/docs) directory:

*   📖 [AlumNet Technical Documentation](file:///c:/Users/asus/OneDrive/Documents/code%20zone/alumnet-ongoing/network-alum/client/docs/ALUMNET_DOCUMENTATION.md): Database schemas, Firebase rules, API designs, onboarding workflows, and design systems.
*   🗺️ [Pages & Route Specification](file:///c:/Users/asus/OneDrive/Documents/code%20zone/alumnet-ongoing/network-alum/client/docs/pages_specification.md): Complete index of student, alumni, college admin, and system admin routes and functionalities.
