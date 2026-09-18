"use server";

import { createClient } from "@/lib/supabase/server";

import { revalidatePath } from "next/cache";

import { createAuditLog } from "./audit";

const PATH = "/admin/voting-settings";

type VotingStatus = "open" | "paused" | "closed";

function validateEvent(eventId: string) {
  if (!eventId) {
    throw new Error("Event ID is required");
  }
}

function validateSchedule(
  start: string,

  end: string,
) {
  if (!start || !end) {
    throw new Error("Start and end time are required");
  }

  const startDate = new Date(start);

  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new Error("Invalid date format");
  }

  if (endDate <= startDate) {
    throw new Error("End time must be later than start time");
  }
}

/*
UPDATE STATUS

*/

async function updateStatus(
  eventId: string,

  status: VotingStatus,

  action: string,
) {
  validateEvent(eventId);

  const supabase = await createClient();

  const {
    data: previous,

    error: previousError,
  } = await supabase

    .from("voting_settings")

    .select("*")

    .eq("event_id", eventId)

    .single();

  if (previousError) {
    throw new Error(previousError.message);
  }

  const {
    data,

    error,
  } = await supabase

    .from("voting_settings")

    .update({
      status,

      is_open: status === "open",

      updated_at: new Date().toISOString(),
    })

    .eq("event_id", eventId)

    .select("*")

    .single();

  if (error) {
    throw new Error(error.message);
  }

  await createAuditLog({
    action,

    table: "voting_settings",

    recordId: data.id,

    metadata: {
      event_id: eventId,

      previous_status: previous.status,

      new_status: status,
    },
  });

  revalidatePath(PATH);

  return data;
}

/*
CREATE

*/

export async function createVotingSettings(
  eventId: string,

  startTime: string,

  endTime: string,
) {
  validateEvent(eventId);

  validateSchedule(startTime, endTime);

  const supabase = await createClient();

  const { data: existing } = await supabase

    .from("voting_settings")

    .select("id")

    .eq("event_id", eventId)

    .maybeSingle();

  if (existing) {
    throw new Error("Voting settings already exist");
  }

  const {
    data,

    error,
  } = await supabase

    .from("voting_settings")

    .insert({
      event_id: eventId,

      start_time: startTime,

      end_time: endTime,

      status: "closed",

      is_open: false,
    })

    .select("*")

    .single();

  if (error) {
    throw new Error(error.message);
  }

  await createAuditLog({
    action: "CREATE_VOTING_SETTINGS",

    table: "voting_settings",

    recordId: data.id,

    metadata: {
      event_id: eventId,

      start_time: startTime,

      end_time: endTime,
    },
  });

  revalidatePath(PATH);

  return data;
}

/*
 UPDATE SCHEDULE

*/

export async function updateVotingSchedule(
  eventId: string,

  startTime: string,

  endTime: string,
) {
  validateEvent(eventId);

  validateSchedule(
    startTime,

    endTime,
  );

  const supabase = await createClient();

  const {
    data,

    error,
  } = await supabase

    .from("voting_settings")

    .update({
      start_time: startTime,

      end_time: endTime,

      updated_at: new Date().toISOString(),
    })

    .eq("event_id", eventId)

    .select("*")

    .single();

  if (error) {
    throw new Error(error.message);
  }

  await createAuditLog({
    action: "UPDATE_VOTING_SCHEDULE",

    table: "voting_settings",

    recordId: data.id,

    metadata: {
      event_id: eventId,

      start_time: startTime,

      end_time: endTime,
    },
  });

  revalidatePath(PATH);

  return data;
}

/*
 OPEN

*/

export async function openVoting(eventId: string) {
  return updateStatus(
    eventId,

    "open",

    "OPEN_VOTING",
  );
}

/*
 PAUSE

*/

export async function pauseVoting(eventId: string) {
  return updateStatus(
    eventId,

    "paused",

    "PAUSE_VOTING",
  );
}

/*
 RESUME / PLAY

*/

export async function resumeVoting(eventId: string) {
  return updateStatus(
    eventId,

    "open",

    "RESUME_VOTING",
  );
}

/*
 CLOSE

*/

export async function closeVoting(eventId: string) {
  return updateStatus(
    eventId,

    "closed",

    "CLOSE_VOTING",
  );
}

/*
 DELETE
*/

export async function deleteVotingSettings(eventId: string) {
  validateEvent(eventId);

  const supabase = await createClient();

  const {
    data: existing,

    error: findError,
  } = await supabase

    .from("voting_settings")

    .select("*")

    .eq("event_id", eventId)

    .single();

  if (findError) {
    throw new Error(findError.message);
  }

  const { error } = await supabase

    .from("voting_settings")

    .delete()

    .eq("event_id", eventId);

  if (error) {
    throw new Error(error.message);
  }

  await createAuditLog({
    action: "DELETE_VOTING_SETTINGS",

    table: "voting_settings",

    recordId: existing.id,

    metadata: {
      event_id: eventId,

      start_time: existing.start_time,

      end_time: existing.end_time,

      status: existing.status,
    },
  });

  revalidatePath(PATH);

  return {
    success: true,
  };
}
