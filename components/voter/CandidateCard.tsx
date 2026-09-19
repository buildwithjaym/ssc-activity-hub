"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";


interface Candidate {

  id:string;

  candidate_number:number|null;

  full_name:string;

  college:string|null;

  year_level:string|null;

  image_url:string|null;

}



interface Props {

  candidate:Candidate;

  onVote:(candidate:Candidate)=>void;

}





export default function CandidateCard({

candidate,

onVote,

}:Props){



return (

<motion.div


whileHover={{

y:-5

}}


className="

w-[280px]

overflow-hidden

rounded-3xl

border

border-[#0F3D2E]/10

bg-white

shadow-lg

"

>






{/* IMAGE AREA */}


<div

className="

relative

p-2.5

"

>


<div

className="

relative

h-[270px]

overflow-hidden

rounded-2xl

bg-[#F8F5EF]

"

>


{

candidate.image_url ? (

<img

src={candidate.image_url}

alt={candidate.full_name}

className="

h-full

w-full

object-cover

"

onError={(e)=>{

e.currentTarget.style.display="none";

}}

/>


)

:

(

<div

className="

flex

h-full

items-center

justify-center

"

>

<User

size={45}

className="text-[#0F3D2E]/20"

/>


</div>

)

}







{/* NUMBER BADGE */}

{

candidate.candidate_number && (

<div

className="

absolute

left-3

top-3

flex

h-9

w-9

items-center

justify-center

rounded-full

bg-[#D4AF37]

text-sm

font-black

text-[#0A2A1F]

shadow

"

>

{candidate.candidate_number}

</div>

)

}



</div>



</div>










{/* DETAILS */}



<div

className="

px-4

pb-4

pt-1

text-center

"

>





<h3

className="

truncate

text-lg

font-black

text-[#0A2A1F]

"

>

{candidate.full_name}

</h3>





{

candidate.college && (

<p

className="

mt-1

text-xs

font-bold

uppercase

tracking-wide

text-[#D4AF37]

"

>

{candidate.college}

</p>


)

}







{

candidate.year_level && (

<p

className="

mt-1

text-sm

text-slate-500

"

>

{candidate.year_level}

</p>


)

}









<button


onClick={()=>onVote(candidate)}


className="

mt-4

w-full

rounded-xl

bg-[#0F3D2E]

py-2.5

text-sm

font-bold

text-[#F8F5EF]

transition

hover:bg-[#0A2A1F]

active:scale-95

"

>

Vote Now

</button>





</div>





</motion.div>


);

}