import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppLoader } from "@/components/app-loader";
import { SITE_CONFIG } from "@/components/site-config";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import SSCAssistantWrapper from "@/components/ssc/ssc-assistant-wrapper";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://basilanstateuniversity-ssc.org";

const siteTitle = `${SITE_CONFIG.name} | ${SITE_CONFIG.institution}`;

const siteDescription =
  SITE_CONFIG.description ||
  "Official digital hub of the Supreme Student Council of Basilan State University for Parageyan 2026 activities, schedules, guidelines, announcements, and the People's Choice Award voting system. Developed by Jaymar Maruji.";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A2A1F" },
    { media: "(prefers-color-scheme: dark)", color: "#0A2A1F" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,          // keep for accessibility (pinch-to-zoom)
  userScalable: true,
  viewportFit: "cover",      // needed for env(safe-area-inset-*) on iPhone
  colorScheme: "light",
};
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: siteTitle,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  description: siteDescription,

  applicationName: SITE_CONFIG.name,
  category: "education",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  keywords: [
    // Core brand
    "SSC Activity Hub",
    "Supreme Student Council",
    "Basilan State College",
    "Basilan State University",
    "BasSU",
    "BASC",
    "BASC SSC",
    "BasSU SSC",

    // Event
    "Parageyan 2026",
    "Parageyan",
    "Subul Duk Budjang Si Parageyan",
    "People's Choice Award",
    "Mr and Miss Parageyan",
    "Mr. & Miss Parageyan 2026",

    // Activities
    "Student Activities",
    "Intramurals",
    "Intramurals 2026",
    "College Spirit",
    "Student Council Activities",
    "Campus Events Basilan",

    // Voting / platform
    "Parageyan Voting System",
    "Student Voting Platform",
    "Official SSC Website",

    // Developer credit
    "Jaymar Maruji",
    "Developed by Jaymar Maruji",
    "Jaymar Maruji SSC",
  ],

  authors: [
    {
      name: "Supreme Student Council - Basilan State University",
      url: siteUrl,
    },
    {
      name: "Jaymar Maruji",
      url: "https://github.com/buildwithjaym",
    },
  ],

  creator: "Jaymar Maruji",
  publisher: "Supreme Student Council - Basilan State University",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Parageyan 2026 | Developed by Jaymar Maruji`,
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
    creator: "@jaymarmaruji",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
    apple: [{ url: SITE_CONFIG.images.logo, sizes: "180x180" }],
  },

  appleWebApp: {
    capable: true,
    title: SITE_CONFIG.name,
    statusBarStyle: "default",
  },

  other: {
    developer: "Jaymar Maruji",
    "developer:github": "https://github.com/buildwithjaym",
  },

  // verification: {
  //   google: "your-google-verification-code",
  // },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Supreme Student Council - Basilan State University",
      alternateName: ["SSC", "BasSU SSC", "BasSU SSC", "SSC Activity Hub"],
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${SITE_CONFIG.images.logo}`,
      },
      parentOrganization: {
        "@type": "University",
        name: SITE_CONFIG.institution,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE_CONFIG.name,
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      creator: {
        "@type": "Person",
        name: "Jaymar Maruji",
        url: "https://github.com/buildwithjaym",
      },
      inLanguage: "en-PH",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      description: siteDescription,
      inLanguage: "en-PH",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#developer`,
      name: "Jaymar Maruji",
      jobTitle: "SSC Senator / Developer",
      url: "https://github.com/buildwithjaym",
      worksFor: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-PH"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <AppLoader>{children}</AppLoader>
        <Toaster position="top-right" richColors />
        <Analytics />
        <SpeedInsights />
        <SSCAssistantWrapper />
      </body>
    </html>
  );
}