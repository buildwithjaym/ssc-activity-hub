import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { SITE_CONFIG } from "./site-config";


export function Footer() {

  return (

    <footer
      className="
      bg-[#0A2A1F]
      px-5
      py-12
      text-white
      sm:px-8
      lg:px-10
      "
    >

      <div
        className="
        mx-auto
        max-w-7xl
        "
      >


        <div
          className="
          grid
          gap-10
          md:grid-cols-2
          "
        >


          {/* BRAND */}

          <div>

            <div
              className="
              flex
              items-center
              gap-3
              "
            >

              <div
                className="
                relative
                h-12
                w-12
                overflow-hidden
                rounded-full
                border
                border-white/20
                bg-white
                shadow-md
                "
              >

                <Image
                  src={SITE_CONFIG.images.logo}
                  alt="Supreme Student Council logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />

              </div>



              <div>

                <h3
                  className="
                  font-bold
                  tracking-wide
                  "
                >
                  {SITE_CONFIG.name}
                </h3>


                <p
                  className="
                  mt-1
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                  "
                >
                  {SITE_CONFIG.institution}
                </p>

              </div>

            </div>




            <p
              className="
              mt-5
              max-w-md
              text-sm
              leading-relaxed
              text-white/55
              "
            >
              The official digital information hub for Supreme Student Council
              activities, schedules, guidelines, and student participation
              during Parageyan 2026.
            </p>


          </div>





          {/* LINKS */}

          <div
            className="
            md:text-right
            "
          >

            <p
              className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#D4AF37]
              "
            >
              Quick Links
            </p>



            <div
              className="
              mt-5
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              md:justify-end
              "
            >

              {SITE_CONFIG.navigation.map((item)=>(
                
                <a
                  key={item.label}
                  href={item.href}
                  className="
                  text-sm
                  text-white/55
                  transition
                  hover:text-white
                  "
                >

                  {item.label}

                </a>

              ))}

            </div>


          </div>


        </div>





        {/* BOTTOM */}

        <div
          className="
          mt-10
          border-t
          border-white/10
          pt-6
          "
        >

          <div
            className="
            flex
            flex-col
            gap-3
            text-xs
            text-white/35
            sm:flex-row
            sm:items-center
            sm:justify-between
            "
          >


            <p>
              © 2026 Supreme Student Council · Basilan State College
            </p>



            <a
              href="https://www.jaymmaruji.online"
              target="_blank"
              rel="noopener noreferrer"
              className="
              group
              inline-flex
              items-center
              gap-1
              transition
              hover:text-[#D4AF37]
              "
            >

              <span>
                Developed by: Jaymar Maruji, SSC Senator
              </span>


              <ArrowUpRight
                className="
                h-3.5
                w-3.5
                transition
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                "
              />


            </a>



          </div>


        </div>



      </div>


    </footer>

  );

}