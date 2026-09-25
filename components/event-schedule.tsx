"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

const schedule = [
  {
    date: "September 28–30, 2026",
    title: "Banner Making Contest",
    category: "Creative Competition",
    venue: "Basilan State College",
    description:
      "Design creative banners that showcase your college colors, identity, and Parageyan spirit.",
  },
  {
    date: "September 28–30, 2026",
    title: "Mascot Making Contest",
    category: "Creative Competition",
    venue: "Basilan State College",
    description:
      "Build a standout mascot that represents your college with creativity, craftsmanship, and pride.",
  },
  {
    date: "September 28–October 7, 2026",
    title: "Trade Fair",
    category: "Community Activity",
    venue: "Basilan State College",
    description:
      "Open booths that highlight creativity, entrepreneurship, and the unique culture of each college.",
  },
  {
    date: "September 29 & October 1, 2026",
    title: "Subul Duk Budjang Si Paregeyan",
    category: "Cultural Fashion",
    venue: "Basilan State College",
    description:
      "A cultural fashion showcase celebrating tradition, elegance, and the beauty of Parageyan identity.",
  },
  {
    date: "October 3, 2026",
    title: "Bench Yell",
    category: "Team Competition",
    venue: "Basilan State College",
    description:
      "Ignite school spirit with powerful cheers, synchronized energy, and unstoppable team pride.",
  },
  {
    date: "October 4, 2026",
    title: "Battle of the Brains",
    category: "Academic Competition",
    venue: "Basilan State College",
    description:
      "Compete head-to-head in a high-energy quiz battle that rewards knowledge, focus, and teamwork.",
  },
  {
    date: "October 4, 5 & 7, 2026",
    title: "Larong Pinoy",
    category: "Cultural Sports",
    venue: "Basilan State College",
    description:
      "Relive traditional Filipino games in a friendly competition full of fun, skill, and camaraderie.",
  },
  {
    date: "October 6, 2026",
    title: "Fun Run",
    category: "Sports Activity",
    venue: "Basilan State College",
    description:
      "Lace up and join a vibrant campus run that celebrates fitness, friendship, and Parageyan unity.",
  },
  {
    date: "TBA",
    title: "Movie House",
    category: "Entertainment",
    venue: "Basilan State College",
    description:
      "Gather with fellow students for a shared movie night filled with good vibes and campus bonding.",
  },
];


export function EventSchedule() {
  return (
    <section
      id="schedule"
      className="bg-[#F8F5EF] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

          <div className="max-w-3xl">

            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Official Timeline
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#0A2A1F] sm:text-4xl">
              Parageyan 2026 Schedule
            </h2>

            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              Stay informed with the official schedule of activities,
              competitions, and celebrations prepared by the Supreme Student
              Council.
            </p>

          </div>


        </div>



        {/* TIMELINE */}
        <div className="relative mt-14 space-y-8">

          <div className="absolute left-5 top-0 h-full w-px bg-[#D4AF37]/30" />


          {schedule.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="relative pl-16"
            >

              {/* NUMBER */}
              <div
                className="
                  absolute
                  left-0
                  top-6
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D4AF37]/40
                  bg-[#0A2A1F]
                  text-sm
                  font-bold
                  text-[#D4AF37]
                  shadow-lg
                "
              >
                {String(index + 1).padStart(2, "0")}
              </div>



              {/* CARD */}
              <div
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                <span
                  className="
                    inline-flex
                    rounded-full
                    bg-[#0A2A1F]/5
                    px-3
                    py-1
                    text-xs
                    font-bold
                    text-[#0A2A1F]
                  "
                >
                  {item.category}
                </span>


                <h3 className="mt-4 text-xl font-bold text-[#0A2A1F]">
                  {item.title}
                </h3>


                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>



                <div
                  className="
                    mt-5
                    flex
                    flex-col
                    gap-3
                    border-t
                    border-slate-100
                    pt-5
                    text-sm
                    text-slate-600
                    sm:flex-row
                    sm:gap-8
                  "
                >

                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[#D4AF37]" />
                    {item.date}
                  </p>


                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#D4AF37]" />
                    {item.venue}
                  </p>

                </div>


              </div>


            </motion.div>

          ))}


        </div>


      </div>
    </section>
  );
}