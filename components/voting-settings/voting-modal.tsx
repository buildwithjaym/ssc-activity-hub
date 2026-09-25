"use client";

import { useState, useEffect } from "react";
import {
  X,
  Save,
  Loader2,
  Radio,
  Unlock,
  PauseCircle,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

import {
  createVotingSettings,
  updateVotingSchedule,
  openVoting,
  pauseVoting,
  closeVoting,
} from "@/lib/votes/settings-actions";

interface Props {
  open: boolean;
  close: () => void;
  settings: any;
  eventId: string;
}

export default function VotingModal({
  open,
  close,
  settings,
  eventId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Sync form when modal opens or settings change
  useEffect(() => {
    if (!open) return;

    setStartTime(
      settings?.start_time ? settings.start_time.slice(0, 16) : ""
    );
    setEndTime(
      settings?.end_time ? settings.end_time.slice(0, 16) : ""
    );
  }, [open, settings]);

  if (!open) return null;

  async function saveSchedule() {
    if (!eventId) {
      toast.error("No event selected");
      return;
    }

    try {
      setLoading(true);

      if (settings) {
        await updateVotingSchedule(eventId, startTime, endTime);
        toast.success("Voting schedule updated");
      } else {
        await createVotingSettings(eventId, startTime, endTime);
        toast.success("Voting configuration created");
      }

      close();
    } catch (error: any) {
      toast.error(error.message || "Failed saving schedule");
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(action: "open" | "pause" | "close") {
    if (!eventId) {
      toast.error("No event selected");
      return;
    }

    try {
      setLoading(true);

      if (action === "open") {
        await openVoting(eventId);
        toast.success("Voting opened");
      }

      if (action === "pause") {
        await pauseVoting(eventId);
        toast.success("Voting paused");
      }

      if (action === "close") {
        await closeVoting(eventId);
        toast.success("Voting closed");
      }

      close();
    } catch (error: any) {
      toast.error(error.message || "Failed updating status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-7 py-5">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="text-[#D4AF37]" />
              <h2 className="text-xl font-bold text-[#0A2A1F]">
                Manage Voting
              </h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Control voting availability
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-7">
          {/* STATUS */}
          <div className="rounded-2xl bg-[#FAF8F2] p-5">
            <p className="text-sm text-slate-500">Current Status</p>
            <h2 className="mt-1 text-2xl font-bold text-[#0A2A1F]">
              {settings?.status?.toUpperCase() || "CLOSED"}
            </h2>
          </div>

          {/* DATE */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Start Time
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                End Time
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
              />
            </div>
          </div>

          {/* SAVE */}
          <button
            type="button"
            disabled={loading}
            onClick={saveSchedule}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A2A1F] py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Schedule
          </button>

          {/* ACTIONS */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => changeStatus("open")}
              className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
            >
              <Unlock size={17} />
              Open
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => changeStatus("pause")}
              className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-50"
            >
              <PauseCircle size={17} />
              Pause
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => changeStatus("close")}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              <Lock size={17} />
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}