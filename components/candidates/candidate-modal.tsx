"use client";

import { AnimatePresence, motion } from "framer-motion";

import { X } from "lucide-react";

interface Props {
  open: boolean;

  close: () => void;

  title: string;

  children: React.ReactNode;
}

export default function CandidateModal({
  open,

  close,

  title,

  children,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/40
backdrop-blur-lg
p-4
"
          onClick={close}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 40,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            className="
relative
w-full
max-w-3xl
max-h-[90vh]
overflow-hidden
rounded-[32px]
border
border-[#0A2A1F]/10
bg-[#FAF8F2]
shadow-2xl
"
          >
            <div
              className="
flex
items-center
justify-between
border-b
border-[#0A2A1F]/10
px-8
py-6
"
            >
              <div>
                <p
                  className="
text-xs
uppercase
tracking-[0.3em]
font-semibold
text-[#D4AF37]
"
                >
                  Parageyan 2026
                </p>

                <h2
                  className="
mt-2
text-2xl
font-bold
text-[#0A2A1F]
"
                >
                  {title}
                </h2>

                <p
                  className="
mt-1
text-sm
text-slate-500
"
                >
                  Manage candidate information
                </p>
              </div>

              <button
                type="button"
                onClick={close}
                className="
rounded-xl
p-2
text-slate-500
transition
hover:bg-[#0A2A1F]/10
"
              >
                <X size={22} />
              </button>
            </div>

            <div
              className="
max-h-[calc(90vh-120px)]
overflow-y-auto
px-8
py-6
"
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
