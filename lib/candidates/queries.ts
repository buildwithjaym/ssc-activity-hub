import { createClient } from "@/lib/supabase/server";


export async function getCandidates(){

const supabase = await createClient();


const {
data,
error
}=await supabase

.from("candidates")

.select(`

*,

events(
id,
name,
year
),

categories(
id,
name
)

`)

.order(
"candidate_number",
{
ascending:true
}
);



if(error){

throw new Error(
error.message
);

}


return data ?? [];

}





export async function getEvents(){

const supabase = await createClient();


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

throw new Error(
error.message
);

}


return data ?? [];

}





export async function getCategories(){

const supabase = await createClient();


const {
data,
error
}=await supabase

.from("categories")

.select("*")

.order(
"name",
{
ascending:true
}
);



if(error){

throw new Error(
error.message
);

}


return data ?? [];

}