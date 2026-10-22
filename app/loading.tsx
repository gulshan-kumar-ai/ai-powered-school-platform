import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="py-24 sm:py-36 bg-slate-50/40">
      <Container className="max-w-md text-center">
        <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto mb-4 border border-sky-100 shadow-sm animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin text-[#0284c7]" />
        </div>
        <div className="text-sm font-semibold text-[#0f2744]">
          Loading {siteConfig.shortName} Portal...
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Preparing secure page elements and typography.
        </p>
      </Container>
    </div>
  );
}
