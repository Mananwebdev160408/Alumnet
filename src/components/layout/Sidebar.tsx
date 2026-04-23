import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Network, 
  MessageSquare, 
  Sparkles,
  User,
  Settings,
  Flower
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Directory", href: "/directory", icon: Users },
  { name: "Mentors", href: "/mentorship", icon: GraduationCap },
  { name: "Connections", href: "/connections", icon: Network },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "AI Advisor", href: "/ai-chat", icon: Sparkles },
];

const footerNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-foreground text-[#F7F3E9] flex flex-col p-6 gap-4 z-50 border-r-2 border-border relative">
      <div className="absolute inset-0 washi-texture opacity-5 pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-10 relative z-10">
        <div className="size-10 border-2 border-[#F7F3E9] bg-primary flex items-center justify-center rotate-45 shadow-[4px_4px_0px_0px_rgba(255,183,197,0.3)]">
          <Flower className="size-6 text-white -rotate-45" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter uppercase font-serif">AlumNet</h1>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold opacity-80">Lineage Network</p>
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-2 relative z-10">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 transition-all duration-300 relative group",
                isActive
                  ? "text-primary font-bold bg-[#F7F3E9]/10"
                  : "text-[#F7F3E9]/60 hover:text-secondary hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-full bg-primary"
                />
              )}
              <Icon className={cn("size-5 transition-transform group-hover:scale-110", isActive ? "text-primary" : "text-inherit")} />
              <span className="text-sm uppercase tracking-widest font-bold">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-[#F7F3E9]/10 relative z-10">
        {footerNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 transition-all duration-300 relative group",
                isActive
                  ? "text-primary font-bold bg-[#F7F3E9]/10"
                  : "text-[#F7F3E9]/60 hover:text-secondary hover:bg-white/5"
              )}
            >
              <Icon className={cn("size-5", isActive ? "text-primary" : "text-inherit")} />
              <span className="text-sm uppercase tracking-widest font-bold">{item.name}</span>
            </Link>
          );
        })}
        <div className="px-4 py-3 mt-4">
          <ThemeToggle />
        </div>
      </div>

      <div className="absolute right-4 bottom-12 writing-vertical text-[10px] font-bold text-[#F7F3E9]/20 uppercase tracking-[0.5em] pointer-events-none italic">
        令和六年 • 結び
      </div>
    </aside>
  );
};