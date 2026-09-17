import { createClient } from "@/lib/supabase/server";


export async function getAdminProfile() {

  const supabase = await createClient();


  const {
    data:{
      user
    }
  } = await supabase.auth.getUser();



  if(!user){

    return null;

  }



  const {
    data:profile

  } = await supabase

    .from("profiles")

    .select(
      `
      id,
      full_name,
      email,
      avatar_url,
      role
      `
    )

    .eq(
      "id",
      user.id
    )

    .single();



  return profile;

}





export async function getAdminStats(){


const supabase = await createClient();


// Candidates

const {
count:candidatesCount

}=await supabase

.from("candidates")

.select(
"id",
{
count:"exact",
head:true
}

);




// Users

const {
count:votersCount

}=await supabase

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




// Votes

const {
count:votesCount

}=await supabase

.from("votes")

.select(
"id",
{
count:"exact",
head:true
}

);





// Voting status


const {

data:voting

}=await supabase

.from("voting_settings")

.select(
"is_open"
)

.single();




return {


candidates:
candidatesCount ?? 0,


voters:
votersCount ?? 0,


votes:
votesCount ?? 0,


status:
voting?.is_open
?
"OPEN"
:
"CLOSED"



};



}