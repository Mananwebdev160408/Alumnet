import * as React from "react";
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
        className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-on-surface-variant/60 bg-surface-container rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all w-full max-w-[240px] group"
      >
        <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">search</span>
        <span className="uppercase tracking-widest text-[10px] font-black">Search network...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 bg-surface-container-high px-1.5 rounded font-black text-[9px] opacity-100 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
          <span>⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="p-2">
           <CommandInput placeholder="Type a command or search hub..." className="font-bold text-sm" />
        </div>
        <CommandList className="scrollbar-hide px-2 pb-2">
          <CommandEmpty className="py-6 text-center text-xs font-bold text-on-surface-variant/40">No entries found in registry.</CommandEmpty>
          <CommandGroup heading="Nav System" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 py-2">
            <CommandItem onSelect={() => runCommand(() => navigate("/dashboard"))} className="rounded-xl py-3 px-3 hover:bg-primary/5 transition-colors cursor-pointer mb-1 group">
              <span className="material-symbols-outlined mr-3 text-xl text-primary-container group-hover:scale-110 transition-transform">dashboard</span>
              <span className="text-xs font-bold uppercase tracking-tight">Main Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/directory"))} className="rounded-xl py-3 px-3 hover:bg-primary/5 transition-colors cursor-pointer mb-1 group">
              <span className="material-symbols-outlined mr-3 text-xl text-primary-container group-hover:scale-110 transition-transform">hub</span>
              <span className="text-xs font-bold uppercase tracking-tight">Member Directory</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/messages"))} className="rounded-xl py-3 px-3 hover:bg-primary/5 transition-colors cursor-pointer mb-1 group">
              <span className="material-symbols-outlined mr-3 text-xl text-primary-container group-hover:scale-110 transition-transform">chat</span>
              <span className="text-xs font-bold uppercase tracking-tight">Sync Messages</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/ai-chat"))} className="rounded-xl py-3 px-3 hover:bg-primary/5 transition-colors cursor-pointer group">
              <span className="material-symbols-outlined mr-3 text-xl text-primary-container group-hover:scale-110 transition-transform">smart_toy</span>
              <span className="text-xs font-bold uppercase tracking-tight">AI Advisor</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="my-2 bg-surface-container" />
          <CommandGroup heading="Operator Actions" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 py-2">
            <CommandItem onSelect={() => runCommand(() => navigate("/profile"))} className="rounded-xl py-3 px-3 hover:bg-primary/5 transition-colors cursor-pointer mb-1 group">
              <span className="material-symbols-outlined mr-3 text-xl text-secondary group-hover:scale-110 transition-transform">person</span>
              <span className="text-xs font-bold uppercase tracking-tight font-black">Edit Node Profile</span>
              <CommandShortcut className="font-black text-[9px] ml-auto">⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate("/settings"))} className="rounded-xl py-3 px-3 hover:bg-primary/5 transition-colors cursor-pointer group">
              <span className="material-symbols-outlined mr-3 text-xl text-secondary group-hover:scale-110 transition-transform">settings</span>
              <span className="text-xs font-bold uppercase tracking-tight font-black">Interface Settings</span>
              <CommandShortcut className="font-black text-[9px] ml-auto">⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
