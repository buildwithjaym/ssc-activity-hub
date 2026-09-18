"use client";

import {
AnimatePresence,
motion
} from "framer-motion";

import {
X,
CheckCircle,
XCircle,
Loader2
} from "lucide-react";


interface Props{

open:boolean;

close:()=>void;

confirm:()=>void;

name:string;

status:string;

loading:boolean;

}


export default function StatusModal({

open,

close,

confirm,

name,

status,

loading

}:Props){


const activate =
status==="inactive";


return (

<AnimatePresence>

{
open &&

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

onClick={close}

className="
fixed
inset-0
z-[60]
flex
items-center
justify-center
bg-black/40
backdrop-blur-sm
p-4
"

>


<motion.div

initial={{
scale:.95,
y:20
}}

animate={{
scale:1,
y:0
}}

exit={{
scale:.95,
y:20
}}

onClick={(e)=>e.stopPropagation()}

className="
w-full
max-w-md
rounded-3xl
bg-white
p-7
shadow-2xl
"

>


<div className="
flex
justify-between
items-center
">


<div>

<h2 className="
text-xl
font-bold
text-[#0A2A1F]
">

{
activate
?
"Activate Candidate"
:
"Deactivate Candidate"
}

</h2>


<p className="
mt-1
text-sm
text-slate-500
">

{name}

</p>


</div>


<button
onClick={close}
>

<X/>

</button>


</div>



<div className="
mt-6
flex
justify-center
">


{
activate

?

<CheckCircle
size={55}
className="
text-green-600
"
/>

:

<XCircle
size={55}
className="
text-orange-600
"
/>

}


</div>



<p className="
mt-5
text-center
text-sm
text-slate-600
">

Are you sure you want to

{" "}

{
activate
?
"activate"
:
"deactivate"
}

this candidate?

</p>



<div className="
mt-7
flex
gap-3
">


<button

disabled={loading}

onClick={close}

className="
flex-1
rounded-xl
border
py-3
font-semibold
"

>

Cancel

</button>



<button

disabled={loading}

onClick={confirm}

className="
flex-1
rounded-xl
bg-[#0A2A1F]
py-3
font-semibold
text-white
"

>


{
loading

?

<Loader2 className="animate-spin mx-auto"/>

:

activate
?
"Activate"
:
"Deactivate"

}


</button>


</div>


</motion.div>


</motion.div>

}

</AnimatePresence>

)

}