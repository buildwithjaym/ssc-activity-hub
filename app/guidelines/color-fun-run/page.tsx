"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  HeartPulse,
  Trophy,
  Users,
  Sparkles,
  Activity,
  CheckCircle2,
  ShieldCheck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const introSlides = [
  {
    icon: HeartPulse,
    title: "Ready to move with BaSC?",
    description:
      "Join a fun-filled activity where students come together through movement, energy, and school spirit.",
  },
  {
    icon: Sparkles,
    title: "Experience colors and memories",
    description:
      "Enjoy a colorful celebration with your friends while creating unforgettable Parageyan 2026 moments.",
  },
  {
    icon: Trophy,
    title: "Be part of the celebration",
    description:
      "Run together, support each other, and become part of one of the most exciting activities of Parageyan 2026.",
  },
];


const benefits = [
  {
    icon: Activity,
    title: "Stay Active",
    description:
      "Promote health and wellness through an enjoyable physical activity.",
  },
  {
    icon: Users,
    title: "Build Connections",
    description:
      "Create memories with friends, classmates, and the BaSC community.",
  },
  {
    icon: Sparkles,
    title: "Experience Fun",
    description:
      "Enjoy colors, excitement, and positive energy throughout the event.",
  },
  {
    icon: Trophy,
    title: "Celebrate Together",
    description:
      "Become part of the Parageyan 2026 intramurals experience.",
  },
];


