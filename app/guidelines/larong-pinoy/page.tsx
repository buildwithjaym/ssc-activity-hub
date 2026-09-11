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
  CheckCircle2,
  Medal,
  ShieldCheck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const registrationLink = "https://forms.google.com/your-registration-form";

const introSlides = [
  {
    icon: History,
    title: "Bring back the games of the old days",
    description:
      "Experience traditional Filipino games that built friendships, teamwork, and unforgettable memories.",
  },
  {
    icon: Users,
    title: "Play together. Compete together.",
    description:
      "Gather your teammates, challenge other students, and enjoy the spirit of Larong Pinoy.",
  },
  {
    icon: Trophy,
    title: "Win prizes and create memories",
    description:
      "Show your teamwork, skills, and determination for a chance to receive exciting rewards.",
  },
];

const benefits = [
  {
    icon: History,
    title: "Experience Filipino Culture",
    description:
      "Rediscover traditional games that represent Filipino creativity and community.",
  },
  {
    icon: Users,
    title: "Build Teamwork",
    description:
      "Strengthen friendships while working together with your teammates.",
  },
  {
    icon: Medal,
    title: "Compete for Rewards",
    description:
      "Show your skills and compete for exciting prizes and recognition.",
  },
  {
    icon: Sparkles,
    title: "Create Memories",
    description:
      "Be part of a memorable Parageyan 2026 experience.",
  },
];

export default function LarongPinoyGuidelinesPage() {
  const [showModal, setShowModal] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white text-[#0A2A1F]">

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
                className="absolute right-5 top-5 text-slate-400"
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
                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={registrationLink}
                          target="_blank"
                          className="flex-1 rounded-full bg-[#0A2A1F] px-5 py-3 text-sm font-bold text-white"
                        >
                          Register Now
                        </a>

                        <button
                          onClick={() => setShowModal(false)}
                          className="flex-1 rounded-full border border-[#0A2A1F] px-5 py-3 text-sm font-bold"
                        >
                          View Guidelines
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveSlide(activeSlide + 1)}
                        className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37]"
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


      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
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


      <section className="bg-[#0A2A1F] px-5 py-16">
        <div className="mx-auto max-w-5xl">

          <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase text-[#0A2A1F]">
            Cultural Sports Activity
          </span>

          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            Larong Pinoy
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            Rediscover Filipino traditional games, strengthen friendships,
            compete with pride, and celebrate the culture of teamwork
            during Parageyan 2026.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">

            <InfoCard
              icon={<Calendar />}
              title="Event Date"
              value="October 7, 2026"
            />

            <InfoCard
              icon={<Trophy />}
              title="Rewards"
              value="Exciting Prizes"
            />

          </div>

          <a
            href={registrationLink}
            target="_blank"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#0A2A1F]"
          >
            Register Now
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>
      </section>


      <section className="px-5 py-16">

        <div className="mx-auto max-w-4xl space-y-12">

          <Section title="About Larong Pinoy">
            Larong Pinoy is a celebration of Filipino childhood games
            that promotes teamwork, friendship, sportsmanship, and
            cultural appreciation among students.
          </Section>


          <section>
            <h2 className="text-2xl font-bold">
              Why Join Larong Pinoy?
            </h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {benefits.map((item) => (
                <BenefitCard
                  key={item.title}
                  icon={<item.icon />}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </section>


          <Section
            title="How to Participate"
            items={[
              "Register through the official registration form.",
              "Prepare with your assigned team or group.",
              "Follow the instructions provided by facilitators.",
              "Participate with teamwork and sportsmanship.",
            ]}
          />


          <Section
            title="Game Guidelines"
            items={[
              "Follow the official rules of each game.",
              "Respect teammates, opponents, and organizers.",
              "Maintain fair play throughout the activity.",
              "Prioritize safety while enjoying the games.",
            ]}
          />


          <Section
            title="Important Reminders"
            items={[
              "Arrive before the scheduled activity time.",
              "Wear comfortable clothing suitable for games.",
              "Follow all announcements from organizers.",
            ]}
          />


          <div className="rounded-3xl bg-[#F8F5EF] p-7">

            <div className="flex gap-4">

              <ShieldCheck className="h-6 w-6 text-[#D4AF37]" />

              <div>
                <h3 className="font-bold">
                  Play Fair. Have Fun.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Larong Pinoy is about teamwork, enjoyment,
                  and creating meaningful memories together.
                </p>
              </div>

            </div>

          </div>


          <div className="rounded-3xl bg-[#0A2A1F] p-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h3 className="font-bold text-white">
                  Ready to bring back the games?
                </h3>

                <p className="mt-2 text-sm text-white/70">
                  Join Larong Pinoy and experience the fun,
                  teamwork, and excitement of Parageyan 2026.
                </p>
              </div>


              <a
                href={registrationLink}
                target="_blank"
                className="rounded-full bg-[#D4AF37] px-6 py-3 text-center text-sm font-bold text-[#0A2A1F]"
              >
                Register Now
              </a>

            </div>

          </div>


          <div className="rounded-3xl bg-[#F8F5EF] p-6">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#D4AF37]" />

              <p className="text-sm leading-6 text-slate-600">
                Invite your friends, represent your team,
                and celebrate Filipino games together.
              </p>
            </div>
          </div>

        </div>

      </section>


      <footer className="border-t border-slate-200 px-5 py-8 text-center">

        <Link
          href="/#activities"
          className="inline-flex items-center gap-2 text-sm font-bold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Activities
        </Link>

        <p className="mt-4 text-xs text-slate-500">
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
        <p className="text-xs text-white/60">
          {title}
        </p>

        <p className="font-bold text-white">
          {value}
        </p>
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

      <h3 className="mt-5 font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>

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

      <h2 className="text-2xl font-bold">
        {title}
      </h2>


      {children && (
        <p className="mt-3 leading-7 text-slate-600">
          {children}
        </p>
      )}


      {items && (
        <ul className="mt-4 space-y-3 text-slate-600">

          {items.map((item) => (
            <li key={item} className="flex gap-3">

              <span className="mt-2 h-2 w-2 rounded-full bg-[#D4AF37]" />

              <span>
                {item}
              </span>

            </li>
          ))}

        </ul>
      )}

    </section>
  );
}