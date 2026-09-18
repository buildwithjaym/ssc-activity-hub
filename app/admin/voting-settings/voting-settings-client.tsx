"use client";


import {
useEffect,
useState
} from "react";


import {
CalendarDays,
Settings,
Plus,
Clock,
Edit3,
Unlock,
PauseCircle,
Lock,
Trash2,
Radio,
PlayCircle
} from "lucide-react";


import {
toast
} from "sonner";


import {
useRouter
} from "next/navigation";


import {
createClient
} from "@/lib/supabase/client";



import {
formatVotingDate
} from "@/lib/utils/date-format";


import VotingModal from "./voting-modal";

import ConfirmationModal from "./confirmation-modal";

import VotingCountdown from "./voting-countdown";



import {
  openVoting,
  pauseVoting,
  resumeVoting,
  closeVoting,
  deleteVotingSettings
} from "./actions";





type ActionType =
| "open"
| "pause"
| "resume"
| "close"
| "delete";



const confirmData={


open:{
title:"Open Voting?",
message:"Voting will become available.",
confirmText:"Open",
danger:false
},


pause:{
title:"Pause Voting?",
message:"Voting will temporarily stop.",
confirmText:"Pause",
danger:false
},


resume:{
title:"Resume Voting?",
message:"Voting will become active again.",
confirmText:"Resume",
danger:false
},


close:{
title:"Close Voting?",
message:"Users will no longer vote.",
confirmText:"Close",
danger:true
},


delete:{
title:"Delete Voting?",
message:"This cannot be undone.",
confirmText:"Delete",
danger:true
}


};




