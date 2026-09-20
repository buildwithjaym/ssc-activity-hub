"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { ArrowLeft } from "lucide-react";

import { SITE_CONFIG } from "@/components/site-config";
import LogoutButton from "./LogoutButton";



interface Props {

  showBack?: boolean;

}



export default function VoterNavbar({

showBack=false

}:Props){



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
duration:.4
}}

className="
sticky
top-0
z-50
px-4
pt-4
"

>


<div

className="
mx-auto
max-w-5xl
"

>


<nav

className="
flex
h-16
items-center
justify-between
rounded-2xl
border
border-[#0F3D2E]/10
bg-white
px-4
shadow-sm
"

>






{/* LOGO + EVENT */}


<Link

href="/voter"

className="
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
border-[#D4AF37]/40
"

>


<CldImage

src={SITE_CONFIG.images.logo}

alt="SSC Logo"

fill

sizes="40px"

crop="fill"

gravity="auto"

quality="auto"

format="auto"

className="
object-cover
"

/>


</div>






<div>

<p

className="
text-sm
font-black
text-[#0A2A1F]
"

>

{SITE_CONFIG.shortName}

</p>


<p

className="
text-[9px]
font-bold
uppercase
tracking-[0.2em]
text-[#D4AF37]
"

>

{SITE_CONFIG.event.name}

</p>


</div>



</Link>









{/* ACTIONS */}


<div

className="
flex
items-center
gap-2
"

>


{

showBack &&

<Link

href="/voting"

className="
hidden
sm:flex
items-center
gap-2
rounded-xl
border
border-[#0F3D2E]/20
px-3
py-2
text-xs
font-bold
text-[#0F3D2E]
"

>

<ArrowLeft size={14}/>

Back

</Link>

}



<LogoutButton />


</div>







</nav>


</div>


</motion.header>


);


}