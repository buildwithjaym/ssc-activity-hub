"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Calendar,
  Trophy,
  Users,
  ClipboardCheck,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const registrationLink =
  "https://forms.google.com/your-registration-form";



const introSlides = [
  {
    icon: Brain,
    title: "Challenge your knowledge",
    description:
      "Test your understanding of Basilan State College history, policies, programs, and institutional information.",
  },
  {
    icon: Users,
    title: "Represent your college",
    description:
      "Build your team, collaborate with your members, and compete with other first-year students.",
  },
  {
    icon: Trophy,
    title: "Compete for recognition",
    description:
      "Show your knowledge and compete for exciting prizes while representing your college with pride.",
  },
  {
    icon: ClipboardCheck,
    title: "Ready for the challenge?",
    description:
      "Register your team or review the complete mechanics before joining Battle of the Brains.",
  },
];





export default function BattleOfTheBrainsPage() {

  const [showModal, setShowModal] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);



  return (

    <main className="min-h-screen bg-white text-[#0A2A1F]">


      {/* INTRO MODAL */}

      <AnimatePresence>

        {showModal && (

          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
          >


            <motion.div
              initial={{ opacity:0, scale:.95, y:20 }}
              animate={{ opacity:1, scale:1, y:0 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
            >


              <button
                onClick={()=>setShowModal(false)}
                className="absolute right-5 top-5 text-slate-400 hover:text-[#0A2A1F]"
              >

                <X className="h-5 w-5"/>

              </button>





              {(() => {

                const Icon =
                  introSlides[activeSlide].icon;


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
                            index === activeSlide
                            ? "w-8 bg-[#D4AF37]"
                            : "w-2 bg-slate-200"
                          }`}
                        />

                      ))}

                    </div>





                    {activeSlide === introSlides.length - 1 ? (

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">


                        <a
                          href={registrationLink}
                          target="_blank"
                          className="flex-1 rounded-full bg-[#0A2A1F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2A1F]"
                        >

                          Register Team

                        </a>




                        <button
                          onClick={()=>setShowModal(false)}
                          className="flex-1 rounded-full border border-[#0A2A1F] px-5 py-3 text-sm font-bold"
                        >

                          View Guidelines

                        </button>


                      </div>


                    ) : (


                      <button
                        onClick={()=>setActiveSlide(activeSlide + 1)}
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


        <div className="mx-auto max-w-5xl">



          <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase text-[#0A2A1F]">

            Academic Competition

          </span>





          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">

            Battle of the Brains

          </h1>





          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">

            An academic competition that challenges students'
            knowledge about Basilan State College history,
            policies, programs, and institutional information.

          </p>





          <div className="mt-10 grid gap-4 sm:grid-cols-2">



            <HighlightCard
              icon={<Calendar />}
              label="Activity"
              value="October 9, 2026"
            />



            <HighlightCard
              icon={<Trophy />}
              label="Top Prize"
              value="₱1,000 + Certificate"
            />



          </div>





          <div className="mt-8 rounded-3xl border border-[#D4AF37]/30 bg-white/10 p-6">


            <div className="flex gap-4">


              <Brain className="h-7 w-7 text-[#D4AF37]"/>



              <div>


                <h3 className="font-bold text-white">

                  Test your BaSC knowledge

                </h3>



                <p className="mt-1 text-sm leading-6 text-white/70">

                  Compete with other colleges through
                  teamwork, critical thinking, and institutional knowledge.

                </p>


              </div>



            </div>


          </div>





          <a
            href={registrationLink}
            target="_blank"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-white"
          >

            Register Team

            <ArrowRight className="h-4 w-4"/>

          </a>




        </div>


      </section>

            {/* PARTICIPANTS */}

      <section className="px-5 py-16">

        <div className="mx-auto max-w-5xl space-y-10">


          <Section
            title="Who Can Join?"
            items={[
              "Open to first-year students of Basilan State College.",
              "Each college may send one official team.",
              "Each team must have three official members.",
              "Each team must assign one team captain.",
              "All participants must complete the official registration process.",
            ]}
          />





          {/* COVERAGE */}

          <Section
            title="Competition Coverage"
            description="Questions will focus on important information about Basilan State College, including:"
            items={[
              "History of Basilan State College.",
              "Important milestones and institutional events.",
              "Policies and regulations.",
              "Vision, mission, goals, and core values.",
              "Notable personalities and officials.",
              "Colleges, offices, and academic programs.",
            ]}
          />





          {/* FORMAT */}

          <section>


            <h2 className="text-2xl font-bold">
              Competition Format
            </h2>


            <p className="mt-3 leading-7 text-slate-600">
              The competition consists of multiple rounds with
              increasing difficulty and point values.
            </p>



            <div className="mt-8 space-y-4">


              <RoundCard
                number="01"
                title="Easy Round"
                description="Basic questions about BaSC history, identity, and general information."
                points="+1 Point"
              />



              <RoundCard
                number="02"
                title="Average Round"
                description="Questions requiring deeper understanding of institutional information."
                points="+2 Points"
              />



              <RoundCard
                number="03"
                title="Difficult Round"
                description="Advanced questions testing comprehensive knowledge."
                points="+3 Points"
              />



              <RoundCard
                number="04"
                title="Clincher Round"
                description="Used to determine winners in case of a tie."
                points="Tie Breaker"
              />



            </div>


          </section>






          {/* RULES */}

          <Section
            title="Competition Rules"
            items={[
              "Teams must answer within the given time limit.",
              "Participants must listen carefully to each question.",
              "No gadgets, references, or unauthorized materials are allowed.",
              "Team collaboration is encouraged during the competition.",
              "Cheating may result in penalties or disqualification.",
              "Decisions of the tabulators and organizers are final.",
            ]}
          />






          {/* AWARDS */}

          <section>


            <h2 className="text-2xl font-bold">
              Awards and Recognition
            </h2>



            <p className="mt-3 leading-7 text-slate-600">
              Outstanding teams will receive recognition
              for their knowledge, teamwork, and achievement.
            </p>



            <div className="mt-8 grid gap-5 sm:grid-cols-3">


              <AwardCard
                title="Champion"
                prize="₱1,000"
                icon={<Trophy />}
              />



              <AwardCard
                title="1st Runner-Up"
                prize="₱700"
                icon={<Trophy />}
              />



              <AwardCard
                title="2nd Runner-Up"
                prize="₱500"
                icon={<Trophy />}
              />


            </div>


          </section>






          {/* FINAL CTA */}


          <div className="rounded-3xl bg-[#0A2A1F] p-7">


            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">


              <div className="flex gap-4">


                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">

                  <Sparkles className="h-6 w-6"/>

                </div>



                <div>


                  <h3 className="font-bold text-white">

                    Are you ready to prove your BaSC knowledge?

                  </h3>



                  <p className="mt-1 text-sm leading-6 text-white/70">

                    Gather your teammates, represent your college,
                    and compete in Battle of the Brains.

                  </p>


                </div>


              </div>




              <a
                href={registrationLink}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-white"
              >

                Register Team

                <ArrowRight className="h-4 w-4"/>

              </a>



            </div>


          </div>






          <div className="rounded-3xl bg-[#F8F5EF] p-6">


            <div className="flex gap-3">


              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]"/>



              <p className="text-sm leading-6 text-slate-600">

                Prepare your team, study the history and
                information of Basilan State College,
                and take the challenge.

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







function HighlightCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {

  return (

    <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">

        {icon}

      </div>


      <div>

        <p className="text-xs text-white/60">
          {label}
        </p>


        <p className="font-bold text-white">
          {value}
        </p>

      </div>


    </div>

  );

}






function RoundCard({
  number,
  title,
  description,
  points,
}: {
  number:string;
  title:string;
  description:string;
  points:string;
}) {

  return (

    <div className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">


      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0A2A1F] text-sm font-bold text-white">

        {number}

      </div>



      <div className="flex-1">


        <div className="flex flex-col justify-between gap-2 sm:flex-row">

          <h3 className="font-bold">
            {title}
          </h3>


          <span className="text-sm font-bold text-[#D4AF37]">
            {points}
          </span>


        </div>



        <p className="mt-2 text-sm leading-6 text-slate-600">

          {description}

        </p>


      </div>


    </div>

  );

}






function AwardCard({
title,
prize,
icon,
}:{
title:string;
prize:string;
icon:React.ReactNode;
}) {


return (

<div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">


<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">

{icon}

</div>



<h3 className="mt-4 font-bold">

{title}

</h3>



<p className="mt-2 text-xl font-bold text-[#0A2A1F]">

{prize}

</p>


<p className="mt-1 text-xs text-slate-500">

Certificate Included

</p>


</div>

);

}







function Section({
title,
description,
children,
items,
}:{
title:string;
description?:string;
children?:React.ReactNode;
items?:string[];
}) {

return (

<section>


<h2 className="text-2xl font-bold">

{title}

</h2>



{description && (

<p className="mt-3 leading-7 text-slate-600">

{description}

</p>

)}




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