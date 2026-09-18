"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import GoogleButton from "@/components/auth/google-button";

export default function VotingHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#FAF8F2]">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.12),_transparent_50%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl"
        >
          {/* Small label */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Parageyan 2026
          </p>

          {/* Main title */}
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-[#0A2A1F] sm:text-5xl lg:text-6xl">
            Mr. & Miss
            <span className="mt-1 block text-[#D4AF37]">
              Parageyan 2026
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base font-medium text-[#0A2A1F]/80 sm:text-lg">
            People's Choice Award
          </p>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            Your vote celebrates confidence, character, and leadership.
            Support the finalist who represents the pride of Basilan State College.
          </p>

          {/* CTA */}
          <div className="mx-auto mt-8 w-full max-w-xs">
            <GoogleButton />
          </div>

          {/* Trust */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
            <span>Secure Google authentication</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}