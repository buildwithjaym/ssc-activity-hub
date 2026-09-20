"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

import { SITE_CONFIG } from "@/components/site-config";

const navigation = [
  { label: "Home", href: "/voting" },
  { label: "Candidates", href: "/voting/candidates" },
];

export default function VotingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/voting") {
      return pathname === "/voting";
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <nav className="flex h-[64px] items-center justify-between rounded-2xl border border-white/15 bg-[#123F2A]/80 px-3 shadow-lg backdrop-blur-2xl sm:h-[68px] sm:px-4">
          {/* BRAND */}
          <Link
            href="/voting"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-3"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/40 bg-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
              <CldImage
                src={SITE_CONFIG.images.logo}
                alt="Supreme Student Council Logo"
                fill
                sizes="44px"
                crop="fill"
                gravity="auto"
                quality="auto"
                format="auto"
                priority
                className="object-cover"
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold tracking-wide text-white">
                {SITE_CONFIG.shortName}
              </p>
              <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-white/55">
                Mr. & Miss Parageyan 2026
              </p>
            </div>

            <span className="text-sm font-bold text-white sm:hidden">
              SSC Hub
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2.5 text-[11px] font-semibold transition-all duration-300 ${
                    active
                      ? "bg-white/20 text-white shadow-sm"
                      : "text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}

                  {/* Active indicator dot for Live Ranking */}
                  {item.href === "/voting/ranking" && (
                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <Link
              href="/voting"
              className="hidden items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-[11px] font-bold text-[#123F2A] transition duration-300 hover:scale-105 hover:shadow-lg lg:flex"
            >
              Vote Now
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/15 bg-[#123F2A]/95 p-2 shadow-xl backdrop-blur-2xl lg:hidden"
            >
              {navigation.map((item, index) => {
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition ${
                        active
                          ? "bg-white/15 text-white"
                          : "text-white/65 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}

                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Vote Now - mobile */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mt-1 border-t border-white/10 pt-2"
              >
                <Link
                  href="/voting"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3.5 text-sm font-bold text-[#123F2A] transition active:scale-[0.98]"
                >
                  Vote Now
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}