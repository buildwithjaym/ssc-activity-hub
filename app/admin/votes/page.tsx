import {
  getVoteDashboard,
  getVotingSettings,
  getVotingResults,
  getRecentVotes,
} from "@/lib/votes/queries";

import VotesClient from "@/components/votes/votes-client";

export default async function VotesPage() {
  const [dashboard, settings, results, recentVotes] = await Promise.all([
    getVoteDashboard(),

    getVotingSettings(),

    getVotingResults(),

    getRecentVotes(),
  ]);

  return (
    <VotesClient
      dashboard={dashboard}
      settings={settings}
      results={results}
      recentVotes={recentVotes}
    />
  );
}
