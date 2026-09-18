import { createClient } from "@/lib/supabase/server";

import VotingSettingsClient 
from "./voting-settings-client";


export default async function VotingSettingsPage(){

const supabase =
await createClient();



const {data:events,error}=await supabase

.from("events")

.select(`
id,
name,
school_name,
year,
status
`)

.order(
"created_at",
{
ascending:false
}
);



if(error){

throw new Error(error.message);

}



const firstEvent =
events?.[0] ?? null;



let initialSettings=null;



if(firstEvent){


const {data}=await supabase

.from("voting_settings")

.select("*")

.eq(
"event_id",
firstEvent.id
)

.maybeSingle();



initialSettings=data;

}



return (

<VotingSettingsClient

events={events ?? []}

initialEvent={firstEvent}

initialSettings={initialSettings}

/>

);

}