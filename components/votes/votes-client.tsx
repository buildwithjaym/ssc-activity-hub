"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";
import WinnerExport
from "@/components/export/winner-export";
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


import {
  LeaderboardPodium,
  CandidateRanking,
} from "@/components/ui/leaderboard-podium";



interface Props {

  dashboard:any;

  settings:any | null;

  results:any[];

  recentVotes:any[];

  eventId:string;

  categories:any[];

}




export default function VotesClient({

  dashboard,

  settings,

  results,

  recentVotes,

  eventId,

  categories,

}:Props){



const supabase = useMemo(
()=>createClient(),
[]
);



const [
liveResults,
setLiveResults
]=useState<any[]>(
results ?? []
);



const [
loading,
setLoading
]=useState(false);



const [
selectedCategory,
setSelectedCategory
]=useState("");





/*
LEADERBOARD FORMAT
*/

const leaderboard =
useMemo(()=>{


return liveResults.map(

(item:any,index:number):CandidateRanking=>(

{

candidateId:
item.candidate?.id ??
String(index),


candidateName:
item.candidate?.full_name ??
"Unknown",


candidateNumber:
item.candidate?.candidate_number ??
0,


categoryId:
item.category?.id ??
"",


categoryName:
item.category?.name ??
"Unknown",


votes:
item.votes ??
0,


imageUrl:
item.candidate?.image_url ??
null,


rank:
index+1,


}

)

);


},[
liveResults
]);







/*
LOAD RESULTS
*/
async function refreshResults(
categoryId:string = selectedCategory
){

try{

setLoading(true);


const updated =
await getVotingResults(
categoryId || undefined
);


setLiveResults(
updated ?? []
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



/*
CATEGORY FILTER
*/

function handleCategoryChange(
value:string
){

setSelectedCategory(
value
);


refreshResults(
value
);


}








/*
REALTIME VOTING
*/

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

table:"votes"

},

()=>{


toast.success(
"New vote received"
);



refreshResults(
selectedCategory
);


}

)


.subscribe();



return ()=>{


supabase.removeChannel(
channel
);


};


},[
supabase,
eventId,
selectedCategory
]);









return (

<div className="space-y-8">



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


<p className="
text-xs
uppercase
tracking-[0.3em]
font-semibold
text-[#D4AFGold]
">

PARAGEYAN 2026

</p>



<h1 className="
mt-3
text-3xl
font-bold
text-[#0A2A1F]
">

Voting Monitoring

</h1>



<p className="
mt-2
text-slate-500
">

Monitor People's Choice Award voting activity.

</p>


</motion.div>







<div className="
grid
gap-5
md:grid-cols-3
">


<StatsCard

title="Total Votes"

value={
dashboard?.totalVotes ?? 0
}

icon={Vote}

/>



<StatsCard

title="Total Voters"

value={
dashboard?.totalVoters ?? 0
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








{/* LEADERBOARD */}

{/* LEADERBOARD */}

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
flex
items-center
justify-between
mb-8
"
>


{/* LEFT TITLE */}

<div
className="
flex
items-center
gap-2
"
>


<Trophy

size={22}

className="text-[#D4AF37]"

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




{/* RIGHT CONTROLS */}

<div
className="
flex
items-center
gap-3
"
>


<WinnerExport

eventName="PARAGEYAN 2026"

winners={
leaderboard.map(
(item:any)=>({

rank:item.rank,

candidateName:
item.candidateName,

categoryName:
item.categoryName,

votes:item.votes,

})
)
}

/>



<select

value={selectedCategory}

onChange={(e)=>{

const value =
e.target.value;


setSelectedCategory(value);


refreshResults(value);


}}

className="
rounded-xl
border
border-[#0A2A1F]/20
bg-white
px-4
py-2
text-sm
font-semibold
text-[#0A2A1F]
shadow-sm
outline-none
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
handleCategoryChange
}

/>



</div>




{/* STATUS */}


<div className="
rounded-3xl
border
bg-white
p-6
">


<div className="
flex
justify-between
items-center
">


<div>

<h2 className="
text-xl
font-bold
text-[#0A2A1F]
">

Voting Status

</h2>


<p className="
text-sm
text-slate-500
">

Current status

</p>


</div>





<span
className={`

px-4
py-2
rounded-full
font-semibold

${
settings?.status==="open"

?

"bg-green-100 text-green-700"

:

settings?.status==="paused"

?

"bg-yellow-100 text-yellow-700"

:

"bg-red-100 text-red-700"

}

`}
>


{
(settings?.status ?? "closed")
.toUpperCase()
}


</span>


</div>




<div className="
grid
md:grid-cols-2
gap-5
mt-6
">


<TimeBox

label="Start Time"

value={settings?.start_time}

/>


<TimeBox

label="End Time"

value={settings?.end_time}

/>



</div>


</div>








{/* LIVE RESULTS */}


<div className="
rounded-3xl
border
bg-white
overflow-hidden
">


<div className="
flex
justify-between
items-center
px-6
py-5
border-b
">


<h2 className="
text-xl
font-bold
text-[#0A2A1F]
">

Live Results

</h2>




<button

onClick={()=>
refreshResults()
}

disabled={loading}

className="
flex
gap-2
items-center
bg-[#0A2A1F]
text-white
rounded-xl
px-4
py-2
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






<table className="w-full">


<thead className="
bg-[#0A2A1F]
text-white
">


<tr>

<th className="px-6 py-4 text-left">
Rank
</th>


<th className="px-6 py-4 text-left">
Candidate
</th>


<th className="px-6 py-4 text-left">
Category
</th>


<th className="px-6 py-4 text-left">
Votes
</th>


</tr>


</thead>





<tbody>


{

liveResults.map(

(item:any,index:number)=>(


<tr

key={
item.candidate?.id ??
index
}

className="border-b"

>


<td className="px-6 py-4">

#{index+1}

</td>



<td className="px-6 py-4 font-semibold">

#{item.candidate?.candidate_number}

{" "}

{item.candidate?.full_name}

</td>



<td className="px-6 py-4">

{item.category?.name}

</td>



<td className="px-6 py-4 font-bold">

{item.votes}

</td>


</tr>


)

)


}


</tbody>


</table>


</div>









{/* RECENT VOTES */}


<div className="
rounded-3xl
border
bg-white
p-6
">


<h2 className="
text-xl
font-bold
text-[#0A2A1F]
">

Recent Votes

</h2>



<div className="
mt-5
space-y-4
">


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



<div className="
flex
items-center
gap-2
text-sm
text-slate-500
">


<Clock size={15}/>


{
new Date(
vote.created_at
).toLocaleTimeString()
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







function TimeBox({
label,
value,
}:any){


return (

<div>

<p className="text-sm text-slate-500">

{label}

</p>


<p className="font-semibold">

{
value
?
new Date(value).toLocaleString()
:
"N/A"
}

</p>


</div>

);

}





function StatsCard({

title,

value,

icon:Icon,

}:any){


return (

<div className="
rounded-3xl
border
bg-white
p-5
">


<div className="
rounded-2xl
bg-[#0A2A1F]
p-3
w-fit
">


<Icon

size={20}

className="text-[#D4AF37]"

/>


</div>


<p className="
mt-4
text-sm
text-slate-500
">

{title}

</p>


<h2 className="
text-3xl
font-bold
text-[#0A2A1F]
">

{value}

</h2>


</div>

);


}