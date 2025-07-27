import React from "react";
import HeroBanner from "../components/HeroBanner";
import CarouselSection from "../components/CarouselSection";

const Home = () => {
  return (
    <div>
      {/* Hero Banner with integrated transparent Navbar overlay */}
      <HeroBanner />

      {/* Carousel Section - Full viewport carousel */}
      <CarouselSection />
    </div>
  );
};

export default Home;
