"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";


import {
  Trash2,
  X,
  Loader2,
} from "lucide-react";


interface Props {

open:boolean;

close:()=>void;

confirm:()=>void;

loading?:boolean;

name:string;

}



export default function DeleteModal({

open,

close,

confirm,

loading,

name,

}:Props){


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
y:30
}}

animate={{
scale:1,
y:0
}}

exit={{
scale:.95,
y:30
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
items-start
justify-between
">


<div className="
flex
gap-4
">


<div className="
rounded-2xl
bg-red-100
p-3
">

<Trash2

size={24}

className="
text-red-600
"

/>

</div>


<div>


<h2 className="
text-xl
font-bold
text-[#0A2A1F]
">

Delete Candidate

</h2>


<p className="
mt-1
text-sm
text-slate-500
">

This action cannot be undone.

</p>


</div>


</div>



<button

onClick={close}

className="
rounded-xl
p-2
hover:bg-black/5
"

>

<X size={18}/>

</button>


</div>





<div className="
mt-6
rounded-2xl
bg-[#FAF8F2]
p-4
text-sm
"

>


You are about to delete:


<p className="
mt-2
font-semibold
text-[#0A2A1F]
">

{name}

</p>


</div>






<div className="
mt-6
flex
gap-3
"

>


<button

onClick={close}

disabled={loading}

className="
flex-1
rounded-xl
border
py-3
font-semibold
text-slate-600
hover:bg-slate-50
"

>

Cancel

</button>




<button

onClick={confirm}

disabled={loading}

className="
flex-1
rounded-xl
bg-red-600
py-3
font-semibold
text-white
flex
items-center
justify-center
gap-2
hover:bg-red-700
disabled:opacity-50
"

>


{

loading

?

<Loader2

size={18}

className="animate-spin"

/>

:

<Trash2 size={18}/>

}


Delete


</button>



</div>



</motion.div>


</motion.div>


}


</AnimatePresence>

);

}