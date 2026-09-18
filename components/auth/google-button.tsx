"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.25a4.5 4.5 0 0 1-1.95 2.95v2.46h3.16c1.85-1.7 2.89-4.2 2.89-7.28z"
      />

      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.97-.9 6.62-2.45l-3.16-2.46c-.88.6-2 .96-3.46.96-2.66 0-4.92-1.8-5.73-4.22H3.01v2.54A10 10 0 0 0 12 22z"
      />

      <path
        fill="#FBBC05"
        d="M6.27 13.83A6 6 0 0 1 5.96 12c0-.64.11-1.26.31-1.83V7.63H3.01A10 10 0 0 0 2 12c0 1.6.38 3.12 1.01 4.37l3.26-2.54z"
      />

      <path
        fill="#EA4335"
        d="M12 5.95c1.55 0 2.93.53 4.02 1.57l3.02-3.02C16.96 2.92 14.7 2 12 2a10 10 0 0 0-8.99 5.63l3.26 2.54C7.08 7.75 9.34 5.95 12 5.95z"
      />
    </svg>
  );
}

export default function GoogleButton() {
  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",

        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Google login error:", error.message);

        setLoading(false);
      }
    } catch (error) {
      console.error("Unexpected login error:", error);

      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={loading}
      className="
group
flex
w-full
items-center
justify-center
gap-3
rounded-xl
border
border-slate-200
bg-white
px-6
py-3
font-semibold
text-black
shadow-sm
transition
duration-300

hover:-translate-y-0.5
hover:bg-zinc-100
hover:shadow-md

disabled:cursor-not-allowed
disabled:opacity-60
"
    >
      <div
        className="
transition
duration-300
group-hover:scale-110
"
      >
        <GoogleIcon />
      </div>

      <span>{loading ? "Connecting..." : "Continue with Google"}</span>
    </button>
  );
}
;
