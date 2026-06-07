import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Calendar, 
  Briefcase, 
  LineChart, 
  Shield, 
  Search,
  MessageSquare,
  Building,
  Menu,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2422] font-sans selection:bg-[#A31D33] selection:text-white overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#2D2422]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-xl font-black tracking-[0.2em] text-[#2D2422]">
              ALUMNET
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-[#2D2422]/70">
              <Link to="#students" className="hover:text-[#A31D33] transition-colors">Students</Link>
              <Link to="#alumni" className="hover:text-[#A31D33] transition-colors">Alumni</Link>
              <Link to="#institutions" className="hover:text-[#A31D33] transition-colors">Institutions</Link>
              <Link to="#about" className="hover:text-[#A31D33] transition-colors">About Us</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost" className="font-bold text-[#2D2422] hover:bg-[#2D2422]/5 rounded-none uppercase tracking-wider text-xs px-6 py-5">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register-org">
              <Button className="bg-[#A31D33] hover:bg-[#8A182B] text-white font-bold rounded-none uppercase tracking-wider text-xs px-6 py-5 shadow-[4px_4px_0px_0px_rgba(45,36,34,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(45,36,34,1)] transition-all">
                Book a Demo
              </Button>
            </Link>
          </div>
          <button className="md:hidden text-[#2D2422]">
            <Menu className="size-6" />
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative w-full pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/japanese_sakura_mountains_sketch.png')] bg-cover bg-center opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFBF7] opacity-80 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            <motion.div 
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-8">
                <span className="w-2 h-2 bg-[#A31D33] rotate-45" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33]">For Students & Alumni</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl lg:text-[5.5rem] font-serif font-bold leading-[1.05] tracking-tight mb-8 text-[#2D2422]">
                Bridge the <br />
                <span className="text-[#A31D33] italic">gap between</span> <br />
                campus & career.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-[#2D2422]/70 leading-relaxed mb-10 max-w-lg font-medium">
                An exclusive mentorship platform connecting students, alumni, and institutional administrators through verified networks.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                <Link to="/auth/register-org">
                  <Button className="bg-[#A31D33] hover:bg-[#8A182B] text-white font-bold rounded-none uppercase tracking-widest text-xs px-8 py-7 shadow-[4px_4px_0px_0px_rgba(45,36,34,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(45,36,34,1)] transition-all flex items-center gap-2">
                    Join your network <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-2 border-[#2D2422] text-[#2D2422] font-bold rounded-none uppercase tracking-widest text-xs px-8 py-7 hover:bg-[#2D2422] hover:text-white transition-all bg-transparent">
                  View Impact
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square lg:aspect-[4/3] w-full"
            >
              <div className="absolute inset-0 bg-[#EFECE5] border-2 border-[#2D2422] shadow-[12px_12px_0px_0px_rgba(45,36,34,1)] overflow-hidden">
                {/* Abstract placeholder for hero graphic */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(163,29,51,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(163,29,51,0.1)_0%,transparent_60%)]" />
                
                {/* Mock UI Elements floating */}
                <div className="absolute top-12 left-12 bg-white border border-[#2D2422]/20 p-4 shadow-sm max-w-[200px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#EFECE5]" />
                    <div className="space-y-1">
                      <div className="h-2 w-20 bg-[#2D2422]" />
                      <div className="h-1.5 w-12 bg-[#2D2422]/30" />
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-[#A31D33]/20 mb-1" />
                  <div className="h-1.5 w-4/5 bg-[#A31D33]/20" />
                </div>
                
                <div className="absolute bottom-12 right-12 bg-[#2D2422] text-white p-5 max-w-[220px]">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="size-5 text-[#A31D33]" />
                    <span className="text-[10px] uppercase tracking-wider text-white/50">Session Booked</span>
                  </div>
                  <div className="text-sm font-bold mb-1">Portfolio Review</div>
                  <div className="text-xs text-white/70">Tomorrow, 10:00 AM</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#2D2422] text-[#FDFBF7] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-[#FDFBF7]/10">
              <div className="pl-0 md:pl-6 text-center md:text-left">
                <div className="text-4xl lg:text-5xl font-serif font-bold mb-2">80+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#A31D33] font-bold">Institutions</div>
              </div>
              <div className="pl-6 text-center md:text-left">
                <div className="text-4xl lg:text-5xl font-serif font-bold mb-2">12K+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#A31D33] font-bold">Verified Alumni</div>
              </div>
              <div className="pl-6 text-center md:text-left">
                <div className="text-4xl lg:text-5xl font-serif font-bold mb-2">3,400+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#A31D33] font-bold">Mentorship Hrs</div>
              </div>
              <div className="pl-6 text-center md:text-left">
                <div className="text-4xl lg:text-5xl font-serif font-bold mb-2">890+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#A31D33] font-bold">Hires Made</div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 lg:py-32 bg-[#F6F4EE]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 bg-[#A31D33] rotate-45" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33]">The Problem</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2D2422] leading-tight mb-4">
                  Traditional networks are broken.
                </h2>
                <div className="text-2xl font-semibold text-[#A31D33] mb-8 tracking-tight">
                  Noises. Spam. No Trust.
                </div>
                <p className="text-[#2D2422]/70 leading-relaxed font-medium">
                  Public professional networks are oversaturated. Students send hundreds of cold messages with a 2% reply rate. Alumni are bombarded by recruiters and strangers, burying genuine requests from their alma mater.
                </p>
              </div>
              
              <div className="bg-white border-2 border-[#2D2422] shadow-[8px_8px_0px_0px_rgba(45,36,34,1)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#2D2422] text-[#FDFBF7] text-xs uppercase tracking-widest font-bold">
                      <th className="py-4 px-6 border-b border-[#2D2422]">Feature</th>
                      <th className="py-4 px-6 border-b border-l border-[#2D2422]/20">LinkedIn</th>
                      <th className="py-4 px-6 border-b border-l border-[#2D2422]/20 text-[#A31D33] bg-[#3B2C2A]">AlumNet</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                    <tr>
                      <td className="py-5 px-6 border-b border-[#2D2422]/10 text-[#2D2422]/70">User Verification</td>
                      <td className="py-5 px-6 border-b border-l border-[#2D2422]/10">None</td>
                      <td className="py-5 px-6 border-b border-l border-[#2D2422]/10 bg-[#A31D33]/5 text-[#A31D33] font-bold">SSO / Institutional</td>
                    </tr>
                    <tr>
                      <td className="py-5 px-6 border-b border-[#2D2422]/10 text-[#2D2422]/70">Signal-to-Noise</td>
                      <td className="py-5 px-6 border-b border-l border-[#2D2422]/10">Very Low</td>
                      <td className="py-5 px-6 border-b border-l border-[#2D2422]/10 bg-[#A31D33]/5 text-[#A31D33] font-bold">Extremely High</td>
                    </tr>
                    <tr>
                      <td className="py-5 px-6 border-b border-[#2D2422]/10 text-[#2D2422]/70">Meeting Scheduling</td>
                      <td className="py-5 px-6 border-b border-l border-[#2D2422]/10">External Only</td>
                      <td className="py-5 px-6 border-b border-l border-[#2D2422]/10 bg-[#A31D33]/5 text-[#A31D33] font-bold">Built-in Calendar</td>
                    </tr>
                    <tr>
                      <td className="py-5 px-6 text-[#2D2422]/70">Primary Focus</td>
                      <td className="py-5 px-6 border-l border-[#2D2422]/10">Recruiters / Ads</td>
                      <td className="py-5 px-6 border-l border-[#2D2422]/10 bg-[#A31D33]/5 text-[#A31D33] font-bold">1-on-1 Mentorship</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4 justify-center">
                <span className="w-2 h-2 bg-[#A31D33] rotate-45" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33]">The Solution</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2D2422]">
                Everything a campus network needs.
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Search, title: "Verified Directory", desc: "Search alumni by industry, role, or company with 100% confidence they are verified graduates." },
                { icon: Calendar, title: "1-on-1 Mentorship", desc: "Seamlessly book 15-30 minute calls directly on the platform with automated calendar syncing." },
                { icon: Briefcase, title: "Job Referrals", desc: "A structured process for students to request and alumni to provide internal company referrals." },
                { icon: MessageSquare, title: "Exclusive Insights", desc: "Access interview guides, portfolio reviews, and salary transparency exclusively for your network." },
                { icon: LineChart, title: "Alumni Analytics", desc: "Institutions get real-time dashboards on alumni engagement, placement rates, and network health." },
                { icon: Shield, title: "Safe & Compliant", desc: "FERPA/GDPR compliant infrastructure designed specifically for higher education institutions." }
              ].map((feat, idx) => (
                <div key={idx} className="bg-[#F6F4EE] border border-[#2D2422]/10 p-8 hover:border-[#A31D33] transition-colors group">
                  <div className="w-12 h-12 bg-white border border-[#2D2422]/10 flex items-center justify-center mb-6 group-hover:bg-[#A31D33] group-hover:text-white transition-colors">
                    <feat.icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2D2422] mb-3">{feat.title}</h3>
                  <p className="text-[#2D2422]/70 text-sm leading-relaxed font-medium">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Invite Only & Roles Split */}
        <section className="bg-[#FDFBF7] text-[#2D2422] py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-24">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                {/* Left Side */}
                <div>
                  <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-[#A31D33]">
                    <span className="w-1.5 h-1.5 bg-[#A31D33] rotate-45" />
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33]">The Process</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 text-[#2D2422]">
                    Institution-led.<br />
                    <span className="text-[#A31D33]">Invite-only.</span>
                  </h2>
                  <p className="text-[#2D2422]/70 font-medium leading-relaxed mb-10 max-w-sm">
                    AlumNet is not a sign-up platform. Your institution applies. Your admin provisions users. The network stays clean forever.
                  </p>
                  
                  <div className="aspect-[4/3] w-full border border-[#2D2422]/20 overflow-hidden bg-[#EFECE5]">
                    <img 
                      src="/japanese_sakura_mountains_sketch.png" 
                      alt="Sakura Branch" 
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>
                </div>
                
                {/* Right Side - Timeline */}
                <div className="relative pt-2">
                  <div className="absolute left-6 top-0 bottom-0 w-px border-l-2 border-dashed border-[#2D2422]/20 hidden md:block" />
                  
                  <div className="space-y-12">
                    {[
                      { num: "01", title: "Institution Applies", desc: "Your college or university submits an application with verification documents. Our team reviews accreditation and sets up your dedicated space." },
                      { num: "02", title: "Admin Account Created", desc: "The first College Admin account is provisioned automatically. They receive credentials to access the institutional dashboard." },
                      { num: "03", title: "Bulk User Import", desc: "Upload alumni and student rosters via CSV. Or send individual email invite links with 7-day expiration and automatic role assignment." },
                      { num: "04", title: "Users Complete Profiles", desc: "Alumni fill skills, experience, and mentorship availability. Students set their graduation year, branch, and career goals." },
                      { num: "05", title: "Network Activates", desc: "Connections form. Sessions get booked. Referrals get posted. The closed loop is live — noise-free and institution-verified." }
                    ].map((step, i) => (
                      <div key={i} className="relative flex items-start gap-6">
                        <div className="bg-[#FDFBF7] relative z-10 flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-10 border border-[#A31D33] text-[#A31D33] text-xs font-bold">
                            {step.num}
                          </div>
                        </div>
                        <div className="pt-2">
                          <h4 className="font-bold text-[#2D2422] mb-2">{step.title}</h4>
                          <p className="text-[#2D2422]/70 text-sm font-medium leading-relaxed max-w-md">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#2D2422]/10 pt-24">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 mb-4 justify-center">
                  <span className="w-2 h-2 bg-[#A31D33] rotate-45" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33]">Ecosystem</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold">
                  Built for every role in the ecosystem.
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#FDFBF7]/10 border border-[#FDFBF7]/10 bg-[#3B2C2A]">
                <div className="p-10 hover:bg-[#A31D33]/10 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 text-white">Students</h3>
                  <p className="text-[#FDFBF7]/60 text-sm leading-relaxed font-medium mb-6">Gain direct access to alumni who have walked your exact path. Bypass the cold-email void and book sessions with warm connections.</p>
                  <ul className="space-y-2 text-xs font-semibold tracking-wide text-[#FDFBF7]/80">
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-[#A31D33]" /> Resume Reviews</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-[#A31D33]" /> Mock Interviews</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-[#A31D33]" /> Internal Referrals</li>
                  </ul>
                </div>
                <div className="p-10 hover:bg-[#A31D33]/10 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 text-white">Alumni</h3>
                  <p className="text-[#FDFBF7]/60 text-sm leading-relaxed font-medium mb-6">Give back efficiently. Set your availability, control who contacts you, and help the next generation of graduates succeed.</p>
                  <ul className="space-y-2 text-xs font-semibold tracking-wide text-[#FDFBF7]/80">
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-[#A31D33]" /> Controlled Availability</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-[#A31D33]" /> Find Top Talent</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-[#A31D33]" /> Hidden Contact Info</li>
                  </ul>
                </div>
                <div className="p-10 hover:bg-[#A31D33]/10 transition-colors">
                  <h3 className="text-2xl font-bold mb-4 text-white">Institutions</h3>
                  <p className="text-[#FDFBF7]/60 text-sm leading-relaxed font-medium mb-6">Increase placement rates and alumni engagement with a turnkey platform that manages the mentorship program for you.</p>
                  <ul className="space-y-2 text-xs font-semibold tracking-wide text-[#FDFBF7]/80">
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-[#A31D33]" /> Placement Analytics</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-[#A31D33]" /> Engagement Tracking</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="size-3 text-[#A31D33]" /> SSO Integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Mockup Section */}
        <section className="py-24 lg:py-32 bg-[#F6F4EE]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 bg-[#A31D33] rotate-45" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33]">Scheduling</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2D2422] leading-tight mb-6">
                  Book a session.<br/>
                  <span className="text-[#A31D33] italic">Change a trajectory.</span>
                </h2>
                <p className="text-[#2D2422]/70 leading-relaxed font-medium mb-8 max-w-md">
                  Students can view available slots and seamlessly book 15-30 min calls with alumni. Our built-in calendar syncs with Google and Outlook to prevent double-booking.
                </p>
                <div className="flex gap-4">
                  <div className="px-6 py-3 border border-[#2D2422]/20 bg-white font-bold text-sm text-[#2D2422]">
                    <div className="text-[10px] text-[#A31D33] uppercase tracking-wider mb-1">Time Saved</div>
                    4 hrs/week
                  </div>
                  <div className="px-6 py-3 border border-[#2D2422]/20 bg-white font-bold text-sm text-[#2D2422]">
                    <div className="text-[10px] text-[#A31D33] uppercase tracking-wider mb-1">No Shows</div>
                    Reduced 80%
                  </div>
                </div>
              </div>
              <div className="bg-[#2D2422] p-8 shadow-[12px_12px_0px_0px_rgba(163,29,51,1)]">
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen" alt="Avatar" className="w-8 h-8 rounded-full" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Sarah Chen</div>
                    <div className="text-white/50 text-[10px] uppercase tracking-wider">Product Manager, Google</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button className="py-2 border border-white/20 text-white/50 text-xs hover:border-white hover:text-white transition-colors">Oct 12</button>
                  <button className="py-2 bg-white text-[#2D2422] font-bold text-xs shadow-[2px_2px_0px_0px_rgba(163,29,51,1)]">Oct 13</button>
                  <button className="py-2 border border-white/20 text-white/50 text-xs hover:border-white hover:text-white transition-colors">Oct 14</button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-8">
                  <button className="py-3 border border-white/20 text-white/70 text-xs hover:bg-white/5">10:00 AM</button>
                  <button className="py-3 bg-[#A31D33] text-white font-bold text-xs border border-[#A31D33]">1:30 PM</button>
                  <button className="py-3 border border-white/20 text-white/70 text-xs hover:bg-white/5">3:00 PM</button>
                  <button className="py-3 border border-white/20 text-white/70 text-xs hover:bg-white/5">4:45 PM</button>
                </div>
                <Button className="w-full bg-[#A31D33] hover:bg-[#8A182B] text-white font-bold rounded-none uppercase tracking-widest text-xs py-6 border border-[#2D2422]">
                  Confirm Session
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24 lg:py-32 bg-[#FDFBF7]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-4">
                  {[
                    { title: "Profile Creation", desc: "SSO imports basic data. Users complete their profile in 2 minutes." },
                    { title: "Availability Syncing", desc: "Alumni connect their calendar and set weekly mentorship hours." },
                    { title: "Connection Made", desc: "Students request sessions, alumni approve, calendar invites are sent." }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 p-6 bg-white border border-[#2D2422]/10 shadow-sm">
                      <div className="mt-1">
                        <CheckCircle2 className="size-6 text-[#A31D33]" />
                      </div>
                      <div>
                        <div className="font-bold text-[#2D2422] mb-1">{step.title}</div>
                        <div className="text-sm text-[#2D2422]/60 font-medium">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 bg-[#A31D33] rotate-45" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33]">Workflow</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#2D2422] leading-tight mb-6">
                  Alumni open doors.<br/>
                  <span className="text-[#A31D33] italic">Students walk through.</span>
                </h2>
                <p className="text-[#2D2422]/70 leading-relaxed font-medium">
                  Our platform manages the logistics, so the focus stays on the connection. No back-and-forth emails, no ghosting, just high-value conversations that lead to tangible career outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 lg:py-32 bg-[#2D2422] text-[#FDFBF7]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4 justify-center">
                <span className="w-2 h-2 bg-[#A31D33] rotate-45" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33]">Testimonials</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold">
                Voices from the network.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: "AlumNet connected me with a PM who reviewed my portfolio and referred me within two weeks. Life-changing.", author: "James Miller", role: "CS '25 - Imperial" },
                { quote: "I wanted to give back but hated the spam on LinkedIn. AlumNet lets me control my availability and only speak to verified students.", author: "Sarah Chen", role: "Product Manager" },
                { quote: "Our placement rates for the engineering cohort went up 14% since we mandated AlumNet usage in senior year.", author: "Dr. Robert Smith", role: "Alumni Relations" }
              ].map((t, idx) => (
                <div key={idx} className="bg-[#3B2C2A] p-8 border border-white/10 relative">
                  <div className="text-4xl text-[#A31D33] font-serif absolute top-6 right-6 opacity-50">"</div>
                  <p className="text-[#FDFBF7]/80 text-sm leading-relaxed font-medium mb-8 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.author.replace(' ','')}`} alt={t.author} className="w-8 h-8 rounded-full" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{t.author}</div>
                      <div className="text-[10px] text-white/50 uppercase tracking-wider">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-16 bg-[#F6F4EE] border-b border-[#2D2422]/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33] mb-8">Leading institutions, one closed loop.</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-xl font-serif font-bold tracking-widest">MIT</div>
              <div className="text-xl font-serif font-bold tracking-widest">STANFORD</div>
              <div className="text-xl font-serif font-bold tracking-widest">IMPERIAL</div>
              <div className="text-xl font-serif font-bold tracking-widest">NUS</div>
              <div className="text-xl font-serif font-bold tracking-widest">KYOTO TECH</div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 lg:py-32 bg-[#FDFBF7]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 border border-[#2D2422]/10 bg-white">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A31D33] mb-2">Basic</div>
                <div className="text-4xl font-serif font-bold text-[#2D2422] mb-2">Free<span className="text-sm font-sans text-[#2D2422]/50 font-normal"> / P0</span></div>
                <p className="text-sm text-[#2D2422]/60 font-medium mb-8 h-10">For small student groups or individual clubs testing the waters.</p>
                <ul className="space-y-3 text-sm text-[#2D2422]/80 font-medium mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> Up to 100 users</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> Basic Directory</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> Email Support</li>
                </ul>
                <Button variant="outline" className="w-full border-2 border-[#2D2422] text-[#2D2422] font-bold rounded-none uppercase tracking-widest text-xs py-6 hover:bg-[#2D2422] hover:text-white transition-all bg-transparent">
                  Get Started
                </Button>
              </div>
              <div className="p-10 bg-[#2D2422] text-white shadow-[12px_12px_0px_0px_rgba(163,29,51,1)] relative transform md:-translate-y-4">
                <div className="absolute top-0 right-0 bg-[#A31D33] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1">Most Popular</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A31D33] mb-2">Core</div>
                <div className="text-4xl font-serif font-bold text-white mb-2">P12,000<span className="text-sm font-sans text-white/50 font-normal"> / yr</span></div>
                <p className="text-sm text-white/60 font-medium mb-8 h-10">The standard package for entire departments or smaller colleges.</p>
                <ul className="space-y-3 text-sm text-white/80 font-medium mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> Unlimited users</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> Automated Scheduling</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> Priority Support</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> SSO Integration</li>
                </ul>
                <Button className="w-full bg-[#A31D33] hover:bg-[#8A182B] text-white font-bold rounded-none uppercase tracking-widest text-xs py-6 border border-[#2D2422]">
                  Buy Core
                </Button>
              </div>
              <div className="p-10 border border-[#2D2422]/10 bg-white">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A31D33] mb-2">Enterprise</div>
                <div className="text-4xl font-serif font-bold text-[#2D2422] mb-2">Custom</div>
                <p className="text-sm text-[#2D2422]/60 font-medium mb-8 h-10">White-labeled solutions for massive universities with custom needs.</p>
                <ul className="space-y-3 text-sm text-[#2D2422]/80 font-medium mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> Custom Branding</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> Advanced Analytics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#A31D33]" /> Dedicated Success Manager</li>
                </ul>
                <Button variant="outline" className="w-full border-2 border-[#2D2422] text-[#2D2422] font-bold rounded-none uppercase tracking-widest text-xs py-6 hover:bg-[#2D2422] hover:text-white transition-all bg-transparent">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 lg:py-32 w-full overflow-hidden">
          <div className="absolute inset-0 bg-[url('/japanese_sakura_mountains_sketch.png')] bg-cover bg-center opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-transparent to-[#FDFBF7] opacity-60 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center mb-8 px-3 py-1 border border-[#A31D33]">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#A31D33]">Your Institution Awaits</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-[#2D2422] leading-tight mb-6">
              Bring your alumni home. <br />
              <span className="text-[#A31D33]">Build a network that lasts.</span>
            </h2>
            <p className="text-[#2D2422]/70 text-sm md:text-base mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              AlumNet is invite-only and institution-led. Submit your application today. Our team will verify your institution and provision your admin account within 48 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
              <Link to="/auth/register-org">
                <Button className="bg-[#A31D33] hover:bg-[#8A182B] text-white font-bold rounded-none uppercase tracking-widest text-xs px-8 py-6 shadow-[4px_4px_0px_0px_rgba(45,36,34,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(45,36,34,1)] transition-all flex items-center gap-2">
                  Register Your Institution
                </Button>
              </Link>
              <Link to="#" className="font-bold text-xs text-[#2D2422] uppercase tracking-widest hover:text-[#A31D33] transition-colors border-b-2 border-[#2D2422] hover:border-[#A31D33] pb-1">
                Talk to our team
              </Link>
            </div>

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#2D2422]/40">
              Closed Loop · Verified Trust · Institutional Integrity
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1413] text-[#FDFBF7] py-16 border-t border-[#3B2C2A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link to="/" className="text-2xl font-black tracking-[0.2em] text-white mb-6 block">
                ALUMNET
              </Link>
              <p className="text-[#FDFBF7]/50 text-sm max-w-xs leading-relaxed">
                The exclusive mentorship platform connecting students, alumni, and administrators.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A31D33]">Platform</h4>
              <ul className="space-y-4 text-sm font-medium text-[#FDFBF7]/60">
                <li><Link to="#" className="hover:text-white transition-colors">For Students</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">For Alumni</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">For Institutions</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-[#A31D33]">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-[#FDFBF7]/60">
                <li><Link to="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#3B2C2A] text-xs font-semibold tracking-wider text-[#FDFBF7]/40">
            <p>&copy; {new Date().getFullYear()} AlumNet Inc. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center gap-6">
              <Link to="#" className="hover:text-white transition-colors">Twitter</Link>
              <Link to="#" className="hover:text-white transition-colors">LinkedIn</Link>
              <Link to="#" className="hover:text-white transition-colors">Instagram</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
