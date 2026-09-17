"use client";

import { useState } from "react";

import {
  Menu,
} from "lucide-react";


import AdminSidebar from "@/components/admin/admin-sidebar";

import AdminHeader from "@/components/admin/admin-header";



export default function AdminShell({

children,

profile,

}:{

children:React.ReactNode;

profile:any;

}){


const [open,setOpen]=useState(false);



return (

<div

className="
min-h-screen
bg-[#FAF8F2]
text-[#0A2A1F]
"

>



{/* MOBILE OVERLAY */}

{

open && (

<div

onClick={()=>setOpen(false)}

className="
fixed
inset-0
z-40

bg-black/30

backdrop-blur-sm

lg:hidden
"

/>

)

}





{/* SIDEBAR */}


<AdminSidebar

open={open}

close={()=>setOpen(false)}

/>








{/* CONTENT AREA */}


<div

className="
lg:ml-72
"

>




<header

className="
sticky
top-0
z-30

flex

h-20

items-center

justify-between

border-b

border-[#0A2A1F]/10

bg-[#FAF8F2]/90

px-5

backdrop-blur-xl

sm:px-8

"

>




{/* MOBILE MENU */}


<button


onClick={()=>setOpen(true)}


className="

rounded-xl

border

border-[#0A2A1F]/10

p-2

transition

hover:bg-[#0A2A1F]/5


lg:hidden

"

>

<Menu size={22}/>


</button>







{/* ADMIN PROFILE */}


<div

className="
ml-auto
"

>


<AdminHeader

profile={profile}

/>


</div>




</header>






<main

className="
px-5

py-8

sm:px-8

"

>


{children}


</main>





</div>





</div>

)

}