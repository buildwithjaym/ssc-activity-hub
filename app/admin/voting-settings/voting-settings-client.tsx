"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Settings,
  Plus,
  Clock,
  Edit3,
  Unlock,
  PauseCircle,
  Lock,
  Trash2,
  Radio,
  PlayCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { formatVotingDate } from "@/lib/utils/date-format";

import VotingModal from "./voting-modal";
import ConfirmationModal from "./confirmation-modal";
import VotingCountdown from "./voting-countdown";

import {
  openVoting,
  pauseVoting,
  resumeVoting,
  closeVoting,
  deleteVotingSettings,
} from "./actions";

type ActionType = "open" | "pause" | "resume" | "close" | "delete";

const confirmData = {
  open: {
    title: "Open Voting?",
    message: "Voting will become available.",
    confirmText: "Open",
    danger: false,
  },
  pause: {
    title: "Pause Voting?",
    message: "Voting will temporarily stop.",
    confirmText: "Pause",
    danger: false,
  },
  resume: {
    title: "Resume Voting?",
    message: "Voting will become active again.",
    confirmText: "Resume",
    danger: false,
  },
  close: {
    title: "Close Voting?",
    message: "Users will no longer be able to vote.",
    confirmText: "Close",
    danger: true,
  },
  delete: {
    title: "Delete Voting?",
    message: "This cannot be undone.",
    confirmText: "Delete",
    danger: true,
  },
};

