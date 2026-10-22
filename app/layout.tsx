import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PublicSchoolChatbot } from "@/components/ai/PublicSchoolChatbot";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.name,
    "Government Qazi Sultan Higher Secondary School Kunri",
    "GBHSS Qazi Sultan Kunri",
    "Qazi Sultan Boys HSS Kunri",
    "Station Road Kunri",
    "Umerkot District Sindh",
    "Mirpur Khas Region",
    "BISE Mirpur Khas",
    "Rehmatullah Lashari",
    "Pre-Engineering Pre-Medical",
    "Sindh Education & Literacy Department",
    "Smart School Management System",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: {
    icon: "/images/school/logo.png",
    shortcut: "/images/school/logo.png",
    apple: "/images/school/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-sky-100 selection:text-sky-900">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Suspense fallback={null}>
          <PublicSchoolChatbot />
        </Suspense>
      </body>
    </html>
  );
}
