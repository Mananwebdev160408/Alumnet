import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { TestCredentialsDialog } from "@/components/auth/TestCredentialsDialog";
import { isSeedingInProgress } from "@/lib/firebaseSeeding";
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Calendar,
  Briefcase,
  Cpu,
  Info,
  Star,
  Flower
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";

const panelMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const DEFAULT_COLLEGES = [
  { id: "mit", name: "MIT" },
  { id: "stanford", name: "Stanford" },
  { id: "imperial", name: "Imperial Academy" },
  { id: "nus", name: "National University of Singapore (NUS)" },
  { id: "kyoto-tech", name: "Kyoto Tech" },
  { id: "bits-pilani", name: "BITS Pilani" },
  { id: "iit-delhi", name: "IIT Delhi" }
];

const features = [
  {
    icon: ShieldCheck,
    text: "Institution-verified profiles only",
  },
  {
    icon: Calendar,
    text: "1-on-1 mentorship scheduling",
  },
  {
    icon: Briefcase,
    text: "Exclusive alumni referral network",
  },
  {
    icon: Cpu,
    text: "AI-powered career guidance",
  },
];

const testimonial = {
  quote: "AlumNet connected me with a Google PM who reviewed my portfolio and referred me within two weeks. Life-changing.",
  author: "James Miller",
  role: "CS '25 - Imperial Academy",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesMiller",
  rating: 5,
};

