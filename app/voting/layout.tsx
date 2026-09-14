import VotingNavbar from "@/components/voting/voting-navbar";
import { BackButton } from "@/components/back-button";
import { Trophy } from "lucide-react";


export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {


return (

<div className="
relative
min-h-screen
overflow-hidden
bg-[#041F18]
text-white
">


{/* Background Glow */}

<div className="
pointer-events-none
absolute
inset-0
bg-[radial-gradient(circle_at_top_right,#D4AF3735,transparent_35%)]
"/>


<div className="
pointer-events-none
absolute
left-0
top-1/3
h-96
w-96
rounded-full
bg-emerald-400/10
blur-3xl
"/>



<VotingNavbar/>



<main className="
relative
pt-24
">

{children}

</main>



<footer className="
relative
mt-24
border-t
border-white/10
">


<div className="
mx-auto
flex
max-w-7xl
flex-col
gap-6
px-6
py-10
text-sm
text-white/50
md:flex-row
md:items-center
md:justify-between
">


<div>

<p className="
font-semibold
text-white/80
">

Basilan State College

</p>


<p className="
mt-1
text-xs
uppercase
tracking-[0.25em]
">

Intramurals 2026

</p>


</div>



<div className="
flex
items-center
gap-3
">

<Trophy 
className="text-[#D4AF37]"
size={18}
/>


<p>
People's Choice Award
</p>


</div>



<BackButton/>


</div>


</footer>


</div>

);

}