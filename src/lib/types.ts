// ─── Shared Firestore Types ───────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: "student" | "alumni" | "college_admin" | "super_admin";
  college: string;
  collegeId: string;
  branch: string;
  graduationYear: number;
  verified: boolean;
  isVerified: boolean;
  company: string;
  occupation: string;
  location: string;
  bio: string;
  skills: string[];
  isMentor: boolean;
  openToMentor: boolean;
  openToRefer: boolean;
  linkedin: string;
  description?: string;
  createdAt?: Date;
  photoURL?: string;
  status?: string;
}

export interface Connection {
  id: string;
  requesterId: string;
  recipientId: string;
  status: "pending" | "accepted" | "declined";
  createdAt?: Date;
  updatedAt?: Date;
  // Populated client-side for display
  otherUser?: UserProfile;
}

export interface Session {
  id: string;
  studentId: string;
  mentorId: string;
  collegeId: string;
  scheduledAt: Date;
  duration: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  meetingLink: string;
  notes: string;
  feedback: { rating?: number; comment?: string };
  createdAt?: Date;
  updatedAt?: Date;
  // Populated client-side
  studentProfile?: UserProfile;
  mentorProfile?: UserProfile;
}

export interface Referral {
  id: string;
  postedBy: string;
  collegeId: string;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  jobUrl: string;
  deadline: Date;
  description: string;
  status: "open" | "closed";
  applications: string[];
  createdAt?: Date;
  updatedAt?: Date;
  // Populated client-side
  posterProfile?: UserProfile;
}

export interface ReferralRequest {
  id: string;
  studentId: string;
  referralId: string;
  alumniId: string;
  company: string;
  role: string;
  resumeName: string;
  pitch: string;
  status: "pending" | "referred" | "declined";
  createdAt?: Date;
  updatedAt?: Date;
  // Populated client-side
  studentProfile?: UserProfile;
  referral?: Referral;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: Date;
  updatedAt?: Date;
  // Populated client-side
  otherUser?: UserProfile;
  unreadCount?: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date;
  readBy: string[];
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  website: string;
  domain: string;
  country: string;
  cityState: string;
  description: string;
  status: "active" | "suspended";
  subscriptionTier: "premium" | "enterprise" | "basic";
  createdAt?: Date;
}

export interface Announcement {
  id: string;
  collegeId: string;
  title: string;
  target: string;
  message: string;
  createdAt?: Date;
}
