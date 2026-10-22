import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5 text-xs text-slate-500 flex-wrap", className)}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 hover:text-[#0f2744] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0284c7] rounded"
      >
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
            {isLast || !item.href ? (
              <span className="text-slate-800 font-semibold truncate max-w-[240px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#0f2744] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0284c7] rounded"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
