"use server";


import { createClient } from "@/lib/supabase/server";

import { revalidatePath } from "next/cache";





/*
|--------------------------------------------------------------------------
| CREATE VOTING SETTINGS
|--------------------------------------------------------------------------
*/

export async function createVotingSettings(

eventId:string,

startTime:string,

endTime:string

){

if(!eventId){

throw new Error(
"Event ID missing"
);

}


const supabase = await createClient();



const {data:existing}=await supabase

.from("voting_settings")

.select("id")

.eq(
"event_id",
eventId
)

.maybeSingle();



if(existing){

throw new Error(
"Voting configuration already exists for this event"
);

}




const {data,error}=await supabase

.from("voting_settings")

.insert({

event_id:eventId,

start_time:startTime,

end_time:endTime,

status:"closed",

is_open:false

})

.select()

.single();



if(error){

console.log(error);

throw new Error(error.message);

}



revalidatePath(
"/admin/voting-settings"
);


return data;

}


/*
|--------------------------------------------------------------------------
| UPDATE SCHEDULE
|--------------------------------------------------------------------------
*/


export async function updateVotingSchedule(

eventId:string,

startTime:string,

endTime:string

){


if(!eventId){

throw new Error(
"Event ID is missing"
);

}



const supabase =
await createClient();



const {
error

}=await supabase

.from("voting_settings")

.update({

start_time:startTime,

end_time:endTime,

updated_at:
new Date().toISOString()

})

.eq(
"event_id",
eventId
);



if(error){

throw new Error(error.message);

}



revalidatePath(
"/admin/voting-settings"
);


}






/*
|--------------------------------------------------------------------------
| OPEN VOTING
|--------------------------------------------------------------------------
*/


export async function openVoting(

eventId:string

){


if(!eventId){

throw new Error(
"Event ID missing"
);

}



const supabase =
await createClient();



const {
error

}=await supabase

.from("voting_settings")

.update({

status:"open",

is_open:true,

updated_at:
new Date().toISOString()

})

.eq(
"event_id",
eventId
);



if(error){

throw new Error(error.message);

}



revalidatePath(
"/admin/voting-settings"
);


}







/*
|--------------------------------------------------------------------------
| PAUSE VOTING
|--------------------------------------------------------------------------
*/


export async function pauseVoting(

eventId:string

){


if(!eventId){

throw new Error(
"Event ID missing"
);

}



const supabase =
await createClient();



const {
error

}=await supabase

.from("voting_settings")

.update({

status:"paused",

is_open:false,

updated_at:
new Date().toISOString()

})

.eq(
"event_id",
eventId
);



if(error){

throw new Error(error.message);

}



revalidatePath(
"/admin/voting-settings"
);


}







/*
|--------------------------------------------------------------------------
| CLOSE VOTING
|--------------------------------------------------------------------------
*/


export async function closeVoting(

eventId:string

){


if(!eventId){

throw new Error(
"Event ID missing"
);

}



const supabase =
await createClient();



const {
error

}=await supabase

.from("voting_settings")

.update({

status:"closed",

is_open:false,

updated_at:
new Date().toISOString()

})

.eq(
"event_id",
eventId
);



if(error){

throw new Error(error.message);

}



revalidatePath(
"/admin/voting-settings"
);


}



