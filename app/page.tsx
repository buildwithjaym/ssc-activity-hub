import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { QuickAccess } from "@/components/quick-access";
import { AboutSSC } from "@/components/about-ssc";
import { CollegeSpirit } from "@/components/college-spirit";
import { IntroSection } from "@/components/intro-section";
import { FeaturedActivities } from "@/components/featured-activities";
import { PlaceholderSection } from "@/components/placeholder-section";
import { Footer } from "@/components/footer";
import { PLACEHOLDER_SECTIONS } from "@/data/placeholders";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Navbar />

      <HeroSection />
      <QuickAccess />
      <AboutSSC />
      <CollegeSpirit />
      <IntroSection />
      <FeaturedActivities />

      {PLACEHOLDER_SECTIONS.map((section) => (
        <PlaceholderSection
          key={section.id}
          id={section.id}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
      ))}

      <Footer />
    </main>
  );
}