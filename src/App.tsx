import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout
import { Layout } from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Directory from "./pages/Directory";
import Connections from "./pages/Connections";
import Messages from "./pages/Messages";
import Mentorship from "./pages/Mentorship";
import AIChat from "./pages/AIChat";
import About from "./pages/About";
import Settings from "./pages/Settings";

// Role-specific pages
import OrgDashboard from "./pages/roles/OrgDashboard";
import ManageAlumni from "./pages/roles/ManageAlumni";
import OrgEvents from "./pages/roles/OrgEvents";
import AdminDashboard from "./pages/roles/AdminDashboard";
import ManageOrgs from "./pages/roles/ManageOrgs";
import StudentDashboard from "./pages/roles/StudentDashboard";

// New Pages
// Student new pages
import BookMentorship from "./pages/student/BookMentorship";
import RequestReferral from "./pages/student/RequestReferral";
import StudentJobs from "./pages/student/StudentJobs";
import StudentEvents from "./pages/student/StudentEvents";
import StudentNotifications from "./pages/student/StudentNotifications";

// Alumni new pages
import AlumniMentorship from "./pages/alumni/AlumniMentorship";
import AlumniReferrals from "./pages/alumni/AlumniReferrals";
import AlumniEvents from "./pages/alumni/AlumniEvents";
import AlumniNotifications from "./pages/alumni/AlumniNotifications";

// College Admin new pages
import UserVerification from "./pages/admin/UserVerification";
import UserManagement from "./pages/admin/UserManagement";
import ContentModeration from "./pages/admin/ContentModeration";
import CollegeEvents from "./pages/admin/CollegeEvents";
import AdminJobs from "./pages/admin/AdminJobs";
import Announcements from "./pages/admin/Announcements";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import BulkImport from "./pages/admin/BulkImport";
import AdminSettings from "./pages/admin/AdminSettings";

// System Admin new pages
import SysAdminDashboard from "./pages/sysadmin/SysAdminDashboard";
import CollegeManagement from "./pages/sysadmin/CollegeManagement";
import GlobalUsers from "./pages/sysadmin/GlobalUsers";
import RoleManagement from "./pages/sysadmin/RoleManagement";
import FeatureFlags from "./pages/sysadmin/FeatureFlags";
import AuditLogs from "./pages/sysadmin/AuditLogs";
import Escalations from "./pages/sysadmin/Escalations";
import PlatformAnalytics from "./pages/sysadmin/PlatformAnalytics";
import SystemHealth from "./pages/sysadmin/SystemHealth";
import SysAdminSettings from "./pages/sysadmin/SysAdminSettings";

// Auth pages
import { Login } from "./pages/auth/Login";
import { RegisterOrg } from "./pages/auth/RegisterOrg";

