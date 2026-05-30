"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import CommonErrorField from "./CommonErrorField";

interface CustomInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

const CustomInputField = React.forwardRef<HTMLInputElement, CustomInputFieldProps>(
  ({ label, error, type = "text", id, className, wrapperClassName, required, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={cn("space-y-1.5 w-full", wrapperClassName)}>
        {label && (
          <Label htmlFor={id} className="text-sm font-semibold text-slate-700">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </Label>
        )}
        <div className="relative">
          <Input
            id={id}
            type={type === "password" && showPassword ? "text" : type}
            ref={ref}
            className={cn(
              "w-full bg-slate-50/70 border-slate-200 rounded-lg focus:bg-white transition-colors pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        <CommonErrorField message={error} />
      </div>
    );
  }
);

CustomInputField.displayName = "CustomInputField";

export default CustomInputField;
