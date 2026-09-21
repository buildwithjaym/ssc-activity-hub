"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";


import {
  Vote,
  Users,
  Layers,
  RefreshCcw,
  Clock,
  Trophy,
} from "lucide-react";


import {
  toast,
} from "sonner";


import {
  createClient,
} from "@/lib/supabase/client";


import {
  getVotingResults,
} from "@/lib/votes/queries";


import WinnerExport from "@/components/export/winner-export";


import {
  LeaderboardPodium,
} from "@/components/ui/leaderboard-podium";



interface Props {

dashboard:any;

settings:any|null;

results:any[];

recentVotes:any[];

eventId:string;

categories:any[];

totalVoters:number;

}



export default function VotesClient({

dashboard,

settings,

results,

recentVotes,

eventId,

categories,

totalVoters,

}:Props){



const supabase =
useMemo(
()=>createClient(),
[]);



const [fullResults,setFullResults]
=
useState(results || []);



const [loading,setLoading]
=
useState(false);



const [selectedCategory,setSelectedCategory]
=
useState("");





const leaderboard =
useMemo(()=>{


const filtered =

selectedCategory

?

fullResults.filter(
(item:any)=>
item.category?.id === selectedCategory
)

:

fullResults;



if(!filtered.length){

return [];

}





const totalVotes =

filtered.reduce(

(sum:number,item:any)=>

sum + (item.votes ?? 0),

0

);







return filtered

.map(

(item:any)=>({



candidateId:
item.candidate.id,


candidateName:
item.candidate.full_name,


candidateNumber:
item.candidate.candidate_number,


categoryId:
item.category.id,


categoryName:
item.category.name,


imageUrl:
item.candidate.image_url,


votes:
item.votes ?? 0,



percentage:

totalVotes > 0

?

Number(

(
(item.votes / totalVotes)

*

100

).toFixed(1)

)

:

0,



}))


.sort(

(a:any,b:any)=>

b.votes-a.votes

)


.map(

(item:any,index:number,arr:any[])=>{


const previous =
arr[index-1];


let rank =
index + 1;



if(
previous &&
previous.votes === item.votes
){

rank =
previous.rank;

}



return {

...item,

rank

};


});



},[
fullResults,
selectedCategory
]);









const exportData =

useMemo(()=>{


return leaderboard.map(
(item:any)=>({


rank:item.rank,


candidateName:
item.candidateName,


categoryName:
item.categoryName,


votes:
item.votes,


percentage:
item.percentage+"%"


})

);


},[
leaderboard
]);









async function refreshResults(){


try{


setLoading(true);



const updated =
await getVotingResults();



setFullResults(
updated || []
);



toast.success(
"Leaderboard updated"
);



}

catch(error:any){


toast.error(
error.message
);


}

finally{


setLoading(false);


}


}









useEffect(()=>{


const channel =

supabase

.channel(
`votes-live-${eventId}`
)


.on(

"postgres_changes",

{

event:"INSERT",

schema:"public",

table:"votes",

filter:
`event_id=eq.${eventId}`

},


()=>{


toast.success(
"New vote received"
);


refreshResults();



}

)


.subscribe();





return ()=>{


supabase.removeChannel(
channel
);


};


},[
eventId,
supabase
]);









return (

<div
className="
space-y-8
"
>


<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

>


<p
className="
text-xs
font-bold
uppercase
tracking-[0.3em]
text-[#D4AF37]
"
>

PARAGEYAN 2026

</p>



<h1
className="
mt-3
text-3xl
font-bold
text-[#0A2A1F]
"
>

Voting Monitoring

</h1>



<p
className="
text-slate-500
"
>

Monitor People's Choice Award voting activity.

</p>


</motion.div>









<div
className="
grid
gap-5
md:grid-cols-3
"
>


<StatsCard

title="Total Votes"

value={
dashboard?.totalVotes ?? 0
}

icon={Vote}

/>



<StatsCard

title="Registered Voters"

value={
totalVoters
}

icon={Users}

/>



<StatsCard

title="Categories"

value={
dashboard?.totalCategories ?? 0
}

icon={Layers}

/>



</div>









<div
className="
rounded-3xl
border
bg-white
p-8
"
>



<div
className="
mb-8
flex
items-center
justify-between
"
>


<div
className="
flex
items-center
gap-3
"
>


<Trophy
className="
text-[#D4AF37]
"
/>



<h2
className="
text-xl
font-bold
text-[#0A2A1F]
"
>

Leaderboard

</h2>



</div>







<div
className="
flex
gap-3
"
>


<WinnerExport

eventName="PARAGEYAN 2026"

winners={exportData}

/>





<select

value={selectedCategory}

onChange={(e)=>

setSelectedCategory(
e.target.value
)

}

className="
rounded-xl
border
px-4
py-2
font-semibold
"

>


<option value="">

All Categories

</option>



{
categories.map(
(category:any)=>(


<option

key={category.id}

value={category.id}

>

{category.name}

</option>


)

)

}


</select>



</div>



</div>







<LeaderboardPodium

rankings={leaderboard}

categories={categories}

selectedCategory={selectedCategory}

setSelectedCategory={
setSelectedCategory
}

/>




</div>









<div
className="
rounded-3xl
border
bg-white
p-6
"
>



<div
className="
flex
justify-between
"
>


<h2
className="
text-xl
font-bold
"
>

Live Results

</h2>



<button

onClick={refreshResults}

disabled={loading}

className="
flex
gap-2
rounded-xl
bg-[#0A2A1F]
px-4
py-2
text-white
"

>


<RefreshCcw

size={16}

className={
loading
?
"animate-spin"
:
""
}

/>


Refresh


</button>


</div>







<table
className="
mt-5
w-full
"
>



<thead
className="
bg-[#0A2A1F]
text-white
"
>


<tr>


<th className="p-4 text-left">

Rank

</th>


<th className="p-4 text-left">

Candidate

</th>


<th className="p-4 text-left">

Category

</th>


<th className="p-4 text-left">

Votes

</th>


<th className="p-4 text-left">

Share

</th>


</tr>


</thead>





<tbody>


{
leaderboard.map(
(item:any)=>(


<tr

key={item.candidateId}

className="
border-b
"

>


<td className="p-4">

#{item.rank}

</td>



<td className="
p-4
font-semibold
">

#{item.candidateNumber}

{" "}

{item.candidateName}

</td>



<td className="p-4">

{item.categoryName}

</td>



<td className="
p-4
font-bold
">

{item.votes}

</td>



<td className="p-4">

{item.percentage}%

</td>



</tr>


)

)

}



</tbody>



</table>




</div>









<div
className="
rounded-3xl
border
bg-white
p-6
"
>


<h2
className="
text-xl
font-bold
"
>

Recent Votes

</h2>




<div
className="
mt-5
space-y-4
"
>


{
recentVotes.map(
(vote:any)=>(


<div

key={vote.id}

className="
flex
justify-between
border-b
pb-3
"

>


<div>


<p className="font-semibold">

{vote.candidate?.full_name}

</p>



<p className="
text-sm
text-slate-500
">

{vote.category?.name}

</p>



</div>




<div
className="
flex
items-center
gap-2
text-sm
text-slate-500
"
>


<Clock size={15}/>



{
new Date(
vote.created_at
)
.toLocaleTimeString()
}



</div>



</div>



)

)

}



</div>



</div>







</div>

);


}









function StatsCard({
title,
value,
icon:Icon
}:any){


return (

<div
className="
rounded-3xl
border
bg-white
p-5
"
>


<div
className="
rounded-2xl
bg-[#0A2A1F]
p-3
w-fit
"
>


<Icon

size={20}

className="
text-[#D4AF37]
"

/>


</div>



<p className="
mt-4
text-sm
text-slate-500
">

{title}

</p>



<h2
className="
text-3xl
font-bold
text-[#0A2A1F]
"
>

{value}

</h2>



</div>

);


}