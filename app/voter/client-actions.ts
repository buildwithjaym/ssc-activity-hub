"use server";

import { createPublicClient } from "@/lib/supabase/public";


export async function fetchCandidates(
  eventId:string,
  categoryId:string
){

  const supabase = createPublicClient();


  let query = supabase

    .from("candidates")

    .select(
      `
      *,
      categories(
        name
      )
      `
    )

    .eq(
      "event_id",
      eventId
    )

    .eq(
      "status",
      "active"
    );



  if(categoryId !== "all"){

    query = query.eq(
      "category_id",
      categoryId
    );

  }



  const {
    data,
    error
  } = await query

    .order(
      "candidate_number",
      {
        ascending:true
      }
    );



  if(error){

    console.log(
      "Fetch Candidates Error:",
      error.message
    );

    return [];

  }




  const uniqueCandidates =
    Array.from(

      new Map(

        (data || [])
        .map(candidate=>[
          candidate.id,
          candidate
        ])

      ).values()

    );




  return uniqueCandidates.map(
    candidate=>({

      ...candidate,

      category_name:
        candidate.categories?.name || ""

    })
  );


}