"use client";


import {
useState
} from "react";


import {
Play,
Pause,
Square,
Radio,
Clock
} from "lucide-react";


import {
toast
} from "sonner";


import {
updateVotingStatus
} from "@/lib/votes/actions";



interface Props{

eventId:string;

settings:any;

}



export default function VotingControl({

eventId,

settings

}:Props){


const [loading,setLoading]=useState(false);



async function changeStatus(
status:"open"|"paused"|"closed"
){


try{


setLoading(true);



await updateVotingStatus(
eventId,
status
);



toast.success(
`Voting ${status}`
);



}catch(error:any){


toast.error(
error.message
);



}finally{


setLoading(false);


}



}





const status =
settings?.status ?? "closed";



return (

<div
className="
rounded-3xl
border
bg-white
p-6
space-y-6
"
>


{/* HEADER */}

<div
className="
flex
justify-between
items-center
"
>


<div>


<div
className="
flex
items-center
gap-2
"
>

<Radio
className="
text-[#D4AF37]
"
/>


<h2
className="
text-xl
font-bold
text-[#0A2A1F]
"
>

Voting Control

</h2>


</div>


<p
className="
text-sm
text-slate-500
mt-1
"
>

Manage People's Choice Award voting

</p>


</div>





{/* STATUS */}

<div
className={`
px-4
py-2
rounded-full
font-bold
text-sm

${
status==="open"

?

"bg-green-100 text-green-700"

:

status==="paused"

?

"bg-yellow-100 text-yellow-700"

:

"bg-red-100 text-red-700"

}

`}
>


{status.toUpperCase()}


</div>


</div>





{/* DETAILS */}

<div
className="
grid
md:grid-cols-2
gap-5
bg-[#FAF8F2]
rounded-2xl
p-5
"
>


<div>


<p
className="
text-sm
text-slate-500
"
>

Start Time

</p>


<p
className="
font-semibold
"
>

{
settings?.start_time

?

new Date(
settings.start_time
)
.toLocaleString()

:

"N/A"

}

</p>


</div>




<div>


<p
className="
text-sm
text-slate-500
"
>

End Time

</p>


<p
className="
font-semibold
"
>

{
settings?.end_time

?

new Date(
settings.end_time
)
.toLocaleString()

:

"N/A"

}

</p>


</div>


</div>






{/* BUTTONS */}

<div
className="
grid
md:grid-cols-3
gap-4
"
>


<button

disabled={loading}

onClick={()=>changeStatus("open")}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-green-600
px-5
py-3
text-white
font-semibold
hover:opacity-90
"

>

<Play size={18}/>

Start Voting

</button>





<button

disabled={loading}

onClick={()=>changeStatus("paused")}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-yellow-500
px-5
py-3
text-white
font-semibold
hover:opacity-90
"

>

<Pause size={18}/>

Pause

</button>





<button

disabled={loading}

onClick={()=>changeStatus("closed")}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-red-600
px-5
py-3
text-white
font-semibold
hover:opacity-90
"

>

<Square size={18}/>

Close Voting

</button>



</div>






{
loading &&

<div
className="
text-center
text-sm
text-slate-500
flex
justify-center
gap-2
items-center
"
>

<Clock size={15}/>

Updating voting status...

</div>

}



</div>

);


}