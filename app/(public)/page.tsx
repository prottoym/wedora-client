import { Hero } from "@/components/home/Hero";
import FeaturedServices from "@/components/home/FeaturedServices";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { WhyChoose } from "@/components/home/WhyChoose";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedServices />
      <WhyChoose />
      <HowItWorks />
    </>
  );
}