export function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, userRole, loading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTestCreds, setShowTestCreds] = useState(false);
  const [activeTab, setActiveTab] = useState<"student" | "alumni" | "admin">("student");
  const [colleges, setColleges] = useState<{ id: string; name: string }[]>(DEFAULT_COLLEGES);
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  // Auto-redirect authenticated users to appropriate dashboard
  // Skip redirect if seeding is currently in progress (seeding triggers
  // multiple sign-in/sign-out cycles that would incorrectly navigate away).
  useEffect(() => {
    if (!authLoading && currentUser && userRole && !isSeedingInProgress) {
      if (userRole === "super_admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "college_admin") {
        navigate("/org/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [currentUser, userRole, authLoading, navigate]);

  // Fetch colleges from Firestore
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "colleges"));
        if (!querySnapshot.empty) {
          const list = querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name as string,
          }));
          // Merge lists without duplicates
          const merged = [...list];
          DEFAULT_COLLEGES.forEach(fallback => {
            if (!merged.some(c => c.id === fallback.id || c.name.toLowerCase() === fallback.name.toLowerCase())) {
              merged.push(fallback);
            }
          });
          setColleges(merged);
        }
      } catch (err) {
        console.error("Error fetching colleges, using fallbacks:", err);
      }
    };
    fetchColleges();
  }, []);

  const handleTestCredSelect = (email: string, password: string) => {
    setFormData({ email, password });
    
    // Auto-select corresponding tab role based on email/role keywords
    if (email.includes("student")) {
      setActiveTab("student");
      // Find a matching college ID if possible, e.g. "mit" or "stanford"
      setSelectedInstitution("imperial");
    } else if (email.includes("alumni")) {
      setActiveTab("alumni");
      setSelectedInstitution("imperial");
    } else if (email.includes("admin")) {
      setActiveTab("admin");
      if (email.includes("iitd")) {
        setSelectedInstitution("iit-delhi");
      } else {
        setSelectedInstitution("mit");
      }
    }

    toast({
      title: "Test credentials loaded",
      description: "The form has been populated with demo credentials.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast({
        title: "Welcome back",
        description: "Your access has been restored.",
      });
      // The useEffect above will handle the redirect once AuthContext updates
    } catch (error: unknown) {
      console.error("Login error:", error);
      const message = error instanceof Error ? error.message : String(error);
      toast({
        title: "Login failed",
        description: message || "We could not verify your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div className="relative grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Pane - Brand value proposition */}
        <motion.section
          {...panelMotion}
          className="relative hidden lg:flex flex-col justify-between p-12 xl:p-16 bg-[var(--charcoal)] text-white overflow-hidden border-r border-zinc-800"
        >
          {/* Subtle grid and radial color decoration */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(212,61,97,0.18),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 pointer-events-none" />
          
          {/* Brand Logo Header */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-primary text-white shadow-[2px_2px_0_0_rgba(0,0,0,0.5)]">
              <Flower className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-[0.25em] text-white leading-none">ALUMNET</h1>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mt-1">INSTITUTIONAL PLATFORM</p>
            </div>
          </div>

          {/* Value Prop Content */}
          <div className="relative z-10 my-auto py-12 max-w-xl space-y-8">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rotate-45" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">VERIFIED NETWORK</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white">
              Where Alumni <br /> Shape Futures.
            </h2>
            
            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
              An exclusive mentorship platform connecting students, alumni, and institutional administrators through verified networks.
            </p>

            {/* Features list */}
            <div className="space-y-4 pt-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="flex size-8 items-center justify-center bg-[var(--icon-bg-dark)] border border-[var(--icon-border-dark)] text-primary rounded-none">
                      <Icon className="size-4" />
                    </div>
                    <span className="text-sm font-medium text-zinc-200">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Testimonial Box */}
            <div className="pt-8">
              <div className="bg-[var(--panel-dark)] border border-zinc-800 p-6 max-w-md shadow-lg relative">
                <span className="absolute top-4 right-6 text-5xl text-primary/10 select-none">“</span>
                <p className="text-zinc-300 text-xs italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-850">
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="size-8 rounded-full border border-zinc-700 object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{testimonial.author}</h4>
                      <p className="text-[10px] text-zinc-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-3 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom trusted institutions block */}
          <div className="relative z-10 border-t border-zinc-850 pt-6">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500 mb-2">TRUSTED BY INSTITUTIONS</p>
            <div className="text-xs font-semibold text-zinc-400 tracking-wider">
              MIT &nbsp;&bull;&nbsp; Stanford &nbsp;&bull;&nbsp; Imperial &nbsp;&bull;&nbsp; NUS
            </div>
          </div>
        </motion.section>

        {/* Right Pane - Form Input */}
        <motion.section
          {...panelMotion}
          className="relative flex items-center justify-center p-6 sm:p-12 md:p-16 bg-[var(--light-bg)] overflow-y-auto"
        >
          {/* Subtle grid paper overlay */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div className="w-full max-w-[480px] space-y-8 relative z-10">
            {/* Top right Theme Toggle */}
            <div className="flex items-center justify-end gap-3 absolute -top-8 right-0">
              <ThemeToggle />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rotate-45" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">SECURE ACCESS</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight leading-none">Sign In</h3>
                <p className="text-zinc-500 text-sm font-medium">Access your institutional network.</p>
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-400 tracking-[0.25em] uppercase block">SIGN IN AS</label>
              <div className="grid grid-cols-3 gap-2">
                {(["student", "alumni", "admin"] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveTab(role)}
                    className={`py-3 text-center text-xs font-bold uppercase tracking-widest border border-zinc-950 transition-all ${
                      activeTab === role
                        ? "bg-zinc-950 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Institution Selection */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-zinc-400 tracking-[0.25em] uppercase block">INSTITUTION</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <Building2 className="size-4" />
                  </div>
                  <select
                    value={selectedInstitution}
                    onChange={(e) => setSelectedInstitution(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-white border border-zinc-300 text-sm focus:border-zinc-950 focus:ring-0 rounded-none outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select your institution...</option>
                    {colleges.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
                    <span className="text-xs">&#9660;</span>
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[9px] font-black text-zinc-400 tracking-[0.25em] uppercase block">INSTITUTIONAL EMAIL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <Mail className="size-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@institution.edu"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-300 text-sm focus:border-zinc-950 focus:ring-0 rounded-none outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-black text-zinc-400 tracking-[0.25em] uppercase block">PASSWORD</label>
                  <Link to="#" className="text-[10px] font-semibold text-primary uppercase tracking-wider hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="size-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-white border border-zinc-300 text-sm focus:border-zinc-950 focus:ring-0 rounded-none outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 transition"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Keep Me Signed In & SSL Secured Indicator */}
              <div className="flex items-center justify-between text-xs py-1">
                <label className="flex items-center gap-2 text-zinc-600 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="size-4 border-zinc-300 text-primary focus:ring-primary rounded-none"
                  />
                  <span>Keep me signed in</span>
                </label>
                <div className="flex items-center gap-1.5 text-zinc-500 font-semibold tracking-wider text-[9px] uppercase">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span>SSL SECURED</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-primary hover:bg-primary/95 text-white font-bold uppercase tracking-widest text-xs rounded-none border border-zinc-950 shadow-strong hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Flower className="size-4 animate-spin" />
                    SIGNING IN...
                  </span>
                ) : (
                  <span>SIGN IN TO ALUMNET &rarr;</span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 tracking-[0.25em] uppercase my-4">
              <span className="h-px w-full bg-zinc-200" />
              <span className="px-4">OR</span>
              <span className="h-px w-full bg-zinc-200" />
            </div>

            {/* Test Credentials Trigger */}
            <Button
              type="button"
              onClick={() => setShowTestCreds(true)}
              variant="outline"
              className="w-full py-6 bg-white hover:bg-zinc-50 text-zinc-800 font-bold uppercase tracking-widest text-xs rounded-none border border-zinc-950 shadow-strong hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <span>USE TEST CREDENTIALS</span>
              <span className="bg-zinc-100 border border-zinc-200 text-[8px] font-bold text-zinc-500 px-1.5 py-0.5 rounded leading-none">DEMO</span>
            </Button>

            {/* Register Institution Link */}
            <div className="text-center pt-2">
              <p className="text-xs text-zinc-600 font-medium">
                Is your institution not on AlumNet yet?{" "}
                <Link to="/auth/register-org" className="font-bold text-primary hover:underline underline-offset-2">
                  Register Institution
                </Link>
              </p>
            </div>

            {/* Security Disclaimer */}
            <div className="bg-zinc-100/80 border border-zinc-200/60 p-4 text-[11px] text-zinc-600 leading-relaxed flex items-start gap-3">
              <Info className="size-4 text-zinc-500 flex-shrink-0 mt-0.5" />
              <span>
                AlumNet is exclusively available to students, alumni, and administrators of registered institutions. Unauthorized access is prohibited.
              </span>
            </div>
          </div>
        </motion.section>

        {/* Credentials Dialog */}
        <TestCredentialsDialog onSelect={handleTestCredSelect} isOpen={showTestCreds} />
      </div>
    </div>
  );
}
