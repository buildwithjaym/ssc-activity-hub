export default function Loading() {
  return (
    <div className="min-h-screen bg-[#041f18] flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <div className="h-12 w-12 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin mx-auto" />

        <p className="text-white/60">Preparing voting system...</p>
      </div>
    </div>
  );
}
