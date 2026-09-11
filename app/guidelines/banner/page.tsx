"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Palette,
  Trophy,
  Sparkles,
  Users,
  CheckCircle2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const modalSlides = [
  {
    icon: Palette,
    title: "Your college needs your creativity",
    description:
      "Every great celebration needs a symbol. Create a banner that represents your college pride and identity.",
  },
  {
    icon: Sparkles,
    title: "Turn ideas into identity",
    description:
      "Transform your imagination into a meaningful design that showcases teamwork, creativity, and school spirit.",
  },
  {
    icon: Trophy,
    title: "Ready to represent your college?",
    description:
      "Join the Banner Making Contest and become part of the Parageyan 2026 celebration.",
  },
];


const reasons = [
  {
    icon: Palette,
    title: "Express Creativity",
    description:
      "Showcase your artistic skills and create a design with meaning.",
  },
  {
    icon: Users,
    title: "Represent Your College",
    description:
      "Create a banner that reflects your college pride and identity.",
  },
  {
    icon: Sparkles,
    title: "Build Team Spirit",
    description:
      "Work together and create something your community can celebrate.",
  },
  {
    icon: Trophy,
    title: "Be Part of Parageyan",
    description:
      "Leave your mark in one of the biggest student celebrations.",
  },
];


export default function BannerMakingGuidelinesPage() {

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

              const Icon = modalSlides[activeSlide].icon;

              return (

                <>

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">

                    <Icon className="h-8 w-8"/>

                  </div>



                  <h2 className="mt-6 text-2xl font-bold">

                    {modalSlides[activeSlide].title}

                  </h2>



                  <p className="mt-3 text-sm leading-6 text-slate-600">

                    {modalSlides[activeSlide].description}

                  </p>




                  <div className="mt-6 flex justify-center gap-2">

                    {modalSlides.map((_,index)=>(

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





                  {activeSlide === modalSlides.length - 1 ? (

                    <button
                      onClick={()=>setShowModal(false)}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0A2A1F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2A1F]"
                    >

                      View Guidelines

                      <ArrowRight className="h-4 w-4"/>

                    </button>


                  ):(


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

            Creative Competition

          </span>



          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">

            Banner Making Contest

          </h1>



          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">

            Create a banner that represents your college pride,
            creativity, and team spirit during Parageyan 2026.

          </p>




          <div className="mt-8 flex flex-wrap gap-3">


            <Badge
              icon={<Calendar/>}
              text="Sep 28-30, 2026"
            />


            <Badge
              icon={<Palette/>}
              text="Creative Design Challenge"
            />


          </div>


        </div>

      </section>

            {/* CONTENT */}

      <section className="px-5 py-16">

        <div className="mx-auto max-w-4xl space-y-12">



          {/* ABOUT */}

          <Guideline
            title="About the Contest"
          >

            The Banner Making Contest encourages students
            to transform ideas into meaningful visual designs
            that represent their college identity, creativity,
            and school spirit during Parageyan 2026.

          </Guideline>







          {/* WHY JOIN */}

          <section>


            <h2 className="text-2xl font-bold">
              Why Join?
            </h2>


            <p className="mt-3 leading-7 text-slate-600">

              More than just a design competition,
              this is your chance to create something
              your college can be proud of.

            </p>




            <div className="mt-8 grid gap-5 sm:grid-cols-2">


              {reasons.map((reason)=> (

                <ReasonCard
                  key={reason.title}
                  icon={<reason.icon />}
                  title={reason.title}
                  description={reason.description}
                />

              ))}


            </div>


          </section>







          {/* DESIGN REQUIREMENTS */}


          <Guideline
            title="Design Requirements"
            items={[
              "Banner design must be original and creative.",
              "The design should represent the assigned college.",
              "The banner must promote positive school spirit.",
              "Submitted designs must follow the required format and instructions.",
              "Banner Making and Mascot Making are separate competitions.",
            ]}
          />








          {/* JUDGING */}

          <section>


            <h2 className="text-2xl font-bold">
              Criteria for Judging
            </h2>



            <p className="mt-3 leading-7 text-slate-600">

              Entries will be evaluated based on creativity,
              relevance, presentation, and overall impact.

            </p>




            <div className="mt-8 grid gap-4 sm:grid-cols-2">


              <ScoreCard
                title="Creativity & Originality"
                description="How unique and creative the banner concept is."
              />



              <ScoreCard
                title="Theme Relevance"
                description="How well the design represents the purpose and identity of the event."
              />



              <ScoreCard
                title="Visual Presentation"
                description="The quality, arrangement, and overall appearance of the design."
              />



              <ScoreCard
                title="Overall Impact"
                description="The message and impression created by the banner."
              />



            </div>


          </section>








          {/* IMPORTANT REMINDERS */}


          <Guideline
            title="Important Reminders"
            items={[
              "Prepare your design before the submission deadline.",
              "Ensure all submitted entries follow competition guidelines.",
              "Respect originality and avoid copied designs.",
              "Represent your college with pride and creativity.",
            ]}
          />









          {/* FINAL CTA */}


          <div className="rounded-3xl bg-[#0A2A1F] p-7">


            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">


              <div className="flex gap-4">


                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">

                  <Palette className="h-6 w-6"/>

                </div>




                <div>


                  <h3 className="font-bold text-white">

                    Your design can represent your college

                  </h3>




                  <p className="mt-1 text-sm leading-6 text-white/70">

                    Create. Design. Represent.

                    Be part of the Banner Making Contest
                    of Parageyan 2026.

                  </p>


                </div>


              </div>





              <button
                onClick={()=>window.scrollTo({
                  top:0,
                  behavior:"smooth"
                })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A2A1F]"
              >

                Review Guidelines

                <ArrowRight className="h-4 w-4"/>

              </button>


            </div>


          </div>







          <div className="rounded-3xl bg-[#F8F5EF] p-6">


            <div className="flex gap-3">


              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]" />


              <p className="text-sm leading-6 text-slate-600">

                Your creativity can become the symbol
                of your college pride during Parageyan 2026.

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








function ReasonCard({
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








function ScoreCard({
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


<span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />


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