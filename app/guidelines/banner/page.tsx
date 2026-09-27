"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Palette,
  Trophy,
  Sparkles,
  Users,
  CheckCircle2,
  ShieldCheck,
  Ruler,
  FileText,
  AlertTriangle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// ======================
// Data
// ======================
const modalSlides = [
  {
    icon: Palette,
    title: "Your College Needs Your Creativity",
    description:
      "Transform meaningful ideas, vibrant colors, and teamwork into a powerful visual masterpiece that represents your college.",
  },
  {
    icon: Sparkles,
    title: "Turn Ideas into Identity",
    description:
      "Create an original banner that showcases your college’s spirit animal, name, values, and pride during Parageyan 2026.",
  },
  {
    icon: Trophy,
    title: "Ready to Represent?",
    description:
      "Join the Banner Making Contest and leave a lasting mark in one of the biggest student celebrations of the year.",
  },
];

const reasons = [
  {
    icon: Palette,
    title: "Express Creativity",
    description:
      "Showcase your artistic skills and create a meaningful design with your team.",
  },
  {
    icon: Users,
    title: "Represent Your College",
    description:
      "Design a banner that reflects your college’s identity, spirit animal, and pride.",
  },
  {
    icon: Sparkles,
    title: "Build Team Spirit",
    description:
      "Work with nine other students to create something your entire college can celebrate.",
  },
  {
    icon: Trophy,
    title: "Be Part of Parageyan",
    description:
      "Contribute your creativity to the festivities of Parageyan 2026.",
  },
];

const generalGuidelines = [
  "The contest is open to all participating colleges of the institution.",
  "Each college shall be represented by exactly ten (10) bona fide students only.",
  "Participants must be officially identified and provided with special passes to access the designated contest area.",
  "The contest shall be held in a designated area assigned by the organizers. All banner-making activities must be done strictly within the designated area and within the allotted time.",
];

const materialsProvided = [
  "One (1) cloth as the official banner base",
  "Three (3) primary paint colors",
];

const materialsByCollege = [
  "Brushes and containers",
  "Extra paint colors",
  "Embellishments and other supplies",
];

const referenceRules = [
  "Must be in printed form only — digital devices are not allowed during the contest.",
  "Limited to a maximum of three (3) pages, not larger than long bond paper size.",
  "Must not contain any official or pre-made banner designs intended for direct copying.",
  "The final banner must reflect the originality and creativity of the participating college.",
];

const technicalRequirements = [
  "The banner must incorporate the college’s spirit animal and college name.",
  "The final banner must be original, creative, and representative of the college’s identity, spirit, and values.",
  "The dimensions of the banner shall follow the official cloth provided by the organizers and must not be altered.",
  "The use of materials or designs that may cause offense, promote violence, or contain inappropriate content is strictly prohibited.",
];

// ======================
// Main Component
// ======================
export default function BannerMakingGuidelinesPage() {
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
                const Icon = modalSlides[activeSlide].icon;

                return (
                  <>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold">
                      {modalSlides[activeSlide].title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {modalSlides[activeSlide].description}
                    </p>

                    <div className="mt-6 flex justify-center gap-2">
                      {modalSlides.map((_, index) => (
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

                    {activeSlide === modalSlides.length - 1 ? (
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
            Creative Competition
          </span>

          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            Banner Making Contest
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
            Transform meaningful ideas, vibrant colors, and creativity into a
            powerful visual masterpiece that represents your college during
            Parageyan 2026.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge
              icon={<Users className="h-4 w-4" />}
              text="10 Students per College"
            />
            <Badge
              icon={<Palette className="h-4 w-4" />}
              text="Official Cloth + 3 Primary Colors"
            />
            <Badge
              icon={<Ruler className="h-4 w-4" />}
              text="Must Include Spirit Animal"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-4xl space-y-14">
          {/* About */}
          <Guideline title="About the Contest">
            The Supreme Student Council proudly announces the Banner Making
            Contest as part of the festivities of Parageyan 2026. This is your
            chance to create an original banner that showcases your college’s
            identity, spirit animal, values, and pride.
          </Guideline>

          {/* Why Join */}
          <section>
            <h2 className="text-2xl font-bold">Why Join?</h2>
            <p className="mt-3 leading-7 text-slate-600">
              More than just a design competition — this is your opportunity to
              create a lasting symbol of your college pride.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {reasons.map((reason) => (
                <ReasonCard
                  key={reason.title}
                  icon={<reason.icon className="h-5 w-5" />}
                  title={reason.title}
                  description={reason.description}
                />
              ))}
            </div>
          </section>

          {/* General Guidelines */}
          <Guideline title="General Guidelines" items={generalGuidelines} />

          {/* Materials */}
          <section>
            <h2 className="text-2xl font-bold">Materials</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#0A2A1F]">
                  Provided by the SSC
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {materialsProvided.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#0A2A1F]">
                  To be Provided by the College
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {materialsByCollege.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Printed References */}
          <Guideline title="Printed Inspirations / References">
            <p className="mt-1">
              Printed inspirations or references are allowed, subject to the
              following rules:
            </p>
            <ul className="mt-4 space-y-3 text-slate-600">
              {referenceRules.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Guideline>

          {/* Technical Requirements */}
          <Guideline
            title="Technical Requirements"
            items={technicalRequirements}
          />

          {/* Important Notes */}
          <div className="rounded-3xl bg-[#F8F5EF] p-6">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="font-bold text-[#0A2A1F]">
                  Important Reminders
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>• Banner Making and Mascot Making are separate competitions.</li>
                  <li>• All work must be completed within the designated area and allotted time.</li>
                  <li>• The final banner must be original and reflect the creativity of your college.</li>
                  <li>• Respect the rules on materials, references, and content.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-[#0A2A1F] p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">
                  <Palette className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    Your Design Can Represent Your College
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Create. Design. Represent. Be part of the Banner Making
                    Contest of Parageyan 2026.
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-white"
              >
                Review Guidelines
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-[#F8F5EF] p-6">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]" />
              <p className="text-sm leading-6 text-slate-600">
                Your creativity can become the visual symbol of your college
                pride during Parageyan 2026.
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
          Supreme Student Council • Parageyan 2026
        </p>
      </footer>
    </main>
  );
}

// ======================
// Sub Components
// ======================
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

function ReasonCard({
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