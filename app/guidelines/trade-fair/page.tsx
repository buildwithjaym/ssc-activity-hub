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
  Utensils,
  ShoppingBag,
  Heart,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const contactInfo = {
  name: "Supreme Student Council",
  role: "Parageyan 2026 Trade Fair Committee",
  facebook: "https://www.facebook.com/BascSSC", 
};


function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}


const introSlides = [
  {
    icon: Store,
    title: "A Marketplace Inside BaSC",
    description:
      "Discover great foods, unique products, and local businesses right inside the campus during Parageyan 2026.",
  },
  {
    icon: Utensils,
    title: "Taste Something New",
    description:
      "From delicious snacks and meals to refreshing drinks, explore a variety of food vendors ready to serve the BaSC community.",
  },
  {
    icon: ShoppingBag,
    title: "Find Unique Products",
    description:
      "Shop for merchandise, crafts, accessories, and creative items from student sellers and local entrepreneurs.",
  },
  {
    icon: ClipboardCheck,
    title: "Want to Sell?",
    description:
      "Vendors and student entrepreneurs can reserve a booth and join the Parageyan 2026 Trade Fair.",
  },
];

const studentBenefits = [
  {
    icon: Utensils,
    title: "Discover Great Foods",
    description:
      "Explore a variety of snacks, meals, drinks, and specialty items from different vendors.",
  },
  {
    icon: ShoppingBag,
    title: "Find Unique Products",
    description:
      "Shop for clothing, crafts, accessories, and one-of-a-kind items you won’t easily find elsewhere.",
  },
  {
    icon: Heart,
    title: "Support Local & Student Sellers",
    description:
      "Help fellow students and local entrepreneurs by purchasing from their booths.",
  },
  {
    icon: Sparkles,
    title: "Enjoy the Parageyan Vibe",
    description:
      "Experience a lively campus marketplace while celebrating intramurals with the whole community.",
  },
];

const vendorBenefits = [
  {
    icon: Users,
    title: "Reach Students & Faculty",
    description:
      "Connect directly with the BaSC community and introduce your products to potential customers.",
  },
  {
    icon: TrendingUp,
    title: "Promote Your Brand",
    description:
      "Increase your visibility during one of the biggest campus celebrations of the year.",
  },
  {
    icon: Store,
    title: "Sell Your Products",
    description:
      "Create real opportunities for sales, customer engagement, and new business connections.",
  },
  {
    icon: Trophy,
    title: "Be Part of Parageyan",
    description:
      "Join an unforgettable intramurals experience and become part of the campus marketplace.",
  },
];


