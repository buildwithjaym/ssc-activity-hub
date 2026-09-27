"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Megaphone,
  Trophy,
  Sparkles,
  Users,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Music,
  AlertTriangle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const yellSlides = [
  {
    icon: Megaphone,
    title: "Unleash Your College Spirit",
    description:
      "Create an original yell that unites your college through powerful chants, rhythm, and synchronized energy.",
  },
  {
    icon: Users,
    title: "30 Voices. One Team.",
    description:
      "Exactly 30 bona fide students will represent your college with discipline, creativity, and school pride.",
  },
  {
    icon: Trophy,
    title: "Ready to Cheer?",
    description:
      "Join the Bench Yell Contest and show the entire campus the true spirit of your college during Parageyan 2025.",
  },
];

const reasons = [
  {
    icon: Megaphone,
    title: "Show School Spirit",
    description:
      "Promote unity, pride, and the identity of your college through powerful yells.",
  },
  {
    icon: Users,
    title: "Build Teamwork",
    description:
      "Work with exactly 30 classmates to create a synchronized and energetic performance.",
  },
  {
    icon: Sparkles,
    title: "Showcase Creativity",
    description:
      "Compose original cheers using only vocals, claps, stomps, and one drum.",
  },
  {
    icon: Trophy,
    title: "Compete with Pride",
    description:
      "Represent your college and aim for the top in this highly anticipated contest.",
  },
];

const eligibility = [
  "The contest is open to all 9 colleges of the institution.",
  "Each college shall field exactly 30 bona fide students as participants — no more, no less.",
  "All participants must be officially enrolled students of the college they represent.",
];

const uniform = [
  "All participants must wear their official college Intramurals shirt during the performance.",
  "No additional costumes are allowed, except for simple accessories (e.g., ribbons, headbands, or light face paint in college colors) as long as they do not overshadow the official shirt.",
];

const performance = [
  "School spirit and unity",
  "Creativity and teamwork",
  "Discipline and synchronization",
];

const musicProps = [
  "Only one drum is allowed per team.",
  "Small hand props (e.g., flags, pompoms, banners) are permitted.",
  "Backdrops, large props, or heavy equipment are strictly prohibited.",
  "Pre-recorded or digital music is not allowed. Rhythm must be created through vocals, claps, stomps, or the single drum permitted.",
];

const safety = [
  "Choreography must avoid dangerous stunts (e.g., acrobatics, tossing, human pyramids, or similar).",
  "The use of hazardous materials (e.g., pyrotechnics, sharp objects, or liquids) is strictly prohibited.",
  "Discipline and orderliness must be observed before, during, and after the performance.",
];

const ownership = [
  "Cheers/yells must be original compositions or creative adaptations made by the participating team.",
  "Borrowed or copied routines from other schools or organizations are not allowed.",
];

const disqualification = [
  "Less or more than 30 participants.",
  "Failure to wear the official college Intramurals shirt.",
  "Use of more than one drum.",
  "Use of backdrops, large props, or prohibited equipment.",
  "Exceeding the maximum performance time.",
  "Use of offensive, vulgar, or discriminatory words/gestures.",
  "Violation of safety regulations.",
];

const criteria = [
  {
    title: "Creativity and Originality",
    percentage: "25%",
    points: [
      "Uniqueness of cheer composition",
      "Creative use of rhythm, voice, and body movements",
    ],
  },
  {
    title: "Synchronization and Discipline",
    percentage: "25%",
    points: [
      "Timing, coordination, and uniformity of actions",
      "Discipline and neat execution",
    ],
  },
  {
    title: "Energy, Spirit, and Crowd Impact",
    percentage: "20%",
    points: [
      "Enthusiasm and liveliness of the performers",
      "Ability to inspire audience participation and college pride",
    ],
  },
  {
    title: "Clarity and Diction",
    percentage: "15%",
    points: [
      "Clear, loud, and understandable chants",
      "Strength of projection and voice control",
    ],
  },
  {
    title: "Presentation and Overall Impact",
    percentage: "15%",
    points: [
      "Confidence, stage presence, and overall appeal",
      "Effectiveness in showcasing school spirit and unity",
    ],
  },
];