export default function ColorFunRunGuidelinesPage() {

  const [showModal,setShowModal] = useState(true);
  const [activeSlide,setActiveSlide] = useState(0);


  return (

    <main className="min-h-screen bg-white text-[#0A2A1F]">


      {/* MODAL */}

      <AnimatePresence>

      {showModal && (

        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
        >


          <motion.div
            initial={{scale:.95,y:20}}
            animate={{scale:1,y:0}}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
          >


            <button
              onClick={()=>setShowModal(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-[#0A2A1F]"
            >

              <X className="h-5 w-5"/>

            </button>



            {(() => {

              const Icon = introSlides[activeSlide].icon;

              return (

                <>

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">

                    <Icon className="h-8 w-8"/>

                  </div>




                  <h2 className="mt-6 text-2xl font-bold">

                    {introSlides[activeSlide].title}

                  </h2>



                  <p className="mt-3 text-sm leading-6 text-slate-600">

                    {introSlides[activeSlide].description}

                  </p>




                  <div className="mt-6 flex justify-center gap-2">

                    {introSlides.map((_,index)=>(

                      <span
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          index===activeSlide
                          ?"w-8 bg-[#D4AF37]"
                          :"w-2 bg-slate-200"
                        }`}
                      />

                    ))}

                  </div>





                  {activeSlide === introSlides.length - 1 ? (

                    <button
                      onClick={()=>setShowModal(false)}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0A2A1F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2A1F]"
                    >

                      View Guidelines

                      <ArrowRight className="h-4 w-4"/>

                    </button>


                  ) : (


                    <button
                      onClick={()=>setActiveSlide(activeSlide+1)}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37]"
                    >

                      Continue

                      <ArrowRight className="h-4 w-4"/>

                    </button>


                  )}


                </>

              );


            })()}


          </motion.div>


        </motion.div>

      )}

      </AnimatePresence>





      {/* HEADER */}

      <header className="border-b border-slate-200">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">


          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
          >

            <ArrowLeft className="h-4 w-4"/>

            Home

          </Link>




          <Link
            href="/#activities"
            className="text-sm font-semibold hover:text-[#D4AF37]"
          >

            Activities

          </Link>


        </div>


      </header>







      {/* HERO */}

      <section className="bg-[#0A2A1F] px-5 py-16">


        <div className="mx-auto max-w-4xl">


          <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase text-[#0A2A1F]">

            Sports Activity

          </span>




          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">

            Color Fun Run

          </h1>




          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">

            Run together. Celebrate together.

            Join your fellow students in a fun-filled
            activity that promotes wellness, friendship,
            and school spirit during Parageyan 2026.

          </p>





          <div className="mt-8 flex flex-wrap gap-3">


            <Badge
              icon={<Calendar/>}
              text="October 6, 2026"
            />



            <Badge
              icon={<Users/>}
              text="Open Participation"
            />


          </div>



        </div>


      </section>

            {/* CONTENT */}

      <section className="px-5 py-16">

        <div className="mx-auto max-w-4xl space-y-12">





          {/* ABOUT */}

          <Guideline title="About the Activity">

            The Color Fun Run is designed to bring students
            together through a fun and energetic activity
            that promotes wellness, friendship, unity, and
            school spirit during Parageyan 2026.

          </Guideline>







          {/* WHY JOIN */}

          <section>


            <h2 className="text-2xl font-bold">

              Why Join?

            </h2>



            <p className="mt-3 leading-7 text-slate-600">

              More than just a run, this activity is a chance
              to connect, celebrate, and create memories with
              the BaSC community.

            </p>




            <div className="mt-8 grid gap-5 sm:grid-cols-2">


              {benefits.map((item)=>(

                <BenefitCard
                  key={item.title}
                  icon={<item.icon />}
                  title={item.title}
                  description={item.description}
                />

              ))}


            </div>


          </section>








          {/* PARTICIPATION GUIDELINES */}


          <Guideline
            title="Participation Guidelines"
            items={[
              "Participants must register before the scheduled activity.",
              "Wear comfortable clothing suitable for running.",
              "Follow the instructions provided by event organizers.",
              "Respect all participants and maintain sportsmanship.",
              "Enjoy the activity while keeping everyone safe.",
            ]}
          />








          {/* PREPARATION */}


          <section>


            <h2 className="text-2xl font-bold">

              Preparation Tips

            </h2>



            <div className="mt-6 grid gap-4 sm:grid-cols-3">


              <InfoCard
                title="Stay Hydrated"
                description="Bring water and prepare your body before the activity."
              />



              <InfoCard
                title="Wear Proper Gear"
                description="Use comfortable clothes and footwear for running."
              />



              <InfoCard
                title="Bring Energy"
                description="Come ready to enjoy, participate, and celebrate."
              />


            </div>


          </section>









          {/* SAFETY */}


          <section className="rounded-3xl bg-[#F8F5EF] p-7">


            <div className="flex gap-4">


              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">


                <ShieldCheck className="h-6 w-6"/>


              </div>





              <div>


                <h3 className="font-bold">

                  Safety First

                </h3>



                <p className="mt-2 text-sm leading-6 text-slate-600">

                  Follow the event route, listen to organizers,
                  and prioritize safety while enjoying the
                  Color Fun Run experience.

                </p>


              </div>


            </div>


          </section>








          {/* REMINDERS */}


          <Guideline
            title="Important Reminders"
            items={[
              "Arrive before the scheduled starting time.",
              "Follow the assigned route and event instructions.",
              "Keep personal belongings secure.",
              "Participate responsibly and enjoy the celebration.",
            ]}
          />









          {/* FINAL CTA */}


          <div className="rounded-3xl bg-[#0A2A1F] p-7">


            <div className="flex gap-4">


              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">


                <HeartPulse className="h-6 w-6"/>


              </div>





              <div>


                <h3 className="font-bold text-white">

                  Run. Celebrate. Create Memories.

                </h3>



                <p className="mt-2 text-sm leading-6 text-white/70">

                  Join the Color Fun Run and become part
                  of the energy and excitement of Parageyan 2026.

                </p>


              </div>


            </div>


          </div>









          <div className="rounded-3xl bg-[#F8F5EF] p-6">


            <div className="flex gap-3">


              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]"/>



              <p className="text-sm leading-6 text-slate-600">

                Bring your friends, enjoy the experience,
                and celebrate the spirit of togetherness
                during Parageyan 2026.

              </p>


            </div>


          </div>



        </div>


      </section>









      {/* FOOTER */}


      <footer className="border-t border-slate-200 px-5 py-8 text-center">


        <Link
          href="/#activities"
          className="inline-flex items-center gap-2 text-sm font-bold hover:text-[#D4AF37]"
        >

          <ArrowLeft className="h-4 w-4"/>

          Back to Activities

        </Link>




        <p className="mt-4 text-xs text-slate-500">

          Supreme Student Council • Parageyan 2026

        </p>


      </footer>


    </main>

  );

}









function Badge({
  icon,
  text,
}:{
  icon:React.ReactNode;
  text:string;
}){


return (

<div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">


<span className="text-[#D4AF37]">

{icon}

</span>


{text}


</div>

);

}









function BenefitCard({
icon,
title,
description,
}:{
icon:React.ReactNode;
title:string;
description:string;
}){


return (

<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">


<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F5EF] text-[#D4AF37]">

{icon}

</div>




<h3 className="mt-5 font-bold">

{title}

</h3>




<p className="mt-2 text-sm leading-6 text-slate-600">

{description}

</p>


</div>

);

}









function InfoCard({
title,
description,
}:{
title:string;
description:string;
}){


return (

<div className="rounded-2xl border border-slate-200 bg-white p-5">


<h3 className="font-bold">

{title}

</h3>



<p className="mt-2 text-sm leading-6 text-slate-600">

{description}

</p>


</div>

);

}









function Guideline({
title,
children,
items,
}:{
title:string;
children?:React.ReactNode;
items?:string[];
}){


return (

<section>


<h2 className="text-2xl font-bold">

{title}

</h2>




{children && (

<p className="mt-3 leading-7 text-slate-600">

{children}

</p>

)}






{items && (

<ul className="mt-4 space-y-3 text-slate-600">


{items.map((item)=>(

<li
key={item}
className="flex gap-3"
>


<span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]"/>



<span>

{item}

</span>


</li>

))}


</ul>

)}


</section>

);

}