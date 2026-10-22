import React from "react";
import Image from "next/image";
import { CampusFacility } from "@/types";
import { Card, CardContent } from "./Card";

import { Badge } from "./Badge";
import { Check } from "lucide-react";

interface FacilityCardProps {
  facility: CampusFacility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <Card className="overflow-hidden border-slate-200/90 bg-white flex flex-col h-full group">
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
        <Image
          src={facility.image}
          alt={facility.name}
          width={800}
          height={500}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3">
          <Badge variant="accent" size="sm">
            {facility.category}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-lg sm:text-xl drop-shadow-xs">
            {facility.name}
          </h3>
        </div>
      </div>

      <CardContent className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {facility.description}
        </p>

        <div className="space-y-1.5 pt-3 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
            Facility Features:
          </div>
          <ul className="space-y-1.5">
            {facility.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
