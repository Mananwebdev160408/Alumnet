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
import { Search, Bell, HelpCircle, UserPlus, LogOut, Settings as SettingsIcon, User } from "lucide-react";

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

  if (location.pathname === '/' || location.pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] h-16 z-40 bg-background/90 backdrop-blur-md flex justify-between items-center px-3 sm:px-5 md:px-8 border-b-2 border-border gap-3">
      <div className="hidden md:flex items-center w-full max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 size-4" />
          <input 
            className="w-full bg-background/90 border-2 border-border/50 rounded-none pl-10 pr-4 py-2 text-sm focus:border-primary focus:ring-0 placeholder-foreground/30 transition-all font-serif italic" 
            placeholder="Seek wisdom in the network..." 
            type="text"
          />
        </div>
      </div>
      <div className="md:hidden text-[10px] font-black uppercase tracking-[0.26em] text-foreground/60">AlumNet</div>
      
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        <button className="p-2 text-foreground/60 hover:text-primary transition-colors relative">
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
        </button>
        
        <button className="hidden md:flex px-4 lg:px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] sumi-border shadow-[4px_4px_0px_0px_#1A1A1A] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all items-center gap-2">
          <UserPlus className="size-3" />
          Invite Kindred
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="ml-1 md:ml-2 cursor-pointer hover:opacity-80 transition-all">
              <Avatar className="h-8 w-8 md:h-9 md:w-9 border-2 border-border ring-2 ring-primary/20 rounded-none">
                <AvatarImage 
                  src={currentUser?.photoURL || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150&h=150"} 
                  alt={currentUser?.displayName || "User"} 
                />
                <AvatarFallback className="bg-secondary/30 font-bold">
                  {currentUser?.displayName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 washi-texture border-2 border-border rounded-none shadow-[8px_8px_0px_0px_#1A1A1A]">
            <DropdownMenuLabel className="font-serif">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none">{currentUser?.displayName || "User"}</p>
                <p className="text-[10px] leading-none text-foreground/50 uppercase tracking-tighter">
                  {currentUser?.email || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/20" />
            <DropdownMenuItem onClick={() => navigate("/profile")} className="focus:bg-primary/10 focus:text-primary cursor-pointer font-bold text-xs uppercase tracking-widest">
              <User className="mr-3 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="focus:bg-primary/10 focus:text-primary cursor-pointer font-bold text-xs uppercase tracking-widest">
              <SettingsIcon className="mr-3 size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/20" />
            <DropdownMenuItem onClick={handleLogout} className="text-primary focus:bg-primary focus:text-white cursor-pointer font-bold text-xs uppercase tracking-widest">
              <LogOut className="mr-3 size-4" />
              Depart
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

