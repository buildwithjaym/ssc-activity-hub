"use client";

import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface SSCButtonProps {
  onClick: () => void;
  open: boolean;
}

export default function SSCButton({ onClick, open }: SSCButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#0A2A1F] text-[#D4AF37] shadow-xl shadow-[#0A2A1F]/25 transition hover:bg-[#123F2A]"
      aria-label={open ? "Close SSC Assistant" : "Open SSC Assistant"}
    >
      {/* Soft pulse ring when closed */}
      {!open && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/40"
          animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span
            key="close"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <X size={22} />
          </motion.span>
        ) : (
          <motion.span
            key="chat"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <MessageCircle size={22} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}