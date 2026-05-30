import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const CommonButton = React.forwardRef<HTMLButtonElement, CommonButtonProps>(
  ({ className, variant, size, loading, children, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        disabled={disabled || loading}
        variant={variant}
        size={size}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </ShadcnButton>
    );
  }
);

CommonButton.displayName = "CommonButton";

export default CommonButton;
