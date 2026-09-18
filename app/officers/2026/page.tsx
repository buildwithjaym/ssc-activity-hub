"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { OFFICERS_DATA } from "@/components/officers-data";

type Officer = {
  rank?: number;
  name: string;
  position: string;
  unit: string;
  image: string;
  facebook?: string;
  bio?: string;
};

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.86c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.23.2 2.23.2V8.6H15.2c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33V22C18.34 21.25 22 17.09 22 12.07Z" />
    </svg>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className="max-w-2xl"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
        Leadership Group
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A2A1F] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
    </motion.div>
  );
}

function OfficerCard({
  officer,
  featured = false,
  index = 0,
}: {
  officer: Officer;
  featured?: boolean;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured ? "p-7" : "p-5"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4AF37]/12 blur-3xl transition duration-500 group-hover:bg-[#D4AF37]/20" />

      {officer.rank && (
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#0A2A1F] text-[11px] font-bold text-[#D4AF37]">
          {officer.rank}
        </div>
      )}

      <div
        className={`relative mx-auto overflow-hidden rounded-full border-[3px] border-[#D4AF37]/30 ${
          featured ? "h-48 w-48" : "h-36 w-36"
        }`}
      >
        <CldImage
          src={officer.image}
          alt={officer.name}
          fill
          sizes={featured ? "192px" : "144px"}
          crop="fill"
          gravity="face"
          quality="auto"
          format="auto"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative mt-5 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
          {officer.position}
        </p>

        <h3 className="mt-2 text-lg font-bold text-[#0A2A1F]">{officer.name}</h3>

        <p className="mt-1 text-sm font-medium text-slate-500">{officer.unit}</p>

        {officer.bio && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {officer.bio}
          </p>
        )}

        {officer.facebook && (
          <a
            href={officer.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1877F2] transition hover:opacity-70"
          >
            <FacebookIcon />
            Facebook
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function OfficersPage() {
  return (
    <main className="bg-[#F8F5EF]">
      {/* Hero - compact & aligned */}
      <section className="relative overflow-hidden bg-[#0A2A1F] px-5 pb-14 pt-24 sm:px-8 sm:pt-28 lg:px-10">
        <div className="absolute -right-24 -top-16 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              ← Back to Home
            </Link>
          </motion.div>

          <div className="mt-10 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]"
            >
              Supreme Student Council
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              The People Behind
              <span className="mt-1 block text-[#D4AF37]">
                Student Leadership
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.45 }}
              className="mt-4 max-w-md text-sm leading-relaxed text-white/65"
            >
              {OFFICERS_DATA.meta.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.45 }}
              className="mt-7 flex gap-3"
            >
              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
                <p className="text-xl font-bold text-white">
                  {OFFICERS_DATA.senators.length}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Senators
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
                <p className="text-xl font-bold text-white">
                  {OFFICERS_DATA.representatives.length}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Representatives
                </p>
              </div>

               <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
                <p className="text-xl font-bold text-white">
                  {OFFICERS_DATA.appointees.length}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Appointees
                </p>
              </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
                <p className="text-xl font-bold text-white">
                  {OFFICERS_DATA.marshall.length}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  Marshall
                </p>
              </div>

            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-8 text-[11px] uppercase tracking-[0.2em] text-white/30"
          >
            {OFFICERS_DATA.meta.schoolYear}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl space-y-16 px-5 py-14 sm:px-8 lg:px-10">
        <div>
          <SectionHeader
            title="SSC Adviser"
            description="Provides guidance and support to strengthen student leadership and council initiatives."
          />
          <div className="mt-7 max-w-xs">
            <OfficerCard officer={OFFICERS_DATA.adviser} featured index={0} />
          </div>
        </div>

        <div>
          <SectionHeader
            title="Executive Council"
            description="Leads council operations, represents students, and coordinates major programs."
          />
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {OFFICERS_DATA.executive.map((officer, i) => (
              <OfficerCard key={officer.name} officer={officer} index={i} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            title="SSC Senators"
            description="Elected student leaders who represent the concerns, ideas, and initiatives of the student body."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICERS_DATA.senators.map((officer, i) => (
              <OfficerCard key={officer.name} officer={officer} index={i} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            title="College Representatives"
            description="Connects departments/colleges with the Supreme Student Council."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICERS_DATA.representatives.map((officer, i) => (
              <OfficerCard key={officer.name} officer={officer} index={i} />
            ))}
          </div>
        </div>
    

      <div>
          <SectionHeader
            title="Appointees"
            description="Capable and worth one."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICERS_DATA.appointees.map((officer, i) => (
              <OfficerCard key={officer.name} officer={officer} index={i} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            title="Marshall"
            description="The Defender."
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICERS_DATA.marshall.map((officer, i) => (
              <OfficerCard key={officer.name} officer={officer} index={i} />
            ))}
          </div>
        </div>
     </section>

      {/* Closing */}
      <section className="bg-[#0A2A1F] px-5 py-14 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Supreme Student Council
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Leadership Through Service
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Committed to listening, representing, and creating meaningful
            experiences for every BASC student.
          </p>
        </motion.div>
      </section>
    </main>
  );
}