import React from "react";
import { Container } from "../layout/Container";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";
import { Badge, BadgeProps } from "./Badge";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: BadgeProps["variant"];
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  badge,
  badgeVariant = "accent",
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-b border-slate-200/90 py-12 sm:py-16 overflow-hidden",
        className
      )}
    >
      {/* Subtle background grid & ambient light */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3.5">
            {badge && (
              <Badge variant={badgeVariant} size="md" className="font-bold shadow-2xs">
                {badge}
              </Badge>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f2744] tracking-tight leading-[1.12]">
              {title}
            </h1>

            {description && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                {description}
              </p>
            )}
          </div>

          {actions && <div className="shrink-0 flex items-center gap-3">{actions}</div>}
        </div>
      </Container>
    </div>
  );
}
