/**
 * firestoreService.ts
 * ────────────────────
 * Central module for all Firestore reads and writes.
 * Uses onSnapshot for real-time listeners where cross-user reactivity is needed.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  Query,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  UserProfile,
  Connection,
  Session,
  Referral,
  ReferralRequest,
  Conversation,
  Message,
  College,
  Announcement,
} from "./types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toDate(val: unknown): Date {
  if (!val) return new Date();
  if (val instanceof Timestamp) return val.toDate();
  if (val instanceof Date) return val;
  return new Date(val as string);
}

function docToUser(id: string, data: DocumentData): UserProfile {
  return {
    uid: id,
    name: data.name ?? "",
    email: data.email ?? "",
    role: data.role ?? "student",
    college: data.college ?? "",
    collegeId: data.collegeId ?? "",
    branch: data.branch ?? "",
    graduationYear: data.graduationYear ?? 0,
    verified: data.verified ?? false,
    isVerified: data.isVerified ?? false,
    company: data.company ?? "",
    occupation: data.occupation ?? "",
    location: data.location ?? "",
    bio: data.bio ?? "",
    skills: data.skills ?? [],
    isMentor: data.isMentor ?? false,
    openToMentor: data.openToMentor ?? false,
    openToRefer: data.openToRefer ?? false,
    linkedin: data.linkedin ?? "",
    description: data.description,
    photoURL: data.photoURL,
    createdAt: toDate(data.createdAt),
    status: data.status ?? "Active",
  };
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return docToUser(snap.id, snap.data());
}

export async function getUsers(options?: {
  role?: string;
  collegeId?: string;
  isMentor?: boolean;
  limitCount?: number;
}): Promise<UserProfile[]> {
  let q: Query<DocumentData> = collection(db, "users");

  const constraints: Parameters<typeof query>[1][] = [];
  if (options?.role) constraints.push(where("role", "==", options.role));
  if (options?.collegeId) constraints.push(where("collegeId", "==", options.collegeId));
  if (options?.isMentor !== undefined) constraints.push(where("isMentor", "==", options.isMentor));
  if (options?.limitCount) constraints.push(limit(options.limitCount));

  const snap = await getDocs(query(q, ...constraints));
  return snap.docs.map((d) => docToUser(d.id, d.data()));
}

export function subscribeToUsers(
  options: { role?: string; collegeId?: string; isVerified?: boolean },
  callback: (users: UserProfile[]) => void
): () => void {
  const constraints: Parameters<typeof query>[1][] = [];
  if (options.role) constraints.push(where("role", "==", options.role));
  if (options.collegeId) constraints.push(where("collegeId", "==", options.collegeId));
  if (options.isVerified !== undefined) constraints.push(where("isVerified", "==", options.isVerified));

  const q = query(collection(db, "users"), ...constraints);
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => docToUser(d.id, d.data())));
  });
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  await updateDoc(doc(db, "users", uid), { ...data, updatedAt: serverTimestamp() });
}

export async function updateUserVerification(uid: string, verified: boolean): Promise<void> {
  await updateDoc(doc(db, "users", uid), {
    isVerified: verified,
    verified,
    updatedAt: serverTimestamp(),
  });
}

// ─── Connections ──────────────────────────────────────────────────────────────

export function subscribeToConnections(
  uid: string,
  callback: (connections: Connection[]) => void
): () => void {
  // Listen for connections where user is either requester or recipient
  const asRequester = query(collection(db, "connections"), where("requesterId", "==", uid));
  const asRecipient = query(collection(db, "connections"), where("recipientId", "==", uid));

  const all = new Map<string, Connection>();

  const merge = () => callback(Array.from(all.values()));

  const u1 = onSnapshot(asRequester, (snap) => {
    snap.docs.forEach((d) => {
      const data = d.data();
      all.set(d.id, { id: d.id, ...data, createdAt: toDate(data.createdAt), updatedAt: toDate(data.updatedAt) } as Connection);
    });
    merge();
  });

  const u2 = onSnapshot(asRecipient, (snap) => {
    snap.docs.forEach((d) => {
      const data = d.data();
      all.set(d.id, { id: d.id, ...data, createdAt: toDate(data.createdAt), updatedAt: toDate(data.updatedAt) } as Connection);
    });
    merge();
  });

  return () => { u1(); u2(); };
}

export async function sendConnectionRequest(fromUid: string, toUid: string): Promise<void> {
  // Check if connection already exists
  const q = query(
    collection(db, "connections"),
    where("requesterId", "==", fromUid),
    where("recipientId", "==", toUid)
  );
  const snap = await getDocs(q);
  if (!snap.empty) return; // already sent

  await addDoc(collection(db, "connections"), {
    requesterId: fromUid,
    recipientId: toUid,
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateConnectionStatus(
  connId: string,
  status: "accepted" | "declined"
): Promise<void> {
  await updateDoc(doc(db, "connections", connId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function getConnectionStatus(
  uid1: string,
  uid2: string
): Promise<"none" | "pending" | "accepted" | "sent"> {
  const q1 = query(
    collection(db, "connections"),
    where("requesterId", "==", uid1),
    where("recipientId", "==", uid2)
  );
  const q2 = query(
    collection(db, "connections"),
    where("requesterId", "==", uid2),
    where("recipientId", "==", uid1)
  );
  const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  if (!s1.empty) {
    const status = s1.docs[0].data().status;
    return status === "accepted" ? "accepted" : "sent";
  }
  if (!s2.empty) {
    const status = s2.docs[0].data().status;
    return status === "accepted" ? "accepted" : "pending";
  }
  return "none";
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export function subscribeToSessions(
  uid: string,
  role: "student" | "alumni" | "mentor",
  callback: (sessions: Session[]) => void
): () => void {
  const field = role === "student" ? "studentId" : "mentorId";
  const q = query(
    collection(db, "sessions"),
    where(field, "==", uid),
    orderBy("scheduledAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          scheduledAt: toDate(data.scheduledAt),
          createdAt: toDate(data.createdAt),
          updatedAt: toDate(data.updatedAt),
        } as Session;
      })
    );
  });
}

export async function updateSessionStatus(
  sessionId: string,
  status: Session["status"],
  meetingLink?: string
): Promise<void> {
  const updates: Record<string, unknown> = { status, updatedAt: serverTimestamp() };
  if (meetingLink !== undefined) updates.meetingLink = meetingLink;
  await updateDoc(doc(db, "sessions", sessionId), updates);
}

export async function createSession(data: Omit<Session, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const ref = await addDoc(collection(db, "sessions"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

// ─── Referrals ────────────────────────────────────────────────────────────────

export function subscribeToReferrals(
  options: { collegeId?: string; postedBy?: string; status?: string },
  callback: (referrals: Referral[]) => void
): () => void {
  const constraints: Parameters<typeof query>[1][] = [];
  if (options.collegeId) constraints.push(where("collegeId", "==", options.collegeId));
  if (options.postedBy) constraints.push(where("postedBy", "==", options.postedBy));
  if (options.status) constraints.push(where("status", "==", options.status));
  constraints.push(orderBy("createdAt", "desc"));

  const q = query(collection(db, "referrals"), ...constraints);
  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          deadline: toDate(data.deadline),
          createdAt: toDate(data.createdAt),
          updatedAt: toDate(data.updatedAt),
        } as Referral;
      })
    );
  });
}

export async function createReferral(data: Omit<Referral, "id" | "createdAt" | "updatedAt" | "applications">): Promise<string> {
  const ref = await addDoc(collection(db, "referrals"), {
    ...data,
    applications: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateReferralStatus(referralId: string, status: "open" | "closed"): Promise<void> {
  await updateDoc(doc(db, "referrals", referralId), { status, updatedAt: serverTimestamp() });
}

// ─── Referral Requests ────────────────────────────────────────────────────────

export function subscribeToReferralRequests(
  options: { studentId?: string; alumniId?: string },
  callback: (requests: ReferralRequest[]) => void
): () => void {
  const constraints: Parameters<typeof query>[1][] = [];
  if (options.studentId) constraints.push(where("studentId", "==", options.studentId));
  if (options.alumniId) constraints.push(where("alumniId", "==", options.alumniId));
  constraints.push(orderBy("createdAt", "desc"));

  const q = query(collection(db, "referral_requests"), ...constraints);
  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          createdAt: toDate(data.createdAt),
          updatedAt: toDate(data.updatedAt),
        } as ReferralRequest;
      })
    );
  });
}

export async function submitReferralRequest(
  data: Omit<ReferralRequest, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const ref = await addDoc(collection(db, "referral_requests"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateReferralRequestStatus(
  reqId: string,
  status: "pending" | "referred" | "declined"
): Promise<void> {
  await updateDoc(doc(db, "referral_requests", reqId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

// ─── Conversations & Messages ─────────────────────────────────────────────────

export function subscribeToConversations(
  uid: string,
  callback: (convs: Conversation[]) => void
): () => void {
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", uid),
    orderBy("lastMessageAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          participants: data.participants ?? [],
          lastMessage: data.lastMessage ?? "",
          lastMessageAt: toDate(data.lastMessageAt),
          updatedAt: toDate(data.updatedAt),
        } as Conversation;
      })
    );
  });
}

export function subscribeToMessages(
  conversationId: string,
  callback: (messages: Message[]) => void
): () => void {
  const q = query(
    collection(db, "conversations", conversationId, "messages"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          senderId: data.senderId,
          content: data.content,
          createdAt: toDate(data.createdAt),
          readBy: data.readBy ?? [],
        } as Message;
      })
    );
  });
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
): Promise<void> {
  const msgRef = collection(db, "conversations", conversationId, "messages");
  await addDoc(msgRef, {
    senderId,
    content,
    createdAt: serverTimestamp(),
    readBy: [senderId],
  });

  // Update conversation summary
  await updateDoc(doc(db, "conversations", conversationId), {
    lastMessage: content,
    lastMessageAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getOrCreateConversation(uid1: string, uid2: string): Promise<string> {
  const convId1 = `conv-${uid1}-${uid2}`;
  const convId2 = `conv-${uid2}-${uid1}`;

  const [snap1, snap2] = await Promise.all([
    getDoc(doc(db, "conversations", convId1)),
    getDoc(doc(db, "conversations", convId2)),
  ]);

  if (snap1.exists()) return convId1;
  if (snap2.exists()) return convId2;

  // Create new conversation
  await setDoc(doc(db, "conversations", convId1), {
    id: convId1,
    participants: [uid1, uid2],
    lastMessage: "",
    lastMessageAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return convId1;
}

// ─── Colleges ─────────────────────────────────────────────────────────────────

export function subscribeToColleges(callback: (colleges: College[]) => void): () => void {
  return onSnapshot(collection(db, "colleges"), (snap) => {
    callback(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: toDate(d.data().createdAt),
      } as College))
    );
  });
}

export async function getColleges(): Promise<College[]> {
  const snap = await getDocs(collection(db, "colleges"));
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: toDate(d.data().createdAt),
  } as College));
}

export async function updateCollegeStatus(
  collegeId: string,
  status: "active" | "suspended"
): Promise<void> {
  await updateDoc(doc(db, "colleges", collegeId), { status, updatedAt: serverTimestamp() });
}

export async function createCollege(data: Omit<College, "id" | "createdAt">): Promise<void> {
  const id = data.shortName.toLowerCase().replace(/\s+/g, "-");
  await setDoc(doc(db, "colleges", id), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

// ─── Announcements ────────────────────────────────────────────────────────────

export function subscribeToAnnouncements(
  collegeId: string,
  callback: (announcements: Announcement[]) => void
): () => void {
  const q = query(
    collection(db, "announcements"),
    where("collegeId", "==", collegeId),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: toDate(d.data().createdAt),
      } as Announcement))
    );
  });
}

export async function createAnnouncement(
  data: Omit<Announcement, "id" | "createdAt">
): Promise<void> {
  await addDoc(collection(db, "announcements"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function deleteAnnouncement(id: string): Promise<void> {
  await deleteDoc(doc(db, "announcements", id));
}
