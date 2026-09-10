"use client";

import { motion } from "framer-motion";

type PlaceholderSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderSection({
  id,
  eyebrow,
  title,
  description,
}: PlaceholderSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-slate-100 bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2A1F] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}