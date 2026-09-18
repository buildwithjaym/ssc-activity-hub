"use client";


import {
Clock,
CalendarDays,
Radio
}
from "lucide-react";


export default function VotingLiveStatus({

settings,

onManage

}:any){



const status =
  settings?.status as
  | "open"
  | "paused"
  | "closed"
  | undefined
  ?? "closed";



const statusConfig = {

  open:{
    label:"OPEN",
    color:
    "bg-green-100 text-green-700"
  },


  paused:{
    label:"PAUSED",
    color:
    "bg-yellow-100 text-yellow-700"
  },


  closed:{
    label:"CLOSED",
    color:
    "bg-red-100 text-red-700"
  }

} as const;



const currentStatus =
statusConfig[status];


return (

<div className="
rounded-3xl
border
bg-white
p-8
space-y-6
">


<div className="
flex
justify-between
">


<div>

<div className="
flex
gap-2
items-center
">

<Radio
className="text-[#D4AF37]"
/>

<h2 className="
font-bold
text-xl
">

Voting Status

</h2>

</div>


<p className="
text-sm
text-slate-500
">

Realtime monitoring

</p>

</div>



<span
className={`
px-5
py-2
rounded-full
font-bold
${currentStatus.color}
`}
>

{currentStatus.label}

</span>


</div>



<div className="
grid
md:grid-cols-2
gap-5
">


<div>

<p className="
text-sm
text-slate-500
flex
gap-2
">

<CalendarDays size={15}/>

Start

</p>


<b>

{
settings?.start_time
?
new Date(settings.start_time)
.toLocaleString()
:
"N/A"
}

</b>


</div>



<div>

<p className="
text-sm
text-slate-500
flex
gap-2
">

<Clock size={15}/>

End

</p>


<b>

{
settings?.end_time
?
new Date(settings.end_time)
.toLocaleString()
:
"N/A"
}

</b>


</div>


</div>



<button

onClick={onManage}

className="
rounded-xl
bg-[#0A2A1F]
px-5
py-3
text-white
font-semibold
"

>

Manage Voting

</button>


</div>

)

}