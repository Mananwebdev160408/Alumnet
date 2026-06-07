import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  User,
  GraduationCap, 
  Briefcase, 
  MessageSquare, 
  UsersRound,
  ShieldAlert,
  Settings,
  PlusSquare,
  Building2,
  Calendar
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export const Sidebar = () => {
  const location = useLocation();
  const { userRole, currentUser } = useAuth();

  if (location.pathname === '/' || location.pathname.startsWith('/auth')) return null;

  let navigation = [];
  const bottomNavigation = [
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  if (userRole === "student") {
    navigation = [
      { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
      { name: "Directory", href: "/student/alumni", icon: Users },
      { name: "Connections", href: "/student/connections", icon: UsersRound },
      { name: "Mentorship", href: "/student/mentorship", icon: GraduationCap },
      { name: "Referrals", href: "/student/referrals", icon: Briefcase },
      { name: "Job Board", href: "/student/jobs", icon: Briefcase },
      { name: "Events", href: "/student/events", icon: Calendar },
      { name: "Messages", href: "/student/messages", icon: MessageSquare },
      { name: "Profile", href: "/student/profile", icon: User },
    ];
  } else if (userRole === "alumni") {
    navigation = [
      { name: "Dashboard", href: "/alumni/dashboard", icon: LayoutDashboard },
      { name: "Directory", href: "/student/alumni", icon: Users },
      { name: "Connections", href: "/alumni/connections", icon: UsersRound },
      { name: "Mentorship", href: "/alumni/mentorship/availability", icon: GraduationCap },
      { name: "Referrals", href: "/alumni/referrals", icon: Briefcase },
      { name: "Events", href: "/alumni/events", icon: Calendar },
      { name: "Messages", href: "/alumni/messages", icon: MessageSquare },
      { name: "Profile", href: "/alumni/profile", icon: User },
    ];
  } else if (userRole === "college_admin") {
    navigation = [
      { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Verify Users", href: "/admin/users/verify", icon: ShieldAlert },
      { name: "Manage Users", href: "/admin/users/students", icon: Users },
      { name: "Moderation", href: "/admin/moderation", icon: ShieldAlert },
      { name: "Events", href: "/admin/events", icon: Calendar },
      { name: "Job Approvals", href: "/admin/jobs", icon: Briefcase },
      { name: "Announcements", href: "/admin/announcements", icon: MessageSquare },
      { name: "Analytics", href: "/admin/analytics", icon: LayoutDashboard },
      { name: "Bulk Import", href: "/admin/import", icon: PlusSquare },
    ];
  } else if (userRole === "super_admin") {
    navigation = [
      { name: "Platform", href: "/sysadmin/dashboard", icon: LayoutDashboard },
      { name: "Colleges", href: "/sysadmin/colleges", icon: Building2 },
      { name: "Global Users", href: "/sysadmin/users", icon: Users },
      { name: "Role Admin", href: "/sysadmin/roles", icon: ShieldAlert },
      { name: "Feature Flags", href: "/sysadmin/features", icon: PlusSquare },
      { name: "Audit Logs", href: "/sysadmin/audit", icon: LayoutDashboard },
      { name: "Escalations", href: "/sysadmin/escalations", icon: ShieldAlert },
      { name: "Analytics", href: "/sysadmin/analytics", icon: LayoutDashboard },
      { name: "System Health", href: "/sysadmin/health", icon: LayoutDashboard },
    ];
  }

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-surface border-r border-border flex flex-col z-50">
      <div className="h-20 flex items-center px-6 border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 border border-border flex items-center justify-center">
            <PlusSquare className="size-4 text-primary" />
          </div>
          <span className="font-display font-bold tracking-widest text-foreground uppercase text-sm">AlumNet</span>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col py-6">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-4 px-6 py-3 transition-colors relative group",
                  isActive ? "text-primary bg-primary/10 font-bold" : "text-muted-foreground hover:text-foreground hover:bg-popover font-medium"
                )}
              >
                {isActive && <motion.div layoutId="active-nav" className="absolute left-0 w-1 h-full bg-primary" />}
                <Icon className={cn("size-4", isActive ? "text-primary" : "text-inherit")} />
                <span className="text-xs uppercase tracking-widest">{item.name}</span>
                {item.name === "Messages" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 space-y-1">
          {bottomNavigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-4 px-6 py-3 transition-colors relative group",
                  isActive ? "text-primary bg-primary/10 font-bold" : "text-muted-foreground hover:text-foreground hover:bg-popover font-medium"
                )}
              >
                {isActive && <motion.div layoutId="active-sidebar-bottom" className="absolute left-0 w-1 h-full bg-primary" />}
                <Icon className={cn("size-4", isActive ? "text-primary" : "text-inherit")} />
                <span className="text-xs uppercase tracking-widest">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-6 border-t border-border mt-auto">
        <div className="flex items-center gap-3">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen" alt="User" className="w-8 h-8 rounded-full bg-card border border-border" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-foreground truncate">Sarah Chen</div>
            <div className="text-[10px] text-muted-foreground truncate uppercase tracking-wider">Product Manager</div>
          </div>
        </div>
      </div>
    </aside>
  );
};