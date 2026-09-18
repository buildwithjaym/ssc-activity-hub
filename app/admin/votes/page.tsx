import {
  getVoteDashboard,
  getVotingSettings,
  getVotingResults,
  getRecentVotes,
  getVoteCategories,
} from "@/lib/votes/queries";


import VotesClient
from "@/components/votes/votes-client";



export default async function VotesPage(){


const settings =
await getVotingSettings();



const eventId =
settings?.event_id ?? "";



const [
dashboard,
results,
recentVotes,
categories,
]=await Promise.all([


getVoteDashboard(),


getVotingResults(),


getRecentVotes(),


getVoteCategories(
eventId
),


]);




return (

<VotesClient

dashboard={dashboard}

settings={settings}

results={results}

recentVotes={recentVotes}

eventId={eventId}

categories={categories}

/>

);


}