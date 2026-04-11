import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IndustrialButton } from "@/components/IndustrialButton";
import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  User, 
  Briefcase, 
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

export const Apply = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <StatusBadge status="pending" label="Institutional Gateway" className="mx-auto mb-4" />
          <h1 className="text-4xl font-display font-black tracking-tighter uppercase mb-2">
            Apply for <span className="text-safety-orange">Access</span>
          </h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            Step {step} of 3 — Secure Channel Initialization
          </p>
          
          {/* Progress Bar */}
          <div className="mt-8 flex gap-1 h-1 w-full bg-foreground/5">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`flex-1 transition-all duration-500 ${step >= s ? 'bg-safety-orange' : 'bg-transparent'}`} 
              />
            ))}
          </div>
        </div>

        <GlassCard className="p-0 border-foreground/10">
          <div className="p-8 lg:p-12">
            {step === 1 && (
              <div className="staggered-reveal space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Institute Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input placeholder="e.g. Stanford University" className="pl-10 h-12 bg-background border-foreground/10 rounded-none focus-visible:ring-safety-orange" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input placeholder="City, Country" className="pl-10 h-12 bg-background border-foreground/10 rounded-none focus-visible:ring-safety-orange" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input placeholder="university.edu" className="pl-10 h-12 bg-background border-foreground/10 rounded-none focus-visible:ring-safety-orange" />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Official Email Domain</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input placeholder="@edu.institution.ac" className="pl-10 h-12 bg-background border-foreground/10 rounded-none focus-visible:ring-safety-orange" />
                    </div>
                  </div>
                </div>
                <IndustrialButton variant="safety" className="w-full h-14" onClick={nextStep}>
                  Next Protocol
                  <ArrowRight className="ml-2 size-4" />
                </IndustrialButton>
              </div>
            )}

            {step === 2 && (
              <div className="staggered-reveal space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">POC Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input placeholder="Point of Contact Full Name" className="pl-10 h-12 bg-background border-foreground/10 rounded-none focus-visible:ring-safety-orange" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Designation</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input placeholder="e.g. Dean of Alumni Relations" className="pl-10 h-12 bg-background border-foreground/10 rounded-none focus-visible:ring-safety-orange" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Official Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input placeholder="poc@university.edu" className="pl-10 h-12 bg-background border-foreground/10 rounded-none focus-visible:ring-safety-orange" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <IndustrialButton variant="outline" className="w-1/3 h-14" onClick={prevStep}>
                    <ArrowLeft className="mr-2 size-4" />
                    Back
                  </IndustrialButton>
                  <IndustrialButton variant="safety" className="flex-1 h-14" onClick={nextStep}>
                    Next Protocol
                    <ArrowRight className="ml-2 size-4" />
                  </IndustrialButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="staggered-reveal space-y-6">
                <div className="space-y-4">
                  <Label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Verification Documents</Label>
                  <div className="border-2 border-dashed border-foreground/10 bg-foreground/[0.02] p-12 text-center group hover:border-safety-orange/50 transition-colors cursor-pointer">
                    <Upload className="size-10 mx-auto mb-4 text-muted-foreground group-hover:text-safety-orange transition-colors" />
                    <p className="font-display font-bold text-sm tracking-widest uppercase mb-1">Upload Accreditation</p>
                    <p className="text-[10px] font-mono text-muted-foreground">PDF, JPEG or PNG (Max 10MB)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <IndustrialButton variant="outline" className="w-1/3 h-14" onClick={prevStep}>
                    <ArrowLeft className="mr-2 size-4" />
                    Back
                  </IndustrialButton>
                  <IndustrialButton variant="safety" className="flex-1 h-14" onClick={() => setStep(4)}>
                    Submit Application
                    <CheckCircle2 className="ml-2 size-4 text-white" />
                  </IndustrialButton>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="staggered-reveal text-center py-10 space-y-6">
                <div className="size-20 bg-safety-orange/10 flex items-center justify-center mx-auto border border-safety-orange/20">
                  <CheckCircle2 className="size-10 text-safety-orange" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-black tracking-tighter uppercase">Application <span className="text-safety-orange">Transmitted</span></h2>
                  <p className="text-sm text-muted-foreground font-mono uppercase mt-2">ID: #REQ_{Math.floor(Math.random() * 100000)}</p>
                </div>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Your institutional request is now being verified by our Global Command Center. 
                  Expect a response at the provided POC email within 48 standard cycles.
                </p>
                <IndustrialButton variant="outline" className="w-full h-14" onClick={() => navigate("/")}>
                   Return to Surface
                </IndustrialButton>
              </div>
            )}
          </div>
        </GlassCard>
        
        <p className="mt-8 text-center text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
          All data is processed through AES-256 encrypted channels.
        </p>
      </div>
    </div>
  );
};
