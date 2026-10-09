"use server";


import { createClient }
from "@/lib/supabase/server";





export async function getVotingSettings(){


  const supabase =
    await createClient();



  const {
    data,
    error
  }
  =
  await supabase

  .from("voting_settings")

  .select("*")

  .order(
    "created_at",
    {
      ascending:false
    }
  )

  .limit(1)

  .maybeSingle();




  if(error){

    throw new Error(
      error.message
    );

  }




  return data ?? null;


}







export async function getVoteDashboard(
  eventId:string
){


  const supabase =
    await createClient();




  const {
    count:totalVotes
  }
  =
  await supabase

  .from("votes")

  .select(
    "id",
    {
      count:"exact",
      head:true
    }
  )

  .eq(
    "event_id",
    eventId
  );






  const {
    data:voters
  }
  =
  await supabase

  .from("votes")

  .select(
    "voter_id"
  )

  .eq(
    "event_id",
    eventId
  );





  const totalVoters =
    new Set(
      voters?.map(
        item=>item.voter_id
      )
    )
    .size;





  const {
    count:totalCategories
  }
  =
  await supabase

  .from("categories")

  .select(
    "id",
    {
      count:"exact",
      head:true
    }
  )

  .eq(
    "event_id",
    eventId
  );






  return {


    totalVotes:
      totalVotes ?? 0,


    totalVoters,


    totalCategories:
      totalCategories ?? 0


  };

}








export async function getTotalVoters(){


  const supabase =
    await createClient();




  const {
    count,
    error
  }
  =
  await supabase

  .from("profiles")

  .select(
    "id",
    {
      count:"exact",
      head:true
    }
  )

  .eq(
    "role",
    "voter"
  );





  if(error){

    return 0;

  }





  return count ?? 0;


}








export async function getVoteCategories(
eventId:string
){


  const supabase =
    await createClient();



  const {
    data,
    error
  }
  =
  await supabase

  .from("categories")

  .select(
`
id,
event_id,
name
`
  )

  .eq(
    "event_id",
    eventId
  )

  .order(
    "name"
  );





  if(error){

    throw new Error(
      error.message
    );

  }



  return data ?? [];

}








export async function getVotingResults(
eventId:string
){


  const supabase =
    await createClient();




  const {
    data,
    error
  }
  =
  await supabase

  .from("votes")

  .select(
`
candidate:candidate_id(
id,
candidate_number,
full_name,
image_url
),

category:category_id(
id,
name
)

`
  )

  .eq(
    "event_id",
    eventId
  );






  if(error){

    throw new Error(
      error.message
    );

  }





  const grouped:any={};





  (data ?? [])
  .forEach(
    (vote:any)=>{


      const key =
      `${vote.category.id}-${vote.candidate.id}`;



      if(!grouped[key]){


        grouped[key]={


          candidateId:
          vote.candidate.id,


          candidateName:
          vote.candidate.full_name,


          candidateNumber:
          vote.candidate.candidate_number,


          categoryId:
          vote.category.id,


          categoryName:
          vote.category.name,


          imageUrl:
          vote.candidate.image_url,


          votes:0


        };


      }




      grouped[key].votes++;



    }
  );






  return Object.values(grouped)

  .sort(
    (
      a:any,
      b:any
    )=>
      b.votes-a.votes
  );



}








export async function getRecentVotes(
eventId:string
){


  const supabase =
    await createClient();



  const {
    data,
    error
  }
  =
  await supabase

  .from("votes")

  .select(
`
id,
created_at,

candidate:candidate_id(
full_name
),

category:category_id(
name
)

`
  )

  .eq(
    "event_id",
    eventId
  )

  .order(
    "created_at",
    {
      ascending:false
    }
  )

  .limit(10);





  if(error){

    throw new Error(
      error.message
    );

  }




  return data ?? [];

}