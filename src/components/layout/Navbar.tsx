import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { Search, Bell, Settings as SettingsIcon, User, LogOut, ChevronDown } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (location.pathname === '/' || location.pathname.startsWith('/auth')) return null;

  return (
    <header className="fixed top-0 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] h-20 z-40 bg-background flex justify-between items-center px-4 sm:px-6 md:px-8 border-b border-border">
      <div className="flex items-center gap-2 text-sm text-foreground/70 font-medium tracking-wide">
        <span className="uppercase text-[10px] tracking-widest">Alumnet</span>
        <span className="text-[10px]">&mdash;</span>
        <span className="uppercase text-[10px] tracking-widest text-primary font-bold">
          {location.pathname.split("/").filter(Boolean).slice(-1)[0] || "Dashboard"}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center relative w-64 border border-border bg-popover">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <input className="w-full bg-transparent border-none pl-9 pr-8 py-2 text-xs focus:outline-none focus:ring-0 placeholder:muted-text text-foreground" placeholder="Search network..." type="text" />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground size-3" />
        </div>

        <div className="flex items-center gap-4 border-l border-border/30 pl-6">
          <button className="text-foreground/60 hover:text-foreground transition-colors relative">
            <Bell className="size-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-card"></span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer hover:opacity-80 transition-all">
                <Avatar className="h-8 w-8 rounded-none border border-border">
                  <AvatarImage src={currentUser?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen"} alt={currentUser?.displayName || "User"} />
                  <AvatarFallback className="bg-card font-bold text-xs">{currentUser?.displayName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border border-border rounded-none shadow-sm">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none text-foreground">{currentUser?.displayName || "User"}</p>
                  <p className="text-[10px] leading-none text-muted-foreground uppercase tracking-tighter">{currentUser?.email || "user@example.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/20" />
              <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
                <User className="mr-3 size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
                <SettingsIcon className="mr-3 size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/20" />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-3 size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