export default function VotingSettingsClient({
  events,
  initialEvent,
  initialSettings,
}: any) {
  const router = useRouter();
  const supabase = createClient();

  const [selectedEvent, setSelectedEvent] = useState(initialEvent);
  const [settings, setSettings] = useState(initialSettings);
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState<ActionType | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  async function refreshSettings(eventId?: string) {
    const id = eventId ?? selectedEvent?.id;
    if (!id) return;

    const { data, error } = await supabase
      .from("voting_settings")
      .select("*")
      .eq("event_id", id)
      .maybeSingle();

    if (error) {
      toast.error(error.message);
      return;
    }

    setSettings(data);
    router.refresh();
  }

  async function changeEvent(id: string) {
    const event = events.find((e: any) => e.id === id) ?? null;
    setSelectedEvent(event);

    if (!event?.id) {
      setSettings(null);
      return;
    }

    await refreshSettings(event.id);
  }

  useEffect(() => {
    if (!selectedEvent?.id) return;

    const channel = supabase
      .channel(`settings-${selectedEvent.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "voting_settings",
          filter: `event_id=eq.${selectedEvent.id}`,
        },
        () => {
          refreshSettings();
          toast.success("Voting settings updated");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedEvent?.id]);

  async function executeAction() {
    if (!confirm || !selectedEvent?.id) return;

    try {
      setActionLoading(true);

      let updated;

      switch (confirm) {
        case "open":
          updated = await openVoting(selectedEvent.id);
          break;
        case "pause":
          updated = await pauseVoting(selectedEvent.id);
          break;
        case "resume":
          updated = await resumeVoting(selectedEvent.id);
          break;
        case "close":
          updated = await closeVoting(selectedEvent.id);
          break;
        case "delete":
          await deleteVotingSettings(selectedEvent.id);
          setSettings(null);
          toast.success("Deleted");
          setConfirm(null);
          return;
      }

      setSettings(updated);
      setConfirm(null);
      toast.success("Voting updated");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
          PARAGEYAN 2026
        </p>

        <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold text-[#0A2A1F]">
          <Settings />
          Voting Control Center
        </h1>

        <p className="mt-2 text-slate-500">
          Manage voting configuration and realtime status.
        </p>
      </div>

      {/* EVENT SELECT */}
      <div className="rounded-3xl border bg-white p-6">
        <div className="mb-4 flex items-center gap-3">
          <CalendarDays className="text-[#D4AF37]" />
          <h2 className="text-xl font-bold">Select Event</h2>
        </div>

        <select
          value={selectedEvent?.id ?? ""}
          onChange={(e) => changeEvent(e.target.value)}
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">Select event</option>
          {events.map((event: any) => (
            <option key={event.id} value={event.id}>
              {event.name} - {event.year}
            </option>
          ))}
        </select>
      </div>

      {/* CONFIGURATION */}
      <div className="rounded-3xl border bg-white p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[#0A2A1F]">
            Voting Configuration
          </h2>

          <span
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              settings?.status === "open"
                ? "bg-green-100 text-green-700"
                : settings?.status === "paused"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {settings?.status?.toUpperCase() ?? "CLOSED"}
          </span>
        </div>

        {settings ? (
          <>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <DateCard title="Start Time" value={settings.start_time} />
              <DateCard title="End Time" value={settings.end_time} />
            </div>

            {/* Fixed: eventId added */}
            <VotingCountdown
              eventId={selectedEvent?.id}
              start={settings.start_time}
              end={settings.end_time}
              status={settings.status}
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <ActionButton
                text="Edit Schedule"
                icon={<Edit3 size={18} />}
                onClick={() => setShowModal(true)}
                className="bg-[#0A2A1F] text-white"
              />

              {settings.status === "closed" && (
                <ActionButton
                  text="Open"
                  icon={<Unlock size={18} />}
                  onClick={() => setConfirm("open")}
                  className="bg-green-600 text-white"
                />
              )}

              {settings.status === "open" && (
                <ActionButton
                  text="Pause"
                  icon={<PauseCircle size={18} />}
                  onClick={() => setConfirm("pause")}
                  className="bg-yellow-500 text-white"
                />
              )}

              {settings.status === "paused" && (
                <ActionButton
                  text="Resume"
                  icon={<PlayCircle size={18} />}
                  onClick={() => setConfirm("resume")}
                  className="bg-green-600 text-white"
                />
              )}

              {settings.status !== "closed" && (
                <ActionButton
                  text="Close"
                  icon={<Lock size={18} />}
                  onClick={() => setConfirm("close")}
                  className="bg-red-600 text-white"
                />
              )}

              <ActionButton
                text="Delete"
                icon={<Trash2 size={18} />}
                onClick={() => setConfirm("delete")}
                className="border border-red-500 bg-white text-red-600 hover:bg-red-50"
              />
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-slate-500">
              <Radio size={15} />
              Last Updated: {formatVotingDate(settings.updated_at)}
            </p>
          </>
        ) : (
          <div className="py-12 text-center">
            <h2 className="text-xl font-bold text-[#0A2A1F]">
              No Voting Configuration
            </h2>
            <p className="mt-2 text-slate-500">
              Create a voting schedule for this event.
            </p>

            <button
              type="button"
              disabled={!selectedEvent?.id}
              onClick={() => {
                if (!selectedEvent?.id) {
                  toast.error("No event selected");
                  return;
                }
                setShowModal(true);
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0A2A1F] px-6 py-3 font-semibold text-white transition hover:bg-[#123d2e] disabled:opacity-50"
            >
              <Plus size={18} />
              Create Voting
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && selectedEvent?.id && (
        <VotingModal
          open={true}
          close={() => {
            setShowModal(false);
            refreshSettings();
          }}
          settings={settings}
          eventId={selectedEvent.id}
        />
      )}

      {/* CONFIRM */}
      {confirm && (
        <ConfirmationModal
          open={true}
          title={confirmData[confirm].title}
          message={confirmData[confirm].message}
          confirmText={confirmData[confirm].confirmText}
          danger={confirmData[confirm].danger}
          loading={actionLoading}
          onCancel={() => setConfirm(null)}
          onConfirm={executeAction}
        />
      )}
    </div>
  );
}

function DateCard({ title, value }: any) {
  return (
    <div className="rounded-2xl border p-5">
      <p className="flex items-center gap-2 text-sm text-slate-500">
        <Clock size={15} />
        {title}
      </p>
      <h3 className="mt-2 font-bold text-[#0A2A1F]">
        {formatVotingDate(value)}
      </h3>
    </div>
  );
}

function ActionButton({ text, icon, onClick, className }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition hover:opacity-90 ${className}`}
    >
      {icon}
      {text}
    </button>
  );
}