"use client";


import { motion } from "framer-motion";

import {
  Users,
  Trophy,
  Vote,
  Activity,
} from "lucide-react";


interface Props {

stats:{
  candidates:number;
  voters:number;
  votes:number;
  status:string;
};

}



const cards = [

{
title:"Total Candidates",
key:"candidates",
icon:Trophy,
},


{
title:"Registered Voters",
key:"voters",
icon:Users,
},


{
title:"Total Votes",
key:"votes",
icon:Vote,
},


{
title:"Voting Status",
key:"status",
icon:Activity,
},

];



export default function DashboardContent({
stats
}:Props){


return (

<div>


<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.5
}}

>


<p
className="
text-sm
font-semibold
uppercase
tracking-[.25em]
text-[#D4AF37]
"
>
Parageyan 2026
</p>



<h1
className="
mt-3
text-3xl
font-bold
text-[#0A2A1F]

sm:text-4xl
lg:text-5xl
"
>

Dashboard Overview

</h1>



<p
className="
mt-2
max-w-xl
text-sm
text-slate-600
sm:text-base
"
>

Monitor candidates, votes, and event activities.

</p>



</motion.div>





<div

className="
mt-10
grid
gap-5

grid-cols-1

sm:grid-cols-2

xl:grid-cols-4

"

>


{
cards.map((card,index)=>{


const Icon = card.icon;


return (

<motion.div

key={card.title}


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}


transition={{
delay:index * .08
}}


whileHover={{
y:-5
}}


className="
rounded-3xl
border
border-[#0A2A1F]/10
bg-white
p-6
shadow-sm

transition

hover:shadow-lg
"

>


<div

className="
flex
items-center
justify-between
"

>


<div

className="
rounded-2xl
bg-[#0A2A1F]
p-3
"

>


<Icon

size={22}

className="
text-[#D4AF37]
"

/>


</div>


</div>



<p

className="
mt-5
text-sm
text-slate-500
"

>

{card.title}

</p>



<p

className="
mt-1
text-3xl
font-bold
text-[#0A2A1F]
"

>

{
stats[
card.key as keyof typeof stats
]
}


</p>



</motion.div>

)

})

}


</div>


</div>

)


}