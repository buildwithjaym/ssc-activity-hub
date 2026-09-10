"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Flame } from "lucide-react";

const points = [
  "Official event information",
  "Clear schedules and venues",
  "Important guidelines and updates",
];

export function IntroSection() {
  return (
    <section className="bg-[#F8F5EF] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Built for students
          </p>

          <h2 className="mt-3 max-w-lg text-3xl font-bold tracking-tight text-[#0A2A1F] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            Everything you need for Parageyan 2026 in one place.
          </h2>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-600 sm:text-base">
            No more hunting for posts or asking around. 
            SSC Activity Hub gives you the official information you can trust.
          </p>

          <div className="mt-8 space-y-3.5">
            {points.map((point) => (
              <div key={point} className="flex items-center gap-3">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-[#0A2A1F]" />
                <span className="text-sm font-medium text-slate-700">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#activities"
            className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#0A2A1F] transition-colors hover:text-[#D4AF37]"
          >
            Explore Activities
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[#0A2A1F] p-8 shadow-2xl sm:p-10"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#D4AF37]/12 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-[#D4AF37]/08 blur-2xl" />

          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Flame className="h-6 w-6 text-[#D4AF37]" />
            </div>

            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Student spirit
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Where competition meets community.
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Stay connected with the official activities, schedules, and updates 
              from the Supreme Student Council throughout Parageyan 2026.
            </p>

            <div className="mt-9 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                  Basilan State College
                </span>
                <span className="font-bold text-[#D4AF37]">2026</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}