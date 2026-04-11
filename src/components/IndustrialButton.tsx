import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs font-mono uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background border-foreground hover:bg-background hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground border-destructive hover:bg-background hover:text-destructive",
        outline:
          "border-foreground/20 bg-transparent hover:bg-foreground hover:text-background hover:border-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary hover:bg-background",
        ghost: "border-transparent hover:bg-foreground/5 hover:border-border",
        link: "text-primary underline-offset-4 hover:underline border-transparent",
        safety:
          "bg-safety-orange text-white border-safety-orange hover:bg-background hover:text-safety-orange",
        electric:
          "bg-electric-blue text-black border-electric-blue hover:bg-background hover:text-electric-blue",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3",
        lg: "h-11 px-8 text-sm",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const IndustrialButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
IndustrialButton.displayName = "IndustrialButton";

export { IndustrialButton, buttonVariants };
