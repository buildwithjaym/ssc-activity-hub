"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Trophy,
  Users,
  History,
  Sparkles,
  Medal,
  ShieldCheck,
  MessageCircle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SocialIcons from "@/components/social/social-icons";

const SENATOR_FACEBOOK_LINK =
  "https://www.facebook.com/share/1CkJwg6CVr/?mibextid=wwXIfr";

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const introSlides = [
  {
    icon: History,
    title: "Celebrate Filipino Traditional Games",
    description:
      "Experience Larong Pinoy and bring back the games that promote friendship, teamwork, and Filipino culture.",
  },
  {
    icon: Users,
    title: "Build Teams and Create Memories",
    description:
      "Students from different departments can join together and represent their teams.",
  },
  {
    icon: Trophy,
    title: "Compete with Pride",
    description:
      "Show teamwork, discipline, and sportsmanship while competing for recognition.",
  },
];

const benefits = [
  {
    icon: History,
    title: "Preserve Filipino Culture",
    description:
      "Rediscover traditional Filipino games that connect students through culture and teamwork.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Strengthen friendships by working together with your teammates.",
  },
  {
    icon: Medal,
    title: "Earn Ranking Points",
    description:
      "Teams compete through different games and accumulate ranking points.",
  },
  {
    icon: Sparkles,
    title: "Create Memories",
    description:
      "Be part of Parageyan 2026 and celebrate a meaningful student activity.",
  },
];

const guidelines = [
  "Open to all students of Basilan State University.",
  "Members may come from different departments.",
  "Limited to 10 teams only.",
  "Each team shall consist of 10 members.",
  "Each team will receive a colored wristband for identification.",
  "Participants should wear comfortable clothing.",
  "Unsportsmanlike conduct will result in disqualification.",
  "Only registered team members are allowed to participate.",
  "Teams earn ranking points based on game results.",
  "The team with the highest accumulated points will be declared the winner.",
];

const games = [
  {
    name: "Chinese Garter",
    mechanics: [
      "3 representatives per team.",
      "Played by rounds.",
      "Mechanics will be announced before the game.",
    ],
  },
  {
    name: "Cha-Cha",
    mechanics: [
      "4 representatives per team.",
      "Teams will draw lots to determine opponents.",
      "Mechanics will be announced before the game.",
    ],
  },
  {
    name: "Pinoy Dodge Ball (Bola Pass-It)",
    mechanics: [
      "5 representatives per team.",
      "Teams will draw lots before the game.",
    ],
  },
  {
    name: "Upuang Hari",
    mechanics: [
      "All team members participate.",
      "Played simultaneously.",
      "Mechanics will be announced before the game.",
    ],
  },
  {
    name: "Catch the Dragon Tail",
    mechanics: [
      "All team members participate.",
      "Teams draw lots to determine opponents.",
      "Mechanics will be announced before the game.",
    ],
  },
  {
    name: "Sack Race With A Twist",
    mechanics: [
      "Played simultaneously.",
      "All team members participate.",
      "Mechanics will be announced before the game.",
    ],
  },
  {
    name: "Kadang-Kadang",
    mechanics: [
      "Played simultaneously.",
      "All team members participate.",
      "Mechanics will be announced before the game.",
    ],
  },
  {
    name: "Egg Throw",
    mechanics: [
      "Played simultaneously.",
      "Mechanics will be announced before the game.",
    ],
  },
  {
    name: "Tug of War",
    mechanics: [
      "Teams draw lots to determine opponents.",
      "Mechanics will be announced before the game.",
    ],
  },
  {
    name: "Kadang sa Bao",
    mechanics: [
      "Played simultaneously.",
      "Mechanics will be announced before the game.",
    ],
  },
];

