"use server";

import { createClient } from "@/lib/supabase/server";

import { revalidatePath } from "next/cache";


type ActionResponse = {
  success: boolean;
  message?: string;
};


export async function createCandidate(
  data:any
):Promise<ActionResponse>{

  const supabase = await createClient();


  const {
    data:existing,
    error:checkError
  } = await supabase

  .from("candidates")

  .select("id")

  .eq(
    "event_id",
    data.event_id
  )

  .eq(
    "category_id",
    data.category_id
  )

  .eq(
    "candidate_number",
    Number(data.candidate_number)
  )

  .maybeSingle();



  if(checkError){

    return {
      success:false,
      message:checkError.message
    };

  }



  if(existing){

    return {
      success:false,
      message:"Candidate number already exists in this category."
    };

  }



  const {
    error
  } = await supabase

  .from("candidates")

  .insert({

    event_id:data.event_id,

    category_id:data.category_id,

    candidate_number:Number(
      data.candidate_number
    ),

    full_name:data.full_name,

    college:data.college || null,

    year_level:data.year_level || null,

    bio:data.bio || null,

    image_url:data.image_url || null,

    status:"active"

  });



  if(error){

    if(error.code==="23505"){

      return {
        success:false,
        message:"Candidate number already exists in this category."
      };

    }


    return {
      success:false,
      message:error.message
    };

  }



  revalidatePath(
    "/admin/candidates"
  );


  return {
    success:true,
    message:"Candidate created successfully."
  };

}





export async function updateCandidate(
  id:string,
  data:any
):Promise<ActionResponse>{


  const supabase = await createClient();



  const {
    data:existing,
    error:checkError
  } = await supabase

  .from("candidates")

  .select("id")

  .eq(
    "event_id",
    data.event_id
  )

  .eq(
    "category_id",
    data.category_id
  )

  .eq(
    "candidate_number",
    Number(data.candidate_number)
  )

  .neq(
    "id",
    id
  )

  .maybeSingle();



  if(checkError){

    return {
      success:false,
      message:checkError.message
    };

  }



  if(existing){

    return {
      success:false,
      message:"Candidate number already exists in this category."
    };

  }




  const {
    error
  } = await supabase

  .from("candidates")

  .update({

    event_id:data.event_id,

    category_id:data.category_id,

    candidate_number:Number(
      data.candidate_number
    ),

    full_name:data.full_name,

    college:data.college || null,

    year_level:data.year_level || null,

    bio:data.bio || null,

    image_url:data.image_url || null,

    status:data.status || "active",

    updated_at:new Date().toISOString()

  })

  .eq(
    "id",
    id
  );



  if(error){

    if(error.code==="23505"){

      return {
        success:false,
        message:"Candidate number already exists in this category."
      };

    }


    return {
      success:false,
      message:error.message
    };

  }



  revalidatePath(
    "/admin/candidates"
  );


  return {
    success:true,
    message:"Candidate updated successfully."
  };

}






export async function toggleCandidateStatus(
  id:string,
  status:"active"|"inactive"
):Promise<ActionResponse>{


  const supabase = await createClient();



  const {
    error
  } = await supabase

  .from("candidates")

  .update({

    status,

    updated_at:new Date().toISOString()

  })

  .eq(
    "id",
    id
  );



  if(error){

    return {
      success:false,
      message:error.message
    };

  }



  revalidatePath(
    "/admin/candidates"
  );



  return {
    success:true,
    message:`Candidate ${status}.`
  };

}






export async function deleteCandidate(
  id:string
):Promise<ActionResponse>{


  const supabase = await createClient();



  const {
    error
  } = await supabase

  .from("candidates")

  .delete()

  .eq(
    "id",
    id
  );



  if(error){

    return {
      success:false,
      message:error.message
    };

  }



  revalidatePath(
    "/admin/candidates"
  );



  return {
    success:true,
    message:"Candidate deleted successfully."
  };

}