"use server";

import { unstable_cache } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";



export const getActiveEvent = unstable_cache(

  async()=>{

    const supabase = createPublicClient();


    const {data,error}=await supabase

      .from("events")

      .select("*")

      .eq(
        "status",
        "active"
      )

      .single();



    if(error){

      console.log(
        "Active Event Error:",
        error.message
      );

      return null;

    }


    return data;


  },


  [
    "active-event"
  ],


  {
    revalidate:60,

    tags:[
      "events"
    ]
  }

);






export async function getVotingStatus(
  eventId:string
){


  const supabase = await createClient();



  const {data,error}=await supabase

    .from("voting_settings")

    .select(
      `
      status,
      is_open,
      start_time,
      end_time
      `
    )

    .eq(
      "event_id",
      eventId
    )

    .single();




  if(error){

    return {

      status:"closed",

      is_open:false,

      canVote:false,

      message:"Voting settings unavailable."

    };

  }




  const canVote =
    data.status === "open" &&
    data.is_open === true;




  return {

    status:data.status,

    is_open:data.is_open,

    start_time:data.start_time,

    end_time:data.end_time,

    canVote,

    message:

      canVote

      ?

      "Voting is open."

      :

      data.status === "paused"

      ?

      "Voting is temporarily paused."

      :

      "Voting is currently closed."

  };


}








export async function getCategories(
  eventId:string
){


  const cachedCategories = unstable_cache(


    async()=>{


      const supabase = createPublicClient();



      const {data,error}=await supabase

        .from("categories")

        .select("*")

        .eq(
          "event_id",
          eventId
        )

        .order(
          "created_at",
          {
            ascending:true
          }
        );




      if(error){

        console.log(
          "Categories Error:",
          error.message
        );

        return [];

      }




      return data || [];


    },


    [
      `categories-${eventId}`
    ],


    {

      revalidate:300,

      tags:[
        `categories-${eventId}`
      ]

    }


  );



  return cachedCategories();


}








export async function getCandidates(
  eventId:string,
  categoryId:string
){



  const cachedCandidates = unstable_cache(


    async()=>{


      const supabase = createPublicClient();



      const {data,error}=await supabase

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
          "category_id",
          categoryId
        )

        .eq(
          "status",
          "active"
        )

        .order(
          "candidate_number",
          {
            ascending:true
          }
        );




      if(error){

        console.log(
          "Candidates Error:",
          error.message
        );

        return [];

      }




      return (

        data || []

      ).map(

        candidate=>({

          ...candidate,

          category_name:
            candidate.categories?.name || ""

        })

      );



    },


    [
      `candidates-${eventId}-${categoryId}`
    ],


    {

      revalidate:300,

      tags:[
        `candidates-${eventId}-${categoryId}`
      ]

    }


  );



  return cachedCandidates();


}









export async function submitVote({

  eventId,

  categoryId,

  candidateId,

}:{

  eventId:string;

  categoryId:string;

  candidateId:string;

}){


  const supabase = await createClient();




  const {

    data:{
      user

    }

  } = await supabase.auth.getUser();





  if(!user){

    return {

      success:false,

      message:"You must login first."

    };

  }







  const {data:settings}=await supabase

    .from("voting_settings")

    .select(
      "status,is_open"
    )

    .eq(
      "event_id",
      eventId
    )

    .single();






  if(

    !settings ||

    settings.status !== "open" ||

    settings.is_open !== true

  ){

    return {

      success:false,

      message:"Voting is currently closed."

    };

  }







  const {

    data:profile,

    error:profileError

  } = await supabase

    .from("profiles")

    .select("id")

    .eq(
      "id",
      user.id
    )

    .single();







  if(profileError || !profile){

    return {

      success:false,

      message:"Voter profile not found."

    };

  }








  const {error}=await supabase

    .from("votes")

    .insert({

      event_id:eventId,

      category_id:categoryId,

      candidate_id:candidateId,

      voter_id:profile.id

    });








  if(error){


    console.log(
      "Submit Vote Error:",
      error.message
    );




    if(error.code==="23505"){


      return {

        success:false,

        message:
          "You already voted in this category."

      };


    }





    if(

      error.message.includes(
        "Voting is currently closed"
      )

    ){

      return {

        success:false,

        message:
          "Voting is currently closed."

      };

    }




    return {

      success:false,

      message:error.message

    };


  }







  return {

    success:true,

    message:
      "Vote submitted successfully."

  };


}