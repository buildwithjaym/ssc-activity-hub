"use server";

import { createClient } from "@supabase/supabase-js";

// Public client (no cookies) — safe for caching public data
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Candidate = {
  id: string;
  candidate_number: number | null;
  full_name: string;
  college: string | null;
  year_level: string | null;
  bio: string | null;
  image_url: string | null;
  status: string | null;
  category_id: string;
  category_name: string | null;
};

export type Category = {
  id: string;
  name: string;
};

export async function getActiveEvent() {
  const { data, error } = await supabase
    .from("events")
    .select("id, name, school_name, year")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getActiveEvent:", error.message);
    return null;
  }

  return data;
}

export async function getCategories(eventId: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .eq("event_id", eventId)
    .order("name", { ascending: true });

  if (error) {
    console.error("getCategories:", error.message);
    return [];
  }

  return (data ?? []) as Category[];
}

export async function getCandidates(eventId: string, categoryId?: string) {
  let query = supabase
    .from("candidates")
    .select(
      `
      id,
      candidate_number,
      full_name,
      college,
      year_level,
      bio,
      image_url,
      status,
      category_id,
      categories (
        name
      )
    `
    )
    .eq("event_id", eventId)
    .eq("status", "active")
    .order("candidate_number", { ascending: true });

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getCandidates:", error.message);
    return [];
  }

  return (data ?? []).map((item: any) => ({
    id: item.id,
    candidate_number: item.candidate_number,
    full_name: item.full_name,
    college: item.college,
    year_level: item.year_level,
    bio: item.bio,
    image_url: item.image_url,
    status: item.status,
    category_id: item.category_id,
    category_name: item.categories?.name ?? null,
  })) as Candidate[];
}