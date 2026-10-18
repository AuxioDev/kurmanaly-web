import { getFeaturedArtwork } from "@/data/artworks";
import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { StudioTourSection } from "@/components/sections/StudioTourSection";
import { ExhibitionsSection } from "@/components/sections/ExhibitionsSection";
import { StatementSection } from "@/components/sections/StatementSection";
import { InquirySection } from "@/components/sections/InquirySection";

export default function HomePage() {
  const featured = getFeaturedArtwork();

  return (
    <>
      <HeroSection featured={featured} />
      <GallerySection />
      <StudioTourSection />
      <ExhibitionsSection />
      <StatementSection />
      <InquirySection />
    </>
  );
}
