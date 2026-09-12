"use client";

import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/components/site-config";

export default function Loading() {
  return (
    <main className="fixed inset-0 z-[999] flex min-h-screen items-center justify-center bg-[#0A2A1F]">
      <div className="flex flex-col items-center text-center">
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-24 w-24 overflow-hidden rounded-full border border-white/20 bg-white shadow-xl"
        >
          <CldImage
            src={SITE_CONFIG.images.logo}
            alt="SSC Logo"
            fill
            priority
            sizes="96px"
            crop="fill"
            gravity="auto"
            quality="auto"
            format="auto"
            className="object-cover"
          />
        </motion.div>

        {/* TITLE */}
       <motion.h1
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
>
  {"SSC PARAGEYAN".split("").map((letter, index) => (
    <motion.span
      key={index}
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.06,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-block"
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  ))}

  {" "}

  <motion.span
    initial={{
      opacity: 0,
      y: 25,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      delay: 0.8,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="text-[#D4AF37]"
  >
    2026
  </motion.span>

</motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 h-px w-24 bg-[#D4AF37]"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-5 text-sm uppercase tracking-[0.25em] text-white/50"
        >
          {SITE_CONFIG.institution}
        </motion.p>

        {/* LOADING DOTS */}
        <div className="mt-8 flex gap-2">
          {[1, 2, 3].map((item) => (
            <motion.span
              key={item}
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: item * 0.15,
              }}
              className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]"
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-xs text-white/30"
        >
          Developed by Jaymar Maruji
        </motion.p>
      </div>
    </main>
  );
}
