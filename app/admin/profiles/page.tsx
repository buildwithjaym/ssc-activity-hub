import { createClient } from "@/lib/supabase/server";

import ProfileClient from "./profile-client";


const PAGE_SIZE = 25;



export default async function ProfilesPage(){


const supabase =
await createClient();



const {

data,

count,

error

}=await supabase

.from("profiles")

.select(
"*",
{
count:"exact"
}
)

.order(
"created_at",
{
ascending:false
}
)

.range(
0,
PAGE_SIZE - 1
);





if(error){

throw new Error(
error.message
);

}





return (

<ProfileClient

initialProfiles={
data ?? []
}

totalCount={
count ?? 0
}

pageSize={
PAGE_SIZE
}

/>

);


}