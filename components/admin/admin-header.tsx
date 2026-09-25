"use client";

import Image from "next/image";

import { SITE_CONFIG } from "@/components/site-config";

interface Props {
  profile: {
    full_name?: string | null;

    email?: string | null;

    avatar_url?: string | null;

    department?: string | null;

    role?: string | null;
  } | null;
}

export default function AdminHeader({ profile }: Props) {
  const initials = profile?.full_name
    ? profile.full_name

        .split(" ")

        .map((word) => word.charAt(0))

        .slice(0, 2)

        .join("")

        .toUpperCase()
    : "AD";

  return (
    <div
      className="
flex
items-center
gap-4

"
    >
      {/* INFORMATION */}

      <div
        className="
hidden
text-right
sm:block

"
      >
        <p
          className="
text-sm
font-bold
text-[#0A2A1F]

"
        >
          {profile?.full_name ?? "Administrator"}
        </p>

        <p
          className="
text-xs
text-slate-500

"
        >
          {profile?.department ?? profile?.email ?? "SSC Administrator"}
        </p>

        <span
          className="
mt-1
inline-flex

rounded-full

bg-[#0A2A1F]

px-3

py-1

text-[9px]

font-bold

uppercase

tracking-widest

text-[#D4AF37]

"
        >
          {profile?.role ?? "admin"}
        </span>
      </div>

      {/* AVATAR */}

      <div
        className="
relative

h-12

w-12

overflow-hidden

rounded-full

border-2

border-[#D4AF37]

bg-[#D4AF37]

shadow-md

"
      >
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt="Profile picture"
            fill
            sizes="48px"
            className="
object-cover
"
          />
        ) : (
          <div
            className="
flex
h-full
w-full

items-center

justify-center

font-bold

text-[#0A2A1F]

"
          >
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}
