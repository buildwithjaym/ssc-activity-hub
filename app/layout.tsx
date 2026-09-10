import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "SSC Activity Hub | Basilan State College",
    template: "%s | SSC Activity Hub",
  },

  description:
    "The official digital activity hub of the Supreme Student Council of Basilan State College. Discover Intramurals activities, schedules, guidelines, announcements, and registration information.",

  keywords: [
    "SSC Activity Hub",
    "Basilan State College",
    "Intramurals 2026",
    "Supreme Student Council",
    "Student Activities",
    "College Events",
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
      "Your central guide for SSC-supported Intramurals activities, schedules, guidelines, and announcements.",

    type: "website",
  },

  icons: {
    icon: "/ssc-logo.jpg",

    shortcut: "/ssc-logo.jpg",

    apple: "/ssc-logo.jpg",
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
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >
      <body
        className="
          min-h-screen
          flex
          flex-col
          bg-background
          text-foreground
        "
      >
        {children}
      </body>
    </html>
  );
}
