import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "secondary" | "outline" | "demo" | "roadmap" | "urgent" | "primary" | "navy";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full border transition-colors select-none";

  const variantStyles = {
    default: "bg-[#0f2744]/10 text-[#0f2744] border-[#0f2744]/20",
    accent: "bg-sky-50 text-sky-700 border-sky-200",
    secondary: "bg-slate-100 text-slate-700 border-slate-200",
    outline: "bg-transparent text-slate-700 border-slate-300",
    demo: "bg-amber-50 text-amber-800 border-amber-200/80 font-mono text-[11px] tracking-wide",
    roadmap: "bg-indigo-50 text-indigo-700 border-indigo-200 font-medium",
    urgent: "bg-rose-50 text-rose-700 border-rose-200",
    primary: "bg-sky-600 text-white border-sky-700 font-semibold",
    navy: "bg-[#0f2744] text-white border-[#0f2744] font-semibold",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}
