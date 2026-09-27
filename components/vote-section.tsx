"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Users,
  ShieldCheck,
  Sparkles,
  Vote,
} from "lucide-react";

const highlights = [
  {
    icon: Trophy,
    title: "People's Choice Award",
    description:
      "The finalist with the most votes will receive the People's Choice recognition.",
  },
  {
    icon: Users,
    title: "Support Your Choice",
    description:
      "Show your support and celebrate the finalists of Subul duk Budjang si Parageyan 2026.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Voting",
    description:
      "Votes are protected through Google authentication for a safe experience.",
  },
  {
    icon: Vote,
    title: "Every Vote Counts",
    description:
      "Your participation helps recognize this year's outstanding finalists.",
  },
];

export function VoteSection() {
  return (
    <section className="relative overflow-hidden bg-[#071F17] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              <Sparkles size={14} />
              People's Choice Award
            </div>

            <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Cast Your Votes for
              <span className="block text-[#D4AF37]">
                Subul duk Budjang si Parageyan 2026
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65">
              Support the finalists who represent confidence, character, and
              the pride of Basilan State University. Your vote helps determine
              this year's People's Choice Award.
            </p>

            <p className="mt-4 text-sm text-[#D4AF37]">
              If voting is open, you may start casting your votes now.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/voting"
                className="
                  group inline-flex items-center gap-2
                  rounded-full bg-[#D4AF37]
                  px-7 py-3.5
                  text-sm font-bold
                  text-[#071F17]
                  transition-all
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                Cast Your Vote
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/voting/candidates"
                className="
                  inline-flex items-center gap-2
                  rounded-full border border-white/20
                  bg-white/5
                  px-7 py-3.5
                  text-sm font-semibold
                  text-white
                  transition
                  hover:bg-white/10
                "
              >
                View Candidates
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-white/50">
              <ShieldCheck size={18} className="text-[#D4AF37]" />
              Secure voting through Google authentication
            </div>
          </motion.div>


          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.05]
                    p-5
                    backdrop-blur-sm
                    transition
                    hover:bg-white/[0.08]
                  "
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                    <Icon size={18} />
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}