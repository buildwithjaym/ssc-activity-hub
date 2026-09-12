export const SITE_CONFIG = {
  name: "SSC Activity Hub",

  shortName: "SSC Hub",

  institution: "Basilan State College",

  event: {
    name: "Parageyan 2026",

    label: "Basilan State College Parageyan 2026",

    startDate: "2026-10-03T07:00:00+08:00",

    endDate: "2026-10-09T18:00:00+08:00",
  },

  description:
    "Your official digital hub for Parageyan 2026 activities, schedules, guidelines, and participation information at Basilan State College.",

  images: {
    logo: "ssc-logo",
    favicon: "favicon",
    hero: "basc.png",
  },
  audio: {
    flip: "flip.mp3",
  },
  navigation: [
    {
      label: "Home",
      href: "#home",
    },

    {
      label: "About SSC",
      href: "#about",
    },

    {
      label: "Activities",
      href: "#activities",
    },

    {
      label: "Schedule",
      href: "#schedule",
    },

    {
      label: "How to Join",
      href: "#participate",
    },
  ],

  colors: {
    green: "#0F3D2E",

    greenDark: "#0A2A1F",

    greenDeep: "#061C15",

    gold: "#D4AF37",

    goldLight: "#F0D060",

    goldMuted: "rgba(212,175,55,0.15)",

    cream: "#F8F5EF",

    red: "#C0392B",
  },
} as const;
