import {
  getVoteDashboard,
  getVotingSettings,
  getVotingResults,
  getRecentVotes,
  getVoteCategories,
  getTotalVoters,
} from "@/lib/votes/queries";


import VotesClient from "@/components/votes/votes-client";



export default async function VotesPage(){



const settings =
await getVotingSettings();



const eventId =
settings?.event_id ?? "";



if(!eventId){

return (

<div className="p-10 text-center">

No active voting event found.

</div>

);

}




const [

dashboard,

results,

recentVotes,

categories,

totalVoters,

]=await Promise.all([



getVoteDashboard(
eventId
),



getVotingResults(
eventId
),



getRecentVotes(
eventId
),



getVoteCategories(
eventId
),



getTotalVoters(),



]);





return (

<VotesClient

dashboard={dashboard}

settings={settings}

results={results}

recentVotes={recentVotes}

eventId={eventId}

categories={categories}

totalVoters={totalVoters}

/>

);

}