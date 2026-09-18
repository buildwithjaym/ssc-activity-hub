"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Vote,
  Users,
  Trophy,
  Layers,
  RefreshCcw,
  TrendingUp,
  Activity,
  BarChart3,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import { createClient } from "@/lib/supabase/client";
import { SITE_CONFIG } from "@/components/site-config";

type TimeRange = "today" | "7d" | "30d" | "all";

interface DashboardStats {
  totalVotes: number;
  totalVoters: number;
  totalCandidates: number;
  totalCategories: number;
  votingStatus: string;
  periodVotes: number;
  periodVoters: number;
}

interface VoteGrowthPoint {
  date: string;
  votes: number; // cumulative
  daily: number; // votes that day
}

interface CategoryVote {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface TopCandidate {
  id: string;
  full_name: string;
  candidate_number: number;
  category_name: string;
  category_id: string;
  votes: number;
}

interface CategoryOption {
  id: string;
  name: string;
}

const DONUT_COLORS = [
  "#0A2A1F",
  "#D4AF37",
  "#123F2A",
  "#F0D060",
  "#2D5A45",
  "#3D7A5A",
];

export default function DashboardClient({ eventId }: { eventId: string }) {
  const supabase = useMemo(() => createClient(), []);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");

  const [stats, setStats] = useState<DashboardStats>({
    totalVotes: 0,
    totalVoters: 0,
    totalCandidates: 0,
    totalCategories: 0,
    votingStatus: "closed",
    periodVotes: 0,
    periodVoters: 0,
  });

  const [voteGrowth, setVoteGrowth] = useState<VoteGrowthPoint[]>([]);
  const [categoryVotes, setCategoryVotes] = useState<CategoryVote[]>([]);
  const [topCandidates, setTopCandidates] = useState<TopCandidate[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const cacheKey = `dashboard-${eventId}-${timeRange}`;
  const cache = useMemo(() => new Map<string, any>(), []);

  const getDateFilter = useCallback((range: TimeRange) => {
    const now = new Date();
    if (range === "today") {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      return start.toISOString();
    }
    if (range === "7d") {
      const start = new Date(now);
      start.setDate(start.getDate() - 7);
      return start.toISOString();
    }
    if (range === "30d") {
      const start = new Date(now);
      start.setDate(start.getDate() - 30);
      return start.toISOString();
    }
    return null;
  }, []);

  const fetchDashboardData = useCallback(
    async (showToast = false) => {
      try {
        if (showToast) setRefreshing(true);
        else setLoading(true);

        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < 30_000) {
          setStats(cached.stats);
          setVoteGrowth(cached.voteGrowth);
          setCategoryVotes(cached.categoryVotes);
          setTopCandidates(cached.topCandidates);
          setCategories(cached.categories);
          setLastUpdated(new Date(cached.timestamp));
          return;
        }

        const dateFilter = getDateFilter(timeRange);

        // ── 1. Basic counts + settings ────────────────────────────────
        const [
          { count: totalVotes },
          { count: totalCandidates },
          { count: totalCategories },
          { data: settings },
          { data: categoryList },
        ] = await Promise.all([
          supabase
            .from("votes")
            .select("*", { count: "exact", head: true })
            .eq("event_id", eventId),
          supabase
            .from("candidates")
            .select("*", { count: "exact", head: true })
            .eq("event_id", eventId)
            .eq("status", "active"),
          supabase
            .from("categories")
            .select("*", { count: "exact", head: true })
            .eq("event_id", eventId),
          supabase
            .from("voting_settings")
            .select("status")
            .eq("event_id", eventId)
            .maybeSingle(),
          supabase
            .from("categories")
            .select("id, name")
            .eq("event_id", eventId)
            .order("name"),
        ]);

        // All-time unique voters
        const { data: allVoterData } = await supabase
          .from("votes")
          .select("voter_id")
          .eq("event_id", eventId);

        const uniqueVoters = new Set(allVoterData?.map((v) => v.voter_id) || [])
          .size;

        // Period-specific votes + voters
        let periodVotesQuery = supabase
          .from("votes")
          .select("voter_id, created_at")
          .eq("event_id", eventId);

        if (dateFilter) {
          periodVotesQuery = periodVotesQuery.gte("created_at", dateFilter);
        }

        const { data: periodVoteRows } = await periodVotesQuery;
        const periodVotes = periodVoteRows?.length || 0;
        const periodVoters = new Set(
          periodVoteRows?.map((v) => v.voter_id) || [],
        ).size;

        const newStats: DashboardStats = {
          totalVotes: totalVotes || 0,
          totalVoters: uniqueVoters,
          totalCandidates: totalCandidates || 0,
          totalCategories: totalCategories || 0,
          votingStatus: settings?.status || "closed",
          periodVotes,
          periodVoters,
        };

        // ── 2. Votes over time (line + daily bars) ────────────────────
        let votesQuery = supabase
          .from("votes")
          .select("created_at")
          .eq("event_id", eventId)
          .order("created_at", { ascending: true });

        if (dateFilter) {
          votesQuery = votesQuery.gte("created_at", dateFilter);
        }

        const { data: votesOverTime } = await votesQuery;

        const growthMap = new Map<string, number>();
        (votesOverTime || []).forEach((v) => {
          const day = new Date(v.created_at).toLocaleDateString("en-PH", {
            month: "short",
            day: "numeric",
          });
          growthMap.set(day, (growthMap.get(day) || 0) + 1);
        });

        let running = 0;
        const growthData: VoteGrowthPoint[] = Array.from(
          growthMap.entries(),
        ).map(([date, count]) => {
          running += count;
          return { date, votes: running, daily: count };
        });

        // ── 3. Votes by Category (period-aware) ───────────────────────
        let catQuery = supabase
          .from("votes")
          .select(
            `
            category_id,
            categories ( name )
          `,
          )
          .eq("event_id", eventId);

        if (dateFilter) {
          catQuery = catQuery.gte("created_at", dateFilter);
        }

        const { data: categoryData } = await catQuery;

        const catMap = new Map<string, number>();
        (categoryData || []).forEach((v: any) => {
          const name = v.categories?.name || "Unknown";
          catMap.set(name, (catMap.get(name) || 0) + 1);
        });

        const totalCatVotes =
          Array.from(catMap.values()).reduce((a, b) => a + b, 0) || 1;

        const donutData: CategoryVote[] = Array.from(catMap.entries()).map(
          ([name, value], i) => ({
            name,
            value,
            color: DONUT_COLORS[i % DONUT_COLORS.length],
            percentage: Math.round((value / totalCatVotes) * 100),
          }),
        );

        // ── 4. Top Candidates (all categories, period-aware) ──────────
        let topQuery = supabase
          .from("votes")
          .select(
            `
            candidate_id,
            candidates (
              id,
              full_name,
              candidate_number,
              category_id,
              categories ( name )
            )
          `,
          )
          .eq("event_id", eventId);

        if (dateFilter) {
          topQuery = topQuery.gte("created_at", dateFilter);
        }

        const { data: topData } = await topQuery;

        const candidateMap = new Map<string, TopCandidate>();

        (topData || []).forEach((v: any) => {
          const c = v.candidates;
          if (!c) return;

          const existing = candidateMap.get(c.id);
          if (existing) {
            existing.votes += 1;
          } else {
            candidateMap.set(c.id, {
              id: c.id,
              full_name: c.full_name,
              candidate_number: c.candidate_number,
              category_name: c.categories?.name || "—",
              category_id: c.category_id,
              votes: 1,
            });
          }
        });

        const topList = Array.from(candidateMap.values()).sort(
          (a, b) => b.votes - a.votes,
        );

        // ── Update state ──────────────────────────────────────────────
        setStats(newStats);
        setVoteGrowth(growthData);
        setCategoryVotes(donutData);
        setTopCandidates(topList);
        setCategories(categoryList || []);
        setLastUpdated(new Date());

        cache.set(cacheKey, {
          timestamp: Date.now(),
          stats: newStats,
          voteGrowth: growthData,
          categoryVotes: donutData,
          topCandidates: topList,
          categories: categoryList || [],
        });

        if (showToast) toast.success("Dashboard refreshed");
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [supabase, eventId, timeRange, cacheKey, cache, getDateFilter],
  );

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Realtime
  useEffect(() => {
    const channel = supabase
      .channel(`dashboard-${eventId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "votes" },
        () => {
          cache.delete(cacheKey);
          fetchDashboardData();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, eventId, cacheKey, cache, fetchDashboardData]);

  // Filtered top candidates based on dropdown
  const filteredTopCandidates = useMemo(() => {
    if (selectedCategoryId === "all") {
      return topCandidates.slice(0, 10);
    }
    return topCandidates
      .filter((c) => c.category_id === selectedCategoryId)
      .slice(0, 10);
  }, [topCandidates, selectedCategoryId]);

  // Data for the horizontal bar chart (top 8 of current filter)
  const barChartData = filteredTopCandidates.slice(0, 8).map((c) => ({
    name: `#${c.candidate_number}`,
    fullName: c.full_name,
    votes: c.votes,
  }));

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
            {SITE_CONFIG.event.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#0A2A1F]">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as TimeRange)}
            className="rounded-xl border border-[#0A2A1F]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#0A2A1F] shadow-sm outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>

          <button
            onClick={() => {
              cache.delete(cacheKey);
              fetchDashboardData(true);
            }}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl bg-[#0A2A1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123F2A] disabled:opacity-60"
          >
            <RefreshCcw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title={timeRange === "all" ? "Total Votes" : "Votes in Period"}
          value={timeRange === "all" ? stats.totalVotes : stats.periodVotes}
          subtitle={
            timeRange !== "all"
              ? `All-time: ${stats.totalVotes.toLocaleString()}`
              : undefined
          }
          icon={Vote}
          delay={0.05}
        />
        <StatsCard
          title={timeRange === "all" ? "Unique Voters" : "Voters in Period"}
          value={timeRange === "all" ? stats.totalVoters : stats.periodVoters}
          subtitle={
            timeRange !== "all"
              ? `All-time: ${stats.totalVoters.toLocaleString()}`
              : undefined
          }
          icon={Users}
          delay={0.1}
        />
        <StatsCard
          title="Active Candidates"
          value={stats.totalCandidates}
          icon={Trophy}
          delay={0.15}
        />
        <StatsCard
          title="Categories"
          value={stats.totalCategories}
          icon={Layers}
          delay={0.2}
        />
      </div>

      {/* Voting Status */}
      <div className="flex items-center justify-between rounded-2xl border border-[#0A2A1F]/10 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <Activity size={20} className="text-[#D4AF37]" />
          <div>
            <p className="text-sm font-medium text-slate-500">Voting Status</p>
            <p className="text-lg font-bold capitalize text-[#0A2A1F]">
              {stats.votingStatus}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
            stats.votingStatus === "open"
              ? "bg-green-100 text-green-700"
              : stats.votingStatus === "paused"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {stats.votingStatus.toUpperCase()}
        </span>
      </div>

      {/* Charts Row 1 – Growth + Daily Volume */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cumulative Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border bg-white p-6"
        >
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#D4AF37]" />
            <h2 className="text-lg font-bold text-[#0A2A1F]">
              Votes Growth (Cumulative)
            </h2>
          </div>

          {voteGrowth.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-slate-400">
              No vote data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={voteGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A2A1F",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="votes"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  dot={{ fill: "#0A2A1F", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#D4AF37" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Daily Volume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border bg-white p-6"
        >
          <div className="mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-[#D4AF37]" />
            <h2 className="text-lg font-bold text-[#0A2A1F]">
              Daily Vote Volume
            </h2>
          </div>

          {voteGrowth.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-slate-400">
              No vote data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={voteGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0A2A1F",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="daily" fill="#0A2A1F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Charts Row 2 – Category Donut + Top Candidates Bar */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Donut */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border bg-white p-6 lg:col-span-2"
        >
          <div className="mb-6 flex items-center gap-2">
            <Layers size={20} className="text-[#D4AF37]" />
            <h2 className="text-lg font-bold text-[#0A2A1F]">
              Votes by Category
            </h2>
          </div>

          {categoryVotes.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-slate-400">
              No data yet
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={categoryVotes}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryVotes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A2A1F",
                      border: "none",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "13px",
                    }}
                    formatter={(value, name) => [
                      `${value} votes`,
                      name as string,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Compact legend with % */}
              <div className="mt-2 space-y-1.5">
                {categoryVotes.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-[#0A2A1F]">{c.name}</span>
                    </div>
                    <span className="font-medium text-slate-600">
                      {c.value} ({c.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Top Candidates Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl border bg-white p-6 lg:col-span-3"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-[#D4AF37]" />
              <h2 className="text-lg font-bold text-[#0A2A1F]">
                Top Candidates
              </h2>
            </div>

            {/* Category filter dropdown */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="rounded-lg border border-[#0A2A1F]/15 bg-white px-3 py-1.5 text-sm font-medium text-[#0A2A1F] outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {barChartData.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-slate-400">
              No votes in this category yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={barChartData}
                layout="vertical"
                margin={{ left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={50}
                  tick={{ fontSize: 13, fill: "#0A2A1F", fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
  contentStyle={{
    backgroundColor: "#0A2A1F",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "13px",
  }}
  formatter={(value, _name, props) => [
    `${value} votes`,
    (props as any)?.payload?.fullName ?? _name,
  ]}
/>
                <Bar
                  dataKey="votes"
                  fill="#D4AF37"
                  radius={[0, 6, 6, 0]}
                  barSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Detailed Top Candidates Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl border bg-white p-6"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-[#D4AF37]" />
            <h2 className="text-lg font-bold text-[#0A2A1F]">
              Top Candidates – Detailed
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="rounded-lg border border-[#0A2A1F]/15 bg-white px-3 py-1.5 text-sm font-medium text-[#0A2A1F] outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredTopCandidates.length === 0 ? (
          <p className="py-10 text-center text-slate-400">
            No votes recorded for this selection yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left text-sm text-slate-500">
                  <th className="pb-3 font-medium">Rank</th>
                  <th className="pb-3 font-medium">Candidate</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium text-right">Votes</th>
                </tr>
              </thead>
              <tbody>
                {filteredTopCandidates.map((c, i) => (
                  <tr
                    key={c.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="py-4">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          i === 0
                            ? "bg-[#D4AF37] text-[#0A2A1F]"
                            : i === 1
                              ? "bg-[#0A2A1F] text-white"
                              : i === 2
                                ? "bg-[#123F2A] text-white"
                                : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-[#0A2A1F]">
                      #{c.candidate_number} {c.full_name}
                    </td>
                    <td className="py-4 text-slate-600">{c.category_name}</td>
                    <td className="py-4 text-right font-bold text-[#0A2A1F]">
                      {c.votes.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  delay = 0,
}: {
  title: string;
  value: number;
  subtitle?: string;
  icon: any;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-3xl border bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-2xl bg-[#0A2A1F] p-3">
          <Icon size={20} className="text-[#D4AF37]" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{title}</p>
      <h3 className="mt-1 text-3xl font-bold text-[#0A2A1F]">
        {value.toLocaleString()}
      </h3>
      {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
    </motion.div>
  );
}
