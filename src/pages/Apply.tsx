import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Landmark, 
  User, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft,
  UploadCloud,
  CheckCircle,
  Flower,
  ScrollText,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FADE_IN = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const Apply = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 font-serif relative overflow-hidden">
      <div className="absolute inset-0 mountain-bg opacity-10 pointer-events-none" />
      <div className="absolute inset-0 washi-texture opacity-20 pointer-events-none" />
      
      <div className="max-w-2xl mx-auto space-y-16 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 border-2 border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.4em] uppercase italic"
          >
            <Flower className="size-3" />
            Institutional Gateway
            <Flower className="size-3" />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tighter italic">Establish Your Lineage</h1>
            <p className="text-foreground/60 font-medium max-w-md mx-auto italic leading-relaxed">
              "Join the eternal garden of premier institutions and provide your alumni 
              with a legacy that blossoms through generations."
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-8 pt-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div 
                  className={cn(
                    "size-8 border-2 rotate-45 flex items-center justify-center transition-all duration-500",
                    step === s ? "border-primary bg-primary text-white shadow-[4px_4px_0px_0px_#1A1A1A]" : 
                    step > s ? "border-primary bg-primary/20 text-primary" : "border-border bg-white text-foreground/20"
                  )}
                >
                  <span className="-rotate-45 text-[10px] font-bold">{s}</span>
                </div>
                {s < 3 && <div className={cn("h-0.5 w-12 transition-all duration-500", step > s ? "bg-primary" : "bg-border/20")} />}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-md p-12 md:p-16 border-4 border-border shadow-[16px_16px_0px_0px_#1A1A1A] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <Landmark className="size-32" />
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" {...FADE_IN} className="space-y-10">
                <div className="space-y-8">
                   <div className="flex items-center gap-4 border-b-2 border-border pb-4">
                      <Globe className="size-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground italic">Institution Details</h3>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 ml-1 italic">Institute Name</label>
                        <input className="w-full bg-background/50 border-2 border-border/20 rounded-none py-4 px-6 text-sm font-bold focus:border-primary focus:ring-0 transition-all font-serif italic" placeholder="e.g. Stanford University" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 ml-1 italic">Location</label>
                          <input className="w-full bg-background/50 border-2 border-border/20 rounded-none py-4 px-6 text-sm font-bold focus:border-primary focus:ring-0 transition-all font-serif italic" placeholder="City, Country" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 ml-1 italic">Website</label>
                          <input className="w-full bg-background/50 border-2 border-border/20 rounded-none py-4 px-6 text-sm font-bold focus:border-primary focus:ring-0 transition-all font-serif italic" placeholder="university.edu" />
                        </div>
                      </div>
                   </div>
                </div>
                <Button onClick={nextStep} className="w-full h-16 bg-primary text-white rounded-none font-bold uppercase tracking-widest shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4 text-xs">
                  Continue Application
                  <ArrowRight className="size-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" {...FADE_IN} className="space-y-10">
                <div className="space-y-8">
                   <div className="flex items-center gap-4 border-b-2 border-border pb-4">
                      <User className="size-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground italic">Point of Contact</h3>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 ml-1 italic">Custodian Name</label>
                        <input className="w-full bg-background/50 border-2 border-border/20 rounded-none py-4 px-6 text-sm font-bold focus:border-primary focus:ring-0 transition-all font-serif italic" placeholder="Full Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 ml-1 italic">Designation</label>
                        <input className="w-full bg-background/50 border-2 border-border/20 rounded-none py-4 px-6 text-sm font-bold focus:border-primary focus:ring-0 transition-all font-serif italic" placeholder="e.g. Dean of Alumni Relations" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40 ml-1 italic">Official Scroll (Email)</label>
                        <input className="w-full bg-background/50 border-2 border-border/20 rounded-none py-4 px-6 text-sm font-bold focus:border-primary focus:ring-0 transition-all font-serif italic" placeholder="poc@university.edu" />
                      </div>
                   </div>
                </div>
                <div className="flex gap-6">
                  <Button variant="outline" onClick={prevStep} className="px-8 h-16 border-2 border-border bg-white rounded-none font-bold text-foreground hover:bg-secondary/10 transition-all shadow-[4px_4px_0px_0px_#1A1A1A] text-xs">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="flex-1 h-16 bg-primary text-white rounded-none font-bold uppercase tracking-widest shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4 text-xs">
                    Review and Upload
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" {...FADE_IN} className="space-y-10">
                <div className="space-y-8">
                   <div className="flex items-center gap-4 border-b-2 border-border pb-4 text-center justify-center">
                      <ScrollText className="size-5 text-primary" />
                      <h3 className="text-xl font-bold text-foreground italic">Verification Records</h3>
                   </div>
                   <div className="border-4 border-dashed border-border/20 bg-primary/5 p-12 hover:bg-primary/10 cursor-pointer transition-all group relative overflow-hidden">
                      <div className="absolute inset-0 washi-texture opacity-10 pointer-events-none" />
                      <div className="relative z-10 text-center">
                        <div className="size-20 border-2 border-border bg-white mx-auto mb-6 flex items-center justify-center rotate-45 group-hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_#1A1A1A]">
                          <UploadCloud className="size-8 text-primary -rotate-45" />
                        </div>
                        <p className="font-bold text-foreground italic text-lg">Upload Accreditation Scrolls</p>
                        <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mt-2">PDF, JPEG, or PNG (Max 10MB)</p>
                      </div>
                   </div>
                </div>
                <div className="flex gap-6">
                  <Button variant="outline" onClick={prevStep} className="px-8 h-16 border-2 border-border bg-white rounded-none font-bold text-foreground hover:bg-secondary/10 transition-all shadow-[4px_4px_0px_0px_#1A1A1A] text-xs">
                    Back
                  </Button>
                  <Button onClick={() => setStep(4)} className="flex-1 h-16 bg-primary text-white rounded-none font-bold uppercase tracking-widest shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4 text-xs">
                    Submit to the Records
                    <CheckCircle className="size-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10 py-4">
                <div className="relative size-32 mx-auto">
                   <div className="absolute inset-0 bg-primary/10 rotate-45 animate-pulse"></div>
                   <div className="relative size-32 border-4 border-border bg-white flex items-center justify-center rotate-45 shadow-[8px_8px_0px_0px_#1A1A1A]">
                      <ShieldCheck className="size-16 text-primary -rotate-45" />
                   </div>
                </div>
                <div className="space-y-4">
                   <h2 className="text-4xl font-bold text-foreground tracking-tighter italic uppercase">Scroll Received</h2>
                   <p className="text-[11px] font-bold text-primary tracking-[0.5em] uppercase italic">— ID: #REQ_88291 —</p>
                </div>
                <p className="text-foreground/60 text-lg font-medium leading-relaxed max-w-sm mx-auto italic">
                  Your institutional request has been etched into our records. 
                  Expect a response at the provided email within 48 standard hours.
                </p>
                <Button onClick={() => navigate("/")} className="w-full h-20 bg-foreground text-white rounded-none font-bold uppercase tracking-[0.3em] hover:bg-foreground/90 transition-all shadow-[8px_8px_0px_0px_#1A1A1A] text-xs">
                   Return to the Garden
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center justify-center gap-4 opacity-30">
           <div className="h-px w-24 bg-border" />
           <p className="text-[10px] font-bold text-foreground uppercase tracking-[0.4em] italic">
             AES-256 SUMI_ENCRYPTED
           </p>
           <div className="h-px w-24 bg-border" />
        </div>
      </div>
    </div>
  );
};
