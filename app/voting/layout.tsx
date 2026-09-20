import VotingNavbar from "@/components/voting/voting-navbar";

export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#041F18] text-white">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#D4AF3735,transparent_35%)]" />
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

      <VotingNavbar />

      <main className="relative pt-[88px]">
        {children}
      </main>
    </div>
  );
}