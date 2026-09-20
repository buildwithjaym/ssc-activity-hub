import { SITE_CONFIG } from "@/components/site-config";


export default function VoterHero(){

return (

<section

className="
bg-[#F8F5EF]
px-5
pt-10
pb-6
text-center
"

>


<p

className="
text-xs
font-bold
uppercase
tracking-[0.3em]
"

style={{
color:"#D4AF37"
}}

>

{SITE_CONFIG.event.name}

</p>



<h1

className="
mt-2
text-3xl
font-extrabold
sm:text-4xl
"

style={{

color:"#0A2A1F"

}}

>

People Choice Award

</h1>



<p

className="
mx-auto
mt-3
max-w-md
text-sm
text-slate-500
"

>

Choose your favorite candidate and cast your vote.

Your voice matters in Parageyan 2026.

</p>



<div

className="
mx-auto
mt-5
h-1
w-20
rounded-full
"

style={{

background:"#D4AF37"

}}

/>


</section>

)

}