import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { GymDiscovery } from "@/components/gym-discovery";
import { FeaturedGym } from "@/components/featured-gym";
import { WhyPlatform } from "@/components/why-platform";
import { Categories } from "@/components/categories";
import { Trainers } from "@/components/trainers";
import { FeaturedTrainer } from "@/components/featured-trainer";
import { Classes } from "@/components/classes";
import { Memberships } from "@/components/memberships";
import { Comparison } from "@/components/comparison";
import { MapPreview } from "@/components/map-preview";
import { Testimonials } from "@/components/testimonials";
import { PlatformPreview } from "@/components/platform-preview";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { SearchPalette } from "@/components/search-palette";
import { DetailDialogs } from "@/components/detail-dialogs";
import { site } from "@/lib/site";

/** Structured data so the page describes itself properly to crawlers. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main id="main">
        <Hero />
        <Stats />
        <GymDiscovery />
        <FeaturedGym />
        <WhyPlatform />
        <Categories />
        <Trainers />
        <FeaturedTrainer />
        <Classes />
        <Memberships />
        <Comparison />
        <MapPreview />
        <Testimonials />
        <PlatformPreview />
        <FinalCTA />
      </main>

      <Footer />

      {/* Overlays live outside <main> so they portal cleanly */}
      <SearchPalette />
      <DetailDialogs />
    </>
  );
}
