"use client";

import { createClient } from "@/lib/supabase/client";


export async function getLiveVotingResults(
  eventId:string
){

  const supabase = createClient();



  const {
    data,
    error
  } = await supabase

  .from("candidate_rankings")

  .select(`
      id,
      full_name,
      image_url,
      category_id,
      total_votes,

      categories(
        id,
        name
      )
  `);



  if(error){

    throw new Error(
      error.message
    );

  }



  const results =

  (data ?? [])

  .map(
    (
      item:any,
      index:number
    )=>({

      candidateId:
        item.id,


      candidateName:
        item.full_name,


      imageUrl:
        item.image_url,


      categoryId:
        item.category_id,


      categoryName:
        item.categories?.name 
        ??
        "Unknown",


      votes:
        item.total_votes ?? 0,


      rank:
        index + 1,


      percentage:0

    })
  )

  .sort(
    (
      a:any,
      b:any
    )=>

      b.votes - a.votes

  );





  const totalVotes =

    results.reduce(
      (
        sum:number,
        item:any
      )=>

        sum + item.votes,

      0
    );





  return results.map(
    (
      item:any,
      index:number
    )=>({

      ...item,


      rank:
        index + 1,


      percentage:

        totalVotes > 0

        ?

        Number(
          (
            item.votes /
            totalVotes *
            100
          )
          .toFixed(1)
        )

        :

        0

    })
  );


}