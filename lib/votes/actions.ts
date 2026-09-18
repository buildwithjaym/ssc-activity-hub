"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";


export async function updateVotingStatus(
  eventId:string,
  status:"open"|"paused"|"closed"
){

const supabase = await createClient();


const {error}=await supabase
.from("voting_settings")
.update({

status,

is_open:
status === "open",

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
"/admin/votes"
);


return {
success:true
};

}