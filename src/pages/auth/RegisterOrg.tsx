import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { TestCredentialsDialog } from "@/components/auth/TestCredentialsDialog";
import {
  ArrowLeft,
  Building2,
  ChevronDown,
  Eye,
  EyeOff,
  Flower,
  Mail,
  Sparkles,
  User,
  Globe,
  FileText,
  Phone,
  MapPin,
  UploadCloud,
  Trash2,
  Briefcase,
  Check,
  Info,
  Lock,
  Building,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export const RegisterOrg = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    institutionType: "university", // 'university' | 'college' | 'institute'
    orgName: "",
    shortName: "",
    website: "",
    domain: "",
    country: "",
    cityState: "",
    description: "",
    
    adminFirstName: "",
    adminLastName: "",
    adminEmail: "",
    adminJobTitle: "",
    adminPhone: "",
    adminDepartment: "",
    password: "",
    confirmPassword: "",
    
    documentType: "",
    expectedStudents: "",
    features: {
      membershipScheduling: true,
      alumniReferralPortal: true,
      alumniDirectory: true,
      aiCareerAssistant: false,
      messagingHub: false,
      adminAnalytics: false,
    },
    referralSource: "",
    agreeToTerms: false,
    authorizedToRegister: false,
    marketingUpdates: false,
  });

  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: number; type: string }>>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTestCreds, setShowTestCreds] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("alumnet_onboarding_draft");
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        // Load draft and merge with default values
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          password: "", // Keep passwords blank for security
          confirmPassword: "",
        }));
        if (parsed.uploadedFiles) {
          setUploadedFiles(parsed.uploadedFiles);
        }
        toast({
          title: "Draft loaded",
          description: "Your previously saved registration draft has been restored.",
        });
      } catch (e) {
        console.error("Error parsing saved draft", e);
      }
    }
    
    // Automatically trigger test credentials after a short delay for developers
    const timer = setTimeout(() => setShowTestCreds(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Save Draft to localStorage
  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      password: "",
      confirmPassword: "",
      uploadedFiles,
    };
    localStorage.setItem("alumnet_onboarding_draft", JSON.stringify(draftData));
    toast({
      title: "Draft saved",
      description: "Progress saved locally. You can resume this form at any time.",
    });
  };

  // Pre-fill test credentials
  const handleTestCredSelect = (email: string, password: string) => {
    setFormData({
      institutionType: "university",
      orgName: "Imperial Academy of Technology",
      shortName: "IAT",
      website: "https://www.imperial.edu",
      domain: "imperial.edu",
      country: "United Kingdom",
      cityState: "London, England",
      description: "A world-class university focusing on science, engineering, medicine, and business.",
      adminFirstName: "Sarah",
      adminLastName: "Chen",
      adminEmail: email,
      adminJobTitle: "Director of Alumni Relations",
      adminPhone: "+44 20 7589 5111",
      adminDepartment: "Office of Advancement",
      password: password,
      confirmPassword: password,
      documentType: "Accreditation Certificate",
      expectedStudents: "10,000 - 25,000",
      features: {
        membershipScheduling: true,
        alumniReferralPortal: true,
        alumniDirectory: true,
        aiCareerAssistant: true,
        messagingHub: false,
        adminAnalytics: true,
      },
      referralSource: "Colleague / Word of Mouth",
      agreeToTerms: true,
      authorizedToRegister: true,
      marketingUpdates: true,
    });
    setUploadedFiles([
      { name: "imperial_charter_2026.pdf", size: 4850000, type: "application/pdf" }
    ]);
    toast({
      title: "Test credentials selected",
      description: "The form has been pre-populated with test credentials and school details.",
    });
  };

  // Input Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFeatureToggle = (featureKey: keyof typeof formData.features) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [featureKey]: !prev.features[featureKey],
      },
    }));
  };

  // Mock file upload handlers
  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      toast({
        title: "File attached",
        description: `Successfully attached ${newFiles.length} file(s).`,
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!formData.agreeToTerms || !formData.authorizedToRegister) {
      toast({
        title: "Agreements required",
        description: "You must agree to the terms and authorize the registration to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Your access seal passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (uploadedFiles.length === 0) {
      toast({
        title: "Missing documentation",
        description: "Please upload at least one accreditation or verification document.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.adminEmail,
        formData.password
      );
      const user = userCredential.user;

      // 2. Format College/Org ID
      const orgId = formData.orgName.toLowerCase().replace(/\s+/g, "-");

      // 3. Write to Firestore: colleges
      await setDoc(doc(db, "colleges", orgId), {
        name: formData.orgName,
        type: formData.institutionType,
        shortName: formData.shortName,
        website: formData.website,
        domain: formData.domain,
        country: formData.country,
        cityState: formData.cityState,
        description: formData.description,
        adminUid: user.uid,
        adminName: `${formData.adminFirstName} ${formData.adminLastName}`,
        expectedStudents: formData.expectedStudents,
        features: formData.features,
        referralSource: formData.referralSource,
        documents: uploadedFiles,
        createdAt: new Date(),
        status: "pending_verification",
      });

      // 4. Write to Firestore: users
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: `${formData.adminFirstName} ${formData.adminLastName}`,
        email: formData.adminEmail,
        role: "college_admin",
        college: formData.orgName,
        collegeId: orgId,
        phone: formData.adminPhone,
        department: formData.adminDepartment,
        jobTitle: formData.adminJobTitle,
        createdAt: new Date(),
        verified: true, // Auto-verified as the founder/admin (requires college approval to access main app)
      });

      // Clear draft on success
      localStorage.removeItem("alumnet_onboarding_draft");

      toast({
        title: "Registration request submitted",
        description: `${formData.orgName} has been queued for verification.`,
      });
      
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Registration error:", error);
      const message = error instanceof Error ? error.message : String(error);
      toast({
        title: "Registration failed",
        description: message || "We could not submit the registration record.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#faf8f4] text-foreground">
      {/* Background aesthetics matching Sakura theme */}
      <div className="absolute inset-0 mountain-bg opacity-[0.12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,183,197,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(188,0,45,0.1),transparent_28%)]" />
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(26,26,26,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative grid min-h-screen md:grid-cols-[0.8fr_1.2fr] lg:grid-cols-[0.7fr_1.3fr] xl:grid-cols-[0.6fr_1.4fr]">
        
        {/* Left Side: Solid dark charcoal branding panel */}
        <aside className="relative hidden flex-col justify-between bg-[#161616] p-10 text-white md:flex border-r border-[#1a1a1a]">
          <div className="space-y-12">
            {/* Branding Header */}
            <Link to="/" className="inline-flex items-center gap-4 self-start">
              <div className="flex size-11 items-center justify-center bg-[#BC002D] shadow-[4px_4px_0_0_rgba(255,255,255,0.15)] rounded">
                <Flower className="size-6 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.45em] text-[#FFB7C5]">AlumNet</p>
                <p className="text-xs italic text-zinc-400">institutional platform</p>
              </div>
            </Link>

            {/* Core Pitch Section */}
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.45em] text-[#BC002D]">
                ◼ Institution Onboarding
              </p>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-zinc-100 lg:text-5xl">
                Bring Your Institution to AlumNet.
              </h1>
              <p className="text-sm leading-relaxed text-zinc-400">
                Register your college or university to unlock a verified alumni-student membership network for your entire community.
              </p>
            </div>

            {/* Feature Checkmarks */}
            <ul className="space-y-4 text-xs font-semibold text-zinc-300">
              {[
                "Verification by AlumNet Super Admins",
                "Unlimited students & alumni onboarding",
                "Dedicated college admin dashboard",
                "Membership scheduling & referral portal"
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#3a1b22] text-[#FFB7C5]">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Panel Elements */}
          <div className="mt-12 space-y-8">
            {/* Registration Progress Visualizer */}
            <div className="space-y-3">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#BC002D]">Registration Process</p>
              <ol className="space-y-3 text-[11px] font-semibold text-zinc-400">
                <li className="flex items-center gap-3">
                  <div className="flex size-4 items-center justify-center rounded-sm bg-[#BC002D] text-white">
                    <Check className="size-2.5 stroke-[3]" />
                  </div>
                  <span className="text-zinc-200">1. Submit institution details & documents</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex size-4 items-center justify-center rounded-sm bg-[#BC002D] text-white">
                    <Check className="size-2.5 stroke-[3]" />
                  </div>
                  <span className="text-zinc-200">2. AlumNet reviews within 2-3 business days</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-4 rounded-sm border border-zinc-700 bg-zinc-900" />
                  <span>3. Approval email & admin credentials issued</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="size-4 rounded-sm border border-zinc-700 bg-zinc-900" />
                  <span>4. Invite students & alumni to your network</span>
                </li>
              </ol>
            </div>

            {/* Compliance Info Card */}
            <div className="border border-[#38161d] bg-[#221013] p-4 rounded-sm">
              <div className="flex gap-2 text-zinc-300">
                <Info className="size-4 shrink-0 text-[#FFB7C5] mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#FFB7C5]">Review Timeline</p>
                  <p className="text-[11px] leading-relaxed text-zinc-400">
                    Applications are reviewed by AlumNet's compliance team. Ensure all documentation is accurate to avoid delays.
                  </p>
                </div>
              </div>
            </div>

            {/* Trusted Footer */}
            <div className="space-y-2 border-t border-zinc-800 pt-6">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Trusted by Institutions</p>
              <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-400">
                MIT <span className="text-zinc-600">•</span> STANFORD <span className="text-zinc-600">•</span> IMPERIAL <span className="text-zinc-600">•</span> NUS
              </p>
            </div>
          </div>
        </aside>

        {/* Right Side: Scrollable detailed onboarding form */}
        <main className="flex flex-col min-h-screen overflow-y-auto bg-[#faf8f4] washi-texture px-4 py-8 sm:px-10 md:px-8 lg:px-16 xl:px-24">
          
          {/* Top Utilities Header */}
          <header className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4">
            <Link to="/auth/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-[#BC002D] transition-colors">
              <ArrowLeft className="size-3" />
              Back to Login
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#BC002D] bg-[#f2ede0] px-3 py-1 border border-zinc-200">
                • Institution Registration
              </span>
            </div>
          </header>

          {/* Form Header Info */}
          <div className="mb-10 space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Register Institution</h2>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
              Complete the form below to request access for your college or university. All fields marked <span className="text-[#BC002D]">*</span> are required.
            </p>
          </div>

          <TestCredentialsDialog onSelect={handleTestCredSelect} isOpen={showTestCreds} />

          {/* Main Action Form */}
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* SECTION 1: INSTITUTION TYPE */}
            <fieldset className="space-y-5">
              <legend className="flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-zinc-800">
                <span className="text-xs text-[#BC002D] mr-2">■</span> Institution Type
              </legend>
              
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    id: "university",
                    title: "University",
                    desc: "4-year degree granting university or college",
                  },
                  {
                    id: "college",
                    title: "College",
                    desc: "2-year degree or community college",
                  },
                  {
                    id: "institute",
                    title: "Institute",
                    desc: "Technical institute or research institution",
                  },
                ].map((type) => {
                  const isSelected = formData.institutionType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, institutionType: type.id }))}
                      className={`flex flex-col p-5 text-left border-2 transition-all ${
                        isSelected
                          ? "bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-[6px_6px_0_0_rgba(188,0,45,0.25)]"
                          : "bg-white border-zinc-200 text-zinc-800 hover:border-zinc-400"
                      }`}
                    >
                      <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? "text-[#FFB7C5]" : "text-zinc-400"}`}>
                        {type.id}
                      </span>
                      <h4 className="mt-1 text-base font-bold tracking-tight">{type.title}</h4>
                      <p className={`mt-2 text-xs leading-normal ${isSelected ? "text-zinc-300" : "text-zinc-500"}`}>
                        {type.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* SECTION 2: INSTITUTION DETAILS */}
            <fieldset className="space-y-6">
              <legend className="flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-zinc-800">
                <span className="text-xs text-[#BC002D] mr-2">■</span> Institution Details
              </legend>

              <div className="grid gap-5 sm:grid-cols-3">
                {/* Official Institution Name */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    Official Institution Name <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="orgName"
                      value={formData.orgName}
                      onChange={handleChange}
                      placeholder="e.g. Imperial Academy of Technology"
                      required
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                  </div>
                </div>

                {/* Abbreviation */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Short Name / Abbreviation <span className="text-[#BC002D]">*</span>
                  </label>
                  <input
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                    placeholder="e.g. IAT"
                    required
                    className="h-12 w-full border border-zinc-300 bg-white px-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                  />
                </div>

                {/* Official Website */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    Official Website <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.institution.edu"
                      required
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                  </div>
                </div>

                {/* Email Domain */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Institutional Email Domain <span className="text-[#BC002D]">*</span>
                  </label>
                  <input
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    placeholder="e.g. imperial.edu"
                    required
                    className="h-12 w-full border border-zinc-300 bg-white px-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                  />
                  <p className="text-[10px] text-zinc-500 italic mt-1">
                    Students & alumni registration is restricted to this domain.
                  </p>
                </div>

                {/* Country Dropdown */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Country <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="h-12 w-full appearance-none border border-zinc-300 bg-white px-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    >
                      <option value="">Select country...</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="India">India</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>

                {/* City/State */}
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    City / State <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="cityState"
                      value={formData.cityState}
                      onChange={handleChange}
                      placeholder="e.g. Boston, MA"
                      required
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 sm:col-span-3">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Brief Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Briefly describe your institution, its focus areas, and what you hope to achieve with AlumNet..."
                    maxLength={300}
                    rows={3}
                    className="w-full border border-zinc-300 bg-white p-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm resize-none"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 italic">
                    <span>Max 300 characters. Optional but recommended.</span>
                    <span>{formData.description.length}/300</span>
                  </div>
                </div>
              </div>
            </fieldset>

            {/* SECTION 3: PRIMARY ADMINISTRATOR */}
            <fieldset className="space-y-6">
              <legend className="flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-zinc-800">
                <span className="text-xs text-[#BC002D] mr-2">■</span> Primary Administrator
              </legend>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    First Name <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="adminFirstName"
                      value={formData.adminFirstName}
                      onChange={handleChange}
                      placeholder="First name"
                      required
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    Last Name <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="adminLastName"
                      value={formData.adminLastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                  </div>
                </div>

                {/* Institutional Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    Institutional Email <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="adminEmail"
                      type="email"
                      value={formData.adminEmail}
                      onChange={handleChange}
                      placeholder="admin@institution.edu"
                      required
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                  </div>
                </div>

                {/* Job Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    Job Title / Role <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="adminJobTitle"
                      value={formData.adminJobTitle}
                      onChange={handleChange}
                      placeholder="e.g. Director of Alumni Relations"
                      required
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="adminPhone"
                      value={formData.adminPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    Department
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="adminDepartment"
                      value={formData.adminDepartment}
                      onChange={handleChange}
                      placeholder="e.g. Office of Alumni Affairs"
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                  </div>
                </div>

                {/* Password / Access Seal */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    Access Seal / Password <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Initialize secure access seal"
                      required
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-12 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-zinc-400 hover:text-zinc-800 transition"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                    Confirm Access Seal <span className="text-[#BC002D]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Verify access seal"
                      required
                      className="h-12 w-full border border-zinc-300 bg-white pl-11 pr-12 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-zinc-400 hover:text-zinc-800 transition"
                    >
                      {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>

            {/* SECTION 4: VERIFICATION DOCUMENTS */}
            <fieldset className="space-y-6">
              <legend className="flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-zinc-800">
                <span className="text-xs text-[#BC002D] mr-2">■</span> Verification Documents
              </legend>
              
              <p className="text-xs text-zinc-500 leading-relaxed">
                Upload official documents to verify your institution's legitimacy. Accepted formats: PDF, PNG, JPG (max 10MB each).
              </p>

              <div className="space-y-4">
                {/* Document Type Dropdown */}
                <div className="space-y-2 max-w-md">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Document Type
                  </label>
                  <div className="relative">
                    <select
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleChange}
                      className="h-12 w-full appearance-none border border-zinc-300 bg-white px-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    >
                      <option value="">Select document type...</option>
                      <option value="Accreditation Certificate">Accreditation Certificate</option>
                      <option value="Government Registration">Government Registration</option>
                      <option value="University Charter">University Charter</option>
                      <option value="Other Supporting Document">Other Supporting Document</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>

                {/* Dropzone area */}
                <div
                  onClick={handleDropzoneClick}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 hover:border-zinc-500 bg-white p-8 rounded-sm cursor-pointer transition text-center"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                  />
                  <UploadCloud className="size-8 text-[#BC002D] mb-3" />
                  <p className="text-xs font-bold text-zinc-800">
                    Drop files here or <span className="text-[#BC002D] underline">browse</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    PDF, PNG, JPG. Max 10MB per file
                  </p>
                </div>

                {/* List of uploaded files */}
                {uploadedFiles.length > 0 && (
                  <div className="border border-zinc-200 bg-white rounded-sm divide-y divide-zinc-200">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 text-xs">
                        <div className="flex items-center gap-3">
                          <FileText className="size-4 text-[#BC002D] shrink-0" />
                          <div className="space-y-0.5">
                            <p className="font-bold text-zinc-800 max-w-sm truncate">{file.name}</p>
                            <p className="text-[9px] text-zinc-400">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || "Document"}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="flex size-8 items-center justify-center text-zinc-400 hover:text-[#BC002D] transition rounded-full hover:bg-zinc-100"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2.5 items-start text-[10.5px] text-zinc-500 italic leading-relaxed mt-2">
                  <Info className="size-4 shrink-0 text-zinc-400 mt-0.5" />
                  <p>
                    At least one official accreditation or government registration document is required. Additional supporting documents strengthen your application.
                  </p>
                </div>
              </div>
            </fieldset>

            {/* SECTION 5: PLATFORM CONFIGURATION */}
            <fieldset className="space-y-6">
              <legend className="flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-zinc-800">
                <span className="text-xs text-[#BC002D] mr-2">■</span> Platform Configuration
              </legend>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Expected Students */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Expected Number of Students
                  </label>
                  <div className="relative">
                    <select
                      name="expectedStudents"
                      value={formData.expectedStudents}
                      onChange={handleChange}
                      className="h-12 w-full appearance-none border border-zinc-300 bg-white px-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    >
                      <option value="">Select range...</option>
                      <option value="Under 1,000">Under 1,000</option>
                      <option value="1,000 - 5,000">1,000 - 5,000</option>
                      <option value="5,000 - 10,000">5,000 - 10,000</option>
                      <option value="10,000 - 25,000">10,000 - 25,000</option>
                      <option value="Over 25,000">Over 25,000</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>

                {/* Referral Source */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    How did you hear about AlumNet?
                  </label>
                  <div className="relative">
                    <select
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                      className="h-12 w-full appearance-none border border-zinc-300 bg-white px-4 text-xs outline-none transition focus:border-zinc-800 rounded-sm"
                    >
                      <option value="">Select source...</option>
                      <option value="Search Engine">Search Engine</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Colleague / Word of Mouth">Colleague / Word of Mouth</option>
                      <option value="Conference / Event">Conference / Event</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>

                {/* Features of Interest */}
                <div className="space-y-3 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                    Features of Interest
                  </label>
                  
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    {[
                      { key: "membershipScheduling", label: "Membership Scheduling" },
                      { key: "alumniReferralPortal", label: "Alumni Referral Portal" },
                      { key: "alumniDirectory", label: "Alumni Directory" },
                      { key: "aiCareerAssistant", label: "AI Career Assistant" },
                      { key: "messagingHub", label: "Messaging Hub" },
                      { key: "adminAnalytics", label: "Admin Analytics" },
                    ].map((feature) => {
                      const isChecked = formData.features[feature.key as keyof typeof formData.features];
                      return (
                        <button
                          key={feature.key}
                          type="button"
                          onClick={() => handleFeatureToggle(feature.key as keyof typeof formData.features)}
                          className="flex items-center gap-3 p-3 text-left bg-white border border-zinc-200 rounded-sm hover:border-zinc-400 transition"
                        >
                          <div className={`flex size-4 items-center justify-center border transition-all ${
                            isChecked 
                              ? "bg-[#1A1A1A] border-[#1A1A1A] text-white" 
                              : "border-zinc-300"
                          }`}>
                            {isChecked && <Check className="size-3 stroke-[3] text-white" />}
                          </div>
                          <span className="text-xs font-bold text-zinc-800">{feature.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </fieldset>

            {/* SECTION 6: AGREEMENT */}
            <fieldset className="space-y-5 border-t border-zinc-200 pt-8">
              <legend className="flex items-center text-[11px] font-black uppercase tracking-[0.3em] text-zinc-800">
                <span className="text-xs text-[#BC002D] mr-2">■</span> Agreement
              </legend>

              <div className="space-y-3.5">
                {[
                  {
                    key: "agreeToTerms",
                    label: (
                      <span>
                        I agree to AlumNet's <span className="text-[#BC002D] underline cursor-pointer">Terms of Service</span> and <span className="text-[#BC002D] underline cursor-pointer">Institutional Data Processing Agreement</span>. <span className="text-[#BC002D]">*</span>
                      </span>
                    ),
                  },
                  {
                    key: "authorizedToRegister",
                    label: (
                      <span>
                        I confirm that I am authorized to register this institution on AlumNet and that all provided information is accurate and truthful. <span className="text-[#BC002D]">*</span>
                      </span>
                    ),
                  },
                  {
                    key: "marketingUpdates",
                    label: "I would like to receive updates and announcements about AlumNet platform features and improvements.",
                  },
                ].map((agreement) => {
                  const isChecked = formData[agreement.key as keyof typeof formData] as boolean;
                  return (
                    <div key={agreement.key} className="flex items-start gap-3 text-xs leading-relaxed text-zinc-600">
                      <input
                        type="checkbox"
                        id={agreement.key}
                        name={agreement.key}
                        checked={isChecked}
                        onChange={handleChange}
                        className="mt-0.5 size-4 shrink-0 rounded-none border border-zinc-300 accent-[var(--brand-red)] cursor-pointer"
                      />
                      <label htmlFor={agreement.key} className="cursor-pointer font-medium">
                        {agreement.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            {/* Form Action Buttons */}
            <div className="flex flex-col-reverse gap-4 border-t border-zinc-200 pt-8 sm:flex-row sm:justify-end">
              {/* Save Draft */}
              <button
                type="button"
                onClick={handleSaveDraft}
                className="h-12 bg-white border-2 border-zinc-800 text-zinc-800 text-[10px] font-black uppercase tracking-[0.3em] px-8 hover:bg-zinc-100 transition rounded-sm"
              >
                Save Draft
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="h-12 bg-[var(--brand-red)] border-2 border-zinc-950 text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 hover:-translate-y-0.5 shadow-strong active:translate-y-0 transition-all rounded-sm flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Flower className="size-4 animate-spin text-[var(--brand-pink)]" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Registration Request
                    <ArrowLeft className="size-3.5 rotate-180" />
                  </>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
