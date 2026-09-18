"use client";

import { useState, useEffect } from "react";

import { CalendarDays, Plus, Settings } from "lucide-react";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

import VotingLiveStatus from "./voting-live-status";

import VotingModal from "./voting-modal";

interface Props {
  events: any[];

  initialEvent: any;

  initialSettings: any;
}

export default function VotingSettingsClient({
  events,

  initialEvent,

  initialSettings,
}: Props) {
  const supabase = createClient();

  const [selectedEvent, setSelectedEvent] = useState(initialEvent?.id ?? "");

  const [settings, setSettings] = useState(initialSettings);

  const [openModal, setOpenModal] = useState(false);

  async function loadEvent(eventId: string) {
    setSelectedEvent(eventId);

    const { data, error } = await supabase

      .from("voting_settings")

      .select("*")

      .eq("event_id", eventId)

      .maybeSingle();

    if (error) {
      toast.error(error.message);

      return;
    }

    setSettings(data);
  }

  useEffect(() => {
    if (!selectedEvent) return;

    const channel = supabase

      .channel("voting-settings-live")

      .on(
        "postgres_changes",

        {
          event: "*",

          schema: "public",

          table: "voting_settings",

          filter: `event_id=eq.${selectedEvent}`,
        },

        (payload) => {
          console.log(payload);

          setSettings(payload.new);

          toast.success("Voting status updated");
        },
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedEvent]);

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <p
          className="
text-xs
tracking-[0.3em]
uppercase
font-semibold
text-[#D4AF37]
"
        >
          PARAGEYAN 2026
        </p>

        <h1
          className="
flex
items-center
gap-3
mt-3
text-3xl
font-bold
text-[#0A2A1F]
"
        >
          <Settings />
          Voting Control Center
        </h1>

        <p
          className="
text-slate-500
mt-2
"
        >
          Manage event voting schedule and live status.
        </p>
      </div>

      {/* EVENT SELECTOR */}

      <div
        className="
rounded-3xl
border
bg-white
p-6
"
      >
        <div
          className="
flex
items-center
gap-2
mb-4
"
        >
          <CalendarDays className="text-[#D4AF37]" />

          <h2
            className="
font-bold
text-xl
"
          >
            Select Event
          </h2>
        </div>

        <select
          value={selectedEvent}
          onChange={(e) => loadEvent(e.target.value)}
          className="
w-full
rounded-xl
border
px-4
py-3
"
        >
          <option value="">Select event</option>

          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}-{event.year}
            </option>
          ))}
        </select>
      </div>

      {settings ? (
        <VotingLiveStatus
          settings={settings}
          onManage={() => setOpenModal(true)}
        />
      ) : (
        <div
          className="
rounded-3xl
border
bg-white
p-10
text-center
"
        >
          <CalendarDays
            size={40}
            className="
mx-auto
text-[#D4AF37]
"
          />

          <h2
            className="
text-xl
font-bold
mt-4
"
          >
            No Voting Configuration
          </h2>

          <p
            className="
text-slate-500
mt-2
"
          >
            Create voting settings for this event.
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="
mt-5
rounded-xl
bg-[#0A2A1F]
px-5
py-3
text-white
font-semibold
flex
gap-2
items-center
mx-auto
"
          >
            <Plus size={18} />
            Create Voting
          </button>
        </div>
      )}

   
        {selectedEvent && (
<VotingModal

open={openModal}

close={()=>setOpenModal(false)}

eventId={selectedEvent}

settings={settings}

/>
)}
      
    </div>
  );
}
