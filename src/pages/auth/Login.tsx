import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { TestCredentialsDialog } from "@/components/auth/TestCredentialsDialog";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Flower,
  KeyRound,
  LogIn,
  Mail,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

const panelMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTestCreds, setShowTestCreds] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTestCreds(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTestCredSelect = (email: string, password: string) => {
    setFormData({ email, password });
    toast({
      title: "Test scroll selected",
      description: "The fields have been prepared for this archive.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast({
        title: "Welcome back",
        description: "Your access to the alumni record has been restored.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "We could not verify your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName || "New User",
          email: user.email || "",
          profileImage: user.photoURL || "",
          role: "alumni",
          username: user.email ? user.email.split("@")[0] : user.uid,
        });
      }

      toast({
        title: "Google sign-in complete",
        description: "Your identity has been synced to the network.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Google Login error:", error);
      toast({
        title: "Sign-in failed",
        description: error.message || "We could not confirm the external node.",
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
      <div className="absolute inset-0 mountain-bg opacity-[0.16]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,183,197,0.24),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(188,0,45,0.12),transparent_28%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(26,26,26,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative grid min-h-screen md:grid-cols-[1.1fr_0.9fr]">
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,183,197,0.35),transparent_16%),radial-gradient(circle_at_78%_26%,rgba(255,183,197,0.22),transparent_14%),radial-gradient(circle_at_62%_64%,rgba(188,0,45,0.12),transparent_14%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
            <Link to="/" className="inline-flex items-center gap-4 self-start">
              <div className="flex size-12 items-center justify-center border-2 border-border bg-background/90 shadow-[6px_6px_0_0_rgba(26,26,26,0.12)]">
                <Flower className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.45em] text-foreground/50">AlumNet</p>
                <p className="text-sm italic text-foreground/70">sakura archive portal</p>
              </div>
            </Link>

            <div className="max-w-xl space-y-8">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/80">
                Kyoto spring / alumni record gate
              </p>
              <h1 className="text-6xl font-semibold leading-[0.95] tracking-tight text-foreground xl:text-7xl">
                Enter the <span className="text-primary">archive</span> with quiet intent.
              </h1>
              <p className="max-w-lg text-lg leading-8 text-foreground/70">
                A restrained paper-and-ink entrance for the network, framed by sketch mountains, drifting sakura, and a gentler rhythm.
              </p>
            </div>

            <div className="flex items-end justify-between gap-8">
              <div className="max-w-sm space-y-3 border-l-2 border-border/60 pl-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/45">Suggested path</p>
                <p className="text-sm leading-6 text-foreground/70">
                  Use a test credential if you are reviewing the flow. Otherwise sign in through email or Google.
                </p>
              </div>
              <div className="writing-vertical text-[10px] font-black uppercase tracking-[0.5em] text-foreground/35">
                spring mountain sketch
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          {...panelMotion}
          className="relative flex items-start justify-center px-4 pb-8 pt-6 sm:px-8 md:px-6 lg:items-center lg:px-14 lg:pb-12 lg:pt-12"
        >
          <div className="w-full max-w-[560px]">
            <div className="mb-4 flex items-center justify-end gap-3 sm:mb-5">
              <ThemeToggle />
              <Link to="/">
                <Button variant="ghost" className="h-10 border border-border/20 bg-background/70 px-4 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/60 backdrop-blur">
                  Home
                </Button>
              </Link>
            </div>

            <div className="rounded-[24px] border-2 border-border/70 bg-[rgba(247,243,233,0.9)] p-5 shadow-[10px_10px_0_0_rgba(26,26,26,0.08)] backdrop-blur sm:p-6 md:p-9">
            <div className="mb-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-background/75 px-4 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                <Sparkles className="size-3" />
                Alumni sign in
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-[3.35rem]">Welcome back</h2>
              <p className="max-w-md text-sm leading-7 text-foreground/65">
                A quieter login form with the same sakura theme, cleaned up for clarity and ease of use.
              </p>
            </div>

            <TestCredentialsDialog onSelect={handleTestCredSelect} isOpen={showTestCreds} />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/55">
                  <Mail className="size-3 text-primary" /> Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="scholar@temple.edu"
                  required
                  className="h-14 w-full border-2 border-border/70 bg-background/92 px-4 text-sm outline-none transition focus:border-primary placeholder:text-foreground/30"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/55">
                    <KeyRound className="size-3 text-primary" /> Password
                  </label>
                  <Link to="#" className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/80 underline-offset-4 hover:underline">
                    Need help?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your secret"
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

              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 w-full rounded-none border border-border bg-primary text-[10px] font-black uppercase tracking-[0.5em] text-white shadow-[8px_8px_0_0_rgba(26,26,26,0.12)] transition hover:-translate-y-0.5 hover:shadow-[12px_12px_0_0_rgba(26,26,26,0.10)] disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <Flower className="size-4 animate-pulse" />
                    Opening gate
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <LogIn className="size-4" />
                    Sign in
                  </span>
                )}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.35em] text-foreground/35">
              <span className="h-px flex-1 bg-border/25" />
              or
              <span className="h-px flex-1 bg-border/25" />
            </div>

            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="h-14 w-full rounded-none border-2 border-border/70 bg-background/90 text-[10px] font-black uppercase tracking-[0.4em] text-foreground shadow-none transition hover:border-primary hover:bg-primary/5"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-full border border-border/40 bg-white text-[10px] font-black text-foreground/70">
                  G
                </span>
                Continue with Google
              </span>
            </Button>

            <div className="mt-7 border-t border-border/15 pt-5 text-center">
              <p className="text-xs font-medium text-foreground/55">
                New here?{" "}
                <Link to="/auth/register-org" className="inline-flex items-center gap-1 font-black text-primary underline-offset-4 hover:underline">
                  Register an institution
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
