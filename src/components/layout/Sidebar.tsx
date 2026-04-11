import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  MessageCircle, 
  UserCheck, 
  GraduationCap, 
  User,
  Home,
  Bot,
  Info,
  Layers,
  Settings
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Directory", href: "/directory", icon: Users },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "AI Chat", href: "/ai-chat", icon: Bot },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  // Don't show sidebar on auth pages or landing page if not needed
  if (location.pathname.startsWith('/auth') || location.pathname === '/') {
    return null;
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:pt-16">
      <div className="flex flex-col flex-grow bg-background border-r border-foreground/10 overflow-y-auto">
        <div className="px-6 py-4 border-b border-foreground/5">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Navigation System
          </p>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-[11px] font-mono uppercase tracking-wider transition-all border",
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-foreground/20 hover:bg-foreground/5"
                )}
              >
                <item.icon className={cn(
                  "mr-4 h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-background" : "text-muted-foreground"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* Institutional Identifier Pin */}
        <div className="p-4 mt-auto border-t border-foreground/10 bg-foreground/[0.02]">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-safety-orange flex items-center justify-center text-white font-bold text-xs">
              IIT
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase leading-none text-foreground">Institute Unit</p>
              <p className="text-[9px] font-mono text-muted-foreground">ID: #SYS_7721</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};