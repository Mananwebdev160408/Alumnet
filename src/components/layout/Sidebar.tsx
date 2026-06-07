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
  PlusSquare
} from "lucide-react";

export const Sidebar = () => {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname.startsWith('/auth')) return null;

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Directory", href: "/directory", icon: Users },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Mentorship", href: "/mentorship", icon: GraduationCap },
    { name: "Referrals", href: "/referrals", icon: Briefcase },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Community", href: "/community", icon: UsersRound },
  ];

  const bottomNavigation = [
    { name: "Admin", href: "/admin", icon: ShieldAlert },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

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