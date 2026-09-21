import VotingNavbar from "@/components/voting/voting-navbar";
import { Trophy } from "lucide-react";


export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#041F18]
      text-white
      "
    >


      {/* BACKGROUND */}

      <div
        className="
        pointer-events-none
        absolute
        inset-0
        bg-[radial-gradient(circle_at_top,#D4AF3730,transparent_40%)]
        "
      />


      <div
        className="
        pointer-events-none
        absolute
        -left-32
        top-1/3
        h-96
        w-96
        rounded-full
        bg-emerald-400/10
        blur-3xl
        "
      />



      {/* NAVBAR */}

      <VotingNavbar />



      {/* CONTENT */}

      <main
        className="
        relative
        min-h-screen
        pt-24
        "
      >

        {children}

      </main>





      {/* FOOTER */}

      <footer
        className="
        relative
        border-t
        border-white/10
        bg-black/10
        "
      >

        <div
          className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-5
          px-6
          py-8
          text-sm
          text-white/50
          md:flex-row
          md:items-center
          md:justify-between
          "
        >


          <div>

            <p
              className="
              font-bold
              text-white
              "
            >

              Basilan State University

            </p>


            <p
              className="
              mt-1
              text-xs
              uppercase
              tracking-[0.25em]
              "
            >

              Parageyan 2026

            </p>

          </div>





          <div
            className="
            flex
            items-center
            gap-2
            "
          >

            <Trophy
              size={18}
              className="text-[#D4AF37]"
            />


            <span>

              People's Choice Award

            </span>


          </div>


        </div>

      </footer>



    </div>

  );

}