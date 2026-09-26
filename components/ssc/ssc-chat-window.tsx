"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import MessageContent from "./message-content";

type Message = {
  id: string;
  role: "user" | "ssc";
  content: string;
};

type Props = {
  messages: Message[];
  sendMessage: (message: string) => void;
  typing: boolean;
  onClose: () => void;
};

const quickActions = [
  "What is Parageyan 2026?",
  "Show official activities",
  "Who are the SSC officers?",
  "How can I vote?",
  "Show college spirit",
];

export default function SSCChatWindow({
  messages,
  sendMessage,
  typing,
  onClose,
}: Props) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSend() {
    const value = input.trim();
    if (!value || typing) return;
    sendMessage(value);
    setInput("");
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="fixed bottom-4 left-4 right-4 z-[999] flex h-[min(600px,85dvh)] flex-col overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-white shadow-2xl sm:bottom-24 sm:left-auto sm:right-6 sm:w-[390px]"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between bg-[#0A2A1F] px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-[#0A2A1F]"
            >
              <Bot size={22} />
            </motion.div>

            <div>
              <p className="text-sm font-bold">SSC Guide Bot</p>
              <p className="text-xs text-white/70">Parageyan 2026 Assistant</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-[#F8F5EF] p-4">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="rounded-2xl border border-[#D4AF37]/30 bg-white p-4 text-sm leading-relaxed text-[#0A2A1F] shadow-sm">
                <div className="mb-2 flex items-center gap-2 font-semibold">
                  <Sparkles size={16} className="text-[#D4AF37]" />
                  Kuya SSC Guide Bot
                </div>
                Hi! I can help you with Parageyan 2026 activities, schedules,
                SSC information, college spirit, and People's Choice Award
                voting.
              </div>

              <div className="flex flex-wrap gap-2">
                {quickActions.map((item, index) => (
                  <motion.button
                    key={item}
                    type="button"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => sendMessage(item)}
                    className="rounded-full border border-[#D4AF37]/40 bg-white px-3 py-2 text-xs text-[#0A2A1F] transition hover:bg-[#D4AF37]/20"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={
                msg.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={
                  msg.role === "user"
                    ? "max-w-[80%] rounded-2xl bg-[#0A2A1F] px-4 py-2.5 text-sm leading-relaxed text-white"
                    : "max-w-[85%] rounded-2xl border border-[#D4AF37]/30 bg-white px-4 py-2.5 text-sm leading-relaxed text-[#0A2A1F] shadow-sm"
                }
              >
                <MessageContent content={msg.content} />
              </div>
            </motion.div>
          ))}

          {typing && (
            <div className="flex items-center gap-1.5 px-1 text-sm text-[#064E3B]">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D4AF37] [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D4AF37] [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D4AF37] [animation-delay:300ms]" />
              </span>
              <span className="italic">SSC Guide Bot is typing...</span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="border-t border-[#D4AF37]/30 bg-white p-3">
          <div className="flex items-center gap-2 rounded-full border border-[#0A2A1F]/15 bg-[#F8F5EF] px-4 focus-within:border-[#D4AF37]/50">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask Kuya SSC..."
              disabled={typing}
              className="flex-1 bg-transparent py-2.5 text-sm text-[#0A2A1F] outline-none placeholder:text-slate-400 disabled:opacity-60"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || typing}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#D4AF37] transition hover:bg-[#D4AF37]/15 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}