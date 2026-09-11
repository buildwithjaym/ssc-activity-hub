"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Palette,
  Trophy,
  Sparkles,
  Users,
  CheckCircle2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const mascotSlides = [
  {
    icon: Palette,
    title: "Create your college character",
    description:
      "Every great team needs an identity. Design a mascot that represents your college personality, values, and spirit.",
  },
  {
    icon: Sparkles,
    title: "Turn ideas into a symbol",
    description:
      "Transform your creativity into a memorable character that students can recognize and proudly support.",
  },
  {
    icon: Trophy,
    title: "Ready to represent?",
    description:
      "Join the Mascot Making Contest and create the symbol of your college pride during Parageyan 2026.",
  },
];


const reasons = [
  {
    icon: Palette,
    title: "Express Your Creativity",
    description:
      "Create an original character using your imagination and artistic skills.",
  },
  {
    icon: Users,
    title: "Represent Your College",
    description:
      "Develop a mascot that reflects your college identity and values.",
  },
  {
    icon: Sparkles,
    title: "Create a Lasting Symbol",
    description:
      "Design a character that students can remember and support.",
  },
  {
    icon: Trophy,
    title: "Be Part of Parageyan",
    description:
      "Contribute your creativity to this year's celebration.",
  },
];


export default function MascotMakingGuidelinesPage() {

  const [showModal,setShowModal] = useState(true);
  const [activeSlide,setActiveSlide] = useState(0);


return (

<main className="min-h-screen bg-white text-[#0A2A1F]">


{/* MODAL */}

<AnimatePresence>

{showModal && (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
>


<motion.div
initial={{scale:.95,y:20}}
animate={{scale:1,y:0}}
className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
>


<button
onClick={()=>setShowModal(false)}
className="absolute right-5 top-5 text-slate-400 hover:text-[#0A2A1F]"
>

<X className="h-5 w-5"/>

</button>



{(() => {

const Icon = mascotSlides[activeSlide].icon;


return (

<>

<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">

<Icon className="h-8 w-8"/>

</div>



<h2 className="mt-6 text-2xl font-bold">

{mascotSlides[activeSlide].title}

</h2>



<p className="mt-3 text-sm leading-6 text-slate-600">

{mascotSlides[activeSlide].description}

</p>



<div className="mt-6 flex justify-center gap-2">

{mascotSlides.map((_,index)=>(

<span
key={index}
className={`h-2 rounded-full transition-all ${
index===activeSlide
?"w-8 bg-[#D4AF37]"
:"w-2 bg-slate-200"
}`}
/>

))}

</div>




{activeSlide === mascotSlides.length - 1 ? (

<button
onClick={()=>setShowModal(false)}
className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0A2A1F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2A1F]"
>

View Guidelines

<ArrowRight className="h-4 w-4"/>

</button>


):(


<button
onClick={()=>setActiveSlide(activeSlide+1)}
className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37]"
>

Continue

<ArrowRight className="h-4 w-4"/>

</button>


)}



</>

);

})()}



</motion.div>


</motion.div>

)}

</AnimatePresence>





{/* HEADER */}

<header className="border-b border-slate-200">


<div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">


<Link
href="/"
className="flex items-center gap-2 text-sm font-semibold"
>

<ArrowLeft className="h-4 w-4"/>

Home

</Link>



<Link
href="/#activities"
className="text-sm font-semibold hover:text-[#D4AF37]"
>

Activities

</Link>


</div>


</header>







{/* HERO */}

<section className="bg-[#0A2A1F] px-5 py-16">


<div className="mx-auto max-w-4xl">


