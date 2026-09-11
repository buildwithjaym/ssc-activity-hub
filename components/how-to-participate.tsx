"use client";

import { motion } from "framer-motion";
import {
  Search,
  BookOpenCheck,
  UserPlus,
  PartyPopper,
} from "lucide-react";


const steps = [
  {
    icon: Search,
    number:"01",
    title:"Explore Activities",
    description:
      "Discover activities that match your interests and skills.",
  },
  {
    icon: BookOpenCheck,
    number:"02",
    title:"Read Guidelines",
    description:
      "Understand requirements, mechanics, and important reminders.",
  },
  {
    icon: UserPlus,
    number:"03",
    title:"Register",
    description:
      "Follow the registration process provided for each activity.",
  },
  {
    icon: PartyPopper,
    number:"04",
    title:"Participate",
    description:
      "Represent your college and enjoy Parageyan 2026.",
  },
];


export function HowToParticipate(){

return (

<section
id="participate"
className="
scroll-mt-24
px-5
py-20
sm:px-8
lg:px-10
lg:py-28
"
>

<div className="mx-auto max-w-7xl">


<div className="text-center max-w-2xl mx-auto">

<p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
Student Guide
</p>

<h2 className="mt-3 text-3xl font-bold text-[#0A2A1F] sm:text-4xl">
How to Participate
</h2>

<p className="mt-4 text-slate-600">
Joining Parageyan 2026 is simple.
Follow these steps and become part of the celebration.
</p>

</div>



<div className="
mt-12
grid
gap-6
sm:grid-cols-2
lg:grid-cols-4
">


{steps.map((step,index)=>{

const Icon = step.icon;

return (

<motion.div
key={step.title}
initial={{opacity:0,y:15}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
transition={{delay:index*.08}}
className="
rounded-3xl
border
border-slate-200
bg-white
p-6
"
>


<div className="
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-[#F8F5EF]
text-[#D4AF37]
">

<Icon className="h-6 w-6"/>

</div>


<p className="mt-5 text-xs font-bold text-[#D4AF37]">
{step.number}
</p>


<h3 className="mt-2 font-bold text-[#0A2A1F]">
{step.title}
</h3>


<p className="mt-2 text-sm text-slate-600">
{step.description}
</p>


</motion.div>

)

})}


</div>


</div>

</section>

)

}