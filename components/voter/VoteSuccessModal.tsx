"use client";

import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

import { SITE_CONFIG } from "@/components/site-config";


interface Props {

  onClose:()=>void;

}



export default function VoteSuccessModal({

onClose,

}:Props){



return (


<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/30
px-4
backdrop-blur-md
"

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


transition={{

duration:.3

}}



className="
relative
w-full
max-w-sm
rounded-[32px]
bg-white
p-7
text-center
shadow-2xl
"

>



{/* CLOSE */}


<button

onClick={onClose}

className="
absolute
right-4
top-4
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-[#F8F5EF]
text-[#0F3D2E]
transition
hover:scale-105
"

>

<X size={16}/>

</button>








{/* ICON */}


<motion.div


initial={{

scale:0

}}


animate={{

scale:1

}}


transition={{

type:"spring",

stiffness:200,

delay:.1

}}


className="
mx-auto
flex
h-20
w-20
items-center
justify-center
rounded-full
"

style={{

background:"rgba(212,175,55,.15)"

}}

>


<CheckCircle2

size={48}

style={{

color:"#0F3D2E"

}}

/>


</motion.div>









{/* TITLE */}



<h2

className="
mt-6
text-2xl
font-black
tracking-tight
"

style={{

color:"#0A2A1F"

}}

>

Vote Submitted!

</h2>








<p

className="
mt-3
text-sm
leading-relaxed
text-slate-500
"

>

Your vote has been successfully recorded for

</p>





<p

className="
mt-1
font-bold
text-[#D4AF37]
"

>

{SITE_CONFIG.event.name}

</p>









<div

className="
mt-5
rounded-2xl
bg-[#F8F5EF]
px-4
py-3
text-sm
text-slate-600
"

>

Thank you for participating in the People Choice Award.

</div>








<button


onClick={onClose}


className="
mt-6
w-full
rounded-xl
py-3.5
text-sm
font-bold
transition
hover:scale-[1.02]
active:scale-[0.98]
"

style={{

background:"#0F3D2E",

color:"#F8F5EF"

}}

>

Continue Voting

</button>






</motion.div>



</div>



);


}