"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import {
  X,
  Check,
  Lock,
} from "lucide-react";

import {
  submitVote,
} from "@/app/voter/actions";



interface Candidate {

  id:string;

  candidate_number:number|null;

  full_name:string;

  image_url:string|null;

  college:string|null;

  category_name?:string;

}



interface VoteModalProps {

  candidate:Candidate;

  eventId:string;

  categoryId:string;

  voteStatus:any;

  hasVoted:boolean;

  onClose:()=>void;

  onSuccess:()=>void;

}





export default function VoteModal({

candidate,

eventId,

categoryId,

voteStatus,

hasVoted,

onClose,

onSuccess,

}:VoteModalProps){



const [loading,setLoading] =
useState(false);


const [error,setError] =
useState("");





const disabled =
loading ||
hasVoted ||
!voteStatus.canVote;







async function handleVote(){


if(hasVoted){

setError(
"You already voted in this category."
);

return;

}



if(!voteStatus.canVote){

setError(
voteStatus.message ||
"Voting is currently closed."
);

return;

}




try{


setLoading(true);

setError("");



const result =
await submitVote({

eventId,

categoryId,

candidateId:candidate.id,

});




if(!result.success){

setError(
result.message
);

return;

}



onSuccess();



}

catch{


setError(
"Unable to submit vote. Please try again."
);


}

finally{

setLoading(false);

}


}






return (

<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/40
px-4
backdrop-blur-md
"

onClick={onClose}

>



<motion.div

initial={{
opacity:0,
scale:.92,
y:20
}}

animate={{
opacity:1,
scale:1,
y:0
}}

transition={{
duration:.25
}}

onClick={(e)=>e.stopPropagation()}

className="
relative
w-full
max-w-[360px]
overflow-hidden
rounded-[28px]
bg-white
shadow-2xl
"

>



<button

onClick={onClose}

className="
absolute
right-3
top-3
z-20
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-black/40
text-white
"

>

<X size={16}/>

</button>







<div

className="
px-6
pt-6
text-center
"

>



{
candidate.candidate_number &&

<div

className="
mx-auto
mb-4
inline-flex
rounded-full
px-4
py-1
text-xs
font-black
"

style={{

background:"#D4AF37",

color:"#0A2A1F"

}}

>

Candidate #{candidate.candidate_number}

</div>

}





<div

className="
mx-auto
rounded-[26px]
bg-[#F8F5EF]
p-2
w-fit
"

>

<div

className="
h-[210px]
w-[210px]
overflow-hidden
rounded-[22px]
bg-slate-100
"

>



{

candidate.image_url

?

<img

src={candidate.image_url}

alt={candidate.full_name}

className="
h-full
w-full
object-cover
"

/>


:

<div

className="
flex
h-full
items-center
justify-center
text-xs
text-slate-400
"

>

No Image

</div>

}



</div>

</div>







<h1

className="
mt-4
text-xl
font-black
text-[#0A2A1F]
"

>

{candidate.full_name}

</h1>






{

candidate.college &&

<div

className="
mx-auto
mt-2
w-fit
rounded-full
px-4
py-1
text-xs
font-bold
"

style={{

background:"rgba(212,175,55,.15)",

color:"#0F3D2E"

}}

>

{candidate.college}

</div>

}





{

candidate.category_name &&

<p

className="
mt-3
text-[10px]
font-bold
uppercase
tracking-[.25em]
text-[#D4AF37]
"

>

{candidate.category_name}

</p>

}



</div>









<div

className="
px-6
pb-6
"

>






{

hasVoted

?


<div

className="
mt-5
rounded-xl
bg-yellow-50
px-4
py-4
text-center
text-xs
font-bold
text-yellow-700
"

>

<Lock
size={16}
className="mx-auto mb-2"
/>


You already voted in this category.

</div>



:


!voteStatus.canVote

?


<div

className="
mt-5
rounded-xl
bg-red-50
px-4
py-4
text-center
text-xs
font-bold
text-red-500
"

>

<Lock
size={16}
className="mx-auto mb-2"
/>


{voteStatus.message}

</div>



:


<div

className="
mt-5
rounded-xl
bg-[#F8F5EF]
px-4
py-3
text-center
text-xs
text-slate-600
"

>

Are you sure you want to vote for this candidate?

</div>

}





{


error &&

<div

className="
mt-3
rounded-xl
bg-red-50
px-3
py-2
text-center
text-xs
font-medium
text-red-500
"

>

{error}

</div>

}








<div

className="
mt-4
flex
gap-3
"

>




<button

onClick={onClose}

disabled={loading}

className="
flex-1
rounded-xl
border
py-3
text-sm
font-bold
"

style={{

borderColor:"#0F3D2E",

color:"#0F3D2E"

}}

>

Cancel

</button>







<button

onClick={handleVote}

disabled={disabled}

className="
flex-1
rounded-xl
py-3
text-sm
font-bold
flex
items-center
justify-center
gap-2
disabled:opacity-50
"

style={{

background:

hasVoted

?

"#CBD5E1"

:

"#0F3D2E",


color:

hasVoted

?

"#475569"

:

"#F8F5EF"

}}

>





{

loading

?

"Submitting..."


:

hasVoted

?

<>

<Lock size={15}/>

Already Voted

</>


:


!voteStatus.canVote

?

<>

<Lock size={15}/>

Closed

</>


:

<>

<Check size={15}/>

Vote

</>

}



</button>





</div>






</div>






</motion.div>



</div>

);

}