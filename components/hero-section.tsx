"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Flame } from "lucide-react";

import { EventStatus } from "./event-status";
import { SITE_CONFIG } from "./site-config";

export function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-[#0A2A1F]">

      <div className="absolute inset-0">
        <Image src={SITE_CONFIG.images.hero} alt="Basilan State College campus" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2A1F]/85 via-[#0A2A1F]/70 to-[#0A2A1F]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),transparent_50%)]" />
      </div>


      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:px-10">

        <div className="grid items-center gap-14 lg:grid-cols-2">


          <motion.div
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{duration:.6}}
            className="max-w-xl"
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2">
              <Flame className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Supreme Student Council
              </span>
            </div>


            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">

              Basilan State College

              <span className="mt-2 block bg-gradient-to-r from-[#D4AF37] to-[#F0D060] bg-clip-text text-transparent">
                PARAGEYAN 2026
              </span>

            </h1>


            <p className="mt-6 max-w-md text-sm leading-7 text-white/70 sm:text-base">
              The official hub for Parageyan 2026 activities, schedules,
              guidelines, and student participation.
            </p>


            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href="#activities"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-[#0A2A1F] transition hover:bg-[#F0D060]"
              >
                View Activities
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>


              <a
                href="#schedule"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <CalendarDays className="h-4 w-4" />
                Schedule
              </a>

            </div>

          </motion.div>




          <motion.div
            initial={{opacity:0,x:20}}
            animate={{opacity:1,x:0}}
            transition={{duration:.6,delay:.15}}
            className="justify-self-center lg:justify-self-end"
          >

            <EventStatus />

          </motion.div>


        </div>

      </div>

    </section>
  );
}