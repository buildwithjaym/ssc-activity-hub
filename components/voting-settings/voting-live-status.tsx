"use client";

import { Clock, CalendarDays, Radio } from "lucide-react";

interface Props {
  settings: any;
  onManage: () => void;
}

export default function VotingLiveStatus({ settings, onManage }: Props) {
  const status =
    (settings?.status as "open" | "paused" | "closed" | undefined) ?? "closed";

  const statusConfig = {
    open: {
      label: "OPEN",
      color: "bg-green-100 text-green-700",
    },
    paused: {
      label: "PAUSED",
      color: "bg-yellow-100 text-yellow-700",
    },
    closed: {
      label: "CLOSED",
      color: "bg-red-100 text-red-700",
    },
  } as const;

  const currentStatus = statusConfig[status];

  return (
    <div className="space-y-6 rounded-3xl border bg-white p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="text-[#D4AF37]" />
            <h2 className="text-xl font-bold text-[#0A2A1F]">Voting Status</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">Realtime monitoring</p>
        </div>

        <span
          className={`rounded-full px-5 py-2 text-sm font-bold ${currentStatus.color}`}
        >
          {currentStatus.label}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="mb-1 flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={15} />
            Start
          </p>
          <p className="font-semibold text-[#0A2A1F]">
            {settings?.start_time
              ? new Date(settings.start_time).toLocaleString()
              : "N/A"}
          </p>
        </div>

        <div>
          <p className="mb-1 flex items-center gap-2 text-sm text-slate-500">
            <Clock size={15} />
            End
          </p>
          <p className="font-semibold text-[#0A2A1F]">
            {settings?.end_time
              ? new Date(settings.end_time).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onManage}
        className="rounded-xl bg-[#0A2A1F] px-5 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Manage Voting
      </button>
    </div>
  );
}