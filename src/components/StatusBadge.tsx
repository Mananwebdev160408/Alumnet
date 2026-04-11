import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "online" | "away" | "offline" | "verified" | "pending";
  label: string;
  className?: string;
}

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const statusColors = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    offline: "bg-slate-500",
    verified: "bg-electric-blue",
    pending: "bg-safety-orange",
  };

  return (
    <div className={cn("flex items-center gap-2 px-2 py-0.5 border border-foreground/10 bg-foreground/5 w-fit", className)}>
      <span className={cn("size-1.5 rounded-none", statusColors[status])} />
      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
};