import NotFound from "./pages/NotFound";
import AlumnetProfilePage from "./pages/AlumniProfile";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import LandingPage from "./pages/LandingPage";
import Referrals from "./pages/Referrals";
import { AuthProvider } from "./lib/AuthContext";
import { useAuth } from "./lib/AuthContext";
import { ThemeProvider } from "./components/theme-provider";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles?: string[] }) => {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="border-2 border-border bg-card px-6 py-4 text-[10px] font-black uppercase tracking-[0.28em] text-foreground/70">
          Verifying Access...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
     if (userRole === "super_admin") return <Navigate to="/sysadmin/dashboard" replace />;
     if (userRole === "college_admin") return <Navigate to="/admin/dashboard" replace />;
     return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const DashboardRouter = () => {
   const { userRole } = useAuth();
   if (userRole === "student") return <Navigate to="/student/dashboard" replace />;
   if (userRole === "alumni") return <Navigate to="/alumni/dashboard" replace />;
   if (userRole === "college_admin") return <Navigate to="/admin/dashboard" replace />;
   if (userRole === "super_admin") return <Navigate to="/sysadmin/dashboard" replace />;
   return <Navigate to="/student/dashboard" replace />;
};

const App = () => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Main Redirect Dashboard Route */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/apply" element={<Apply />} />
              
              {/* Backward compatibility redirects */}
              <Route path="/profile" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/directory" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/connections" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/mentorship" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/referrals" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/org/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/org/alumni" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
              <Route path="/org/events" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />

              {/* STUDENT PAGES */}
              <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
              <Route path="/student/alumni" element={<ProtectedRoute allowedRoles={["student"]}><Directory /></ProtectedRoute>} />
              <Route path="/student/alumni/:id" element={<ProtectedRoute allowedRoles={["student"]}><AlumnetProfilePage /></ProtectedRoute>} />
              <Route path="/student/connections" element={<ProtectedRoute allowedRoles={["student"]}><Connections /></ProtectedRoute>} />
              <Route path="/student/messages" element={<ProtectedRoute allowedRoles={["student"]}><Messages /></ProtectedRoute>} />
              <Route path="/student/messages/:conversationId" element={<ProtectedRoute allowedRoles={["student"]}><Messages /></ProtectedRoute>} />
              <Route path="/student/mentorship/book/:alumniId" element={<ProtectedRoute allowedRoles={["student"]}><BookMentorship /></ProtectedRoute>} />
              <Route path="/student/mentorship" element={<ProtectedRoute allowedRoles={["student"]}><Mentorship /></ProtectedRoute>} />
              <Route path="/student/referral/new/:alumniId" element={<ProtectedRoute allowedRoles={["student"]}><RequestReferral /></ProtectedRoute>} />
              <Route path="/student/referrals" element={<ProtectedRoute allowedRoles={["student"]}><Referrals /></ProtectedRoute>} />
              <Route path="/student/jobs" element={<ProtectedRoute allowedRoles={["student"]}><StudentJobs /></ProtectedRoute>} />
              <Route path="/student/jobs/:jobId" element={<ProtectedRoute allowedRoles={["student"]}><StudentJobs /></ProtectedRoute>} />
              <Route path="/student/applications" element={<ProtectedRoute allowedRoles={["student"]}><StudentJobs /></ProtectedRoute>} />
              <Route path="/student/events" element={<ProtectedRoute allowedRoles={["student"]}><StudentEvents /></ProtectedRoute>} />
              <Route path="/student/events/:eventId" element={<ProtectedRoute allowedRoles={["student"]}><StudentEvents /></ProtectedRoute>} />
              <Route path="/student/profile" element={<ProtectedRoute allowedRoles={["student"]}><Profile /></ProtectedRoute>} />
              <Route path="/student/notifications" element={<ProtectedRoute allowedRoles={["student"]}><StudentNotifications /></ProtectedRoute>} />
              <Route path="/student/settings" element={<ProtectedRoute allowedRoles={["student"]}><Settings /></ProtectedRoute>} />

              {/* ALUMNI PAGES */}
              <Route path="/alumni/dashboard" element={<ProtectedRoute allowedRoles={["alumni"]}><Dashboard /></ProtectedRoute>} />
              <Route path="/alumni/profile" element={<ProtectedRoute allowedRoles={["alumni"]}><Profile /></ProtectedRoute>} />
              <Route path="/alumni/connections/requests" element={<ProtectedRoute allowedRoles={["alumni"]}><Connections /></ProtectedRoute>} />
              <Route path="/alumni/connections" element={<ProtectedRoute allowedRoles={["alumni"]}><Connections /></ProtectedRoute>} />
              <Route path="/alumni/messages" element={<ProtectedRoute allowedRoles={["alumni"]}><Messages /></ProtectedRoute>} />
              <Route path="/alumni/messages/:conversationId" element={<ProtectedRoute allowedRoles={["alumni"]}><Messages /></ProtectedRoute>} />
              <Route path="/alumni/mentorship/availability" element={<ProtectedRoute allowedRoles={["alumni"]}><AlumniMentorship /></ProtectedRoute>} />
              <Route path="/alumni/mentorship/requests" element={<ProtectedRoute allowedRoles={["alumni"]}><AlumniMentorship /></ProtectedRoute>} />
              <Route path="/alumni/mentorship/sessions" element={<ProtectedRoute allowedRoles={["alumni"]}><AlumniMentorship /></ProtectedRoute>} />
              <Route path="/alumni/referrals" element={<ProtectedRoute allowedRoles={["alumni"]}><AlumniReferrals /></ProtectedRoute>} />
              <Route path="/alumni/jobs/new" element={<ProtectedRoute allowedRoles={["alumni"]}><AlumniReferrals /></ProtectedRoute>} />
              <Route path="/alumni/jobs" element={<ProtectedRoute allowedRoles={["alumni"]}><AlumniReferrals /></ProtectedRoute>} />
              <Route path="/alumni/events" element={<ProtectedRoute allowedRoles={["alumni"]}><AlumniEvents /></ProtectedRoute>} />
              <Route path="/alumni/events/:eventId" element={<ProtectedRoute allowedRoles={["alumni"]}><AlumniEvents /></ProtectedRoute>} />
              <Route path="/alumni/notifications" element={<ProtectedRoute allowedRoles={["alumni"]}><AlumniNotifications /></ProtectedRoute>} />
              <Route path="/alumni/settings" element={<ProtectedRoute allowedRoles={["alumni"]}><Settings /></ProtectedRoute>} />

              {/* COLLEGE ADMIN PAGES */}
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["college_admin"]}><OrgDashboard /></ProtectedRoute>} />
              <Route path="/admin/users/verify" element={<ProtectedRoute allowedRoles={["college_admin"]}><UserVerification /></ProtectedRoute>} />
              <Route path="/admin/users/students" element={<ProtectedRoute allowedRoles={["college_admin"]}><UserManagement /></ProtectedRoute>} />
              <Route path="/admin/users/alumni" element={<ProtectedRoute allowedRoles={["college_admin"]}><UserManagement /></ProtectedRoute>} />
              <Route path="/admin/users/:userId" element={<ProtectedRoute allowedRoles={["college_admin"]}><UserManagement /></ProtectedRoute>} />
              <Route path="/admin/moderation" element={<ProtectedRoute allowedRoles={["college_admin"]}><ContentModeration /></ProtectedRoute>} />
              <Route path="/admin/events" element={<ProtectedRoute allowedRoles={["college_admin"]}><CollegeEvents /></ProtectedRoute>} />
              <Route path="/admin/events/new" element={<ProtectedRoute allowedRoles={["college_admin"]}><CollegeEvents /></ProtectedRoute>} />
              <Route path="/admin/events/:eventId/edit" element={<ProtectedRoute allowedRoles={["college_admin"]}><CollegeEvents /></ProtectedRoute>} />
              <Route path="/admin/jobs" element={<ProtectedRoute allowedRoles={["college_admin"]}><AdminJobs /></ProtectedRoute>} />
              <Route path="/admin/announcements" element={<ProtectedRoute allowedRoles={["college_admin"]}><Announcements /></ProtectedRoute>} />
              <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={["college_admin"]}><AdminAnalytics /></ProtectedRoute>} />
              <Route path="/admin/import" element={<ProtectedRoute allowedRoles={["college_admin"]}><BulkImport /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={["college_admin"]}><AdminSettings /></ProtectedRoute>} />

              {/* SYSTEM ADMIN PAGES */}
              <Route path="/sysadmin/dashboard" element={<ProtectedRoute allowedRoles={["super_admin"]}><SysAdminDashboard /></ProtectedRoute>} />
              <Route path="/sysadmin/colleges" element={<ProtectedRoute allowedRoles={["super_admin"]}><CollegeManagement /></ProtectedRoute>} />
              <Route path="/sysadmin/colleges/new" element={<ProtectedRoute allowedRoles={["super_admin"]}><CollegeManagement /></ProtectedRoute>} />
              <Route path="/sysadmin/colleges/:collegeId/edit" element={<ProtectedRoute allowedRoles={["super_admin"]}><CollegeManagement /></ProtectedRoute>} />
              <Route path="/sysadmin/users" element={<ProtectedRoute allowedRoles={["super_admin"]}><GlobalUsers /></ProtectedRoute>} />
              <Route path="/sysadmin/roles" element={<ProtectedRoute allowedRoles={["super_admin"]}><RoleManagement /></ProtectedRoute>} />
              <Route path="/sysadmin/features" element={<ProtectedRoute allowedRoles={["super_admin"]}><FeatureFlags /></ProtectedRoute>} />
              <Route path="/sysadmin/audit" element={<ProtectedRoute allowedRoles={["super_admin"]}><AuditLogs /></ProtectedRoute>} />
              <Route path="/sysadmin/escalations" element={<ProtectedRoute allowedRoles={["super_admin"]}><Escalations /></ProtectedRoute>} />
              <Route path="/sysadmin/analytics" element={<ProtectedRoute allowedRoles={["super_admin"]}><PlatformAnalytics /></ProtectedRoute>} />
              <Route path="/sysadmin/health" element={<ProtectedRoute allowedRoles={["super_admin"]}><SystemHealth /></ProtectedRoute>} />
              <Route path="/sysadmin/settings" element={<ProtectedRoute allowedRoles={["super_admin"]}><SysAdminSettings /></ProtectedRoute>} />

              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register-org" element={<RegisterOrg />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
