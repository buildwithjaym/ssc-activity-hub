"use client";

import { motion } from "framer-motion";

interface Props {
  role: "user" | "ssc";
  content: string;
}

export default function SSCMessage({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] break-words whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm [overflow-wrap:anywhere] sm:max-w-[80%] ${
          isUser
            ? "rounded-br-md bg-[#0A2A1F] text-white"
            : "rounded-bl-md border border-[#D4AF37]/25 bg-white text-[#0A2A1F]"
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
}