"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Trophy,
  Users,
  Vote,
  Flame,
} from "lucide-react";


interface Props {

  onSelect:
  (question:string)=>void;

}



const actions = [

  {
    text:"What is Parageyan 2026?",
    icon:CalendarDays,
  },

  {
    text:"Show official activities",
    icon:Trophy,
  },

  {
    text:"Who are the SSC officers?",
    icon:Users,
  },

  {
    text:"How can I vote?",
    icon:Vote,
  },

  {
    text:"Show college spirit",
    icon:Flame,
  },

];




export default function SSCQuickActions({
  onSelect,
}:Props){


  return (

    <div className="
      flex
      flex-wrap
      gap-2
    ">


      {actions.map((item,index)=>{


        const Icon=item.icon;


        return (

          <motion.button

            key={item.text}

            initial={{
              opacity:0,
              y:8,
            }}

            animate={{
              opacity:1,
              y:0,
            }}

            transition={{
              delay:index * 0.05,
            }}


            onClick={()=>onSelect(item.text)}


            className="
              flex
              items-center
              gap-1.5

              rounded-full

              border

              border-[#D4AF37]/40

              bg-[#F8F5EF]

              px-3

              py-2

              text-xs

              font-medium

              text-[#0A2A1F]

              transition

              hover:bg-[#D4AF37]/20
            "

          >

            <Icon
              size={14}
              className="text-[#D4AF37]"
            />


            {item.text}


          </motion.button>

        );

      })}


    </div>

  );

}