"use client";

import {
  useRef,
  useState,
} from "react";


import VoterNavbar from "./VoterNavbar";
import CategorySelect from "./CategorySelect";
import CandidateCarousel from "./CandidateCarousel";
import VoteModal from "./VoteModal";
import VoteSuccessModal from "./VoteSuccessModal";


import {
  fetchCandidates,
} from "@/app/voter/client-actions";


import {
  useUserVotes,
} from "@/app/voter/hooks/useUserVotes";



interface Props {

  event:any;

  categories:any[];

  initialCandidates:any[];

  initialCategory:string;

  voteStatus:any;

  myVotes:any;

}




export default function VoterPageClient({

event,

categories,

initialCandidates,

initialCategory,

voteStatus,

myVotes,

}:Props){



const [selectedCategory,setSelectedCategory] =
useState(initialCategory);



const [candidates,setCandidates] =
useState(initialCandidates);




const candidateCache =
useRef<Record<string,any[]>>({

[initialCategory]:
initialCandidates

});




const {

hasVoted,

addVote

} = useUserVotes(myVotes);





const [selectedCandidate,setSelectedCandidate] =
useState<any>(null);



const [success,setSuccess] =
useState(false);



const [loadingCandidates,setLoadingCandidates] =
useState(false);






async function changeCategory(
categoryId:string
){


setSelectedCategory(categoryId);



const cached =
candidateCache.current[categoryId];



if(cached){

setCandidates(cached);

return;

}




setLoadingCandidates(true);



const data =
await fetchCandidates(

event.id,

categoryId

);



candidateCache.current[categoryId]
=
data;



setCandidates(data);



setLoadingCandidates(false);


}







return (

<div

className="
min-h-screen
bg-[#F8F5EF]
"

>


<VoterNavbar />




<main

className="
mx-auto
max-w-5xl
px-4
pb-10
pt-28
"

>



<div

className="
text-center
"

>


<p

className="
text-xs
font-bold
uppercase
tracking-[.3em]
text-[#D4AF37]
"

>

{event.name}

</p>





<h1

className="
mt-2
text-3xl
font-black
text-[#0A2A1F]
"

>

People Choice Award

</h1>





<p

className="
mx-auto
mt-3
max-w-md
text-sm
text-slate-500
"

>

Choose your favorite candidate and cast your official vote.

</p>



</div>






<div className="mt-8">


<CategorySelect

categories={categories}

selectedCategory={selectedCategory}

onChange={changeCategory}

/>


</div>







<div className="mt-6">


{

loadingCandidates

?


<div

className="
py-20
text-center
text-sm
text-slate-400
"

>

Loading candidates...

</div>


:


<CandidateCarousel

candidates={candidates}


onVote={(candidate)=>{


setSelectedCandidate(candidate);


}}


/>


}



</div>





</main>









{
selectedCandidate &&

(


<VoteModal


candidate={selectedCandidate}



eventId={event.id}



categoryId={
selectedCandidate.category_id
}



voteStatus={voteStatus}




hasVoted={

hasVoted(

selectedCandidate.category_id

)

}




onClose={()=>{

setSelectedCandidate(null);

}}



onSuccess={()=>{


addVote(

selectedCandidate.category_id,

selectedCandidate.id

);



setSelectedCandidate(null);



setSuccess(true);



}}


/>


)

}









{
success &&

(


<VoteSuccessModal


onClose={()=>{

setSuccess(false);

}}


/>


)

}







</div>

);


}