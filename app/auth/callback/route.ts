import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/`);
  }

  const supabase = await createClient();

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error("OAuth exchange error:", exchangeError.message);

    return NextResponse.redirect(`${origin}/`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${origin}/`);
  }

  const { data: profile, error: profileError } = await supabase

    .from("profiles")

    .select("role")

    .eq("id", user.id)

    .single();

  if (profileError) {
    console.error("Profile fetch error:", profileError.message);

    return NextResponse.redirect(`${origin}/`);
  }

  if (profile?.role === "admin") {
    return NextResponse.redirect(`${origin}/admin`);
  }

  return NextResponse.redirect(`${origin}/voter`);
}
