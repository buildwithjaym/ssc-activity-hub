import {
  getActiveEvent,
  getCategories,
  getCandidates,
  getVotingStatus,
  getMyVotes,
} from "./actions";


import VoterPageClient from "@/components/voter/VoterPageClient";



export default async function VoterPage(){


  const event =
    await getActiveEvent();



  if(!event){

    return (

      <main
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#F8F5EF]
        text-[#0F3D2E]
        "
      >

        <p className="font-bold">
          No active voting event available.
        </p>

      </main>

    );

  }






  const categories =
    await getCategories(
      event.id
    );





  const firstCategory =
    categories[0];






  const candidates =
    firstCategory

    ?

    await getCandidates(
      event.id,
      firstCategory.id
    )

    :

    [];







  const voteStatus =
    await getVotingStatus(
      event.id
    );






  const myVotes =
    await getMyVotes(
      event.id
    );







  return (

    <VoterPageClient


      event={event}


      categories={categories}


      initialCandidates={candidates}


      initialCategory={
        firstCategory?.id ?? ""
      }


      voteStatus={voteStatus}


      myVotes={myVotes}


    />

  );

}