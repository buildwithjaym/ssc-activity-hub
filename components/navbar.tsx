"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { SITE_CONFIG } from "./site-config";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/*NAVBAR */}

        <nav
          className="
            flex h-[64px] items-center justify-between
            rounded-2xl
            border border-white/[0.14]
            bg-[#123F2A]/[0.28]
            px-3
            shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            backdrop-blur-2xl
            sm:h-[68px]
            sm:px-4
          "
        >
          {/*BRAND */}

          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2.5"
            aria-label="SSC Activity Hub home"
          >
            {/* LOGO */}

            <div
              className="
                relative
                h-10
                w-10
                shrink-0
                overflow-hidden
                rounded-full
                border
                border-white/50
                bg-white
                shadow-md
                transition-transform
                duration-300
                group-hover:scale-[1.04]
                sm:h-11
                sm:w-11
              "
            >
              <Image
                src={SITE_CONFIG.images.logo}
                alt="Supreme Student Council logo"
                fill
                priority
                sizes="44px"
                className="object-cover"
              />
            </div>

            {/* DESKTOP BRAND */}

            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-none tracking-wide text-white">
                {SITE_CONFIG.shortName}
              </p>

              <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/55">
                {SITE_CONFIG.institution}
              </p>
            </div>

            {/* MOBILE BRAND */}

            <span className="text-sm font-bold tracking-wide text-white sm:hidden">
              SSCHub
            </span>
          </a>

          {/* DESKTOP NAVIGATION*/}

          <div
            className="
              hidden
              items-center
              gap-1
              rounded-full
              border border-white/[0.12]
              bg-white/[0.05]
              p-1
              backdrop-blur-xl
              lg:flex
            "
          >
            {SITE_CONFIG.navigation.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`
                  relative
                  rounded-full
                  px-4
                  py-2.5
                  text-[11px]
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    index === 0
                      ? "bg-white/[0.13] text-white shadow-sm"
                      : "text-white/60 hover:bg-white/[0.08] hover:text-white"
                  }
                `}
              >
                {item.label}

                {/* Active indicator */}

                {index === 0 && (
                  <span className="absolute inset-x-4 -bottom-[1px] h-px bg-[#F5C542]/70" />
                )}
              </a>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.15]
              bg-white/[0.07]
              text-white
              backdrop-blur-xl
              transition-all
              duration-300
              hover:bg-white/[0.13]
              active:scale-95
              lg:hidden
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

  

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.98,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              className="
                mt-2
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.14]
                bg-[#123F2A]/80
                p-2
                shadow-2xl
                backdrop-blur-2xl
                lg:hidden
              "
            >
              {SITE_CONFIG.navigation.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{
                    opacity: 0,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.2,
                  }}
                  className={`
                    flex
                    items-center
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      index === 0
                        ? "bg-white/[0.10] text-white"
                        : "text-white/65 hover:bg-white/[0.07] hover:text-white"
                    }
                  `}
                >
                  <span>{item.label}</span>

                  {index === 0 && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#F5C542]" />
                  )}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}