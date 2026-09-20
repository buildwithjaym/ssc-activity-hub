"use server";

import { unstable_cache } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";



export const getActiveEvent = unstable_cache(

async()=>{

const supabase =
createPublicClient();


const {data,error} =
await supabase

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

const supabase =
createPublicClient();


const {data,error} =
await supabase

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

message:
"Voting settings unavailable."

};

}



const canVote =
data.status==="open"
&&
data.is_open===true;



return {

...data,

canVote,

message:

canVote

?

"Voting is open."

:

data.status==="paused"

?

"Voting is temporarily paused."

:

"Voting is currently closed."

};


}








export async function getCategories(
eventId:string
){


const cached =
unstable_cache(

async()=>{


const supabase =
createPublicClient();



const {data,error} =
await supabase

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


return cached();


}








export async function getCandidates(
eventId:string,
categoryId:string
){


const cached =
unstable_cache(

async()=>{


const supabase =
createPublicClient();



let query =
supabase

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

query =
query.eq(
"category_id",
categoryId
);

}



const {data,error} =
await query

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



return (data || []).map(candidate=>({

...candidate,

category_name:
candidate.categories?.name || ""

}));


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



return cached();


}








export async function getMyVotes(
eventId:string
){

const supabase =
await createClient();



const {
data:{
user
}
}
=
await supabase.auth.getUser();



if(!user){

return {};

}



const {data:profile}
=
await supabase

.from("profiles")

.select("id")

.eq(
"id",
user.id
)

.single();



if(!profile){

return {};

}



const {data:votes,error}
=
await supabase

.from("votes")

.select(
`
category_id,
candidate_id
`
)

.eq(
"event_id",
eventId
)

.eq(
"voter_id",
profile.id
);



if(error){

console.log(
"Get Votes Error:",
error.message
);

return {};

}



const result:any = {};



(votes || []).forEach(vote=>{


result[vote.category_id]={

voted:true,

candidateId:
vote.candidate_id

};


});


return result;


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


try{


const supabase =
await createClient();



const {
data:{
user
}

}
=
await supabase.auth.getUser();



if(!user){

return {

success:false,

message:"You must login first."

};

}





if(
!categoryId ||
categoryId==="all"
){

return {

success:false,

message:"Invalid category."

};

}






const {
data:settings,
error:settingsError

}
=
await supabase

.from("voting_settings")

.select(
"status,is_open"
)

.eq(
"event_id",
eventId
)

.single();





if(settingsError){

return {

success:false,

message:
"Unable to check voting status."

};

}





if(
settings.status !== "open" ||
settings.is_open !== true

){

return {

success:false,

message:
"Voting is currently closed."

};

}








const {
data:profile,
error:profileError

}
=
await supabase

.from("profiles")

.select("id")

.eq(
"id",
user.id
)

.single();





if(
profileError ||
!profile
){

return {

success:false,

message:
"Voter profile not found."

};

}







// CHECK EXISTING VOTE FIRST

const {
data:existingVote,
error:existingError

}
=
await supabase

.from("votes")

.select(
"id"
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
"voter_id",
profile.id
)

.maybeSingle();





if(existingError){

console.log(
"Existing Vote Check Error:",
existingError
);

return {

success:false,

message:
"Unable to verify previous vote."

};

}





if(existingVote){

return {

success:false,

message:
"You already voted in this category."

};

}








const {
data:candidate,
error:candidateError

}
=
await supabase

.from("candidates")

.select(
"id,category_id"
)

.eq(
"id",
candidateId
)

.single();







if(
candidateError ||
!candidate
){

return {

success:false,

message:
"Candidate not found."

};

}







if(
candidate.category_id !== categoryId

){

return {

success:false,

message:
"Invalid candidate category."

};

}








const {
error:voteError

}
=
await supabase

.from("votes")

.insert({

event_id:eventId,

category_id:categoryId,

candidate_id:candidateId,

voter_id:profile.id

});







if(voteError){


console.log(
"Vote Insert Error:",
voteError
);



if(
voteError.code==="23505"

){

return {

success:false,

message:
"You already voted in this category."

};

}



return {

success:false,

message:
"Unable to submit vote."

};


}








return {

success:true,

message:
"Vote submitted successfully."

};


}



catch(error:any){


console.log(
"Submit Vote Crash:",
error
);


return {

success:false,

message:
"Server error while submitting vote."

};


}


}