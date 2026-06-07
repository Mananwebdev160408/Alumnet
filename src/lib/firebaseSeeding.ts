import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { TEST_CREDENTIALS } from "./testCredentials";

export const seedTestUsers = async () => {
  const results: { role: string; success: boolean; error?: string }[] = [];
  const uids: Record<string, string> = {};

  // 1. Seed Colleges Collection
  const collegesList = [
    { id: "iit-delhi", name: "IIT Delhi", shortName: "IITD", website: "https://www.iitd.ac.in", domain: "iitd.ac.in", country: "India", cityState: "New Delhi", description: "Premier engineering institute in India.", status: "active", subscriptionTier: "premium" },
    { id: "global-university", name: "Global University", shortName: "GU", website: "https://www.global.edu", domain: "global.edu", country: "United States", cityState: "New York, NY", description: "A top global research university.", status: "active", subscriptionTier: "enterprise" },
    { id: "mit", name: "MIT", shortName: "MIT", website: "https://www.mit.edu", domain: "mit.edu", country: "United States", cityState: "Cambridge, MA", description: "Massachusetts Institute of Technology.", status: "active", subscriptionTier: "enterprise" },
    { id: "stanford", name: "Stanford", shortName: "Stanford", website: "https://www.stanford.edu", domain: "stanford.edu", country: "United States", cityState: "Stanford, CA", description: "Stanford University.", status: "active", subscriptionTier: "enterprise" },
    { id: "imperial", name: "Imperial Academy", shortName: "IAT", website: "https://www.imperial.edu", domain: "imperial.edu", country: "United Kingdom", cityState: "London, England", description: "Imperial Academy of Technology.", status: "active", subscriptionTier: "premium" },
    { id: "nus", name: "NUS", shortName: "NUS", website: "https://www.nus.edu.sg", domain: "nus.edu.sg", country: "Singapore", cityState: "Singapore", description: "National University of Singapore.", status: "active", subscriptionTier: "premium" }
  ];

  for (const col of collegesList) {
    try {
      await setDoc(doc(db, "colleges", col.id), {
        ...col,
        createdAt: new Date()
      });
    } catch (err) {
      console.error(`Error seeding college ${col.id}:`, err);
    }
  }

  // 2. Seed Primary Test Users
  for (const role in TEST_CREDENTIALS) {
    const creds = TEST_CREDENTIALS[role as keyof typeof TEST_CREDENTIALS];
    try {
      let user;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, creds.email, creds.password);
        user = userCredential.user;
      } catch (authError: any) {
        if (authError.code === "auth/email-already-in-use") {
          const userCredential = await signInWithEmailAndPassword(auth, creds.email, creds.password);
          user = userCredential.user;
        } else {
          throw authError;
        }
      }

      uids[role] = user.uid;

      // Seed core profile in Firestore
      const isAlumni = role === "alumni";
      const isStudent = role === "student";
      const isCollegeAdmin = role === "collegeadmin";
      const isSuperAdmin = role === "superadmin";

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: creds.name,
        email: creds.email,
        role: creds.role,
        createdAt: new Date(),
        description: creds.description,
        college: isCollegeAdmin ? "IIT Delhi" : "Global University",
        collegeId: isCollegeAdmin ? "iit-delhi" : "global-university",
        branch: isCollegeAdmin || isSuperAdmin ? "Administration" : (isStudent ? "Computer Science" : "Electrical Engineering"),
        graduationYear: isStudent ? 2025 : 2018,
        verified: true,
        isVerified: true,
        company: isAlumni ? "Google" : "",
        occupation: isAlumni ? "Product Manager" : (isStudent ? "Student" : "Administrator"),
        location: isAlumni ? "Mountain View, CA" : (isStudent ? "New York, NY" : "New Delhi, India"),
        bio: isAlumni 
          ? "Product Manager at Google. Happy to help with PM prep, system design overview, and resume critiques."
          : (isStudent ? "CS Senior exploring full-stack engineering. Experienced with React, Node, and TypeScript." : "College Administrator."),
        skills: isStudent 
          ? ["React", "TypeScript", "Node.js", "Firebase"] 
          : (isAlumni ? ["Product Strategy", "Growth", "Product Management", "A/B Testing"] : []),
        isMentor: isAlumni,
        openToMentor: isAlumni,
        openToRefer: isAlumni,
        linkedin: isAlumni ? "linkedin.com/in/sarahchen" : (isStudent ? "linkedin.com/in/jamesmiller" : "")
      });

      results.push({ role, success: true });
    } catch (error: unknown) {
      console.error(`Error seeding ${role}:`, error);
      const message = error instanceof Error ? error.message : String(error);
      results.push({ role, success: false, error: message });
    }
  }

  // 3. Seed Secondary Mock Users (Directly into Firestore)
  const mockUsersList = [
    { uid: "mock-alumni-wade", name: "Wade Warren", email: "wade@alumnet.com", role: "alumni", college: "Global University", collegeId: "global-university", branch: "Computer Science", graduationYear: 2019, verified: true, isVerified: true, company: "Vercel", occupation: "Frontend Engineer", location: "San Francisco, CA", bio: "Frontend wizard at Vercel. Love discussing Next.js, web performance, and CSS architectures.", skills: ["React", "Next.js", "Tailwind CSS", "Webpack"], isMentor: true, openToMentor: true, openToRefer: true },
    { uid: "mock-alumni-eleanor", name: "Eleanor Pena", email: "eleanor@alumnet.com", role: "alumni", college: "Global University", collegeId: "global-university", branch: "Product Design", graduationYear: 2018, verified: true, isVerified: true, company: "Figma", occupation: "Product Designer", location: "New York, NY", bio: "Product Designer at Figma. Focused on UI libraries, Figma plugins, and visual design assets.", skills: ["UI/UX", "Figma", "Design Systems", "Prototyping"], isMentor: true, openToMentor: true, openToRefer: true },
    { uid: "mock-alumni-esther", name: "Esther Howard", email: "esther@alumnet.com", role: "alumni", college: "Global University", collegeId: "global-university", branch: "Mathematics", graduationYear: 2015, verified: true, isVerified: true, company: "OpenAI", occupation: "Research Engineer", location: "San Francisco, CA", bio: "Working on large language model alignment at OpenAI.", skills: ["Python", "PyTorch", "LLMs", "NLP"], isMentor: true, openToMentor: true, openToRefer: true },
    { uid: "mock-alumni-michael", name: "Michael Rodriguez", email: "michael@alumnet.com", role: "alumni", college: "Global University", collegeId: "global-university", branch: "Computer Science", graduationYear: 2017, verified: true, isVerified: true, company: "Meta", occupation: "Software Engineer", location: "Seattle, WA", bio: "Distributed systems engineer at Meta. Ask me about database replication.", skills: ["C++", "Distributed Systems", "SQL"], isMentor: true, openToMentor: true, openToRefer: false },
    { uid: "mock-student-robert", name: "Robert Fox", email: "robert@student.edu", role: "student", college: "Global University", collegeId: "global-university", branch: "Computer Science", graduationYear: 2026, verified: true, isVerified: true, company: "", occupation: "Student", location: "New York, NY", bio: "Student at GU eager to connect with alumni mentors.", skills: ["HTML", "CSS", "JavaScript"], isMentor: false },
    { uid: "mock-student-cody", name: "Cody Fisher", email: "cody@student.edu", role: "student", college: "Global University", collegeId: "global-university", branch: "Information Technology", graduationYear: 2025, verified: true, isVerified: true, company: "", occupation: "Student", location: "New York, NY", bio: "Interested in technical product management and interface designs.", skills: ["React", "Analytics"], isMentor: false }
  ];

  for (const user of mockUsersList) {
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...user,
        createdAt: new Date()
      });
    } catch (err) {
      console.error(`Error seeding mock user ${user.name}:`, err);
    }
  }

  const studentUid = uids["student"];
  const alumniUid = uids["alumni"];

  if (studentUid && alumniUid) {
    // 4. Seed Connections
    const connections = [
      { id: "conn-student-alumni", requesterId: studentUid, recipientId: alumniUid, status: "accepted" },
      { id: "conn-student-eleanor", requesterId: studentUid, recipientId: "mock-alumni-eleanor", status: "accepted" },
      { id: "conn-student-wade", requesterId: studentUid, recipientId: "mock-alumni-wade", status: "accepted" },
      { id: "conn-student-michael", requesterId: studentUid, recipientId: "mock-alumni-michael", status: "pending" },
      { id: "conn-robert-alumni", requesterId: "mock-student-robert", recipientId: alumniUid, status: "pending" },
      { id: "conn-cody-alumni", requesterId: "mock-student-cody", recipientId: alumniUid, status: "accepted" }
    ];

    for (const conn of connections) {
      try {
        await setDoc(doc(db, "connections", conn.id), {
          ...conn,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } catch (err) {
        console.error(`Error seeding connection ${conn.id}:`, err);
      }
    }

    // 5. Seed Sessions (Mentorship)
    const sessions = [
      { id: "sess-student-alumni", studentId: studentUid, mentorId: alumniUid, collegeId: "global-university", scheduledAt: new Date(Date.now() + 86400000), duration: 30, status: "confirmed", meetingLink: "https://meet.google.com/abc-defg-hij", notes: "First intro call to align on career goals.", feedback: {} },
      { id: "sess-student-eleanor", studentId: studentUid, mentorId: "mock-alumni-eleanor", collegeId: "global-university", scheduledAt: new Date(Date.now() - 86400000 * 2), duration: 60, status: "completed", meetingLink: "https://meet.google.com/xyz-pdqr-lmn", notes: "Portfolio review completed. Provided references to Figma guidelines.", feedback: { rating: 5, comment: "Fabulous session! Eleanor gave me amazing tips." } },
      { id: "sess-cody-alumni", studentId: "mock-student-cody", mentorId: alumniUid, collegeId: "global-university", scheduledAt: new Date(Date.now() - 86400000 * 5), duration: 30, status: "completed", meetingLink: "https://meet.google.com/uvw-opqr-stu", notes: "Resume walkthrough and product strategy discussion.", feedback: { rating: 5, comment: "Sarah is extremely insightful!" } },
      { id: "sess-robert-alumni", studentId: "mock-student-robert", mentorId: alumniUid, collegeId: "global-university", scheduledAt: new Date(Date.now() + 86400000 * 4), duration: 30, status: "pending", meetingLink: "", notes: "Discussing entry-level developer profiles.", feedback: {} }
    ];

    for (const sess of sessions) {
      try {
        await setDoc(doc(db, "sessions", sess.id), {
          ...sess,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } catch (err) {
        console.error(`Error seeding session ${sess.id}:`, err);
      }
    }

    // 6. Seed Referrals (Job Postings)
    const referrals = [
      { id: "ref-google-intern", postedBy: alumniUid, collegeId: "global-university", title: "Backend Engineer Intern", company: "Google", location: "Mountain View, CA", employmentType: "Internship", jobUrl: "https://careers.google.com/jobs/123", deadline: new Date(Date.now() + 86400000 * 30), description: "We are seeking a Backend Engineer Intern to help design and implement core infrastructure components.", status: "open", applications: [studentUid] },
      { id: "ref-vercel-frontend", postedBy: "mock-alumni-wade", collegeId: "global-university", title: "Frontend Developer", company: "Vercel", location: "Remote", employmentType: "Full-time", jobUrl: "https://vercel.com/careers/456", deadline: new Date(Date.now() + 86400000 * 20), description: "Join the team building the future of web development. You will contribute to our core React frameworks.", status: "open", applications: [studentUid] },
      { id: "ref-figma-designer", postedBy: "mock-alumni-eleanor", collegeId: "global-university", title: "Product Designer", company: "Figma", location: "New York, NY", employmentType: "Full-time", jobUrl: "https://figma.com/careers/789", deadline: new Date(Date.now() + 86400000 * 40), description: "Design systems product design role to build advanced collaborative graphics tools.", status: "open", applications: [] }
    ];

    for (const ref of referrals) {
      try {
        await setDoc(doc(db, "referrals", ref.id), {
          ...ref,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } catch (err) {
        console.error(`Error seeding referral ${ref.id}:`, err);
      }
    }

    // 7. Seed Referral Requests (Applications)
    const referralRequests = [
      { id: "req-student-google", studentId: studentUid, referralId: "ref-google-intern", alumniId: alumniUid, company: "Google", role: "Backend Engineer Intern", resumeName: "james_miller_resume.pdf", pitch: "Hi Sarah, I would love to be referred for the Google Backend Intern role. I have active experience with distributed networks.", status: "pending" },
      { id: "req-student-vercel", studentId: studentUid, referralId: "ref-vercel-frontend", alumniId: "mock-alumni-wade", company: "Vercel", role: "Frontend Developer", resumeName: "james_miller_resume.pdf", pitch: "Hi Wade, my Next.js and Tailwind projects line up with the team criteria perfectly.", status: "referred" }
    ];

    for (const req of referralRequests) {
      try {
        await setDoc(doc(db, "referral_requests", req.id), {
          ...req,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } catch (err) {
        console.error(`Error seeding referral request ${req.id}:`, err);
      }
    }

    // 8. Seed Chats (Conversations & Messages)
    const convId = `conv-${studentUid}-${alumniUid}`;
    
    try {
      await setDoc(doc(db, "conversations", convId), {
        id: convId,
        participants: [studentUid, alumniUid],
        lastMessage: "Sure, feel free to book a slot in my mentorship availability calendar!",
        lastMessageAt: new Date(),
        updatedAt: new Date()
      });

      const messages = [
        { id: "msg-1", senderId: alumniUid, content: "Hi James! Welcome to AlumNet. How can I help you today?", createdAt: new Date(Date.now() - 3600000) },
        { id: "msg-2", senderId: studentUid, content: "Hi Sarah! Thanks for connecting. I'd love to learn more about product management at Google.", createdAt: new Date(Date.now() - 1800000) },
        { id: "msg-3", senderId: alumniUid, content: "Sure, feel free to book a slot in my mentorship availability calendar!", createdAt: new Date() }
      ];

      for (const msg of messages) {
        await setDoc(doc(db, "conversations", convId, "messages", msg.id), {
          ...msg,
          readBy: [msg.senderId]
        });
      }
    } catch (err) {
      console.error("Error seeding conversation:", err);
    }

    // 9. Seed College Announcements
    const announcements = [
      { id: "ann-fair", collegeId: "global-university", title: "Annual Career Fair starts July 5th!", target: "All", message: "Network with top recruiters and alumni from Figma, Google, and Stripe. Aud. opens 10:00 AM." },
      { id: "ann-welcome", collegeId: "global-university", title: "Welcome to AlumNet Onboarding Portal!", target: "All", message: "Start connecting, scheduling mentorship calls, and applying to job referrals today." }
    ];

    for (const ann of announcements) {
      try {
        await setDoc(doc(db, "announcements", ann.id), {
          ...ann,
          createdAt: new Date()
        });
      } catch (err) {
        console.error("Error seeding announcement:", err);
      }
    }
  }

  // Cleanup: Sign out to let the user log in normally
  await signOut(auth);
  
  return results;
};
