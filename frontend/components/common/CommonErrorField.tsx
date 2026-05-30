import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommonErrorFieldProps {
  message?: string;
  className?: string;
  showIcon?: boolean;
}

const CommonErrorField: React.FC<CommonErrorFieldProps> = ({
  message,
  className,
  showIcon = true,
}) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200",
        className
      )}
    >
      {showIcon && <AlertCircle className="h-3.5 w-3.5 shrink-0" />}
      <span>{message}</span>
    </div>
  );
};

export default CommonErrorField;
