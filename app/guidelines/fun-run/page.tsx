"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  HeartPulse,
  Trophy,
  Users,
  Sparkles,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Clock,
  MapPin,
  AlertTriangle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const introSlides = [
  {
    icon: HeartPulse,
    title: "Run for Health, Run for School Spirit",
    description:
      "Join fellow BaSC students in a fun and energetic run that promotes wellness, unity, and school pride.",
  },
  {
    icon: Activity,
    title: "Choose Your Distance",
    description:
      "Challenge yourself with either the 3KM or 5KM run on the Basilan State University School Grounds.",
  },
  {
    icon: Trophy,
    title: "Be Part of Parageyan 2026",
    description:
      "Run together, support each other, and create lasting memories during one of the most exciting activities of the celebration.",
  },
];

const benefits = [
  {
    icon: Activity,
    title: "Stay Active",
    description:
      "Promote health and wellness through an enjoyable physical activity.",
  },
  {
    icon: Users,
    title: "Build Connections",
    description:
      "Create memories with friends, classmates, and the entire BaSU community.",
  },
  {
    icon: Sparkles,
    title: "Show School Spirit",
    description:
      "Celebrate unity and pride while running for Basilan State University.",
  },
  {
    icon: Trophy,
    title: "Be Part of Parageyan",
    description:
      "Join one of the most exciting activities of Parageyan 2026.",
  },
];

const requiredAttire = [
  "Dri-fit shirt / PE uniform",
  "Jogging shorts, leggings, or track pants",
  "Rubber shoes with socks",
  "Cap and personal water bottle / tumbler",
];

const notAllowed = [
  "Jeans",
  "Slippers, sandals, or Crocs",
  "Any unsafe attire or footwear",
];

const importantReminders = [
  "Participation is voluntary and involves physical activity.",
  "Participants joining the 5KM run are required to submit a medical clearance from a licensed physician.",
  "Arrive early and be ready before the 3:00 PM start time.",
  "Follow all event rules, safety instructions, and the designated route.",
  "Bring your own water bottle / tumbler.",
  "A signed Waiver and Parental Consent Form is required.",
];

// ======================
// Main Component
// ======================
export default function FunRunGuidelinesPage() {
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
            Sports Activity
          </span>

          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            Fun Run 2026
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
            Theme: <strong className="text-white">“Run for Health, Run for School Spirit”</strong>
            <br />
            Join your fellow students in a fun-filled run that promotes wellness,
            friendship, and school spirit during Parageyan 2026.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge icon={<Calendar className="h-4 w-4" />} text="October 6, 2026" />
            <Badge icon={<Clock className="h-4 w-4" />} text="3:00 PM" />
            <Badge icon={<MapPin className="h-4 w-4" />} text="School Grounds" />
            <Badge icon={<Activity className="h-4 w-4" />} text="3KM & 5KM" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-4xl space-y-14">
          {/* About */}
          <Guideline title="About the Activity">
            The Fun Run is designed to bring students together through a fun and
            energetic activity that promotes health, wellness, unity, and school
            spirit during Parageyan 2026. Participants may choose between the
            3KM and 5KM distances.
          </Guideline>

          {/* Why Join */}
          <section>
            <h2 className="text-2xl font-bold">Why Join?</h2>
            <p className="mt-3 leading-7 text-slate-600">
              More than just a run — this is a chance to stay active, connect
              with the community, and celebrate Parageyan together.
            </p>

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

          {/* Event Details */}
          <section>
            <h2 className="text-2xl font-bold">Event Details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard
                title="Date & Time"
                description="October 6, 2026 • 3:00 PM"
              />
              <InfoCard
                title="Venue"
                description="Basilan State University School Grounds"
              />
              <InfoCard
                title="Distances"
                description="3 Kilometers and 5 Kilometers"
              />
              <InfoCard
                title="Tournament Manager"
                description="Hon. Nicole Oriño"
              />
            </div>
          </section>

          {/* Required Attire */}
          <section>
            <h2 className="text-2xl font-bold">Required Attire</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Participants must wear proper running attire for safety and
              comfort.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-6">
                <h3 className="font-bold text-[#0A2A1F]">Must Wear</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {requiredAttire.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-red-100 bg-red-50 p-6">
                <h3 className="font-bold text-red-700">Not Allowed</h3>
                <ul className="mt-4 space-y-3 text-sm text-red-700/80">
                  {notAllowed.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Important Reminders */}
          <Guideline title="Important Reminders" items={importantReminders} />

          {/* Safety & Waiver */}
          <section className="rounded-3xl bg-[#F8F5EF] p-7">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Safety & Parental Consent</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A signed <strong>Waiver and Parental Consent Form</strong> is
                  required for all participants. Participation involves risks
                  such as falls, dehydration, fatigue, and minor injuries.
                  Participants in the <strong>5KM run</strong> must submit a
                  medical clearance from a licensed physician. Always follow the
                  instructions of the organizers and prioritize safety.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="rounded-3xl bg-[#0A2A1F] p-7">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">
                  Run for Health. Run for School Spirit.
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Prepare your attire, submit the required waiver, and join the
                  Fun Run on October 6, 2026 at 3:00 PM.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#F8F5EF] p-6">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]" />
              <p className="text-sm leading-6 text-slate-600">
                Bring your energy, wear the proper attire, and celebrate the
                spirit of togetherness during Parageyan 2026.
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
          Supreme Student Council • Parageyan 2026 • Tournament Manager: Hon. Nicole Oriño
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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F5EF] text-[#D4AF37]">
        {icon}
      </div>
      <h3 className="mt-5 font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-bold">{title}</h3>
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
        <p className="mt-3 leading-7 text-slate-600">{children}</p>
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