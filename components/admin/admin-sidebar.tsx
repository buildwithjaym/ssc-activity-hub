"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Users,
  Trophy,
  Vote,
  Settings,
  BarChart3,
  LogOut,
  X,
} from "lucide-react";


import { CldImage } from "next-cloudinary";

import { createClient } from "@/lib/supabase/client";

import { SITE_CONFIG } from "@/components/site-config";



const navigation = [

  {
    label:"Dashboard",
    href:"/admin",
    icon:LayoutDashboard,
  },

  {
    label:"Candidates",
    href:"/admin/candidates",
    icon:Trophy,
  },

  {
    label:"Votes",
    href:"/admin/votes",
    icon:Vote,
  },

  {
    label:"Users",
    href:"/admin/users",
    icon:Users,
  },

  {
    label:"Reports",
    href:"/admin/reports",
    icon:BarChart3,
  },

  {
    label:"Settings",
    href:"/admin/settings",
    icon:Settings,
  },

];





interface Props{

open:boolean;

close:()=>void;

}




export default function AdminSidebar({

open,

close

}:Props){



const pathname = usePathname();

const router = useRouter();

const supabase = createClient();





async function handleLogout(){


await supabase.auth.signOut();


router.replace("/voting");


router.refresh();


}






return (


<motion.aside


initial={{
opacity:0,
x:-80
}}


animate={{
opacity:1,
x:0
}}


transition={{
duration:.45,
ease:[0.22,1,0.36,1]
}}



className={`

fixed

left-0

top-0

z-50


flex

h-screen

w-72

flex-col


border-r

border-white/10


bg-[#0A2A1F]


p-6


text-white


transition-transform

duration-300

ease-out



${

open

?

"translate-x-0"

:

"-translate-x-full"

}



lg:translate-x-0

`}


>





{/* MOBILE CLOSE */}


<button

onClick={close}

className="

absolute

right-5

top-5


rounded-lg

p-2

text-white/60


transition

hover:bg-white/10

hover:text-white


lg:hidden

"

>

<X size={20}/>


</button>







{/* BRAND */}



<div

className="

flex

items-center

gap-3


border-b

border-white/10


pb-6

"

>



<div

className="

relative

h-12

w-12

overflow-hidden

rounded-full


border

border-white/20


bg-white


shadow-lg

"

>


<CldImage

src={SITE_CONFIG.images.logo}

alt="SSC Logo"

fill

sizes="48px"

crop="fill"

gravity="auto"

quality="auto"

format="auto"

priority

className="
object-cover
"

/>


</div>




<div>


<p

className="

text-sm

font-bold

tracking-wide

"

>

{SITE_CONFIG.shortName}

</p>



<p

className="

mt-1

text-[9px]

uppercase

tracking-[0.3em]

text-white/50

"

>

Admin Console

</p>



</div>



</div>








{/* NAVIGATION */}



<nav

className="

mt-8

flex-1

space-y-2

"

>



{

navigation.map((item)=>{


const Icon=item.icon;


const active =

pathname === item.href ||

(
item.href !== "/admin" &&
pathname.startsWith(item.href)
);



return (


<Link


key={item.href}


href={item.href}


onClick={close}


className={`

group

relative


flex

items-center

gap-3


rounded-xl


px-4

py-3


text-sm

font-medium


transition-all

duration-300



${

active

?

"bg-white/15 text-white shadow-lg"

:

"text-white/60 hover:bg-white/10 hover:text-white"

}


`}



>



{

active &&

<motion.div

layoutId="active-admin-link"

className="

absolute

left-0

h-8

w-1


rounded-r-full


bg-[#D4AF37]

"

/>

}




<Icon

size={19}


className={`

transition-transform

duration-300


group-hover:scale-110



${

active

?

"text-[#D4AF37]"

:

"text-white/50"

}


`}

/>




<span>

{item.label}

</span>



</Link>


)


})

}



</nav>









{/* EVENT CARD */}



<div

className="

rounded-2xl

border

border-white/10


bg-white/5


p-4

"

>


<p

className="

text-xs

font-semibold

"

>

{SITE_CONFIG.event.name}

</p>



<p

className="

mt-1

text-[10px]

text-white/50

"

>

{SITE_CONFIG.institution}

</p>



</div>







{/* LOGOUT */}



<button


onClick={handleLogout}


className="

mt-4


flex

items-center

gap-3


rounded-xl


px-4

py-3


text-sm

font-medium


text-red-300


transition


hover:bg-red-500/10


hover:text-red-200

"


>


<LogOut size={18}/>


Logout


</button>






</motion.aside>


);


}