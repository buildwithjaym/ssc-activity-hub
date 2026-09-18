"use client";


import {
useState
}
from "react";


import {
X,
Save,
Loader2,
Radio,
Unlock,
PauseCircle,
Lock
}
from "lucide-react";


import {
toast
}
from "sonner";


import {

createVotingSettings,

updateVotingSchedule,

openVoting,

pauseVoting,

closeVoting

}

from "@/lib/votes/settings-actions";



interface Props{


open:boolean;

close:()=>void;

settings:any;

eventId:string;


}



export default function VotingModal({

open,

close,

settings,

eventId

}:Props){



const [loading,setLoading]=useState(false);



const [startTime,setStartTime]=useState(

settings?.start_time
?
settings.start_time.slice(0,16)
:
""

);



const [endTime,setEndTime]=useState(

settings?.end_time
?
settings.end_time.slice(0,16)
:
""

);




if(!open)
return null;




async function saveSchedule(){


try{


setLoading(true);



if(settings){


await updateVotingSchedule(

eventId,

startTime,

endTime

);



toast.success(
"Voting schedule updated"
);



}

else{


await createVotingSettings(

eventId,

startTime,

endTime

);



toast.success(
"Voting configuration created"
);



}



close();



}

catch(error:any){


toast.error(

error.message ||
"Failed saving schedule"

);


}

finally{


setLoading(false);


}


}






async function changeStatus(

action:
"open" |
"pause" |
"close"

){


try{


setLoading(true);



if(action==="open"){


await openVoting(
eventId
);


toast.success(
"Voting opened"
);


}



if(action==="pause"){


await pauseVoting(
eventId
);


toast.success(
"Voting paused"
);


}



if(action==="close"){


await closeVoting(
eventId
);


toast.success(
"Voting closed"
);


}



close();



}

catch(error:any){


toast.error(
error.message
);


}

finally{


setLoading(false);


}



}




return (

<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/40
backdrop-blur-sm
p-5
"

>


<div

className="
w-full
max-w-xl
rounded-3xl
bg-white
shadow-xl
overflow-hidden
"

>


{/* HEADER */}

<div

className="
flex
justify-between
items-center
border-b
px-7
py-5
"

>


<div>


<div className="
flex
items-center
gap-2
">

<Radio
className="text-[#D4AF37]"
/>


<h2 className="
text-xl
font-bold
text-[#0A2A1F]
">

Manage Voting

</h2>


</div>


<p className="
text-sm
text-slate-500
mt-1
">

Control voting availability

</p>


</div>



<button
onClick={close}
>

<X/>

</button>


</div>





<div className="
p-7
space-y-6
">





{/* STATUS */}

<div

className="
rounded-2xl
bg-[#FAF8F2]
p-5
"

>


<p className="
text-sm
text-slate-500
">

Current Status

</p>


<h2 className="
text-2xl
font-bold
mt-1
text-[#0A2A1F]
">

{
settings?.status?.toUpperCase()
||
"CLOSED"
}

</h2>


</div>






{/* DATE */}

<div className="
space-y-4
">


<div>

<label className="
text-sm
font-medium
">

Start Time

</label>


<input

type="datetime-local"

value={startTime}

onChange={
e=>setStartTime(e.target.value)
}

className="
input-style
mt-2
"

>


</input>


</div>




<div>


<label className="
text-sm
font-medium
">

End Time

</label>


<input

type="datetime-local"

value={endTime}

onChange={
e=>setEndTime(e.target.value)
}

className="
input-style
mt-2
"

>


</input>


</div>



</div>





{/* SAVE */}

<button

disabled={loading}

onClick={saveSchedule}

className="
w-full
rounded-xl
bg-[#0A2A1F]
py-3
text-white
font-semibold
flex
justify-center
items-center
gap-2
"

>


{
loading
?
<Loader2 className="animate-spin"/>
:
<Save size={18}/>
}


Save Schedule


</button>







{/* ACTIONS */}

<div className="
grid
grid-cols-3
gap-3
">


<button

onClick={()=>changeStatus("open")}

className="
rounded-xl
bg-green-600
text-white
py-3
font-semibold
flex
justify-center
gap-2
items-center
"

>

<Unlock size={17}/>

Open

</button>





<button

onClick={()=>changeStatus("pause")}

className="
rounded-xl
bg-yellow-500
text-white
py-3
font-semibold
flex
justify-center
gap-2
items-center
"

>


<PauseCircle size={17}/>

Pause


</button>





<button

onClick={()=>changeStatus("close")}

className="
rounded-xl
bg-red-600
text-white
py-3
font-semibold
flex
justify-center
gap-2
items-center
"

>

<Lock size={17}/>

Close

</button>



</div>



</div>



</div>



</div>


)

}