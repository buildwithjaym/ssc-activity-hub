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
  getLiveVotingResults,
} from "@/lib/votes/client-actions";


import WinnerExport from "@/components/export/winner-export";


import {
  LeaderboardPodium,
} from "@/components/ui/leaderboard-podium";



interface Props {

  dashboard:any;

  settings:any;

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
[]
);




const [
resultsData,
setResultsData
]
=
useState<any[]>(
results ?? []
);



const [
loading,
setLoading
]
=
useState(false);




const [
selectedCategory,
setSelectedCategory
]
=
useState("");







async function loadResults(){


try{


setLoading(true);



const data =
await getLiveVotingResults(
eventId
);



setResultsData(
data ?? []
);



}

catch(error:any){


toast.error(
error.message ??
"Unable to load votes"
);


}

finally{


setLoading(false);


}


}







useEffect(()=>{


if(!eventId)
return;



loadResults();




const channel =

supabase

.channel(
`votes-channel-${eventId}`
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


loadResults();


}

)


.subscribe();





return ()=>{


supabase.removeChannel(
channel
);


};


},[
eventId
]);









const leaderboard =
useMemo(()=>{


let data =
[
...resultsData
];



if(selectedCategory){


data =
data.filter(
(item:any)=>
item.categoryId === selectedCategory
);


}




return data

.sort(
(a:any,b:any)=>
b.votes-a.votes
)

.map(
(item:any,index:number)=>({


...item,


rank:index+1


})

);



},[
resultsData,
selectedCategory
]);









const exportData =
useMemo(()=>{


return leaderboard.map(
(item:any)=>({

rank:item.rank,

candidateName:item.candidateName,

categoryName:item.categoryName,

votes:item.votes,

percentage:
item.percentage ?? 0

})

);



},[
leaderboard
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
font-bold
text-[#D4AF37]
">

PARAGEYAN 2026

</p>



<h1 className="
text-3xl
font-bold
text-[#0A2A1F]
mt-3
">

Voting Monitoring

</h1>



<p className="
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









<div className="
rounded-3xl
border
bg-white
p-8
">


<div className="
flex
justify-between
items-center
mb-8
">


<div className="
flex
items-center
gap-3
">


<Trophy
className="text-[#D4AF37]"
/>


<h2 className="
text-xl
font-bold
text-[#0A2A1F]
">

Leaderboard

</h2>


</div>





<div className="flex gap-3">


<WinnerExport

eventName="PARAGEYAN 2026"

winners={exportData}

/>




<select

value={selectedCategory}

onChange={
(e)=>
setSelectedCategory(
e.target.value
)
}

className="
border
rounded-xl
px-4
py-2
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


<h2 className="
text-xl
font-bold
">

Live Results

</h2>




<button

onClick={loadResults}

disabled={loading}

className="
flex
gap-2
items-center
bg-[#0A2A1F]
text-white
px-4
py-2
rounded-xl
"

>


<RefreshCcw
  size={16}
  className={
    loading
      ? "animate-spin"
      : ""
  }
/>


Refresh


</button>


</div>









<table className="w-full mt-5">


<thead className="
bg-[#0A2A1F]
text-white
">


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


</tr>


</thead>





<tbody>


{
leaderboard.map(
(item:any)=>(


<tr
key={item.candidateId}
className="border-b"
>


<td className="p-4">
#{item.rank}
</td>


<td className="p-4 font-semibold">

#{item.candidateNumber}

{" "}

{item.candidateName}

</td>



<td className="p-4">

{item.categoryName}

</td>



<td className="p-4 font-bold">

{item.votes}

</td>



</tr>


)

)

}



</tbody>


</table>



</div>









<div className="
rounded-3xl
border
bg-white
p-6
">


<h2 className="
text-xl
font-bold
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



<p className="text-sm text-slate-500">

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