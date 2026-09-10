"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "./site-config";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DEFAULT_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function calculateTimeLeft(): TimeLeft {
  const difference =
    new Date(SITE_CONFIG.event.startDate).getTime() - Date.now();

  if (difference <= 0) return DEFAULT_TIME;

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const current = timeLeft ?? DEFAULT_TIME;

  const isFinished =
    current.days === 0 &&
    current.hours === 0 &&
    current.minutes === 0 &&
    current.seconds === 0;

  return (
    <div className="w-full max-w-sm lg:max-w-md">
      <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50 lg:text-left">
        {isFinished ? "Parageyan is now underway" : "Countdown to Parageyan"}
      </p>

      {/* DAYS - Large Highlight */}
      <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] px-8 py-8 text-center backdrop-blur-xl lg:py-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

        <motion.div
          key={current.days}
          initial={{ opacity: 0.4, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-7xl font-bold tracking-tight text-[#D4AF37] lg:text-8xl"
        >
          {String(current.days).padStart(2, "0")}
        </motion.div>

        <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-white/50">
          Days
        </p>
      </div>

      {/* Hours / Minutes / Seconds */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Hours", value: current.hours },
          { label: "Minutes", value: current.minutes },
          { label: "Seconds", value: current.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="relative overflow-hidden rounded-xl border border-white/15 bg-white/[0.08] px-3 py-5 text-center backdrop-blur-xl"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <motion.div
              key={`${item.label}-${item.value}`}
              initial={{ opacity: 0.4, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-3xl font-bold text-white lg:text-4xl"
            >
              {String(item.value).padStart(2, "0")}
            </motion.div>

            <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white/45">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}