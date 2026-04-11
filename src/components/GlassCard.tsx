import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const GlassCard = ({ className, children, hoverEffect = true, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass-card relative overflow-hidden",
        hoverEffect && "hover-glow transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Subtle scanline effect inside glass cards */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.03),transparent_70%)]" />
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
};
