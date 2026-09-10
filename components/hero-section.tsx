"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Flame } from "lucide-react";

import { Countdown } from "./countdown";
import { SITE_CONFIG } from "./site-config";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0A2A1F]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={SITE_CONFIG.images.hero}
          alt="Basilan State College campus"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2A1F]/85 via-[#0A2A1F]/70 to-[#0A2A1F]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12)_0%,_transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          
          {/* LEFT - Text + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 backdrop-blur-md">
              <Flame className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37] sm:text-xs">
                Supreme Student Council
              </span>
            </div>

            <h1 className="text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.1rem]">
              Basilan State College
              <span className="mt-2 block bg-gradient-to-r from-[#D4AF37] to-[#F0D060] bg-clip-text text-transparent">
                PARAGEYAN 2026
              </span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-base sm:leading-7">
              {SITE_CONFIG.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#activities"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-[#0A2A1F] shadow-lg shadow-[#D4AF37]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F0D060]"
              >
                View Activities
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#schedule"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                <CalendarDays className="h-4 w-4" />
                View Schedule
              </a>
            </div>
          </motion.div>

          {/* RIGHT - Countdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden justify-self-end lg:block"
          >
            <Countdown />
          </motion.div>
        </div>

        {/* Mobile Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 lg:hidden"
        >
          <Countdown />
        </motion.div>
      </div>
    </section>
  );
}