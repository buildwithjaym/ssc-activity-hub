"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";


export function SSCMessage(){

return (

<section
className="
bg-white
px-5
py-20
sm:px-8
lg:px-10
lg:py-28
"
>

<div
className="
mx-auto
max-w-5xl
"
>


<motion.div

initial={{
opacity:0,
y:25
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true,
amount:.3
}}

transition={{
duration:.7
}}

className="
relative
overflow-hidden
rounded-[2rem]
bg-[#0A2A1F]
px-7
py-12
shadow-2xl
sm:px-14
sm:py-16
"

>


{/* subtle background light */}

<motion.div

animate={{
x:[0,30,0],
y:[0,-20,0]
}}

transition={{
duration:10,
repeat:Infinity,
ease:"easeInOut"
}}

className="
absolute
-right-24
-top-24
h-72
w-72
rounded-full
bg-[#D4AF37]/10
blur-3xl
"

/>



<div
className="
relative
mx-auto
max-w-3xl
text-center
"
>


<motion.div

initial={{
scale:.8,
opacity:0
}}

whileInView={{
scale:1,
opacity:1
}}

viewport={{
once:true
}}

transition={{
duration:.5
}}

className="
mx-auto
flex
h-14
w-14
items-center
justify-center
rounded-full
border
border-[#D4AF37]/40
bg-[#D4AF37]/10
"

>

<Quote
className="
h-7
w-7
text-[#D4AF37]
"
/>

</motion.div>




<p
className="
mt-8
text-[11px]
font-semibold
uppercase
tracking-[0.25em]
text-[#D4AF37]
"
>
Message From Leadership
</p>




<h2
className="
mt-3
text-3xl
font-bold
text-white
sm:text-4xl
"
>
A Message From SSC
</h2>




<motion.div

initial={{
opacity:0,
y:15
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
delay:.2,
duration:.6
}}

className="
mt-8
rounded-2xl
border
border-white/10
bg-white/[0.06]
px-6
py-7
backdrop-blur-sm
"

>

<p
className="
text-base
leading-8
text-white/80
sm:text-lg
"
>
"Parageyan 2026 is more than a competition.
It is a celebration of friendship, talent,
and the shared spirit that connects every
student of Basilan State College."
</p>


</motion.div>





<div
className="
mt-8
"
>

<div
className="
mx-auto
h-px
w-16
bg-[#D4AF37]/50
"
/>


<p
className="
mt-5
text-sm
font-semibold
text-[#D4AF37]
"
>
Supreme Student Council
</p>


<p
className="
mt-1
text-xs
text-white/50
"
>
Basilan State College
</p>


</div>




</div>



</motion.div>


</div>


</section>

);

}