"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Vote,
  Users,
  Layers,
  RefreshCcw,
  Clock,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { getVotingResults } from "@/lib/votes/queries";
import WinnerExport from "@/components/export/winner-export";
import {
  LeaderboardPodium,
  CandidateRanking,
} from "@/components/ui/leaderboard-podium";

interface Props {
  dashboard: any;
  settings: any | null;
  results: any[];
  recentVotes: any[];
  eventId: string;
  categories: any[];
}

export default function VotesClient({
  dashboard,
  settings,
  results,
  recentVotes,
  eventId,
  categories,
}: Props) {
  const supabase = useMemo(() => createClient(), []);

  // Full results (always contains all categories)
  const [fullResults, setFullResults] = useState<any[]>(results ?? []);
  
  // Filtered results for UI display
  const [liveResults, setLiveResults] = useState<any[]>(results ?? []);
  
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Create rankings with proper per-category rank (from full results)
  const leaderboard = useMemo(() => {
    const source = selectedCategory ? liveResults : fullResults;

    // Group by category
    const grouped: Record<string, any[]> = {};

    source.forEach((item) => {
      const categoryName = item.category?.name ?? "Unknown";
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(item);
    });

    const ranked: CandidateRanking[] = [];

    Object.entries(grouped).forEach(([categoryName, items]) => {
      const sorted = [...items].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));

      sorted.forEach((item, index) => {
        ranked.push({
          candidateId: item.candidate?.id ?? String(index),
          candidateName: item.candidate?.full_name ?? "Unknown",
          candidateNumber: item.candidate?.candidate_number ?? 0,
          categoryId: item.category?.id ?? "",
          categoryName,
          votes: item.votes ?? 0,
          imageUrl: item.candidate?.image_url ?? null,
          rank: index + 1,
        });
      });
    });

    return ranked;
  }, [fullResults, liveResults, selectedCategory]);

  // Export data — ALWAYS uses all categories
  const exportData = useMemo(() => {
    const grouped: Record<string, any[]> = {};

    fullResults.forEach((item) => {
      const categoryName = item.category?.name ?? "Unknown";
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(item);
    });

    const ranked: { rank: number; candidateName: string; categoryName: string; votes: number }[] = [];

    Object.entries(grouped).forEach(([categoryName, items]) => {
      const sorted = [...items].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));

      sorted.forEach((item, index) => {
        ranked.push({
          rank: index + 1,
          candidateName: item.candidate?.full_name ?? "Unknown",
          categoryName,
          votes: item.votes ?? 0,
        });
      });
    });

    return ranked;
  }, [fullResults]);

  async function refreshResults(categoryId: string = selectedCategory) {
    try {
      setLoading(true);

      // Always fetch full results
      const allResults = await getVotingResults(undefined);
      setFullResults(allResults ?? []);

      // Then apply filter for UI if needed
      if (categoryId) {
        const filtered = (allResults ?? []).filter(
          (item: any) => item.category?.id === categoryId
        );
        setLiveResults(filtered);
      } else {
        setLiveResults(allResults ?? []);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCategoryChange(value: string) {
    setSelectedCategory(value);
    refreshResults(value);
  }

  // Realtime voting
  useEffect(() => {
    const channel = supabase
      .channel(`votes-live-${eventId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "votes",
        },
        () => {
          toast.success("New vote received");
          refreshResults(selectedCategory);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, eventId, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          PARAGEYAN 2026
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#0A2A1F]">
          Voting Monitoring
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor People's Choice Award voting activity.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        <StatsCard
          title="Total Votes"
          value={dashboard?.totalVotes ?? 0}
          icon={Vote}
        />
        <StatsCard
          title="Total Voters"
          value={dashboard?.totalVoters ?? 0}
          icon={Users}
        />
        <StatsCard
          title="Categories"
          value={dashboard?.totalCategories ?? 0}
          icon={Layers}
        />
      </div>

      {/* Leaderboard */}
      <div className="rounded-3xl border bg-white p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy size={22} className="text-[#D4AF37]" />
            <h2 className="text-xl font-bold text-[#0A2A1F]">Leaderboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <WinnerExport
              eventName="PARAGEYAN 2026"
              winners={exportData}
            />

            <select
              value={selectedCategory}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategory(value);
                refreshResults(value);
              }}
              className="rounded-xl border border-[#0A2A1F]/20 bg-white px-4 py-2 text-sm font-semibold text-[#0A2A1F] shadow-sm outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <LeaderboardPodium
          rankings={leaderboard}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />
      </div>

      {/* Voting Status */}
      <div className="rounded-3xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0A2A1F]">Voting Status</h2>
            <p className="text-sm text-slate-500">Current status</p>
          </div>

          <span
            className={`rounded-full px-4 py-2 font-semibold ${
              settings?.status === "open"
                ? "bg-green-100 text-green-700"
                : settings?.status === "paused"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {(settings?.status ?? "closed").toUpperCase()}
          </span>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <TimeBox label="Start Time" value={settings?.start_time} />
          <TimeBox label="End Time" value={settings?.end_time} />
        </div>
      </div>

      {/* Live Results Table */}
      <div className="overflow-hidden rounded-3xl border bg-white">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold text-[#0A2A1F]">Live Results</h2>

          <button
            onClick={() => refreshResults()}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#0A2A1F] px-4 py-2 text-white"
          >
            <RefreshCcw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-[#0A2A1F] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Candidate</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Votes</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((item) => (
              <tr key={item.candidateId} className="border-b">
                <td className="px-6 py-4">#{item.rank}</td>
                <td className="px-6 py-4 font-semibold">
                  #{item.candidateNumber} {item.candidateName}
                </td>
                <td className="px-6 py-4">{item.categoryName}</td>
                <td className="px-6 py-4 font-bold">{item.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Votes */}
      <div className="rounded-3xl border bg-white p-6">
        <h2 className="text-xl font-bold text-[#0A2A1F]">Recent Votes</h2>

        <div className="mt-5 space-y-4">
          {recentVotes.map((vote: any) => (
            <div
              key={vote.id}
              className="flex justify-between border-b pb-3"
            >
              <div>
                <p className="font-semibold">{vote.candidate?.full_name}</p>
                <p className="text-sm text-slate-500">
                  {vote.category?.name}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock size={15} />
                {new Date(vote.created_at).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimeBox({ label, value }: any) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-semibold">
        {value ? new Date(value).toLocaleString() : "N/A"}
      </p>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon }: any) {
  return (
    <div className="rounded-3xl border bg-white p-5">
      <div className="w-fit rounded-2xl bg-[#0A2A1F] p-3">
        <Icon size={20} className="text-[#D4AF37]" />
      </div>
      <p className="mt-4 text-sm text-slate-500">{title}</p>
      <h2 className="text-3xl font-bold text-[#0A2A1F]">{value}</h2>
    </div>
  );
}