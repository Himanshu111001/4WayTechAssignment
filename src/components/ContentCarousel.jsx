import React, { useState, useEffect, useRef } from "react";
import crousel21 from "../assets/crousel2.1.jpg";
import crousel22 from "../assets/crousel2.2.jpg";
import crousel23 from "../assets/crousel2.3.jpg";

// Carousel data with alternating image positions - moved outside component for performance
const contentSlides = [
  {
    id: 1,
    image: crousel21,
    imagePosition: "left",
    heading: "Innovative Solutions",
    content:
      "Discover cutting-edge technology solutions that transform the way businesses operate. Our innovative approach combines advanced AI capabilities with user-friendly interfaces to deliver exceptional results that exceed expectations.",
  },
  {
    id: 2,
    image: crousel22,
    imagePosition: "right",
    heading: "Expert Team",
    content:
      "Work with industry experts who bring years of experience and deep technical knowledge. Our dedicated team ensures that every project is delivered with the highest quality standards and attention to detail.",
  },
  {
    id: 3,
    image: crousel23,
    imagePosition: "left",
    heading: "Proven Results",
    content:
      "Join thousands of satisfied clients who have achieved remarkable success with our solutions. Our track record speaks for itself with measurable improvements in efficiency, productivity, and customer satisfaction.",
  },
];

const ContentCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const carouselRef = useRef(null);
  const autoSlideRef = useRef(null);

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

  // Auto-slide functionality - only when component is in view for performance
  useEffect(() => {
    if (!isInView) {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
      return;
    }

    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contentSlides.length);
    }, 3000); // 3 seconds auto-slide

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isInView]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, []);

  // Handle dot navigation with accessibility
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToSlide(index);
    }
    // Arrow key navigation
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(index > 0 ? index - 1 : contentSlides.length - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(index < contentSlides.length - 1 ? index + 1 : 0);
    }
  };

  // Handle image load for lazy loading optimization
  const handleImageLoad = (slideId) => {
    setImagesLoaded((prev) => new Set([...prev, slideId]));
  };

  const currentSlideData = contentSlides[currentSlide];

  return (
    <section
      ref={carouselRef}
      className="relative w-full h-[50vh] bg-black py-0"
      aria-label="Content carousel showcasing our services"
      role="region"
    >
      <div className="w-full h-full">
        {/* Carousel Content */}
        <div className="flex items-stretch h-full">
          {/* Image Section - 50% viewport width, flush to edge */}
          <div
            className={`flex items-center justify-center ${
              currentSlideData.imagePosition === "right" ? "order-2" : "order-1"
            }`}
            style={{ width: "50vw", height: "50vh" }}
          >
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {/* Image with exact 50vw width, no rounded corners, flush to edge */}
              {isInView && (
                <img
                  src={currentSlideData.image}
                  alt={`${currentSlideData.heading} - visual representation`}
                  className={`w-full h-full object-contain transition-all duration-700 ease-in-out ${
                    imagesLoaded.has(currentSlideData.id)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(currentSlideData.id)}
                  style={{
                    width: "50vw",
                    height: "50vh",
                  }}
                  draggable="false"
                />
              )}

              {/* Loading placeholder for better UX */}
              {(!isInView || !imagesLoaded.has(currentSlideData.id)) && (
                <div
                  className="w-full bg-gray-800 animate-pulse flex items-center justify-center"
                  style={{
                    width: "50vw",
                    height: "50vh",
                  }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-gray-300 rounded-full animate-spin mx-auto mb-2"></div>
                    <span className="text-gray-400 text-sm">
                      Loading image...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section - 50% viewport width with proper padding */}
          <div
            className={`flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 space-y-6 lg:space-y-8 ${
              currentSlideData.imagePosition === "right" ? "order-1" : "order-2"
            }`}
            style={{ width: "50vw", height: "50vh" }}
          >
            {/* Heading with semantic HTML and animation */}
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight transition-all duration-500"
              id={`carousel-heading-${currentSlide}`}
            >
              {currentSlideData.heading}
            </h3>

            {/* Content paragraph with better typography */}
            <p
              className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed transition-all duration-500"
              aria-describedby={`carousel-heading-${currentSlide}`}
            >
              {currentSlideData.content}
            </p>

            {/* Progress indicator for accessibility and UX */}
            <div className="flex items-center space-x-4">
              <div
                className="text-sm text-gray-400 font-medium"
                aria-live="polite"
              >
                {currentSlide + 1} of {contentSlides.length}
              </div>
              <div className="flex-1 bg-gray-700 rounded-full h-1 max-w-32">
                <div
                  className="h-1 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    width: `${
                      ((currentSlide + 1) / contentSlides.length) * 100
                    }%`,
                    backgroundColor: "rgb(255, 252, 84)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots with enhanced accessibility */}
      <div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        role="tablist"
        aria-label="Carousel slide navigation"
      >
        <div className="flex space-x-4">
          {contentSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-400 ${
                index === currentSlide
                  ? "shadow-lg scale-110"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              style={{
                backgroundColor:
                  index === currentSlide ? "rgb(255, 252, 84)" : undefined,
              }}
              role="tab"
              aria-selected={index === currentSlide}
              aria-controls={`carousel-panel-${index}`}
              aria-label={`Go to slide ${index + 1}: ${slide.heading}`}
            >
              {/* Active indicator */}
              {index === currentSlide && (
                <span className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Screen reader only content for better accessibility */}
      <div className="sr-only">
        {contentSlides.map((slide, index) => (
          <div
            key={slide.id}
            id={`carousel-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`carousel-heading-${index}`}
          >
            <h4>{slide.heading}</h4>
            <p>{slide.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentCarousel;
