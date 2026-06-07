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

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, loading } = useAuth();
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

  return children;
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
              {/* Main App Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/directory" element={<ProtectedRoute><Directory /></ProtectedRoute>} />
              <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/apply" element={<Apply />} />
              
              {/* Org Routes */}
              <Route path="/org/dashboard" element={<ProtectedRoute><OrgDashboard /></ProtectedRoute>} />
              <Route path="/org/alumni" element={<ProtectedRoute><ManageAlumni /></ProtectedRoute>} />
              <Route path="/org/events" element={<ProtectedRoute><OrgEvents /></ProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/organizations" element={<ProtectedRoute><ManageOrgs /></ProtectedRoute>} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/alumni/:id" element={<ProtectedRoute><AlumnetProfilePage/></ProtectedRoute>}/>
               <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
              <Route path="/mentorship" element={<ProtectedRoute><Mentorship /></ProtectedRoute>} />
              <Route path="/referrals" element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
              
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
