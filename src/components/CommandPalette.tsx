import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Search,
  Home,
  Users,
  MessageCircle,
  Bot
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/20 transition-all w-full max-w-[200px]"
      >
        <Search className="size-3" />
        <span>Search...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 bg-foreground/10 px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." className="font-mono uppercase text-xs" />
        <CommandList className="font-mono">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Nav System" className="uppercase text-[10px] tracking-widest text-muted-foreground">
            <CommandItem onSelect={() => runCommand(() => navigate("/dashboard"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/directory"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Alumni Directory</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/messages"))}>
              <MessageCircle className="mr-2 h-4 w-4" />
              <span>Messages</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/ai-chat"))}>
              <Bot className="mr-2 h-4 w-4" />
              <span>AI Oracle</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions" className="uppercase text-[10px] tracking-widest text-muted-foreground">
            <CommandItem onSelect={() => runCommand(() => navigate("/profile"))}>
              <User className="mr-2 h-4 w-4" />
              <span>User Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
