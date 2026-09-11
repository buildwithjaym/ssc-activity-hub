"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Store,
  TrendingUp,
  Users,
  Trophy,
  Calendar,
  ClipboardCheck,
  CheckCircle2,
  Sparkles,
  PackageCheck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const contactInfo = {
  name: "Supreme Student Council",
  role: "Parageyan 2026 Trade Fair Committee",
  facebook: "https://facebook.com/your-page",
};


const introSlides = [
  {
    icon: Store,
    title: "Bring your business closer to BaSC",
    description:
      "Join Parageyan 2026 and showcase your products or services inside Basilan State College during our intramurals celebration.",
  },
  {
    icon: Users,
    title: "Reach your next customers",
    description:
      "Connect with students, faculty, and visitors while promoting your brand in a lively campus environment.",
  },
  {
    icon: TrendingUp,
    title: "Grow your brand with us",
    description:
      "Food, merchandise, crafts, and services are welcome to become part of the Parageyan 2026 marketplace.",
  },
  {
    icon: ClipboardCheck,
    title: "Reserve your booth space",
    description:
      "Contact the Trade Fair Committee for booth availability, requirements, and participation details.",
  },
];



const vendorBenefits = [
  {
    icon: Users,
    title: "Reach Students",
    description:
      "Connect directly with the BaSC community and introduce your products to potential customers.",
  },
  {
    icon: TrendingUp,
    title: "Promote Your Brand",
    description:
      "Increase your visibility by showcasing your business during a major campus celebration.",
  },
  {
    icon: Store,
    title: "Sell Your Products",
    description:
      "Create opportunities for sales, customer engagement, and business connections.",
  },
  {
    icon: Sparkles,
    title: "Be Part of Parageyan",
    description:
      "Support and become part of an unforgettable intramurals experience.",
  },
];



