export default function SSCTyping() {
  return (
    <div className="flex w-fit items-center gap-1.5 rounded-2xl border border-[#D4AF37]/20 bg-white px-4 py-3 shadow-sm">
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#D4AF37] [animation-delay:0ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#D4AF37] [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#0A2A1F] [animation-delay:300ms]" />
    </div>
  );
}