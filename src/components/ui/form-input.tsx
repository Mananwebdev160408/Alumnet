import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "floating";
  multiline?: boolean;
  rows?: number;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ 
    className, 
    label, 
    error, 
    helperText, 
    variant = "default", 
    multiline = false, 
    rows = 3,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    if (variant === "floating") {
      return (
        <div className="relative">
          {multiline ? (
            <Textarea
              id={inputId}
              rows={rows}
              className={cn(
                "peer block w-full pt-6 pb-2 px-3 text-foreground bg-transparent border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-transparent",
                error && "border-destructive focus:ring-destructive",
                className
              )}
              placeholder=" "
              {...(props as any)}
            />
          ) : (
            <Input
              ref={ref}
              id={inputId}
              className={cn(
                "peer block w-full pt-6 pb-2 px-3 text-foreground bg-transparent border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-transparent",
                error && "border-destructive focus:ring-destructive",
                className
              )}
              placeholder=" "
              {...props}
            />
          )}
          {label && (
            <Label
              htmlFor={inputId}
              className="absolute left-3 top-2 text-sm text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary"
            >
              {label}
            </Label>
          )}
          {error && (
            <p className="mt-2 text-sm text-destructive">{error}</p>
          )}
          {helperText && !error && (
            <p className="mt-2 text-sm text-muted-foreground">{helperText}</p>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {label && (
          <Label 
            htmlFor={inputId} 
            className={cn(
              "text-sm font-medium",
              error && "text-destructive"
            )}
          >
            {label}
          </Label>
        )}
        {multiline ? (
          <Textarea
            id={inputId}
            rows={rows}
            className={cn(
              "transition-colors focus:border-primary",
              error && "border-destructive focus:border-destructive focus:ring-destructive",
              className
            )}
            {...(props as any)}
          />
        ) : (
          <Input
            ref={ref}
            id={inputId}
            className={cn(
              "transition-colors focus:border-primary",
              error && "border-destructive focus:border-destructive focus:ring-destructive",
              className
            )}
            {...props}
          />
        )}
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };