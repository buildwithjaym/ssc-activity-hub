"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { SITE_CONFIG } from "./site-config";


export function Navbar() {

const [isOpen,setIsOpen] = useState(false);


return (

<motion.header
initial={{
opacity:0,
y:-20
}}
animate={{
opacity:1,
y:0
}}
transition={{
duration:.6
}}
className="
absolute
inset-x-0
top-0
z-50
px-4
pt-4
sm:px-6
lg:px-8
"
>


<div className="mx-auto max-w-7xl">


<nav
className="
flex
h-[64px]
items-center
justify-between
rounded-2xl
border
border-white/15
bg-[#123F2A]/30
px-3
shadow-lg
backdrop-blur-2xl
sm:h-[68px]
sm:px-4
"
>


{/* BRAND */}

<a
href="#home"
onClick={()=>setIsOpen(false)}
className="
group
flex
items-center
gap-3
"
>


<div
className="
relative
h-10
w-10
overflow-hidden
rounded-full
border
border-white/50
bg-white
shadow-md
transition-transform
group-hover:scale-105
sm:h-11
sm:w-11
"
>

<Image
src={SITE_CONFIG.images.logo}
alt="SSC Logo"
fill
priority
sizes="44px"
className="object-cover"
/>

</div>



<div className="hidden sm:block">

<p
className="
text-sm
font-bold
tracking-wide
text-white
"
>
{SITE_CONFIG.shortName}
</p>


<p
className="
mt-1
text-[8px]
font-semibold
uppercase
tracking-[0.2em]
text-white/55
"
>
{SITE_CONFIG.institution}
</p>


</div>



<span
className="
text-sm
font-bold
text-white
sm:hidden
"
>
SSC Hub
</span>



</a>





{/* DESKTOP MENU */}

<div
className="
hidden
items-center
gap-1
rounded-full
border
border-white/10
bg-white/5
p-1
backdrop-blur-xl
lg:flex
"
>


{SITE_CONFIG.navigation.map((item,index)=>(


<a
key={item.label}
href={item.href}
className={`
rounded-full
px-4
py-2.5
text-[11px]
font-semibold
transition-all
duration-300

${
index===0
?
"bg-white/15 text-white"
:
"text-white/60 hover:bg-white/10 hover:text-white"
}

`}
>

{item.label}


</a>


))}


</div>





{/* MOBILE BUTTON */}

<button

type="button"

onClick={()=>setIsOpen(!isOpen)}

aria-label={
isOpen
?
"Close menu"
:
"Open menu"
}

className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
border
border-white/15
bg-white/10
text-white
backdrop-blur-xl
lg:hidden
"

>


<AnimatePresence mode="wait">

{

isOpen

?

<motion.span
key="close"
initial={{
opacity:0,
rotate:-90
}}
animate={{
opacity:1,
rotate:0
}}
exit={{
opacity:0
}}
>

<X className="h-5 w-5"/>

</motion.span>


:


<motion.span
key="menu"
initial={{
opacity:0,
rotate:90
}}
animate={{
opacity:1,
rotate:0
}}
exit={{
opacity:0
}}
>

<Menu className="h-5 w-5"/>

</motion.span>

}


</AnimatePresence>


</button>



</nav>





{/* MOBILE MENU */}


<AnimatePresence>

{

isOpen && (

<motion.div

initial={{
opacity:0,
y:-10
}}

animate={{
opacity:1,
y:0
}}

exit={{
opacity:0,
y:-10
}}

className="
mt-2
rounded-2xl
border
border-white/15
bg-[#123F2A]/90
p-2
shadow-xl
backdrop-blur-2xl
lg:hidden
"

>


{

SITE_CONFIG.navigation.map((item,index)=>(


<a

key={item.label}

href={item.href}

onClick={()=>setIsOpen(false)}

className={`
flex
items-center
rounded-xl
px-4
py-3.5
text-sm
font-medium
transition

${
index===0
?
"bg-white/10 text-white"
:
"text-white/70 hover:bg-white/10 hover:text-white"
}

`}

>

{item.label}


{
index===0 && (

<span
className="
ml-auto
h-1.5
w-1.5
rounded-full
bg-[#D4AF37]
"
/>

)
}


</a>


))


}


</motion.div>

)

}

</AnimatePresence>


</div>


</motion.header>

);

}