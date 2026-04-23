import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  MessageCircle, 
  User,
  Home,
  Network
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Reuse the same navigation items from Sidebar
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Directory", href: "/directory", icon: Users },
  { name: "Network", href: "/connections", icon: Network },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Profile", href: "/profile", icon: User },
];

export const MobileSidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Don't show sidebar on auth pages
  if (location.pathname.startsWith('/auth') || location.pathname === "/" || !isMobile) {
    return null;
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-border bg-background/95 backdrop-blur-md px-2 pt-2 pb-[calc(0.45rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-5 gap-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 border border-transparent px-1 py-2 text-[9px] font-black uppercase tracking-[0.14em] transition-all",
                isActive
                  ? "bg-primary text-primary-foreground border-border"
                  : "text-foreground/60 hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="leading-none">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};