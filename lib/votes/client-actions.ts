"use client";

import { createClient } from "@/lib/supabase/client";


export async function getLiveVotingResults(){

const supabase = createClient();


const {
data,
error
}=await supabase

.from("votes")

.select(`

id,

candidate:candidate_id(

id,

candidate_number,

full_name,

image_url,

college

),

category:category_id(

id,

name

)

`);


if(error){

throw new Error(error.message);

}


const grouped:any={};


data?.forEach((vote:any)=>{


const key = vote.candidate.id;


if(!grouped[key]){

grouped[key]={

candidate:vote.candidate,

category:vote.category,

votes:0

};

}


grouped[key].votes++;


});


return Object.values(grouped)

.sort(
(a:any,b:any)=>b.votes-a.votes
)

.map(
(item:any,index)=>({

...item,

rank:index+1

})
);


}