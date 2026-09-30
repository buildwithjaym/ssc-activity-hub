"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { cloudinaryAudio } from "@/lib/cloudinary";
import { SITE_CONFIG } from "./site-config";
const spiritAnimals = [
  {
    id: "iis",
    college: "Institute of Islamic Studies",
    shortCode: "IIS",
    animal: "Blue Eagle",
    color: "#1A5276",
    image: "blue-eagle.jpg",
    description:
      "With clear vision and soaring faith, the Blue Eagle rises above every challenge. It embodies wisdom, spiritual strength, and the courage to lead with purpose.",
    rally: "Rise. Believe. Soar.",
  },
  {
    id: "cte",
    college: "College of Education",
    shortCode: "CTE",
    animal: "Noble Wolves",
    color: "#A93226",
    image: "cte",
    description:
      "Loyal, united, and fiercely protective of their pack. The Noble Wolves stand for resilience, collaboration, and the educators who shape tomorrow’s leaders.",
    rally: "Rise. Teach. Inspire.",
  },
  {
    id: "ccje",
    college: "College of Criminal Justice Education",
    shortCode: "CCJE",
    animal: "Black Panther",
    color: "#1C2833",
    image: "ccje.jpg",
    description:
      "Silent, focused, and unyielding. The Black Panther represents discipline, sharp instinct, and an unwavering commitment to justice and protection.",
    rally: "United. Disciplined. Strong.",
  },
  {
    id: "ccs",
    college: "College of Computing Studies",
    shortCode: "CCS",
    animal: "Golden Phoenix",
    color: "#6C1D2B",
    image: "basu-ccs",
    description:
      "Reborn through code and innovation. The Golden Phoenix rises with precision, speed, and the power to transform the digital future.",
    rally: "Focus. Code. Dominate.",
  },
  {
    id: "chusocom",
    college: "College of Humanities, Social Sciences & Communication",
    shortCode: "CHUSOCOM",
    animal: "Blue Falcon",
    color: "#066fb4",
    image: "blue-falcon.jpg",
    description:
      "Swift, expressive, and sharp-eyed. The Blue Falcon soars on ideas, stories, and powerful connections that shape culture and conversation.",
    rally: "Speak. Connect. Create.",
  },
  {
    id: "cpadm",
    college: "College of Public Administration Management",
    shortCode: "CPADM",
    animal: "Lion",
    color: "#ebb120",
    image: "chusocom.jpg",
    description:
      "Bold leadership in service of the people. The Lion embodies courage, clarity, and the strength to rise and govern with integrity.",
    rally: "Serve. Lead. Elevate.",
  },
  {
    id: "ca",
    college: "College of Agriculture",
    shortCode: "CA",
    animal: "Green Buffalo",
    color: "#196F3D",
    image: "ca.jpg",
    description:
      "Steady, powerful, and deeply rooted in the land. The Green Buffalo stands for hard work, patience, and the enduring foundation of our nation’s harvest.",
    rally: "Rooted. Strong. Enduring.",
  },
  {
    id: "ihtm",
    college: "Institute of Hospitality & Tourism Management",
    shortCode: "IHTM",
    animal: "Navigating Narwhal",
    color: "#8B6914",
    image: "ihtm.jpg",
    description:
      "Graceful, rare, and always guided by purpose. The Navigating Narwhal represents warm service, excellence, and hospitality that leaves a lasting impression.",
    rally: "Serve. Shine. Excel.",
  },
  {
    id: "cah",
    college: "College of Allied Health",
    shortCode: "CAH",
    animal: "Growling Tiger",
    color: "#c936bc",
    image: "cah.jpg",
    description:
      "Fierce in spirit yet gentle in care. The Growling Tiger embodies strength, compassion, and the quiet power of those who heal and protect life.",
    rally: "Heal. Grow. Transform.",
  },
];

function SpiritCard({ animal }: { animal: (typeof spiritAnimals)[0] }) {
  const [flipped, setFlipped] = useState(false);
  if(process.env.NODE_ENV==="development"){
 console.log(
   "Cloudinary:",
   animal.shortCode,
   animal.image
 );
}
 

  const handleFlip = () => {

  const audio = new Audio(
    cloudinaryAudio(SITE_CONFIG.audio.flip)
  );

  audio.volume = 0.35;

  audio.play().catch(() => {
    console.log("Audio playback blocked");
  });


  setFlipped((prev)=>!prev);
};

  return (
    <div
      className="relative h-[400px] w-full cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={handleFlip}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            background: `linear-gradient(165deg, ${animal.color} 0%, #0B1A14 100%)`,
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
            style={{
              backgroundColor: animal.color,
            }}
          />

          {/* College Code */}
          <div className="relative z-10 flex items-center gap-3 px-6 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Flame className="h-5 w-5 text-[#D4AF37]" />
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              {animal.shortCode}
            </p>
          </div>

          {/* Spirit Image */}
          <div className="relative mx-auto mt-6 h-36 w-36 overflow-hidden rounded-full border-2 border-white/20 shadow-lg">
            <CldImage
              src={animal.image}
              alt={animal.animal}
              fill
              sizes="144px"
              crop="fill"
              gravity="auto"
              quality="auto"
              format="auto"
              loading="lazy"
              className="object-cover"
            />
          </div>

          {/* Card Information */}
          <div className="relative z-10 mt-auto px-6 pb-7 text-center">
            <h3 className="text-lg font-bold text-white">{animal.college}</h3>

            <p className="mt-1 text-xl font-semibold text-[#F0D060]">
              {animal.animal}
            </p>

            <p className="mt-4 text-[11px] text-white/40">Tap to reveal</p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl p-6 shadow-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(165deg, ${animal.color} 0%, #0B1A14 100%)`,
          }}
        >
          {/* College Code */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Flame className="h-4 w-4 text-[#D4AF37]" />
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              {animal.shortCode}
            </p>
          </div>

          {/* Animal Name */}
          <h3 className="mt-6 text-2xl font-bold text-white">
            {animal.animal}
          </h3>

          {/* Description */}
          <p className="mt-4 flex-1 text-sm leading-relaxed text-white/75">
            {animal.description}
          </p>

          {/* Rally */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-center text-sm font-semibold text-[#F0D060]">
              {animal.rally}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function CollegeSpirit() {
  return (
    <section
      id="spirit"
      className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            College Spirit
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2A1F] sm:text-4xl">
            Discover Your College Spirit Animal
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Every college carries a unique spirit. Find yours and carry it with
            pride throughout Parageyan 2026.
          </p>
        </div>

        {/* Spirit Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {spiritAnimals.map((animal, index) => (
            <motion.div
              key={animal.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.06,
                duration: 0.45,
              }}
            >
              <SpiritCard animal={animal} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
