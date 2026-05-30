import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabOption {
  value: string;
  label: string;
}

interface CommonTabProps {
  options: TabOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
}

const CommonTab: React.FC<CommonTabProps> = ({
  options,
  selectedValue,
  onChange,
  className,
  listClassName,
  triggerClassName,
}) => {
  return (
    <Tabs
      value={selectedValue}
      onValueChange={onChange}
      className={cn("w-full", className)}
    >
      <TabsList
        className={cn(
          "grid w-full grid-cols-2 bg-slate-100/80 rounded-xl border border-slate-200/50 h-auto",
          listClassName
        )}
      >
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className={cn(
              "text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer text-slate-600 bg-transparent data-active:bg-primary data-active:text-primary-foreground data-active:shadow-xs",
              triggerClassName
            )}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CommonTab;
