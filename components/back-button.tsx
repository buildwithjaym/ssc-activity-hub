"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";


export function BackButton(){

return(

<motion.div

initial={{
opacity:0,
x:-20
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:.4
}}

>

<Link

href="/"

className="
inline-flex
items-center
gap-2
rounded-full
border
border-white/20
bg-white/10
px-4
py-2
text-sm
font-semibold
text-white
backdrop-blur-xl
transition
hover:bg-white/20
"

>

<ArrowLeft className="h-4 w-4"/>

Back to Home

</Link>


</motion.div>

)

}