import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  MessageCircle, 
  UserCheck, 
  GraduationCap, 
  User,
  Home
} from "lucide-react";

const navigation = [
  { name: "Directory", href: "/directory", icon: Users },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Dashboard", href: "/dashboard", icon: Home },
  // { name: "Connections", href: "/connections", icon: UserCheck },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  // { name: "Mentorship", href: "/mentorship", icon: GraduationCap },
];

export const Sidebar = () => {
  const location = useLocation();

  // Don't show sidebar on auth pages
  if (location.pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:pt-16">
      <div className="flex flex-col flex-grow bg-card border-r border-border shadow-soft overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all hover-lift",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};