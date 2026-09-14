"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, PartyPopper, Heart } from "lucide-react";
import { SITE_CONFIG } from "./site-config";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type EventStatus = "upcoming" | "live" | "ended";

const DEFAULT_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function getEventStatus(): EventStatus {
  const now = Date.now();
  const start = new Date(SITE_CONFIG.event.startDate).getTime();
  const end = new Date(SITE_CONFIG.event.endDate).getTime();

  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "live";
}

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

function Digit({ value, size = "md" }: { value: number; size?: "lg" | "md" }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={
          size === "lg"
            ? "text-6xl font-bold tracking-tight text-[#D4AF37] sm:text-7xl lg:text-8xl"
            : "text-2xl font-bold text-white sm:text-3xl"
        }
      >
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
  );
}

function LiveCard() {
  return (
    <motion.div
      key="live"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45 }}
      className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-b from-white/[0.09] to-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-xl"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4AF37]/15 blur-3xl" />

      <div className="relative">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
          <Flame className="h-6 w-6 text-[#D4AF37]" />
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">
            Live Now
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-bold text-white">Parageyan 2026</h3>

        <p className="mt-3 text-sm leading-relaxed text-white/65">
          The celebration has officially started. Join activities, support your
          college, and create unforgettable memories.
        </p>

        <div className="mt-7 flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]/25" />
        </div>
      </div>
    </motion.div>
  );
}

function EndedCard() {
  return (
    <motion.div
      key="ended"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45 }}
      className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-b from-white/[0.09] to-white/[0.04] p-8 text-center shadow-2xl backdrop-blur-xl"
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4AF37]/15 blur-3xl" />

      <div className="relative">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
          <PartyPopper className="h-6 w-6 text-[#D4AF37]" />
        </div>

        <h3 className="mt-6 text-2xl font-bold text-white">Thank You</h3>

        <p className="mt-3 text-sm leading-relaxed text-white/65">
          Thank you for being part of Parageyan 2026. Celebrating student spirit,
          talent, and unity.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37]">
          <Heart className="h-4 w-4" />
          Until the next celebration
        </div>
      </div>
    </motion.div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(DEFAULT_TIME);
  const [status, setStatus] = useState<EventStatus>("upcoming");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = () => {
      const currentStatus = getEventStatus();
      setStatus(currentStatus);

      if (currentStatus === "upcoming") {
        setTimeLeft(calculateTimeLeft());
      }
    };

    tick(); // run immediately
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full max-w-sm" />;
  }

  if (status === "live") return <LiveCard />;
  if (status === "ended") return <EndedCard />;

  // Upcoming → Countdown
  return (
    <div className="w-full max-w-sm">
      <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 lg:text-left">
        Countdown to Parageyan
      </p>

      <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] px-6 py-7 text-center backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        <div className="flex items-center justify-center">
          <Digit value={timeLeft.days} size="lg" />
        </div>
        <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
          Days
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.07] px-2 py-4 text-center backdrop-blur-xl"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="flex items-center justify-center">
              <Digit value={item.value} size="md" />
            </div>
            <p className="mt-1.5 text-[9px] font-medium uppercase tracking-wider text-white/40">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}