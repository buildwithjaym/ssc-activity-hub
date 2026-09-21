"use server";

import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);



export type Candidate = {
  id: string;
  candidate_number: number | null;
  full_name: string;
  college: string | null;
  year_level: string | null;
  bio: string | null;
  image_url: string | null;
  status: string | null;
  category_id: string;
  category_name: string | null;
};



export type Category = {
  id:string;
  name:string;
};





async function fetchActiveEvent(){


const {data,error}=await supabase
.from("events")
.select(
`
id,
name,
school_name,
year
`
)
.eq(
"status",
"active"
)
.order(
"created_at",
{
ascending:false
}
)
.limit(1)
.maybeSingle();



if(error){

console.error(
"fetchActiveEvent:",
error.message
);

return null;

}


return data;


}



export const getActiveEvent = unstable_cache(
fetchActiveEvent,
[
"active-event"
],
{
revalidate:3600
}
);







async function fetchCategories(
eventId:string
){


const {data,error}=await supabase
.from("categories")
.select(
`
id,
name
`
)
.eq(
"event_id",
eventId
)
.order(
"name",
{
ascending:true
}
);



if(error){

console.error(
"fetchCategories:",
error.message
);

return [];

}



return data ?? [];

}



export const getCategories = unstable_cache(
fetchCategories,
[
"categories"
],
{
revalidate:3600
}
);








async function fetchCandidates(
eventId:string
){


const {data,error}=await supabase
.from("candidates")
.select(
`
id,
candidate_number,
full_name,
college,
year_level,
bio,
image_url,
status,
category_id,

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
)
.order(
"candidate_number",
{
ascending:true
}
);



if(error){

console.error(
"fetchCandidates:",
error.message
);

return [];

}



return (data ?? []).map(
(item:any)=>({

id:item.id,

candidate_number:
item.candidate_number,

full_name:
item.full_name,

college:
item.college,

year_level:
item.year_level,

bio:
item.bio,

image_url:
item.image_url,

status:
item.status,

category_id:
item.category_id,

category_name:
item.categories?.name ?? null

})

) as Candidate[];



}




export const getCandidates = unstable_cache(

fetchCandidates,

[
"active-candidates"
],

{
revalidate:3600
}

);