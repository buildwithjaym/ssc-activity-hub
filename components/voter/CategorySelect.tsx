"use client";


import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";



interface Category {

  id:string;

  name:string;

}



interface Props {

  categories:Category[];

  selectedCategory:string;

  onChange:(id:string)=>void;

}





export default function CategorySelect({

  categories,

  selectedCategory,

  onChange,

}:Props){



const [open,setOpen]=useState(false);


const containerRef = useRef<HTMLDivElement>(null);





// close outside click

useEffect(()=>{


function handleClick(e:MouseEvent){


if(

containerRef.current &&

!containerRef.current.contains(
e.target as Node
)

){

setOpen(false);

}


}



document.addEventListener(
"mousedown",
handleClick
);



return ()=>{

document.removeEventListener(
"mousedown",
handleClick
);

};


},[]);








const selectedName =

selectedCategory==="all"

?

"All Categories"

:

categories.find(
(item)=>item.id===selectedCategory
)?.name || "Select Category";








return (

<div

ref={containerRef}

className="
relative
mx-auto
w-full
max-w-sm
"

>







{/* EMPTY STATE */}


{

categories.length===0 && (


<div

className="
rounded-xl
border
border-dashed
bg-white
px-4
py-5
text-center
text-sm
text-slate-500
"

>

No categories available.

</div>


)

}







{

categories.length>0 && (



<>



{/* SELECT BUTTON */}


<button


onClick={()=>setOpen(!open)}


className="
flex
w-full
items-center
justify-between
rounded-2xl
border
bg-white
px-5
py-3.5
shadow-sm
transition
hover:shadow-md
"

style={{

borderColor:
"rgba(15,61,46,0.15)"

}}

>





<div className="flex items-center gap-3">



<div

className="
flex
h-7
w-7
items-center
justify-center
rounded-full
"

style={{

background:
"rgba(212,175,55,.15)"

}}

>

<span

className="
h-2
w-2
rounded-full
"

style={{

background:"#D4AF37"

}}

/>


</div>






<span

className="
text-sm
font-semibold
"

style={{

color:"#0A2A1F"

}}

>

{selectedName}

</span>




</div>








<motion.div

animate={{

rotate:
open
?
180
:
0

}}

transition={{

duration:.2

}}

>

<ChevronDown

size={18}

color="#D4AF37"

/>


</motion.div>






</button>










{/* DROPDOWN */}



<AnimatePresence>



{

open && (


<motion.div


initial={{

opacity:0,

y:-10,

scale:.97

}}


animate={{

opacity:1,

y:0,

scale:1

}}



exit={{

opacity:0,

y:-10,

scale:.97

}}



transition={{

duration:.18

}}



className="
absolute
z-50
mt-2
w-full
overflow-hidden
rounded-2xl
border
bg-white
shadow-xl
"

style={{

borderColor:
"rgba(15,61,46,.12)"

}}

>









{/* ALL CATEGORY */}


<button


onClick={()=>{


onChange("all");

setOpen(false);


}}



className="
flex
w-full
items-center
justify-between
px-5
py-3
text-left
text-sm
transition
hover:bg-[#F8F5EF]
"



style={{

color:"#0A2A1F"

}}

>


<span>

All Categories

</span>


{

selectedCategory==="all" && (

<Check

size={16}

color="#D4AF37"

/>

)

}


</button>









{/* CATEGORY LIST */}



{

categories.map((category)=>(


<button


key={category.id}



onClick={()=>{


onChange(category.id);

setOpen(false);


}}



className="
flex
w-full
items-center
justify-between
px-5
py-3
text-left
text-sm
transition
hover:bg-[#F8F5EF]
"



style={{

color:"#0A2A1F"

}}

>



<div

className="
flex
items-center
gap-3
"

>


<span

className="
h-2
w-2
rounded-full
"

style={{

background:"#D4AF37"

}}

/>


<span>

{category.name}

</span>


</div>








{

selectedCategory===category.id && (

<Check

size={16}

color="#D4AF37"

/>

)

}



</button>



))

}





</motion.div>


)

}



</AnimatePresence>





</>


)

}








</div>

);


}