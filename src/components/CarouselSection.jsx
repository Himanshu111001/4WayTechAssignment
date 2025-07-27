import React, { useState, useEffect, useRef } from "react";
import CallToActionButton from "./CallToActionButton";
import useSwipe from "../hooks/useSwipe";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const [isInitialized, setIsInitialized] = useState(false);
  const carouselRef = useRef(null);
  const autoSlideRef = useRef(null);

  // Preload images for better performance
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded((prev) => new Set([...prev, slide.id]));
      };
      img.src = slide.image;
    });

    // Initialize after a short delay to prevent initial transition
    setTimeout(() => {
      setIsInitialized(true);
    }, 100);
  }, []);

  // Intersection Observer for performance optimization - only auto-slide when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger when 20% of component is visible
        rootMargin: "50px",
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  // Auto-slide every 3 seconds with transition state management - only when visible
  useEffect(() => {
    if (!isInView) {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
      return;
    }

    autoSlideRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 50); // Short delay for smooth transition initiation
    }, 3000); // 3 seconds = 3000ms

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isInView]); // Updated dependency array

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  // Handle dot navigation with smooth transitions
  const goToSlide = (index) => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 50);
    }
  };

  // Navigation functions for swipe gestures
  const nextSlide = () => {
    if (!isTransitioning) {
      goToSlide((currentSlide + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    }
  };

  // Touch/swipe handlers for mobile UX
  const swipeHandlers = useSwipe(nextSlide, prevSlide, 75);

  const currentSlideData = slides[currentSlide];

  return (
    <section
      ref={carouselRef}
      className="hero-carousel relative w-full h-screen overflow-hidden bg-black"
      aria-label="Hero carousel showcasing key features"
      role="region"
      {...swipeHandlers} // Add swipe support for mobile
    >
      {/* Slide Container with horizontal sliding animation */}
      <div className="relative h-full w-full overflow-hidden">
        <div
          className={`flex h-full carousel-slide-container ${
            isInitialized ? "carousel-transition" : "no-transition"
          }`}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="carousel-slide h-full flex-shrink-0 flex items-center justify-center px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-7xl mx-auto w-full h-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 h-full">
                  {/* Content Side */}
                  <div
                    className={`flex flex-col justify-center space-y-6 sm:space-y-8 ${
                      slide.imagePosition === "right"
                        ? "lg:order-1"
                        : "lg:order-2"
                    }`}
                  >
                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                      {slide.heading}
                    </h2>

                    {/* Subheading */}
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                      {slide.subheading}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <CallToActionButton
                        className="px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold text-black hover:opacity-80 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        style={{ backgroundColor: "rgb(255, 252, 84)" }}
                        authenticatedText={`Continue to ${slide.ctaText}`}
                      >
                        {slide.ctaText}
                      </CallToActionButton>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div
                    className={`flex items-end justify-center h-full ${
                      slide.imagePosition === "right"
                        ? "lg:order-2"
                        : "lg:order-1"
                    }`}
                  >
                    <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                      <img
                        src={slide.image}
                        alt={slide.heading}
                        className={`w-full h-auto object-contain object-bottom filter drop-shadow-2xl image-fade-in transition-all duration-500 ease-in-out ${
                          imagesLoaded.has(slide.id)
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                        style={{
                          maxHeight: "90vh",
                        }}
                        loading={index === 0 ? "eager" : "lazy"} // Eager load first image
                        draggable="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots - Reduced size for modern UI */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`nav-dot ${
                index === currentSlide ? "nav-dot-active" : ""
              } w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed ${
                index === currentSlide
                  ? "shadow-lg"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              style={{
                backgroundColor:
                  index === currentSlide ? "rgb(255, 252, 84)" : undefined,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
