import React from "react";
import HeroBanner from "../components/HeroBanner";
import CarouselSection from "../components/CarouselSection";
import ContentCarousel from "../components/ContentCarousel";

const Home = () => {
  return (
    <div>
      {/* Hero Banner with integrated transparent Navbar overlay */}
      <HeroBanner />

      {/* Carousel Section - Full viewport carousel */}
      <CarouselSection />

      {/* Content Carousel - Half viewport carousel with alternating layout */}
      <ContentCarousel />
    </div>
  );
};

export default Home;
