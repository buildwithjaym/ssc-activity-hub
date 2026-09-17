"use server";


import {
  createClient
} from "@/lib/supabase/server";


import {
  revalidatePath
} from "next/cache";





export async function openVoting(
  eventId:string,
  startTime:string,
  endTime:string
){


const supabase =
await createClient();



const {
error
}=await supabase

.from("voting_settings")

.upsert({

event_id:eventId,

start_time:startTime,

end_time:endTime,

is_open:true,

updated_at:new Date().toISOString()

});




if(error){

throw new Error(
error.message
);

}




revalidatePath(
"/admin/votes"
);



}








export async function closeVoting(
eventId:string
){


const supabase =
await createClient();



const {
error
}=await supabase

.from("voting_settings")

.update({

is_open:false,

updated_at:new Date().toISOString()

})

.eq(
"event_id",
eventId
);




if(error){

throw new Error(
error.message
);

}




revalidatePath(
"/admin/votes"
);



}








export async function updateVotingSchedule(
eventId:string,
startTime:string,
endTime:string
){


const supabase =
await createClient();



const {
error
}=await supabase

.from("voting_settings")

.update({

start_time:startTime,

end_time:endTime,

updated_at:new Date().toISOString()

})

.eq(
"event_id",
eventId
);





if(error){

throw new Error(
error.message
);

}





revalidatePath(
"/admin/votes"
);



}