export default function TradeFairGuidelinesPage() {
  const [showModal, setShowModal] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <main className="min-h-screen bg-white text-[#0A2A1F]">
      {/* Intro Modal */}
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
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0A2A1F] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2A1F]"
                        >
                          <FacebookIcon className="h-4 w-4" />
                          Become a Vendor
                        </a>

                        <button
                          onClick={() => setShowModal(false)}
                          className="flex-1 rounded-full border border-[#0A2A1F] px-5 py-3 text-sm font-bold transition hover:bg-slate-50"
                        >
                          View Details
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

      {/* Header */}
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold hover:text-[#D4AF37]"
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

      {/* Hero */}
      <section className="bg-[#0A2A1F] px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase text-[#0A2A1F]">
            Parageyan 2026 Marketplace
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Trade Fair
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 sm:text-lg">
            A place to discover great foods, unique products, and local
            businesses — right inside Basilan State University during Parageyan
            2026.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <HighlightCard
              icon={<Calendar className="h-5 w-5" />}
              label="Event"
              value="Parageyan 2026"
            />
            <HighlightCard
              icon={<Store className="h-5 w-5" />}
              label="Booth Fee"
              value="For Price you may contact the SSC Official Page"
            />
          </div>

          <div className="mt-8 rounded-3xl border border-[#D4AF37]/30 bg-white/10 p-6">
            <div className="flex gap-4">
              <Trophy className="h-7 w-7 shrink-0 text-[#D4AF37]" />
              <div>
                <h3 className="font-bold text-white">
                  For Students & Vendors Alike
                </h3>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Students can explore delicious food and unique finds.
                  Vendors and student sellers can promote their products and
                  grow their brand.
                </p>
              </div>
            </div>
          </div>

          <a
            href={contactInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-white"
          >
            <FacebookIcon className="h-4 w-4" />
            Contact Trade Fair Committee
          </a>
        </div>
      </section>

      {/* For Students */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              For Students & Visitors
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              A Place to Discover Great Foods, Unique Products, and More
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Walk around the Trade Fair and enjoy a variety of offerings from
              student sellers and local businesses — all in one lively campus
              location.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {studentBenefits.map((benefit) => (
              <BenefitCard
                key={benefit.title}
                icon={<benefit.icon className="h-5 w-5" />}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* For Vendors */}
      <section className="bg-[#F8F5EF] px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              For Vendors & Student Sellers
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Why Join as a Vendor?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              This is your opportunity to introduce your brand, showcase your
              products, and connect with the Basilan State University community.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {vendorBenefits.map((benefit) => (
              <BenefitCard
                key={benefit.title}
                icon={<benefit.icon className="h-5 w-5" />}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join + Booth Info */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          <Section
            title="Who Can Join as a Vendor?"
            items={[
              "Local businesses and entrepreneurs",
              "Student sellers and small business owners",
              "Food, merchandise, crafts, and service providers",
              "Anyone interested in promoting their products during Parageyan 2026",
            ]}
          />

          <section>
            <h2 className="text-2xl font-bold">Booth Information</h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoCard
                icon={<Store className="h-5 w-5" />}
                title="Booth Fee"
                description="You may ask the head committee for booth rental."
              />
              <InfoCard
                icon={<Calendar className="h-5 w-5" />}
                title="Event Schedule"
                description="During the Parageyan 2026 intramurals celebration."
              />
            </div>
          </section>

          <Section
            title="Vendor Guidelines"
            items={[
              "Vendors must coordinate with the Supreme Student Council Trade Fair Committee.",
              "Products and services must follow Basilan State University policies.",
              "Vendors are responsible for booth setup, materials, and arrangements.",
              "Maintain cleanliness and professionalism throughout the event.",
              "Respect other vendors, students, and visitors at all times.",
            ]}
          />

          <section>
            <h2 className="text-2xl font-bold">What You Can Showcase</h2>
            <p className="mt-3 leading-7 text-slate-600">
              Bring products and services that can engage and serve the BaSC
              community.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <InfoCard
                icon={<Utensils className="h-5 w-5" />}
                title="Food Products"
                description="Snacks, drinks, meals, and specialty items."
              />
              <InfoCard
                icon={<Store className="h-5 w-5" />}
                title="Merchandise"
                description="Clothing, crafts, accessories, and products."
              />
              <InfoCard
                icon={<Sparkles className="h-5 w-5" />}
                title="Creative Services"
                description="Unique ideas, services, and business concepts."
              />
            </div>
          </section>

          {/* Contact CTA */}
          <div className="rounded-3xl bg-[#0A2A1F] p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0A2A1F]">
                  <ClipboardCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">
                    Ready to bring your business to BaSC?
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Contact the Parageyan 2026 Trade Fair Committee for booth
                    availability, requirements, and details.
                  </p>
                </div>
              </div>

              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-[#0A2A1F] transition hover:bg-white"
              >
                <FacebookIcon className="h-4 w-4" />
                Contact Committee
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-[#F8F5EF] p-6">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37]" />
              <p className="text-sm leading-6 text-slate-600">
                Whether you’re looking for great food, unique products, or a
                chance to sell your own creations — the Parageyan 2026 Trade
                Fair is the place to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-5 py-8 text-center">
        <Link
          href="/#activities"
          className="inline-flex items-center gap-2 text-sm font-bold hover:text-[#D4AF37]"
        >
          <ArrowLeft className="h-4 w-4" />
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
        <p className="text-xs text-white/60">{label}</p>
        <p className="font-bold text-white">{value}</p>
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
      <h3 className="mt-5 font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
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
      <h3 className="mt-5 font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
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
      <h2 className="text-2xl font-bold">{title}</h2>

      {children && (
        <p className="mt-3 leading-7 text-slate-600">{children}</p>
      )}

      {items && (
        <ul className="mt-4 space-y-3 text-slate-600">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}