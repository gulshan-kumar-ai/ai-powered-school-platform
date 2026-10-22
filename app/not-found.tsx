import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Compass, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 sm:py-32 bg-slate-50/50">
      <Container className="max-w-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto mb-6 border border-sky-100 shadow-sm">
          <Compass className="w-8 h-8" />
        </div>

        <Badge variant="secondary" size="md" className="mb-4">
          Error 404 • Page Not Found
        </Badge>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744] tracking-tight mb-3">
          Campus Location Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
          The requested page or resource could not be found. Please check the URL
          or use the directory navigation links below to explore {siteConfig.name}.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Return to Homepage
          </Button>
          <Button href="/contact" variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Contact Campus Office
          </Button>
        </div>
      </Container>
    </div>
  );
}