export default function LarongPinoyGuidelinesPage() {
  const [showModal, setShowModal] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white text-[#0A2A1F]">
      {/* Intro Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>

              {(() => {
                const Icon = introSlides[activeSlide].icon;

                return (
                  <>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold">
                      {introSlides[activeSlide].title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {introSlides[activeSlide].description}
                    </p>

                    <div className="mt-6 flex justify-center gap-2">
                      {introSlides.map((_, index) => (
                        <span
                          key={index}
                          className={`h-2 rounded-full transition-all ${
                            index === activeSlide
                              ? "w-8 bg-[#D4AF37]"
                              : "w-2 bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>

                    {activeSlide === introSlides.length - 1 ? (
                      <div className="mt-7 flex flex-col gap-3">
                        <a
                          href={SENATOR_FACEBOOK_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 rounded-full bg-[#0A2A1F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0A2A1F]/90"
                        >
                          <FacebookIcon className="h-4 w-4" />
                          Contact Senator Zarqawey Salim
                        </a>

                        <button
                          onClick={() => setShowModal(false)}
                          className="rounded-full border border-[#0A2A1F] px-5 py-3 text-sm font-bold transition hover:bg-slate-50"
                        >
                          View Guidelines
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveSlide(activeSlide + 1)}
                        className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] transition hover:opacity-80"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/#activities"
            className="text-sm font-semibold hover:text-[#D4AF37]"
          >
            Activities
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#0A2A1F] px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase text-[#0A2A1F]">
            Cultural Sports Activity
          </span>

          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            Larong Pinoy
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">
            A celebration of Filipino traditional games that promotes teamwork,
            friendship, sportsmanship, and cultural appreciation during
            Parageyan 2026.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon={<Calendar className="h-5 w-5" />}
              title="Event"
              value="Parageyan 2026"
            />
            <InfoCard
              icon={<Users className="h-5 w-5" />}
              title="Teams"
              value="10 Teams • 10 Members Each"
            />
          </div>

          <a
            href={SENATOR_FACEBOOK_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-[#D4AF37]/90"
          >
            Message Senator Zarqawey Salim
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          <Section title="About Larong Pinoy">
            Larong Pinoy celebrates Filipino childhood games that encourage
            teamwork, friendship, discipline, and appreciation of Filipino
            culture among students.
          </Section>

          {/* Benefits */}
          <section>
            <h2 className="text-2xl font-bold">Why Join Larong Pinoy?</h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {benefits.map((item) => (
                <BenefitCard
                  key={item.title}
                  icon={<item.icon className="h-5 w-5" />}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </section>

          {/* Guidelines */}
          <Section
            title="Eligibility and Participation Guidelines"
            items={guidelines}
          />

          {/* Games */}
          <section>
            <h2 className="text-2xl font-bold">Larong Pinoy Games</h2>

            <div className="mt-8 grid gap-5">
              {games.map((game) => (
                <div
                  key={game.name}
                  className="rounded-3xl border border-slate-200 p-6"
                >
                  <h3 className="text-lg font-bold text-[#0A2A1F]">
                    {game.name}
                  </h3>

                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {game.mechanics.map((rule) => (
                      <li key={rule} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Fair Play Note */}
          <div className="rounded-3xl bg-[#F8F5EF] p-7">
            <div className="flex gap-4">
              <ShieldCheck className="h-6 w-6 shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="font-bold">Play Fair. Have Fun.</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Larong Pinoy promotes teamwork, respect, discipline, and
                  sportsmanship among all participants.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-[#0A2A1F] p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold text-white">
                  Ready to Join Larong Pinoy?
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Contact Senator Zarqawey Salim for participation details and
                  team coordination.
                </p>
              </div>

              <a
                href={SENATOR_FACEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-[#D4AF37]/90"
              >
                <FacebookIcon className="h-4 w-4" />
                Facebook Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-[#0A2A1F] px-5 py-10 text-center">
        <Link
          href="/#activities"
          className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#D4AF37]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Activities
        </Link>

        <div className="mt-6 flex justify-center">
          <SocialIcons />
        </div>

        <p className="mt-6 text-xs text-white/60">
          Supreme Student Council • Parageyan 2026
        </p>
      </footer>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/60">{title}</p>
        <p className="font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F5EF] text-[#D4AF37]">
        {icon}
      </div>
      <h3 className="mt-5 font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function Section({
  title,
  children,
  items,
}: {
  title: string;
  children?: React.ReactNode;
  items?: string[];
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold">{title}</h2>

      {children && <p className="mt-3 leading-7 text-slate-600">{children}</p>}

      {items && (
        <ul className="mt-4 space-y-3 text-slate-600">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
