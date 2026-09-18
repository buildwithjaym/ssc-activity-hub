"use client";


import {
useEffect,
useState
} from "react";


import {
Clock,
PlayCircle,
Flag,
PauseCircle
} from "lucide-react";



interface Props{

start?:string|null;

end?:string|null;

status?:
"open"
|
"paused"
|
"closed";

}



export default function VotingCountdown({

start,

end,

status="closed"

}:Props){



const [now,setNow]=useState(
new Date()
);





/*
|--------------------------------------------------------------------------
| LIVE CLOCK
|--------------------------------------------------------------------------
*/

useEffect(()=>{


const interval=setInterval(()=>{

setNow(
new Date()
);

},1000);



return()=>clearInterval(interval);


},[]);






function calculate(

target:string

){


const difference =
new Date(target).getTime()
-
now.getTime();



if(difference<=0)

return {
days:0,
hours:0,
minutes:0,
seconds:0
};



return {


days:
Math.floor(
difference /
86400000
),


hours:
Math.floor(
difference /
3600000
)%24,


minutes:
Math.floor(
difference /
60000
)%60,


seconds:
Math.floor(
difference /
1000
)%60


};


}







if(!start || !end){

return null;

}




/*
|--------------------------------------------------------------------------
| CLOSED
|--------------------------------------------------------------------------
*/


if(status==="closed"){


return (

<Card>

<Flag size={20}/>

<h2>
Voting Closed
</h2>

<p>
Voting is not available.
</p>


</Card>

);


}






/*
|--------------------------------------------------------------------------
| PAUSED
|--------------------------------------------------------------------------
*/


if(status==="paused"){


return (

<Card>

<PauseCircle size={20}/>

<h2>

Voting Paused

</h2>


<p>

Countdown temporarily stopped.

</p>


</Card>


);


}





const current =
now.getTime();



const startTime =
new Date(start)
.getTime();



const endTime =
new Date(end)
.getTime();






/*
|--------------------------------------------------------------------------
| BEFORE START
|--------------------------------------------------------------------------
*/


if(current < startTime){


const time =
calculate(start);



return (

<CountdownCard

icon={<PlayCircle/>}

title="Voting starts in"

time={time}

/>

);


}






/*
|--------------------------------------------------------------------------
| ACTIVE
|--------------------------------------------------------------------------
*/


if(
current >= startTime
&&
current < endTime
){


const time =
calculate(end);



return (

<CountdownCard

icon={<Clock/>}

title="Voting ends in"

time={time}

/>

);


}







return (

<Card>

<Flag size={20}/>

<h2>

Voting Ended

</h2>


<p>

The voting period has finished.

</p>


</Card>


);


}







function CountdownCard({

icon,

title,

time

}:any){


return (

<div

className="
rounded-3xl
bg-[#062B20]
text-white
p-6
"

>


<div

className="
flex
gap-3
items-center
text-white/60
"

>

{icon}

<span>

Voting Countdown

</span>


</div>



<h2

className="
text-2xl
font-bold
mt-3
"

>

{title}

</h2>




<div

className="
grid
grid-cols-4
gap-3
mt-5
"

>


<Box

value={time.days}

label="Days"

/>


<Box

value={time.hours}

label="Hours"

/>


<Box

value={time.minutes}

label="Minutes"

/>


<Box

value={time.seconds}

label="Seconds"

/>


</div>



</div>


);


}








function Box({

value,

label

}:any){


return (

<div

className="
rounded-2xl
bg-white/10
p-4
text-center
"

>


<div

className="
text-3xl
font-bold
"

>

{
String(value)
.padStart(2,"0")
}

</div>



<p

className="
text-xs
uppercase
text-white/60
"

>

{label}

</p>



</div>

);


}







function Card({

children

}:any){


return (

<div

className="
rounded-3xl
bg-[#062B20]
text-white
p-6
flex
items-center
gap-3
"

>

{children}

</div>

);


}