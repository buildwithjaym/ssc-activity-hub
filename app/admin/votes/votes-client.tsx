"use client";

import {
  useEffect,
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  Vote,
  Users,
  Layers,
  RefreshCcw,
  Clock,
  Trophy
} from "lucide-react";

import {
  toast
} from "sonner";

import {
  createClient
} from "@/lib/supabase/client";

import {
  getVotingResults
} from "@/lib/votes/queries";


interface Props {

  dashboard:any;

  settings:any;

  results:any[];

  recentVotes:any[];

}



export default function VotesClient({

  dashboard,

  settings,

  results,

  recentVotes

}:Props){


const supabase = createClient();


const [liveResults,setLiveResults] =
useState(results ?? []);


const [loading,setLoading] =
useState(false);





async function refreshResults(){

try{


setLoading(true);


const updated =
await getVotingResults();


setLiveResults(
updated ?? []
);


toast.success(
"Results refreshed"
);


}catch(error:any){


toast.error(
error.message || "Failed to refresh results"
);


}finally{


setLoading(false);


}

}







useEffect(()=>{


const channel =

supabase

.channel(
"votes-monitor"
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


refreshResults();


}

)

.subscribe();



return ()=>{


supabase.removeChannel(
channel
);


};


},[]);







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
mt-2
">

Monitor People's Choice Award voting activity and results.

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








<div className="
rounded-3xl
bg-white
border
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

Current voting availability

</p>


</div>





<span
className={`
px-4
py-2
rounded-full
text-sm
font-semibold

${
settings?.is_open

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

`}
>


{

settings?.is_open

?

"OPEN"

:

"CLOSED"

}


</span>


</div>





<div className="
grid
md:grid-cols-2
gap-5
mt-6
">


<div>

<p className="
text-sm
text-slate-500
">

Start Time

</p>


<p className="font-semibold">


{

settings?.start_time

?

new Date(
settings.start_time
).toLocaleString()

:

"N/A"

}


</p>

</div>





<div>

<p className="
text-sm
text-slate-500
">

End Time

</p>


<p className="font-semibold">


{

settings?.end_time

?

new Date(
settings.end_time
).toLocaleString()

:

"N/A"

}


</p>

</div>



</div>



</div>









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
flex
items-center
gap-2
">


<Trophy size={20}/>

Live Results


</h2>





<button

onClick={refreshResults}

disabled={loading}

className="
flex
items-center
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







<table className="w-full">


<thead className="
bg-[#0A2A1F]
text-white
">


<tr>


<th className="
px-6
py-4
text-left
">

Candidate

</th>


<th className="
px-6
py-4
text-left
">

Category

</th>


<th className="
px-6
py-4
text-left
">

Votes

</th>


</tr>


</thead>




<tbody>


{

liveResults.length === 0

?


<tr>

<td

colSpan={3}

className="
text-center
py-10
text-slate-500
"

>

No votes recorded yet.

</td>

</tr>


:


liveResults.map(
(item:any,index:number)=>(


<tr

key={
item.candidate?.id ?? index
}

className="
border-b
"

>


<td className="
px-6
py-4
font-semibold
">


#

{
item.candidate?.candidate_number
}


{" "}


{
item.candidate?.full_name
}


</td>



<td className="
px-6
py-4
">


{
item.category?.name ?? "N/A"
}


</td>




<td className="
px-6
py-4
font-bold
text-[#0A2A1F]
">


{
item.votes ?? 0
}


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
bg-white
border
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

recentVotes.length===0

?


<p className="
text-slate-500
">

No recent votes.

</p>


:


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


<p className="
font-semibold
">

{
vote.candidate?.full_name ?? "Unknown"
}

</p>



<p className="
text-sm
text-slate-500
">

{
vote.category?.name ?? "Unknown"
}

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