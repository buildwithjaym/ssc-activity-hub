"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Users,
  CalendarDays,
  Trophy,
} from "lucide-react";

const reasons = [
  "Centralized information for all Parageyan 2026 activities",
  "Easy access to schedules, guidelines, and participation details",
  "A reliable platform for students to stay informed",
];

const highlights = [
  {
    icon: CalendarDays,
    title: "Stay Updated",
    description: "Access official activities and schedules.",
  },
  {
    icon: Trophy,
    title: "Participate",
    description: "Discover events and competitions.",
  },
  {
    icon: Users,
    title: "Connect",
    description: "Experience unity and college spirit.",
  },
];

export function IntroSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Why We Built This
          </p>

          <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-[#0A2A1F] sm:text-4xl">
            Making Parageyan 2026 easier and more accessible for every student.
          </h2>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-600">
            SSC Activity Hub was created to solve the challenge of scattered
            information. Instead of searching different posts, students can find
            official activities, schedules, guidelines, and participation
            details in one trusted platform.
          </p>

          <div className="mt-8 space-y-4">
            {reasons.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0A2A1F]" />

                <p className="text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          <a
            href="#activities"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0A2A1F] transition hover:text-[#D4AF37]"
          >
            Explore Activities
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-[#0A2A1F] p-7 shadow-xl sm:p-8"
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Flame className="h-5 w-5 text-[#D4AF37]" />
            </div>

            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Our Purpose
            </p>

            <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
              Connecting students through information, activities, and
              experiences.
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-white/65">
              The platform helps students discover opportunities, prepare for
              events, and become part of the Parageyan 2026 celebration.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-2xl bg-white/5 p-4">
                    <Icon className="h-5 w-5 text-[#D4AF37]" />

                    <h4 className="mt-3 text-sm font-bold text-white">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-xs leading-relaxed text-white/55">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