export default function VotingSettingsClient({

events,

initialEvent,

initialSettings

}:any){



const router = useRouter();


const supabase =
createClient();




const [selectedEvent,setSelectedEvent]
=
useState(initialEvent);



const [settings,setSettings]
=
useState(initialSettings);



const [showModal,setShowModal]
=
useState(false);



const [confirm,setConfirm]
=
useState<ActionType|null>(null);



const [actionLoading,setActionLoading]
=
useState(false);





async function refreshSettings(){


if(!selectedEvent?.id)
return;



const {

data,

error

}=await supabase

.from("voting_settings")

.select("*")

.eq(

"event_id",

selectedEvent.id

)

.maybeSingle();



if(error){

toast.error(error.message);

return;

}



setSettings(data);

router.refresh();

}









async function changeEvent(id:string){


const event =
events.find(
(e:any)=>e.id===id
);



setSelectedEvent(event);



setTimeout(()=>{

refreshSettings();

},200);



}










useEffect(()=>{


if(!selectedEvent?.id)
return;



const channel =

supabase

.channel(
`settings-${selectedEvent.id}`
)



.on(

"postgres_changes",

{

event:"*",

schema:"public",

table:"voting_settings",

filter:

`event_id=eq.${selectedEvent.id}`

},


()=>{

refreshSettings();

toast.success(
"Voting settings updated"
);


}

)



.subscribe();





return()=>{

supabase.removeChannel(channel);

};


},[
selectedEvent?.id
]);




async function executeAction(){

if(!confirm || !selectedEvent)
return;


try{

setActionLoading(true);


let updated;


switch(confirm){


case "open":

updated =
await openVoting(
selectedEvent.id
);

break;



case "pause":

updated =
await pauseVoting(
selectedEvent.id
);

break;



case "resume":

updated =
await resumeVoting(
selectedEvent.id
);

break;



case "close":

updated =
await closeVoting(
selectedEvent.id
);

break;



case "delete":

await deleteVotingSettings(
selectedEvent.id
);

setSettings(null);

toast.success(
"Deleted"
);

setConfirm(null);

return;


}


setSettings(updated);


setConfirm(null);


toast.success(
"Voting updated"
);


}

catch(error:any){

toast.error(
error.message
);

}

finally{

setActionLoading(false);

}

}






return (

<div className="space-y-8">



{/* HEADER */}

<div>


<p className="
text-xs
tracking-[0.3em]
uppercase
font-bold
text-[#D4AF37]
">

PARAGEYAN 2026

</p>



<h1 className="
flex
items-center
gap-3
mt-3
text-3xl
font-bold
text-[#0A2A1F]
">

<Settings/>

Voting Control Center

</h1>


<p className="text-slate-500 mt-2">

Manage voting configuration and realtime status.

</p>


</div>








{/* EVENT SELECT */}

<div className="
bg-white
border
rounded-3xl
p-6
">


<div className="
flex
gap-3
items-center
mb-4
">

<CalendarDays
className="text-[#D4AF37]"
/>


<h2 className="font-bold text-xl">

Select Event

</h2>


</div>



<select

value={
selectedEvent?.id ?? ""
}

onChange={
e=>changeEvent(
e.target.value
)
}

className="
w-full
border
rounded-xl
px-4
py-3
"

>


{

events.map((event:any)=>(

<option
key={event.id}
value={event.id}
>

{event.name} - {event.year}

</option>

))

}


</select>



</div>









{/* CONFIGURATION */}

<div className="
bg-white
border
rounded-3xl
p-8
">



<div className="
flex
justify-between
items-center
">

<h2 className="text-xl font-bold">

Voting Configuration

</h2>




<span className={`

px-5
py-2
rounded-full
font-bold

${

settings?.status==="open"

?

"bg-green-100 text-green-700"

:

settings?.status==="paused"

?

"bg-yellow-100 text-yellow-700"

:

"bg-red-100 text-red-700"

}

`}>

{
settings?.status?.toUpperCase()
??
"CLOSED"
}

</span>


</div>









{settings ? (


<>


<div className="
grid
md:grid-cols-2
gap-5
mt-8
">


<DateCard

title="Start Time"

value={settings.start_time}

/>


<DateCard

title="End Time"

value={settings.end_time}

/>


</div>





<VotingCountdown

start={settings.start_time}

end={settings.end_time}

status={settings.status}

/>





<div className="
flex
flex-wrap
gap-3
mt-6
">


<ActionButton

text="Edit Schedule"

icon={<Edit3/>}

onClick={()=>setShowModal(true)}

className="bg-[#0A2A1F] text-white"

/>



{
settings.status==="closed" &&

<ActionButton

text="Open"

icon={<Unlock/>}

onClick={()=>setConfirm("open")}

className="bg-green-600 text-white"

/>

}




{
settings.status==="open" &&

<ActionButton

text="Pause"

icon={<PauseCircle/>}

onClick={()=>setConfirm("pause")}

className="bg-yellow-500 text-white"

/>

}




{
settings.status==="paused" &&

<ActionButton

text="Resume"

icon={<PlayCircle/>}

onClick={()=>setConfirm("resume")}

className="bg-green-600 text-white"

/>

}




{
settings.status!=="closed" &&

<ActionButton

text="Close"

icon={<Lock/>}

onClick={()=>setConfirm("close")}

className="bg-red-600 text-white"

/>

}



<ActionButton

text="Delete"

icon={<Trash2 size={18}/>}

onClick={()=>setConfirm("delete")}

className="
border
border-red-500
text-black-600
bg-white
hover:bg-red-50
"

/>

</div>


<p className="
mt-5
text-sm
text-slate-500
flex
gap-2
items-center
">

<Radio size={15}/>

Last Updated:

{
formatVotingDate(
settings.updated_at
)
}


</p>


</>


)

:

(
<div
className="
text-center
py-12
"
>

<h2
className="
text-xl
font-bold
text-[#0A2A1F]
"
>
No Voting Configuration
</h2>


<p
className="
text-slate-500
mt-2
"
>
Create a voting schedule for this event.
</p>



<button

disabled={!selectedEvent?.id}

onClick={()=>{

if(!selectedEvent?.id){

toast.error(
"No event selected"
);

return;

}


setShowModal(true);

}}

className="
mt-5
inline-flex
items-center
gap-2
bg-[#0A2A1F]
hover:bg-[#123d2e]
text-white
px-6
py-3
rounded-xl
font-semibold
transition
disabled:opacity-50
"

>

<Plus size={18}/>

Create Voting

</button>


</div>

)


}


</div>









{showModal && (

<VotingModal

open={true}

close={()=>{

setShowModal(false);

refreshSettings();

}}

settings={settings}

eventId={selectedEvent.id}

/>

)}









{confirm && (

<ConfirmationModal

open={true}

title={confirmData[confirm].title}

message={confirmData[confirm].message}

confirmText={
confirmData[confirm].confirmText
}

danger={
confirmData[confirm].danger
}

loading={actionLoading}

onCancel={()=>
setConfirm(null)
}

onConfirm={executeAction}

/>

)}





</div>

);


}









function DateCard({
title,
value
}:any){

return (

<div className="
border
rounded-2xl
p-5
">

<p className="
text-sm
text-slate-500
flex
gap-2
items-center
">

<Clock size={15}/>

{title}

</p>


<h3 className="font-bold mt-2">

{
formatVotingDate(value)
}

</h3>


</div>

)

}






function ActionButton({

text,

icon,

onClick,

className

}:any){

return (

<button

onClick={onClick}

className={`

flex

items-center

gap-2

px-5

py-3

rounded-xl

font-semibold

transition

hover:opacity-90

${className}

`}

>

{icon}

{text}

</button>

)

}