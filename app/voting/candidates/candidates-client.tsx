"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  User,
  X,
  SearchX,
  GraduationCap,
  Layers,
  Info,
} from "lucide-react";

import type { Candidate, Category } from "./actions";


interface Props {
  eventName: string;
  categories: Category[];
  candidates: Candidate[];
}


export default function CandidatesClient({
  eventName,
  categories,
  candidates,
}: Props) {


  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);



  const filteredCandidates =
    selectedCategory === "all"
      ? candidates
      : candidates.filter(
          (candidate) =>
            candidate.category_id === selectedCategory
        );



  return (

<div className="min-h-screen bg-[#FAF8F2]">


<div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">



{/* HEADER */}

<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.5
}}

className="mb-10 text-center"

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
{eventName}
</p>


<h1
className="
mt-3
text-3xl
font-bold
tracking-tight
text-[#0A2A1F]
sm:text-4xl
"
>
Meet the Candidates
</h1>


<p
className="
mx-auto
mt-3
max-w-md
text-sm
leading-relaxed
text-slate-500
"
>
Discover the finalists competing for the People's Choice Award.
</p>


</motion.div>





{/* CATEGORY FILTER */}


{
categories.length > 0 && (

<motion.div

initial={{
opacity:0,
y:10
}}

animate={{
opacity:1,
y:0
}}

className="
mb-8
flex
justify-center
"

>

<div
className="
relative
w-full
max-w-xs
"
>

<select

value={selectedCategory}

onChange={(e)=>
setSelectedCategory(e.target.value)
}

className="
w-full
appearance-none
rounded-2xl
border
border-[#0A2A1F]/10
bg-white
px-4
py-3
pr-10
text-sm
font-semibold
text-[#0A2A1F]
shadow-sm
outline-none
transition
focus:border-[#D4AF37]
"

>

<option value="all">
All Categories
</option>


{
categories.map((category)=>(

<option

key={category.id}

value={category.id}

>

{category.name}

</option>

))

}

</select>


<ChevronDown

size={18}

className="
pointer-events-none
absolute
right-4
top-1/2
-translate-y-1/2
text-[#0A2A1F]/40
"

/>


</div>


</motion.div>

)

}




{/* EMPTY CATEGORY */}


{
filteredCandidates.length === 0 ? (


<motion.div

initial={{
opacity:0,
scale:.96
}}

animate={{
opacity:1,
scale:1
}}

className="
flex
min-h-[320px]
flex-col
items-center
justify-center
rounded-3xl
border
border-dashed
border-[#0A2A1F]/20
bg-white/70
text-center
"

>


<div
className="
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-[#0A2A1F]/5
"
>

<SearchX

size={32}

className="text-[#0A2A1F]/40"

/>

</div>



<h2
className="
mt-5
text-xl
font-bold
text-[#0A2A1F]
"
>
No Candidates Found
</h2>


<p
className="
mt-2
max-w-xs
text-sm
text-slate-500
"
>
There are currently no candidates available.
</p>



{
selectedCategory !== "all" && (

<button

onClick={()=>
setSelectedCategory("all")
}

className="
mt-6
rounded-xl
bg-[#D4AF37]
px-5
py-2.5
text-sm
font-bold
text-[#0A2A1F]
transition
hover:scale-105
"

>

View All Candidates

</button>

)

}


</motion.div>


)

:


/* CANDIDATE GRID */


<motion.div

layout

className="
grid
grid-cols-1
gap-5
sm:grid-cols-2
lg:grid-cols-3
"

>


<AnimatePresence mode="popLayout">


{
filteredCandidates.map(
(candidate,index)=>(


<motion.button

key={candidate.id}

layout

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
scale:.95
}}

transition={{
duration:.35,
delay:index*.04
}}

onClick={()=>
setSelectedCandidate(candidate)
}

className="
group
overflow-hidden
rounded-3xl
border
border-[#0A2A1F]/10
bg-white
text-left
shadow-sm
transition
hover:-translate-y-1
hover:shadow-xl
"

>


<div
className="
relative
aspect-[4/5]
overflow-hidden
bg-[#0A2A1F]/5
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
transition
duration-500
group-hover:scale-110
"

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
className="text-[#0A2A1F]/20"
/>


</div>

)

}



{
candidate.candidate_number && (

<span

className="
absolute
left-4
top-4
rounded-full
bg-[#D4AF37]
px-3
py-1
text-xs
font-bold
text-[#0A2A1F]
shadow
"

>

#{candidate.candidate_number}

</span>

)

}


</div>




<div
className="
space-y-2
p-4
"
>


<h3
className="
truncate
text-lg
font-bold
text-[#0A2A1F]
"
>

{candidate.full_name}

</h3>



<p
className="
text-xs
font-bold
uppercase
tracking-wide
text-[#D4AF37]
"
>

{candidate.category_name}

</p>



{
(candidate.college ||
candidate.year_level) && (

<div
className="
flex
items-center
gap-2
text-xs
text-slate-500
"
>

<GraduationCap size={14}/>

<span>

{
[
candidate.college,
candidate.year_level
]
.filter(Boolean)
.join(" • ")

}

</span>


</div>

)

}


</div>



</motion.button>


)

)

}


</AnimatePresence>


</motion.div>


}



</div>






{/* MODAL */}



<AnimatePresence>


{
selectedCandidate && (

<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

exit={{
opacity:0
}}

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/50
p-5
backdrop-blur-sm
"

onClick={()=>
setSelectedCandidate(null)
}

>


<motion.div

initial={{
opacity:0,
scale:.9,
y:30
}}

animate={{
opacity:1,
scale:1,
y:0
}}

exit={{
opacity:0,
scale:.95
}}

transition={{
type:"spring",
stiffness:250,
damping:25
}}

onClick={(e)=>
e.stopPropagation()
}

className="
relative
w-full
max-w-sm
overflow-hidden
rounded-3xl
bg-white
shadow-2xl
"

>


<button

onClick={()=>
setSelectedCandidate(null)
}

className="
absolute
right-4
top-4
z-10
flex
h-9
w-9
items-center
justify-center
rounded-full
bg-black/40
text-white
backdrop-blur
"

>

<X size={18}/>

</button>




<div
className="
aspect-[4/4]
overflow-hidden
"
>

<img

src={selectedCandidate.image_url ?? ""}

alt={selectedCandidate.full_name}

className="
h-full
w-full
object-cover
"

/>


</div>




<div
className="
space-y-3
p-5
"
>


<h2
className="
text-xl
font-bold
text-[#0A2A1F]
"
>

{selectedCandidate.full_name}

</h2>



<p
className="
text-xs
font-bold
uppercase
tracking-wide
text-[#D4AF37]
"
>

{selectedCandidate.category_name}

</p>



<div
className="
flex
items-center
gap-2
text-sm
text-slate-500
"
>

<Layers size={16}/>

{
selectedCandidate.college ??
"No college information"
}

</div>




{
selectedCandidate.bio && (

<div
className="
flex
gap-2
text-sm
leading-relaxed
text-slate-500
"
>

<Info size={16}/>

<p>
{selectedCandidate.bio}
</p>

</div>

)

}



</div>


</motion.div>


</motion.div>

)

}


</AnimatePresence>


</div>

  );
}