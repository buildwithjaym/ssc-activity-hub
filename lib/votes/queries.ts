"use server";

import { createClient } from "@/lib/supabase/server";


export async function getVoteDashboard(){

  const supabase = await createClient();


  const { count: totalVotes } =
  await supabase
  .from("votes")
  .select(
    "id",
    {
      count:"exact",
      head:true,
    }
  );


  const {
    data:voters
  } =
  await supabase
  .from("votes")
  .select("voter_id");


  const uniqueVoters =
  new Set(
    voters?.map(
      item=>item.voter_id
    )
  );


  const {
    count:totalCategories
  } =
  await supabase
  .from("categories")
  .select(
    "id",
    {
      count:"exact",
      head:true,
    }
  );


  return {

    totalVotes:
    totalVotes ?? 0,


    totalVoters:
    uniqueVoters.size,


    totalCategories:
    totalCategories ?? 0,

  };

}




export async function getTotalVoters(){

  const supabase =
  await createClient();


  const {
    count,
    error
  } =
  await supabase
  .from("profiles")
  .select(
    "id",
    {
      count:"exact",
      head:true,
    }
  )
  .eq(
    "role",
    "voter"
  );


  if(error){

    console.log(
      error.message
    );

    return 0;

  }


  return count ?? 0;

}




export async function getVotingSettings(){

  const supabase =
  await createClient();


  const {
    data,
    error
  } =
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




export async function getVoteCategories(
eventId?:string
){

  const supabase =
  await createClient();


  let query =
  supabase
  .from("categories")
  .select(
    `
    id,
    event_id,
    name
    `
  )
  .order(
    "name",
    {
      ascending:true
    }
  );


  if(eventId){

    query =
    query.eq(
      "event_id",
      eventId
    );

  }


  const {
    data,
    error
  } =
  await query;


  if(error){

    throw new Error(
      error.message
    );

  }


  return data ?? [];

}




export async function getVotingResults(
categoryId?:string
){

  const supabase =
  await createClient();


  const {
    data,
    error
  } =
  await supabase
  .from("votes")
  .select(
    `
    id,

    candidate:candidate_id(
      id,
      candidate_number,
      full_name,
      image_url,
      college
    ),

    category:category_id(
      id,
      name
    )
    `
  );


  if(error){

    throw new Error(
      error.message
    );

  }


  const filtered =
  categoryId

  ?

  (data ?? [])
  .filter(
    (vote:any)=>
    vote.category?.id === categoryId
  )

  :

  (data ?? []);



  const results:any = {};



  filtered.forEach(
    (vote:any)=>{


      const id =
      vote.candidate?.id;


      if(!id)
      return;



      if(!results[id]){


        results[id]={

          candidate:
          vote.candidate,

          category:
          vote.category,

          votes:0

        };


      }


      results[id].votes++;


    }
  );



  return Object.values(results)
  .sort(
    (a:any,b:any)=>
    b.votes-a.votes
  )
  .map(
    (item:any,index)=>({

      ...item,

      rank:index+1

    })
  );

}




export async function getLeaderboard(
eventId:string,
categoryId?:string
){

  const supabase =
  await createClient();


  let query =
  supabase
  .from("votes")
  .select(
    `
    candidate_id,

    category_id,

    candidate:candidate_id(
      id,
      candidate_number,
      full_name,
      image_url,
      college
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


  if(categoryId){

    query =
    query.eq(
      "category_id",
      categoryId
    );

  }



  const {
    data,
    error
  } =
  await query;



  if(error){

    console.log(
      error.message
    );

    return [];

  }



  const results:any = {};



  (data ?? [])
  .forEach(
    (vote:any)=>{


      const id =
      vote.candidate_id;



      if(!results[id]){


        results[id]={

          candidateId:id,

          candidateName:
          vote.candidate.full_name,


          candidateNumber:
          vote.candidate.candidate_number,


          categoryId:
          vote.category_id,


          categoryName:
          vote.category.name,


          imageUrl:
          vote.candidate.image_url,


          college:
          vote.candidate.college,


          votes:0

        };


      }



      results[id].votes++;


    }
  );



  const totalVoters =
  await getTotalVoters();



  return Object.values(results)

  .sort(
    (a:any,b:any)=>
    b.votes-a.votes
  )

  .map(
    (item:any,index)=>({

      ...item,

      rank:index+1,

      percentage:
      totalVoters === 0

      ?

      0

      :

      Number(
        (
          item.votes /
          totalVoters *
          100
        )
        .toFixed(2)
      ),

      totalVoters

    })
  );

}




export async function getRecentVotes(){

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
    ),

    voter:voter_id(
      full_name
    )

    `
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