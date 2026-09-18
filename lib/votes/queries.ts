"use server";

import {
  createClient,
} from "@/lib/supabase/server";


/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

export async function getVoteDashboard() {

  const supabase =
    await createClient();


  const {
    count: totalVotes,
  } = await supabase
    .from("votes")
    .select(
      "id",
      {
        count: "exact",
        head: true,
      },
    );


  const {
    data: voterData,
  } = await supabase
    .from("votes")
    .select("voter_id");


  const uniqueVoters =
    new Set(
      voterData?.map(
        (item) =>
          item.voter_id,
      ),
    );


  const {
    count: totalCategories,
  } = await supabase
    .from("categories")
    .select(
      "id",
      {
        count: "exact",
        head: true,
      },
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


/*
|--------------------------------------------------------------------------
| VOTING SETTINGS
|--------------------------------------------------------------------------
*/

export async function getVotingSettings() {

  const supabase =
    await createClient();


  const {
    data,
    error,
  } = await supabase
    .from("voting_settings")
    .select("*")
    .order(
      "created_at",
      {
        ascending: false,
      },
    )
    .limit(1)
    .maybeSingle();


  if (error) {
    throw new Error(
      error.message,
    );
  }


  return data ?? null;

}


/*
|--------------------------------------------------------------------------
| CATEGORIES
|--------------------------------------------------------------------------
*/

export async function getVoteCategories(
  eventId?: string,
) {

  const supabase =
    await createClient();


  let query =
    supabase
      .from("categories")
      .select(`
        id,
        event_id,
        name
      `)
      .order(
        "name",
        {
          ascending: true,
        },
      );


  if (eventId) {

    query =
      query.eq(
        "event_id",
        eventId,
      );

  }


  const {
    data,
    error,
  } = await query;


  if (error) {
    throw new Error(
      error.message,
    );
  }


  return data ?? [];

}


/*
|--------------------------------------------------------------------------
| VOTING RESULTS
|--------------------------------------------------------------------------
*/

export async function getVotingResults(
  categoryId?: string,
) {

  const supabase =
    await createClient();


  const {
    data,
    error,
  } = await supabase
    .from("votes")
    .select(`
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
    `);


  if (error) {
    throw new Error(
      error.message,
    );
  }


  /*
   * Filter by category when selected.
   * Empty/undefined category means all categories.
   */

  const filteredData =
    categoryId
      ? (data ?? []).filter(
          (vote: any) =>
            vote.category?.id ===
            categoryId,
        )
      : data ?? [];


  /*
   * Group votes by candidate.
   */

  const groupedResults:
    Record<string, any> = {};


  filteredData.forEach(
    (vote: any) => {

      const candidateId =
        vote.candidate?.id;


      if (!candidateId) {
        return;
      }


      if (
        !groupedResults[
          candidateId
        ]
      ) {

        groupedResults[
          candidateId
        ] = {

          candidate:
            vote.candidate,

          category:
            vote.category,

          votes: 0,

        };

      }


      groupedResults[
        candidateId
      ].votes++;

    },
  );


  /*
   * Sort highest votes first
   * and generate fresh ranking.
   */

  return Object
    .values(
      groupedResults,
    )
    .sort(
      (a: any, b: any) =>
        b.votes -
        a.votes,
    )
    .map(
      (
        item: any,
        index: number,
      ) => ({

        ...item,

        rank:
          index + 1,

      }),
    );

}


/*
|--------------------------------------------------------------------------
| RECENT VOTES
|--------------------------------------------------------------------------
*/

export async function getRecentVotes() {

  const supabase =
    await createClient();


  const {
    data,
    error,
  } = await supabase
    .from("votes")
    .select(`
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
    `)
    .order(
      "created_at",
      {
        ascending: false,
      },
    )
    .limit(10);


  if (error) {
    throw new Error(
      error.message,
    );
  }


  return data ?? [];

}