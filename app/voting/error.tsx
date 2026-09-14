"use client";


export default function Error({

reset,

}:{

reset:()=>void

}){


return (

<div className="min-h-screen bg-[#041f18] flex items-center justify-center text-white">

<div className="text-center space-y-5">


<h1 className="text-3xl font-bold">

Something went wrong

</h1>


<p className="text-white/60">

We couldn't load the voting system.

</p>



<button

onClick={reset}

className="rounded-xl bg-yellow-400 px-6 py-3 text-black font-semibold"

>

Try Again

</button>


</div>

</div>

)

}