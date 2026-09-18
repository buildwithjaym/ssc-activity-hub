import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppLoader } from "@/components/app-loader";
import { SITE_CONFIG } from "@/components/site-config";

import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.institution}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: SITE_CONFIG.description,

  keywords: [
    "SSC Activity Hub",
    "Basilan State College",
    "Parageyan 2026",
    "Parageyan Voting System",
    "Jaymar Maruji",
    "People Choice Award",
    "Intramurals",
    "Student Activities",
  ],

  authors: [
    {
      name: "Supreme Student Council - Basilan State College",
    },
  ],

  creator: "Supreme Student Council - Basilan State College",

  openGraph: {
    title: "SSC Activity Hub | Basilan State College",

    description:
      "Official digital platform for Parageyan 2026 activities, schedules, student participation and voting system for people choice award.",

    type: "website",
  },

  icons: {
    icon: SITE_CONFIG.images.favicon,
    shortcut: SITE_CONFIG.images.favicon,
    apple: SITE_CONFIG.images.logo,
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
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <AppLoader>{children}</AppLoader>
         <Toaster
    position="top-right"
    richColors
  />
      </body>
    </html>
  );
}
