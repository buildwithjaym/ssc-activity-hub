import {
  LoaderCircle,
} from "lucide-react";


export default function Loading(){


return (

<div

className="
flex
min-h-[70vh]
items-center
justify-center
"

>


<div

className="
flex
flex-col
items-center
gap-4
"

>


<div

className="
rounded-full
bg-[#0A2A1F]
p-4
"

>

<LoaderCircle

size={32}

className="
animate-spin
text-[#D4AF37]
"

/>


</div>



<p

className="
text-sm
font-medium
text-slate-500
"

>

Loading Admin Dashboard...

</p>



</div>



</div>

);


}