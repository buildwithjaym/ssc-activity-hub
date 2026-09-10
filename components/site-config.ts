export const SITE_CONFIG = {
  name: "SSC Activity Hub",
  shortName: "SSC Activity Hub",
  institution: "Basilan State College",

  event: {
    name: "Intramurals 2026",
    startDate: "2026-10-03T07:00:00+08:00",
    label: "Basilan State College Intramurals 2026",
  },

  description:
    "Your official digital hub for Intramurals activities, schedules, guidelines, and announcements at Basilan State College.",

  images: {
    logo: "/ssc-logo.jpg",
    hero: "/basc.png",
  },

  navigation: [
    { label: "Home", href: "#home" },
    { label: "Activities", href: "#activities" },
    { label: "Schedule", href: "#schedule" },
    { label: "Guidelines", href: "#guidelines" },
    { label: "Announcements", href: "#announcements" },
  ],

  colors: {
    green: "#0F3D2E",
    greenDark: "#0A2A1F",
    greenDeep: "#061C15",
    gold: "#D4AF37",
    goldLight: "#F0D060",
    goldMuted: "rgba(212, 175, 55, 0.15)",
    cream: "#F8F5EF",
    red: "#C0392B",
  },
} as const;