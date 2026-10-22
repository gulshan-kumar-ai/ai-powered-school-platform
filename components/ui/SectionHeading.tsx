import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "default" | "accent" | "secondary" | "demo" | "roadmap";
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "accent",
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl mb-12",
        isCentered ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <div className={cn("mb-3.5", isCentered ? "flex justify-center" : "flex")}>
          <Badge variant={badgeVariant} size="md">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2744]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
      <div
        className={cn(
          "h-1 w-12 bg-[#0284c7] rounded-full mt-5",
          isCentered ? "mx-auto" : ""
        )}
      />
    </div>
  );
}
