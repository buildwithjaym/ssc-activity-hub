import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { QuickAccess } from "@/components/quick-access";
import { AboutSSC } from "@/components/about-ssc";
import { CollegeSpirit } from "@/components/college-spirit";
import { IntroSection } from "@/components/intro-section";
import { FeaturedActivities } from "@/components/featured-activities";
import { Footer } from "@/components/footer";
import { EventSchedule } from "@/components/event-schedule";
import { HowToParticipate } from "@/components/how-to-participate";
import { SSCMessage } from "@/components/ssc-message";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Navbar />

      <HeroSection />

<QuickAccess />

<AboutSSC />

<IntroSection />

<FeaturedActivities />

<EventSchedule />

<HowToParticipate />

<CollegeSpirit />

<SSCMessage />

<Footer />
    </main>
  );
}