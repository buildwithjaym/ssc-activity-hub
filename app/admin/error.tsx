"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div
      className="
flex
min-h-[70vh]
items-center
justify-center
px-5
"
    >
      <div
        className="
max-w-md
rounded-3xl
border
border-[#0A2A1F]/10
bg-white
p-8
text-center
shadow-sm
"
      >
        <div
          className="
mx-auto
flex
h-14
w-14
items-center
justify-center
rounded-full
bg-[#D4AF37]/20
"
        >
          <AlertTriangle
            size={28}
            className="
text-[#D4AF37]
"
          />
        </div>

        <h2
          className="
mt-5
text-2xl
font-bold
text-[#0A2A1F]
"
        >
          Something went wrong
        </h2>

        <p
          className="
mt-3
text-sm
leading-relaxed
text-slate-500
"
        >
          We were unable to load the admin dashboard. Please try again.
        </p>

        <button
          onClick={reset}
          className="
mt-6
flex
mx-auto
items-center
gap-2
rounded-full
bg-[#0A2A1F]
px-6
py-3
text-sm
font-semibold
text-white
transition
hover:scale-105
"
        >
          <RefreshCcw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}
