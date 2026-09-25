"use server";

import { createClient } from "@/lib/supabase/server";

export async function createAuditLog({
  action,

  table,

  recordId,

  metadata,
}: {
  action: string;

  table: string;

  recordId?: string | null;

  metadata?: any;
}) {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();

  const userId = userData.user?.id ?? null;

  const {
    data,

    error,
  } = await supabase

    .from("audit_logs")

    .insert({
      user_id: userId,

      action,

      table_name: table,

      record_id: recordId ?? null,

      metadata: metadata ?? {},
    })

    .select()

    .single();

  if (error) {
    console.error("AUDIT INSERT FAILED:", error);

    throw new Error(error.message);
  }

  console.log("AUDIT CREATED:", data);

  return data;
}
