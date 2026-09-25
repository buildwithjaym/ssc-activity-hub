"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

type Activity = {
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  status: string;
  guidelinesUrl: string;
  facebookUrl?: string;
};

const activities: Activity[] = [
  {
    title: "Banner Making Contest",
    date: "Sep 28–30, 2026",
    category: "Creative",
    description:
      "Create banners and mascots that proudly represent your college spirit.",
    image: "banners.jpg",
    status: "Registration Open",
    guidelinesUrl: "/guidelines/banner",
    facebookUrl: "https://facebook.com",
  },
  {
    title: "Mascot Making Contest",
    date: "Sep 28–30, 2026",
    category: "Creative",
    description: "Create mascots that proudly represent your college spirit.",
    image: "mascot_competition.jpg",
    status: "Registration Open",
    guidelinesUrl: "/guidelines/mascot",
    facebookUrl: "https://facebook.com",
  },
  {
    title: "Subul Duk Budjang Si Paregeyan",
    date: "Sep 29 & Oct 01,2026",
    category: "Fashion",
    description:
      "",
    image: "subuldukbudjang.jpg",
    status: "Registration Open",
    guidelinesUrl: "",
    facebookUrl: "https://facebook.com",
  },
  {
    title: "Bench Yell",
    date: "Oct 3, 2026",
    category: "Team Competition",
    description:
      "Bring the Energy. Bring the Noise. Be Part of the Cheer!",
    image: "bench_yell.jpg",
    status: "Coming Soon",
    guidelinesUrl: "#activities",
    facebookUrl: "",
  },
  
  {
    title: "Movie House",
    date: "TBA",
    category: "Entertainment",
    description:
      "Watch a movie together and let the love grows within.",
    image: "movie_house.jpg",
    status: "Coming Soon",
    guidelinesUrl: "#activities",
    facebookUrl: "https://facebook.com",
  },
  
  {
    title: "Fun Run",
    date: "Oct 6, 2026",
    category: "Sports",
    description:
      "Run, have fun, and celebrate unity with the Parageyan community.",
    image: "funrun.jpg",
    status: "Registration Open",
    guidelinesUrl: "/guidelines/color-fun-run",
    facebookUrl: "https://facebook.com",
  },
  {
    title: "Larong Pinoy",
    date: "Oct 4,5 & 7, 2026",
    category: "Sports",
    description:
      "Enjoy traditional Filipino games while competing with fellow students.",
    image: "larong-pinoy.jpg",
    status: "Coming Soon",
    guidelinesUrl: "/guidelines/larong-pinoy",
    facebookUrl: "",
  },
  {
    title: "Battle of the Brains",
    date: "Oct 4, 2026",
    category: "Academic",
    description:
      "Put your knowledge to the test in an exciting academic competition.",
    image: "battle-of-the-brains.jpg",
    status: "Coming Soon",
    guidelinesUrl: "/guidelines/battle-of-the-brains",
    facebookUrl: "https://facebook.com",
  },
  {
    title: "Trade Fair",
    date: "September 28-October 07, 2026",
    category: "Community",
    description:
      "Showcase creativity, entrepreneurship, and college pride through booths.",
    image: "trade-fairs.jpg",
    status: "Coming Soon",
    guidelinesUrl: "/guidelines/trade-fair",
    facebookUrl: "",
  },
];

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.86c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.23.2 2.23.2V8.6H15.2c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33V22C18.34 21.25 22 17.09 22 12.07Z" />
    </svg>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  if(process.env.NODE_ENV==="development"){
 console.log(
   "Cloudinary Activity:",
   activity.title,
   activity.image
 );
}
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
      className="
        group flex h-full flex-col overflow-hidden
        rounded-[24px] border border-slate-200/80
        bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[#D4AF37]/40
        hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)]
      "
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden sm:h-52 lg:h-56">
        <CldImage
          src={activity.image}
          alt={activity.title}
          fill
          sizes="(max-width:640px) 100vw,
 (max-width:1024px) 50vw,
 33vw"
          crop="fill"
          gravity="auto"
          quality="auto"
          format="auto"
          loading="lazy"
          className="
 object-cover
 transition-transform duration-500
 group-hover:scale-[1.04]
 "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Category */}
        <span
          className="
            absolute left-4 top-4
            rounded-full bg-white/95
            px-3 py-1.5
            text-[10px] font-bold
            uppercase tracking-wide
            text-[#0A2A1F]
            shadow-sm backdrop-blur
          "
        >
          {activity.category}
        </span>

        {/* Status */}
        <span
          className="
            absolute bottom-4 left-4
            rounded-full
            bg-[#E7BE24]
            px-3 py-1.5
            text-[10px] font-bold
            text-[#0A2A1F]
            shadow-sm
          "
        >
          {activity.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>{activity.date}</span>
        </div>

        <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-[#0A2A1F]">
          {activity.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
          {activity.description}
        </p>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <Link
            href={activity.guidelinesUrl}
            className="
              inline-flex items-center gap-2
              text-sm font-bold
              text-[#0A2A1F]
              transition-colors
              hover:text-[#C59E1A]
            "
          >
            View guidelines
            <ArrowRight
              className="
                h-4 w-4
                transition-transform duration-200
                group-hover:translate-x-1
              "
            />
          </Link>

          {activity.facebookUrl && (
            <a
              href={activity.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Facebook post for ${activity.title}`}
              title="View Facebook post"
              className="
                inline-flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-full border border-slate-200
                bg-white text-[#1877F2]
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-[#1877F2]/30
                hover:bg-[#1877F2]
                hover:text-white
              "
            >
              <FacebookIcon />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedActivities() {
  return (
    <section
      id="activities"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C99F18]">
              Official Activities
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2A1F] sm:text-4xl lg:text-5xl">
              What we are organizing
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Discover the official activities prepared and supported by the
              Supreme Student Council for Parageyan 2026.
            </p>
          </div>
        </div>

        {/* Activity Grid */}
        <div
          className="
            mt-10 grid
            grid-cols-1
            gap-6
            sm:mt-12
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-7
          "
        >
          {activities.map((activity) => (
            <ActivityCard key={activity.title} activity={activity} />
          ))}
        </div>
      </div>
    </section>
  );
}