<span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase text-[#0A2A1F]">

Creative Competition

</span>




<h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">

Mascot Making Contest

</h1>




<p className="mt-5 max-w-2xl text-base leading-7 text-white/80">

Create a unique mascot that represents your college
identity, values, and competitive spirit during
Parageyan 2026.

</p>





<div className="mt-8 flex flex-wrap gap-3">


<Badge
icon={<Calendar/>}
text="Sep 28-30, 2026"
/>


<Badge
icon={<Palette/>}
text="Character Design Challenge"
/>


</div>



</div>


</section>







{/* CONTENT */}

<section className="px-5 py-16">


<div className="mx-auto max-w-4xl space-y-12">



<Guideline title="About the Contest">

The Mascot Making Contest challenges students
to create an original character that becomes a
symbol of their college identity, creativity,
and spirit.

</Guideline>






<section>

<h2 className="text-2xl font-bold">
Why Join?
</h2>


<p className="mt-3 leading-7 text-slate-600">

Create something meaningful that represents
your college beyond the competition.

</p>



<div className="mt-8 grid gap-5 sm:grid-cols-2">

{reasons.map((item)=>(

<Card
key={item.title}
icon={<item.icon/>}
title={item.title}
description={item.description}
/>

))}

</div>


</section>







<Guideline
title="Mascot Requirements"
items={[
"Create an original mascot concept.",
"The mascot should represent your college identity and values.",
"Design must be appropriate and respectful.",
"Submit the mascot design together with its meaning and description.",
]}
 />







<section>


<h2 className="text-2xl font-bold">

Criteria for Judging

</h2>



<div className="mt-6 grid gap-4 sm:grid-cols-2">


<Judge title="Creativity & Originality"/>

<Judge title="Meaning Behind the Mascot"/>

<Judge title="Design Quality"/>

<Judge title="College Representation"/>


</div>


</section>







<Guideline
title="Important Reminders"
items={[
"Mascot Making is separate from Banner Making Contest.",
"The submitted mascot must be an original concept.",
"Late submissions may not be accepted.",
]}
 />






<div className="rounded-3xl bg-[#0A2A1F] p-7">


<div className="flex gap-4">


<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">

<Palette className="h-6 w-6"/>

</div>




<div>


<h3 className="font-bold text-white">

Create the symbol of your college

</h3>



<p className="mt-1 text-sm leading-6 text-white/70">

Design. Inspire. Represent.

Make your mascot part of Parageyan 2026.

</p>


</div>


</div>


</div>






<div className="rounded-3xl bg-[#F8F5EF] p-6">


<div className="flex gap-3">

<CheckCircle2 className="h-5 w-5 text-[#D4AF37]"/>


<p className="text-sm leading-6 text-slate-600">

Your mascot can become the identity
your college proudly carries.

</p>


</div>


</div>



</div>


</section>






<footer className="border-t border-slate-200 px-5 py-8 text-center">


<Link
href="/#activities"
className="inline-flex items-center gap-2 text-sm font-bold hover:text-[#D4AF37]"
>

<ArrowLeft className="h-4 w-4"/>

Back to Activities

</Link>


<p className="mt-4 text-xs text-slate-500">

Supreme Student Council • Parageyan 2026

</p>


</footer>


</main>

);

}







function Badge({
icon,
text,
}:{
icon:React.ReactNode;
text:string;
}){

return (

<div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">

<span className="text-[#D4AF37]">

{icon}

</span>

{text}

</div>

);

}







function Card({
icon,
title,
description,
}:{
icon:React.ReactNode;
title:string;
description:string;
}){

return (

<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F5EF] text-[#D4AF37]">

{icon}

</div>


<h3 className="mt-5 font-bold">

{title}

</h3>


<p className="mt-2 text-sm leading-6 text-slate-600">

{description}

</p>


</div>

);

}







function Judge({
title,
}:{
title:string;
}){

return (

<div className="rounded-2xl border border-slate-200 p-5">

<h3 className="font-bold">

{title}

</h3>

</div>

);

}







function Guideline({
title,
children,
items,
}:{
title:string;
children?:React.ReactNode;
items?:string[];
}){

return (

<section>

<h2 className="text-2xl font-bold">

{title}

</h2>


{children && (

<p className="mt-3 leading-7 text-slate-600">

{children}

</p>

)}


{items && (

<ul className="mt-4 space-y-3 text-slate-600">


{items.map(item=>(

<li
key={item}
className="flex gap-3"
>

<span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]"/>

<span>{item}</span>

</li>

))}


</ul>

)}


</section>

);

}