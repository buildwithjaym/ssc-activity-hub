"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const featured = [
  {
    title: "Banner & Mascot Making Contest",
    date: "Sep 28–30, 2026",
    category: "Creative",
  },
  {
    title: "Mini Concert",
    date: "Oct 3, 2026",
    category: "Cultural",
  },
  {
    title: "Color Fun Run",
    date: "Oct 6, 2026",
    category: "Sports",
  },
  {
    title: "Larong Pinoy",
    date: "Oct 7, 2026",
    category: "Sports",
  },
  {
    title: "Battle of the Brains",
    date: "Oct 9, 2026",
    category: "Academic",
  },
  {
    title: "Trade Fair & Booth Competition",
    date: "TBA",
    category: "Community",
  },
];

export function FeaturedActivities() {
  return (
    <section
      id="activities"
      className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Official Activities
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2A1F] sm:text-4xl">
              What we are organizing
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              These are the official activities led or supported by the Supreme Student Council 
              for Parageyan 2026. This is where school spirit comes alive.
            </p>
          </div>

          <Link
            href="#activities"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0A2A1F] transition-colors hover:text-[#D4AF37]"
          >
            View all activities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="group rounded-2xl border border-slate-200 bg-[#F8F5EF]/60 p-6 transition-all hover:border-[#D4AF37]/40 hover:bg-white hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#0A2A1F]/8 px-3 py-1 text-[11px] font-semibold text-[#0A2A1F]">
                  {activity.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {activity.date}
                </div>
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#0A2A1F]">
                {activity.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}