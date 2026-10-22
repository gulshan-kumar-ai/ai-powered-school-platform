"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  Menu,
  X,
  LogIn,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
} from "lucide-react";


import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* Top Utility Bar */}
      <div className="bg-[#08162b] text-slate-300 text-xs py-2 border-b border-slate-800">
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{siteConfig.contact.mainPhone}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>{siteConfig.contact.mainEmail}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-medium text-slate-200">Smart School Management System</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link
              href="/demo"
              className="text-xs text-amber-300 hover:text-white transition-colors flex items-center gap-1 font-semibold bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30"
            >
              <span>Demo Mode</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link
              href="/portal"
              className="text-xs text-sky-300 hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <span>Portal Directory</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <div
        className={cn(
          "bg-white/95 backdrop-blur-md transition-all duration-200 border-b",
          scrolled
            ? "border-slate-200 shadow-sm py-3"
            : "border-slate-200/60 py-4"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* School Brand / Crest */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 drop-shadow-sm group-hover:scale-105 transition-transform">
              <Image
                src="/images/school/logo.png"
                alt={`${siteConfig.name} Official Logo Crest`}
                width={48}
                height={48}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-[#0f2744] leading-tight">
                {siteConfig.name}
              </span>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                Excellence in Education • Est. {siteConfig.established}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {siteConfig.navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors relative flex items-center gap-1.5",
                    isActive
                      ? "text-[#0284c7] bg-sky-50/80 font-semibold"
                      : "text-slate-700 hover:text-[#0f2744] hover:bg-slate-100/70"
                  )}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant="accent" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>


          {/* Right Action / Student & School Portal Button */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Button
              href="/portal/login?role=student"
              variant="outline"
              size="md"
              leftIcon={<LogIn className="w-4 h-4 text-sky-600" />}
            >
              Student Portal
            </Button>
            <Button
              href="/portal/login"
              variant="primary"
              size="md"
            >
              Portal Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              href="/portal/login?role=student"
              variant="primary"
              size="sm"
              className="text-xs"
            >
              Student Portal
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0f2744] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <Container className="py-5 space-y-4">
            <div className="flex flex-col space-y-1">
              {siteConfig.navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-[#0284c7] bg-sky-50 font-semibold"
                        : "text-slate-700 hover:text-[#0f2744] hover:bg-slate-100"
                    )}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="accent" size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3">
                School Portals
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/portal/login?role=student"
                  onClick={closeMobileMenu}
                  className="p-2.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Student Portal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  href="/portal/login?role=parent"
                  onClick={closeMobileMenu}
                  className="p-2.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Parent Portal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>

              <div className="pt-2">
                <Button
                  href="/portal/login"
                  onClick={closeMobileMenu}
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  leftIcon={<LogIn className="w-4 h-4 text-sky-300" />}
                >
                  Portal Login Hub
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
