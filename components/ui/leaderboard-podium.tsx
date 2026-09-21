"use client";

import * as React from "react";

import { Crown } from "lucide-react";


export interface CandidateRanking {

  candidateId:string;

  candidateName:string;

  candidateNumber:number;

  categoryId:string;

  categoryName:string;

  votes:number;

  percentage:number;

  totalVoters:number;

  imageUrl?:string|null;

  rank:number;

}



interface Props {

  rankings:CandidateRanking[];

  categories:any[];

  selectedCategory:string;

  setSelectedCategory:(value:string)=>void;

}



const COLORS = {

first:"#D4AF37",

second:"#CBD5E1",

third:"#FDBA74"

};




export function LeaderboardPodium({

rankings,

}:Props){



const sorted =
React.useMemo(()=>{


return [...rankings]

.sort(
(a,b)=>
b.votes-a.votes
)

.map(
(item,index)=>({

...item,

rank:index+1

})

);


},[rankings]);





if(!sorted.length){

return (

<div className="py-12 text-center text-slate-500">

No votes yet

</div>

);

}






const champion =
sorted[0];

const second =
sorted[1];

const third =
sorted[2];





function PodiumCard({
candidate,
position
}:{
candidate?:CandidateRanking;
position:number;
}){


if(!candidate)
return null;



const color =
position===1
?
COLORS.first

:

position===2
?
COLORS.second

:
COLORS.third;



const maxVotes =
champion.votes || 1;



const height =
Math.max(
60,
(candidate.votes / maxVotes) * 240
);




return (

<div

className="
flex
flex-col
items-center
"

>


<div className="relative">


<img

src={
candidate.imageUrl ??
"/placeholder.png"
}

className="
h-24
w-24
rounded-full
object-cover
border-4
border-white
shadow-xl
"

/>



<div

className="
absolute
-bottom-1
-right-1
rounded-full
bg-white
p-1
shadow
"

>

<Crown

size={18}

style={{
color
}}

/>

</div>


</div>



<p

className="
mt-3
font-bold
text-center
text-[#0A2A1F]
max-w-[150px]
"

>

#{candidate.candidateNumber}

{" "}

{candidate.candidateName}

</p>




<p className="text-xs text-slate-500">

{candidate.categoryName}

</p>




<p className="font-bold mt-1">

{candidate.votes}

votes

</p>




<p className="text-xs text-slate-400">

{candidate.percentage ?? 0}% of voters

</p>





<div

className="
mt-4
w-36
rounded-t-2xl
flex
items-end
justify-center
pb-3
text-white
font-bold
"

style={{

height:`${height}px`,

backgroundColor:color

}}

>

#{position}

</div>



</div>

);

}







return (

<div className="space-y-10">



<div

className="
flex
justify-center
items-end
gap-8
min-h-[450px]
"

>


{/* THIRD LEFT */}

<PodiumCard

candidate={third}

position={3}

/>




{/* CHAMPION CENTER */}

<PodiumCard

candidate={champion}

position={1}

/>




{/* SECOND RIGHT */}

<PodiumCard

candidate={second}

position={2}

/>



</div>






<div

className="
grid
grid-cols-2
md:grid-cols-5
gap-6
justify-center
"

>


{

sorted
.slice(3,10)
.map(candidate=>(


<div

key={candidate.candidateId}

className="
flex
flex-col
items-center
"

>


<img

src={
candidate.imageUrl ??
"/placeholder.png"
}

className="
h-16
w-16
rounded-full
object-cover
"

/>


<p className="text-sm font-bold text-center">

#{candidate.rank}

{" "}

{candidate.candidateName}

</p>


<p className="text-xs">

{candidate.votes} votes

</p>


<p className="text-xs text-slate-400">

{candidate.percentage ?? 0}%

</p>


</div>


))

}


</div>




</div>

);

}