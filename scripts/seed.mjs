#!/usr/bin/env node
/**
 * AlumNet CLI Seed Script — Client SDK edition
 * ─────────────────────────────────────────────
 * Uses only the Firebase client SDK (no Admin SDK needed).
 *
 * Prerequisites
 * ─────────────
 * 1. Temporarily open Firestore Security Rules in Firebase Console:
 *      https://console.firebase.google.com/project/alumnet-c93d2/firestore/databases/-default-/rules
 *
 *    Paste this and click Publish:
 *
 *      rules_version = '2';
 *      service cloud.firestore {
 *        match /databases/{database}/documents {
 *          match /{document=**} {
 *            allow read, write: if true;
 *          }
 *        }
 *      }
 *
 * 2. Run:  npm run seed
 *
 * 3. After seeding, restore your real security rules.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Load .env.local ──────────────────────────────────────────────────────────
const envPath = resolve(__dirname, "../.env.local");

function loadEnv(filePath) {
  try {
    const raw = readFileSync(filePath, "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      const value = rest.join("=").replace(/#.*$/, "").trim().replace(/^["']|["']$/g, "");
      process.env[key.trim()] = value;
    }
    console.log("✔  Loaded .env.local");
  } catch {
    console.error("✘  Could not read .env.local — make sure it exists in client/");
    process.exit(1);
  }
}

loadEnv(envPath);

// ─── Firebase Init ────────────────────────────────────────────────────────────
const app = initializeApp({
  apiKey:            process.env.VITE_FIREBASE_API_KEY,
  authDomain:        process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.VITE_FIREBASE_APP_ID,
});

const auth = getAuth(app);
const db   = getFirestore(app);

// ─── Test Credentials ─────────────────────────────────────────────────────────
const TEST_CREDENTIALS = {
  superadmin:   { email: "admin@alumnet.com",      password: "admin123",   role: "super_admin",   name: "SysAdmin Zero",   description: "Global site administration and node management" },
  collegeadmin: { email: "iitd_admin@alumnet.com", password: "admin123",   role: "college_admin", name: "Registrar Alpha", description: "Institutional management for IIT Delhi" },
  alumni:       { email: "alumni@alumnet.com",     password: "alumni123",  role: "alumni",        name: "Sarah Chen",      description: "Verified alumni within the network" },
  student:      { email: "student@alumnet.com",    password: "student123", role: "student",       name: "James Miller",    description: "Standard student access" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ok   = (msg) => console.log(`  ✔  ${msg}`);
const fail = (msg) => console.error(`  ✘  ${msg}`);
const sep  = ()    => console.log("─".repeat(60));

async function write(collectionName, id, data) {
  await setDoc(doc(db, collectionName, id), data);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("\n🌱  AlumNet CLI Seed Script\n");
  sep();

  const results = [];
  const uids    = {};

  // ── 1. Auth Accounts + Core Profiles ────────────────────────────────────────
  console.log("\n[1/9] Seeding Auth accounts + user profiles…");
  for (const [role, creds] of Object.entries(TEST_CREDENTIALS)) {
    try {
      let user;
      try {
        const uc = await createUserWithEmailAndPassword(auth, creds.email, creds.password);
        user = uc.user;
        ok(`Created  ${role} — ${creds.email}`);
      } catch (e) {
        if (e.code === "auth/email-already-in-use") {
          const uc = await signInWithEmailAndPassword(auth, creds.email, creds.password);
          user = uc.user;
          ok(`Exists   ${role} — ${creds.email}`);
        } else throw e;
      }

      uids[role] = user.uid;

      const isAlumni       = role === "alumni";
      const isStudent      = role === "student";
      const isCollegeAdmin = role === "collegeadmin";
      const isSuperAdmin   = role === "superadmin";

      await write("users", user.uid, {
        uid:            user.uid,
        name:           creds.name,
        email:          creds.email,
        role:           creds.role,
        createdAt:      new Date(),
        description:    creds.description,
        college:        isCollegeAdmin ? "IIT Delhi" : "Global University",
        collegeId:      isCollegeAdmin ? "iit-delhi" : "global-university",
        branch:         isCollegeAdmin || isSuperAdmin ? "Administration" : (isStudent ? "Computer Science" : "Electrical Engineering"),
        graduationYear: isStudent ? 2025 : 2018,
        verified:       true,
        isVerified:     true,
        company:        isAlumni ? "Google" : "",
        occupation:     isAlumni ? "Product Manager" : (isStudent ? "Student" : "Administrator"),
        location:       isAlumni ? "Mountain View, CA" : (isStudent ? "New York, NY" : "New Delhi, India"),
        bio:            isAlumni
          ? "Product Manager at Google. Happy to help with PM prep, system design overview, and resume critiques."
          : (isStudent ? "CS Senior exploring full-stack engineering. Experienced with React, Node, and TypeScript." : "College Administrator."),
        skills:       isStudent ? ["React","TypeScript","Node.js","Firebase"] : (isAlumni ? ["Product Strategy","Growth","Product Management","A/B Testing"] : []),
        isMentor:     isAlumni,
        openToMentor: isAlumni,
        openToRefer:  isAlumni,
        linkedin:     isAlumni ? "linkedin.com/in/sarahchen" : (isStudent ? "linkedin.com/in/jamesmiller" : ""),
      });

      ok(`Profile written for ${role}`);
      results.push({ role, success: true });
    } catch (e) {
      fail(`${role}: ${e.message}`);
      results.push({ role, success: false, error: e.message });
    }
  }

  // ── 2. Re-login as Super Admin ───────────────────────────────────────────────
  console.log("\n[2/9] Signing in as Super Admin for global writes…");
  try {
    await signInWithEmailAndPassword(auth, TEST_CREDENTIALS.superadmin.email, TEST_CREDENTIALS.superadmin.password);
    ok("Signed in as superadmin");
  } catch (e) { fail(`superadmin sign-in: ${e.message}`); }

  // ── 3. Colleges ─────────────────────────────────────────────────────────────
  console.log("\n[3/9] Seeding colleges…");
  const colleges = [
    { id: "iit-delhi",         name: "IIT Delhi",        shortName: "IITD",     website: "https://www.iitd.ac.in",   domain: "iitd.ac.in",   country: "India",          cityState: "New Delhi",      description: "Premier engineering institute in India.",  status: "active", subscriptionTier: "premium"    },
    { id: "global-university", name: "Global University", shortName: "GU",       website: "https://www.global.edu",   domain: "global.edu",   country: "United States",  cityState: "New York, NY",   description: "A top global research university.",        status: "active", subscriptionTier: "enterprise" },
    { id: "mit",               name: "MIT",               shortName: "MIT",      website: "https://www.mit.edu",      domain: "mit.edu",      country: "United States",  cityState: "Cambridge, MA",  description: "Massachusetts Institute of Technology.", status: "active", subscriptionTier: "enterprise" },
    { id: "stanford",          name: "Stanford",          shortName: "Stanford", website: "https://www.stanford.edu", domain: "stanford.edu", country: "United States",  cityState: "Stanford, CA",   description: "Stanford University.",                     status: "active", subscriptionTier: "enterprise" },
    { id: "imperial",          name: "Imperial Academy",  shortName: "IAT",      website: "https://www.imperial.edu", domain: "imperial.edu", country: "United Kingdom", cityState: "London, England", description: "Imperial Academy of Technology.",          status: "active", subscriptionTier: "premium"    },
    { id: "nus",               name: "NUS",               shortName: "NUS",      website: "https://www.nus.edu.sg",   domain: "nus.edu.sg",   country: "Singapore",      cityState: "Singapore",       description: "National University of Singapore.",        status: "active", subscriptionTier: "premium"    },
  ];
  for (const c of colleges) {
    try   { await write("colleges", c.id, { ...c, createdAt: new Date() }); ok(c.name); }
    catch (e) { fail(`${c.id}: ${e.message}`); }
  }

  // ── 4. Mock Users ────────────────────────────────────────────────────────────
  console.log("\n[4/9] Seeding mock users…");
  const mockUsers = [
    { uid: "mock-alumni-wade",    name: "Wade Warren",       email: "wade@alumnet.com",    role: "alumni",  college: "Global University", collegeId: "global-university", branch: "Computer Science",       graduationYear: 2019, verified: true, isVerified: true, company: "Vercel",  occupation: "Frontend Engineer",  location: "San Francisco, CA", bio: "Frontend wizard at Vercel. Love discussing Next.js, web performance, and CSS architectures.", skills: ["React","Next.js","Tailwind CSS","Webpack"],    isMentor: true,  openToMentor: true,  openToRefer: true  },
    { uid: "mock-alumni-eleanor", name: "Eleanor Pena",      email: "eleanor@alumnet.com", role: "alumni",  college: "Global University", collegeId: "global-university", branch: "Product Design",          graduationYear: 2018, verified: true, isVerified: true, company: "Figma",   occupation: "Product Designer",   location: "New York, NY",      bio: "Product Designer at Figma. Focused on UI libraries, Figma plugins, and visual design assets.", skills: ["UI/UX","Figma","Design Systems","Prototyping"], isMentor: true,  openToMentor: true,  openToRefer: true  },
    { uid: "mock-alumni-esther",  name: "Esther Howard",     email: "esther@alumnet.com",  role: "alumni",  college: "Global University", collegeId: "global-university", branch: "Mathematics",             graduationYear: 2015, verified: true, isVerified: true, company: "OpenAI", occupation: "Research Engineer",  location: "San Francisco, CA", bio: "Working on large language model alignment at OpenAI.",                                          skills: ["Python","PyTorch","LLMs","NLP"],                isMentor: true,  openToMentor: true,  openToRefer: true  },
    { uid: "mock-alumni-michael", name: "Michael Rodriguez", email: "michael@alumnet.com", role: "alumni",  college: "Global University", collegeId: "global-university", branch: "Computer Science",       graduationYear: 2017, verified: true, isVerified: true, company: "Meta",   occupation: "Software Engineer",  location: "Seattle, WA",       bio: "Distributed systems engineer at Meta. Ask me about database replication.",                     skills: ["C++","Distributed Systems","SQL"],              isMentor: true,  openToMentor: true,  openToRefer: false },
    { uid: "mock-student-robert", name: "Robert Fox",        email: "robert@student.edu",  role: "student", college: "Global University", collegeId: "global-university", branch: "Computer Science",       graduationYear: 2026, verified: true, isVerified: true, company: "",       occupation: "Student",            location: "New York, NY",      bio: "Student at GU eager to connect with alumni mentors.",                                          skills: ["HTML","CSS","JavaScript"],                      isMentor: false },
    { uid: "mock-student-cody",   name: "Cody Fisher",       email: "cody@student.edu",    role: "student", college: "Global University", collegeId: "global-university", branch: "Information Technology", graduationYear: 2025, verified: true, isVerified: true, company: "",       occupation: "Student",            location: "New York, NY",      bio: "Interested in technical product management and interface designs.",                             skills: ["React","Analytics"],                            isMentor: false },
  ];
  for (const u of mockUsers) {
    try   { await write("users", u.uid, { ...u, createdAt: new Date() }); ok(u.name); }
    catch (e) { fail(`${u.uid}: ${e.message}`); }
  }

  const studentUid = uids["student"];
  const alumniUid  = uids["alumni"];

  if (studentUid && alumniUid) {
    // ── 5. Connections ─────────────────────────────────────────────────────────
    console.log("\n[5/9] Seeding connections…");
    const connections = [
      { id: "conn-student-alumni",  requesterId: studentUid,            recipientId: alumniUid,             status: "accepted" },
      { id: "conn-student-eleanor", requesterId: studentUid,            recipientId: "mock-alumni-eleanor", status: "accepted" },
      { id: "conn-student-wade",    requesterId: studentUid,            recipientId: "mock-alumni-wade",    status: "accepted" },
      { id: "conn-student-michael", requesterId: studentUid,            recipientId: "mock-alumni-michael", status: "pending"  },
      { id: "conn-robert-alumni",   requesterId: "mock-student-robert", recipientId: alumniUid,             status: "pending"  },
      { id: "conn-cody-alumni",     requesterId: "mock-student-cody",   recipientId: alumniUid,             status: "accepted" },
    ];
    for (const c of connections) {
      try   { await write("connections", c.id, { ...c, createdAt: new Date(), updatedAt: new Date() }); ok(c.id); }
      catch (e) { fail(`${c.id}: ${e.message}`); }
    }

    // ── 6. Sessions ────────────────────────────────────────────────────────────
    console.log("\n[6/9] Seeding mentorship sessions…");
    const sessions = [
      { id: "sess-student-alumni",  studentId: studentUid,            mentorId: alumniUid,             collegeId: "global-university", scheduledAt: new Date(Date.now() + 86400000),     duration: 30, status: "confirmed", meetingLink: "https://meet.google.com/abc-defg-hij", notes: "First intro call to align on career goals.",                  feedback: {} },
      { id: "sess-student-eleanor", studentId: studentUid,            mentorId: "mock-alumni-eleanor", collegeId: "global-university", scheduledAt: new Date(Date.now() - 86400000 * 2), duration: 60, status: "completed", meetingLink: "https://meet.google.com/xyz-pdqr-lmn", notes: "Portfolio review completed.",                                  feedback: { rating: 5, comment: "Fabulous session! Eleanor gave me amazing tips." } },
      { id: "sess-cody-alumni",     studentId: "mock-student-cody",   mentorId: alumniUid,             collegeId: "global-university", scheduledAt: new Date(Date.now() - 86400000 * 5), duration: 30, status: "completed", meetingLink: "https://meet.google.com/uvw-opqr-stu", notes: "Resume walkthrough and product strategy discussion.",          feedback: { rating: 5, comment: "Sarah is extremely insightful!" } },
      { id: "sess-robert-alumni",   studentId: "mock-student-robert", mentorId: alumniUid,             collegeId: "global-university", scheduledAt: new Date(Date.now() + 86400000 * 4), duration: 30, status: "pending",   meetingLink: "",                                     notes: "Discussing entry-level developer profiles.",                  feedback: {} },
    ];
    for (const s of sessions) {
      try   { await write("sessions", s.id, { ...s, createdAt: new Date(), updatedAt: new Date() }); ok(s.id); }
      catch (e) { fail(`${s.id}: ${e.message}`); }
    }

    // ── 7. Referrals + Referral Requests ──────────────────────────────────────
    console.log("\n[7/9] Seeding referrals + referral requests…");
    const referrals = [
      { id: "ref-google-intern",   postedBy: alumniUid,            collegeId: "global-university", title: "Backend Engineer Intern", company: "Google", location: "Mountain View, CA", employmentType: "Internship", jobUrl: "https://careers.google.com/jobs/123", deadline: new Date(Date.now() + 86400000 * 30), description: "Backend Intern role at Google.", status: "open", applications: [studentUid] },
      { id: "ref-vercel-frontend", postedBy: "mock-alumni-wade",   collegeId: "global-university", title: "Frontend Developer",      company: "Vercel", location: "Remote",            employmentType: "Full-time",  jobUrl: "https://vercel.com/careers/456",        deadline: new Date(Date.now() + 86400000 * 20), description: "Join the Vercel team.",          status: "open", applications: [studentUid] },
      { id: "ref-figma-designer",  postedBy: "mock-alumni-eleanor", collegeId: "global-university", title: "Product Designer",        company: "Figma",  location: "New York, NY",      employmentType: "Full-time",  jobUrl: "https://figma.com/careers/789",         deadline: new Date(Date.now() + 86400000 * 40), description: "Design systems role at Figma.", status: "open", applications: [] },
    ];
    for (const r of referrals) {
      try   { await write("referrals", r.id, { ...r, createdAt: new Date(), updatedAt: new Date() }); ok(r.id); }
      catch (e) { fail(`${r.id}: ${e.message}`); }
    }

    const referralRequests = [
      { id: "req-student-google", studentId: studentUid, referralId: "ref-google-intern",  alumniId: alumniUid,          company: "Google", role: "Backend Engineer Intern", resumeName: "james_miller_resume.pdf", pitch: "Hi Sarah, I would love to be referred for the Google Backend Intern role.",          status: "pending"  },
      { id: "req-student-vercel", studentId: studentUid, referralId: "ref-vercel-frontend", alumniId: "mock-alumni-wade", company: "Vercel", role: "Frontend Developer",      resumeName: "james_miller_resume.pdf", pitch: "Hi Wade, my Next.js and Tailwind projects line up with the team criteria perfectly.", status: "referred" },
    ];
    for (const r of referralRequests) {
      try   { await write("referral_requests", r.id, { ...r, createdAt: new Date(), updatedAt: new Date() }); ok(r.id); }
      catch (e) { fail(`${r.id}: ${e.message}`); }
    }

    // ── 8. Conversations + Messages ────────────────────────────────────────────
    console.log("\n[8/9] Seeding conversations + messages…");
    const convId = `conv-${studentUid}-${alumniUid}`;
    try {
      await write("conversations", convId, {
        id:            convId,
        participants:  [studentUid, alumniUid],
        lastMessage:   "Sure, feel free to book a slot in my mentorship availability calendar!",
        lastMessageAt: new Date(),
        updatedAt:     new Date(),
      });
      const messages = [
        { id: "msg-1", senderId: alumniUid,  content: "Hi James! Welcome to AlumNet. How can I help you today?",                                    createdAt: new Date(Date.now() - 3600000) },
        { id: "msg-2", senderId: studentUid, content: "Hi Sarah! Thanks for connecting. I'd love to learn more about product management at Google.", createdAt: new Date(Date.now() - 1800000) },
        { id: "msg-3", senderId: alumniUid,  content: "Sure, feel free to book a slot in my mentorship availability calendar!",                      createdAt: new Date() },
      ];
      for (const m of messages) {
        await setDoc(doc(db, "conversations", convId, "messages", m.id), { ...m, readBy: [m.senderId] });
      }
      ok(`Conversation + 3 messages`);
    } catch (e) { fail(`conversation: ${e.message}`); }

    // ── 9. Announcements ───────────────────────────────────────────────────────
    console.log("\n[9/9] Seeding announcements…");
    const announcements = [
      { id: "ann-fair",    collegeId: "global-university", title: "Annual Career Fair starts July 5th!",   target: "All", message: "Network with top recruiters and alumni from Figma, Google, and Stripe." },
      { id: "ann-welcome", collegeId: "global-university", title: "Welcome to AlumNet Onboarding Portal!", target: "All", message: "Start connecting, scheduling mentorship calls, and applying to job referrals today." },
    ];
    for (const a of announcements) {
      try   { await write("announcements", a.id, { ...a, createdAt: new Date() }); ok(a.title); }
      catch (e) { fail(`${a.id}: ${e.message}`); }
    }
  } else {
    fail("Could not resolve studentUid / alumniUid — skipping relational data.");
  }

  // Cleanup
  console.log("\n🔒  Signing out…");
  await signOut(auth);

  sep();
  const succeeded = results.filter((r) => r.success).length;
  console.log(`\n✅  Seed complete — ${succeeded}/${results.length} primary accounts OK\n`);

  if (succeeded < results.length) {
    console.log("⚠️  Some writes failed — make sure Firestore rules allow writes:");
    console.log("    rules_version = '2';");
    console.log("    service cloud.firestore {");
    console.log("      match /databases/{database}/documents {");
    console.log("        match /{document=**} { allow read, write: if true; }");
    console.log("      }");
    console.log("    }\n");
  }

  process.exit(0);
}

seed().catch((e) => {
  console.error("\n✘  Fatal error:", e);
  process.exit(1);
});
