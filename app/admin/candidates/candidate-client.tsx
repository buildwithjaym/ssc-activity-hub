"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  CheckCircle,
  XCircle,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import CandidateModal from "@/components/candidates/candidate-modal";
import CandidateForm from "@/components/candidates/candidate-form";
import DeleteModal from "@/components/candidates/delete-modal";
import {
  deleteCandidate,
  toggleCandidateStatus,
} from "@/lib/candidates/actions";
import StatusModal from "@/components/candidates/status-modal";
import CandidateFilter from "@/components/candidates/candidate-filter";
import CandidatePagination from "@/components/candidates/candidate-pagination";

interface Props {
  candidates: any[];
  events: any[];
  categories: any[];
}

export default function CandidateClient({
  candidates,
  events,
  categories,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteCandidateData, setDeleteCandidateData] = useState<any | null>(
    null,
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusCandidate, setStatusCandidate] = useState<any | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  function resetPage() {
    setPage(1);
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const keyword = debouncedSearch.toLowerCase();

    const matchesSearch =
      !keyword ||
      candidate.full_name?.toLowerCase().includes(keyword);

    const matchesEvent =
      !selectedEvent || candidate.event_id === selectedEvent;

    const matchesCategory =
      !selectedCategory || candidate.category_id === selectedCategory;

    const matchesStatus =
      !selectedStatus || candidate.status === selectedStatus;

    return (
      matchesSearch &&
      matchesEvent &&
      matchesCategory &&
      matchesStatus
    );
  });

  const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);

  const paginatedCandidates = filteredCandidates.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  function addCandidate() {
    setSelectedCandidate(null);
    setOpen(true);
  }

  function editCandidate(candidate: any) {
    setSelectedCandidate(candidate);
    setOpen(true);
  }

  function openDeleteModal(candidate: any) {
    setDeleteCandidateData(candidate);
    setDeleteOpen(true);
  }

  function closeDeleteModal() {
    if (deleteLoading) return;
    setDeleteOpen(false);
    setDeleteCandidateData(null);
  }

  async function handleDelete() {
    if (!deleteCandidateData?.id) return;

    try {
      setDeleteLoading(true);
      await deleteCandidate(deleteCandidateData.id);
      toast.success("Candidate deleted");
      setDeleteOpen(false);
      setDeleteCandidateData(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete candidate";
      toast.error(message);
    } finally {
      setDeleteLoading(false);
    }
  }

  function openStatusModal(candidate: any) {
    setStatusCandidate(candidate);
    setStatusOpen(true);
  }

  async function handleStatusChange() {
    if (!statusCandidate?.id) return;

    try {
      setStatusLoading(true);
      const nextStatus =
        statusCandidate.status === "active" ? "inactive" : "active";
      await toggleCandidateStatus(statusCandidate.id, nextStatus);
      toast.success(`Candidate ${nextStatus}`);
      setStatusOpen(false);
      setStatusCandidate(null);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStatusLoading(false);
    }
  }

  const stats = [
    {
      title: "Total Candidates",
      value: candidates.length,
      icon: Users,
    },
    {
      title: "Active",
      value: candidates.filter((c) => c.status === "active").length,
      icon: CheckCircle,
    },
    {
      title: "Inactive",
      value: candidates.filter((c) => c.status === "inactive").length,
      icon: XCircle,
    },
  ];

  const hasCandidates = candidates.length > 0;
  const hasSearchResults = filteredCandidates.length > 0;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[.25em] text-[#D4AF37]">
          Parageyan 2026
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#0A2A1F]">
          Candidates Management
        </h1>
        <p className="mt-2 text-slate-600">
          Manage candidates for People&apos;s Choice Award.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-[#0A2A1F]/10 bg-white p-5 shadow-sm"
            >
              <div className="w-fit rounded-2xl bg-[#0A2A1F] p-3">
                <Icon size={20} className="text-[#D4AF37]" />
              </div>
              <p className="mt-4 text-sm text-slate-500">{item.title}</p>
              <p className="text-3xl font-bold text-[#0A2A1F]">{item.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-3 rounded-xl border border-[#0A2A1F]/10 bg-white px-4 py-3 sm:max-w-sm">
          <Search size={18} className="shrink-0 text-slate-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
            }}
            placeholder="Search candidates..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          onClick={addCandidate}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2A1F] px-5 py-3 font-semibold text-white transition hover:bg-[#123F2A]"
        >
          <Plus size={18} />
          Add Candidate
        </button>
      </div>

      {/* Filters */}
      <div className="mt-4">
        <CandidateFilter
          events={events}
          categories={categories}
          selectedEvent={selectedEvent}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          setSelectedEvent={(value: string) => {
            setSelectedEvent(value);
            resetPage();
          }}
          setSelectedCategory={(value: string) => {
            setSelectedCategory(value);
            resetPage();
          }}
          setSelectedStatus={(value: string) => {
            setSelectedStatus(value);
            resetPage();
          }}
        />
      </div>

      {!hasCandidates ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#0A2A1F]/20 bg-white px-6 py-14 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0A2A1F]/5">
            <Users size={34} className="text-[#0A2A1F]" />
          </div>
          <h2 className="mt-6 text-xl font-bold text-[#0A2A1F]">
            No Candidates Yet
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            No candidates have been registered yet. Add the first candidate to
            begin managing the People&apos;s Choice Award.
          </p>
          <button
            type="button"
            onClick={addCandidate}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A2A1F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#123F2A]"
          >
            <Plus size={18} />
            Add First Candidate
          </button>
        </motion.div>
      ) : !hasSearchResults ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#0A2A1F]/20 bg-white px-6 py-12 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0A2A1F]/5">
            <Search size={28} className="text-[#0A2A1F]" />
          </div>
          <h2 className="mt-5 text-lg font-bold text-[#0A2A1F]">
            No Matching Candidates
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            No candidates match your current filters
            {debouncedSearch ? ` for “${debouncedSearch}”` : ""}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedEvent("");
              setSelectedCategory("");
              setSelectedStatus("");
              resetPage();
            }}
            className="mt-5 rounded-xl border border-[#0A2A1F]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#0A2A1F] transition hover:bg-[#FAF8F2]"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <>
          <div className="mt-8 overflow-hidden rounded-3xl border border-[#0A2A1F]/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-[#0A2A1F] text-white">
                  <tr>
                    {[
                      "Photo",
                      "Candidate",
                      "Category",
                      "Event",
                      "Status",
                      "Action",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedCandidates.map((candidate, index) => (
                    <motion.tr
                      key={candidate.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="border-b border-[#0A2A1F]/5 transition last:border-b-0 hover:bg-[#FAF8F2]"
                    >
                      <td className="px-6 py-4">
                        {candidate.image_url ? (
                          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-[#0A2A1F]/10 bg-slate-100">
                            <img
                              src={candidate.image_url}
                              alt={candidate.full_name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0A2A1F]/10 bg-[#FAF8F2]">
                            <ImageIcon size={22} className="text-slate-400" />
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <p className="font-semibold text-[#0A2A1F]">
                            {candidate.candidate_number
                              ? `#${candidate.candidate_number} `
                              : ""}
                            {candidate.full_name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {candidate.college ||
                              candidate.course ||
                              "No additional information"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {candidate.categories?.name ?? "No Category"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {candidate.events?.name ?? "No Event"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            candidate.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {candidate.status ?? "inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => editCandidate(candidate)}
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => openStatusModal(candidate)}
                            className="rounded-lg p-2 text-orange-600 transition hover:bg-orange-50"
                          >
                            {candidate.status === "active" ? (
                              <XCircle size={16} />
                            ) : (
                              <CheckCircle size={16} />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => openDeleteModal(candidate)}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <CandidatePagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          )}
        </>
      )}

      <CandidateModal
        open={open}
        close={() => {
          setOpen(false);
          setSelectedCandidate(null);
        }}
        title={selectedCandidate ? "Update Candidate" : "Add Candidate"}
      >
        <CandidateForm
          candidate={selectedCandidate}
          events={events}
          categories={categories}
          close={() => {
            setOpen(false);
            setSelectedCandidate(null);
          }}
        />
      </CandidateModal>

      <DeleteModal
        open={deleteOpen}
        close={closeDeleteModal}
        name={deleteCandidateData?.full_name ?? ""}
        loading={deleteLoading}
        confirm={handleDelete}
      />

      <StatusModal
        open={statusOpen}
        close={() => {
          setStatusOpen(false);
          setStatusCandidate(null);
        }}
        confirm={handleStatusChange}
        name={statusCandidate?.full_name ?? ""}
        status={statusCandidate?.status ?? ""}
        loading={statusLoading}
      />
    </div>
  );
}