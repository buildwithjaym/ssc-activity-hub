import {
createClient
}
from "@/lib/supabase/server";



export async function getEvents(){

const supabase =
await createClient();


const {
data,
error

}=await supabase

.from("events")

.select("*")

.order(
"created_at",
{
ascending:false
}
);


if(error){

console.log(error.message);

return [];

}


return data ?? [];

}




export async function getVotingSettingByEvent(
eventId:string
){

const supabase =
await createClient();


const {
data,
error

}=await supabase

.from("voting_settings")

.select(`
*,

event:event_id(
id,
name,
year
)

`)

.eq(
"event_id",
eventId
)

.maybeSingle();



if(error){

console.log(error.message);

return null;

}


return data;


}