export default function TradeFairGuidelinesPage() {

  const [showModal, setShowModal] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);


  return (

    <main className="min-h-screen bg-white text-[#0A2A1F]">


      {/* INTRO MODAL */}

      <AnimatePresence>

        {showModal && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
          >


            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
            >


              <button
                onClick={() => setShowModal(false)}
                className="absolute right-5 top-5 text-slate-400 hover:text-[#0A2A1F]"
              >
                <X className="h-5 w-5" />
              </button>



              {(() => {

                const Icon = introSlides[activeSlide].icon;


                return (

                  <>

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F5EF] text-[#D4AF37]">

                      <Icon className="h-8 w-8" />

                    </div>



                    <h2 className="mt-6 text-2xl font-bold">

                      {introSlides[activeSlide].title}

                    </h2>



                    <p className="mt-3 text-sm leading-6 text-slate-600">

                      {introSlides[activeSlide].description}

                    </p>



                    <div className="mt-6 flex justify-center gap-2">

                      {introSlides.map((_, index) => (

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
                          href={contactInfo.facebook}
                          target="_blank"
                          className="flex-1 rounded-full bg-[#0A2A1F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2A1F]"
                        >
                          Become a Vendor
                        </a>



                        <button
                          onClick={() => setShowModal(false)}
                          className="flex-1 rounded-full border border-[#0A2A1F] px-5 py-3 text-sm font-bold"
                        >
                          View Guidelines
                        </button>


                      </div>


                    ) : (


                      <button
                        onClick={() => setActiveSlide(activeSlide + 1)}
                        className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37]"
                      >

                        Continue

                        <ArrowRight className="h-4 w-4" />

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

            <ArrowLeft className="h-4 w-4" />

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

            Parageyan 2026 Marketplace

          </span>



          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">

            Trade Fair & Booth Competition

          </h1>



          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">

            Bring your business closer to the Basilan State College
            community. Showcase your products, connect with customers,
            and become part of Parageyan 2026.

          </p>



          <div className="mt-10 grid gap-4 sm:grid-cols-2">


            <HighlightCard
              icon={<Calendar />}
              label="Event"
              value="Parageyan 2026"
            />


            <HighlightCard
              icon={<Store />}
              label="Booth Fee"
              value="₱1,000 per day"
            />


          </div>



          <div className="mt-8 rounded-3xl border border-[#D4AF37]/30 bg-white/10 p-6">

            <div className="flex gap-4">


              <Trophy className="h-7 w-7 text-[#D4AF37]" />


              <div>


                <h3 className="font-bold text-white">

                  A marketplace opportunity for your business

                </h3>



                <p className="mt-1 text-sm leading-6 text-white/70">

                  Join vendors, entrepreneurs, and sellers
                  in bringing products and services closer
                  to the BaSC community.

                </p>


              </div>


            </div>


          </div>



          <a
            href={contactInfo.facebook}
            target="_blank"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-white"
          >

            Become a Vendor

            <ArrowRight className="h-4 w-4" />

          </a>


        </div>

      </section>

            {/* WHY JOIN */}

      <section className="px-5 py-16">

        <div className="mx-auto max-w-5xl">


          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Vendor Opportunity
            </p>


            <h2 className="mt-3 text-3xl font-bold">
              Why join Parageyan 2026 Trade Fair?
            </h2>


            <p className="mt-4 leading-7 text-slate-600">
              This is your opportunity to introduce your brand,
              showcase your products, and connect with the
              Basilan State College community.
            </p>

          </div>





          <div className="mt-10 grid gap-5 sm:grid-cols-2">

            {vendorBenefits.map((benefit) => (

              <BenefitCard
                key={benefit.title}
                icon={<benefit.icon />}
                title={benefit.title}
                description={benefit.description}
              />

            ))}

          </div>


        </div>


      </section>







      {/* VENDOR INFORMATION */}

      <section className="bg-[#F8F5EF] px-5 py-16">


        <div className="mx-auto max-w-5xl space-y-10">



          <Section
            title="Who Can Join?"
            items={[
              "Businesses and local entrepreneurs.",
              "Student sellers and small business owners.",
              "Food, merchandise, crafts, and service providers.",
              "Vendors interested in promoting their products during Parageyan 2026.",
            ]}
          />





          <section>


            <h2 className="text-2xl font-bold">
              Booth Information
            </h2>


            <div className="mt-6 grid gap-5 sm:grid-cols-2">


              <InfoCard
                icon={<Store />}
                title="Booth Fee"
                description="₱1,000 per day for booth rental."
              />



              <InfoCard
                icon={<Calendar />}
                title="Event Schedule"
                description="During Parageyan 2026 intramurals celebration."
              />


            </div>


          </section>





        </div>


      </section>







      {/* VENDOR GUIDELINES */}

      <section className="px-5 py-16">


        <div className="mx-auto max-w-5xl space-y-10">



          <Section
            title="Vendor Guidelines"
            items={[
              "Vendors must coordinate with the Supreme Student Council Trade Fair Committee.",
              "Products and services must follow Basilan State College policies.",
              "Vendors are responsible for booth setup, materials, and arrangements.",
              "Maintain cleanliness and professionalism throughout the event.",
              "Respect other vendors, students, and visitors.",
            ]}
          />






          <section>


            <h2 className="text-2xl font-bold">
              What You Can Showcase
            </h2>



            <p className="mt-3 leading-7 text-slate-600">
              Bring products and services that can engage
              and serve the BaSC community.
            </p>




            <div className="mt-8 grid gap-5 sm:grid-cols-3">


              <InfoCard
                icon={<PackageCheck />}
                title="Food Products"
                description="Snacks, drinks, meals, and specialty items."
              />



              <InfoCard
                icon={<Store />}
                title="Merchandise"
                description="Clothing, crafts, accessories, and products."
              />



              <InfoCard
                icon={<Sparkles />}
                title="Creative Services"
                description="Unique ideas, services, and business concepts."
              />


            </div>


          </section>








          {/* CONTACT CTA */}


          <div className="rounded-3xl bg-[#0A2A1F] p-7">


            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">



              <div className="flex gap-4">


                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">

                  <ClipboardCheck className="h-6 w-6"/>

                </div>




                <div>


                  <h3 className="font-bold text-white">

                    Ready to bring your business to BaSC?

                  </h3>




                  <p className="mt-1 text-sm leading-6 text-white/70">

                    Contact the Parageyan 2026 Trade Fair Committee
                    for booth availability, requirements, and details.

                  </p>


                </div>


              </div>





              <a
                href={contactInfo.facebook}
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-white"
              >

                Contact Committee

                <ArrowRight className="h-4 w-4"/>

              </a>



            </div>


          </div>






          <div className="rounded-3xl bg-[#F8F5EF] p-6">


            <div className="flex gap-3">


              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]" />


              <p className="text-sm leading-6 text-slate-600">

                Become part of Parageyan 2026.
                Showcase your business, connect with the community,
                and create opportunities inside Basilan State College.

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







function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {

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
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6">


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







function Section({
  title,
  children,
  items,
}: {
  title: string;
  children?: React.ReactNode;
  items?: string[];
}) {

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


          {items.map((item) => (

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