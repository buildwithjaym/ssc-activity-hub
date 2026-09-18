"use client";


import {

CalendarDays,

Clock,

Edit3,

Radio

} from "lucide-react";



interface Props {

settings:any;

onManage:()=>void;

}



export default function VotingStatusCard({

settings,

onManage

}:Props){



const status =
settings?.status ?? "closed";





return (

<div

className="
rounded-3xl
border
bg-white
p-8
shadow-sm
space-y-6
"

>



{/* TOP */}

<div

className="
flex
justify-between
items-start
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

size={20}

className="text-[#D4AF37]"

/>


<h2

className="
text-xl
font-bold
text-[#0A2A1F]
"

>

Voting Status

</h2>


</div>



<p

className="
mt-2
text-sm
text-slate-500
"

>

Current voting configuration

</p>


</div>





{/* STATUS BADGE */}

<div

className={`

px-5

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








{/* EVENT */}

<div

className="
rounded-2xl
bg-[#FAF8F2]
p-5
"

>


<p

className="
text-sm
text-slate-500
"

>

Event

</p>



<h3

className="
mt-1
font-bold
text-lg
text-[#0A2A1F]
"

>

{

settings?.event?.name ??

"Not Assigned"

}


</h3>


</div>







{/* TIME */}

<div

className="
grid
md:grid-cols-2
gap-5
"

>


<div

className="
rounded-2xl
border
p-5
"

>


<div

className="
flex
items-center
gap-2
text-slate-500
text-sm
"

>

<CalendarDays size={16}/>

Start Time

</div>



<p

className="
mt-2
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







<div

className="
rounded-2xl
border
p-5
"

>


<div

className="
flex
items-center
gap-2
text-slate-500
text-sm
"

>

<Clock size={16}/>

End Time

</div>



<p

className="
mt-2
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









{/* ACTION */}

<div

className="
flex
justify-end
"

>


<button


onClick={onManage}


className="
flex
items-center
gap-2
rounded-xl
bg-[#0A2A1F]
px-5
py-3
text-white
font-semibold
hover:opacity-90
"

>


<Edit3 size={18}/>


Manage Voting


</button>



</div>





</div>


);


}