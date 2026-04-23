import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { TestCredentialsDialog } from "@/components/auth/TestCredentialsDialog";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Eye,
  EyeOff,
  Flower,
  KeyRound,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

const orgTypes = [
  "University",
  "Engineering College",
  "Technology Hub",
  "Corporate Alumni Network",
  "Professional Association",
];

const panelMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export const RegisterOrg = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    adminName: "",
    email: "",
    password: "",
    role: "collegeadmin",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTestCreds, setShowTestCreds] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTestCreds(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTestCredSelect = (email: string, password: string) => {
    setFormData((prev) => ({ ...prev, email, password }));
    toast({
      title: "Test scroll selected",
      description: "The fields have been prepared for review.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const orgId = formData.orgName.toLowerCase().replace(/\s+/g, "-");
      await setDoc(doc(db, "colleges", orgId), {
        name: formData.orgName,
        type: formData.orgType,
        adminUid: user.uid,
        createdAt: new Date(),
        status: "pending_verification",
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.adminName,
        email: formData.email,
        role: "collegeadmin",
        college: formData.orgName,
        collegeId: orgId,
        createdAt: new Date(),
        verified: true,
      });

      toast({
        title: "Institution created",
        description: `${formData.orgName} has been added to the network.`,
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "We could not create the institution record.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 mountain-bg opacity-[0.16]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,183,197,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(188,0,45,0.12),transparent_28%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(26,26,26,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative grid min-h-screen md:grid-cols-[1.02fr_0.98fr]">
        <motion.section
          {...panelMotion}
          className="relative hidden overflow-hidden border-r-2 border-border/70 md:block"
        >
          <img
            src="/japanese_sakura_mountains_sketch.png"
            alt="Sketch of Japanese mountains with sakura trees"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,233,0.08)_0%,rgba(247,243,233,0.58)_58%,rgba(247,243,233,0.94)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,183,197,0.32),transparent_16%),radial-gradient(circle_at_82%_30%,rgba(255,183,197,0.20),transparent_14%),radial-gradient(circle_at_60%_68%,rgba(188,0,45,0.12),transparent_14%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
            <Link to="/" className="inline-flex items-center gap-4 self-start">
              <div className="flex size-12 items-center justify-center border-2 border-border bg-background/90 shadow-[6px_6px_0_0_rgba(26,26,26,0.12)]">
                <Flower className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.45em] text-foreground/50">AlumNet</p>
                <p className="text-sm italic text-foreground/70">founder's register</p>
              </div>
            </Link>

            <div className="max-w-xl space-y-8">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/80">
                Institutional registration / sakura ridge
              </p>
              <h1 className="text-6xl font-semibold leading-[0.95] tracking-tight text-foreground xl:text-7xl">
                Set the <span className="text-primary">foundation</span> with a clear seal.
              </h1>
              <p className="max-w-lg text-lg leading-8 text-foreground/70">
                A quieter registration form for colleges and associations, shaped by paper texture, ink borders, and sketched spring hills.
              </p>
            </div>

            <div className="flex items-end justify-between gap-8">
              <div className="max-w-sm space-y-3 border-l-2 border-border/60 pl-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/45">Setup note</p>
                <p className="text-sm leading-6 text-foreground/70">
                  Use the test credentials if you are checking the flow, then register a fresh institutional record.
                </p>
              </div>
              <div className="writing-vertical text-[10px] font-black uppercase tracking-[0.5em] text-foreground/35">
                sakura ridge register
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          {...panelMotion}
          className="relative flex items-start justify-center px-4 pb-8 pt-6 sm:px-8 md:px-6 lg:items-center lg:px-14 lg:pb-12 lg:pt-12"
        >
          <div className="w-full max-w-[640px]">
            <div className="mb-4 flex items-center justify-end gap-3 sm:mb-5">
              <ThemeToggle />
              <Link to="/auth/login">
                <Button variant="ghost" className="h-10 border border-border/20 bg-background/70 px-4 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/60 backdrop-blur">
                  Sign in
                </Button>
              </Link>
            </div>

            <div className="rounded-[24px] border-2 border-border/70 bg-[rgba(247,243,233,0.9)] p-5 shadow-[10px_10px_0_0_rgba(26,26,26,0.08)] backdrop-blur sm:p-6 md:p-9">
            <div className="mb-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-background/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                <Sparkles className="size-3" />
                Institution onboarding
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-[3.35rem]">Found an institution</h2>
              <p className="max-w-md text-sm leading-7 text-foreground/65">
                This version removes the clutter and keeps the sakura theme as a calm registration surface.
              </p>
            </div>

            <TestCredentialsDialog onSelect={handleTestCredSelect} isOpen={showTestCreds} />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/55">
                    <Building2 className="size-3 text-primary" /> Institution name
                  </label>
                  <input
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleChange}
                    placeholder="Imperial Academy of Arts"
                    required
                    className="h-14 w-full border-2 border-border/70 bg-background/92 px-4 text-sm outline-none transition focus:border-primary placeholder:text-foreground/30"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/55">
                    <Sparkles className="size-3 text-primary" /> Institution type
                  </label>
                  <div className="relative">
                    <select
                      name="orgType"
                      value={formData.orgType}
                      onChange={handleChange}
                      required
                      className="h-14 w-full appearance-none border-2 border-border/70 bg-background/92 px-4 text-sm outline-none transition focus:border-primary"
                    >
                      <option value="" disabled>
                        Select heritage type
                      </option>
                      {orgTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-foreground/45" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/55">
                    <User className="size-3 text-primary" /> Admin name
                  </label>
                  <input
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="h-14 w-full border-2 border-border/70 bg-background/92 px-4 text-sm outline-none transition focus:border-primary placeholder:text-foreground/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/55">
                    <Mail className="size-3 text-primary" /> Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@academy.edu"
                    required
                    className="h-14 w-full border-2 border-border/70 bg-background/92 px-4 text-sm outline-none transition focus:border-primary placeholder:text-foreground/30"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between gap-4">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/55">
                      <KeyRound className="size-3 text-primary" /> Access seal
                    </label>
                    <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/35">
                      institution credential
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Initialize a secure seal"
                      required
                        className="h-14 w-full border-2 border-border/70 bg-background/92 px-4 pr-14 text-sm outline-none transition focus:border-primary placeholder:text-foreground/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-foreground/45 transition hover:text-primary"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 w-full rounded-none border border-border bg-primary text-[10px] font-black uppercase tracking-[0.5em] text-white shadow-[8px_8px_0_0_rgba(26,26,26,0.12)] transition hover:-translate-y-0.5 hover:shadow-[12px_12px_0_0_rgba(26,26,26,0.10)] disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <Flower className="size-4 animate-pulse" />
                    Building archive
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Sparkles className="size-4" />
                    Create institution
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-7 border-t border-border/15 pt-5 text-center">
              <p className="text-xs font-medium text-foreground/55">
                Already registered?{" "}
                <Link to="/auth/login" className="inline-flex items-center gap-1 font-black text-primary underline-offset-4 hover:underline">
                  Return to sign in
                  <ArrowRight className="size-3" />
                </Link>
              </p>
            </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
