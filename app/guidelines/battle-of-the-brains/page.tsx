"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Calendar,
  Trophy,
  Users,
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  FileText,
  ShieldCheck,
  AlertTriangle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const registrationLink = "https://www.facebook.com/crystal.yanna.7"; 

const introSlides = [
  {
    icon: Brain,
    title: "Challenge Your Knowledge",
    description:
      "Test your understanding of Basilan State College history, policies, notable personalities, and institutional information.",
  },
  {
    icon: Users,
    title: "Represent Your College",
    description:
      "Form a team of three first-year students and compete with other colleges in a fun academic challenge.",
  },
  {
    icon: Trophy,
    title: "Compete for Recognition",
    description:
      "Show your knowledge, teamwork, and quick thinking while competing for cash prizes and certificates.",
  },
  {
    icon: ClipboardCheck,
    title: "Ready for the Challenge?",
    description:
      "Review the complete guidelines and register your team for Battle of the Brains during Parageyan 2026.",
  },
];

const requiredDocuments = [
  "Photocopy of the Certificate of Registration (COR)",
  "Photocopy of the Student Identification Card",
  "Team Gallery",
  "Parent’s Consent Form",
];

const participants = [
  "Open to first-year students only of Basilan State College.",
  "Each college may send one (1) official team.",
  "Each team shall be composed of three (3) official members.",
  "All participants must be officially enrolled first-year students of BaSC.",
  "Each team shall designate one member as its team captain.",
  "Participants must register with the designated committee within the prescribed registration period.",
];

const coverage = [
  "History of Basilan State College",
  "Important milestones and significant events of BaSC",
  "BaSC policies and regulations",
  "BaSC vision, mission, goals, and core values",
  "Notable dignitaries, administrators, officials, and personalities of BaSC",
  "Colleges, offices, programs, and other relevant institutional information",
];

const generalMechanics = [
  "Each team shall be provided with the necessary materials for the competition.",
  "Questions shall be prepared and validated by the organizing committee.",
  "The quizmaster/facilitator shall read each question clearly and only twice unless clarification is necessary.",
  "Teams must submit their answers within the time allotted for each question.",
  "Answers must be clear and legible.",
  "Once an answer has been submitted, it may no longer be changed unless the facilitator permits it.",
  "No electronic devices, reference materials, or unauthorized assistance shall be allowed during the competition.",
  "Team members must work together in answering questions.",
  "Audience members, coaches, and other non-participants are prohibited from providing answers or assistance.",
  "Any form of cheating, signaling, coaching, or disruptive behavior shall be grounds for deduction of points or disqualification.",
  "The decision of the Tabulators regarding scores and results shall be final and irrevocable.",
];

const codeOfConduct = [
  "Observe proper decorum and sportsmanship throughout the competition.",
  "Respect the quizmaster, organizers, fellow participants, and audience.",
  "Refrain from cheating, disruptive behavior, and unauthorized communication.",
  "Follow the instructions of the organizing committee.",
  "Accept the results of the competition with professionalism and respect.",
];


