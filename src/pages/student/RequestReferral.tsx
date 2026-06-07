import React, { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Send, UploadCloud, FileText, Trash2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RequestReferral() {
  const { alumniId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobLink, setJobLink] = useState<string>("");
  const [pitch, setPitch] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Mock alumni data
  const alumni = {
    name: "Eleanor Pena",
    role: "Product Designer",
    company: "Figma",
    init: "EP",
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF document.",
          variant: "destructive"
        });
        return;
      }
      setUploadedFile({ name: file.name, size: file.size });
      toast({
        title: "Resume Uploaded",
        description: `${file.name} attached successfully.`
      });
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) {
      toast({
        title: "Role Required",
        description: "Please enter the target job title.",
        variant: "destructive"
      });
      return;
    }
    if (!uploadedFile) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume PDF.",
        variant: "destructive"
      });
      return;
    }
    if (!pitch.trim()) {
      toast({
        title: "Pitch Required",
        description: "Please enter a personal pitch explaining why you are a fit.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Request Submitted",
      description: `Your request has been added to ${alumni.name}'s referral queue.`
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 max-w-xl mx-auto w-full p-8 pt-12 text-center space-y-6">
        <Card className="border-2 border-border shadow-[8px_8px_0_0_rgba(0,0,0,1)] rounded-none p-8 bg-card text-card-foreground">
          <CardHeader className="items-center pb-2">
            <div className="h-16 w-16 bg-emerald-100 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-4 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <CardTitle className="text-3xl font-black uppercase tracking-tight">Request Sent!</CardTitle>
            <CardDescription className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mt-2">
              Referral application submitted successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 text-left border-t border-border mt-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Target Company</span>
              <p className="text-base font-bold uppercase">{alumni.company}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Target Role</span>
              <p className="text-base font-bold uppercase">{jobTitle}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Resume Attached</span>
              <p className="text-sm font-semibold flex items-center gap-1"><FileText className="h-4 w-4 text-primary" /> {uploadedFile?.name}</p>
            </div>
          </CardContent>
          <CardFooter className="pt-6 border-t border-border flex flex-col gap-2">
            <Button className="w-full bg-primary hover:bg-primary/95 text-white font-bold uppercase tracking-widest text-xs h-12 rounded-none border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all" onClick={() => navigate("/student/referrals")}>
              Track Referral Requests
            </Button>
            <Button variant="outline" className="w-full font-bold uppercase tracking-widest text-xs h-12 rounded-none border-2 border-border" onClick={() => navigate("/student/alumni")}>
              Back to Directory
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full p-8 pt-6 space-y-6">
      <Link to="/student/alumni" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors mb-2">
        <ArrowLeft className="size-3" /> Back to Directory
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">Request Referral</h2>
          <p className="text-muted-foreground">Request a professional referral at {alumni.company} from {alumni.name}.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
              <CardHeader className="border-b border-border">
                <CardTitle className="uppercase text-sm tracking-wider">Referral Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Target Company</span>
                  <Input value={alumni.company} disabled className="rounded-none border-2 border-border bg-muted/30 font-bold" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Target Job Title / Role *</span>
                  <Input placeholder="e.g. Frontend Engineer Intern" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required className="rounded-none border-2 border-border" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Job Description Link (Optional)</span>
                  <Input placeholder="https://careers.company.com/jobs/123" value={jobLink} onChange={(e) => setJobLink(e.target.value)} className="rounded-none border-2 border-border" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Upload Resume (PDF only) *</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />
                  {!uploadedFile ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-border p-6 text-center cursor-pointer hover:bg-muted/10 transition-colors flex flex-col items-center justify-center gap-2"
                    >
                      <UploadCloud className="h-8 w-8 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider">Select Resume PDF</span>
                      <span className="text-[10px] text-muted-foreground">PDF limit 5MB</span>
                    </div>
                  ) : (
                    <div className="border-2 border-border p-4 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-xs font-bold truncate max-w-[200px]">{uploadedFile.name}</p>
                          <p className="text-[10px] text-muted-foreground">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={handleRemoveFile} className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none">
              <CardHeader className="border-b border-border">
                <CardTitle className="uppercase text-sm tracking-wider">Your Pitch *</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase block">Why are you a fit for this role?</span>
                  <Textarea
                    placeholder="Provide a short pitch highlighting relevant projects, skills, or why you'd excel in this position..."
                    maxLength={300}
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className="rounded-none border-2 border-border min-h-[120px] resize-none"
                    required
                  />
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                    <span>Required. Maximum 300 characters.</span>
                    <span>{pitch.length}/300</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side overview */}
          <div className="space-y-6">
            <Card className="border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,1)] rounded-none bg-muted/20">
              <CardHeader className="border-b border-border">
                <CardTitle className="uppercase text-sm tracking-wider">Alumni Contact</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{alumni.init}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-sm uppercase">{alumni.name}</h4>
                    <p className="text-xs text-muted-foreground">{alumni.role} at {alumni.company}</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                  <p>Alumni will review your resume and pitch. If interested, they will submit a referral through their internal company portal.</p>
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t border-border">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/95 text-white font-bold uppercase tracking-widest text-xs h-12 rounded-none border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                  <Send className="mr-2 h-4 w-4" /> Send Request
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
