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


const mascotSlides = [
  {
    icon: Palette,
    title: "Create Your College Character",
    description:
      "Design an original mascot that represents your college’s personality, values, and spirit.",
  },
  {
    icon: Sparkles,
    title: "Turn Creativity into a Symbol",
    description:
      "Transform recycled and indigenous materials into a memorable character students can proudly support.",
  },
  {
    icon: Trophy,
    title: "Ready to Represent?",
    description:
      "Join the College Mascot-Making Contest and showcase your creation during the opening parade of Parageyan 2025.",
  },
];

const reasons = [
  {
    icon: Palette,
    title: "Express Your Creativity",
    description:
      "Create an original character using imagination, recycled materials, and indigenous resources.",
  },
  {
    icon: Users,
    title: "Represent Your College",
    description:
      "Develop a mascot that reflects your college identity, culture, and values.",
  },
  {
    icon: Sparkles,
    title: "Create a Lasting Symbol",
    description:
      "Design a character that students will remember and proudly carry.",
  },
  {
    icon: Trophy,
    title: "Be Part of Parageyan",
    description:
      "Contribute your creativity to this year’s celebration and opening parade.",
  },
];

const eligibility = [
  "The contest is open to all 9 colleges of the institution.",
  "Each participating college is allowed to submit only one official mascot entry.",
  "Mascots must be conceptualized, designed, and constructed exclusively by bona fide students of the college they represent.",
];

const materials = [
  "Mascots must be made primarily from recycled and/or indigenous materials.",
  "Ready-to-use items (e.g., cloth, garments, plastics) may only be used as accessories or clothing — not as the main framework.",
  "The mascot must be durable, wearable, and re-wearable to withstand multiple uses, especially during the opening parade.",
  "Each entry has a maximum allowable budget of ₱1,500.00 only. No entry shall exceed this limit.",
  "Participants are encouraged to be creative, resourceful, and innovative using recycled, indigenous, and readily available materials.",
];

const synopsisRequirements = [
  "A list of materials used",
  "The rationale for their selection",
  "The cultural, environmental, and symbolic significance of the mascot",
];

const safety = [
  "No sharp, pointed, or hazardous materials (e.g., exposed wires, nails, staples, blades).",
  "Paints, adhesives, and coatings must be non-toxic and safe for parade use.",
  "Mascots must provide proper ventilation, comfort, and safe mobility for the wearer.",
];

const dimensions = [
  "Mascots must stand no shorter than 5 ft and no taller than 6 ft, including headpieces or extensions.",
  "They must be proportionate, balanced, and easy to move in during the parade.",
];

const paradePresentation = [
  "Mascots will be formally judged during the opening parade of Parageyan 2025.",
  "Each mascot must be showcased with a short introduction (name, inspiration, significance).",
  "Include movement or gestures to demonstrate creativity and functionality.",
  "Engage the audience while parading/presenting.",
];

const ownership = [
  "All mascots must be original student-made creations.",
  "Pre-made, rented, or outsourced mascots are strictly prohibited.",
  "Violations will result in automatic disqualification.",
];

const submission = [
  "Each college must register and submit its entry form and synopsis before the deadline set by the organizers.",
  "Late entries will not be accepted.",
];

const disqualification = [
  "Non-compliance with material requirements.",
  "Safety violations or use of hazardous elements.",
  "Mascots not created by bona fide students of the college.",
  "Failure to meet the required height range.",
  "Use of pre-made or rented mascots.",
];


export default function MascotMakingGuidelinesPage() {
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
                const Icon = mascotSlides[activeSlide].icon;

                return (
                  <>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">
                      <Icon className="h-8 w-8" />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold">
                      {mascotSlides[activeSlide].title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {mascotSlides[activeSlide].description}
                    </p>

                    <div className="mt-6 flex justify-center gap-2">
                      {mascotSlides.map((_, index) => (
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

                    {activeSlide === mascotSlides.length - 1 ? (
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
            College Mascot-Making Contest
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
            Create an original, wearable mascot that represents your college
            identity, values, and spirit using primarily recycled and
            indigenous materials during Parageyan 2025.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge icon={<Calendar className="h-4 w-4" />} text="Parageyan 2025" />
            <Badge
              icon={<Palette className="h-4 w-4" />}
              text="Recycled & Indigenous Materials"
            />
            <Badge
              icon={<Ruler className="h-4 w-4" />}
              text="5–6 ft Height"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-4xl space-y-14">
          {/* About */}
          <Guideline title="About the Contest">
            The College Mascot-Making Contest challenges students from all 9
            colleges to conceptualize, design, and construct an original
            wearable mascot that becomes a lasting symbol of their college
            identity and creativity.
          </Guideline>

          {/* Why Join */}
          <section>
            <h2 className="text-2xl font-bold">Why Join?</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Create something meaningful that represents your college beyond
              the competition.
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
          <Guideline title="Eligibility and Scope" items={eligibility} />

          {/* Materials */}
          <Guideline title="Materials and Construction" items={materials}>
            <div className="mt-5 rounded-2xl bg-[#F8F5EF] p-5">
              <p className="text-sm font-semibold text-[#0A2A1F]">
                Written Synopsis Required (Maximum of 2 pages)
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {synopsisRequirements.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Note: The ₱1,500.00 limit may cover materials and necessary
                accessories. Participants are encouraged to prioritize
                low-cost, recycled, indigenous, and locally available
                materials.
              </p>
            </div>
          </Guideline>

          {/* Safety */}
          <Guideline title="Safety and Comfort" items={safety} />

          {/* Dimensions */}
          <Guideline title="Dimensions" items={dimensions} />

          {/* Parade Presentation */}
          <Guideline title="Parade Presentation" items={paradePresentation} />

          {/* Ownership */}
          <Guideline title="Ownership and Authenticity" items={ownership} />

          {/* Submission */}
          <Guideline title="Submission and Deadlines" items={submission} />

          {/* Disqualification */}
          <section>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold">Grounds for Disqualification</h2>
            </div>

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
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-white">
                  Create the Symbol of Your College
                </h3>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Design. Inspire. Represent. Make your original mascot part of
                  the opening parade of Parageyan 2025.
                </p>
              </div>
            </div>
          </div>

          {/* Fair Play Note */}
          <div className="rounded-3xl bg-[#F8F5EF] p-6">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#D4AF37]" />
              <p className="text-sm leading-6 text-slate-600">
                Your mascot can become the identity your college proudly
                carries. Build it with creativity, safety, and authenticity.
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