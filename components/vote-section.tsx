"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy, Users, ShieldCheck } from "lucide-react";

export function VoteSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A2A1F] py-20 sm:py-24">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.15),_transparent_55%)]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              People's Choice Award
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Cast Your Vote for
              <span className="mt-1 block text-[#D4AF37]">
                Mr. & Miss Parageyan 2026
              </span>
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
              Support the finalists who embody confidence, character, and the
              pride of Basilan State College. Your vote makes a difference.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/voting"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#0A2A1F] transition hover:scale-105 hover:shadow-lg"
              >
                Vote Now
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/voting/candidates"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Candidates
              </Link>
            </div>
          </motion.div>

          {/* Right Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              {
                icon: Trophy,
                title: "People's Choice",
                desc: "The finalist with the most votes wins the award.",
              },
              {
                icon: Users,
                title: "Open to All",
                desc: "Every student can participate and make their voice heard.",
              },
              {
                icon: ShieldCheck,
                title: "Secure Voting",
                desc: "Protected with Google authentication for fair results.",
              },
              {
                icon: ArrowRight,
                title: "Google Login",
                desc: "For secure and automated authentication.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                  <item.icon size={18} />
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}