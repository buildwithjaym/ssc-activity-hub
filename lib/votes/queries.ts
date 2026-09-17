import {
createClient
} from "@/lib/supabase/server";



export async function getVoteDashboard(){


const supabase =
await createClient();



const {

count:totalVotes

}=await supabase

.from("votes")

.select(
"id",
{
count:"exact",
head:true
}
);




const {

data:voterData

}=await supabase

.from("votes")

.select(
"voter_id"
);



const uniqueVoters =
new Set(
voterData?.map(
(item)=>item.voter_id
)
);





const {

count:totalCategories

}=await supabase

.from("categories")

.select(
"id",
{
count:"exact",
head:true
}
);





return {

totalVotes:
totalVotes ?? 0,


totalVoters:
uniqueVoters.size,


totalCategories:
totalCategories ?? 0

};


}








export async function getVotingSettings(){


const supabase =
await createClient();



const {
data
}=await supabase

.from("voting_settings")

.select("*")

.order(
"created_at",
{
ascending:false
}
)

.limit(1)

.maybeSingle();



return data ?? null;


}








export async function getVotingResults(){


const supabase =
await createClient();



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

console.log(error.message);

return [];

}





const results:any={};





data?.forEach(
(vote:any)=>{


const key =
vote.candidate.id;




if(!results[key]){


results[key]={

candidate:
vote.candidate,


category:
vote.category,


votes:0

};


}



results[key].votes++;


}

);





return Object.values(results)

.sort(
(a:any,b:any)=>
b.votes-a.votes
)

.map(
(item:any,index)=>({

...item,

rank:index+1


})
);


}









export async function getRecentVotes(){


const supabase =
await createClient();



const {
data
}=await supabase

.from("votes")

.select(`

id,

created_at,


candidate:candidate_id(

full_name

),


category:category_id(

name

),


voter:voter_id(

full_name

)


`)

.order(
"created_at",
{
ascending:false
}
)

.limit(10);



return data ?? [];


}