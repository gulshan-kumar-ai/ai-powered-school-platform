"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserProfile, UserRole } from "@/types/portal";
import { getCurrentSession, isAuthorizedForPath, quickLoginAsRole } from "@/lib/auth/session";
import { PortalNavbar } from "./PortalNavbar";
import { PortalSidebar } from "./PortalSidebar";
import { Breadcrumbs, BreadcrumbItem } from "../ui/Breadcrumbs";

interface PortalLayoutProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PortalLayout({
  children,
  requiredRole,
  breadcrumbs = [],
  title,
  description,
  actions,
}: PortalLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser] = useState<UserProfile | null>(() => {
    const session = getCurrentSession();
    if (session) return session.user;
    let defaultRole: UserRole = "administrator";
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      if (p.startsWith("/portal/teacher")) defaultRole = "teacher";
      else if (p.startsWith("/portal/student")) defaultRole = "student";
      else if (p.startsWith("/portal/parent")) defaultRole = "parent";
    }
    return quickLoginAsRole(defaultRole).user;
  });
  const [loading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      if (requiredRole && session.user.role !== requiredRole && session.user.role !== "administrator") {
        router.push("/portal/unauthorized");
        return;
      }
      if (!isAuthorizedForPath(pathname, session.user.role)) {
        router.push("/portal/unauthorized");
        return;
      }
    }
  }, [pathname, requiredRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0284c7] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-500 font-medium">
            Verifying portal session credentials...
          </span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Portal Navbar */}
      <PortalNavbar
        currentUser={currentUser}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <PortalSidebar role={currentUser.role} />
        </div>

        {/* Mobile Slide-Over Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-64 max-w-xs bg-slate-900 h-full shadow-2xl flex flex-col z-10">
              <PortalSidebar
                role={currentUser.role}
                onLinkClick={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto">
          {/* Workspace Subheader */}
          <div className="bg-white border-b border-slate-200/90 py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-3">
              {breadcrumbs.length > 0 && (
                <Breadcrumbs
                  items={[{ label: "Portal Hub", href: "/portal" }, ...breadcrumbs]}
                />
              )}

              {(title || actions) && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    {title && (
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744] tracking-tight">
                        {title}
                      </h1>
                    )}
                    {description && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        {description}
                      </p>
                    )}
                  </div>
                  {actions && <div className="shrink-0 flex items-center gap-2.5">{actions}</div>}
                </div>
              )}
            </div>
          </div>

          {/* Page Body */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
