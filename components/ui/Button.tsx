import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isExternal,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#0f2744] text-white hover:bg-[#16385c] active:bg-[#0a1b2f] focus-visible:ring-[#0f2744] shadow-sm hover:shadow",
      secondary:
        "bg-slate-100 text-[#0f2744] hover:bg-slate-200 active:bg-slate-300 focus-visible:ring-slate-400 border border-slate-200/80",
      accent:
        "bg-[#0284c7] text-white hover:bg-[#0369a1] active:bg-[#075985] focus-visible:ring-[#0284c7] shadow-sm hover:shadow",
      outline:
        "border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 hover:text-[#0f2744] focus-visible:ring-[#0f2744]",
      ghost:
        "text-slate-700 hover:text-[#0f2744] hover:bg-slate-100/80 focus-visible:ring-slate-400",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 min-h-[32px]",
      md: "text-sm px-4 py-2.5 gap-2 min-h-[40px]",
      lg: "text-base px-6 py-3.5 gap-2.5 min-h-[48px]",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClassName}>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
