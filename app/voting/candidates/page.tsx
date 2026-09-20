"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, User, X } from "lucide-react";
import {
  getActiveEvent,
  getCategories,
  getCandidates,
  type Candidate,
  type Category,
} from "./actions";

export default function CandidatesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [eventName, setEventName] = useState("Parageyan 2026");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const event = await getActiveEvent();
      if (!event) {
        setLoading(false);
        return;
      }

      setEventName(event.name);
      const [cats, cands] = await Promise.all([
        getCategories(event.id),
        getCandidates(event.id),
      ]);
      setCategories(cats);
      setCandidates(cands);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    async function filter() {
      if (categories.length === 0) return;
      const event = await getActiveEvent();
      if (!event) return;

      setLoading(true);
      const cands = await getCandidates(
        event.id,
        selectedCategory === "all" ? undefined : selectedCategory
      );
      setCandidates(cands);
      setLoading(false);
    }
    filter();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FAF8F2]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-7 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            {eventName}
          </p>
          <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-[#0A2A1F] sm:text-3xl">
            Meet the Candidates
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            Tap a candidate to view more details.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-7 flex justify-center">
          <div className="relative w-full max-w-[220px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#0A2A1F]/10 bg-white px-3.5 py-2.5 pr-9 text-sm font-medium text-[#0A2A1F] shadow-sm outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0A2A1F]/40"
            />
          </div>
        </div>

        {/* Grid: 1 col mobile → 3 cols desktop */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl bg-white/70"
              />
            ))}
          </div>
        ) : candidates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#0A2A1F]/10 bg-white/50 py-16 text-center">
            <p className="text-sm text-slate-500">No candidates found.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {candidates.map((c, i) => (
                <motion.button
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  onClick={() => setSelectedCandidate(c)}
                  className="group overflow-hidden rounded-2xl border border-[#0A2A1F]/08 bg-white text-left shadow-sm transition active:scale-[0.98] hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#0A2A1F]/5">
                    {c.image_url ? (
                      <img
                        src={c.image_url}
                        alt={c.full_name}
                        className="h-full w-full object-cover transition duration-400 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <User size={36} className="text-[#0A2A1F]/20" />
                      </div>
                    )}

                    {c.candidate_number && (
                      <span className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37] text-[11px] font-bold text-[#0A2A1F] shadow">
                        {c.candidate_number}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="px-3.5 py-3">
                    <h3 className="truncate text-sm font-bold text-[#0A2A1F]">
                      {c.full_name}
                    </h3>
                    {c.category_name && (
                      <p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-wide text-[#D4AF37]">
                        {c.category_name}
                      </p>
                    )}
                    {(c.college || c.year_level) && (
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {[c.college, c.year_level].filter(Boolean).join(" • ")}
                      </p>
                    )}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCandidate(null)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
              >
                <X size={16} />
              </button>

              {/* Image */}
              <div className="relative aspect-[4/5] bg-[#0A2A1F]/5">
                {selectedCandidate.image_url ? (
                  <img
                    src={selectedCandidate.image_url}
                    alt={selectedCandidate.full_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User size={48} className="text-[#0A2A1F]/20" />
                  </div>
                )}

                {selectedCandidate.candidate_number && (
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-sm font-bold text-[#0A2A1F] shadow">
                    {selectedCandidate.candidate_number}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-[#0A2A1F]">
                  {selectedCandidate.full_name}
                </h2>

                {selectedCandidate.category_name && (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
                    {selectedCandidate.category_name}
                  </p>
                )}

                <div className="mt-3 space-y-1 text-sm text-slate-600">
                  {selectedCandidate.college && (
                    <p>{selectedCandidate.college}</p>
                  )}
                  {selectedCandidate.year_level && (
                    <p>{selectedCandidate.year_level}</p>
                  )}
                </div>

                {selectedCandidate.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">
                    {selectedCandidate.bio}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}