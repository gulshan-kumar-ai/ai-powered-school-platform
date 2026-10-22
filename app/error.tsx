"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for development diagnostics
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="py-20 sm:py-32 bg-slate-50/50">
      <Container className="max-w-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-6 border border-rose-100 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <Badge variant="urgent" size="md" className="mb-4">
          Application Error
        </Badge>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744] tracking-tight mb-3">
          Something went wrong
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
          An unexpected error occurred while rendering this page. Our technical team has been
          alerted. You may retry reloading this view or return to the main homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="md"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Retry Loading
          </Button>
          <Button href="/" variant="outline" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Homepage
          </Button>
        </div>
      </Container>
    </div>
  );
}
