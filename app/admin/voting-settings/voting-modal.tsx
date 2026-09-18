"use client";


import {
useState
} from "react";


import {
X,
Save,
Loader2,
Radio,
Unlock,
PauseCircle,
Lock
} from "lucide-react";


import {
toast
} from "sonner";


import {
createVotingSettings,
updateVotingSchedule,
openVoting,
pauseVoting,
closeVoting
} from "@/app/admin/voting-settings/actions";



import {
convertToManilaTime
} from "@/lib/utils/date-helper";



interface Props {

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

formatInput(
settings.start_time
)

:

""

);



const [endTime,setEndTime]=useState(

settings?.end_time

?

formatInput(
settings.end_time
)

:

""

);




if(!open)
return null;





function formatInput(
date:string
){

const d =
new Date(date);



const offset =
d.getTimezoneOffset();



const local =
new Date(
d.getTime()-offset*60000
);



return local
.toISOString()
.slice(
0,
16
);

}







async function saveSchedule(){


try{


setLoading(true);



const start =
convertToManilaTime(
startTime
);



const end =
convertToManilaTime(
endTime
);





if(settings){


await updateVotingSchedule(

eventId,

start!,

end!

);



toast.success(
"Schedule updated"
);



}

else{


await createVotingSettings(

eventId,

start!,

end!

);



toast.success(
"Voting configuration created"
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







async function changeStatus(

action:
"open"|
"pause"|
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

<div className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/40
p-5
">


<div className="
bg-white
rounded-3xl
w-full
max-w-xl
p-8
">



<div className="
flex
justify-between
items-center
mb-6
">


<div className="
flex
gap-2
items-center
">

<Radio
className="text-[#D4AF37]"
/>


<h2 className="
text-xl
font-bold
text-[#0A2A1F]
">

{
settings
?
"Edit Voting Schedule"
:
"Create Voting Schedule"
}

</h2>


</div>



<button
onClick={close}
>

<X/>

</button>


</div>







<div className="
space-y-5
">



<div>

<label className="
text-sm
font-semibold
">

Start Time

</label>


<input

type="datetime-local"

value={startTime}

onChange={
e=>setStartTime(
e.target.value
)
}

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>






<div>

<label className="
text-sm
font-semibold
">

End Time

</label>


<input

type="datetime-local"

value={endTime}

onChange={
e=>setEndTime(
e.target.value
)
}

className="
w-full
border
rounded-xl
p-3
mt-2
"

/>


</div>







<button

onClick={saveSchedule}

disabled={loading}

className="
w-full
bg-[#0A2A1F]
text-white
rounded-xl
py-3
font-bold
flex
justify-center
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








</div>


</div>


</div>


)

}