"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  ChevronRight,
  Megaphone,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const cards = [
  {
    icon: Trophy,
    title: "Activities",
    description:
      "Explore the sports, contests, and events organized by the Supreme Student Council.",
    href: "#activities",
  },
  {
    icon: CalendarDays,
    title: "Schedule",
    description:
      "Check official dates, times, venues, and activity schedules for Parageyan 2026.",
    href: "#schedule",
  },
  {
    icon: ShieldCheck,
    title: "Guidelines",
    description:
      "Review the official rules, requirements, and participation guidelines.",
    href: "#guidelines",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description:
      "Stay updated with official announcements and important SSC updates.",
    href: "#announcements",
  },
];

export function QuickAccess() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Your event hub
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2A1F] sm:text-4xl">
            Everything you need for Parageyan 2026.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Find official event information in one place — no more scattered posts
            and messages.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-lg hover:shadow-[#0A2A1F]/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A2A1F]/8 text-[#0A2A1F] transition-all duration-300 group-hover:bg-[#0A2A1F] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-bold text-[#0A2A1F]">{card.title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {card.description}
                </p>

                <div className="mt-5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0A2A1F]">
                  Explore
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}