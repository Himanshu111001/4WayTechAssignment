import React, { useState, useEffect } from "react";
import CallToActionButton from "./CallToActionButton";
import carousel1 from "../assets/carousel1.webp";
import carousel2 from "../assets/carousel2.webp";
import carousel3 from "../assets/carousel3.webp";
import carousel4 from "../assets/carousel4.webp";

// Carousel data with alternating image positions - moved outside component
const slides = [
  {
    id: 1,
    image: carousel1,
    imagePosition: "left",
    heading: "Discover Amazing Features",
    subheading:
      "Experience the next generation of AI-powered interactions that feel natural and engaging.",
    ctaText: "Explore Features",
  },
  {
    id: 2,
    image: carousel2,
    imagePosition: "right",
    heading: "Connect Authentically",
    subheading:
      "Build meaningful relationships with AI companions designed to understand and respond naturally.",
    ctaText: "Start Connecting",
  },
  {
    id: 3,
    image: carousel3,
    imagePosition: "left",
    heading: "Secure & Private",
    subheading:
      "Your conversations are protected with enterprise-grade security and privacy measures.",
    ctaText: "Learn More",
  },
  {
    id: 4,
    image: carousel4,
    imagePosition: "right",
    heading: "Always Available",
    subheading:
      "Access your AI companions 24/7 from any device, anywhere in the world.",
    ctaText: "Get Started",
  },
];

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // 3 seconds = 3000ms

    return () => clearInterval(interval);
  }, []); // Empty dependency array to prevent re-creation

  // Handle dot navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Main Carousel Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 h-full">
            {/* Content Side */}
            <div
              className={`flex flex-col justify-center space-y-6 sm:space-y-8 ${
                currentSlideData.imagePosition === "right"
                  ? "lg:order-1"
                  : "lg:order-2"
              }`}
            >
              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                {currentSlideData.heading}
              </h2>

              {/* Subheading */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                {currentSlideData.subheading}
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <CallToActionButton
                  className="px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold text-black hover:opacity-80 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: "rgb(255, 252, 84)" }}
                  authenticatedText={`Continue to ${currentSlideData.ctaText}`}
                >
                  {currentSlideData.ctaText}
                </CallToActionButton>
              </div>
            </div>

            {/* Image Side */}
            <div
              className={`flex items-end justify-center h-full ${
                currentSlideData.imagePosition === "right"
                  ? "lg:order-2"
                  : "lg:order-1"
              }`}
            >
              <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                <img
                  src={currentSlideData.image}
                  alt={currentSlideData.heading}
                  className="w-full h-auto object-contain object-bottom filter drop-shadow-2xl transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: "90vh",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                index === currentSlide
                  ? "bg-blue-600 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
