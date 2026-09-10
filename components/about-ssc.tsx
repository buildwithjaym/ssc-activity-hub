"use client";

import { motion } from "framer-motion";
import { Users, Target, Heart } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Student Leadership",
    description:
      "We stand for every student of Basilan State College. Your voice is our duty.",
  },
  {
    icon: Target,
    title: "Organized Excellence",
    description:
      "We plan and run official activities that build real school spirit and unity.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "Every event we create is made for students to grow, connect, and belong.",
  },
];

export function AboutSSC() {
  return (
    <section
      id="about"
      className="bg-[#F8F5EF] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Who we are
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2A1F] sm:text-4xl">
            Supreme Student Council
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            We are the highest student body of Basilan State College. 
            During Parageyan 2026, we organize and co-organize official activities 
            that bring students together, build pride, and create lasting memories.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A2A1F]/5">
                <item.icon className="h-5 w-5 text-[#0A2A1F]" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#0A2A1F]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}