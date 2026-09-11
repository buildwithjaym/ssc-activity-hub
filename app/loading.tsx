"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="fixed inset-0 z-[999] flex min-h-screen items-center justify-center bg-[#0A2A1F]">

      <div className="flex flex-col items-center text-center">


        <motion.h1
  initial={{opacity:0,y:20}}
  animate={{opacity:1,y:0}}
  transition={{duration:.7}}
  className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
>
  SSC PARAGEYAN{" "}
  <span className="text-[#D4AF37]">
    2026
  </span>
</motion.h1>



        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:.3,duration:.5}}
          className="mt-4 h-px w-24 bg-[#D4AF37]"
        />



        <motion.p
          initial={{opacity:0,y:10}}
          animate={{opacity:1,y:0}}
          transition={{delay:.5,duration:.5}}
          className="mt-5 text-sm uppercase tracking-[0.25em] text-white/50"
        >
          Basilan State College
        </motion.p>



        <div className="mt-8 flex gap-2">

          {[1,2,3].map((item)=>(

            <motion.span
              key={item}
              animate={{
                y:[0,-6,0],
                opacity:[0.4,1,0.4],
              }}
              transition={{
                duration:1,
                repeat:Infinity,
                delay:item*.15,
              }}
              className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]"
            />

          ))}

        </div>



        <motion.p
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:1}}
          className="mt-12 text-xs text-white/30"
        >
          Developed by Jaymar Maruji
        </motion.p>


      </div>

    </main>
  );
}