export default function BattleOfTheBrainsPage() {
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
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
                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-full bg-[#0A2A1F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2A1F]"
                        >
                          Register Team
                        </a>
                        <button
                          onClick={() => setShowModal(false)}
                          className="flex-1 rounded-full border border-[#0A2A1F] px-5 py-3 text-sm font-bold transition hover:bg-slate-50"
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
        <div className="mx-auto max-w-5xl">
          <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase text-[#0A2A1F]">
            Academic Competition
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Battle of the Brains
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">
            An academic competition designed to promote students’ knowledge,
            awareness, and appreciation of the history, policies, and notable
            personalities of Basilan State College — held in the spirit of
            Larong Pinoy.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <HighlightCard
              icon={<Calendar className="h-5 w-5" />}
              label="Date & Venue"
              value="Oct 4, 2026 • SSC Office"
            />
            <HighlightCard
              icon={<Trophy className="h-5 w-5" />}
              label="Champion Prize"
              value="₱1,000 + Certificate"
            />
          </div>

          <div className="mt-8 rounded-3xl border border-[#D4AF37]/30 bg-white/10 p-6">
            <div className="flex gap-4">
              <Brain className="h-7 w-7 shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="font-bold text-white">
                  Test your BaSC knowledge
                </h3>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Compete with other first-year teams through teamwork,
                  critical thinking, and institutional knowledge.
                </p>
              </div>
            </div>
          </div>

          <a
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-white"
          >
            Register Team
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-5xl space-y-14">
          {/* Required Documents */}
          <Guideline title="Documents Required for Eligibility" items={requiredDocuments} />

          {/* Participants */}
          <Guideline title="Participants" items={participants} />

          {/* Coverage */}
          <Guideline
            title="Scope of the Competition"
            description="Questions and challenges shall primarily cover the following areas:"
            items={coverage}
          />

          {/* Competition Format */}
          <section>
            <h2 className="text-2xl font-bold">Competition Format</h2>
            <p className="mt-3 leading-7 text-slate-600">
              The Battle of the Brains shall be conducted together with Larong
              Pinoy activities, combining academic knowledge with engaging and
              interactive friendly competition.
            </p>

            <div className="mt-8 space-y-4">
              <RoundCard
                number="01"
                title="Easy Round"
                description="Basic questions that test knowledge about BaSC. Correct answers earn corresponding points."
                points="+1 Point"
              />
              <RoundCard
                number="02"
                title="Average Round"
                description="Questions requiring deeper understanding of BaSC history, policies, and dignitaries."
                points="+2 Points"
              />
              <RoundCard
                number="03"
                title="Difficult / Fast-Paced Round"
                description="More challenging questions. A faster response may be required depending on the format."
                points="+3 Points"
              />
              <RoundCard
                number="04"
                title="Final / Clincher Round"
                description="In case of a tie, teams will participate in a clincher round until the winner is determined."
                points="Tie Breaker"
              />
            </div>
          </section>

          {/* Scoring */}
          <section>
            <h2 className="text-2xl font-bold">Scoring System</h2>
            <p className="mt-3 leading-7 text-slate-600">
              The scoring system shall be announced by the facilitator before
              the start of each round. As a general guide:
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-[#0A2A1F] text-white">
                  <tr>
                    <th className="px-5 py-3 text-left font-semibold">Round</th>
                    <th className="px-5 py-3 text-left font-semibold">Difficulty</th>
                    <th className="px-5 py-3 text-left font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-5 py-3">Round 1</td>
                    <td className="px-5 py-3">Easy</td>
                    <td className="px-5 py-3 font-medium">1 point per correct answer</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-5 py-3">Round 2</td>
                    <td className="px-5 py-3">Average</td>
                    <td className="px-5 py-3 font-medium">2 points per correct answer</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">Round 3</td>
                    <td className="px-5 py-3">Difficult</td>
                    <td className="px-5 py-3 font-medium">3 points per correct answer</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-5 py-3">Final / Clincher</td>
                    <td className="px-5 py-3">Tie-breaker</td>
                    <td className="px-5 py-3 font-medium">As determined by the committee</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              The team with the <strong>highest accumulated score</strong> at
              the end of the competition shall be declared the Champion.
            </p>
          </section>

          {/* General Mechanics */}
          <Guideline title="General Mechanics" items={generalMechanics} />

          {/* Awards */}
          <section>
            <h2 className="text-2xl font-bold">Awards and Prizes</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Outstanding teams will receive recognition for their knowledge,
              teamwork, and achievement.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <AwardCard title="Champion" prize="₱1,000" />
              <AwardCard title="1st Runner-Up" prize="₱700" />
              <AwardCard title="2nd Runner-Up" prize="₱500" />
            </div>

            <div className="mt-6 rounded-2xl bg-[#F8F5EF] p-5">
              <p className="text-sm leading-6 text-slate-600">
                <strong>Certificate of Participation</strong> shall be awarded
                to all official participants. Certificates shall also be
                provided to the winners in recognition of their achievement.
              </p>
            </div>
          </section>

          {/* Code of Conduct */}
          <Guideline title="Code of Conduct" items={codeOfConduct} />

          {/* Important Note */}
          <div className="rounded-3xl bg-[#F8F5EF] p-6">
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="font-bold text-[#0A2A1F]">
                  Final Provisions
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The Battle of the Brains shall be conducted in the spirit of
                  knowledge, teamwork, camaraderie, and healthy competition. It
                  will be held at the <strong>SSC Office</strong> on{" "}
                  <strong>October 4, 2026</strong>, in line with the Larong
                  Pinoy activities. Snacks and drinks will be provided to all
                  participants.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Any matter not covered by these guidelines shall be resolved
                  by the organizing committee. The decision of the tabulators
                  and organizers shall be final and irrevocable.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-[#0A2A1F] p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    Are you ready to prove your BaSC knowledge?
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Gather your teammates, prepare the required documents, and
                    represent your college in Battle of the Brains.
                  </p>
                </div>
              </div>

              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-white"
              >
                Register Team
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-[#F8F5EF] p-6">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]" />
              <p className="text-sm leading-6 text-slate-600">
                Study the history, policies, and notable personalities of
                Basilan State College. Prepare your team and take the challenge
                on October 4, 2026.
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
          Supreme Student Council • Parageyan 2026 • Tournament Manager: Hon. Alyanna Hamsirani
        </p>
      </footer>
    </main>
  );
}

function HighlightCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <p className="font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function RoundCard({
  number,
  title,
  description,
  points,
}: {
  number: string;
  title: string;
  description: string;
  points: string;
}) {
  return (
    <div className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A2A1F] text-sm font-bold text-white">
        {number}
      </div>
      <div className="flex-1">
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <h3 className="font-bold">{title}</h3>
          <span className="text-sm font-bold text-[#D4AF37]">{points}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function AwardCard({
  title,
  prize,
}: {
  title: string;
  prize: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">
        <Trophy className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mt-2 text-xl font-bold text-[#0A2A1F]">{prize}</p>
      <p className="mt-1 text-xs text-slate-500">+ Certificate</p>
    </div>
  );
}

function Guideline({
  title,
  description,
  items,
}: {
  title: string;
  description?: string;
  items?: string[];
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold">{title}</h2>

      {description && (
        <p className="mt-3 leading-7 text-slate-600">{description}</p>
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