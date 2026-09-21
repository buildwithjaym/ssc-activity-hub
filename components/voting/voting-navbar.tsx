"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CldImage } from "next-cloudinary";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  LogIn,
} from "lucide-react";

import { SITE_CONFIG } from "@/components/site-config";


const navigation = [
  {
    label: "Home",
    href: "/voting",
  },
];


export default function VotingNavbar() {

  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();


  return (

    <motion.header

      initial={{
        opacity: 0,
        y: -20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}

      className="
      absolute
      inset-x-0
      top-0
      z-50
      px-4
      pt-4
      sm:px-6
      lg:px-8
      "

    >

      <div className="mx-auto max-w-7xl">


        <nav

          className="
          flex
          h-[68px]
          items-center
          justify-between
          rounded-2xl
          border
          border-white/15
          bg-[#123F2A]/40
          px-4
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          backdrop-blur-2xl
          "

        >


          {/* BRAND */}

          <Link

            href="/voting"

            onClick={() => setIsOpen(false)}

            className="
            group
            flex
            items-center
            gap-3
            "

          >

            <div

              className="
              relative
              h-11
              w-11
              overflow-hidden
              rounded-full
              border
              border-white/40
              bg-white
              shadow-md
              transition
              group-hover:scale-105
              "

            >

              <CldImage

                src={SITE_CONFIG.images.logo}

                alt="Supreme Student Council Logo"

                fill

                sizes="44px"

                crop="fill"

                gravity="auto"

                quality="auto"

                format="auto"

                priority

                className="object-cover"

              />

            </div>



            <div className="hidden sm:block">


              <p

                className="
                text-sm
                font-bold
                tracking-wide
                text-white
                "

              >

                {SITE_CONFIG.shortName}

              </p>



              <p

                className="
                mt-1
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-white/60
                "

              >

                Mr. & Miss Parageyan 2026

              </p>


            </div>



            <span

              className="
              text-sm
              font-bold
              text-white
              sm:hidden
              "

            >

              SSC Hub

            </span>


          </Link>





          {/* DESKTOP NAVIGATION */}

          <div

            className="
            hidden
            items-center
            rounded-full
            border
            border-white/10
            bg-white/5
            p-1
            backdrop-blur-xl
            lg:flex
            "

          >


            {navigation.map((item) => {


              const active =
                pathname === item.href;



              return (

                <Link

                  key={item.href}

                  href={item.href}

                  className={`

                  rounded-full
                  px-5
                  py-2.5
                  text-xs
                  font-semibold
                  transition-all

                  ${
                    active

                    ?

                    "bg-white/20 text-white"

                    :

                    "text-white/70 hover:bg-white/10 hover:text-white"

                  }

                  `}

                >

                  {item.label}


                </Link>

              );


            })}


          </div>






          {/* LOGIN + MOBILE MENU */}

          <div

            className="
            flex
            items-center
            gap-3
            "

          >


            {/* LOGIN DESKTOP */}

            <Link

              href="/voting"

              className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-white/25
              px-5
              py-2.5
              text-xs
              font-bold
              text-white
              transition
              hover:bg-white/10
              lg:flex
              "

            >

              <LogIn size={14}/>

              Login


            </Link>





            {/* MOBILE BUTTON */}

            <button

              type="button"

              onClick={() => setIsOpen((prev)=>!prev)}

              aria-label={
                isOpen
                ?
                "Close menu"
                :
                "Open menu"
              }

              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-xl
              transition
              hover:bg-white/20
              lg:hidden
              "

            >

              {
                isOpen

                ?

                <X size={20}/>

                :

                <Menu size={20}/>

              }


            </button>


          </div>


        </nav>







        {/* MOBILE MENU */}

        <AnimatePresence>


          {
            isOpen && (


              <motion.div

                initial={{
                  opacity:0,
                  y:-10,
                  scale:0.98,
                }}

                animate={{
                  opacity:1,
                  y:0,
                  scale:1,
                }}

                exit={{
                  opacity:0,
                  y:-10,
                  scale:0.98,
                }}

                transition={{
                  duration:0.25,
                }}

                className="
                mt-3
                rounded-2xl
                border
                border-white/15
                bg-[#123F2A]/90
                p-3
                shadow-xl
                backdrop-blur-2xl
                lg:hidden
                "

              >



                <Link

                  href="/voting"

                  onClick={()=>setIsOpen(false)}

                  className="
                  block
                  rounded-xl
                  bg-white/10
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  "

                >

                  Home

                </Link>




                <Link

                  href="/voting"

                  onClick={()=>setIsOpen(false)}

                  className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#D4AF37]
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-[#123F2A]
                  "

                >

                  <LogIn size={16}/>

                  Login


                </Link>



              </motion.div>


            )
          }


        </AnimatePresence>



      </div>


    </motion.header>

  );

}