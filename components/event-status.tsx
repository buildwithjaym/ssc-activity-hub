"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "./site-config";
import { Countdown } from "./countdown";
import {
  Flame,
  PartyPopper,
  Heart,
  Sparkles,
} from "lucide-react";


function getStatus() {

  const now = Date.now();

  const start =
    new Date(
      SITE_CONFIG.event.startDate
    ).getTime();


  const end =
    new Date(
      SITE_CONFIG.event.endDate
    ).getTime();


  if (now < start) {
    return "before";
  }


  if (now >= start && now <= end) {
    return "during";
  }


  return "after";

}



export function EventStatus() {


  const status = getStatus();



  if(status === "before"){

    return <Countdown />;

  }





  if(status === "during"){

    return (

      <motion.div

        initial={{
          opacity:0,
          scale:.95,
        }}

        animate={{
          opacity:1,
          scale:1,
        }}

        transition={{
          duration:.6,
        }}

        className="
        relative
        max-w-md
        overflow-hidden
        rounded-3xl
        border
        border-[#D4AF37]/40
        bg-white/10
        p-8
        text-center
        backdrop-blur-xl
        shadow-2xl
        "

      >


        {/* Glow */}

        <motion.div

          animate={{
            scale:[1,1.3,1],
            opacity:[.3,.6,.3],
          }}

          transition={{
            duration:3,
            repeat:Infinity,
          }}

          className="
          absolute
          -right-16
          -top-16
          h-48
          w-48
          rounded-full
          bg-[#D4AF37]
          blur-3xl
          "

        />



        <motion.div

          animate={{
            y:[0,-8,0],
          }}

          transition={{
            duration:2,
            repeat:Infinity,
          }}

          className="
          relative
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#D4AF37]/20
          "

        >

          <Flame
            className="
            h-8
            w-8
            text-[#D4AF37]
            "
          />


        </motion.div>




        <motion.div

          animate={{
            opacity:[.6,1,.6],
          }}

          transition={{
            duration:2,
            repeat:Infinity,
          }}

          className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-[#D4AF37]/20
          px-4
          py-2
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-[#D4AF37]
          "

        >

          <span
          className="
          h-2
          w-2
          rounded-full
          bg-[#D4AF37]
          "
          />

          Live Now

        </motion.div>





        <h2
          className="
          mt-6
          text-4xl
          font-extrabold
          text-white
          "
        >

          Parageyan 2026

        </h2>




        <p
          className="
          mt-4
          text-sm
          leading-relaxed
          text-white/70
          "
        >

          The celebration has officially started.
          Join activities, support your college,
          and create unforgettable memories.

        </p>




        <div
          className="
          mt-7
          flex
          justify-center
          gap-3
          "
        >

          {[1,2,3].map((item)=>(

            <motion.div

              key={item}

              animate={{
                y:[0,-10,0],
                opacity:[.4,1,.4],
              }}

              transition={{
                delay:item*.2,
                duration:2,
                repeat:Infinity,
              }}

              className="
              h-2
              w-2
              rounded-full
              bg-[#D4AF37]
              "

            />

          ))}


        </div>



      </motion.div>

    );

  }






  return (

    <motion.div

      initial={{
        opacity:0,
        y:20,
      }}

      animate={{
        opacity:1,
        y:0,
      }}

      transition={{
        duration:.8,
      }}

      className="
      relative
      max-w-md
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/10
      p-8
      text-center
      backdrop-blur-xl
      "

    >


      <motion.div

        animate={{
          rotate:360,
        }}

        transition={{
          duration:20,
          repeat:Infinity,
          ease:"linear",
        }}

        className="
        absolute
        right-5
        top-5
        text-[#D4AF37]/40
        "

      >

        <Sparkles className="h-8 w-8"/>

      </motion.div>




      <div
        className="
        mx-auto
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#D4AF37]/20
        "
      >

        <PartyPopper
          className="
          h-7
          w-7
          text-[#D4AF37]
          "
        />

      </div>




      <h2
        className="
        mt-6
        text-3xl
        font-bold
        text-white
        "
      >

        Thank You

      </h2>




      <p
        className="
        mt-4
        leading-relaxed
        text-white/70
        "
      >

        Thank you for being part of
        Parageyan 2026.

        <br/>

        Celebrating student spirit,
        talent, and unity.

      </p>




      <div
        className="
        mt-6
        flex
        items-center
        justify-center
        gap-2
        text-sm
        font-semibold
        text-[#D4AF37]
        "
      >

        <Heart className="h-4 w-4"/>

        Until the next celebration

      </div>



    </motion.div>

  );

}