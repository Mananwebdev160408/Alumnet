import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import { Layout } from "./components/layout/Layout";

// Pages
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Directory } from "./pages/Directory";
import { Connections } from "./pages/Connections";
import { Messages } from "./pages/Messages";
import { Mentorship } from "./pages/Mentorship";
import { AIChat } from "./pages/AIChat";
import { About } from "./pages/About";
// Auth pages
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";

import NotFound from "./pages/NotFound";
import AlumnetProfilePage from "./pages/AlumniProfile";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Main App Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/directory" element={<Directory />} />
             <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/" element={<Index/>} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/alumni/:id" element={<AlumnetProfilePage/>}/>
            {/* <Route path="/connections" element={<Connections />} /> */}
            {/* <Route path="/mentorship" element={<Mentorship />} /> */}
            
            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
