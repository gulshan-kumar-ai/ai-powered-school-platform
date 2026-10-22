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
        "relative bg-gradient-to-b from-slate-50/90 via-white to-slate-50/40 border-b border-slate-200/80 py-10 sm:py-14",
        className
      )}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <Container className="relative">
        <Breadcrumbs items={breadcrumbs} className="mb-5" />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            {badge && (
              <Badge variant={badgeVariant} size="md">
                {badge}
              </Badge>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2744] tracking-tight leading-[1.15]">
              {title}
            </h1>

            {description && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
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
