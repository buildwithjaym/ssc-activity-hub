"use client";

import {
  CalendarPlus,
  CalendarClock,
  Radio,
  CheckCircle2,
  PauseCircle,
  Lock,
} from "lucide-react";

interface Props {
  settings: any;
}

export default function VotingTimeline({ settings }: Props) {
  if (!settings) {
    return null;
  }

  const status = settings.status ?? "closed";

  const items = [
    {
      title: "Voting Configuration Created",
      date: settings.created_at,
      icon: <CalendarPlus size={18} />,
      active: true,
    },

    {
      title: "Voting Schedule Set",
      date: settings.start_time,
      icon: <CalendarClock size={18} />,
      active: !!settings.start_time,
    },

    {
      title:
        status === "open"
          ? "Voting is Currently Open"
          : status === "paused"
            ? "Voting is Paused"
            : "Voting is Closed",

      date: settings.updated_at,

      icon:
        status === "open" ? (
          <CheckCircle2 size={18} />
        ) : status === "paused" ? (
          <PauseCircle size={18} />
        ) : (
          <Lock size={18} />
        ),

      active: true,
    },

    {
      title: "Voting End Schedule",
      date: settings.end_time,
      icon: <Radio size={18} />,
      active: !!settings.end_time,
    },
  ];

  return (
    <div
      className="
rounded-3xl
border
bg-white
p-8
"
    >
      <div
        className="
flex
items-center
gap-3
mb-8
"
      >
        <Radio className="text-[#D4AF37]" />

        <h2
          className="
text-xl
font-bold
text-[#0A2A1F]
"
        >
          Voting Timeline
        </h2>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="
flex
gap-4
"
          >
            <div
              className={`
p-3
rounded-full

${item.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"}

`}
            >
              {item.icon}
            </div>

            <div>
              <h3
                className="
font-semibold
text-[#0A2A1F]
"
              >
                {item.title}
              </h3>

              <p
                className="
text-sm
text-slate-500
mt-1
"
              >
                {item.date
                  ? new Date(item.date).toLocaleString()
                  : "No schedule"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
