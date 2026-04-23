import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { TEST_CREDENTIALS } from "./testCredentials";

export const seedTestUsers = async () => {
  const results: { role: string; success: boolean; error?: string }[] = [];

  for (const role in TEST_CREDENTIALS) {
    const creds = TEST_CREDENTIALS[role as keyof typeof TEST_CREDENTIALS];
    try {
      // 1. Try to create user in Auth
      // Note: This will sign in the user, but we'll handle that later or just stay signed in to the last one
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, creds.email, creds.password);
        const user = userCredential.user;

        // 2. Create Firestore profile
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: creds.name,
          email: creds.email,
          role: creds.role,
          createdAt: new Date(),
          description: creds.description,
          college: role === "collegeadmin" ? "IIT Delhi" : "Global University",
          branch: "Administration",
          graduationYear: "2010",
          verified: true
        });

        results.push({ role, success: true });
      } catch (authError: any) {
        if (authError.code === 'auth/email-already-in-use') {
          // If user exists, we don't necessarily need to update Firestore here for safety, 
          // but we could if we wanted to enforce roles.
          results.push({ role, success: true }); 
        } else {
          throw authError;
        }
      }
    } catch (error: any) {
      console.error(`Error seeding ${role}:`, error);
      results.push({ role, success: false, error: error.message });
    }
  }

  // Final Cleanup: Sign out if needed, or just let the user log in normally
  await signOut(auth);
  
  return results;
};
