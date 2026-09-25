import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppLoader } from "@/components/app-loader";
import { SITE_CONFIG } from "@/components/site-config";
import { Analytics } from "@vercel/analytics/next";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://basilanstateuniversity-ssc.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0A2A1F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.institution}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description:
    SITE_CONFIG.description ||
    "Official digital platform of the Supreme Student Council of Basilan State College for Parageyan 2026 activities, schedules, and People's Choice Award voting.",

  keywords: [
    "SSC Activity Hub",
    "Basilan State College",
    "Parageyan 2026",
    "Parageyan Voting System",
    "People's Choice Award",
    "Intramurals 2026",
    "Student Activities",
    "Supreme Student Council",
    "BASC",
    "Mr and Miss Parageyan",
    "Jaymar Maruji",
  ],

  authors: [
    {
      name: "Jaymar Maruji",
      url: siteUrl,
    },
    {
      name: "Supreme Student Council - Basilan State College",
    },
  ],

  creator: "Jaymar Maruji",
  publisher: "Supreme Student Council - Basilan State College",

  applicationName: "SSC Activity Hub",
  category: "education",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.institution}`,
    description:
      "Official digital platform for Parageyan 2026 activities, schedules, student participation, and the People's Choice Award voting system. Developed by Jaymar Maruji.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SSC Activity Hub - Parageyan 2026 | Developed by Jaymar Maruji",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.institution}`,
    description:
      "Official platform for Parageyan 2026 activities, schedules, and People's Choice Award voting. Built by Jaymar Maruji.",
    images: ["/og-image.png"],
    creator: "@jaymarmaruji", // update if you have a real X/Twitter handle
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: SITE_CONFIG.images.favicon, sizes: "32x32", type: "image/png" },
      { url: SITE_CONFIG.images.favicon, sizes: "16x16", type: "image/png" },
    ],
    shortcut: SITE_CONFIG.images.favicon,
    apple: SITE_CONFIG.images.logo,
  },

  other: {
    "developer": "Jaymar Maruji",
    "og:image:width": "1200",
    "og:image:height": "630",
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
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <AppLoader>{children}</AppLoader>
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}