export default function BenchYellGuidelinesPage() {
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
                className="absolute right-5 top-5 text-slate-400 hover:text-[#0A2A1F]"
              >
                <X className="h-5 w-5" />
              </button>

              {(() => {
                const Icon = yellSlides[activeSlide].icon;

                return (
                  <>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold">
                      {yellSlides[activeSlide].title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {yellSlides[activeSlide].description}
                    </p>

                    <div className="mt-6 flex justify-center gap-2">
                      {yellSlides.map((_, index) => (
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

                    {activeSlide === yellSlides.length - 1 ? (
                      <button
                        onClick={() => setShowModal(false)}
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0A2A1F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2A1F]"
                      >
                        View Guidelines
                        <ArrowRight className="h-4 w-4" />
                      </button>
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

      {/* Hero */}
      <section className="bg-[#0A2A1F] px-5 py-16">
        <div className="mx-auto max-w-4xl">
          <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase text-[#0A2A1F]">
            Spirit Competition
          </span>

          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            Bench Yell Contest
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
            Ignite school spirit with original yells, synchronized moves, and
            pure energy. Exactly 30 voices. One powerful college identity.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge icon={<Users className="h-4 w-4" />} text="Exactly 30 Participants" />
            <Badge icon={<Clock className="h-4 w-4" />} text="5–7 Minutes" />
            <Badge icon={<Music className="h-4 w-4" />} text="1 Drum Only" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-4xl space-y-14">
          {/* About */}
          <Guideline title="About the Contest">
            The Bench Yell Contest is a high-energy competition where each of
            the 9 colleges fields exactly 30 students to deliver an original
            yell that showcases school spirit, creativity, teamwork, discipline,
            and synchronization.
          </Guideline>

          {/* Why Join */}
          <section>
            <h2 className="text-2xl font-bold">Why Join?</h2>
            <p className="mt-3 leading-7 text-slate-600">
              This is your chance to make your college roar and leave a lasting
              impression.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {reasons.map((item) => (
                <Card
                  key={item.title}
                  icon={<item.icon className="h-5 w-5" />}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </section>

          {/* Eligibility */}
          <Guideline title="Eligibility and Participation" items={eligibility} />

          {/* Uniform */}
          <Guideline title="Uniform / Costume" items={uniform} />

          {/* Performance Requirements */}
          <Guideline title="Performance Requirements">
            <p className="mt-1">
              Each group must prepare a yell/cheer presentation that promotes:
            </p>
            <ul className="mt-4 space-y-3 text-slate-600">
              {performance.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#F8F5EF] px-5 py-4">
              <Clock className="h-5 w-5 text-[#D4AF37]" />
              <p className="text-sm font-medium text-[#0A2A1F]">
                Performance time must be <strong>5–7 minutes only</strong>.
              </p>
            </div>
          </Guideline>

          {/* Music, Props & Equipment */}
          <Guideline title="Music, Props, and Equipment" items={musicProps} />

          {/* Safety */}
          <Guideline title="Safety and Conduct" items={safety} />

          {/* Ownership */}
          <Guideline title="Ownership and Authenticity" items={ownership} />

          {/* Criteria for Judging */}
          <section>
            <h2 className="text-2xl font-bold">Criteria for Judging (100%)</h2>

            <div className="mt-8 grid gap-5">
              {criteria.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#0A2A1F]">
                      {item.title}
                    </h3>
                    <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-sm font-bold text-[#0A2A1F]">
                      {item.percentage}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Disqualification */}
          <section>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold">Grounds for Disqualification</h2>
            </div>
            <p className="mt-2 text-sm text-slate-500">Not limited to:</p>

            <ul className="mt-5 space-y-3 text-slate-600">
              {disqualification.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA Card */}
          <div className="rounded-3xl bg-[#0A2A1F] p-7">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">
                <Megaphone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">
                  Make Your College Roar
                </h3>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  30 voices. One drum. Pure school spirit. Bring the energy and
                  represent your college with pride.
                </p>
              </div>
            </div>
          </div>

          {/* Fair Play Note */}
          <div className="rounded-3xl bg-[#F8F5EF] p-6">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#D4AF37]" />
              <p className="text-sm leading-6 text-slate-600">
                Discipline, originality, and safety first. Let your yell be loud,
                clean, and full of true college pride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-5 py-8 text-center">
        <Link
          href="/#activities"
          className="inline-flex items-center gap-2 text-sm font-bold hover:text-[#D4AF37]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Activities
        </Link>

        <p className="mt-4 text-xs text-slate-500">
          Supreme Student Council • Basilan State College • Parageyan 2025
        </p>
      </footer>
    </main>
  );
}


function Badge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
      <span className="text-[#D4AF37]">{icon}</span>
      {text}
    </div>
  );
}

function Card({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F5EF] text-[#D4AF37]">
        {icon}
      </div>
      <h3 className="mt-5 font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function Guideline({
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

      {children && (
        <div className="mt-3 leading-7 text-slate-600">{children}</div>
      )}

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