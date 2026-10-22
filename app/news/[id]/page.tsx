import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnnouncementCard } from "@/components/ui/AnnouncementCard";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
} from "lucide-react";


interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return siteConfig.announcements.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = siteConfig.announcements.find((item) => item.id === id);

  if (!article) {
    return {
      title: "Bulletin Not Found",
    };
  }

  return {
    title: `${article.title} | ${siteConfig.name} Bulletins`,
    description: article.summary,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const article = siteConfig.announcements.find((item) => item.id === id);

  if (!article) {
    notFound();
  }

  const relatedArticles = siteConfig.announcements
    .filter((item) => item.id !== article.id)
    .slice(0, 3);

  return (
    <div className="bg-white py-10 sm:py-16">
      <Container>
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "News & Bulletins", href: "/news" },
            { label: article.title },
          ]}
          className="mb-8"
        />

        {/* Article Container */}
        <article className="max-w-3xl mx-auto">
          {/* Header Metadata */}
          <div className="space-y-4 border-b border-slate-200 pb-8 mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="accent" size="md">
                {article.department}
              </Badge>
              {article.isDemo && (
                <Badge variant="demo" size="md">
                  Demonstration Notice
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2744] tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-[#0284c7]" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>

              {article.author && (
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.author}</span>
                </span>
              )}

              {article.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.readTime}</span>
                </span>
              )}
            </div>
          </div>

          {/* Lead Summary */}
          <div className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed mb-8 p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            {article.summary}
          </div>

          {/* Full Body Content */}
          <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed mb-12">
            {article.content && article.content.length > 0 ? (
              article.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p>
                Full administrative archive for this notice is cataloged in the Academy communications repository.
                Contact the {article.department} for complete records.
              </p>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="py-6 border-y border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 text-xs text-slate-500">
            <Button
              href="/news"
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to All Bulletins
            </Button>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-slate-400">
                Notice ID: {article.id}
              </span>
            </div>
          </div>
        </article>

        {/* Related Bulletins */}
        {relatedArticles.length > 0 && (
          <div className="max-w-5xl mx-auto pt-6 border-t border-slate-200">
            <h3 className="text-xl font-bold text-[#0f2744] mb-6">
              More Announcements & Campus Updates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <AnnouncementCard key={rel.id} announcement={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
