import { useState, useEffect } from "react";
import { Moon, Sun, Bell, GraduationCap, LogOut, Settings, User, Hexagon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { CommandPalette } from "../CommandPalette";
import axios from "axios";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  // Mock auth state
  const isAuthenticated = !location.pathname.startsWith("/auth");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/users/logout", {}, { withCredentials: true });
    } catch (e) {
      console.error("Logout failed", e);
    }
    navigate("/auth/login");
  };

  const toggleTheme = () => {
    const isNowDark = !isDark;
    setIsDark(isNowDark);
    if (isNowDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!isAuthenticated && location.pathname !== '/') {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10 h-16">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-10 bg-foreground text-background flex items-center justify-center transition-transform group-hover:rotate-45">
              <Hexagon className="size-6 fill-current" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-black tracking-tighter leading-none">
                ALUMNET<span className="text-safety-orange">.SYS</span>
              </h1>
              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
                Neural Network v1.0
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Command Palette */}
        <div className="hidden md:block flex-1 max-w-sm mx-10">
          <CommandPalette />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="size-10 flex items-center justify-center border border-foreground/10 hover:bg-foreground/5 transition-colors"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          {/* Notifications */}
          <button className="size-10 flex items-center justify-center border border-foreground/10 hover:bg-foreground/5 transition-colors relative">
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-2 bg-safety-orange" />
          </button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-2 pr-1 h-10 border border-foreground/10 hover:bg-foreground/5 transition-colors">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-mono font-bold leading-none uppercase">Agent #01</p>
                  <p className="text-[9px] font-mono text-muted-foreground">Level 4 Admin</p>
                </div>
                <Avatar className="size-8 rounded-none">
                  <AvatarImage src="/avatar.jpg" />
                  <AvatarFallback className="bg-foreground text-background uppercase font-mono text-[10px] font-bold">
                    AG
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 font-mono p-1 border-foreground">
              <div className="px-2 py-1.5 text-[10px] uppercase text-muted-foreground tracking-widest">
                Unit Profile
              </div>
              <DropdownMenuItem onClick={() => navigate("/profile")} className="text-xs uppercase">
                <User className="mr-2 size-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")} className="text-xs uppercase">
                <Settings className="mr-2 size-4" />
                System Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-foreground/10" />
              <DropdownMenuItem onClick={handleLogout} className="text-xs uppercase text-destructive">
                <LogOut className="mr-2 size-4" />
                Terminate Session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
