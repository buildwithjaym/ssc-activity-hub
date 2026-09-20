"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  memo,
  useMemo,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import CandidateCard from "./CandidateCard";


interface Props {

  candidates:any[];

  onVote:(candidate:any)=>void;

  autoplay?:boolean;

  autoplayDelay?:number;

}



function CandidateCarousel({

candidates,

onVote,

autoplay=true,

autoplayDelay=5000,

}:Props){



const [active,setActive]=useState(0);

const [pause,setPause]=useState(false);


const touchStart =
useRef(0);





const uniqueCandidates =
useMemo(()=>{


return Array.from(

new Map(

candidates.map(candidate=>[

candidate.id,

candidate

])

).values()

);


},[candidates]);




const total =
uniqueCandidates.length;




useEffect(()=>{


setActive(0);


},[uniqueCandidates]);




const currentCandidates =
useMemo(()=>{


if(!total){

return {

left:null,

center:null,

right:null

};

}



if(total === 1){

return {

left:null,

center:uniqueCandidates[0],

right:null

};

}



if(total === 2){

return {

left:null,

center:uniqueCandidates[active],

right:uniqueCandidates[
(active+1)%total
]

};

}



return {


left:
uniqueCandidates[
(active-1+total)%total
],


center:
uniqueCandidates[
active
],


right:
uniqueCandidates[
(active+1)%total
]


};



},[
active,
uniqueCandidates,
total
]);




const next =
useCallback(()=>{


if(total<=1)
return;



setActive(prev=>

(prev+1)%total

);



},[total]);







const prev =
useCallback(()=>{


if(total<=1)
return;



setActive(prev=>

(prev-1+total)%total

);



},[total]);









useEffect(()=>{


if(
!autoplay ||
pause ||
total<=1
)
return;



const timer =

setInterval(

next,

autoplayDelay

);



return()=>clearInterval(timer);



},[

autoplay,

pause,

autoplayDelay,

total,

next

]);







function startTouch(
e:React.TouchEvent
){

touchStart.current =
e.touches[0].clientX;

}






function endTouch(
e:React.TouchEvent
){


const distance =

e.changedTouches[0].clientX -

touchStart.current;



if(distance < -60){

next();

}



if(distance > 60){

prev();

}


}







if(!total){


return (

<div

className="
py-16
text-center
text-sm
text-slate-500
"

>

No candidates available.

</div>

);


}







return (

<section


className="
relative
w-full
overflow-hidden
bg-[#F8F5EF]
py-6
"



onMouseEnter={()=>setPause(true)}

onMouseLeave={()=>setPause(false)}

onTouchStart={startTouch}

onTouchEnd={endTouch}



>



<div


className="
relative
mx-auto
flex
h-[450px]
max-w-5xl
items-center
justify-center
"


style={{

perspective:"1200px"

}}



>




{
currentCandidates.left &&

<motion.div


key={
currentCandidates.left.id
}



animate={{

x:"clamp(-140px,-20vw,-240px)",

scale:.74,

opacity:.22,

rotateY:35,

filter:"blur(1px)"

}}



transition={{

duration:.45,

ease:"easeOut"

}}



className="
absolute
z-0
pointer-events-none
"



>



<CandidateCard

candidate={
currentCandidates.left
}

onVote={onVote}

/>


</motion.div>

}









<AnimatePresence mode="wait">


<motion.div


key={
currentCandidates.center.id
}



drag="x"



dragConstraints={{

left:0,

right:0

}}



onDragEnd={(e,info)=>{


if(info.offset.x < -70){

next();

}



if(info.offset.x >70){

prev();

}



}}



initial={{

opacity:0,

scale:.94,

x:40

}}



animate={{

opacity:1,

scale:1,

x:0

}}



exit={{

opacity:0,

scale:.94,

x:-40

}}



transition={{

duration:.4,

ease:"easeOut"

}}



className="
relative
z-20
"



>



<CandidateCard

candidate={
currentCandidates.center
}

onVote={onVote}

/>



</motion.div>



</AnimatePresence>









{
currentCandidates.right &&

<motion.div


key={
currentCandidates.right.id
}



animate={{

x:"clamp(120px,18vw,230px)",

scale:.74,

opacity:.22,

rotateY:-35,

filter:"blur(1px)"

}}



transition={{

duration:.45,

ease:"easeOut"

}}



className="
absolute
z-0
pointer-events-none
"



>



<CandidateCard

candidate={
currentCandidates.right
}

onVote={onVote}

/>



</motion.div>

}









<button


onClick={prev}


className="
absolute
left-3
md:left-10
z-40
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-white
border
border-[#D4AF37]/40
text-[#0F3D2E]
shadow-md
transition
hover:scale-110
"



>

<ChevronLeft size={20}/>


</button>








<button


onClick={next}


className="
absolute
right-3
md:right-10
z-40
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-white
border
border-[#D4AF37]/40
text-[#0F3D2E]
shadow-md
transition
hover:scale-110
"



>

<ChevronRight size={20}/>


</button>





</div>









<div


className="
mt-3
flex
justify-center
gap-2
"



>


{

uniqueCandidates.map(

(item,index)=>(


<button


key={item.id}


onClick={()=>setActive(index)}



className="
h-2
rounded-full
transition-all
"



style={{


width:

active===index

?

"32px"

:

"8px",



background:

active===index

?

"#D4AF37"

:

"#0F3D2E"



}}



/>


)

)


}


</div>







<p


className="
mt-2
text-center
text-xs
text-slate-400
"



>

Candidate {active+1} of {total}


</p>






</section>


);


}



export default memo(CandidateCarousel);