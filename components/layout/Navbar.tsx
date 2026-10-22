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
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Luxury Utility Bar */}
      <div className="bg-[#050d1a] text-slate-300 text-xs py-2 border-b border-slate-800/90 shadow-inner">
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono text-[11px]">{siteConfig.contact.mainPhone}</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono text-[11px]">{siteConfig.contact.mainEmail}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bab-e-Ibraheem Momin Campus • Station Road</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px] font-semibold text-slate-200">
                BISE Mirpur Khas Affiliated
              </span>
            </div>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <Link
              href="/demo"
              className="text-xs text-amber-300 hover:text-white transition-colors flex items-center gap-1 font-semibold bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30"
            >
              <span>Demo Mode</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <Link
              href="/portal"
              className="text-xs text-sky-300 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            >
              <span>Portal Directory</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Glassmorphic Navbar */}
      <div
        className={cn(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-slate-200/90 shadow-md py-2.5"
            : "bg-white/95 backdrop-blur-md border-slate-200/70 py-3.5"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* School Brand / Crest */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl p-1"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 drop-shadow-md group-hover:scale-105 transition-transform duration-300 rounded-xl bg-white p-1 border border-slate-200/60 shadow-xs">
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
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#0f2744] leading-tight group-hover:text-[#0284c7] transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <span>Kunri, Sindh</span>
                <span className="text-slate-300">•</span>
                <span>Est. {siteConfig.established}</span>
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
                    "px-3.5 py-2 rounded-xl text-sm font-semibold transition-all relative flex items-center gap-1.5",
                    isActive
                      ? "text-[#0284c7] bg-sky-50/90 font-bold shadow-2xs"
                      : "text-slate-700 hover:text-[#0f2744] hover:bg-slate-100/80"
                  )}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant="accent" size="sm" className="font-bold text-[10px]">
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
              className="font-bold border-slate-300 hover:border-sky-500"
            >
              Student Portal
            </Button>
            <Button
              href="/portal/login"
              variant="primary"
              size="md"
              className="font-bold bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 shadow-md shadow-sky-600/20"
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
              className="text-xs font-bold"
            >
              Student Portal
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#0f2744] hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
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
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
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
                      "flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                      isActive
                        ? "text-[#0284c7] bg-sky-50 font-bold"
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
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3">
                School Portals
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/portal/login?role=student"
                  onClick={closeMobileMenu}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Student Portal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  href="/portal/login?role=parent"
                  onClick={closeMobileMenu}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
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
                  className="w-full justify-center font-bold"
                  leftIcon={<LogIn className="w-4 h-4 text-sky-200" />}
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
